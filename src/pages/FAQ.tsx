import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
  category: string;
}

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  const faqItems: FAQItem[] = [
    // Products
    {
      question: "Are your spices suitable for a Jain diet?",
      answer: (
        <p>
          Yes, all our spices are 100% suitable for a Jain diet. We do not use onion, garlic, 
          or any root vegetables in our spice blends. Our production facility maintains strict 
          protocols to prevent cross-contamination.
        </p>
      ),
      category: "products"
    },
    {
      question: "What makes your spices different from others on the market?",
      answer: (
        <p>
          Our spices are 100% pure with no additives, fillers, or preservatives. We source directly 
          from trusted farmers, use traditional processing methods to preserve natural oils and flavors, 
          and ensure our products are free from onion and garlic, making them suitable for Jain and 
          Sattvic diets. Each batch undergoes rigorous quality testing before packaging.
        </p>
      ),
      category: "products"
    },
    {
      question: "How should I store my spices?",
      answer: (
        <p>
          For maximum freshness and flavor, store your spices in a cool, dry place away from direct 
          sunlight. Keep containers tightly sealed after use. Our packaging is designed to maintain 
          freshness, but for best results, use within 12 months of opening.
        </p>
      ),
      category: "products"
    },
    {
      question: "Do your products contain any allergens?",
      answer: (
        <div>
          <p>
            We process our spices in a facility that maintains strict allergen controls. However, 
            some of our blends may contain mustard seeds, which are considered an allergen in Canada.
          </p>
          <p className="mt-2">
            Each product page lists all ingredients and potential allergens. If you have specific 
            allergen concerns, please contact us directly for the most up-to-date information.
          </p>
        </div>
      ),
      category: "products"
    },
    
    // Orders & Shipping
    {
      question: "How long will it take to receive my order?",
      answer: (
        <div>
          <p>
            Shipping times depend on your location in Canada:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Greater Toronto Area: 1-2 business days</li>
            <li>Ontario and Quebec: 2-3 business days</li>
            <li>Rest of Canada: 3-7 business days</li>
          </ul>
          <p className="mt-2">
            Orders are processed within 1-2 business days. You'll receive a tracking number once 
            your order ships.
          </p>
        </div>
      ),
      category: "orders"
    },
    {
      question: "Do you offer free shipping?",
      answer: (
        <p>
          Yes! We offer free standard shipping on all orders over $50 within Canada. For orders 
          under $50, a flat shipping rate of $7.99 applies.
        </p>
      ),
      category: "orders"
    },
    {
      question: "Can I modify or cancel my order?",
      answer: (
        <p>
          You can modify or cancel your order within 2 hours of placing it by contacting our 
          customer service team at support@swaminarayanspicehub.ca. Once your order enters the 
          processing stage, we cannot make changes or cancel it.
        </p>
      ),
      category: "orders"
    },
    {
      question: "Do you ship internationally?",
      answer: (
        <p>
          Currently, we only ship within Canada. We're working on expanding our shipping options 
          to include the United States and other international destinations in the near future. 
          Sign up for our newsletter to be notified when international shipping becomes available.
        </p>
      ),
      category: "orders"
    },
    
    // Returns & Refunds
    {
      question: "What is your return policy?",
      answer: (
        <p>
          We accept returns of unopened products within 30 days of delivery. Please contact our 
          customer service team at support@swaminarayanspicehub.ca to initiate a return. For 
          complete details, please visit our <a href="/policies/refund-policy" className="text-brand-saffron hover:underline">Refund Policy</a> page.
        </p>
      ),
      category: "returns"
    },
    {
      question: "What if my order arrives damaged?",
      answer: (
        <p>
          If your order arrives damaged, please take photos of the damaged packaging and products, 
          and contact us at support@swaminarayanspicehub.ca within 48 hours of delivery. We'll 
          arrange for a replacement or refund as appropriate.
        </p>
      ),
      category: "returns"
    },
    {
      question: "How long does it take to process a refund?",
      answer: (
        <p>
          Once we receive and inspect your return, we'll process your refund within 3-5 business days. 
          It may take an additional 5-10 business days for the refund to appear in your account, 
          depending on your payment method and financial institution.
        </p>
      ),
      category: "returns"
    },
    
    // Account & Orders
    {
      question: "Do I need to create an account to place an order?",
      answer: (
        <p>
          No, you can check out as a guest without creating an account. However, creating an account 
          allows you to track your orders, save your shipping information for future purchases, and 
          earn loyalty points.
        </p>
      ),
      category: "account"
    },
    {
      question: "How can I track my order?",
      answer: (
        <p>
          Once your order ships, you'll receive a confirmation email with a tracking number and link. 
          If you have an account, you can also track your order by logging in and viewing your order 
          history. If you haven't received a tracking number within 2 business days of placing your 
          order, please contact us.
        </p>
      ),
      category: "account"
    },
    {
      question: "Do you have a loyalty program?",
      answer: (
        <div>
          <p>
            Yes! Our Spice Rewards program lets you earn points with every purchase:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>1 point for every $1 spent</li>
            <li>100 points = $5 off your next purchase</li>
            <li>Bonus points for referring friends, writing reviews, and more</li>
          </ul>
          <p className="mt-2">
            Create an account to start earning points automatically with every purchase.
          </p>
        </div>
      ),
      category: "account"
    },
    
    // Wholesale
    {
      question: "Do you offer wholesale pricing?",
      answer: (
        <p>
          Yes, we offer wholesale pricing for restaurants, grocery stores, and other businesses. 
          Please email wholesale@swaminarayanspicehub.ca with your business details, and our 
          wholesale team will contact you with pricing and minimum order information.
        </p>
      ),
      category: "wholesale"
    },
    {
      question: "What are your minimum order quantities for wholesale?",
      answer: (
        <p>
          Our minimum initial wholesale order is $500. Subsequent orders have a minimum of $300. 
          We offer tiered pricing based on order volume, with discounts increasing as your order 
          size grows.
        </p>
      ),
      category: "wholesale"
    }
  ];
  
  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'products', name: 'Products' },
    { id: 'orders', name: 'Orders & Shipping' },
    { id: 'returns', name: 'Returns & Refunds' },
    { id: 'account', name: 'Account & Orders' },
    { id: 'wholesale', name: 'Wholesale' }
  ];
  
  const filteredFAQs = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>
        
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Find answers to common questions about our products, ordering process, shipping, returns, and more. 
          Can't find what you're looking for? <a href="/contact-us" className="text-brand-saffron hover:underline">Contact us</a> and we'll be happy to help.
        </p>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 m-1 rounded-full ${
                activeCategory === category.id 
                  ? 'bg-brand-saffron text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div 
              key={index} 
              className="border rounded-lg overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50 focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {activeIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {activeIndex === index && (
                <div className="p-4 bg-gray-50 border-t text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Contact CTA */}
        <div className="mt-12 bg-brand-turmeric text-brand-brown rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-3">Still have questions?</h2>
          <p className="mb-4">
            Our customer support team is here to help. Reach out to us and we'll get back to you as soon as possible.
          </p>
          <a 
            href="/contact-us" 
            className="inline-block bg-brand-saffron hover:bg-brand-brown text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </MainLayout>
  );
};

export default FAQ;
