import React from 'react';
import { motion } from 'framer-motion';

export function Logo() {
  return (
    <motion.div
      className="relative w-8 h-8"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-0 bg-white rounded-lg">
        <svg
          viewBox="0 0 1000 1000"
          className="w-full h-full p-1.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M500 200C650 200 750 300 750 450C750 600 650 700 500 700C350 700 250 600 250 450C250 300 350 200 500 200Z"
            fill="#0047AB"
          />
          <path
            d="M500 300C575 300 625 350 625 425C625 500 575 550 500 550C425 550 375 500 375 425C375 350 425 300 500 300Z"
            fill="#DF4630"
          />
        </svg>
      </div>
    </motion.div>
  );
}