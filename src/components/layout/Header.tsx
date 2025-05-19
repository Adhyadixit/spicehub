
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, ShoppingCart, User, Menu, X, Heart, 
  ChevronDown, Phone, Mail, LogOut, LayoutDashboard
} from 'lucide-react';
import { getCartCount } from '@/utils/cartUtils';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Update cart count when component mounts and when cart changes
  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartCount());
    };
    
    // Initial cart count
    updateCartCount();
    
    // Listen for cart updates
    window.addEventListener('cart-updated', updateCartCount);
    
    return () => {
      window.removeEventListener('cart-updated', updateCartCount);
    };
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      
      if (session?.user) {
        // Check if user is admin
        const { data } = await supabase.rpc('has_role', {
          _user_id: session.user.id,
          _role: 'admin'
        });
        setIsAdmin(Boolean(data));
      }
    };
    
    getUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        
        if (session?.user) {
          // Check if user is admin
          const { data } = await supabase.rpc('has_role', {
            _user_id: session.user.id,
            _role: 'admin'
          });
          setIsAdmin(Boolean(data));
        } else {
          setIsAdmin(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const categories = [
    { name: "All Products", href: "/products" },
    { name: "Masalas", href: "/category/masalas" },
    { name: "Daily Use", href: "/category/daily-use" },
    { name: "Premium Spices", href: "/category/premium" },
    { name: "Ayurvedic", href: "/category/ayurvedic" },
  ];

  return (
    <header className="sticky top-0 w-full z-40 bg-white shadow-sm">
      {/* Top announcement bar */}
      <div className="bg-brand-saffron text-white py-2 overflow-hidden">
        <div className="relative flex whitespace-nowrap animate-marquee">
          <span className="mx-4">📦 Free shipping on orders above $50</span>
          <span className="mx-4">🌱 100% Pure & Natural Spices</span>
          <span className="mx-4">🍃 No Onion, No Garlic - Perfect for Jain Diet</span>
          <span className="mx-4">🇨🇦 Made in Canada with Global Ingredients</span>
          <span className="mx-4">📦 Free shipping on orders above $50</span>
          <span className="mx-4">🌱 100% Pure & Natural Spices</span>
        </div>
      </div>

      {/* Top contact bar */}
      <div className="bg-brand-turmeric text-brand-brown py-1 hidden sm:block">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm">
              <Phone className="h-3 w-3 mr-1" />
              <span>+1 (647) 555-1234</span>
            </div>
            <div className="flex items-center text-sm">
              <Mail className="h-3 w-3 mr-1" />
              <span>contact@swaminarayanspicehub.ca</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <Link to="/about-us">About Us</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact-us">Contact Us</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-brand-brown">
                Swaminarayan<span className="text-brand-saffron">Spice</span>Hub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={category.href}
                className="text-gray-700 hover:text-brand-saffron font-medium"
              >
                {category.name}
              </Link>
            ))}
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-brand-saffron font-medium">
                Collections <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 z-50">
                <Link to="/collections/jain-special" className="block px-4 py-2 hover:bg-muted rounded-md">Jain Special</Link>
                <Link to="/collections/no-onion-no-garlic" className="block px-4 py-2 hover:bg-muted rounded-md">No Onion No Garlic</Link>
                <Link to="/collections/sattvic" className="block px-4 py-2 hover:bg-muted rounded-md">Sattvic</Link>
              </div>
            </div>
          </nav>

          {/* Search, Account & Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <button aria-label="Search">
              <Search className="h-5 w-5 text-gray-500 hover:text-brand-saffron" />
            </button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative">
                    <User className="h-5 w-5 text-gray-500 hover:text-brand-saffron" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <User className="h-5 w-5 text-gray-500 hover:text-brand-saffron" />
              </Link>
            )}
            
            <Link to="/wishlist">
              <Heart className="h-5 w-5 text-gray-500 hover:text-brand-saffron" />
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-5 w-5 text-gray-500 hover:text-brand-saffron" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-saffron text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-5 w-5 text-gray-500" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-saffron text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-500" />
              ) : (
                <Menu className="h-6 w-6 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 bg-white z-50 pt-16 px-4 md:hidden transition-transform duration-300 ease-in-out",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col space-y-4 py-8">
          <div className="border-b pb-2 mb-2">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-lg">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={category.href}
                className="block py-2 text-gray-700 hover:text-brand-saffron"
                onClick={() => setMobileMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <Link 
              to="/collections" 
              className="block py-2 text-gray-700 hover:text-brand-saffron"
              onClick={() => setMobileMenuOpen(false)}
            >
              Collections
            </Link>
          </div>
          <div className="border-b pb-2 mb-2">
            <span className="font-medium text-lg">Account</span>
            
            {user ? (
              <>
                <Link 
                  to="/account" 
                  className="flex items-center py-2 text-gray-700 hover:text-brand-saffron"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-2" /> My Profile
                </Link>
                
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="flex items-center py-2 text-gray-700 hover:text-brand-saffron"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LayoutDashboard className="h-5 w-5 mr-2" /> Admin Dashboard
                  </Link>
                )}
                
                <button 
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center py-2 text-gray-700 hover:text-brand-saffron"
                >
                  <LogOut className="h-5 w-5 mr-2" /> Sign Out
                </button>
              </>
            ) : (
              <Link 
                to="/auth" 
                className="flex items-center py-2 text-gray-700 hover:text-brand-saffron"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-5 w-5 mr-2" /> Sign In / Register
              </Link>
            )}
            
            <Link 
              to="/wishlist" 
              className="flex items-center py-2 text-gray-700 hover:text-brand-saffron"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Heart className="h-5 w-5 mr-2" /> Wishlist
            </Link>
          </div>
          <div>
            <span className="font-medium text-lg">Contact</span>
            <div className="flex items-center py-2">
              <Phone className="h-5 w-5 mr-2 text-brand-saffron" />
              <span>+1 (647) 555-1234</span>
            </div>
            <div className="flex items-center py-2">
              <Mail className="h-5 w-5 mr-2 text-brand-saffron" />
              <span className="text-sm">contact@swaminarayanspicehub.ca</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
