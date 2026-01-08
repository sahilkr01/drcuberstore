'use client';

import React from 'react';
import { FaFire, FaArrowRight } from 'react-icons/fa';
import ProductCard from './ProductCard';
import { useProducts } from '../context/ProductContext';

export default function FeaturedProducts() {
  const { products } = useProducts();
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 bg-[var(--primary)]/10 px-4 py-2 rounded-full mb-4">
              <FaFire className="text-[var(--primary)]" />
              <span className="text-[var(--primary)] font-medium">Hot Products</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--secondary)]">
              Featured <span className="text-[var(--primary)]">Products</span>
            </h2>
          </div>
          <a
            href="#products"
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-[var(--primary)] font-semibold hover:underline"
          >
            <span>View All Products</span>
            <FaArrowRight />
          </a>
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
