'use client';

import {
  MapPin,
  User,
  Phone,
  Mail,
  Scale,
  ChevronDown,
  Check,
  Star,
} from 'lucide-react';
import { useState } from 'react';

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
  rating: string;
  alamat: string;
}

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

  const lokasiPosList: LokasiPos[] = [
    { id: '1', nama: 'Harita Pos Taruna Bhakti', rating: '5.0', alamat: 'Jl. Taruna Bhakti No. 15, Bekasi Selatan' },
    { id: '2', nama: 'Harita Pos Pekapuran', rating: '5.0', alamat: 'Jl. Pekapuran Raya No. 89, Bekasi Utara' },
    { id: '3', nama: 'Harita Pos Merdeka', rating: '5.0', alamat: 'Jl. Merdeka No. 123, Bekasi Barat' },
    { id: '4', nama: 'Harita Pos Posan', rating: '5.0', alamat: 'Jl. Posan Raya No. 456, Bekasi Timur' },
  ];

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

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    // Handle submit logic here
    alert(
      `Form submitted!\nNama: ${formData.namaLengkap}\nHP: ${formData.nomorHandphone}\nEmail: ${formData.email}\nMassa: ${formData.massaSampah} Kg\nPos: ${formData.haritaPos}`
    );
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
                <div key={lokasi.id} className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-inter text-lg font-semibold text-green-800 mb-1">
                      {lokasi.nama}
                    </h3>
                    <p className="font-nunito text-sm text-gray-600">
                      {lokasi.alamat}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <p className="font-nunito text-base font-bold text-gray-800">{lokasi.rating}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Barang yang ditukar */}
          <div className="rounded-2xl bg-white p-6 shadow-lg lg:col-span-3 lg:row-start-2 lg:row-span-3">
            <h1 className="text-lg font-bold font-inter text-center">
              Pilih Barang yang ditukar
            </h1>
            <div className="mt-4 grid w-full grid-cols-3 gap-4">
              {['Pupuk', 'Bricket', 'Batako'].map((barang) => (
                <button
                  key={barang}
                  type="button"
                  onClick={() => setSelectedBarang(barang)}
                  className={`col-span-1 h-[100px] rounded-xl flex justify-center items-center font-bold text-2xl transition-all ${
                    selectedBarang === barang
                      ? 'bg-green-700 text-white shadow-lg scale-105'
                      : 'bg-blue-500 text-white hover:bg-green-600'
                  }`}
                >
                  {barang}
                </button>
              ))}
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
                      {formData.haritaPos || 'Pilih pos terdekat'}
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
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-nunito text-sm font-semibold text-gray-800">
                              {lokasi.rating}
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
        </div>
      </section>
    </>
  );
}