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
];

