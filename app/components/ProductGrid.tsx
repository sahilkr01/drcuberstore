'use client';

import React, { useState } from 'react';
import { FaThLarge, FaCube, FaPuzzlePiece, FaGamepad, FaTools } from 'react-icons/fa';
import ProductCard from './ProductCard';
import { useProducts } from '../context/ProductContext';

const categoryIcons: { [key: string]: React.ReactNode } = {
  all: <FaThLarge />,
  cube: <FaCube />,
  puzzle: <FaPuzzlePiece />,
  toy: <FaGamepad />,
  accessory: <FaTools />
};

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'cube', name: 'Speed Cubes' },
  { id: 'puzzle', name: 'Puzzles' },
  { id: 'toy', name: 'Toys' },
  { id: 'accessory', name: 'Accessories' }
];

export default function ProductGrid() {
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = products.filter(product => 
    activeCategory === 'all' || product.category === activeCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'featured':
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  return (
    <section id="products" className="py-16 md:py-20 lg:py-24 bg-[var(--light-bg)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--secondary)] mb-4">
            Our <span className="text-[var(--primary)]">Products</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collection of premium puzzles and toys
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 md:gap-6 mb-8 md:mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2" id="categories">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-[var(--primary)] text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{categoryIcons[category.id]}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-3">
            <label className="text-gray-600 font-medium">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--primary)] bg-white"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-500 mb-6">
          Showing {sortedProducts.length} products
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
          {sortedProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <FaCube className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        )}
      </div>
    </section>
  );
}
