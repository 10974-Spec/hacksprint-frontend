import { FaUsers, FaCode, FaStar, FaGitAlt, FaTrophy } from 'react-icons/fa'
import Card from '../ui/Card'
import Progress from '../ui/Progress'

export default function TeamStats({ team, submission, githubRepo }) {
  const memberCount = team?.memberCount || 0
  const maxMembers = team?.maxMembers || 4
  const memberPercentage = (memberCount / maxMembers) * 100

  return (
    <Card>
      <h3 className="text-lg font-bold mb-6">Team Stats</h3>
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <FaUsers className="w-4 h-4 text-primary-500" />
              <span className="font-medium">Team Capacity</span>
            </div>
            <span className="text-gray-600 dark:text-gray-400">
              {memberCount}/{maxMembers}
            </span>
          </div>
          <Progress value={memberCount} max={maxMembers} color="primary" />
        </div>

        {githubRepo && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FaGitAlt className="w-4 h-4 text-purple-500" />
                <span className="font-medium">GitHub Repo</span>
              </div>
              <a
                href={githubRepo.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                View
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-xl">
                <div className="flex items-center space-x-2">
                  <FaStar className="w-4 h-4 text-yellow-500" />
                  <span className="font-bold">{githubRepo.stars}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Stars</div>
              </div>

              <div className="p-3 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-xl">
                <div className="flex items-center space-x-2">
                  <FaCode className="w-4 h-4 text-blue-500" />
                  <span className="font-bold">{githubRepo.commitCount}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Commits</div>
              </div>
            </div>
          </div>
        )}

        {submission && (
          <div className="p-4 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-xl">
            <div className="flex items-center space-x-3">
              <FaTrophy className="w-5 h-5 text-green-500" />
              <div>
                <div className="font-bold">Project Submitted</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {submission.projectName}
                </div>
              </div>
            </div>
          </div>
        )}

        {!submission && !githubRepo && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-500/10 to-gray-600/10 rounded-full flex items-center justify-center mb-4">
              <FaCode className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              Start building your project to see stats here
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}