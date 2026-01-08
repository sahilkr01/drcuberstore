'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order, OrderStatus, OrderItem, Address } from '../lib/types';

interface OrderContextType {
  orders: Order[];
  userOrders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'statusHistory'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  updateTrackingNumber: (orderId: string, trackingNumber: string) => void;
  updateEstimatedDelivery: (orderId: string, date: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getOrdersByUserId: (userId: string) => Order[];
  cancelOrder: (orderId: string, reason?: string) => void;
  setCurrentUserId: (userId: string | null) => void;
  currentUserId: string | null;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Sample orders for demo
const sampleOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    userId: 'user-1',
    userEmail: 'demo@example.com',
    userName: 'Demo User',
    userPhone: '+91 98765 43210',
    items: [
      {
        productId: '1',
        name: 'GAN 356 XS',
        image: 'https://images.unsplash.com/photo-1591991564021-0662a8573199?w=400&h=400&fit=crop',
        price: 2999,
        quantity: 1
      }
    ],
    totalAmount: 2999,
    shippingAddress: {
      street: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001',
      country: 'India'
    },
    status: 'delivered',
    paymentMethod: 'online',
    paymentStatus: 'paid',
    trackingNumber: 'IND123456789',
    estimatedDelivery: '2024-01-15',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-15T14:00:00Z',
    statusHistory: [
      { status: 'pending', timestamp: '2024-01-10T10:00:00Z' },
      { status: 'confirmed', timestamp: '2024-01-10T10:30:00Z' },
      { status: 'processing', timestamp: '2024-01-11T09:00:00Z' },
      { status: 'shipped', timestamp: '2024-01-12T11:00:00Z', note: 'Dispatched from warehouse' },
      { status: 'out_for_delivery', timestamp: '2024-01-15T08:00:00Z' },
      { status: 'delivered', timestamp: '2024-01-15T14:00:00Z', note: 'Delivered to customer' }
    ]
  }
];

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const savedOrders = localStorage.getItem('drcuber-orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      setOrders(sampleOrders);
      localStorage.setItem('drcuber-orders', JSON.stringify(sampleOrders));
    }
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('drcuber-orders', JSON.stringify(orders));
    }
  }, [orders]);

  const userOrders = currentUserId 
    ? orders.filter(order => order.userId === currentUserId)
    : [];

  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'statusHistory'>): Order => {
    const now = new Date().toISOString();
    const orderId = `ORD-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`;
    
    const newOrder: Order = {
      ...orderData,
      id: orderId,
      createdAt: now,
      updatedAt: now,
      statusHistory: [
        { status: orderData.status, timestamp: now }
      ]
    };

    setOrders(prev => [...prev, newOrder]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    const now = new Date().toISOString();
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status,
          updatedAt: now,
          statusHistory: [
            ...order.statusHistory,
            { status, timestamp: now, note }
          ]
        };
      }
      return order;
    }));
  };

  const updateTrackingNumber = (orderId: string, trackingNumber: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          trackingNumber,
          updatedAt: new Date().toISOString()
        };
      }
      return order;
    }));
  };

  const updateEstimatedDelivery = (orderId: string, date: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          estimatedDelivery: date,
          updatedAt: new Date().toISOString()
        };
      }
      return order;
    }));
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  };

  const getOrdersByUserId = (userId: string): Order[] => {
    return orders.filter(order => order.userId === userId);
  };

  const cancelOrder = (orderId: string, reason?: string) => {
    const now = new Date().toISOString();
    setOrders(prev => prev.map(order => {
      if (order.id === orderId && ['pending', 'confirmed', 'processing'].includes(order.status)) {
        return {
          ...order,
          status: 'cancelled' as OrderStatus,
          updatedAt: now,
          statusHistory: [
            ...order.statusHistory,
            { status: 'cancelled' as OrderStatus, timestamp: now, note: reason || 'Cancelled by user' }
          ]
        };
      }
      return order;
    }));
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        userOrders,
        createOrder,
        updateOrderStatus,
        updateTrackingNumber,
        updateEstimatedDelivery,
        getOrderById,
        getOrdersByUserId,
        cancelOrder,
        setCurrentUserId,
        currentUserId
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
