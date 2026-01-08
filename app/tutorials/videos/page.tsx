'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaPlayCircle, FaArrowLeft, FaClock, FaEye, FaThumbsUp, FaFilter, FaYoutube } from 'react-icons/fa';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const videoCategories = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Speedcubing'];

const tutorials = [
  {
    id: 1,
    title: 'How to Solve a 3x3 Rubik\'s Cube - Complete Beginner Tutorial',
    description: 'Learn the layer-by-layer method to solve your first Rubik\'s cube. Perfect for absolute beginners!',
    thumbnail: 'https://img.youtube.com/vi/7Ron6MN45LY/maxresdefault.jpg',
    videoId: '7Ron6MN45LY',
    duration: '14:23',
    views: '45M',
    likes: '890K',
    category: 'Beginner',
    channel: 'J Perm',
  },
  {
    id: 2,
    title: 'Learn F2L in 6 Minutes - CFOP Tutorial',
    description: 'Master the First Two Layers technique to dramatically improve your solving speed.',
    thumbnail: 'https://img.youtube.com/vi/Ar_Zit1VLG0/maxresdefault.jpg',
    videoId: 'Ar_Zit1VLG0',
    duration: '6:42',
    views: '12M',
    likes: '450K',
    category: 'Intermediate',
    channel: 'J Perm',
  },
  {
    id: 3,
    title: 'Full OLL Tutorial - All 57 Algorithms',
    description: 'Complete Orientation of Last Layer guide with all 57 algorithms explained with finger tricks.',
    thumbnail: 'https://img.youtube.com/vi/47JfJxU7EjM/maxresdefault.jpg',
    videoId: '47JfJxU7EjM',
    duration: '45:12',
    views: '8.5M',
    likes: '320K',
    category: 'Advanced',
    channel: 'J Perm',
  },
  {
    id: 4,
    title: 'PLL Algorithms Tutorial - All 21 Cases',
    description: 'Learn all Permutation of Last Layer algorithms with easy-to-follow demonstrations.',
    thumbnail: 'https://img.youtube.com/vi/f_Yor-ydZjs/maxresdefault.jpg',
    videoId: 'f_Yor-ydZjs',
    duration: '28:34',
    views: '6.2M',
    likes: '280K',
    category: 'Advanced',
    channel: 'J Perm',
  },
  {
    id: 5,
    title: 'How to Solve a 2x2 Rubik\'s Cube - Easy Tutorial',
    description: 'Simple method to solve the pocket cube. Great for beginners transitioning from 3x3.',
    thumbnail: 'https://img.youtube.com/vi/bCn8TajrPqc/maxresdefault.jpg',
    videoId: 'bCn8TajrPqc',
    duration: '8:15',
    views: '15M',
    likes: '520K',
    category: 'Beginner',
    channel: 'J Perm',
  },
  {
    id: 6,
    title: 'How to Solve a 4x4 Rubik\'s Cube - Yau Method',
    description: 'Learn the Yau method for solving the 4x4 cube efficiently. Includes edge pairing tips.',
    thumbnail: 'https://img.youtube.com/vi/KWOZHbDdOeo/maxresdefault.jpg',
    videoId: 'KWOZHbDdOeo',
    duration: '22:47',
    views: '9.8M',
    likes: '380K',
    category: 'Intermediate',
    channel: 'J Perm',
  },
  {
    id: 7,
    title: 'Finger Tricks Tutorial - Speed Up Your Solves',
    description: 'Essential finger tricks every speedcuber needs to know. Improve your TPS dramatically!',
    thumbnail: 'https://img.youtube.com/vi/wLuVF9Dk3AQ/maxresdefault.jpg',
    videoId: 'wLuVF9Dk3AQ',
    duration: '11:33',
    views: '4.2M',
    likes: '190K',
    category: 'Speedcubing',
    channel: 'J Perm',
  },
  {
    id: 8,
    title: 'How to Be Sub-20 on 3x3 - Complete Guide',
    description: 'Everything you need to know to achieve sub-20 second solves consistently.',
    thumbnail: 'https://img.youtube.com/vi/vmeleO65BHc/maxresdefault.jpg',
    videoId: 'vmeleO65BHc',
    duration: '18:22',
    views: '7.1M',
    likes: '340K',
    category: 'Speedcubing',
    channel: 'J Perm',
  },
  {
    id: 9,
    title: 'Pyraminx Tutorial - Solve in Under 30 Seconds',
    description: 'Learn to solve the Pyraminx puzzle quickly with this simple layer method.',
    thumbnail: 'https://img.youtube.com/vi/xIQtn2qazvg/maxresdefault.jpg',
    videoId: 'xIQtn2qazvg',
    duration: '9:45',
    views: '5.4M',
    likes: '210K',
    category: 'Beginner',
    channel: 'J Perm',
  },
];

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState<typeof tutorials[0] | null>(null);

  const filteredTutorials = activeCategory === 'All' 
    ? tutorials 
    : tutorials.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="w-full max-w-5xl bg-black rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-6 bg-secondary">
              <h3 className="text-xl font-bold text-white mb-2">{selectedVideo.title}</h3>
              <p className="text-gray-300">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-pink-600 py-16 md:py-20">
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
              <FaPlayCircle className="text-3xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                Tutorial Videos
              </h1>
              <p className="text-white/80 mt-1">Learn visually with step-by-step guides</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white border-b sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <div className="flex items-center gap-2 text-gray-500 flex-shrink-0">
              <FaFilter />
              <span className="font-medium">Filter:</span>
            </div>
            {videoCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all flex-shrink-0 ${
                  activeCategory === category
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-secondary">{filteredTutorials.length}</span> videos
            </p>
            <div className="flex items-center gap-2 text-red-500">
              <FaYoutube className="text-2xl" />
              <span className="font-medium">YouTube Tutorials</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTutorials.map((tutorial) => (
              <div 
                key={tutorial.id}
                onClick={() => setSelectedVideo(tutorial)}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2"
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden">
                  <img
                    src={tutorial.thumbnail}
                    alt={tutorial.title}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                      <FaPlayCircle className="text-3xl text-white" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded">
                    {tutorial.duration}
                  </span>
                  <span className={`absolute top-2 left-2 text-xs font-medium px-3 py-1 rounded-full ${
                    tutorial.category === 'Beginner' ? 'bg-green-500 text-white' :
                    tutorial.category === 'Intermediate' ? 'bg-yellow-500 text-white' :
                    tutorial.category === 'Advanced' ? 'bg-red-500 text-white' :
                    'bg-purple-500 text-white'
                  }`}>
                    {tutorial.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-secondary group-hover:text-red-500 transition-colors line-clamp-2 mb-2">
                    {tutorial.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {tutorial.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span className="font-medium text-red-500">{tutorial.channel}</span>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <FaEye className="text-xs" />
                        {tutorial.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaThumbsUp className="text-xs" />
                        {tutorial.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-8 text-center">
            Recommended Learning Path
          </h2>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 hidden md:block" />
            
            <div className="space-y-8 md:space-y-0">
              {[
                { step: 1, title: 'Learn the Basics', desc: 'Start with the beginner tutorial', color: 'bg-green-500' },
                { step: 2, title: 'Practice F2L', desc: 'Master intuitive first two layers', color: 'bg-yellow-500' },
                { step: 3, title: 'Learn OLL & PLL', desc: 'Memorize last layer algorithms', color: 'bg-orange-500' },
                { step: 4, title: 'Speed Up', desc: 'Perfect finger tricks and lookahead', color: 'bg-red-500' },
              ].map((item, index) => (
                <div 
                  key={item.step}
                  className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className={`inline-block ${item.color} text-white text-sm font-bold px-3 py-1 rounded-full mb-2`}>
                      Step {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-secondary">{item.title}</h3>
                    <p className="text-gray-500">{item.desc}</p>
                  </div>
                  <div className="hidden md:flex w-12 h-12 bg-white border-4 border-gray-200 rounded-full items-center justify-center z-10 mx-auto">
                    <span className="font-bold text-gray-400">{item.step}</span>
                  </div>
                  <div className="md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
