'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/store/AuthContext';
import { useCart } from '@/store/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount, isInitialized } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('mousedown', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setUserMenuOpen(false);
  }, [pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  if (pathname?.startsWith('/admin')) return null;

  const isSeller = user?.role === 'seller';

  return (
    <>
      {/* ── Top Announcement Bar ────────────────────── */}
      <div className="bg-slate-900 py-2 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center sm:justify-between items-center text-xs text-slate-300 font-medium">
          <p>Elevate your lifestyle with our exclusive <span className="font-bold text-white">Summer Collection</span>. Use code <span className="text-indigo-400 font-black tracking-wider">AURA26</span> for 20% off.</p>
          <div className="hidden sm:flex items-center gap-6">
            <Link href="/help" className="hover:text-white transition-colors">Help Center</Link>
            <Link href="/track" className="hover:text-white transition-colors">Track Order</Link>
          </div>
        </div>
      </div>

      {/* ── Main Navigation ────────────────────── */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-white border-b border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4 sm:gap-8">
            
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                AuraMart
              </span>
            </Link>

            {/* Premium Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl relative mx-4">
              <div className="flex w-full relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-100 text-slate-900 rounded-full focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none text-sm transition-all shadow-inner border border-transparent focus:border-indigo-200"
                  placeholder="Search for premium products, brands, and more..."
                />
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
              
              {/* User Account */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-slate-50"
                >
                  <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <div className="hidden lg:flex flex-col items-start text-left">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider leading-none">Welcome</span>
                    <span className="text-sm font-bold leading-tight text-slate-900">{user ? user.name.split(' ')[0] : 'Sign In'}</span>
                  </div>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white/90 backdrop-blur-xl border border-slate-100 shadow-2xl rounded-2xl py-3 z-50 text-slate-800 animate-fade-in-up">
                    {user ? (
                      <>
                        <div className="px-5 py-3 border-b border-slate-100 mb-2">
                          <p className="text-sm font-black text-slate-900">{user.name}</p>
                          <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
                          {isSeller && (
                            <span className="inline-block mt-2 px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100">
                              Seller Account
                            </span>
                          )}
                        </div>
                        <Link href="/profile" className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium hover:bg-slate-50 hover:text-indigo-600 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                          Your Account
                        </Link>
                        <Link href="/profile" className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium hover:bg-slate-50 hover:text-indigo-600 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                          Your Orders
                        </Link>
                        {isSeller && (
                          <Link href="/seller" className="flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-indigo-600 hover:bg-indigo-50 transition-colors">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                             Seller Dashboard
                          </Link>
                        )}
                        <div className="border-t border-slate-100 mt-2 pt-2">
                          <button
                            onClick={logout}
                            className="w-full flex items-center gap-3 text-left px-5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                            Sign out
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="px-5 flex flex-col gap-3 text-center py-2">
                        <Link href="/login"
                          className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md transition-all"
                        >
                          Sign in
                        </Link>
                        <p className="text-xs text-slate-500 mt-1">
                          Don't have an account?{' '}
                          <Link href="/register" className="font-bold text-indigo-600 hover:text-indigo-700">
                            Sign up
                          </Link>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link href="/cart" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-slate-50">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  {isInitialized && cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white font-black text-[10px] w-5 h-5 flex items-center justify-center text-center rounded-full border-2 border-white shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="font-bold text-sm hidden lg:block text-slate-900">Cart</span>
              </Link>

            </div>
          </div>
        </div>
        
        {/* ── Sub Navigation ────────────────────── */}
        <div className="bg-white border-t border-slate-100 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-8 py-3 text-sm font-semibold text-slate-600">
            <Link href="/products" className="hover:text-indigo-600 transition-colors">All Categories</Link>
            <Link href="/products?category=Electronics" className="hover:text-indigo-600 transition-colors">Smart Electronics</Link>
            <Link href="/products?category=Fashion" className="hover:text-indigo-600 transition-colors">Modern Fashion</Link>
            <Link href="/products?category=Beauty" className="hover:text-indigo-600 transition-colors">Premium Beauty</Link>
            <Link href="/products?category=Home" className="hover:text-indigo-600 transition-colors">Home & Living</Link>
            <div className="flex-1"></div>
            <Link href="/offers" className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Exclusive Deals
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
