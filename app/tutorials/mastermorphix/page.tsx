'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaCopy, FaCheck, FaChevronDown, FaChevronUp, FaCube } from 'react-icons/fa';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface Algorithm {
  id: number;
  name: string;
  notation: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const algorithmsMastermorphix: Algorithm[] = [
  // Orientation Recognition
  {
    id: 1,
    name: 'Understanding Piece Types',
    notation: 'N/A',
    description: 'Mastermorphix has 3 piece types: triangular corners (like 3x3 corners), trapezoid edges (like 3x3 edges), and pentagonal centers.',
    category: 'Basics',
    difficulty: 'Easy',
  },
  // First Layer
  {
    id: 2,
    name: 'First Layer - Corner Insert Right',
    notation: "R U R'",
    description: 'Insert a triangular corner piece into the first layer from the right.',
    category: 'First Layer',
    difficulty: 'Easy',
  },
  {
    id: 3,
    name: 'First Layer - Corner Insert Left',
    notation: "L' U' L",
    description: 'Insert a triangular corner piece from the left side.',
    category: 'First Layer',
    difficulty: 'Easy',
  },
  {
    id: 4,
    name: 'First Layer - Twisted Corner',
    notation: "R U R' U' R U R' U' R U R'",
    description: 'Fix a corner that is in position but has wrong orientation.',
    category: 'First Layer',
    difficulty: 'Medium',
  },
  // Second Layer
  {
    id: 5,
    name: 'Edge Insert Right',
    notation: "U R U' R' U' F' U F",
    description: 'Insert an edge from top layer to right slot.',
    category: 'Second Layer',
    difficulty: 'Medium',
  },
  {
    id: 6,
    name: 'Edge Insert Left',
    notation: "U' L' U L U F U' F'",
    description: 'Insert an edge from top layer to left slot.',
    category: 'Second Layer',
    difficulty: 'Medium',
  },
  // OLL (Last Layer Orientation)
  {
    id: 7,
    name: 'OLL - Sune',
    notation: "R U R' U R U2 R'",
    description: 'Orient last layer. Same as 3x3 but pay attention to piece shapes!',
    category: 'OLL',
    difficulty: 'Medium',
  },
  {
    id: 8,
    name: 'OLL - Anti-Sune',
    notation: "R U2 R' U' R U' R'",
    description: 'Alternative orientation algorithm.',
    category: 'OLL',
    difficulty: 'Medium',
  },
  {
    id: 9,
    name: 'OLL - Double Sune',
    notation: "R U R' U R U2 R' R U R' U R U2 R'",
    description: 'For cases requiring double application.',
    category: 'OLL',
    difficulty: 'Medium',
  },
  {
    id: 10,
    name: 'OLL - Headlights',
    notation: "R2 D R' U2 R D' R' U2 R'",
    description: 'Solves the headlights OLL case.',
    category: 'OLL',
    difficulty: 'Medium',
  },
  {
    id: 11,
    name: 'OLL - Chameleon',
    notation: "r U R' U' r' F R F'",
    description: 'Good for certain Mastermorphix OLL cases.',
    category: 'OLL',
    difficulty: 'Medium',
  },
  // PLL (Last Layer Permutation)
  {
    id: 12,
    name: 'PLL - T Perm',
    notation: "R U R' U' R' F R2 U' R' U' R U R' F'",
    description: 'Swap adjacent corners and edges. Very common.',
    category: 'PLL',
    difficulty: 'Hard',
  },
  {
    id: 13,
    name: 'PLL - U Perm (a)',
    notation: "R U' R U R U R U' R' U' R2",
    description: 'Cycle three edges clockwise.',
    category: 'PLL',
    difficulty: 'Medium',
  },
  {
    id: 14,
    name: 'PLL - U Perm (b)',
    notation: "R2 U R U R' U' R' U' R' U R'",
    description: 'Cycle three edges counter-clockwise.',
    category: 'PLL',
    difficulty: 'Medium',
  },
  {
    id: 15,
    name: 'PLL - A Perm',
    notation: "x R' U R' D2 R U' R' D2 R2",
    description: 'Cycle three corners.',
    category: 'PLL',
    difficulty: 'Medium',
  },
  {
    id: 16,
    name: 'PLL - H Perm',
    notation: "M2 U M2 U2 M2 U M2",
    description: 'Swap opposite edge pairs.',
    category: 'PLL',
    difficulty: 'Medium',
  },
  // Shape Fixing (Mastermorphix-specific)
  {
    id: 17,
    name: 'Shape Fix - Twisted Top',
    notation: "R U R' U R U2 R' U",
    description: 'When the top layer looks twisted/warped, use this to fix shape.',
    category: 'Shape Fixes',
    difficulty: 'Medium',
  },
  {
    id: 18,
    name: 'Shape Fix - Edge Flip',
    notation: "M U M U M U M U M U",
    description: 'If an edge appears flipped in place (impossible on 3x3).',
    category: 'Shape Fixes',
    difficulty: 'Hard',
  },
  {
    id: 19,
    name: 'Shape Fix - Parity',
    notation: "R U2 R' U' R U' R' L' U2 L U L' U L",
    description: 'Fixes parity-like situations unique to Mastermorphix.',
    category: 'Shape Fixes',
    difficulty: 'Hard',
  },
  {
    id: 20,
    name: 'Shape Fix - Center Orientation',
    notation: "M' U M' U M' U M' U M' U",
    description: 'Centers can be "oriented" wrong due to shape. This fixes it.',
    category: 'Shape Fixes',
    difficulty: 'Medium',
  },
];

const methods = ['All', 'Basics', 'First Layer', 'Second Layer', 'OLL', 'PLL', 'Shape Fixes'];

const tutorialSteps = [
  {
    step: 1,
    title: 'Understand the Puzzle',
    description: 'Mastermorphix is a shape mod of the 3x3. It solves like a 3x3 but looks different. Learn to recognize piece types.',
    tips: ['Triangles = 3x3 corners', 'Trapezoids = 3x3 edges', 'Pentagons = 3x3 centers'],
  },
  {
    step: 2,
    title: 'Solve First Layer',
    description: 'Build one complete triangular face. Match the triangular corners with trapezoid edges.',
    tips: ['Choose any face to start', 'Use standard 3x3 moves', 'Check piece shapes match'],
  },
  {
    step: 3,
    title: 'Solve Second Layer',
    description: 'Insert the middle layer trapezoid pieces using standard F2L-like algorithms.',
    tips: ['Same as 3x3 edge insertion', 'Watch for shape orientation', 'Take your time'],
  },
  {
    step: 4,
    title: 'Last Layer + Shape',
    description: 'Solve the last layer and fix any shape issues that arise.',
    tips: ['OLL first, then PLL', 'May need shape-fixing algorithms', 'Compare to solved state'],
  },
];

export default function MastermorphixPage() {
  const [activeMethod, setActiveMethod] = useState('All');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showTutorial, setShowTutorial] = useState(true);

  const filteredAlgorithms = algorithmsMastermorphix.filter(alg => {
    return activeMethod === 'All' || alg.category === activeMethod;
  });

  const copyToClipboard = (notation: string, id: number) => {
    navigator.clipboard.writeText(notation);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryStats = (category: string) => {
    return algorithmsMastermorphix.filter(a => a.category === category).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-600 to-purple-600 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <Link 
            href="/tutorials" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
          >
            <FaArrowLeft />
            Back to Tutorials
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <FaCube className="text-3xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                Mastermorphix Tutorial
              </h1>
              <p className="text-white/80 mt-1">The Shape-Shifting Puzzle - A 3x3 in disguise</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-medium">Tetrahedron</span>
              <span className="text-white/70 ml-1">Shape</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-medium">3x3</span>
              <span className="text-white/70 ml-1">Mechanism</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-medium">{algorithmsMastermorphix.length}</span>
              <span className="text-white/70 ml-1">Algorithms</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-secondary mb-4">What is a Mastermorphix?</h2>
            <p className="text-gray-600 mb-4">
              The Mastermorphix (also called Masterball or Shape Mod) is a tetrahedron-shaped puzzle that uses 
              the same internal mechanism as a 3x3 Rubik&apos;s Cube. If you can solve a 3x3, you can solve this!
            </p>
            <p className="text-gray-600 mb-4">
              The key difference is that pieces have different shapes, so you need to pay attention to both 
              color AND shape. An edge that looks &quot;solved&quot; by color might actually be flipped, making the 
              puzzle look distorted.
            </p>
            <div className="bg-pink-50 p-4 rounded-xl mt-4">
              <p className="text-pink-700 font-medium">💡 Pro Tip:</p>
              <p className="text-gray-600 text-sm mt-1">
                When scrambled, the Mastermorphix loses its tetrahedral shape. A solved puzzle should have a 
                perfect pyramid shape with smooth faces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorial Section */}
      <section className="py-12 bg-gradient-to-br from-pink-50 to-purple-50 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary">
              Solving Method
            </h2>
            <button
              onClick={() => setShowTutorial(!showTutorial)}
              className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors"
            >
              {showTutorial ? 'Hide' : 'Show'} Tutorial
              {showTutorial ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>

          {showTutorial && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tutorialSteps.map((item) => (
                <div key={item.step} className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-bold text-secondary">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
                  <ul className="space-y-2">
                    {item.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-500">
                        <span className="text-pink-500 mt-1">◆</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Method Selector */}
      <section className="bg-white border-b sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {methods.map((method) => (
              <button
                key={method}
                onClick={() => setActiveMethod(method)}
                className={`px-4 py-2 rounded-full font-medium transition-all flex-shrink-0 ${
                  activeMethod === method
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {method}
                {method !== 'All' && (
                  <span className="ml-2 text-xs opacity-70">({getCategoryStats(method)})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Algorithms List */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-gray-600 mb-8">
            Showing <span className="font-semibold text-secondary">{filteredAlgorithms.length}</span> algorithms
          </p>

          <div className="grid gap-4">
            {filteredAlgorithms.map((alg) => (
              <div 
                key={alg.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === alg.id ? null : alg.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-lg font-bold text-secondary">
                          {alg.name}
                        </h3>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          alg.category === 'Basics' ? 'bg-gray-100 text-gray-600' :
                          alg.category === 'First Layer' ? 'bg-green-100 text-green-600' :
                          alg.category === 'Second Layer' ? 'bg-blue-100 text-blue-600' :
                          alg.category === 'OLL' ? 'bg-yellow-100 text-yellow-600' :
                          alg.category === 'PLL' ? 'bg-purple-100 text-purple-600' :
                          'bg-pink-100 text-pink-600'
                        }`}>
                          {alg.category}
                        </span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          alg.difficulty === 'Easy' ? 'bg-green-100 text-green-600' :
                          alg.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          {alg.difficulty}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <code className="bg-gray-100 px-4 py-2 rounded-lg font-mono text-lg text-pink-600 font-medium">
                          {alg.notation}
                        </code>
                        {alg.notation !== 'N/A' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(alg.notation, alg.id);
                            }}
                            className={`p-2 rounded-lg transition-colors ${
                              copiedId === alg.id 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                            title="Copy algorithm"
                          >
                            {copiedId === alg.id ? <FaCheck /> : <FaCopy />}
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <button className="text-gray-400 hover:text-gray-600 transition-colors p-2">
                      {expandedId === alg.id ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>

                  {expandedId === alg.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
                      <p className="text-gray-600">{alg.description}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Differences */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-8 text-center">
            Key Differences from 3x3
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔺</span>
              </div>
              <h3 className="font-bold text-secondary mb-2">Shape Matters</h3>
              <p className="text-gray-600 text-sm">
                Pieces have unique shapes. A &quot;solved&quot; looking piece might actually be oriented wrong, distorting the puzzle shape.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-bold text-secondary mb-2">Fewer Colors</h3>
              <p className="text-gray-600 text-sm">
                Only 4 colors instead of 6. Each triangular face is one color, making color recognition different.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="font-bold text-secondary mb-2">Hidden Orientation</h3>
              <p className="text-gray-600 text-sm">
                Centers can appear solved but be rotated. You may need extra algorithms to fix the final shape.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
