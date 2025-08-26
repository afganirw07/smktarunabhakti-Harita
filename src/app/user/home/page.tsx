'use client';

import { useState } from 'react';
import { SketchCalendarPicker } from 'components/magicui/calendar';
import { Coins, Wallet, CheckCircle } from 'lucide-react';
import ProductCard from 'components/card/cardProduct';
import Link from 'next/link';

export default function Home() {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <>
      <section className="h-auto w-full md:px-8 py-12 ">
        {/* Header */}
        <div className="flex w-full flex-col justify-between md:flex-row md:items-center ">
          <div className="flex flex-col ">
            <h1 className="font-inter text-3xl font-bold text-green-700">
              Hi Ahsan
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
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-sm text-green-600">
                + 500
              </span>
            </div>
            <h2 className="text-2xl font-bold text-black">500</h2>
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
              />
            </div>
            <div className="mt-2 flex justify-between border-t pt-4 font-nunito text-sm">
              <div>
                <p className="font-semibold text-green-500">Total Durasi</p>
                <p className="font-bold text-black">60 Hari</p>
              </div>
              <div>
                <p className="font-semibold text-green-500">Sisa Durasi</p>
                <p className="font-bold text-black">59h 23j 59d</p>
              </div>
              <div>
                <p className="font-semibold text-green-500">Berakhir pada</p>
                <p className="font-bold text-black">23 Oktober 2025</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-green-100 p-6 shadow lg:col-span-4">
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
              <h1 className="font-inter text-center text-lg font-semibold sm:text-left sm:text-xl">
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
              anda pada <Link href={'/user/layanan/trashHouse'}><span className='font-black text-green-700 underline underline-offset-2 hover:text-green-500 transition-colors duration-200 ease-out'>Trash House</span></Link>
            </p>

            {/* Badges */}
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <span className="flex items-center gap-1 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-black">
                Memilah Kategori sampah <span><CheckCircle className='w-5 h-auto stroke-green-500'/></span>
              </span>

              {/* Badge Klaim Coins */}
              <span className="flex items-center gap-1 rounded-full bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-500 transition-colors duration-300 ease-out cursor-pointer">
                <Coins className="h-6 w-6" />
                Klaim 500 Coins
              </span>
            </div>
          </div>
        </div>

      <div className='mt-16 flex flex-col gap-8'>
        <div className='flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center'>
          <h1 className='text-2xl sm:text-3xl font-inter font-semibold lg:text-left text-center'>Tukarkan Coins anda </h1>
          <Link href={'/user/toko'}>
          <button className='w-fit text-sm font-bold text-white bg-green-700 px-6 py-2 rounded-xl hover:bg-green-500 transition-all duration-200 ease-out cursor-pointer font-inter md:flex hidden'>Lihat lebih banyak</button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                  <ProductCard
                    title="Produk C"
                    imageUrl="https://picsum.photos/400/301"
                  />
                  <ProductCard
                    title="Produk C"
                    imageUrl="https://picsum.photos/400/301"
                  />
                  <ProductCard
                    title="Produk C"
                    imageUrl="https://picsum.photos/400/301"
                  />
                  <ProductCard
                    title="Produk C"
                    imageUrl="https://picsum.photos/400/301"
                  />
                </div>
                <div className='w-full justify-center items-center flex'>
          <Link href={'/user/toko'}>
          <button className='w-fit text-sm font-bold text-white bg-green-700 px-6 py-2 rounded-xl hover:bg-green-500 transition-all duration-200 ease-out cursor-pointer font-inter md:hidden flex justify-center items-center'>Lihat lebih banyak</button>
          </Link>
          </div>
                </div>
      </section>
    </>
  );
}