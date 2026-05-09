'use client';
import Link from 'next/link';
import { dummyProducts } from '@/services/dummyData';

const deals = dummyProducts
  .filter((p) => p.price < 100)
  .slice(0, 8)
  .map((p) => ({ ...p, originalPrice: (p.price * 1.35).toFixed(2), discount: '26% OFF' }));

export default function OffersPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-fuchsia-700 pt-20 pb-32">
        <div className="absolute top-0 left-0 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 border border-white/30 text-white text-sm font-bold mb-6 backdrop-blur-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Limited Time Deals
          </span>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4 leading-tight">
            Exclusive Offers
          </h1>
          <p className="text-indigo-100 text-lg max-w-xl mx-auto">
            Handpicked deals on premium products — updated daily. Don't miss out.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 px-5 py-3 bg-white/10 border border-white/20 rounded-2xl text-white font-bold text-sm backdrop-blur-sm">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-ping" />
            Use code <span className="text-yellow-300 font-black ml-1">AURA26</span> for extra 20% off
          </div>
        </div>
      </section>

      {/* Promo Banners */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 mb-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Free Shipping', sub: 'On orders over $50', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8', color: 'bg-indigo-600' },
            { label: 'Up to 50% Off', sub: 'Selected categories', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z', color: 'bg-fuchsia-600' },
            { label: '30-Day Returns', sub: 'No questions asked', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', color: 'bg-emerald-600' },
          ].map((b) => (
            <div key={b.label} className={`${b.color} rounded-2xl p-5 flex items-center gap-4 text-white shadow-lg`}>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={b.icon} />
                </svg>
              </div>
              <div>
                <p className="font-black text-base">{b.label}</p>
                <p className="text-white/80 text-xs">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deals Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-slate-900">Today's Best Deals</h2>
          <Link href="/products" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-4 py-2 rounded-full transition-colors">
            Browse All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="relative aspect-square bg-slate-50 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-black px-2 py-1 rounded-full shadow">
                  {product.discount}
                </span>
              </div>
              <div className="p-4">
                <p className="text-xs text-indigo-500 font-semibold uppercase tracking-wide mb-1">{product.category}</p>
                <h3 className="text-slate-800 font-bold text-sm leading-snug mb-3 line-clamp-2">{product.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black text-slate-900">${product.price}</span>
                  <span className="text-sm text-slate-400 line-through">${product.originalPrice}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
