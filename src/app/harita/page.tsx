"use client"

import { cn } from '@/public/lib/utils';
import Navbar from '../../components/landingpage/navbar';
import  FadeAnimation  from 'components/animation/animation';
import PageLoader from 'components/animation/pageLoader';
import Image from 'next/image';
import CountUp from 'components/landingpage/counter';
import { Home, Truck, ClockPlus, Sprout, Star, CalendarClock, CoinsIcon, CircleDollarSign } from 'lucide-react';
import Collab from 'components/landingpage/marque section/collab';
import About from 'components/landingpage/about/about';
import Card from 'components/landingpage/cardFeature/card';
import { DotPattern } from 'components/magicui/dot-pattern';
import Benefit from 'components/landingpage/widgetBenefit/benefit';
import Magnet from 'components/magicui/magnet';
import Pricing from 'components/magicui/pricing';
import { AnimatedTesti } from 'components/landingpage/testimonial/testi';
import Footer from '../../components/landingpage/footer/footer';
import Link from 'next/link';

export default function landingPage() {


 

  return (
    <>
      <PageLoader>
      <section className="relative z-20 flex h-auto w-full flex-col items-center justify-center bg-gradient-to-b from-[#FBFFF9] to-bgPrimary px-6 py-20  sm:px-16 md:px-8 lg:px-20 ">
        <DotPattern
          width={30}
          height={35}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            '-z-10 opacity-70 [mask-image:linear-gradient(to_bottom,white,transparent)] ',
          )}
        />
        <Navbar />

        <FadeAnimation direction='in'>
        <div id='beranda' className="scroll-smooth heading mt-10 flex flex-col items-center justify-center gap-2">
          <h1 className="text-Black max-w-[600px]  text-wrap  text-center font-inter text-[2rem]/tight font-black md:text-[2.5rem]/tight ">
            Solusi permasalahan{' '}
            <span className="text-green-800">sampah lingkungan </span> anda
          </h1>
          <p className="text-center font-nunito text-base font-semibold sm:text-lg">
            Kebersihan Lingkungan Menjaga Keharmonisan
          </p>

          <div className="mt-4 flex gap-6">
            <Link href={"/auth/login"}>
            <button className="hover:bg-green-950 rounded-full bg-green-800 px-6 py-1.5 text-center font-inter text-sm font-bold text-white transition-colors duration-300 ease-out md:text-base">
              {' '}
              Berlangganan
            </button>
            </Link>
            <Link href={'/auth/login'}>
            <button className="rounded-full border-[1px] border-gray-400 bg-white px-6 py-1.5 text-center  font-inter text-sm font-bold text-green-800 transition-colors duration-200 ease-out hover:bg-green-200 md:text-base">
              {' '}
              Coba Trial
            </button>
            </Link>
          </div>
        </div>
          </FadeAnimation>


          <FadeAnimation direction='up'>
        <div className=" relative mt-24 flex h-auto w-full  flex-row flex-wrap items-center justify-center gap-6 lg:mt-10  lg:h-[350px] lg:flex-row lg:flex-nowrap lg:items-end lg:justify-center lg:gap-4">
          <div className="absolute -top-16 left-1/2 flex -translate-x-1/2 flex-col gap-1  lg:-top-0 ">
            <div className="flex gap-1">
              <Star strokeWidth={0} className="fill-amber-400" />
              <Star strokeWidth={0} className="fill-amber-400" />
              <Star strokeWidth={0} className="fill-amber-400" />
              <Star strokeWidth={0} className="fill-amber-400" />
              <Star strokeWidth={0} className="fill-amber-400" />
            </div>
            <p className="text-center font-nunito text-sm font-bold">
              99+ Orang menilai
            </p>
          </div>
          <div className="relative hidden h-[200px] w-full overflow-hidden rounded-2xl bg-cyan-300 shadow-md shadow-yellow-200 md:w-[300px] lg:mt-0 lg:flex lg:h-full lg:w-[220px]">
            <Image
              className="relative z-10 rounded-2xl object-cover object-center "
              fill
              alt="recycle"
              src={'/img/Landingpage/recycle.jpg'}
            />
            <div></div>
            <div className="absolute inset-0 z-10 rounded-2xl  bg-gradient-to-t from-black"></div>
          </div>

          <div className="relative flex h-[100px] w-full items-center justify-center rounded-2xl bg-[#356F34] p-2 md:h-[200px] md:w-[300px] lg:h-[55%] lg:w-[150px]">
            <div className="absolute bottom-0 z-10 h-[75%] w-full rounded-b-3xl rounded-t-full bg-[#3D793C]"></div>

            <div className="relative z-20 flex items-center justify-center gap-3 md:flex-col">
              <div className="">
                <Home
                  stroke="#A7FF71"
                  strokeWidth={2}
                  className="size-[50px] md:size-[46px]"
                />
              </div>
              <div className="flex flex-col items-start -space-y-1 text-4xl font-bold text-white md:items-center lg:text-2xl ">
                <div>
                  <CountUp
                    from={0}
                    to={123}
                    separator=","
                    direction="up"
                    duration={8}
                    className="count-up-text"
                  />
                  <span>+</span>
                </div>

                <p className="text-wrap text-center font-nunito text-lg font-semibold text-white lg:text-base">
                  Alamat Telah Terdaftar
                </p>
              </div>
            </div>
          </div>

          <div className=" flex h-[120px] w-full items-center justify-center rounded-2xl  border-2  border-[#356F34] bg-white md:h-[200px]  md:w-[300px] lg:h-[45%] lg:w-[320px] ">
            <div className="flex w-full  items-center justify-center gap-4 p-4 md:flex-col md:items-start md:self-start">
              <div className="icon ">
                <Truck
                  stroke="white"
                  strokeWidth={2}
                  className="size-14 rounded-lg  bg-[#356F34]  p-1.5 md:size-auto "
                />
              </div>
              <div
                className="flex flex-col -space-y-1 md:space-y-2
                lg:-space-y-0  "
              >
                <div className="text-3xl md:text-5xl lg:text-3xl">
                  <CountUp
                    from={0}
                    to={99}
                    separator=","
                    direction="up"
                    duration={8}
                    className="count-up-text font-bold"
                  />
                  <span className="text-3xl font-bold">
                    + <span>Ton</span>
                  </span>
                </div>
                <div className="flex flex-col -space-y-0.5 ">
                  <p>Total sampah yang terkumpul</p>
                  <p className="text-xs font-bold text-gray-600">
                    2 Bulan Terakhir
                  </p>
                </div>
              </div>
            </div>

            <div></div>
          </div>
          <div className="relative flex h-[100px] w-full items-center justify-center rounded-2xl bg-[#4D954C] p-2 md:h-[200px] md:w-[300px] lg:h-[55%] lg:w-[150px]">
            <div className="relative z-20 flex items-center justify-center gap-3 md:flex-col">
              <div className="">
                <ClockPlus
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  className="size-[50px] md:size-[46px]"
                />
              </div>
              <div className="flex flex-col items-start -space-y-1 text-4xl font-bold text-white md:items-center lg:text-2xl ">
                <div>
                  <CountUp
                    from={0}
                    to={2}
                    separator=","
                    direction="up"
                    duration={8}
                    className="count-up-text"
                  />
                  <span>+ </span>
                </div>

                <p className="text-wrap text-center font-nunito text-lg font-semibold text-white lg:text-base">
                  Tahun melayani Masyarakat
                </p>
              </div>
            </div>
          </div>
          <div
            className="flex h-[200px] w-full items-center justify-center rounded-2xl  bg-[#2F362B]
          px-8 md:w-[300px] md:px-4 lg:h-full lg:w-[220px]"
          >
            <div className="flex flex-col items-center justify-center gap-2 md:gap-5">
              <Sprout
                stroke="#6DD130"
                strokeWidth={2}
                className="size-[48px]"
              />
              <div className="flex h-full w-full flex-col items-center justify-center md:gap-2">
                <div className="flex font-nunito text-3xl font-extrabold text-white">
                  <CountUp
                    from={0}
                    to={99}
                    separator=","
                    direction="up"
                    duration={8}
                    className="count-up-text flex items-center justify-center"
                  />
                  <span>+ Kg</span>
                </div>
                <p className=" text-center text-lg font-medium text-white ">
                  <span className="text-[#6DD130]">Pupuk Organik</span> yang di
                  hasilkan dari{' '}
                  <span className="text-[#6DD130]">daur ulang sampah</span>{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
        </FadeAnimation>
      </section>

      {/* Marquee */}
      <section className="flex h-auto w-full flex-col items-center justify-center gap-12 bg-bgPrimary py-20">
        <h1 className="font-inter text-3xl font-bold">Kolaborasi dengan</h1>
        <Collab />
      </section>

      {/* about section */}

      <section id='tentang' className="scroll-smooth relative flex h-auto w-full items-center justify-center overflow-hidden bg-white px-6 py-10 lg:justify-start lg:px-24">
        {/* Lingkaran 1 */}
        <div className="absolute left-[-200px] top-[-200px] h-[600px] w-[600px] rounded-full bg-[#F6F193] opacity-100 blur-[400px]"></div>

        {/* Lingkaran 2 */}
        <div className="absolute bottom-[-200px] right-[-200px] h-[600px] w-[600px] rounded-full bg-[#D2E3C8] opacity-100 blur-[200px]"></div>

        <div className="absolute left-1/2 hidden lg:left-auto lg:right-0  lg:flex lg:-translate-x-0">
          <Image
            alt="circle"
            src={'/img/Landingpage/circle.png'}
            width={270}
            height={270}
          ></Image>
        </div>
        <FadeAnimation direction='right'>
        {/* Konten utama */}
        <About />
        </FadeAnimation>
      </section>

      {/* feature section */}
      <section className="h-auto w-full bg-bgPrimary px-6 py-16 sm:px-16 lg:px-20">
        {/* heading */}
        <FadeAnimation
        direction='down'>
        <div className="flex w-full flex-col items-center justify-between gap-6 lg:flex-row lg:gap-0">
          <h1 className="text-wrap text-center font-inter text-[2rem] font-semibold text-black lg:w-[300px] lg:text-left">
            Fitur yang akan Anda Dapatkan
          </h1>

          <div className="flex flex-col items-center justify-center gap-8 lg:flex-row">
            <p className="text-wrap text-center font-nunito text-lg font-semibold text-black/40 lg:w-[550px] lg:text-left">
              Kami Menyediakan fitur yang dapat di jadikan solusi permasalahan
              sampah pada masyarakat Indonesia
            </p>

            <Link href={'/auth/login'}>
            <button className="rounded-full  bg-green-800 px-4  py-3 font-nunito text-lg font-bold text-white">
              Mulai Sekarang
            </button>
            </Link>
          </div>
        </div>
        </FadeAnimation>

        {/* card */}
        <FadeAnimation
        direction='up'>
        <div className="mt-12 flex w-full flex-wrap items-center justify-center gap-10 lg:flex-row lg:justify-between lg:gap-0">
          {/* Card 1: Hijau Segar */}
          <Card
            heading="Lapor Sampah"
            desc="Fitur melaporkan lokasi yang tercemar sampah untuk dibersihkan"
            background="bg-gradient-to-b from-[#8CFF8B] to-[#4FB990]"
            meshes={[
              'bg-green-300 top-10 left-10 w-[200px] h-[200px]',
              'bg-lime-400 bottom-10 right-10 w-[250px] h-[250px]',
            ]}
            image={'/img/Landingpage/Vector1.png'}
          />

          {/* Card 2: Hijau Gelap Elegan */}
          <Card
            heading="Trash House"
            desc="Fitur layanan pengangkutan sampah rumah anda secara rutin"
            background="bg-gradient-to-b from-[#8CFF8B] to-[#4FB990]"
            meshes={[
              'bg-green-800 top-20 left-20 w-[200px] h-[200px]',
              'bg-lime-500 bottom-5 right-16 w-[220px] h-[220px]',
            ]}
            image={'/img/Landingpage/Vector2.png'}
          />

          {/* Card 3: Hijau Lembut Variasi Lime */}
          <Card
            heading="Tukar Sampah"
            desc="Tukar sampah anda menjadi produk daur ulang pilihan dan bonus HaCoins"
            background="bg-gradient-to-b from-[#8CFF8B] to-[#4FB990]"
            meshes={[
              'bg-green-400 top-10 right-14 w-[180px] h-[180px]',
              'bg-lime-300 bottom-12 left-14 w-[240px] h-[240px]',
            ]}
            image={'/img/Landingpage/Vector3.png'}
          />
        </div>
        </FadeAnimation>
      </section>

      {/* benefit section */}
      <section className="relative flex h-auto w-full flex-col items-center justify-center overflow-hidden bg-[#FBFFF9] px-6 py-16 sm:px-8 lg:px-20 z-10">
        {/* Lingkaran 1 */}
        <div className="absolute right-[-200px] top-[-200px] h-[300px] w-[300px] rounded-full bg-[#6DD130] opacity-100 blur-[300px] lg:h-[300px] lg:w-[300px]"></div>

        {/* Lingkaran 2 */}
        <div className="absolute bottom-[-200px] left-[-200px] h-[300px] w-[300px] rounded-full bg-[#74C9A9] opacity-100 blur-[300px] lg:h-[300px] lg:w-[300px]"></div>

          <FadeAnimation
          direction='down'>
        <h1 className="text-center font-inter text-[2rem] font-bold">
          Benefit yang anda dapatkan
        </h1>
        </FadeAnimation>

          <FadeAnimation
          
          direction='in'>
        <div className="z-30 mx-auto mt-12 flex max-w-[1000px] flex-wrap justify-center md:gap-20 gap-10 sm:mt-16 lg:mt-24">
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
          <div className='lg:-rotate-3 rotate-0 lg:hover:rotate-0 hover:-rotate-3 transition-all duration-300 ease-out'>
            <Benefit
            Icon={CircleDollarSign} 
            Name='Pembayaran yang Transparant'
            Desc='Pembayaran yang tercatat dan dapat dilihat pengguna'
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
        </FadeAnimation>
      </section>

      <section id='layanan' className='pricing w-full h-auto py-20 bg-[#FBFFF9]'>
        <FadeAnimation direction='up'>
                     <Pricing/>
        </FadeAnimation>
 
      </section>

      <section id='testimoni' className='scroll-smooth w-full h-auto py-6 flex justify-center items-center '>
        <div className='flex flex-col gap-8'>
          <FadeAnimation direction='down'>
          <h1 className='text-[2.2rem] font-inter font-bold text-center'>Harita sudah dijadikan solusi</h1>
          </FadeAnimation>

          <FadeAnimation direction='up'>
        <AnimatedTesti/>
        </FadeAnimation>
          </div>
      </section>

      <Footer/>
      </PageLoader>
    </>
  );
}
