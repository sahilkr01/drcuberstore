import { Product, Review } from './types';

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Speed Cube 3x3 Pro',
    description: 'Professional speed cube with smooth rotation and corner cutting. Perfect for speedcubing competitions.',
    longDescription: 'The Speed Cube 3x3 Pro is engineered for serious speedcubers who demand the best performance. Featuring advanced corner-cutting technology and a buttery-smooth turning mechanism, this cube allows for lightning-fast solves. The anti-pop design ensures stability during intense solving sessions, while the adjustable tension system lets you customize the feel to your preference. Whether you\'re practicing for competitions or just want the best solving experience, this cube delivers.',
    price: 599,
    originalPrice: 799,
    category: 'cube',
    image: 'https://images.unsplash.com/photo-1591991564021-0662a8573199?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1591991564021-0662a8573199?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1494537176433-7a3c4ef2046f?w=800&h=800&fit=crop'
    ],
    stock: 50,
    rating: 4.8,
    reviews: 234,
    featured: true,
    badge: 'Best Seller',
    specifications: {
      brand: 'DR.CUBER',
      model: 'Pro 3x3 V2',
      dimensions: '56mm x 56mm x 56mm',
      weight: '85g',
      material: 'ABS Plastic',
      mechanism: 'Ball-Core',
      magnetized: false,
      difficulty: 'Intermediate',
      ageGroup: '6+ years',
      color: 'Stickerless'
    }
  },
  {
    id: '2',
    name: 'Magnetic Cube 3x3',
    description: 'Premium magnetic cube with adjustable tension. Ultra-smooth and stable turns.',
    longDescription: 'Experience the next level of speedcubing with our Magnetic Cube 3x3. Equipped with precisely positioned magnets, this cube offers unparalleled stability and control during solves. The magnetic positioning system ensures each turn snaps into place with satisfying precision, reducing lockups and improving your times. The premium ABS construction provides durability while maintaining a lightweight feel.',
    price: 899,
    originalPrice: 1199,
    category: 'cube',
    image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1591991564021-0662a8573199?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=800&h=800&fit=crop'
    ],
    stock: 35,
    rating: 4.9,
    reviews: 189,
    featured: true,
    badge: 'Premium',
    specifications: {
      brand: 'DR.CUBER',
      model: 'Magnetic Elite',
      dimensions: '55.5mm x 55.5mm x 55.5mm',
      weight: '78g',
      material: 'Frosted ABS',
      mechanism: 'Dual-Adjustment',
      magnetized: true,
      difficulty: 'Advanced',
      ageGroup: '8+ years',
      color: 'Stickerless Bright'
    }
  },
  {
    id: '3',
    name: 'Pyraminx Speed Puzzle',
    description: 'Triangle-shaped puzzle for beginners and pros. Great for learning algorithms.',
    longDescription: 'The Pyraminx Speed Puzzle offers a unique pyramidal challenge that\'s perfect for both beginners looking to expand beyond the 3x3 and experienced puzzlers seeking variety. With its intuitive design and satisfying click mechanism, solving becomes addictively fun. The high-quality construction ensures smooth rotations and long-lasting durability.',
    price: 349,
    category: 'puzzle',
    image: 'https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1591991564021-0662a8573199?w=800&h=800&fit=crop'
    ],
    stock: 75,
    rating: 4.6,
    reviews: 156,
    featured: true,
    specifications: {
      brand: 'DR.CUBER',
      model: 'Pyraminx Pro',
      dimensions: '98mm base',
      weight: '65g',
      material: 'ABS Plastic',
      mechanism: 'Click-Lock',
      magnetized: false,
      difficulty: 'Beginner',
      ageGroup: '6+ years',
      color: 'Stickerless'
    }
  },
  {
    id: '4',
    name: 'Megaminx Dodecahedron',
    description: '12-faced puzzle cube. Challenge yourself with this advanced puzzle.',
    longDescription: 'Take on the ultimate challenge with the Megaminx Dodecahedron. This 12-faced puzzle tests your spatial reasoning and algorithm knowledge like no other. Despite its intimidating appearance, the Megaminx follows similar principles to the 3x3, making it an achievable next step for intermediate cubers. Our version features smooth turning and vibrant stickerless design.',
    price: 749,
    originalPrice: 899,
    category: 'puzzle',
    image: 'https://images.unsplash.com/photo-1494537176433-7a3c4ef2046f?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1494537176433-7a3c4ef2046f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1591991564021-0662a8573199?w=800&h=800&fit=crop'
    ],
    stock: 25,
    rating: 4.7,
    reviews: 98,
    featured: false,
    specifications: {
      brand: 'DR.CUBER',
      model: 'Megaminx V3',
      dimensions: '75mm diameter',
      weight: '145g',
      material: 'Premium ABS',
      mechanism: 'Sculpted Edges',
      magnetized: false,
      difficulty: 'Expert',
      ageGroup: '10+ years',
      color: 'Stickerless'
    }
  },
  {
    id: '5',
    name: 'Cube Timer Pro',
    description: 'Professional speedcubing timer with mat. Essential for competition practice.',
    longDescription: 'The Cube Timer Pro is the essential accessory for serious speedcubers. Featuring high-precision timing accurate to 0.001 seconds, this timer meets WCA competition standards. The included non-slip mat provides a stable surface for your solves, while the large LCD display makes reading your times effortless. Track your progress and achieve new personal bests.',
    price: 499,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1533749047139-189de3cf06d3?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1533749047139-189de3cf06d3?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=800&h=800&fit=crop'
    ],
    stock: 40,
    rating: 4.5,
    reviews: 67,
    featured: false,
    specifications: {
      brand: 'DR.CUBER',
      model: 'Timer Pro V2',
      dimensions: '120mm x 80mm',
      weight: '180g',
      material: 'ABS + Silicone Mat',
      ageGroup: '6+ years',
      color: 'Black'
    }
  },
  {
    id: '6',
    name: 'Fidget Cube Deluxe',
    description: 'Six-sided fidget toy with different textures. Great stress reliever.',
    longDescription: 'Discover endless stress relief with our Fidget Cube Deluxe. Each of the six sides features a unique tactile experience - click, glide, flip, breathe, roll, and spin. Perfect for fidgeters, students, and professionals who need to keep their hands busy while focusing. The compact size fits perfectly in your pocket for on-the-go relaxation.',
    price: 199,
    category: 'toy',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop'
    ],
    stock: 100,
    rating: 4.4,
    reviews: 312,
    featured: true,
    badge: 'Popular',
    specifications: {
      brand: 'DR.CUBER',
      model: 'Fidget Deluxe',
      dimensions: '33mm x 33mm x 33mm',
      weight: '45g',
      material: 'Premium ABS + Rubber',
      difficulty: 'Beginner',
      ageGroup: '3+ years',
      color: 'Multiple Colors'
    }
  },
  {
    id: '7',
    name: '2x2 Mini Cube',
    description: 'Pocket-sized speed cube. Perfect for beginners and on-the-go solving.',
    longDescription: 'The 2x2 Mini Cube is the perfect introduction to speedcubing. With fewer pieces than a 3x3, it\'s easier to learn but still provides a satisfying challenge. The compact size makes it ideal for travel, and the smooth mechanism ensures enjoyable solving anywhere you go. A great gift for puzzle enthusiasts of all ages.',
    price: 249,
    category: 'cube',
    image: 'https://images.unsplash.com/photo-1591991564021-0662a8573199?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1591991564021-0662a8573199?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=800&h=800&fit=crop'
    ],
    stock: 80,
    rating: 4.6,
    reviews: 145,
    featured: false,
    specifications: {
      brand: 'DR.CUBER',
      model: '2x2 Speed',
      dimensions: '50mm x 50mm x 50mm',
      weight: '55g',
      material: 'ABS Plastic',
      mechanism: 'Standard Core',
      magnetized: false,
      difficulty: 'Beginner',
      ageGroup: '4+ years',
      color: 'Stickerless'
    }
  },
  {
    id: '8',
    name: '4x4 Master Cube',
    description: 'Take your skills to the next level with this 4x4 speed cube.',
    longDescription: 'Ready to level up? The 4x4 Master Cube introduces new challenges with its center pieces and additional layers. Learn new algorithms and experience the satisfaction of solving a more complex puzzle. Our version features anti-pop technology and smooth turning to make your 4x4 journey enjoyable from day one.',
    price: 699,
    originalPrice: 849,
    category: 'cube',
    image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1591991564021-0662a8573199?w=800&h=800&fit=crop'
    ],
    stock: 45,
    rating: 4.7,
    reviews: 112,
    featured: true,
    specifications: {
      brand: 'DR.CUBER',
      model: '4x4 Master V2',
      dimensions: '62mm x 62mm x 62mm',
      weight: '125g',
      material: 'Premium ABS',
      mechanism: 'Anti-Pop Core',
      magnetized: false,
      difficulty: 'Intermediate',
      ageGroup: '8+ years',
      color: 'Stickerless'
    }
  },
  {
    id: '9',
    name: 'Cube Lubricant Set',
    description: 'Professional lubricant kit for smooth cube performance.',
    longDescription: 'Keep your cubes performing at their best with our Cube Lubricant Set. This comprehensive kit includes three different viscosities for customizing your cube\'s feel - from lightning-fast to controlled and smooth. Easy-to-use applicator bottles ensure precise application. Compatible with all types of speed cubes.',
    price: 299,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=800&h=800&fit=crop'
    ],
    stock: 60,
    rating: 4.8,
    reviews: 89,
    featured: false,
    specifications: {
      brand: 'DR.CUBER',
      model: 'Lube Kit Pro',
      weight: '30ml total',
      material: 'Silicone-based',
      ageGroup: '10+ years'
    }
  },
  {
    id: '10',
    name: 'Brain Teaser Set',
    description: 'Collection of 6 metal puzzles. Great for developing problem-solving skills.',
    longDescription: 'Challenge your mind with our Brain Teaser Set. This collection of 6 beautifully crafted metal puzzles ranges from moderately tricky to mind-bendingly difficult. Each puzzle requires a unique approach, making this set perfect for developing problem-solving skills and spatial reasoning. An excellent gift for puzzle lovers.',
    price: 449,
    category: 'puzzle',
    image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=800&fit=crop'
    ],
    stock: 30,
    rating: 4.5,
    reviews: 76,
    featured: false,
    specifications: {
      brand: 'DR.CUBER',
      model: 'Metal Brain Set',
      material: 'Zinc Alloy',
      difficulty: 'Varies (Easy to Expert)',
      ageGroup: '8+ years'
    }
  },
  {
    id: '11',
    name: 'Infinity Cube',
    description: 'Endless folding fidget cube. Addictive and satisfying to play with.',
    longDescription: 'Get lost in the mesmerizing motion of our Infinity Cube. This ingenious fidget toy folds endlessly, providing satisfying tactile feedback with every flip. The smooth hinges and quality construction make it a pleasure to use for hours. Perfect for stress relief, focus improvement, or just keeping your hands busy.',
    price: 179,
    category: 'toy',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop'
    ],
    stock: 120,
    rating: 4.3,
    reviews: 234,
    featured: true,
    badge: 'New',
    specifications: {
      brand: 'DR.CUBER',
      model: 'Infinity Mini',
      dimensions: '40mm x 40mm x 40mm',
      weight: '60g',
      material: 'ABS + Metal Hinges',
      difficulty: 'Beginner',
      ageGroup: '6+ years',
      color: 'Galaxy Blue'
    }
  },
  {
    id: '12',
    name: 'Cube Storage Bag',
    description: 'Premium carrying case for up to 8 cubes. Padded protection.',
    longDescription: 'Protect your cube collection with our premium Cube Storage Bag. Designed to hold up to 8 cubes of various sizes, this bag features padded compartments to prevent scratches and damage. The durable exterior withstands daily use while the comfortable strap makes transport easy. Essential for competitions and cube meetups.',
    price: 349,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop'
    ],
    stock: 55,
    rating: 4.6,
    reviews: 45,
    featured: false,
    specifications: {
      brand: 'DR.CUBER',
      model: 'Carry Pro 8',
      dimensions: '250mm x 180mm x 100mm',
      weight: '220g',
      material: 'Nylon + EVA Padding',
      ageGroup: 'All ages',
      color: 'Black'
    }
  }
];

export const sampleReviews: Review[] = [
  {
    id: 'r1',
    productId: '1',
    userName: 'Rahul Sharma',
    rating: 5,
    title: 'Best cube I have ever used!',
    comment: 'This cube is absolutely amazing! The corner cutting is perfect and the turns are so smooth. I have reduced my average time by 5 seconds since switching to this cube. Highly recommended for anyone serious about speedcubing.',
    date: '2026-01-02',
    helpful: 45,
    verified: true
  },
  {
    id: 'r2',
    productId: '1',
    userName: 'Priya Patel',
    rating: 5,
    title: 'Perfect for competitions',
    comment: 'Used this at my last competition and got a new PB! The stability is incredible and it never pops. The stickerless design looks great too.',
    date: '2025-12-28',
    helpful: 32,
    verified: true
  },
  {
    id: 'r3',
    productId: '1',
    userName: 'Amit Kumar',
    rating: 4,
    title: 'Great cube, minor issues',
    comment: 'Really good cube overall. Smooth turns and great feel. Took off one star because it came a bit loose out of the box, but easy to adjust.',
    date: '2025-12-20',
    helpful: 18,
    verified: true
  },
  {
    id: 'r4',
    productId: '1',
    userName: 'Sneha Reddy',
    rating: 5,
    title: 'Exceeded expectations',
    comment: 'Was skeptical at first but this cube is genuinely competition-ready. Fast delivery too!',
    date: '2025-12-15',
    helpful: 24,
    verified: true
  },
  {
    id: 'r5',
    productId: '2',
    userName: 'Vikram Singh',
    rating: 5,
    title: 'Magnets make all the difference',
    comment: 'The magnetic positioning is game-changing. Every turn snaps perfectly into place. Worth every rupee!',
    date: '2026-01-05',
    helpful: 56,
    verified: true
  },
  {
    id: 'r6',
    productId: '2',
    userName: 'Ananya Iyer',
    rating: 5,
    title: 'Premium quality',
    comment: 'Beautiful cube with fantastic build quality. The magnets are perfectly balanced - not too strong, not too weak.',
    date: '2025-12-30',
    helpful: 41,
    verified: true
  },
  {
    id: 'r7',
    productId: '3',
    userName: 'Karthik M',
    rating: 4,
    title: 'Fun puzzle!',
    comment: 'Great Pyraminx for the price. Smooth turns and nice colors. My kids love it too.',
    date: '2026-01-01',
    helpful: 15,
    verified: true
  }
];

export const categories = [
  { id: 'all', name: 'All Products', icon: 'grid', count: 12 },
  { id: 'cube', name: 'Speed Cubes', icon: 'cube', count: 5 },
  { id: 'puzzle', name: 'Puzzles', icon: 'puzzle', count: 3 },
  { id: 'toy', name: 'Toys', icon: 'toy', count: 2 },
  { id: 'accessory', name: 'Accessories', icon: 'tool', count: 3 }
];
