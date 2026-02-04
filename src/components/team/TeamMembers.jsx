import { FaCrown, FaUser, FaEnvelope } from 'react-icons/fa'
import Avatar from '../ui/Avatar'
import Card from '../ui/Card'

export default function TeamMembers({ members, isOwner, currentUserId }) {
  const owner = members.find(m => m.role === 'owner')
  const regularMembers = members.filter(m => m.role !== 'owner')

  return (
    <Card>
      <h3 className="text-lg font-bold mb-4">Team Members</h3>
      <div className="space-y-4">
        {owner && (
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-500/5 to-amber-500/5 rounded-xl">
            <div className="flex items-center space-x-3">
              <Avatar src={owner.user?.avatar} alt={owner.user?.name} />
              <div>
                <div className="font-medium flex items-center space-x-2">
                  <span>{owner.user?.name}</span>
                  <FaCrown className="w-4 h-4 text-yellow-500" />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                  <FaEnvelope className="w-3 h-3" />
                  <span>{owner.user?.email}</span>
                </div>
              </div>
            </div>
            <div className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full text-sm font-medium">
              Owner
            </div>
          </div>
        )}

        {regularMembers.map((member) => (
          <div
            key={member._id}
            className={`flex items-center justify-between p-3 rounded-xl ${
              member.user?._id === currentUserId
                ? 'bg-gradient-to-r from-primary-500/5 to-secondary-500/5'
                : 'hover:bg-gray-100/50 dark:hover:bg-dark-800/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Avatar src={member.user?.avatar} alt={member.user?.name} />
              <div>
                <div className="font-medium">
                  {member.user?.name}
                  {member.user?._id === currentUserId && (
                    <span className="ml-2 text-primary-600 dark:text-primary-400 text-sm">(You)</span>
                  )}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                  <FaEnvelope className="w-3 h-3" />
                  <span>{member.user?.email}</span>
                </div>
              </div>
            </div>
            <div className="px-3 py-1 bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
              Member
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}