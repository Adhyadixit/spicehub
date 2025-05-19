
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-6 border-t">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand & About */}
          <div>
            <Link to="/" className="block mb-4">
              <h3 className="text-xl font-bold text-brand-brown">
                Swaminarayan<span className="text-brand-saffron">Spice</span>Hub
              </h3>
            </Link>
            <p className="mb-6 text-gray-600 text-sm">
              Pure, authentic spices inspired by traditional Swaminarayan and Jain values. 
              All our products are 100% vegetarian with no onion, no garlic - perfect for devotees 
              following a sattvic lifestyle.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-saffron">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-saffron">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-saffron">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-saffron">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-brown">Quick Links</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/products" className="hover:text-brand-saffron">All Products</Link></li>
              <li><Link to="/category/masalas" className="hover:text-brand-saffron">Masalas</Link></li>
              <li><Link to="/category/daily-use" className="hover:text-brand-saffron">Daily Use</Link></li>
              <li><Link to="/category/premium" className="hover:text-brand-saffron">Premium Spices</Link></li>
              <li><Link to="/category/ayurvedic" className="hover:text-brand-saffron">Ayurvedic</Link></li>
              <li><Link to="/collections/jain-special" className="hover:text-brand-saffron">Jain Special</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-brown">Support</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/about" className="hover:text-brand-saffron">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-brand-saffron">Contact Us</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-brand-saffron">Shipping Policy</Link></li>
              <li><Link to="/refund-policy" className="hover:text-brand-saffron">Refund Policy</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-brand-saffron">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-brand-saffron">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-brown">Contact Us</h4>
            <address className="not-italic text-gray-600">
              <div className="flex items-start space-x-3 mb-2">
                <MapPin className="h-5 w-5 text-brand-saffron flex-shrink-0 mt-0.5" />
                <span>123 Spice Market, Toronto, ON M1M 1M1, Canada</span>
              </div>
              <div className="flex items-center space-x-3 mb-2">
                <Phone className="h-5 w-5 text-brand-saffron flex-shrink-0" />
                <a href="tel:+16475551234" className="hover:text-brand-saffron">+1 (647) 555-1234</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-brand-saffron flex-shrink-0" />
                <a href="mailto:contact@swaminarayanspicehub.ca" className="hover:text-brand-saffron">
                  contact@swaminarayanspicehub.ca
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-b py-8 my-8">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-lg font-semibold mb-2 text-brand-brown">Subscribe to Our Newsletter</h4>
            <p className="text-gray-600 mb-4">Get updates on new products, special offers, and sattvic recipes.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-saffron focus:border-transparent"
              />
              <button className="btn-primary whitespace-nowrap">Subscribe Now</button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Swaminarayan Spice Hub. All rights reserved.</p>
          <p className="mt-2">
            <span className="mr-2">🇨🇦 Made with love in Canada</span>
            <span>🌱 100% Vegetarian, No Onion No Garlic</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
