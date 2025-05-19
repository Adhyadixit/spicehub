import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Leaf, Award, Users, Heart, ShieldCheck, Truck } from 'lucide-react';

const AboutUs = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">About Swaminarayan Spice Hub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bringing authentic, pure, and traditional Indian spices to your kitchen, with a focus on Jain and Sattvic dietary principles.
          </p>
        </div>
        
        {/* Our Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Swaminarayan Spice Hub was founded in 2018 by the Patel family, who immigrated to Canada from Gujarat, India, bringing with them generations of knowledge about traditional spices and their benefits.
              </p>
              <p>
                What began as a small family business selling homemade spice blends at local farmers' markets has grown into a beloved brand trusted by thousands of families across Canada.
              </p>
              <p>
                Our founder, Rajesh Patel, noticed that many Indian spice blends available in Canada contained onion and garlic, which are not permitted in Jain diets. He also observed that many commercial spices contained unnecessary additives and preservatives.
              </p>
              <p>
                This inspired him to create a line of pure, authentic spices that adhere to Jain dietary principles while maintaining the rich, complex flavors that make Indian cuisine so beloved worldwide.
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80" 
              alt="Colorful spices in wooden bowls" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Purity</h3>
              <p className="text-gray-600">
                We are committed to providing spices that are 100% pure, with no fillers, additives, or preservatives. Our products are free from onion and garlic, making them suitable for Jain diets.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-4">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality</h3>
              <p className="text-gray-600">
                We source the finest ingredients from trusted farmers and suppliers who share our commitment to quality. Each batch is carefully tested to ensure it meets our high standards.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-gray-600">
                We believe in building a community around our shared love for authentic flavors and traditional cooking. We support local initiatives and give back to communities both in Canada and India.
              </p>
            </div>
          </div>
        </div>
        
        {/* Our Process */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80" 
                alt="Traditional spice grinding process" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-brand-turmeric text-brand-brown font-bold mr-4">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Sourcing</h3>
                    <p className="text-gray-600">
                      We carefully select the finest ingredients from trusted farmers who use sustainable practices. Many of our spices come directly from family farms in Gujarat, India.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-brand-turmeric text-brand-brown font-bold mr-4">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Processing</h3>
                    <p className="text-gray-600">
                      Our spices are cleaned, dried, and processed using traditional methods that preserve their natural oils and flavors. We use stone grinding for many of our spice blends.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-brand-turmeric text-brand-brown font-bold mr-4">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Quality Control</h3>
                    <p className="text-gray-600">
                      Each batch is rigorously tested for purity, flavor, and aroma before packaging. We maintain strict quality control standards throughout our production process.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-brand-turmeric text-brand-brown font-bold mr-4">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Packaging</h3>
                    <p className="text-gray-600">
                      Our spices are packaged in eco-friendly materials that preserve freshness while minimizing environmental impact. We use resealable pouches to maintain flavor after opening.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Why Choose Us */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mr-4">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">100% Pure & Natural</h3>
                <p className="text-gray-600">
                  Our spices contain no additives, preservatives, or artificial colors. Just pure, natural ingredients that enhance your cooking with authentic flavors.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mr-4">
                <ShieldCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Jain & Sattvic Friendly</h3>
                <p className="text-gray-600">
                  Our products are free from onion, garlic, and other ingredients not permitted in Jain and Sattvic diets, making them suitable for a wide range of dietary preferences.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mr-4">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Canada-Wide Shipping</h3>
                <p className="text-gray-600">
                  We offer fast, reliable shipping across Canada, with free shipping on orders over $50. Your spices arrive fresh and ready to enhance your cooking.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mr-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Family-Owned Business</h3>
                <p className="text-gray-600">
                  As a family-owned business, we put our heart and soul into every product. We treat our customers like family and are committed to your satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Meet Our Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" 
                  alt="Rajesh Patel - Founder & CEO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Rajesh Patel</h3>
                <p className="text-brand-saffron mb-3">Founder & CEO</p>
                <p className="text-gray-600">
                  With over 30 years of experience in traditional spice blending, Rajesh brings his family's heritage and passion to every product we create.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80" 
                  alt="Priya Patel - Head of Product Development" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Priya Patel</h3>
                <p className="text-brand-saffron mb-3">Head of Product Development</p>
                <p className="text-gray-600">
                  Priya combines traditional knowledge with modern culinary techniques to create innovative spice blends that honor our heritage.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" 
                  alt="Amit Shah - Operations Manager" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Amit Shah</h3>
                <p className="text-brand-saffron mb-3">Operations Manager</p>
                <p className="text-gray-600">
                  Amit ensures that our production processes maintain the highest standards of quality and efficiency while respecting traditional methods.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-brand-turmeric text-brand-brown rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience the Difference</h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            Discover our range of authentic, pure spices and bring the rich flavors of traditional Indian cuisine to your home.
          </p>
          <a 
            href="/products" 
            className="inline-block bg-brand-saffron hover:bg-brand-brown text-white font-medium py-3 px-6 rounded-md transition-colors"
          >
            Shop Our Products
          </a>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutUs;
