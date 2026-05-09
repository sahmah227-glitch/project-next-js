'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/store/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const fullStars = Math.floor(product.rating || 4);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const fallbackImg = `https://placehold.co/400x400/f1f5f9/94a3b8?text=${encodeURIComponent(product.category || 'Product')}`;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group h-full border border-slate-100 relative">
      
      {/* Sale Badge */}
      <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm text-slate-900 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-sm border border-slate-100">
        Sale
      </div>

      {/* Product Image */}
      <div className="relative w-full aspect-[4/3] bg-slate-50 overflow-hidden flex items-center justify-center p-6">
        <Link href={`/products/${product.id}`} className="w-full h-full flex items-center justify-center">
          <img
            src={imgError ? fallbackImg : product.image}
            alt={product.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-in-out mix-blend-multiply"
          />
        </Link>
        
        {/* Quick View Overlay (Visual only) */}
        <div className="absolute inset-0 bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <div className="bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-4 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
            Quick View
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col p-5 bg-white">
        
        {/* Category & Rating Row */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded-full">
            {product.category || 'Premium'}
          </span>
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-bold text-slate-600">{product.rating || '4.5'}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm font-bold text-slate-900 mb-1 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-relaxed h-10">
            {product.title}
          </h3>
        </Link>

        {/* Price & CTA */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-black text-slate-900 leading-none">${Math.floor(product.price)}</span>
            <span className="text-xs text-slate-400 line-through mt-1">${Math.floor(product.price * 1.3)}</span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={added}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
              added 
                ? 'bg-emerald-500 text-white scale-110 shadow-emerald-500/30' 
                : 'bg-slate-900 text-white hover:bg-indigo-600 hover:scale-110 hover:shadow-indigo-500/30'
            }`}
            aria-label="Add to cart"
          >
            {added ? (
              <svg className="w-5 h-5 animate-scale-in" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
