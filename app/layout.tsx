"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar"; 
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Listen for shop page adding items or navbar icon opening the cart
  useEffect(() => {
    const handleCartSync = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try { setCart(JSON.parse(savedCart)); } catch (e) { setCart([]); }
      }
      if (localStorage.getItem("shouldOpenCart") === "true") {
        setIsCartOpen(true);
        localStorage.removeItem("shouldOpenCart");
      }
    };

    handleCartSync();
    window.addEventListener("storage", handleCartSync);
    window.addEventListener("cartUpdated", handleCartSync);

    return () => {
      window.removeEventListener("storage", handleCartSync);
      window.removeEventListener("cartUpdated", handleCartSync);
    };
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const updateQuantity = (id: any, delta: number) => {
    const updated = cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeFromCart = (id: any) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleWhatsAppCheckout = () => {
    const message = encodeURIComponent(
      `Hello Ashabel Footwear, I would like to place an order:\n\n` +
      cart.map(item => `- ${item.name} (Qty: ${item.quantity}) - Ksh ${(item.price * item.quantity).toLocaleString()}`).join('\n') +
      `\n\n*Total: Ksh ${totalPrice.toLocaleString()}*`
    );
    
    // Replace with your actual WhatsApp phone number (e.g., 2547XXXXXXXX)
    const phoneNumber = "254700000000"; 
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Navbar /> 
        <main className="flex-1">{children}</main>

        {/* Global Cart Drawer */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={() => setIsCartOpen(false)} />
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
                <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-amber-500" />
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
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                        <div className="flex-1">
                          <h4 className="font-bold text-sm text-slate-800 line-clamp-1">{item.name}</h4>
                          <p className="text-xs text-amber-600 font-bold my-1">Ksh {item.price?.toLocaleString()}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                              <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-slate-600"><Minus className="w-3.5 h-3.5" /></button>
                              <span className="px-2 text-xs font-bold">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-slate-600"><Plus className="w-3.5 h-3.5" /></button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-rose-500 p-1"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-600">Subtotal</span>
                      <span className="font-black text-lg text-slate-900">Ksh {totalPrice.toLocaleString()}</span>
                    </div>

                    {/* Proceed via WhatsApp Button */}
                    <button
                      onClick={handleWhatsAppCheckout}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
                    >
                      <span>Proceed via WhatsApp</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}