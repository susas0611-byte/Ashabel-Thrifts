"use client";
import React, { useState } from "react";
import { Plus, Trash2, Edit, Package, DollarSign, Tag, Image as ImageIcon } from "lucide-react";

export default function AdminPage() {
  // Sample initial product list (in a real app, this would connect to your database/backend)
  const [products, setProducts] = useState([
    { id: 1, name: "Air Jordan Retro High", price: "4,500", size: "42", category: "Sneakers", stock: "In Stock" },
    { id: 2, name: "Nike Air Max Runner", price: "3,800", size: "40", category: "Runners", stock: "In Stock" },
  ]);

  const [form, setForm] = useState({ name: "", price: "", size: "", category: "Sneakers", stock: "In Stock" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update Product
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.size) return;

    if (isEditing) {
      setProducts(products.map((p) => (p.id === editId ? { ...p, ...form } : p)));
      setIsEditing(false);
      setEditId(null);
    } else {
      const newProduct = { id: Date.now(), ...form };
      setProducts([newProduct, ...products]);
    }

    setForm({ name: "", price: "", size: "", category: "Sneakers", stock: "In Stock" });
  };

  // Edit Product
  const handleEdit = (product) => {
    setForm(product);
    setIsEditing(true);
    setEditId(product.id);
  };

  // Delete Product
  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-teal-500/10 text-teal-400 border border-teal-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase mb-2">
              Admin Control Panel
            </div>
            <h1 className="text-3xl font-black tracking-tight">Product Inventory Management</h1>
            <p className="text-slate-400 text-sm mt-1">Add, update, or remove shoes from your store catalog instantly.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Add / Edit Product Form */}
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
                    placeholder="4,500"
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
                  <option value="Sneakers">Sneakers</option>
                  <option value="Runners">Runners</option>
                  <option value="Street Kicks">Street Kicks</option>
                  <option value="Performance">Performance</option>
                </select>
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
                    onClick={() => { setIsEditing(false); setForm({ name: "", price: "", size: "", category: "Sneakers", stock: "In Stock" }); }}
                    className="w-full mt-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2 px-4 rounded-xl text-xs transition-colors"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Column: Product Table / List */}
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
                      <td className="py-4 px-4 font-bold text-white">{product.name}</td>
                      <td className="py-4 px-4 text-slate-400">{product.category}</td>
                      <td className="py-4 px-4 text-slate-300">{product.size}</td>
                      <td className="py-4 px-4 text-teal-400 font-semibold">Ksh {product.price}</td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button 
                          onClick={() => handleEdit(product)}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-teal-400 rounded-lg transition-colors inline-flex items-center justify-center"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors inline-flex items-center justify-center"
                          title="Delete"
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