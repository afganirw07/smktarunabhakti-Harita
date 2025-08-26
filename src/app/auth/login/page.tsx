'use client';
import { createClient } from '@supabase/supabase-js';
import { CircleChevronLeft } from "lucide-react"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Leaf } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default function Login() {
  // Use state hooks for form data and loading/error states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // try login
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      // cek
      if (authError) {
        setError(authError.message);
        toast.error('Login gagal: ' + authError.message);
        setLoading(false);
        return;
      }

      const userId = authData.user.id;
      const accessToken = authData.session.access_token;
      const refreshToken = authData.session.refresh_token;

      // Store tokens in localStorage
      localStorage.setItem('supabase_access_token', accessToken);
      localStorage.setItem('supabase_refresh_token', refreshToken);
      localStorage.setItem('user_id', userId);

      // get tabel
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role', 'active_token')
        .eq('id', userId)
        .single();
      
        // if not found
      if (profileError) {
        if (profileError.code === 'PGRST116') {
          setError('Profil pengguna tidak ditemukan. Silakan hubungi admin untuk aktivasi akun.');
          toast.error('Profil tidak ditemukan. Hubungi admin.');
        } else {
          setError('Terjadi kesalahan saat mengambil data profil.');
          toast.error('Terjadi kesalahan saat mengambil data profil.');
        }
        setLoading(false);
        return;
      }
      
      const userRole = profileData.role;
      const activeToken = profileData.active_token;

      // Store additional user data in localStorage
      localStorage.setItem('user_role', userRole);
      localStorage.setItem('user_email', email);
      if (activeToken) {
        localStorage.setItem('active_token', activeToken);
      }

      setLoading(false);
      
      if (userRole === 'admin') {
        toast.success('Login berhasil! Selamat datang, Admin!');
        setTimeout(() => {
          router.push('/admin/default');
        }, 1000);
      } else if (userRole === 'user') {
        toast.success('Login berhasil! Selamat datang!');
        setTimeout(() => {
          router.push('/user/home');
        }, 1000);
      } else {
        // Fallback for an unknown role
        console.warn('Unknown role:', userRole, 'defaulting to user homepage');
        toast.error('Pengguna tidak dikenali.');
      }

    } catch (error) {
      console.error('Unexpected error during login:', error);
      setError('Terjadi kesalahan yang tidak terduga. Silakan coba lagi.');
      toast.error('Terjadi kesalahan yang tidak terduga.');
      setLoading(false);
    }
  };

  // Helper function for navigation, simplified for clarity
  const navigateToLupaPassword = () => {
    router.push('/lupa-password');
  }

  return (
    <div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex h-screen justify-center bg-gray-100 font-inter"
      >
        <Toaster position="top-center" reverseOrder={false} />
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative m-0 flex max-w-screen-xl flex-1 justify-center bg-white shadow sm:m-6 sm:rounded-lg overflow-hidden"
        >
          {/* Left side content - Welcome back section */}
          <div className="flex-1 hidden lg:flex lg:w-2/5 xl:w-5/12 relative overflow-hidden">
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative hidden flex-1 overflow-hidden lg:flex lg:w-2/5 xl:w-5/12"
            >
              {/* Background Image */}
              <motion.div
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Link href={'/harita'}>
                  <div className='absolute left-6 top-6 z-50 cursor-pointer '> 
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CircleChevronLeft
                        width={30}
                        height={30}
                        className='stroke-white hover:stroke-green-400 transition-all duration-300 ease-out z-50 '
                      />
                    </motion.div>
                  </div>
                </Link>
                <Image
                  src="https://assets.ladiestory.id/gallery/1674010062369593176-pandawara-group.jpg"
                  alt="Welcome back background"
                  fill
                  className="object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
              </motion.div>
              
              {/* Dark overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute inset-0 bg-black"
              />

              {/* Content overlay */}
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="relative z-10 flex w-full flex-col items-center justify-center p-8 text-white"
              >
                <div className="max-w-md text-center">
                  {/* Welcome Icon */}
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 1,
                      type: "spring",
                      stiffness: 200 
                    }}
                    className="mb-6"
                  >
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white bg-opacity-10 backdrop-blur-sm">
                      <motion.div
                        animate={{ 
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 2
                        }}
                      >
                        <Leaf className="h-10 w-10 text-white" strokeWidth={1.5} />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Welcome Message */}
                  <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="mb-4 text-2xl font-bold xl:text-3xl font-inter"
                  >
                    Selamat Datang Kembali di{' '}
                    <motion.span 
                      animate={{ 
                        color: ["#4ade80", "#22c55e", "#16a34a", "#4ade80"]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-green-400"
                    >
                      Harita
                    </motion.span>
                  </motion.h2>

                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    className="mb-6 text-base leading-relaxed text-gray-200 xl:text-lg font-nunito"
                  >
                    Masuk ke akun Anda dan lanjutkan perjalanan menuju solusi
                    digital pengelolaan sampah yang lebih baik.
                  </motion.p>

                  {/* Don't have account section */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.6 }}
                    className="border-t border-white border-opacity-20 pt-6"
                  >
                    <p className="mb-4 text-sm text-gray-200 font-nunito">
                      Belum memiliki akun?
                    </p>
                    <Link href="/auth/register">
                      <motion.button 
                        whileHover={{ 
                          scale: 1.05, 
                          y: -2,
                          boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-lg bg-white px-8 py-2 font-semibold text-green-700 shadow-lg transition-all duration-300 ease-in-out hover:bg-green-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 font-inter"
                      >
                        Daftar Sekarang
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col justify-center p-4 sm:p-8 lg:w-3/5 xl:w-7/12"
          >
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col items-center"
            >
              <motion.h1 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="mb-4 text-xl font-extrabold xl:text-2xl font-inter"
              >
                Masuk
              </motion.h1>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="w-full max-w-sm"
              >
                {/* Error message with animation */}
                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 text-center text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-200 font-nunito"
                    >
                      <p>{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Back button (mobile & tablet only) */}
<div className="absolute left-4 top-4 z-50 lg:hidden">
  <Link href="/harita">
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="p-2 rounded-fullshadow-md"
    >
      <CircleChevronLeft
        size={28}
        className="text-green-700 transition-colors duration-300 ease-in-out hover:text-green-500"
      />
    </motion.div>
  </Link>
</div>


                {/* Form with staggered animations */}
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  onSubmit={handleLogin}
                >
                  <div className="space-y-4">
                    {/* Email */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.5 }}
                    >
                      <motion.input
                        whileFocus={{ scale: 1.02, borderColor: "#4ade80" }}
                        transition={{ duration: 0.2 }}
                        className="w-full rounded-lg border border-green-200 bg-white px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-green-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-100 font-nunito"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </motion.div>

                    {/* Password */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.6 }}
                    >
                      <motion.input
                        whileFocus={{ scale: 1.02, borderColor: "#4ade80" }}
                        transition={{ duration: 0.2 }}
                        className="w-full rounded-lg border border-green-200 bg-white px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-green-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-100 font-nunito"
                        type="password"
                        placeholder="Kata Sandi"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </motion.div>

                    {/* Remember me & Forgot password */}
                    <motion.div 
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.7 }}
                      className="flex items-center justify-between text-sm"
                    >
                      <motion.label 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="mr-2 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-gray-600 font-nunito">Ingat saya</span>
                      </motion.label>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                      >
                        <Link
                          href="/auth/lupa-password"
                          className="font-medium text-green-700 hover:text-green-800 transition-colors duration-200 font-nunito"
                        >
                          Lupa kata sandi?
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>

                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.8 }}
                    className="flex flex-col gap-1.5"
                  >
                    {/* Login Button */}
                    <motion.button
                      whileHover={{ 
                        scale: 1.02, 
                        y: -2,
                        boxShadow: "0 8px 25px rgba(41, 75, 41, 0.3)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      type="submit"
                      className="focus:shadow-outline mt-6 flex w-full items-center justify-center rounded-lg py-3 font-semibold tracking-wide text-white transition-all duration-300 ease-in-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-inter shadow-lg"
                      style={{ backgroundColor: '#294B29' }}
                      disabled={loading}
                    >
                      {loading ? (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center"
                        >
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"
                          />
                          <span className="text-sm">Memuat...</span>
                        </motion.div>
                      ) : (
                        <span className="ml-2 text-sm">Masuk</span>
                      )}
                    </motion.button>

                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.9 }}
                      className="block text-sm lg:hidden"
                    >
                      <span className="font-nunito">Belum punya akun? </span>
                      <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
                        <Link href={'/auth/register'}>
                          <span className="font-bold text-green-700 transition-colors duration-150 ease-out hover:text-green-500 font-nunito">
                            daftar
                          </span>
                        </Link>
                      </motion.span>
                    </motion.div>
                  </motion.div>
                </motion.form>

                {/* Terms */}
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2 }}
                  className="mt-4 text-center text-xs text-gray-600 font-nunito"
                >
                  Dengan masuk, Anda menyetujui{' '}
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    href="#"
                    className="border-b border-dotted border-green-600 text-green-700 transition-colors duration-200 hover:text-green-800"
                  >
                    Syarat & Ketentuan
                  </motion.a>{' '}
                  dan{' '}
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    href="#"
                    className="border-b border-dotted border-green-600 text-green-700 transition-colors duration-200 hover:text-green-800"
                  >
                    Kebijakan Privasi
                  </motion.a>{' '}
                  Harita
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
