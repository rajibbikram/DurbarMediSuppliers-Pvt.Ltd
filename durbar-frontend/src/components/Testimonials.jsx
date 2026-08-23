import React, { useState, useEffect } from 'react';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight, FaPaperPlane, FaTimes } from 'react-icons/fa';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    clientName: '',
    company: '',
    testimonial: '',
    rating: 5
  });

  useEffect(() => {
    fetchTestimonials();
    
    // Set cards per view based on screen size
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset current index when testimonials change or cards per view changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [testimonials.length, cardsPerView]);

  useEffect(() => {
    // Only auto-slide if we have more testimonials than can fit in one view
    if (testimonials.length > cardsPerView) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const maxIdx = testimonials.length - cardsPerView;
          return prevIndex >= maxIdx ? 0 : prevIndex + 1;
        });
      }, 5000); // Auto-slide every 5 seconds
      return () => clearInterval(interval);
    }
  }, [testimonials.length, cardsPerView]);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('https://durbarmedisuppliers-pvt-ltd.onrender.com/api/testimonials?active=true');
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

  const shouldShowNavigation = testimonials.length > cardsPerView;
  const maxIndex = shouldShowNavigation ? testimonials.length - cardsPerView : 0;
  const totalPages = shouldShowNavigation ? testimonials.length - cardsPerView + 1 : 1;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);

    try {
      const response = await fetch('https://durbarmedisuppliers-pvt-ltd.onrender.com/api/testimonials/public', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          clientName: '',
          company: '',
          testimonial: '',
          rating: 5
        });
        
        // Hide success message after 3 seconds and close form
        setTimeout(() => {
          setSubmitSuccess(false);
          setShowForm(false);
        }, 3000);
      } else {
        const data = await response.json();
        setSubmitError(data.message || 'Failed to submit testimonial');
      }
    } catch (err) {
      setSubmitError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 md:py-16 lg:py-20 lg:py-28 bg-gradient-to-b from-medical-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 md:py-16 lg:py-20 lg:py-28 bg-gradient-to-b from-medical-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 lg:py-28 bg-gradient-to-b from-medical-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-gray-900">What Our Clients Say</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">Trusted by healthcare professionals across Nepal</p>
          <div className="w-24 h-1 bg-gradient-to-r from-medical-500 to-teal-500 mx-auto mt-4 md:mt-6 rounded-full"></div>
        </div>
        
        {testimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No testimonials available at the moment.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Navigation Arrows - Only show if we have more testimonials than cards per view */}
            {shouldShowNavigation && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-white p-3 rounded-full shadow-lg hover:shadow-glow transition-all duration-300 text-medical-600 hover:text-medical-700"
                >
                  <FaChevronLeft className="text-xl" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-white p-3 rounded-full shadow-lg hover:shadow-glow transition-all duration-300 text-medical-600 hover:text-medical-700"
                >
                  <FaChevronRight className="text-xl" />
                </button>
              </>
            )}

            {/* Slider Container */}
            <div className="overflow-hidden mx-4 md:mx-8">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial._id} 
                    className="flex-shrink-0 px-2 md:px-4"
                    style={{ width: `${100 / cardsPerView}%` }}
                  >
                    <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8 hover:shadow-glow transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 h-full">
                      <div className="flex items-center mb-4 md:mb-6">
                        <img 
                          src={testimonial.image.startsWith('http') ? testimonial.image : `https://durbarmedisuppliers-pvt-ltd.onrender.com${testimonial.image}`} 
                          alt={testimonial.clientName} 
                          className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover mr-3 md:mr-4 border-4 border-medical-100" 
                        />
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm md:text-base">{testimonial.clientName}</h4>
                          <p className="text-xs md:text-sm text-gray-600">{testimonial.company}</p>
                        </div>
                      </div>
                      
                      <div className="flex mb-3 md:mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 text-sm md:text-base" />
                        ))}
                      </div>
                      
                      <div className="relative">
                        <FaQuoteLeft className="text-medical-200 text-3xl md:text-4xl absolute -top-2 -left-2" />
                        <p className="text-gray-600 leading-relaxed pl-6 md:pl-8 italic text-sm md:text-base line-clamp-4">"{testimonial.testimonial}"</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            {shouldShowNavigation && (
              <div className="flex justify-center mt-8 space-x-3">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-medical-600 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-flex items-center gap-4 md:gap-8 bg-white rounded-2xl shadow-soft px-4 md:px-8 py-4 md:py-6 border border-gray-100 flex-wrap justify-center">
            <div className="text-center px-2 md:px-4">
              <div className="text-2xl md:text-4xl font-bold text-medical-600 mb-1">500+</div>
              <div className="text-xs md:text-sm text-gray-600">Happy Clients</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-200"></div>
            <div className="text-center px-2 md:px-4">
              <div className="text-2xl md:text-4xl font-bold text-medical-600 mb-1">4.9/5</div>
              <div className="text-xs md:text-sm text-gray-600">Customer Rating</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-200"></div>
            <div className="text-center px-2 md:px-4">
              <div className="text-2xl md:text-4xl font-bold text-medical-600 mb-1">98%</div>
              <div className="text-xs md:text-sm text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Add Your Testimonial Button */}
        <div className="mt-8 text-center">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center bg-gradient-to-r from-medical-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:shadow-glow transform hover:-translate-y-1 transition-all duration-300 font-semibold"
            >
              <FaPaperPlane className="mr-2" />
              Share Your Experience
            </button>
          ) : (
            <button
              onClick={() => setShowForm(false)}
              className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-all duration-300 font-semibold"
            >
              <FaTimes className="mr-2" />
              Close Form
            </button>
          )}
        </div>

        {/* Testimonial Submission Form */}
        {showForm && (
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8 border border-gray-100">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">Share Your Experience</h3>
              
              {submitSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl mb-6 text-center">
                  Thank you! Your testimonial has been submitted successfully and will be visible after admin approval.
                </div>
              )}

              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-6">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Company/Organization *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Enter your company or organization"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                  />
                </div>

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

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Your Testimonial *
                  </label>
                  <textarea
                    name="testimonial"
                    value={formData.testimonial}
                    onChange={handleInputChange}
                    placeholder="Share your experience with us..."
                    required
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center bg-gradient-to-r from-medical-600 to-teal-600 text-white py-3 rounded-xl hover:shadow-glow transform hover:-translate-y-1 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane className="mr-2" />
                  {submitting ? 'Submitting...' : 'Submit Testimonial'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
