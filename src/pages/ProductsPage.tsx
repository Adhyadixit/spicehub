
import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import ProductGrid from '../components/products/ProductGrid';
import { products, categories } from '../data/products';
import { ChevronDown, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProductsPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [sortBy, setSortBy] = useState('featured');

  // Extract all unique tags from products
  const allTags = Array.from(
    new Set(products.flatMap(product => product.tags || []))
  ).sort();

  // Filter products based on selected criteria
  const filteredProducts = products.filter(product => {
    // Category filter
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }
    
    // Tags filter
    if (selectedTags.length > 0 && 
        !selectedTags.some(tag => product.tags?.includes(tag))) {
      return false;
    }
    
    // Price range filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default: // featured
        return 0; // keep original order
    }
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTags([]);
    setPriceRange([0, 50]);
    setSortBy('featured');
  };

  const toggleFilterMobile = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <MainLayout>
      {/* Page header */}
      <div className="bg-gray-50 py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-bold text-brand-brown">Our Products</h1>
          <p className="text-gray-600 mt-2">
            Premium quality spices with no onion, no garlic - perfect for Jain and Swaminarayan devotees
          </p>
        </div>
      </div>
      
      <div className="container-custom py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
          {/* Mobile filter toggle */}
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <button
              onClick={toggleFilterMobile}
              className="flex items-center space-x-2 text-gray-700 font-medium"
            >
              <Filter className="h-5 w-5" />
              <span>Filter Products</span>
            </button>
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-2 px-4 border border-gray-300 rounded-md text-sm focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Filter sidebar - Mobile version */}
          <div
            className={cn(
              "fixed inset-0 z-40 lg:hidden bg-white transition-transform duration-300 overflow-y-auto",
              filterOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="p-4">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button onClick={toggleFilterMobile}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* Mobile filters content - duplicates desktop filters */}
              <div className="py-4">
                <h4 className="font-medium mb-2">Categories</h4>
                <div className="space-y-1">
                  <button 
                    className={cn(
                      "block w-full text-left py-1 px-2 rounded",
                      selectedCategory === null ? "bg-brand-saffron text-white" : "hover:bg-gray-100"
                    )}
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Products
                  </button>
                  {categories.map(category => (
                    <button 
                      key={category.id}
                      className={cn(
                        "block w-full text-left py-1 px-2 rounded",
                        selectedCategory === category.id ? "bg-brand-saffron text-white" : "hover:bg-gray-100"
                      )}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="py-4 border-t">
                <h4 className="font-medium mb-2">Dietary Preferences</h4>
                <div className="space-y-1">
                  {allTags.map(tag => (
                    <label key={tag} className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="rounded text-brand-saffron focus:ring-brand-saffron mr-2"
                        checked={selectedTags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                      />
                      {tag}
                    </label>
                  ))}
                </div>
              </div>

              <div className="py-4 border-t">
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="px-2">
                  <input 
                    type="range" 
                    min="0" 
                    max="50" 
                    step="5"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-brand-saffron"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <button onClick={clearFilters} className="text-brand-saffron font-medium">
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Filter sidebar - Desktop */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-lg mb-4">Filters</h3>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Categories</h4>
                <div className="space-y-1">
                  <button 
                    className={cn(
                      "block w-full text-left py-1 px-2 rounded",
                      selectedCategory === null ? "bg-brand-saffron text-white" : "hover:bg-gray-100"
                    )}
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Products
                  </button>
                  {categories.map(category => (
                    <button 
                      key={category.id}
                      className={cn(
                        "block w-full text-left py-1 px-2 rounded",
                        selectedCategory === category.id ? "bg-brand-saffron text-white" : "hover:bg-gray-100"
                      )}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Dietary Preferences</h4>
                <div className="space-y-1">
                  {allTags.map(tag => (
                    <label key={tag} className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="rounded text-brand-saffron focus:ring-brand-saffron mr-2"
                        checked={selectedTags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                      />
                      {tag}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="px-2">
                  <input 
                    type="range" 
                    min="0" 
                    max="50" 
                    step="5"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-brand-saffron"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <button onClick={clearFilters} className="text-brand-saffron font-medium">
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Product grid */}
          <div className="lg:col-span-9">
            <div className="hidden lg:flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {sortedProducts.length} products
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="py-2 px-4 border border-gray-300 rounded-md text-sm focus:outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
            
            {selectedTags.length > 0 || selectedCategory ? (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm text-gray-600">Active filters:</span>
                {selectedCategory && (
                  <span className="inline-flex items-center py-1 px-2 rounded-full bg-gray-100 text-sm">
                    {categories.find(c => c.id === selectedCategory)?.name}
                    <button 
                      onClick={() => setSelectedCategory(null)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedTags.map(tag => (
                  <span key={tag} className="inline-flex items-center py-1 px-2 rounded-full bg-gray-100 text-sm">
                    {tag}
                    <button 
                      onClick={() => toggleTag(tag)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                <button 
                  onClick={clearFilters}
                  className="text-sm text-brand-saffron hover:underline"
                >
                  Clear all
                </button>
              </div>
            ) : null}

            {sortedProducts.length > 0 ? (
              <ProductGrid products={sortedProducts} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No products match your filters.</p>
                <button 
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
