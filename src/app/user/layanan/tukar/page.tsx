'use client';

import {
  MapPin,
  MapPinCheck,
  User,
  Phone,
  Mail,
  Scale,
  ChevronDown,
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
  jarak: string;
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
    { id: '1', nama: 'Harita Pos Taruna Bhakti', jarak: '0.8 Km' },
    { id: '2', nama: 'Harita Pos Pekapuran', jarak: '1.6 Km' },
    { id: '3', nama: 'Harita Pos Merdeka', jarak: '3.4 Km' },
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Handle submit logic here
    alert(
      `Form submitted!\nNama: ${formData.namaLengkap}\nHP: ${formData.nomorHandphone}\nEmail: ${formData.email}\nMassa: ${formData.massaSampah} Kg\nPos: ${formData.haritaPos}`,
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

        <div>
            
        </div>


        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 ">
          <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-lg lg:col-span-3 lg:row-span-1 ">
            <h1 className="flex items-center gap-2 font-inter text-2xl font-bold text-black">
              <span className="text-green-700">
                <MapPin className="h-auto w-8" />
              </span>
              Lokasi pos terdekat
            </h1>

            <div className="flex h-[300px] w-full items-center justify-center rounded-2xl bg-green-100">
              <h1 className="flex gap-2 font-inter text-xl font-bold text-black">
                <span>
                  <MapPin className="h-auto w-8 text-green-700" />
                </span>
                Map Dummy
              </h1>
            </div>

            

            <div className="flex flex-col gap-4 ">
              {/* Lokasi 1 */}
              <div className="h-auto w-full">
                <div>
                  <div className="flex justify-between border-b-2 border-black/10 p-2">
                    <h1 className="font-inter text-lg font-semibold text-green-800">
                      Harita Pos Taruna Bhakti
                    </h1>
                    <p className="flex gap-1 font-nunito text-base font-bold text-red-600">
                      0.8 Km
                      <span>
                        <MapPinCheck
                          className="h-auto w-5 text-green-800"
                          strokeWidth={2}
                        />
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Lokasi 2 */}
              <div className="h-auto w-full">
                <div>
                  <div className="flex justify-between border-b-2 border-black/10 p-2">
                    <h1 className="font-inter text-lg font-semibold text-green-800">
                      Harita Pos Pekapuran
                    </h1>
                    <p className="flex gap-1 font-nunito text-base font-bold text-red-600">
                      1.6 Km
                      <span>
                        <MapPinCheck
                          className="h-auto w-5 text-green-800"
                          strokeWidth={2}
                        />
                      </span>
                    </p>
                  </div>
                </div>
              </div>


              {/* Lokasi 3 */}
              <div className="h-auto w-full">
                <div>
                  <div className="flex justify-between border-b-2 border-black/10 p-2">
                    <h1 className="font-inter text-lg font-semibold text-green-800">
                      Harita Pos Merdeka
                    </h1>
                    <p className="flex gap-1 font-nunito text-base font-bold text-red-600">
                      3.4 Km
                      <span>
                        <MapPinCheck
                          className="h-auto w-5 text-green-800"
                          strokeWidth={2}
                        />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
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
                    : 'bg-blueSecondary text-white hover:bg-green-600'
                }`}
              >
                {barang}
              </button>
            ))}
          </div>
        </div>

          {/* Form Penukaran */}
          <div className="rounded-2xl bg-white p-6 shadow-lg lg:col-span-2  lg:row-span-4">
            <div className="mb-6 text-center">
              <h2 className="mb-2 font-inter text-2xl font-bold text-black">
                Form Penukaran Sampah
              </h2>
              <p className="font-nunito text-sm text-gray-600">
                Isi data Anda untuk menukar sampah dengan HaCoins
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  required
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
                  required
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
                  required
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
                  required
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
                          <span className="font-nunito text-sm font-semibold text-red-600">
                            {lokasi.jarak}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full transform rounded-xl py-4 font-nunito text-lg font-bold transition-all    ${
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
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
