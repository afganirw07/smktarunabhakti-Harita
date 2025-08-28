'use client';

import { useEffect, useState } from 'react';
import { Coins, CoinsIcon } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import ProductCard from 'components/card/cardProduct';
import Link from 'next/link';

// Configure Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Toko() {
  const [poin, setPoin] = useState(0);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);

  // Fungsi untuk mengambil data poin pengguna
  const fetchUserPoin = async () => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      const { data, error } = await supabase
        .from('profiles')
        .select('point')
        .eq('id', userId)
        .single();
      if (error) {
        console.error('Error fetching user points:', error);
      } else {
        setPoin(data.point || 0);
      }
    }
  };

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const { data, error } = await supabase
        .from('aset_barang')
        .select('id, nama, desc, img, poin, stock')
      if (error) {
        throw error;
      }
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      setErrorProducts(error.message);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchUserPoin();
    fetchProducts();
  }, []);

  return (
    <>
      <section className="flex flex-col gap-10 h-auto w-full md:px-2 py-8 ">
        <div className='flex lg:flex-row flex-col lg:gap-0 gap-4 lg:justify-between justify-center items-center w-full'>
          <div className='flex flex-col gap-1 lg:text-left text-center'>
            <h1 className='text-3xl font-inter font-bold text-green-700'>Toko Barang Daur Ulang</h1>
            <p className='font-medium text-lg font-inter text-black/60 '>Kumpulan produk sampah yang telah di daur ulang </p>
          </div>

          <div>
           <div className="flex items-center gap-2">
            <h1 className="flex gap-1 rounded-xl bg-green-700 px-6 py-2 font-inter font-semibold text-white ">
              <Coins />
              <span>{poin}</span>
            </h1>

            <Link href={'/user/toko/riwayat'}>           
            <button className="rounded-xl bg-green-100 px-4 py-2 font-nunito font-bold text-green-700 transition-all duration-200 ease-out hover:bg-green-700 hover:text-white">
              Riwayat Transaksi
            </button>
            </Link>
 
          </div>
          </div>
        </div>

        
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {loadingProducts ? (
              <p>Memuat produk...</p>
            ) : errorProducts ? (
              <p className="text-red-500">Error: Gagal memuat produk. Silakan coba lagi.</p>
            ) : products.length > 0 ? (
              products.map((product) => (
                <div className='col-span-1' key={product}>
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.nama}
                  description={product.desc}
                  price={product.poin.toString()} 
                  imageUrl={product.img}
                  stock={product.stock}
                />
                </div>
              ))
            ) : (
              <p>Tidak ada produk yang tersedia saat ini.</p>
            )}
          </div>
      </section>
    </>
  );
}
