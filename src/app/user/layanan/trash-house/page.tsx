'use client';

import { useState } from 'react';
import { SketchCalendarPicker } from 'components/magicui/calendar';
import { Coins, Truck, Calendar, Camera, FileText, Award } from 'lucide-react';

export default function TrashHouse() {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState('');
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [date3, setDate3] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  return (
    <>
      <section className="h-auto w-full py-8">
        <div className="grid h-fit w-full grid-cols-1 gap-6 lg:grid-cols-9 lg:grid-rows-3">
          <div className="rounded-2xl bg-white p-6 shadow-lg lg:col-span-4 lg:row-span-3">
            <div className="flex flex-col items-center justify-center gap-4">
              <h3 className="mb-4 font-nunito text-xl font-bold text-green-700">
                Jadwal Pengangkutan
              </h3>
            </div>
            <div className="flex items-center justify-center">
              <SketchCalendarPicker
                variant="artistic"
                value={date}
                onChange={setDate}
                highlightDates={[
                  { month: 7, date: 28 },
                  { month: 7, date: 29 },
                  { month: 7, date: 31 },
                ]}
                highlightClassName="bg-amber-500 text-white"
                highlightDates2={[
                  { month: 8, date: 3 },
                  { month: 8, date: 4 },
                  { month: 8, date: 6 },
                ]}
                highlightClassName2="bg-blue-500 text-white"
              />
            </div>
            <div className="mt-4 flex flex-col justify-start gap-2 border-t pt-4 md:flex-row md:justify-center md:gap-6">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-green-700"></div>
                <h1 className="font-nunito text-base font-semibold text-black">
                  Hari ini
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                <h1 className="font-nunito text-base font-semibold text-black">
                  Minggu ini
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-blue-600"></div>
                <h1 className="font-nunito text-base font-semibold text-black">
                  Minggu Depan
                </h1>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-green-800 p-6 lg:col-span-2 lg:row-span-1 relative">
            <div className="absolute top-4 left-4">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <div className="pt-8">
              <h1 className="text-center font-inter text-lg font-bold text-white mb-3">
                Total sampah yang di angkut
              </h1>
              <div className="text-center">
                <span className="text-3xl font-bold text-white">2,457</span>
                <p className="text-sm text-green-200 mt-1">kg bulan ini</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gray-50 p-6 shadow-lg lg:col-span-3 lg:row-span-1 relative">
            <div className="absolute top-4 left-4">
              <Calendar className="h-6 w-6 text-white bg-green-700 p-1 rounded" />
            </div>
            <div className="pt-8">
              <h1 className="text-center font-inter text-lg font-bold text-black mb-4">
                Butuh pengangkut sekarang?
              </h1>
              <div className="text-center">
                <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full font-semibold transition-colors">
                  Panggil Sekarang
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-green-700 bg-white p-6 shadow-md lg:col-span-5 lg:row-span-2">
            <h1 className="text-black text-center font-inter text-2xl font-bold mb-6">
              FORM PILIH JADWAL
            </h1>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-green-700 mb-2">
                  Pilih Bulan
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full p-3 border-2 border-green-300 rounded-lg focus:border-green-700 focus:outline-none"
                >
                  <option value="">Pilih Bulan</option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-green-700 mb-2">
                    Tanggal 1
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={date1}
                    onChange={(e) => setDate1(e.target.value)}
                    placeholder="DD"
                    className="w-full p-3 border-2 border-green-300 rounded-lg focus:border-green-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-green-700 mb-2">
                    Tanggal 2
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={date2}
                    onChange={(e) => setDate2(e.target.value)}
                    placeholder="DD"
                    className="w-full p-3 border-2 border-green-300 rounded-lg focus:border-green-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-green-700 mb-2">
                    Tanggal 3
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={date3}
                    onChange={(e) => setDate3(e.target.value)}
                    placeholder="DD"
                    className="w-full p-3 border-2 border-green-300 rounded-lg focus:border-green-700 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button className="w-full bg-green-700 hover:bg-green-800 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                  Simpan Jadwal
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid h-auto w-full grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="col-span-1 rounded-2xl bg-white p-6 shadow-lg relative">
            <div className="absolute top-4 left-4">
              <Coins className="h-6 w-6 text-white bg-green-700 p-1 rounded" />
            </div>
            
            <div className="pt-8 space-y-4">
              <div className="flex w-full items-center justify-start gap-2 font-inter text-xl font-semibold">
                Dapatkan bonus
                <span className="flex items-center gap-1 rounded-md bg-green-700 px-2 py-1 text-xs text-white">
                  <Coins className="h-auto w-4 text-white" />
                  HaritaCoins
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-green-700 mb-2">
                    Upload Foto Sampah
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex-1 cursor-pointer bg-green-50 border-2 border-green-300 border-dashed rounded-lg p-3 text-center hover:bg-green-100 transition-colors"
                    >
                      <Camera className="h-6 w-6 text-green-700 mx-auto mb-1" />
                      <span className="text-sm text-green-700">
                        {uploadedFile ? uploadedFile.name : 'Pilih foto'}
                      </span>
                    </label>
                    <button
                      className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                      disabled={!uploadedFile}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <button className="rounded-full bg-green-700 hover:bg-green-800 px-4 py-2 font-inter text-sm font-semibold text-white transition-colors">
                  Klaim 300 Coins
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-1 rounded-2xl bg-white shadow-lg p-6 relative">
            <div className="absolute top-4 left-4">
              <FileText className="h-6 w-6 text-white bg-green-700 p-1 rounded" />
            </div>
            
            <div className="pt-8">
              <h2 className="font-inter text-xl font-bold text-green-700 mb-4 text-center">
                Riwayat Pengangkutan
              </h2>
              <div className="space-y-3">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">25 Agustus 2025</span>
                    <span className="text-xs bg-green-200 px-2 py-1 rounded">Selesai</span>
                  </div>
                  <p className="text-sm text-gray-600">Sampah organik - 15kg</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">22 Agustus 2025</span>
                    <span className="text-xs bg-green-200 px-2 py-1 rounded">Selesai</span>
                  </div>
                  <p className="text-sm text-gray-600">Sampah anorganik - 8kg</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">28 Agustus 2025</span>
                    <span className="text-xs bg-yellow-200 px-2 py-1 rounded">Dijadwalkan</span>
                  </div>
                  <p className="text-sm text-gray-600">Sampah campuran - 12kg</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 rounded-2xl bg-white shadow-lg p-6 relative">
            <div className="absolute top-4 left-4">
              <Award className="h-6 w-6 text-white bg-green-700 p-1 rounded" />
            </div>
            
            <div className="pt-8">
              <h2 className="font-inter text-xl font-bold text-green-700 mb-4 text-center">
                Status Reward
              </h2>
              <div className="text-center space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Coins className="h-5 w-5 text-green-700" />
                    <span className="text-2xl font-bold text-green-700">1,250</span>
                  </div>
                  <p className="text-sm text-gray-600">Total HaritaCoins</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress ke reward berikutnya:</span>
                    <span className="font-semibold">750/1000 poin</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-700 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                  <p className="text-xs text-gray-500">250 poin lagi untuk bonus 500 coins!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}