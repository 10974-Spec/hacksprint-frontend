import { FaUser, FaStar, FaCode } from 'react-icons/fa'
import Card from '../ui/Card'
import Progress from '../ui/Progress'

export default function ContributorStats({ contributors }) {
  if (!contributors || contributors.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <FaUser className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            No contributor data available
          </p>
        </div>
      </Card>
    )
  }

  const totalContributions = contributors.reduce((sum, c) => sum + c.contributions, 0)
  const sortedContributors = [...contributors].sort((a, b) => b.contributions - a.contributions)

  return (
    <Card>
      <h3 className="text-lg font-bold mb-6">Top Contributors</h3>
      <div className="space-y-4">
        {sortedContributors.slice(0, 5).map((contributor, index) => {
          const percentage = (contributor.contributions / totalContributions) * 100
          
          return (
            <div key={contributor.login} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {contributor.login.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">{contributor.login}</div>
                    <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <FaCode className="w-3 h-3" />
                        <span>{contributor.contributions} commits</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-lg font-bold">{Math.round(percentage)}%</div>
              </div>
              <Progress value={contributor.contributions} max={totalContributions} color="primary" />
            </div>
          )
        })}
      </div>
    </Card>
  )
}