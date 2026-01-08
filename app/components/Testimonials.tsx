'use client';

import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Arjun Kumar',
    role: 'Speedcubing Champion',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    content: 'DR.CUBER has the best quality cubes I\'ve ever used. The magnetic 3x3 is absolutely smooth and helped me improve my solve time by 3 seconds!',
    rating: 5
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Puzzle Enthusiast',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    content: 'Amazing collection of puzzles! I ordered the brain teaser set for my kids and they absolutely love it. Great quality and fast delivery.',
    rating: 5
  },
  {
    id: 3,
    name: 'Rahul Mehta',
    role: 'Hobbyist',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    content: 'Started cubing as a hobby and DR.CUBER made it so easy to find the right cube for beginners. Their customer support is excellent!',
    rating: 5
  },
  {
    id: 4,
    name: 'Sneha Patel',
    role: 'Teacher',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    content: 'I buy cubes in bulk for my students. DR.CUBER offers great prices and the cubes are durable. Highly recommended for educators!',
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[var(--secondary)] to-[var(--accent)] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-[var(--primary)]">Customers</span> Say
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Join thousands of happy customers who trust DR.CUBER for their puzzle needs
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all"
            >
              <FaQuoteLeft className="text-[var(--primary)] text-2xl mb-4" />
              <p className="text-gray-200 mb-6 text-sm leading-relaxed">
                {testimonial.content}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-xs text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-sm" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12 mt-12 md:mt-16 lg:mt-20 pt-10 md:pt-14 lg:pt-16 border-t border-white/20">
          <div className="text-center">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary)]">50K+</div>
            <p className="text-gray-300 mt-2 text-sm md:text-base">Happy Customers</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary)]">100+</div>
            <p className="text-gray-300 mt-2 text-sm md:text-base">Products</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary)]">4.9</div>
            <p className="text-gray-300 mt-2 text-sm md:text-base">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary)]">24/7</div>
            <p className="text-gray-300 mt-2 text-sm md:text-base">Customer Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}
