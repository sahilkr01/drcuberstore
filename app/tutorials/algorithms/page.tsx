'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaCogs, FaArrowLeft, FaCopy, FaCheck, FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const methods = ['All', 'Beginner', 'CFOP', 'OLL', 'PLL', 'F2L'];

interface Algorithm {
  id: number;
  name: string;
  notation: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  image?: string;
}

const algorithms: Algorithm[] = [
  // Beginner Algorithms
  {
    id: 1,
    name: 'White Cross',
    notation: "F R U R' U' F'",
    description: 'Basic move to orient white edge pieces to form a cross on the white face.',
    category: 'Beginner',
    difficulty: 'Easy',
  },
  {
    id: 2,
    name: 'Right Trigger',
    notation: "R U R'",
    description: 'Fundamental trigger used in many algorithms. Essential for beginners.',
    category: 'Beginner',
    difficulty: 'Easy',
  },
  {
    id: 3,
    name: 'Left Trigger',
    notation: "L' U' L",
    description: 'Mirror of the right trigger. Used for inserting pieces on the left side.',
    category: 'Beginner',
    difficulty: 'Easy',
  },
  {
    id: 4,
    name: 'Sune',
    notation: "R U R' U R U2 R'",
    description: 'One of the most important algorithms. Used for OLL and other cases.',
    category: 'Beginner',
    difficulty: 'Easy',
  },
  {
    id: 5,
    name: 'Anti-Sune',
    notation: "R U2 R' U' R U' R'",
    description: 'Inverse of Sune. Essential for completing the last layer.',
    category: 'Beginner',
    difficulty: 'Easy',
  },
  // CFOP Algorithms
  {
    id: 6,
    name: 'Sexy Move',
    notation: "R U R' U'",
    description: 'The most basic and frequently used algorithm in speedcubing.',
    category: 'CFOP',
    difficulty: 'Easy',
  },
  {
    id: 7,
    name: 'Sledgehammer',
    notation: "R' F R F'",
    description: 'Useful trigger for F2L and some OLL cases.',
    category: 'CFOP',
    difficulty: 'Medium',
  },
  {
    id: 8,
    name: 'Hedgeslammer',
    notation: "F R' F' R",
    description: 'Inverse of Sledgehammer. Alternative for certain F2L cases.',
    category: 'CFOP',
    difficulty: 'Medium',
  },
  // OLL Algorithms
  {
    id: 9,
    name: 'OLL 1 - Dot',
    notation: "R U2 R2 F R F' U2 R' F R F'",
    description: 'Solves the dot OLL case. One of the harder OLLs.',
    category: 'OLL',
    difficulty: 'Hard',
  },
  {
    id: 10,
    name: 'OLL 21 - Cross',
    notation: "R U2 R' U' R U R' U' R U' R'",
    description: 'Solves cross OLL with headlights on side.',
    category: 'OLL',
    difficulty: 'Medium',
  },
  {
    id: 11,
    name: 'OLL 22 - Cross',
    notation: "R U2 R2 U' R2 U' R2 U2 R",
    description: 'Solves cross OLL without headlights.',
    category: 'OLL',
    difficulty: 'Medium',
  },
  {
    id: 12,
    name: 'OLL 23 - Headlights',
    notation: "R2 D R' U2 R D' R' U2 R'",
    description: 'Pure headlights case - only corners twisted.',
    category: 'OLL',
    difficulty: 'Medium',
  },
  {
    id: 13,
    name: 'OLL 24 - Chameleon',
    notation: "r U R' U' r' F R F'",
    description: 'Called chameleon because it looks different from various angles.',
    category: 'OLL',
    difficulty: 'Medium',
  },
  {
    id: 14,
    name: 'OLL 25 - Bowtie',
    notation: "F' r U R' U' r' F R",
    description: 'Forms a bowtie pattern on top layer.',
    category: 'OLL',
    difficulty: 'Medium',
  },
  // PLL Algorithms
  {
    id: 15,
    name: 'T-Perm',
    notation: "R U R' U' R' F R2 U' R' U' R U R' F'",
    description: 'One of the most common PLLs. Swaps two adjacent corners and two adjacent edges.',
    category: 'PLL',
    difficulty: 'Medium',
  },
  {
    id: 16,
    name: 'Y-Perm',
    notation: "F R U' R' U' R U R' F' R U R' U' R' F R F'",
    description: 'Swaps two diagonal corners and two adjacent edges.',
    category: 'PLL',
    difficulty: 'Medium',
  },
  {
    id: 17,
    name: 'Jb-Perm',
    notation: "R U R' F' R U R' U' R' F R2 U' R'",
    description: 'Swaps two adjacent corners and two adjacent edges.',
    category: 'PLL',
    difficulty: 'Medium',
  },
  {
    id: 18,
    name: 'Ja-Perm',
    notation: "R' U L' U2 R U' R' U2 R L",
    description: 'Mirror of Jb-Perm for the opposite side.',
    category: 'PLL',
    difficulty: 'Medium',
  },
  {
    id: 19,
    name: 'U-Perm (a)',
    notation: "R U' R U R U R U' R' U' R2",
    description: 'Cycles three edges clockwise.',
    category: 'PLL',
    difficulty: 'Easy',
  },
  {
    id: 20,
    name: 'U-Perm (b)',
    notation: "R2 U R U R' U' R' U' R' U R'",
    description: 'Cycles three edges counter-clockwise.',
    category: 'PLL',
    difficulty: 'Easy',
  },
  {
    id: 21,
    name: 'H-Perm',
    notation: "M2 U M2 U2 M2 U M2",
    description: 'Swaps opposite edge pairs. Very easy to remember.',
    category: 'PLL',
    difficulty: 'Easy',
  },
  {
    id: 22,
    name: 'Z-Perm',
    notation: "M2 U M2 U M' U2 M2 U2 M'",
    description: 'Swaps adjacent edge pairs diagonally.',
    category: 'PLL',
    difficulty: 'Medium',
  },
  // F2L Algorithms
  {
    id: 23,
    name: 'F2L Case 1',
    notation: "U R U' R'",
    description: 'Basic F2L insertion when corner and edge are separated.',
    category: 'F2L',
    difficulty: 'Easy',
  },
  {
    id: 24,
    name: 'F2L Case 2',
    notation: "U' L' U L",
    description: 'Left-side equivalent of F2L Case 1.',
    category: 'F2L',
    difficulty: 'Easy',
  },
  {
    id: 25,
    name: 'F2L Case 3',
    notation: "R U R'",
    description: 'Direct insertion when pieces are connected correctly.',
    category: 'F2L',
    difficulty: 'Easy',
  },
  {
    id: 26,
    name: 'F2L Case 4',
    notation: "L' U' L",
    description: 'Left-side direct insertion.',
    category: 'F2L',
    difficulty: 'Easy',
  },
  {
    id: 27,
    name: 'F2L Case 5',
    notation: "U' R U R' U R U' R'",
    description: 'When edge is flipped in the slot.',
    category: 'F2L',
    difficulty: 'Medium',
  },
  {
    id: 28,
    name: 'F2L Advanced Insert',
    notation: "R U' R' U R U' R'",
    description: 'Advanced insertion technique for better efficiency.',
    category: 'F2L',
    difficulty: 'Medium',
  },
];

export default function AlgorithmsPage() {
  const [activeMethod, setActiveMethod] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredAlgorithms = algorithms.filter(alg => {
    const matchesCategory = activeMethod === 'All' || alg.category === activeMethod;
    const matchesSearch = alg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alg.notation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const copyToClipboard = (notation: string, id: number) => {
    navigator.clipboard.writeText(notation);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryStats = (category: string) => {
    return algorithms.filter(a => a.category === category).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-cyan-600 py-16 md:py-20">
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
              <FaCogs className="text-3xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                Cube Algorithms
              </h1>
              <p className="text-white/80 mt-1">Master the formulas to solve any cube</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-8">
            {['Beginner', 'CFOP', 'OLL', 'PLL', 'F2L'].map(cat => (
              <div key={cat} className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="text-white font-medium">{getCategoryStats(cat)}</span>
                <span className="text-white/70 ml-1">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="bg-white border-b sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search algorithms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {methods.map((method) => (
                <button
                  key={method}
                  onClick={() => setActiveMethod(method)}
                  className={`px-4 py-2 rounded-full font-medium transition-all flex-shrink-0 ${
                    activeMethod === method
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
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
                          alg.category === 'Beginner' ? 'bg-green-100 text-green-600' :
                          alg.category === 'CFOP' ? 'bg-blue-100 text-blue-600' :
                          alg.category === 'OLL' ? 'bg-orange-100 text-orange-600' :
                          alg.category === 'PLL' ? 'bg-purple-100 text-purple-600' :
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
                      
                      {/* Algorithm Notation */}
                      <div className="flex items-center gap-3">
                        <code className="bg-gray-100 px-4 py-2 rounded-lg font-mono text-lg text-blue-600 font-medium">
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

                  {/* Expanded Description */}
                  {expandedId === alg.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
                      <p className="text-gray-600">{alg.description}</p>
                      
                      {/* Move Breakdown */}
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-500 mb-2">Move Breakdown:</h4>
                        <div className="flex flex-wrap gap-2">
                          {alg.notation.split(' ').map((move, idx) => (
                            <span 
                              key={idx}
                              className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg font-mono text-sm"
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
            Notation Guide
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { move: 'R', desc: 'Right face clockwise', color: 'bg-blue-500' },
              { move: "R'", desc: 'Right face counter-clockwise', color: 'bg-blue-400' },
              { move: 'R2', desc: 'Right face 180°', color: 'bg-blue-300' },
              { move: 'L', desc: 'Left face clockwise', color: 'bg-green-500' },
              { move: 'U', desc: 'Up face clockwise', color: 'bg-yellow-500' },
              { move: 'D', desc: 'Down face clockwise', color: 'bg-white border-2' },
              { move: 'F', desc: 'Front face clockwise', color: 'bg-red-500' },
              { move: 'B', desc: 'Back face clockwise', color: 'bg-orange-500' },
              { move: 'M', desc: 'Middle slice (like L)', color: 'bg-purple-500' },
              { move: 'r', desc: 'Wide right (R + M\')', color: 'bg-indigo-500' },
              { move: 'x', desc: 'Rotate on R axis', color: 'bg-pink-500' },
              { move: 'y', desc: 'Rotate on U axis', color: 'bg-teal-500' },
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
