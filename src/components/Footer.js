'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="bg-slate-950 text-slate-300 font-sans mt-16 overflow-hidden">
      
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl font-black text-white mb-2">Join our AuraMart Insiders</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Subscribe to our newsletter and get 15% off your first premium order. Be the first to know about exclusive collections and drops.</p>
            </div>
            <div className="w-full md:w-auto flex-1 max-w-md">
              <form className="flex w-full relative">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="bg-slate-900 border border-slate-700 text-white px-5 py-4 rounded-xl w-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-slate-500 transition-all shadow-inner pr-36"
                />
                <button className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 rounded-lg font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-6 group">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <span className="text-2xl font-black text-white tracking-tight">
              AuraMart
            </span>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Redefining e-commerce with a curated selection of premium products, cutting-edge design, and unparalleled customer service.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 hover:bg-indigo-600 hover:border-indigo-600 transition-colors flex items-center justify-center text-slate-400 hover:text-white">
              <span className="font-bold">F</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 hover:bg-indigo-600 hover:border-indigo-600 transition-colors flex items-center justify-center text-slate-400 hover:text-white">
              <span className="font-bold">X</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 hover:bg-indigo-600 hover:border-indigo-600 transition-colors flex items-center justify-center text-slate-400 hover:text-white">
              <span className="font-bold">In</span>
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Shop Collections</h3>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><Link href="/products" className="hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-indigo-500 rounded-full opacity-0 hover:opacity-100 transition-opacity"></span> All Products</Link></li>
            <li><Link href="/products?category=Electronics" className="hover:text-indigo-400 transition-colors">Smart Electronics</Link></li>
            <li><Link href="/products?category=Fashion" className="hover:text-indigo-400 transition-colors">Modern Fashion</Link></li>
            <li><Link href="/products?category=Beauty" className="hover:text-indigo-400 transition-colors">Premium Beauty</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Customer Care</h3>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><Link href="/profile" className="hover:text-indigo-400 transition-colors">My Account</Link></li>
            <li><Link href="/profile" className="hover:text-indigo-400 transition-colors">Track Your Order</Link></li>
            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Returns & Exchanges</Link></li>
            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Shipping Information</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Company</h3>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><Link href="#" className="hover:text-indigo-400 transition-colors">About AuraMart</Link></li>
            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Careers</Link></li>
            <li><Link href="/register" className="hover:text-indigo-400 transition-colors text-indigo-400 font-medium">Become a Partner</Link></li>
            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Sustainability</Link></li>
          </ul>
        </div>
      </div>

      {/* Very Bottom Copyright */}
      <div className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AuraMart Inc. All rights reserved.</p>
          <div className="flex gap-6 font-medium">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
