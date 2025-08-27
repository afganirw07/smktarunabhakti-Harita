'use client';

import { CoinsIcon, Minus, Plus, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Swal from 'sweetalert2';

// Inisialisasi Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  stock: number;
  price: number;
  imageUrl: string;
}

export default function ProductCard({
  id,
  title,
  description,
  stock,
  price,
  imageUrl,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const increment = () => {
    if (quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const handleRedeem = async () => {
    if (!supabase) {
      Swal.fire('Error', 'Supabase client tidak terinisialisasi.', 'error');
      return;
    }

    if (!userId || userId === 'undefined') {
      Swal.fire(
        'Error',
        'User ID tidak ditemukan. Harap login ulang.',
        'error',
      );
      return;
    }

    if (!id || id === 'undefined') {
      Swal.fire('Error', 'Produk tidak valid.', 'error');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Ambil data user
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('point, first_name')
        .eq('id', userId)
        .single();

      if (userError) throw new Error(userError.message);

      const totalCost = quantity * price;

      // 2. Cek poin user
      if (userData.point < totalCost) {
        Swal.fire(
          'Gagal',
          'Poin Anda tidak cukup untuk menukarkan barang ini.',
          'error',
        );
        return;
      }

      // 3. Ambil data stok barang
      const { data: productData, error: productError } = await supabase
        .from('aset_barang')
        .select('stock')
        .eq('id', id)
        .single();

      if (productError) throw new Error(productError.message);

      // 4. Cek stok barang
      if (productData.stock < quantity) {
        Swal.fire('Gagal', 'Stok barang tidak mencukupi.', 'error');
        return;
      }

      // 5. Kurangi poin user dan stok barang
      const { error: updatePointError } = await supabase
        .from('profiles')
        .update({ point: userData.point - totalCost })
        .eq('id', userId);

      const { error: updateStockError } = await supabase
        .from('aset_barang')
        .update({ stock: productData.stock - quantity })
        .eq('id', id);

      if (updatePointError || updateStockError) {
        throw new Error(updatePointError?.message || updateStockError?.message);
      }

      // 6. Tambahkan entri ke tabel riwayat_aset
      const { error: riwayatError } = await supabase.from('riwayat_aset').insert({
        nama_penukar: userData.first_name,
        barang_ditukar: title,
        stok: quantity,
      });

      if (riwayatError) {
        // rollback kalau gagal insert
        await supabase.from('profiles').update({ point: userData.point }).eq('id', userId);
        await supabase.from('aset_barang').update({ stock: productData.stock }).eq('id', id);
        throw new Error(riwayatError.message);
      }

      Swal.fire(
        'Sukses!',
        'Penukaran berhasil. Poin Anda telah dikurangi.',
        'success',
      );
    } catch (error: any) {
      console.error('Kesalahan saat penukaran:', error.message);
      Swal.fire('Gagal', `Terjadi kesalahan: ${error.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-green-700 bg-white shadow-md">
      {/* Gambar Produk */}
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Isi Card */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-green-700">{title}</h3>
          <p className="text-sm text-gray-500">Stok: {stock}</p>
        </div>

        <p className="line-clamp-3 text-sm text-gray-500">{description}</p>

        {/* Quantity control */}
        <div className="flex items-center gap-3">
          <button
            onClick={decrement}
            disabled={quantity <= 1 || isLoading}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center font-semibold">{quantity}</span>
          <button
            onClick={increment}
            disabled={quantity >= stock || isLoading}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Harga dan tombol beli */}
        <div className="mt-2 flex items-center justify-between">
          <span className="flex items-center gap-1 text-base font-bold text-black">
            <CoinsIcon className="h-auto w-5 text-green-700" />
            {price * quantity}
          </span>
          <button
            onClick={handleRedeem}
            disabled={isLoading || stock <= 0 || !userId}
            className="flex items-center gap-2 rounded-lg bg-green-800 px-4 py-2 text-sm text-white transition-colors duration-200 ease-out hover:bg-green-600 disabled:opacity-50"
          >
            {isLoading ? (
              'Memproses...'
            ) : (
              <>
                <ShoppingCart size={16} />
                Beli
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
