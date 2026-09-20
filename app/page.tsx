"use client";
import { useRef } from 'react'; 
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Star, 
  ArrowRight, 
  Plus,
  Minus,
  Trash2
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  condition: string;
  size: string;
  badge?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Rainbow Gradient Athletic Sneaker",
    category: "Women's Sneakers",
    price: 1000,
    originalPrice: 2200,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    condition: "Brand New",
    size: "Size 39",
    badge: "Hot Deal"
  },
  {
    id: 2,
    name: "Classic White High-Top Platform",
    category: "Casual Shoes",
    price: 1000,
    originalPrice: 2500,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800",
    condition: "Brand New",
    size: "Size 38",
    badge: "Best Seller"
  },
  {
    id: 3,
    name: "Sky Blue Performance Runner",
    category: "Sport Shoes",
    price: 1500,
    originalPrice: 3200,
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=800",
    condition: "Brand New",
    size: "Size 42",
    badge: "Trending"
  },
  {
    id: 4,
    name: "Midnight Black Knit Comfort Trainer",
    category: "Sport Shoes",
    price: 1000,
    originalPrice: 2400,
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800",
    condition: "Brand New",
    size: "Size 38",
    badge: "Popular"
  },
  {
    id: 5,
    name: "Urban Street White & Navy Kicks",
    category: "Casual Shoes",
    price: 1800,
    originalPrice: 3500,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800",
    condition: "Brand New",
    size: "Size 42",
  },
  {
    id: 6,
    name: "All-Terrain Stealth Black Runner",
    category: "Sport Shoes",
    price: 1600,
    originalPrice: 3000,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800",
    condition: "Brand New",
    size: "Size 41",
    badge: "New Drop"
  },
  {
    id: 7,
    name: "Neon Highlight White Runner",
    category: "Sport Shoes",
    price: 1500,
    originalPrice: 3100,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800",
    condition: "Brand New",
    size: "Size 42",
  },
  {
    id: 8,
    name: "Sky Blue & Orange Accent Sneaker",
    category: "Casual Shoes",
    price: 1000,
    originalPrice: 2200,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800",
    condition: "Brand New",
    size: "Size 38",
    badge: "Special Offer"
  }
];

const CATEGORIES = ["All", "Sport Shoes", "Casual Shoes", "Women's Sneakers"];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load cart from localStorage on mount and listen for changes from the shop page

  // Load cart from localStorage on mount and listen for changes from the shop page
  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error("Failed to parse cart", e);
        }
      } else {
        setCart([]);
      }
    };

    // Handler that forces the cart drawer to pop open
    const handleForceOpen = () => {
      setIsCartOpen(true);
    };

    loadCart();

    window.addEventListener("storage", loadCart);
    window.addEventListener("cartUpdated", loadCart);
    window.addEventListener("forceOpenCart", handleForceOpen); // <--- Listen for the drawer open signal!

    return () => {
      window.removeEventListener("storage", loadCart);
      window.removeEventListener("cartUpdated", loadCart);
      window.removeEventListener("forceOpenCart", handleForceOpen);
    };
  }, []);

  // Helper function to sync state changes to localStorage
  const saveAndSetCart = (newCart: CartItem[] | ((prev: CartItem[]) => CartItem[])) => {
    setCart((prev) => {
      const updated = typeof newCart === "function" ? newCart(prev) : newCart;
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  // Rotating Shoe Types Hook & Logic
  const shoeTypes = ["✨ High-End Sport Shoes", "🔥 Casual Street Sneakers", "👟 Women's Collection"];
  const [currentShoeIndex, setCurrentShoeIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentShoeIndex((prev) => (prev + 1) % shoeTypes.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [shoeTypes.length]);

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.size.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    saveAndSetCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    saveAndSetCart((prev) => 
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: number) => {
    saveAndSetCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // WhatsApp Checkout Handler
  const handleWhatsAppCheckout = () => {
    const phoneNumber = "+254722489487"; 

    let message = "Hello Ashabel Footwear! I'd like to place an order:%0A%0A";
    
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*%0A`;
      message += `   Size: ${item.size}%0A`;
      message += `   Qty: ${item.quantity}%0A`;
      message += `   Price: Ksh ${(item.price * item.quantity).toLocaleString()}%0A%0A`;
    });

    message += `*Total Amount: Ksh ${totalPrice.toLocaleString()}*%0A%0A`;
    message += `Please let me know how to proceed with delivery and payment. Thank you!`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");

    saveAndSetCart([]);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900">
      
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs sm:text-sm py-2 px-4 text-center font-medium tracking-wide">
        ⚡ Premium Footwear Collection • Express Delivery Countrywide 🚚
      </div>
      
      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-24 lg:py-32">
        
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.3 }}
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }}
>
  {/* 1. Badge Animation */}
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    }}
  >
    <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-amber-500/20">
      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> Premium Quality Assured
    </div>
  </motion.div>

  {/* 2. Headline Animation */}
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 25 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    }}
  >
    <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight mb-6">
      Step Out in Style, <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-amber-300">
        Unbeatable Quality.
      </span>
    </h1>
  </motion.div>

  {/* 3. Rotating Shoe Banner Animation */}
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    }}
    className="mb-6 flex flex-wrap items-center gap-3"
  >
    <span className="text-slate-400 text-sm font-medium">Now Featuring:</span>
    <div className="relative overflow-hidden h-10 w-60 flex items-center bg-slate-900 border border-slate-800 rounded-xl px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentShoeIndex}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 flex items-center px-4 font-bold text-sm text-teal-400"
        >
          {shoeTypes[currentShoeIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  </motion.div>

  {/* 4. Paragraph Animation */}
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    }}
  >
    <p className="text-slate-300 text-lg mb-8 max-w-xl font-normal leading-relaxed">
      Explore our exclusive inventory of high-end sneakers, athletic trainers, and casual footwear. Find your exact size and secure your pair today.
    </p>
  </motion.div>
  
  {/* 5. Button Animation */}
  <motion.div
    variants={{
      hidden: { opacity: 0, scale: 0.9, y: 20 },
      visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, type: "spring", stiffness: 200 } }
    }}
    className="flex flex-wrap gap-4"
  >
    <a 
      href="#shop" 
      className="bg-teal-700 hover:bg-teal-500 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-xl shadow-teal-600/30 flex items-center gap-2 group hover:scale-105"
    >
      Explore Catalog <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </a>
  </motion.div>
</motion.div>

          {/* Hero Featured Image Card with subtle gold border accent */}
          {/* Hero Featured Image Card with Floating and Glowing Effects */}
<motion.div 
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.7, delay: 0.2 }}
  className="relative"
>
  {/* Ambient Pulsing Glow Behind Card */}
  <motion.div 
    animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.03, 1] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    className="absolute -inset-2 bg-gradient-to-r from-teal-500/30 via-cyan-500/10 to-amber-500/30 rounded-3xl blur-2xl -z-10"
  />

  {/* Floating Sneaker Container */}
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    className="relative mx-auto w-full max-w-md lg:max-w-lg aspect-square rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-500/20 bg-slate-900 group"
  >
    <img 
      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000" 
      alt="Featured Sneaker" 
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex items-end p-8">
      <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 w-full flex items-center justify-between shadow-lg">
        <div>
          <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Featured Deal</p>
          <p className="text-white font-bold text-base">Top Grade Comfort Kicks</p>
        </div>
        <span className="bg-teal-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-md">Ksh 1,000</span>
      </div>
    </div>
  </motion.div>
</motion.div>
        </div>
      </section>

{/* Customer Testimonials Section */}
      <section className="py-20 bg-white text-slate-900 border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-teal-600 font-bold text-xs uppercase tracking-widest bg-teal-100 px-3 py-1 rounded-full border border-teal-200">
              Happy Customers
            </span>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl mt-3 mb-4 text-slate-900">
              What Our Shoppers Say
            </h2>
            <p className="text-slate-600 text-base">
              Read real feedback from customers who upgraded their style with Ashabel Footwear.
            </p>
          </motion.div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-slate-50 p-8 rounded-3xl border border-slate-200 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-amber-500" />))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                  "The delivery was super fast, and the quality of the athletic sneakers blew me away. Will definitely order again!"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/80">
                <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-sm border border-teal-200">MK</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Mercy K.</h4>
                  <p className="text-xs text-slate-500">Nairobi, Kenya</p>
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-slate-50 p-8 rounded-3xl border border-slate-200 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-amber-500" />))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                  "Ordering through WhatsApp was so easy and smooth. The shoes look even better in person. Top notch!"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/80">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-sm border border-amber-200">BO</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Brian O.</h4>
                  <p className="text-xs text-slate-500">Mombasa, Kenya</p>
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-slate-50 p-8 rounded-3xl border border-slate-200 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-amber-500" />))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                  "Great prices and comfortable fit. Finding size 42 that fits perfectly online is rare, but Ashabel nailed it."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/80">
                <div className="w-10 h-10 rounded-full bg-cyan-100 text-cyan-700 font-bold flex items-center justify-center text-sm border border-cyan-200">CW</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Cynthia W.</h4>
                  <p className="text-xs text-slate-500">Nakuru, Kenya</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Shop Section / Catalog */}
{/* Product Catalog Section */}
      <section id="shop" className="py-24 bg-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6 pb-8 border-b border-slate-100"
          >
            <div>
              <span className="text-teal-600 font-bold text-xs uppercase tracking-widest bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100 shadow-xs">
                Our Collection
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
                Featured Footwear
              </h2>
            </div>
            
            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-xs ${
                    selectedCategory === category
                      ? "bg-slate-900 text-white shadow-md scale-105"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Cards Grid with Pop-in Motion */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 justify-items-center">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ 
                  duration: 0.4, 
                  delay: (index % 4) * 0.1 // Stagger effect per row item
                }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group w-full max-w-xs"
              >
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.badge && (
                    <span className="absolute top-3.5 left-3.5 bg-amber-400 text-slate-950 font-black text-[11px] px-2.5 py-1 rounded-lg shadow-sm">
                      {product.badge}
                    </span>
                  )}
                  <span className="absolute top-3.5 right-3.5 bg-slate-900/85 backdrop-blur-md text-white font-bold text-[11px] px-2.5 py-1 rounded-lg">
                    {product.size}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <span className="text-[11px] font-bold text-teal-600 uppercase tracking-wider mb-1.5">{product.category}</span>
                  <h3 className="font-bold text-slate-900 text-sm mb-4 line-clamp-1 group-hover:text-teal-600 transition-colors">{product.name}</h3>
                  <div className="mt-auto flex items-center justify-between pt-3.5 border-t border-slate-100">
                    <div>
                      <div className="text-[11px] text-slate-400 line-through font-medium">Ksh {product.originalPrice.toLocaleString()}</div>
                      <div className="text-base font-black text-slate-900">Ksh {product.price.toLocaleString()}</div>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-slate-900 hover:bg-teal-600 text-white p-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 text-xs font-bold group/btn"
                    >
                      <ShoppingBag className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

{/* Two-Column Service / Pillar Section */}
<section className="py-20 bg-slate-950 px-4 sm:px-6 lg:px-8 overflow-hidden">
  <div className="max-w-7xl mx-auto">
    
    {/* Section Header */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-3xl mx-auto mb-16"
    >
      <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
        Two Ways We Deliver <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-amber-300">Ultimate Comfort.</span>
      </h2>
      
      {/* Contained Marquee Bar */}
      <div className="mt-6 max-w-xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl py-3 px-4 relative overflow-hidden shadow-inner">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
        
        <div className="flex overflow-hidden whitespace-nowrap">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 12,
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex gap-8 items-center text-sm font-medium text-slate-300"
          >
            <span>Explore our curated store catalog or connect with us for custom requests and wholesale inquiries.</span>
            <span className="text-teal-400">•</span>
            <span>Fast countrywide delivery across Kenya</span>
            <span className="text-teal-400">•</span>
            <span>Explore our curated store catalog or connect with us for custom requests and wholesale inquiries.</span>
            <span className="text-teal-400">•</span>
            <span>Fast countrywide delivery across Kenya</span>
            <span className="text-teal-400">•</span>
          </motion.div>
        </div>
      </div>
    </motion.div>

    {/* Dual Cards Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Card 1: Catalog & Retail */}
      <motion.div 
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between hover:border-teal-500/40 transition-all group shadow-xl"
      >
        <div className="absolute -right-20 -top-20 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3 block">
            Retail & Inventory
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            High-End Footwear & Sneakers
          </h3>
          <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed">
            Helping you step out in style with top-grade comfort kicks, athletic trainers, and casual footwear delivered countrywide.
          </p>

          <div className="space-y-4 mb-10">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
              <div>
                <h4 className="text-white font-semibold text-sm">Top Grade Quality Assured</h4>
                <p className="text-slate-400 text-xs">Durability and comfort built into every pair</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
              <div>
                <h4 className="text-white font-semibold text-sm">Exact Size Matching</h4>
                <p className="text-slate-400 text-xs">Precise sizing guidance for a flawless fit</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
              <div>
                <h4 className="text-white font-semibold text-sm">Express Countrywide Delivery</h4>
                <p className="text-slate-400 text-xs">Fast and reliable shipping right to your doorstep</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
              <div>
                <h4 className="text-white font-semibold text-sm">Instant WhatsApp Ordering</h4>
                <p className="text-slate-400 text-xs">Seamless checkout straight to our team</p>
              </div>
            </div>
          </div>
        </div>

        <a 
          href="#shop" 
          className="w-full bg-amber-500 hover:bg-amber-300 text-slate-950 font-extrabold py-4 rounded-2xl transition-all text-center block shadow-lg tracking-wide"
        >
          EXPLORE CATALOG
        </a>
      </motion.div>

      {/* Card 2: Custom Orders & Support */}
      <motion.div 
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between hover:border-amber-500/40 transition-all group shadow-xl"
      >
        <div className="absolute -right-20 -top-20 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-3 block">
            Custom Orders & Support
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Special Requests & Inquiries
          </h3>
          <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed">
            Looking for a specific brand colorway, bulk purchases, or personalized styling advice? We've got you covered.
          </p>

          <div className="space-y-4 mb-10">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
              <div>
                <h4 className="text-white font-semibold text-sm">Special Stock Requests</h4>
                <p className="text-slate-400 text-xs">Source rare or specific sneaker models on demand</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
              <div>
                <h4 className="text-white font-semibold text-sm">Wholesale & Partner Deals</h4>
                <p className="text-slate-400 text-xs">Special pricing for group or reseller orders</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
              <div>
                <h4 className="text-white font-semibold text-sm">Dedicated Fit Consultation</h4>
                <p className="text-slate-400 text-xs">Talk directly with our support team for sizing help</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
              <div>
                <h4 className="text-white font-semibold text-sm">Hassle-Free Exchanges</h4>
                <p className="text-slate-400 text-xs">Easy support if you ever need a different size</p>
              </div>
            </div>
          </div>
        </div>

        <a 
          href="https://wa.me/254722489487?text=Hello%20Ashabel%20Footwear!%20I%20have%20a%20special%20inquiry." 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full bg-amber-500 hover:bg-amber-300 text-slate-950 font-extrabold py-4 rounded-2xl transition-all text-center block shadow-lg tracking-wide"
        >
          CONTACT US ON WHATSAPP
        </a>
      </motion.div>

    </div>
  </div>
</section>



      {/* Footer */}
      <footer id="footer" className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 bg-slate-900 p-2.5 rounded-2xl w-fit border border-slate-800 shadow-inner">
              <img 
                src="/image/logo.png.png" 
                alt="Ashabel Logo" 
                className="h-15 w-auto object-contain" 
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your premier destination for high-end sneakers and footwear. Step in confidence every day.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-base mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#shop" className="hover:text-teal-400 transition-colors">Catalog</a></li>
              <li><a href="#shop" className="hover:text-teal-400 transition-colors">Sport Shoes</a></li>
              <li><a href="#shop" className="hover:text-teal-400 transition-colors">Casual Sneakers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-base mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><span className="hover:text-teal-400 transition-colors cursor-pointer">Express Delivery</span></li>
              <li><span className="hover:text-teal-400 transition-colors cursor-pointer">Size Guide</span></li>
              <li><span className="hover:text-teal-400 transition-colors cursor-pointer">Support</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-base mb-4">Stay Updated</h4>
            <p className="text-xs text-slate-400 mb-4">Get notified when new sneaker drops arrive.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Enter your email" className="bg-slate-900 border border-slate-800 text-white px-4 py-2.5 rounded-xl text-sm outline-none focus:border-teal-500 w-full" />
              <button className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors shadow-md">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Ashabel Footwear. All rights reserved.
        </div>
      </footer>



      {/* Cart Drawer / Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
              >
                <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-teal-600" />
                    <h3 className="font-black text-lg text-slate-900">Your Cart ({totalItems})</h3>
                  </div>
                  <button onClick={() => setIsCartOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-20 text-slate-400">
                      <ShoppingBag className="w-16 h-16 mx-auto mb-4 stroke-1 text-slate-300" />
                      <p className="font-bold text-base text-slate-700">Your cart is empty</p>
                      <p className="text-sm">Add some amazing kicks to get started!</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                        <div className="flex-1">
                          <h4 className="font-bold text-sm text-slate-800 line-clamp-1">{item.name}</h4>
                          <p className="text-xs text-teal-600 font-bold my-1">Ksh {item.price.toLocaleString()}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                              <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-slate-600 hover:text-teal-600"><Minus className="w-3.5 h-3.5" /></button>
                              <span className="px-2 text-xs font-bold">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-slate-600 hover:text-teal-600"><Plus className="w-3.5 h-3.5" /></button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-rose-500 p-1"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-6 border-t border-slate-200 bg-slate-50">
                    <div className="flex justify-between mb-4">
                      <span className="font-medium text-slate-600">Subtotal</span>
                      <span className="font-black text-lg text-slate-900">Ksh {totalPrice.toLocaleString()}</span>
                    </div>
                    <button 
                      onClick={handleWhatsAppCheckout}
                      className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-teal-600/30 text-center block flex items-center justify-center gap-2"
                    >
                      Proceed to Checkout via WhatsApp
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
  </div>
  );
}
