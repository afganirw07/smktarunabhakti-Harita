// routes/adminRoutes.js
import React from 'react';
import {
  MdHome,
  MdOutlineArticle,
  MdBarChart,
  MdPerson,
  MdLogout,
  MdAddChart,
  MdHistory
} from 'react-icons/md';

const allRoutes = [
  {
    name: 'Dashboard Utama',
    layout: '/admin',
    path: 'default',
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: 'Manajemen Aset',
    layout: '/admin',
    path: 'manajemen-aset',
    icon: <MdOutlineArticle className="h-6 w-6" />,
    secondary: true,
  },
  {
    name: 'Tambah Aset',
    layout: '/admin',
    path: 'tambah-aset',
    icon: <MdAddChart className="h-6 w-6" />,
    secondary: true,
  },
  {
    name: 'Tabel Data',
    layout: '/admin',
    icon: <MdBarChart className="h-6 w-6" />,
    path: 'data-tables',
  },
  {
    name: 'Riwayat Transaksi',
    layout: '/admin',
    icon: <MdHistory className="h-6 w-6" />,
    path: 'riwayat-transaksi',
  },
  {
    name: 'Profil',
    layout: '/admin',
    path: 'profile',
    icon: <MdPerson className="h-6 w-6" />,
  },
  {
    name: 'Keluar',
    layout: '/admin',
    path: 'logout',
    icon: <MdLogout className="h-6 w-6" />,
  },
];

const role = localStorage.getItem('user_role');
const routes = role === 'admin' ? allRoutes : [];

export default routes;