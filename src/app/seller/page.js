'use client';
import Link from 'next/link';

const RECENT_ACTIVITY = [
  { id: 'ORD-8X41KP', desc: 'New order placed', amount: '+$348.00', time: '2 min ago', type: 'order' },
  { id: 'ORD-7M92QR', desc: 'Order shipped', amount: '+$119.99', time: '1 hour ago', type: 'ship' },
  { id: '', desc: 'Low stock alert: Wireless Headphones (3 left)', amount: '', time: '2 hours ago', type: 'alert' },
  { id: 'ORD-6N33WE', desc: 'New order placed', amount: '+$229.50', time: '3 hours ago', type: 'order' },
];

export default function SellerOverview() {
  const stats = [
    { label: "Today's Sales", value: '$1,240.50', change: '+8% from yesterday', up: true, color: 'from-gray-500 to-gray-600', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Pending Orders', value: '12', change: 'Needs fulfillment', up: null, color: 'from-orange-400 to-red-500', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2' },
    { label: 'Active Listings', value: '45', change: 'Across 3 categories', up: null, color: 'from-gray-500 to-cyan-500', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { label: 'Monthly Revenue', value: '$8,420', change: '+15% this month', up: true, color: 'from-green-500 to-emerald-500', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${s.color} opacity-10 rounded-bl-2xl`} />
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3 shadow-sm`}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={s.icon} />
              </svg>
            </div>
            <p className="text-2xl font-black text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 font-medium mt-0.5">{s.label}</p>
            {s.up !== null && (
              <p className="text-xs text-green-500 font-semibold mt-1">▲ {s.change}</p>
            )}
            {s.up === null && (
              <p className="text-xs text-gray-400 mt-1">{s.change}</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
            <Link href="/seller/orders" className="text-xs font-semibold text-gray-600 hover:text-gray-500">View all orders</Link>
          </div>
          <ul className="space-y-3">
            {RECENT_ACTIVITY.map((item, idx) => (
              <li key={idx} className="flex items-center justify-between gap-4 p-3.5 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    item.type === 'order' ? 'bg-gray-50 text-gray-600' :
                    item.type === 'ship' ? 'bg-green-50 text-green-600' :
                    'bg-orange-50 text-orange-600'
                  }`}>
                    {item.type === 'order' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    )}
                    {item.type === 'ship' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                    )}
                    {item.type === 'alert' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.desc}</p>
                    {item.id && <p className="text-xs text-gray-400 font-mono">{item.id}</p>}
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </div>
                </div>
                {item.amount && (
                  <span className="text-sm font-bold text-green-600 flex-shrink-0">{item.amount}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { label: 'Add New Product', href: '/seller/products', desc: 'List a new item', color: 'bg-gray-50 text-gray-600', icon: 'M12 4v16m8-8H4' },
              { label: 'View My Products', href: '/seller/products', desc: 'Manage inventory', color: 'bg-gray-50 text-gray-600', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
              { label: 'Pending Orders', href: '/seller/orders', desc: 'Fulfill customer orders', color: 'bg-orange-50 text-orange-600', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
              { label: 'Back to Store', href: '/', desc: 'Visit the storefront', color: 'bg-green-50 text-green-600', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
            ].map(a => (
              <Link key={a.label} href={a.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className={`w-9 h-9 rounded-xl ${a.color} flex items-center justify-center flex-shrink-0`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={a.icon} />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 group-hover:text-gray-600 transition-colors">{a.label}</p>
                  <p className="text-xs text-gray-400">{a.desc}</p>
                </div>
                <svg className="w-4 h-4 text-gray-300 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
