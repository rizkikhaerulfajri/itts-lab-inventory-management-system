# Lab Inventory Management System

Single Page Application (SPA) untuk manajemen inventaris laboratorium - UAS Pemrograman Front-End Semester

## Deskripsi Proyek

Aplikasi web berbasis React.js untuk mengelola inventaris peralatan laboratorium dengan fitur CRUD (Create, Read, Update, Delete). Data disimpan menggunakan LocalStorage sebagai simulasi persistensi data.

### Fitur Utama

- Create - Tambah item inventaris baru
- Read - Tampilkan daftar inventaris (Grid/List)
- Update - Edit informasi item
- Delete - Hapus item dengan konfirmasi
- Responsive Design - Optimal di Desktop & Mobile
- Toast Notifications - Feedback real-time
- LocalStorage - Data persisten tanpa backend

## Teknologi yang Digunakan

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| React.js | 18.3.1 | Frontend framework |
| Bootstrap | 5.3 | CSS framework & responsive grid |
| LocalStorage API | - | Simulasi database |
| JavaScript ES6+ | - | Logika aplikasi |

## Instalasi & Cara Menjalankan

### Prasyarat
- Node.js versi 16.x atau lebih baru
- npm atau yarn

### Langkah-langkah

**1. Clone repository**
```

git clone https://github.com/rizkikhaerulfajri/itts-lab-inventory-management-system.git
cd itts-lab-inventory-management-system

```

**2. Install dependencies**
```

npm install

```

**3. Jalankan aplikasi**
```

npm start

```

**4. Buka browser**

Aplikasi akan berjalan di http://localhost:3000


## Struktur Folder

```

itts-lab-inventory-management-system/
├── public/
│   ├── index.html          \# HTML template
│   └── favicon.ico
├── src/
│   ├── components/         \# Komponen React
│   │   ├── navbar.js       \# Navigasi bar
│   │   ├── addItemForm.js  \# Form tambah item
│   │   ├── inventoryTable.js  \# Tabel inventaris
│   │   ├── editItemModal.js   \# Modal edit
│   │   ├── deleteItemModal.js \# Modal hapus
│   │   ├── toast.js        \# Notifikasi toast
│   │   └── footer.js       \# Footer
│   ├── App.js              \# Komponen utama
│   ├── App.css             \# Styling aplikasi
│   └── index.js            \# Entry point React
├── package.json            \# Dependencies
└── README.md               \# Dokumentasi

```

## Penjelasan Komponen Utama

### 1. App.js 
- Fungsi: Komponen utama yang mengelola state global dan logika CRUD
- State Management:
  - items - Array data inventaris
  - loading - Status loading
  - showForm - Toggle form tambah item
  - toast - Notifikasi feedback
- Hooks: useState, useEffect

### 2. inventoryTable.js
- Fungsi: Menampilkan data dalam format tabel (desktop) dan card (mobile)
- Props: items, onUpdate, onDelete
- Fitur: Responsive layout dengan CSS media queries

### 3. addItemForm.js
- Fungsi: Form untuk menambah item baru
- Validasi: Nama & quantity wajib diisi, quantity > 0
- Props: onAddItem, onCancel

### 4. editItemModal.js
- Fungsi: Modal untuk mengedit item yang sudah ada
- Controlled Components: State sinkron dengan input form
- Props: item, onUpdate, onClose

### 5. deleteItemModal.js
- Fungsi: Konfirmasi sebelum menghapus item
- Props: item, onConfirm, onCancel

### 6. toast.js
- Fungsi: Notifikasi feedback (success/error)
- Auto-dismiss: Hilang otomatis setelah 3 detik
- Props: message, type, onClose

### 7. navbar.js & footer.js
- Fungsi: Komponen UI statis untuk header dan footer

## Responsive Design

| Breakpoint | Layout | Keterangan |
|------------|--------|------------|
| Desktop (>= 768px) | Tabel Grid | 6 kolom dengan horizontal scroll |
| Tablet (<= 768px) | Compact Table | Font size & padding lebih kecil |
| Mobile (<= 767px) | Card Layout | Setiap item dalam card terpisah |

### CSS Framework
- Bootstrap 5.3 untuk grid system dan utility classes
- Custom CSS untuk styling advanced (gradients, shadows, animations)

## State Management & Data Flow

### Arsitektur Aplikasi

Aplikasi menggunakan arsitektur **unidirectional data flow** dengan LocalStorage sebagai single source of truth.

**Data Flow:**
1. LocalStorage menyimpan data inventaris dalam format JSON
2. App.js sebagai parent component mengelola semua state global
3. Child components menerima data via props dan mengirim events via callback functions
4. Setiap perubahan data di-trigger dari App.js dan disinkronkan ke LocalStorage

### State Global (App.js)

| State | Type | Deskripsi |
|-------|------|-----------|
| items | Array | Menyimpan semua data inventaris |
| loading | Boolean | Status loading saat fetch data |
| showForm | Boolean | Toggle visibility form tambah item |
| toast | Object | Data notifikasi (message, type) |

### Component Hierarchy

**Parent Component:**
- App.js (mengelola state dan logika bisnis)

**Child Components:**
- Navbar (menerima onAddClick callback)
- AddItemForm (mengirim data via onAddItem callback)
- InventoryTable (menerima items array, mengirim events via onUpdate/onDelete)
  - EditItemModal (dipanggil dari InventoryTable)
  - DeleteItemModal (dipanggil dari InventoryTable)
- Toast (menerima message dan type)
- Footer (static component)

### CRUD Operations

**Create:**
1. User mengisi form di AddItemForm
2. onAddItem() callback mengirim data ke App.js
3. App.js generate ID baru (EQUIP-XXX)
4. Data ditambahkan ke state items
5. State disinkronkan ke LocalStorage
6. Toast notification ditampilkan

**Read:**
1. useEffect() di App.js dipanggil saat component mount
2. fetchItems() membaca data dari LocalStorage
3. Data di-parse dan diset ke state items
4. InventoryTable menerima items via props dan render UI

**Update:**
1. User klik tombol Edit di InventoryTable
2. EditItemModal muncul dengan data item
3. User edit dan submit
4. onUpdate() callback mengirim data ke App.js
5. App.js map array items dan replace item yang diupdate
6. State disinkronkan ke LocalStorage

**Delete:**
1. User klik tombol Delete di InventoryTable
2. DeleteItemModal muncul untuk konfirmasi
3. User konfirmasi delete
4. onDelete() callback mengirim ID ke App.js
5. App.js filter items dan hapus item dengan ID tersebut
6. State disinkronkan ke LocalStorage

### CRUD Operations
- Create: addItem() -> Generate ID -> Save to LocalStorage
- Read: fetchItems() -> Load dari LocalStorage -> Set state
- Update: updateItem(id, data) -> Map array -> Save to LocalStorage
- Delete: deleteItem(id) -> Filter array -> Save to LocalStorage

## Testing & Bug Report

### Usability Testing
Status: Passed (Manual testing)

| Fitur | Status | Catatan |
|-------|--------|---------|
| Create Item | Pass | Form validation berfungsi |
| Read Items | Pass | Data loading dari LocalStorage |
| Update Item | Pass | Modal update responsif |
| Delete Item | Pass | Konfirmasi sebelum hapus |
| Responsive Mobile | Pass | Card layout optimal |
| Toast Notification | Pass | Auto-dismiss 3 detik |

### Known Issues
- Minor bug dimana terdapat typing cursor di samping table setelah Edit atau Delete

## Screenshots
### Desktop View
<img width="1755" height="988" alt="image" src="https://github.com/user-attachments/assets/42ac56dd-51c9-4cd6-89a5-c1ea7b065ff3" />
<img width="1755" height="1455" alt="image" src="https://github.com/user-attachments/assets/12c04aac-b983-41c0-b309-836b68c16727" />
<img width="1755" height="988" alt="image" src="https://github.com/user-attachments/assets/24ea29de-27a6-43e7-8e42-81632013418f" />
<img width="1755" height="988" alt="image" src="https://github.com/user-attachments/assets/e7584956-d6fc-43c2-affc-7d24065454da" />

### Mobile View
<img width="469" height="2391" alt="image" src="https://github.com/user-attachments/assets/babe10b4-e644-4c83-adc9-fce93b751e68" />
<img width="469" height="3010" alt="image" src="https://github.com/user-attachments/assets/abd3fd9a-84d1-41f5-99c0-208fc7c1d8c1" />
<img width="469" height="2391" alt="image" src="https://github.com/user-attachments/assets/921caa6c-908b-4a35-8c32-e04939e310bb" />
<img width="469" height="2391" alt="image" src="https://github.com/user-attachments/assets/7a9607e5-cd43-4c80-a8c4-fe8a7bcce5b2" />

## Informasi Developer

- Nama: Rizki Khaerul Fajri
- NIM: 1003240054
- Kelas: Informatika - Semester 3
- Mata Kuliah: Pemrograman Front-End (IF220)
- Dosen: Taufik Iqbal Ramdhani, S.Kom., M.Sc.

## Lisensi

Project ini dibuat untuk keperluan Ujian Akhir Semester (UAS) Pemrograman Front-End.

---

Repository: https://github.com/rizkikhaerulfajri/itts-lab-inventory-management-system
