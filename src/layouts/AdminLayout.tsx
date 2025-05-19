
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  ShoppingCart,
  LogOut,
  ChevronLeft,
  Menu,
  X,
  Tags,
  Image
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/auth');
          return;
        }

        // Check if user is admin
        const { data, error } = await supabase.rpc('has_role', {
          _user_id: session.user.id,
          _role: 'admin'
        });

        if (error) throw error;

        if (!data) {
          // Not an admin, redirect to home
          navigate('/');
          return;
        }

        setIsAdmin(true);
      } catch (error) {
        console.error('Error checking admin status:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (loading || !isAdmin) {
    return null;
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: Tags },
    { name: 'Hero Images', href: '/admin/hero-images', icon: Image },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white z-50 flex items-center justify-between p-4 border-b shadow-sm">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <span className="ml-3 font-semibold">Spice Hub Admin</span>
        </div>
        <Link to="/" className="text-brand-saffron hover:text-brand-brown">
          <ChevronLeft className="h-5 w-5 inline mr-1" />
          Back to Store
        </Link>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-white border-r z-50 transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <Link to="/admin" className="text-2xl font-bold text-brand-brown">
              <span className="text-brand-saffron">Admin</span>Panel
            </Link>
          </div>
          
          <div className="flex flex-col flex-grow overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100",
                      isActive && "bg-brand-saffron/10 text-brand-saffron font-medium"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="border-t p-4">
            <div className="mb-4">
              <Link 
                to="/" 
                className="flex items-center text-gray-700 hover:text-brand-saffron"
                onClick={() => setSidebarOpen(false)}
              >
                <ChevronLeft className="h-5 w-5 mr-2" />
                Back to Store
              </Link>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start text-gray-700 hover:text-red-600"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={cn(
        "transition-all duration-300",
        "lg:ml-64 min-h-screen"
      )}>
        <div className="hidden lg:block py-4 px-6 bg-white border-b">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
            <Link to="/" className="text-brand-saffron hover:text-brand-brown">
              <ChevronLeft className="h-5 w-5 inline mr-1" />
              Back to Store
            </Link>
          </div>
        </div>
        <div className="mt-16 lg:mt-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
