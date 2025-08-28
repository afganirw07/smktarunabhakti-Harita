'use client'

import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import Riwayat from 'components/admin/riwayat-transaksi/riwayat'

const RiwayatTransaksi = () => {
    // Kita tidak lagi menggunakan ref pada Riwayat, tapi akan menargetkan ID
    const handleDownload = () => {
        const content = document.getElementById('pdf-content'); // Ambil elemen berdasarkan ID
        if (content) {
            const options = {
                margin: 10,
                filename: 'riwayat-transaksi.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            };
            html2pdf().set(options).from(content).save();
        }
    };

    return (
        <div className='flex flex-col items-end p-4'>
            <Riwayat />
            <button
                onClick={handleDownload}
                className='mt-10 bg-[#294B29] hover:bg-green-800 active:bg-[#294B29] text-white font-bold py-2 px-4 rounded'
            >
                Download Data
            </button>
        </div>
    );
};

export default RiwayatTransaksi;