"use client"

import { Phone, MapPin, Clock, User, Mail, Home, FileText, Calculator, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/public/components/ui/dropdown-menu';

export default function LaporSampah() {
    const [formData, setFormData] = useState({
        namaLengkap: '',
        nomorHP: '',
        email: '',
        alamat: '',
        wilayah: '',
        deskripsi: ''
    });

    const [totalPanggilan] = useState(7); // Data simulasi

    const wilayahOptions = [
        { value: 'RT', label: 'RT (Rukun Tetangga)', harga: 'Rp 100.000' },
        { value: 'Selokan', label: 'Selokan', harga: 'Rp 80.000' },
        { value: 'Sungai', label: 'Sungai', harga: 'Rp 175.000' },
        { value: 'Sekolah', label: 'Sekolah', harga: 'Rp 150.000' }
    ];

    const selectedWilayah = wilayahOptions.find(option => option.value === formData.wilayah);

    const handleWilayahSelect = (value) => {
        setFormData(prev => ({ ...prev, wilayah: value }));
    };

    const hargaWilayah = {
        RT: 100000,
        Selokan: 80000,
        Sungai: 175000,
        Sekolah: 150000
    };

    const hitungTotal = () => {
        const hargaDasar = hargaWilayah[formData.wilayah] || 0;
        const pajak = hargaDasar * 0.1;
        return { hargaDasar, pajak, total: hargaDasar + pajak };
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        alert('Laporan sampah berhasil dikirim!');
    };

    const biaya = hitungTotal();

    return (
        <>
            <section className="w-full h-auto py-8 space-y-6">
                
                {/* heading */}
                <div className='flex lg:flex-row flex-col lg:gap-0 gap-4 lg:justify-between justify-center items-center w-full'>
                    <div className='flex flex-col gap-1 lg:text-left text-center'>
                        <h1 className='text-3xl font-inter font-bold text-green-700'>Lapor Sampah</h1>
                    </div>
                    <button className="rounded-xl bg-green-800 px-4 py-2 font-nunito font-bold text-white transition-all duration-200 ease-out hover:bg-green-700 hover:text-white">
                        Dokumentasi Kami
                    </button>
                </div>

                {/* grid pertama */}
                <div className="w-full h-auto grid lg:grid-cols-7 gap-6 grid-cols-1 lg:grid-rows-2">
                    
                    {/* deskripsi */}
                    <div className="w-full bg-white border-l-4 border-green-600 p-6 shadow-lg rounded-2xl lg:col-span-4 lg:row-span-2">
                        <div className="flex items-start gap-4">
                            <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-full shadow-md">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-inter font-bold text-green-800 mb-3">Tentang Layanan Lapor Sampah</h2>
                                <p className="font-nunito text-green-700 leading-relaxed">
                                    Lapor Sampah adalah fitur pemanggilan petugas untuk membersihkan sampah di area sekitar Anda. 
                                    Layanan ini memungkinkan Anda melaporkan timbunan sampah yang mengganggu kebersihan lingkungan, 
                                    baik di area RT, selokan, sungai, maupun sekolah. Tim petugas kami akan segera menindaklanjuti 
                                    laporan Anda dengan profesional dan terpercaya untuk menciptakan lingkungan yang bersih dan sehat.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* total panggil */}
                    <div className="w-full bg-gradient-to-br from-green-600 to-green-700 p-6 shadow-lg rounded-2xl lg:col-span-3 lg:row-span-1 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full border border-white/30">
                                <Phone className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-inter font-bold text-white mb-1">{totalPanggilan}</h2>
                                <p className="font-nunito text-green-100 text-sm">Total panggilan dari Anda</p>
                            </div>
                        </div>
                    </div>

                    {/* riwayat panggilan */}
                    <div className="w-full bg-gradient-to-br from-lime-600 to-green-600 p-6 shadow-lg rounded-2xl lg:col-span-3 lg:row-span-1 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-start gap-4">
                            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full border border-white/30">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-inter font-bold text-white mb-1">Panggilan Terakhir</h3>
                                <p className="font-nunito text-white font-black text-sm mb-2">
                                    Sungai Cambon - Jl. Merdeka No. 123 RT 05 RW 02 Kota Bandung
                                </p>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-green-100" />
                                    <span className="font-nunito text-green-100 text-xs">2 hari yang lalu</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* grid kedua */}
                <div className="w-full h-auto grid lg:grid-cols-7 gap-6 grid-cols-1 lg:grid-rows-2">
                    
                    {/* form */}
                    <div className="w-full bg-green-50 p-6 shadow-lg rounded-2xl lg:col-span-4 lg:row-span-2">
                        <h2 className="text-xl font-inter font-bold text-green-800 mb-6">Form Laporan Sampah</h2>
                        
                        <div className="space-y-4">
                            <div>
                                <div className="block font-nunito font-semibold text-green-700 mb-2">
                                    <User className="inline w-4 h-4 mr-2" />
                                    Nama Lengkap
                                </div>
                                <input
                                    type="text"
                                    name="namaLengkap"
                                    value={formData.namaLengkap}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 font-nunito border border-green-300 rounded-lg focus:outline-none focus:border-green-500"
                                    placeholder="Masukkan nama lengkap"
                                />
                            </div>

                            <div>
                                <div className="block font-nunito font-semibold text-green-700 mb-2">
                                    <Phone className="inline w-4 h-4 mr-2" />
                                    Nomor Handphone
                                </div>
                                <input
                                    type="tel"
                                    name="nomorHP"
                                    value={formData.nomorHP}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 font-nunito border border-green-300 rounded-lg focus:outline-none focus:border-green-500"
                                    placeholder="Contoh: 08123456789"
                                />
                            </div>

                            <div>
                                <div className="block font-nunito font-semibold text-green-700 mb-2">
                                    <Mail className="inline w-4 h-4 mr-2" />
                                    Email
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 font-nunito border border-green-300 rounded-lg focus:outline-none focus:border-green-500"
                                    placeholder="contoh@email.com"
                                />
                            </div>

                            <div>
                                <div className="block font-nunito font-semibold text-green-700 mb-2">
                                    <Home className="inline w-4 h-4 mr-2" />
                                    Alamat
                                </div>
                                <input
                                    type="text"
                                    name="alamat"
                                    value={formData.alamat}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 font-nunito border border-green-300 rounded-lg focus:outline-none focus:border-green-500"
                                    placeholder="Alamat lengkap"
                                />
                            </div>

                            <div>
                                <div className="block font-nunito font-semibold text-green-700 mb-2">
                                    <MapPin className="inline w-4 h-4 mr-2" />
                                    Wilayah
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="w-full px-6 py-4 font-nunito font-medium text-green-800 border-2 border-green-300 rounded-xl bg-green-50 focus:outline-none focus:border-green-600 focus:bg-white focus:shadow-lg cursor-pointer transition-all duration-300 hover:border-green-500 hover:bg-green-100 text-base text-left flex items-center justify-between">
                                        <span className={selectedWilayah ? "text-green-800" : "text-green-600"}>
                                            {selectedWilayah ? `${selectedWilayah.label} - ${selectedWilayah.harga}` : "Pilih wilayah layanan"}
                                        </span>
                                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-green-600"></div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-full min-w-[400px] bg-white border-2 border-green-200 rounded-xl shadow-xl">
                                        {wilayahOptions.map((option) => (
                                            <DropdownMenuItem 
                                                key={option.value}
                                                onClick={() => handleWilayahSelect(option.value)}
                                                className="px-6 py-3 font-nunito text-green-800 hover:bg-green-50 focus:bg-green-100 cursor-pointer transition-colors duration-200"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{option.label}</span>
                                                    <span className="text-sm text-green-600">{option.harga}</span>
                                                </div>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div>
                                <div className="block font-nunito font-semibold text-green-700 mb-2">
                                    <FileText className="inline w-4 h-4 mr-2" />
                                    Deskripsi Keluhan
                                </div>
                                <textarea
                                    name="deskripsi"
                                    value={formData.deskripsi}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-4 py-2 font-nunito border border-green-300 rounded-lg focus:outline-none focus:border-green-500"
                                    placeholder="Deskripsi keluhan sampahnya (contoh: Tumpukan sampah plastik dan organik di dekat selokan yang menyebabkan bau tidak sedap)"
                                ></textarea>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="w-full bg-green-700 text-white py-3 px-6 font-nunito font-bold rounded-lg hover:bg-green-800 transition-colors duration-200"
                            >
                                Lapor Sekarang
                            </button>
                        </div>
                    </div>

                    {/* total harga */}
                    <div className="w-full bg-white border-2 border-gray-400 p-6 shadow-lg rounded-2xl lg:col-span-3 lg:row-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <Calculator className="w-6 h-6 text-green-600" />
                            <h2 className="text-xl font-inter font-bold text-gray-800">Rincian Biaya</h2>
                        </div>
                        
                        <div className="space-y-4 border-b border-gray-300 pb-4 mb-4">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-nunito text-sm text-gray-600 mb-1">Nama Lengkap</p>
                                <p className="font-nunito font-semibold text-gray-800">{formData.namaLengkap || '-'}</p>
                            </div>
                            
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-nunito text-sm text-gray-600 mb-1">Nomor HP</p>
                                <p className="font-nunito font-semibold text-gray-800">{formData.nomorHP || '-'}</p>
                            </div>
                            
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-nunito text-sm text-gray-600 mb-1">Email</p>
                                <p className="font-nunito font-semibold text-gray-800">{formData.email || '-'}</p>
                            </div>
                            
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-nunito text-sm text-gray-600 mb-1">Alamat</p>
                                <p className="font-nunito font-semibold text-gray-800">{formData.alamat || '-'}</p>
                            </div>
                            
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-nunito text-sm text-gray-600 mb-1">Wilayah</p>
                                <p className="font-nunito font-semibold text-gray-800">{formData.wilayah || '-'}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="font-nunito text-gray-700">Biaya Layanan</span>
                                <span className="font-nunito font-semibold text-gray-800">
                                    Rp {biaya.hargaDasar.toLocaleString('id-ID')}
                                </span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <span className="font-nunito text-gray-700">Pajak (10%)</span>
                                <span className="font-nunito font-semibold text-gray-800">
                                    Rp {biaya.pajak.toLocaleString('id-ID')}
                                </span>
                            </div>
                            
                            <hr className="border-gray-300" />
                            
                            <div className="flex justify-between items-center">
                                <span className="font-inter font-bold text-green-700 text-lg">Total</span>
                                <span className="font-inter font-bold text-green-700 text-lg">
                                    Rp {biaya.total.toLocaleString('id-ID')}
                                </span>
                            </div>
                        </div>

                        {!formData.wilayah && (
                            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="font-nunito text-sm text-yellow-700 text-center">
                                    Pilih wilayah untuk melihat biaya layanan
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}