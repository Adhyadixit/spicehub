
import React from 'react';
import { Shield, Leaf, Package, Truck } from 'lucide-react';

const features = [
  {
    icon: <Leaf className="h-10 w-10 text-brand-saffron" />,
    title: 'No Onion, No Garlic',
    description: 'Pure, sattvic spices suitable for Jain and Swaminarayan devotees.'
  },
  {
    icon: <Shield className="h-10 w-10 text-brand-saffron" />,
    title: '100% Natural',
    description: 'Premium spices with no artificial colors, flavors or preservatives.'
  },
  {
    icon: <Truck className="h-10 w-10 text-brand-saffron" />,
    title: 'Canada-Wide Shipping',
    description: 'Fast shipping across Canada with free delivery on orders over $50.'
  },
  {
    icon: <Package className="h-10 w-10 text-brand-saffron" />,
    title: 'Secure Packaging',
    description: 'Vacuum-sealed to preserve freshness, flavor and aroma.'
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-12 bg-brand-turmeric/30">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-brand-brown">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
