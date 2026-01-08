'use client';

import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ProductGrid from './components/ProductGrid';
import About from './components/About';
import Testimonials from './components/Testimonials';
import InstagramPurchase from './components/InstagramPurchase';
import Footer from './components/Footer';
import RubiksCubeLoader from './components/RubiksCubeLoader';
import SmoothScroll from './components/SmoothScroll';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';

export default function Home() {
  return (
    <ProductProvider>
      <CartProvider>
        <RubiksCubeLoader />
        <SmoothScroll>
          <div className="min-h-screen">
            <Header />
            <main>
              <Hero />
              <Features />
              <ProductGrid />
              <About />
              <InstagramPurchase />
            </main>
            <Footer />
          </div>
        </SmoothScroll>
      </CartProvider>
    </ProductProvider>
  );
}
