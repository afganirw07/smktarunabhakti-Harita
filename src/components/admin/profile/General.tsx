'use client';

import React, { useState, useEffect } from "react";
import Card from "components/card";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

// Buat instance Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const General = () => {
  const [profileData, setProfileData] = useState({
    firstName: 'Loading...',
    lastName: 'Loading...',
    email: 'Loading...'
  });

  useEffect(() => {
    async function getProfileData() {
      const userId = localStorage.getItem('user_id');

      if (!userId) {
        console.error('User ID not found in local storage.');
        setProfileData({
          firstName: 'Not Found',
          lastName: '',
          email: 'Not Found'
        });
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name, email')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error.message);
        setProfileData({
          firstName: 'Error',
          lastName: 'fetching data',
          email: 'Error'
        });
      } else if (data) {
        setProfileData({
          firstName: data.first_name || 'N/A',
          lastName: data.last_name || 'N/A',
          email: data.email || 'N/A'
        });
      }
    }

    getProfileData();
  }, []);

  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          Informasi Admin
        </h4>
        <p className="mt-2 px-2 text-base text-gray-600">
          Ringkasan informasi utama akun admin, termasuk detail kontak dan status pekerjaan.
        </p>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Nama Lengkap</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {profileData.firstName} {profileData.lastName}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Jabatan</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            Admin
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Departemen</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            Operasional
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Lokasi Kerja</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            Kantor Pusat
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Tanggal Bergabung</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            20 Mei 2023
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Email</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {profileData.email}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default General;