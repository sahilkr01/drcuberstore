'use client';

import Link from 'next/link';
import { FaCube, FaPlayCircle, FaCogs, FaPalette, FaArrowRight, FaGraduationCap, FaTrophy, FaClock } from 'react-icons/fa';
import { GiMayanPyramid } from 'react-icons/gi';
import Header from '../components/Header';
import Footer from '../components/Footer';

const tutorialCategories = [
  {
    id: 'videos',
    title: 'Tutorial Videos',
    description: 'Watch comprehensive video tutorials from beginner to advanced levels. Learn at your own pace with step-by-step visual guides.',
    icon: FaPlayCircle,
    color: 'from-red-500 to-pink-500',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-500',
    stats: { lessons: 24, hours: 12 },
    href: '/tutorials/videos',
  },
  {
    id: 'algorithms',
    title: '3x3 Algorithms',
    description: 'Master the essential algorithms for solving Rubik\'s cubes. From basic moves to advanced CFOP, OLL, and PLL methods.',
    icon: FaCogs,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-500',
    stats: { algorithms: 78, methods: 4 },
    href: '/tutorials/algorithms',
  },
  {
    id: 'patterns',
    title: 'Cube Patterns',
    description: 'Create stunning patterns on your cube! Learn checkerboards, flags, cubes in cubes, and many more impressive designs.',
    icon: FaPalette,
    color: 'from-purple-500 to-indigo-500',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-500',
    stats: { patterns: 50, difficulty: 'All levels' },
    href: '/tutorials/patterns',
  },
];

// Cube Type Tutorials
const cubeTypeTutorials = [
  {
    id: '2x2',
    title: '2x2 Pocket Cube',
    description: 'Learn to solve the mini cube with Ortega, CLL, and EG methods.',
    icon: FaCube,
    color: 'from-green-500 to-teal-500',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-500',
    difficulty: 'Beginner',
    algorithms: 20,
    href: '/tutorials/2x2',
  },
  {
    id: '4x4',
    title: '4x4 Revenge Cube',
    description: 'Master centers, edge pairing, and parity algorithms for the big cube.',
    icon: FaCube,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-500',
    difficulty: 'Intermediate',
    algorithms: 22,
    href: '/tutorials/4x4',
  },
  {
    id: 'pyraminx',
    title: 'Pyraminx',
    description: 'Solve the pyramid puzzle with layer-by-layer and advanced L4E methods.',
    icon: GiMayanPyramid,
    color: 'from-yellow-500 to-amber-500',
    bgColor: 'bg-yellow-50',
    iconColor: 'text-yellow-500',
    difficulty: 'Beginner',
    algorithms: 20,
    href: '/tutorials/pyraminx',
  },
  {
    id: 'mastermorphix',
    title: 'Mastermorphix',
    description: 'The shape-shifting tetrahedron - a 3x3 in disguise with unique challenges.',
    icon: FaCube,
    color: 'from-pink-500 to-purple-500',
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-500',
    difficulty: 'Intermediate',
    algorithms: 20,
    href: '/tutorials/mastermorphix',
  },
  {
    id: 'megaminx',
    title: 'Megaminx',
    description: 'The 12-faced dodecahedron puzzle. If you know 3x3, you can solve this!',
    icon: FaCube,
    color: 'from-indigo-500 to-violet-500',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-500',
    difficulty: 'Intermediate',
    algorithms: 17,
    href: '/tutorials/megaminx',
  },
  {
    id: 'skewb',
    title: 'Skewb',
    description: 'The corner-turning cube. Quick to solve and great for competitions!',
    icon: FaCube,
    color: 'from-cyan-500 to-blue-500',
    bgColor: 'bg-cyan-50',
    iconColor: 'text-cyan-500',
    difficulty: 'Beginner',
    algorithms: 17,
    href: '/tutorials/skewb',
  },
];

const featuredTutorials = [
  { title: 'Beginner\'s Guide', level: 'Beginner', duration: '15 min', category: 'Video' },
  { title: 'CFOP Method Basics', level: 'Intermediate', duration: '30 min', category: 'Algorithm' },
  { title: 'Flag Patterns', level: 'Easy', duration: '5 min', category: 'Pattern' },
  { title: 'F2L Techniques', level: 'Advanced', duration: '45 min', category: 'Algorithm' },
  { title: '2x2 Ortega Method', level: 'Beginner', duration: '20 min', category: '2x2' },
  { title: '4x4 Parity Fixes', level: 'Intermediate', duration: '25 min', category: '4x4' },
  { title: 'Pyraminx L4E', level: 'Intermediate', duration: '15 min', category: 'Pyraminx' },
  { title: 'Mastermorphix Shapes', level: 'Intermediate', duration: '20 min', category: 'Mastermorphix' },
];

export default function TutorialsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-accent to-secondary py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <FaGraduationCap className="text-primary" />
            <span className="text-white/90 text-sm font-medium">Learn from the experts</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Master the <span className="text-primary">Rubik&apos;s Cube</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            From complete beginner to speedcubing pro. Explore our comprehensive tutorials, algorithms, and patterns.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <FaPlayCircle className="text-red-400" />
              <span className="text-white">24+ Videos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <FaCogs className="text-blue-400" />
              <span className="text-white">115+ Algorithms</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <FaPalette className="text-purple-400" />
              <span className="text-white">50+ Patterns</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <FaCube className="text-green-400" />
              <span className="text-white">7+ Cube Types</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorial Categories */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you&apos;re just starting or looking to improve your speedcubing skills, we have the perfect resources for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {tutorialCategories.map((category) => (
              <Link 
                key={category.id} 
                href={category.href}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2"
              >
                <div className={`h-2 bg-gradient-to-r ${category.color}`} />
                <div className="p-8">
                  <div className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className={`text-3xl ${category.iconColor}`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex gap-4 text-sm text-gray-500">
                      {category.stats.lessons && (
                        <span>{category.stats.lessons} lessons</span>
                      )}
                      {category.stats.hours && (
                        <span>{category.stats.hours}+ hours</span>
                      )}
                      {category.stats.algorithms && (
                        <span>{category.stats.algorithms} algorithms</span>
                      )}
                      {category.stats.patterns && (
                        <span>{category.stats.patterns} patterns</span>
                      )}
                    </div>
                    <FaArrowRight className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cube Type Tutorials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Learn Different Cube Types
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Master more than just the 3x3! Explore tutorials for various puzzle types from pocket cubes to pyramids.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cubeTypeTutorials.map((cube) => (
              <Link 
                key={cube.id} 
                href={cube.href}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2"
              >
                <div className={`h-2 bg-gradient-to-r ${cube.color}`} />
                <div className="p-6">
                  <div className={`w-14 h-14 ${cube.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <cube.icon className={`text-2xl ${cube.iconColor}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                    {cube.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {cube.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex gap-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        cube.difficulty === 'Beginner' ? 'bg-green-100 text-green-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        {cube.difficulty}
                      </span>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        {cube.algorithms} algs
                      </span>
                    </div>
                    <FaArrowRight className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tutorials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary">
              Featured Tutorials
            </h2>
            <div className="flex items-center gap-2 text-primary font-medium">
              <FaTrophy className="text-yellow-500" />
              <span>Most Popular</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTutorials.map((tutorial, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    tutorial.category === 'Video' ? 'bg-red-100 text-red-600' :
                    tutorial.category === 'Algorithm' ? 'bg-blue-100 text-blue-600' :
                    tutorial.category === 'Pattern' ? 'bg-purple-100 text-purple-600' :
                    tutorial.category === '2x2' ? 'bg-green-100 text-green-600' :
                    tutorial.category === '4x4' ? 'bg-orange-100 text-orange-600' :
                    tutorial.category === 'Pyraminx' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-pink-100 text-pink-600'
                  }`}>
                    {tutorial.category}
                  </span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    tutorial.level === 'Beginner' || tutorial.level === 'Easy' ? 'bg-green-100 text-green-600' :
                    tutorial.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {tutorial.level}
                  </span>
                </div>
                <h3 className="font-semibold text-secondary group-hover:text-primary transition-colors mb-2">
                  {tutorial.title}
                </h3>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <FaClock className="text-xs" />
                  <span>{tutorial.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary-dark">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FaCube className="text-5xl text-white/80 mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of cubers who have mastered the Rubik&apos;s cube with our tutorials.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/tutorials/videos"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              <FaPlayCircle />
              Start with Videos
            </Link>
            <Link 
              href="/tutorials/algorithms"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/20"
            >
              <FaCogs />
              Learn Algorithms
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
