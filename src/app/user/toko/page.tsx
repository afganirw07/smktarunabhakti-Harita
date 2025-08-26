'use client';
import ProductCard from 'components/card/cardProduct';
import { Coins } from 'lucide-react';
export default function Toko() {
  return (
    <>
      <section className="flex flex-col gap-10 h-auto w-full md:px-2 py-8 ">
        <div className='flex lg:flex-row flex-col lg:gap-0 gap-4 lg:justify-between justify-center items-center w-full'>
          <div className='flex flex-col gap-1  lg:text-left text-center'>
        <h1 className='text-3xl font-inter font-bold text-green-700'>Toko Barang Daur Ulang</h1>
        <p className='font-medium text-lg font-inter text-black/60 '>Kumpulan produk sampah yang telah di daur ulang </p>
        </div>

          <div className=''>
            <h1 className='bg-green-700 px-6 py-2 text-white font-semibold font-inter flex gap-1 rounded-full '><Coins/><span>500</span></h1>
          </div>

        </div>

        <div className='w-full flex flex-wrap gap-10'>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ProductCard
            title="Produk C"
            imageUrl="https://picsum.photos/400/301"
          />
          <ProductCard
            title="Produk C"
            imageUrl="https://picsum.photos/400/301"
          />
          <ProductCard
            title="Produk C"
            imageUrl="https://picsum.photos/400/301"
          />
          <ProductCard
            title="Produk C"
            imageUrl="https://picsum.photos/400/301"
          />
          <ProductCard
            title="Produk C"
            imageUrl="https://picsum.photos/400/301"
          />
          <ProductCard
            title="Produk C"
            imageUrl="https://picsum.photos/400/301"
          />
          <ProductCard
            title="Produk C"
            imageUrl="https://picsum.photos/400/301"
          />
          <ProductCard
            title="Produk C"
            imageUrl="https://picsum.photos/400/301"
          />
        </div>
        </div>
        {/* <NftCard/>
            <NftCard/>
            <NftCard/>
            <NftCard/>
            <NftCard/>
            <NftCard/>
            <NftCard/>
            <NftCard/>
            <NftCard/>
            <NftCard/>
            <NftCard/> */}
      </section>
    </>
  );
}
