'use client';

import { useState, useEffect } from 'react';
import { SketchCalendarPicker } from 'components/magicui/calendar';
import { Coins, Camera } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function TrashHouse() {
  const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [date3, setDate3] = useState('');
  const [date4, setDate4] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [currentMonth, setCurrentMonth] = useState('');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [highlightDates, setHighlightDates] = useState<
    { month: number; date: number }[]
  >([]);
  const [highlightDates2, setHighlightDates2] = useState<
    { month: number; date: number }[]
  >([]);
  const [highlightDatesDefault, setHighlightDatesDefault] = useState<
    { month: number; date: number }[]
  >([]);
  const [remainingQuota, setRemainingQuota] = useState<number | null>(null);

  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;

  // Setup kalender & fetch data
  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();

    // Hitung tanggal untuk minggu ini
    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(
      today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1),
    ); // Senin minggu ini
    thisWeekStart.setHours(0, 0, 0, 0);

    const thisWeekEnd = new Date(thisWeekStart);
    thisWeekEnd.setDate(thisWeekEnd.getDate() + 6);
    thisWeekEnd.setHours(23, 59, 59, 999);

    // Hitung tanggal untuk minggu depan
    const nextWeekStart = new Date(thisWeekEnd);
    nextWeekStart.setDate(nextWeekStart.getDate() + 1);
    nextWeekStart.setHours(0, 0, 0, 0);

    const nextWeekEnd = new Date(nextWeekStart);
    nextWeekEnd.setDate(nextWeekStart.getDate() + 6);
    nextWeekEnd.setHours(23, 59, 59, 999);

    setCurrentMonth(nextWeekStart.toLocaleString('id-ID', { month: 'long' }));
    setMinDate(nextWeekStart.toISOString().split('T')[0]);
    setMaxDate(nextWeekEnd.toISOString().split('T')[0]);

    // Ambil jatah dan jadwal dari Supabase
    const fetchData = async () => {
      const userId =
        typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;

      if (!userId) {
        setRemainingQuota(null);
        return;
      }

      // Ambil jatah pengangkutan
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('pickup_quota')
        .eq('id', userId)
        .single();

      if (profileData) {
        setRemainingQuota(profileData.pickup_quota);
      } else {
        console.error('Gagal mengambil jatah:', profileError);
      }

      // Ambil jadwal kustom untuk minggu ini dan minggu depan
      const { data: scheduleData, error: scheduleError } = await supabase
        .from('pickup_schedules')
        .select('*')
        .eq('user_id', userId)
        .eq('is_custom', true)
        .gte('pickup_date', thisWeekStart.toISOString())
        .lte('pickup_date', nextWeekEnd.toISOString());

      if (scheduleData) {
        const defaultHighlights = [];
        const customHighlights = [];

        // Jadwal default (Senin, Rabu, Kamis)
        const defaultDates = [
          new Date(thisWeekStart),
          new Date(thisWeekStart.getTime() + 2 * 24 * 60 * 60 * 1000), // Rabu
          new Date(thisWeekStart.getTime() + 3 * 24 * 60 * 60 * 1000), // Kamis
        ];

        // Filter jadwal default yang belum lewat dan tambahkan ke highlight
        defaultDates.forEach((d) => {
          if (d.getTime() >= today.getTime()) {
            defaultHighlights.push({ month: d.getMonth(), date: d.getDate() });
          }
        });

        // Filter jadwal kustom
        scheduleData.forEach((d: any) => {
          const pickupDate = new Date(d.pickup_date);
          const highlight = {
            month: pickupDate.getMonth(),
            date: pickupDate.getDate(),
          };

          if (
            pickupDate.getTime() >= today.getTime() &&
            pickupDate.getTime() <= thisWeekEnd.getTime()
          ) {
            // Jika tanggal kustom ada di minggu ini, warnai kuning
            defaultHighlights.push(highlight);
          } else if (
            pickupDate.getTime() >= nextWeekStart.getTime() &&
            pickupDate.getTime() <= nextWeekEnd.getTime()
          ) {
            // Jika tanggal kustom ada di minggu depan, warnai biru
            customHighlights.push(highlight);
          }
        });

        // Atur state highlight kalender
        setHighlightDatesDefault(defaultHighlights);
        setHighlightDates2(customHighlights);
      } else {
        console.error('Gagal mengambil jadwal:', scheduleError);
      }
    };

    fetchData();
  }, [userId]);

  // Upload file
  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  // Submit jadwal
  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    const dates = [date1, date2, date3, date4].filter(Boolean);

    if (dates.length === 0) {
      alert("Minimal isi tanggal pertama!");
      return;
    }

    if (dates.length > 4) {
      alert("Anda hanya bisa memilih maksimal 4 tanggal pengangkutan.");
      return;
    }

    const uniqueDates = new Set(dates);
    if (uniqueDates.size !== dates.length) {
      alert("Tidak boleh memilih tanggal yang sama lebih dari sekali di input!");
      return;
    }

    if (remainingQuota === null || remainingQuota === 0) {
      alert("Jatah pengangkutan Anda sudah habis!");
      return;
    }

    const nextWeekStart = new Date(minDate);
    const nextWeekEnd = new Date(maxDate);

    const invalidDates = dates.filter((d) => {
      const dateObj = new Date(d);
      return dateObj < nextWeekStart || dateObj > nextWeekEnd;
    });

    if (invalidDates.length > 0) {
      alert(
        `Tanggal ${invalidDates.join(
          ", "
        )} tidak valid. Anda hanya bisa memilih tanggal di minggu depan.`
      );
      return;
    }

    if (!userId) return;

    // 🔥 CEK APAKAH TANGGAL SUDAH ADA DI DB
    const { data: existingSchedules, error: existingError } = await supabase
      .from("pickup_schedules")
      .select("pickup_date")
      .eq("user_id", userId)
      .gte("pickup_date", minDate)
      .lte("pickup_date", maxDate);

    if (existingError) {
      console.error("Gagal cek jadwal:", existingError);
      alert("Gagal cek jadwal lama!");
      return;
    }

    const existingDates = existingSchedules?.map((s: any) =>
      new Date(s.pickup_date).toISOString().split("T")[0]
    ) || [];

    const duplicates = dates.filter((d) => existingDates.includes(d));
    if (duplicates.length > 0) {
      alert(`Tanggal ${duplicates.join(", ")} sudah ada di jadwal Anda!`);
      return;
    }

    // 🚨 FIX: kalau user input manual → hapus default minggu depan
    await supabase
      .from("pickup_schedules")
      .delete()
      .eq("user_id", userId)
      .eq("is_custom", false) // hapus default
      .gte("pickup_date", minDate)
      .lte("pickup_date", maxDate);

    // INSERT JADWAL BARU
    const { error: insertError } = await supabase
      .from("pickup_schedules")
      .insert(
        dates.map((d) => ({
          user_id: userId,
          pickup_date: d,
          is_custom: true,
          status: "pending",
        }))
      );

    if (insertError) {
      console.error("Gagal menyimpan jadwal:", insertError);
      alert("Jadwal gagal disimpan!");
      return;
    }

    // UPDATE QUOTA
    const newQuota = remainingQuota - dates.length;
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ pickup_quota: newQuota })
      .eq("id", userId);

    if (updateError) {
      console.error("Gagal mengurangi jatah:", updateError);
      alert("Jadwal berhasil disimpan, tapi gagal mengurangi jatah.");
    } else {
      setRemainingQuota(newQuota);
      alert("Jadwal berhasil disimpan! Default minggu depan sudah diganti dengan input Anda.");
    }
  };

  // Submit foto bonus
  const handleBonusSubmit = async () => {
    if (!userId || !uploadedFile) return;

    const sanitizedFileName = uploadedFile.name
      .replace(/\s+/g, '_')
      .replace(/[^\w.-]/g, '');

    // upload ke storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('photo_url')
      .upload(`${userId}/${sanitizedFileName}`, uploadedFile, { upsert: true });

    if (uploadError) {
      console.error('Gagal upload foto:', uploadError);
      alert('Gagal upload foto');
      return;
    }

    const photoUrl = supabase.storage
      .from('photo_url')
      .getPublicUrl(uploadData.path).data.publicUrl;

    // simpan ke tabel bonus_claims
    const { error: insertError } = await supabase.from('bonus_claims').insert({
      user_id: userId,
      photo_url: photoUrl,
      status: 'pending',
    });

    if (insertError) {
      console.error('Gagal menyimpan klaim bonus:', insertError);
      alert('Gagal menyimpan klaim bonus');
    } else {
      alert('Bonus diklaim, tunggu verifikasi admin!');
      setUploadedFile(null);
    }
  };

  // Klaim Coins (Logic Baru)
  const handleClaimCoins = async () => {
    const userId = localStorage.getItem('user_id');

    if (!userId) {
      alert('User tidak ditemukan');
      return;
    }

    const { data: claims, error: claimsError } = await supabase
      .from('bonus_claims')
      .select('id, photo_url')
      .eq('user_id', userId)
      .eq('status', 'Konfirmasi'); 

    if (claimsError) {
      console.error(claimsError);
      alert('Gagal cek data klaim');
      return;
    }

    if (!claims || claims.length === 0) {
      alert('Tidak ada foto yang sudah dikonfirmasi untuk diklaim.');
      return;
    }
    
    const claimToProcess = claims[0];
    const claimId = claimToProcess.id;
    const bonusPoints = 300;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('point')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error(profileError);
      alert('Gagal mengambil data profil');
      return;
    }

    const { error: updateProfileError } = await supabase
      .from('profiles')
      .update({ point: (profile.point || 0) + bonusPoints })
      .eq('id', userId);

    if (updateProfileError) {
      console.error(updateProfileError);
      alert('Gagal klaim coins');
      return;
    }

    const { error: updateClaimError } = await supabase
      .from('bonus_claims')
      .update({ status: 'Diklaim', claimed_at: new Date() })
      .eq('id', claimId);

    if (updateClaimError) {
      console.error(updateClaimError);
      alert('Coins berhasil ditambah, tapi gagal perbarui status klaim.');
      return;
    }

    const notificationData = {
      user_id: userId,
      title: 'Klaim Bonus Berhasil!',
      body: `Selamat! Anda berhasil mengklaim bonus ${bonusPoints} Harita Coins.`,
      type: 'klaim_bonus',
      related_id: claimId, 
    };

    const { error: notificationError } = await supabase
      .from('notifications')
      .insert(notificationData);

    if (notificationError) {
      console.error('Gagal menyimpan notifikasi:', notificationError);
    }

    alert(`Berhasil klaim ${bonusPoints} Coins!`);
  };

  return (
    <section className="h-auto w-full py-8">
      <div className="mb-8 flex w-full flex-col justify-center gap-4 lg:flex-row lg:justify-between lg:gap-0">
        <h1 className="font-inter text-3xl font-bold text-green-700">
          Trash House
        </h1>
      </div>

      <div className="grid h-fit w-full grid-cols-1 gap-6 lg:grid-cols-9 lg:grid-rows-[auto_auto_auto]">
        {/* Kalender */}
        <div className="order-1 flex h-fit flex-col items-center justify-center rounded-2xl bg-white p-6 shadow-lg lg:col-span-4 lg:row-span-2 lg:row-start-1">
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
              highlightDates={highlightDatesDefault} // Jadwal default minggu ini (kuning)
              highlightClassName="bg-amber-500 text-white"
              highlightDates2={highlightDates2} // Jadwal kustom minggu depan (biru)
              highlightClassName2="bg-blue-500 text-white"
            />
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4 border-t pt-4 md:gap-6 lg:gap-2">
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
            <div className="my-4 flex h-[100px] w-[320px]  items-center justify-between rounded-xl bg-green-700 px-8">
              {/* Kiri */}
              <div className="flex flex-col justify-center">
                <span className="font-inter text-lg font-semibold text-white">
                  Jatah pengangkutan
                </span>
                <span className="-mt-1 text-base text-white opacity-80">
                  Bulan ini
                </span>
              </div>

              {/* Kanan */}
              <div className="mt-7 text-3xl font-bold text-yellow-200 ">
                {remainingQuota !== null ? `${remainingQuota}x` : '...'}
              </div>
            </div>
          </div>
        </div>

        {/* Bonus & Upload Foto */}
        <div className="relative order-3 rounded-2xl bg-white p-6 shadow-lg lg:order-2 lg:col-span-4 lg:row-start-3">
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
                    onClick={handleBonusSubmit}
                  >
                    Kirim
                  </button>
                  <button
                    className="w-full rounded-lg bg-green-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-green-800"
                    onClick={handleClaimCoins}
                  >
                    Klaim 300 Coins
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Susun jadwal */}
        <div className="order-2 rounded-2xl border-2 border-green-700 bg-white p-6 shadow-md lg:order-3 lg:col-span-5 lg:row-span-2 lg:row-start-1 lg:row-end-3">
          <h1 className="mb-6 text-center font-inter text-2xl font-bold text-black">
            Susun jadwal pengangkutan
          </h1>
          <div className="space-y-6">
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
              <div className="grid grid-cols-2 gap-4">
                {[date1, date2, date3, date4].map((d, i) => (
                  <div key={i}>
                    <label className="mb-2 block text-sm font-semibold text-green-700">
                      Pengangkutan {i + 1}{' '}
                      {i === 0 && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="date"
                      value={[date1, date2, date3, date4][i]}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (i === 0) setDate1(val);
                        else if (i === 1) setDate2(val);
                        else if (i === 2) setDate3(val);
                        else setDate4(val);
                      }}
                      min={minDate}
                      max={maxDate}
                      className="w-full rounded-lg border-2 border-green-300 p-3 focus:border-green-700 focus:outline-none"
                      required={i === 0}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
              <p className="text-sm text-yellow-800">
                <strong>Info:</strong> Anda hanya dapat memilih tanggal untuk
                pekan berikutnya
              </p>
            </div>

            <button
              onClick={handleFormSubmit}
              className="w-full transform rounded-lg bg-green-700 px-6 py-4 font-semibold text-white transition-all hover:scale-105 hover:bg-green-800"
            >
              Simpan Jadwal
            </button>
          </div>
        </div>

        {/* Tata Cara Mendapatkan Bonus Coin */}
        <div className="relative order-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-xl lg:col-span-5">
          <div className="mb-6 inline-flex items-center justify-center rounded-xl bg-green-700 p-3 shadow-md">
            <Coins className="h-6 w-6 text-white" />
          </div>

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

          <div className="mt-8 h-1 w-full rounded-full bg-green-700"></div>
        </div>
      </div>
    </section>
  );
}