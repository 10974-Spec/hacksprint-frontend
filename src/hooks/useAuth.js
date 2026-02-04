import { useSelector, useDispatch } from 'react-redux'
import { checkAuth, logout } from '../store/slices/authSlice'

export function useAuth() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const refreshAuth = () => {
    dispatch(checkAuth())
  }

  const signOut = () => {
    dispatch(logout())
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    refreshAuth,
    signOut,
    isAdmin: user?.role === 'admin',
    isDeveloper: user?.role === 'developer',
    isJudge: user?.role === 'judge',
  }
}