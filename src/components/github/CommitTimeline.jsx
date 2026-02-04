import { format } from 'date-fns'
import { FaGitAlt, FaUser } from 'react-icons/fa'
import Card from '../ui/Card'

export default function CommitTimeline({ commits }) {
  if (!commits || commits.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <FaGitAlt className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            No commit data available
          </p>
        </div>
      </Card>
    )
  }

  const recentCommits = commits.slice(0, 10)

  return (
    <Card>
      <h3 className="text-lg font-bold mb-6">Recent Commits</h3>
      <div className="space-y-4">
        {recentCommits.map((commit, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <FaGitAlt className="w-4 h-4 text-white" />
              </div>
              {index < recentCommits.length - 1 && (
                <div className="absolute left-4 top-8 w-0.5 h-8 bg-gradient-to-b from-green-500/50 to-emerald-500/50" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaUser className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{commit.author?.name || 'Unknown'}</span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {format(new Date(commit.date), 'MMM d, HH:mm')}
                </span>
              </div>
              <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
                {commit.message}
              </p>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 font-mono">
                {commit.sha?.substring(0, 8)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}