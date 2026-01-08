'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaPalette, FaArrowLeft, FaCopy, FaCheck, FaStar, FaFilter, FaFlag } from 'react-icons/fa';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
const cubeTypes = ['All', '3x3', '2x2', '4x4', 'Pyraminx'];
const categories = ['All', 'Classic', 'Flags', 'Letters', 'Shapes', 'Advanced'];

interface Pattern {
  id: number;
  name: string;
  algorithm: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  moves: number;
  popular: boolean;
  cubeType: '3x3' | '2x2' | '4x4' | 'Pyraminx';
  category: 'Classic' | 'Flags' | 'Letters' | 'Shapes' | 'Advanced';
  colors: string[];
}

const patterns: Pattern[] = [
  // 3x3 Classic Patterns
  {
    id: 1,
    name: 'Checkerboard',
    algorithm: "M2 E2 S2",
    description: 'The classic checkerboard pattern. Creates alternating colors on all faces. A must-know for every cuber!',
    difficulty: 'Easy',
    moves: 3,
    popular: true,
    cubeType: '3x3',
    category: 'Classic',
    colors: ['bg-red-500', 'bg-white', 'bg-red-500', 'bg-white', 'bg-red-500', 'bg-white', 'bg-red-500', 'bg-white', 'bg-red-500'],
  },
  {
    id: 2,
    name: 'Cube in a Cube',
    algorithm: "F L F U' R U F2 L2 U' L' B D' B' L2 U",
    description: 'Creates the illusion of a smaller cube inside the larger one. Very impressive pattern!',
    difficulty: 'Medium',
    moves: 15,
    popular: true,
    cubeType: '3x3',
    category: 'Classic',
    colors: ['bg-orange-500', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-orange-500', 'bg-red-500', 'bg-orange-500', 'bg-orange-500'],
  },
  {
    id: 3,
    name: 'Cube in a Cube in a Cube',
    algorithm: "U' L' U' F' R2 B' R F U B2 U B' L U' F U R F'",
    description: 'Triple nested cube illusion. One of the most impressive patterns you can make!',
    difficulty: 'Hard',
    moves: 18,
    popular: true,
    cubeType: '3x3',
    category: 'Classic',
    colors: ['bg-green-500', 'bg-orange-500', 'bg-red-500', 'bg-orange-500', 'bg-red-500', 'bg-green-500', 'bg-red-500', 'bg-green-500', 'bg-orange-500'],
  },
  {
    id: 4,
    name: 'Superflip',
    algorithm: "U R2 F B R B2 R U2 L B2 R U' D' R2 F R' L B2 U2 F2",
    description: 'All edges flipped in place. Famous for being the position furthest from solved state.',
    difficulty: 'Hard',
    moves: 20,
    popular: true,
    cubeType: '3x3',
    category: 'Advanced',
    colors: ['bg-red-500', 'bg-yellow-500', 'bg-red-500', 'bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-red-500', 'bg-white', 'bg-red-500'],
  },
  {
    id: 5,
    name: 'Flower',
    algorithm: "F D R' D' R D R' D' R F' U' F D R' D' R D R' D' R F' U2 F D R' D' R D R' D' R F' U",
    description: 'Creates a beautiful flower pattern on all six faces.',
    difficulty: 'Hard',
    moves: 32,
    popular: false,
    cubeType: '3x3',
    category: 'Shapes',
    colors: ['bg-yellow-500', 'bg-red-500', 'bg-yellow-500', 'bg-red-500', 'bg-yellow-500', 'bg-red-500', 'bg-yellow-500', 'bg-red-500', 'bg-yellow-500'],
  },
  {
    id: 6,
    name: 'Six Spots',
    algorithm: "U D' R L' F B' U D'",
    description: 'Creates a dot in the center of each face. Simple but elegant!',
    difficulty: 'Easy',
    moves: 8,
    popular: true,
    cubeType: '3x3',
    category: 'Classic',
    colors: ['bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-green-500', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-red-500'],
  },
  {
    id: 7,
    name: 'Vertical Stripes',
    algorithm: "F U F R L2 B D' R D2 L D' B R2 L F U F",
    description: 'Creates vertical stripes on all faces of the cube.',
    difficulty: 'Medium',
    moves: 17,
    popular: false,
    cubeType: '3x3',
    category: 'Shapes',
    colors: ['bg-red-500', 'bg-green-500', 'bg-red-500', 'bg-red-500', 'bg-green-500', 'bg-red-500', 'bg-red-500', 'bg-green-500', 'bg-red-500'],
  },
  {
    id: 8,
    name: 'Cross',
    algorithm: "R2 L' D F2 R' D' R' L U' D R D B2 R' U D2",
    description: 'Creates a cross pattern on each face of the cube.',
    difficulty: 'Medium',
    moves: 16,
    popular: false,
    cubeType: '3x3',
    category: 'Shapes',
    colors: ['bg-green-500', 'bg-red-500', 'bg-green-500', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-green-500', 'bg-red-500', 'bg-green-500'],
  },
  {
    id: 9,
    name: 'Snake',
    algorithm: "F2 D' L2 U L2 F2 D R2 U2 B L' F' L B' R U' R' U",
    description: 'Creates a snake-like pattern winding around the cube.',
    difficulty: 'Hard',
    moves: 18,
    popular: false,
    colors: ['bg-blue-500', 'bg-red-500', 'bg-blue-500', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-blue-500', 'bg-red-500', 'bg-red-500'],
  },
  {
    id: 10,
    name: 'Twisted Peaks',
    algorithm: "F B' U F U F U L B L2 B' U F' L U L' B",
    description: 'Creates twisted corner patterns resembling mountain peaks.',
    difficulty: 'Medium',
    moves: 17,
    popular: false,
    colors: ['bg-orange-500', 'bg-red-500', 'bg-orange-500', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-orange-500'],
  },
  {
    id: 11,
    name: 'Anaconda',
    algorithm: "L U B' U' R L' B R' F B' D R D' F'",
    description: 'A snake-like pattern that wraps around multiple faces.',
    difficulty: 'Medium',
    moves: 14,
    popular: false,
    colors: ['bg-blue-500', 'bg-blue-500', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-blue-500', 'bg-red-500', 'bg-red-500', 'bg-red-500'],
  },
  {
    id: 12,
    name: 'Python',
    algorithm: "F2 R' B' U R' L F' L F' B D' R B L2",
    description: 'Another snake variant with a different winding pattern.',
    difficulty: 'Medium',
    moves: 14,
    popular: false,
    colors: ['bg-green-500', 'bg-red-500', 'bg-green-500', 'bg-red-500', 'bg-red-500', 'bg-green-500', 'bg-green-500', 'bg-red-500', 'bg-red-500'],
  },
  {
    id: 13,
    name: 'Plus Minus',
    algorithm: "U2 R2 L2 U2 R2 L2",
    description: 'Creates plus signs on two faces and minus signs on the others.',
    difficulty: 'Easy',
    moves: 6,
    popular: true,
    colors: ['bg-red-500', 'bg-green-500', 'bg-red-500', 'bg-green-500', 'bg-red-500', 'bg-green-500', 'bg-red-500', 'bg-green-500', 'bg-red-500'],
  },
  {
    id: 14,
    name: 'Gift Wrap',
    algorithm: "U B2 R2 B2 L2 F2 R2 D' F2 L2",
    description: 'Makes the cube look like a wrapped present with ribbons.',
    difficulty: 'Easy',
    moves: 10,
    popular: false,
    colors: ['bg-white', 'bg-red-500', 'bg-white', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-white', 'bg-red-500', 'bg-white'],
  },
  {
    id: 15,
    name: 'Four Crosses',
    algorithm: "U2 R2 L2 F2 B2 D2 R2 L2",
    description: 'Creates cross patterns on four faces of the cube.',
    difficulty: 'Easy',
    moves: 8,
    popular: false,
    colors: ['bg-yellow-500', 'bg-red-500', 'bg-yellow-500', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-yellow-500', 'bg-red-500', 'bg-yellow-500'],
  },
  {
    id: 16,
    name: 'Tetris',
    algorithm: "L R F B U' D' L' R'",
    description: 'Creates a pattern reminiscent of Tetris blocks.',
    difficulty: 'Easy',
    moves: 8,
    popular: false,
    cubeType: '3x3',
    category: 'Shapes',
    colors: ['bg-blue-500', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-blue-500', 'bg-red-500', 'bg-red-500', 'bg-blue-500'],
  },
  // FLAG PATTERNS
  {
    id: 17,
    name: 'Japanese Flag',
    algorithm: "Start solved with white front, red center visible",
    description: 'The red center on white face creates a simple Japanese flag effect. Start from a solved cube!',
    difficulty: 'Easy',
    moves: 0,
    popular: true,
    cubeType: '3x3',
    category: 'Flags',
    colors: ['bg-white', 'bg-white', 'bg-white', 'bg-white', 'bg-red-500', 'bg-white', 'bg-white', 'bg-white', 'bg-white'],
  },
  {
    id: 18,
    name: 'French Flag (Tricolor)',
    algorithm: "R2 L2 U2 D2",
    description: 'Creates vertical stripes resembling the French tricolor flag.',
    difficulty: 'Easy',
    moves: 4,
    popular: true,
    cubeType: '3x3',
    category: 'Flags',
    colors: ['bg-blue-500', 'bg-white', 'bg-red-500', 'bg-blue-500', 'bg-white', 'bg-red-500', 'bg-blue-500', 'bg-white', 'bg-red-500'],
  },
  {
    id: 19,
    name: 'Italian Flag',
    algorithm: "R2 L2 F2 B2",
    description: 'Green, white, and red vertical stripes like the Italian flag.',
    difficulty: 'Easy',
    moves: 4,
    popular: true,
    cubeType: '3x3',
    category: 'Flags',
    colors: ['bg-green-500', 'bg-white', 'bg-red-500', 'bg-green-500', 'bg-white', 'bg-red-500', 'bg-green-500', 'bg-white', 'bg-red-500'],
  },
  {
    id: 20,
    name: 'German Flag',
    algorithm: "F2 B2 U2 D2",
    description: 'Horizontal stripes of black, red, yellow resembling the German flag.',
    difficulty: 'Easy',
    moves: 4,
    popular: true,
    cubeType: '3x3',
    category: 'Flags',
    colors: ['bg-gray-900', 'bg-gray-900', 'bg-gray-900', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-yellow-500', 'bg-yellow-500', 'bg-yellow-500'],
  },
  {
    id: 21,
    name: 'Cross Flag (Swiss/English)',
    algorithm: "R L U D R' L' U' D' R L U D R' L' U' D'",
    description: 'Creates a cross pattern in the center, like Swiss or English flags.',
    difficulty: 'Medium',
    moves: 16,
    popular: true,
    cubeType: '3x3',
    category: 'Flags',
    colors: ['bg-red-500', 'bg-white', 'bg-red-500', 'bg-white', 'bg-white', 'bg-white', 'bg-red-500', 'bg-white', 'bg-red-500'],
  },
  {
    id: 22,
    name: 'Scandinavian Cross',
    algorithm: "M' U M U M' U M U2 M' U M U M' U M",
    description: 'Creates an offset cross pattern like Nordic flags.',
    difficulty: 'Medium',
    moves: 14,
    popular: false,
    cubeType: '3x3',
    category: 'Flags',
    colors: ['bg-blue-600', 'bg-yellow-400', 'bg-blue-600', 'bg-yellow-400', 'bg-yellow-400', 'bg-yellow-400', 'bg-blue-600', 'bg-yellow-400', 'bg-blue-600'],
  },
  {
    id: 23,
    name: 'Ukrainian Flag',
    algorithm: "F2 B2",
    description: 'Blue and yellow horizontal bands like the Ukrainian flag.',
    difficulty: 'Easy',
    moves: 2,
    popular: true,
    cubeType: '3x3',
    category: 'Flags',
    colors: ['bg-blue-500', 'bg-blue-500', 'bg-blue-500', 'bg-blue-500', 'bg-blue-500', 'bg-blue-500', 'bg-yellow-400', 'bg-yellow-400', 'bg-yellow-400'],
  },
  {
    id: 24,
    name: 'Polish Flag',
    algorithm: "U2 D2",
    description: 'White and red horizontal bands.',
    difficulty: 'Easy',
    moves: 2,
    popular: false,
    cubeType: '3x3',
    category: 'Flags',
    colors: ['bg-white', 'bg-white', 'bg-white', 'bg-white', 'bg-white', 'bg-white', 'bg-red-500', 'bg-red-500', 'bg-red-500'],
  },
  // LETTER PATTERNS
  {
    id: 25,
    name: 'Letter H',
    algorithm: "R2 L2 U2 D2 F2 B2",
    description: 'Creates an H pattern on multiple faces.',
    difficulty: 'Easy',
    moves: 6,
    popular: false,
    cubeType: '3x3',
    category: 'Letters',
    colors: ['bg-red-500', 'bg-white', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-white', 'bg-red-500'],
  },
  {
    id: 26,
    name: 'Letter T',
    algorithm: "F R U R' U' F'",
    description: 'Creates T shapes on the faces.',
    difficulty: 'Easy',
    moves: 6,
    popular: false,
    cubeType: '3x3',
    category: 'Letters',
    colors: ['bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-white', 'bg-red-500', 'bg-white', 'bg-white', 'bg-red-500', 'bg-white'],
  },
  // MORE SHAPES
  {
    id: 27,
    name: 'Spiral',
    algorithm: "L' B2 R' F R B2 L F' L' F R F' L F R'",
    description: 'Creates a spiral pattern winding around the cube.',
    difficulty: 'Hard',
    moves: 15,
    popular: false,
    cubeType: '3x3',
    category: 'Shapes',
    colors: ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500', 'bg-orange-500', 'bg-white', 'bg-red-500', 'bg-yellow-500'],
  },
  {
    id: 28,
    name: 'Wire',
    algorithm: "R L F B R L F B R L F B",
    description: 'Creates a wire-frame appearance.',
    difficulty: 'Medium',
    moves: 12,
    popular: false,
    cubeType: '3x3',
    category: 'Shapes',
    colors: ['bg-blue-500', 'bg-white', 'bg-blue-500', 'bg-white', 'bg-blue-500', 'bg-white', 'bg-blue-500', 'bg-white', 'bg-blue-500'],
  },
  {
    id: 29,
    name: 'Meson',
    algorithm: "R' U' R U' L U L' U2 R' U R U' L U' L'",
    description: 'A complex particle physics-inspired pattern.',
    difficulty: 'Hard',
    moves: 15,
    popular: false,
    cubeType: '3x3',
    category: 'Advanced',
    colors: ['bg-orange-500', 'bg-green-500', 'bg-orange-500', 'bg-red-500', 'bg-blue-500', 'bg-red-500', 'bg-orange-500', 'bg-green-500', 'bg-orange-500'],
  },
  {
    id: 30,
    name: 'Twister',
    algorithm: "F R' U L F' L' F U' R U L' U' L F'",
    description: 'Creates a twisted, tornado-like appearance.',
    difficulty: 'Hard',
    moves: 14,
    popular: false,
    cubeType: '3x3',
    category: 'Advanced',
    colors: ['bg-green-500', 'bg-yellow-500', 'bg-green-500', 'bg-orange-500', 'bg-green-500', 'bg-orange-500', 'bg-green-500', 'bg-yellow-500', 'bg-green-500'],
  },
  // 2x2 PATTERNS
  {
    id: 31,
    name: '2x2 Checkerboard',
    algorithm: "R2 F2 R2",
    description: 'Simple checkerboard pattern for the 2x2 pocket cube.',
    difficulty: 'Easy',
    moves: 3,
    popular: true,
    cubeType: '2x2',
    category: 'Classic',
    colors: ['bg-red-500', 'bg-white', 'bg-white', 'bg-red-500'],
  },
  {
    id: 32,
    name: '2x2 Cube in Cube',
    algorithm: "R F U' R2 U F' R U F2 R2",
    description: 'Creates a cube in cube effect on the 2x2.',
    difficulty: 'Medium',
    moves: 10,
    popular: true,
    cubeType: '2x2',
    category: 'Classic',
    colors: ['bg-orange-500', 'bg-red-500', 'bg-red-500', 'bg-orange-500'],
  },
  {
    id: 33,
    name: '2x2 Four Corners',
    algorithm: "R U R' U R U2 R'",
    description: 'Orients corners to create a four-color top.',
    difficulty: 'Easy',
    moves: 7,
    popular: false,
    cubeType: '2x2',
    category: 'Shapes',
    colors: ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-orange-500'],
  },
  {
    id: 34,
    name: '2x2 Twisted Corners',
    algorithm: "R U' R' U' F' U F R U R'",
    description: 'All corners twisted for a colorful mix.',
    difficulty: 'Medium',
    moves: 10,
    popular: false,
    cubeType: '2x2',
    category: 'Advanced',
    colors: ['bg-yellow-500', 'bg-red-500', 'bg-blue-500', 'bg-green-500'],
  },
  // 4x4 PATTERNS
  {
    id: 35,
    name: '4x4 Checkerboard',
    algorithm: "r2 R2 u2 U2 f2 F2",
    description: 'Checkerboard pattern adapted for the 4x4 cube.',
    difficulty: 'Easy',
    moves: 6,
    popular: true,
    cubeType: '4x4',
    category: 'Classic',
    colors: ['bg-red-500', 'bg-white', 'bg-red-500', 'bg-white', 'bg-white', 'bg-red-500', 'bg-white', 'bg-red-500', 'bg-red-500'],
  },
  {
    id: 36,
    name: '4x4 Cube in Cube',
    algorithm: "Fw F Rw R' Uw' U Rw R' Fw' F' Uw U'",
    description: 'Cube in cube illusion for the Revenge cube.',
    difficulty: 'Medium',
    moves: 12,
    popular: true,
    cubeType: '4x4',
    category: 'Classic',
    colors: ['bg-orange-500', 'bg-red-500', 'bg-red-500', 'bg-orange-500', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-orange-500'],
  },
  {
    id: 37,
    name: '4x4 Six Spots',
    algorithm: "Rw2 Lw2 Uw2 Dw2 Fw2 Bw2",
    description: 'Six spots pattern for 4x4 with center pieces swapped.',
    difficulty: 'Easy',
    moves: 6,
    popular: false,
    cubeType: '4x4',
    category: 'Classic',
    colors: ['bg-blue-500', 'bg-blue-500', 'bg-blue-500', 'bg-blue-500', 'bg-green-500', 'bg-green-500', 'bg-blue-500', 'bg-blue-500', 'bg-blue-500'],
  },
  {
    id: 38,
    name: '4x4 Cross',
    algorithm: "r2 R2 l2 L2 u2 U2 d2 D2",
    description: 'Cross pattern on each face of the 4x4.',
    difficulty: 'Medium',
    moves: 8,
    popular: false,
    cubeType: '4x4',
    category: 'Shapes',
    colors: ['bg-green-500', 'bg-red-500', 'bg-green-500', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-green-500', 'bg-red-500', 'bg-green-500'],
  },
  // PYRAMINX PATTERNS
  {
    id: 39,
    name: 'Pyraminx Tricolor',
    algorithm: "R L R' L'",
    description: 'Creates a three-color pattern on the Pyraminx faces.',
    difficulty: 'Easy',
    moves: 4,
    popular: true,
    cubeType: 'Pyraminx',
    category: 'Classic',
    colors: ['bg-yellow-500', 'bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-yellow-500', 'bg-red-500', 'bg-red-500', 'bg-green-500', 'bg-green-500'],
  },
  {
    id: 40,
    name: 'Pyraminx Edge Cycle',
    algorithm: "R U R' U' R U R'",
    description: 'Cycles edges to create a mixed pattern.',
    difficulty: 'Easy',
    moves: 7,
    popular: false,
    cubeType: 'Pyraminx',
    category: 'Classic',
    colors: ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-red-500', 'bg-red-500', 'bg-yellow-500', 'bg-yellow-500', 'bg-blue-500', 'bg-blue-500'],
  },
  // MORE ADVANCED 3x3 PATTERNS
  {
    id: 41,
    name: 'DNA Helix',
    algorithm: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'",
    description: 'Creates a double helix pattern wrapping around the cube.',
    difficulty: 'Hard',
    moves: 21,
    popular: false,
    cubeType: '3x3',
    category: 'Advanced',
    colors: ['bg-blue-500', 'bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-blue-500', 'bg-yellow-500', 'bg-blue-500', 'bg-red-500', 'bg-blue-500'],
  },
  {
    id: 42,
    name: 'Exchanged Peaks',
    algorithm: "F U2 L F L' B L U B' R' L' U R F U' R2",
    description: 'Swaps corner colors between opposite corners.',
    difficulty: 'Hard',
    moves: 16,
    popular: false,
    cubeType: '3x3',
    category: 'Advanced',
    colors: ['bg-green-500', 'bg-red-500', 'bg-blue-500', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-orange-500', 'bg-red-500', 'bg-yellow-500'],
  },
  {
    id: 43,
    name: 'Ron\'s Cube in a Cube',
    algorithm: "F L F' U' R U F2 L2 U' L' B D' B' L2 U",
    description: 'Alternative cube in cube with different corner positions.',
    difficulty: 'Medium',
    moves: 15,
    popular: false,
    cubeType: '3x3',
    category: 'Classic',
    colors: ['bg-blue-500', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-blue-500', 'bg-red-500', 'bg-blue-500', 'bg-blue-500'],
  },
  {
    id: 44,
    name: 'Displaced Motif',
    algorithm: "R U R' U' M' U R U' r'",
    description: 'Creates an asymmetric displaced pattern.',
    difficulty: 'Medium',
    moves: 9,
    popular: false,
    cubeType: '3x3',
    category: 'Shapes',
    colors: ['bg-red-500', 'bg-yellow-500', 'bg-red-500', 'bg-green-500', 'bg-red-500', 'bg-blue-500', 'bg-red-500', 'bg-orange-500', 'bg-red-500'],
  },
  {
    id: 45,
    name: 'Union Jack',
    algorithm: "M' U M U M' U M U M' U M U2 M' U M U M' U M",
    description: 'Creates a pattern inspired by the British flag.',
    difficulty: 'Hard',
    moves: 18,
    popular: true,
    cubeType: '3x3',
    category: 'Flags',
    colors: ['bg-blue-700', 'bg-red-500', 'bg-blue-700', 'bg-red-500', 'bg-white', 'bg-red-500', 'bg-blue-700', 'bg-red-500', 'bg-blue-700'],
  },
  {
    id: 46,
    name: 'Rising Sun (Japanese War Flag)',
    algorithm: "R L U D' F B' R L'",
    description: 'Creates radiating lines from a central point.',
    difficulty: 'Medium',
    moves: 8,
    popular: false,
    cubeType: '3x3',
    category: 'Flags',
    colors: ['bg-white', 'bg-red-500', 'bg-white', 'bg-red-500', 'bg-red-600', 'bg-red-500', 'bg-white', 'bg-red-500', 'bg-white'],
  },
  {
    id: 47,
    name: 'Brick Wall',
    algorithm: "R2 L2 U D' F B' R2 L2",
    description: 'Creates an offset brick-like pattern.',
    difficulty: 'Easy',
    moves: 8,
    popular: false,
    cubeType: '3x3',
    category: 'Shapes',
    colors: ['bg-red-600', 'bg-red-400', 'bg-red-600', 'bg-red-400', 'bg-red-600', 'bg-red-400', 'bg-red-600', 'bg-red-400', 'bg-red-600'],
  },
  {
    id: 48,
    name: 'Zig-Zag',
    algorithm: "R L' F B' U D' R' L",
    description: 'Creates a zig-zag pattern across the faces.',
    difficulty: 'Easy',
    moves: 8,
    popular: false,
    cubeType: '3x3',
    category: 'Shapes',
    colors: ['bg-blue-500', 'bg-yellow-500', 'bg-blue-500', 'bg-yellow-500', 'bg-blue-500', 'bg-yellow-500', 'bg-blue-500', 'bg-yellow-500', 'bg-blue-500'],
  },
  {
    id: 49,
    name: 'Center Edge Swap',
    algorithm: "M E M' E'",
    description: 'Swaps center columns creating unique patterns.',
    difficulty: 'Easy',
    moves: 4,
    popular: false,
    cubeType: '3x3',
    category: 'Classic',
    colors: ['bg-red-500', 'bg-green-500', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-green-500', 'bg-red-500'],
  },
  {
    id: 50,
    name: 'Anaconda 2',
    algorithm: "L U B' U' R L' B R' F B' D R D' F'",
    description: 'Another snake pattern wrapping the cube differently.',
    difficulty: 'Medium',
    moves: 14,
    popular: false,
    cubeType: '3x3',
    category: 'Shapes',
    colors: ['bg-green-500', 'bg-red-500', 'bg-green-500', 'bg-red-500', 'bg-red-500', 'bg-green-500', 'bg-green-500', 'bg-red-500', 'bg-red-500'],
  },
];

export default function PatternsPage() {
  const [activeDifficulty, setActiveDifficulty] = useState('All');
  const [activeCubeType, setActiveCubeType] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [showOnlyPopular, setShowOnlyPopular] = useState(false);

  const filteredPatterns = patterns.filter(pattern => {
    const matchesDifficulty = activeDifficulty === 'All' || pattern.difficulty === activeDifficulty;
    const matchesCubeType = activeCubeType === 'All' || pattern.cubeType === activeCubeType;
    const matchesCategory = activeCategory === 'All' || pattern.category === activeCategory;
    const matchesPopular = !showOnlyPopular || pattern.popular;
    return matchesDifficulty && matchesCubeType && matchesCategory && matchesPopular;
  });

  const copyToClipboard = (algorithm: string, id: number) => {
    navigator.clipboard.writeText(algorithm);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-600 py-16 md:py-20">
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
              <FaPalette className="text-3xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                Cube Patterns
              </h1>
              <p className="text-white/80 mt-1">Create stunning designs on your cube</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-medium">{patterns.length}</span>
              <span className="text-white/70 ml-1">Patterns</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-medium">{patterns.filter(p => p.category === 'Flags').length}</span>
              <span className="text-white/70 ml-1">Flag Patterns</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-medium">{patterns.filter(p => p.cubeType !== '3x3').length}</span>
              <span className="text-white/70 ml-1">Other Cubes</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-medium">{patterns.filter(p => p.popular).length}</span>
              <span className="text-white/70 ml-1">Popular</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white border-b sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="space-y-4">
            {/* Cube Type Filter */}
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              <div className="flex items-center gap-2 text-gray-500 flex-shrink-0">
                <FaFlag />
                <span className="font-medium">Cube:</span>
              </div>
              {cubeTypes.map((cubeType) => (
                <button
                  key={cubeType}
                  onClick={() => setActiveCubeType(cubeType)}
                  className={`px-4 py-2 rounded-full font-medium transition-all flex-shrink-0 ${
                    activeCubeType === cubeType
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cubeType}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              <div className="flex items-center gap-2 text-gray-500 flex-shrink-0">
                <FaPalette />
                <span className="font-medium">Type:</span>
              </div>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all flex-shrink-0 ${
                    activeCategory === category
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Difficulty and Popular Filter */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0">
                <div className="flex items-center gap-2 text-gray-500 flex-shrink-0">
                  <FaFilter />
                  <span className="font-medium">Difficulty:</span>
                </div>
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setActiveDifficulty(difficulty)}
                    className={`px-4 py-2 rounded-full font-medium transition-all flex-shrink-0 ${
                      activeDifficulty === difficulty
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setShowOnlyPopular(!showOnlyPopular)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                  showOnlyPopular
                    ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FaStar className={showOnlyPopular ? 'text-yellow-500' : ''} />
                Popular Only
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Patterns Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-gray-600 mb-8">
            Showing <span className="font-semibold text-secondary">{filteredPatterns.length}</span> patterns
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatterns.map((pattern) => (
              <div 
                key={pattern.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group hover:-translate-y-2"
              >


                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-gray-200 text-gray-700">
                      {pattern.cubeType}
                    </span>
                    {pattern.popular && (
                      <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <FaStar className="text-xs" />
                        Popular
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-secondary group-hover:text-purple-600 transition-colors">
                      {pattern.name}
                    </h3>
                    <div className="flex gap-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        pattern.category === 'Flags' ? 'bg-blue-100 text-blue-600' :
                        pattern.category === 'Letters' ? 'bg-indigo-100 text-indigo-600' :
                        pattern.category === 'Shapes' ? 'bg-pink-100 text-pink-600' :
                        pattern.category === 'Advanced' ? 'bg-red-100 text-red-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {pattern.category}
                      </span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        pattern.difficulty === 'Easy' ? 'bg-green-100 text-green-600' :
                        pattern.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {pattern.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {pattern.description}
                  </p>

                  {/* Algorithm */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400 font-medium">ALGORITHM</span>
                      <span className="text-xs text-gray-400">{pattern.moves} moves</span>
                    </div>
                    <code className="text-purple-600 font-mono text-sm block break-all">
                      {pattern.algorithm}
                    </code>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => copyToClipboard(pattern.algorithm, pattern.id)}
                    className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                      copiedId === pattern.id 
                        ? 'bg-green-500 text-white' 
                        : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                    }`}
                  >
                    {copiedId === pattern.id ? (
                      <>
                        <FaCheck />
                        Copied!
                      </>
                    ) : (
                      <>
                        <FaCopy />
                        Copy Algorithm
                      </>
                    )}
                  </button>
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
            Pattern Tips
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-purple-50 rounded-2xl">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-bold text-secondary mb-2">Start Solved</h3>
              <p className="text-gray-600 text-sm">
                Always start with a solved cube. The algorithms are designed to work from the solved state.
              </p>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-2xl">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="font-bold text-secondary mb-2">Reverse to Solve</h3>
              <p className="text-gray-600 text-sm">
                To get back to solved, just do the algorithm in reverse! R becomes R&apos;, U becomes U&apos;, etc.
              </p>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-2xl">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="font-bold text-secondary mb-2">Show Off!</h3>
              <p className="text-gray-600 text-sm">
                Patterns are great for photos and impressing friends. Practice a few to have ready!
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
