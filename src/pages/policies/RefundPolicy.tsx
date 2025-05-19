import React from 'react';
import MainLayout from '../../layouts/MainLayout';

const RefundPolicy = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold mb-8">Refund Policy</h1>
          
          <p className="text-gray-600 mb-6">
            At Swaminarayan Spice Hub, we take pride in providing high-quality spices and exceptional customer service. 
            We want you to be completely satisfied with your purchase. If you're not entirely satisfied, we're here to help.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Returns</h2>
          <p className="text-gray-600 mb-4">
            You have 30 days from the date of delivery to return your unopened and unused products for a full refund. 
            To be eligible for a return, your item must be in the same condition that you received it, unopened, and in its original packaging.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Refunds</h2>
          <p className="text-gray-600 mb-4">
            Once we receive and inspect your return, we will send you an email to notify you that we have received your returned item. 
            We will also notify you of the approval or rejection of your refund.
          </p>
          <p className="text-gray-600 mb-4">
            If you are approved, then your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-7 business days.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Late or Missing Refunds</h2>
          <p className="text-gray-600 mb-4">
            If you haven't received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted.
            Next, contact your bank. There is often some processing time before a refund is posted. If you've done all of this and you still have not received your refund, please contact us at <a href="mailto:support@swaminarayanspicehub.ca" className="text-brand-saffron hover:underline">support@swaminarayanspicehub.ca</a>.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Exchanges</h2>
          <p className="text-gray-600 mb-4">
            We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at <a href="mailto:support@swaminarayanspicehub.ca" className="text-brand-saffron hover:underline">support@swaminarayanspicehub.ca</a>.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Returns</h2>
          <p className="text-gray-600 mb-4">
            To return your product, you should mail your product to: 123 Spice Lane, Toronto, ON M5V 2K7, Canada.
          </p>
          <p className="text-gray-600 mb-4">
            You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
          </p>
          <p className="text-gray-600 mb-4">
            Depending on where you live, the time it may take for your exchanged product to reach you may vary.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about our Returns and Refunds Policy, please contact us at <a href="mailto:support@swaminarayanspicehub.ca" className="text-brand-saffron hover:underline">support@swaminarayanspicehub.ca</a> or call us at +1 (647) 555-1234.
          </p>
          
          <p className="text-gray-500 mt-12 text-sm">
            Last updated: May 20, 2025
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default RefundPolicy;
