# Node Telegram Sockets

Node Telegram Sockets adalah modifikasi kustom dari library `node-telegram-bot-api` yang populer, dirancang untuk menyediakan interaksi bot Telegram yang lebih intuitif dengan penanganan event bergaya 'socket'. Library ini mempertahankan fungsionalitas inti dari `node-telegram-bot-api` sambil memperkenalkan alias yang memudahkan pengembang yang terbiasa dengan paradigma event-driven atau socket.

## Fitur Utama

- **Kompatibilitas Penuh**: Membangun di atas `node-telegram-bot-api`, memastikan kompatibilitas dengan semua fitur dan metode API Telegram Bot.
- **Event Handling Bergaya Socket**: Memperkenalkan alias `connect` dan `send` untuk metode `on` dan `emit` EventEmitter, membuat penanganan event lebih familiar bagi pengembang socket.
- **Rebranding**: Nama dan namespace internal telah diperbarui menjadi `node-telegram-sockets` untuk mencerminkan fokus baru.
- **Fleksibel**: Mendukung polling dan webhook untuk menerima pembaruan dari Telegram.

## Instalasi

Untuk menginstal Node Telegram Sockets, Anda dapat menggunakan npm:

```bash
npm install node-telegram-sockets
```

## Penggunaan

Berikut adalah contoh dasar bagaimana menggunakan Node Telegram Sockets:

```javascript
const TelegramSockets = require("node-telegram-sockets");

// Ganti dengan token bot Telegram Anda
const token = "YOUR_TELEGRAM_BOT_TOKEN";

// Buat instance bot
const bot = new TelegramSockets(token, { polling: true });

// Menggunakan alias 'connect' untuk mendengarkan pesan
bot.connect("message", (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Halo dari Node Telegram Sockets!");
});

// Contoh penggunaan alias 'send' (untuk event kustom)
bot.connect("custom_event", (data) => {
  console.log("Menerima event kustom:", data);
});

// Memicu event kustom
bot.send("custom_event", { user: "John Doe", action: "test" });

// Mendengarkan event 'socket:message' yang baru
bot.connect("socket:message", ({ data, metadata }) => {
  console.log("Menerima pesan melalui socket-like event:", data.text);
  // Anda bisa memproses data dan metadata di sini
});

// Contoh penanganan perintah
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Selamat datang!\nKetik /echo [pesan Anda] untuk mengulang pesan.");
});

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});

// Penanganan error
bot.on("polling_error", (error) => {
  console.error("Polling error:", error);
});

```

## Perubahan dari `node-telegram-bot-api`

- Kelas utama telah diganti namanya dari `TelegramBot` menjadi `TelegramSockets`.
- Namespace debug telah diperbarui dari `node-telegram-bot-api` menjadi `node-telegram-sockets`.
- Alias `connect(event, listener)` ditambahkan sebagai pengganti `on(event, listener)`.
- Alias `send(event, ...args)` ditambahkan sebagai pengganti `emit(event, ...args)`.
- Event baru `socket:message` ditambahkan, yang memancarkan objek `{ data, metadata }` untuk setiap pesan yang diterima, memungkinkan penanganan event yang lebih terstruktur.

## Kontribusi

Kami menyambut kontribusi! Jika Anda memiliki ide untuk fitur baru, perbaikan bug, atau peningkatan, silakan buka isu atau kirim pull request di repositori GitHub.

## Lisensi

Library ini dilisensikan di bawah Lisensi MIT. Lihat file `LICENSE.md` untuk detail lebih lanjut.
