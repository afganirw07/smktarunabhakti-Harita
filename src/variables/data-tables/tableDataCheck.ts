
export type RowObj = {
  name: string;       // nama orang
  progress: string;   // jenis barang / area
  layanan: string;   
  date: string;       // tanggal
};

const tableDataCheck: RowObj[] = [
  {
    name: 'Budi Santoso',
    layanan: 'Report',
    progress: 'Plastik',
    date: '12 Jan 2025',
  },
  {
    name: 'Siti Aminah',
    layanan: 'Report',
    progress: 'Kertas',
    date: '15 Jan 2025',
  },
  {
    name: 'Andi Wijaya',
    layanan: 'Report',
    progress: 'Logam',
    date: '20 Jan 2025',
  },
  {
    name: 'Rina Kartika',
    layanan: 'Report',
    progress: 'Jalan Rusak',
    date: '21 Jan 2025',
  },
  {
    name: 'Dewi Lestari',
    layanan: 'Report',
    progress: 'Sampah Menumpuk',
    date: '24 Jan 2025',
  },
  {
    name: 'Ahmad Fauzi',
    layanan: 'Report',
    progress: 'Pohon Tumbang',
    date: '28 Jan 2025',
  },
  {
    name: 'Joko Widodo',
    layanan: 'Report',
    progress: 'Botol Kaca',
    date: '30 Jan 2025',
  },
];

export default tableDataCheck;
