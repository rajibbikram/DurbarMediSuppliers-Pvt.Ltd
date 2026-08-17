import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaStar, FaUpload, FaTimes, FaBars, FaSignOutAlt } from 'react-icons/fa';
import AdminSidebar from '../components/AdminSidebar';

const TestimonialForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    clientName: '',
    company: '',
    testimonial: '',
    rating: 5,
    image: '',
    featured: false,
    active: true
  });
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetchLoading, setFetchLoading] = useState(isEditing);

  useEffect(() => {
    if (isEditing) {
      fetchTestimonial();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEditing]);

  const fetchTestimonial = useCallback(async () => {
    try {
      const response = await fetch(`https://durbarmedisuppliers-pvt-ltd.onrender.com/api/testimonials/${id}`);
      if (response.ok) {
        const testimonial = await response.json();
        setFormData({
          clientName: testimonial.clientName,
          company: testimonial.company,
          testimonial: testimonial.testimonial,
          rating: testimonial.rating,
          image: testimonial.image,
          featured: testimonial.featured,
          active: testimonial.active
        });
        // Handle preview URL for database images
        setPreviewUrl(testimonial.image.startsWith('http') ? testimonial.image : `https://durbarmedisuppliers-pvt-ltd.onrender.com${testimonial.image}`);
      } else {
        setError('Failed to fetch testimonial');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };



  const handleRemoveImage = () => {
    setFile(null);
    setPreviewUrl('');
    setFormData(prev => ({
      ...prev,
      image: ''
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Update preview URL when image URL changes
    if (name === 'image') {
      setPreviewUrl(value);
    }
  };

  const handleRatingChange = (rating) => {
    setFormData({
      ...formData,
      rating
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const url = isEditing 
        ? `https://durbarmedisuppliers-pvt-ltd.onrender.com/api/testimonials/${id}`
        : 'https://durbarmedisuppliers-pvt-ltd.onrender.com/api/testimonials';
      
      const method = isEditing ? 'PUT' : 'POST';

      // Use FormData if we have a file to upload
      if (file) {
        const formDataToSend = new FormData();
        formDataToSend.append('image', file);
        formDataToSend.append('clientName', formData.clientName);
        formDataToSend.append('company', formData.company);
        formDataToSend.append('testimonial', formData.testimonial);
        formDataToSend.append('rating', formData.rating);
        formDataToSend.append('featured', formData.featured);
        formDataToSend.append('active', formData.active);

        const response = await fetch(url, {
          method,
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formDataToSend
        });

        if (response.ok) {
          navigate('/admin/testimonials');
        } else {
          const data = await response.json();
          setError(data.message || 'Failed to save testimonial');
        }
      } else {
        // Regular JSON submission
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            ...formData,
            rating: parseInt(formData.rating)
          })
        });

        if (response.ok) {
          navigate('/admin/testimonials');
        } else {
          const data = await response.json();
          setError(data.message || 'Failed to save testimonial');
        }
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-medical-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading testimonial...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-medical-50 flex">
      <AdminSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 min-w-0 transition-all duration-300">
        {/* Mobile Header */}
        <header className="bg-white shadow-lg border-b border-gray-200 lg:hidden sticky top-0 z-30">
          <div className="container mx-auto px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaBars className="text-gray-600 text-xl" />
              </button>
              <h1 className="text-lg sm:text-xl font-bold text-blue-600">
                {isEditing ? 'Edit Testimonial' : 'Add Testimonial'}
              </h1>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                <FaSignOutAlt className="text-red-500" />
              </button>
            </div>
          </div>
        </header>

        {/* Desktop Header */}
        <header className="bg-white shadow-soft hidden lg:block">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/testimonials')}
                className="flex items-center text-medical-600 hover:text-medical-700 transition-colors"
              >
                <FaArrowLeft className="mr-2" />
                Back to Testimonials
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h1>
            </div>
          </div>
        </header>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        <div className="max-w-2xl mx-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-soft p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Client Name */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Client Name *
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  placeholder="Enter client name"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Company/Organization *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter company or organization name"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Rating *
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      className="text-2xl transition-transform hover:scale-110"
                    >
                      <FaStar 
                        className={star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'} 
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-gray-600">({formData.rating}/5)</span>
                </div>
              </div>

              {/* Testimonial */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Testimonial *
                </label>
                <textarea
                  name="testimonial"
                  value={formData.testimonial}
                  onChange={handleChange}
                  placeholder="Enter the testimonial text"
                  required
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Client Image
                </label>
                
                <div className="space-y-4">
                  {/* File Upload */}
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center cursor-pointer bg-medical-50 hover:bg-medical-100 transition-colors px-4 py-3 rounded-xl border-2 border-dashed border-medical-300">
                      <FaUpload className="text-medical-600 mr-2" />
                      <span className="text-medical-700 font-medium">Choose File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    {file && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{file.name}</span>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Or URL Input */}
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">or</span>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="Enter image URL"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                    />
                  </div>

                  {/* Image Preview */}
                  {previewUrl && (
                    <div className="mt-3">
                      <img
                        src={previewUrl}
                        alt="Client preview"
                        className="w-24 h-24 object-cover rounded-full border-4 border-medical-200 shadow-md"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Checkboxes */}
              <div className="flex items-center space-x-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-5 h-5 text-medical-600 border-gray-300 rounded focus:ring-medical-500"
                  />
                  <span className="ml-2 text-gray-700">Featured Testimonial</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                    className="w-5 h-5 text-medical-600 border-gray-300 rounded focus:ring-medical-500"
                  />
                  <span className="ml-2 text-gray-700">Active</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center bg-gradient-to-r from-medical-600 to-teal-600 text-white py-3 rounded-xl hover:shadow-glow transform hover:-translate-y-1 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaSave className="mr-2" />
                  {loading ? 'Saving...' : (isEditing ? 'Update Testimonial' : 'Add Testimonial')}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin/testimonials')}
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default TestimonialForm;
