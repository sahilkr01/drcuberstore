'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaInstagram, FaHeart, FaEye, FaCopy, FaCheck, FaTimes } from 'react-icons/fa';
import { Product } from '../lib/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const generateMessage = () => {
    return `Hi! I'm interested in buying this product from DR.CUBER:

📦 Product: ${product.name}
💰 Price: ₹${product.price}
🏷️ Category: ${product.category}
${discount > 0 ? `🎉 Discount: ${discount}% OFF` : ''}

Please share more details about:
- Availability
- Delivery time
- Payment methods

Thank you!`;
  };

  const handleContactInstagram = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(generateMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProceedToInstagram = () => {
    window.open('https://www.instagram.com/drcuberofficial/', '_blank');
    setShowModal(false);
  };

  return (
    <>
      {/* Instagram Message Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FaInstagram className="text-2xl text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900">Contact on Instagram</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">Copy this message and send it to us on Instagram:</p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-64 overflow-y-auto">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{generateMessage()}</pre>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleCopyMessage}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                  copied ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {copied ? <FaCheck /> : <FaCopy />}
                {copied ? 'Copied!' : 'Copy Message'}
              </button>
              <button
                onClick={handleProceedToInstagram}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
              >
                <FaInstagram />
                Open Instagram
              </button>
            </div>
          </div>
        </div>
      )}

      <Link href={`/product/${product.id}`} className="block">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover group">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-3 md:top-4 left-3 md:left-4 flex flex-col gap-2">
            {product.badge && (
              <span className="bg-[var(--primary)] text-white text-xs font-bold px-3 py-1 rounded-full">
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="bg-[var(--success)] text-white text-xs font-bold px-3 py-1 rounded-full">
                -{discount}%
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 md:top-4 right-3 md:right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="w-9 h-9 md:w-10 md:h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-[var(--primary)] transition-colors"
            >
              <FaHeart />
            </button>
            <div className="w-9 h-9 md:w-10 md:h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-[var(--primary)] transition-colors">
              <FaEye />
            </div>
          </div>

          {/* Quick Contact on Instagram */}
          <button
            onClick={handleContactInstagram}
            className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 md:py-3 rounded-lg md:rounded-xl font-semibold flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 hover:shadow-lg text-sm md:text-base"
          >
            <FaInstagram />
            <span>Buy on Instagram</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5 space-y-2.5 md:space-y-3">
          {/* Category */}
          <span className="text-xs font-medium text-[var(--accent)] uppercase tracking-wide">
            {product.category}
          </span>

          {/* Name */}
          <h3 className="font-semibold text-[var(--secondary)] line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-[var(--primary)]">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            {product.stock > 10 ? (
              <span className="text-xs text-[var(--success)] font-medium">✓ In Stock</span>
            ) : product.stock > 0 ? (
              <span className="text-xs text-[var(--warning)] font-medium">Only {product.stock} left!</span>
            ) : (
              <span className="text-xs text-red-500 font-medium">Out of Stock</span>
            )}
          </div>
        </div>
      </div>
    </Link>
    </>
  );
}
