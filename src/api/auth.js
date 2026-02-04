import api from './axios'

export const authAPI = {
  signup: (userData) => api.post('/auth/signup', userData), // Calls /api/auth/signup
  login: (email, password) => api.post('/auth/login', { email, password }), // Calls /api/auth/login
  logout: () => api.post('/auth/logout'), // Calls /api/auth/logout
  refreshToken: (refreshToken) => api.post('/auth/refresh', { refreshToken }), // Calls /api/auth/refresh
  getProfile: () => api.get('/auth/profile'), // Calls /api/auth/profile
}