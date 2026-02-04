import { FaTrophy, FaFire, FaChartLine, FaAward } from 'react-icons/fa'
import Card from '../ui/Card'
import Button from '../ui/Button'

export default function PersonalHighlight({ rank, averageScore, team }) {
  const getCelebration = () => {
    if (rank === 1) {
      return {
        title: '🏆 Champion!',
        message: 'Your team won the hackathon!',
        color: 'from-yellow-500/20 to-amber-500/20',
        icon: <FaTrophy className="w-8 h-8 text-yellow-500" />,
      }
    }
    if (rank <= 3) {
      return {
        title: `🥈 Top ${rank}`,
        message: `Your team placed ${getOrdinal(rank)}!`,
        color: 'from-purple-500/20 to-pink-500/20',
        icon: <FaAward className="w-8 h-8 text-purple-500" />,
      }
    }
    if (rank <= 10) {
      return {
        title: '🔥 Top 10!',
        message: 'Outstanding performance!',
        color: 'from-orange-500/20 to-red-500/20',
        icon: <FaFire className="w-8 h-8 text-orange-500" />,
      }
    }
    return {
      title: '🎉 Completed!',
      message: 'Great job completing the hackathon!',
      color: 'from-green-500/20 to-emerald-500/20',
      icon: <FaChartLine className="w-8 h-8 text-green-500" />,
    }
  }

  const getOrdinal = (n) => {
    const s = ['th', 'st', 'nd', 'rd']
    const v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
  }

  const celebration = getCelebration()

  return (
    <Card className={`${celebration.color} border-0`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/50 dark:bg-dark-800/50 rounded-2xl flex items-center justify-center">
            {celebration.icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold">{celebration.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 mt-1">
              {celebration.message}
            </p>
            <div className="flex items-center space-x-4 mt-3">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Rank</div>
                <div className="text-2xl font-bold">#{rank}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
                <div className="text-2xl font-bold">{averageScore.toFixed(1)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Team</div>
                <div className="text-lg font-medium">{team?.name}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hidden md:block">
          <Button variant="primary" size="lg">
            Share Results
          </Button>
        </div>
      </div>
    </Card>
  )
}