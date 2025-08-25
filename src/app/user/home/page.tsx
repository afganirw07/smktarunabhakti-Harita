import React from "react";
import { CircleDollarSign, CoinsIcon, CalendarClock, CreditCard, Smartphone, Building2, Banknote } from "lucide-react";
import Benefit from "components/landingpage/widgetBenefit/benefit";
import Magnet from "components/magicui/magnet";
import Pricing from "../../../components/magicui/pricing";

export default function Homepage() {
  const paymentMethods = [
    {
      icon: <CreditCard className="w-6 h-6" />,
      name: "Kartu Kredit",
      description: "Visa, Mastercard, American Express"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      name: "E-Wallet",
      description: "GoPay, OVO, DANA, ShopeePay"
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      name: "Transfer Bank",
      description: "BCA, Mandiri, BNI, BRI"
    },
    {
      icon: <Banknote className="w-6 h-6" />,
      name: "Virtual Account",
      description: "Semua bank terkemuka"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen ">
        <div className="container mx-auto px-4 py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-green-700 mb-6">
              Hai Ahsan, Selamat datang di Harita
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Platform inovatif yang menghadirkan solusi terdepan untuk kebutuhan bisnis modern Anda. 
              Dengan teknologi canggih dan antarmuka yang intuitif, Harita membantu mengoptimalkan 
              produktivitas dan efisiensi kerja tim Anda.
            </p>
          </div>

          {/* Features Overview */}
          <section className="relative flex h-auto w-full flex-col items-center justify-center overflow-hidden bg-[#FBFFF9] px-6 py-8 z-10">
        {/* Lingkaran 1 */}
        <div className="absolute right-[-200px] top-[-200px] h-[300px] w-[300px] rounded-full bg-[#6DD130] opacity-100 blur-[300px] lg:h-[300px] lg:w-[300px]"></div>

        {/* Lingkaran 2 */}
        <div className="absolute bottom-[-200px] left-[-200px] h-[300px] w-[300px] rounded-full bg-[#74C9A9] opacity-100 blur-[300px] lg:h-[300px] lg:w-[300px]"></div>

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
      </section>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 bg-white">
        <Pricing />
      </div>

      {/* Payment Methods */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-700 mb-4">Metode Pembayaran</h2>
            <p className="text-gray-600">Pilih cara pembayaran yang paling nyaman untuk Anda</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {paymentMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center">
                <div className="flex justify-center text-green-700 mb-4">
                  {method.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{method.name}</h3>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600">
              Semua transaksi dilindungi dengan enkripsi SSL 256-bit untuk keamanan maksimal
            </p>
          </div>
        </div>
      </div>
    </>
  );
}