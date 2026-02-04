import { useState, useEffect } from 'react'
import { FaTrophy, FaCrown, FaMedal, FaAward, FaSearch } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { usePhase } from '../../hooks/usePhase'
import { resultsAPI } from '../../api/results'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import LeaderboardTable from '../../components/results/LeaderboardTable'
import TeamResultCard from '../../components/results/TeamResultCard'
import PersonalHighlight from '../../components/results/PersonalHighlight'
import Sidebar from '../../components/layout/Sidebar'

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([])
  const [filteredLeaderboard, setFilteredLeaderboard] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [userTeamRank, setUserTeamRank] = useState(null)
  const { isResults } = usePhase()
  const { user } = useSelector((state) => state.auth)
  const { myTeam } = useSelector((state) => state.team)

  useEffect(() => {
    if (isResults) {
      loadLeaderboard()
    }
  }, [isResults])

  useEffect(() => {
    filterLeaderboard()
  }, [searchQuery, leaderboard])

  const loadLeaderboard = async () => {
    try {
      setIsLoading(true)
      const response = await resultsAPI.getLeaderboard()
      setLeaderboard(response.leaderboard || [])
      setFilteredLeaderboard(response.leaderboard || [])
      setUserTeamRank(response.userTeamRank)
    } catch (error) {
      console.error('Failed to load leaderboard:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterLeaderboard = () => {
    if (!searchQuery) {
      setFilteredLeaderboard(leaderboard)
      return
    }

    const filtered = leaderboard.filter(entry =>
      entry.team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.submission?.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredLeaderboard(filtered)
  }

  const getTopThree = () => {
    return leaderboard.slice(0, 3)
  }

  if (!isResults) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
        <div className="section-padding py-8">
          <div className="flex gap-8">
            <Sidebar />
            <div className="flex-1">
              <Card>
                <div className="text-center py-12">
                  <FaTrophy className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
                  <h3 className="text-xl font-bold mb-4">Results Not Published</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    The results have not been published yet. Please wait for the results phase.
                  </p>
                  <Button onClick={() => window.history.back()}>
                    Back to Dashboard
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
      <div className="section-padding py-8">
        <div className="flex gap-8">
          <Sidebar />
          
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Final Results</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Congratulations to all participants! Here are the final rankings.
              </p>
            </div>

            {userTeamRank && (
              <div className="mb-8">
                <PersonalHighlight
                  rank={userTeamRank.rank}
                  averageScore={userTeamRank.averageScore}
                  team={myTeam}
                />
              </div>
            )}

            {getTopThree().length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Top 3 Teams</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {getTopThree().map((entry, index) => {
                    const isUserTeam = userTeamRank?.rank === entry.rank
                    const medals = [
                      { icon: <FaCrown className="w-8 h-8" />, color: 'from-yellow-500 to-amber-500' },
                      { icon: <FaMedal className="w-8 h-8" />, color: 'from-gray-400 to-gray-500' },
                      { icon: <FaMedal className="w-8 h-8" />, color: 'from-amber-700 to-orange-700' },
                    ]
                    
                    return (
                      <div key={entry._id} className={`relative ${index === 0 ? 'md:-mt-4' : ''}`}>
                        {index === 0 && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <div className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full text-sm font-bold">
                              🏆 Champion
                            </div>
                          </div>
                        )}
                        <Card>
                          <div className="text-center">
                            <div className={`w-20 h-20 bg-gradient-to-br ${medals[index].color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                              <div className="text-white text-3xl">
                                {medals[index].icon}
                              </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{entry.team.name}</h3>
                            <div className="text-3xl font-bold mb-2">{entry.averageScore.toFixed(1)}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                              {entry.submission?.projectName}
                            </div>
                            {isUserTeam && (
                              <div className="px-3 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-full text-sm inline-block">
                                Your Team
                              </div>
                            )}
                          </div>
                        </Card>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <Card className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1 max-w-md">
                  <Input
                    placeholder="Search teams or projects..."
                    leftIcon={<FaSearch className="w-4 h-4" />}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  variant="ghost"
                  onClick={loadLeaderboard}
                  loading={isLoading}
                >
                  Refresh
                </Button>
              </div>

              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">Loading leaderboard...</p>
                </div>
              ) : filteredLeaderboard.length === 0 ? (
                <div className="text-center py-12">
                  <FaTrophy className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-xl font-bold mb-4">No Results Found</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {searchQuery
                      ? 'No teams or projects match your search.'
                      : 'No results available yet.'}
                  </p>
                </div>
              ) : (
                <LeaderboardTable
                  leaderboard={filteredLeaderboard}
                  userTeamId={myTeam?._id}
                />
              )}
            </Card>

            {userTeamRank && leaderboard.length > 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Your Team's Result</h2>
                <TeamResultCard
                  entry={leaderboard.find(e => e.rank === userTeamRank.rank)}
                  isHighlighted
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}