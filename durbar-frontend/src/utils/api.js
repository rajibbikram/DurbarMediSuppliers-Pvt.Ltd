const API_URL = process.env.REACT_APP_API_URL || 'https://durbarmedisuppliers-pvt-ltd.onrender.com';

export const API_BASE_URL = API_URL;

export const getAPIUrl = (endpoint) => {
  return `${API_URL}${endpoint}`;
};