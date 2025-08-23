"use client"
import { createClient } from '@supabase/supabase-js';
import { CircleChevronLeft } from "lucide-react"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Leaf } from 'lucide-react';
import { useRouter } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Login() {
  // 1. Tambahkan state untuk mengelola data formulir dan status
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  // 2. Buat fungsi untuk menangani login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Login berhasil, arahkan pengguna ke halaman lain
    router.push('/dashboard'); // Ganti dengan halaman yang sesuai
  };

  return (
    <>
      <div className="h-screen bg-gray-100 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-6 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          
          {/* Left side content - Welcome back section */}
          <div className=" flex-1 hidden lg:flex lg:w-2/5 xl:w-5/12 relative overflow-hidden">
            {/* Background Image */}
            <Image
              src="https://assets.ladiestory.id/gallery/1674010062369593176-pandawara-group.jpg"
              alt="Welcome back background"
              fill
              className="object-cover"
            />

            <Link href={'/harita'}>
            <div className='absolute left-6 top-6 z-40 cursor-pointer '> 
              <CircleChevronLeft
              width={30}
              height={30}
              className='stroke-white hover:stroke-green-600 transition-all duration-300 ease-out'
              />
            </div>
            </Link>
            
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            
            {/* Content overlay */}
            <div className="relative z-10 flex flex-col justify-center items-center p-8 text-white w-full">
              <div className="max-w-md text-center">
                {/* Welcome Icon */}
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto bg-white bg-opacity-10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Leaf className="w-10 h-10 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                
                {/* Welcome Message */}
                <h2 className="text-2xl xl:text-3xl font-bold mb-4">
                  Selamat Datang Kembali di <span className="text-green-400">Harita</span>
                </h2>
                
                <p className="text-gray-200 text-base xl:text-lg mb-6 leading-relaxed">
                  Masuk ke akun Anda dan lanjutkan perjalanan menuju solusi digital pengelolaan sampah yang lebih baik.
                </p>
                
                {/* Don't have account section */}
                <div className="border-t border-white border-opacity-20 pt-6">
                  <p className="text-gray-200 text-sm mb-4">
                    Belum memiliki akun?
                  </p>
                  <Link href="/auth/register">
                    <button className="bg-white text-green-700 font-semibold py-2 px-8 rounded-lg hover:bg-green-800 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 shadow-lg">
                      Daftar Sekarang
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5 xl:w-7/12 p-4 sm:p-8 flex flex-col justify-center">
            <div className="flex flex-col items-center">
              <h1 className="text-xl xl:text-2xl font-extrabold mb-4">Masuk</h1>
              
              <div className="w-full max-w-sm">
                {/* Tampilkan pesan error jika ada */}
                {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

                {/* 3. Bungkus form dengan tag <form> dan tambahkan onSubmit handler */}
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    {/* Email */}
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-white border border-green-200 placeholder-gray-500 text-sm focus:outline-none focus:border-green-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    
                    {/* Password */}
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-white border border-green-200 placeholder-gray-500 text-sm focus:outline-none focus:border-green-400 focus:bg-white"
                      type="password"
                      placeholder="Kata Sandi"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    
                    {/* Remember me & Forgot password */}
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2 text-green-600 focus:ring-green-500" />
                        <span className="text-gray-600">Ingat saya</span>
                      </label>
                      <Link href="/forgot-password" className="text-green-700 hover:text-green-800 font-medium">
                        Lupa kata sandi?
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    {/* Login Button */}
                    <button 
                      type="submit"
                      className="mt-6 tracking-wide font-semibold text-white w-full py-3 rounded-lg hover:opacity-90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" 
                      style={{backgroundColor: '#294B29'}}
                      disabled={loading} // Nonaktifkan tombol saat loading
                    >
                      <span className="ml-2 text-sm">
                        {loading ? 'Memuat...' : 'Masuk'}
                      </span>
                    </button>
                    <div className="block lg:hidden text-sm ">Belum punya akun? <Link href={"/auth/register"}><span className="font-bold text-green-700 hover:text-green-500 transition-colors duration-150 ease-out">daftar</span></Link></div>
                  </div>
                </form>

                {/* Terms */}
                <p className="mt-4 text-xs text-gray-600 text-center">
                  Dengan masuk, Anda menyetujui{" "}
                  <a href="#" className="border-b border-green-600 border-dotted text-green-700">
                    Syarat & Ketentuan
                  </a>{" "}
                  dan{" "}
                  <a href="#" className="border-b border-green-600 border-dotted text-green-700">
                    Kebijakan Privasi
                  </a>{" "}
                  Harita
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}