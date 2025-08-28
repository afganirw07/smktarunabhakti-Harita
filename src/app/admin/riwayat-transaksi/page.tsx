'use client'

import Riwayat from 'components/admin/riwayat-transaksi/riwayat'
const RiwayatTransaksi = () => {

    return (
        <div className='flex flex-col items-end p-4'>
            <Riwayat />
            <button className='mt-10 bg-[#294B29] hover:bg-green-800 active:bg-[#294B29] text-white font-bold py-2 px-4 rounded'>Download Data</button>
        </div>
    )

}

export default RiwayatTransaksi