'use client';
import React, { useState, useEffect } from 'react';
import WeeklyRevenue from 'components/admin/default/WeeklyRevenue';
import TotalSpent from 'components/admin/default/TotalSpent';
import PieChartCard from 'components/admin/default/PieChartCard';
import { IoDocuments } from 'react-icons/io5';
import { MdBarChart, MdDashboard } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';

import Widget from 'components/widget/Widget';
import DailyTraffic from 'components/admin/default/DailyTraffic';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

// Inisialisasi Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalKaryawan, setTotalkaryawan] = useState(0);
  const [Layanan, SetLayanan] = useState(0);
  const [loading, setLoading] = useState(true);
  const [photosToConfirm, setPhotosToConfirm] = useState([]);

  const fetchTotalUsers = async () => {
    try {
      if (!supabase) {
        console.error('Supabase client not initialized');
        return;
      }

      const { count, error } = await supabase
        .from('profiles')
        .select('id', { count: 'exact', head: true });

      if (error) throw error;

      setTotalUsers(count);
    } catch (error) {
      console.error('Error fetching total users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalKaryawan = async () => {
    try {
      if (!supabase) {
        console.error('Supabase client not initialized');
        return;
      }

      const { count, error } = await supabase
        .from('data_karyawan')
        .select('id', { count: 'exact', head: true });

      if (error) throw error;

      setTotalkaryawan(count);
    } catch (error) {
      console.error('Error fetching total users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalLayanan = async () => {
    try {
      if (!supabase) {
        console.error('Supabase client not initialized');
        return;
      }

      const { count: countAset, error: errorAset } = await supabase
        .from('riwayat_aset')
        .select('id', { count: 'exact', head: true });
      if (errorAset) throw errorAset;

      const { count: countTrx, error: errorTrx } = await supabase
        .from('transactions')
        .select('user_id', { count: 'exact', head: true });
      if (errorTrx) throw errorTrx;

      const { count: countTukar, error: errorTukar } = await supabase
        .from('tukar_sampah')
        .select('id', { count: 'exact', head: true });
      if (errorTukar) throw errorTukar;

      const { count: countReports, error: errorReports } = await supabase
        .from('reports')
        .select('id', { count: 'exact', head: true });
      if (errorReports) throw errorReports;

      const total =
        (countAset || 0) +
        (countTrx || 0) +
        (countTukar || 0) +
        (countReports || 0);

      SetLayanan(total);
    } catch (error) {
      console.error('Error fetching total layanan:', error);
    }
  };

  const fetchFoto = async () => {
    try {
      if (!supabase) {
        console.error('Supabase client not initialized');
        return;
      }

      const { data, error } = await supabase
        .from('bonus_claims')
        .select('*, profiles(first_name, last_name)')
        .eq('status', 'pending')
        .order('claimed_at', { ascending: false });

      if (error) throw error;

      // langsung pakai photo_url dari DB
      const photosWithPublicUrls = data.map((photo) => ({
        ...photo,
        public_url: photo.photo_url,
      }));

      setPhotosToConfirm(photosWithPublicUrls);
      console.log('Fetched photos:', photosWithPublicUrls);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const handleConfirmation = async (photoId) => {
    try {
      if (!supabase) {
        console.error('Supabase client not initialized');
        return;
      }

      // You can get the admin user ID from the Supabase session
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.error('Admin user not authenticated.');
        return;
      }

      const { data, error } = await supabase
        .from('bonus_claims')
        .update({
          status: 'Konfirmasi',
          is_claimed: true,
          admin_id: user.id,
        })
        .eq('id', photoId);

      if (error) {
        throw error;
      }

      console.log('Photo confirmed successfully:', data);
      fetchFoto();
    } catch (error) {
      console.error('Error confirming photo:', error);
    }
  };

  const handleRejection = async (photoId) => {
    try {
      if (!supabase) {
        console.error('Supabase client not initialized');
        return;
      }

      const { data, error } = await supabase
        .from('bonus_claims')
        .update({
          status: 'Ditolak',
          is_claimed: false,
        })
        .eq('id', photoId);

      if (error) {
        throw error;
      }

      console.log('Photo rejected successfully:', data);
      fetchFoto();
    } catch (error) {
      console.error('Error rejecting photo:', error);
    }
  };

  useEffect(() => {
    fetchTotalUsers();
    fetchTotalKaryawan();
    fetchTotalLayanan();
    fetchFoto();
  }, []);

  return (
    <div>
      {/* Card widget */}
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'Pendapatan'}
          subtitle={'Rp 82.000.000'}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={'Pengeluaran bulan ini'}
          subtitle={'Rp 48.000.000'}
        />
        <Widget
          icon={<FaUserFriends className="h-7 w-7" />}
          title={'Pengguna Terdaftar'}
          subtitle={loading ? 'Memuat...' : String(totalUsers)}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={'Saldo'}
          subtitle={'Rp 34.000.000'}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'Layanan'}
          subtitle={loading ? 'Memuat...' : String(Layanan)}
        />
        <Widget
          icon={<MdBarChart className="h-6 w-6" />}
          title={'Karyawan'}
          subtitle={loading ? 'Memuat...' : String(totalKaryawan)}
        />
      </div>

      {/* Charts */}
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Traffic chart & Pie Chart */}
        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div>

        {/* confirmation photo */}
        <div className="relative flex h-auto w-full flex-col gap-6 rounded-2xl py-8 md:px-6">
          {/* Header */}
          <div>
            <h1 className="text-xl font-bold">Konfirmasi Foto Sampah</h1>
          </div>

          <div className="scrollbar-none flex h-auto w-full flex-col flex-nowrap gap-6 overflow-y-auto md:flex-row md:flex-wrap lg:h-[350px] lg:flex-col  lg:flex-nowrap ">
            {photosToConfirm.length > 0 ? (
              photosToConfirm.map((photo) => (
                <div
                  key={photo.id}
                  className="flex w-full items-center gap-4 rounded-xl border border-black/20 p-4 py-4 md:w-fit md:px-6 lg:w-full lg:p-4"
                >
                  {/* Image from user */}
                  <div className="flex h-20 w-28 items-center justify-center rounded-xl bg-blueSecondary">
                    {photo.public_url ? (
                      <Image
                      height={80}
                      width={128}
                        src={photo.public_url}
                        alt="Gambar dari user"
                        className="h-full w-full rounded-xl object-cover"
                      />
                    ) : (
                      <h1 className="text-center text-sm font-bold text-white">
                        Gambar dari user
                      </h1>
                    )}
                  </div>

                  {/* User info */}
                  <div className="flex h-full flex-col justify-between">
                    <h1 className="text-base font-bold">
                      {photo.profiles?.first_name}{' '}
                      {photo.profiles?.last_name || 'User tidak ditemukan'}
                    </h1>
                    <p className="text-sm font-semibold text-black/40">
                      {new Date(photo.claimed_at).toLocaleDateString()}
                    </p>
                    <div className='flex gap-2 items-center justify-start'>
                      <button onClick={() => handleRejection(photo.id)} className='mt-2 rounded-lg bg-red-500 px-4 py-1 font-nunito text-sm font-semibold text-white transition-all duration-200 ease-out hover:bg-red-400'>
                        Tolak
                      </button>
                    <button
                      onClick={() => handleConfirmation(photo.id)}
                      className="mt-2 rounded-lg bg-green-700 px-4 py-1 font-nunito text-sm font-semibold text-white transition-all duration-200 ease-out hover:bg-green-800 "
                    >
                      Konfirmasi
                    </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Tidak ada foto yang perlu dikonfirmasi saat ini.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
