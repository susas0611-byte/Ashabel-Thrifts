"use client";
import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit, Package, Upload } from "lucide-react";

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

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", size: "", category: "Sport Shoes", image: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    // Forces storage update to version 2 so all 8 products appear
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

  const saveProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem("ashabel_products", JSON.stringify(updatedProducts));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle Image File Upload from device / phone gallery
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.size) return;

    if (isEditing) {
      const updated = products.map((p) => (p.id === editId ? { ...p, ...form } : p));
      saveProducts(updated);
      setIsEditing(false);
      setEditId(null);
    } else {
      const newProduct = { 
        id: Date.now(), 
        ...form, 
        image: form.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
        originalPrice: Number(form.price.replace(/,/g, "")) * 2 || 2000 
      };
      saveProducts([newProduct, ...products]);
    }

    setForm({ name: "", price: "", size: "", category: "Sport Shoes", image: "" });
  };

  const handleEdit = (product) => {
    setForm(product);
    setIsEditing(true);
    setEditId(product.id);
  };

  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-teal-500/10 text-teal-400 border border-teal-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase mb-2">
              Admin Control Panel
            </div>
            <h1 className="text-3xl font-black tracking-tight">Product Inventory Management</h1>
            <p className="text-slate-400 text-sm mt-1">Upload images, add, update, or remove shoes from your store catalog instantly.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 bg-slate-950 p-6 rounded-3xl border border-slate-800 h-fit">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-teal-400" />
              {isEditing ? "Edit Product" : "Add New Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Product Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange}
                  placeholder="e.g. Nike Air Force 1"
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Price (Ksh)</label>
                  <input 
                    type="text" 
                    name="price" 
                    value={form.price} 
                    onChange={handleChange}
                    placeholder="1500"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Size</label>
                  <input 
                    type="text" 
                    name="size" 
                    value={form.size} 
                    onChange={handleChange}
                    placeholder="Size 41"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Category</label>
                <select 
                  name="category" 
                  value={form.category} 
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="Sport Shoes">Sport Shoes</option>
                  <option value="Casual Shoes">Casual Shoes</option>
                  <option value="Women's Sneakers">Women's Sneakers</option>
                </select>
              </div>

              {/* Image Upload Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Product Image</label>
                <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3">
                  <label className="cursor-pointer bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5" /> Choose File
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                  <span className="text-xs text-slate-400 truncate">
                    {form.image ? "Image loaded successfully" : "No file chosen"}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-teal-500/20 text-sm flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  {isEditing ? "Save Changes" : "Publish Product"}
                </button>
                {isEditing && (
                  <button 
                    type="button"
                    onClick={() => { setIsEditing(false); setForm({ name: "", price: "", size: "", category: "Sport Shoes", image: "" }); }}
                    className="w-full mt-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2 px-4 rounded-xl text-xs transition-colors"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="lg:col-span-8 bg-slate-950 p-6 rounded-3xl border border-slate-800">
            <h2 className="text-xl font-bold mb-4 flex items-center justify-between">
              <span>Current Catalog ({products.length})</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase">
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-4 px-4 font-bold text-white flex items-center gap-3">
                        <img src={product.image} alt="" className="w-10 h-10 rounded-xl object-cover bg-slate-800" />
                        <span className="line-clamp-1">{product.name}</span>
                      </td>
                      <td className="py-4 px-4 text-slate-400">{product.category}</td>
                      <td className="py-4 px-4 text-slate-300">{product.size}</td>
                      <td className="py-4 px-4 text-teal-400 font-semibold">Ksh {product.price}</td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button 
                          onClick={() => handleEdit(product)}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-teal-400 rounded-lg transition-colors inline-flex items-center justify-center"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors inline-flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-8 text-slate-500">No products found. Add one using the form.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}