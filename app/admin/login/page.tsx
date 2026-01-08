'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCube, FaLock, FaUser, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { AuthProvider, useAuth } from '../../context/AuthContext';

function LoginForm() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/admin');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    const result = await login(password);
    
    if (result.success) {
      router.push('/admin');
    } else {
      setError(result.message);
      setIsLoggingIn(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--secondary)] via-[var(--accent)] to-[var(--secondary)] flex items-center justify-center">
        <div className="text-white flex items-center space-x-3">
          <FaSpinner className="animate-spin text-2xl" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--secondary)] via-[var(--accent)] to-[var(--secondary)] flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 border-4 border-white rounded-lg transform rotate-45" />
        <div className="absolute bottom-20 right-20 w-32 h-32 border-4 border-white rounded-lg transform -rotate-12" />
        <div className="absolute top-1/2 right-1/4 w-24 h-24 border-4 border-white rounded-lg transform rotate-12" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
              <FaCube className="text-4xl text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">
              DR.CUBER Admin
            </h1>
            <p className="text-white/80 text-sm">
              Sign in to manage your store
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center space-x-2">
                <FaLock className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Admin Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-12 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all text-gray-800"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-[var(--primary)]/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoggingIn ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <FaLock />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="px-8 pb-8">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 text-center">
                🔒 This is a secure admin area. Unauthorized access is prohibited.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Store Link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-white/80 hover:text-white transition-colors text-sm inline-flex items-center space-x-2"
          >
            <span>← Back to Store</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );
}
