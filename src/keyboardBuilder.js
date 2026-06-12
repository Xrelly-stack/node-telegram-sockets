'use strict';

class KeyboardBuilder {
  constructor(type = 'inline') {
    this.type = type;
    this.rows = [[]];
    this.currentRow = 0;
  }

  /**
   * Add a button to the current row
   * @param {Object} options Button options
   */
  button(options) {
    let text = options.text;
    
    // Apply styles by adding emojis (simulating color)
    if (options.style === 'danger') {
      text = '🔴 ' + text;
    } else if (options.style === 'success') {
      text = '🟢 ' + text;
    } else if (options.style === 'warning') {
      text = '🟡 ' + text;
    } else if (options.style === 'info') {
      text = '🔵 ' + text;
    }

    const btn = { text };
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
