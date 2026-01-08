'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FaCube,
  FaArrowLeft,
  FaInstagram,
  FaShoppingBag
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/#products');
    }
  }, [cart, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address || !customerInfo.city) {
      alert('Please fill in all required fields');
      return;
    }

    // Create order details message for Instagram
    const orderDetails = cart.map(item => 
      `${item.name} x ${item.quantity} - ₹${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    const message = `Hi! I'd like to order:\n\n${orderDetails}\n\nTotal: ₹${totalPrice.toLocaleString()}\n\nDelivery Details:\nName: ${customerInfo.name}\nPhone: ${customerInfo.phone}\nAddress: ${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state} ${customerInfo.zipCode}`;

    // Encode message for Instagram DM
    const encodedMessage = encodeURIComponent(message);
    
    // Open Instagram DM (note: Instagram doesn't support pre-filled messages in DMs via URL)
    // Instead, we'll copy the message to clipboard and redirect to Instagram
    navigator.clipboard.writeText(message).then(() => {
      alert('Order details copied to clipboard! Please paste this message when you reach our Instagram page.');
      // Redirect to Instagram profile
      window.open('https://www.instagram.com/drcuberofficial/', '_blank');
      clearCart();
      router.push('/');
    }).catch(() => {
      alert('Please copy the order details manually and send them to @drcuberofficial on Instagram.');
      console.log('Order details:', message);
    });
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[var(--primary)] rounded-xl flex items-center justify-center">
                <FaCube className="text-xl text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-[var(--primary)]">DR.</span>CUBER
              </span>
            </Link>
            <Link href="/" className="text-white/80 hover:text-white transition-colors flex items-center space-x-2">
              <FaArrowLeft />
              <span>Back to Store</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--secondary)] mb-4">
            Complete Your Order
          </h1>
          <p className="text-gray-600">
            Fill in your details and we'll redirect you to our Instagram to complete your order
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-[var(--secondary)] mb-6">
              Delivery Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <textarea
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 resize-none"
                  placeholder="123 Main Street, Apartment 4B"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.city}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                    placeholder="Mumbai"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.state}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, state: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                    placeholder="Maharashtra"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={customerInfo.zipCode}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, zipCode: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                  placeholder="400001"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  <FaInstagram className="text-2xl" />
                  <span>Continue to Instagram</span>
                </button>
                <p className="text-xs text-gray-500 text-center mt-3">
                  Your order details will be copied. Paste them in Instagram DM to @drcuberofficial
                </p>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
              <h3 className="font-bold text-[var(--secondary)] mb-4 flex items-center space-x-2">
                <FaShoppingBag className="text-[var(--primary)]" />
                <span>Order Summary</span>
              </h3>

              <div className="space-y-4 mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-[var(--secondary)] text-sm">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-[var(--secondary)]">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">To be confirmed</span>
                </div>
              </div>

              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl text-[var(--primary)]">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start space-x-3">
                  <FaInstagram className="text-blue-600 text-xl mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-1">
                      Order via Instagram
                    </p>
                    <p className="text-xs text-blue-700">
                      We'll copy your order details and redirect you to our Instagram. Simply paste and send!
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-600 text-center">
                  📱 Follow us: <a href="https://www.instagram.com/drcuberofficial/" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] font-semibold hover:underline">@drcuberofficial</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
