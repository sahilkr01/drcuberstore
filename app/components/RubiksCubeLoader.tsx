'use client';

import { useEffect, useState } from 'react';

export default function RubiksCubeLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Minimum display time for loader
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setIsLoading(false), 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-secondary via-accent to-secondary transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        {/* 3D Rubik's Cube */}
        <div className="cube-container">
          <div className="cube">
            {/* Front Face */}
            <div className="cube-face front">
              <div className="cube-tile" style={{ background: '#e94560' }}></div>
              <div className="cube-tile" style={{ background: '#ffffff' }}></div>
              <div className="cube-tile" style={{ background: '#e94560' }}></div>
              <div className="cube-tile" style={{ background: '#ffffff' }}></div>
              <div className="cube-tile" style={{ background: '#e94560' }}></div>
              <div className="cube-tile" style={{ background: '#ffffff' }}></div>
              <div className="cube-tile" style={{ background: '#e94560' }}></div>
              <div className="cube-tile" style={{ background: '#ffffff' }}></div>
              <div className="cube-tile" style={{ background: '#e94560' }}></div>
            </div>
            {/* Back Face */}
            <div className="cube-face back">
              <div className="cube-tile" style={{ background: '#ff9500' }}></div>
              <div className="cube-tile" style={{ background: '#ff9500' }}></div>
              <div className="cube-tile" style={{ background: '#ff9500' }}></div>
              <div className="cube-tile" style={{ background: '#ff9500' }}></div>
              <div className="cube-tile" style={{ background: '#ff9500' }}></div>
              <div className="cube-tile" style={{ background: '#ff9500' }}></div>
              <div className="cube-tile" style={{ background: '#ff9500' }}></div>
              <div className="cube-tile" style={{ background: '#ff9500' }}></div>
              <div className="cube-tile" style={{ background: '#ff9500' }}></div>
            </div>
            {/* Right Face */}
            <div className="cube-face right">
              <div className="cube-tile" style={{ background: '#0051ff' }}></div>
              <div className="cube-tile" style={{ background: '#0051ff' }}></div>
              <div className="cube-tile" style={{ background: '#0051ff' }}></div>
              <div className="cube-tile" style={{ background: '#0051ff' }}></div>
              <div className="cube-tile" style={{ background: '#0051ff' }}></div>
              <div className="cube-tile" style={{ background: '#0051ff' }}></div>
              <div className="cube-tile" style={{ background: '#0051ff' }}></div>
              <div className="cube-tile" style={{ background: '#0051ff' }}></div>
              <div className="cube-tile" style={{ background: '#0051ff' }}></div>
            </div>
            {/* Left Face */}
            <div className="cube-face left">
              <div className="cube-tile" style={{ background: '#00d158' }}></div>
              <div className="cube-tile" style={{ background: '#00d158' }}></div>
              <div className="cube-tile" style={{ background: '#00d158' }}></div>
              <div className="cube-tile" style={{ background: '#00d158' }}></div>
              <div className="cube-tile" style={{ background: '#00d158' }}></div>
              <div className="cube-tile" style={{ background: '#00d158' }}></div>
              <div className="cube-tile" style={{ background: '#00d158' }}></div>
              <div className="cube-tile" style={{ background: '#00d158' }}></div>
              <div className="cube-tile" style={{ background: '#00d158' }}></div>
            </div>
            {/* Top Face */}
            <div className="cube-face top">
              <div className="cube-tile" style={{ background: '#ffffff' }}></div>
              <div className="cube-tile" style={{ background: '#ffffff' }}></div>
              <div className="cube-tile" style={{ background: '#ffffff' }}></div>
              <div className="cube-tile" style={{ background: '#ffffff' }}></div>
              <div className="cube-tile" style={{ background: '#ffffff' }}></div>
              <div className="cube-tile" style={{ background: '#ffffff' }}></div>
              <div className="cube-tile" style={{ background: '#ffffff' }}></div>
              <div className="cube-tile" style={{ background: '#ffffff' }}></div>
              <div className="cube-tile" style={{ background: '#ffffff' }}></div>
            </div>
            {/* Bottom Face */}
            <div className="cube-face bottom">
              <div className="cube-tile" style={{ background: '#ffd500' }}></div>
              <div className="cube-tile" style={{ background: '#ffd500' }}></div>
              <div className="cube-tile" style={{ background: '#ffd500' }}></div>
              <div className="cube-tile" style={{ background: '#ffd500' }}></div>
              <div className="cube-tile" style={{ background: '#ffd500' }}></div>
              <div className="cube-tile" style={{ background: '#ffd500' }}></div>
              <div className="cube-tile" style={{ background: '#ffd500' }}></div>
              <div className="cube-tile" style={{ background: '#ffd500' }}></div>
              <div className="cube-tile" style={{ background: '#ffd500' }}></div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-wider">
            DR.CUBER
          </h2>
          <div className="flex items-center justify-center gap-1">
            <span className="loading-dot"></span>
            <span className="loading-dot" style={{ animationDelay: '0.2s' }}></span>
            <span className="loading-dot" style={{ animationDelay: '0.4s' }}></span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cube-container {
          width: 120px;
          height: 120px;
          perspective: 600px;
        }

        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: cubeRotate 4s ease-in-out infinite;
        }

        @keyframes cubeRotate {
          0% {
            transform: rotateX(-20deg) rotateY(0deg);
          }
          25% {
            transform: rotateX(-20deg) rotateY(90deg);
          }
          50% {
            transform: rotateX(-20deg) rotateY(180deg);
          }
          75% {
            transform: rotateX(-20deg) rotateY(270deg);
          }
          100% {
            transform: rotateX(-20deg) rotateY(360deg);
          }
        }

        .cube-face {
          position: absolute;
          width: 120px;
          height: 120px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 3px;
          padding: 3px;
          background: #1a1a2e;
          border-radius: 6px;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
        }

        .cube-tile {
          border-radius: 4px;
          box-shadow: 
            inset 0 2px 4px rgba(255, 255, 255, 0.3),
            inset 0 -2px 4px rgba(0, 0, 0, 0.2),
            0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .front {
          transform: rotateY(0deg) translateZ(60px);
        }

        .back {
          transform: rotateY(180deg) translateZ(60px);
        }

        .right {
          transform: rotateY(90deg) translateZ(60px);
        }

        .left {
          transform: rotateY(-90deg) translateZ(60px);
        }

        .top {
          transform: rotateX(90deg) translateZ(60px);
        }

        .bottom {
          transform: rotateX(-90deg) translateZ(60px);
        }

        .loading-dot {
          width: 10px;
          height: 10px;
          background: var(--primary);
          border-radius: 50%;
          animation: dotPulse 1.4s ease-in-out infinite;
        }

        @keyframes dotPulse {
          0%, 80%, 100% {
            transform: scale(0.6);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
