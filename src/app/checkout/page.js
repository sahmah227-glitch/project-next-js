'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/store/CartContext';
import { useAuth } from '@/store/AuthContext';
import { orderService } from '@/services/orderService';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, isInitialized, discountPercent } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    country: 'United States'
  });
  
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);

  const discountAmount = cartTotal * (discountPercent / 100);
  const subtotalAfterDiscount = cartTotal - discountAmount;
  const shipping = subtotalAfterDiscount > 100 ? 0 : 15;
  const tax = subtotalAfterDiscount * 0.08;
  const finalTotal = subtotalAfterDiscount + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call for payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create the order data
    const orderItemsNames = cart.map(item => item.title).join(' + ');
    const orderData = {
      items: orderItemsNames,
      total: finalTotal,
      customerEmail: formData.email || user?.email || 'guest@example.com',
      shippingDetails: formData,
      paymentMethod: paymentMethod,
      cart: cart
    };

    // Save order
    try {
      const order = await orderService.placeOrder(orderData);
      
      clearCart();
      setIsProcessing(false);
      
      router.push(`/order-success?orderId=${order.orderId}`);
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
      alert('Failed to place order. Please try again.');
    }
  };

  useEffect(() => {
    if (isInitialized && cart.length === 0) {
      router.push('/cart');
    }
  }, [isInitialized, cart.length, router]);

  if (!isInitialized) return null;
  if (cart.length === 0) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-10">Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-12">
          {/* Checkout Form */}
          <div className="w-full lg:w-2/3 space-y-8">
            
            {/* Shipping Address */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input required label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                <Input required label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                <div className="sm:col-span-2">
                  <Input required label="Email Address" type="email" name="email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="sm:col-span-2">
                  <Input required label="Street Address" name="address" value={formData.address} onChange={handleInputChange} />
                </div>
                <Input required label="City" name="city" value={formData.city} onChange={handleInputChange} />
                <Input required label="ZIP / Postal Code" name="zip" value={formData.zip} onChange={handleInputChange} />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
              <div className="space-y-4">
                {/* Credit Card Option */}
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'credit-card' ? 'border-gray-600 bg-gray-50/50' : 'border-gray-200'}`}>
                  <input type="radio" name="payment" value="credit-card" checked={paymentMethod === 'credit-card'} onChange={() => setPaymentMethod('credit-card')} className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300" />
                  <div className="ml-4 flex-1 flex justify-between items-center">
                    <span className="font-medium text-gray-900">Credit Card (Stripe)</span>
                    <div className="flex space-x-2">
                      <div className="w-10 h-6 bg-gray-200 rounded"></div>
                      <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </label>
                
                {/* Stripe Simulated Inputs */}
                {paymentMethod === 'credit-card' && (
                  <div className="pl-8 pr-4 py-4 grid grid-cols-2 gap-4 animate-fade-in">
                    <div className="col-span-2">
                      <Input label="Card Number" placeholder="0000 0000 0000 0000" />
                    </div>
                    <Input label="Expiry Date" placeholder="MM/YY" />
                    <Input label="CVC" placeholder="123" />
                  </div>
                )}

                {/* PayPal Option */}
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'paypal' ? 'border-gray-600 bg-gray-50/50' : 'border-gray-200'}`}>
                  <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300" />
                  <div className="ml-4 flex-1 flex justify-between items-center">
                    <span className="font-medium text-gray-900">PayPal</span>
                    <div className="font-bold text-gray-800 italic">PayPal</div>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="max-h-60 overflow-y-auto mb-6 pr-2 divide-y divide-gray-100">
                {cart.map(item => (
                  <div key={item.id} className="py-3 flex justify-between">
                    <div className="flex-1 pr-4">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.title}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 text-sm text-gray-600 mb-6 border-t border-gray-100 pt-6">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p className="font-medium text-gray-900">${cartTotal.toFixed(2)}</p>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <p>Discount ({discountPercent}%)</p>
                    <p>-${discountAmount.toFixed(2)}</p>
                  </div>
                )}
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p className="font-medium text-gray-900">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</p>
                </div>
                <div className="flex justify-between">
                  <p>Tax</p>
                  <p className="font-medium text-gray-900">${tax.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-8 border-t border-gray-100 pt-6">
                <p className="text-lg font-bold text-gray-900">Total</p>
                <p className="text-2xl font-extrabold text-gray-600">${finalTotal.toFixed(2)}</p>
              </div>
              
              <Button type="submit" loading={isProcessing} fullWidth className="py-4 text-base shadow-lg shadow-gray-200">
                Place Order
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
