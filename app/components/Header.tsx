'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-18 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 md:space-x-3">
            <div className="relative w-8 h-8 md:w-10 md:h-10">
              <Image 
                src="/drcuber.jpg" 
                alt="DR.CUBER Logo" 
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <span className="text-xl md:text-2xl font-bold">
              <span className="text-[var(--primary)]">DR.</span>
              <span className="text-[var(--secondary)]">CUBER</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[var(--primary)] transition-colors font-medium text-sm lg:text-base">
              Home
            </Link>
            <Link href="/#products" className="text-gray-700 hover:text-[var(--primary)] transition-colors font-medium text-sm lg:text-base">
              Products
            </Link>
            <Link href="/tutorials" className="text-gray-700 hover:text-[var(--primary)] transition-colors font-medium text-sm lg:text-base">
              Tutorials
            </Link>
            <Link href="/#about" className="text-gray-700 hover:text-[var(--primary)] transition-colors font-medium text-sm lg:text-base">
              About
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-600 hover:text-[var(--primary)] transition-colors"
            >
              <FaSearch className="text-xl" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-[var(--primary)] transition-colors"
            >
              {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t animate-fade-in">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for cubes, puzzles, toys..."
                className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--primary)] transition-colors"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-[var(--primary)] transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                href="/#products"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-[var(--primary)] transition-colors font-medium"
              >
                Products
              </Link>
              <Link
                href="/tutorials"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-[var(--primary)] transition-colors font-medium"
              >
                Tutorials
              </Link>
              <Link
                href="/#about"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-[var(--primary)] transition-colors font-medium"
              >
                About
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
