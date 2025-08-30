

# 🌿 Harita – Platform Smart Waste Management
(https://smktarunabhakti-harita.vercel.app/)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Dibangun dengan Next.js](https://img.shields.io/badge/Dibangun%20dengan-Next.js-black?logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Backend-Supabase-blue?logo=supabase)](https://supabase.com/)
[![Midtrans](https://img.shields.io/badge/Pembayaran-Midtrans-orange?logo=midtrans)](https://midtrans.com/)

Harita adalah platform modern berbasis teknologi yang bertujuan meningkatkan pengelolaan sampah di Indonesia. Platform ini memberdayakan komunitas untuk melaporkan, mendaur ulang, dan mengelola sampah secara efektif, sambil meningkatkan kesadaran dan tanggung jawab lingkungan.

---


## 💡 Tentang

Harita dirancang untuk mengatasi masalah sampah yang semakin meningkat di Indonesia. Berdasarkan SIPSN 2022, Indonesia menghasilkan **68,5 juta ton sampah**, dengan **18,5% berupa plastik**, dan **33,42% tidak terkelola**. Kesadaran masyarakat terkait pemisahan sampah masih rendah, menyebabkan banjir, polusi, dan masalah kesehatan.  

Harita memfasilitasi layanan pengelolaan sampah terintegrasi, memudahkan masyarakat berpartisipasi, melaporkan sampah ilegal, dan belajar pengelolaan sampah yang benar melalui asisten AI.

---

## 🛠 Masalah & Solusi

### Masalah
- Kesadaran masyarakat terhadap pemisahan dan pengelolaan sampah masih rendah.
- Sebagian besar sampah tidak terkelola.
- Kebutuhan layanan pengelolaan sampah real-time dan transparan.

### Solusi
Harita menghadirkan pendekatan berbasis teknologi untuk pengelolaan sampah:

1. **Layanan Pickup Sampah Digital** – Jadwal dan riwayat pembayaran transparan.
2. **Toko Daur Ulang HaritaCoins** – Memberikan hadiah untuk pemisahan sampah yang tepat.
3. **Sistem Pelaporan Sampah** – Memudahkan pelaporan lokasi sampah ilegal.
4. **Asisten HaritaAI** – AI mengidentifikasi jenis sampah dan memberikan saran pengelolaan.

---

## ⚙ Teknologi

| Lapisan     | Teknologi / Library |
|------------|-------------------|
| Frontend   | Next.js, React, Tailwind CSS |
| Backend    | Supabase (Auth, Database, Realtime) |
| Pembayaran | Midtrans Gateway |
| Hosting    | Vercel |
| Bahasa     | TypeScript, JavaScript |
| Library    | Framer Motion, HTML2PDF, Gemini API, Lucide React, React Icons, Magic UI, Shadcn, Horizon Dashboard, TailAdmin V2, Toast, SweetAlert2 |

---

## 🎯 Tujuan & Manfaat

### Tujuan
1. Memudahkan akses layanan pengelolaan sampah.
2. Mengurangi sampah ilegal di masyarakat.
3. Meningkatkan kesadaran pemisahan sampah.
4. Mendorong partisipasi aktif dalam kegiatan lingkungan.
5. Memberikan pekerjaan bagi pemulung.

### Manfaat
- Lingkungan lebih bersih dan sehat.
- Promosi produk daur ulang melalui Harita Store.

---

## ✨ Fitur

### Fitur Pengguna
1. **Pelaporan Sampah**
   - Kirim laporan sampah (Nama, Telepon, Email, Lokasi, Pembayaran, Jenis Area)
   - Pantau status dan riwayat transaksi secara real-time

2. **Langganan Trash House**
   - Pilihan langganan bulanan, triwulanan, semesteran, dan tahunan
   - Jadwal pickup real-time
   - Hadiah HaritaCoins untuk pemisahan sampah
   - Trial gratis 2 minggu per alamat

3. **HaritaAI**
   - Chatbot AI untuk identifikasi jenis sampah dan panduan pengelolaan

4. **Tukar Daur Ulang**
   - Kirim sampah untuk ditukar
   - Konfirmasi penukaran dan unduh struk
   - Redeem di HaritaPos yang ditunjuk

### Fitur Admin
1. **Dashboard Utama**
   - Pantau pendapatan, saldo, pengeluaran, total layanan, pengguna, karyawan, statistik layanan, laporan mingguan, traffic web, presentasi sampah
   - Setujui/tolak foto Trans House

2. **Manajemen Aset**
   - Kelola inventaris (kendaraan, alat, gudang)
   - Tambah, edit, atau hapus aset

3. **Tabel Data**
   - Akses semua data tersimpan: pengguna, admin, karyawan, aset, penukaran, layanan

4. **Riwayat Transaksi**
   - Lihat transaksi pengguna, unduh PDF

5. **Profil & Logout**
   - Kelola akun admin dan logout aman

---

## 🚀 Cara Memulai

### 1. Clone Repository
```
git clone https://github.com/afganirw07/smktarunabhakti-Harita.git
cd harita
```

### 2. Install Dependencies

```
npm install
# atau
yarn install
```
### 3. Setup .env

``` NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

MIDTRANS_CLIENT_KEY=your_midtrans_client_key
MIDTRANS_SERVER_KEY=your_midtrans_server_key

NEXT_PUBLIC_BASE_URL=http://localhost:3000

NEXT_PUBLIC_GEMINI_API_KEY = 'your_key'
```

### 4. Jalankan Development Server
```
npm run dev
# atau
yarn dev
```
Buka http://localhost:3000

##  Testing Admin Dashboard
```
Email : afganirwansyah070708@gmail.com
Pass : 123456789
```

© 2025 Afgan Irwansyah

