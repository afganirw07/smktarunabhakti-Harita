'use client';

import { useState, useEffect } from 'react';
import Card from 'components/card';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

// Buat instance Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Banner = () => {
  const [userName, setUserName] = useState('Loading...');
  const [userDesc, setUserDesc] = useState('Admin');

  useEffect(() => {
    async function getUserName() {
      // Ambil user_id dari local storage
      const userId = localStorage.getItem('user_id');

      if (!userId) {
        console.error('User ID not found in local storage.');
        setUserName('Guest');
        return;
      }

      // Query data dari tabel 'profiles'
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error.message);
        setUserName('User Not Found');
      } else if (data) {
        setUserName(`${data.first_name} ${data.last_name}`);
      }
    }

    getUserName();
  }, []);

  return (
    <Card extra={'items-center w-full h-full p-[16px] bg-cover'}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-vector/watercolor-emerald-background_23-2150270303.jpg')`,
        }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <Image
            width="87"
            height="87"
            className="h-full w-full rounded-full"
            src="https://i.pinimg.com/564x/f1/b9/13/f1b9133c65ec275f4657dc916abad249.jpg"
            alt="Profile Avatar"
          />
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {userName}
        </h4>
        <h5 className="text-base font-normal text-gray-600">{userDesc}</h5>
      </div>

      {/* Post followers */}
      <div className="mb-3 mt-6 flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-sm font-normal text-gray-600">
            Memimpin dan mengelola proses operasional harian agar berjalan
            efisien. Bertanggung jawab memastikan seluruh sumber daya dan alur
            kerja di lapangan berfungsi optimal.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Banner;
