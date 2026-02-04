import api from './axios'

export const submissionAPI = {
  createSubmission: (teamId, data) => api.post(`/submissions/${teamId}`, data),
  getSubmission: (submissionId) => api.get(`/submissions/${submissionId}`),
  getTeamSubmission: (teamId) => api.get(`/submissions/team/${teamId}`),
  updateSubmission: (submissionId, data) => api.put(`/submissions/${submissionId}`, data),
  lockSubmission: (submissionId) => api.post(`/submissions/${submissionId}/lock`),
  getAllSubmissions: () => api.get('/submissions'),
}