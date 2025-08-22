"use client"

import React, { useState } from 'react';
import { Check, Star, Truck, Home, Users2 } from 'lucide-react';

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

export default function WasteManagementPricing(): JSX.Element {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleBillingChange = (newPeriod: BillingPeriod) => {
    if (newPeriod !== billingPeriod) {
      setIsAnimating(true);
      setBillingPeriod(newPeriod);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const monthlyPlans: PricingPlan[] = [
    {
      name: 'Gratis Trial',
      subHead: 'Coba layanan kami selama 14 hari',
      price: 0,
      duration: '/14 hari',
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
      subHead: 'Standar membership',
      price: 125000,
      duration: '/bulan',
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
      name: 'Premium ',
      subHead: 'Disarankan untuk sampah elektronik',
      price: 285000,
      duration: '/bulan',
      icon: <Users2 className="w-6 h-6" />,
      features: [
        'Pengangkutan harian (6x seminggu)',
        'Tidak ada batas volume',
        'Notifikasi Jadwal',
        'Customer support AI & Whatsapp ',
        'Pemilahan 4 kategori sampah',
        'Pickup sampah khusus (elektronik, B3)',
        'Kompos gratis dari sampah organik',
        'Menyusun jadwal sendiri',
        'Gratis 1000 HaCoins tiap bulan',
        'Penggantian kantong sampah gratis'
      ],
      popular: false,
      buttonText: 'Upgrade Premium'
    }
  ];

  const yearlyPlans: PricingPlan[] = [
    {
      name: 'Percobaan',
      subHead: 'Coba layanan kami selama 14 hari',
      price: 0,
      duration: '/14 hari',
      icon: <Star className="w-6 h-6" />,
      features: [
        'Pengangkutan 2x seminggu',
        'Maksimal 10kg per pickup',
        'Notifikasi jadwal',
        'Customer support AI Chat Bot',
      ],
      popular: false,
      buttonText: 'Mulai Trial Gratis',
      isTrial: true,
    },
    {
      name: 'Standar',
      subHead: 'Standar membership',
      price: 1250000,
      originalPrice: 1500000,
      duration: '/tahun',
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
      savings: 'Hemat 17%'
    },
    {
      name: 'Premium ',
      subHead: 'Disarankan untuk sampah elektronik',
      price: 2850000,
      originalPrice: 3420000,
      duration: '/tahun',
      icon: <Users2 className="w-6 h-6" />,
      features: [
        'Pengangkutan harian (6x seminggu)',
        'Tidak ada batas volume',
        'Notifikasi Jadwal',
        'Customer support AI & Whatsapp ',
        'Pemilahan 4 kategori sampah',
        'Pickup sampah khusus (elektronik, B3)',
        'Kompos gratis dari sampah organik',
        'Menyusun jadwal sendiri',
        'Gratis 1000 HaCoins tiap bulan',
        'Penggantian kantong sampah gratis'
      ],
      popular: false,
      buttonText: 'Upgrade Premium',
      savings: 'Hemat 17%'
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

  const isPremiumPlan = (planName: string): boolean => {
    return planName.toLowerCase().includes('premium');
  };

  return (
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
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto transition-all duration-500 ${
          isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
        }`}>
          {currentPlans.map((plan, index) => (
            <div
              key={`${plan.name}-${billingPeriod}`}
              className="relative bg-white rounded-2xl shadow-lg p-6 flex flex-col transition-all duration-500 ease-in-out transform hover:shadow-xl hover:-translate-y-1 hover:border-green-800 border-2 border-transparent"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col flex-grow">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                    plan.popular 
                      ? 'bg-green-800 text-white' 
                      : plan.isTrial
                      ? 'bg-green-800 text-white'
                      : isPremiumPlan(plan.name)
                      ? 'bg-gradient-to-br from-green-800 to-green-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
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
                    <div className="flex items-center justify-center transition-all duration-500">
                      <span className={`font-inter text-4xl font-bold transition-all duration-500 ${
                        plan.price === 0 ? 'text-green-800' : 'text-gray-900'
                      }`}>
                        {formatPrice(plan.price)}
                      </span>
                    </div>
                    <div className="font-nunito text-gray-500 text-lg transition-all duration-500">
                      {plan.duration}
                    </div>
                    
                    {/* Yearly savings */}
                    {billingPeriod === 'yearly' && plan.originalPrice && (
                      <div className="mt-2 opacity-100 transition-opacity duration-500">
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
                  <button className={`w-full py-3 px-5 rounded-xl font-semibold font-nunito text-base transition-all duration-300 ${
                    plan.popular
                      ? 'bg-green-800 text-white hover:bg-green-500 shadow-md hover:shadow-lg'
                      : plan.isTrial
                      ? 'bg-green-800 text-white hover:bg-green-500 shadow-md hover:shadow-lg'
                      : isPremiumPlan(plan.name)
                      ? 'bg-gradient-to-r from-green-800 to-green-500 text-white hover:from-green-500 hover:to-green-400 shadow-md hover:shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200'
                  }`}>
                    {plan.buttonText}
                  </button>
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
  );
}
