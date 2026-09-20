"use client";
import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit, Package, Upload, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", price: "", size: "", category: "Sport Shoes", image: "", badge: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch products from Supabase on load
  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*").order("id", { ascending: false });
    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle Image File Upload (converts to Base64 so it stores cleanly in text columns)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.size) return;

    const productData = {
      name: form.name,
      price: form.price,
      originalPrice: Number(form.price.replace(/,/g, "")) * 2 || 2000,
      size: form.size,
      category: form.category,
      image: form.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
      badge: form.badge || "New Drop"
    };

    if (isEditing) {
      const { error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", editId);

      if (error) {
        console.error("Error updating product:", error);
      } else {
        setIsEditing(false);
        setEditId(null);
        fetchProducts();
      }
    } else {
      // Explicitly generate a numeric ID using Date.now() to satisfy the table constraint
      const newProduct = {
        id: Date.now(),
        ...productData
      };

      const { error } = await supabase
        .from("products")
        .insert([newProduct]);

      if (error) {
        console.error("Error inserting product:", error.message, error.details);
      } else {
        fetchProducts();
      }
    }

    setForm({ name: "", price: "", size: "", category: "Sport Shoes", image: "", badge: "" });
  };

  const handleEdit = (product) => {
    setForm(product);
    setIsEditing(true);
    setEditId(product.id);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      console.error("Error deleting product:", error);
    } else {
      fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-teal-500/10 text-teal-400 border border-teal-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase mb-2">
              Cloud Admin Control Panel
            </div>
            <h1 className="text-3xl font-black tracking-tight">Product Inventory Management</h1>
            <p className="text-slate-400 text-sm mt-1">Changes sync instantly across your phone, laptop, and customer screens.</p>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Category</label>
                  <select 
                    name="category" 
                    value={form.category} 
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="Sport Shoes">Sport Shoes</option>
                    <option value="Casual Shoes">Casual Shoes</option>
                    <option value="Women's Sneakers">Women's Sneakers</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Badge Tag</label>
                  <input 
                    type="text" 
                    name="badge" 
                    value={form.badge} 
                    onChange={handleChange}
                    placeholder="Hot Deal"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

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
                  {isEditing ? "Save Changes" : "Publish to Cloud"}
                </button>
                {isEditing && (
                  <button 
                    type="button"
                    onClick={() => { setIsEditing(false); setForm({ name: "", price: "", size: "", category: "Sport Shoes", image: "", badge: "" }); }}
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
              <span>Cloud Catalog ({products.length})</span>
              {loading && <Loader2 className="w-5 h-5 animate-spin text-teal-400" />}
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
                  {!loading && products.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-8 text-slate-500">No products found in the cloud. Add one using the form.</td>
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