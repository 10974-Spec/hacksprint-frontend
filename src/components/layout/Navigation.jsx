import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import { fetchNotifications } from '../../store/slices/notificationSlice'
import { useEffect, useState } from 'react'
import { FaBell, FaUser, FaSignOutAlt, FaTrophy, FaUsers, FaCode, FaHome } from 'react-icons/fa'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'

export default function Navigation() {
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const { currentPhase } = useSelector((state) => state.phase)
  const { unreadCount } = useSelector((state) => state.notifications)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchNotifications())
    }
  }, [dispatch, isAuthenticated])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    setIsMenuOpen(false)
    setIsMobileMenuOpen(false)
  }

  const getNavItems = () => {
    if (!isAuthenticated) return []
    
    const items = []
    
    if (user.role === 'admin') {
      items.push({ label: 'Admin', href: '/admin', icon: <FaUser className="w-4 h-4" /> })
    }
    
    if (user.role === 'developer') {
      items.push({ label: 'Dashboard', href: '/dashboard', icon: <FaHome className="w-4 h-4" /> })
      items.push({ label: 'My Team', href: '/teams', icon: <FaUsers className="w-4 h-4" /> })
      if (currentPhase === 'team_formation') {
        items.push({ label: 'Browse Teams', href: '/teams/browse', icon: <FaCode className="w-4 h-4" /> })
      }
    }
    
    if (user.role === 'judge') {
      items.push({ label: 'Judge', href: '/judge', icon: <FaUser className="w-4 h-4" /> })
    }
    
    if (currentPhase === 'results') {
      items.push({ label: 'Leaderboard', href: '/leaderboard', icon: <FaTrophy className="w-4 h-4" /> })
    }
    
    items.push({ label: 'Profile', href: '/profile', icon: <FaUser className="w-4 h-4" /> })
    
    return items
  }

  const getPhaseLabel = () => {
    const labels = {
      registration: 'Registration',
      team_formation: 'Team Formation',
      hackathon_live: 'Hackathon Live',
      submission: 'Submission',
      judging: 'Judging',
      results: 'Results',
    }
    return labels[currentPhase] || 'Loading...'
  }

  return (
    <>
      {/* Phase Banner */}
      {currentPhase && (
        <div className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center py-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500"></div>
                <span className="font-medium">Phase:</span>
                <span>{getPhaseLabel()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3">
                <img 
                  src="/logo1.png" 
                  alt="hackSprint Logo" 
                  className="w-24 h-24 object-contain"
                />
                <span className="text-xl font-semibold text-gray-900">
                  hackSprint
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {isAuthenticated ? (
                <>
                  {/* Navigation Items */}
                  <div className="flex items-center gap-6">
                    {getNavItems().filter(item => !['Profile'].includes(item.label)).map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {item.icon}
                        <span className="font-medium text-sm">{item.label}</span>
                      </Link>
                    ))}
                  </div>

                  {/* Notifications */}
                  <button
                    onClick={() => {}}
                    className="relative p-2 text-gray-600 hover:text-gray-900"
                  >
                    <FaBell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="flex items-center gap-3 focus:outline-none"
                    >
                      <div className="w-8 h-8 bg-gray-800 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {user?.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="text-left hidden lg:block">
                        <div className="font-medium text-sm text-gray-900">{user?.name}</div>
                        <div className="text-xs text-gray-500 capitalize">
                          {user?.role}
                        </div>
                      </div>
                    </button>

                    {isMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white shadow border border-gray-200 py-1 z-50">
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <FaUser className="w-4 h-4" />
                          <span className="text-sm">Profile</span>
                        </Link>
                        <div className="border-t border-gray-200 my-1"></div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 text-sm"
                        >
                          <FaSignOutAlt className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-gray-900 font-medium text-sm"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gray-900 text-white px-4 py-2 font-medium text-sm hover:bg-gray-800 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-4">
              {isAuthenticated && (
                <button className="relative p-2 text-gray-600">
                  <FaBell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              )}
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                {isMobileMenuOpen ? (
                  <HiOutlineX className="w-6 h-6" />
                ) : (
                  <HiOutlineMenu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-3">
              {isAuthenticated ? (
                <>
                  {/* User Info */}
                  <div className="flex items-center gap-3 py-3 mb-4 border-b border-gray-200">
                    <div className="w-10 h-10 bg-gray-800 flex items-center justify-center">
                      <span className="text-white font-medium">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user?.name}</div>
                      <div className="text-sm text-gray-500 capitalize">{user?.role}</div>
                    </div>
                  </div>

                  {/* Mobile Navigation Items */}
                  <div className="space-y-1">
                    {getNavItems().map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    ))}
                  </div>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 mt-4 text-red-600 hover:bg-red-50 font-medium"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="space-y-3 py-4">
                  <Link
                    to="/login"
                    className="block w-full text-center py-2.5 text-gray-700 hover:bg-gray-50 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full text-center py-2.5 bg-gray-900 text-white font-medium hover:bg-gray-800"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}