import { Link } from 'react-router-dom'
import { FaUsers, FaLock, FaCode, FaGithub } from 'react-icons/fa'
import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'
import Card from '../ui/Card'
import Button from '../ui/Button'

export default function TeamCard({ team, currentUserTeamId, onJoinRequest }) {
  const isFull = team.memberCount >= team.maxMembers
  const isLocked = team.isLocked
  const isUserInTeam = currentUserTeamId === team._id
  
  const canJoin = !isFull && !isLocked && !isUserInTeam && !team.hasPendingRequest

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-4 right-4 flex space-x-2">
        {isLocked && <Badge variant="warning" size="sm"><FaLock className="w-3 h-3" /> Locked</Badge>}
        {isFull && <Badge variant="danger" size="sm">Full</Badge>}
        {team.githubRepo && <Badge variant="purple" size="sm"><FaGithub className="w-3 h-3" /> GitHub</Badge>}
      </div>

      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {team.image?.url ? (
            <img
              src={team.image.url}
              alt={team.name}
              className="w-16 h-16 rounded-2xl object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">{team.name.charAt(0)}</span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <Link to={`/teams/${team._id}`} className="group">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
                {team.name}
              </h3>
            </Link>
          </div>
          
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
            {team.description}
          </p>
          
          {team.projectIdea && (
            <div className="mt-3 p-3 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 rounded-xl">
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                <span className="font-medium">Project Idea:</span> {team.projectIdea}
              </p>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FaUsers className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {team.memberCount}/{team.maxMembers} members
                </span>
              </div>
              
              {team.language && (
                <div className="flex items-center space-x-2">
                  <FaCode className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {team.language}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {isUserInTeam ? (
                <Badge variant="success" size="sm">Your Team</Badge>
              ) : canJoin ? (
                <Button
                  size="sm"
                  onClick={() => onJoinRequest(team)}
                  disabled={team.hasPendingRequest}
                >
                  {team.hasPendingRequest ? 'Request Sent' : 'Join Team'}
                </Button>
              ) : null}
              
              <Link to={`/teams/${team._id}`}>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}