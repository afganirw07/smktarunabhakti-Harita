'use client';
import Image from 'next/image';
import ProductCard from 'components/card/cardProduct';
import NftCard from 'components/card/NftCard';
export default function Toko() {
  return (
    <>
      <section className="flex h-auto w-full flex-wrap gap-10 ">
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
