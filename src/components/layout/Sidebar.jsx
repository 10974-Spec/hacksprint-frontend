import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { 
  FaHome, 
  FaUsers, 
  FaCode, 
  FaTrophy, 
  FaUser, 
  FaCog, 
  FaBell 
} from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'

export default function Sidebar() {
  const { user } = useSelector((state) => state.auth)
  const { currentPhase } = useSelector((state) => state.phase)

  const getMenuItems = () => {
    const items = []

    if (user.role === 'admin') {
      items.push(
        { label: 'Dashboard', icon: <MdDashboard />, path: '/admin' },
        { label: 'Users', icon: <FaUsers />, path: '/admin/users' },
        { label: 'Settings', icon: <FaCog />, path: '/admin/settings' }
      )
    }

    items.push({ label: 'Profile', icon: <FaUser />, path: '/profile' })

    return items
  }

  return (
    <div className="hidden lg:block w-64">
      <div className="h-full py-6">
        {/* User Profile */}
        <div className="mb-8 px-4">
          <div className="flex items-center space-x-3 mb-6 p-3 border border-black">
            <div className="w-10 h-10 bg-gray-900 flex items-center justify-center">
              <span className="text-white font-medium">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="font-medium text-gray-900">{user?.name}</div>
              <div className="text-sm text-gray-500 capitalize">
                {user?.role}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 px-4">
          {getMenuItems().map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 border border-black transition-colors ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-900 hover:bg-gray-100'
                }`
              }
            >
              <span className="w-5 h-5">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Phase Indicator */}
        <div className="mt-8 pt-8 border-t border-black px-4">
          <div className="text-xs text-gray-500 mb-2">Current Phase</div>
          <div className="flex items-center space-x-2 p-3 border border-black">
            <div className="w-2 h-2 bg-gray-900" />
            <div className="font-medium text-gray-900 capitalize">
              {currentPhase?.replace('_', ' ') || 'Loading...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}