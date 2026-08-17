import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleLearnMore = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };
  const services = [
    {
      title: 'Medical Equipment Sales',
      description: 'Wide range of high-quality medical equipment for hospitals and clinics.',
      icon: '💉'
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your medical equipment needs.',
      details: 'Our dedicated support team is available 24/7 to assist with any equipment issues. We provide immediate troubleshooting, on-call technical support, and emergency service calls to ensure minimal disruption to your healthcare services.',
      icon: '🛎️'
    }
  ];

  return (
    <section id="services" className="py-12 md:py-16 lg:py-20 lg:py-28 bg-gradient-to-b from-white to-medical-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 text-gray-900">Our Services</h2>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto px-4">Comprehensive healthcare solutions</p>
          <div className="w-24 h-1 bg-gradient-to-r from-medical-500 to-teal-500 mx-auto mt-4 md:mt-6 rounded-full"></div>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-soft p-6 md:p-8 text-center hover:shadow-glow transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 group">
              <div className="text-4xl md:text-6xl mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-900">{service.title}</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">{service.description}</p>
              <button 
                className="inline-flex items-center border-2 border-medical-500 text-medical-600 px-4 md:px-6 py-2 md:py-3 rounded-xl hover:bg-gradient-to-r hover:from-medical-500 hover:to-teal-500 hover:text-white hover:shadow-glow transition-all duration-300 font-semibold text-sm md:text-base"
                onClick={() => handleLearnMore(service)}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>

        {/* Service Details Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full mx-4 p-8 shadow-2xl transform transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{selectedService?.title}</h3>
                <button 
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 text-3xl hover:rotate-90 transition-all duration-300"
                >
                  &times;
                </button>
              </div>
              <div className="text-center mb-6">
                <div className="text-7xl mb-4">{selectedService?.icon}</div>
                <p className="text-xl text-gray-600 font-medium">{selectedService?.description}</p>
              </div>
              <p className="text-gray-700 mb-8 leading-relaxed">{selectedService?.details}</p>
              <div className="flex gap-4">
                <button 
                  className="flex-1 bg-gray-100 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button 
                  className="flex-1 bg-gradient-to-r from-medical-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:shadow-glow transform hover:-translate-y-1 transition-all duration-300 font-semibold"
                  onClick={() => {
                    handleCloseModal();
                    navigate(`/contact?service=${encodeURIComponent(selectedService?.title || 'General Inquiry')}`);
                    window.scrollTo(0, 0);
                  }}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
