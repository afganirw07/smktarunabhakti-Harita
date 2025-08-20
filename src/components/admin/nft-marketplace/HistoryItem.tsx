import React from 'react';
import Image from 'next/image';
import Card from 'components/card';
import { BsCheckCircleFill } from 'react-icons/bs';

import alat from '/public/img/aset/alat.png';
import gudang from '/public/img/aset/gudang.png';
import truk from '/public/img/aset/truk.png';

const HistoryCard = () => {
  // Data aset yang disesuaikan, menggunakan gambar yang Anda impor
  const HistoryData = [
    {
      image: truk,
      asset: 'Truk Pick-up #01',
      activity: 'Perawatan Rutin',
      performer: 'Admin Budi',
      date: '10 menit lalu',
    },
    {
      image: alat,
      asset: 'Mesin Daur Ulang',
      activity: 'Pengisian Bahan Bakar',
      performer: 'Admin Siti',
      date: '1 jam lalu',
    },
    {
      image: gudang,
      asset: 'Gudang Utama',
      activity: 'Pembaruan Status',
      performer: 'Admin Budi',
      date: '5 jam lalu',
    },
    {
      image: truk,
      asset: 'Truk Pick-up #02',
      activity: 'Perbaikan Mesin',
      performer: 'Admin Ani',
      date: '1 hari lalu',
    },
    {
      image: alat,
      asset: 'Mesin Komposter',
      activity: 'Pergantian Filter',
      performer: 'Admin Budi',
      date: '2 hari lalu',
    },
  ];

  return (
    <Card extra={'mt-3 !z-5 overflow-hidden'}>
      {/* Riwayat Aktivitas Aset Header */}
      <div className="flex items-center justify-between rounded-t-3xl p-3">
        <div className="text-lg font-bold text-navy-700 dark:text-white">
          Riwayat Aktivitas Aset
        </div>
        <button className="linear rounded-[20px] bg-[#294B29] px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-[#86A789] dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
          Lihat Semua
        </button>
      </div>

      {/* Konten Riwayat */}
      {HistoryData.map((data, index) => (
        <div
          key={index}
          className="flex h-full w-full items-start justify-between bg-white px-3 py-[20px] hover:shadow-2xl dark:!bg-navy-800 dark:shadow-none dark:hover:!bg-navy-700"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center">
              <Image
                width="64"
                height="64"
                className="h-full w-full rounded-xl"
                src={data.image}
                alt={data.asset}
              />
            </div>
            <div className="flex flex-col">
              <h5 className="text-base font-bold text-navy-700 dark:text-white">
                {data.asset}
              </h5>
              <p className="mt-1 text-sm font-normal text-gray-600">
                {data.activity} oleh {data.performer}
              </p>
            </div>
          </div>

          <div className="mt-1 flex items-center justify-center text-navy-700 dark:text-white">
            <div className="ml-2 flex items-center text-sm font-normal text-gray-600 dark:text-white">
              <p>{data.date}</p>
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default HistoryCard;