import React from "react";
import { Bot, CoinsIcon, CalendarClock,} from "lucide-react";
import Benefit from "components/landingpage/widgetBenefit/benefit";
import Magnet from "components/magicui/magnet";
import Pricing from "../../../../components/magicui/pricing";
import MarqueeDemo from "components/landingpage/marque section/collab";

export default function Langganan() {
 

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen ">
        <div className="container mx-auto px-4 py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-green-700 mb-6">
              Berlangganan dengan Harita
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Platform inovatif yang menjadikan solusi untuk permasalahan sampah sehari hari, dengan <span className="text-green-700 font-semibold">Harita</span>, anda tidak di haruskan membersihkan sampah.  <span className="text-green-700 font-semibold">Harita</span> juga menyediakan edukasi sampah berbasis AI untuk anda. <span className="font-semibold text-green-700">Berlangganan Sekarang!</span>
            </p>
          </div>

          {/* Features Overview */}
          <section className="relative flex h-auto w-full flex-col items-center justify-center overflow-hidden bg-[#FBFFF9]/30 px-6 py-8 z-10">


        <h1 className="text-center font-inter text-[2rem] font-bold">
          Benefit yang anda dapatkan
        </h1>

        <div className="z-30 mx-auto  flex max-w-[1000px] flex-wrap justify-center md:gap-20 gap-10 mt-12 lg:mt-16">
          <Magnet padding={30} disabled={false} magnetStrength={10}>
          <div className='lg:-rotate-3 rotate-0 lg:hover:rotate-0 hover:-rotate-3 transition-all duration-300 ease-out'>
            <Benefit
            Name='GRATIS Pengguna Baru'
            Desc='Bonus 14 hari masa berlangganan untuk Alamat baru '
            />
          </div>
          </Magnet>

          <Magnet padding={30} disabled={false} magnetStrength={10}>
          <div className='lg:rotate-3 rotate-0 lg:hover:rotate-0 hover:rotate-3 transition-all duration-300 ease-out'>
            <Benefit 
            Icon={CalendarClock}
            Name='Atur jadwal sesuka anda'
            Desc='Susun jadwal sesuka anda kapan sampah dapat di ambil'
            />
          </div>
          </Magnet>

           <Magnet padding={30} disabled={false} magnetStrength={10}>
                <div className="lg:-rotate-3 rotate-0 lg:hover:rotate-0 hover:-rotate-3 transition-all duration-300 ease-out">
                  <Benefit
                    Icon={Bot}
                    Name="Asisten Berbasis AI"
                    Desc="Menjawab pertanyaan anda seputar sampah dan Harita"
                  />
                </div>
              </Magnet>

          <Magnet padding={30} disabled={false} magnetStrength={10}>
          <div className='lg:rotate-3 rotate-0 lg:hover:rotate-0 hover:rotate-3 transition-all duration-300 ease-out'>
            <Benefit
            Icon={CoinsIcon}
            Name='Bonus HACOINS Tiap Bulan'
            Desc='Dapatkan HACOINS dengan menukar sampah rumah anda'
            />
          </div>
          </Magnet>
        </div>
      </section>

        </div>
      </div>
      {/* Pricing Section */}
      <div className="py-10 bg-white">
        <Pricing 
        showModal
        // onClick={openModal}
        />
      </div>
    </>
  );
}