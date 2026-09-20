"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Image Logo */}
        <Link href="/" className="flex items-center" onClick={closeMenu}>
          <Image 
            src="/image/logo.png.png" 
            alt="Ashabel Thrifts" 
            width={140} 
            height={40} 
            className="h-15 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu Links */}
        <nav className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
          <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <Link href="/shop" className="hover:text-amber-500 transition-colors">Shop</Link>
          <Link href="/about" className="hover:text-amber-500 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-amber-500 transition-colors">Contact</Link>
        </nav>

        {/* Right Actions & Mobile Hamburger */}
        <div className="flex items-center space-x-3">
          <button className="relative p-2 text-gray-700 hover:text-amber-500 transition-colors">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute top-0 right-0 bg-amber-400 text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center text-gray-900">
              0
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 hover:text-amber-500 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-6 space-y-4 shadow-lg animate-fadeIn">
          <Link 
            href="/" 
            onClick={closeMenu}
            className="block text-lg font-medium text-gray-800 hover:text-amber-500 transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/shop" 
            onClick={closeMenu}
            className="block text-lg font-medium text-gray-800 hover:text-amber-500 transition-colors"
          >
            Shop
          </Link>
          <Link 
            href="/about" 
            onClick={closeMenu}
            className="block text-lg font-medium text-gray-800 hover:text-amber-500 transition-colors"
          >
            About
          </Link>
          <Link 
            href="/contact" 
            onClick={closeMenu}
            className="block text-lg font-medium text-gray-800 hover:text-amber-500 transition-colors"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}