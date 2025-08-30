"use client";

import { Phone, MapPin, Clock, User, Mail, Home, FileText, Calculator } from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/dropdown/dropdown-menu";
import dayjs from "dayjs";
import { createClient } from "@supabase/supabase-js";

// Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LaporSampah() {
  const [formData, setFormData] = useState({
    namaLengkap: "",
    nomorHP: "",
    email: "",
    alamat: "",
    wilayah: "",
    deskripsi: "",
  });

  const [areas, setAreas] = useState<{ value: string; label: string; harga: number }[]>([]);
  const [totalPanggilan, setTotalPanggilan] = useState(0);
  const [loading, setLoading] = useState(false);
  const userId = typeof window !== "undefined" ? localStorage.getItem("user_id") : null;
  const [lastReport, setLastReport] = useState(null);

  // Fetch data areas dari tabel Supabase
  useEffect(() => {
    const fetchAreas = async () => {
      const { data, error } = await supabase.from("areas").select("area_code, label, base_price");
      if (error) {
        console.error("Error fetching areas:", error);
      } else if (data) {
        setAreas(data.map((a) => ({ value: a.area_code, label: a.label, harga: a.base_price })));
      }
    };

    const fetchReportsCount = async () => {
      if (!userId) return;
      const { count, error } = await supabase
        .from("reports")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId);

      if (!error && count !== null) {
        setTotalPanggilan(count);
      }
    };

    fetchAreas();
    fetchReportsCount();
  }, [userId]);

  const selectedWilayah = areas.find((option) => option.value === formData.wilayah);

  const handleWilayahSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, wilayah: value }));
  };

  const hitungTotal = () => {
    const hargaDasar = selectedWilayah?.harga || 0;
    const pajak = hargaDasar * 0.1;
    return { hargaDasar, pajak, total: hargaDasar + pajak };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async () => {
  if (!userId) {
    alert("User belum login!");
    return;
  }

  if (!formData.namaLengkap || !formData.nomorHP || !formData.email || !formData.alamat || !formData.wilayah) {
    alert("Mohon lengkapi semua data!");
    return;
  }

  setLoading(true);

  const biaya = hitungTotal();

  const { data: newReport, error } = await supabase
    .from("reports")
    .insert([
      {
        user_id: userId,
        full_name: formData.namaLengkap,
        phone_number: formData.nomorHP,
        email: formData.email,
        address: formData.alamat,
        area_type: formData.wilayah,
        description: formData.deskripsi,
        total_cost: biaya.total,
      },
    ])
    .select(); 

  setLoading(false);

  if (error) {
    console.error("Error submit laporan:", error);
    alert("Gagal mengirim laporan!");
  } else {
    alert("Laporan sampah berhasil dikirim!");

    if (newReport && newReport.length > 0) {
      const reportId = newReport[0].id; 
      
      const notificationData = {
        user_id: userId,
        title: "Laporan Sampah Diterima",
        body: `Laporan Anda untuk pembersihan sampah di ${formData.alamat} telah berhasil kami terima. Petugas akan segera menindaklanjuti.`,
        type: 'lapor_sampah',
        related_id: reportId,
      };

      const { error: notificationError } = await supabase
        .from('notifications')
        .insert(notificationData);

      if (notificationError) {
        console.error("Error inserting notification:", notificationError.message);
      }
    }

    setFormData({
      namaLengkap: "",
      nomorHP: "",
      email: "",
      alamat: "",
      wilayah: "",
      deskripsi: "",
    });
    setTotalPanggilan(prevCount => prevCount + 1);
  }
};


  const biaya = hitungTotal();

    useEffect(() => {
    const fetchLastReport = async () => {
      const { data, error } = await supabase
        .from("reports")
        .select("address, created_at")
        .order("created_at", { ascending: false })
        .limit(1);

      if (!error && data.length > 0) {
        setLastReport(data[0]);
      }
    };

    fetchLastReport();
  }, []);

  return (
    <section className="w-full h-auto py-8 space-y-6">
      {/* heading */}
      <div className="flex lg:flex-row flex-col lg:gap-0 gap-4 lg:justify-between justify-center items-center w-full">
        <div className="flex flex-col gap-1 lg:text-left text-center">
          <h1 className="text-3xl font-inter font-bold text-green-700">Lapor Sampah</h1>
        </div>
        {/* <button className="rounded-xl bg-green-800 px-4 py-2 font-nunito font-bold text-white transition-all duration-200 ease-out hover:bg-green-700 hover:text-white">
          Dokumentasi Kami
        </button> */}
      </div>

      {/* grid pertama */}
      <div className="w-full h-auto grid lg:grid-cols-7 gap-6 grid-cols-1 lg:grid-rows-2">
        {/* deskripsi */}
        <div className="w-full bg-white border-l-4 border-green-600 p-6 shadow-lg rounded-2xl lg:col-span-4 lg:row-span-2">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-full shadow-md">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-inter font-bold text-green-800 mb-3">
                Tentang Layanan Lapor Sampah
              </h2>
              <p className="font-nunito text-green-700 leading-relaxed">
                Lapor Sampah adalah fitur pemanggilan petugas untuk membersihkan sampah di area
                sekitar Anda. Layanan ini memungkinkan Anda melaporkan timbunan sampah yang
                mengganggu kebersihan lingkungan. Tim petugas kami akan segera menindaklanjuti laporan
                Anda untuk menciptakan lingkungan yang bersih dan sehat.
              </p>
            </div>
          </div>
        </div>

        {/* total panggil */}
        <div className="w-full bg-gradient-to-br from-green-600 to-green-700 p-6 shadow-lg rounded-2xl lg:col-span-3 lg:row-span-1">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full border border-white/30">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-inter font-bold text-white mb-1">{totalPanggilan}</h2>
              <p className="font-nunito text-green-100 text-sm">Total panggilan dari Anda</p>
            </div>
          </div>
        </div>

        {/* riwayat panggilan (dummy dulu) */}
        <div className="w-full bg-gradient-to-br from-lime-600 to-green-600 p-6 shadow-lg rounded-2xl lg:col-span-3 lg:row-span-1">
          <div className="flex items-start gap-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full border border-white/30">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-inter font-bold text-white mb-1">Panggilan Terakhir</h3>
              <p className="font-nunito text-white font-black text-sm mb-2">
             {lastReport
          ? `${lastReport.address} (${dayjs(lastReport.created_at).format("DD MMMM YYYY HH:mm")})`
          : "Belum ada data riwayat"}
              </p>
              <div className="flex items-center gap-2">
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* grid kedua */}
      <div className="w-full h-auto grid lg:grid-cols-7 gap-6 grid-cols-1 lg:grid-rows-2">
        {/* form */}
        <div className="w-full bg-green-50 p-6 shadow-lg rounded-2xl lg:col-span-4 lg:row-span-2">
          <h2 className="text-xl font-inter font-bold text-green-800 mb-6">Form Laporan Sampah</h2>

          <div className="space-y-4">
            {/* Input Nama */}
            <div>
              <div className="block font-nunito font-semibold text-green-700 mb-2">
                <User className="inline w-4 h-4 mr-2" />
                Nama Lengkap
              </div>
              <input
                type="text"
                name="namaLengkap"
                value={formData.namaLengkap}
                onChange={handleInputChange}
                className="w-full px-4 py-2 font-nunito border border-green-300 rounded-lg"
                placeholder="Masukkan nama lengkap"
              />
            </div>

            {/* Nomor HP */}
            <div>
              <div className="block font-nunito font-semibold text-green-700 mb-2">
                <Phone className="inline w-4 h-4 mr-2" />
                Nomor Handphone
              </div>
              <input
                type="tel"
                name="nomorHP"
                value={formData.nomorHP}
                onChange={handleInputChange}
                className="w-full px-4 py-2 font-nunito border border-green-300 rounded-lg"
                placeholder="Contoh: 08123456789"
              />
            </div>

            {/* Email */}
            <div>
              <div className="block font-nunito font-semibold text-green-700 mb-2">
                <Mail className="inline w-4 h-4 mr-2" />
                Email
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 font-nunito border border-green-300 rounded-lg"
                placeholder="contoh@email.com"
              />
            </div>

            {/* Alamat */}
            <div>
              <div className="block font-nunito font-semibold text-green-700 mb-2">
                <Home className="inline w-4 h-4 mr-2" />
                Alamat
              </div>
              <input
                type="text"
                name="alamat"
                value={formData.alamat}
                onChange={handleInputChange}
                className="w-full px-4 py-2 font-nunito border border-green-300 rounded-lg"
                placeholder="Alamat lengkap"
              />
            </div>

            {/* Wilayah */}
            <div>
              <div className="block font-nunito font-semibold text-green-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-2" />
                Wilayah
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full px-6 py-4 font-nunito font-medium text-green-800 border-2 border-green-300 rounded-xl bg-green-50 flex items-center justify-between">
                  <span className={selectedWilayah ? "text-green-800" : "text-green-600"}>
                    {selectedWilayah
                      ? `${selectedWilayah.label} - Rp ${selectedWilayah.harga.toLocaleString("id-ID")}`
                      : "Pilih wilayah layanan"}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full min-w-[400px] bg-white border-2 border-green-200 rounded-xl shadow-xl">
                  {areas.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => handleWilayahSelect(option.value)}
                      className="px-6 py-3 font-nunito text-green-800 hover:bg-green-50"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{option.label}</span>
                        <span className="text-sm text-green-600">
                          Rp {option.harga.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Deskripsi */}
            <div>
              <div className="block font-nunito font-semibold text-green-700 mb-2">
                <FileText className="inline w-4 h-4 mr-2" />
                Deskripsi Keluhan
              </div>
              <textarea
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 font-nunito border border-green-300 rounded-lg"
                placeholder="Deskripsi keluhan sampahnya..."
              ></textarea>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-green-700 text-white py-3 px-6 font-nunito font-bold rounded-lg hover:bg-green-800 transition-colors"
            >
              {loading ? "Mengirim..." : "Lapor Sekarang"}
            </button>
          </div>
        </div>

        {/* total harga */}
        <div className="w-full bg-white border-2 border-gray-400 p-6 shadow-lg rounded-2xl lg:col-span-3 lg:row-span-2">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-inter font-bold text-gray-800">Rincian Biaya</h2>
          </div>

          <div className="space-y-4 border-b border-gray-300 pb-4 mb-4">
            <p className="font-nunito text-sm text-gray-600">Nama Lengkap</p>
            <p className="font-nunito font-semibold text-gray-800">{formData.namaLengkap || "-"}</p>
            <p className="font-nunito text-sm text-gray-600">Nomor HP</p>
            <p className="font-nunito font-semibold text-gray-800">{formData.nomorHP || "-"}</p>
            <p className="font-nunito text-sm text-gray-600">Email</p>
            <p className="font-nunito font-semibold text-gray-800">{formData.email || "-"}</p>
            <p className="font-nunito text-sm text-gray-600">Alamat</p>
            <p className="font-nunito font-semibold text-gray-800">{formData.alamat || "-"}</p>
            <p className="font-nunito text-sm text-gray-600">Wilayah</p>
            <p className="font-nunito font-semibold text-gray-800">{selectedWilayah?.label || "-"}</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-nunito text-gray-700">Biaya Layanan</span>
              <span className="font-nunito font-semibold text-gray-800">
                Rp {biaya.hargaDasar.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-nunito text-gray-700">Pajak (10%)</span>
              <span className="font-nunito font-semibold text-gray-800">
                Rp {biaya.pajak.toLocaleString("id-ID")}
              </span>
            </div>
            <hr className="border-gray-300" />
            <div className="flex justify-between items-center">
              <span className="font-inter font-bold text-green-700 text-lg">Total</span>
              <span className="font-inter font-bold text-green-700 text-lg">
                Rp {biaya.total.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          {!formData.wilayah && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="font-nunito text-sm text-yellow-700 text-center">
                Pilih wilayah untuk melihat biaya layanan
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
