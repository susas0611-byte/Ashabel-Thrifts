"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const updateCount = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart);
          const count = parsed.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
          setTotalItems(count);
        } catch (e) {
          setTotalItems(0);
        }
      } else {
        setTotalItems(0);
      }
    };

    updateCount();
    window.addEventListener("storage", updateCount);
    window.addEventListener("cartUpdated", updateCount);

    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("cartUpdated", updateCount);
    };
  }, []);

  const handleOpenCart = () => {
    localStorage.setItem("shouldOpenCart", "true");
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        <Link href="/" className="flex items-center" onClick={closeMenu}>
          <Image 
            src="/image/logo.png.png" 
            alt="Ashabel Thrifts" 
            width={140} 
            height={40} 
            className="h-14 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
          <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <Link href="/shop" className="hover:text-amber-500 transition-colors">Shop</Link>
          <Link href="/about" className="hover:text-amber-500 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-amber-500 transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center space-x-3">
          {/* Cart Icon Button - Opens Drawer */}
          <button 
            onClick={handleOpenCart}
            className="relative p-2 text-gray-700 hover:text-amber-500 transition-colors cursor-pointer"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-amber-400 text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center text-gray-900 shadow-sm">
                {totalItems}
              </span>
            )}
          </button>

          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 hover:text-amber-500 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-6 space-y-4 shadow-lg">
          <Link href="/" onClick={closeMenu} className="block text-lg font-medium text-gray-800 hover:text-amber-500">Home</Link>
          <Link href="/shop" onClick={closeMenu} className="block text-lg font-medium text-gray-800 hover:text-amber-500">Shop</Link>
          <Link href="/about" onClick={closeMenu} className="block text-lg font-medium text-gray-800 hover:text-amber-500">About</Link>
          <Link href="/contact" onClick={closeMenu} className="block text-lg font-medium text-gray-800 hover:text-amber-500">Contact</Link>
        </div>
      )}
    </header>
  );
}