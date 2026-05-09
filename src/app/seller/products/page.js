'use client';
import { useState } from 'react';

const INITIAL_INVENTORY = [
  { id: 1, title: 'oppo', subtitle: 'oppo phone..', price: 300, stock: 3, category: '69ee96ea90a8dad66c99a033', image: '/images/electronics.png' },
  { id: 2, title: 'book1', subtitle: 'book2..', price: 200, stock: 3, category: '69f5189806652c2d723c30bf', image: '/images/home.png' },
  { id: 3, title: 'lipstick', subtitle: 'red lipstick..', price: 300, stock: 4, category: '69f50de606652c2d723c30bd', image: '/images/beauty.png' },
  { id: 4, title: 'soute', subtitle: 'Flagship smartphone..', price: 999, stock: 20, category: '69f5257706652c2d723c30c6', image: '/images/electronics.png' },
];

export default function SellerProducts() {
  const [products, setProducts] = useState(INITIAL_INVENTORY);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', price: '', stock: '', category: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    if (editingProductId !== null) {
      // Update existing product
      setProducts(products.map(p => {
        if (p.id === editingProductId) {
          return {
            ...p,
            title: formData.title,
            subtitle: formData.description.substring(0, 20) + '...',
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            category: formData.category,
            image: imagePreview || p.image
          };
        }
        return p;
      }));
    } else {
      // Create new product
      const newProduct = {
        id: Date.now(),
        title: formData.title,
        subtitle: formData.description.substring(0, 20) + '...',
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category || 'New Category',
        image: imagePreview || '/images/electronics.png'
      };
      setProducts([newProduct, ...products]);
    }
    setFormData({ title: '', description: '', price: '', stock: '', category: '' });
    setImagePreview(null);
    setShowAddForm(false);
    setEditingProductId(null);
  };

  const handleEditClick = (product) => {
    setFormData({
      title: product.title,
      description: product.subtitle,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category
    });
    setImagePreview(product.image);
    setEditingProductId(product.id);
    setShowAddForm(true);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      {!showAddForm ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" /><path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
              </div>
              My Products
            </h2>
            
            <div className="flex flex-1 w-full sm:w-auto items-center gap-3">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input 
                  type="text" 
                  placeholder="Search your products..." 
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl focus:border-gray-400 focus:ring-2 focus:ring-gray-100 focus:outline-none transition-all text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button 
                onClick={() => {
                  setFormData({ title: '', description: '', price: '', stock: '', category: '' });
                  setImagePreview(null);
                  setEditingProductId(null);
                  setShowAddForm(true);
                }}
                className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-sm shrink-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                Add Product
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-bold">
                  <tr>
                    <th className="px-6 py-4 rounded-tl-2xl">Product</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4 rounded-tr-2xl text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products
                    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(product => (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img src={product.image} alt={product.title} className="w-12 h-12 rounded-lg object-cover border border-gray-200 bg-white" />
                        <div>
                          <p className="font-bold text-gray-800">{product.title}</p>
                          <p className="text-xs text-gray-500">{product.subtitle}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-black text-gray-800">${product.price}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${product.stock > 10 ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 font-mono text-xs">{product.category}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => handleEditClick(product)} className="p-2 bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-600 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button onClick={() => setProducts(products.filter(p => p.id !== product.id))} className="p-2 bg-white border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-100 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-500 font-medium">No products listed yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => setShowAddForm(false)} className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-all shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <h2 className="text-2xl font-black text-gray-800">
              {editingProductId ? 'Update Product' : 'Add New Product'}
            </h2>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <form onSubmit={handleSubmitProduct} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Product Name <span className="text-red-500">*</span></label>
                <input required type="text" placeholder="e.g. iPhone 16 Pro" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-gray-400 focus:ring-2 focus:ring-gray-100 focus:outline-none transition-all bg-gray-50 focus:bg-white" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description <span className="text-red-500">*</span></label>
                <textarea required rows="4" placeholder="Describe your product..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-gray-400 focus:ring-2 focus:ring-gray-100 focus:outline-none transition-all bg-gray-50 focus:bg-white resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Price ($) <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-400 font-medium">$</span>
                    <input required type="number" step="0.01" placeholder="0.00" className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-xl focus:border-gray-400 focus:ring-2 focus:ring-gray-100 focus:outline-none transition-all bg-gray-50 focus:bg-white font-medium" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Stock Quantity <span className="text-red-500">*</span></label>
                  <input required type="number" placeholder="0" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-gray-400 focus:ring-2 focus:ring-gray-100 focus:outline-none transition-all bg-gray-50 focus:bg-white font-medium" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category <span className="text-red-500">*</span></label>
                <select required className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-gray-400 focus:ring-2 focus:ring-gray-100 focus:outline-none transition-all bg-gray-50 focus:bg-white font-medium text-gray-700" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option value="">Select category...</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Books">Books</option>
                  <option value="Beauty">Beauty</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Product Images <span className="text-red-500">*</span></label>
                <label className="w-full border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group relative overflow-hidden h-48">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" />
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                      <div className="text-gray-600 font-bold mb-1">Click to upload images</div>
                      <p className="text-xs text-gray-400 font-medium">Supports JPG, PNG, WEBP (Max 5MB)</p>
                    </>
                  )}
                </label>
              </div>

              <button type="submit" className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3.5 rounded-xl font-bold text-base transition-all shadow-sm flex items-center justify-center gap-2 mt-8">
                {editingProductId ? 'Update Product' : '+ Create Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
