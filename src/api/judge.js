import api from './axios'

export const judgeAPI = {
  submitScore: (submissionId, data) => api.post(`/judge/submissions/${submissionId}/scores`, data),
  finalizeScore: (scoreId) => api.post(`/judge/scores/${scoreId}/finalize`),
  getSubmissionScores: (submissionId) => api.get(`/judge/submissions/${submissionId}/scores`),
  getMyScores: () => api.get('/judge/my-scores'),
  getUnscoredSubmissions: () => api.get('/judge/unscored'),
}