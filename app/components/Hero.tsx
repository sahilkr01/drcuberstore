'use client';

import React from 'react';
import Link from 'next/link';
import { FaArrowRight, FaCube, FaAward, FaTag } from 'react-icons/fa';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[var(--secondary)] via-[var(--accent)] to-[var(--secondary)] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-lg transform rotate-45 animate-rotate" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border-4 border-white rounded-lg transform -rotate-12" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-4 border-white rounded-lg transform rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Unlock Your
              <span className="block text-[var(--primary)]">Puzzle Potential</span>
            </h1>

            <p className="text-lg text-gray-300 max-w-lg">
              Discover premium Rubik&apos;s cubes, brain-teasing puzzles, and exciting toys. From beginners to speedcubing champions, we have everything you need.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#products"
                className="btn-primary inline-flex items-center justify-center space-x-2"
              >
                <span>Shop Now</span>
                <FaArrowRight />
              </Link>
              <Link
                href="#categories"
                className="btn-secondary inline-flex items-center justify-center space-x-2"
              >
                <span>Browse Categories</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center space-x-2 text-sm">
                <FaAward className="text-[var(--primary)]" />
                <span>Best Product</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <FaTag className="text-[var(--primary)]" />
                <span>Affordable Rate</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Main Cube Image */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-3xl transform rotate-6 opacity-50" />
              <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1591991564021-0662a8573199?w=600&h=600&fit=crop"
                  alt="Rubik's Cube"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-[var(--primary)] text-white px-4 py-2 rounded-lg shadow-lg animate-pulse-slow">
                <span className="font-bold">25% OFF</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
