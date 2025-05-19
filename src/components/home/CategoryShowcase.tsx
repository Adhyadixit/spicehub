
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Category {
  name: string;
  description: string;
  image: string;
  link: string;
  size?: 'small' | 'medium' | 'large';
}

const categories: Category[] = [
  {
    name: 'Masala Blends',
    description: 'Traditional spice mixes for authentic Indian cooking',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    link: '/category/masalas',
    size: 'large',
  },
  {
    name: 'Daily Use Spices',
    description: 'Essential spices for everyday cooking',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
    link: '/category/daily-use',
    size: 'small',
  },
  {
    name: 'Premium Spices',
    description: 'Rare and exotic spices for special occasions',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
    link: '/category/premium',
    size: 'medium',
  },
  {
    name: 'Ayurvedic Blends',
    description: 'Traditional healing spices for health and wellness',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
    link: '/category/ayurvedic',
    size: 'medium',
  },
];

const CategoryShowcase = () => {
  return (
    <section className="py-12">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center mb-10 text-brand-brown">
          Explore Our Collections
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.link}
              className={cn(
                "group relative overflow-hidden rounded-lg",
                {
                  'col-span-1 row-span-1': category.size === 'small',
                  'col-span-1 md:col-span-2': category.size === 'large',
                  'lg:col-span-1 lg:row-span-1': true,
                  'lg:row-start-1 lg:col-start-3': index === 3,
                }
              )}
            >
              <div className="aspect-[4/3] w-full">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm opacity-90 mb-3">{category.description}</p>
                  <span className="inline-block text-brand-saffron font-medium group-hover:underline">
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
