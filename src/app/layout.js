import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/store/AuthContext";
import { CartProvider } from "@/store/CartContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

export const metadata = {
  title: {
    template: '%s | AuraMart',
    default: 'AuraMart | Premium Essentials & Fast Delivery',
  },
  description: 'Shop the best premium electronics, fashion, and accessories. Fast delivery, secure payments, and exceptional customer service.',
  openGraph: {
    title: 'AuraMart | Premium Essentials',
    description: 'Shop the best premium essentials. Fast delivery and exceptional service.',
    url: 'https://auramart.com',
    siteName: 'AuraMart',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-100 text-gray-900">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
