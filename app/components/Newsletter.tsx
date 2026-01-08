'use client';

import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

export default function Newsletter() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="text-center lg:text-left max-w-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-white/80 max-w-lg">
              Get exclusive deals, new product alerts, and cubing tips delivered to your inbox!
            </p>
          </div>

          <div className="w-full lg:w-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-4 rounded-xl text-gray-800 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-[var(--secondary)] hover:bg-[var(--accent)] px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-colors">
                <span>Subscribe</span>
                <FaArrowRight />
              </button>
            </div>
            <p className="text-sm text-white/60 mt-3 text-center sm:text-left">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
