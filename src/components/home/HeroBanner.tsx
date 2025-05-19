
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  alignment: 'left' | 'center' | 'right';
}

const slides: HeroSlide[] = [
  {
    id: 1,
    title: "Pure, Authentic Spices",
    subtitle: "Inspired by traditional Swaminarayan and Jain values",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    buttonText: "Shop Now",
    buttonLink: "/products",
    alignment: 'left',
  },
  {
    id: 2,
    title: "No Onion, No Garlic",
    subtitle: "Perfect for devotees following a sattvic lifestyle",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    buttonText: "Explore Collection",
    buttonLink: "/collections/sattvic",
    alignment: 'right',
  },
  {
    id: 3,
    title: "Premium Ayurvedic Spices",
    subtitle: "Hand-picked for health and wellness",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    buttonText: "Discover Benefits",
    buttonLink: "/category/ayurvedic",
    alignment: 'center',
  },
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentSlide]);

  return (
    <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center",
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          {/* Background image with overlay */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Content */}
          <div className="container-custom relative z-20">
            <div 
              className={cn(
                "max-w-xl text-white p-4 md:p-6", 
                slide.alignment === 'center' && "text-center mx-auto",
                slide.alignment === 'right' && "ml-auto text-right"
              )}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl mb-8">
                {slide.subtitle}
              </p>
              <Link
                to={slide.buttonLink}
                className="btn-primary inline-block"
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-12 rounded-full transition-all",
              index === currentSlide ? "bg-white" : "bg-white/40"
            )}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 backdrop-blur-sm transition-colors"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>

      <button
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 backdrop-blur-sm transition-colors"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

export default HeroBanner;
