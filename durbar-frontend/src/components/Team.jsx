import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../utils/api';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/team-members?active=true`);
      if (response.ok) {
        const data = await response.json();
        setTeamMembers(data);
      }
    } catch (err) {
      console.error('Error fetching team members:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading team...</p>
          </div>
        </div>
      </section>
    );
  }

  if (teamMembers.length === 0) {
    return null; // Don't show section if no team members
  }

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            The dedicated professionals behind Durbar Medical Suppliers
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {teamMembers.map((member) => (
            <div 
              key={member._id} 
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-gray-100">
                {/* Profile Header with Gradient Background */}
                <div className="relative h-24 sm:h-32 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700">
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
                
                {/* Profile Image */}
                <div className="relative px-6 sm:px-8">
                  <div className="absolute -top-12 sm:-top-16 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                        <img
                          src={member.image.startsWith('http') ? member.image : `${API_BASE_URL}${member.image}`}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = 'https://img.icons8.com/color/480/user.png';
                          }}
                        />
                      </div>
                      {/* Online/Active Indicator */}
                      <div className="absolute bottom-1 right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 border-2 border-white rounded-full shadow-md"></div>
                    </div>
                  </div>
                </div>
                
                {/* Profile Content */}
                <div className="pt-16 sm:pt-20 pb-6 sm:pb-8 px-6 sm:px-8 text-center">
                  {/* Position Badge */}
                  <div className="inline-block mb-3 sm:mb-4">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-md">
                      {member.position}
                    </span>
                  </div>
                  
                  {/* Name */}
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </h4>
                  
                  {/* Bio */}
                  {member.bio && (
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 px-2">
                      {member.bio}
                    </p>
                  )}
                  
                  {/* Contact Information */}
                  <div className="space-y-2 sm:space-y-3 mt-4 sm:mt-6">
                    {member.email && (
                      <a 
                        href={`mailto:${member.email}`}
                        className="flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors text-xs sm:text-sm group-hover:underline"
                      >
                        <span className="bg-blue-50 p-2 rounded-lg mr-2 group-hover:bg-blue-100 transition-colors">
                          ✉️
                        </span>
                        {member.email}
                      </a>
                    )}
                    {member.phone && (
                      <a 
                        href={`tel:${member.phone}`}
                        className="flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors text-xs sm:text-sm group-hover:underline"
                      >
                        <span className="bg-green-50 p-2 rounded-lg mr-2 group-hover:bg-green-100 transition-colors">
                          📞
                        </span>
                        {member.phone}
                      </a>
                    )}
                  </div>
                  
                  {/* Social Links (Placeholder) */}
                  <div className="flex justify-center space-x-3 sm:space-x-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer">
                      <span className="text-xs sm:text-sm">in</span>
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer">
                      <span className="text-xs sm:text-sm">tw</span>
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer">
                      <span className="text-xs sm:text-sm">fb</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;