'use client';
import { createClient } from '@supabase/supabase-js';
import { CircleChevronLeft, Mail, ArrowLeft } from "lucide-react"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default function LupaPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const router = useRouter();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      toast.error('Gagal mengirim email: ' + error.message);
      return;
    }

    setIsEmailSent(true);
    setLoading(false);
    toast.success('Link reset password telah dikirim ke email Anda');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex w-full items-center justify-center p-4"
      >
        <div className="w-full max-w-md">
         
          {/* Main card */}
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-shadow duration-300"
          >
            <AnimatePresence mode="wait">
              {!isEmailSent ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Header */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center mb-8"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
                      className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-800 to-green-900 rounded-full mb-4 shadow-lg"
                    >
                      <motion.div
                        animate={{ 
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                      >
                        <Mail className="h-8 w-8 text-white" />
                      </motion.div>
                    </motion.div>
                    <motion.h1 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="text-2xl font-bold text-gray-900 mb-2 font-inter"
                    >
                      Lupa Kata Sandi?
                    </motion.h1>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="text-gray-600 text-sm leading-relaxed font-nunito"
                    >
                      Jangan khawatir! Masukkan email Anda untuk konfirmasi perubahan sandi anda
                    </motion.p>
                  </motion.div>

                  {/* Error message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <p className="text-sm text-red-600 font-nunito">{error}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Form */}
                  <motion.form 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    onSubmit={handleResetPassword} 
                    className="space-y-6"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                        Alamat Email
                      </label>
                      <motion.div 
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className="relative"
                      >
                        <input
                          id="email"
                          type="email"
                          placeholder="Masukkan alamat email Anda"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-4 py-3 bg-white border border-green-200 rounded-lg text-sm font-medium placeholder-gray-400 focus:border-green-800 focus:ring-4 focus:ring-green-100 focus:outline-none transition-all duration-200 font-nunito"
                        />
                        <motion.div
                          animate={{
                            x: email ? 0 : [0, 2, -2, 0],
                          }}
                          transition={{
                            duration: 0.5,
                            repeat: email ? 0 : Infinity,
                            repeatDelay: 3
                          }}
                        >
                          <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    {/* Submit button */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-green-800 to-green-900 hover:from-green-900 hover:to-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-200 disabled:opacity-50 disabled:cursor-not-allowed font-inter shadow-lg hover:shadow-xl"
                    >
                      {loading ? (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center justify-center"
                        >
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"
                          />
                          <span>Mengirim...</span>
                        </motion.div>
                      ) : (
                        'Kirim Link Reset Password'
                      )}
                    </motion.button>
                  </motion.form>
                </motion.div>
              ) : (
                /* Success state */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-800 to-green-900 rounded-full mb-6 shadow-lg"
                  >
                    <motion.div
                      initial={{ rotate: 0, scale: 1 }}
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    >
                      <Mail className="h-8 w-8 text-white" />
                    </motion.div>
                  </motion.div>
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-2xl font-bold text-gray-900 mb-4 font-inter"
                  >
                    Email Terkirim!
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-gray-600 text-sm leading-relaxed mb-6 font-nunito"
                  >
                    Kami telah mengirimkan link reset password ke{' '}
                    <motion.span 
                      initial={{ backgroundColor: "transparent" }}
                      animate={{ backgroundColor: ["transparent", "#dcfce7", "transparent"] }}
                      transition={{ duration: 2, delay: 0.5 }}
                      className="font-semibold text-green-800"
                    >
                      {email}
                    </motion.span>
                    <br />
                    Silakan cek email Anda dan ikuti instruksi yang diberikan.
                  </motion.p>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
                  >
                    <p className="text-sm text-green-800 font-nunito">
                      <strong>Tidak menerima email?</strong> Cek folder spam/junk Anda, 
                      atau coba kirim ulang setelah beberapa menit.
                    </p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="space-y-3"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsEmailSent(false)}
                      className="w-full bg-green-100 hover:bg-green-200 text-green-800 font-semibold py-3 px-4 rounded-lg transition-all duration-200 font-inter shadow-md hover:shadow-lg"
                    >
                      Kirim Ulang Email
                    </motion.button>
                    <motion.div
                      whileHover={{ y: -1 }}
                    >
                      <Link 
                        href="/auth/login"
                        className="block w-full text-center text-green-800 hover:text-green-900 font-medium py-2 transition-colors duration-200 font-nunito"
                      >
                        Kembali ke Login
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 pt-6 border-t border-gray-200 text-center"
            >
              <p className="text-xs text-gray-500 font-nunito">
                Ingat kata sandi Anda?{' '}
                <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
                  <Link 
                    href="/auth/login"
                    className="font-medium text-green-800 hover:text-green-900 transition-colors duration-200"
                  >
                    Masuk di sini
                  </Link>
                </motion.span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}