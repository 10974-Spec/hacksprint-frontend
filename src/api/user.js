import api from './axios'

export const userAPI = {
  getNotifications: (params) => api.get('/users/notifications', { params }),
  markNotificationAsRead: (notificationId) => api.post(`/users/notifications/${notificationId}/read`),
  markAllNotificationsAsRead: () => api.post('/users/notifications/read-all'),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
}