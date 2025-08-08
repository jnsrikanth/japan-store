'use client';

import { useState } from 'react';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import Logo from '@/components/Logo';

const Header = () => {
  const { totalItems, toggleCart } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Logo size={56} />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 text-lg">
            <a href="#home" className="text-gray-700 hover:text-sakura-600 font-semibold transition-colors">Home</a>
            <a href="#products" className="text-gray-700 hover:text-sakura-600 font-semibold transition-colors">Shop</a>
            <a href="#about" className="text-gray-700 hover:text-sakura-600 font-semibold transition-colors">About</a>
            <a href="#contact" className="text-gray-700 hover:text-sakura-600 font-semibold transition-colors">Contact</a>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <button onClick={toggleCart} className="relative p-2 text-gray-700 hover:text-sakura-600">
              <ShoppingCartIcon className="h-7 w-7" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-sakura-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
              {open ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
            </button>
          </div>
        </div>

        {/* Mobile */}
        {open && (
          <div className="md:hidden border-t border-gray-200 animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-lg">
              <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-sakura-600 font-medium" onClick={() => setOpen(false)}>Home</a>
              <a href="#products" className="block px-3 py-2 text-gray-700 hover:text-sakura-600 font-medium" onClick={() => setOpen(false)}>Shop</a>
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-sakura-600 font-medium" onClick={() => setOpen(false)}>About</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-sakura-600 font-medium" onClick={() => setOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

