'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  FaCube,
  FaSearch,
  FaShoppingBag,
  FaCheck,
  FaBox,
  FaTruck,
  FaHome,
  FaExclamationTriangle,
  FaArrowLeft,
  FaSpinner,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import { OrderProvider, useOrders } from '../context/OrderContext';
import { Order, OrderStatus } from '../lib/types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function OrderTrackingTimeline({ order }: { order: Order }) {
  const allStatuses: { status: OrderStatus; title: string; description: string; icon: React.ReactNode }[] = [
    { status: 'pending', title: 'Order Placed', description: 'Your order has been received', icon: <FaShoppingBag /> },
    { status: 'confirmed', title: 'Order Confirmed', description: 'Seller has confirmed your order', icon: <FaCheck /> },
    { status: 'processing', title: 'Processing', description: 'Your order is being prepared', icon: <FaBox /> },
    { status: 'shipped', title: 'Shipped', description: 'Your order is on the way', icon: <FaTruck /> },
    { status: 'out_for_delivery', title: 'Out for Delivery', description: 'Your order will arrive today', icon: <FaTruck /> },
    { status: 'delivered', title: 'Delivered', description: 'Your order has been delivered', icon: <FaHome /> }
  ];

  if (order.status === 'cancelled') {
    return (
      <div className="p-6 bg-red-50 rounded-2xl border border-red-200">
        <div className="flex items-center space-x-3 text-red-600">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <FaExclamationTriangle className="text-xl" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Order Cancelled</h3>
            <p className="text-sm text-red-500">
              {order.statusHistory.find(h => h.status === 'cancelled')?.note || 'This order has been cancelled'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentIndex = allStatuses.findIndex(s => s.status === order.status);

  return (
    <div className="space-y-0">
      {allStatuses.map((step, index) => {
        const isCompleted = index <= currentIndex;
        const isCurrent = index === currentIndex;
        const historyItem = order.statusHistory.find(h => h.status === step.status);

        return (
          <div key={step.status} className="relative flex items-start">
            {/* Line */}
            {index < allStatuses.length - 1 && (
              <div className={`absolute left-6 top-12 w-0.5 h-16 ${
                index < currentIndex ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
            
            {/* Icon */}
            <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
              isCompleted
                ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30'
                : 'bg-gray-100 text-gray-400'
            } ${isCurrent ? 'ring-4 ring-green-200' : ''}`}>
              {step.icon}
            </div>

            {/* Content */}
            <div className="ml-4 pb-8">
              <h4 className={`font-semibold ${isCompleted ? 'text-[var(--secondary)]' : 'text-gray-400'}`}>
                {step.title}
              </h4>
              <p className={`text-sm ${isCompleted ? 'text-gray-600' : 'text-gray-400'}`}>
                {step.description}
              </p>
              {historyItem && (
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(historyItem.timestamp).toLocaleString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              )}
              {historyItem?.note && (
                <p className="text-xs text-green-600 mt-1 bg-green-50 px-2 py-1 rounded inline-block">
                  {historyItem.note}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const { getOrderById } = useOrders();
  
  const [orderId, setOrderId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const orderParam = searchParams.get('order');
    if (orderParam) {
      setOrderId(orderParam);
      handleSearch(orderParam);
    }
  }, [searchParams]);

  const handleSearch = async (id?: string) => {
    const searchId = id || orderId;
    if (!searchId.trim()) {
      setError('Please enter an order ID');
      return;
    }

    setIsSearching(true);
    setError('');
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const order = getOrderById(searchId.trim());
    if (order) {
      setSearchedOrder(order);
    } else {
      setError('Order not found. Please check the order ID and try again.');
      setSearchedOrder(null);
    }
    
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--secondary)] via-[var(--accent)] to-[var(--secondary)] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Track Your Order
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Enter your order ID to track the status of your delivery in real-time
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Search Box */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Enter Order ID (e.g., ORD-2024-001)"
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                />
              </div>
              <button
                onClick={() => handleSearch()}
                disabled={isSearching}
                className="px-8 py-4 bg-gradient-to-r from-[var(--primary)] to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[var(--primary)]/30 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isSearching ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <FaSearch />
                    <span>Track Order</span>
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center space-x-2">
                <FaExclamationTriangle />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Order Details */}
        {searchedOrder && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Order Header */}
              <div className="bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)] text-white p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">Order #{searchedOrder.id}</h2>
                    <p className="text-white/80">
                      Placed on {new Date(searchedOrder.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                      searchedOrder.status === 'delivered' ? 'bg-green-500 text-white' :
                      searchedOrder.status === 'cancelled' ? 'bg-red-500 text-white' :
                      'bg-white text-[var(--secondary)]'
                    }`}>
                      {searchedOrder.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Order Tracking */}
                  <div>
                    <h3 className="text-xl font-bold text-[var(--secondary)] mb-6">Tracking Status</h3>
                    <OrderTrackingTimeline order={searchedOrder} />
                    
                    {searchedOrder.trackingNumber && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <p className="text-sm text-blue-600 font-medium">Tracking Number</p>
                        <p className="font-mono text-lg text-[var(--secondary)]">
                          {searchedOrder.trackingNumber}
                        </p>
                      </div>
                    )}

                    {searchedOrder.estimatedDelivery && searchedOrder.status !== 'delivered' && searchedOrder.status !== 'cancelled' && (
                      <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                        <p className="text-sm text-green-600 font-medium">Estimated Delivery</p>
                        <p className="font-semibold text-lg text-green-700">
                          {new Date(searchedOrder.estimatedDelivery).toLocaleDateString('en-IN', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Order Details */}
                  <div>
                    <h3 className="text-xl font-bold text-[var(--secondary)] mb-6">Order Details</h3>
                    
                    {/* Items */}
                    <div className="space-y-3 mb-6">
                      {searchedOrder.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-[var(--secondary)]">{item.name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-[var(--secondary)]">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Address */}
                    <div className="p-4 bg-gray-50 rounded-xl mb-4">
                      <h4 className="font-semibold text-[var(--secondary)] mb-2">Shipping Address</h4>
                      <p className="text-gray-600 text-sm">
                        {searchedOrder.userName}<br />
                        {searchedOrder.shippingAddress.street}<br />
                        {searchedOrder.shippingAddress.city}, {searchedOrder.shippingAddress.state}<br />
                        {searchedOrder.shippingAddress.zipCode}<br />
                        {searchedOrder.shippingAddress.country}
                      </p>
                      {searchedOrder.userPhone && (
                        <p className="text-gray-600 text-sm mt-2 flex items-center space-x-2">
                          <FaPhone className="text-gray-400" />
                          <span>{searchedOrder.userPhone}</span>
                        </p>
                      )}
                    </div>

                    {/* Order Total */}
                    <div className="p-4 bg-gradient-to-r from-[var(--primary)]/10 to-pink-500/10 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-[var(--secondary)]">Order Total</span>
                        <span className="text-2xl font-bold text-[var(--primary)]">
                          ₹{searchedOrder.totalAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2 text-sm">
                        <span className="text-gray-500">Payment Method</span>
                        <span className="text-gray-600 capitalize">{searchedOrder.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1 text-sm">
                        <span className="text-gray-500">Payment Status</span>
                        <span className={`capitalize ${
                          searchedOrder.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {searchedOrder.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Need Help */}
                <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-[var(--secondary)] mb-4">Need Help?</h3>
                  <div className="flex flex-col md:flex-row gap-4">
                    <a
                      href="tel:+918920001234"
                      className="flex items-center space-x-3 px-4 py-3 bg-white rounded-xl border border-gray-200 hover:border-[var(--primary)] transition-colors"
                    >
                      <FaPhone className="text-[var(--primary)]" />
                      <div>
                        <p className="font-medium text-[var(--secondary)]">Call Us</p>
                        <p className="text-sm text-gray-500">+91 89200 01234</p>
                      </div>
                    </a>
                    <a
                      href="mailto:support@drcuber.com"
                      className="flex items-center space-x-3 px-4 py-3 bg-white rounded-xl border border-gray-200 hover:border-[var(--primary)] transition-colors"
                    >
                      <FaEnvelope className="text-[var(--primary)]" />
                      <div>
                        <p className="font-medium text-[var(--secondary)]">Email Support</p>
                        <p className="text-sm text-gray-500">support@drcuber.com</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Order Searched Yet */}
        {!searchedOrder && !error && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaTruck className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-[var(--secondary)] mb-2">Track Your Shipment</h3>
              <p className="text-gray-500 mb-6">
                Enter your order ID above to see the current status of your delivery
              </p>
              <p className="text-sm text-gray-400">
                You can find your order ID in your order confirmation email or in your{' '}
                <Link href="/profile" className="text-[var(--primary)] hover:underline">
                  profile orders
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <OrderProvider>
      <TrackOrderContent />
    </OrderProvider>
  );
}
