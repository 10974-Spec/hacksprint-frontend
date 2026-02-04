import { FaInfoCircle, FaUserPlus, FaLock, FaTrophy } from 'react-icons/fa'

export default function SystemMessage({ message }) {
  const getIcon = () => {
    const action = message.metadata?.action
    switch (action) {
      case 'team_created':
      case 'member_joined':
      case 'member_left':
        return <FaUserPlus className="w-4 h-4" />
      case 'team_locked':
        return <FaLock className="w-4 h-4" />
      case 'submission_completed':
        return <FaTrophy className="w-4 h-4" />
      default:
        return <FaInfoCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="flex justify-center">
      <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-dark-800 rounded-full text-sm text-gray-600 dark:text-gray-400">
        {getIcon()}
        <span>{message.content}</span>
      </div>
    </div>
  )
}