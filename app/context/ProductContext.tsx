'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Product } from '../lib/types';
import { initialProducts } from '../lib/data';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  refreshProducts: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const loadProducts = useCallback(() => {
    const savedProducts = localStorage.getItem('drcuber-products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  useEffect(() => {
    loadProducts();
    
    // Listen for storage changes from other tabs/admin panel
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'drcuber-products' && e.newValue) {
        setProducts(JSON.parse(e.newValue));
      }
    };
    
    // Also listen for custom events from same tab
    const handleCustomStorage = () => {
      loadProducts();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('drcuber-products-updated', handleCustomStorage);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('drcuber-products-updated', handleCustomStorage);
    };
  }, [loadProducts]);

  const saveProducts = useCallback((newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('drcuber-products', JSON.stringify(newProducts));
  }, []);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString()
    };
    saveProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    saveProducts(
      products.map(product =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    saveProducts(products.filter(product => product.id !== id));
  };

  const getProduct = (id: string) => {
    return products.find(product => product.id === id);
  };

  const refreshProducts = () => {
    loadProducts();
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct,
        refreshProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
