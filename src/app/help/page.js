'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    q: 'How do I place an order?',
    a: 'Browse our catalog, add items to your cart, and proceed to checkout. You can pay securely using credit card, debit card, or other available payment methods.',
  },
  {
    q: 'Can I change or cancel my order after placing it?',
    a: 'Orders can be modified or cancelled within 1 hour of placement. After that, they may already be processed for shipping. Please contact our support team immediately.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Standard delivery takes 3–5 business days. Express delivery (1–2 business days) is available at checkout for most regions.',
  },
  {
    q: 'What is your return policy?',
    a: 'We offer a 30-day hassle-free return policy. Items must be unused and in original packaging. Refunds are processed within 5–7 business days after we receive the return.',
  },
  {
    q: 'How do I track my order?',
    a: 'Visit the Track Order page and enter your order ID and email address. You\'ll see real-time updates on your shipment status.',
  },
  {
    q: 'Is my payment information secure?',
    a: 'Yes. All transactions are protected with AES-256 bit encryption. We never store your full card details on our servers.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by destination and are shown at checkout.',
  },
  {
    q: 'How do I become a seller on AuraMart?',
    a: 'Register for a seller account from our Sign Up page and select "Seller" as your role. Our team will review your application within 24 hours.',
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 pt-20 pb-28 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-semibold mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Support Center
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            How can we <span className="text-indigo-400">help you?</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Find answers to common questions or reach out to our friendly support team.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-5xl mx-auto px-4 -mt-12 mb-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4', label: 'Track My Order', href: '/track', color: 'indigo' },
            { icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', label: 'Returns & Refunds', href: '#faq', color: 'fuchsia' },
            { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Contact Us', href: '#contact', color: 'emerald' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 flex flex-col items-center text-center gap-3 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl group"
            >
              <div className={`w-14 h-14 rounded-xl bg-${item.color}-50 flex items-center justify-center text-${item.color}-600 group-hover:scale-110 transition-transform`}>
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                </svg>
              </div>
              <span className="font-bold text-slate-800 text-sm">{item.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-4 mb-24">
        <h2 className="text-2xl font-black text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-800 text-sm sm:text-base">{item.q}</span>
                <svg
                  className={`w-5 h-5 text-indigo-500 flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-white border-t border-slate-100 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-3">Still need help?</h2>
          <p className="text-slate-500 mb-10">Our support team is available 7 days a week, 9am–9pm.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'Live Chat', desc: 'Chat with us in real time', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', color: 'indigo' },
              { label: 'Email Support', desc: 'support@auramart.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'fuchsia' },
              { label: 'Phone', desc: '+1 (800) AURA-MART', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', color: 'emerald' },
            ].map((c) => (
              <div key={c.label} className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className={`w-12 h-12 rounded-xl bg-${c.color}-100 flex items-center justify-center text-${c.color}-600`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={c.icon} />
                  </svg>
                </div>
                <p className="font-bold text-slate-800">{c.label}</p>
                <p className="text-sm text-slate-500">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
