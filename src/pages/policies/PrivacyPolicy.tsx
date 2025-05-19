import React from 'react';
import MainLayout from '../../layouts/MainLayout';

const PrivacyPolicy = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <p className="text-gray-600 mb-6">
            At Swaminarayan Spice Hub, we respect your privacy and are committed to protecting your personal data. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
          <p className="text-gray-600 mb-4">
            We collect personal information that you voluntarily provide to us when you register on our website, 
            express interest in obtaining information about us or our products, or otherwise contact us.
          </p>
          <p className="text-gray-600 mb-4">
            The personal information we collect may include:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Name and contact information (email address, phone number, shipping and billing address)</li>
            <li>Payment information (credit card details, though we do not store complete credit card information)</li>
            <li>Order history and preferences</li>
            <li>Account login credentials</li>
            <li>Communications with us</li>
            <li>Technical data (IP address, browser type, device information)</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
          <p className="text-gray-600 mb-4">
            We use the information we collect for various business purposes, including:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Processing and fulfilling your orders</li>
            <li>Managing your account</li>
            <li>Providing customer support</li>
            <li>Sending transactional emails (order confirmations, shipping updates)</li>
            <li>Sending marketing communications (if you've opted in)</li>
            <li>Improving our website and services</li>
            <li>Complying with legal obligations</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies and Tracking Technologies</h2>
          <p className="text-gray-600 mb-4">
            We use cookies and similar tracking technologies to collect information about your browsing activities. 
            These tools help us understand how customers use our site so we can enhance your shopping experience.
          </p>
          <p className="text-gray-600 mb-4">
            You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent. 
            However, if you disable or refuse cookies, some parts of our site may not function properly.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Disclosure</h2>
          <p className="text-gray-600 mb-4">
            We may share your information with:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Service providers who help us operate our business (payment processors, shipping companies)</li>
            <li>Marketing partners (with your consent)</li>
            <li>Legal authorities when required by law</li>
            <li>Business partners in the event of a merger, acquisition, or sale of assets</li>
          </ul>
          <p className="text-gray-600 mb-4">
            We do not sell your personal information to third parties.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
          <p className="text-gray-600 mb-4">
            We implement appropriate security measures to protect your personal information. 
            However, no method of transmission over the Internet or electronic storage is 100% secure, 
            so we cannot guarantee absolute security.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
          <p className="text-gray-600 mb-4">
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Access to your personal information</li>
            <li>Correction of inaccurate or incomplete information</li>
            <li>Deletion of your personal information</li>
            <li>Restriction or objection to processing</li>
            <li>Data portability</li>
            <li>Withdrawal of consent</li>
          </ul>
          <p className="text-gray-600 mb-4">
            To exercise these rights, please contact us using the information provided below.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Children's Privacy</h2>
          <p className="text-gray-600 mb-4">
            Our website is not intended for children under 13 years of age. We do not knowingly collect personal 
            information from children under 13. If you are a parent or guardian and believe your child has provided 
            us with personal information, please contact us.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
          <p className="text-gray-600 mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
            Privacy Policy on this page and updating the "Last updated" date.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="text-gray-600 mb-4">
            Swaminarayan Spice Hub<br />
            123 Spice Lane<br />
            Toronto, ON M5V 2K7<br />
            Canada<br />
            <a href="mailto:privacy@swaminarayanspicehub.ca" className="text-brand-saffron hover:underline">privacy@swaminarayanspicehub.ca</a><br />
            +1 (647) 555-1234
          </p>
          
          <p className="text-gray-500 mt-12 text-sm">
            Last updated: May 20, 2025
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default PrivacyPolicy;
