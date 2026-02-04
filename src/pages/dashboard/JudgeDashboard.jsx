import { useState, useEffect } from 'react'
import { FaBalanceScale, FaCheckCircle, FaClock, FaList } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { judgeAPI } from '../../api/judge'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Sidebar from '../../components/layout/Sidebar'

export default function JudgeDashboard() {
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    judgedSubmissions: 0,
    pendingSubmissions: 0,
    averageScore: 0,
  })
  const [recentScores, setRecentScores] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadJudgeData()
  }, [])

  const loadJudgeData = async () => {
    try {
      setIsLoading(true)
      const [scoresRes, unscoredRes] = await Promise.all([
        judgeAPI.getMyScores(),
        judgeAPI.getUnscoredSubmissions(),
      ])
      
      const judgedCount = scoresRes.scores?.length || 0
      const pendingCount = unscoredRes.submissions?.length || 0
      const totalCount = judgedCount + pendingCount
      
      const averageScore = scoresRes.scores?.length
        ? scoresRes.scores.reduce((sum, s) => sum + s.totalScore, 0) / scoresRes.scores.length
        : 0

      setStats({
        totalSubmissions: totalCount,
        judgedSubmissions: judgedCount,
        pendingSubmissions: pendingCount,
        averageScore: averageScore,
      })

      setRecentScores(scoresRes.scores?.slice(0, 5) || [])
    } catch (error) {
      console.error('Failed to load judge data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Submissions',
      value: stats.totalSubmissions,
      icon: <FaList />,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Judged',
      value: stats.judgedSubmissions,
      icon: <FaCheckCircle />,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Pending',
      value: stats.pendingSubmissions,
      icon: <FaClock />,
      color: 'from-yellow-500 to-amber-500',
    },
    {
      title: 'Average Score',
      value: stats.averageScore.toFixed(1),
      icon: <FaBalanceScale />,
      color: 'from-purple-500 to-pink-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
      <div className="section-padding py-8">
        <div className="flex gap-8">
          <Sidebar />
          
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Judge Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Evaluate hackathon submissions and provide scores
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((stat, index) => (
                <Card key={index}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {stat.title}
                      </div>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                      <div className="text-white text-xl">
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Recent Scores</h2>
                  <span className="px-3 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-full text-sm">
                    {recentScores.length} scored
                  </span>
                </div>

                {recentScores.length === 0 ? (
                  <div className="text-center py-8">
                    <FaBalanceScale className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No scores submitted yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentScores.map((score) => (
                      <div key={score._id} className="p-4 bg-gradient-to-r from-gray-500/5 to-gray-600/5 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">
                            {score.submission?.projectName || 'Unknown Project'}
                          </div>
                          <div className="text-lg font-bold">{score.totalScore}/100</div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Team: {score.submission?.team?.name || 'Unknown Team'}
                        </div>
                        {score.comments && (
                          <div className="mt-2 text-sm text-gray-500 dark:text-gray-500 truncate">
                            "{score.comments}"
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              <Card>
                <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
                
                <div className="space-y-4">
                  <Button
                    onClick={() => window.location.href = '/judge/submissions'}
                    className="w-full justify-start"
                    size="lg"
                  >
                    <FaList className="mr-3" />
                    View All Submissions
                  </Button>
                  
                  <Button
                    variant="secondary"
                    className="w-full justify-start"
                    size="lg"
                    onClick={loadJudgeData}
                    loading={isLoading}
                  >
                    <FaBalanceScale className="mr-3" />
                    Refresh Data
                  </Button>

                  <div className="p-4 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 rounded-xl mt-6">
                    <h4 className="font-bold mb-2">Judging Criteria</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li>• Innovation & Creativity (25 pts)</li>
                      <li>• Technical Implementation (25 pts)</li>
                      <li>• Design & UI/UX (25 pts)</li>
                      <li>• Presentation & Demo (25 pts)</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}