'use client';
import React, { useState, useEffect } from 'react';
import MiniCalendar from 'components/calendar/MiniCalendar';
import WeeklyRevenue from 'components/admin/default/WeeklyRevenue';
import TotalSpent from 'components/admin/default/TotalSpent';
import PieChartCard from 'components/admin/default/PieChartCard';
import { IoDocuments } from 'react-icons/io5';
import { MdBarChart, MdDashboard } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';

import Widget from 'components/widget/Widget';
import CheckTable from 'components/admin/default/CheckTable';
import ComplexTable from 'components/admin/default/ComplexTable';
import DailyTraffic from 'components/admin/default/DailyTraffic';
import TaskCard from 'components/admin/default/TaskCard';
import tableDataCheck from 'variables/data-tables/tableDataCheck';
import tableDataComplex from 'variables/data-tables/tableDataComplex';
import { createClient } from '@supabase/supabase-js';

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
  const [loading, setLoading] = useState(true);

  const fetchTotalUsers = async () => {
    try {
      if (!supabase) {
        console.error('Supabase client not initialized');
        return;
      }

      // Mengambil jumlah baris dari tabel 'profiles'
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

  useEffect(() => {
    fetchTotalUsers();
  }, []);

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


  useEffect(() => {
    fetchTotalKaryawan();
  }, [])

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
          subtitle={loading ? 'Memuat...' : totalUsers}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={'Saldo'}
          subtitle={'Rp 34.000.000'}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'Layanan'}
          subtitle={'942'}
        />
        <Widget
          icon={<MdBarChart className="h-6 w-6" />}
          title={'Mitra Aktif'}
          subtitle={loading ? 'Memuat...' : totalKaryawan}
        />
      </div>

      {/* Charts */}
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        <div>
          <CheckTable tableData={tableDataCheck} />
        </div>
        {/* Traffic chart & Pie Chart */}
        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div>
        {/* Complex Table , Task & Calendar */}
        <ComplexTable tableData={tableDataComplex} />
        {/* Task chart & Calendar */}
        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
