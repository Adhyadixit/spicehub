
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isSale?: boolean;
  tags?: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviewCount,
  isNew = false,
  isSale = false,
  tags = []
}) => {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
      {/* Product badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {isNew && (
          <span className="bg-emerald-500 text-white text-xs font-semibold py-1 px-2 rounded">
            NEW
          </span>
        )}
        {isSale && originalPrice && (
          <span className="bg-red-500 text-white text-xs font-semibold py-1 px-2 rounded">
            SAVE {discount}%
          </span>
        )}
      </div>

      {/* Wishlist button */}
      <button 
        className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label="Add to wishlist"
      >
        <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
      </button>

      {/* Product image */}
      <Link to={`/product/${id}`} className="block aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy" 
        />
      </Link>

      {/* Quick add to cart (visible on hover) */}
      <div className="absolute bottom-0 left-0 right-0 bg-white p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center">
        <button className="flex items-center justify-center space-x-2 bg-brand-saffron hover:bg-brand-brown text-white py-1.5 px-3 rounded-md w-full transition-colors">
          <ShoppingCart className="h-4 w-4" />
          <span className="text-sm font-medium">Add to Cart</span>
        </button>
      </div>

      {/* Product info */}
      <div className="p-4">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {tags.map((tag) => (
              <span 
                key={tag} 
                className="text-xs bg-brand-turmeric text-brand-brown px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Name */}
        <Link to={`/product/${id}`}>
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 hover:text-brand-saffron transition-colors">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center mr-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                className={cn(
                  "h-3.5 w-3.5", 
                  i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center">
          <span className="text-lg font-semibold text-gray-900">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="ml-2 text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
