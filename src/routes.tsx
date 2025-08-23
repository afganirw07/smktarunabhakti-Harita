import React from 'react';

// Admin Imports

// Icon Imports
import {
  MdHome,
  MdOutlineArticle,
  MdBarChart,
  MdPerson,
  MdLogout 
} from 'react-icons/md';

const routes = [
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
    path: 'log-out',
    icon: <MdLogout   className="h-6 w-6" />,
  }
];
export default routes;
