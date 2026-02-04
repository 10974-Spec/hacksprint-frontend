import { FaStar } from 'react-icons/fa'
import Card from '../ui/Card'
import Progress from '../ui/Progress'

export default function ScoreDisplay({ scores, averageScore }) {
  const getCriteriaScore = (criteria) => {
    if (!scores || scores.length === 0) return 0
    const total = scores.reduce((sum, score) => sum + score.criteria[criteria], 0)
    return total / scores.length
  }

  return (
    <Card>
      <h3 className="text-lg font-bold mb-6">Judging Scores</h3>
      
      {averageScore !== null && (
        <div className="mb-8 p-6 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average Score</div>
              <div className="text-4xl font-bold mt-2">{averageScore.toFixed(1)}</div>
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`w-8 h-8 ${
                    i < Math.floor(averageScore / 20)
                      ? 'text-yellow-500'
                      : 'text-gray-300 dark:text-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Innovation & Creativity</span>
            <span className="text-gray-600 dark:text-gray-400">
              {getCriteriaScore('innovation').toFixed(1)}/25
            </span>
          </div>
          <Progress value={getCriteriaScore('innovation')} max={25} color="primary" />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Technical Implementation</span>
            <span className="text-gray-600 dark:text-gray-400">
              {getCriteriaScore('functionality').toFixed(1)}/25
            </span>
          </div>
          <Progress value={getCriteriaScore('functionality')} max={25} color="green" />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Design & UI/UX</span>
            <span className="text-gray-600 dark:text-gray-400">
              {getCriteriaScore('design').toFixed(1)}/25
            </span>
          </div>
          <Progress value={getCriteriaScore('design')} max={25} color="purple" />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Presentation & Demo</span>
            <span className="text-gray-600 dark:text-gray-400">
              {getCriteriaScore('presentation').toFixed(1)}/25
            </span>
          </div>
          <Progress value={getCriteriaScore('presentation')} max={25} color="yellow" />
        </div>
      </div>
      
      {scores?.length > 0 && (
        <div className="mt-8 pt-8 border-t border-gray-200/50 dark:border-dark-700/50">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Judged by {scores.length} judge{scores.length > 1 ? 's' : ''}
          </div>
        </div>
      )}
    </Card>
  )
}