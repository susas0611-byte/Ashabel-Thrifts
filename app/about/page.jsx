import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw, Award, HeartHandshake } from 'lucide-react';

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "Rainbow Gradient Athletic Sneaker",
      price: 1000,
      originalPrice: 2200,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
      size: "Size 39",
      badge: "Hot Deal"
    },
    {
      id: 2,
      name: "Classic White High-Top Platform",
      price: 1000,
      originalPrice: 2500,
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800",
      size: "Size 38",
      badge: "Best Seller"
    },
    {
      id: 3,
      name: "Sky Blue Performance Runner",
      price: 1500,
      originalPrice: 3200,
      image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=800",
      size: "Size 42",
      badge: "Trending"
    },
    {
      id: 4,
      name: "Midnight Black Knit Comfort Trainer",
      price: 1000,
      originalPrice: 2400,
      image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800",
      size: "Size 38",
      badge: "Popular"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Distinct About Us Editorial Hero Banner */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Story & Values */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 text-teal-400 border border-teal-500/20 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">
              <HeartHandshake className="w-4 h-4" /> Who We Are & Our Mission
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1]">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-amber-300">Ashabel Footwear</span>
            </h1>
            
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              We started Ashabel Footwear with a singular vision: to hand-curate premium, top-tier thrift sneakers and deliver them to your doorstep at prices that make sense. Every single pair we select undergoes rigorous quality inspection to guarantee elite durability, style, and total comfort.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-800/80">
              <div>
                <h4 className="text-2xl font-black text-teal-400">100%</h4>
                <p className="text-xs text-slate-400 mt-1">Quality Inspected</p>
              </div>
              <div>
                <h4 className="text-2xl font-black text-amber-300">Countrywide</h4>
                <p className="text-xs text-slate-400 mt-1">Fast Delivery</p>
              </div>
              <div>
                <h4 className="text-2xl font-black text-white">Top-Tier</h4>
                <p className="text-xs text-slate-400 mt-1">Curated Kicks</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                href="/shop" 
                className="bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2"
              >
                Browse Our Catalog <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/contact" 
                className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-medium px-8 py-4 rounded-2xl transition-all"
              >
                Talk to Us on WhatsApp
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Collage representing the Brand */}
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 h-64">
                  <img 
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800" 
                    alt="Ashabel Sneaker Selection 1" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 h-40">
                  <img 
                    src="https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=800" 
                    alt="Ashabel Sneaker Selection 2" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 h-40">
                  <img 
                    src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800" 
                    alt="Ashabel Sneaker Selection 3" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 h-64">
                  <img 
                    src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800" 
                    alt="Ashabel Sneaker Selection 4" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-b border-slate-200 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 p-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">100% Quality Checked</h4>
              <p className="text-xs text-slate-500">Carefully inspected before delivery</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 p-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Countrywide Delivery</h4>
              <p className="text-xs text-slate-500">Fast shipping right to your doorstep</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 p-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Direct WhatsApp Support</h4>
              <p className="text-xs text-slate-500">Quick responses & secure ordering</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-xs font-semibold text-teal-600 tracking-wider uppercase bg-teal-50 px-3 py-1 rounded-full">
              Handpicked Selection
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Trending Footwear</h2>
          </div>
          <Link href="/shop" className="text-teal-600 hover:text-teal-700 font-semibold text-sm flex items-center gap-1 group">
            View All Catalog <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="relative h-64 bg-slate-100 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-3 left-3 bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1 rounded-full shadow">
                  {product.badge}
                </span>
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow">
                  {product.size}
                </span>
              </div>
              
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-3 line-clamp-1 group-hover:text-teal-600 transition-colors">
                    {product.name}
                  </h3>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-lg font-extrabold text-slate-900">Ksh {product.price.toLocaleString()}</span>
                    <span className="text-xs text-slate-400 line-through ml-2">Ksh {product.originalPrice.toLocaleString()}</span>
                  </div>
                  <Link 
                    href="/shop"
                    className="bg-slate-900 hover:bg-teal-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}