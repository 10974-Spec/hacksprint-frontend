import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FaArrowLeft, FaExternalLinkAlt, FaGithub, FaVideo, FaMapMarkerAlt, FaUsers, FaTrophy, FaStar, FaEdit, FaLock } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { submissionAPI } from '../../api/submissions'
import { judgeAPI } from '../../api/judge'
import { resultsAPI } from '../../api/results'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import ScoreDisplay from '../../components/submissions/ScoreDisplay'
import TeamMembers from '../../components/team/TeamMembers'
import Sidebar from '../../components/layout/Sidebar'

export default function SubmissionDetailPage() {
  const { submissionId } = useParams()
  const navigate = useNavigate()
  const [submission, setSubmission] = useState(null)
  const [scores, setScores] = useState([])
  const [averageScore, setAverageScore] = useState(null)
  const [teamMembers, setTeamMembers] = useState([])
  const [leaderboardEntry, setLeaderboardEntry] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useSelector((state) => state.auth)
  const { currentPhase } = useSelector((state) => state.phase)

  useEffect(() => {
    loadSubmissionData()
  }, [submissionId])

  const loadSubmissionData = async () => {
    try {
      setIsLoading(true)
      const [submissionRes, scoresRes] = await Promise.all([
        submissionAPI.getSubmission(submissionId),
        judgeAPI.getSubmissionScores(submissionId)
      ])
      
      setSubmission(submissionRes.submission)
      setScores(scoresRes.scores || [])
      setAverageScore(scoresRes.averageScore)
      
      if (submissionRes.submission?.team) {
        const teamRes = await submissionRes.submission.team
        setTeamMembers(teamRes.members || [])
      }

      if (currentPhase === 'results') {
        try {
          const leaderboardRes = await resultsAPI.getTeamResult(submissionRes.submission.team._id)
          setLeaderboardEntry(leaderboardRes.entry)
        } catch (error) {
          console.log('No leaderboard entry found')
        }
      }
    } catch (error) {
      console.error('Failed to load submission data:', error)
      navigate('/dashboard')
    } finally {
      setIsLoading(false)
    }
  }

  const canEdit = user?.id === submission?.submittedBy?._id && currentPhase === 'submission' && !submission?.isLocked
  const isJudge = user?.role === 'judge'
  const isAdmin = user?.role === 'admin'
  const canScore = isJudge && currentPhase === 'judging' && !scores.some(s => s.judge?._id === user?.id)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
        <div className="section-padding py-8">
          <div className="flex gap-8">
            <Sidebar />
            <div className="flex-1">
              <Card>
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">Loading submission...</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!submission) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
        <div className="section-padding py-8">
          <div className="flex gap-8">
            <Sidebar />
            <div className="flex-1">
              <Card>
                <div className="text-center py-12">
                  <FaTrophy className="w-16 h-16 text-red-500 mx-auto mb-6" />
                  <h3 className="text-xl font-bold mb-4">Submission Not Found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    The submission you're looking for doesn't exist or you don't have access.
                  </p>
                  <Button onClick={() => navigate('/dashboard')}>
                    <FaArrowLeft className="mr-2" />
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
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-4 mb-2">
                    <Button
                      variant="ghost"
                      onClick={() => navigate(-1)}
                      className="mr-2"
                    >
                      <FaArrowLeft className="mr-2" />
                      Back
                    </Button>
                    <h1 className="text-3xl font-bold">{submission.projectName}</h1>
                    {submission.isLocked && (
                      <span className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-sm flex items-center">
                        <FaLock className="w-3 h-3 mr-1" />
                        Submitted
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    By {submission.team?.name} • Submitted on {new Date(submission.submittedAt).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  {canEdit && (
                    <Button
                      onClick={() => navigate(`/submissions/${submission._id}/edit`)}
                    >
                      <FaEdit className="mr-2" />
                      Edit
                    </Button>
                  )}
                  {canScore && (
                    <Button
                      onClick={() => navigate(`/judge/submissions/${submission._id}/score`)}
                      className="bg-purple-500 hover:bg-purple-600"
                    >
                      <FaStar className="mr-2" />
                      Score Project
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card>
                  <h3 className="text-lg font-bold mb-4">Project Description</h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {submission.description}
                  </p>
                </Card>

                <Card>
                  <h3 className="text-lg font-bold mb-4">Technology Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {submission.techStack?.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 text-primary-600 dark:text-primary-400 rounded-lg font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Card>

                <Card>
                  <h3 className="text-lg font-bold mb-6">Project Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {submission.demoLink && (
                      <a
                        href={submission.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-xl hover:from-blue-500/10 hover:to-cyan-500/10 transition-all group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                            <FaExternalLinkAlt className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              Live Demo
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                              {submission.demoLink}
                            </div>
                          </div>
                        </div>
                      </a>
                    )}

                    {submission.githubLink && (
                      <a
                        href={submission.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 bg-gradient-to-r from-gray-900/5 to-gray-800/5 rounded-xl hover:from-gray-900/10 hover:to-gray-800/10 transition-all group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                            <FaGithub className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-bold group-hover:text-gray-900 dark:group-hover:text-gray-100">
                              Source Code
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                              {submission.githubLink}
                            </div>
                          </div>
                        </div>
                      </a>
                    )}

                    <div className="p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                          <FaMapMarkerAlt className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-bold">Pitch Location</div>
                          <div className="text-gray-700 dark:text-gray-300">
                            {submission.pitchLocation}
                          </div>
                        </div>
                      </div>
                    </div>

                    {submission.submissionVideo && (
                      <a
                        href={submission.submissionVideo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 bg-gradient-to-r from-red-500/5 to-pink-500/5 rounded-xl hover:from-red-500/10 hover:to-pink-500/10 transition-all group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                            <FaVideo className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-bold group-hover:text-red-600 dark:group-hover:text-red-400">
                              Video Pitch
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                              {submission.submissionVideo}
                            </div>
                          </div>
                        </div>
                      </a>
                    )}
                  </div>
                </Card>

                {leaderboardEntry && (
                  <Card className="bg-gradient-to-r from-yellow-500/5 to-amber-500/5">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold">Final Result</h3>
                      <div className="flex items-center space-x-2">
                        <FaTrophy className="w-5 h-5 text-yellow-500" />
                        <span className="font-bold text-xl">Rank #{leaderboardEntry.rank}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-white/50 dark:bg-dark-800/50 rounded-xl">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Average Score</div>
                        <div className="text-2xl font-bold">{leaderboardEntry.averageScore.toFixed(1)}</div>
                      </div>
                      <div className="p-4 bg-white/50 dark:bg-dark-800/50 rounded-xl">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Judges</div>
                        <div className="text-2xl font-bold">{scores.length}</div>
                      </div>
                      <div className="p-4 bg-white/50 dark:bg-dark-800/50 rounded-xl">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Total Score</div>
                        <div className="text-2xl font-bold">{(leaderboardEntry.averageScore * scores.length).toFixed(1)}</div>
                      </div>
                      <div className="p-4 bg-white/50 dark:bg-dark-800/50 rounded-xl">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Status</div>
                        <div className={`text-lg font-bold ${leaderboardEntry.isTied ? 'text-purple-600 dark:text-purple-400' : 'text-green-600 dark:text-green-400'}`}>
                          {leaderboardEntry.isTied ? 'Tied' : 'Final'}
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </div>

              <div className="space-y-8">
                <ScoreDisplay scores={scores} averageScore={averageScore} />

                <Card>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                      <FaUsers className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold">Team Members</h4>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {teamMembers.length} members
                      </div>
                    </div>
                  </div>
                  <TeamMembers members={teamMembers} currentUserId={user?.id} />
                </Card>

                <Card>
                  <h4 className="font-bold mb-4">Submission Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Submitted By</span>
                      <span className="font-medium">{submission.submittedBy?.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Submission Date</span>
                      <span>{new Date(submission.submittedAt).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        submission.isLocked
                          ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                          : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
                      }`}>
                        {submission.isLocked ? 'Locked' : 'Editable'}
                      </span>
                    </div>
                    {submission.updatedAt !== submission.submittedAt && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Last Updated</span>
                        <span>{new Date(submission.updatedAt).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </Card>

                {(isAdmin || isJudge) && scores.length > 0 && (
                  <Card>
                    <h4 className="font-bold mb-4">Judge Scores</h4>
                    <div className="space-y-3">
                      {scores.map((score) => (
                        <div key={score._id} className="p-3 bg-gradient-to-r from-gray-500/5 to-gray-600/5 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium">{score.judge?.name}</div>
                            <div className="text-lg font-bold">{score.totalScore}/100</div>
                          </div>
                          {score.comments && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                              "{score.comments}"
                            </p>
                          )}
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            {new Date(score.judgedAt).toLocaleString()}
                            {score.isFinal && ' • Final'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}