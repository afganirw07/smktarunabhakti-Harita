// routes/adminRoutes.js
import React from 'react';
import {
  MdHome,
  MdOutlineArticle,
  MdBarChart,
  MdPerson,
  MdLogout,
  MdAddChart,
} from 'react-icons/md';

const allRoutes = [
  {
    name: 'Main Dashboard',
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
    name: 'Data Tables',
    layout: '/admin',
    icon: <MdBarChart className="h-6 w-6" />,
    path: 'data-tables',
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: 'profile',
    icon: <MdPerson className="h-6 w-6" />,
  },
  {
    name: 'Log Out',
    layout: '/admin',
    path: 'logout',
    icon: <MdLogout className="h-6 w-6" />,
  },
];

const role = localStorage.getItem('user_role');
const routes = role === 'admin' ? allRoutes : [];

export default routes;