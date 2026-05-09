'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const RECENT_ORDERS = [
  { id: 'ORD-8X41KP', customer: 'Sarah Johnson', total: 448.00, status: 'delivered', date: 'May 1' },
  { id: 'ORD-7M92QR', customer: 'Michael Chen', total: 119.99, status: 'processing', date: 'May 2' },
  { id: 'ORD-6N33WE', customer: 'Emily Davis', total: 229.50, status: 'shipped', date: 'May 2' },
  { id: 'ORD-5L18YT', customer: 'James Wilson', total: 79.99, status: 'pending', date: 'May 3' },
  { id: 'ORD-4K55ZU', customer: 'Olivia Martinez', total: 514.00, status: 'delivered', date: 'Apr 30' },
];

const STATUS_STYLES = {
  pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-400', label: 'Pending' },
  processing: { bg: 'bg-gray-50', text: 'text-gray-700', dot: 'bg-gray-400', label: 'Processing' },
  shipped: { bg: 'bg-gray-50', text: 'text-gray-700', dot: 'bg-gray-400', label: 'Shipped' },
  delivered: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-400', label: 'Delivered' },
  cancelled: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-400', label: 'Cancelled' },
};

export default function AdminDashboard() {
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => setProductCount(data.length))
      .catch(() => {});
  }, []);

  const stats = [
    { label: 'Total Revenue', value: '$24,590', change: '+12%', up: true, color: 'from-green-500 to-emerald-600', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Active Orders', value: '142', change: '+8%', up: true, color: 'from-gray-500 to-gray-600', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { label: 'Registered Users', value: '892', change: '+3%', up: true, color: 'from-gray-500 to-pink-600', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
    { label: 'Total Products', value: productCount || '20', change: 'In catalog', up: null, color: 'from-orange-500 to-red-600', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${s.color} opacity-10 rounded-bl-3xl`} />
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-sm mb-4`}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={s.icon} />
              </svg>
            </div>
            <p className="text-3xl font-black text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500 font-medium mt-1">{s.label}</p>
            {s.up !== null && (
              <p className={`text-xs font-semibold mt-2 ${s.up ? 'text-green-500' : 'text-red-500'}`}>
                {s.up ? '▲' : '▼'} {s.change} from last month
              </p>
            )}
            {s.up === null && (
              <p className="text-xs text-gray-400 mt-2">{s.change}</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs font-semibold text-gray-600 hover:text-gray-500">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-600">
              <thead>
                <tr className="border-b border-gray-50 text-xs text-gray-400 uppercase font-semibold">
                  <th className="text-left px-6 py-3">Order</th>
                  <th className="text-left px-6 py-3">Customer</th>
                  <th className="text-left px-6 py-3">Amount</th>
                  <th className="text-left px-6 py-3">Status</th>
                  <th className="text-left px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {RECENT_ORDERS.map(order => {
                  const s = STATUS_STYLES[order.status] || STATUS_STYLES.pending;
                  return (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3.5 font-mono text-xs font-bold text-gray-600">{order.id}</td>
                      <td className="px-6 py-3.5 font-medium text-gray-900">{order.customer}</td>
                      <td className="px-6 py-3.5 font-bold text-gray-900">${order.total.toFixed(2)}</td>
                      <td className="px-6 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-full ${s.bg} ${s.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                          {s.label}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-gray-400 text-xs">{order.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { label: 'Manage Products', href: '/admin/products', desc: 'View and edit catalog', color: 'bg-gray-50 text-gray-600', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
              { label: 'View Orders', href: '/admin/orders', desc: 'Track & update orders', color: 'bg-orange-50 text-orange-600', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2' },
              { label: 'Manage Users', href: '/admin/users', desc: 'Customers, sellers & roles', color: 'bg-gray-50 text-gray-600', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
              { label: 'Visit Store', href: '/', desc: 'See the live storefront', color: 'bg-green-50 text-green-600', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
            ].map(a => (
              <Link key={a.label} href={a.href} className="flex items-center gap-4 p-3.5 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className={`w-10 h-10 rounded-xl ${a.color} flex items-center justify-center flex-shrink-0`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={a.icon} />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 group-hover:text-gray-600 transition-colors">{a.label}</p>
                  <p className="text-xs text-gray-400">{a.desc}</p>
                </div>
                <svg className="w-4 h-4 text-gray-300 ml-auto group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
