# Shift PvP — Minecraft PvP Tier List & Global Rankings

[![Platform: Web](https://img.shields.io/badge/platform-web-blue.svg)](https://shiftiers.vercel.app)
[![Hosting: Vercel](https://img.shields.io/badge/hosting-vercel-brightgreen.svg)](https://shiftiers.vercel.app)
[![Language: HTML/CSS/JS](https://img.shields.io/badge/language-HTML%20%7C%20CSS%20%7C%20JS-orange.svg)]()

**Shift PvP** adalah platform peringkat kompetitif dan *tier list* global berbasis web yang dirancang untuk mendata serta menampilkan performa para pemain Minecraft PvP terbaik di berbagai mode permainan (*gamemodes*). 

Website ini sepenuhnya dinamis, menggunakan arsitektur pemrosesan data di sisi klien (*client-side data rendering*) untuk menghitung total poin, memperbarui tingkatan (*tier*), dan melakukan pengurutan peringkat (*leaderboard sorting*) secara otomatis berdasarkan file basis data terpusat.

🔗 **Live Demo:** [shiftiers.vercel.app](https://shiftiers.vercel.app)

---

## ✨ Fitur Utama

- **Penyusunan Ranking Otomatis (*Auto-Sorting Leaderboard*):** JavaScript secara otomatis menghitung akumulasi poin dari setiap kompetitor dan mengurutkannya dari peringkat tertinggi ke terendah secara *real-time* saat halaman dimuat.
- **Visualisasi Badge Tier Premium:** Menampilkan identitas visual tingkatan (*tier badge*) yang responsif dan elegan (dari HT1 hingga LT5) untuk setiap mode permainan.
- **Arsitektur Data Efisien:** Menggunakan manajemen satu berkas data terpusat (`players.json`) untuk meminimalkan *HTTP network request overhead*, menjaga performa pemuatan halaman tetap instan.
- **Desain Modern & Responsif:** Antarmuka premium dengan tipografi kelas atas menggunakan font *Plus Jakarta Sans* dan *Space Grotesk*, serta dioptimalkan sepenuhnya untuk perangkat seluler.

---

## 🎮 Mode PvP yang Didukung

Sistem poin dihitung secara kumulatif berdasarkan performa terverifikasi pada 7 kategori mode kompetisi berikut:
1. **Sword** (1.16+ Klasik)
2. **NethPot** (Netherite Potion)
3. **Crystal** (End Crystal Meta)
4. **Mace** (Wind Charge & Smash Mechanics)
5. **UHC** (Ultra Hardcore Format)
6. **SMP** (Survival Multiplayer Settings)
7. **Diamond SMP** (Mid-tier Armor Combat)

---

## 📊 Arsitektur Sistem Poin & Matriks Referensi

Poin global diakumulasikan dari posisi *tier* yang berhasil dicapai oleh pemain menggunakan bobot penilaian sebagai berikut:

| Tier | Poin | Tier | Poin |
| :--- | :--- | :--- | :--- |
| **HT1** | 20 Poin | **LT3** | 10 Poin |
| **LT1** | 18 Poin | **HT4** | 8 Poin |
| **HT2** | 16 Poin | **LT4** | 6 Poin |
| **LT2** | 14 Poin | **HT5** | 4 Poin |
| **HT3** | 12 Poin | **LT5** | 2 Poin |

*Catatan: Status tidak terperingkat atau kosong (`—`) otomatis dihitung sebagai 0 poin.*

---

## 📂 Struktur Folder Proyek

```text
├── index.html          # Halaman utama aplikasi (Struktur Tabel Dinamis)
├── players.json        # Basis data terpusat untuk profil dan tier pemain
├── rules/
│   └── rules.html      # Halaman regulasi kompetisi
├── assets/
│   ├── css/
│   │   └── style.css   # Main stylesheet & arsitektur desain layout
│   ├── js/
│   │   ├── script.js   # Kontrol navigasi UI & efek interaktif mendasar
│   │   └── ranking.js  # Mesin kalkulasi poin, sorting, dan render DOM tabel
│   ├── icons/          # Aset ikon visual representasi gamemode (.png)
│   └── logo/           # Identitas visual brand Shift PvP
└── README.md           # Dokumentasi repositori proyek
