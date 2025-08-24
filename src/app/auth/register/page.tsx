'use client';
import { createClient } from '@supabase/supabase-js';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Inisialisasi Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default function Register() {
  // State untuk setiap input
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  
  const [poin, setPoin] = useState(0); 
  const [role, setRole] = useState('user'); 
  const [plan, setPlan] = useState('trial'); 
  const [status, setStatus] = useState('yes'); 
  const [activeToken, setActiveToken] = useState(Math.random().toString(36).substring(2, 15));
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // LANGKAH 1: COBA DAFTAR DENGAN EMAIL/PASSWORD
      // Supabase secara otomatis akan memeriksa duplikasi email di tabel auth.
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (signUpError) {
        throw signUpError; // Lempar error Supabase ke blok catch
      }
      
      const userId = signUpData.user.id;
      
      // LANGKAH 2: SIMPAN DATA PROFIL KE TABEL 'PROFILES'
      // Ini akan gagal jika ada duplikasi email/alamat di tabel profiles
      // (asumsi kolom tersebut sudah diatur sebagai UNIQUE).
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({ 
          id: userId,
          first_name: firstName,
          last_name: lastName,
          phone: phone,
          email: email,
          city: city,
          address: address,
          point: poin,
          role: role,
          plan: plan,
          status: status,
          active_token: activeToken,
        });

      if (insertError) {
        // Jika insert gagal, hapus akun yang baru dibuat untuk mencegah inkonsistensi
        await supabase.auth.admin.deleteUser(userId);
        throw insertError; // Lempar error insert ke blok catch
      }

      toast.success(
        'Pendaftaran berhasil! Silakan periksa email Anda untuk verifikasi.',
      );
      
    } catch (err) {
      // TANGANI SEMUA ERROR DI SATU BLOK CATCH
      let errorMessage = "Pendaftaran gagal. Silakan coba lagi.";
      
      // Error dari Supabase Auth
      if (err.message.includes('User already registered')) {
        errorMessage = "Email sudah terdaftar. Silakan gunakan email lain.";
      } 
      // Error dari database 'profiles' (karena unique constraint)
      else if (err.message.includes('profiles_address_key')) {
        errorMessage = "Alamat sudah terdaftar. Silakan gunakan alamat lain.";
      }
      // Tambahan: cek untuk duplikasi email di tabel profiles
      else if (err.message.includes('profiles_email_key')) {
        errorMessage = "Email sudah terdaftar. Silakan gunakan email lain.";
      }
      // Error lainnya
      else {
        errorMessage = err.message;
      }

      setError(errorMessage);
      toast.error(errorMessage);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen justify-center bg-gray-100 text-gray-900">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="m-0 flex max-w-screen-xl flex-1 justify-center bg-white shadow sm:m-6 sm:rounded-lg">
        <div className="flex flex-col justify-center p-4 sm:p-8 lg:w-3/5 xl:w-7/12">
          <div className="flex flex-col items-center">
            <h1 className="mb-4 text-xl font-extrabold xl:text-2xl">Daftar</h1>

            <div className="w-full max-w-sm">
              {error && (
                <div className="mb-4 text-center text-sm text-red-500">
                  {error}
                </div>
              )}
              <form onSubmit={handleSignUp}>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      className="w-full rounded-lg border border-green-200 bg-white px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-green-400 focus:bg-white focus:outline-none"
                      type="text"
                      placeholder="Nama Depan"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                      className="w-full rounded-lg border border-green-200 bg-white px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-green-400 focus:bg-white focus:outline-none"
                      type="text"
                      placeholder="Nama Belakang"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  <input
                    className="w-full rounded-lg border border-green-200 bg-white px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-green-400 focus:bg-white focus:outline-none"
                    type="tel"
                    placeholder="Nomor Telepon"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />

                  <input
                    className="w-full rounded-lg border border-green-200 bg-white px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-green-400 focus:bg-white focus:outline-none"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <input
                    className="w-full rounded-lg border border-green-200 bg-white px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-green-400 focus:bg-white focus:outline-none"
                    type="text"
                    placeholder="Kota"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />

                  <input
                    className="w-full rounded-lg border border-green-200 bg-white px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-green-400 focus:bg-white focus:outline-none"
                    type="text"
                    placeholder="Alamat"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />

                  <input
                    className="w-full rounded-lg border border-green-200 bg-white px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-green-400 focus:bg-white focus:outline-none"
                    type="password"
                    placeholder="Kata Sandi"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <button
                    type="submit"
                    className="focus:shadow-outline mt-5 flex w-full items-center justify-center rounded-lg py-3 font-semibold tracking-wide text-white transition-all duration-300 ease-in-out hover:opacity-90 focus:outline-none"
                    style={{ backgroundColor: '#294B29' }}
                    disabled={loading}
                  >
                    <span className="ml-2 text-sm">
                      {loading ? 'Mendaftar...' : 'Daftar'}
                    </span>
                  </button>
                  <div className="block pt-2 text-sm lg:hidden">
                    Sudah punya akun?{' '}
                    <Link href={'/auth/login'}>
                      <span className="font-bold text-green-700 transition-colors duration-150 ease-out hover:text-green-500">
                        masuk
                      </span>
                    </Link>
                  </div>
                </div>
              </form>

              <p className="mt-4 text-center text-xs text-gray-600">
                I agree to abide by Gidy's{' '}
                <a
                  href="#"
                  className="border-b border-dotted border-green-600 text-green-700"
                >
                  Terms of Service
                </a>{' '}
                and its{' '}
                <a
                  href="#"
                  className="border-b border-dotted border-green-600 text-green-700"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right side content */}
        <div className="relative hidden flex-1 overflow-hidden lg:flex lg:w-2/5 xl:w-5/12">
          <Image
            src="https://assets.ladiestory.id/gallery/1674010062369593176-pandawara-group.jpg"
            alt="Team collaboration background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 flex w-full flex-col items-center justify-center p-8 text-white">
            <div className="max-w-md text-center">
              <div className="mb-6">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white bg-opacity-10 backdrop-blur-sm">
                  <Users className="h-10 w-10 text-white" strokeWidth={1.5} />
                </div>
              </div>

              <h2 className="mb-4 text-2xl font-bold xl:text-3xl">
                Selamat Datang di <span className="text-green-400">Harita</span>
              </h2>

              <p className="mb-6 text-base leading-relaxed text-gray-200 xl:text-lg">
                Bergabunglah dan jadikan Harita sebagai Solusi digital
                penanggulan sampah rumah anda sehari hari
              </p>

              <div className="border-t border-white border-opacity-20 pt-6">
                <p className="mb-4 text-sm text-gray-200">
                  Sudah memiliki akun?
                </p>
                <Link href="/auth/login">
                  <button className="rounded-lg bg-white px-8 py-2 font-semibold text-green-700 shadow-lg transition-all duration-300 ease-in-out hover:bg-green-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
                    Masuk
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
