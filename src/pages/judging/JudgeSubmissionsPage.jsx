import { useState, useEffect } from 'react'
import { FaFilter, FaSearch, FaBalanceScale } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { usePhase } from '../../hooks/usePhase'
import { judgeAPI } from '../../api/judge'
import { submissionAPI } from '../../api/submissions'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import SubmissionList from '../../components/judge/SubmissionList'
import Sidebar from '../../components/layout/Sidebar'

export default function JudgeSubmissionsPage() {
  const [submissions, setSubmissions] = useState([])
  const [filteredSubmissions, setFilteredSubmissions] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterScored, setFilterScored] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const { isJudging } = usePhase()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isJudging) {
      loadSubmissions()
    }
  }, [isJudging])

  useEffect(() => {
    filterSubmissions()
  }, [searchQuery, filterScored, submissions])

  const loadSubmissions = async () => {
    try {
      setIsLoading(true)
      const [allSubmissions, myScores] = await Promise.all([
        submissionAPI.getAllSubmissions(),
        judgeAPI.getMyScores(),
      ])
      
      const scoredIds = new Set(myScores.scores?.map(s => s.submission?._id) || [])
      
      const submissionsWithStatus = allSubmissions.submissions?.map(sub => ({
        ...sub,
        isScored: scoredIds.has(sub._id),
        myScore: myScores.scores?.find(s => s.submission?._id === sub._id),
      })) || []
      
      setSubmissions(submissionsWithStatus)
      setFilteredSubmissions(submissionsWithStatus)
    } catch (error) {
      console.error('Failed to load submissions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterSubmissions = () => {
    let filtered = submissions

    if (searchQuery) {
      filtered = filtered.filter(sub =>
        sub.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.team?.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (filterScored === 'scored') {
      filtered = filtered.filter(sub => sub.isScored)
    } else if (filterScored === 'unscored') {
      filtered = filtered.filter(sub => !sub.isScored)
    }

    setFilteredSubmissions(filtered)
  }

  const handleScoreSubmit = async (submissionId, scoreData) => {
    try {
      await judgeAPI.submitScore(submissionId, scoreData)
      loadSubmissions()
    } catch (error) {
      console.error('Failed to submit score:', error)
      throw error
    }
  }

  if (!isJudging) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
        <div className="section-padding py-8">
          <div className="flex gap-8">
            <Sidebar />
            <div className="flex-1">
              <Card>
                <div className="text-center py-12">
                  <FaBalanceScale className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
                  <h3 className="text-xl font-bold mb-4">Judging Not Active</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    The judging phase is not currently active. Please wait for the judging phase to begin.
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
              <h1 className="text-3xl font-bold mb-2">Judge Submissions</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Evaluate hackathon projects and provide scores
              </p>
            </div>

            <Card className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Input
                    placeholder="Search submissions by project name, description, or team..."
                    leftIcon={<FaSearch className="w-4 h-4" />}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div>
                  <select
                    value={filterScored}
                    onChange={(e) => setFilterScored(e.target.value)}
                    className="input-field"
                  >
                    <option value="all">All Submissions</option>
                    <option value="unscored">Unscored Only</option>
                    <option value="scored">Scored Only</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <FaBalanceScale className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {filteredSubmissions.length} submissions
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {submissions.filter(s => s.isScored).length} scored •{' '}
                    {submissions.filter(s => !s.isScored).length} remaining
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={loadSubmissions}
                  loading={isLoading}
                >
                  <FaFilter className="mr-2" />
                  Refresh
                </Button>
              </div>
            </Card>

            {isLoading ? (
              <Card>
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">Loading submissions...</p>
                </div>
              </Card>
            ) : filteredSubmissions.length === 0 ? (
              <Card>
                <div className="text-center py-12">
                  <FaBalanceScale className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-xl font-bold mb-4">No Submissions Found</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {searchQuery || filterScored !== 'all'
                      ? 'No submissions match your search criteria.'
                      : 'No submissions available for judging.'}
                  </p>
                </div>
              </Card>
            ) : (
              <SubmissionList
                submissions={filteredSubmissions}
                onScoreSubmit={handleScoreSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}