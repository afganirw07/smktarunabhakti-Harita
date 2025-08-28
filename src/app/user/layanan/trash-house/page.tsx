'use client';

import { useState, useEffect } from 'react';
import { SketchCalendarPicker } from 'components/magicui/calendar';
import {
  Coins,
  Camera,

} from 'lucide-react';

export default function TrashHouse() {
  const [date, setDate] = useState<Date>(new Date());
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [date3, setDate3] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [currentMonth, setCurrentMonth] = useState('');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  useEffect(() => {
  const today = new Date();
  const currentMonthName = today.toLocaleString('id-ID', { month: 'long' });
  setCurrentMonth(currentMonthName);

  // cari hari dalam minggu ini (0 = Minggu, 1 = Senin, dst.)
  const dayOfWeek = today.getDay();

  // cari Senin minggu depan
  const nextMonday = new Date(today);
  nextMonday.setDate(today.getDate() + (8 - dayOfWeek) % 7); 
  // kalau hari ini Senin (dayOfWeek=1), maka hasil = Senin depan

  // cari Minggu minggu depan
  const nextSunday = new Date(nextMonday);
  nextSunday.setDate(nextMonday.getDate() + 6);

  // format ke yyyy-mm-dd (supaya dipakai di input[type=date])
  const minDateString = nextMonday.toISOString().split("T")[0];
  const maxDateString = nextSunday.toISOString().split("T")[0];

  setMinDate(minDateString);
  setMaxDate(maxDateString);
}, []);


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!date1) {
      alert('Minimal isi tanggal pertama!');
      return;
    }
    console.log('Form submitted:', { date1, date2, date3, currentMonth });
  };

  return (
    <>
      <section className="h-auto w-full py-8">
        <div className="grid h-fit w-full grid-cols-1 gap-6 lg:grid-cols-9 lg:grid-rows-[auto_auto_auto]">
          {/* Calendar */}
          <div className="rounded-2xl bg-white p-6 shadow-lg lg:col-span-4 lg:row-span-2 lg:row-start-1 order-1">
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

          {/* Bonus Coins → tepat di bawah calendar */}
          <div className="relative rounded-2xl bg-white p-6 shadow-lg lg:col-span-4 lg:row-start-3 order-3 lg:order-2">
            <div className="space-y-4 pt-8">
              <div className="flex w-full items-center justify-start gap-2 font-inter text-xl font-semibold">
                Dapatkan bonus
                <span className="flex items-center gap-1 rounded-md bg-green-700 px-2 py-1 text-xs text-white">
                  <Coins className="h-auto w-4 text-white" />
                  HaritaCoins
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-green-700">
                    Upload Foto Sampah
                  </label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="block cursor-pointer rounded-lg border-2 border-dashed border-green-300 bg-green-50 p-3 text-center transition-colors hover:bg-green-100"
                    >
                      <Camera className="mx-auto mb-1 h-6 w-6 text-green-700" />
                      <span className="text-sm text-green-700">
                        {uploadedFile ? uploadedFile.name : 'Pilih foto'}
                      </span>
                    </label>
                    <button
                      className="w-full rounded-lg bg-green-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-green-800"
                      disabled={!uploadedFile}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <button className="w-full rounded-lg bg-green-700 px-4 py-2 font-inter text-sm font-semibold text-white transition-colors hover:bg-green-800">
                  Klaim 300 Coins
                </button>
              </div>
            </div>
          </div>

          {/* Form Jadwal */}
          <div className="rounded-2xl border-2 border-green-700 bg-white p-6 shadow-md lg:col-span-5 lg:row-span-2 lg:row-start-1 lg:row-end-3 order-2 lg:order-3">
            <h1 className="mb-6 text-center font-inter text-2xl font-bold text-black">
              Susun jadwal pengangkutan
            </h1>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="rounded-lg bg-green-50 p-4">
                <label className="mb-2 block text-sm font-semibold text-green-700">
                  Bulan
                </label>
                <input
                  type="text"
                  value={currentMonth}
                  readOnly
                  className="w-full rounded-lg border-2 border-green-300 bg-white p-3 font-medium text-gray-700"
                />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-green-700">
                      Pengangkutan 1 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={date1}
                      onChange={(e) => setDate1(e.target.value)}
                      min={minDate}
                      max={maxDate}
                      className="w-full rounded-lg border-2 border-green-300 p-3 focus:border-green-700 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-green-700">
                      Pengangkutan 2
                    </label>
                    <input
                      type="date"
                      value={date2}
                      onChange={(e) => setDate2(e.target.value)}
                      min={minDate}
                      max={maxDate}
                      className="w-full rounded-lg border-2 border-green-300 p-3 focus:border-green-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-green-700">
                      Pengangkutan 3
                    </label>
                    <input
                      type="date"
                      value={date3}
                      onChange={(e) => setDate3(e.target.value)}
                      min={minDate}
                      max={maxDate}
                      className="w-full rounded-lg border-2 border-green-300 p-3 focus:border-green-700 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Info:</strong> Anda hanya dapat memilih tanggal untuk pekan berikutnya
                </p>
              </div>

              <button
                type="submit"
                className="w-full transform rounded-lg bg-green-700 px-6 py-4 font-semibold text-white transition-all hover:scale-105 hover:bg-green-800"
              >
                 Simpan Jadwal
              </button>
            </form>
          </div>

            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-xl lg:col-span-5 order-4 ">
             
              <div className="mb-6 inline-flex items-center justify-center rounded-xl bg-green-700 p-3 shadow-md">
                <Coins className="h-6 w-6 text-white" />
              </div>

              {/* Title with improved typography */}
              <h3 className="mb-6 text-xl font-bold text-gray-900">
                Tata Cara Mendapatkan Bonus Coin
              </h3>

              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-700 text-xs font-bold text-white">
                    1
                  </span>
                  <span className="text-sm leading-relaxed text-gray-700">
                    Pisahkan sampah rumah anda untuk setiap kategorinya
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-700 text-xs font-bold text-white">
                    2
                  </span>
                  <span className="text-sm leading-relaxed text-gray-700">
                   Upload foto sampah anda yang sudah di sortir sebagai bukti  
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-700 text-xs font-bold text-white">
                    3
                  </span>
                  <span className="text-sm leading-relaxed text-gray-700">
                    Tunggu hingga petugas mengambil sampah anda
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-700 text-xs font-bold text-white">
                    4
                  </span>
                  <span className="text-sm leading-relaxed text-gray-700">
                    Klaim koin bonus mu dan tukarkan di toko
                  </span>
                </li>
              </ol>

              {/* Bottom accent line */}
              <div className="mt-8 h-1 w-full rounded-full bg-green-700"></div>
            </div>
          </div>
      </section>
    </>
  );
}