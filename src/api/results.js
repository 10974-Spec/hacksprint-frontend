import api from './axios'

export const resultsAPI = {
  calculateResults: () => api.post('/results/calculate'),
  getLeaderboard: () => api.get('/results/leaderboard'),
  getTeamResult: (teamId) => api.get(`/results/team/${teamId}`),
}