  'use client';
  import { createClient } from '@supabase/supabase-js';
  import React, { useState } from 'react';
  import Link from 'next/link';
  import Image from 'next/image';
  import { Users, ArrowLeft, CircleChevronLeft } from 'lucide-react';
  import toast, { Toaster } from 'react-hot-toast';
  import { motion, AnimatePresence } from 'framer-motion';
  import { useRouter } from 'next/navigation';
  import { log } from 'console';

  // Inisialisasi Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    
    const [poin, setPoin] = useState(0); 
    const [role, setRole] = useState('user'); 
    const [plan, setPlan] = useState('Trial'); 
    const [status, setStatus] = useState('yes'); 
    const [activeToken, setActiveToken] = useState(Math.random().toString(36).substring(2, 15));
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSignUp = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      try {
        // Daftar pengguna
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: email,
          password: password,
        });

        if (signUpError) {
          throw signUpError; // Lempar error Supabase ke blok catch
        }
        
        const userId = signUpData.user.id;

        // Simpan data profil ke tabel 'profiles'
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
          throw insertError; // Lempar error insert ke blok catch
        }

        toast.success(
          'Pendaftaran berhasil! Silakan periksa email Anda untuk verifikasi.',
        );
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);

      } catch (err) {
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
          console.error('Error during sign up:', err);
        }

        setError(errorMessage);
        toast.error(errorMessage);
        
      } finally {
        setLoading(false);
      }
    };

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex h-screen justify-center bg-gray-100 text-gray-900"
      >
        <Toaster position="top-center" reverseOrder={false} />
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative m-0 flex max-w-screen-xl flex-1 justify-center bg-white shadow sm:m-6 sm:rounded-lg overflow-hidden"
        >

          {/* Back button (mobile & tablet only) */}
<div className="absolute left-4 top-4 z-50 lg:hidden">
  <Link href="/harita">
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="p-2 rounded-full"
    >
      <CircleChevronLeft
        size={28}
        className="text-green-700 transition-colors duration-300 ease-in-out hover:text-green-500"
      />
    </motion.div>
  </Link>
</div>

          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center p-4 sm:p-8 lg:w-3/5 xl:w-7/12"
          >
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col items-center"
            >
              <motion.h1 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mb-4 text-xl font-extrabold xl:text-2xl font-inter"
              >
                Daftar
              </motion.h1>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
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
                      className="mb-4 text-center text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-200"
                    >
                      <p className="font-nunito">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  onSubmit={handleSignUp}
                >
                  <div className="space-y-3">
                    {/* Name fields */}
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.3 }}
                      className="grid grid-cols-2 gap-2"
                    >
                      <motion.input
                        whileFocus={{ scale: 1.02, borderColor: "#4ade80" }}
                        transition={{ duration: 0.2 }}
                        className="w-full rounded-lg border border-green-200 bg-white px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-green-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-100 font-nunito"
                        type="text"
                        placeholder="Nama Depan"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <motion.input
                        whileFocus={{ scale: 1.02, borderColor: "#4ade80" }}
                        transition={{ duration: 0.2 }}
                        className="w-full rounded-lg border border-green-200 bg-white px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-green-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-100 font-nunito"
                        type="text"
                        placeholder="Nama Belakang"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </motion.div>

                    {/* Phone */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.4 }}
                    >
                      <motion.input
                        whileFocus={{ scale: 1.02, borderColor: "#4ade80" }}
                        transition={{ duration: 0.2 }}
                        className="w-full rounded-lg border border-green-200 bg-white px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-green-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-100 font-nunito"
                        type="tel"
                        placeholder="Nomor Telepon"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </motion.div>

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
                      />
                    </motion.div>

                    {/* City */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.6 }}
                    >
                      <motion.input
                        whileFocus={{ scale: 1.02, borderColor: "#4ade80" }}
                        transition={{ duration: 0.2 }}
                        className="w-full rounded-lg border border-green-200 bg-white px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-green-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-100 font-nunito"
                        type="text"
                        placeholder="Kota"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </motion.div>

                    {/* Address */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.7 }}
                    >
                      <motion.input
                        whileFocus={{ scale: 1.02, borderColor: "#4ade80" }}
                        transition={{ duration: 0.2 }}
                        className="w-full rounded-lg border border-green-200 bg-white px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-green-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-100 font-nunito"
                        type="text"
                        placeholder="Alamat"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </motion.div>

                    {/* Password */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.8 }}
                    >
                      <motion.input
                        whileFocus={{ scale: 1.02, borderColor: "#4ade80" }}
                        transition={{ duration: 0.2 }}
                        className="w-full rounded-lg border border-green-200 bg-white px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-green-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-100 font-nunito"
                        type="password"
                        placeholder="Kata Sandi"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </motion.div>
                  </div>

                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.9 }}
                    className="flex flex-col gap-1.5"
                  >
                    {/* Register Button */}
                    <motion.button
                      whileHover={{ 
                        scale: 1.02, 
                        y: -2,
                        boxShadow: "0 8px 25px rgba(41, 75, 41, 0.3)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      type="submit"
                      className="focus:shadow-outline mt-5 flex w-full items-center justify-center rounded-lg py-3 font-semibold tracking-wide text-white transition-all duration-300 ease-in-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-inter shadow-lg"
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
                          <span className="text-sm">Mendaftar...</span>
                        </motion.div>
                      ) : (
                        <span className="ml-2 text-sm">Daftar</span>
                      )}
                    </motion.button>

                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 2 }}
                      className=" pt-2 text-sm "
                    >
                      <span className="font-nunito">Sudah punya akun? </span>
                      <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
                        <Link href={'/auth/login'}>
                          <span className="font-bold text-green-700 transition-colors duration-150 ease-out hover:text-green-500 font-nunito">
                            masuk
                          </span>
                        </Link>
                      </motion.span>
                    </motion.div>
                  </motion.div>
                </motion.form>

                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.1 }}
                  className="mt-4 text-center text-xs text-gray-600 font-nunito"
                >
                  Dengan mendaftar, Anda menyetujui{' '}
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

          {/* Right side content */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative hidden flex-1 overflow-hidden lg:flex lg:w-2/5 xl:w-5/12"
          >
            <motion.div
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src="https://assets.ladiestory.id/gallery/1674010062369593176-pandawara-group.jpg"
                alt="Team collaboration background"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute inset-0 bg-black"
            />

            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="relative z-10 flex w-full flex-col items-center justify-center p-8 text-white"
            >
              <div className="max-w-md text-center">
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 1.2,
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
                      <Users className="h-10 w-10 text-white" strokeWidth={1.5} />
                    </motion.div>
                  </div>
                </motion.div>

                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="mb-4 text-2xl font-bold xl:text-3xl font-inter"
                >
                  Selamat Datang di{' '}
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
                  transition={{ duration: 0.6, delay: 1.6 }}
                  className="mb-6 text-base leading-relaxed text-gray-200 xl:text-lg font-nunito"
                >
                  Bergabunglah dan jadikan Harita sebagai solusi digital
                  penanggulan sampah rumah anda sehari-hari
                </motion.p>

                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                  className="border-t border-white border-opacity-20 pt-6"
                >
                  <p className="mb-4 text-sm text-gray-200 font-nunito">
                    Sudah memiliki akun?
                  </p>
                  <Link href="/auth/login">
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
                      Masuk
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }