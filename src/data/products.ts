export type Product = {
  id: string;
  name: string;
  category: 'gadgets' | 'toys' | 'electronics' | 'snacks' | 'gifts';
  description: string;
  price: number; // in local currency units
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  origin: string;
  inStock: boolean;
  stockQty?: number;
};

export const products: Product[] = [
  // Gifts
  {
    id: 'omamori-001',
    name: 'Omamori Charm – Good Fortune',
    category: 'gifts',
    description: 'Traditional fabric charm for good luck. Great for gifting; includes pouch.',
    price: 1299,
    originalPrice: 1499,
    image: '/images/omamori.svg',
    rating: 4.7,
    reviews: 214,
    origin: 'Kyoto, Japan',
    inStock: true,
    stockQty: 12,
  },
  {
    id: 'totoro-plush-001',
    name: 'Totoro Plush (30cm)',
    category: 'gifts',
    description: 'Soft and huggable Totoro plush — a perfect Studio Ghibli gift.',
    price: 1999,
    originalPrice: 2299,
    image: '/images/gifts.svg',
    rating: 4.8,
    reviews: 784,
    origin: 'Tokyo, Japan',
    inStock: true,
    stockQty: 20,
  },

  // Snacks / Tea
  {
    id: 'matcha-kit-001',
    name: 'Uji Matcha Starter Kit',
    category: 'snacks',
    description: 'Ceremonial grade matcha (30g) with bamboo whisk and scoop. Authentic Uji taste.',
    price: 3499,
    originalPrice: 3999,
    image: '/images/matcha.svg',
    rating: 4.8,
    reviews: 521,
    origin: 'Uji, Kyoto',
    inStock: true,
    stockQty: 8,
  },
  {
    id: 'tokyo-candy-box-001',
    name: 'Tokyo Candy Box – Assorted 12 Pack',
    category: 'snacks',
    description: 'Curated assortment of popular Japanese candies and gummies.',
    price: 1599,
    originalPrice: 1799,
    image: '/images/popular.svg',
    rating: 4.6,
    reviews: 442,
    origin: 'Tokyo, Japan',
    inStock: true,
    stockQty: 30,
  },

  // Toys
  {
    id: 'gashapon-001',
    name: 'Gashapon Surprise Capsule – 3 Pack',
    category: 'toys',
    description: 'Set of 3 random capsules from popular Japanese series. Fun collectables.',
    price: 999,
    originalPrice: 1199,
    image: '/images/gashapon.svg',
    rating: 4.5,
    reviews: 190,
    origin: 'Tokyo, Japan',
    inStock: true,
    stockQty: 25,
  },
  {
    id: 'origami-set-001',
    name: 'Washi Origami Kit – 60 Sheets',
    category: 'toys',
    description: 'Premium washi paper with instruction booklet — perfect for gifting.',
    price: 899,
    originalPrice: 999,
    image: '/images/toys.svg',
    rating: 4.4,
    reviews: 133,
    origin: 'Gifu, Japan',
    inStock: true,
    stockQty: 40,
  },

  // Gadgets (Home)
  {
    id: 'bento-thermo-001',
    name: 'Thermal Bento Box – 1.2L',
    category: 'gadgets',
    description: 'Double-wall stainless steel bento box. Keeps food warm up to 4 hours.',
    price: 2599,
    originalPrice: 2999,
    image: '/images/bento.svg',
    rating: 4.6,
    reviews: 312,
    origin: 'Osaka, Japan',
    inStock: true,
    stockQty: 16,
  },
  {
    id: 'rice-mold-001',
    name: 'Onigiri Rice Mold Set – 6 Shapes',
    category: 'gadgets',
    description: 'Make perfect onigiri at home with non-stick molds and seaweed guides.',
    price: 749,
    originalPrice: 899,
    image: '/images/gadgets.svg',
    rating: 4.3,
    reviews: 210,
    origin: 'Niigata, Japan',
    inStock: true,
    stockQty: 50,
  },

  // Flashy Electronics
  {
    id: 'rgb-anime-lamp-001',
    name: 'RGB Anime Edge-Lit Lamp',
    category: 'electronics',
    description: 'USB-powered acrylic edge-lit lamp with multiple color modes.',
    price: 1799,
    originalPrice: 2199,
    image: '/images/electronics.svg',
    rating: 4.5,
    reviews: 267,
    origin: 'Akihabara, Tokyo',
    inStock: true,
    stockQty: 22,
  },
  {
    id: 'retro-handheld-001',
    name: 'Retro Handheld Console – 500 Games',
    category: 'electronics',
    description: 'Pocketable retro console with classic titles. Great gift for gamers.',
    price: 2999,
    originalPrice: 3499,
    image: '/images/electronics.svg',
    rating: 4.2,
    reviews: 389,
    origin: 'Osaka, Japan',
    inStock: true,
    stockQty: 14,
  },
];

