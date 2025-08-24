"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return(
        <>
        <nav className="lg:w-auto w-[95%] md:w-[95%]  bg-white/85 backdrop-blur-sm text-black md:px-12 px-8 py-2 flex items-center lg:justify-center justify-between  lg:gap-16 gap-4 drop-shadow-md rounded-full fixed top-6 z-50">
            <div className="font-black text-2xl text-green-800 font-family-inter flex ">
                HARITA
            </div>
            
            {/* Desktop Navigation */}
            <div className="nav items-center justify-center md:flex hidden">
                <ul className="flex gap-10">
                    <li className="relative group cursor-pointer text-lg font-family-nunito">
                        Beranda
                        <div className="bg-green-600 h-[3px] w-0 group-hover:w-full transition-all duration-300 absolute left-0"></div>
                    </li>
                    <li className="relative group cursor-pointer text-lg font-family-nunito">
                        Tentang
                        <div className="bg-green-600 h-[3px] w-0 group-hover:w-full transition-all duration-300 absolute left-0"></div>
                    </li>
                    <li className="relative group cursor-pointer text-lg font-family-nunito">
                        Layanan
                        <div className="bg-green-600 h-[3px] w-0 group-hover:w-full transition-all duration-300 absolute left-0"></div>
                    </li>
                    <li className="relative group cursor-pointer text-lg font-family-nunito">
                        Kontak
                        <div className="bg-green-600 h-[3px] w-0 group-hover:w-full transition-all duration-300 absolute left-0"></div>
                    </li>
                </ul>
            </div>

            <div className="button menu flex gap-4 md:justify-center items-center  h-full">
                <button className="bg-white text-black font-bold border-[1px] border-[#D2E3C8] px-6 py-2 rounded-lg shadow-[inset_0_-7px_8px_rgba(0,0,0,0.10),_0_4px_2px_rgba(0,0,0,0.15)] hover:bg-green-700 hover:text-white transition-all duration-200 sm:flex hidden">
                    Masuk
                </button>
                
                {/* Mobile Menu Button */}
                <button 
                    onClick={toggleMenu}
                    className="bg-green-800 p-1.5 rounded-lg md:hidden flex transition-transform duration-300 hover:scale-105"
                >
                    {isMenuOpen ? (
                        <X
                            className="transition-transform duration-300"
                            size={30}
                            stroke="white"
                        />
                    ) : (
                        <Menu
                            className=" transition-transform duration-300 flex self-center"
                            size={30}
                            stroke="white"
                        />
                    )}
                </button>
            </div>
        </nav>

        {/* Mobile Menu Overlay - Fixed positioning and z-index */}
        {isMenuOpen && (
            <div 
                className="fixed inset-0 bg-black opacity-50 z-[60] md:hidden"
                onClick={toggleMenu}
            />
        )}

        {/* Mobile Navigation Menu */}
        <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[70] md:hidden transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="font-extrabold text-xl text-green-800 font-family-inter">
                        HARITA
                    </div>
                    <button 
                        onClick={toggleMenu}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                        <X size={24} className="text-gray-600" />
                    </button>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 py-8">
                    <ul className="space-y-2">
                        <li>
                            <a 
                                href="#" 
                                className="block px-6 py-4 text-lg font-family-nunito text-gray-800 hover:bg-green-50 hover:text-green-800 hover:border-r-4 hover:border-green-600 transition-all duration-200"
                                onClick={toggleMenu}
                            >
                                Beranda
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#" 
                                className="block px-6 py-4 text-lg font-family-nunito text-gray-800 hover:bg-green-50 hover:text-green-800 hover:border-r-4 hover:border-green-600 transition-all duration-200"
                                onClick={toggleMenu}
                            >
                                Tentang
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#" 
                                className="block px-6 py-4 text-lg font-family-nunito text-gray-800 hover:bg-green-50 hover:text-green-800 hover:border-r-4 hover:border-green-600 transition-all duration-200"
                                onClick={toggleMenu}
                            >
                                Layanan
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#" 
                                className="block px-6 py-4 text-lg font-family-nunito text-gray-800 hover:bg-green-50 hover:text-green-800 hover:border-r-4 hover:border-green-600 transition-all duration-200"
                                onClick={toggleMenu}
                            >
                                Kontak
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Bottom Action */}
                <Link href="/auth/login">
                <div className="p-6 border-t border-gray-200">
                    <button 
                        className="w-full bg-green-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-lg sm:hidden flex justify-center items-center"
                        onClick={toggleMenu}
                    >
                        Masuk
                    </button>
                </div>
                </Link>
            </div>
        </div>
        </>
    )
}

export default Navbar