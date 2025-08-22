import React from 'react';
import {
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';

// Komponen Reusable untuk ikon sosial media
const SocialIcon = ({ icon: Icon }) => (
  <Icon className="social-icon text-white hover:text-[#00df9a]" size={30} />
);

// Komponen Footer
const Footer = () => {
  // Konten footer
  const items = [
    // Ikon sosial media
    { type: 'icon', icon: FaFacebookSquare },
    { type: 'icon', icon: FaInstagram },
    { type: 'icon', icon: FaTwitterSquare },
    { type: 'icon', icon: FaGithubSquare },
    // Bagian footer
    { type: 'section', title: 'Dukungan', items: ['Harga', 'Dokumentasi', 'Panduan', 'Status Layanan'] },
    { type: 'section', title: 'Perusahaan', items: ['Tentang Kami', 'Fitur', 'Manfaat', 'Layanan', 'Testimoni'] },
    { type: 'section', title: 'Legal', items: ['Klaim', 'Kebijakan', 'Syarat & Ketentuan'] },
  ];

  return (
    <div className='bg-green-800 mx-auto py-16 px-16 grid lg:grid-cols-3 gap-8 text-gray-300'>
      {/* Bagian kiri (brand + ikon sosial media) */}
      <div>
        <h1 className='w-full font-inter text-4xl xl:text-5xl font-bold text-white'>Harita</h1>
        <p className='py-4 text-white font-nunito'>
          Harita hadir sebagai solusi ramah lingkungan dalam pengelolaan sampah rumah tangga. 
          Bersama kita bisa menjaga kebersihan dan kelestarian lingkungan.
        </p>
        <div className='flex gap-10 md:w-[75%] my-6'>
          {/* Render ikon sosial media */}
          {items.map((item, index) =>
            item.type === 'icon' ? <SocialIcon key={index} icon={item.icon} /> : null
          )}
        </div>
      </div>

      {/* Bagian kanan (menu footer) */}
      <div className='lg:col-span-2 flex md:justify-evenly justify-between mt-6'>
        {items.map((item, index) =>
          item.type === 'section' ? (
            <div key={index}>
              <h6 className="font-medium text-gray-100 text-xl">{item.title}</h6>
              <ul>
                {item.items.map((subItem, subIndex) => (
                  <li key={subIndex} className='py-2 text-sm'>{subItem}</li>
                ))}
              </ul>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Footer;
