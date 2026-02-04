import { FaGithub, FaSync, FaUnlink } from 'react-icons/fa'
import Button from '../ui/Button'
import Card from '../ui/Card'

export default function GitHubConnect({ teamId, repo, onConnect, onSync, onDisconnect, isLoading }) {
  if (!repo) {
    return (
      <Card>
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-900/10 to-gray-800/10 rounded-full flex items-center justify-center mb-4">
            <FaGithub className="w-8 h-8 text-gray-600 dark:text-gray-400" />
          </div>
          <h4 className="font-bold text-lg mb-2">Connect GitHub Repository</h4>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Link your GitHub repository to track contributions, commits, and collaboration stats.
          </p>
          <Button
            onClick={onConnect}
            loading={isLoading}
            className="bg-gray-900 hover:bg-black text-white"
          >
            <FaGithub className="w-5 h-5 mr-2" />
            Connect GitHub
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center">
            <FaGithub className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-bold">{repo.repoName}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {repo.owner?.login}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSync}
            loading={isLoading}
          >
            <FaSync className="w-4 h-4 mr-2" />
            Sync
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDisconnect}
            loading={isLoading}
            className="text-red-600 dark:text-red-400"
          >
            <FaUnlink className="w-4 h-4 mr-2" />
            Disconnect
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-xl">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {repo.commitCount}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Commits</div>
        </div>
        <div className="p-4 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 rounded-xl">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {repo.stars}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Stars</div>
        </div>
        <div className="p-4 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-xl">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {repo.forks}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Forks</div>
        </div>
        <div className="p-4 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-xl">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {repo.contributors?.length || 0}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Contributors</div>
        </div>
      </div>

      {repo.language && (
        <div className="mt-6 p-4 bg-gradient-to-br from-gray-500/5 to-gray-600/5 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Primary Language</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {repo.language}
              </div>
            </div>
            <div className="px-3 py-1 bg-gray-100 dark:bg-dark-800 rounded-full text-sm">
              {repo.language}
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}