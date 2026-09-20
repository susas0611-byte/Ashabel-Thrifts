"use client";
import React, { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Sparkles, Check } from "lucide-react";

const CATEGORIES = ["All", "Sport Shoes", "Casual Shoes", "Women's Sneakers"];

const INITIAL_PRODUCTS = [
  { id: 1, name: "Rainbow Gradient Athletic Sneaker", category: "Women's Sneakers", price: "1,000", originalPrice: 2200, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800", size: "Size 39", badge: "Hot Deal" },
  { id: 2, name: "Classic White High-Top Platform", category: "Casual Shoes", price: "1,000", originalPrice: 2500, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800", size: "Size 38", badge: "Best Seller" },
  { id: 3, name: "Sky Blue Performance Runner", category: "Sport Shoes", price: "1,500", originalPrice: 3200, image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=800", size: "Size 42", badge: "Trending" },
  { id: 4, name: "Midnight Black Knit Comfort Trainer", category: "Sport Shoes", price: "1,000", originalPrice: 2400, image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800", size: "Size 38", badge: "Popular" },
  { id: 5, name: "Urban Street White & Navy Kicks", category: "Casual Shoes", price: "1,800", originalPrice: 3500, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800", size: "Size 42" },
  { id: 6, name: "All-Terrain Stealth Black Runner", category: "Sport Shoes", price: "1,600", originalPrice: 3000, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800", size: "Size 41", badge: "New Drop" },
  { id: 7, name: "Neon Highlight White Runner", category: "Sport Shoes", price: "1,500", originalPrice: 3100, image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800", size: "Size 42" },
  { id: 8, name: "Sky Blue & Orange Accent Sneaker", category: "Casual Shoes", price: "1,000", originalPrice: 2200, image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800", size: "Size 38", badge: "Special Offer" }
];

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    const version = localStorage.getItem("ashabel_version");
    if (version !== "v2") {
      localStorage.setItem("ashabel_products", JSON.stringify(INITIAL_PRODUCTS));
      localStorage.setItem("ashabel_version", "v2");
      setProducts(INITIAL_PRODUCTS);
    } else {
      const saved = localStorage.getItem("ashabel_products");
      if (saved) {
        setProducts(JSON.parse(saved));
      } else {
        setProducts(INITIAL_PRODUCTS);
      }
    }
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.size.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* Modern Header Banner */}
      <div className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-teal-500/10 text-teal-400 border border-teal-500/20 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Curated Inventory
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Explore Our Footwear Catalog</h1>
            <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-xl">
              Browse top-tier thrift kicks, check available sizes, and order instantly.
            </p>
          </div>

          {/* Floating Search Bar */}
          <div className="flex items-center bg-slate-900/90 backdrop-blur-md rounded-2xl px-4 py-3 border border-slate-700/80 shadow-xl w-full md:w-80 focus-within:border-teal-500 transition-colors">
            <Search className="w-4 h-4 text-teal-400 mr-3 shrink-0" />
            <input 
              type="text" 
              placeholder="Search size 38, runner..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm outline-none w-full text-white placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                  selectedCategory === cat 
                    ? "bg-teal-600 text-white shadow-teal-600/20 shadow-lg scale-105" 
                    : "bg-white text-slate-700 border border-slate-200 hover:border-teal-500 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs font-semibold text-slate-500">
            Showing <span className="text-slate-900 font-bold">{filteredProducts.length}</span> items
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-lg font-medium">No footwear matches your search criteria.</p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="mt-4 bg-teal-50 text-teal-700 font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-teal-100 transition-colors"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isJustAdded = addedId === product.id;
              return (
                <div 
                  key={product.id} 
                  className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-64 bg-slate-100 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full shadow-md">
                        {product.badge}
                      </span>
                    )}
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow">
                      {product.size}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-teal-600 tracking-wider uppercase">{product.category}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base mb-4 line-clamp-1 group-hover:text-teal-600 transition-colors">
                        {product.name}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div>
                        <div className="text-lg font-black text-slate-900">Ksh {product.price}</div>
                        <div className="text-xs text-slate-400 line-through">Ksh {product.originalPrice || 2500}</div>
                      </div>
                      
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                          isJustAdded 
                            ? "bg-emerald-600 text-white scale-105" 
                            : "bg-slate-900 hover:bg-teal-600 text-white"
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Added
                          </>
                        ) : (
                          "Add to Cart"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}