import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import Card from 'components/card';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

// Inisialisasi Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Komponen untuk menampilkan list assets
const AssetCardList = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      if (!supabase) return;

      const { data, error } = await supabase
        .from('aset_barang')
        .select('id, nama, desc, img');

      if (error) throw error;

      setAssets(data || []);
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (assets.length === 0) {
  return <div className="text-center p-4">Tidak ada data</div>;
}

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-7">
      {assets.map((asset) => (
        <NftCard
          key={asset.id}
          id={asset.id}
          title={asset.nama}
          desc={asset.desc}
          image={asset.img}
          price="0.91"
          bidders={[]}
          onDataChange={fetchAssets} 
        />
      ))}
    </div>
  );
};


const NftCard = (props) => {
  const { id, title, desc, price, image, bidders, extra, onDataChange } = props;
  const [heart, setHeart] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = async () => {
    try {
      if (!supabase || !id) return;

      const { error } = await supabase
        .from('aset_barang')
        .delete()
        .eq('id', id);

      if (error) throw error;

      if (onDataChange) onDataChange();
      
      alert('Asset berhasil dihapus!');
    } catch (error) {
      console.error('Error deleting asset:', error);
      alert('Gagal menghapus asset!');
    }
  };

  return (
    <>
      <Card
        extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
      >
        <div className="h-full w-full">
          <div className="relative w-full aspect-square mb-3">
            <Image
              fill
              className="rounded-xl object-cover"
              src={image}
              alt={title}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>

          <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
            <div className="mb-2">
              <p className="text-lg font-bold text-navy-700 dark:text-white">
                {title}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
                {desc}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
            <div className="flex">
              <p className="mb-2 text-sm font-bold text-white dark:text-white">
                Current Bid: {price} <span>ETH</span>
              </p>
            </div>
            <div className='flex gap-3'>
              <button
                className="btn linear rounded-[20px] bg-red-500 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700"
                onClick={handleDelete}
              >
                Hapus
              </button>
              <button
                className="btn linear rounded-[20px] bg-[#294B29] px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-[#86A789] active:bg-[#294B29]"
                onClick={toggleModal}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 dark:bg-opacity-80">
          <div className="max-h-full w-full max-w-md rounded-lg bg-white shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-600 md:p-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Edit {title}
              </h3>
            </div>

            <div className="p-4 md:p-5">
              <div className="mb-4 relative w-full aspect-video">
                <Image
                  fill
                  className="rounded-lg object-cover"
                  src={image}
                  alt={title}
                  sizes="400px"
                />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {title}
              </h4>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {desc}
              </p>
            </div>

            <div className="flex items-center justify-end rounded-b border-t border-gray-200 p-4 dark:border-gray-600 md:p-5">
              <button
                onClick={toggleModal}
                className="rounded-lg bg-[#294B29] hover:bg-[#86A789] focus:bg-[#294B29] px-5 py-2.5 text-center text-sm font-medium text-white"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AssetCardList;