'use client';

import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const showLogoutModal = async () => {
      const result = await Swal.fire({
        title: 'Konfirmasi keluar akun?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Keluar',
        cancelButtonText: 'Batal',
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      if (result.isConfirmed) {
        try {
          localStorage.clear();
          console.log('localStorage berhasil dihapus.');
          router.replace('/auth/login');
        } catch (error) {
          console.error('Gagal menghapus localStorage:', error);
          router.replace('/auth/login');
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        router.replace('/admin/default');
      }
    };

    showLogoutModal();
  }, [router]);

  return null;
};

export default LogoutPage;
