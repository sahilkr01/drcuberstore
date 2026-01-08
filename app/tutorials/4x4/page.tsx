'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaCube, FaArrowLeft, FaCopy, FaCheck, FaChevronDown, FaChevronUp } from 'react-icons/fa';
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

const algorithms4x4: Algorithm[] = [
  // Centers
  {
    id: 1,
    name: 'Fix Opposite Centers',
    notation: "r U r'",
    description: 'Move a center piece from front to top face.',
    category: 'Centers',
    difficulty: 'Easy',
  },
  {
    id: 2,
    name: 'Center Commutator',
    notation: "r U r' U r U2 r'",
    description: 'Swap center pieces without disturbing others.',
    category: 'Centers',
    difficulty: 'Medium',
  },
  {
    id: 3,
    name: 'Half Center',
    notation: "r2 U r2",
    description: 'Move two center pieces at once.',
    category: 'Centers',
    difficulty: 'Easy',
  },
  // Edge Pairing
  {
    id: 4,
    name: 'Basic Edge Pairing',
    notation: "U' R U R'",
    description: 'Basic technique for pairing edges in the top layer.',
    category: 'Edge Pairing',
    difficulty: 'Easy',
  },
  {
    id: 5,
    name: 'Flipping Edge Pairing',
    notation: "Uw' R U' R' Uw",
    description: 'Pair edges when one needs to be flipped.',
    category: 'Edge Pairing',
    difficulty: 'Medium',
  },
  {
    id: 6,
    name: 'Edge Insert Right',
    notation: "d R F' U R' F d'",
    description: 'Insert an edge from holding area to pairing position.',
    category: 'Edge Pairing',
    difficulty: 'Medium',
  },
  {
    id: 7,
    name: 'Edge Insert Left',
    notation: "d' L' F U' L F' d",
    description: 'Left-hand version of edge insertion.',
    category: 'Edge Pairing',
    difficulty: 'Medium',
  },
  {
    id: 8,
    name: 'Slice Flip',
    notation: "Uw R U R' F R' F' R Uw'",
    description: 'Flip an edge piece in place during pairing.',
    category: 'Edge Pairing',
    difficulty: 'Hard',
  },
  // Parity Algorithms
  {
    id: 9,
    name: 'OLL Parity',
    notation: "Rw U2 x Rw U2 Rw U2 Rw' U2 Lw U2 Rw' U2 Rw U2 Rw' U2 Rw'",
    description: 'Fixes the OLL parity where one edge is flipped. Essential 4x4 algorithm.',
    category: 'Parity',
    difficulty: 'Hard',
  },
  {
    id: 10,
    name: 'OLL Parity (Alternative)',
    notation: "Rw' U2 Rw' U2 x' U2 Rw' U2 Rw U2 Rw' U2 Rw2 U2",
    description: 'Alternative OLL parity algorithm that some find easier.',
    category: 'Parity',
    difficulty: 'Hard',
  },
  {
    id: 11,
    name: 'PLL Parity (Adjacent)',
    notation: "r2 U2 r2 Uw2 r2 Uw2",
    description: 'Swaps two adjacent edges on the last layer. Common PLL parity.',
    category: 'Parity',
    difficulty: 'Medium',
  },
  {
    id: 12,
    name: 'PLL Parity (Opposite)',
    notation: "r2 U2 r2 Uw2 r2 u2",
    description: 'Swaps two opposite edges on the last layer.',
    category: 'Parity',
    difficulty: 'Medium',
  },
  // 3x3 Stage
  {
    id: 13,
    name: 'Standard Cross',
    notation: "F R U R' U' F'",
    description: 'Same as 3x3 cross algorithm.',
    category: '3x3 Stage',
    difficulty: 'Easy',
  },
  {
    id: 14,
    name: 'Wide Sune',
    notation: "r U R' U R U2 r'",
    description: 'Sune using wide moves, helps avoid parity setup.',
    category: '3x3 Stage',
    difficulty: 'Medium',
  },
  {
    id: 15,
    name: 'Wide Anti-Sune',
    notation: "r U2 R' U' R U' r'",
    description: 'Anti-Sune with wide moves.',
    category: '3x3 Stage',
    difficulty: 'Medium',
  },
  // Yau Method
  {
    id: 16,
    name: 'Yau - Cross Edge',
    notation: "u' R U R' u",
    description: 'Insert cross edge in Yau method.',
    category: 'Yau Method',
    difficulty: 'Medium',
  },
  {
    id: 17,
    name: 'Yau - Last 4 Edges',
    notation: "u R U R' F R' F' R u'",
    description: 'Technique for last 4 edges in Yau.',
    category: 'Yau Method',
    difficulty: 'Hard',
  },
  {
    id: 18,
    name: 'Yau - 3-2-3 Edge',
    notation: "Uw' R U R' Uw",
    description: 'Edge pairing move in 3-2-3 stage.',
    category: 'Yau Method',
    difficulty: 'Medium',
  },
  // Redux Method
  {
    id: 19,
    name: 'Redux - Edge Flip',
    notation: "R U R' F R' F' R",
    description: 'Flip edges during Redux solving.',
    category: 'Redux',
    difficulty: 'Medium',
  },
  {
    id: 20,
    name: 'Redux - Last Two Centers',
    notation: "r U r' U' r' F r F'",
    description: 'Finish last two centers efficiently.',
    category: 'Redux',
    difficulty: 'Medium',
  },
  // Advanced
  {
    id: 21,
    name: 'Double Parity',
    notation: "Rw U2 Rw U2 Rw U2 Rw U2 Rw U2",
    description: 'When both OLL and PLL parity occur together.',
    category: 'Advanced',
    difficulty: 'Hard',
  },
  {
    id: 22,
    name: 'Last 2 Edges (Flipped)',
    notation: "Uw R U R' F R' F' R Uw'",
    description: 'Handle last 2 edges when one is flipped.',
    category: 'Advanced',
    difficulty: 'Hard',
  },
];

const methods = ['All', 'Centers', 'Edge Pairing', 'Parity', '3x3 Stage', 'Yau Method', 'Redux', 'Advanced'];

const tutorialSteps = [
  {
    step: 1,
    title: 'Solve Centers',
    description: 'Build all 6 center blocks (4 pieces each). Start with opposite colors, then adjacent.',
    tips: ['White and yellow first (opposite)', 'Use simple r moves', 'Keep solved centers on top/bottom'],
  },
  {
    step: 2,
    title: 'Pair Edges',
    description: 'Pair up all 12 edge pairs to create edge pieces that match the 3x3 cube.',
    tips: ['Use slice moves (u, d)', 'Work in groups', 'Save last 4 edges for end'],
  },
  {
    step: 3,
    title: 'Solve like 3x3',
    description: 'Use your normal 3x3 method (CFOP, Roux, etc.) to solve the cube.',
    tips: ['Be careful with wide moves', 'Watch for parity', 'Standard 3x3 algorithms work'],
  },
  {
    step: 4,
    title: 'Fix Parity',
    description: 'If you get parity cases, use the special algorithms to fix them.',
    tips: ['OLL Parity = one flipped edge', 'PLL Parity = two edges swapped', 'Learn both algorithms well'],
  },
];

export default function FourByFourPage() {
  const [activeMethod, setActiveMethod] = useState('All');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showTutorial, setShowTutorial] = useState(true);

  const filteredAlgorithms = algorithms4x4.filter(alg => {
    return activeMethod === 'All' || alg.category === activeMethod;
  });

  const copyToClipboard = (notation: string, id: number) => {
    navigator.clipboard.writeText(notation);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryStats = (category: string) => {
    return algorithms4x4.filter(a => a.category === category).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-600 to-red-600 py-16 md:py-20">
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
                4x4 Cube Tutorial
              </h1>
              <p className="text-white/80 mt-1">The Rubik&apos;s Revenge - Master the big cube</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-medium">56</span>
              <span className="text-white/70 ml-1">Pieces</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-medium">24</span>
              <span className="text-white/70 ml-1">Centers</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-medium">24</span>
              <span className="text-white/70 ml-1">Edge Pairs</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-medium">{algorithms4x4.length}</span>
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
              Reduction Method Tutorial
            </h2>
            <button
              onClick={() => setShowTutorial(!showTutorial)}
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
            >
              {showTutorial ? 'Hide' : 'Show'} Tutorial
              {showTutorial ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>

          {showTutorial && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tutorialSteps.map((item) => (
                <div key={item.step} className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-bold text-secondary">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
                  <ul className="space-y-2">
                    {item.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-500">
                        <span className="text-orange-500 mt-1">•</span>
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
                    ? 'bg-orange-600 text-white'
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
                          alg.category === 'Centers' ? 'bg-yellow-100 text-yellow-600' :
                          alg.category === 'Edge Pairing' ? 'bg-blue-100 text-blue-600' :
                          alg.category === 'Parity' ? 'bg-red-100 text-red-600' :
                          alg.category === '3x3 Stage' ? 'bg-green-100 text-green-600' :
                          alg.category === 'Yau Method' ? 'bg-purple-100 text-purple-600' :
                          alg.category === 'Redux' ? 'bg-teal-100 text-teal-600' :
                          'bg-orange-100 text-orange-600'
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
                      
                      <div className="flex items-center gap-3 flex-wrap">
                        <code className="bg-gray-100 px-4 py-2 rounded-lg font-mono text-base text-orange-600 font-medium break-all">
                          {alg.notation}
                        </code>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(alg.notation, alg.id);
                          }}
                          className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
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
                    
                    <button className="text-gray-400 hover:text-gray-600 transition-colors p-2 flex-shrink-0">
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
                              className="bg-orange-50 text-orange-600 px-3 py-1 rounded-lg font-mono text-sm"
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

      {/* Notation Guide */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-8 text-center">
            4x4 Special Notation
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { move: 'r', desc: 'Wide right (2 layers)', color: 'bg-blue-500' },
              { move: 'Rw', desc: 'Same as r', color: 'bg-blue-400' },
              { move: 'u', desc: 'Wide up (2 layers)', color: 'bg-yellow-500' },
              { move: 'Uw', desc: 'Same as u', color: 'bg-yellow-400' },
              { move: 'l', desc: 'Wide left (2 layers)', color: 'bg-green-500' },
              { move: 'd', desc: 'Wide down (2 layers)', color: 'bg-gray-500' },
              { move: 'f', desc: 'Wide front (2 layers)', color: 'bg-red-500' },
              { move: 'b', desc: 'Wide back (2 layers)', color: 'bg-orange-500' },
            ].map((item) => (
              <div key={item.move} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                  {item.move}
                </div>
                <div>
                  <span className="font-mono font-bold text-secondary">{item.move}</span>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parity Explained */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-8 text-center">
            Understanding Parity
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-red-600 mb-4">OLL Parity</h3>
              <p className="text-gray-600 mb-4">
                This occurs when a single edge piece is flipped on the last layer. This is impossible on a 3x3 but happens on 4x4 due to how edges are paired.
              </p>
              <div className="bg-red-50 p-4 rounded-xl">
                <p className="text-sm font-medium text-red-700">How to recognize:</p>
                <p className="text-sm text-gray-600 mt-1">One edge has wrong orientation when you reach OLL stage.</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-orange-600 mb-4">PLL Parity</h3>
              <p className="text-gray-600 mb-4">
                This happens when two edge pieces need to be swapped. Again, impossible on 3x3 but common on 4x4.
              </p>
              <div className="bg-orange-50 p-4 rounded-xl">
                <p className="text-sm font-medium text-orange-700">How to recognize:</p>
                <p className="text-sm text-gray-600 mt-1">Two adjacent or opposite edges swapped after solving PLL.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
