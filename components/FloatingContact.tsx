import { FaPhone, FaFacebookMessenger, FaLine } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';

export function FloatingContact() {
  return (
    <div className="fixed bottom-6 left-6 flex flex-col gap-3 z-50">
      {/* Zalo */}
      <a
        href="https://zalo.me/0931715889"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-zalo text-white p-3 rounded-full hover:bg-zalo-dark transition-colors"
        aria-label="Contact via Zalo"
      >
        <SiZalo size={24} />
      </a>

      {/* LINE */}
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-line text-white p-3 rounded-full hover:bg-line-dark transition-colors"
        aria-label="Contact via LINE"
      >
        <FaLine size={24} />
      </a>

      {/* Facebook Messenger */}
      <a
        href="https://m.me/thanhmaihsk"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-messenger text-white p-3 rounded-full hover:bg-messenger-dark transition-colors"
        aria-label="Contact via Messenger"
      >
        <FaFacebookMessenger size={24} />
      </a>

      {/* Hotline */}
      <a
        href="tel:0931715889"
        className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors flex items-center gap-2"
        aria-label="Call our hotline"
      >
        <FaPhone size={24} />
        <span className="font-medium">0931715889</span>
      </a>
    </div>
  );
} 