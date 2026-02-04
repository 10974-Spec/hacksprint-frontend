import { FaTrophy, FaStar, FaAward, FaUsers } from 'react-icons/fa'
import Card from '../ui/Card'
import Badge from '../ui/Badge'

export default function TeamResultCard({ entry, isHighlighted }) {
  const getRankLabel = () => {
    if (entry.rank === 1) return '🏆 Champion'
    if (entry.rank === 2) return '🥈 Runner Up'
    if (entry.rank === 3) return '🥉 Third Place'
    return `Rank #${entry.rank}`
  }

  const getRankColor = () => {
    if (entry.rank === 1) return 'from-yellow-500 to-amber-500'
    if (entry.rank === 2) return 'from-gray-400 to-gray-500'
    if (entry.rank === 3) return 'from-amber-700 to-orange-700'
    return 'from-primary-500 to-secondary-500'
  }

  return (
    <Card className={`relative overflow-hidden ${isHighlighted ? 'ring-2 ring-primary-500 ring-offset-2' : ''}`}>
      {isHighlighted && (
        <div className="absolute top-4 right-4">
          <Badge variant="success" size="sm">
            <FaStar className="w-3 h-3 mr-1" />
            Your Team
          </Badge>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className={`w-16 h-16 bg-gradient-to-br ${getRankColor()} rounded-2xl flex items-center justify-center`}>
            <FaTrophy className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold">{getRankLabel()}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Score: {entry.averageScore.toFixed(1)}/100
            </div>
          </div>
        </div>
        
        {entry.isTied && (
          <Badge variant="warning" size="lg">
            <FaAward className="w-4 h-4 mr-2" />
            Tied Position
          </Badge>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-bold text-lg mb-2">{entry.team.name}</h4>
          <p className="text-gray-600 dark:text-gray-400">
            {entry.submission?.description}
          </p>
          
          <div className="mt-4 flex items-center space-x-2">
            <FaUsers className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {entry.scores?.length || 0} judges reviewed
            </span>
          </div>
        </div>
        
        <div>
          <h5 className="font-bold mb-3">Criteria Scores</h5>
          <div className="space-y-2">
            {entry.scores?.[0]?.criteria && Object.entries(entry.scores[0].criteria).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {key}
                </span>
                <span className="font-medium">{value}/25</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {entry.submission?.techStack && (
        <div className="mt-6 pt-6 border-t border-gray-200/50 dark:border-dark-700/50">
          <h5 className="font-bold mb-2">Technology Stack</h5>
          <div className="flex flex-wrap gap-2">
            {entry.submission.techStack.map((tech, index) => (
              <Badge key={index} variant="default" size="sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}