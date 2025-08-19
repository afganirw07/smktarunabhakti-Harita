import { url } from 'inspector';
import Navbar from '../../components/landingpage/navbar';
import Image from 'next/image';
import CountUp from 'components/landingpage/counter';
import { Home, Truck, ClockPlus, Sprout, Star } from 'lucide-react';

export default function landingPage() {
  return (
    <>
      <section className="relative z-20 flex h-auto w-full flex-col items-center justify-center bg-bgPrimary px-6 lg:py-6 py-6 md:py-10  sm:px-16 md:px-8 lg:px-20">
        <Navbar />
        <div className="heading mt-10 flex flex-col items-center justify-center gap-2">
          <h1 className="text-Black max-w-[600px]  text-wrap  text-center font-inter text-[2rem]/tight font-black md:text-[2.5rem]/tight ">
            Solusi permasalahan{' '}
            <span className="text-green-800">sampah lingkungan </span> anda
          </h1>
          <p className="text-center font-nunito text-base font-semibold sm:text-lg">
            Kebersihan Lingkungan Menjaga Keharmonisan
          </p>

          <div className="mt-4 flex gap-6">
            <button className="hover:bg-green-950 rounded-full bg-green-800 px-6 py-1.5 text-center font-inter text-sm font-bold text-white transition-colors duration-300 ease-out md:text-base">
              {' '}
              Berlangganan
            </button>
            <button className="rounded-full border-[1px] border-gray-400 bg-white px-6 py-1.5 text-center  font-inter text-sm font-bold text-green-800 transition-colors duration-200 ease-out hover:bg-green-200 md:text-base">
              {' '}
              Coba Trial
            </button>
          </div>
        </div>

        <div className=" relative mt-24 flex h-auto w-full  flex-row flex-wrap items-center justify-center gap-6 lg:mt-10  lg:h-[350px] lg:flex-row lg:flex-nowrap lg:items-end lg:justify-center lg:gap-4">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col gap-1  lg:-top-0 ">
            <div className='flex gap-1'>
              <Star
              strokeWidth={0}
              className='fill-amber-400'
              />
              <Star
              strokeWidth={0}
              className='fill-amber-400'
              />
              <Star
              strokeWidth={0}
              className='fill-amber-400'
              />
              <Star
              strokeWidth={0}
              className='fill-amber-400'
              />
              <Star
              strokeWidth={0}
              className='fill-amber-400'
              />
            </div>
            <p className='text-sm font-bold font-nunito text-center'>99+ Orang menilai</p>
          </div>
          <div className="relative hidden h-[200px] w-full overflow-hidden rounded-2xl bg-cyan-300 shadow-md shadow-yellow-200 md:w-[300px] lg:mt-0 lg:flex lg:h-full lg:w-[220px]">
            <Image
              className="relative z-10 rounded-2xl object-cover object-center "
              fill
              alt="recycle"
              src={'/img/Landingpage/recycle.jpg'}
            />
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
                  <span>+</span>
                </div>

                <p className="text-wrap text-center font-nunito text-lg font-semibold text-white lg:text-base">
                  Tahun melayani Masyarakat
                </p>
              </div>
            </div>
          </div>
          <div
            className="flex h-[200px] w-full items-center justify-center rounded-2xl  bg-[#2F362B]
          md:w-[300px] lg:h-full lg:w-[220px] px-8 md:px-4"
          >
            <div className='flex flex-col md:gap-5 gap-2 justify-center items-center'>
              <Sprout
                stroke="#6DD130"
                strokeWidth={2}
                className="size-[48px]"
              />
              <div className='w-full h-full flex flex-col md:gap-2 justify-center items-center'>
                <div className='font-extrabold text-white font-nunito text-3xl flex'>
                  <CountUp
                    from={0}
                    to={99}
                    separator=","
                    direction="up"
                    duration={8}
                    className="count-up-text flex justify-center items-center"
                  />
                  <span>+ Kg</span>
                  
                </div>
                <p className=' text-white font-medium text-lg text-center '><span className='text-[#6DD130]'>Pupuk Organik</span> yang di hasilkan dari <span className='text-[#6DD130]'>daur ulang sampah</span> </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
