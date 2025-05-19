import React from 'react';
import MainLayout from '../../layouts/MainLayout';

const ShippingPolicy = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold mb-8">Shipping Policy</h1>
          
          <p className="text-gray-600 mb-6">
            At Swaminarayan Spice Hub, we strive to provide fast and reliable shipping services to our customers across Canada. 
            Please review our shipping policies below to understand what to expect when placing an order.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Areas</h2>
          <p className="text-gray-600 mb-4">
            We currently ship to all provinces and territories in Canada. International shipping is not available at this time.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Methods</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-semibold mb-3">Standard Shipping</h3>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Free shipping on orders over $50</li>
                <li>$7.99 flat rate for orders under $50</li>
                <li>Delivery time: 3-7 business days</li>
                <li>Trackable via Canada Post</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-semibold mb-3">Express Shipping</h3>
              <ul className="list-disc pl-6 text-gray-600">
                <li>$14.99 flat rate</li>
                <li>Delivery time: 1-3 business days</li>
                <li>Priority shipping via Canada Post</li>
                <li>Trackable via Canada Post</li>
              </ul>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Rates</h2>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Order Value</th>
                  <th className="text-left py-2">Shipping Rate</th>
                  <th className="text-left py-2">Delivery Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Under $50</td>
                  <td className="py-2">$7.99</td>
                  <td className="py-2">3-7 business days</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">$50+</td>
                  <td className="py-2">Free</td>
                  <td className="py-2">3-7 business days</td>
                </tr>
                <tr>
                  <td className="py-2">Express</td>
                  <td className="py-2">$14.99</td>
                  <td className="py-2">1-3 business days</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Times</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-semibold mb-3">Order Processing</h3>
              <p className="text-gray-600">
                Orders are processed within 1-2 business days. Processing time may be longer during peak periods.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-semibold mb-3">Delivery Times</h3>
              <p className="text-gray-600">
                Delivery times are estimates and may vary based on your location in Canada:
              </p>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Greater Toronto Area: 1-2 business days</li>
                <li>Ontario and Quebec: 2-3 business days</li>
                <li>Rest of Canada: 3-7 business days</li>
              </ul>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Address</h2>
          <p className="text-gray-600 mb-4">
            Please ensure your shipping address is accurate and complete. We are not responsible for packages that are undeliverable due to incorrect addresses.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Tracking</h2>
          <p className="text-gray-600 mb-4">
            You will receive an email with your tracking number once your order ships. You can track your package using the Canada Post website or your account dashboard.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Delivery Confirmation</h2>
          <p className="text-gray-600 mb-4">
            All orders are shipped with delivery confirmation. Please ensure someone is available to sign for your package if required.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Restrictions</h2>
          <p className="text-gray-600 mb-4">
            Due to customs regulations, we cannot ship to P.O. boxes or military addresses. Please provide a physical street address for delivery.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Updates</h2>
          <p className="text-gray-600 mb-4">
            We will send you shipping updates via email. Please ensure your email address is correct and check your spam folder if you don't receive updates.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Questions</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about shipping, please contact our customer service team at:
          </p>
          <p className="text-gray-600 mb-4">
            Swaminarayan Spice Hub<br />
            Email: support@swaminarayanspicehub.ca<br />
            Phone: +1 (647) 555-1234
          </p>
          
          <p className="text-gray-500 mt-12 text-sm">
            Last updated: May 20, 2025
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default ShippingPolicy;
