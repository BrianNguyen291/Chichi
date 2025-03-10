'use client'

import { FaPhone } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import { BsFacebook } from 'react-icons/bs';
import { useEffect, useState } from 'react';

export function FloatingButtons() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={`fixed ${isMobile ? 'bottom-[70px] left-1/2 -translate-x-1/2' : 'left-4 top-1/2 -translate-y-1/2'} flex ${isMobile ? 'flex-row' : 'flex-col'} gap-2 z-40`}>
      {/* Zalo */}
      <a
        href="https://zalo.me/0931715889"
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-2 bg-[#0068FF] hover:bg-[#0055CC] text-white px-3 py-2 rounded-full transition-colors shadow-md ${isMobile ? 'w-auto' : 'w-auto'}`}
      >
        <SiZalo size={18} />
        <span className={`text-xs ${isMobile ? 'hidden' : 'inline-block'}`}>Chat Zalo</span>
      </a>

      {/* Facebook */}
      <a
        href="https://m.me/thanhmaihsk"
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-2 bg-[#0099FF] hover:bg-[#0077CC] text-white px-3 py-2 rounded-full transition-colors shadow-md ${isMobile ? 'w-auto' : 'w-auto'}`}
      >
        <BsFacebook size={18} />
        <span className={`text-xs ${isMobile ? 'hidden' : 'inline-block'}`}>Chat Facebook</span>
      </a>

      {/* Hotline */}
      <a
        href="tel:0931715889"
        className={`flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-full transition-colors shadow-md ${isMobile ? 'w-auto' : 'w-auto'}`}
      >
        <FaPhone size={18} />
        <span className={`text-xs ${isMobile ? 'hidden' : 'inline-block'}`}>Hotline: 0931715889</span>
      </a>
    </div>
  );
} 