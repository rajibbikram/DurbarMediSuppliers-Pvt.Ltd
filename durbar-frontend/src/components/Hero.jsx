import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaShippingFast, FaHeadset, FaArrowRight } from 'react-icons/fa';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    { 
      icon: <FaShieldAlt className="text-white text-lg md:text-xl" />, 
      text: 'Certified & Quality Products' 
    },
    { 
      icon: <FaShippingFast className="text-white text-lg md:text-xl" />, 
      text: 'Fast & Reliable Delivery' 
    },
    { 
      icon: <FaHeadset className="text-white text-lg md:text-xl" />, 
      text: '24/7 Customer Support' 
    },
  ];

  // Slides now come from an easy-to-edit config in heroSlides.js

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen flex items-center py-16 lg:py-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center py-3">
          {/* Left Side - Content */}
          <div className={`space-y-6 lg:space-y-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="inline-flex items-center bg-white border border-blue-200 px-3 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-semibold text-blue-700 shadow-md animate-pulse">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 md:mr-3"></span>
              <span className="hidden sm:inline">Trusted Medical Equipment Supplier in Nepal</span>
              <span className="sm:hidden">Trusted Supplier</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900">
              Quality Medical Supplies for <br />
              <span className="text-blue-600">Healthcare Professionals</span>
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl">
              Premium medical equipment and supplies delivered with reliability, competitive pricing, and exceptional customer support.
            </p>
            
            <div className="flex flex-wrap gap-3 md:gap-6">
              <Link 
                to="/products" 
                className="inline-flex items-center bg-blue-600 text-white px-6 md:px-10 py-3 md:py-4 rounded-xl hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300 font-semibold text-sm md:text-base lg:text-lg group shadow-lg hover:shadow-xl"
              >
                Browse Products 
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/contact" 
                className="inline-flex items-center bg-white text-blue-600 px-6 md:px-10 py-3 md:py-4 rounded-xl hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300 font-semibold text-sm md:text-base lg:text-lg border-2 border-blue-600"
              >
                Request Quote
              </Link>
            </div>

            {/* Features */}
            <div className="pt-6 md:pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 ">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-3 md:space-x-4 bg-white p-4 md:p-5 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-300"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="bg-blue-600 p-3 md:p-4 rounded-xl shadow-md">
                    {feature.icon}
                  </div>
                  <span className="text-sm md:text-base font-semibold text-gray-800">{feature.text}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-8 md:pt-10 border-t border-gray-200">
              <p className="text-sm md:text-base font-semibold text-gray-700 mb-4 md:mb-6">Trusted by Healthcare Facilities</p>
              <div className="flex items-center justify-center gap-6 md:gap-10">
                <div className="flex flex-col items-center text-center">
                  <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600">500+</span>
                  <span className="text-xs md:text-sm text-gray-500 mt-1">Products</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600">100+</span>
                  <span className="text-xs md:text-sm text-gray-500 mt-1">Clients</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600">24/7</span>
                  <span className="text-xs md:text-sm text-gray-500 mt-1">Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Modern Abstract Design (Desktop Only) */}
          <div className="relative hidden lg:block">
            <div className="relative h-full min-h-[400px] md:min-h-[500px]">
              {/* Floating Cards */}
              <div 
                className="absolute top-0 right-0 bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-gray-100 transform rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-105 cursor-pointer animate-float"
              >
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FaShieldAlt className="text-blue-600 text-lg md:text-xl" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-semibold text-gray-900">Quality Certified</p>
                    <p className="text-xs text-gray-500">ISO Standards</p>
                  </div>
                </div>
              </div>

              <div 
                className="absolute top-24 md:top-32 right-8 md:right-12 bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-gray-100 transform -rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-105 cursor-pointer animate-float-delay-1"
              >
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <FaShippingFast className="text-green-600 text-lg md:text-xl" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-semibold text-gray-900">Fast Delivery</p>
                    <p className="text-xs text-gray-500">Nationwide</p>
                  </div>
                </div>
              </div>

              <div 
                className="absolute top-48 md:top-64 right-2 md:right-4 bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-gray-100 transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105 cursor-pointer animate-float-delay-2"
              >
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <FaHeadset className="text-purple-600 text-lg md:text-xl" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-semibold text-gray-900">24/7 Support</p>
                    <p className="text-xs text-gray-500">Always Available</p>
                  </div>
                </div>
              </div>

              {/* Decorative Background Shapes */}
              <div className="absolute top-20 left-0 w-32 md:w-40 h-32 md:h-40 bg-blue-200 rounded-full opacity-30 blur-2xl md:blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 right-10 md:right-20 w-24 md:w-32 h-24 md:h-32 bg-green-200 rounded-full opacity-30 blur-2xl md:blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
