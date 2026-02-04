import api from './axios'

export const teamAPI = {
  createTeam: (teamData) => api.post('/teams', teamData),
  getMyTeam: () => api.get('/teams/my-team'),
  getTeam: (teamId) => api.get(`/teams/${teamId}`),
  updateTeam: (teamId, updates) => api.put(`/teams/${teamId}`, updates),
  uploadTeamImage: (teamId, imageFile) => {
    const formData = new FormData()
    formData.append('image', imageFile)
    return api.post(`/teams/${teamId}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  sendJoinRequest: (teamId, message) => api.post(`/teams/${teamId}/join-requests`, { message }),
  getJoinRequests: (teamId) => api.get(`/teams/${teamId}/join-requests`),
  handleJoinRequest: (requestId, action) => api.post(`/join-requests/${requestId}/handle`, { action }),
  leaveTeam: (teamId) => api.post(`/teams/${teamId}/leave`),
}