'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaCopy, FaCheck, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { GiPyramid } from 'react-icons/gi';
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

const algorithmsPyraminx: Algorithm[] = [
  // Basic Moves
  {
    id: 1,
    name: 'Tip Rotation',
    notation: "u / u'",
    description: 'Rotate any tip clockwise (u) or counter-clockwise (u\'). Tips can always be solved at the end.',
    category: 'Basics',
    difficulty: 'Easy',
  },
  {
    id: 2,
    name: 'Layer Turn Right',
    notation: 'R',
    description: 'Rotate the right layer clockwise (looking from that vertex).',
    category: 'Basics',
    difficulty: 'Easy',
  },
  {
    id: 3,
    name: 'Layer Turn Left',
    notation: 'L',
    description: 'Rotate the left layer clockwise (looking from that vertex).',
    category: 'Basics',
    difficulty: 'Easy',
  },
  {
    id: 4,
    name: 'Layer Turn Back',
    notation: 'B',
    description: 'Rotate the back layer clockwise (looking from that vertex).',
    category: 'Basics',
    difficulty: 'Easy',
  },
  {
    id: 5,
    name: 'Layer Turn Up',
    notation: 'U',
    description: 'Rotate the upper layer clockwise (looking from above).',
    category: 'Basics',
    difficulty: 'Easy',
  },
  // Layer by Layer
  {
    id: 6,
    name: 'Edge Flip Right',
    notation: "R U R' U R U R'",
    description: 'Flip an edge piece to correct its orientation.',
    category: 'Layer by Layer',
    difficulty: 'Easy',
  },
  {
    id: 7,
    name: 'Edge Flip Left',
    notation: "L' U' L U' L' U' L",
    description: 'Left-hand version of edge flip.',
    category: 'Layer by Layer',
    difficulty: 'Easy',
  },
  {
    id: 8,
    name: 'Edge Insert Right',
    notation: "R U' R'",
    description: 'Insert an edge from the top layer to the right position.',
    category: 'Layer by Layer',
    difficulty: 'Easy',
  },
  {
    id: 9,
    name: 'Edge Insert Left',
    notation: "L' U L",
    description: 'Insert an edge from the top layer to the left position.',
    category: 'Layer by Layer',
    difficulty: 'Easy',
  },
  // Top Layer
  {
    id: 10,
    name: 'Last Layer - Flip 2 Edges',
    notation: "R U R' U R U R'",
    description: 'Flip two edges on the last layer.',
    category: 'Last Layer',
    difficulty: 'Medium',
  },
  {
    id: 11,
    name: 'Last Layer - Cycle 3 Edges CW',
    notation: "U L U' L' U L U' L'",
    description: 'Cycle three edges clockwise on the last layer.',
    category: 'Last Layer',
    difficulty: 'Medium',
  },
  {
    id: 12,
    name: 'Last Layer - Cycle 3 Edges CCW',
    notation: "U' R' U R U' R' U R",
    description: 'Cycle three edges counter-clockwise on the last layer.',
    category: 'Last Layer',
    difficulty: 'Medium',
  },
  // Advanced/L4E
  {
    id: 13,
    name: 'L4E - Keyhole Insert',
    notation: "R U R'",
    description: 'Basic L4E (Last 4 Edges) insertion move.',
    category: 'L4E',
    difficulty: 'Medium',
  },
  {
    id: 14,
    name: 'L4E - Sledgehammer',
    notation: "R' L R L'",
    description: 'Useful for swapping edges in L4E method.',
    category: 'L4E',
    difficulty: 'Medium',
  },
  {
    id: 15,
    name: 'L4E - Edge Swap',
    notation: "U R U' L' U R' U' L",
    description: 'Swap two specific edges.',
    category: 'L4E',
    difficulty: 'Medium',
  },
  // One-Look
  {
    id: 16,
    name: 'OL Case 1',
    notation: "R U' L U R' U' L'",
    description: 'One-look case for fast solving.',
    category: 'One-Look',
    difficulty: 'Hard',
  },
  {
    id: 17,
    name: 'OL Case 2',
    notation: "L' U R' U' L U R",
    description: 'Another one-look case.',
    category: 'One-Look',
    difficulty: 'Hard',
  },
  {
    id: 18,
    name: 'OL Case 3',
    notation: "R U R' U' R U R' U' R U R'",
    description: 'Triple application for specific one-look case.',
    category: 'One-Look',
    difficulty: 'Hard',
  },
  // Oka Method
  {
    id: 19,
    name: 'Oka - Flip',
    notation: "R U' R' U R U R' U' R U R'",
    description: 'Edge flip in Oka method.',
    category: 'Oka',
    difficulty: 'Medium',
  },
  {
    id: 20,
    name: 'Oka - Cycle',
    notation: "U L U' L' U' R' U R",
    description: 'Three edge cycle for Oka method.',
    category: 'Oka',
    difficulty: 'Medium',
  },
];

const methods = ['All', 'Basics', 'Layer by Layer', 'Last Layer', 'L4E', 'One-Look', 'Oka'];

const tutorialSteps = [
  {
    step: 1,
    title: 'Solve the Tips',
    description: 'Twist each tip to match its adjacent center colors. This takes only seconds.',
    tips: ['Tips move independently', 'Just match to adjacent centers', 'Can do this anytime'],
  },
  {
    step: 2,
    title: 'Solve One Face',
    description: 'Choose a color and make one complete face. Position edges correctly.',
    tips: ['Pick a starting color', 'Build around a center', 'Use basic R and L moves'],
  },
  {
    step: 3,
    title: 'Position Edges',
    description: 'Get all remaining edges into their correct positions.',
    tips: ['Work around the solved face', 'Use edge insert algorithms', 'Don\'t break solved pieces'],
  },
  {
    step: 4,
    title: 'Orient Last Layer',
    description: 'Flip any edges that are in position but oriented wrong.',
    tips: ['Use flip algorithms', 'May need multiple applications', 'Check all edges carefully'],
  },
];

export default function PyraminxPage() {
  const [activeMethod, setActiveMethod] = useState('All');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showTutorial, setShowTutorial] = useState(true);

  const filteredAlgorithms = algorithmsPyraminx.filter(alg => {
    return activeMethod === 'All' || alg.category === activeMethod;
  });

  const copyToClipboard = (notation: string, id: number) => {
    navigator.clipboard.writeText(notation);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryStats = (category: string) => {
    return algorithmsPyraminx.filter(a => a.category === category).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-500 to-amber-600 py-16 md:py-20">
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
              <GiPyramid className="text-3xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                Pyraminx Tutorial
              </h1>
              <p className="text-white/80 mt-1">The Pyramid Puzzle - A great beginner puzzle</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-medium">4</span>
              <span className="text-white/70 ml-1">Tips</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-medium">4</span>
              <span className="text-white/70 ml-1">Centers</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-medium">6</span>
              <span className="text-white/70 ml-1">Edges</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-medium">{algorithmsPyraminx.length}</span>
              <span className="text-white/70 ml-1">Algorithms</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-secondary mb-4">About the Pyraminx</h2>
            <p className="text-gray-600 mb-4">
              The Pyraminx is a tetrahedron-shaped puzzle with 4 triangular faces. It&apos;s one of the easiest 
              twisty puzzles to solve, making it perfect for beginners. The puzzle was invented by Uwe Mèffert 
              and has been popular since the 1980s.
            </p>
            <p className="text-gray-600">
              Unlike the Rubik&apos;s Cube, the Pyraminx has tips that can rotate independently and don&apos;t affect 
              other pieces. This makes it much simpler - there are only about 75 million possible positions 
              compared to 43 quintillion for the 3x3 cube!
            </p>
          </div>
        </div>
      </section>

      {/* Tutorial Section */}
      <section className="py-12 bg-gradient-to-br from-yellow-50 to-amber-50 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary">
              Beginner Method
            </h2>
            <button
              onClick={() => setShowTutorial(!showTutorial)}
              className="flex items-center gap-2 text-amber-600 hover:text-amber-700 transition-colors"
            >
              {showTutorial ? 'Hide' : 'Show'} Tutorial
              {showTutorial ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>

          {showTutorial && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tutorialSteps.map((item) => (
                <div key={item.step} className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-bold text-secondary">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
                  <ul className="space-y-2">
                    {item.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-500">
                        <span className="text-amber-500 mt-1">▲</span>
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
                    ? 'bg-amber-500 text-white'
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
                          alg.category === 'Basics' ? 'bg-green-100 text-green-600' :
                          alg.category === 'Layer by Layer' ? 'bg-blue-100 text-blue-600' :
                          alg.category === 'Last Layer' ? 'bg-orange-100 text-orange-600' :
                          alg.category === 'L4E' ? 'bg-purple-100 text-purple-600' :
                          alg.category === 'One-Look' ? 'bg-red-100 text-red-600' :
                          'bg-amber-100 text-amber-600'
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
                        <code className="bg-gray-100 px-4 py-2 rounded-lg font-mono text-lg text-amber-600 font-medium">
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

      {/* Notation Guide */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-8 text-center">
            Pyraminx Notation
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { move: 'R', desc: 'Right vertex layer CW', color: 'bg-blue-500' },
              { move: "R'", desc: 'Right vertex layer CCW', color: 'bg-blue-400' },
              { move: 'L', desc: 'Left vertex layer CW', color: 'bg-green-500' },
              { move: "L'", desc: 'Left vertex layer CCW', color: 'bg-green-400' },
              { move: 'U', desc: 'Upper vertex layer CW', color: 'bg-yellow-500' },
              { move: "U'", desc: 'Upper vertex layer CCW', color: 'bg-yellow-400' },
              { move: 'B', desc: 'Back vertex layer CW', color: 'bg-orange-500' },
              { move: "B'", desc: 'Back vertex layer CCW', color: 'bg-orange-400' },
              { move: 'r', desc: 'Right tip CW', color: 'bg-blue-300' },
              { move: 'l', desc: 'Left tip CW', color: 'bg-green-300' },
              { move: 'u', desc: 'Upper tip CW', color: 'bg-yellow-300' },
              { move: 'b', desc: 'Back tip CW', color: 'bg-orange-300' },
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
