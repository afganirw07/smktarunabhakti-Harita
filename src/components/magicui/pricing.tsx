"use client"
import { Modal } from 'components/ui/modal';
import React, { useState } from 'react';
import { Check, Truck, Home, Users2, Star } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
  name: string;
  subHead: string;
  price: number;
  originalPrice?: number;
  duration: string;
  icon: React.ReactNode;
  features: string[];
  popular: boolean;
  buttonText: string;
  savings?: string;
  isTrial?: boolean;
}

type BillingPeriod = 'monthly' | 'yearly';

interface WasteManagementPricingProps {
  path?: string;
  onClick?: (plan: PricingPlan) => void;
  showModal?: boolean; // Boolean untuk mengontrol apakah modal ditampilkan atau redirect
}

// Komponen Modal Konfirmasi
interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PricingPlan | null;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ 
  isOpen, 
  onClose, 
  plan, 
  onConfirm 
}) => {
  if (!plan) return null;

  const formatPrice = (price: number): string => {
    if (price === 0) return 'GRATIS';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Modal 
    className='max-w-[400px]'
    isOpen={isOpen} onClose={onClose}>
      <div className="text-center p-6">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 bg-green-800 text-white">
          {plan.icon}
        </div>

        {/* Title */}
        <h3 className="font-inter text-xl font-bold text-gray-900 mb-2">
          {plan.isTrial ? 'Konfirmasi Trial Gratis' : 'Konfirmasi Berlangganan'}
        </h3>

        {/* Description */}
        <div className="mb-6">
          {plan.isTrial ? (
            <p className="font-nunito text-gray-600">
              Anda akan memulai trial gratis selama 14 hari untuk layanan pengangkutan sampah.
            </p>
          ) : (
            <div>
              <p className="font-nunito text-gray-600 mb-3">
                Anda akan berlangganan paket <strong>{plan.name}</strong>
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-3">
                <div className="flex items-center justify-between">
                  <span className="font-nunito text-gray-700">Durasi:</span>
                  <span className="font-nunito font-semibold">{plan.duration}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-nunito text-gray-700">Total Harga:</span>
                  <div className="text-right">
                    <div className="font-inter text-xl font-bold text-green-800">
                      {formatPrice(plan.price)}
                    </div>
                    {plan.originalPrice && (
                      <div className="text-sm">
                        <span className="text-gray-400 line-through">
                          {formatPrice(plan.originalPrice)}
                        </span>
                        <span className="ml-2 text-green-600 font-semibold">
                          {plan.savings}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl font-semibold font-nunito text-base border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-4 rounded-xl font-semibold font-nunito text-base bg-green-800 text-white hover:bg-green-700 transition-colors"
          >
            {plan.isTrial ? 'Mulai Trial' : 'Bayar Sekarang'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default function WasteManagementPricing({
  path = "/auth/login", 
  onClick,
  showModal = false
}: WasteManagementPricingProps): JSX.Element {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  const handleBillingChange = (newPeriod: BillingPeriod) => {
    if (newPeriod !== billingPeriod) {
      setIsAnimating(true);
      setBillingPeriod(newPeriod);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handlePlanClick = (plan: PricingPlan) => {
    if (showModal) {
      // Jika showModal true, tampilkan modal
      setSelectedPlan(plan);
      setIsModalOpen(true);
    } else {
      // Jika showModal false, panggil onClick callback jika ada
      if (onClick) {
        onClick(plan);
      }
    }
  };

  const handleModalConfirm = () => {
    if (selectedPlan) {
      // Handle pembayaran atau aksi selanjutnya di sini
      console.log('Confirmed plan:', selectedPlan);
      
      // Tutup modal
      setIsModalOpen(false);
      setSelectedPlan(null);
      
      // Panggil callback jika ada
      if (onClick) {
        onClick(selectedPlan);
      }
      
      // Atau redirect ke halaman pembayaran
      // window.location.href = '/payment';
    }
  };

  const monthlyPlans: PricingPlan[] = [
    {
      name: 'Gratis Trial',
      subHead: 'Coba layanan kami selama 14 hari',
      price: 0,
      duration: '14 hari',
      icon: <Star className="w-6 h-6" />,
      features: [
        'Pengangkutan 2x seminggu',
        'Maksimal 10kg per pickup',
        'Notifikasi jadwal',
        'Customer support AI',
      ],
      popular: false,
      buttonText: 'Mulai Trial Gratis',
      isTrial: true
    },
    {
      name: 'Standar',
      subHead: '1 Bulan',
      price: 150000,
      duration: '1 bulan',
      icon: <Home className="w-6 h-6" />,
      features: [
        'Pengangkutan 3x seminggu',
        'Maksimal 25kg per pickup',
        'Notifikasi Jadwal',
        'Customer support AI & Whatsapp',
        'Pemilahan sampah organik/anorganik',
        'Kompos gratis dari sampah organik',
        'Menyusun jadwal sendiri',
        'Gratis 500 HaCoins Tiap bulan',
        'Penggantian kantong sampah gratis',
      ],
      popular: true,
      buttonText: 'Berlangganan Sekarang'
    },
    {
      name: '3 Bulan',
      subHead: 'Disarankan untuk sampah elektronik',
      price: 450000,
      duration: '3 bulan',
      icon: <Users2 className="w-6 h-6" />,
      features: [
        'Pengangkutan 3x seminggu',
        'Maksimal 25kg per pickup',
        'Notifikasi Jadwal',
        'Customer support AI & Whatsapp',
        'Pemilahan sampah organik/anorganik',
        'Kompos gratis dari sampah organik',
        'Menyusun jadwal sendiri',
        'Gratis 500 HaCoins Tiap bulan',
        'Penggantian kantong sampah gratis',
      ],
      popular: false,
      buttonText: 'Berlangganan sekarang'
    }
  ];

  const yearlyPlans: PricingPlan[] = [
    {
      name: '6 Bulan',
      subHead: 'Standar membership',
      price: 785000,
      originalPrice: 900000,
      duration: '6 bulan',
      icon: <Home className="w-6 h-6" />,
      features: [
        'Pengangkutan 3x seminggu',
        'Maksimal 25kg per pickup',
        'Notifikasi Jadwal',
        'Customer support AI & Whatsapp',
        'Pemilahan sampah organik/anorganik',
        'Kompos gratis dari sampah organik',
        'Menyusun jadwal sendiri',
        'Gratis 500 HaCoins Tiap bulan',
        'Penggantian kantong sampah gratis',
      ],
      popular: true,
      buttonText: 'Berlangganan Sekarang',
      savings: 'Hemat 13%'
    },
    {
      name: '1 Tahun',
      subHead: 'Disarankan untuk sampah elektronik',
      price: 1285000,
      originalPrice: 1500000,
      duration: '1 tahun',
      icon: <Users2 className="w-6 h-6" />,
      features: [
        'Pengangkutan 3x seminggu',
        'Maksimal 25kg per pickup',
        'Notifikasi Jadwal',
        'Customer support AI & Whatsapp',
        'Pemilahan sampah organik/anorganik',
        'Kompos gratis dari sampah organik',
        'Menyusun jadwal sendiri',
        'Gratis 500 HaCoins Tiap bulan',
        'Penggantian kantong sampah gratis',
      ],
      popular: false,
      buttonText: 'Upgrade sekarang',
      savings: 'Hemat 16%'
    }
  ];

  const currentPlans: PricingPlan[] = billingPeriod === 'monthly' ? monthlyPlans : yearlyPlans;

  const formatPrice = (price: number): string => {
    if (price === 0) return 'GRATIS';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <div className="min-h-screen bg-[#FBFFF9] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-800 rounded-2xl mb-6">
              <Truck className="w-10 h-10 text-white" />
            </div>

            <h2 className="font-inter text-[2rem] lg:text-[2.2rem] font-bold text-gray-900 mb-4">
              Layanan Pengangkutan Sampah Rumahan
            </h2>
            <p className="font-nunito text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Solusi mudah dan terpercaya untuk mengelola sampah rumah tangga Anda. Mulai dengan trial gratis 14 hari tanpa komitmen.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-12">
              <div className="bg-white p-1 rounded-lg shadow-sm border flex">
                <button
                  onClick={() => handleBillingChange('monthly')}
                  className={`px-8 py-3 rounded-md text-base font-medium font-nunito transition-all duration-300 ${
                    billingPeriod === 'monthly'
                      ? 'bg-green-800 text-white shadow-sm'
                      : 'text-gray-500 hover:text-green-700'
                  }`}
                >
                  Bulanan
                </button>
                <button
                  onClick={() => handleBillingChange('yearly')}
                  className={`px-8 py-3 rounded-md text-base font-medium font-nunito transition-all duration-300 relative ${
                    billingPeriod === 'yearly'
                      ? 'bg-green-800 text-white shadow-sm'
                      : 'text-gray-500 hover:text-green-700'
                  }`}
                >
                  Tahunan
                  <span className="absolute -top-2 -right-2 bg-green-800 text-white text-xs px-2 py-0.5 rounded-full font-nunito">
                    -17%
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 
              ${currentPlans.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"} 
              gap-8 max-w-6xl mx-auto transition-all duration-500 
              ${isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
          >
            {currentPlans.map((plan, index) => (
              <div
                key={`${plan.name}-${billingPeriod}`}
                className="relative bg-white rounded-2xl shadow-lg p-6 flex flex-col transition-all duration-500 ease-in-out hover:shadow-xl hover:-translate-y-1 border-2 border-transparent hover:border-green-800"
              >
                <div className="flex flex-col flex-grow">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 bg-green-800 text-white">
                      {plan.icon}
                    </div>
                    
                    <h3 className="font-inter text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="font-nunito text-gray-500 text-sm mb-4">
                      {plan.subHead}
                    </p>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-center justify-center">
                        <span className={`font-inter text-4xl font-bold ${plan.price === 0 ? 'text-green-800' : 'text-gray-900'}`}>
                          {formatPrice(plan.price)}
                        </span>
                      </div>
                      <div className="font-nunito text-gray-500 text-lg">
                        /{plan.duration}
                      </div>
                      
                      {billingPeriod === 'yearly' && plan.originalPrice && (
                        <div className="mt-2">
                          <span className="font-nunito text-gray-400 line-through text-sm">
                            {formatPrice(plan.originalPrice)}
                          </span>
                          <span className="font-nunito ml-2 text-green-800 text-sm font-semibold">
                            {plan.savings}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    {showModal ? (
                      <button 
                        onClick={() => handlePlanClick(plan)}
                        className="w-full py-3 px-5 rounded-xl font-semibold font-nunito text-base bg-green-800 text-white hover:bg-green-500 shadow-md hover:shadow-lg transition-colors"
                      >
                        {plan.buttonText}
                      </button>
                    ) : (
                      <Link href={path}>
                        <button 
                          onClick={() => handlePlanClick(plan)}
                          className="w-full py-3 px-5 rounded-xl font-semibold font-nunito text-base bg-green-800 text-white hover:bg-green-500 shadow-md hover:shadow-lg transition-colors"
                        >
                          {plan.buttonText}
                        </button>
                      </Link>
                    )}
                  </div>

                  {/* Features */}
                  <div className="flex-1 mt-6">
                    <h4 className="font-inter text-lg font-semibold text-gray-900 mb-4">
                      Fitur yang termasuk:
                    </h4>
                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 mr-3 bg-green-100">
                            <Check className="w-3 h-3 text-green-800" />
                          </div>
                          <span className="font-nunito text-base leading-snug">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="font-nunito text-gray-500 mb-4 text-lg">
              Butuh layanan khusus untuk kompleks perumahan atau bisnis?
            </p>
            <button className="font-nunito text-green-800 hover:text-green-500 font-semibold text-base transition-colors duration-200">
              Hubungi Tim Kami untuk Konsultasi →
            </button>
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPlan(null);
        }}
        plan={selectedPlan}
        onConfirm={handleModalConfirm}
      />
    </>
  );
}