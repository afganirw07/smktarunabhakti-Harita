
"use client"
import { createClient } from '@supabase/supabase-js';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          phone: phone,
          city: city,
          address: address,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      alert('Pendaftaran berhasil! Silakan periksa email Anda untuk verifikasi.');
      // Redirect atau navigasi ke halaman lain
    }
    
    setLoading(false);
  };

  return (
    <div className="h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-6 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        
        <div className="lg:w-3/5 xl:w-7/12 p-4 sm:p-8 flex flex-col justify-center">
          <div className="flex flex-col items-center">
            <h1 className="text-xl xl:text-2xl font-extrabold mb-4">Daftar</h1>

            <div className="w-full max-w-sm">
              {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}
              <form onSubmit={handleSignUp}> {/* 3. Tambahkan tag form */}
                <div className="space-y-3">
                  {/* ... Input Fields ... */}
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-white border border-green-200 placeholder-gray-500 text-sm focus:outline-none focus:border-green-400 focus:bg-white"
                      type="text"
                      placeholder="Nama Depan"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)} // Tambahkan onChange handler
                    />
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-white border border-green-200 placeholder-gray-500 text-sm focus:outline-none focus:border-green-400 focus:bg-white"
                      type="text"
                      placeholder="Nama Belakang"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-white border border-green-200 placeholder-gray-500 text-sm focus:outline-none focus:border-green-400 focus:bg-white"
                    type="tel"
                    placeholder="Nomor Telepon"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-white border border-green-200 placeholder-gray-500 text-sm focus:outline-none focus:border-green-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-white border border-green-200 placeholder-gray-500 text-sm focus:outline-none focus:border-green-400 focus:bg-white"
                    type="text"
                    placeholder="Kota"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-white border border-green-200 placeholder-gray-500 text-sm focus:outline-none focus:border-green-400 focus:bg-white"
                    type="text"
                    placeholder="Alamat"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-white border border-green-200 placeholder-gray-500 text-sm focus:outline-none focus:border-green-400 focus:bg-white"
                    type="password"
                    placeholder="Kata Sandi"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <button 
                    type="submit" 
                    className="mt-5 tracking-wide font-semibold text-white w-full py-3 rounded-lg hover:opacity-90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" 
                    style={{backgroundColor: '#294B29'}}
                    disabled={loading}
                  >
                    <span className="ml-2 text-sm">
                      {loading ? 'Mendaftar...' : 'Daftar'}
                    </span>
                  </button>
                  <div className="block pt-2 lg:hidden text-sm">Sudah punya akun? <Link href={"/auth/login"}><span className="font-bold text-green-700 hover:text-green-500 transition-colors duration-150 ease-out">masuk</span></Link></div>
                </div>
              </form>
              
              {/* ... Bagian Terms ... */}
              <p className="mt-4 text-xs text-gray-600 text-center">
                I agree to abide by Gidy's{" "}
                <a href="#" className="border-b border-green-600 border-dotted text-green-700">
                  Terms of Service
                </a>{" "}
                and its{" "}
                <a href="#" className="border-b border-green-600 border-dotted text-green-700">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right side content */}
        <div className="flex-1 hidden lg:flex lg:w-2/5 xl:w-5/12 relative overflow-hidden">
          <Image
            src="https://assets.ladiestory.id/gallery/1674010062369593176-pandawara-group.jpg"
            alt="Team collaboration background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 flex flex-col justify-center items-center p-8 text-white w-full">
            <div className="max-w-md text-center">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-white bg-opacity-10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Users className="w-10 h-10 text-white" strokeWidth={1.5} />
                </div>
              </div>
              
              <h2 className="text-2xl xl:text-3xl font-bold mb-4">
                Selamat Datang di <span className="text-green-400">Harita</span> 
              </h2>
              
              <p className="text-gray-200 text-base xl:text-lg mb-6 leading-relaxed">
                Bergabunglah dan jadikan Harita sebagai Solusi digital penanggulan sampah rumah anda sehari hari
              </p>
              
              <div className="border-t border-white border-opacity-20 pt-6">
                <p className="text-gray-200 text-sm mb-4">
                  Sudah memiliki akun?
                </p>
                <Link href="/auth/login">
                  <button className="bg-white text-green-700 font-semibold py-2 px-8 rounded-lg hover:bg-green-800 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 shadow-lg">
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