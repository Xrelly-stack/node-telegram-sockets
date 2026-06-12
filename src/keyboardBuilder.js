'use strict';

/**
 * KeyboardBuilder for Node Telegram Sockets
 * Supports native Telegram button styles (primary, success, danger)
 * and custom emoji icons.
 */
class KeyboardBuilder {
  constructor(type = 'inline') {
    this.type = type;
    this.rows = [[]];
    this.currentRow = 0;
  }

  /**
   * Add a button to the current row
   * @param {Object} options Button options
   * @param {String} [options.style] Native style: 'primary', 'success', or 'danger'
   * @param {String} [options.icon_custom_emoji_id] Custom emoji ID
   */
  button(options) {
    const btn = { text: options.text };
    
    // Support native Telegram styles (Bot API 7.10+)
    if (['primary', 'success', 'danger'].indexOf(options.style) !== -1) {
      btn.style = options.style;
    }

    if (options.url) btn.url = options.url;
    if (options.callback_data) btn.callback_data = options.callback_data;
    if (options.icon_custom_emoji_id) btn.icon_custom_emoji_id = options.icon_custom_emoji_id;
    if (options.web_app) btn.web_app = options.web_app;
    if (options.login_url) btn.login_url = options.login_url;
    if (options.switch_inline_query) btn.switch_inline_query = options.switch_inline_query;
    if (options.switch_inline_query_current_chat) btn.switch_inline_query_current_chat = options.switch_inline_query_current_chat;

    this.rows[this.currentRow].push(btn);
    return this;
  }

  /**
   * Add a URL button
   */
  url(text, url, options = {}) {
    return this.button({ text, url, ...options });
  }

  /**
   * Add a callback button
   */
  callback(text, data, options = {}) {
    return this.button({ text, callback_data: data, ...options });
  }

  /**
   * Move to a new row
   */
  row() {
    this.rows.push([]);
    this.currentRow++;
    return this;
  }

  /**
   * Build the final markup
   */
  build() {
    if (this.type === 'inline') {
      return { inline_keyboard: this.rows.filter(r => r.length > 0) };
    } else {
      return { keyboard: this.rows.filter(r => r.length > 0), resize_keyboard: true };
    }
  }
}

module.exports = KeyboardBuilder;
