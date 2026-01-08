'use client';

import React from 'react';
import Link from 'next/link';
import { FaCube, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[var(--secondary)] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <FaCube className="text-3xl text-[var(--primary)]" />
              <span className="text-2xl font-bold">
                <span className="text-[var(--primary)]">DR.</span>
                <span className="text-white">CUBER</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm">
              Your one-stop shop for premium Rubik&apos;s cubes, puzzles, and toys. We bring joy and challenge to puzzle enthusiasts worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100067011107698" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--primary)] transition-colors">
                <FaFacebook className="text-xl" />
              </a>
              <a href="https://www.instagram.com/drcuberofficial/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--primary)] transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="https://www.youtube.com/@drcuberofficial" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--primary)] transition-colors">
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 md:mb-5">Quick Links</h3>
            <ul className="space-y-2.5 md:space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[var(--primary)] transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#products" className="text-gray-400 hover:text-[var(--primary)] transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="text-gray-400 hover:text-[var(--primary)] transition-colors text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-400 hover:text-[var(--primary)] transition-colors text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#products" className="text-gray-400 hover:text-[var(--primary)] transition-colors text-sm">
                  Speed Cubes
                </Link>
              </li>
              <li>
                <Link href="/#products" className="text-gray-400 hover:text-[var(--primary)] transition-colors text-sm">
                  Puzzles
                </Link>
              </li>
              <li>
                <Link href="/#products" className="text-gray-400 hover:text-[var(--primary)] transition-colors text-sm">
                  Fidget Toys
                </Link>
              </li>
              <li>
                <Link href="/#products" className="text-gray-400 hover:text-[var(--primary)] transition-colors text-sm">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/#products" className="text-gray-400 hover:text-[var(--primary)] transition-colors text-sm">
                  Gift Sets
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-10 md:mt-12 lg:mt-16 pt-8 md:pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 DR.CUBER. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a href="#" className="text-gray-400 hover:text-[var(--primary)] transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-[var(--primary)] transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-[var(--primary)] transition-colors text-sm">
              Shipping Info
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
