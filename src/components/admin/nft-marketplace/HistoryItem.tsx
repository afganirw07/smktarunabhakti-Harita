import pupuk from '/public/img/barang/pupuk.png';
import bricket from '/public/img/barang/briket.png';
import kerajinan from '/public/img/barang/kerajinan.png';
import Image from 'next/image';
import { FaEthereum } from 'react-icons/fa';
import Card from 'components/card';

const HistoryCard = () => {
  const HistoryData = [
    {
      image: pupuk,
      title: 'Colorful Heaven',
      owner: 'Mark Benjamin',
      price: 0.4,
      time: '30s',
    },
    {
      image: pupuk,
      title: 'Abstract Colors',
      owner: 'Esthera Jackson',
      price: 2.4,
      time: '50m',
    },
    {
      image: pupuk,
      title: 'ETH AI Brain',
      owner: 'Nick Wilson',
      price: 0.3,
      time: '20s',
    },
    {
      image: pupuk,
      title: 'Swipe Circles',
      owner: ' Peter Will',
      price: 0.4,
      time: '4h',
    },
    {
      image: pupuk,
      title: 'Mesh Gradients',
      owner: 'Will Smith',
      price: 0.4,
      time: '30s',
    },
    {
      image: pupuk,
      title: '3D Cubes Art',
      owner: ' Manny Gates',
      price: 0.4,
      time: '2m',
    },
  ];

  return (
    <Card extra={'mt-3 !z-5 overflow-hidden'}>
      {/* HistoryCard Header */}
      <div className="flex items-center justify-between rounded-t-3xl p-3">
        <div className="text-lg font-bold text-navy-700 dark:text-white">
          Riwayat Aktivitas Aset 
        </div>
        <button className="linear rounded-[20px] bg-[#294B29] px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-[#86A789] dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
          Lihat Semua
        </button>
      </div>

      {/* History CardData */}

      {HistoryData.map((data, index) => (
        <div
          key={index}
          className="flex h-full w-full items-start justify-between bg-white px-3 py-[20px] hover:shadow-2xl dark:!bg-navy-800 dark:shadow-none dark:hover:!bg-navy-700"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center">
              <Image
                width="2"
                height="20"
                className="h-full w-full rounded-xl"
                src={data.image}
                alt=""
              />
            </div>
            <div className="flex flex-col">
              <h5 className="text-base font-bold text-navy-700 dark:text-white">
                {' '}
                {data.title}
              </h5>
              <p className="mt-1 text-sm font-normal text-gray-600">
                {' '}
                {data.owner}{' '}
              </p>
            </div>
          </div>

          <div className="mt-1 flex items-center justify-center text-navy-700 dark:text-white">
            <div>
              <FaEthereum />
            </div>
            <div className="ml-1 flex items-center text-sm font-bold text-navy-700 dark:text-white">
              <p> {} </p>
              {data.price} <p className="ml-1">ETH</p>
            </div>
            <div className="ml-2 flex items-center text-sm font-normal text-gray-600 dark:text-white">
              <p>{data.time}</p>
              <p className="ml-1">ago</p>
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default HistoryCard;
