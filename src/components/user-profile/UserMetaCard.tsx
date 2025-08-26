'use client';
import React, { useState, useEffect } from 'react';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../ui/modal';
import Button from '../ui/button/Button';
import Input from '../form/input/InputField';
import Label from '../form/Label';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

// Buat instance Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function UserMetaCard() {
  const { isOpen, openModal, closeModal } = useModal();
  
  // State untuk data yang ditampilkan
  const [userName, setUserName] = useState('Loading...');
  const [userPlan, setUserPlan] = useState('Loading...');
  const [userCity, setUserCity] = useState('Loading...');
  const [userAddress, setUserAddress] = useState('Loading...');
  const [email, setEmail] = useState('Loading...');
  const [phone, setPhone] = useState('Loading...');

  const [initialForm, setInitialForm] = useState({
  firstName: '',
  lastName: '',
  plan: '',
  city: '',
  address: '',
  email: '',
  phone: ''
});
  
  // State untuk form edit
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    plan: '',
    city: '',
    address: '',
    email: '',
    phone: ''
  });
  
  // State untuk loading dan error
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    setIsLoading(true);
    setError('');
    
    try {
      // Ambil user_id dari local storage
      const userId = localStorage.getItem('user_id');

      if (!userId) {
        throw new Error('User ID tidak ditemukan. Silakan login kembali.');
      }

      // Query data dari tabel 'profiles'
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name, plan, city, address, email, phone')
        .eq('id', userId)
        .single();

      if (error) {
        throw new Error(`Gagal mengambil data: ${error.message}`);
      }

      if (data) {
        const fullName = `${data.first_name || ''} ${data.last_name || ''}`.trim();
        
        // Update state untuk tampilan
        setUserName(fullName || 'Guest');
        setUserPlan(data.plan || 'N/A');
        setUserCity(data.city || 'N/A');
        setUserAddress(data.address || 'N/A');
        setEmail(data.email || 'N/A');
        setPhone(data.phone || 'N/A');

        // Update state untuk form edit
        setEditForm({
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          plan: data.plan || '',
          city: data.city || '',
          address: data.address || '',
          email: data.email || '',
          phone: data.phone || ''
        });
      }
    } catch (err) {
      console.error('Error fetching user data:', err.message);
      setError(err.message);
      setUserName('Guest');
      setUserPlan('N/A');
      setUserCity('N/A');
      setUserAddress('N/A');
      setEmail('N/A');
      setPhone('N/A');
    } finally {
      setIsLoading(false);
    }
  }

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSave = async () => {
    if (!hasChanges()) {
      setSuccess('Tidak ada perubahan yang disimpan.');
      return;
    }
    setIsSaving(true);
    setError('');
    setSuccess('');
    
    try {
      const userId = localStorage.getItem('user_id');
      
      if (!userId) {
        throw new Error('User ID tidak ditemukan. Silakan login kembali.');
      }

      // Validasi input
      if (!editForm.firstName.trim()) {
        throw new Error('Nama awal tidak boleh kosong.');
      }

      // Update data ke Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: editForm.firstName.trim(),
          last_name: editForm.lastName.trim(),
          city: editForm.city.trim(),
          address: editForm.address.trim(),
          email: editForm.email.trim(),
          phone: editForm.phone.trim()
        })
        .eq('id', userId);

      if (error) {
        throw new Error(`Gagal menyimpan perubahan: ${error.message}`);
      }

      // Update tampilan dengan data baru
      const fullName = `${editForm.firstName.trim()} ${editForm.lastName.trim()}`.trim();
      setUserName(fullName);
      setUserCity(editForm.city.trim() || 'N/A');
      setUserAddress(editForm.address.trim() || 'N/A');
      setEmail(editForm.email.trim() || 'N/A');
      setPhone(editForm.phone.trim() || 'N/A');

      setSuccess('Profil berhasil diperbarui!');
      
      // Tutup modal setelah 1.5 detik
      setTimeout(() => {
        closeModal();
        setSuccess('');
      }, 1500);

    } catch (err) {
      console.error('Error saving user data:', err.message);
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleModalOpen = () => {
    // Reset messages ketika modal dibuka
    setInitialForm({ ...editForm})
    setError('');
    setSuccess('');
    openModal();
  };

  const hasChanges = () => {
  return JSON.stringify(initialForm) !== JSON.stringify(editForm);
};

  const handleModalClose = () => {
    // Reset messages ketika modal ditutup
    setError('');
    setSuccess('');
    closeModal();
  };

  return (
    <>
      <div className="rounded-2xl border border-gray-200 p-5 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex w-full flex-col items-center gap-6 xl:flex-row">
            <div className="h-20 w-20 overflow-hidden rounded-full border border-gray-200">
              <Image
                width={80}
                height={80}
                src="/images/user/owner.jpg"
                alt="user"
              />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-center text-lg font-bold text-green-700 xl:text-left">
                {userName}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-green-500">
                  {userPlan.charAt(0).toUpperCase() + userPlan.slice(1)}
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-green-500">
                  {userCity !== 'N/A' ? userCity : ''}
                  {userCity !== 'N/A' && userAddress !== 'N/A' ? ', ' : ''}
                  {userAddress !== 'N/A' ? userAddress : ''}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={handleModalOpen}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-green-800 px-4 py-3 text-sm font-medium text-white transition-colors duration-200 ease-out hover:bg-green-600 hover:text-green-200 disabled:opacity-50 disabled:cursor-not-allowed lg:inline-flex lg:w-auto"
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
            {isLoading ? 'Loading...' : 'Edit'}
          </button>
        </div>
        
        {/* Error message untuk fetch data */}
        {error && !isOpen && (
          <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3">
            <p className="text-sm text-red-600">{error}</p>
            <button
              onClick={getUserData}
              className="mt-2 text-sm text-red-700 hover:text-red-800 underline"
            >
              Coba lagi
            </button>
          </div>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={handleModalClose} className="m-4 max-w-[700px]">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 font-inter text-2xl font-semibold text-green-700">
              Ubah informasi anda
            </h4>
            <p className="font-nunito text-sm text-black/60">
              Perbarui profil anda
            </p>
          </div>

          {/* Messages */}
          {error && (
            <div className="mx-2 mt-4 rounded-lg bg-red-50 border border-red-200 p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="mx-2 mt-4 rounded-lg bg-gray-50 border border-gray-200 p-3">
              <p className="text-sm text-gray-600">{success}</p>
            </div>
          )}

          <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
            <div className="h-[270px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <h5 className="mb-5 font-inter text-lg font-medium text-green-700 lg:mb-6">
                  Informasi Pribadi
                </h5>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 font-nunito lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Nama Awal *</Label>
                    <Input
                      type="text"
                      value={editForm.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Masukkan nama awal"
                      disabled={isSaving}
                      required
                    />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Nama Akhir</Label>
                    <Input
                      type="text"
                      value={editForm.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Masukkan nama akhir"
                      disabled={isSaving}
                    />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Kota</Label>
                    <Input
                      type="text"
                      value={editForm.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Masukkan kota"
                      disabled={isSaving}
                    />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Email</Label>
                    <Input
                      type="text"
                      value={editForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Masukkan email"
                      disabled={isSaving}
                    />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Nomer</Label>
                    <Input
                      type="text"
                      value={editForm.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Masukkan nomer telepon"
                      disabled={isSaving}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Alamat Lengkap</Label>
                    <textarea
                      className="h-24 w-full resize-none rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      value={editForm.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Masukkan alamat lengkap"
                      disabled={isSaving}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={handleModalClose}
                disabled={isSaving}
              >
                Tutup
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
                className={(!hasChanges() || isSaving) ? 'opacity-50 cursor-not-allowed' : ''}
              >
                {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}