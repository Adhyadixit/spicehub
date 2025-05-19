
import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { products } from '../data/products';
import { Star, Heart, Share, ChevronRight, MinusIcon, PlusIcon, ShoppingCart, Check } from 'lucide-react';
import ProductGrid from '../components/products/ProductGrid';
import { cn } from '@/lib/utils';

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToCart, setAddedToCart] = useState(false);

  // Find the current product
  const product = products.find(p => p.id === id);

  // Find related products (same category)
  const relatedProducts = product 
    ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  // If product not found, redirect to products page
  if (!product) {
    return <Navigate to="/products" />;
  }

  const handleAddToCart = () => {
    // In a real application, this would add the product to the cart
    console.log(`Adding ${quantity} of ${product.name} to cart`);
    
    // Show added to cart confirmation
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  return (
    <MainLayout>
      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-3">
        <div className="container-custom">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-brand-saffron">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link to="/products" className="hover:text-brand-saffron">Products</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link 
              to={`/category/${product.category}`} 
              className="hover:text-brand-saffron"
            >
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-gray-700 truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product images */}
          <div className="mb-8 lg:mb-0">
            <div className="bg-gray-50 rounded-lg overflow-hidden mb-4 aspect-square">
              <img 
                src={activeImage === 0 ? product.image : product.additionalImages?.[activeImage - 1] || product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>

            {product.additionalImages && product.additionalImages.length > 0 && (
              <div className="grid grid-cols-5 gap-2">
                <button 
                  onClick={() => setActiveImage(0)} 
                  className={cn(
                    "border-2 rounded overflow-hidden aspect-square",
                    activeImage === 0 ? "border-brand-saffron" : "border-transparent"
                  )}
                >
                  <img 
                    src={product.image} 
                    alt={`${product.name} thumbnail`} 
                    className="w-full h-full object-cover"
                  />
                </button>
                
                {product.additionalImages.map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveImage(i + 1)} 
                    className={cn(
                      "border-2 rounded overflow-hidden aspect-square",
                      activeImage === i + 1 ? "border-brand-saffron" : "border-transparent"
                    )}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} thumbnail ${i + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div>
            {/* Tags & badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {product.tags?.map(tag => (
                <span 
                  key={tag} 
                  className="bg-brand-turmeric text-brand-brown px-2 py-0.5 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
              {product.isNew && (
                <span className="bg-emerald-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                  New
                </span>
              )}
              {product.isSale && product.originalPrice && (
                <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
                </span>
              )}
            </div>

            {/* Product title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={cn(
                      "h-5 w-5", 
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            {/* Short description */}
            <p className="text-gray-600 mb-6">
              {product.shortDescription || product.description.split('.')[0] + '.'}
            </p>

            {/* Price */}
            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="ml-3 text-lg text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* SKU & Stock */}
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <span className="mr-4">SKU: {product.sku}</span>
              <span className={`flex items-center ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    In Stock ({product.stock} available)
                  </>
                ) : (
                  'Out of Stock'
                )}
              </span>
            </div>

            {/* Quantity & Add to Cart */}
            {product.stock > 0 && (
              <div className="mb-6">
                <p className="font-medium mb-2">Quantity</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button 
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      className="px-3 py-2 text-gray-500 hover:bg-gray-100"
                      disabled={quantity <= 1}
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <input 
                      type="text" 
                      value={quantity} 
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val > 0 && val <= product.stock) {
                          setQuantity(val);
                        }
                      }}
                      className="w-12 text-center border-x border-gray-300 py-2"
                    />
                    <button 
                      onClick={() => quantity < product.stock && setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-500 hover:bg-gray-100"
                      disabled={quantity >= product.stock}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button 
                onClick={handleAddToCart} 
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 rounded-md font-medium transition-colors",
                  addedToCart
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-brand-saffron hover:bg-brand-brown text-white"
                )}
                disabled={product.stock <= 0}
              >
                {addedToCart ? (
                  <>
                    <Check className="h-5 w-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </button>
              <button className="btn-outline flex items-center justify-center gap-2 py-3">
                <Heart className="h-5 w-5" />
                Add to Wishlist
              </button>
              <button className="hidden sm:flex btn-outline items-center justify-center gap-2 py-3">
                <Share className="h-5 w-5" />
                Share
              </button>
            </div>

            {/* Key features */}
            {product.benefits && (
              <div className="mb-8">
                <h3 className="font-medium mb-2">Key Benefits:</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  {product.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Tabs section */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveTab('description')}
                className={cn(
                  "py-4 px-6 font-medium whitespace-nowrap",
                  activeTab === 'description' 
                    ? "border-b-2 border-brand-saffron text-brand-saffron" 
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={cn(
                  "py-4 px-6 font-medium whitespace-nowrap",
                  activeTab === 'ingredients' 
                    ? "border-b-2 border-brand-saffron text-brand-saffron" 
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                Ingredients
              </button>
              <button
                onClick={() => setActiveTab('nutrition')}
                className={cn(
                  "py-4 px-6 font-medium whitespace-nowrap",
                  activeTab === 'nutrition' 
                    ? "border-b-2 border-brand-saffron text-brand-saffron" 
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                Nutritional Info
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={cn(
                  "py-4 px-6 font-medium whitespace-nowrap",
                  activeTab === 'reviews' 
                    ? "border-b-2 border-brand-saffron text-brand-saffron" 
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                Reviews ({product.reviewCount})
              </button>
            </div>
          </div>
          
          <div className="py-8">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
              </div>
            )}
            
            {activeTab === 'ingredients' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                {product.ingredients ? (
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">Ingredient information not available for this product.</p>
                )}
              </div>
            )}
            
            {activeTab === 'nutrition' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Nutritional Information</h3>
                {product.nutritionalInfo ? (
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <tbody className="divide-y divide-gray-200">
                        {Object.entries(product.nutritionalInfo).map(([key, value]) => (
                          <tr key={key}>
                            <td className="py-3 px-4 text-sm font-medium text-gray-900 bg-gray-50">{key}</td>
                            <td className="py-3 px-4 text-sm text-gray-700">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">Nutritional information not available for this product.</p>
                )}
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                <div className="flex items-center mb-6">
                  <div className="flex items-center mr-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={cn(
                          "h-6 w-6", 
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium">{product.rating} out of 5</span>
                </div>
                
                <p className="text-gray-500 mb-4">Based on {product.reviewCount} reviews</p>
                
                {/* This would be replaced with actual reviews in a real application */}
                <div className="space-y-6">
                  <div className="border-t pt-6">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">Excellent quality spices</h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`h-4 w-4 ${i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">2 weeks ago</span>
                    </div>
                    <p className="text-gray-600">
                      These spices are exceptional. The flavor is authentic and pure, and I appreciate that they're made without onion or garlic which is perfect for my family's dietary requirements. Will definitely purchase again.
                    </p>
                    <p className="text-sm font-medium mt-2">Rajesh P. - Verified Buyer</p>
                  </div>
                  
                  <div className="border-t pt-6">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">Exactly what I was looking for</h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">1 month ago</span>
                    </div>
                    <p className="text-gray-600">
                      As someone following a sattvic diet, finding spices that meet my requirements can be challenging. This product is perfect - fresh, fragrant, and completely aligned with my dietary principles.
                    </p>
                    <p className="text-sm font-medium mt-2">Meera D. - Verified Buyer</p>
                  </div>
                </div>
                
                <button className="mt-8 btn-outline">Write a Review</button>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <ProductGrid products={relatedProducts} title="You May Also Like" />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProductDetailsPage;
