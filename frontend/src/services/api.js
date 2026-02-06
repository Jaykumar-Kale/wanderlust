import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data) => api.post('/users/register', data),
  login: (data) => api.post('/users/login', data),
  getCurrentUser: () => api.get('/users/me'),
  getUserProfile: (id) => api.get(`/users/${id}`),
  updateProfile: (data) => api.put('/users/update/profile', data),
};

// Listing API
export const listingAPI = {
  getAll: (params) => api.get('/listings', { params }),
  getById: (id) => api.get(`/listings/${id}`),
  create: (data) => api.post('/listings', data),
  update: (id, data) => api.put(`/listings/${id}`, data),
  delete: (id) => api.delete(`/listings/${id}`),
  getUserListings: () => api.get('/listings/user/my-listings'),
};

// Review API
export const reviewAPI = {
  createReview: (listingId, data) => api.post(`/reviews/${listingId}/reviews`, data),
  deleteReview: (listingId, reviewId) => api.delete(`/reviews/${listingId}/reviews/${reviewId}`),
  getListingReviews: (listingId) => api.get(`/reviews/listing/${listingId}`),
};

export default api;
