import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    error: null
  });

  // Check if there's product information from navigation state
  useEffect(() => {
    if (location.state?.product) {
      const product = location.state.product;
      const message = location.state.message || `I'm interested in ${product.name}`;
      
      setFormData(prev => ({
        ...prev,
        subject: `Quote Request: ${product.name}`,
        message: message
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null });

    try {
      const response = await fetch('https://durbarmedisuppliers-pvt-ltd.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          productInfo: location.state?.product || null
        })
      });

      if (response.ok) {
        setStatus({ submitting: false, submitted: true, error: null });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        const data = await response.json();
        setStatus({
          submitting: false,
          submitted: false,
          error: data.message || 'Failed to send message. Please try again later.'
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus({
        submitting: false,
        submitted: false,
        error: 'Network error. Please try again later.'
      });
    }
  };

  const contactInfo = [
    {
      icon: <FaPhone className="text-white" size={20} />,
      title: 'Call Us',
      text: ['+977-9768912291', '+977-9768912291']
    },
    {
      icon: <FaEnvelope className="text-white" size={20} />,
      title: 'Email Us',
      text: ['info@durbarmedi.com', 'support@durbarmedi.com']
    },
    {
      icon: <FaMapMarkerAlt className="text-white" size={20} />,
      title: 'Our Location',
      text: ['Jakha, Kirtipur', 'Kathmandu, Nepal']
    }
  ];

  return (
    <section id="contact" className="py-12 md:py-16 lg:py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-blue-50 to-medical-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 text-medical-600">Contact Us</h2>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto px-4">Get in touch with our team</p>
          <div className="w-24 h-1 bg-medical-600 mx-auto mt-4 md:mt-6 rounded-full shadow-lg"></div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 h-full border border-gray-100">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900">Contact Information</h3>
              <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 leading-relaxed">
                Have questions or need assistance? Our team is here to help you with all your medical equipment needs.
              </p>
              
              <div className="space-y-4 md:space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="bg-gradient-to-br from-medical-500 to-teal-500 text-white p-3 md:p-4 rounded-xl mr-3 md:mr-4 group-hover:shadow-lg transform group-hover:scale-110 transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">{item.title}</h4>
                      {item.text.map((text, i) => (
                        <p key={i} className="text-gray-600 text-xs md:text-sm">{text}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900">Send us a Message</h3>
              
              {status.submitted && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 md:px-6 py-3 md:py-4 rounded-xl mb-4 md:mb-6 flex items-center shadow-md">
                  <span className="mr-2 md:mr-3 text-lg md:text-xl">✅</span>
                  <span className="flex-grow text-sm md:text-base">Thank you for your message! We'll get back to you soon.</span>
                  <button 
                    onClick={() => setStatus({...status, submitted: false})}
                    className="text-green-600 hover:text-green-800 text-lg md:text-xl ml-2"
                  >
                    &times;
                  </button>
                </div>
              )}
              
              {status.error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 md:px-6 py-3 md:py-4 rounded-xl mb-4 md:mb-6 flex items-center shadow-md">
                  <span className="mr-2 md:mr-3 text-lg md:text-xl">❌</span>
                  <span className="flex-grow text-sm md:text-base">{status.error}</span>
                  <button 
                    onClick={() => setStatus({...status, error: null})}
                    className="text-red-600 hover:text-red-800 text-lg md:text-xl ml-2"
                  >
                    &times;
                  </button>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold mb-1 md:mb-2 text-gray-700">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white focus:shadow-md text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-semibold mb-1 md:mb-2 text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white focus:shadow-md text-sm md:text-base"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs md:text-sm font-semibold mb-1 md:mb-2 text-gray-700">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white focus:shadow-md text-sm md:text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-xs md:text-sm font-semibold mb-1 md:mb-2 text-gray-700">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message here..."
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white focus:shadow-md resize-none text-sm md:text-base"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-medical-600 text-white py-3 md:py-4 rounded-xl font-semibold hover:bg-medical-700 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm md:text-base"
                  disabled={status.submitting}
                >
                  {status.submitting ? (
                    <>
                      <span className="inline-block animate-spin mr-2">⏳</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">📧</span>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;