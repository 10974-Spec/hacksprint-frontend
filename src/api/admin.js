import api from './axios'

export const adminAPI = {
  getStats: () => {
    console.log('📊 Fetching admin stats...');
    return api.get('/admin/stats');
  },
  
  getPendingDevelopers: () => {
    console.log('👥 Fetching pending developers...');
    return api.get('/admin/pending-developers');
  },
  
  approveDeveloper: (userId, status) => {
    console.log('✅ Approving developer:', { userId, status });
    return api.post('/admin/approve-developer', { userId, status });
  },
  
  getAllUsers: (params) => {
    console.log('👤 Fetching all users...');
    return api.get('/admin/users', { params });
  },
  
  transitionPhase: (phase) => {
    console.log('🔄 Transitioning phase to:', phase);
    return api.post('/admin/transition-phase', { phase });
  },
  
  forcePhase: (phase) => {
    console.log('⚡ Force setting phase to:', phase);
    return api.post('/admin/force-phase', { phase });
  },
  
  lockTeams: () => {
    console.log('🔒 Locking all teams...');
    return api.post('/admin/lock-teams');
  },
  
  resetPhase: () => {
    console.log('🔄 Resetting phase system...');
    return api.post('/admin/reset-phase');
  },
  
  getUserAnalytics: () => {
    console.log('📈 Fetching user analytics...');
    return api.get('/admin/analytics');
  }
};