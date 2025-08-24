'use client';

import truk from '/public/img/aset/truk.png';
import alat from '/public/img/aset/alat.png';
import gudang from '/public/img/aset/gudang.png';


import tableDataTopCreators from 'variables/nfts/marketplace/tableDataTopCreators';
import HistoryItem from 'components/admin/nft-marketplace/HistoryItem';
import TopCreatorTable from 'components/admin/nft-marketplace/TableTopCreators';
import NftCard from 'components/card/NftCard';
import StatusAset from 'components/card/statusAset';

const Marketplace = () => {
  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        {/* NFt Banner */}
        {/* <Banner /> */}

        {/* NFt Header */}
        <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            Inventaris Barang
          </h4>
        </div>

      
          <NftCard/>

        {/* Recenlty Added setion */}
        <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            Status Aset
          </h4>
        </div>

     
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
  <StatusAset
    title="Status Armada"
    desc="Total Kendaraan: 30, Sedang Beroperasi: 15, Perlu Perawatan: 5."
    price="0.91"
    image={truk}
  />
  <StatusAset
    title="Status Peralatan"
    desc="Total Alat: 25, Sedang Beroperasi: 20, Perlu Perawatan: 4"
    price="0.7"
    image={alat}
  />
  <StatusAset
    title="Status Gudang"
   desc="Gudang menyimpan 120 barang, 90 tersedia, 15 perlu segera dilengkapi."
    price="1.1"
    image={gudang}
  />
</div>
      </div>

      {/* right side section */}

      <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        <TopCreatorTable tableData={tableDataTopCreators} />
        <div className="mb-5" />
        <HistoryItem />
      </div>
    </div>
  );
};

export default Marketplace;
