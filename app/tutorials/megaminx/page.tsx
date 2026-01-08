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

const algorithmsMegaminx: Algorithm[] = [
  // Star (First Layer)
  {
    id: 1,
    name: 'Edge Insert',
    notation: "R U R'",
    description: 'Basic edge insertion for building the star on the first face.',
    category: 'Star',
    difficulty: 'Easy',
  },
  {
    id: 2,
    name: 'Edge Flip',
    notation: "R U R' U R U2 R'",
    description: 'Flip an edge that is in position but oriented wrong.',
    category: 'Star',
    difficulty: 'Easy',
  },
  // First Layer Corners
  {
    id: 3,
    name: 'Corner Insert Right',
    notation: "R U R'",
    description: 'Insert corner from top to bottom-right slot.',
    category: 'First Layer',
    difficulty: 'Easy',
  },
  {
    id: 4,
    name: 'Corner Insert Left',
    notation: "L' U' L",
    description: 'Insert corner from top to bottom-left slot.',
    category: 'First Layer',
    difficulty: 'Easy',
  },
  {
    id: 5,
    name: 'Corner Twist',
    notation: "R U R' U' R U R' U' R U R'",
    description: 'Twist a corner that is in position but oriented wrong.',
    category: 'First Layer',
    difficulty: 'Medium',
  },
  // F2L (Second Layer)
  {
    id: 6,
    name: 'F2L Right',
    notation: "U R U' R' U' F' U F",
    description: 'Insert edge-corner pair into right slot.',
    category: 'F2L',
    difficulty: 'Medium',
  },
  {
    id: 7,
    name: 'F2L Left',
    notation: "U' L' U L U F U' F'",
    description: 'Insert edge-corner pair into left slot.',
    category: 'F2L',
    difficulty: 'Medium',
  },
  {
    id: 8,
    name: 'F2L Reverse Right',
    notation: "U' R U R' U R U' R'",
    description: 'Alternative F2L insertion when edge is flipped.',
    category: 'F2L',
    difficulty: 'Medium',
  },
  // OLL (Last Layer Orientation)
  {
    id: 9,
    name: 'Sune',
    notation: "R U R' U R U2 R'",
    description: 'Basic orientation algorithm - same as 3x3.',
    category: 'OLL',
    difficulty: 'Medium',
  },
  {
    id: 10,
    name: 'Anti-Sune',
    notation: "R U2 R' U' R U' R'",
    description: 'Mirror of Sune for different orientations.',
    category: 'OLL',
    difficulty: 'Medium',
  },
  {
    id: 11,
    name: 'OLL Star Case',
    notation: "F R U R' U' R U R' U' F'",
    description: 'Orients the star on last face.',
    category: 'OLL',
    difficulty: 'Medium',
  },
  {
    id: 12,
    name: 'OLL Corner Twist',
    notation: "R U R' U R U2 R' (repeated for each corner)",
    description: 'Twist corners one at a time to orient last layer.',
    category: 'OLL',
    difficulty: 'Medium',
  },
  // PLL (Last Layer Permutation)
  {
    id: 13,
    name: 'Edge 3-Cycle',
    notation: "R2 U R U R' U' R' U' R' U R'",
    description: 'Cycles three edges on the last layer.',
    category: 'PLL',
    difficulty: 'Medium',
  },
  {
    id: 14,
    name: 'Corner 3-Cycle',
    notation: "R U R' U' R' F R2 U' R' U' R U R' F'",
    description: 'Cycles three corners on the last layer.',
    category: 'PLL',
    difficulty: 'Hard',
  },
  {
    id: 15,
    name: 'Adjacent Edge Swap',
    notation: "R2 U R2 U' R2 U' R2 U R2 U2 R2",
    description: 'Swaps two adjacent edges.',
    category: 'PLL',
    difficulty: 'Medium',
  },
  // Advanced
  {
    id: 16,
    name: 'Star Shortcut',
    notation: "R U R' U' R' F R F'",
    description: 'Quick star building technique.',
    category: 'Advanced',
    difficulty: 'Hard',
  },
  {
    id: 17,
    name: 'Double Layer Turn',
    notation: "Rw U Rw'",
    description: 'Wide move for last layer tricks.',
    category: 'Advanced',
    difficulty: 'Hard',
  },
];

const methods = ['All', 'Star', 'First Layer', 'F2L', 'OLL', 'PLL', 'Advanced'];

const tutorialSteps = [
  {
    step: 1,
    title: 'Build the Star',
    description: 'Create a 5-pointed star on your first face by placing 5 edges correctly.',
    tips: ['Choose any color to start', 'Edges form a star pattern', 'Use simple R moves'],
  },
  {
    step: 2,
    title: 'First Layer Corners',
    description: 'Insert all 5 corners around your star to complete the first layer.',
    tips: ['Same as 3x3 corner insertion', 'Watch corner orientation', 'Match 3 colors per corner'],
  },
  {
    step: 3,
    title: 'F2L (5 Layers)',
    description: 'Build up the next 5 "bands" around the puzzle using F2L techniques.',
    tips: ['Work in pairs like 3x3', 'Takes patience!', '5 edge-corner pairs per layer'],
  },
  {
    step: 4,
    title: 'Last Layer',
    description: 'Orient then permute the last layer star, edges, and corners.',
    tips: ['Similar to 3x3 last layer', 'OLL then PLL', 'Use same algorithms'],
  },
];

export default function MegaminxPage() {
  const [activeMethod, setActiveMethod] = useState('All');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showTutorial, setShowTutorial] = useState(true);

  const filteredAlgorithms = algorithmsMegaminx.filter(alg => {
    return activeMethod === 'All' || alg.category === activeMethod;
  });

  const copyToClipboard = (notation: string, id: number) => {
    navigator.clipboard.writeText(notation);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryStats = (category: string) => {
    return algorithmsMegaminx.filter(a => a.category === category).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-violet-600 py-16 md:py-20">
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
                Megaminx Tutorial
              </h1>
              <p className="text-white/80 mt-1">The Dodecahedron Puzzle - 12 faces of fun!</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-medium">12</span>
              <span className="text-white/70 ml-1">Faces</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-medium">50</span>
              <span className="text-white/70 ml-1">Pieces</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-medium">{algorithmsMegaminx.length}</span>
              <span className="text-white/70 ml-1">Algorithms</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-secondary mb-4">About the Megaminx</h2>
            <p className="text-gray-600 mb-4">
              The Megaminx is a dodecahedron-shaped puzzle with 12 pentagonal faces. Despite looking 
              intimidating, if you can solve a 3x3 Rubik&apos;s Cube, you already know most of the 
              algorithms needed!
            </p>
            <p className="text-gray-600">
              The main difference is that instead of 4 edges per layer, you have 5, and instead of 
              6 faces, you have 12. The solving method is essentially the same as a beginner 3x3 method.
            </p>
          </div>
        </div>
      </section>

      {/* Tutorial Section */}
      <section className="py-12 bg-gradient-to-br from-indigo-50 to-violet-50 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary">
              Solving Method
            </h2>
            <button
              onClick={() => setShowTutorial(!showTutorial)}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              {showTutorial ? 'Hide' : 'Show'} Tutorial
              {showTutorial ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>

          {showTutorial && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tutorialSteps.map((item) => (
                <div key={item.step} className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-500 text-white rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-bold text-secondary">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
                  <ul className="space-y-2">
                    {item.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-500">
                        <span className="text-indigo-500 mt-1">⬡</span>
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
                    ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white'
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
                          alg.category === 'Star' ? 'bg-yellow-100 text-yellow-600' :
                          alg.category === 'First Layer' ? 'bg-green-100 text-green-600' :
                          alg.category === 'F2L' ? 'bg-blue-100 text-blue-600' :
                          alg.category === 'OLL' ? 'bg-orange-100 text-orange-600' :
                          alg.category === 'PLL' ? 'bg-purple-100 text-purple-600' :
                          'bg-indigo-100 text-indigo-600'
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
                        <code className="bg-gray-100 px-4 py-2 rounded-lg font-mono text-lg text-indigo-600 font-medium">
                          {alg.notation}
                        </code>
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

      <Footer />
    </div>
  );
}
