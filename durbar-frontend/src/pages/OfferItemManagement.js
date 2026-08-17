import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaBars, FaSignOutAlt } from 'react-icons/fa';
import AdminSidebar from '../components/AdminSidebar';
import ConfirmModal from '../components/ConfirmModal';

const OfferItemManagement = () => {
  const [offerItems, setOfferItems] = useState([]);
  const [filteredOfferItems, setFilteredOfferItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, itemId: null });
  const navigate = useNavigate();

  useEffect(() => {
    fetchOfferItems();
  }, []);

  useEffect(() => {
    filterOfferItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offerItems, searchTerm]);

  const fetchOfferItems = async () => {
    try {
      const response = await fetch('https://durbarmedisuppliers-pvt-ltd.onrender.com/api/offer-items');
      if (response.ok) {
        const data = await response.json();
        setOfferItems(data);
      } else {
        setError('Failed to fetch offer items');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const filterOfferItems = useCallback(() => {
    let filtered = offerItems;
    if (searchTerm) {
      filtered = filtered.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredOfferItems(filtered);
  }, [offerItems, searchTerm]);

  const handleDelete = async (itemId) => {
    setDeleteModal({ isOpen: true, itemId });
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://durbarmedisuppliers-pvt-ltd.onrender.com/api/offer-items/${deleteModal.itemId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchOfferItems();
        setDeleteModal({ isOpen: false, itemId: null });
      } else {
        setError('Failed to delete offer item');
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading offer items...</p>
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
              <h1 className="text-lg sm:text-xl font-bold text-blue-600">Offer Item Management</h1>
              <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-red-50 transition-colors">
                <FaSignOutAlt className="text-red-500" />
              </button>
            </div>
          </div>
        </header>

        <header className="bg-white shadow-lg border-b border-gray-200 hidden lg:block">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Offer Item Management</h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search offer items..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            {filteredOfferItems.length === 0 ? (
              <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-4">
                    <FaSearch className="text-blue-600 text-2xl" />
                  </div>
                  <p className="text-gray-600 mb-4">{searchTerm ? 'No offer items found matching your search' : 'No offer items yet'}</p>
                  {!searchTerm && (
                    <button onClick={() => navigate('/admin/offer-items/add')} className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold">
                      <FaPlus className="mr-2" />
                      Add Your First Offer Item
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-blue-50 border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Name</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Description</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Created</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOfferItems.map((item) => (
                      <tr key={item._id} className="border-b border-gray-100 hover:bg-gradient-to-r from-blue-50 to-transparent transition-colors">
                        <td className="py-4 px-4">
                          <p className="font-semibold text-gray-900">{item.name}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-gray-600 text-sm line-clamp-2 max-w-md">{item.description}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-gray-500 text-sm">{new Date(item.createdAt).toLocaleDateString()}</p>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <button onClick={() => navigate(`/admin/offer-items/edit/${item._id}`)} className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="Edit">
                              <FaEdit />
                            </button>
                            <button onClick={() => handleDelete(item._id)} className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors" title="Delete">
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
        
        <ConfirmModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, itemId: null })}
          onConfirm={confirmDelete}
          title="Delete Offer Item"
          message="Are you sure you want to delete this offer item? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />
      </div>
    </div>
  );
};

export default OfferItemManagement;