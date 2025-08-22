import React from 'react';
import Card from 'components/card';
import piagam from '/public/img/awards/piagam.png';
import { MdOutlineStars } from 'react-icons/md'; 
import Image from 'next/image';

const Awards = () => {
  return (
    <Card extra={'w-full p-4 h-full'}>
      <div className="mb-8 w-full">
        <p className="text-xl font-bold text-navy-700 dark:text-white">
          Penghargaan
        </p>
        <p className="mt-2 text-base text-gray-600">
          Anda dapat melihat daftar pencapaian dan penghargaan yang telah Anda terima sebagai pengakuan atas dedikasi dan kinerja Anda.
        </p>
      </div>
      
      {/* Penghargaan 1 */}
      <div className="flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-2xl shadow-gray-200 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex items-center">
          <div className="h-[83px] w-[83px] flex items-center justify-center rounded-lg bg-gray-100 dark:bg-navy-600">
            <Image src={piagam} alt="Penghargaan 1" className="h-full w-full object-contain" />
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-navy-700 dark:text-white">
              Karyawan Teladan Bulan Ini
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Diberikan atas kinerja luar biasa pada bulan Mei 2024.
              <a
                className="ml-1 font-medium text-[#294B29] hover:text-[#294B29] dark:text-[#86A789] dark:hover:text-[#86A789]"
                href="#"
              >
                Lihat detail penghargaan
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Penghargaan 2 */}
      <div className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-2xl shadow-gray-200 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex items-center">
          <div className="h-[83px] w-[83px] flex items-center justify-center rounded-lg bg-gray-100 dark:bg-navy-600">
            <Image src={piagam} alt="Penghargaan 1" className="h-full w-full object-contain" />
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-navy-700 dark:text-white">
              Pencapaian Target Q1 2024
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Penghargaan tim atas pencapaian target operasional kuartal pertama.
              <a
                className="ml-1 font-medium text-[#294B29] hover:text-[#294B29] dark:text-[#86A789] dark:hover:text-[#86A789]"
                href="#"
              >
                Lihat detail penghargaan
              </a>
            </p>
          </div>
        </div>
      </div>
      
      {/* Penghargaan 3 */}
      <div className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-2xl shadow-gray-200 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex items-center">
          <div className="h-[83px] w-[83px] flex items-center justify-center rounded-lg bg-gray-100 dark:bg-navy-600">
            <Image src={piagam} alt="Penghargaan 1" className="h-full w-full object-contain" />
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-navy-700 dark:text-white">
              Inovasi Terbaik
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Diakui karena kontribusi dalam peningkatan alur kerja operasional.
              <a
                className="ml-1 font-medium text-[#294B29] hover:text-[#294B29] dark:text-[#86A789] dark:hover:text-[#86A789]"
                href="#"
              >
                Lihat detail penghargaan
              </a>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Awards;
