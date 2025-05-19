
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  quote: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Meera Patel',
    location: 'Toronto, ON',
    quote: 'Finding spices that perfectly align with my Jain diet has always been a challenge. Swaminarayan Spice Hub has been a blessing with their pure, no onion, no garlic blends that maintain incredible flavor.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Rajesh Shah',
    location: 'Vancouver, BC',
    quote: 'As a devotee following a sattvic lifestyle, I\'ve been searching for authentic spices. The premium quality of their products and the attention to purity principles makes all the difference in my cooking.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Anita Desai',
    location: 'Calgary, AB',
    quote: 'The Ayurvedic spice blends have transformed my cooking. Everything from their packaging to the freshness of the products shows their commitment to quality. My family can taste the difference!',
    rating: 4,
  },
  {
    id: 4,
    name: 'Prakash Mehta',
    location: 'Ottawa, ON',
    quote: 'I appreciate how transparent Swaminarayan Spice Hub is about their ingredients and sourcing. The masalas are so flavorful that you don\'t miss the onion and garlic at all. Exceptional service too.',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slidesToShow = Math.min(3, testimonials.length);
  const maxIndex = testimonials.length - slidesToShow;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-brand-brown mb-3">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl">
              Discover how our authentic spices have transformed cooking experiences across Canada.
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button 
              onClick={prevSlide} 
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={nextSlide} 
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * (100 / slidesToShow)}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="px-4 min-w-full md:min-w-[50%] lg:min-w-[33.333%]"
              >
                <div className="bg-gray-50 p-6 rounded-lg h-full border border-gray-100">
                  {/* Rating */}
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-gray-700 mb-4 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  {/* Author */}
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-brand-saffron/20 flex items-center justify-center text-brand-saffron font-bold">
                      {testimonial.image ? (
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        testimonial.name.charAt(0)
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
