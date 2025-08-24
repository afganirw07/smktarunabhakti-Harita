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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Card
        extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
      >
        <div className="h-full w-full">
          <div className="relative w-full">
            {/* Menggunakan Image dari next/image */}
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
            <div className='flex gap-3'>
              <button
                className="btn linear rounded-[20px] bg-[#294B29] px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-[#86A789] active:bg-[#294B29]"
                onClick={toggleModal}
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

      {/* Modal - Conditionally rendered based on isModalOpen state */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 dark:bg-opacity-80">
          <div className="max-h-full w-full max-w-md rounded-lg bg-white shadow-sm dark:bg-gray-700">
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-600 md:p-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Detail  
              </h3>
            </div>

            {/* Modal Body */}
            <div className="p-4 md:p-5">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            {/* Modal Footer */}
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

export default NftCard;
