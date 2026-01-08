'use client';

import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-16 md:py-20 lg:py-24 bg-[var(--light-bg)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--secondary)] mb-3 md:mb-4">
            Get In <span className="text-[var(--primary)]">Touch</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a question or feedback? We&apos;d love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 flex items-start space-x-4 shadow-sm">
              <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaPhone className="text-[var(--primary)] text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--secondary)] mb-1">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
                <p className="text-gray-600">+1 (555) 987-6543</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 flex items-start space-x-4 shadow-sm">
              <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaEnvelope className="text-[var(--primary)] text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--secondary)] mb-1">Email</h3>
                <p className="text-gray-600">hello@drcuber.com</p>
                <p className="text-gray-600">support@drcuber.com</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 flex items-start space-x-4 shadow-sm">
              <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaMapMarkerAlt className="text-[var(--primary)] text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--secondary)] mb-1">Address</h3>
                <p className="text-gray-600">123 Puzzle Street</p>
                <p className="text-gray-600">Cube City, CC 12345</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--primary)] transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--primary)] transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--primary)] transition-colors"
                  placeholder="How can we help?"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--primary)] transition-colors resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button type="submit" className="btn-primary w-full flex items-center justify-center space-x-2 py-4">
                <FaPaperPlane />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
