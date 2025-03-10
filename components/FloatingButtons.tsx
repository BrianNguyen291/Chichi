import { FaPhone } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import { BsFacebook } from 'react-icons/bs';

export function FloatingButtons() {
  return (
    <div className="fixed left-4 bottom-4 flex flex-col gap-2 z-50">
      {/* Zalo */}
      <a
        href="https://zalo.me/0931715889"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#0068FF] hover:bg-[#0055CC] text-white px-4 py-2 rounded-full transition-colors"
      >
        <SiZalo size={20} />
        <span>Chat Zalo</span>
      </a>

      {/* Facebook */}
      <a
        href="https://m.me/thanhmaihsk"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#0099FF] hover:bg-[#0077CC] text-white px-4 py-2 rounded-full transition-colors"
      >
        <BsFacebook size={20} />
        <span>Chat Facebook</span>
      </a>

      {/* Hotline */}
      <a
        href="tel:0931715889"
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-colors"
      >
        <FaPhone size={20} />
        <span>Hotline: 0931715889</span>
      </a>
    </div>
  );
} 