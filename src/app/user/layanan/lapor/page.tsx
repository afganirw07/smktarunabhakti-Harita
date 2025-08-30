'use client';

import {
  Phone,
  MapPin,
  Clock,
  User,
  Mail,
  Home,
  FileText,
  Calculator,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/dropdown/dropdown-menu';
import dayjs from 'dayjs';
import { createClient } from '@supabase/supabase-js';

// Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LaporSampah() {
  const [formData, setFormData] = useState({
    namaLengkap: '',
    nomorHP: '',
    email: '',
    alamat: '',
    wilayah: '',
    deskripsi: '',
  });

  const [areas, setAreas] = useState<{ value: string; label: string; harga: number }[]>([]);
  const [totalPanggilan, setTotalPanggilan] = useState(0);
  const [loading, setLoading] = useState(false);
  const userId = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;
  const [lastReport, setLastReport] = useState<any>(null);

  // Load Midtrans Snap JS sandbox
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!);
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // Fetch areas dan total laporan
  useEffect(() => {
    const fetchAreas = async () => {
      const { data, error } = await supabase
        .from('areas')
        .select('area_code, label, base_price');
      if (error) console.error('Error fetching areas:', error);
      else if (data) {
        setAreas(data.map((a) => ({
          value: a.area_code,
          label: a.label,
          harga: a.base_price,
        })));
      }
    };

    const fetchReportsCount = async () => {
      if (!userId) return;
      const { count, error } = await supabase
        .from('reports')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);
      if (!error && count !== null) setTotalPanggilan(count);
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
    const pajak = Math.round(hargaDasar * 0.1);
    const total = hargaDasar + pajak;
    return { hargaDasar, pajak, total };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!userId) {
      alert('User belum login!');
      return;
    }

    if (!formData.namaLengkap || !formData.nomorHP || !formData.email || !formData.alamat || !formData.wilayah) {
      alert('Mohon lengkapi semua data!');
      return;
    }

    setLoading(true);
    const biaya = hitungTotal();
    const orderId = `LPR-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    try {
      const response = await fetch('/api/create-lapor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: orderId,
          gross_amount: Math.round(biaya.total),
          customer_details: {
            id: userId,
            first_name: formData.namaLengkap,
            email: formData.email,
            phone: formData.nomorHP,
          },
          item_details: [
            {
              id: formData.wilayah,
              name: `Layanan Lapor Sampah di ${selectedWilayah.label}`,
              price: Math.round(biaya.total),
              quantity: 1,
            },
          ],
          report_data: {
            userId,
            namaLengkap: formData.namaLengkap,
            nomorHP: formData.nomorHP,
            email: formData.email,
            alamat: formData.alamat,
            wilayah: formData.wilayah,
            deskripsi: formData.deskripsi,
            total_cost: biaya.total,
          },
        }),
      });

      const data = await response.json();
      if (response.ok && data.token) {
        window.snap.pay(data.token, {
          onSuccess: (result) => {
            console.log('Payment success:', result);
            alert('Pembayaran berhasil! Laporan Anda telah dicatat.');
            setFormData({
              namaLengkap: '',
              nomorHP: '',
              email: '',
              alamat: '',
              wilayah: '',
              deskripsi: '',
            });
            setTotalPanggilan((prev) => prev + 1);
          },
          onPending: (result) => {
            console.log('Payment pending:', result);
            alert('Menunggu pembayaran Anda. Laporan akan diproses setelah pembayaran berhasil.');
          },
          onError: (result) => {
            console.log('Payment error:', result);
            alert('Terjadi kesalahan saat pembayaran. Silakan coba lagi.');
          },
          onClose: () => {
            console.log('Customer closed the popup without finishing the payment');
            alert('Pembayaran dibatalkan. Laporan tidak disimpan.');
          },
        });
      } else {
        console.error('Failed to get transaction token:', data.error);
        alert('Gagal membuat transaksi. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error during transaction process:', error);
      alert('Terjadi kesalahan pada sistem. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const biaya = hitungTotal();

  useEffect(() => {
    const fetchLastReport = async () => {
      const { data, error } = await supabase
        .from('reports')
        .select('alamat, created_at')
        .order('created_at', { ascending: false })
        .limit(1);
      if (!error && data.length > 0) setLastReport(data[0]);
    };
    fetchLastReport();
  }, []);


  return (
    <section className="h-auto w-full space-y-6 py-8">
      {/* heading */}
      <div className="flex w-full flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between lg:gap-0">
        <div className="flex flex-col gap-1 text-center lg:text-left">
          <h1 className="font-inter text-3xl font-bold text-green-700">
            Lapor Sampah
          </h1>
        </div>
        {/* <button className="rounded-xl bg-green-800 px-4 py-2 font-nunito font-bold text-white transition-all duration-200 ease-out hover:bg-green-700 hover:text-white">
          Dokumentasi Kami
        </button> */}
      </div>

      {/* grid pertama */}
      <div className="grid h-auto w-full grid-cols-1 gap-6 lg:grid-cols-7 lg:grid-rows-2">
        {/* deskripsi */}
        <div className="w-full rounded-2xl border-l-4 border-green-600 bg-white p-6 shadow-lg lg:col-span-4 lg:row-span-2">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-gradient-to-br from-green-500 to-green-600 p-3 shadow-md">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="mb-3 font-inter text-xl font-bold text-green-800">
                Tentang Layanan Lapor Sampah
              </h2>
              <p className="font-nunito leading-relaxed text-green-700">
                Lapor Sampah adalah fitur pemanggilan petugas untuk membersihkan
                sampah di area sekitar Anda. Layanan ini memungkinkan Anda
                melaporkan timbunan sampah yang mengganggu kebersihan
                lingkungan. Tim petugas kami akan segera menindaklanjuti laporan
                Anda untuk menciptakan lingkungan yang bersih dan sehat.
              </p>
            </div>
          </div>
        </div>

        {/* total panggil */}
        <div className="w-full rounded-2xl bg-gradient-to-br from-green-600 to-green-700 p-6 shadow-lg lg:col-span-3 lg:row-span-1">
          <div className="flex items-center gap-4">
            <div className="rounded-full border border-white/30 bg-white/20 p-3 backdrop-blur-sm">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="mb-1 font-inter text-3xl font-bold text-white">
                {totalPanggilan}
              </h2>
              <p className="font-nunito text-sm text-green-100">
                Total panggilan dari Anda
              </p>
            </div>
          </div>
        </div>

        {/* riwayat panggilan (dummy dulu) */}
        <div className="w-full rounded-2xl bg-gradient-to-br from-lime-600 to-green-600 p-6 shadow-lg lg:col-span-3 lg:row-span-1">
          <div className="flex items-start gap-4">
            <div className="rounded-full border border-white/30 bg-white/20 p-3 backdrop-blur-sm">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="mb-1 font-inter font-bold text-white">
                Panggilan Terakhir
              </h3>
              <p className="mb-2 font-nunito text-sm font-black text-white">
                {lastReport
                  ? `${lastReport.address} (${dayjs(
                      lastReport.created_at,
                    ).format('DD MMMM YYYY HH:mm')})`
                  : 'Belum ada data riwayat'}
              </p>
              <div className="flex items-center gap-2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* grid kedua */}
      <div className="grid h-auto w-full grid-cols-1 gap-6 lg:grid-cols-7 lg:grid-rows-2">
        {/* form */}
        <div className="w-full rounded-2xl bg-green-50 p-6 shadow-lg lg:col-span-4 lg:row-span-2">
          <h2 className="mb-6 font-inter text-xl font-bold text-green-800">
            Form Laporan Sampah
          </h2>

          <div className="space-y-4">
            {/* Input Nama */}
            <div>
              <div className="mb-2 block font-nunito font-semibold text-green-700">
                <User className="mr-2 inline h-4 w-4" />
                Nama Lengkap
              </div>
              <input
                type="text"
                name="namaLengkap"
                value={formData.namaLengkap}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-green-300 px-4 py-2 font-nunito"
                placeholder="Masukkan nama lengkap"
              />
            </div>

            {/* Nomor HP */}
            <div>
              <div className="mb-2 block font-nunito font-semibold text-green-700">
                <Phone className="mr-2 inline h-4 w-4" />
                Nomor Handphone
              </div>
              <input
                type="tel"
                name="nomorHP"
                value={formData.nomorHP}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-green-300 px-4 py-2 font-nunito"
                placeholder="Contoh: 08123456789"
              />
            </div>

            {/* Email */}
            <div>
              <div className="mb-2 block font-nunito font-semibold text-green-700">
                <Mail className="mr-2 inline h-4 w-4" />
                Email
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-green-300 px-4 py-2 font-nunito"
                placeholder="contoh@email.com"
              />
            </div>

            {/* Alamat */}
            <div>
              <div className="mb-2 block font-nunito font-semibold text-green-700">
                <Home className="mr-2 inline h-4 w-4" />
                Alamat
              </div>
              <input
                type="text"
                name="alamat"
                value={formData.alamat}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-green-300 px-4 py-2 font-nunito"
                placeholder="Alamat lengkap"
              />
            </div>

            {/* Wilayah */}
            <div>
              <div className="mb-2 block font-nunito font-semibold text-green-700">
                <MapPin className="mr-2 inline h-4 w-4" />
                Wilayah
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex w-full items-center justify-between rounded-xl border-2 border-green-300 bg-green-50 px-6 py-4 font-nunito font-medium text-green-800">
                  <span
                    className={
                      selectedWilayah ? 'text-green-800' : 'text-green-600'
                    }
                  >
                    {selectedWilayah
                      ? `${
                          selectedWilayah.label
                        } - Rp ${selectedWilayah.harga.toLocaleString('id-ID')}`
                      : 'Pilih wilayah layanan'}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full min-w-[400px] rounded-xl border-2 border-green-200 bg-white shadow-xl">
                  {areas.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => handleWilayahSelect(option.value)}
                      className="px-6 py-3 font-nunito text-green-800 hover:bg-green-50"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{option.label}</span>
                        <span className="text-sm text-green-600">
                          Rp {option.harga.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Deskripsi */}
            <div>
              <div className="mb-2 block font-nunito font-semibold text-green-700">
                <FileText className="mr-2 inline h-4 w-4" />
                Deskripsi Keluhan
              </div>
              <textarea
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleInputChange}
                rows={4}
                className="w-full rounded-lg border border-green-300 px-4 py-2 font-nunito"
                placeholder="Deskripsi keluhan sampahnya..."
              ></textarea>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-lg bg-green-700 px-6 py-3 font-nunito font-bold text-white transition-colors hover:bg-green-800"
            >
              {loading ? 'Mengirim...' : 'Lapor Sekarang'}
            </button>
          </div>
        </div>

        {/* total harga */}
        <div className="w-full rounded-2xl border-2 border-gray-400 bg-white p-6 shadow-lg lg:col-span-3 lg:row-span-2">
          <div className="mb-6 flex items-center gap-3">
            <Calculator className="h-6 w-6 text-green-600" />
            <h2 className="font-inter text-xl font-bold text-gray-800">
              Rincian Biaya
            </h2>
          </div>

          <div className="mb-4 space-y-4 border-b border-gray-300 pb-4">
            <p className="font-nunito text-sm text-gray-600">Nama Lengkap</p>
            <p className="font-nunito font-semibold text-gray-800">
              {formData.namaLengkap || '-'}
            </p>
            <p className="font-nunito text-sm text-gray-600">Nomor HP</p>
            <p className="font-nunito font-semibold text-gray-800">
              {formData.nomorHP || '-'}
            </p>
            <p className="font-nunito text-sm text-gray-600">Email</p>
            <p className="font-nunito font-semibold text-gray-800">
              {formData.email || '-'}
            </p>
            <p className="font-nunito text-sm text-gray-600">Alamat</p>
            <p className="font-nunito font-semibold text-gray-800">
              {formData.alamat || '-'}
            </p>
            <p className="font-nunito text-sm text-gray-600">Wilayah</p>
            <p className="font-nunito font-semibold text-gray-800">
              {selectedWilayah?.label || '-'}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-nunito text-gray-700">Biaya Layanan</span>
              <span className="font-nunito font-semibold text-gray-800">
                Rp {biaya.hargaDasar.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-nunito text-gray-700">Pajak (10%)</span>
              <span className="font-nunito font-semibold text-gray-800">
                Rp {biaya.pajak.toLocaleString('id-ID')}
              </span>
            </div>
            <hr className="border-gray-300" />
            <div className="flex items-center justify-between">
              <span className="font-inter text-lg font-bold text-green-700">
                Total
              </span>
              <span className="font-inter text-lg font-bold text-green-700">
                Rp {biaya.total.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {!formData.wilayah && (
            <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
              <p className="text-center font-nunito text-sm text-yellow-700">
                Pilih wilayah untuk melihat biaya layanan
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
