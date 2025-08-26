'use client';
import React, { useState, useEffect } from 'react';
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

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [firstName, setFirstName] = useState('Loading...');
  const [lastName, setLastName] = useState('Loading...');
  const [userEmail, setUserEmail] = useState('Loading...');
  const [userPhone, setUserPhone] = useState('Loading...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserData() {
      setLoading(true);
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error('User not authenticated or error fetching user:', authError?.message);
        setFirstName('Guest');
        setLastName('');
        setUserEmail('N/A');
        setUserPhone('N/A');
        setLoading(false);
        return;
      }

      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('first_name, last_name, email, phone')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching user profile:', profileError.message);
        setFirstName('Guest');
        setLastName('');
        setUserEmail('N/A');
        setUserPhone('N/A');
      } else if (data) {
        setFirstName(data.first_name || 'N/A');
        setLastName(data.last_name || 'N/A');
        setUserEmail(data.email || 'N/A');
        setUserPhone(data.phone || 'N/A');
      }
      setLoading(false);
    }
    getUserData();
  }, []);

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          email: userEmail,
          phone: userPhone,
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating user profile:', error.message);
      } else {
        console.log('Profile updated successfully!');
        closeModal();
      }
    }
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 p-5 dark:border-gray-800 lg:p-6">
        <p className="text-gray-500">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 p-5 dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="font-inter text-lg font-bold text-green-700 lg:mb-6">
            Informasi Pribadi
          </h4>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Nama awal
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Nama akhir
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Alamat email
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {userEmail}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Nomor Handphone
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {userPhone}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-green-800 px-4 py-3 text-sm font-medium text-white  transition-colors duration-200 ease-out hover:bg-green-600 hover:text-green-200 lg:inline-flex lg:w-auto"
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

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="z-50 m-4 max-w-[700px]"
      >
        <div className=" relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 font-inter text-2xl font-semibold  text-green-700">
              Ubah profil anda
            </h4>
            <p className=" font-nunito text-sm text-black/60">
              Perbarui profil anda
            </p>
          </div>
          <form className="flex flex-col">
            <div className=" h-[270px] overflow-y-auto px-2 pb-3">
              <div></div>
              <div className="mt-7">
                <h5 className="mb-5 font-inter text-lg font-medium text-green-700 lg:mb-6">
                  Informasi pribadi
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 font-nunito lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>First Name</Label>
                    <Input
                      type="text"
                      value={firstName}
                      onChange={(e) => handleInputChange(e, setFirstName)}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Last Name</Label>
                    <Input
                      type="text"
                      value={lastName}
                      onChange={(e) => handleInputChange(e, setLastName)}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Email Address</Label>
                    <Input
                      type="text"
                      value={userEmail}
                      onChange={(e) => handleInputChange(e, setUserEmail)}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Phone</Label>
                    <Input
                      type="text"
                      value={userPhone}
                      onChange={(e) => handleInputChange(e, setUserPhone)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Tutup
              </Button>
              <Button size="sm" onClick={handleSave}>
                Simpan Perubahan
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}