"use client";

import { CoinsIcon, Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductCardProps {
  title?: string;
  description?: string;
  price?: string;
  imageUrl?: string;
}

export default function ProductCard({
  title = "Default Product",
  description = "This is a dummy product description for testing layout with sidebar.",
  price = "2500",
  imageUrl = "https://picsum.photos/400/300",
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="w-full bg-white border border-green-700 rounded-xl shadow-md overflow-hidden">
      {/* Gambar */}
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Isi Card */}
      <div className="p-4 flex flex-col gap-3">
        {/* Judul dan deskripsi */}
        <h3 className="text-green-700 font-semibold text-lg">{title}</h3>
        <p className="text-gray-500 text-sm line-clamp-3">{description}</p>

        {/* Quantity */}
        <div className="flex items-center gap-3">
          <button
            onClick={decrement}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-700 hover:bg-green-200"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center font-semibold">{quantity}</span>
          <button
            onClick={increment}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-700 hover:bg-green-200"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Harga + Tombol Beli */}
        <div className="flex items-center justify-between mt-2">
          <span className="flex items-center gap-1 text-black font-bold text-base">
            <CoinsIcon className="w-5 h-auto text-green-700" />
            {price}
          </span>
          <button className="flex items-center gap-2 bg-green-800 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg transition-colors duration-200 ease-out">
            <ShoppingCart size={16} />
            Beli
          </button>
        </div>
      </div>
    </div>
  );
}
