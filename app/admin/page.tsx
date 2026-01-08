'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FaCube,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaHome,
  FaBox,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaSave,
  FaTimes,
  FaExclamationTriangle,
  FaSpinner,
  FaCheck,
  FaBell,
  FaUser,
  FaSync,
  FaShoppingCart,
  FaStar,
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaTruck,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { Product, Order, OrderStatus } from '../lib/types';
import { initialProducts } from '../lib/data';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { OrderProvider, useOrders } from '../context/OrderContext';

function AdminDashboard() {
  const { user, logout, isAuthenticated, isLoading, isAdmin, changeAdminPassword } = useAuth();
  const { orders, updateOrderStatus, updateTrackingNumber, updateEstimatedDelivery } = useOrders();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  // Order Management
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderSearchTerm, setOrderSearchTerm] = useState('');
  const [orderFilter, setOrderFilter] = useState<OrderStatus | 'all'>('all');

  // Password Change
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    originalPrice: undefined,
    category: 'cube',
    image: '',
    stock: 0,
    rating: 4.5,
    reviews: 0,
    featured: false,
    badge: ''
  });

  // Check authentication
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Load products
  const loadProducts = useCallback(() => {
    const savedProducts = localStorage.getItem('drcuber-products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('drcuber-products', JSON.stringify(initialProducts));
    }
    setLastSync(new Date());
  }, []);

  useEffect(() => {
    loadProducts();
    // Listen for storage changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'drcuber-products') {
        loadProducts();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [loadProducts]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const saveProducts = async (newProducts: Product[]) => {
    setIsSaving(true);
    // Simulate network delay for realistic feedback
    await new Promise(resolve => setTimeout(resolve, 300));
    setProducts(newProducts);
    localStorage.setItem('drcuber-products', JSON.stringify(newProducts));
    // Trigger storage event for other tabs
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'drcuber-products',
      newValue: JSON.stringify(newProducts)
    }));
    setLastSync(new Date());
    setIsSaving(false);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      originalPrice: undefined,
      category: 'cube',
      image: 'https://images.unsplash.com/photo-1591991564021-0662a8573199?w=400&h=400&fit=crop',
      stock: 0,
      rating: 4.5,
      reviews: 0,
      featured: false,
      badge: ''
    });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.price) {
      showNotification('error', 'Please fill in all required fields');
      return;
    }

    if (isAddingNew) {
      const newProduct: Product = {
        ...formData as Product,
        id: Date.now().toString()
      };
      await saveProducts([...products, newProduct]);
      showNotification('success', 'Product added successfully! Changes are live on the website.');
    } else if (editingProduct) {
      await saveProducts(
        products.map(p => (p.id === editingProduct.id ? { ...p, ...formData } : p))
      );
      showNotification('success', 'Product updated successfully! Changes are live on the website.');
    }
    setEditingProduct(null);
    setIsAddingNew(false);
  };

  const handleDelete = async (id: string) => {
    await saveProducts(products.filter(p => p.id !== id));
    setShowDeleteConfirm(null);
    showNotification('success', 'Product deleted successfully!');
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setIsAddingNew(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockProducts = products.filter(p => p.stock < 10).length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const featuredCount = products.filter(p => p.featured).length;
  const avgRating = products.length > 0 
    ? (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1) 
    : '0';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex items-center space-x-3 text-gray-600">
          <FaSpinner className="animate-spin text-2xl text-[var(--primary)]" />
          <span className="text-lg">Loading admin panel...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-lg flex items-center space-x-3 animate-fade-in ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? <FaCheck /> : <FaExclamationTriangle />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Saving Indicator */}
      {isSaving && (
        <div className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-[var(--secondary)] text-white rounded-lg flex items-center space-x-2 shadow-lg">
          <FaSpinner className="animate-spin" />
          <span>Syncing changes...</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-72'} bg-gradient-to-b from-[var(--secondary)] to-[var(--accent)] text-white min-h-screen fixed left-0 top-0 transition-all duration-300 shadow-xl z-40`}>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[var(--primary)] rounded-xl flex items-center justify-center">
                <FaCube className="text-xl text-white" />
              </div>
              {!sidebarCollapsed && (
                <span className="text-xl font-bold">
                  <span className="text-[var(--primary)]">DR.</span>CUBER
                </span>
              )}
            </Link>
          </div>
          {!sidebarCollapsed && (
            <div className="mt-4 p-3 bg-white/10 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center">
                  <FaUser className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-300">Administrator</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <nav className="mt-2 px-3">
          <p className={`text-xs text-gray-400 uppercase tracking-wider mb-3 ${sidebarCollapsed ? 'text-center' : 'px-3'}`}>
            {sidebarCollapsed ? '•••' : 'Main Menu'}
          </p>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : ''} space-x-3 px-4 py-3 rounded-xl mb-1 transition-all ${
              activeTab === 'dashboard' 
                ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/30' 
                : 'text-gray-300 hover:bg-white/10'
            }`}
          >
            <FaChartBar className="text-lg" />
            {!sidebarCollapsed && <span>Dashboard</span>}
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : ''} space-x-3 px-4 py-3 rounded-xl mb-1 transition-all ${
              activeTab === 'orders' 
                ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/30' 
                : 'text-gray-300 hover:bg-white/10'
            }`}
          >
            <FaTruck className="text-lg" />
            {!sidebarCollapsed && <span>Orders</span>}
            {!sidebarCollapsed && orders.length > 0 && (
              <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-full text-xs">{orders.length}</span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : ''} space-x-3 px-4 py-3 rounded-xl mb-1 transition-all ${
              activeTab === 'products' 
                ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/30' 
                : 'text-gray-300 hover:bg-white/10'
            }`}
          >
            <FaBox className="text-lg" />
            {!sidebarCollapsed && <span>Products</span>}
            {!sidebarCollapsed && (
              <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-full text-xs">{products.length}</span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : ''} space-x-3 px-4 py-3 rounded-xl mb-1 transition-all ${
              activeTab === 'settings' 
                ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/30' 
                : 'text-gray-300 hover:bg-white/10'
            }`}
          >
            <FaCog className="text-lg" />
            {!sidebarCollapsed && <span>Settings</span>}
          </button>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          {!sidebarCollapsed && lastSync && (
            <div className="mb-4 p-3 bg-white/5 rounded-xl">
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <FaSync className="text-green-400" />
                <span>Last sync: {lastSync.toLocaleTimeString()}</span>
              </div>
            </div>
          )}
          <Link
            href="/"
            target="_blank"
            className={`flex items-center ${sidebarCollapsed ? 'justify-center' : ''} space-x-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-xl transition-colors`}
          >
            <FaHome className="text-lg" />
            {!sidebarCollapsed && <span>View Store</span>}
          </Link>
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : ''} space-x-3 px-4 py-3 text-gray-300 hover:bg-red-500/20 hover:text-red-400 rounded-xl transition-colors mt-1`}
          >
            <FaSignOutAlt className="text-lg" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-72'} transition-all duration-300`}>
        {/* Top Header Bar */}
        <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaChartBar className="text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-[var(--secondary)] capitalize">{activeTab}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <FaBell className="text-gray-600 text-lg" />
              {lowStockProducts > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {lowStockProducts}
                </span>
              )}
            </button>
            <button 
              onClick={loadProducts}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Refresh data"
            >
              <FaSync className={`text-gray-600 ${isSaving ? 'animate-spin' : ''}`} />
            </button>
            <Link href="/" target="_blank" className="btn-primary text-sm py-2 px-4 flex items-center space-x-2">
              <FaShoppingCart />
              <span>View Store</span>
            </Link>
          </div>
        </header>

        <div className="p-8">
        {activeTab === 'dashboard' && (
          <div>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Products</p>
                    <h3 className="text-3xl font-bold text-[var(--secondary)] mt-1">{products.length}</h3>
                    <p className="text-xs text-green-500 flex items-center mt-2">
                      <FaArrowUp className="mr-1" /> Active catalog
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <FaBox className="text-white text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Stock</p>
                    <h3 className="text-3xl font-bold text-[var(--secondary)] mt-1">{totalStock}</h3>
                    <p className="text-xs text-green-500 flex items-center mt-2">
                      <FaArrowUp className="mr-1" /> Units available
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                    <FaCube className="text-white text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Low Stock</p>
                    <h3 className="text-3xl font-bold text-[var(--warning)] mt-1">{lowStockProducts}</h3>
                    <p className="text-xs text-orange-500 flex items-center mt-2">
                      <FaExclamationTriangle className="mr-1" /> Need attention
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <FaExclamationTriangle className="text-white text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Featured</p>
                    <h3 className="text-3xl font-bold text-[var(--secondary)] mt-1">{featuredCount}</h3>
                    <p className="text-xs text-purple-500 flex items-center mt-2">
                      <FaStar className="mr-1" /> Highlighted items
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <FaStar className="text-white text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Inventory Value</p>
                    <h3 className="text-2xl font-bold text-[var(--secondary)] mt-1">₹{totalValue.toLocaleString()}</h3>
                    <p className="text-xs text-blue-500 flex items-center mt-2">
                      <FaArrowUp className="mr-1" /> Total worth
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-[var(--primary)] to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-[var(--primary)]/30">
                    <FaChartBar className="text-white text-xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <button 
                onClick={() => { setActiveTab('products'); handleAddNew(); }}
                className="bg-gradient-to-r from-[var(--primary)] to-pink-600 text-white p-6 rounded-2xl flex items-center space-x-4 hover:shadow-lg hover:shadow-[var(--primary)]/30 transition-all"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <FaPlus className="text-xl" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-lg">Add New Product</p>
                  <p className="text-white/70 text-sm">Expand your catalog</p>
                </div>
              </button>

              <button 
                onClick={() => setActiveTab('products')}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl flex items-center space-x-4 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <FaBox className="text-xl" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-lg">Manage Products</p>
                  <p className="text-white/70 text-sm">{products.length} products in stock</p>
                </div>
              </button>

              <Link 
                href="/"
                target="_blank"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl flex items-center space-x-4 hover:shadow-lg hover:shadow-green-500/30 transition-all"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <FaHome className="text-xl" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-lg">View Live Store</p>
                  <p className="text-white/70 text-sm">See changes in action</p>
                </div>
              </Link>
            </div>

            {/* Low Stock Products */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[var(--secondary)]">Low Stock Products</h2>
                  <p className="text-gray-500 text-sm">Products that need restocking</p>
                </div>
                <button 
                  onClick={() => setActiveTab('products')}
                  className="text-[var(--primary)] hover:underline text-sm font-medium"
                >
                  View All →
                </button>
              </div>
              {products.filter(p => p.stock < 10).length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheck className="text-green-500 text-2xl" />
                  </div>
                  <p className="text-gray-600">All products are well stocked!</p>
                </div>
              ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Product</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Category</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Stock</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.filter(p => p.stock < 10).map(product => (
                      <tr key={product.id} className="border-b border-gray-100">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                            <span className="font-medium text-[var(--secondary)]">{product.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 capitalize text-gray-600">{product.category}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.stock === 0 ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                          }`}>
                            {product.stock} left
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => {
                              setActiveTab('products');
                              handleEdit(product);
                            }}
                            className="text-[var(--primary)] hover:underline"
                          >
                            Update Stock
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-[var(--secondary)]">Order Management</h1>
                <p className="text-gray-500">Manage customer orders and update status</p>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value as any)}
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)]"
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders by ID, customer name, or email..."
                  value={orderSearchTerm}
                  onChange={(e) => setOrderSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                />
              </div>
            </div>

            {selectedOrder ? (
              // Order Detail View
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex items-center space-x-2 text-[var(--primary)] hover:underline mb-6"
                >
                  <FaArrowLeft />
                  <span>Back to Orders</span>
                </button>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-[var(--secondary)]">Order #{selectedOrder.id}</h2>
                    <p className="text-gray-500">Placed on {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  </div>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => {
                      updateOrderStatus(selectedOrder.id, e.target.value as any, 'Status updated by admin');
                      const updated = orders.find(o => o.id === selectedOrder.id);
                      if (updated) setSelectedOrder(updated);
                      showNotification('success', 'Order status updated successfully');
                    }}
                    className="px-4 py-2 border-2 border-[var(--primary)] rounded-xl focus:outline-none font-medium"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Tracking Info */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tracking Number</label>
                    <input
                      type="text"
                      value={selectedOrder.trackingNumber || ''}
                      onChange={(e) => updateTrackingNumber(selectedOrder.id, e.target.value)}
                      placeholder="Enter tracking number"
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Delivery</label>
                    <input
                      type="date"
                      value={selectedOrder.estimatedDelivery || ''}
                      onChange={(e) => updateEstimatedDelivery(selectedOrder.id, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)]"
                    />
                  </div>
                </div>

                {/* Customer Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-semibold text-[var(--secondary)] mb-3">Customer Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-500">Name:</span> {selectedOrder.userName}</p>
                      <p><span className="text-gray-500">Email:</span> {selectedOrder.userEmail}</p>
                      {selectedOrder.userPhone && <p><span className="text-gray-500">Phone:</span> {selectedOrder.userPhone}</p>}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-semibold text-[var(--secondary)] mb-3">Shipping Address</h3>
                    <p className="text-sm text-gray-600">
                      {selectedOrder.shippingAddress.street}<br />
                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}<br />
                      {selectedOrder.shippingAddress.zipCode}<br />
                      {selectedOrder.shippingAddress.country}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h3 className="font-semibold text-[var(--secondary)] mb-4">Order Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="font-medium text-[var(--secondary)]">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity} × ₹{item.price.toLocaleString()}</p>
                        </div>
                        <p className="font-semibold text-[var(--secondary)]">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Details */}
                <div className="p-4 bg-gradient-to-r from-[var(--primary)]/10 to-pink-500/10 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Order Total</span>
                    <span className="text-2xl font-bold text-[var(--primary)]">₹{selectedOrder.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Payment Method:</span>
                    <span className="capitalize">{selectedOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Payment Status:</span>
                    <span className={`capitalize ${selectedOrder.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {selectedOrder.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              // Orders List
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left py-4 px-6 text-gray-600 font-semibold text-sm">Order ID</th>
                      <th className="text-left py-4 px-6 text-gray-600 font-semibold text-sm">Customer</th>
                      <th className="text-left py-4 px-6 text-gray-600 font-semibold text-sm">Items</th>
                      <th className="text-left py-4 px-6 text-gray-600 font-semibold text-sm">Amount</th>
                      <th className="text-left py-4 px-6 text-gray-600 font-semibold text-sm">Status</th>
                      <th className="text-left py-4 px-6 text-gray-600 font-semibold text-sm">Date</th>
                      <th className="text-left py-4 px-6 text-gray-600 font-semibold text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders
                      .filter(order => 
                        (orderFilter === 'all' || order.status === orderFilter) &&
                        (order.id.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
                         order.userName.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
                         order.userEmail.toLowerCase().includes(orderSearchTerm.toLowerCase()))
                      )
                      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                      .map(order => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6">
                            <p className="font-semibold text-[var(--secondary)]">{order.id}</p>
                          </td>
                          <td className="py-4 px-6">
                            <p className="font-medium text-[var(--secondary)]">{order.userName}</p>
                            <p className="text-sm text-gray-500">{order.userEmail}</p>
                          </td>
                          <td className="py-4 px-6">
                            <p className="text-gray-600">{order.items.length} items</p>
                          </td>
                          <td className="py-4 px-6">
                            <p className="font-bold text-[var(--secondary)]">₹{order.totalAmount.toLocaleString()}</p>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                              order.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                              order.status === 'shipped' || order.status === 'out_for_delivery' ? 'bg-blue-100 text-blue-600' :
                              'bg-yellow-100 text-yellow-600'
                            }`}>
                              {order.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </td>
                          <td className="py-4 px-6">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="text-[var(--primary)] hover:underline text-sm font-medium"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {orders.filter(order => 
                  (orderFilter === 'all' || order.status === orderFilter) &&
                  (order.id.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
                   order.userName.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
                   order.userEmail.toLowerCase().includes(orderSearchTerm.toLowerCase()))
                ).length === 0 && (
                  <div className="text-center py-12">
                    <FaTruck className="text-4xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No orders found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-[var(--secondary)]">Product Management</h1>
                <p className="text-gray-500">Manage your product catalog and inventory</p>
              </div>
              <button
                onClick={handleAddNew}
                className="btn-primary flex items-center space-x-2 shadow-lg shadow-[var(--primary)]/30"
              >
                <FaPlus />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products by name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                  />
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>Showing {filteredProducts.length} of {products.length} products</span>
                </div>
              </div>
            </div>

            {/* Product Form Modal */}
            {(editingProduct || isAddingNew) && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-[var(--secondary)]">
                        {isAddingNew ? 'Add New Product' : 'Edit Product'}
                      </h2>
                      <p className="text-gray-500 text-sm mt-1">
                        {isAddingNew ? 'Fill in the details to add a new product' : 'Update product information'}
                      </p>
                    </div>
                    <button onClick={handleCancel} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <FaTimes className="text-xl text-gray-400" />
                    </button>
                  </div>

                  {formData.image && (
                    <div className="mb-6 flex justify-center">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded-2xl border-4 border-gray-100 shadow-lg"
                      />
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
                        placeholder="e.g., GAN 356 RS"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as Product['category'] })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
                      >
                        <option value="cube">Speed Cube</option>
                        <option value="puzzle">Puzzle</option>
                        <option value="toy">Toy</option>
                        <option value="accessory">Accessory</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹) *</label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Original Price (₹)</label>
                      <input
                        type="number"
                        value={formData.originalPrice || ''}
                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value ? Number(e.target.value) : undefined })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
                        placeholder="Optional discount price"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity *</label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Badge Label</label>
                      <input
                        type="text"
                        value={formData.badge || ''}
                        onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
                        placeholder="e.g., Best Seller, New"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                      
                      {/* File Upload */}
                      <div className="mb-4">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-1 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB)</p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                // Check file size (5MB limit)
                                if (file.size > 5 * 1024 * 1024) {
                                  showNotification('error', 'Image size must be less than 5MB');
                                  return;
                                }
                                
                                // Convert to base64
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setFormData({ ...formData, image: reader.result as string });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>

                      {/* OR divider */}
                      <div className="relative mb-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">Or use image URL</span>
                        </div>
                      </div>

                      {/* URL Input */}
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all resize-none"
                        placeholder="Enter product description..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.featured}
                          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                          className="w-5 h-5 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
                        />
                        <div>
                          <span className="text-sm font-medium text-gray-700">Featured Product</span>
                          <p className="text-xs text-gray-500">Display this product in the featured section on homepage</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-100">
                    <button
                      onClick={handleCancel}
                      className="px-6 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="btn-primary flex items-center space-x-2 shadow-lg shadow-[var(--primary)]/30 disabled:opacity-50"
                    >
                      {isSaving ? <FaSpinner className="animate-spin" /> : <FaSave />}
                      <span>{isSaving ? 'Saving...' : 'Save Product'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FaTrash className="text-red-500 text-3xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-[var(--secondary)] mb-2">Delete Product?</h2>
                    <p className="text-gray-600 mb-8">This action cannot be undone. The product will be permanently removed from your catalog.</p>
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => setShowDeleteConfirm(null)}
                        className="px-6 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDelete(showDeleteConfirm)}
                        className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium shadow-lg shadow-red-500/30"
                      >
                        Delete Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left py-4 px-6 text-gray-600 font-semibold text-sm uppercase tracking-wider">Product</th>
                    <th className="text-left py-4 px-6 text-gray-600 font-semibold text-sm uppercase tracking-wider">Category</th>
                    <th className="text-left py-4 px-6 text-gray-600 font-semibold text-sm uppercase tracking-wider">Price</th>
                    <th className="text-left py-4 px-6 text-gray-600 font-semibold text-sm uppercase tracking-wider">Stock</th>
                    <th className="text-left py-4 px-6 text-gray-600 font-semibold text-sm uppercase tracking-wider">Status</th>
                    <th className="text-left py-4 px-6 text-gray-600 font-semibold text-sm uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-14 h-14 rounded-xl object-cover border border-gray-100"
                          />
                          <div>
                            <p className="font-semibold text-[var(--secondary)]">{product.name}</p>
                            <p className="text-sm text-gray-500 line-clamp-1 max-w-xs">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg capitalize">{product.category}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <span className="font-bold text-[var(--secondary)]">₹{product.price.toLocaleString()}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium ${
                          product.stock === 0 
                            ? 'bg-red-100 text-red-600' 
                            : product.stock < 10 
                              ? 'bg-yellow-100 text-yellow-600' 
                              : 'bg-green-100 text-green-600'
                        }`}>
                          {product.stock === 0 ? 'Out of Stock' : `${product.stock} units`}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {product.featured ? (
                          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-[var(--primary)] to-pink-500 text-white text-sm font-medium rounded-lg">
                            <FaStar className="text-xs" />
                            <span>Featured</span>
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-100 text-gray-500 text-sm font-medium rounded-lg">
                            Regular
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-100 transition-colors"
                            title="Edit product"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(product.id)}
                            className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
                            title="Delete product"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaBox className="text-gray-400 text-2xl" />
                  </div>
                  <p className="text-gray-600 font-medium">No products found</p>
                  <p className="text-gray-500 text-sm mt-1">Try adjusting your search or add a new product</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-[var(--secondary)]">Settings</h1>
              <p className="text-gray-500">Manage your store configuration</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-[var(--secondary)] mb-6 flex items-center space-x-2">
                  <FaCog className="text-[var(--primary)]" />
                  <span>Store Settings</span>
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                    <input
                      type="text"
                      defaultValue="DR.CUBER"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                    <input
                      type="email"
                      defaultValue="hello@drcuber.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Free Shipping Threshold (₹)</label>
                    <input
                      type="number"
                      defaultValue="499"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                    />
                  </div>

                  <button 
                    onClick={() => showNotification('success', 'Settings saved successfully!')}
                    className="btn-primary w-full shadow-lg shadow-[var(--primary)]/30"
                  >
                    Save Settings
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-[var(--secondary)] mb-6 flex items-center space-x-2">
                    <FaLock className="text-[var(--primary)]" />
                    <span>Change Password</span>
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                      <input
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                      <input
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                        placeholder="••••••••"
                      />
                    </div>
                    <button
                      onClick={async () => {
                        if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
                          showNotification('error', 'Please fill all fields');
                          return;
                        }
                        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
                          showNotification('error', 'New passwords do not match');
                          return;
                        }
                        if (passwordForm.newPassword.length < 6) {
                          showNotification('error', 'Password must be at least 6 characters');
                          return;
                        }
                        const result = await changeAdminPassword(passwordForm.currentPassword, passwordForm.newPassword);
                        if (result.success) {
                          showNotification('success', result.message);
                          setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                        } else {
                          showNotification('error', result.message);
                        }
                      }}
                      className="w-full btn-primary shadow-lg shadow-[var(--primary)]/30"
                    >
                      Change Password
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-[var(--secondary)] mb-6 flex items-center space-x-2">
                    <FaUser className="text-[var(--primary)]" />
                    <span>Account</span>
                  </h2>
                  
                  <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-xl">
                    <div className="w-14 h-14 bg-[var(--primary)] rounded-full flex items-center justify-center">
                      <FaUser className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--secondary)]">{user?.name || 'Admin'}</p>
                      <p className="text-sm text-gray-500">Administrator</p>
                    </div>
                  </div>

                  <button 
                    onClick={handleLogout}
                    className="w-full py-3 border border-red-200 text-red-500 rounded-xl hover:bg-red-50 transition-colors font-medium flex items-center justify-center space-x-2"
                  >
                    <FaSignOutAlt />
                    <span>Sign Out</span>
                  </button>
                </div>

                <div className="bg-gradient-to-br from-[var(--secondary)] to-[var(--accent)] rounded-2xl p-8 text-white">
                  <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-xl p-4">
                      <p className="text-white/70 text-sm">Products</p>
                      <p className="text-2xl font-bold">{products.length}</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <p className="text-white/70 text-sm">Total Stock</p>
                      <p className="text-2xl font-bold">{totalStock}</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <p className="text-white/70 text-sm">Featured</p>
                      <p className="text-2xl font-bold">{featuredCount}</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <p className="text-white/70 text-sm">Low Stock</p>
                      <p className="text-2xl font-bold">{lowStockProducts}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </main>
    </div>
  );
}

export default function AdminPanel() {
  return (
    <AuthProvider>
      <OrderProvider>
        <AdminDashboard />
      </OrderProvider>
    </AuthProvider>
  );
}