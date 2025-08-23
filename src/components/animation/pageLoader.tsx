"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf } from "lucide-react";

export default function PageLoader({ children }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const animationDuration = 4500; // 2.5 detik

    // cegah scroll selama animasi
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "auto"; // scroll aktif setelah selesai
    }, animationDuration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-green-800 z-[9999]"
            initial={{ borderRadius: "0%", y: 0 }}
            animate={{ borderRadius: "50%", y: "-100%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: .8, ease: "easeOut", delay: 2 }}
          >
            <motion.div
              className="flex items-center space-x-3 text-white text-6xl font-inter font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Leaf size={60} />
              </motion.div>

              {/* Text */}
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              >
                 Harita
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Konten halaman utama */}
      <div className="relative z-0">{children}</div>
    </div>
  );
}
