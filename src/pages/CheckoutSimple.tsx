import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, getCartTotal, clearCart } from '@/utils/cartUtils';
import { CartItem } from '@/utils/cartUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { formatCurrency } from '@/lib/utils';
import { CheckCircle, ChevronLeft, ChevronRight, CreditCard, Truck, ShieldCheck } from 'lucide-react';

// Define checkout steps
enum CheckoutStep {
  INFORMATION = 0,
  SHIPPING = 1,
  PAYMENT = 2,
  CONFIRMATION = 3
}

const CheckoutSimple = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(CheckoutStep.INFORMATION);
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    // Contact information
    email: '',
    phone: '',
    
    // Shipping information
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: 'Canada',
    province: '',
    postalCode: '',
    
    // Shipping method
    shippingMethod: 'standard',
    
    // Payment information
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    
    // Additional
    saveInformation: true,
    orderNotes: ''
  });
  
  // Shipping options
  const shippingOptions = [
    { id: 'standard', name: 'Standard Shipping', price: 5.99, description: 'Delivery in 5-7 business days' },
    { id: 'express', name: 'Express Shipping', price: 12.99, description: 'Delivery in 2-3 business days' },
    { id: 'overnight', name: 'Overnight Shipping', price: 24.99, description: 'Next business day delivery' }
  ];
  
  // Get selected shipping method
  const selectedShipping = shippingOptions.find(option => option.id === formData.shippingMethod) || shippingOptions[0];
  
  // Calculate totals
  const shippingCost = selectedShipping.price;
  const taxRate = 0.13; // 13% tax rate (typical for many Canadian provinces)
  const taxAmount = subtotal * taxRate;
  const orderTotal = subtotal + shippingCost + taxAmount;
  
  // Load cart items when component mounts
  useEffect(() => {
    const cartItems = getCart();
    setItems(cartItems);
    setSubtotal(getCartTotal());
    
    // Redirect to cart if cart is empty
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [navigate]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle checkbox changes
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  // Move to the next step
  const handleNextStep = () => {
    if (currentStep < CheckoutStep.CONFIRMATION) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Move to the previous step
  const handlePreviousStep = () => {
    if (currentStep > CheckoutStep.INFORMATION) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Handle order submission
  const handlePlaceOrder = () => {
    // Here you would typically send the order to your backend
    console.log('Order placed:', { items, formData, orderTotal });
    
    // Move to confirmation step
    setCurrentStep(CheckoutStep.CONFIRMATION);
    
    // Clear the cart after successful order
    clearCart();
    
    // Update local state to reflect empty cart
    setItems([]);
    setSubtotal(0);
  };
  
  // Handle returning to shop
  const handleReturnToShop = () => {
    navigate('/');
  };

  // Render checkout progress bar
  const renderProgressBar = () => {
    const steps = [
      { id: CheckoutStep.INFORMATION, name: 'Information' },
      { id: CheckoutStep.SHIPPING, name: 'Shipping' },
      { id: CheckoutStep.PAYMENT, name: 'Payment' }
    ];
    
    return (
      <div className="hidden md:block mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex-1 relative">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= step.id ? 'bg-brand-saffron text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {index + 1}
                </div>
                <div className="ml-2">
                  <p className={`font-medium ${currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'}`}>{step.name}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`absolute top-4 left-8 w-full h-0.5 ${currentStep > step.id ? 'bg-brand-saffron' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Render the current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case CheckoutStep.INFORMATION:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                  <Input
                    id="apartment"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="province">Province *</Label>
                  <Select
                    value={formData.province}
                    onValueChange={(value) => handleSelectChange('province', value)}
                  >
                    <SelectTrigger id="province" className="mt-1">
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AB">Alberta</SelectItem>
                      <SelectItem value="BC">British Columbia</SelectItem>
                      <SelectItem value="MB">Manitoba</SelectItem>
                      <SelectItem value="NB">New Brunswick</SelectItem>
                      <SelectItem value="NL">Newfoundland and Labrador</SelectItem>
                      <SelectItem value="NS">Nova Scotia</SelectItem>
                      <SelectItem value="ON">Ontario</SelectItem>
                      <SelectItem value="PE">Prince Edward Island</SelectItem>
                      <SelectItem value="QC">Quebec</SelectItem>
                      <SelectItem value="SK">Saskatchewan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code *</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => handleSelectChange('country', value)}
                    disabled
                  >
                    <SelectTrigger id="country" className="mt-1">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Canada">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mt-4">
              <Checkbox 
                id="saveInformation" 
                checked={formData.saveInformation}
                onCheckedChange={(checked) => handleCheckboxChange('saveInformation', checked === true)}
              />
              <Label htmlFor="saveInformation" className="text-sm">Save this information for next time</Label>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleNextStep}
                className="bg-brand-saffron hover:bg-brand-brown flex items-center space-x-2"
              >
                <span>Continue to Shipping</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        
      case CheckoutStep.SHIPPING:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-4">Shipping Method</h2>
              <div className="space-y-3">
                {shippingOptions.map((option) => (
                  <div 
                    key={option.id}
                    className={`border rounded-lg p-4 cursor-pointer ${formData.shippingMethod === option.id ? 'border-brand-saffron bg-yellow-50' : ''}`}
                    onClick={() => handleSelectChange('shippingMethod', option.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.shippingMethod === option.id ? 'border-brand-saffron' : 'border-gray-300'}`}>
                          {formData.shippingMethod === option.id && (
                            <div className="w-3 h-3 rounded-full bg-brand-saffron" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{option.name}</h3>
                          <p className="text-sm text-gray-500">{option.description}</p>
                        </div>
                      </div>
                      <span className="font-medium">{formatCurrency(option.price)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-4">Order Notes (Optional)</h2>
              <Textarea
                id="orderNotes"
                name="orderNotes"
                value={formData.orderNotes}
                onChange={handleChange}
                placeholder="Notes about your order, e.g. special delivery instructions"
                className="mt-1"
                rows={3}
              />
            </div>
            
            <div className="flex justify-between">
              <Button 
                onClick={handlePreviousStep}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Back to Information</span>
              </Button>
              <Button 
                onClick={handleNextStep}
                className="bg-brand-saffron hover:bg-brand-brown flex items-center space-x-2"
              >
                <span>Continue to Payment</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        
      case CheckoutStep.PAYMENT:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-4">Payment Method</h2>
              <div className="border rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-5 h-5 rounded-full border border-brand-saffron flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-brand-saffron" />
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-gray-600" />
                    <span className="font-medium">Credit Card</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardName">Name on Card *</Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-gray-50 border rounded-lg p-4">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <ShieldCheck className="h-4 w-4 mr-2 text-green-600" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
                <div className="flex space-x-2">
                  <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/0169695890db3db16bfe.svg" alt="Visa" className="h-6" />
                  <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/ae9ceec48b1dc489596c.svg" alt="Mastercard" className="h-6" />
                  <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/f7c33ef4e4d66f2c26ae.svg" alt="Amex" className="h-6" />
                  <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/f05cdd53def2ba9a179e.svg" alt="Discover" className="h-6" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                onClick={handlePreviousStep}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Back to Shipping</span>
              </Button>
              <Button 
                onClick={handlePlaceOrder}
                className="bg-brand-saffron hover:bg-brand-brown flex items-center space-x-2"
              >
                <span>Place Order</span>
                <CheckCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        
      case CheckoutStep.CONFIRMATION:
        return (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Thank You for Your Order!</h2>
            <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
            <p className="text-gray-600 mb-2">We've sent a confirmation email to <span className="font-medium">{formData.email}</span></p>
            <p className="text-gray-600 mb-6">Order number: <span className="font-medium">{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</span></p>
            
            <Button 
              onClick={handleReturnToShop}
              className="bg-brand-saffron hover:bg-brand-brown"
            >
              Continue Shopping
            </Button>
          </div>
        );
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center">Checkout</h1>
      </div>
      
      {currentStep !== CheckoutStep.CONFIRMATION && renderProgressBar()}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {renderStepContent()}
        </div>
        
        <div className="hidden lg:block">
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            
            <div className="max-h-80 overflow-y-auto mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex py-3 border-b last:border-0">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 mr-4">
                    <img 
                      src={item.image || 'https://via.placeholder.com/80x80?text=Product'} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/80x80?text=Product';
                      }}
                    />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center text-white text-xs">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.weight}</p>
                    <p className="text-sm mt-1">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Calculated at next step</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>Calculated at next step</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span className="text-brand-brown">{formatCurrency(subtotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSimple;
