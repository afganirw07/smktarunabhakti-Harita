'use client';

import {
  MapPin,
  User,
  Phone,
  Mail,
  Scale,
  ChevronDown,
  Star,
  Download,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';
import Image from 'next/image';

// Configure Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface FormData {
  namaLengkap: string;
  nomorHandphone: string;
  email: string;
  massaSampah: string;
  haritaPos: string;
}

interface LokasiPos {
  id: string;
  nama: string;
  rating: number;
  alamat: string;
}

interface JenisBarang {
  id: number;
  nama_barang: string;
  nilai_ha_coins: number;
  nilai_barang_per_kg: number;
}

// 🔑 Tambahan fungsi normalisasi
const normalizeName = (name: string) =>
  name.toLowerCase().replace(/\s+/g, '');

const imageMap: Record<string, string> = {
  pupuk: '/img/user/pupuk.jpg',
  pavingblok: '/img/user/pavingblock.jpg',
  briket: '/img/user/briket.jpg',
};

export default function TukarSampah() {
  const [formData, setFormData] = useState<FormData>({
    namaLengkap: '',
    nomorHandphone: '',
    email: '',
    massaSampah: '',
    haritaPos: '',
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBarang, setSelectedBarang] = useState<string>('');
  const [lokasiPosList, setLokasiPosList] = useState<LokasiPos[]>([]);
  const [jenisBarangList, setJenisBarangList] = useState<JenisBarang[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showStruk, setShowStruk] = useState(false);
  const [transaksiData, setTransaksiData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: posData, error: posError } = await supabase
          .from('lokasi_pos')
          .select('*');
        if (posError) throw posError;
        setLokasiPosList(posData as LokasiPos[]);

        const { data: barangData, error: barangError } = await supabase
          .from('jenis_barang')
          .select('id, nama_barang, nilai_ha_coins, nilai_barang_per_kg');
        if (barangError) throw barangError;
        setJenisBarangList(barangData as JenisBarang[]);
      } catch (err: any) {
        console.error('Error fetching data:', err.message);
        setError('Gagal memuat data. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDropdownSelect = (lokasi: LokasiPos) => {
    setFormData((prev) => ({
      ...prev,
      haritaPos: lokasi.nama,
    }));
    setIsDropdownOpen(false);
  };

  const handleDownloadPdf = () => {
    const strukElement = document.getElementById('struk-content');
    if (!strukElement) return;

    toPng(strukElement)
      .then((dataUrl) => {
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight =
          (strukElement.clientHeight * imgWidth) / strukElement.clientWidth;
        const pdf = new jsPDF('p', 'mm', 'a4');
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('struk-penukaran.pdf');
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  };

  const handleSubmit = async () => {
    if (!isFormValid) {
      alert('Harap lengkapi semua data formulir.');
      return;
    }

    const massaSampahKg = parseFloat(formData.massaSampah);
    const selectedBarangData = jenisBarangList.find(
      (b) => b.nama_barang === selectedBarang,
    );

    if (!selectedBarangData) {
      alert('Jenis barang tidak ditemukan.');
      return;
    }

    const totalHaritaCoins = massaSampahKg * 100;
    const totalBarangDidapat =
      massaSampahKg * selectedBarangData.nilai_barang_per_kg;

    const transaction = {
      nama_lengkap: formData.namaLengkap,
      nomor_handphone: formData.nomorHandphone,
      email: formData.email,
      massa_sampah_kg: massaSampahKg,
      nama_harita_pos: formData.haritaPos,
      jenis_barang: selectedBarang,
      harita_coins_didapat: totalHaritaCoins,
    };

    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error(
          'User ID not found in local storage. Please log in again.',
        );
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('point')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError.message);
        throw new Error('User profile not found.');
      }

      const currentPoints = profile?.point || 0;
      const newTotalPoints = currentPoints + totalHaritaCoins;

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ point: newTotalPoints })
        .eq('id', userId);

      if (updateError) {
        console.error('Error updating profile points:', updateError.message);
        throw new Error('Failed to update user points.');
      }

      const { data, error } = await supabase
        .from('tukar_sampah')
        .insert(transaction)
        .select();

      if (error) throw error;

      const newTransaction = data[0];

      const notificationData = {
        user_id: userId,
        title: 'Penukaran Sampah Berhasil',
        body: `Selamat! Anda berhasil menukar sampah dan mendapatkan ${totalHaritaCoins} Harita Coins.`,
        type: 'tukar_sampah',
        related_id: newTransaction.id,
      };

      const { error: notificationError } = await supabase
        .from('notifications')
        .insert(notificationData);

      if (notificationError) {
        console.error(
          'Error inserting notification:',
          notificationError.message,
        );
      }

      setTransaksiData({
        ...transaction,
        totalBarangDidapat,
      });

      setShowStruk(true);
    } catch (err: any) {
      console.error('Error submitting form:', err.message);
      alert(`Gagal mengirim form: ${err.message}`);
    }
  };

  const isFormValid =
    formData.namaLengkap &&
    formData.nomorHandphone &&
    formData.email &&
    formData.massaSampah &&
    formData.haritaPos &&
    selectedBarang;

  return (
    <>
      <section className="min-h-screen w-full py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {loading && (
            <p className="col-span-full text-center">Memuat data...</p>
          )}
          {error && (
            <p className="col-span-full text-center text-red-500">{error}</p>
          )}

          {!loading && !error && (
            <>
              {/* Lokasi pos terdekat */}
              <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-lg lg:col-span-3 lg:row-span-1">
                <h1 className="flex items-center gap-2 font-inter text-2xl font-bold text-black">
                  <span className="text-green-700">
                    <MapPin className="h-auto w-8" />
                  </span>
                  Lokasi pos terdekat
                </h1>
                <div className="flex flex-col gap-4">
                  {lokasiPosList.map((lokasi) => (
                    <div
                      key={lokasi.id}
                      className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition-shadow duration-200 hover:shadow-md"
                    >
                      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
                        <MapPin className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1 font-inter text-lg font-semibold text-green-800">
                          {lokasi.nama}
                        </h3>
                        <p className="font-nunito text-sm text-gray-600">
                          {lokasi.alamat}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                          <p className="font-nunito text-base font-bold text-gray-800">
                            {lokasi.rating.toFixed(1)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Barang yang ditukar */}
              <div className="rounded-2xl bg-white p-6 shadow-lg lg:col-span-3 lg:row-start-2">
                <h1 className="text-center font-inter text-lg font-bold">
                  Pilih Barang yang ditukar
                </h1>
                <div className="mt-4 grid w-full grid-cols-3 gap-4">
                  {jenisBarangList.map((barang) => {
                    const key = normalizeName(barang.nama_barang);
                    const imageSrc = imageMap[key] || imageMap.briket;

                    return (
                      <button
                        key={barang.id}
                        type="button"
                        onClick={() => setSelectedBarang(barang.nama_barang)}
                        className={`group relative col-span-1 h-[150px] overflow-hidden rounded-xl transition-all ${
                          selectedBarang === barang.nama_barang
                            ? 'scale-105 ring-4 ring-green-700'
                            : 'hover:scale-105'
                        }`}
                      >
                        {/* Gambar */}
                        <Image
                          src={imageSrc}
                          alt={barang.nama_barang}
                          fill
                          className="object-cover object-center"
                        />

                        {/* Overlay gradient hitam */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>

                        {/* Nama barang */}
                        <span
                          className={`absolute bottom-3 left-1/2 -translate-x-1/2 rounded-md px-2 py-1 text-sm font-bold transition-all ${
                            selectedBarang === barang.nama_barang
                              ? 'text-white'
                              : 'text-white opacity-0 group-hover:opacity-100'
                          }`}
                        >
                          {barang.nama_barang}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Penukaran */}
              <div className="rounded-2xl bg-white p-6 shadow-lg lg:col-span-2 lg:row-span-4">
                <div className="mb-6 text-center">
                  <h2 className="mb-2 font-inter text-2xl font-bold text-black">
                    Form Penukaran Sampah
                  </h2>
                  <p className="font-nunito text-sm text-gray-600">
                    Isi data Anda untuk menukar sampah dengan HaCoins
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Nama Lengkap */}
                  <div>
                    <label className="mb-2 block font-nunito font-semibold text-green-700">
                      <User className="mr-2 inline h-4 w-4" />
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      name="namaLengkap"
                      value={formData.namaLengkap}
                      onChange={handleInputChange}
                      placeholder="Masukkan nama lengkap Anda"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 
                        font-nunito text-black placeholder-gray-400 
                        transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* Nomor Handphone */}
                  <div>
                    <label className="mb-2 block font-nunito font-semibold text-green-700">
                      <Phone className="mr-2 inline h-4 w-4" />
                      Nomor Handphone
                    </label>
                    <input
                      type="tel"
                      name="nomorHandphone"
                      value={formData.nomorHandphone}
                      onChange={handleInputChange}
                      placeholder="Contoh: 08123456789"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 
                        font-nunito text-black placeholder-gray-400 
                        transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-2 block font-nunito font-semibold text-green-700">
                      <Mail className="mr-2 inline h-4 w-4" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="contoh@email.com"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 
                        font-nunito text-black placeholder-gray-400 
                        transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* Massa Sampah */}
                  <div>
                    <label className="mb-2 block font-nunito font-semibold text-green-700">
                      <Scale className="mr-2 inline h-4 w-4" />
                      Massa Sampah (Kg)
                    </label>
                    <input
                      type="number"
                      name="massaSampah"
                      value={formData.massaSampah}
                      onChange={handleInputChange}
                      placeholder="Contoh: 5"
                      min="0.1"
                      step="0.1"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 
                        font-nunito text-black placeholder-gray-400 
                        transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* Harita Pos Dropdown */}
                  <div>
                    <label className="mb-2 block font-nunito font-semibold text-green-700">
                      <MapPin className="mr-2 inline h-4 w-4" />
                      Harita Pos
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex w-full items-center justify-between rounded-xl border border-gray-300 
                          bg-white px-4 py-3 
                          font-nunito text-black focus:border-green-500 focus:ring-2 focus:ring-green-500"
                      >
                        <span
                          className={
                            formData.haritaPos ? 'text-black' : 'text-gray-400'
                          }
                        >
                          {formData.haritaPos || 'Pilih pos'}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${
                            isDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-xl bg-white shadow-lg">
                          {lokasiPosList.map((lokasi) => (
                            <button
                              key={lokasi.id}
                              type="button"
                              onClick={() => handleDropdownSelect(lokasi)}
                              className="flex w-full items-center justify-between px-4 
                                py-3 text-left transition-colors hover:bg-green-50"
                            >
                              <span className="font-nunito font-medium text-gray-800">
                                {lokasi.nama}
                              </span>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                <span className="font-nunito text-sm font-semibold text-gray-800">
                                  {lokasi.rating.toFixed(1)}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                    className={`w-full transform rounded-xl py-4 font-nunito text-lg font-bold transition-all ${
                      isFormValid
                        ? 'bg-green-700 text-white shadow-lg hover:bg-green-600 hover:shadow-xl'
                        : 'cursor-not-allowed bg-gray-200 text-gray-400'
                    }`}
                  >
                    Tukar Sekarang
                  </button>

                  {/* Info Text */}
                  <div className="text-center">
                    <p className="font-nunito text-sm text-gray-500">
                      Dengan menukar sampah, Anda berkontribusi untuk lingkungan
                      yang lebih bersih
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Modal Struk */}
      {showStruk && transaksiData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div
            id="struk-content"
            className="relative m-4 w-full max-w-lg rounded-lg bg-white p-8 shadow-2xl"
          >
            <h2 className="mb-6 text-center text-3xl font-bold text-green-700">
              Struk Penukaran Sampah
            </h2>
            <div className="space-y-4">
              <p className="font-nunito text-lg">
                <span className="font-bold">Nama:</span>{' '}
                {transaksiData.nama_lengkap}
              </p>
              <p className="font-nunito text-lg">
                <span className="font-bold">Nomor HP:</span>{' '}
                {transaksiData.nomor_handphone}
              </p>
              <p className="font-nunito text-lg">
                <span className="font-bold">Harita Pos:</span>{' '}
                {transaksiData.nama_harita_pos}
              </p>
              <p className="font-nunito text-lg">
                <span className="font-bold">Massa Sampah:</span>{' '}
                {transaksiData.massa_sampah_kg} Kg
              </p>
              <p className="font-nunito text-lg">
                <span className="font-bold">Barang yang Dipilih:</span>{' '}
                {transaksiData.jenis_barang}
              </p>
              <div className="mt-4 rounded-lg bg-green-50 p-4">
                <p className="text-md mb-2 font-nunito text-gray-600">
                  Anda akan mendapatkan {transaksiData.totalBarangDidapat} Kg{' '}
                  {transaksiData.jenis_barang}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-extrabold text-green-800">
                    {transaksiData.harita_coins_didapat}
                  </span>
                  <span className="font-inter text-xl font-bold text-gray-700">
                    Harita Coins
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={handleDownloadPdf}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 py-3 font-bold text-white transition-colors hover:bg-blue-600 sm:w-1/2"
              >
                <Download className="h-5 w-5" />
                Unduh Struk
              </button>
              <button
                onClick={() => setShowStruk(false)}
                className="w-full rounded-xl bg-gray-200 py-3 font-bold text-gray-700 transition-colors hover:bg-gray-300 sm:w-1/2"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
