'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FaPlus, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

// Inisialisasi Supabase. Pastikan variabel lingkungan sudah diatur.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Klien Supabase, akan null jika variabel lingkungan tidak ada
const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

const TambahAset = () => {
  // State untuk setiap input form
  const [nama, setNama] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');
  const [stock, setStock] = useState('');
  const [status, setStatus] = useState('');
  const [poin, setPoin] = useState('');

  // State untuk UI dan feedback
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  /**
   * Handles the form submission.
   * Prevents default form behavior, validates input, and sends data to Supabase.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cek apakah Supabase sudah terinisialisasi
    if (!supabase) {
      setMessage(
        'Error: Supabase client is not initialized. Check your environment variables.',
      );
      setIsError(true);
      return;
    }

    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      // Validasi input sederhana
      if (!nama || !desc || !img || !stock || !status || !poin) {
        throw new Error('Semua kolom harus diisi.');
      }

      // Masukkan data ke tabel 'aset_barang'
      const { error } = await supabase
        .from('aset_barang')
        .insert([{ nama, desc, img, stock, status, poin }]);

      if (error) {
        throw error;
      }

      setMessage('Data aset berhasil ditambahkan!');
      // Reset form setelah berhasil
      setNama('');
      setDesc('');
      setImg('');
      setStock('');
      setStatus('');
      setPoin('');
    } catch (error) {
      console.error('Error menambahkan data:', error.message);
      setMessage(`Gagal menambahkan data: ${error.message}`);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className=" flex min-h-screen items-center justify-center px-4 py-8 dark:bg-gray-900">
      <div className="w-full max-w-5xl bg-white p-8 ">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
          Tambah Aset Baru
        </h2>

        {/* Status message display */}
        {message && (
          <div
            className={`mb-4 flex items-center rounded-lg p-3 text-sm font-medium ${
              isError
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {isError ? (
              <FaExclamationCircle className="mr-2 h-5 w-5" />
            ) : (
              <FaCheckCircle className="mr-2 h-5 w-5" />
            )}
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* Nama Produk - Span 2 columns */}
            <div className="sm:col-span-2">
              <label
                htmlFor="nama"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Nama Produk
              </label>
              <input
                type="text"
                id="nama"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-800 focus:ring-green-800"
                placeholder="Masukkan nama produk"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
              />
            </div>
            {/* URL Gambar */}
            <div className="w-full">
              <label
                htmlFor="img"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                URL Gambar
              </label>
              <input
                type="text"
                id="img"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-800 focus:ring-green-800"
                placeholder="http://example.com/image.jpg"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                required
              />
            </div>
            {/* Stok */}
            <div className="w-full">
              <label
                htmlFor="stock"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Stok
              </label>
              <input
                type="number"
                id="stock"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-800 focus:ring-green-800"
                placeholder="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>

            {/* Status */}
            <div className="w-full">
              <label
                htmlFor="img"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Status
              </label>
              <select
                id="status"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-800 focus:ring-green-800"
                placeholder="http://example.com/image.jpg"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">Pilih Status</option>
                <option value="Tersedia">Tersedia</option>
                <option value="Tidak Tersedia">Tidak Tersedia</option>
              </select>
            </div>
            {/* Poin */}
            <div className="w-full">
              <label
                htmlFor="stock"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Poin
              </label>
              <input
                type="number"
                id="poin"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-800 focus:ring-green-800"
                placeholder="0"
                value={poin}
                onChange={(e) => setPoin(e.target.value)}
                required
              />
            </div>

            {/* Deskripsi - Span 2 columns */}
            <div className="sm:col-span-2">
              <label
                htmlFor="desc"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Deskripsi
              </label>
              <textarea
                id="desc"
                rows={6 }
                className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-900 focus:ring-green-800"
                placeholder="Tuliskan deskripsi produk di sini"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              ></textarea>
            </div>
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-green-800 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-green-800 sm:mt-6 sm:w-auto "
            disabled={loading}
          >
            {loading ? 'Menyimpan...' : 'Simpan Aset'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default TambahAset;
