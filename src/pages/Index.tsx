
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import HeroBanner from '../components/home/HeroBanner';
import FeaturesSection from '../components/home/FeaturesSection';
import CategoryShowcase from '../components/home/CategoryShowcase';
import ProductGrid from '../components/products/ProductGrid';
import TestimonialsSection from '../components/home/TestimonialsSection';
import NewsletterSection from '../components/home/NewsletterSection';
import { products } from '../data/products';

// Get featured and new products
const featuredProducts = products.filter(p => p.isNew || p.tags?.includes('Premium')).slice(0, 4);
const saleProducts = products.filter(p => p.isSale).slice(0, 4);

const Index = () => {
  return (
    <MainLayout>
      <HeroBanner />
      <FeaturesSection />
      <CategoryShowcase />
      
      <section className="py-16 bg-white">
        <div className="container-custom">
          <ProductGrid products={featuredProducts} title="Featured Products" />
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <ProductGrid products={saleProducts} title="Special Offers" />
        </div>
      </section>

      <TestimonialsSection />
      <NewsletterSection />
    </MainLayout>
  );
};

export default Index;
