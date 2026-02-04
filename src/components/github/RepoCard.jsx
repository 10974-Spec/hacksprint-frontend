import { FaStar, FaCodeBranch, FaCircle } from 'react-icons/fa'
import Card from '../ui/Card'

export default function RepoCard({ repo }) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-bold text-lg mb-1">{repo.repoName}</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            {repo.description || 'No description'}
          </p>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <FaStar className="w-4 h-4 text-yellow-500" />
              <span>{repo.stars}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaCodeBranch className="w-4 h-4 text-green-500" />
              <span>{repo.forks}</span>
            </div>
            {repo.language && (
              <div className="flex items-center space-x-1">
                <FaCircle className="w-3 h-3 text-blue-500" />
                <span>{repo.language}</span>
              </div>
            )}
          </div>
        </div>
        
        <a
          href={repo.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg text-sm transition-colors"
        >
          View
        </a>
      </div>
    </Card>
  )
}