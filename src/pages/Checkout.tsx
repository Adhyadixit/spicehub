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

// Define the steps of the checkout process
enum CheckoutStep {
  INFORMATION = 0,
  SHIPPING = 1,
  PAYMENT = 2,
  CONFIRMATION = 3
}

const Checkout = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(CheckoutStep.INFORMATION);
  
  // Load cart items when component mounts
  useEffect(() => {
    const cartItems = getCart();
    setItems(cartItems);
    setSubtotal(getCartTotal());
    setItemCount(cartItems.reduce((count, item) => count + item.quantity, 0));
    
    // Redirect to cart if cart is empty
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [navigate]);
  
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
    setItemCount(0);
  };
  
  // Handle returning to shop
  const handleReturnToShop = () => {
    navigate('/');
  };

  // Render the current step
  const renderStep = () => {
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
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
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
                  <Label htmlFor="country">Country *</Label>
                  <Select 
                    value={formData.country} 
                    onValueChange={(value) => handleSelectChange('country', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="United States">United States</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="province">Province *</Label>
                  <Select 
                    value={formData.province} 
                    onValueChange={(value) => handleSelectChange('province', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Alberta">Alberta</SelectItem>
                      <SelectItem value="British Columbia">British Columbia</SelectItem>
                      <SelectItem value="Manitoba">Manitoba</SelectItem>
                      <SelectItem value="New Brunswick">New Brunswick</SelectItem>
                      <SelectItem value="Newfoundland and Labrador">Newfoundland and Labrador</SelectItem>
                      <SelectItem value="Nova Scotia">Nova Scotia</SelectItem>
                      <SelectItem value="Ontario">Ontario</SelectItem>
                      <SelectItem value="Prince Edward Island">Prince Edward Island</SelectItem>
                      <SelectItem value="Quebec">Quebec</SelectItem>
                      <SelectItem value="Saskatchewan">Saskatchewan</SelectItem>
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
              </div>
              
              <div className="mt-4 flex items-center space-x-2">
                <Checkbox 
                  id="saveInformation" 
                  checked={formData.saveInformation}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange('saveInformation', checked as boolean)
                  }
                />
                <Label htmlFor="saveInformation">Save this information for next time</Label>
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
                    className={`border rounded-lg p-4 cursor-pointer ${
                      formData.shippingMethod === option.id ? 'border-brand-saffron bg-yellow-50' : ''
                    }`}
                    onClick={() => handleSelectChange('shippingMethod', option.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          formData.shippingMethod === option.id ? 'border-brand-saffron' : 'border-gray-300'
                        }`}>
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
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={handlePreviousStep}
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
              <h2 className="text-lg font-medium mb-4">Payment Information</h2>
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
            
            <div className="border-t pt-6">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping ({selectedShipping.name})</span>
                  <span>{formatCurrency(shippingCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (13%)</span>
                  <span>{formatCurrency(taxAmount)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(orderTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={handlePreviousStep}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Back to Shipping</span>
              </Button>
              <Button 
                onClick={handlePlaceOrder}
                className="bg-brand-saffron hover:bg-brand-brown flex items-center space-x-2"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                <span>Place Order</span>
              </Button>
            </div>
          </div>
        );
      
      case CheckoutStep.CONFIRMATION:
        return (
          <div className="text-center py-8">
            <div className="bg-green-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Thank You for Your Order!</h2>
            <p className="text-gray-600 mb-6">
              Your order has been received and is now being processed.
            </p>
            <div className="bg-gray-50 border rounded-lg p-6 max-w-md mx-auto mb-8">
              <h3 className="font-medium mb-4">Order Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-medium">SPH-{Date.now().toString().substring(5)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span>{formatCurrency(orderTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span>Credit Card</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              We've sent a confirmation email to <span className="font-medium">{formData.email}</span> with your order details.
            </p>
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

  // Render checkout progress bar
  const renderProgressBar = () => {
    const steps = [
      { id: CheckoutStep.INFORMATION, label: 'Information' },
      { id: CheckoutStep.SHIPPING, label: 'Shipping' },
      { id: CheckoutStep.PAYMENT, label: 'Payment' }
    ];
    
    return (
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step.id ? 'bg-brand-saffron text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span className={`text-sm mt-1 ${
                  currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex-1 flex items-center">
                  <div className={`h-0.5 w-full ${
                    currentStep > step.id ? 'bg-brand-saffron' : 'bg-gray-200'
                  }`} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  // Render order summary for mobile
  const renderMobileOrderSummary = () => {
    return (
      <div className="lg:hidden mb-6">
        <div className="bg-gray-50 border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Order Summary</h2>
            <span className="text-sm text-gray-500">{itemCount} items</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {currentStep >= CheckoutStep.SHIPPING && (
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{formatCurrency(shippingCost)}</span>
              </div>
            )}
            {currentStep >= CheckoutStep.PAYMENT && (
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>{formatCurrency(taxAmount)}</span>
              </div>
            )}
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{formatCurrency(currentStep >= CheckoutStep.PAYMENT ? orderTotal : subtotal + (currentStep >= CheckoutStep.SHIPPING ? shippingCost : 0))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center">Checkout</h1>
      </div>
      
      {currentStep !== CheckoutStep.CONFIRMATION && renderProgressBar()}
      {currentStep !== CheckoutStep.CONFIRMATION && renderMobileOrderSummary()}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {renderStep()}
        </div>
        
        {currentStep !== CheckoutStep.CONFIRMATION && (
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
                {currentStep >= CheckoutStep.SHIPPING && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping ({selectedShipping.name})</span>
                    <span>{formatCurrency(shippingCost)}</span>
                  </div>
                )}
                {currentStep >= CheckoutStep.PAYMENT && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (13%)</span>
                    <span>{formatCurrency(taxAmount)}</span>
                  </div>
                )}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span className="text-brand-brown">{formatCurrency(currentStep >= CheckoutStep.PAYMENT ? orderTotal : subtotal + (currentStep >= CheckoutStep.SHIPPING ? shippingCost : 0))}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {currentStep < CheckoutStep.PAYMENT && "Taxes calculated at next step"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Truck className="h-4 w-4 mr-2 text-gray-500" />
                <span>Free shipping on orders over $75</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <ShieldCheck className="h-4 w-4 mr-2 text-gray-500" />
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
