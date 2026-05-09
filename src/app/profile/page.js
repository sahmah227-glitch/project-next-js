'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/store/AuthContext';
import { orderService } from '@/services/orderService';
import { useRouter } from 'next/navigation';

const MOCK_ORDERS = [
  { id: 'ORD-8X41KP', date: '2026-05-01', total: 448.00, status: 'delivered', items: 'Sony WH-1000XM5 + Apple Watch Series 9' },
  { id: 'ORD-7M92QR', date: '2026-05-02', total: 119.99, status: 'processing', items: 'Samsung T7 Portable SSD 1TB' },
  { id: 'ORD-6N33WE', date: '2026-05-02', total: 229.50, status: 'shipped', items: 'Logitech MX Master 3S x2 + Candle Set' },
];

const STATUS_STYLES = {
  processing: { bg: 'bg-gray-50', text: 'text-gray-700', label: 'Processing' },
  shipped: { bg: 'bg-gray-50', text: 'text-gray-700', label: 'Shipped' },
  delivered: { bg: 'bg-green-50', text: 'text-green-700', label: 'Delivered' },
  cancelled: { bg: 'bg-red-50', text: 'text-red-700', label: 'Cancelled' },
};

export default function ProfilePage() {
  const { user, updateUser, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.email) {
        try {
          const data = await orderService.getUserOrders(user.email);
          setOrders(data);
        } catch (err) {
          console.error(err);
        } finally {
          setOrdersLoading(false);
        }
      }
    };
    fetchOrders();
  }, [user?.email]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const [saved, setSaved] = useState(false);

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-sm">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gray-50 mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-3">Sign in to view your profile</h2>
          <p className="text-gray-500 text-sm mb-8">Access your orders, settings, and more.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login" className="inline-flex items-center justify-center bg-gradient-to-r from-gray-600 to-gray-600 hover:from-gray-500 hover:to-gray-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg transition-all text-sm">
              Sign In
            </Link>
            <Link href="/register" className="inline-flex items-center justify-center border border-gray-200 text-gray-700 hover:border-gray-300 hover:text-gray-600 font-semibold px-8 py-3 rounded-xl transition-all text-sm">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const handleSave = (e) => {
    e.preventDefault();
    updateUser(formData);
    setEditMode(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-gray-900 mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
              {/* Avatar */}
              <div className="relative inline-block mb-4">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-2xl object-cover mx-auto" />
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center text-white text-3xl font-black mx-auto">
                    {initials}
                  </div>
                )}
                <span className={`absolute -bottom-2 -right-2 px-2 py-0.5 text-[10px] font-bold rounded-full uppercase ${
                  user.role === 'seller' ? 'bg-gray-100 text-gray-700' :
                  user.role === 'admin' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {user.role}
                </span>
              </div>
              <h2 className="text-xl font-black text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500 mt-1 mb-5">{user.email}</p>

              {/* Quick Links */}
              <div className="space-y-2">
                {user.role === 'seller' && (
                  <Link href="/seller" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-600 rounded-xl transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Seller Dashboard
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    </svg>
                    Admin Panel
                  </Link>
                )}
                <Link href="/products" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-600 rounded-xl transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Browse Products
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900">Personal Information</h3>
                <button
                  onClick={() => { setEditMode(!editMode); setSaved(false); }}
                  className="text-sm font-semibold text-gray-600 hover:text-gray-500 transition-colors"
                >
                  {editMode ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {saved && (
                <div className="mb-4 flex items-center gap-2 bg-green-50 text-green-600 px-4 py-3 rounded-xl text-sm border border-green-100">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Profile updated successfully!
                </div>
              )}

              {editMode ? (
                <form onSubmit={handleSave} className="space-y-4">
                  {[
                    { label: 'Full Name', key: 'name', type: 'text' },
                    { label: 'Email Address', key: 'email', type: 'email' },
                    { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '+1 (555) 000-0000' },
                    { label: 'Shipping Address', key: 'address', type: 'text', placeholder: '123 Main St, City, Country' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                      <input
                        type={f.type}
                        value={formData[f.key]}
                        onChange={e => setFormData({...formData, [f.key]: e.target.value})}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-50 focus:bg-white transition-colors"
                      />
                    </div>
                  ))}
                  <div className="flex gap-3 pt-2">
                    <button type="submit" className="px-6 py-2.5 bg-gray-600 hover:bg-gray-700 text-white text-sm font-bold rounded-xl transition-colors">
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { label: 'Full Name', value: user.name },
                    { label: 'Email', value: user.email },
                    { label: 'Phone', value: user.phone || 'Not set' },
                    { label: 'Address', value: user.address || 'Not set' },
                    { label: 'Account Type', value: user.role?.charAt(0).toUpperCase() + user.role?.slice(1) },
                    { label: 'Member Since', value: '2026' },
                  ].map(item => (
                    <div key={item.label}>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{item.label}</p>
                      <p className="text-sm font-medium text-gray-800">{item.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order History */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-5">Recent Orders</h3>
              <div className="space-y-3">
                {ordersLoading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400 text-sm animate-pulse">Loading orders...</p>
                  </div>
                ) : orders.length > 0 ? (
                  orders.map(order => {
                    const s = STATUS_STYLES[order.status] || STATUS_STYLES.processing;
                    return (
                      <div key={order._id || order.orderId} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-50/30 transition-colors">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs font-bold text-gray-600">{order.orderId}</span>
                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${s.bg} ${s.text}`}>{s.label}</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{order.items}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-lg font-black text-gray-900">${order.total.toFixed(2)}</p>
                          <button className="text-xs text-gray-600 font-semibold hover:underline mt-0.5">View Details</button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-sm italic">No orders found yet.</p>
                  </div>
                )}
              </div>
              <Link href="/products" className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-500 transition-colors py-3 border border-dashed border-gray-200 rounded-xl hover:border-gray-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
