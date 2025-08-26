'use client';
import React, { useEffect, useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../ui/modal';
import Button from '../ui/button/Button';
import Input from '../form/input/InputField';
import Label from '../form/Label';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function UserAddressCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [kota, SetKota] = useState('Loading...');
  const [alamat, SetAlamat] = useState('Loading...');

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('user_id');

      if (!userId) {
        console.error('User ID not found in local storage.');
        SetKota('N/A');
        SetAlamat('N/A');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('city, address')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user address:', error);
        SetKota('N/A');
        SetAlamat('N/A');
        return;
      }  else {
        SetKota(data.city);
        SetAlamat(data.address);
      }
    }

    fetchData();
  }, []);


  return (
    <>
      <div className="rounded-2xl border border-gray-200 p-5 dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="font-inter text-lg font-bold text-green-700 lg:mb-6">
              Alamat
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Negara
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Indonesia
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Kota
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {kota}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Alamat Rumah
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {alamat}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
      
    </>
  );
}
