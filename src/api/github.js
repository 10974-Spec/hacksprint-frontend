import api from './axios'

export const githubAPI = {
  initiateOAuth: (teamId) => api.get(`/github/oauth/${teamId}`),
  getRepoInfo: (teamId) => api.get(`/github/${teamId}/repo`),
  syncRepoData: (teamId) => api.post(`/github/${teamId}/sync`),
  disconnectRepo: (teamId) => api.delete(`/github/${teamId}/disconnect`),
}