export const ROUTES = {
  HOME: '/',
  SIGNUP: '/signup',
  LOGIN: '/login',
  
  ADMIN: {
    DASHBOARD: '/admin',
  },
  
  DEVELOPER: {
    DASHBOARD: '/dashboard',
    TEAMS: '/teams',
    BROWSE_TEAMS: '/teams/browse',
    TEAM_DETAIL: '/teams/:teamId',
    TEAM_CHAT: '/teams/:teamId/chat',
    SUBMIT_PROJECT: '/submit-project',
  },
  
  JUDGE: {
    DASHBOARD: '/judge',
    SUBMISSIONS: '/judge/submissions',
  },
  
  SHARED: {
    LEADERBOARD: '/leaderboard',
    PROFILE: '/profile',
  }
}

export const PHASE_ROUTES = {
  registration: [],
  team_formation: [ROUTES.DEVELOPER.TEAMS, ROUTES.DEVELOPER.BROWSE_TEAMS],
  hackathon_live: [ROUTES.DEVELOPER.TEAM_CHAT],
  submission: [ROUTES.DEVELOPER.SUBMIT_PROJECT],
  judging: [ROUTES.JUDGE.SUBMISSIONS],
  results: [ROUTES.SHARED.LEADERBOARD],
}