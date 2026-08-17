import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaBars, FaSignOutAlt } from 'react-icons/fa';
import AdminSidebar from '../components/AdminSidebar';
import ConfirmModal from '../components/ConfirmModal';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, productId: null });
  const navigate = useNavigate();

  const categories = ['IV Supplies', 'IV Accessories', 'Respiratory', 'Medical Equipment', 'Surgical Supplies', 'Diagnostic Tools', 'Disposables', 'Pharmaceuticals'];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, searchTerm, categoryFilter]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://durbarmedisuppliers-pvt-ltd.onrender.com/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = useCallback(() => {
    let filtered = products;
    if (searchTerm) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (categoryFilter) {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }
    setFilteredProducts(filtered);
  }, [products, searchTerm, categoryFilter]);

  const handleDelete = async (productId) => {
    setDeleteModal({ isOpen: true, productId });
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://durbarmedisuppliers-pvt-ltd.onrender.com/api/products/${deleteModal.productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchProducts();
        setDeleteModal({ isOpen: false, productId: null });
      } else {
        setError('Failed to delete product');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-medical-50 via-indigo-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-medical-50 flex">
      <AdminSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className="flex-1 min-w-0 transition-all duration-300">
        <header className="bg-white shadow-lg border-b border-gray-200 lg:hidden sticky top-0 z-30">
          <div className="container mx-auto px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <FaBars className="text-gray-600 text-xl" />
              </button>
              <h1 className="text-lg sm:text-xl font-bold text-blue-600">Product Management</h1>
              <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-red-50 transition-colors">
                <FaSignOutAlt className="text-red-500" />
              </button>
            </div>
          </div>
        </header>

        <header className="bg-white shadow-lg border-b border-gray-200 hidden lg:block">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-soft p-6 mb-6 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white" />
              </div>
              <div className="relative">
                <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white appearance-none">
                  <option value="">All Categories</option>
                  {categories.map(category => <option key={category} value={category}>{category}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No products found</p>
                <button onClick={() => navigate('/admin/products/add')} className="flex items-center bg-gradient-to-r from-medical-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:shadow-glow transition-all duration-300 font-semibold mx-auto">
                  <FaPlus className="mr-2" />
                  Add Your First Product
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Product</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Category</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Price</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Featured</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <img src={product.image.startsWith('http') ? product.image : `https://durbarmedisuppliers-pvt-ltd.onrender.com${product.image}`} alt={product.name} className="w-16 h-16 rounded-lg object-cover mr-4" />
                            <div>
                              <p className="font-medium text-gray-900">{product.name}</p>
                              <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-3 py-1 bg-medical-100 text-medical-700 rounded-full text-sm font-medium">{product.category}</span>
                        </td>
                        <td className="py-4 px-6 text-gray-900 font-semibold">Rs: {product.price.toLocaleString()}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          {product.featured ? <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">Featured</span> : <span className="text-gray-400">-</span>}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button onClick={() => navigate(`/admin/products/edit/${product._id}`)} className="p-2 text-medical-600 hover:bg-medical-50 rounded-lg transition-colors" title="Edit">
                              <FaEdit />
                            </button>
                            <button onClick={() => handleDelete(product._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-4 text-gray-600 text-sm">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>
        
        <ConfirmModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, productId: null })}
          onConfirm={confirmDelete}
          title="Delete Product"
          message="Are you sure you want to delete this product? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />
      </div>
    </div>
  );
};

export default ProductManagement;