'use client';
import { useState, useEffect } from 'react';
import { orderService } from '@/services/orderService';

const MOCK_ORDERS = [
  { id: 'ORD-8X41KP', product: 'Sony WH-1000XM5 Headphones', qty: 1, total: 348.00, status: 'delivered', date: '2026-05-01' },
  { id: 'ORD-7M92QR', product: 'Samsung T7 Portable SSD 1TB', qty: 1, total: 119.99, status: 'processing', date: '2026-05-02' },
  { id: 'ORD-6N33WE', product: 'Logitech MX Master 3S Mouse', qty: 2, total: 198.00, status: 'shipped', date: '2026-05-02' },
];

const STATUS_STYLES = {
  pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', label: 'Pending' },
  processing: { bg: 'bg-gray-50', text: 'text-gray-700', label: 'Processing' },
  shipped: { bg: 'bg-gray-50', text: 'text-gray-700', label: 'Shipped' },
  delivered: { bg: 'bg-green-50', text: 'text-green-700', label: 'Delivered' },
  cancelled: { bg: 'bg-red-50', text: 'text-red-700', label: 'Cancelled' },
};

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getAllOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const stats = [
    { label: "Total Revenue", value: `$${orders.filter(o => o.status !== 'cancelled').reduce((a, o) => a + o.total, 0).toFixed(2)}`, color: 'bg-green-50 text-green-600', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: "Total Orders", value: orders.length, color: 'bg-gray-50 text-gray-600', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { label: "Processing", value: orders.filter(o => o.status === 'processing').length, color: 'bg-yellow-50 text-yellow-600', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: "Delivered", value: orders.filter(o => o.status === 'delivered').length, color: 'bg-gray-50 text-gray-600', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={s.icon} />
              </svg>
            </div>
            <p className="text-2xl font-black text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 font-medium mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50">
          <h2 className="font-bold text-gray-900">My Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Qty</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map(order => {
                const s = STATUS_STYLES[order.status];
                return (
                  <tr key={order._id || order.orderId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-bold text-gray-700">{order.orderId}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 max-w-[200px] line-clamp-1">{order.items}</td>
                    <td className="px-6 py-4">{order.qty || 1}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">${(order.total || 0).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${s.bg} ${s.text}`}>
                        {s.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
