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

const algorithmsSkewb: Algorithm[] = [
  // Basic Moves
  {
    id: 1,
    name: 'R Move',
    notation: 'R',
    description: 'Rotate the corner closest to your right hand clockwise.',
    category: 'Basics',
    difficulty: 'Easy',
  },
  {
    id: 2,
    name: "R' Move",
    notation: "R'",
    description: 'Rotate the corner closest to your right hand counter-clockwise.',
    category: 'Basics',
    difficulty: 'Easy',
  },
  {
    id: 3,
    name: 'L Move',
    notation: 'L',
    description: 'Rotate the corner closest to your left hand clockwise.',
    category: 'Basics',
    difficulty: 'Easy',
  },
  {
    id: 4,
    name: 'B Move',
    notation: 'B',
    description: 'Rotate the back-bottom corner clockwise.',
    category: 'Basics',
    difficulty: 'Easy',
  },
  // First Layer
  {
    id: 5,
    name: 'Sledgehammer',
    notation: "R' L R L'",
    description: 'The most important Skewb algorithm. Swaps two corners and two centers.',
    category: 'Layer by Layer',
    difficulty: 'Easy',
  },
  {
    id: 6,
    name: 'Hedgehog',
    notation: "L R' L' R",
    description: 'Inverse of Sledgehammer. Alternative swapping algorithm.',
    category: 'Layer by Layer',
    difficulty: 'Easy',
  },
  {
    id: 7,
    name: 'Center Insert',
    notation: "R L' R' L",
    description: 'Move a center piece without disturbing the first layer corner.',
    category: 'Layer by Layer',
    difficulty: 'Easy',
  },
  // Last Layer - Corners
  {
    id: 8,
    name: 'Pi (Anti-Sune)',
    notation: "R L' R' L R L' R' L",
    description: 'Orients corners when they form a "pi" shape. Double Sledgehammer.',
    category: 'Last Layer',
    difficulty: 'Medium',
  },
  {
    id: 9,
    name: 'Sune',
    notation: "R' L R L' R' L R L'",
    description: 'Orients corners in a different pattern than Pi.',
    category: 'Last Layer',
    difficulty: 'Medium',
  },
  {
    id: 10,
    name: 'L Case',
    notation: "R' L R L' R' L R L' R L' R' L",
    description: 'Fixes the L-shaped corner orientation case.',
    category: 'Last Layer',
    difficulty: 'Medium',
  },
  // Last Layer - Centers
  {
    id: 11,
    name: 'Center 3-Cycle',
    notation: "R L' R' L R L' R' L R L' R' L",
    description: 'Cycles three center pieces. Repeat until solved.',
    category: 'Last Layer',
    difficulty: 'Medium',
  },
  {
    id: 12,
    name: 'Z Perm',
    notation: "R' L R L' R' L R L' B R' B' R",
    description: 'Swaps two pairs of centers diagonally.',
    category: 'Last Layer',
    difficulty: 'Hard',
  },
  // Sarah's Method (Advanced)
  {
    id: 13,
    name: "Sarah's First Layer",
    notation: 'Intuitive',
    description: 'Build first face + adjacent centers using intuitive moves.',
    category: "Sarah's Method",
    difficulty: 'Medium',
  },
  {
    id: 14,
    name: "Sarah's OLL Skip",
    notation: "R L' R' L (setup) + algorithm",
    description: 'Setup moves to skip orientation step.',
    category: "Sarah's Method",
    difficulty: 'Hard',
  },
  {
    id: 15,
    name: 'Full Sarah Case 1',
    notation: "R' L R L' B' R B R'",
    description: 'One-look case for full Sarah method.',
    category: "Sarah's Method",
    difficulty: 'Hard',
  },
  // Keyhole Method
  {
    id: 16,
    name: 'Keyhole Insert',
    notation: "R L' R' L'",
    description: 'Insert a corner while preserving a keyhole slot.',
    category: 'Keyhole',
    difficulty: 'Medium',
  },
  {
    id: 17,
    name: 'Keyhole Center',
    notation: "L' R L R'",
    description: 'Insert a center piece using the keyhole.',
    category: 'Keyhole',
    difficulty: 'Medium',
  },
];

const methods = ['All', 'Basics', 'Layer by Layer', 'Last Layer', "Sarah's Method", 'Keyhole'];

const tutorialSteps = [
  {
    step: 1,
    title: 'First Face',
    description: 'Solve one complete face including the center and 4 corners that touch it.',
    tips: ['Pick any color to start', 'Centers are fixed positions', 'Work on corners first'],
  },
  {
    step: 2,
    title: 'Opposite Corners',
    description: 'Position the remaining corners on the opposite side of the cube.',
    tips: ['Use Sledgehammer', 'Corners cycle in 3s', 'Setup moves help'],
  },
  {
    step: 3,
    title: 'Orient Corners',
    description: 'Twist the last layer corners so they all match their faces.',
    tips: ['Use Pi/Sune algorithms', 'May need multiple applications', 'Recognize patterns'],
  },
  {
    step: 4,
    title: 'Solve Centers',
    description: 'Cycle the center pieces to their correct positions.',
    tips: ['Use center 3-cycle', 'Centers don\'t move with corners', 'Last step is easy!'],
  },
];

export default function SkewbPage() {
  const [activeMethod, setActiveMethod] = useState('All');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showTutorial, setShowTutorial] = useState(true);

  const filteredAlgorithms = algorithmsSkewb.filter(alg => {
    return activeMethod === 'All' || alg.category === activeMethod;
  });

  const copyToClipboard = (notation: string, id: number) => {
    navigator.clipboard.writeText(notation);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryStats = (category: string) => {
    return algorithmsSkewb.filter(a => a.category === category).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-600 to-blue-600 py-16 md:py-20">
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
                Skewb Tutorial
              </h1>
              <p className="text-white/80 mt-1">The Corner-Turning Puzzle - Quick and fun!</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-medium">8</span>
              <span className="text-white/70 ml-1">Corners</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-medium">6</span>
              <span className="text-white/70 ml-1">Centers</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-medium">{algorithmsSkewb.length}</span>
              <span className="text-white/70 ml-1">Algorithms</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-secondary mb-4">About the Skewb</h2>
            <p className="text-gray-600 mb-4">
              The Skewb is a corner-turning puzzle invented by Tony Durham. Unlike the Rubik&apos;s Cube 
              where faces turn, the Skewb rotates around its corners, creating a unique solving experience.
            </p>
            <p className="text-gray-600">
              With only 3,149,280 possible positions (compared to 43 quintillion for the 3x3), the Skewb 
              can always be solved in 11 moves or fewer! It&apos;s a great puzzle for WCA competitions.
            </p>
          </div>
        </div>
      </section>

      {/* Tutorial Section */}
      <section className="py-12 bg-gradient-to-br from-cyan-50 to-blue-50 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary">
              Layer-by-Layer Method
            </h2>
            <button
              onClick={() => setShowTutorial(!showTutorial)}
              className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 transition-colors"
            >
              {showTutorial ? 'Hide' : 'Show'} Tutorial
              {showTutorial ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>

          {showTutorial && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tutorialSteps.map((item) => (
                <div key={item.step} className="bg-white rounded-2xl p-6 shadow-lg border border-cyan-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-bold text-secondary">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
                  <ul className="space-y-2">
                    {item.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-500">
                        <span className="text-cyan-500 mt-1">◇</span>
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
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
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
                          alg.category === 'Layer by Layer' ? 'bg-green-100 text-green-600' :
                          alg.category === 'Last Layer' ? 'bg-orange-100 text-orange-600' :
                          alg.category === "Sarah's Method" ? 'bg-purple-100 text-purple-600' :
                          'bg-cyan-100 text-cyan-600'
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
                        <code className="bg-gray-100 px-4 py-2 rounded-lg font-mono text-lg text-cyan-600 font-medium">
                          {alg.notation}
                        </code>
                        {alg.notation !== 'Intuitive' && (
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

      {/* Notation Guide */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-8 text-center">
            Skewb Notation
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { move: 'R', desc: 'Right corner clockwise', color: 'bg-blue-500' },
              { move: "R'", desc: 'Right corner counter-CW', color: 'bg-blue-400' },
              { move: 'L', desc: 'Left corner clockwise', color: 'bg-green-500' },
              { move: "L'", desc: 'Left corner counter-CW', color: 'bg-green-400' },
              { move: 'B', desc: 'Back corner clockwise', color: 'bg-orange-500' },
              { move: "B'", desc: 'Back corner counter-CW', color: 'bg-orange-400' },
              { move: 'U', desc: 'Top corner clockwise', color: 'bg-yellow-500' },
              { move: "U'", desc: 'Top corner counter-CW', color: 'bg-yellow-400' },
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

      <Footer />
    </div>
  );
}
