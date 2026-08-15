import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaShieldAlt, FaTruck, FaHeadset, FaAward, FaCertificate } from 'react-icons/fa';

const TrustSignals = () => {
  const navigate = useNavigate();
  const trustItems = [
    {
      icon: <FaCertificate className="text-4xl" />,
      title: 'Quality Certified',
      description: 'All products meet international quality standards and healthcare regulations',
      color: 'bg-blue-600'
    },
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: 'Trusted Supplier',
      description: 'Serving 100+ healthcare facilities across Nepal with reliable service',
      color: 'bg-blue-500'
    },
    {
      icon: <FaTruck className="text-4xl" />,
      title: 'Fast Delivery',
      description: 'Next-day delivery available across Kathmandu valley and major cities',
      color: 'bg-blue-700'
    },
    {
      icon: <FaHeadset className="text-4xl" />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for urgent medical equipment needs',
      color: 'bg-blue-600'
    },
    {
      icon: <FaAward className="text-4xl" />,
      title: 'Best Prices',
      description: 'Competitive pricing with special discounts for bulk orders',
      color: 'bg-blue-500'
    },
    {
      icon: <FaCheckCircle className="text-4xl" />,
      title: 'Quality Guarantee',
      description: '100% satisfaction guarantee with easy returns and exchanges',
      color: 'bg-blue-700'
    }
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 text-gray-900">Why Choose Durbar Medical Suppliers?</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">We're committed to providing the highest quality medical supplies with exceptional service</p>
          <div className="w-20 sm:w-24 h-1 bg-blue-600 mx-auto mt-3 sm:mt-4 md:mt-6 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {trustItems.map((item, index) => (
            <div key={index} className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 text-center hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 group">
              <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl ${item.color} text-white mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl sm:text-3xl md:text-4xl">{item.icon}</span>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-gray-900">{item.title}</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 md:mt-16 bg-blue-600 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 md:mb-4">Need Bulk Orders for Your Healthcare Facility?</h3>
              <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-6 text-blue-50 leading-relaxed">
                We offer special pricing and priority delivery for hospitals, clinics, and healthcare organizations. Contact us for custom quotes and dedicated account management.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                <div className="flex items-center text-xs sm:text-sm md:text-base">
                  <FaCheckCircle className="mr-1 sm:mr-2" />
                  <span>Volume Discounts</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm md:text-base">
                  <FaCheckCircle className="mr-1 sm:mr-2" />
                  <span>Priority Delivery</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm md:text-base">
                  <FaCheckCircle className="mr-1 sm:mr-2" />
                  <span>Dedicated Support</span>
                </div>
              </div>
            </div>
            <div className="text-center lg:text-right mt-4 sm:mt-6 lg:mt-0">
              <button 
                onClick={() => navigate('/contact')}
                className="inline-flex items-center bg-white text-blue-600 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base md:text-lg hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300 shadow-lg w-full sm:w-auto justify-center cursor-pointer"
              >
                Request Bulk Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
