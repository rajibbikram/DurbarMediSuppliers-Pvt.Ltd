import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaPlus, 
  FaEdit, 
  FaTrash,
  FaSearch,
  FaToggleOn,
  FaToggleOff,
  FaBars,
  FaSignOutAlt
} from 'react-icons/fa';
import AdminSidebar from '../components/AdminSidebar';
import { API_BASE_URL } from '../utils/api';
import ConfirmModal from '../components/ConfirmModal';

const TeamMemberManagement = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [filteredTeamMembers, setFilteredTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, memberId: null });
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  useEffect(() => {
    filterTeamMembers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamMembers, searchTerm, activeFilter]);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/team-members`);
      if (response.ok) {
        const data = await response.json();
        setTeamMembers(data);
      } else {
        setError('Failed to fetch team members');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const filterTeamMembers = useCallback(() => {
    let filtered = teamMembers;

    if (searchTerm) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeFilter !== '') {
      filtered = filtered.filter(member => member.active === (activeFilter === 'true'));
    }

    setFilteredTeamMembers(filtered);
  }, [teamMembers, searchTerm, activeFilter]);

  const handleDelete = async (id) => {
    setDeleteModal({ isOpen: true, memberId: id });
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/team-members/${deleteModal.memberId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchTeamMembers();
        setDeleteModal({ isOpen: false, memberId: null });
      } else {
        setError('Failed to delete team member');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const handleToggleActive = async (id, currentActive) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/team-members/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ active: !currentActive })
      });

      if (response.ok) {
        fetchTeamMembers();
      } else {
        setError('Failed to update team member');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-teal-50 flex">
      <AdminSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 min-w-0 transition-all duration-300">
        {/* Mobile Header */}
        <header className="bg-white shadow-lg border-b border-gray-200 lg:hidden sticky top-0 z-30">
          <div className="container mx-auto px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaBars className="text-gray-600 text-xl" />
              </button>
              <h1 className="text-lg sm:text-xl font-bold text-blue-600">Team Management</h1>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                <FaSignOutAlt className="text-red-500" />
              </button>
            </div>
          </div>
        </header>

        {/* Desktop Header */}
        <header className="bg-white shadow-soft hidden lg:block">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/admin/dashboard')}
                  className="flex items-center text-medical-600 hover:text-medical-700 transition-colors"
                >
                  <FaArrowLeft className="mr-2" />
                  Back to Dashboard
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
              </div>
              <button
                onClick={() => navigate('/admin/team-members/add')}
                className="flex items-center bg-gradient-to-r from-medical-600 to-teal-600 text-white px-4 py-2 rounded-xl hover:shadow-glow transition-all duration-300 font-semibold"
              >
                <FaPlus className="mr-2" />
                Add Team Member
              </button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-soft p-4 sm:p-6 mb-6 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                />
              </div>
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white appearance-none"
                >
                  <option value="">All Status</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Team Members Grid */}
          <div className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden">
            {filteredTeamMembers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No team members found</p>
                <button
                  onClick={() => navigate('/admin/team-members/add')}
                  className="flex items-center bg-gradient-to-r from-medical-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:shadow-glow transition-all duration-300 font-semibold mx-auto"
                >
                  <FaPlus className="mr-2" />
                  Add Your First Team Member
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {filteredTeamMembers.map((member) => (
                  <div key={member._id} className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-4">
                        <img
                          src={member.image.startsWith('http') ? member.image : `${API_BASE_URL}${member.image}`}
                          alt={member.name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                          onError={(e) => {
                            e.target.src = 'https://img.icons8.com/color/480/user.png';
                          }}
                        />
                        <div className="absolute bottom-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                          {member.position}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{member.position}</p>
                      {member.bio && (
                        <p className="text-xs text-gray-500 mb-4 line-clamp-2">{member.bio}</p>
                      )}
                      <div className="flex items-center justify-between w-full mt-auto">
                        <button
                          onClick={() => handleToggleActive(member._id, member.active)}
                          className={`p-2 rounded-lg transition-colors ${
                            member.active 
                              ? 'text-green-600 hover:bg-green-50' 
                              : 'text-gray-400 hover:bg-gray-50'
                          }`}
                          title={member.active ? 'Deactivate' : 'Activate'}
                        >
                          {member.active ? <FaToggleOn /> : <FaToggleOff />}
                        </button>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => navigate(`/admin/team-members/edit/${member._id}`)}
                            className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(member._id)}
                            className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Team Members Count */}
          <div className="mt-4 text-gray-600 text-sm">
            Showing {filteredTeamMembers.length} of {teamMembers.length} team members
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, memberId: null })}
        onConfirm={confirmDelete}
        title="Delete Team Member"
        message="Are you sure you want to delete this team member? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default TeamMemberManagement;