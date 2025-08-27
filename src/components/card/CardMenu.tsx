import React from 'react';
import Dropdown from 'components/dropdown';
import { AiOutlineUser, AiOutlineShop } from 'react-icons/ai';
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { TiLightbulb } from 'react-icons/ti';

function CardMenu(props: { transparent?: boolean; vertical?: boolean }) {
  const { transparent, vertical } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <Dropdown
      button={
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center text-xl hover:cursor-pointer ${
            transparent
              ? 'bg-none text-white hover:bg-[#86A789] active:bg-none '
              : vertical
              ? 'bg-none text-navy-700 dark:text-white'
              : 'bg-[#294B29] p-2 text-white hover:bg-[#86A789] dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10'
          } linear justify-center rounded-lg font-bold transition duration-200`}
        >
          {vertical ? (
            <p className="text-[24px] hover:cursor-pointer">
              <BsThreeDotsVertical />
            </p>
          ) : (
            <BsThreeDots className="h-6 w-6" />
          )}
        </button>
      }
      animation={'origin-top-right transition-all duration-300 ease-in-out'}
      classNames={`${transparent ? 'top-8' : 'top-11'} right-0 w-max`}
    >
      {/* Tambahkan children di sini untuk mengatasi error */}
      <div className={`${open ? 'block' : 'hidden'} text-navy-700 dark:text-white`}>
        {/* Anda bisa mengganti ini dengan konten menu yang Anda inginkan */}
        <p className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">Option 1</p>
        <p className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">Option 2</p>
      </div>
    </Dropdown>
  );
}

export default CardMenu;