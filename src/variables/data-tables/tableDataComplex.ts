type RowObj = {
  name: string;
  report: string;
  status: string;
  date: string;
};

const tableDataComplex: RowObj[] = [
  {
    name: 'Budi Santoso',
    report: 'Plastik',
    status: 'Proses',
    date: '12 Jan 2025',
  },
  {
    name: 'Siti Aminah',
    report: 'Kertas',
    status: 'Proses',
    date: '15 Jan 2025',
  },
  {
    name: 'Andi Wijaya',
    report: 'Logam',
    status: 'Proses',
    date: '20 Jan 2025',
  },
  {
    name: 'Rina Kartika',
    report: 'Jalan Rusak',
    status: 'Proses',
    date: '21 Jan 2025',
  },
  {
    name: 'Dewi Lestari',
    report: 'Sampah Organik',
    status: 'Proses',
    date: '22 Jan 2025',
  },
];

export default tableDataComplex;
