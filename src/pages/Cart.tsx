import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { getCart, updateCartItemQuantity, removeFromCart, getCartTotal } from '@/utils/cartUtils';
import { CartItem } from '@/utils/cartUtils';

const Cart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const navigate = useNavigate();
  
  // Load cart items when component mounts and when cart is updated
  useEffect(() => {
    const loadCart = () => {
      const cartItems = getCart();
      setItems(cartItems);
      setSubtotal(getCartTotal());
      // Calculate total item count
      setItemCount(cartItems.reduce((count, item) => count + item.quantity, 0));
    };
    
    loadCart();
    
    // Listen for cart updates
    window.addEventListener('cart-updated', loadCart);
    
    return () => {
      window.removeEventListener('cart-updated', loadCart);
    };
  }, []);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateCartItemQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="text-center py-16 border rounded-lg bg-gray-50">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/products">
            <Button className="bg-brand-saffron hover:bg-brand-brown">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b text-sm font-medium text-gray-500">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b items-center">
                <div className="col-span-6 flex items-center space-x-4">
                  <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={item.image || 'https://via.placeholder.com/80x80?text=Product'} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/80x80?text=Product';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.weight}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-sm flex items-center mt-2 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
                
                <div className="col-span-2 text-center">
                  <p className="md:hidden text-sm text-gray-500">Price:</p>
                  <p>{formatCurrency(item.price)}</p>
                </div>
                
                <div className="col-span-2 flex justify-center">
                  <div className="flex items-center border rounded-md">
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                      className="w-12 text-center border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="col-span-2 text-right font-medium">
                  <p className="md:hidden text-sm text-gray-500">Total:</p>
                  <p>{formatCurrency(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-between">
            <Link to="/products">
              <Button variant="outline" className="flex items-center space-x-2">
                <span>Continue Shopping</span>
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-600">Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-600">Calculated at checkout</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-medium">
                  <span>Estimated Total</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleCheckout}
              className="w-full bg-brand-saffron hover:bg-brand-brown flex items-center justify-center space-x-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <div className="mt-4 text-sm text-gray-500 text-center">
              <p>Secure checkout powered by Stripe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
