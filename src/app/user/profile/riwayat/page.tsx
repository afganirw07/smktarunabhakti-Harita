"use client"

import Link from "next/link"
import { Coins, CircleChevronLeft } from "lucide-react"
import { createClient } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

// Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function Riwayat() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [riwayatAset, setRiwayatAset] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const userId = localStorage.getItem("user_id")
      if (!userId) {
        console.error("user_id tidak ditemukan di localStorage")
        setLoading(false)
        return
      }

      // ambil transaksi user
      const { data: trxData, error: trxError } = await supabase
        .from("transactions")
        .select("id, user_id, nama, order_id, plan_name, amount, status, created_at, end_date")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

      if (trxError) console.error(trxError)

      // ambil riwayat aset
      const { data: asetData, error: asetError } = await supabase
        .from("riwayat_aset")
        .select("id, user_id, nama_penukar, barang_ditukar, stok, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

      if (asetError) console.error(asetError)

      setTransactions(trxData || [])
      setRiwayatAset(asetData || [])
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return <p className="p-6">Loading...</p>
  }

  return (
    <section className="w-full py-16 px-4 relative">
      <Link href={"/user/toko"}>
        <div className="absolute flex gap-2 top-2 left-4 group cursor-pointer">
          <CircleChevronLeft className="text-black group-hover:text-green-600 transition-colors duration-200" />
          <h1 className="text-black font-semibold group-hover:text-green-700 transition-colors duration-200 ease-out text-lg">
            Kembali
          </h1>
        </div>
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl font-bold font-inter">Riwayat Transaksi Anda</h1>
      </div>

      {/* transactions */}
      {transactions.length === 0 ? (
        <p className="text-gray-500">Belum ada transaksi</p>
      ) : (
        transactions.map((item) => (
          <div
            key={item.id}
            className="mb-4 flex items-center gap-4 rounded-xl border p-4 shadow-sm bg-white"
          >
            <div className="flex flex-col flex-1">
              <span className="font-medium text-gray-900">{item.nama || item.plan_name}</span>
              <span className="text-sm text-gray-500">
                {new Date(item.created_at).toLocaleString("id-ID", {
                  dateStyle: "long",
                  timeStyle: "short",
                })}
              </span>
              <span className="text-xs text-gray-400">Status: {item.status}</span>
            </div>

            <div className="text-right flex items-center gap-1">
              <span className="font-semibold text-black">
                Rp {item.amount.toLocaleString()}
              </span>
            </div>
          </div>
        ))
      )}

      <div className="mt-10 mb-4">
        <h2 className="text-2xl font-bold font-inter">Riwayat Penukaran Aset</h2>
      </div>

      {riwayatAset.length === 0 ? (
        <p className="text-gray-500">Belum ada penukaran aset</p>
      ) : (
        riwayatAset.map((aset) => (
          <div
            key={aset.id}
            className="mb-4 flex items-center gap-4 rounded-xl border p-4 shadow-sm bg-white"
          >
            <div className="flex flex-col flex-1">
              <span className="font-medium text-gray-900">{aset.barang_ditukar}</span>
              <span className="text-sm text-gray-500">
                {new Date(aset.created_at).toLocaleString("id-ID", {
                  dateStyle: "long",
                  timeStyle: "short",
                })}
              </span>
              <span className="text-xs text-gray-400">Stok: {aset.stok}</span>
            </div>
          </div>
        ))
      )}
    </section>
  )
}
