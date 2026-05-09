'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/store/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, isInitialized, promoCode, discountPercent, applyPromoCode, removePromoCode } = useCart();
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState('');

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const success = applyPromoCode(promoInput);
    if (success) {
      setPromoMessage({ type: 'success', text: `Promo code applied successfully!` });
      setPromoInput('');
    } else {
      setPromoMessage({ type: 'error', text: 'Invalid promo code.' });
    }
  };

  if (!isInitialized) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-gray-600 border-t-transparent animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-sm">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gray-50 mb-6">
            <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-3">Your cart is empty</h2>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            Looks like you haven&apos;t added anything yet. Browse our products and find something you&apos;ll love!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-blue-600/25 transition-all duration-200 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Start Shopping
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 hover:border-gray-300 hover:text-gray-600 font-semibold px-8 py-3 rounded-xl transition-all duration-200 text-sm"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const discountAmount = cartTotal * (discountPercent / 100);
  const subtotalAfterDiscount = cartTotal - discountAmount;
  const shipping = subtotalAfterDiscount > 100 ? 0 : 15;
  const tax = subtotalAfterDiscount * 0.08;
  const finalTotal = subtotalAfterDiscount + shipping + tax;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Shopping Cart</h1>
            <p className="text-sm text-gray-500 mt-1">{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
          </div>
          <Link href="/products" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Cart Items</h2>
                <button
                  onClick={() => cart.forEach(item => removeFromCart(item.id))}
                  className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors"
                >
                  Clear all
                </button>
              </div>

              <ul className="divide-y divide-gray-50">
                {cart.map((item) => (
                  <li key={item.id} className="p-5 sm:p-6 flex gap-4 sm:gap-6 hover:bg-gray-50/50 transition-colors group">
                    {/* Image */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mb-1.5">
                            {item.category}
                          </span>
                          <Link
                            href={`/products/${item.id}`}
                            className="block text-sm sm:text-base font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
                          >
                            {item.title}
                          </Link>
                          <p className="text-sm text-gray-400 mt-0.5">${item.price.toFixed(2)} each</p>
                        </div>
                        <p className="text-base sm:text-lg font-black text-gray-900 flex-shrink-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Qty control */}
                        <div className="inline-flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors text-lg font-bold"
                          >
                            −
                          </button>
                          <span className="w-10 text-center text-sm font-bold text-gray-900 border-x border-gray-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors text-lg font-bold"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Promo code */}
            <div className="mt-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Have a promo code?</h3>
              {promoCode && discountPercent > 0 ? (
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
                  <div className="flex items-center gap-2 text-green-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="font-semibold">{promoCode} applied ({discountPercent}% off)</span>
                  </div>
                  <button onClick={removePromoCode} className="text-xs font-bold text-green-700 hover:text-green-900 transition-colors">
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Enter code (e.g. AURA20)"
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                    />
                    <button onClick={handleApplyPromo} className="px-5 py-2.5 bg-gray-900 hover:bg-blue-600 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap">
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <p className={`mt-2 text-xs font-medium ${promoMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                      {promoMessage.text}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-black text-gray-900 mb-5">Order Summary</h2>

              <div className="space-y-3 text-sm mb-5">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
                  <span className="font-semibold text-gray-900">${cartTotal.toFixed(2)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="font-semibold text-green-600">Free 🎉</span>
                  ) : (
                    <span className="font-semibold text-gray-900">${shipping.toFixed(2)}</span>
                  )}
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                    💡 Add ${(100 - cartTotal).toFixed(2)} more to get free shipping!
                  </p>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-black text-gray-900">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link href="/checkout" className="block">
                <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Proceed to Checkout
                </button>
              </Link>

              {/* Trust badges */}
              <div className="mt-5 pt-5 border-t border-gray-50 grid grid-cols-3 gap-3">
                {[
                  { icon: '🔒', label: 'Secure' },
                  { icon: '↩️', label: 'Easy Returns' },
                  { icon: '⚡', label: 'Fast Delivery' },
                ].map((b) => (
                  <div key={b.label} className="flex flex-col items-center gap-1">
                    <span className="text-lg">{b.icon}</span>
                    <span className="text-[10px] text-gray-400 font-medium text-center">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
