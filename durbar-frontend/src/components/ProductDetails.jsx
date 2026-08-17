// src/components/ProductDetails.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'react-bootstrap-icons';

const ProductDetails = ({ product, show, onHide }) => {
  const navigate = useNavigate();
  if (!product) return null;

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300">
          <div className="relative p-6 sm:p-8 border-b border-gray-100">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900">{product.name}</h3>
              <div className="flex justify-center gap-3">
                <span className="bg-gradient-to-r from-medical-500 to-teal-500 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-glow">{product.category}</span>
                {product.featured && <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-glow">Featured</span>}
              </div>
            </div>
            <button 
              onClick={onHide} 
              className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 p-2 hover:rotate-90 transition-all duration-300 rounded-xl hover:bg-gray-100"
              aria-label="Close"
            >
              <X size={28} />
            </button>
          </div>
          <div className="p-6 sm:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="relative rounded-2xl overflow-hidden shadow-soft group">
                  <img 
                    src={product.image.startsWith('http') ? product.image : `https://durbarmedisuppliers-pvt-ltd.onrender.com${product.image}`} 
                    alt={product.name}
                    className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-6 text-gray-900">Product Details</h4>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">{product.description || 'High-quality medical equipment for professional use'}</p>
                
                <div className="bg-gradient-to-br from-medical-50 to-teal-50 rounded-2xl p-6 mb-8">
                  <h5 className="font-bold text-lg mb-4 text-gray-900">Specifications:</h5>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-semibold text-gray-900">{product.category}</span>
                    </li>
                    <li className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-bold text-medical-600">Rs{product.price.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Availability:</span>
                      <span className={`font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </li>
                    <li className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Warranty:</span>
                      <span className="font-semibold text-gray-900">1 Year</span>
                    </li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <a 
                    href="tel:+9779768912291"
                    className="flex-1 bg-gradient-to-r from-medical-600 to-teal-600 text-white px-6 py-4 rounded-xl hover:shadow-glow transform hover:-translate-y-1 transition-all duration-300 font-semibold text-center"
                  >
                    Contact Us
                  </a>
                  <button 
                    onClick={() => {
                      const message = `I'm interested in getting a quote for: ${product.name} (Price: Rs${product.price.toLocaleString()})`;
                      navigate('/contact', { state: { product, message } });
                    }}
                    className="flex-1 border-2 border-medical-500 text-medical-600 px-6 py-4 rounded-xl hover:bg-medical-500 hover:text-white transform hover:-translate-y-1 transition-all duration-300 font-semibold text-center cursor-pointer"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProductDetails;