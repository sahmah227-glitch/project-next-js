'use client';
import { useState } from 'react';
import { useOrders } from '@/hooks/useOrders';

const MOCK = {
  'AURA-1001': {
    id: 'AURA-1001', date: 'May 5, 2026', total: '$447.99',
    status: 'Out for Delivery', eta: 'Today by 8 PM',
    items: ['Sony WH-1000XM5 Headphones', 'Logitech MX Master 3S Mouse'],
    steps: [
      { label: 'Order Placed',      done: true,  time: 'May 5 – 9:00 AM' },
      { label: 'Payment Confirmed', done: true,  time: 'May 5 – 9:05 AM' },
      { label: 'Packed & Shipped',  done: true,  time: 'May 6 – 2:00 PM' },
      { label: 'Out for Delivery',  done: true,  time: 'May 8 – 8:30 AM' },
      { label: 'Delivered',         done: false, time: 'Estimated Today'  },
    ],
  },
};

export default function TrackOrderPage() {
  const { orders } = useOrders();
  const [orderId, setOrderId] = useState('');
  const [email, setEmail]     = useState('');
  const [result, setResult]   = useState(null);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); setResult(null); setLoading(true);
    setTimeout(() => {
      // Check MOCK first for demo compatibility
      let order = MOCK[orderId.trim().toUpperCase()];
      
      // If not in MOCK, check real orders
      if (!order) {
        const realOrder = orders.find(o => o.id.toUpperCase() === orderId.trim().toUpperCase());
        if (realOrder) {
          order = {
            id: realOrder.id,
            date: realOrder.date,
            total: `$${realOrder.total.toFixed(2)}`,
            status: realOrder.status.charAt(0).toUpperCase() + realOrder.status.slice(1),
            eta: '3-5 Business Days',
            items: realOrder.items.split(' + '),
            steps: [
              { label: 'Order Placed',      done: true,  time: realOrder.date },
              { label: 'Payment Confirmed', done: true,  time: realOrder.date },
              { label: 'Processing',        done: true,  time: 'In Progress' },
              { label: 'Shipped',           done: false, time: 'Pending' },
              { label: 'Delivered',         done: false, time: 'Pending' },
            ],
          };
        }
      }

      if (order) setResult(order);
      else setError('No order found. Please check your order ID and try again.');
      setLoading(false);
    }, 900);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 pt-20 pb-28 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply blur-3xl opacity-20" />
        <div className="max-w-2xl mx-auto px-4 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-semibold mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
            </svg>
            Order Tracking
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Track Your Order</h1>
          <p className="text-slate-400 text-lg">Enter your order ID to get real-time shipping updates.</p>
        </div>
      </section>

      {/* Form Card */}
      <section className="max-w-xl mx-auto px-4 -mt-14 mb-16 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Order ID</label>
              <input
                type="text" required value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. AURA-1001"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input
                type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all"
              />
            </div>
            <button
              type="submit" disabled={loading}
              className="w-full bg-slate-900 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> Tracking...</>
              ) : 'Track Order'}
            </button>
          </form>
          {error && (
            <div className="mt-5 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 font-medium">
              {error}
            </div>
          )}
        </div>
      </section>

      {/* Result */}
      {result && (
        <section className="max-w-2xl mx-auto px-4 mb-24 space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 pb-4 border-b border-slate-100">
              {[
                { label: 'Order ID',   value: result.id },
                { label: 'Date',       value: result.date },
                { label: 'Total',      value: result.total },
                { label: 'Status',     value: result.status, badge: true },
              ].map((f) => (
                <div key={f.label}>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">{f.label}</p>
                  {f.badge
                    ? <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black">{f.value}</span>
                    : <p className="font-bold text-slate-800 text-sm">{f.value}</p>}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-2">Items</p>
            <ul className="space-y-1">
              {result.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />{item}
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <h2 className="font-black text-slate-900 mb-6 text-lg">Shipment Timeline</h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100" />
              <div className="space-y-6">
                {result.steps.map((step, i) => (
                  <div key={i} className="relative flex items-start gap-6 pl-10">
                    <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm border-2 z-10 ${step.done ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-200'}`}>
                      {step.done
                        ? <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        : <span className="w-2 h-2 bg-slate-300 rounded-full" />}
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${step.done ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center gap-3">
              <svg className="w-5 h-5 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-semibold text-indigo-700">
                Estimated delivery: <span className="font-black">{result.eta}</span>
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
