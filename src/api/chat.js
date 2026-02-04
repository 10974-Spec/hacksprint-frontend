import api from './axios'

export const chatAPI = {
  getMessages: (teamId, params) => api.get(`/chat/${teamId}/messages`, { params }),
  sendMessage: (teamId, content, messageType = 'text') => api.post(`/chat/${teamId}/messages`, { content, messageType }),
  editMessage: (messageId, content) => api.put(`/chat/messages/${messageId}`, { content }),
}