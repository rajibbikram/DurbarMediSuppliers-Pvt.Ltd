import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaBox, 
  FaStar, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaPlus, 
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaEye,
  FaChartLine,
  FaThLarge,
  FaUsers,
  FaBars,
  FaSignOutAlt
} from 'react-icons/fa';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboard = () => {
  const [statistics, setStatistics] = useState({
    totalProducts: 0,
    featuredProducts: 0,
    inStockProducts: 0,
    outOfStockProducts: 0,
    totalTestimonials: 0,
    featuredTestimonials: 0,
    activeTestimonials: 0
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStatistics(data.statistics);
        setRecentProducts(data.recentProducts);
      } else {
        setError('Failed to fetch dashboard data');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
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

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchDashboardData(); // Refresh data
      } else {
        setError('Failed to delete product');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const StatCard = ({ icon, title, value, color }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-4 rounded-2xl ${color} shadow-md`}>
          {icon}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-medical-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-medical-50 flex">
      <AdminSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-72">
        {/* Mobile Header */}
        <header className="bg-white shadow-lg border-b border-gray-200 lg:hidden">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaBars className="text-gray-600 text-xl" />
              </button>
              <h1 className="text-xl font-bold text-blue-600">Admin Dashboard</h1>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                <FaSignOutAlt className="text-red-500" />
              </button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<FaBox className="text-white text-xl" />}
            title="Total Products"
            value={statistics.totalProducts}
            color="bg-blue-500"
          />
          <StatCard
            icon={<FaStar className="text-white text-xl" />}
            title="Featured Products"
            value={statistics.featuredProducts}
            color="bg-amber-500"
          />
          <StatCard
            icon={<FaCheckCircle className="text-white text-xl" />}
            title="In Stock"
            value={statistics.inStockProducts}
            color="bg-green-500"
          />
          <StatCard
            icon={<FaTimesCircle className="text-white text-xl" />}
            title="Out of Stock"
            value={statistics.outOfStockProducts}
            color="bg-red-500"
          />
        </div>

        {/* Testimonial Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<FaUsers className="text-white text-xl" />}
            title="Total Testimonials"
            value={statistics.totalTestimonials || 0}
            color="bg-purple-500"
          />
          <StatCard
            icon={<FaStar className="text-white text-xl" />}
            title="Featured Testimonials"
            value={statistics.featuredTestimonials || 0}
            color="bg-pink-500"
          />
          <StatCard
            icon={<FaCheckCircle className="text-white text-xl" />}
            title="Active Testimonials"
            value={statistics.activeTestimonials || 0}
            color="bg-teal-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/admin/products')}
              className="flex items-center justify-center bg-blue-500 text-white px-6 py-4 rounded-xl hover:bg-blue-600 transition-colors font-semibold"
            >
              <FaBox className="mr-2" />
              Manage Products
            </button>
            <button
              onClick={() => navigate('/admin/products/add')}
              className="flex items-center justify-center bg-green-500 text-white px-6 py-4 rounded-xl hover:bg-green-600 transition-colors font-semibold"
            >
              <FaPlus className="mr-2" />
              Add Product
            </button>
            <button
              onClick={() => navigate('/admin/testimonials')}
              className="flex items-center justify-center bg-purple-500 text-white px-6 py-4 rounded-xl hover:bg-purple-600 transition-colors font-semibold"
            >
              <FaStar className="mr-2" />
              Manage Testimonials
            </button>
            <button
              onClick={() => navigate('/admin/testimonials/add')}
              className="flex items-center justify-center bg-pink-500 text-white px-6 py-4 rounded-xl hover:bg-pink-600 transition-colors font-semibold"
            >
              <FaPlus className="mr-2" />
              Add Testimonial
            </button>
            <button
              onClick={() => navigate('/admin/offer-items')}
              className="flex items-center justify-center bg-teal-500 text-white px-6 py-4 rounded-xl hover:bg-teal-600 transition-colors font-semibold"
            >
              <FaThLarge className="mr-2" />
              Manage Offer Items
            </button>
            <button
              onClick={() => navigate('/admin/offer-items/add')}
              className="flex items-center justify-center bg-indigo-500 text-white px-6 py-4 rounded-xl hover:bg-indigo-600 transition-colors font-semibold"
            >
              <FaPlus className="mr-2" />
              Add Offer Item
            </button>
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Products</h2>
            <button
              onClick={() => navigate('/admin/products')}
              className="text-medical-600 hover:text-medical-700 font-medium text-sm flex items-center"
            >
              View All <FaArrowLeft className="ml-2 transform rotate-180" />
            </button>
          </div>
          {recentProducts.length === 0 ? (
            <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <FaBox className="text-blue-600 text-2xl" />
                </div>
                <p className="text-gray-600 mb-4">No products yet</p>
                <button
                  onClick={() => navigate('/admin/products/add')}
                  className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-semibold"
                >
                  <FaPlus className="mr-2" />
                  Add Your First Product
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-blue-50 border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Product</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Category</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Price</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Status</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProducts.map((product) => (
                    <tr key={product._id} className="border-b border-gray-100 hover:bg-gradient-to-r from-blue-50 to-transparent transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="relative">
                            <img
                              src={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`}
                              alt={product.name}
                              className="w-14 h-14 rounded-xl object-cover mr-4 shadow-md"
                            />
                            {product.featured && (
                              <div className="absolute -top-1 -right-1 bg-amber-400 text-white rounded-full p-1 shadow-md">
                                <FaStar className="text-xs" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{product.name}</p>
                            <p className="text-xs text-gray-500 truncate max-w-xs">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-bold text-gray-900">Rs: {product.price.toLocaleString()}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          product.inStock 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                            className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete"
                          >
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
      </div>
    </div>
  );
};

export default AdminDashboard;
