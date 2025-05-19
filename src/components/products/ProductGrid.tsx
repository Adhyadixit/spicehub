
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-brand-brown">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            originalPrice={product.originalPrice}
            image={product.image}
            rating={product.rating}
            reviewCount={product.reviewCount}
            isNew={product.isNew}
            isSale={product.isSale}
            tags={product.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
