'use client';
import { useState, useEffect } from 'react';

const MOCK_ORDERS = [
  { id: 'ORD-8X41KP', date: '2026-05-01', total: 448.00, status: 'delivered', items: 'Sony WH-1000XM5 + Apple Watch Series 9', customerEmail: 'customer@example.com' },
  { id: 'ORD-7M92QR', date: '2026-05-02', total: 119.99, status: 'processing', items: 'Samsung T7 Portable SSD 1TB', customerEmail: 'customer@example.com' },
  { id: 'ORD-6N33WE', date: '2026-05-02', total: 229.50, status: 'shipped', items: 'Logitech MX Master 3S x2 + Candle Set', customerEmail: 'customer@example.com' },
];

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        setOrders(MOCK_ORDERS);
      }
    } else {
      setOrders(MOCK_ORDERS);
      localStorage.setItem('orders', JSON.stringify(MOCK_ORDERS));
    }
    setIsInitialized(true);
  }, []);

  const addOrder = (orderData) => {
    const newOrder = {
      id: 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      date: new Date().toISOString().split('T')[0],
      status: 'processing',
      ...orderData
    };
    
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    return newOrder;
  };

  const getUserOrders = (email) => {
    return orders.filter(order => order.customerEmail === email);
  };

  return {
    orders,
    addOrder,
    getUserOrders,
    isInitialized
  };
}
