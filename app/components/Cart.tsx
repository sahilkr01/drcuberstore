'use client';

import React from 'react';
import Link from 'next/link';
import { FaTimes, FaPlus, FaMinus, FaTrash, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <section id="cart" className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center py-12 md:py-16 lg:py-20">
            <FaShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Add some awesome products to your cart!</p>
            <a href="#products" className="btn-primary inline-block">
              Continue Shopping
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="cart" className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--secondary)]">
            Your <span className="text-[var(--primary)]">Cart</span>
          </h2>
          <button
            onClick={clearCart}
            className="text-gray-500 hover:text-red-500 transition-colors flex items-center space-x-2"
          >
            <FaTrash />
            <span>Clear All</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div
                key={item.id}
                className="bg-[var(--light-bg)] rounded-xl p-4 flex gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-[var(--secondary)]">{item.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-[var(--primary)] transition-colors"
                      >
                        <FaMinus className="text-xs" />
                      </button>
                      <span className="font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-[var(--primary)] transition-colors"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>
                    <span className="font-bold text-[var(--primary)] text-lg">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-[var(--light-bg)] rounded-xl p-6 h-fit">
            <h3 className="text-xl font-bold text-[var(--secondary)] mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-[var(--success)]">Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (18% GST)</span>
                <span>₹{Math.round(totalPrice * 0.18)}</span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-xl font-bold text-[var(--secondary)]">
                  <span>Total</span>
                  <span>₹{totalPrice + Math.round(totalPrice * 0.18)}</span>
                </div>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--primary)]"
                />
                <button className="btn-secondary">Apply</button>
              </div>
            </div>

            <Link href="/checkout" className="btn-primary w-full py-4 text-lg block text-center">
              Proceed to Checkout
            </Link>

            <p className="text-center text-sm text-gray-500 mt-4">
              🔒 Secure checkout powered by Razorpay
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
