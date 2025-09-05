import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { MdLock } from "react-icons/md";

const CompleteProfile = () => {
  // State to manage the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle the modal's visibility
  const toggleModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        style={{
          isolation: 'isolate',
          contain: 'layout style paint'
        }}
      >
        <div className="rounded-lg bg-white shadow-lg dark:bg-gray-700 mx-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5 dark:border-gray-600">
            <h3
              id="modal-title"
              className="text-lg font-semibold text-gray-900 dark:text-white"
            >
              Riwayat Login
            </h3>
            {/* Close button with onClick handler */}
            <button
              type="button"
              className="end-2.5 rounded-lg bg-transparent p-1.5 text-sm text-gray-400 ms-auto inline-flex h-8 w-8 items-center hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white transition-colors"
              onClick={toggleModal}
            >
              <svg className="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
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
              className="inline-flex w-full justify-center rounded-lg bg-[#294B29] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#86A789] focus:outline-none focus:ring-4 focus:ring-[#294B29] dark:bg-[#86A789] dark:hover:bg-[#294B29] dark:focus:ring-[#86A789] transition-colors"
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
      <div className="flex flex-col w-full max-w-2xl h-auto rounded-[20px] bg-white bg-clip-border p-6 font-dm shadow-lg shadow-shadow-500 dark:bg-navy-800 dark:shadow-none">
        {/* Top Section: Security Icon */}
        <div className="flex flex-col items-center justify-center py-8 mb-6">
          <MdLock className="text-[80px] text-black opacity-15 dark:text-white mb-4" />
          <h4 className="text-2xl font-bold text-center text-navy-700 dark:text-white mb-2">
            Keamanan Akun
          </h4>
          <p className="text-sm font-medium text-gray-600 text-center">
            Pantau aktivitas mencurigakan
          </p>
        </div>

        {/* Bottom Section: Security Monitoring Guide */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            Aktivitas Login
          </h4>
          <p className="text-base font-normal text-gray-600 leading-relaxed">
            Tinjau riwayat login terakhir untuk mendeteksi akses yang tidak sah. Pemberitahuan akan dikirimkan jika ada login dari perangkat atau lokasi baru.
          </p>

          <button
            onClick={toggleModal}
            className="inline-flex items-center justify-center rounded-xl bg-[#294B29] px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-[#86A789] active:bg-[#294B29] focus:outline-none focus:ring-4 focus:ring-[#294B29] focus:ring-opacity-30"
          >
            Lihat Riwayat Login
          </button>
        </div>
      </div>

      {isModalOpen && createPortal(<Modal />, document.body)}
    </>
  );
};

export default CompleteProfile;