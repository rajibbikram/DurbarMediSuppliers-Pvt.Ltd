import React, { useState, useEffect } from 'react';
import img1 from '../assets/product/extensiontube.png';
import img2 from '../assets/product/image.png';
import img3 from '../assets/product/kannulex.png';
import ceo from '../assets/member/ceo.png';


const About = () => {
  const [offerItems, setOfferItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOfferItems();
  }, []);

  const fetchOfferItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/offer-items');
      if (response.ok) {
        const data = await response.json();
        setOfferItems(data);
      }
    } catch (error) {
      console.error('Error fetching offer items:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: '🏥',
      title: 'Quality Products',
      description: 'We source only the highest quality medical equipment from trusted manufacturers.'
    },
    {
      icon: '⚡',
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to ensure you get what you need when you need it.'
    },
    {
      icon: '🛡️',
      title: 'Certified',
      description: 'All our products meet international quality and safety standards.'
    }
  ];

  return (
    <section id="about" className="py-8 sm:py-12 md:py-16 lg:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 text-gray-900">About DurbarMedi</h2>
          <p className="text-sm sm:text-base md:text-xl text-gray-600 max-w-2xl mx-auto px-4">Your trusted partner in healthcare solutions</p>
          <div className="w-20 sm:w-24 h-1 bg-blue-600 mx-auto mt-3 sm:mt-4 md:mt-6 rounded-full"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12 md:mb-16">
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">Our Story</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              Durbar Medical Suppliers is a newly established company based in Kathmandu, Nepal, 
              dedicated to delivering premium quality medical equipment and supplies 
              to healthcare facilities across the nation.
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
              As a fresh face in the medical supply industry, we bring modern solutions 
              and a customer-centric approach to healthcare distribution. Our mission is 
              to ensure that every medical facility in Nepal, from major hospitals to 
              remote clinics, has access to reliable, high-quality medical supplies. 
              We are committed to building lasting relationships with healthcare 
              professionals by understanding their unique needs and delivering 
              exceptional service nationwide.
            </p>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
              <div className="col-span-2">
                <img src={img1} alt="Facility" className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300" />
              </div>
              <div>
                <img src={img2} alt="Team" className="w-full h-28 sm:h-32 md:h-40 object-cover rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300" />
              </div>
              <div>
                <img src={img3} alt="Warehouse" className="w-full h-32 sm:h-40 object-cover rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 md:p-8 text-center hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
              <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 md:mb-4">{feature.icon}</div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 mb-8 sm:mb-12 md:mb-16 shadow-md">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 text-gray-900">Hello!</h3>
          <p className="text-sm sm:text-base md:text-lg mb-2 text-gray-700">This message is from <strong className="text-blue-600">Durbar Medi Suppliers Pvt. Ltd.</strong></p>
          <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-6 text-gray-700">We supply the following surgical/medical items at good and competitive prices:</p>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading offer items...</p>
            </div>
          ) : (
            <ul className="space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6 md:mb-8">
              {offerItems.length === 0 ? (
                <li className="text-center text-gray-500 py-4">No offer items available</li>
              ) : (
                offerItems.map((item, i) => (
                  <li key={i} className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="font-semibold text-gray-900 mb-1 text-xs sm:text-sm md:text-base">{item.name}</div>
                    <div className="text-gray-600 text-xs sm:text-sm">{item.description}</div>
                  </li>
                ))
              )}
            </ul>
          )}

          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-md mb-3 sm:mb-4 md:mb-6">
            <p className="mb-2 sm:mb-3 text-gray-700 text-xs sm:text-sm md:text-base">We provide special discounts for bulk orders.</p>
            <p className="mb-2 sm:mb-3 text-gray-700 text-xs sm:text-sm md:text-base">If you want to see a quotation (price list) or a sample, we can visit your pharmacy and show it to you.</p>
            <p className="mb-0 font-semibold text-blue-600 text-xs sm:text-sm md:text-base">Contact Number: 9768912291</p>
          </div>

          <p className="font-semibold text-base sm:text-lg md:text-xl text-gray-900">Thank you!</p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            {[
              { id: 1, name: 'Mani Raj Shah', post: 'CEO', image: ceo },
              { id: 2, name: 'Ram Bahadur', post: 'Operations Manager', image: ceo },
              { id: 3, name: 'Sita Devi', post: 'Sales Manager', image: ceo }
            ].map((item) => (
              <div key={item.id} className="text-center">
                <div className="relative inline-block mb-3 sm:mb-4 md:mb-6">
                  <img src={item.image} alt={item.name} className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 object-cover rounded-full shadow-2xl border-4 border-white" />
                  <div className="absolute bottom-0 right-0 bg-blue-600 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-xs md:text-sm font-semibold shadow-md">
                    {item.post}
                  </div>
                </div>
                <div className="font-bold text-xl sm:text-2xl text-gray-900 mb-2">{item.name}</div>
                <div className="text-blue-600 font-medium text-sm sm:text-base">{item.post}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
