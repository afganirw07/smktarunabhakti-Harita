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
      </div>
    </div>
  );
}