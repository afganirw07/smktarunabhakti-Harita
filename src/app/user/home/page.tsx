"use client"

import { useState } from 'react';
import { SketchCalendarPicker } from 'components/magicui/calendar';
import Button from 'components/ui/button/Button';
import { Coins, Wallet} from 'lucide-react';

export default function Home() {

  const [date, setDate] = useState<Date>(new Date());

  return (
    <>
      <section className="h-auto w-full px-8 py-12 ">
        {/* Header */}
        <div className="flex w-full flex-col justify-between md:flex-row md:items-center ">
          <div className="flex flex-col">
            <h1 className="font-inter text-3xl font-bold text-green-700">
              Hi Ahsan
            </h1>
            <h1 className="font-inter text-3xl font-bold text-black">
              Selamat Datang Kembali
            </h1>
          </div>
        </div>

        {/* <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="flex items-center gap-4 rounded-xl bg-white p-6 shadow-md">
            <div className="rounded-lg bg-green-100 p-3">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-black">1,200</h2>
              <p className="text-sm text-gray-500">Pengguna</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl bg-white p-6 shadow-md">
            <div className="rounded-lg bg-blue-100 p-3">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-black">350</h2>
              <p className="text-sm text-gray-500">Transaksi</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl bg-white p-6 shadow-md">
            <div className="rounded-lg bg-yellow-100 p-3">
              <Coins className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-black">500</h2>
              <p className="text-sm text-gray-500">HaritaCoins</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl bg-white p-6 shadow-md">
            <div className="rounded-lg bg-purple-100 p-3">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-black">2 Hari lalu</h2>
              <p className="text-sm text-gray-500">Terakhir aktif</p>
            </div>
          </div>
        </div> */}

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-7">
          {/* Card Customers */}
          <div className="flex flex-col gap-2 col-span-2 rounded-xl bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coins className="h-6 w-6 text-green-700" />
                <span className="font-medium text-black">Coins</span>
              </div>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-sm text-green-600">
                + 500
              </span>
            </div>
            <h2 className="text-2xl font-bold text-black">500</h2>
          </div>

          {/* Card Orders */}
          <div className="flex flex-col col-span-2 gap-2 rounded-xl bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="h-6 w-6 text-green-700" />
                <span className="font-medium text-black">Transaksi</span>
              </div>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-sm text-green-500">
                + 2
              </span>
            </div>
            <div className='flex items-center gap-4'>
            <h2 className="text-2xl font-bold text-black">13x</h2>
            <button className='px-2 py-1 bg-green-700 text-white font-nunito font-bold text-xs rounded-full hover:bg-green-600 transition-colors duration-200 ease-out '>Lihat riwayat</button>
            </div>
          </div>

          {/* Card Monthly Target (tinggi 2 baris) */}
          <div className=" row-span-3 col-span-3 flex flex-col justify-center gap-4 rounded-xl bg-white p-6 shadow">
            <div className='flex flex-col gap-4 justify-center
             items-center'>
              <h3 className="font-bold text-green-700 font-nunito">Waktu Berlangganan</h3>
            </div>
            <div className='flex justify-center items-center'>
             <SketchCalendarPicker value={date} onChange={setDate} variant="artistic" />
            </div>
            <div className="mt-2 flex justify-between border-t pt-4 text-sm font-nunito">
              <div>
                <p className="text-green-500 font-semibold">Total Durasi</p>
                <p className="font-bold text-black">
                  60 Hari
                </p>
              </div>
              <div>
                <p className="text-green-500 font-semibold">Sisa Durasi</p>
                <p className="font-bold text-black">
                  59h 23j 59d
                </p>
              </div>
              <div>
                <p className="text-green-500 font-semibold">Berakhir pada</p>
                <p className="font-bold text-black">
                  23 Oktober 2025
                </p>
              </div>
            </div>
          </div>

           <div className='lg:col-span-4 bg-white p-6 shadow'>
              <h1 className='font-inter font-bold text-sm'>Merasa Puas Dengan layanan kami?</h1>
          </div>
          {/* Card Monthly Sales (melebar 2 kolom) */}
          <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow lg:col-span-4">
            <h3 className="font-semibold text-green-700 ">Monthly Sales</h3>
            <p className="text-sm leading-relaxed text-black font-nunito font-semibold">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              eget dui sit amet turpis dictum sollicitudin. Nulla facilisi.
              Aenean tincidunt sapien nec purus viverra, nec elementum turpis
              ultrices.
            </p>
            <p className="text-sm leading-relaxed text-black font-nunito font-semibold">
              Integer blandit, orci eu suscipit consequat, turpis est tempor
              eros, vel vulputate risus sem sed sapien. Morbi nec turpis et
              nulla feugiat accumsan non ut dui.
            </p>
          </div>
         
        </div>

        
      </section>
    </>
  );
}
