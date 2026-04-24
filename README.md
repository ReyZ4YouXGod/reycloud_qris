# QRIS Pakasir + MongoDB + Webhook (Vercel Ready)

Sistem payment QRIS menggunakan **Pakasir API**, dengan fitur:
- Generate QRIS otomatis
- Simpan transaksi ke MongoDB
- Webhook instant paid (real-time update)
- Deploy langsung ke Vercel

---

## 🚀 Fitur
- Create QRIS transaction via Pakasir API
- Convert QR string ke QR image
- MongoDB order tracking
- Webhook instant update status (paid)
- Simple HTML checkout UI
- Ready deploy di Vercel

---

## 🧠 Tech Stack
- Node.js (Vercel Serverless)
- MongoDB Atlas
- Pakasir API
- Axios
- QRCode.js
- Vercel Hosting

---

## 📁 Struktur Project
pages/ ├── api/ │    ├── create.js │    ├── status.js │    └── webhook.js ├── index.html
lib/ └── mongo.js
models/ └── Order.js

---

## ⚙️ Instalasi

```bash
npm install
