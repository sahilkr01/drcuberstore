'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaCube, FaArrowLeft, FaCopy, FaCheck, FaChevronDown, FaChevronUp, FaPlayCircle } from 'react-icons/fa';
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

const algorithms2x2: Algorithm[] = [
  // Layer by Layer Method
  {
    id: 1,
    name: 'First Layer - Right Insert',
    notation: "R U R'",
    description: 'Insert a corner piece from the top layer into the bottom right position.',
    category: 'Layer by Layer',
    difficulty: 'Easy',
  },
  {
    id: 2,
    name: 'First Layer - Left Insert',
    notation: "L' U' L",
    description: 'Insert a corner piece from the top layer into the bottom left position.',
    category: 'Layer by Layer',
    difficulty: 'Easy',
  },
  {
    id: 3,
    name: 'First Layer - Twisted Corner',
    notation: "R U R' U' R U R'",
    description: 'Fix a corner that is in position but twisted wrong.',
    category: 'Layer by Layer',
    difficulty: 'Easy',
  },
  // Ortega Method
  {
    id: 4,
    name: 'Ortega - Sune',
    notation: "R U R' U R U2 R'",
    description: 'Orient one corner on top layer. Basic OLL for Ortega method.',
    category: 'Ortega',
    difficulty: 'Easy',
  },
  {
    id: 5,
    name: 'Ortega - Anti-Sune',
    notation: "R U2 R' U' R U' R'",
    description: 'Orient one corner differently. Alternative OLL for Ortega.',
    category: 'Ortega',
    difficulty: 'Easy',
  },
  {
    id: 6,
    name: 'Ortega - Headlights',
    notation: "F R U R' U' R U R' U' F'",
    description: 'When you have headlights (two same-colored corners) facing you.',
    category: 'Ortega',
    difficulty: 'Medium',
  },
  {
    id: 7,
    name: 'Ortega - Pi (Bruno)',
    notation: "F R U R' U' R U R' U' F'",
    description: 'Solves the Pi/Bruno case where corners form a bar pattern.',
    category: 'Ortega',
    difficulty: 'Medium',
  },
  {
    id: 8,
    name: 'PBL - Adjacent Swap',
    notation: "R U' R F2 R' U R'",
    description: 'Swap two adjacent corners on both layers. Key PBL algorithm.',
    category: 'Ortega',
    difficulty: 'Medium',
  },
  {
    id: 9,
    name: 'PBL - Diagonal Swap',
    notation: "R2 F2 R2",
    description: 'Swap diagonal corners on both layers simultaneously.',
    category: 'Ortega',
    difficulty: 'Easy',
  },
  {
    id: 10,
    name: 'PBL - Top Adjacent',
    notation: "R U R' U' R' F R2 U' R' U' R U R' F'",
    description: 'Swap only adjacent corners on top layer.',
    category: 'Ortega',
    difficulty: 'Medium',
  },
  // CLL (Corner Last Layer)
  {
    id: 11,
    name: 'CLL - Sune',
    notation: "R U R' U R U2 R'",
    description: 'Sune for 2x2. One of the most common CLLs.',
    category: 'CLL',
    difficulty: 'Easy',
  },
  {
    id: 12,
    name: 'CLL - Anti-Sune',
    notation: "R U2 R' U' R U' R'",
    description: 'Anti-Sune for 2x2. Mirror of Sune case.',
    category: 'CLL',
    difficulty: 'Easy',
  },
  {
    id: 13,
    name: 'CLL - H',
    notation: "R2 U2 R U2 R2",
    description: 'H permutation - swaps corners diagonally.',
    category: 'CLL',
    difficulty: 'Easy',
  },
  {
    id: 14,
    name: 'CLL - Pi',
    notation: "R U2 R2 U' R2 U' R2 U2 R",
    description: 'Pi case - corners form a bar on opposite sides.',
    category: 'CLL',
    difficulty: 'Medium',
  },
  {
    id: 15,
    name: 'CLL - U',
    notation: "R2 U R2 U' R2",
    description: 'U permutation for corners.',
    category: 'CLL',
    difficulty: 'Easy',
  },
  {
    id: 16,
    name: 'CLL - T',
    notation: "R U R' U' R' F R F'",
    description: 'T permutation adapted for 2x2.',
    category: 'CLL',
    difficulty: 'Medium',
  },
  {
    id: 17,
    name: 'CLL - L',
    notation: "F R U' R' U' R U R' F'",
    description: 'L case - two corners oriented correctly adjacent.',
    category: 'CLL',
    difficulty: 'Medium',
  },
  // EG-1 (Advanced)
  {
    id: 18,
    name: 'EG-1 Sune',
    notation: "R U R' U R U' R' U R U2 R'",
    description: 'EG-1 variation of Sune for faster solves.',
    category: 'EG-1',
    difficulty: 'Hard',
  },
  {
    id: 19,
    name: 'EG-1 Anti-Sune',
    notation: "R U2 R' U' R U R' U' R U' R'",
    description: 'EG-1 variation of Anti-Sune.',
    category: 'EG-1',
    difficulty: 'Hard',
  },
  {
    id: 20,
    name: 'EG-1 Pi',
    notation: "R U' R' U' F U2 F' U' R U' R'",
    description: 'Advanced EG-1 algorithm for Pi case.',
    category: 'EG-1',
    difficulty: 'Hard',
  },
];

const methods = ['All', 'Layer by Layer', 'Ortega', 'CLL', 'EG-1'];

const tutorialSteps = [
  {
    step: 1,
    title: 'Solve First Layer',
    description: 'Build one complete face with matching sides. Start with any color you prefer (white is traditional).',
    tips: ['Look for corners with your chosen color', 'Position them one by one', 'Match adjacent colors too'],
  },
  {
    step: 2,
    title: 'Orient Last Layer',
    description: 'Get all the remaining corners to have the same color on top without worrying about their position.',
    tips: ['Use Sune or Anti-Sune algorithms', 'Count oriented corners to choose algorithm', 'Hold cube so oriented corners are in back-left'],
  },
  {
    step: 3,
    title: 'Permute Last Layer',
    description: 'Move the corners to their correct positions to complete the solve.',
    tips: ['Check for "headlights" (matching colors)', 'Use PBL algorithms', 'AUF to finish'],
  },
];

export default function TwoByTwoPage() {
  const [activeMethod, setActiveMethod] = useState('All');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showTutorial, setShowTutorial] = useState(true);

  const filteredAlgorithms = algorithms2x2.filter(alg => {
    return activeMethod === 'All' || alg.category === activeMethod;
  });

  const copyToClipboard = (notation: string, id: number) => {
    navigator.clipboard.writeText(notation);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryStats = (category: string) => {
    return algorithms2x2.filter(a => a.category === category).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-teal-600 py-16 md:py-20">
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
                2x2 Cube Tutorial
              </h1>
              <p className="text-white/80 mt-1">The Pocket Cube - Master the mini cube</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-medium">8</span>
              <span className="text-white/70 ml-1">Corner Pieces</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-medium">3</span>
              <span className="text-white/70 ml-1">Solving Methods</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-medium">{algorithms2x2.length}</span>
              <span className="text-white/70 ml-1">Algorithms</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorial Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary">
              Beginner Tutorial
            </h2>
            <button
              onClick={() => setShowTutorial(!showTutorial)}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
            >
              {showTutorial ? 'Hide' : 'Show'} Tutorial
              {showTutorial ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>

          {showTutorial && (
            <div className="grid md:grid-cols-3 gap-6">
              {tutorialSteps.map((item) => (
                <div key={item.step} className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border border-green-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-bold text-secondary">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <ul className="space-y-2">
                    {item.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-500">
                        <span className="text-green-500 mt-1">•</span>
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
                    ? 'bg-green-600 text-white'
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
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-secondary">
                          {alg.name}
                        </h3>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          alg.category === 'Layer by Layer' ? 'bg-green-100 text-green-600' :
                          alg.category === 'Ortega' ? 'bg-blue-100 text-blue-600' :
                          alg.category === 'CLL' ? 'bg-orange-100 text-orange-600' :
                          'bg-purple-100 text-purple-600'
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
                        <code className="bg-gray-100 px-4 py-2 rounded-lg font-mono text-lg text-green-600 font-medium">
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
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-500 mb-2">Move Breakdown:</h4>
                        <div className="flex flex-wrap gap-2">
                          {alg.notation.split(' ').map((move, idx) => (
                            <span 
                              key={idx}
                              className="bg-green-50 text-green-600 px-3 py-1 rounded-lg font-mono text-sm"
                            >
                              {move}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-8 text-center">
            2x2 Tips & Tricks
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-green-50 rounded-2xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-bold text-secondary mb-2">Ortega Method</h3>
              <p className="text-gray-600 text-sm">
                The Ortega method is perfect for sub-5 second solves. Build both faces, then solve with PBL.
              </p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-2xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-bold text-secondary mb-2">Look Ahead</h3>
              <p className="text-gray-600 text-sm">
                Practice looking at what comes next while executing algorithms. This is key for speed!
              </p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-2xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="font-bold text-secondary mb-2">Pattern Recognition</h3>
              <p className="text-gray-600 text-sm">
                Learn to recognize cases quickly. The 2x2 only has corners, making pattern recognition easier.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
