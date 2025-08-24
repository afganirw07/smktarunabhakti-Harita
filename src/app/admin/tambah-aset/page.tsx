'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Inisialisasi Supabase
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

const TambahAset = () => {
    // State untuk setiap input
    const [nama, setNama] = useState('');
    const [desc, setDesc] = useState('');
    const [img, setImg] = useState('');
    const [stock, setStock] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setIsError(false);

        try {
            // Validasi input
            if (!nama || !desc || !img || !stock || !status) {
                throw new Error('Semua kolom harus diisi.');
            }

            // Masukkan data ke tabel aset_barang
            const { data, error } = await supabase.from('aset_barang').insert([
                {
                    nama: nama,
                    desc: desc,
                    img: img,
                    stock: stock,
                    status: status,
                },
            ]);

            if (error) {
                throw error;
            }

            setMessage('Data aset berhasil ditambahkan!');
            // Reset form
            setNama('');
            setDesc('');
            setImg('');
            setStock('');
            setStatus('');
        } catch (error) {
            console.error('Error menambahkan data:', error.message);
            setMessage(`Gagal menambahkan data: ${error.message}`);
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
                    Tambah Aset Baru
                </h2>

                {/* Pesan status */}
                {message && (
                    <div
                        className={`mb-4 rounded-md p-3 text-sm ${isError
                                ? 'bg-red-100 text-red-700'
                                : 'bg-green-100 text-green-700'
                            }`}
                    >
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            className="mb-1 block text-sm font-medium text-gray-700"
                            htmlFor="nama"
                        >
                            Nama Produk
                        </label>
                        <input
                            type="text"
                            id="nama"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label
                            className="mb-1 block text-sm font-medium text-gray-700"
                            htmlFor="desc"
                        >
                            Deskripsi
                        </label>
                        <textarea
                            id="desc"
                            rows="3"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label
                            className="mb-1 block text-sm font-medium text-gray-700"
                            htmlFor="img"
                        >
                            URL Gambar
                        </label>
                        <input
                            type="text"
                            id="img"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={img}
                            onChange={(e) => setImg(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label
                            className="mb-1 block text-sm font-medium text-gray-700"
                            htmlFor="stock"
                        >
                            Stok
                        </label>
                        <input
                            type="number"
                            id="stock"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label
                            className="mb-1 block text-sm font-medium text-gray-700"
                            htmlFor="status"
                        >
                            Status
                        </label>
                        <select
                            id="status"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option value="">Pilih Status</option>
                            <option value="Tersedia">tersedia</option>
                            <option value="Tidak Tersedia">habis</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        disabled={loading}
                    >
                        {loading ? 'Menyimpan...' : 'Simpan Aset'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TambahAset;
