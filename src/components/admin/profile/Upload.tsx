import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Card from "components/card";
import { MdLock } from "react-icons/md";

const CompleteProfile = () => {
  // State to manage the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle the modal's visibility
  const toggleModal = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsModalOpen(!isModalOpen);
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  // Modal Component
  const Modal = () => (
    <div 
      className="fixed inset-0 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
      style={{ 
        zIndex: 999999,
        isolation: 'isolate',
        contain: 'layout style paint'
      }}
      onClick={handleBackdropClick}
      onMouseDown={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative w-full max-w-md max-h-full"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
        }}
        style={{ 
          isolation: 'isolate',
          contain: 'layout style paint'
        }}
      >
        <div className="rounded-lg bg-white shadow-sm dark:bg-gray-700 mx-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5 dark:border-gray-600">
            <h3 
              id="modal-title"
              className="text-lg font-semibold text-gray-900 dark:text-white"
            >
              Riwayat Login
            </h3>
            {/* Close button with onClick handler */}
        
          </div>

          {/* Modal Body */}
          <div className="p-4 md:p-5">
            <ol className="relative ms-3.5 mb-4 border-s border-gray-200 dark:border-gray-600 md:mb-5">
              <li className="mb-10 ms-8">
                <span className="absolute -start-3.5 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-600 dark:ring-gray-700">
                  <MdLock className="h-2.5 w-2.5 text-gray-500 dark:text-gray-400" />
                </span>
                <h3 className="mb-1 flex items-start text-lg font-semibold text-gray-900 dark:text-white">
                  Login Berhasil
                </h3>
                <time className="mb-3 block text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                  21 Oktober 2024, 10:30 WIB
                </time>
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Akses dari perangkat baru: Google Chrome pada Windows 10.
                </p>
              </li>
              <li className="mb-10 ms-8">
                <span className="absolute -start-3.5 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-600 dark:ring-gray-700">
                  <MdLock className="h-2.5 w-2.5 text-gray-500 dark:text-gray-400" />
                </span>
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  Login Berhasil
                </h3>
                <time className="mb-3 block text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                  20 Oktober 2024, 14:00 WIB
                </time>
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Akses dari perangkat terdaftar: Mozilla Firefox pada MacBook Pro.
                </p>
              </li>
            </ol>
            {/* Close button inside the modal body */}
            <button
              onClick={toggleModal}
              className="inline-flex w-full justify-center rounded-lg bg-[#294B29] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#86A789] focus:outline-none focus:ring-4 focus:ring-[#294B29] dark:bg-[#86A789] dark:hover:bg-[#294B29] dark:focus:ring-[#86A789]"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
        {/* Left Column: Security Icon */}
        <div className="col-span-5 h-full w-full rounded-xl 2xl:col-span-6">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-xl py-3 lg:pb-0">
            <MdLock className="text-[80px] text-black opacity-15 dark:text-white" />
            <h4 className="text-xl font-bold leading-9 text-navy-700 dark:text-white">
              Keamanan Akun
            </h4>
            <p className="mt-2 text-sm font-medium text-gray-600">
              Pantau aktivitas mencurigakan
            </p>
          </div>
        </div>

        {/* Right Column: Security Monitoring Guide */}
        <div className="col-span-5 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800">
          <h4 className="text-left text-xl font-bold leading-9 text-navy-700 dark:text-white">
            Aktivitas Login
          </h4>
          <p className="leading-1 mt-2 text-base font-normal text-gray-600">
            Tinjau riwayat login terakhir untuk mendeteksi akses yang tidak sah. Pemberitahuan akan dikirimkan jika ada login dari perangkat atau lokasi baru.
          </p>

          <button
            onClick={toggleModal}
            className="linear mt-4 flex items-center justify-center rounded-xl bg-[#294B29] px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-[#86A789] active:bg-[#294B29]"
          >
            Lihat Riwayat Login
          </button>
        </div>
      </Card>


      {isModalOpen && createPortal(<Modal />, document.body)}
    </>
  );
};

export default CompleteProfile;