"use client";

import Image from "next/image";

interface ProductCardProps {
  title?: string;
  description?: string;
  price?: string;
  imageUrl?: string;
}

export default function ProductCard({
  title = "Default Product",
  description = "This is a dummy product description for testing layout with sidebar.",
  price = "Rp 250.000",
  imageUrl = "https://picsum.photos/400/300",
}: ProductCardProps) {
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
      <div className="p-4">
        <h3 className="text-green-700 font-semibold text-lg">{title}</h3>
        <p className="text-gray-300 text-sm mt-2 line-clamp-3">{description}</p>
        <div className="mt-3">
          <span className="text-green-700 font-bold text-base">{price}</span>
        </div>
      </div>
    </div>
  );
}
