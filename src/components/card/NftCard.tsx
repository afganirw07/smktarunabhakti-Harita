import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { useState } from 'react';
import Card from 'components/card';
import Image from 'next/image';

const NftCard = (props: {
  image: string;
  title: string;
  desc: string;
  bidders: string[];
  download?: string;
  price: string | number;
  extra?: string;
}) => {
  const { title, desc, price, image, bidders, extra } = props;
  const [heart, setHeart] = useState(true);
  return (
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
    >
      <div className="h-full w-full">
        <div className="relative w-full">
          {/* <Image 
            width="2"
            height="20"
            src={image}
            className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
            alt=""
          /> */}
          <Image
            width="2"
            height="20"
            className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
            src={image}
            alt=""
          />
          
        </div>

        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {' '}
              {title}{' '}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              {desc}{' '}
            </p>
          </div>

        
        </div>

        <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
          <div className="flex">
            <p className="mb-2 text-sm font-bold text-white dark:text-white">
              Current Bid: {price} <span>ETH</span>
            </p>
          </div>
          <button className="linear rounded-[20px] bg-[#294B29] px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-[#86A789] active:bg-[#294B29]">
            Lihat Detail
          </button>
        </div>
      </div>
    </Card>
  );
};

export default NftCard;
