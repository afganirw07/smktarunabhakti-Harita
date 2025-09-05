'use client';
import { Modal } from 'components/ui/modal';
import React, { useEffect, useState } from 'react';
import { Check, Truck, Home, Users2, Star } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import toast, { Toaster } from 'react-hot-toast';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  showModal?: boolean;
}

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PricingPlan | null;
  onConfirm: () => void;
  remainingDays: number;
  currentPlan: string | null;
  isCurrentPlanTrial: boolean;
  newPlanDuration: number;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  plan,
  onConfirm,
  remainingDays,
  currentPlan,
  isCurrentPlanTrial,
  newPlanDuration,
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

  const showWarning = remainingDays > 0 && !plan.isTrial;
  const totalNewDuration = newPlanDuration + remainingDays;

  return (
    <Modal className="max-w-[400px]" isOpen={isOpen} onClose={onClose}>
      <div className="p-6 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-green-800 text-white">
          {plan.icon}
        </div>
        <h3 className="mb-2 font-inter text-xl font-bold text-gray-900">
          {plan.isTrial ? 'Konfirmasi Trial Gratis' : 'Konfirmasi Berlangganan'}
        </h3>
        <div className="mb-6">
          {plan.isTrial ? (
            <p className="font-nunito text-gray-600">
              Anda akan memulai trial gratis selama 14 hari untuk layanan
              pengangkutan sampah.
            </p>
          ) : (
            <div>
              <p className="mb-3 font-nunito text-gray-600">
                Anda akan berlangganan paket <strong>{plan.name}</strong>
              </p>
              <div className="mb-3 rounded-lg bg-gray-50 p-4">
                {showWarning && (
                  <div className="mb-4 rounded-lg bg-yellow-100 p-3 text-left font-nunito text-sm text-yellow-800">
                    <span className="font-semibold">Peringatan: </span>
                    {isCurrentPlanTrial
                      ? `Anda masih memiliki sisa ${remainingDays} hari masa trial. Durasi ini akan ditambahkan ke paket baru Anda.`
                      : `Anda masih memiliki sisa ${remainingDays} hari dari masa langganan ${currentPlan}. Durasi ini akan ditambahkan ke paket baru.`}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="font-nunito text-gray-700">
                    Durasi Paket Baru:
                  </span>
                  <span className="font-nunito font-semibold">
                    {plan.duration}
                  </span>
                </div>
                {showWarning && (
                  <div className="mt-1 flex items-center justify-between">
                    <span className="font-nunito text-gray-700">
                      Total Durasi:
                    </span>
                    <span className="font-nunito font-semibold text-green-700">
                      {totalNewDuration} hari
                    </span>
                  </div>
                )}

                <div className="mt-2 flex items-center justify-between">
                  <span className="font-nunito text-gray-700">
                    Total Harga:
                  </span>
                  <div className="text-right">
                    <div className="font-inter text-xl font-bold text-green-800">
                      {formatPrice(plan.price)}
                    </div>
                    {plan.originalPrice && (
                      <div className="text-sm">
                        <span className="text-gray-400 line-through">
                          {formatPrice(plan.originalPrice)}
                        </span>
                        <span className="ml-2 font-semibold text-green-600">
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
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 font-nunito text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-green-800 px-4 py-3 font-nunito text-base font-semibold text-white transition-colors hover:bg-green-700"
          >
            {plan.isTrial ? 'Mulai Trial' : 'Bayar Sekarang'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default function WasteManagementPricing({
  path = '/auth/login',
  onClick,
  showModal = false,
}: WasteManagementPricingProps): JSX.Element {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [userFirstName, setUserFirstName] = useState('Loading...');
  const [userLastName, setUserLastName] = useState('Loading...');
  const [userEmail, setUserEmail] = useState('Loading...');
  const [userPhone, setUserPhone] = useState('Loading...');
  const [remainingDays, setRemainingDays] = useState(0);
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const [pickup_quota, setPickup_quota] = useState(12);
  const [isCurrentPlanTrial, setIsCurrentPlanTrial] = useState(false);
  const [newPlanDuration, setNewPlanDuration] = useState(0);

  const planLevel: Record<string, number> = {
    Trial: 0,
    '1 Bulan': 1,
    '3 Bulan': 2,
    '6 Bulan': 3,
    '1 Tahun': 4,
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('user_id');

      if (!userId) {
        setUserFirstName('Guest');
        setUserLastName('Guest');
        setUserEmail('Guest');
        setUserPhone('Guest');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, email, phone, plan, end_date')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user:', error);
        setUserFirstName('Guest');
      } else {
        setUserFirstName(data?.first_name || 'Loading...');
        setUserLastName(data?.last_name || 'Loading...');
        setUserEmail(data?.email || 'Loading...');
        setUserPhone(data?.phone || 'Loading...');
        setCurrentPlan(data?.plan || null);
        setPickup_quota(12);
        setIsCurrentPlanTrial(data?.plan === 'Trial');

        if (data?.end_date) {
          const today = new Date();
          const endDate = new Date(data.end_date);
          const daysLeft = Math.ceil(
            (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
          );
          setRemainingDays(daysLeft > 0 ? daysLeft : 0);
        }
      }
    };

    fetchUser();
  }, []);

  const getPlanDurationInDays = (duration: string): number => {
    if (duration.includes('hari')) {
      return parseInt(duration.replace(' hari', ''));
    }
    if (duration.includes('bulan')) {
      return parseInt(duration.replace(' bulan', '')) * 30;
    }
    if (duration.includes('tahun')) {
      return parseInt(duration.replace(' tahun', '')) * 365;
    }
    return 0;
  };

  const handlePlanClick = (plan: PricingPlan) => {
    if (!showModal) {
      if (onClick) onClick(plan);
      return;
    }

    if (currentPlan && planLevel[currentPlan] && planLevel[plan.name]) {
      if (planLevel[currentPlan] > planLevel[plan.name]) {
        toast.error(
          `Anda sudah berlangganan ${currentPlan}. Tidak bisa downgrade ke ${plan.name}.`,
        );
        return;
      }
    }

    setSelectedPlan(plan);
    setNewPlanDuration(getPlanDurationInDays(plan.duration));
    setIsModalOpen(true);
  };

  const handleModalConfirm = async () => {
    if (!selectedPlan) return;

    const totalDuration = newPlanDuration + remainingDays;

    const orderId = `trx-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    localStorage.setItem('order_id', orderId);

    const userId = localStorage.getItem('user_id');
    if (!userId) {
      toast.error('User ID not found. Please log in again.');
      return;
    }

    try {
      const response = await fetch('/api/create-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: orderId,
          gross_amount: selectedPlan.price,
          customer_details: {
            first_name: userFirstName,
            last_name: userLastName,
            email: userEmail,
            phone: userPhone,
            id: userId,
          },
          item_details: [
            {
              id: selectedPlan.name,
              name: selectedPlan.name,
              price: selectedPlan.price,
              quantity: 1,
            },
          ],
          // 🔥 kirim juga totalDuration agar backend bisa update end_date sesuai total
          total_duration: totalDuration,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        window.snap.pay(data.token, {
          onSuccess: function (result: any) {
            console.log('Payment success:', result);
            toast.success('Pembayaran berhasil!');
            setIsModalOpen(false);
          },
          onPending: function (result: any) {
            console.log('Payment pending:', result);
            toast.success('Menunggu pembayaran Anda.');
            setIsModalOpen(false);
          },
          onError: function (result: any) {
            console.log('Payment error:', result);
            toast.error('Terjadi kesalahan saat pembayaran.');
            setIsModalOpen(false);
          },
          onClose: function () {
            console.log(
              'Customer closed the popup without finishing the payment',
            );
          },
        });
      } else {
        console.error('Failed to get transaction token:', data.error);
        toast.error('Gagal membuat transaksi. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error during transaction process:', error);
      toast.error('Terjadi kesalahan pada sistem. Silakan coba lagi.');
    }
  };

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
      duration: '14 hari',
      icon: <Star className="h-6 w-6" />,
      features: [
        'Pengangkutan 2x seminggu',
        'Maksimal 10kg per pickup',
        'Notifikasi jadwal',
        'Customer support AI',
      ],
      popular: false,
      buttonText: 'Mulai Trial Gratis',
      isTrial: true,
    },
    {
      name: '1 Bulan',
      subHead: '1 Bulan',
      price: 150000,
      duration: '1 bulan',
      icon: <Home className="h-6 w-6" />,
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
    },
    {
      name: '3 Bulan',
      subHead: 'Disarankan untuk sampah elektronik',
      price: 450000,
      duration: '3 bulan',
      icon: <Users2 className="h-6 w-6" />,
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
      buttonText: 'Berlangganan sekarang',
    },
  ];

  const yearlyPlans: PricingPlan[] = [
    {
      name: '6 Bulan',
      subHead: 'Standar membership',
      price: 785000,
      originalPrice: 900000,
      duration: '6 bulan',
      icon: <Home className="h-6 w-6" />,
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
      savings: 'Hemat 13%',
    },
    {
      name: '1 Tahun',
      subHead: 'Disarankan untuk sampah elektronik',
      price: 1285000,
      originalPrice: 1500000,
      duration: '1 tahun',
      icon: <Users2 className="h-6 w-6" />,
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
      savings: 'Hemat 16%',
    },
  ];

  const currentPlans: PricingPlan[] =
    billingPeriod === 'monthly' ? monthlyPlans : yearlyPlans;

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
      <div className="min-h-screen bg-[#FBFFF9] px-4 py-12 sm:px-6 lg:px-8">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-green-800">
              <Truck className="h-10 w-10 text-white" />
            </div>
            <h2 className="mb-4 font-inter text-[2rem] font-bold text-gray-900 lg:text-[2.2rem]">
              Layanan Pengangkutan Sampah Rumahan
            </h2>
            <p className="mx-auto mb-8 max-w-3xl font-nunito text-lg text-gray-600">
              Solusi mudah dan terpercaya untuk mengelola sampah rumah tangga
              Anda. Mulai dengan trial gratis 14 hari tanpa komitmen.
            </p>
            <div className="mb-12 flex items-center justify-center">
              <div className="flex rounded-lg border bg-white p-1 shadow-sm">
                <button
                  onClick={() => handleBillingChange('monthly')}
                  className={`rounded-md px-8 py-3 font-nunito text-base font-medium transition-all duration-300 ${
                    billingPeriod === 'monthly'
                      ? 'bg-green-800 text-white shadow-sm'
                      : 'text-gray-500 hover:text-green-700'
                  }`}
                >
                  Bulanan
                </button>
                <button
                  onClick={() => handleBillingChange('yearly')}
                  className={`relative rounded-md px-8 py-3 font-nunito text-base font-medium transition-all duration-300 ${
                    billingPeriod === 'yearly'
                      ? 'bg-green-800 text-white shadow-sm'
                      : 'text-gray-500 hover:text-green-700'
                  }`}
                >
                  Tahunan
                  <span className="absolute -right-2 -top-2 rounded-full bg-green-800 px-2 py-0.5 font-nunito text-xs text-white">
                    -17%
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 ${
              currentPlans.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
            } mx-auto max-w-6xl gap-8 transition-all duration-500 ${
              isAnimating
                ? 'translate-y-4 opacity-0'
                : 'translate-y-0 opacity-100'
            }`}
          >
            {currentPlans.map((plan, index) => (
              <div
                key={`${plan.name}-${billingPeriod}`}
                className="border-transparent relative flex flex-col rounded-2xl border-2 bg-white p-6 shadow-lg transition-all duration-500 ease-in-out hover:-translate-y-1 hover:border-green-800 hover:shadow-xl"
              >
                <div className="flex flex-grow flex-col">
                  <div className="mb-6 text-center">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-green-800 text-white">
                      {plan.icon}
                    </div>
                    <h3 className="mb-2 font-inter text-2xl font-bold text-gray-900">
                      {plan.name}
                    </h3>
                    <p className="mb-4 font-nunito text-sm text-gray-500">
                      {plan.subHead}
                    </p>
                    <div className="mb-6">
                      <div className="flex items-center justify-center">
                        <span
                          className={`font-inter text-4xl font-bold ${
                            plan.price === 0
                              ? 'text-green-800'
                              : 'text-gray-900'
                          }`}
                        >
                          {formatPrice(plan.price)}
                        </span>
                      </div>
                      <div className="font-nunito text-lg text-gray-500">
                        /{plan.duration}
                      </div>
                      {billingPeriod === 'yearly' && plan.originalPrice && (
                        <div className="mt-2">
                          <span className="font-nunito text-sm text-gray-400 line-through">
                            {formatPrice(plan.originalPrice)}
                          </span>
                          <span className="ml-2 font-nunito text-sm font-semibold text-green-800">
                            {plan.savings}
                          </span>
                        </div>
                      )}
                    </div>
                    {showModal ? (
                      <button
                        onClick={() => handlePlanClick(plan)}
                        className="w-full rounded-xl bg-green-800 px-5 py-3 font-nunito text-base font-semibold text-white shadow-md transition-colors hover:bg-green-500 hover:shadow-lg"
                      >
                        {plan.buttonText}
                      </button>
                    ) : (
                      <Link href={path}>
                        <button
                          onClick={() => handlePlanClick(plan)}
                          className="w-full rounded-xl bg-green-800 px-5 py-3 font-nunito text-base font-semibold text-white shadow-md transition-colors hover:bg-green-500 hover:shadow-lg"
                        >
                          {plan.buttonText}
                        </button>
                      </Link>
                    )}
                  </div>
                  <div className="mt-6 flex-1">
                    <h4 className="mb-4 font-inter text-lg font-semibold text-gray-900">
                      Fitur yang termasuk:
                    </h4>
                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <div className="mr-3 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                            <Check className="h-3 w-3 text-green-800" />
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
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPlan(null);
          setNewPlanDuration(0);
        }}
        plan={selectedPlan}
        onConfirm={handleModalConfirm}
        remainingDays={remainingDays}
        currentPlan={currentPlan}
        isCurrentPlanTrial={isCurrentPlanTrial}
        newPlanDuration={newPlanDuration}
      />
    </>
  );
}
