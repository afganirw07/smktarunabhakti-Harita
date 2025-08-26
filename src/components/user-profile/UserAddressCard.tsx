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

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving changes...');
    closeModal();
  };
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

          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-green-800 px-4 py-3 text-sm font-medium text-white  transition-colors duration-200 ease-out hover:bg-green-600 hover:text-green-200 lg:inline-flex lg:w-auto"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                fill=""
              />
            </svg>
            Edit
          </button>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="m-4 max-w-[700px] "
      >
        <div className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 font-inter text-2xl font-semibold text-green-700">
              Ubah alamat
            </h4>
            <p className="mb-6 font-nunito text-sm text-black/60">
              Perbarui profil anda
            </p>
          </div>
          <form className="flex flex-col font-nunito">
            <div className="custom-scrollbar overflow-y-auto px-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Negara</Label>
                  <Input type="text" defaultValue="United States" />
                </div>

                <div>
                  <Label>Kota</Label>
                  <Input type="text" defaultValue="Arizona, United States." />
                </div>

                <div>
                  <Label>Kode Pos</Label>
                  <Input type="text" defaultValue="ERT 2489" />
                </div>

                <div>
                  <Label>Alamat Rumah</Label>
                  <Input type="text" defaultValue="AS4568384" />
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
