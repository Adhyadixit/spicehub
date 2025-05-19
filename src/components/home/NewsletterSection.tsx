
import React from 'react';
import { Mail } from 'lucide-react';

const NewsletterSection = () => {
  return (
    <section className="py-16 bg-brand-turmeric/50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <Mail className="h-12 w-12 text-brand-saffron mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-brand-brown mb-3">Join Our Spice Community</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to receive updates on new products, special offers, and traditional recipes 
            that align with Jain and Swaminarayan values.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-saffron focus:border-transparent"
              required
            />
            <button 
              type="submit" 
              className="btn-primary text-base py-3"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-sm text-gray-500 mt-4">
            By subscribing, you agree to our Privacy Policy. We respect your privacy and will never share your information.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
