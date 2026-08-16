import React, { useState, useEffect } from 'react';
import img1 from '../assets/product/extensiontube.png';
import img2 from '../assets/product/image.png';
import img3 from '../assets/product/kannulex.png';
import { API_BASE_URL } from '../utils/api';
// eslint-disable-next-line no-unused-vars
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


const About = () => {
  const [offerItems, setOfferItems] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [teamCardsPerView, setTeamCardsPerView] = useState(4);

  useEffect(() => {
    fetchOfferItems();
    fetchTeamMembers();
    
    // Set cards per view based on screen size for team carousel
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setTeamCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setTeamCardsPerView(2);
      } else {
        setTeamCardsPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset current index when team members change or cards per view changes
  useEffect(() => {
    setCurrentTeamIndex(0);
  }, [teamMembers.length, teamCardsPerView]);

  // Auto-slide for team carousel
  useEffect(() => {
    if (teamMembers.length > teamCardsPerView) {
      const interval = setInterval(() => {
        setCurrentTeamIndex((prevIndex) => {
          const maxIdx = teamMembers.length - teamCardsPerView;
          return prevIndex >= maxIdx ? 0 : prevIndex + 1;
        });
      }, 5000); // Auto-slide every 5 seconds
      return () => clearInterval(interval);
    }
  }, [teamMembers.length, teamCardsPerView]);

  const teamShouldShowNavigation = teamMembers.length > teamCardsPerView;
  const teamMaxIndex = teamShouldShowNavigation ? teamMembers.length - teamCardsPerView : 0;
  // eslint-disable-next-line no-unused-vars
  const teamTotalPages = teamShouldShowNavigation ? teamMembers.length - teamCardsPerView + 1 : 1;

  // eslint-disable-next-line no-unused-vars
  const goToTeamPrevious = () => {
    setCurrentTeamIndex((prevIndex) => 
      prevIndex === 0 ? teamMaxIndex : prevIndex - 1
    );
  };

  // eslint-disable-next-line no-unused-vars
  const goToTeamNext = () => {
    setCurrentTeamIndex((prevIndex) => 
      prevIndex >= teamMaxIndex ? 0 : prevIndex + 1
    );
  };

  // eslint-disable-next-line no-unused-vars
  const goToTeamSlide = (index) => {
    setCurrentTeamIndex(Math.min(index, teamMaxIndex));
  };

  const fetchOfferItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/offer-items`);
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

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/team-members?active=true`);
      if (response.ok) {
        const data = await response.json();
        setTeamMembers(data);
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
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

        {/* Team Section */}
        {teamMembers.length > 0 && (
          <div className="mt-8 sm:mt-12 md:mt-16">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Our Leadership Team</h3>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">Meet the experienced professionals dedicated to your healthcare needs</p>
              <div className="w-20 sm:w-24 h-1 bg-blue-600 mx-auto mt-4 sm:mt-6 rounded-full"></div>
            </div>
            
            <div className="relative">
              {/* Navigation Arrows - Only show if we have more team members than cards per view */}
              {teamShouldShowNavigation && (
                <>
                  <button
                    onClick={goToTeamPrevious}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-blue-600 hover:text-blue-700"
                  >
                    <FaChevronLeft className="text-xl" />
                  </button>
                  <button
                    onClick={goToTeamNext}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-blue-600 hover:text-blue-700"
                  >
                    <FaChevronRight className="text-xl" />
                  </button>
                </>
              )}

              {/* Slider Container */}
              <div className="overflow-hidden mx-4 md:mx-8">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentTeamIndex * (100 / teamCardsPerView)}%)` }}
                >
                  {teamMembers.map((member) => (
                    <div 
                      key={member._id} 
                      className="flex-shrink-0 px-2 md:px-3"
                      style={{ width: `${100 / teamCardsPerView}%` }}
                    >
                      <div className="group">
                        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 max-w-[280px] mx-auto">
                          {/* Profile Image */}
                          <div className="relative pt-6 pb-4 px-4 text-center bg-gray-50">
                            <div className="relative inline-block">
                              <div className="w-20 h-20 rounded-full border-3 border-white shadow-sm overflow-hidden bg-white">
                                <img 
                                  src={member.image.startsWith('http') ? member.image : `${API_BASE_URL}${member.image}`} 
                                  alt={member.name} 
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.src = 'https://img.icons8.com/color/480/user.png';
                                  }}
                                />
                              </div>
                              {/* Online/Active Indicator */}
                              <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                          </div>
                          
                          {/* Profile Content */}
                          <div className="p-5 text-center">
                            {/* Position */}
                            <p className="text-blue-600 font-semibold text-sm mb-2 truncate">{member.position}</p>
                            
                            {/* Name */}
                            <h4 className="text-base font-bold text-gray-900 mb-3 truncate">
                              {member.name}
                            </h4>
                            
                            {/* Bio */}
                            {member.bio && (
                              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {member.bio}
                              </p>
                            )}
                            
                            {/* Contact Information */}
                            <div className="space-y-2">
                              {member.email && (
                                <a 
                                  href={`mailto:${member.email}`}
                                  className="flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors text-sm truncate"
                                >
                                  <span className="mr-2 text-sm">✉️</span>
                                  {member.email}
                                </a>
                              )}
                              {member.phone && (
                                <a 
                                  href={`tel:${member.phone}`}
                                  className="flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors text-sm truncate"
                                >
                                  <span className="mr-2 text-sm">📞</span>
                                  {member.phone}
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Dots */}
              {teamShouldShowNavigation && (
                <div className="flex justify-center mt-8 space-x-3">
                  {Array.from({ length: teamTotalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToTeamSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentTeamIndex 
                          ? 'bg-blue-600 w-8' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
