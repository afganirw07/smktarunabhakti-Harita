'use client';
import { createClient } from '@supabase/supabase-js';
import { Lock, Eye, EyeClosed } from "lucide-react";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password minimal 6 karakter");
      return;
    }
    if (password !== confirm) {
      toast.error("Konfirmasi password tidak sama");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error("Gagal memperbarui password: " + error.message);
      setLoading(false);
      return;
    }

    toast.success("Password berhasil diperbarui!");
    setLoading(false);

    setTimeout(() => {
      router.push("/auth/login");
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md p-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-800 to-green-900 rounded-full mb-4 shadow-lg">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2 font-inter">
            Buat Password Baru
          </h1>
          <p className="text-gray-600 text-sm font-nunito">
            Silakan masukkan password baru Anda
          </p>
        </motion.div>

        <form onSubmit={handleUpdatePassword} className="space-y-6">
          {/* Password Baru */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Password Baru
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 pr-10 bg-white border border-green-200 rounded-lg text-sm font-medium placeholder-gray-400 focus:border-green-800 focus:ring-4 focus:ring-green-100 focus:outline-none font-nunito"
                placeholder="Masukkan password baru"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeClosed className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
              </button>
            </div>
          </div>

          {/* Konfirmasi Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Konfirmasi Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="w-full px-4 py-3 pr-10 bg-white border border-green-200 rounded-lg text-sm font-medium placeholder-gray-400 focus:border-green-800 focus:ring-4 focus:ring-green-100 focus:outline-none font-nunito"
                placeholder="Ulangi password baru"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirm ? <EyeClosed className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
              </button>
            </div>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-800 to-green-900 hover:from-green-900 hover:to-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-200 disabled:opacity-50 disabled:cursor-not-allowed font-inter shadow-lg hover:shadow-xl"
          >
            {loading ? "Menyimpan..." : "Simpan Password Baru"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
