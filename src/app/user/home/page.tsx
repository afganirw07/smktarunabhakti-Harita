"use client"

import { useState } from 'react';
import { SketchCalendarPicker } from 'components/magicui/calendar';

import { Coins, Users, ShoppingBag, BarChart3, Package } from 'lucide-react';

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

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Card Customers */}
          <div className="flex flex-col gap-2 rounded-xl bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-gray-500" />
                <span className="font-medium text-gray-500">Customers</span>
              </div>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-sm text-green-600">
                ↑ 11.01%
              </span>
            </div>
            <h2 className="text-2xl font-bold text-black">3,782</h2>
          </div>

          {/* Card Orders */}
          <div className="flex flex-col gap-2 rounded-xl bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-6 w-6 text-gray-500" />
                <span className="font-medium text-gray-500">Orders</span>
              </div>
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-sm text-red-600">
                ↓ 9.05%
              </span>
            </div>
            <h2 className="text-2xl font-bold text-black">5,359</h2>
          </div>

          {/* Card Monthly Target (tinggi 2 baris) */}
          <div className="row-span-2 flex flex-col gap-4 rounded-xl bg-white p-6 shadow">
            <div>
              <h3 className="font-medium text-green-700">Waktu Berlangganan</h3>
              <p className="text-sm text-green-400">
                Target you’ve set for each month
              </p>
            </div>
            <div>
             <SketchCalendarPicker value={date} onChange={setDate} variant="artistic" />
            </div>
            <div className="mt-2 flex justify-between border-t pt-4 text-sm">
              <div>
                <p className="text-gray-500">Target</p>
                <p className="font-bold text-black">
                  $20K <span className="text-red-500">↓</span>
                </p>
              </div>
              <div>
                <p className="text-gray-500">Revenue</p>
                <p className="font-bold text-black">
                  $20K <span className="text-green-500">↑</span>
                </p>
              </div>
              <div>
                <p className="text-gray-500">Today</p>
                <p className="font-bold text-black">
                  $20K <span className="text-green-500">↑</span>
                </p>
              </div>
            </div>
          </div>

          {/* Card Monthly Sales (melebar 2 kolom) */}
          <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow lg:col-span-2">
            <h3 className="font-semibold text-gray-700">Monthly Sales</h3>
            <p className="text-sm leading-relaxed text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              eget dui sit amet turpis dictum sollicitudin. Nulla facilisi.
              Aenean tincidunt sapien nec purus viverra, nec elementum turpis
              ultrices.
            </p>
            <p className="text-sm leading-relaxed text-gray-500">
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
