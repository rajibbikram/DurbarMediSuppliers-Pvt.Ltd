// src/components/Products.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductDetails from './ProductDetails';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isProductsPage = location.pathname === '/products';

  // Get search and category params from URL
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');
  const categoryFilter = searchParams.get('category');

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url = 'https://durbarmedisuppliers-pvt-ltd.onrender.com/api/products';
      
      // Add query parameters if present
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (categoryFilter) params.append('category', categoryFilter);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const companyDescription = (
    <div className="mb-12 text-center">
      <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">Quality Medical Supplies for Nepal</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        At Durbar Medical Suppliers, we are committed to providing high-quality medical equipment and supplies 
        to healthcare facilities across Nepal. As a trusted partner in the healthcare industry, we ensure 
        reliable delivery of essential medical products to support quality patient care nationwide.
      </p>
      <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
    </div>
  );

  return (
    <section id="products" className="py-12 md:py-16 lg:py-20 lg:py-28 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {companyDescription}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            {categoryFilter ? `${categoryFilter}` : (isProductsPage ? 'All Products' : 'Featured Products')}
          </h2>
          <p className="text-base md:text-lg text-gray-600 mt-2">
            {searchQuery ? `Search results for "${searchQuery}"` : 'Explore our top medical supplies for healthcare professionals'}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-center">
            {error}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No products found</p>
            <button 
              onClick={() => navigate('/products')}
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold"
            >
              View All Products
            </button>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {products.slice(0, isProductsPage ? products.length : 3).map((product) => (
                <div key={product._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image.startsWith('http') ? product.image : `https://durbarmedisuppliers-pvt-ltd.onrender.com${product.image}`} 
                      alt={product.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.featured && (
                      <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">Featured</span>
                    )}
                    {product.inStock ? (
                      <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center">
                        <span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse"></span>
                        In Stock
                      </div>
                    ) : (
                      <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                        Out of Stock
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="flex justify-between items-start mb-2 md:mb-3">
                      <h3 className="font-bold text-base md:text-lg text-gray-900 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                      <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 md:px-3 py-1 rounded-full">{product.category}</span>
                    </div>
                    <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed line-clamp-2">
                      {product.description || 'High-quality medical equipment for professional use'}
                    </p>
                    <div className="flex items-center gap-2 mb-3 md:mb-4">
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="text-green-500 mr-1">✓</span>
                        <span className="hidden sm:inline">Quality Certified</span>
                        <span className="sm:hidden">Quality</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="text-green-500 mr-1">✓</span>
                        <span className="hidden sm:inline">Fast Delivery</span>
                        <span className="sm:hidden">Fast</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-3 md:pt-4 border-t border-gray-100">
                      <p className="font-bold text-gray-900 text-sm md:text-base"> <span className='text-gray-500 text-xs md:text-sm font-normal'>Per-Piece</span> Rs: {product.price.toLocaleString()}</p>
                      <button 
                        className="bg-blue-600 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-xl hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300 font-semibold text-xs md:text-sm"
                        onClick={() => handleViewDetails(product)}
                      >
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:inline">View</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {!isProductsPage && products.length > 3 && (
              <div className="text-center mt-8 md:mt-12">
                <button 
                  className="inline-flex items-center bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl hover:bg-blue-700 transition-all duration-300 font-semibold text-base md:text-lg"
                  onClick={() => navigate('/products')}
                >
                  View All Products
                </button>
              </div>
            )}
          </>
        )}

        {/* Product Details Modal */}
        {selectedProduct && (
          <ProductDetails 
            product={selectedProduct} 
            show={showDetails} 
            onHide={handleCloseDetails} 
          />
        )}
      </div>
    </section>
  );
};

export default Products;