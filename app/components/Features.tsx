'use client';

import React from 'react';
import { FaAward, FaTag, FaGift } from 'react-icons/fa';

const features = [
  {
    icon: <FaAward className="text-3xl" />,
    title: 'Best Product',
    description: 'Premium quality Rubik\'s cubes'
  },
  {
    icon: <FaTag className="text-3xl" />,
    title: 'Affordable Rate',
    description: 'Best prices for quality products'
  },
  {
    icon: <FaGift className="text-3xl" />,
    title: 'Gift Wrapping',
    description: 'Special gift packaging available'
  }
];

export default function Features() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-[var(--light-bg)] rounded-xl md:rounded-2xl flex items-center justify-center text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-[var(--secondary)] mb-1 text-sm md:text-base">{feature.title}</h3>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
