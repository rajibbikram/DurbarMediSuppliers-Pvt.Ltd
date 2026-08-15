import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSearch,
  FaFilter,
  FaStar,
  FaToggleOn,
  FaToggleOff
} from 'react-icons/fa';

const TestimonialManagement = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredFilter, setFeaturedFilter] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    filterTestimonials();
  }, [testimonials, searchTerm, featuredFilter, activeFilter]);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/testimonials');
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
      } else {
        setError('Failed to fetch testimonials');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const filterTestimonials = () => {
    let filtered = testimonials;

    if (searchTerm) {
      filtered = filtered.filter(testimonial =>
        testimonial.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.testimonial.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (featuredFilter) {
      filtered = filtered.filter(testimonial => 
        featuredFilter === 'true' ? testimonial.featured : !testimonial.featured
      );
    }

    if (activeFilter) {
      filtered = filtered.filter(testimonial => 
        activeFilter === 'true' ? testimonial.active : !testimonial.active
      );
    }

    setFilteredTestimonials(filtered);
  };

  const handleDelete = async (testimonialId) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/testimonials/${testimonialId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchTestimonials();
      } else {
        setError('Failed to delete testimonial');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const handleToggleFeatured = async (testimonialId, currentFeatured) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/testimonials/${testimonialId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ featured: !currentFeatured })
      });

      if (response.ok) {
        fetchTestimonials();
      } else {
        setError('Failed to update testimonial');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const handleToggleActive = async (testimonialId, currentActive) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/testimonials/${testimonialId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ active: !currentActive })
      });

      if (response.ok) {
        fetchTestimonials();
      } else {
        setError('Failed to update testimonial');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-medical-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="flex items-center text-medical-600 hover:text-medical-700 transition-colors"
              >
                <FaArrowLeft className="mr-2" />
                Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Testimonial Management</h1>
            </div>
            <button
              onClick={() => navigate('/admin/testimonials/add')}
              className="flex items-center bg-gradient-to-r from-medical-600 to-teal-600 text-white px-4 py-2 rounded-xl hover:shadow-glow transition-all duration-300 font-semibold"
            >
              <FaPlus className="mr-2" />
              Add Testimonial
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

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search testimonials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
              />
            </div>
            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={featuredFilter}
                onChange={(e) => setFeaturedFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white appearance-none"
              >
                <option value="">All Featured Status</option>
                <option value="true">Featured</option>
                <option value="false">Not Featured</option>
              </select>
            </div>
            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white appearance-none"
              >
                <option value="">All Active Status</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Testimonials Table */}
        <div className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden">
          {filteredTestimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No testimonials found</p>
              <button
                onClick={() => navigate('/admin/testimonials/add')}
                className="flex items-center bg-gradient-to-r from-medical-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:shadow-glow transition-all duration-300 font-semibold mx-auto"
              >
                <FaPlus className="mr-2" />
                Add Your First Testimonial
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Client</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Company</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Rating</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Featured</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Active</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTestimonials.map((testimonial) => (
                    <tr key={testimonial._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <img
                            src={testimonial.image.startsWith('http') ? testimonial.image : `http://localhost:5000${testimonial.image}`}
                            alt={testimonial.clientName}
                            className="w-12 h-12 rounded-full object-cover mr-4"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{testimonial.clientName}</p>
                            <p className="text-sm text-gray-500 line-clamp-1">{testimonial.testimonial.substring(0, 50)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-medical-100 text-medical-700 rounded-full text-sm font-medium">
                          {testimonial.company}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <FaStar key={i} className="text-yellow-400 text-sm" />
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleToggleFeatured(testimonial._id, testimonial.featured)}
                          className={`p-2 rounded-lg transition-colors ${
                            testimonial.featured 
                              ? 'text-yellow-600 hover:bg-yellow-50' 
                              : 'text-gray-400 hover:bg-gray-50'
                          }`}
                          title={testimonial.featured ? 'Remove from featured' : 'Add to featured'}
                        >
                          {testimonial.featured ? <FaToggleOn /> : <FaToggleOff />}
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleToggleActive(testimonial._id, testimonial.active)}
                          className={`p-2 rounded-lg transition-colors ${
                            testimonial.active 
                              ? 'text-green-600 hover:bg-green-50' 
                              : 'text-gray-400 hover:bg-gray-50'
                          }`}
                          title={testimonial.active ? 'Deactivate' : 'Activate'}
                        >
                          {testimonial.active ? <FaToggleOn /> : <FaToggleOff />}
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => navigate(`/admin/testimonials/edit/${testimonial._id}`)}
                            className="p-2 text-medical-600 hover:bg-medical-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(testimonial._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

        {/* Testimonials Count */}
        <div className="mt-4 text-gray-600 text-sm">
          Showing {filteredTestimonials.length} of {testimonials.length} testimonials
        </div>
      </div>
    </div>
  );
};

export default TestimonialManagement;
