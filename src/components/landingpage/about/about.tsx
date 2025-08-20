'use client';

import { useState } from 'react';
import Image from 'next/image';
``;
import { Recycle, Leaf, Users } from 'lucide-react';

export default function About() {
  const [seeMore, setSeeMore] = useState(false);

  return (
    <>
      <div className="z-10 flex max-w-full flex-col gap-8 md:gap-6 md:max-w-[650px]">
        <h1 className="font-inter text-[1.8rem]/tight font-bold md:text-[2rem]/tight text-center lg:text-left">
          Kami Ingin Mengubah Pandangan{' '}
          <span className="text-[#348C34]">Masyarakat tentang Sampah</span>{' '}
        </h1>
        <div className="flex flex-col gap-8 md:gap-4">
          <div className="relative h-[144px] w-full rounded-3xl">
            {/* overlay */}
            <div className="absolute inset-0 z-10 rounded-3xl bg-gradient-to-t from-black/90 via-black/70"></div>

            {/* text center */}
            <div className="absolute inset-0 z-20 flex items-center justify-center font-nunito text-2xl font-black text-white">
              Harita menjadikan-nya solusi
            </div>

            {/* image */}
            <Image
              src={'/img/Landingpage/sampah.jpg'}
              alt="sampah"
              fill
              className="rounded-3xl object-cover object-center"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:flex-nowrap md:gap-6">
            <div className="flex flex-col gap-1 h-[110px] w-[210px] items-center justify-center rounded-2xl bg-green-700 px-2">
                <div className='flex gap-1'>
              <Recycle
                width={30}
                height={30}
                stroke="white"
                strokeWidth={2.5}
              />
              <h1 className='text-yellow-200 font-extrabold font-nunito text-xl flex self-end '>75%</h1>
              </div>
                <p className='text-sm/tight text-white font-medium text-center'>Sampah dapat di daur ulang</p>
            </div>

            <div className="h-[110px] w-[210px] rounded-2xl bg-green-700
            flex flex-col gap-1 justify-center items-center
            ">
                <div className='flex gap-1'>
              <Users
                width={30}
                height={30}
                stroke="white"
                strokeWidth={2.5}
              />
               <h1 className='text-yellow-200 font-extrabold font-nunito text-xl flex self-end '>300+</h1>
              </div>
              <p className='text-sm/tight text-white font-medium text-center'>Komunitas Peduli Sampah</p>
            </div>

            <div className="h-[110px] w-[210px] rounded-2xl bg-green-700
            flex flex-col gap-1 justify-center items-center">
                <div className='flex gap-1'>
              <Leaf
                width={30}
                height={30}
                stroke="white"
                strokeWidth={2.5}
              />
               <h1 className='text-yellow-200 font-extrabold font-nunito text-xl flex self-end '>1 Ton</h1>
              </div>
                <p className='text-sm/tight text-white font-medium text-center'>Pupuk Organik di Hasilkan</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-inter text-xl font-bold text-center lg:text-left">
              Mengapa <span className="text-green-600">Harita</span>
            </h1>
            <p
              className={`${
                seeMore ? 'line-clamp-none' : 'line-clamp-3'
              } font-nunito font-medium text-lg lg:text-left text-center`}
            >
              Sampah bukan lagi sekadar masalah, melainkan peluang untuk
              perubahan. Banyak orang masih memandang sampah sebagai hal yang
              menjijikkan dan tidak berguna, padahal dengan pengelolaan yang
              tepat, sampah bisa menjadi sumber energi, bahan daur ulang, bahkan
              membuka lapangan kerja baru. Melalui layanan pengelolaan sampah
              modern{' '}
              <span className="font-semibold text-[#348C34]">Harita</span>, kami
              hadir membantu masyarakat mengubah cara pandang terhadap sampah
              dari beban lingkungan menjadi aset berharga. Bersama{' '}
              <span className="font-semibold text-[#348C34]">Harita</span>, mari
              bangun kebiasaan baru yang lebih bersih, sehat, dan berkelanjutan
              untuk masa depan.
            </p>

            <button
              onClick={() => setSeeMore(!seeMore)}
              className="w-fit font-semibold text-[#348C34] transition-all duration-300 ease-in hover:font-bold flex self-center lg:self-start"
            >
              {seeMore ? 'Lihat Lebih Sedikit' : 'Baca Selengkapnya'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
