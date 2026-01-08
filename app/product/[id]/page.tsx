'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { 
  FaInstagram, 
  FaHeart, 
  FaShare, 
  FaAward,
  FaTag,
  FaUndo,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaCube,
  FaCheckCircle,
  FaBox,
  FaRuler,
  FaWeight,
  FaCogs,
  FaMagnet,
  FaPalette,
  FaUsers,
  FaCopy,
  FaTimes
} from 'react-icons/fa';
import { Product } from '../../lib/types';
import { initialProducts } from '../../lib/data';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { CartProvider } from '../../context/CartContext';
import { ProductProvider } from '../../context/ProductContext';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

function ProductDetail({ params }: ProductPageProps) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications'>('description');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Load product from localStorage or initial data
    const savedProducts = localStorage.getItem('drcuber-products');
    const products: Product[] = savedProducts ? JSON.parse(savedProducts) : initialProducts;
    
    const foundProduct = products.find(p => p.id === id);
    setProduct(foundProduct || null);

    if (foundProduct) {
      // Get related products (same category, different product)
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== id)
        .slice(0, 4);
      
      // If not enough related products in same category, add from other categories
      if (related.length < 4) {
        const others = products
          .filter(p => p.category !== foundProduct.category && p.id !== id)
          .slice(0, 4 - related.length);
        related.push(...others);
      }
      
      setRelatedProducts(related);
    }
  }, [id]);

  const generateDetailedMessage = () => {
    if (!product) return '';
    
    const discount = product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

    return `Hi! I'm interested in buying this product from DR.CUBER:

📦 Product: ${product.name}
💰 Price: ₹${product.price}${product.originalPrice ? ` (Original: ₹${product.originalPrice})` : ''}
🏷️ Category: ${product.category}
${discount > 0 ? `🎉 Discount: ${discount}% OFF (Save ₹${product.originalPrice! - product.price})` : ''}
${product.badge ? `✨ ${product.badge}` : ''}

📝 Description:
${product.description}

${product.specifications ? `🔧 Specifications:
${product.specifications.brand ? `Brand: ${product.specifications.brand}` : ''}
${product.specifications.size ? `Size: ${product.specifications.size}` : ''}
${product.specifications.weight ? `Weight: ${product.specifications.weight}` : ''}
${product.specifications.material ? `Material: ${product.specifications.material}` : ''}
` : ''}
Please share more details about:
✅ Current availability
✅ Delivery time and charges
✅ Payment methods
✅ Any ongoing offers

Thank you!`;
  };

  const handleContactInstagram = () => {
    setShowModal(true);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(generateDetailedMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProceedToInstagram = () => {
    window.open('https://www.instagram.com/drcuberofficial/', '_blank');
    setShowModal(false);
  };

  const calculateDiscount = () => {
    if (product?.originalPrice && product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaCube className="text-6xl text-gray-300 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Instagram Message Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaInstagram className="text-3xl" />
                  <div>
                    <h3 className="text-xl font-bold">Contact on Instagram</h3>
                    <p className="text-sm text-white/90">@drcuberofficial</p>
                  </div>
                </div>
                <button onClick={() => setShowModal(false)} className="text-white/80 hover:text-white">
                  <FaTimes className="text-2xl" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-semibold">STEP 1</span>
                Copy this message with product details:
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-80 overflow-y-auto border border-gray-200">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{generateDetailedMessage()}</pre>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-semibold">STEP 2</span>
                Send it to us on Instagram:
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleCopyMessage}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                    copied ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {copied ? <FaCheck className="text-lg" /> : <FaCopy className="text-lg" />}
                  {copied ? 'Copied to Clipboard!' : 'Copy Message'}
                </button>
                <button
                  onClick={handleProceedToInstagram}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  <FaInstagram className="text-xl" />
                  Open Instagram
                </button>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-800">
                  💡 <strong>Tip:</strong> After copying, click "Open Instagram" to go to our profile, then paste the message in DM.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[var(--primary)]">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/#products" className="text-gray-500 hover:text-[var(--primary)] capitalize">{product.category}s</Link>
            <span className="text-gray-300">/</span>
            <span className="text-[var(--secondary)] font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-lg group">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-[var(--primary)] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {product.badge}
                  </span>
                )}
                {calculateDiscount() > 0 && (
                  <span className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    -{calculateDiscount()}% OFF
                  </span>
                )}
                
                {/* Image Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                    >
                      <FaChevronLeft className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => setSelectedImage(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                    >
                      <FaChevronRight className="text-gray-600" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === index 
                          ? 'border-[var(--primary)] shadow-lg' 
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category & Brand */}
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium rounded-full capitalize">
                  {product.category}
                </span>
                {product.specifications?.brand && (
                  <span className="text-gray-500 text-sm">by {product.specifications.brand}</span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-[var(--secondary)]">{product.name}</h1>

              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-[var(--primary)]">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="px-3 py-1 bg-green-100 text-green-600 text-sm font-semibold rounded-full">
                      Save ₹{(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              {/* Short Description */}
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {product.stock > 0 ? (
                  <>
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-green-600 font-medium">
                      In Stock ({product.stock} available)
                    </span>
                  </>
                ) : (
                  <>
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Contact on Instagram to Buy */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={handleContactInstagram}
                  disabled={product.stock === 0}
                  className={`flex-1 min-w-[200px] py-4 px-8 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all ${
                    product.stock === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50 hover:-translate-y-0.5'
                  }`}
                >
                  <FaInstagram className="text-2xl" />
                  <span>Buy on Instagram</span>
                </button>

                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all ${
                    isWishlisted 
                      ? 'border-red-500 bg-red-50 text-red-500' 
                      : 'border-gray-200 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <FaHeart className={`text-xl ${isWishlisted ? 'scale-110' : ''}`} />
                </button>

                <button className="w-14 h-14 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all">
                  <FaShare className="text-xl" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <FaAward className="text-blue-500 text-xl" />
                  </div>
                  <p className="text-sm font-medium text-[var(--secondary)]">Best Product</p>
                  <p className="text-xs text-gray-500">Premium Quality</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <FaTag className="text-orange-500 text-xl" />
                  </div>
                  <p className="text-sm font-medium text-[var(--secondary)]">Affordable Rate</p>
                  <p className="text-xs text-gray-500">Best Prices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="bg-white py-12">
        <div className="container-custom">
          {/* Tab Headers */}
          <div className="flex gap-1 border-b mb-8 overflow-x-auto">
            {(['description', 'specifications'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-semibold capitalize whitespace-nowrap transition-colors relative ${
                  activeTab === tab 
                    ? 'text-[var(--primary)]' 
                    : 'text-gray-500 hover:text-[var(--secondary)]'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)]"></span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl">
            {activeTab === 'description' && (
              <div className="prose prose-lg max-w-none">
                <h3 className="text-2xl font-bold text-[var(--secondary)] mb-4">Product Description</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {product.longDescription || product.description}
                </p>
                
                {/* Features List */}
                <div className="mt-8 grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-[var(--secondary)]">Premium Quality</p>
                      <p className="text-sm text-gray-500">Made with high-grade materials</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-[var(--secondary)]">Smooth Mechanism</p>
                      <p className="text-sm text-gray-500">Effortless turning experience</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-[var(--secondary)]">Competition Ready</p>
                      <p className="text-sm text-gray-500">Meets professional standards</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-[var(--secondary)]">Durable Build</p>
                      <p className="text-sm text-gray-500">Built to last</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && product.specifications && (
              <div>
                <h3 className="text-2xl font-bold text-[var(--secondary)] mb-6">Technical Specifications</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {product.specifications.brand && (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center">
                        <FaCube className="text-[var(--primary)]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Brand</p>
                        <p className="font-semibold text-[var(--secondary)]">{product.specifications.brand}</p>
                      </div>
                    </div>
                  )}
                  {product.specifications.model && (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center">
                        <FaBox className="text-[var(--primary)]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Model</p>
                        <p className="font-semibold text-[var(--secondary)]">{product.specifications.model}</p>
                      </div>
                    </div>
                  )}
                  {product.specifications.dimensions && (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center">
                        <FaRuler className="text-[var(--primary)]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Dimensions</p>
                        <p className="font-semibold text-[var(--secondary)]">{product.specifications.dimensions}</p>
                      </div>
                    </div>
                  )}
                  {product.specifications.weight && (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center">
                        <FaWeight className="text-[var(--primary)]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Weight</p>
                        <p className="font-semibold text-[var(--secondary)]">{product.specifications.weight}</p>
                      </div>
                    </div>
                  )}
                  {product.specifications.material && (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center">
                        <FaCogs className="text-[var(--primary)]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Material</p>
                        <p className="font-semibold text-[var(--secondary)]">{product.specifications.material}</p>
                      </div>
                    </div>
                  )}
                  {product.specifications.mechanism && (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center">
                        <FaCogs className="text-[var(--primary)]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Mechanism</p>
                        <p className="font-semibold text-[var(--secondary)]">{product.specifications.mechanism}</p>
                      </div>
                    </div>
                  )}
                  {product.specifications.magnetized !== undefined && (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center">
                        <FaMagnet className="text-[var(--primary)]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Magnetized</p>
                        <p className="font-semibold text-[var(--secondary)]">{product.specifications.magnetized ? 'Yes' : 'No'}</p>
                      </div>
                    </div>
                  )}
                  {product.specifications.color && (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center">
                        <FaPalette className="text-[var(--primary)]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Color</p>
                        <p className="font-semibold text-[var(--secondary)]">{product.specifications.color}</p>
                      </div>
                    </div>
                  )}
                  {product.specifications.difficulty && (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center">
                        <FaStar className="text-[var(--primary)]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Difficulty</p>
                        <p className="font-semibold text-[var(--secondary)]">{product.specifications.difficulty}</p>
                      </div>
                    </div>
                  )}
                  {product.specifications.ageGroup && (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center">
                        <FaUsers className="text-[var(--primary)]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Age Group</p>
                        <p className="font-semibold text-[var(--secondary)]">{product.specifications.ageGroup}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-[var(--secondary)]">You May Also Like</h2>
                <p className="text-gray-500 mt-1">Similar products you might be interested in</p>
              </div>
              <Link href="/#products" className="text-[var(--primary)] font-semibold hover:underline">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <Link 
                  key={relProduct.id} 
                  href={`/product/${relProduct.id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={relProduct.image}
                      alt={relProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {relProduct.badge && (
                      <span className="absolute top-3 left-3 bg-[var(--primary)] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {relProduct.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[var(--secondary)] line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                      {relProduct.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-2">
                      <FaStar className="text-yellow-400 text-sm" />
                      <span className="text-sm font-medium">{relProduct.rating}</span>
                      <span className="text-xs text-gray-400">({relProduct.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-bold text-[var(--primary)]">₹{relProduct.price}</span>
                      {relProduct.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">₹{relProduct.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

export default function ProductPage(props: ProductPageProps) {
  return (
    <ProductProvider>
      <CartProvider>
        <ProductDetail {...props} />
      </CartProvider>
    </ProductProvider>
  );
}
