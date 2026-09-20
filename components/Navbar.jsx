import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Image Logo */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/image/logo.png.png" // Replace with your actual image path in the public folder
            alt="Ashabel Thrifts" 
            width={140} 
            height={40} 
            className="h-15 w-auto object-contain"
          />
        </Link>

        {/* Menu Links */}
        <nav className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
          <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <Link href="/shop" className="hover:text-amber-500 transition-colors">Shop</Link>
          <Link href="/about" className="hover:text-amber-500 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-amber-500 transition-colors">Contact</Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-700 hover:text-amber-500 transition-colors">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute top-0 right-0 bg-amber-400 text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center text-gray-900">
              0
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}