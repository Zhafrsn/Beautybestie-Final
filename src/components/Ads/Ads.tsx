import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import '../../styles/Ads.css';

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 900, 
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, 
    afterChange: (current: number) => setCurrentSlide(current),
    arrows: false,

  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className='ads'>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img className='imageAds' src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
