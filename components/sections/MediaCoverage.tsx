import Image from 'next/image';

export function MediaCoverage() {
  const mediaPartners = [
    { src: '/media/24h.png', alt: '24h News' },
    { src: '/media/vtv14.png', alt: 'VTV14' },
    { src: '/media/giaoduc.png', alt: 'Giáo dục & Thời đại' },
    { src: '/media/dantri.png', alt: 'Dân trí' },
    { src: '/media/vnexpress.png', alt: 'VnExpress' },
    { src: '/media/vietnamnet.png', alt: 'Vietnamnet' },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-red-700">
          TRUYỀN THÔNG NÓI GÌ VỀ CHÚNG TÔI
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {mediaPartners.map((partner, index) => (
            <div key={index} className="flex justify-center">
              <Image
                src={partner.src}
                alt={partner.alt}
                width={150}
                height={60}
                className="object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 