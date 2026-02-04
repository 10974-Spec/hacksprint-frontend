import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LandingPage from '../pages/LandingPage'
import SignupPage from '../pages/auth/SignupPage'
import LoginPage from '../pages/auth/LoginPage'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import AdminDashboard from '../pages/dashboard/AdminDashboard'
import DeveloperDashboard from '../pages/dashboard/DeveloperDashboard'
import JudgeDashboard from '../pages/dashboard/JudgeDashboard'
import TeamDashboard from '../pages/teams/TeamDashboard'
import TeamDetailPage from '../pages/teams/TeamDetailPage'
import TeamChatPage from '../pages/chat/TeamChatPage'
import SubmitProjectPage from '../pages/submissions/SubmitProjectPage'
import JudgeSubmissionsPage from '../pages/judging/JudgeSubmissionsPage'
import LeaderboardPage from '../pages/results/LeaderboardPage'
import ProfilePage from '../pages/profile/ProfilePage'
import BrowseTeamsPage from '../pages/teams/BrowseTeamsPage'

export default function AppRoutes() {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { currentPhase } = useSelector((state) => state.phase)

  const getDefaultRoute = () => {
    if (!isAuthenticated) return '/'
    switch (user?.role) {
      case 'admin':
        return '/admin'
      case 'judge':
        return '/judge'
      case 'developer':
        return '/dashboard'
      default:
        return '/'
    }
  }

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to={getDefaultRoute()} /> : <LandingPage />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to={getDefaultRoute()} /> : <SignupPage />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to={getDefaultRoute()} /> : <LoginPage />} />
      
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['developer']} />}>
        <Route path="/dashboard" element={<DeveloperDashboard />} />
        <Route path="/teams" element={<TeamDashboard />} />
        <Route path="/teams/browse" element={<BrowseTeamsPage />} />
        <Route path="/teams/:teamId" element={<TeamDetailPage />} />
        <Route path="/teams/:teamId/chat" element={<TeamChatPage />} />
        {currentPhase === 'submission' && (
          <Route path="/submit-project" element={<SubmitProjectPage />} />
        )}
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['judge']} />}>
        <Route path="/judge" element={<JudgeDashboard />} />
        <Route path="/judge/submissions" element={<JudgeSubmissionsPage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['admin', 'developer', 'judge']} />}>
        {currentPhase === 'results' && (
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        )}
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}