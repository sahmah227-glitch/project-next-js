'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import ProductSkeleton from '@/components/ProductSkeleton';
import { productService } from '@/services/productService';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  const featured = products.slice(0, 8);

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* ── Premium Hero Section ───────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-premium pt-24 pb-32">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float-delayed"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-100 text-indigo-800 text-sm font-bold shadow-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                </span>
                New Collection 2026
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
                Elevate Your <br className="hidden sm:block" />
                <span className="text-gradient">Everyday Style.</span>
              </h1>
              
              <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Discover the perfect blend of luxury and functionality. Shop our curated collection of premium electronics, fashion, and modern home essentials.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link href="/products" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2 group">
                  Explore Collection
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
                <Link href="/offers" className="glass hover:bg-white text-slate-800 px-8 py-4 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 border border-slate-200">
                  View Exclusive Offers
                </Link>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden glass p-4 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                 <img src="https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Premium Promo" className="object-cover w-full h-full rounded-2xl" />
                 <div className="absolute -bottom-6 -left-6 glass-dark text-white p-6 rounded-2xl shadow-2xl animate-float">
                   <p className="text-sm font-medium text-slate-300 mb-1">Limited Time</p>
                   <p className="text-3xl font-black text-gradient-light">Up to 50% Off</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Premium Categories ───────────────────────────── */}
      <section className="py-20 relative z-20 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Smart Electronics', category: 'Electronics', img: 'https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=800' },
              { label: 'Minimalist Home',    category: 'Home',        img: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800' },
              { label: 'Premium Beauty',     category: 'Beauty',      img: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=800' },
              { label: 'Modern Fashion',     category: 'Fashion',     img: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800' },
            ].map((cat) => (
              <Link key={cat.category} href={`/products?category=${cat.category}`} className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <img src={cat.img} alt={cat.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex items-end p-6">
                  <div>
                    <span className="block text-white font-black text-xl mb-1">{cat.label}</span>
                    <span className="text-sm text-indigo-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                      Shop Now <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ───────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12 border-b border-slate-100 pb-6 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">Trending Now</h2>
              <p className="text-slate-500 font-medium">Discover what's capturing everyone's attention.</p>
            </div>
            <Link href="/products" className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors flex items-center gap-1 bg-indigo-50 px-4 py-2 rounded-full">
              View All Products &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading 
              ? Array.from({length: 8}).map((_, i) => <ProductSkeleton key={i} />)
              : featured.map(product => <ProductCard key={product.id} product={product} />)
            }
          </div>
        </div>
      </section>

      {/* ── Value Proposition ───────────────────────────── */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Why Choose AuraMart?</h2>
            <p className="text-slate-400 font-medium max-w-2xl mx-auto">Experience shopping the way it was meant to be—fast, secure, and luxurious.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-dark p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h4 className="font-black text-white text-lg mb-2">Secure Checkout</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Your data is protected with military-grade encryption ensuring a safe transaction every time.</p>
            </div>
            <div className="glass-dark p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-fuchsia-500/20 text-fuchsia-400 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
              </div>
              <h4 className="font-black text-white text-lg mb-2">Express Delivery</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Get your items faster with our global network of fulfillment centers and premium couriers.</p>
            </div>
            <div className="glass-dark p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </div>
              <h4 className="font-black text-white text-lg mb-2">Easy Returns</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Not satisfied? Return it within 30 days hassle-free. We believe in complete customer satisfaction.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
