"use client";

import React, { useState, useEffect } from 'react';
import Dropdown from 'components/dropdown';
import { FiAlignJustify } from 'react-icons/fi';
import NavLink from 'components/link/NavLink';
import { BsArrowBarUp } from 'react-icons/bs';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { createClient } from "@supabase/supabase-js";
import Image from 'next/image';

// Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Navbar = (props: {
  onOpenSidenav: () => void;
  brandText: string;
  secondary?: boolean | string;
  [x: string]: any;
}) => {
  const { onOpenSidenav, brandText } = props;
  const [darkmode, setDarkmode] = useState(
    document.body.classList.contains('dark'),
  );

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifying, setNotifying] = useState(true);

  useEffect(() => {
    const fetchAllNotifications = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching notifications:", error);
        setError(error);
        setNotifications([]);
      } else {
        setNotifications(data);
        const unreadExists = data.some(notification => !notification.is_read);
        setNotifying(unreadExists);
      }
      setLoading(false);
    };

    fetchAllNotifications();
  }, []);

  const handleNotificationClick = async () => {
    setNotifying(false);
    try {
      await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("is_read", false); 
    } catch (err) {
      console.error("Error updating notifications status:", err);
    }
  };

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a
            className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href=" "
          >
            Pages
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              {' '}
              /{' '}
            </span>
          </a>
          <NavLink
            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href="#"
          >
            {brandText}
          </NavLink>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <NavLink
            href="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </NavLink>
        </p>
      </div>

      <div className="relative mt-[3px] flex h-[61px] w-[205px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[205px] md:flex-grow-0 md:gap-1 xl:w-[150px] xl:gap-2">
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>
        {/* start Notification */}
        <Dropdown
          button={
            <div className="relative cursor-pointer" onClick={handleNotificationClick}>
              <IoMdNotificationsOutline className="h-5 w-5   text-gray-600 dark:text-white" />
              <span
                className={`absolute top-0 right-0 h-2 w-2 rounded-full bg-green-900 ${
                  !notifying ? "hidden" : "flex"
                }`}
              >
                <span className="absolute inline-flex w-full h-full bg-green-300 rounded-full opacity-75 animate-ping"></span>
              </span>
            </div>
          }
          animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
          classNames={'py-2 top-4 -left-[230px] md:-left-[440px] w-max'}
        >
          <div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none sm:w-[460px]">
            <div className="flex items-center justify-between">
              <p className="text-base font-bold text-navy-700 dark:text-white">
                Notification
              </p>
            </div>
            {/* Tampilkan notifikasi dinamis di sini */}
            {loading && (
              <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
            )}
            {error && (
              <p className="text-center text-red-500">Error: {error.message}</p>
            )}
            {!loading && notifications.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400">
                Tidak ada notifikasi.
              </p>
            )}
            {!loading && notifications.map((notification) => (
              <button key={notification.id} className="flex w-full items-center">
                <div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-green-800 to-green-900 py-4 text-2xl text-white">
                  <BsArrowBarUp />
                </div>
                <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                  <p className="mb-1 text-left text-base font-bold text-gray-900 dark:text-white">
                    {notification.title}
                  </p>
                  <p className="font-base text-left text-xs text-gray-900 dark:text-white">
                    {notification.message}
                  </p>
                  <p className="font-base text-left text-xs text-gray-500 dark:text-gray-300">
                    {new Date(notification.created_at).toLocaleString()}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </Dropdown>
        
        {/* Profile & Dropdown */}
        <Dropdown
          button={
            <Image
              width="20"
              height="20"
              className="h-10 w-10 rounded-full"
              src='https://i.pinimg.com/564x/f1/b9/13/f1b9133c65ec275f4657dc916abad249.jpg'
              alt="Admin"
            />
          }
          classNames={'py-2 top-8 -left-[180px] w-max'}
        >
          {/* ... */}
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;