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
    name: 'Omamori Charm — 福 (Good Fortune)',
    category: 'gifts',
    description: 'Handcrafted omamori charm inspired by Kyoto shrines. Modern minimal packaging.',
    price: 1299,
    originalPrice: 1499,
    image: 'https://images.unsplash.com/photo-1566313898939-48f4e528ae97?q=80&w=1200&auto=format&fit=crop',
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
    description: 'Ceremonial grade matcha tin with chasen whisk and chashaku scoop.',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1512149177596-f817c7ef5d9c?q=80&w=1200&auto=format&fit=crop',
    rating: 4.8,
    reviews: 521,
    origin: 'Uji, Kyoto',
    inStock: true,
    stockQty: 8,
  },
  {
    id: 'gashapon-001',
    name: 'Gashapon Surprise Capsule — Kawaii Series',
    category: 'toys',
    description: 'Authentic gachapon capsules curated from Akihabara.',
    price: 799,
    image: 'https://images.unsplash.com/photo-1520688018727-54ee2a56053e?q=80&w=1200&auto=format&fit=crop',
    rating: 4.5,
    reviews: 190,
    origin: 'Tokyo, Japan',
    inStock: true,
    stockQty: 25,
  },
  {
    id: 'bento-thermo-001',
    name: 'Thermal Bento Box — Bento Pro',
    category: 'gadgets',
    description: 'Leak-proof thermal bento box with minimal Japanese aesthetics.',
    price: 2599,
    image: 'https://images.unsplash.com/photo-1604908553993-426c3d9cac98?q=80&w=1200&auto=format&fit=crop',
    rating: 4.6,
    reviews: 312,
    origin: 'Osaka, Japan',
    inStock: true,
    stockQty: 16,
  },
];

