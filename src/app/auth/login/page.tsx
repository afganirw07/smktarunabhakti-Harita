'use client';
import { createClient } from '@supabase/supabase-js';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Leaf } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

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
      toast.error('Login gagal: ' + error.message);
      return;
    }

    router.push('/dashboard'); // Ganti dengan halaman yang sesuai
  };

  return (
    <>
      <div className="flex h-screen justify-center bg-gray-100">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="m-0 flex max-w-screen-xl flex-1 justify-center bg-white shadow sm:m-6 sm:rounded-lg">
          {/* Left side content - Welcome back section */}
          <div className="relative hidden flex-1 overflow-hidden lg:flex lg:w-2/5 xl:w-5/12">
            {/* Background Image */}
            <Image
              src="https://assets.ladiestory.id/gallery/1674010062369593176-pandawara-group.jpg"
              alt="Welcome back background"
              fill
              className="object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Content overlay */}
            <div className="relative z-10 flex w-full flex-col items-center justify-center p-8 text-white">
              <div className="max-w-md text-center">
                {/* Welcome Icon */}
                <div className="mb-6">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white bg-opacity-10 backdrop-blur-sm">
                    <Leaf className="h-10 w-10 text-white" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Welcome Message */}
                <h2 className="mb-4 text-2xl font-bold xl:text-3xl">
                  Selamat Datang Kembali di{' '}
                  <span className="text-green-400">Harita</span>
                </h2>

                <p className="mb-6 text-base leading-relaxed text-gray-200 xl:text-lg">
                  Masuk ke akun Anda dan lanjutkan perjalanan menuju solusi
                  digital pengelolaan sampah yang lebih baik.
                </p>

                {/* Don't have account section */}
                <div className="border-t border-white border-opacity-20 pt-6">
                  <p className="mb-4 text-sm text-gray-200">
                    Belum memiliki akun?
                  </p>
                  <Link href="/auth/register">
                    <button className="rounded-lg bg-white px-8 py-2 font-semibold text-green-700 shadow-lg transition-all duration-300 ease-in-out hover:bg-green-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
                      Daftar Sekarang
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center p-4 sm:p-8 lg:w-3/5 xl:w-7/12">
            <div className="flex flex-col items-center">
              <h1 className="mb-4 text-xl font-extrabold xl:text-2xl">Masuk</h1>

              <div className="w-full max-w-sm">
                {/* Tampilkan pesan error jika ada */}
                {error && (
                  <div className="mb-4 text-center text-sm text-red-500">
                    {error}
                  </div>
                )}

                {/* 3. Bungkus form dengan tag <form> dan tambahkan onSubmit handler */}
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    {/* Email */}
                    <input
                      className="w-full rounded-lg border border-green-200 bg-white px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-green-400 focus:bg-white focus:outline-none"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />

                    {/* Password */}
                    <input
                      className="w-full rounded-lg border border-green-200 bg-white px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-green-400 focus:bg-white focus:outline-none"
                      type="password"
                      placeholder="Kata Sandi"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    {/* Remember me & Forgot password */}
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-gray-600">Ingat saya</span>
                      </label>
                      <Link
                        href="/forgot-password"
                        className="font-medium text-green-700 hover:text-green-800"
                      >
                        Lupa kata sandi?
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    {/* Login Button */}
                    <button
                      type="submit"
                      className="focus:shadow-outline mt-6 flex w-full items-center justify-center rounded-lg py-3 font-semibold tracking-wide text-white transition-all duration-300 ease-in-out hover:opacity-90 focus:outline-none"
                      style={{ backgroundColor: '#294B29' }}
                      disabled={loading} // Nonaktifkan tombol saat loading
                    >
                      <span className="ml-2 text-sm">
                        {loading ? 'Memuat...' : 'Masuk'}
                      </span>
                    </button>
                    <div className="block text-sm lg:hidden ">
                      Belum punya akun?{' '}
                      <Link href={'/auth/register'}>
                        <span className="font-bold text-green-700 transition-colors duration-150 ease-out hover:text-green-500">
                          daftar
                        </span>
                      </Link>
                    </div>
                  </div>
                </form>

                {/* Terms */}
                <p className="mt-4 text-center text-xs text-gray-600">
                  Dengan masuk, Anda menyetujui{' '}
                  <a
                    href="#"
                    className="border-b border-dotted border-green-600 text-green-700"
                  >
                    Syarat & Ketentuan
                  </a>{' '}
                  dan{' '}
                  <a
                    href="#"
                    className="border-b border-dotted border-green-600 text-green-700"
                  >
                    Kebijakan Privasi
                  </a>{' '}
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
