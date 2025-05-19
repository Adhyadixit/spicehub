// Cart item interface
export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  weight?: string;
}

// Get cart from localStorage
export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const cart = localStorage.getItem('spicehub-cart');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Failed to parse cart from localStorage:', error);
    return [];
  }
};

// Save cart to localStorage
export const saveCart = (cart: CartItem[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('spicehub-cart', JSON.stringify(cart));
};

// Add item to cart
export const addToCart = (item: CartItem): void => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(i => i.id === item.id);
  
  if (existingItemIndex > -1) {
    // Update quantity if item exists
    cart[existingItemIndex].quantity += item.quantity;
  } else {
    // Add new item
    cart.push(item);
  }
  
  saveCart(cart);
  // Dispatch a custom event to notify components about cart changes
  window.dispatchEvent(new CustomEvent('cart-updated'));
};

// Remove item from cart
export const removeFromCart = (id: string): void => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== id);
  saveCart(updatedCart);
  window.dispatchEvent(new CustomEvent('cart-updated'));
};

// Update item quantity
export const updateCartItemQuantity = (id: string, quantity: number): void => {
  const cart = getCart();
  
  if (quantity <= 0) {
    removeFromCart(id);
    return;
  }
  
  const updatedCart = cart.map(item => 
    item.id === id ? { ...item, quantity } : item
  );
  
  saveCart(updatedCart);
  window.dispatchEvent(new CustomEvent('cart-updated'));
};

// Clear cart
export const clearCart = (): void => {
  saveCart([]);
  window.dispatchEvent(new CustomEvent('cart-updated'));
};

// Get cart total
export const getCartTotal = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Get cart count
export const getCartCount = (): number => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};
