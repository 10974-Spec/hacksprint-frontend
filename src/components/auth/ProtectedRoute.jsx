import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Navigation from '../layout/Navigation'
import Footer from '../layout/Footer'

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const { currentPhase } = useSelector((state) => state.phase)

  if (!isAuthenticated) {
    toast.error('Please login to access this page')
    return <Navigate to="/login" />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    toast.error('You do not have permission to access this page')
    return <Navigate to="/" />
  }

  const checkPhaseAccess = () => {
    if (!currentPhase) return true
    
    const phaseRoutes = {
      registration: ['/admin'],
      team_formation: ['/teams', '/teams/browse', '/admin'],
      hackathon_live: ['/teams/:teamId/chat', '/admin'],
      submission: ['/submit-project', '/admin'],
      judging: ['/judge/submissions', '/admin'],
      results: ['/leaderboard', '/admin'],
    }

    const allowedPaths = phaseRoutes[currentPhase] || []
    const currentPath = window.location.pathname
    
    if (user.role === 'admin') return true
    
    return allowedPaths.some(path => {
      if (path.includes(':')) {
        const pattern = new RegExp('^' + path.replace(/:[^/]+/g, '([^/]+)') + '$')
        return pattern.test(currentPath)
      }
      return currentPath.startsWith(path)
    })
  }

  if (!checkPhaseAccess()) {
    toast.error('This feature is not available in the current phase')
    return <Navigate to="/" />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}