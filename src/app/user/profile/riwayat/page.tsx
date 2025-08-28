"use client"

import Link from "next/link"
import Image from "next/image"
import { Coins, CircleChevronLeft } from "lucide-react"

// Contoh data transaksi (bisa kamu ganti nanti dari API / localStorage)
const transaksi = [
  {
    tanggal: "27 Agustus 2025",
    items: [
      { id: 1, nama: "Bricket", harga: 1800, qty: 3, gambar: "", metode: "Coins", isCoin: true },
      { id: 2, nama: "Berlangganan Harita 3 Bulan", harga: 450000, qty: 1, gambar: "", metode: "Bank"},
    ],
  },
  {
    tanggal: "26 Agustus 2025",
    items: [
      { id: 3, nama: "Roni tawar", harga: 8000, qty: 5, gambar: "", metode: "Bank" },
    ],
  },
]

export default function Riwayat() {
  return (
    <section className="w-full py-16 px-4 relative">

        <Link href={"/user/toko"}>
        <div className="absolute flex gap-2 top-2 left-4  group  cursor-pointer">
            <CircleChevronLeft className="text-black group-hover:text-green-600 transition-colors duration-200"/>
            <h1 className="text-black font-semibold group-hover:text-green-700 transition-colors duration-200 ease-out text-lg">Kembali</h1>
        </div>
        </Link>
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-inter">Riwayat Transaksi Anda</h1>
      </div>

      {/* Loop per tanggal */}
      {transaksi.map((trx, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-lg font-semibold text-green-700 mb-4">
            {trx.tanggal}
          </h2>

          <div className="flex flex-col gap-4">
            {/* Loop per item transaksi */}
            {trx.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-xl border p-4 shadow-sm bg-white"
              >
                {/* Kotak kecil gambar */}
                <div className="h-16 w-16 flex items-center justify-center rounded-lg bg-gray-100 overflow-hidden">
                  {/* {item.gambar ? (
                    <Image
                      src={item.gambar}
                      alt={item.nama}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">No Img</span>
                  )} */}
                </div>

                {/* Info produk */}
                <div className="flex flex-col flex-1">
                  <span className="font-medium text-gray-900">
                    {item.nama}
                  </span>
                  <span className="text-sm text-gray-500">
                    Qty: {item.qty}
                  </span>
                  {item.metode && (
                    <span className="text-xs text-gray-400">
                      Metode: {item.metode}
                    </span>
                  )}
                </div>

                {/* Harga */}
                <div className="text-right flex items-center gap-1">
                  {item.isCoin ? (
                    <>
                      <Coins className="h-4 w-4 text-green-700" />
                      <span className="font-semibold text-green-700">
                        {item.harga.toLocaleString()}
                      </span>
                    </>
                  ) : (
                    <span className="font-semibold text-black">
                      Rp {item.harga.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}