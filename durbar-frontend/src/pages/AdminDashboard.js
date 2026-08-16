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
  FaThLarge,
  FaUsers,
  FaBars,
  FaSignOutAlt
} from 'react-icons/fa';
import AdminSidebar from '../components/AdminSidebar';
import { API_BASE_URL } from '../utils/api';
import ConfirmModal from '../components/ConfirmModal';

const AdminDashboard = () => {
  const [statistics, setStatistics] = useState({
    totalProducts: 0,
    featuredProducts: 0,
    inStockProducts: 0,
    outOfStockProducts: 0,
    totalTestimonials: 0,
    featuredTestimonials: 0,
    activeTestimonials: 0,
    totalTeamMembers: 0,
    activeTeamMembers: 0
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, productId: null });
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/dashboard`, {
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
    setDeleteModal({ isOpen: true, productId });
  };

  const confirmDeleteProduct = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/products/${deleteModal.productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchDashboardData();
        setDeleteModal({ isOpen: false, productId: null });
      } else {
        setError('Failed to delete product');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const StatCard = ({ icon, title, value, color }) => (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-xs sm:text-sm font-medium mb-1">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${color} shadow-md ml-2 sm:ml-4`}>
          <div className="text-white text-lg sm:text-xl">
            {icon}
          </div>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-medical-50 flex">
      <AdminSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className="flex-1 min-w-0 transition-all duration-300">
        <header className="bg-white shadow-lg border-b border-gray-200 lg:hidden sticky top-0 z-30">
          <div className="container mx-auto px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <FaBars className="text-gray-600 text-xl" />
              </button>
              <h1 className="text-lg sm:text-xl font-bold text-blue-600">Admin Dashboard</h1>
              <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-red-50 transition-colors">
                <FaSignOutAlt className="text-red-500" />
              </button>
            </div>
          </div>
        </header>

        <header className="bg-white shadow-lg border-b border-gray-200 hidden lg:block">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-3 sm:px-4 py-2 sm:py-3 rounded-xl mb-4 sm:mb-6 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
            <StatCard icon={<FaBox />} title="Total Products" value={statistics.totalProducts} color="bg-blue-500" />
            <StatCard icon={<FaStar />} title="Featured Products" value={statistics.featuredProducts} color="bg-amber-500" />
            <StatCard icon={<FaCheckCircle />} title="In Stock" value={statistics.inStockProducts} color="bg-green-500" />
            <StatCard icon={<FaTimesCircle />} title="Out of Stock" value={statistics.outOfStockProducts} color="bg-red-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
            <StatCard icon={<FaUsers />} title="Total Testimonials" value={statistics.totalTestimonials || 0} color="bg-purple-500" />
            <StatCard icon={<FaStar />} title="Featured Testimonials" value={statistics.featuredTestimonials || 0} color="bg-pink-500" />
            <StatCard icon={<FaCheckCircle />} title="Active Testimonials" value={statistics.activeTestimonials || 0} color="bg-teal-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
            <StatCard icon={<FaUsers />} title="Total Team Members" value={statistics.totalTeamMembers || 0} color="bg-indigo-500" />
            <StatCard icon={<FaCheckCircle />} title="Active Team Members" value={statistics.activeTeamMembers || 0} color="bg-cyan-500" />
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 lg:mb-8 border border-gray-100">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              <button onClick={() => navigate('/admin/products')} className="flex items-center justify-center bg-blue-500 text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-xl hover:bg-blue-600 transition-colors font-semibold text-xs sm:text-sm">
                <FaBox className="mr-1 sm:mr-2 text-sm sm:text-base" />
                <span className="hidden sm:inline">Manage Products</span>
                <span className="sm:hidden">Products</span>
              </button>
              <button onClick={() => navigate('/admin/products/add')} className="flex items-center justify-center bg-green-500 text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-xl hover:bg-green-600 transition-colors font-semibold text-xs sm:text-sm">
                <FaPlus className="mr-1 sm:mr-2 text-sm sm:text-base" />
                <span className="hidden sm:inline">Add Product</span>
                <span className="sm:hidden">Add</span>
              </button>
              <button onClick={() => navigate('/admin/testimonials')} className="flex items-center justify-center bg-purple-500 text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-xl hover:bg-purple-600 transition-colors font-semibold text-xs sm:text-sm">
                <FaStar className="mr-1 sm:mr-2 text-sm sm:text-base" />
                <span className="hidden sm:inline">Manage Testimonials</span>
                <span className="sm:hidden">Testimonials</span>
              </button>
              <button onClick={() => navigate('/admin/testimonials/add')} className="flex items-center justify-center bg-pink-500 text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-xl hover:bg-pink-600 transition-colors font-semibold text-xs sm:text-sm">
                <FaPlus className="mr-1 sm:mr-2 text-sm sm:text-base" />
                <span className="hidden sm:inline">Add Testimonial</span>
                <span className="sm:hidden">Add</span>
              </button>
              <button onClick={() => navigate('/admin/offer-items')} className="flex items-center justify-center bg-teal-500 text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-xl hover:bg-teal-600 transition-colors font-semibold text-xs sm:text-sm">
                <FaThLarge className="mr-1 sm:mr-2 text-sm sm:text-base" />
                <span className="hidden sm:inline">Manage Offer Items</span>
                <span className="sm:hidden">Offers</span>
              </button>
              <button onClick={() => navigate('/admin/offer-items/add')} className="flex items-center justify-center bg-indigo-500 text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-xl hover:bg-indigo-600 transition-colors font-semibold text-xs sm:text-sm">
                <FaPlus className="mr-1 sm:mr-2 text-sm sm:text-base" />
                <span className="hidden sm:inline">Add Offer Item</span>
                <span className="sm:hidden">Add</span>
              </button>
              <button onClick={() => navigate('/admin/team-members')} className="flex items-center justify-center bg-cyan-500 text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-xl hover:bg-cyan-600 transition-colors font-semibold text-xs sm:text-sm">
                <FaUsers className="mr-1 sm:mr-2 text-sm sm:text-base" />
                <span className="hidden sm:inline">Manage Team</span>
                <span className="sm:hidden">Team</span>
              </button>
              <button onClick={() => navigate('/admin/team-members/add')} className="flex items-center justify-center bg-orange-500 text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-xl hover:bg-orange-600 transition-colors font-semibold text-xs sm:text-sm">
                <FaPlus className="mr-1 sm:mr-2 text-sm sm:text-base" />
                <span className="hidden sm:inline">Add Team Member</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Products</h2>
              <button onClick={() => navigate('/admin/products')} className="text-medical-600 hover:text-medical-700 font-medium text-xs sm:text-sm flex items-center self-start sm:self-auto">
                View All <FaArrowLeft className="ml-1 sm:ml-2 transform rotate-180" />
              </button>
            </div>
            {recentProducts.length === 0 ? (
              <div className="text-center py-8 sm:py-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
                    <FaBox className="text-blue-600 text-xl sm:text-2xl" />
                  </div>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">No products yet</p>
                  <button onClick={() => navigate('/admin/products/add')} className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-semibold text-sm sm:text-base">
                    <FaPlus className="mr-2" />
                    Add Your First Product
                  </button>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-3 sm:mx-0">
                <div className="px-3 sm:px-0">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-blue-50 border-b-2 border-gray-200">
                        <th className="text-left py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-bold text-gray-700">Product</th>
                        <th className="text-left py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-bold text-gray-700">Category</th>
                        <th className="text-left py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-bold text-gray-700">Price</th>
                        <th className="text-left py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-bold text-gray-700">Status</th>
                        <th className="text-left py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-bold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentProducts.map((product) => (
                        <tr key={product._id} className="border-b border-gray-100 hover:bg-gradient-to-r from-blue-50 to-transparent transition-colors">
                          <td className="py-3 sm:py-4 px-2 sm:px-4">
                            <div className="flex items-center">
                              <div className="relative flex-shrink-0">
                                <img src={product.image.startsWith('http') ? product.image : `${API_BASE_URL}${product.image}`} alt={product.name} className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl object-cover mr-2 sm:mr-4 shadow-md" />
                                {product.featured && (
                                  <div className="absolute -top-1 -right-1 bg-amber-400 text-white rounded-full p-0.5 sm:p-1 shadow-md">
                                    <FaStar className="text-[10px] sm:text-xs" />
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-gray-900 text-xs sm:text-sm truncate">{product.name}</p>
                                <p className="text-[10px] sm:text-xs text-gray-500 truncate max-w-[100px] sm:max-w-xs">{product.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 sm:py-4 px-2 sm:px-4">
                            <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] sm:text-xs font-medium">{product.category}</span>
                          </td>
                          <td className="py-3 sm:py-4 px-2 sm:px-4">
                            <span className="font-bold text-gray-900 text-xs sm:text-sm">Rs: {product.price.toLocaleString()}</span>
                          </td>
                          <td className="py-3 sm:py-4 px-2 sm:px-4">
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                          <td className="py-3 sm:py-4 px-2 sm:px-4">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <button onClick={() => navigate(`/admin/products/edit/${product._id}`)} className="p-1.5 sm:p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="Edit">
                                <FaEdit className="text-xs sm:text-sm" />
                              </button>
                              <button onClick={() => handleDeleteProduct(product._id)} className="p-1.5 sm:p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors" title="Delete">
                                <FaTrash className="text-xs sm:text-sm" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <ConfirmModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, productId: null })}
          onConfirm={confirmDeleteProduct}
          title="Delete Product"
          message="Are you sure you want to delete this product? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;