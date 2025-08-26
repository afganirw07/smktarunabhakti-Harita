'use client';

import React from 'react';
import Swal from 'sweetalert2';
import { MdLogout } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    Swal.fire({
      title: 'Konfirmasi Log Out',
      text: 'Apakah Anda yakin ingin keluar dari akun? Semua data lokal akan dihapus.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Keluar',
      cancelButtonText: 'Batal',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          localStorage.clear();
          console.log('localStorage berhasil dihapus.');
          router.push('/auth/login'); // Navigasi tanpa refresh
        } catch (error) {
          console.error('Gagal menghapus localStorage:', error);
          window.location.href = '/auth/login'; // Fallback jika router gagal
        }
      }
    });
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
        padding: '0.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '0.5rem',
        backgroundColor: '#fff',
        color: '#333',
      }}
    >
      <MdLogout />
      Log Out
    </button>
  );
};

export default LogoutButton;