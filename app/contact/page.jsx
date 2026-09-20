"use client";
import React, { useState } from "react";
import { MessageCircle, Phone, MapPin, Sparkles, Clock, ChevronDown, ChevronUp } from "lucide-react";

const FAQ_ITEMS = [
  {
    id: 1,
    question: "What is Ashabel Footwear?",
    answer: "We specialize in premium, hand-curated thrift sneakers, street kicks, and performance runners. Every pair is meticulously inspected to ensure top-tier quality, comfort, and unmatched value."
  },
  {
    id: 2,
    question: "How do I place an order?",
    answer: "Ordering is quick and seamless! You can chat with us directly on WhatsApp by clicking any of our order buttons, share the shoe photo or size, and we will process your delivery right away."
  },
  {
    id: 3,
    question: "Are these shoes brand new or thrift?",
    answer: "Our catalog features carefully curated thrift and selected footwear gems. Many pairs are in pristine or brand new condition, and each item undergoes strict quality checks before listing."
  },
  {
    id: 4,
    question: "Do you offer countrywide delivery?",
    answer: "Yes, we offer fast and reliable shipping countrywide right to your doorstep. Delivery times and rates vary depending on your specific location."
  },
  {
    id: 5,
    question: "How do I check available sizes?",
    answer: "Each product card lists its specific size (e.g., Size 38, Size 39, Size 42). You can also use the search bar on our shop page to quickly find your exact shoe size."
  },
  {
    id: 6,
    question: "What are your business hours?",
    answer: "We are available online from Monday through Saturday, 8:00 AM to 8:00 PM. WhatsApp inquiries outside these hours will be answered promptly the next business morning."
  }
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(1);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    // Restored bg-slate-50 for the page background while keeping flex column layout to pin footer
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      
      <div>
        {/* Modern Header Banner */}
        <div className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:20px_20px]"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-teal-500/10 text-teal-400 border border-teal-500/20 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" /> We Are Here For You
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Get in Touch With Us</h1>
            <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-lg mx-auto">
              Have questions about sizing, shoe availability, or countrywide deliveries? Reach out to us instantly.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          
          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            
            {/* WhatsApp Direct Card */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">WhatsApp Orders</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  The fastest way to place your footwear orders or inquire about a specific size is through our direct WhatsApp business channel.
                </p>
              </div>
              
              <a 
                href="https://wa.me/+254722489487" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl transition-colors shadow-lg shadow-emerald-600/20 text-sm"
              >
                Chat on WhatsApp Now
              </a>
            </div>

            {/* General Information Card */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6">
                  <Phone className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Direct Contact & Info</h3>
                
                <div className="space-y-4 text-sm text-slate-600 my-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-slate-800">+254 722 489 487</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-slate-800">Countrywide Express Delivery</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-slate-800">Mon - Sat: 8:00 AM - 8:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs font-medium text-slate-400">
                Ashabel Footwear • All rights reserved.
              </div>
            </div>

          </div>

          {/* FAQ Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            
            {/* Left Title Column */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider bg-teal-50 px-3.5 py-1.5 rounded-full">
                FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Questions? <br />
                <span className="text-teal-600">Let's Make It Clear.</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Still got more questions? No worries. Drop us a quick support line on WhatsApp and we will get right back to you.
              </p>
              <div>
                <a 
                  href="https://wa.me/+254722489487" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-7 py-3.5 rounded-2xl shadow-md transition-all text-sm"
                >
                  CONTACT SUPPORT
                </a>
              </div>
            </div>

            {/* Right Accordion Column */}
            <div className="lg:col-span-7 space-y-4">
              {FAQ_ITEMS.map((item) => {
                const isOpen = openFaq === item.id;
                return (
                  <div 
                    key={item.id} 
                    className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen ? "border-teal-500 shadow-md ring-1 ring-teal-500/20" : "border-slate-200 hover:border-slate-300 shadow-sm"
                    }`}
                  >
                    <button 
                      onClick={() => toggleFaq(item.id)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-base"
                    >
                      <span>{item.id}. {item.question}</span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? "bg-teal-50 text-teal-600" : "bg-slate-100 text-slate-500"
                      }`}>
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-0 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 mt-2 pt-4">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>

      {/* Dark Footer Bar locked at the very bottom */}
      <footer className="bg-slate-950 text-slate-400 py-6 px-4 border-t border-slate-800/80 text-center text-xs tracking-wide w-full">
        <div className="max-w-7xl mx-auto">
          © 2026 Ashabel Footwear. All rights reserved.
        </div>
      </footer>

    </div>
  );
}