import { FaTrophy, FaCrown, FaMedal, FaAward, FaStar } from 'react-icons/fa'
import Card from '../ui/Card'

export default function LeaderboardTable({ leaderboard, userTeamId }) {
  const getRankIcon = (rank) => {
    if (rank === 1) {
      return <FaCrown className="w-6 h-6 text-yellow-500" />
    }
    if (rank === 2) {
      return <FaMedal className="w-6 h-6 text-gray-400" />
    }
    if (rank === 3) {
      return <FaMedal className="w-6 h-6 text-amber-700" />
    }
    return <span className="text-lg font-bold">{rank}</span>
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200/50 dark:border-dark-700/50">
              <th className="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Rank</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Team</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Project</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Score</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Judges</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry) => {
              const isUserTeam = userTeamId === entry.team._id
              
              return (
                <tr
                  key={entry._id}
                  className={`border-b border-gray-200/30 dark:border-dark-700/30 last:border-0 ${
                    isUserTeam ? 'bg-gradient-to-r from-primary-500/10 to-secondary-500/10' : 'hover:bg-gray-100/50 dark:hover:bg-dark-800/50'
                  }`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8">
                        {getRankIcon(entry.rank)}
                      </div>
                      {entry.isTied && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">Tied</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      {entry.teamImage?.url ? (
                        <img
                          src={entry.teamImage.url}
                          alt={entry.team.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">
                            {entry.team.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="font-medium flex items-center space-x-2">
                          <span>{entry.team.name}</span>
                          {isUserTeam && (
                            <FaStar className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {entry.scores?.length || 0} judges
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium">{entry.submission?.projectName}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                      {entry.submission?.description}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-2xl font-bold">{entry.averageScore.toFixed(1)}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">/ 100</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex -space-x-2">
                      {entry.scores?.slice(0, 3).map((score, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-dark-900"
                        >
                          {score.judge?.name?.charAt(0) || 'J'}
                        </div>
                      ))}
                      {entry.scores?.length > 3 && (
                        <div className="w-8 h-8 bg-gray-200 dark:bg-dark-800 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 text-xs font-bold border-2 border-white dark:border-dark-900">
                          +{entry.scores.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}