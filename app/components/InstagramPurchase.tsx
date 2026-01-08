'use client';

import React from 'react';
import { FaInstagram, FaWhatsapp, FaShoppingBag, FaArrowRight } from 'react-icons/fa';

export default function InstagramPurchase() {
  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/drcuberofficial/', '_blank');
  };

  return (
    <section id="purchase" className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--secondary)] mb-4">
            Buy Your <span className="text-[var(--primary)]">Favorite Cubes</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Connect with us on Instagram to purchase your desired Rubik's Cube. 
            We'll provide you with all the details and help you get started!
          </p>
        </div>

        {/* Instagram Purchase Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Side - Information */}
              <div className="p-8 md:p-10 lg:p-12 bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <FaInstagram className="text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Instagram</h3>
                    <p className="text-white/90">@drcuberofficial</p>
                  </div>
                </div>

                <h4 className="text-xl font-bold mb-4">How to Buy:</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-semibold">Visit Our Instagram</p>
                      <p className="text-sm text-white/80">Click the button and visit our Instagram profile</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-semibold">Send Us a Message</p>
                      <p className="text-sm text-white/80">DM us with the product name and details</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-semibold">Complete Your Purchase</p>
                      <p className="text-sm text-white/80">We'll guide you through the purchase process</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - CTA */}
              <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                <div className="mb-8">
                  <div className="flex items-center gap-2 text-[var(--primary)] mb-4">
                    <FaShoppingBag className="text-xl" />
                    <span className="font-semibold">Direct Purchase</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--secondary)] mb-3">
                    Ready to Order?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Contact us on Instagram with your product details and we'll help you complete your order quickly and securely.
                  </p>
                  <button
                    onClick={handleInstagramClick}
                    className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:-translate-y-0.5"
                  >
                    <FaInstagram className="text-2xl" />
                    <span>Message on Instagram</span>
                    <FaArrowRight />
                  </button>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-3">
                    <strong className="text-gray-700">What to include in your message:</strong>
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>Product name and specifications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>Quantity required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>Your delivery location</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaShoppingBag className="text-blue-600 text-xl" />
              </div>
              <h4 className="font-semibold text-[var(--secondary)] mb-1">Easy Ordering</h4>
              <p className="text-sm text-gray-600">Simple and quick purchase process</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaInstagram className="text-green-600 text-xl" />
              </div>
              <h4 className="font-semibold text-[var(--secondary)] mb-1">Direct Contact</h4>
              <p className="text-sm text-gray-600">Get instant responses to your queries</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
