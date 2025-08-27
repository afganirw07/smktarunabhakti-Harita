'use client';

import { useEffect, useState } from 'react';
import { SketchCalendarPicker } from 'components/magicui/calendar';
import { Coins, Wallet, CheckCircle } from 'lucide-react';
import ProductCard from 'components/card/cardProduct';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { addDays, addMonths, addYears, format } from 'date-fns';
import { id } from 'date-fns/locale';
import toast, { Toaster } from 'react-hot-toast';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

// Buat instance Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const calculateEndDate = (startDate, plan) => {
  if (!startDate || !plan) return null;

  // Ubah string ISO date dari Supabase menjadi objek Date
  const start = new Date(startDate);

  switch (plan) {
    case 'trial':
      return addDays(start, 14);
    case '1_month':
      return addMonths(start, 1);
    case '3_months':
      return addMonths(start, 3);
    case '6_months':
      return addMonths(start, 6);
    case '1_year':
      return addYears(start, 1);
    default:
      return null;
  }
};

export default function Home() {
  const [date, setDate] = useState(new Date());
  const [First_Name, setFirst_Name] = useState('Loading...');
  const [poin, setPoin] = useState(0);
  const [plan, setPlan] = useState('Loading...');
  const [isClaimed, setIsClaimed] = useState(false);
  const [subscriptionEndDate, setSubscriptionEndDate] = useState(null);

  // State baru untuk produk
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Fungsi untuk mengambil data pengguna
  const fetchData = async () => {
    const userId = localStorage.getItem('user_id');

    if (userId) {
      const { data, error } = await supabase
        .from('profiles')
        .select(
          'first_name, point, plan, subscription_start_date, is_claimed',
        )
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user data:', error);
      } else {
        setFirst_Name(data.first_name);
        setPoin(data.point || 0);
        setPlan(data.plan || 'Loading...');
        setIsClaimed(data.is_claimed);

        const endDate = calculateEndDate(
          data.subscription_start_date,
          data.plan,
        );
        setSubscriptionEndDate(endDate);
      }
    }
  };

  // Fungsi untuk mengambil data produk
  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const { data, error } = await supabase
        .from('aset_barang')
        .select('id, nama, img, desc, stock, status, poin');
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

  // Menggabungkan kedua fungsi fetch di useEffect
  useEffect(() => {
    fetchData();
    fetchProducts();
  }, []);

  // Timer useEffect
  useEffect(() => {
    if (!subscriptionEndDate || isNaN(subscriptionEndDate.getTime())) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const distance = subscriptionEndDate.getTime() - now.getTime();

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [subscriptionEndDate]);

  const handleClaimCoins = async () => {
    const userId = localStorage.getItem('user_id');

    if (userId && !isClaimed) {
      const { data: user, error: fetchError } = await supabase
        .from('profiles')
        .select('point')
        .eq('id', userId)
        .single();

      if (fetchError) {
        console.error('Error fetching point:', fetchError);
        return;
      }

      const currentPoin = user.point || 0;
      const newPoin = currentPoin + 500;

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ point: newPoin, is_claimed: true })
        .eq('id', userId);

      if (updateError) {
        console.error('Error updating profile:', updateError);
      } else {
        setPoin(newPoin);
        setIsClaimed(true);
        toast.success('500 Coins berhasil diklaim!');
      }
    } else if (isClaimed) {
      toast.error('Anda sudah mengklaim koin ini.');
    }
  };

  return (
    <>
      <section className="h-auto w-full py-12 md:px-8 ">
        {/* Header */}
        <Toaster position="top-center" reverseOrder={false} />
        <div className="flex w-full flex-col justify-between md:flex-row md:items-center ">
          <div className="flex flex-col ">
            <h1 className="font-inter text-3xl font-bold text-green-700">
              Hi {First_Name}
            </h1>
            <h1 className="font-inter text-3xl font-bold text-black">
              Selamat Datang Kembali
            </h1>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-7">
          {/* Card Customers */}
          <div className="flex flex-col gap-2 rounded-xl bg-white p-6 shadow lg:col-span-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coins className="h-6 w-6 text-green-700" />
                <span className="font-medium text-black">HaritaCoins</span>
              </div>
              {isClaimed && (
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-sm text-green-600">
                  + 500
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-black">{poin}</h2>
          </div>

          {/* Card Orders */}
          <div className="flex flex-col gap-2 rounded-xl bg-white p-6 shadow lg:col-span-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="h-6 w-6 text-green-700" />
                <span className="font-medium text-black">Transaksi</span>
              </div>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-sm text-green-500">
                + 2
              </span>
            </div>
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-black">13x</h2>
              <button className="rounded-full bg-green-700 px-2 py-1 font-nunito text-xs font-bold text-white transition-colors duration-200 ease-out hover:bg-green-600 ">
                Lihat riwayat
              </button>
            </div>
          </div>

          {/* Masa Berlangganan */}
          <div className="flex flex-col justify-center gap-4 rounded-xl bg-white p-6 shadow lg:col-span-3 lg:row-span-3">
            <div
              className="flex flex-col items-center justify-center
              gap-4"
            >
              <h3 className="font-nunito font-bold text-green-700">
                Masa Berlangganan
              </h3>
            </div>
            <div className="flex items-center justify-center">
              <SketchCalendarPicker
                value={date}
                onChange={setDate}
                variant="artistic"
                endDate={subscriptionEndDate}
              />
            </div>
            <div className="mt-2 flex justify-between border-t pt-4 font-nunito text-sm">
              <div>
                <p className="font-semibold text-green-500">Berlangganan</p>
                <p className="font-bold text-black">
                  {plan.charAt(0).toUpperCase() + plan.slice(1).toLowerCase()}
                </p>
              </div>
              <div>
                <p className="font-semibold text-green-500">Sisa Durasi</p>
                <p className="font-bold text-black">
                  {timeLeft.days}h {timeLeft.hours}j {timeLeft.minutes}m{' '}
                  {timeLeft.seconds}s
                </p>
              </div>
              <div>
                <p className="font-semibold text-green-500">Berakhir pada</p>
                <p className="font-bold text-black">
                  {subscriptionEndDate && !isNaN(subscriptionEndDate.getTime())
                    ? format(subscriptionEndDate, 'd MMMM yyyy', { locale: id })
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-green-100 p-6 shadow lg:col-span-4">
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
              <h1 className="text-center font-inter text-lg font-semibold sm:text-left sm:text-xl">
                Wilayah anda penuh dengan sampah?
              </h1>
              <Link href={'/user/layanan/lapor'}>
                <button className="w-fit rounded-full bg-green-700 px-4 py-2 font-nunito font-semibold text-white transition-colors duration-200 ease-out hover:bg-green-600">
                  Lapor sampah
                </button>
              </Link>
            </div>
          </div>

          {/* klaim harita */}
          <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow lg:col-span-4">
            <h3 className="text-2xl font-semibold text-green-700">
              Klaim HaritaCoins
            </h3>

            <p className="font-nunito text-lg font-semibold text-black">
              Dapatkan Coins dengan{' '}
              <span className="font-bold">Memilah kategori sampah rumah</span>{' '}
              anda pada{' '}
              <Link href={'/user/layanan/trash-house'}>
                <span className="font-black text-green-700 underline underline-offset-2 transition-colors duration-200 ease-out hover:text-green-500">
                  Trash House
                </span>
              </Link>
            </p>

            {/* Badges */}
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <span className="flex items-center gap-1 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-black">
                Memilah Kategori sampah{' '}
                <span>
                  <CheckCircle className="h-auto w-5 stroke-green-500" />
                </span>
              </span>

              {/* Badge Klaim Coins */}
              <button
                onClick={handleClaimCoins}
                disabled={isClaimed}
                className={`flex cursor-pointer items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ease-out 
              ${
                isClaimed
                  ? 'cursor-not-allowed bg-gray-400 text-gray-700'
                  : 'bg-green-700 text-white hover:bg-green-500'
              }`}
              >
                <Coins className="h-6 w-6" />
                {isClaimed ? 'Koin Sudah Diklaim' : 'Klaim 500 Coins'}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-center font-inter text-2xl font-semibold sm:text-3xl lg:text-left">
              Tukarkan Coins anda{' '}
            </h1>
            <Link href={'/user/toko'}>
              <button className="hidden w-fit cursor-pointer rounded-xl bg-green-700 px-6 py-2 font-inter text-sm font-bold text-white transition-all duration-200 ease-out hover:bg-green-500 md:flex">
                Lihat lebih banyak
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 ">
            {loadingProducts ? (
              <p>Memuat produk...</p>
            ) : errorProducts ? (
              <p className="text-red-500">Error: Gagal memuat produk. Silakan coba lagi.</p>
            ) : products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.nama}
                  imageUrl={product.img}
                  description={product.desc}
                  price={product.poin}
                />
              ))
            ) : (
              <p>Tidak ada produk yang tersedia saat ini.</p>
            )}
          </div>
          <div className="flex w-full items-center justify-center">
            <Link href={'/user/toko'}>
              <button className="flex w-fit cursor-pointer items-center justify-center rounded-xl bg-green-700 px-6 py-2 font-inter text-sm font-bold text-white transition-all duration-200 ease-out hover:bg-green-500 md:hidden">
                Lihat lebih banyak
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
