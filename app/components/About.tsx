'use client';

import React from 'react';
import { FaCube, FaTrophy, FaUsers, FaHeart } from 'react-icons/fa';

export default function About() {
  return (
    <section id="about" className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Left Content - Image */}
          <div className="relative max-w-md mx-auto lg:mx-0">
            {/* Main Founder Image */}
            <div className="relative mb-4">
              <div className="w-64 h-64 mx-auto rounded-2xl overflow-hidden bg-white shadow-lg">
                <img
                  src="/sahilkr.jpeg"
                  alt="Sahil Kumar - Founder & Rubik's Cube Mosaic Artist"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Name Badge Below Image */}
              <div className="mt-3 text-center bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 rounded-xl p-3">
                <p className="font-bold text-[var(--secondary)] text-lg">Sahil Kumar</p>
                <p className="text-xs text-[var(--primary)] font-medium">Founder & Mosaic Artist</p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-100">
                <FaCube className="text-2xl mx-auto mb-2 text-[var(--primary)]" />
                <div className="text-xl font-bold text-[var(--secondary)]">5+</div>
                <p className="text-xs text-gray-600">Years Experience</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-100">
                <FaTrophy className="text-2xl mx-auto mb-2 text-[var(--accent)]" />
                <div className="text-xl font-bold text-[var(--secondary)]">100+</div>
                <p className="text-xs text-gray-600">Premium Products</p>
              </div>
            </div>
          </div>

          {/* Right Content - Text */}
          <div className="space-y-5 md:space-y-6 lg:space-y-7">
            <div className="inline-flex items-center space-x-2 bg-[var(--primary)]/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full">
              <FaHeart className="text-[var(--primary)] text-sm md:text-base" />
              <span className="text-[var(--primary)] font-medium text-sm md:text-base">About DR.CUBER</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[var(--secondary)]">
              Founded by <span className="text-[var(--primary)]">Sahil Kumar</span> in 2020
            </h2>

            <p className="text-gray-600 leading-relaxed">
              DR.CUBER was founded by <strong>Sahil Kumar</strong> in 2020 with a vision to create 
              a premier brand for Rubik&apos;s cubes in India. As a passionate Rubik&apos;s cube mosaic 
              artist, Sahil brings creativity and expertise to every product we offer.
            </p>

            <p className="text-gray-600 leading-relaxed">
              With years of experience performing at various prestigious institutes including IITs, 
              Sahil has inspired countless individuals to discover the art and joy of cubing. His 
              dedication to quality and innovation drives DR.CUBER&apos;s mission to provide the best 
              Rubik&apos;s cubes and puzzles to enthusiasts across the country.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Whether you&apos;re a competitive speedcuber or just starting your puzzle journey, 
              we personally select and test every product to ensure you get the perfect cube for your needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
