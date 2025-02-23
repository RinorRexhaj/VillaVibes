import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface CarouselProps {
  name: string;
}

const Carousel: React.FC<CarouselProps> = ({ name }) => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState<number>(0);
  const images = ["/assets/img/villa.jpg", "/assets/img/villa2.jpg"];

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const autoSlideRef = useRef<number | null>(null);

  useEffect(() => {
    autoSlideRef.current = setInterval(() => {
      nextImage();
    }, 5000);

    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
    resetAutoSlide();
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    resetAutoSlide();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const difference = e.clientX - startX;
    if (difference > 50) {
      prevImage();
      setIsDragging(false);
    } else if (difference < -50) {
      nextImage();
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    if (touchStartX.current - touchEndX.current > swipeThreshold) {
      nextImage();
    } else if (touchEndX.current - touchStartX.current > swipeThreshold) {
      prevImage();
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaX) > 30) {
      if (e.deltaX > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
  };

  const resetAutoSlide = () => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    autoSlideRef.current = setInterval(() => {
      nextImage();
    }, 5000);
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* Image Slider */}
      <div
        className="w-full h-full flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentImage * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={name}
            className="w-full h-full object-cover flex-shrink-0 transition-opacity duration-500 ease-in-out"
            style={{
              opacity: index === currentImage ? 1 : 0.3,
            }}
          />
        ))}
      </div>

      {/* Left & Right Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute hidden tb:block top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white text-sm hover:bg-opacity-80 transition-all"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute hidden tb:block top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white text-sm hover:bg-opacity-80 transition-all"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </>
      )}

      {/* Image Indicator Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentImage ? "bg-white scale-110" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
