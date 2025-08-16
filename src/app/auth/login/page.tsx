import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Leaf } from "lucide-react";

export default function Login() {
  return (
    <>
      {/* ✅ h-screen agar fix setinggi layar */}
      <div className="h-screen bg-gray-100 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-6 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          
          {/* Left side content - Welcome back section */}
          <div className="flex-1 hidden lg:flex lg:w-2/5 xl:w-5/12 relative overflow-hidden">
            {/* Background Image */}
            <Image
              src="https://assets.ladiestory.id/gallery/1674010062369593176-pandawara-group.jpg"
              alt="Welcome back background"
              fill
              className="object-cover"
            />
            
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            
            {/* Content overlay */}
            <div className="relative z-10 flex flex-col justify-center items-center p-8 text-white w-full">
              <div className="max-w-md text-center">
                {/* Welcome Icon */}
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto bg-white bg-opacity-10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Leaf className="w-10 h-10 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                
                {/* Welcome Message */}
                <h2 className="text-2xl xl:text-3xl font-bold mb-4">
                  Selamat Datang Kembali di <span className="text-green-400">Harita</span>
                </h2>
                
                <p className="text-gray-200 text-base xl:text-lg mb-6 leading-relaxed">
                  Masuk ke akun Anda dan lanjutkan perjalanan menuju solusi digital pengelolaan sampah yang lebih baik.
                </p>
                
                {/* Don't have account section */}
                <div className="border-t border-white border-opacity-20 pt-6">
                  <p className="text-gray-200 text-sm mb-4">
                    Belum memiliki akun?
                  </p>
                  <Link href="/auth/register">
                    <button className="bg-white text-green-700 font-semibold py-2 px-8 rounded-lg hover:bg-green-800 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 shadow-lg">
                      Daftar Sekarang
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5 xl:w-7/12 p-4 sm:p-8 flex flex-col justify-center">
            <div className="flex flex-col items-center">
              <h1 className="text-xl xl:text-2xl font-extrabold mb-4">Masuk</h1>

              <div className="w-full max-w-sm">
                {/* --- Form Fields --- */}
                <div className="space-y-4">
                  {/* Email */}
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-white border border-green-200 placeholder-gray-500 text-sm focus:outline-none focus:border-green-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                  />
                  
                  {/* Password */}
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-white border border-green-200 placeholder-gray-500 text-sm focus:outline-none focus:border-green-400 focus:bg-white"
                    type="password"
                    placeholder="Kata Sandi"
                  />
                  
                  {/* Remember me & Forgot password */}
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2 text-green-600 focus:ring-green-500" />
                      <span className="text-gray-600">Ingat saya</span>
                    </label>
                    <Link href="/forgot-password" className="text-green-700 hover:text-green-800 font-medium">
                      Lupa kata sandi?
                    </Link>
                  </div>
                </div>

                {/* Login Button */}
                <button className="mt-6 tracking-wide font-semibold text-white w-full py-3 rounded-lg hover:opacity-90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" style={{backgroundColor: '#294B29'}}>
                  <span className="ml-2 text-sm">Masuk</span>
                </button>

                {/* Divider */}
                <div className="my-4 border-b text-center">
                  <div className="leading-none px-2 inline-block text-xs text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Atau masuk dengan
                  </div>
                </div>

                {/* Social Login Buttons */}
                <div className="flex flex-col space-y-2">
                  {/* --- Google Button --- */}
                  <button className="w-full font-bold shadow-sm rounded-lg py-2.5 bg-green-100 text-gray-800 hover:bg-green-600 hover:text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div className="bg-white p-1.5 rounded-full">
                      {/* Google Icon */}
                      <svg className="w-3.5" viewBox="0 0 533.5 544.3">
                        <path
                          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                          fill="#4285f4"
                        />
                        <path
                          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                          fill="#34a853"
                        />
                        <path
                          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                          fill="#fbbc04"
                        />
                        <path
                          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                          fill="#ea4335"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-sm">Masuk dengan Google</span>
                  </button>

                  {/* --- Facebook Button --- */}
                  <button className="w-full font-bold shadow-sm rounded-lg py-2.5 bg-green-50 text-gray-800 hover:bg-green-600 hover:text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline border border-green-200">
                    <div className="bg-white p-1.5 rounded-full">
                      {/* Facebook Icon */}
                      <svg className="w-3.5" viewBox="0 0 24 24" fill="#1877F2">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <span className="ml-3 text-sm">Masuk dengan Facebook</span>
                  </button>
                </div>

                {/* Terms */}
                <p className="mt-4 text-xs text-gray-600 text-center">
                  Dengan masuk, Anda menyetujui{" "}
                  <a href="#" className="border-b border-green-600 border-dotted text-green-700">
                    Syarat & Ketentuan
                  </a>{" "}
                  dan{" "}
                  <a href="#" className="border-b border-green-600 border-dotted text-green-700">
                    Kebijakan Privasi
                  </a>{" "}
                  Harita
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}