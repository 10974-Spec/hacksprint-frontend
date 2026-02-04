import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FaGithub, FaUsers, FaLock, FaCode, FaCalendar, FaTrophy } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { teamAPI } from '../../api/teams'
import { githubAPI } from '../../api/github'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import TeamMembers from '../../components/team/TeamMembers'
import TeamStats from '../../components/team/TeamStats'
import GitHubConnect from '../../components/github/GitHubConnect'
import RepoCard from '../../components/github/RepoCard'
import CommitTimeline from '../../components/github/CommitTimeline'
import ContributorStats from '../../components/github/ContributorStats'
import Sidebar from '../../components/layout/Sidebar'

export default function TeamDetailPage() {
  const { teamId } = useParams()
  const navigate = useNavigate()
  const [team, setTeam] = useState(null)
  const [githubRepo, setGithubRepo] = useState(null)
  const [submission, setSubmission] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingRepo, setIsLoadingRepo] = useState(false)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    loadTeamData()
  }, [teamId])

  const loadTeamData = async () => {
    try {
      setIsLoading(true)
      const [teamRes, githubRes] = await Promise.all([
        teamAPI.getTeam(teamId),
        githubAPI.getRepoInfo(teamId).catch(() => ({ repo: null }))
      ])
      
      setTeam(teamRes.team)
      setGithubRepo(githubRes.repo)
      setSubmission(teamRes.team.submission)
    } catch (error) {
      console.error('Failed to load team data:', error)
      navigate('/teams')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGitHubConnect = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/github/oauth/${teamId}`
  }

  const handleGitHubSync = async () => {
    try {
      setIsLoadingRepo(true)
      const response = await githubAPI.syncRepoData(teamId)
      setGithubRepo(response.repo)
    } catch (error) {
      console.error('Failed to sync GitHub data:', error)
    } finally {
      setIsLoadingRepo(false)
    }
  }

  const handleGitHubDisconnect = async () => {
    try {
      await githubAPI.disconnectRepo(teamId)
      setGithubRepo(null)
    } catch (error) {
      console.error('Failed to disconnect GitHub:', error)
    }
  }

  if (isLoading || !team) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
        <div className="section-padding py-8">
          <div className="flex gap-8">
            <Sidebar />
            <div className="flex-1">
              <Card>
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">Loading team data...</p>
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
                    <h1 className="text-3xl font-bold">{team.name}</h1>
                    {team.isLocked && (
                      <span className="px-3 py-1 bg-red-500/10 text-red-600 dark:text-red-400 rounded-full text-sm flex items-center">
                        <FaLock className="w-3 h-3 mr-1" />
                        Locked
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {team.description}
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" onClick={() => navigate(-1)}>
                    Back
                  </Button>
                  {user?.id === team.owner?._id && (
                    <Button>Manage Team</Button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {team.projectIdea && (
                  <Card>
                    <h3 className="text-lg font-bold mb-4">Project Idea</h3>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {team.projectIdea}
                    </p>
                  </Card>
                )}

                <GitHubConnect
                  teamId={teamId}
                  repo={githubRepo}
                  onConnect={handleGitHubConnect}
                  onSync={handleGitHubSync}
                  onDisconnect={handleGitHubDisconnect}
                  isLoading={isLoadingRepo}
                />

                {githubRepo && (
                  <>
                    <RepoCard repo={githubRepo} />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <CommitTimeline commits={githubRepo.lastCommit ? [githubRepo.lastCommit] : []} />
                      <ContributorStats contributors={githubRepo.contributors} />
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-8">
                <TeamStats
                  team={team}
                  submission={submission}
                  githubRepo={githubRepo}
                />

                <TeamMembers members={team.members || []} currentUserId={user?.id} isOwner={user?.id === team.owner?._id} />

                {submission && (
                  <Card>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <FaTrophy className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold">Project Submitted</h4>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {submission.projectName}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => navigate(`/submissions/${submission._id}`)}
                    >
                      View Submission
                    </Button>
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