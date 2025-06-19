import '../css/PhotoGallery.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const photos = [
  { src: '/images/test1.jpg', alt: '데이트 사진1' },
  { src: '/images/test2.jpg', alt: '데이트 사진2' },
  { src: '/images/test3.jpg', alt: '여행 사진' },
  // 필요한 만큼 추가
];

const PhotoGallery = () => (
  <section className="gallery">
    <h2>우리의 추억</h2>
    <Swiper
      spaceBetween={16}
      slidesPerView={1}
      loop={true}
      style={{ maxWidth: 320, margin: '0 auto', borderRadius: 8 }}
    >
      {photos.map((photo, idx) => (
        <SwiperSlide key={idx}>
          <img src={photo.src} alt={photo.alt} className="gallery-photo" style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 8 }} />
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);

export default PhotoGallery;

