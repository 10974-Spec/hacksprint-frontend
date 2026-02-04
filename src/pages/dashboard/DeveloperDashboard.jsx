import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaUsers, FaCode, FaTrophy, FaClock, FaPlus, FaSearch } from 'react-icons/fa'
import { MdOutlinePendingActions } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMyTeam } from '../../store/slices/teamSlice'
import { teamAPI } from '../../api/teams'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import TeamCard from '../../components/team/TeamCard'
import CreateTeamModal from '../../components/team/CreateTeamModal'
import JoinRequestModal from '../../components/team/JoinRequestModal'
import Sidebar from '../../components/layout/Sidebar'
import { useToast } from '../../components/ui/MinimalToast' // Changed import

export default function DeveloperDashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [availableTeams, setAvailableTeams] = useState([])
  const [isLoadingTeams, setIsLoadingTeams] = useState(false)
  const [phaseError, setPhaseError] = useState(null)
  
  const { user } = useSelector((state) => state.auth)
  const { myTeam, isLoading: teamLoading } = useSelector((state) => state.team)
  const { currentPhase, isLoading: phaseLoading } = useSelector((state) => state.phase)
  
  const dispatch = useDispatch()
  const toast = useToast() // Use new toast

  useEffect(() => {
    dispatch(fetchMyTeam())
    
    if (currentPhase === 'team_formation' && !myTeam) {
      loadAvailableTeams()
    }
    
    if (currentPhase && currentPhase !== 'team_formation' && !myTeam) {
      setPhaseError(`Team formation is currently ${currentPhase.replace('_', ' ').toLowerCase()}. You cannot create or join teams.`)
    } else {
      setPhaseError(null)
    }
  }, [dispatch, currentPhase, myTeam, user])

  const loadAvailableTeams = async () => {
    try {
      setIsLoadingTeams(true)
      const response = await teamAPI.getAllTeams()
      setAvailableTeams(response.teams || [])
    } catch (error) {
      console.error('Failed to load teams:', error)
      toast.error('Failed to load available teams')
    } finally {
      setIsLoadingTeams(false)
    }
  }

  const handleJoinRequest = (team) => {
    setSelectedTeam(team)
    setIsJoinModalOpen(true)
  }

  const getDashboardStats = () => {
    const stats = []

    if (myTeam) {
      stats.push(
        {
          title: 'Team Members',
          value: `${myTeam.memberCount || 1}/${myTeam.maxMembers || 4}`,
          icon: <FaUsers className="w-5 h-5" />,
        },
        {
          title: 'Project Status',
          value: myTeam.submission ? 'Submitted' : 'In Progress',
          icon: <FaCode className="w-5 h-5" />,
        }
      )
    }

    if (currentPhase === 'results' && myTeam?.submission) {
      stats.push({
        title: 'Final Rank',
        value: 'Loading...',
        icon: <FaTrophy className="w-5 h-5" />,
      })
    }

    return stats
  }

  if (phaseLoading || teamLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin border-2 border-gray-300 border-t-gray-900 h-8 w-8"></div>
            <span className="ml-3 text-gray-500">Loading dashboard...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1">
          <div className="px-8 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Developer Dashboard</h1>
              <p className="text-gray-500">
                {user?.approvalStatus === 'approved'
                  ? 'Build amazing projects with your team'
                  : 'Your account is pending admin approval'}
              </p>
            </div>

            {/* Phase Info */}
            {currentPhase && (
              <div className="mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500"></div>
                  <span className="text-gray-600">Phase:</span>
                  <span className="font-medium text-gray-900">
                    {currentPhase.replace('_', ' ')}
                  </span>
                </div>
              </div>
            )}

            {user?.approvalStatus !== 'approved' ? (
              <Card className="p-8">
                <div className="text-center">
                  <MdOutlinePendingActions className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Awaiting Approval</h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-6">
                    Your account is pending admin approval. You'll be able to join teams and participate
                    in the hackathon once approved.
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200">
                    <div className="w-2 h-2 bg-yellow-500"></div>
                    <span className="font-medium text-yellow-700">Status: Pending</span>
                  </div>
                </div>
              </Card>
            ) : (
              <>
                {phaseError && (
                  <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-500"></div>
                      <p className="text-yellow-700 text-sm">{phaseError}</p>
                    </div>
                  </div>
                )}

                {getDashboardStats().length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {getDashboardStats().map((stat, index) => (
                      <Card key={index} className="p-5 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xl font-semibold text-gray-900 mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-500">{stat.title}</div>
                          </div>
                          <div className="text-gray-400 hover:text-gray-900 transition-colors">
                            {stat.icon}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {myTeam ? (
                  <div className="space-y-6">
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900">Your Team</h2>
                          <p className="text-gray-500">
                            {myTeam.name} • {myTeam.memberCount || 1} members
                          </p>
                        </div>
                        <Link to={`/teams/${myTeam._id}`}>
                          <Button>View Team</Button>
                        </Link>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                          <h3 className="font-medium text-gray-900 mb-3">Quick Actions</h3>
                          <div className="grid grid-cols-2 gap-3">
                            <Link to={`/teams/${myTeam._id}/chat`}>
                              <Button variant="secondary" className="w-full">
                                Team Chat
                              </Button>
                            </Link>
                            {(currentPhase === 'submission' || currentPhase === 'hackathon_live') && !myTeam.submission && (
                              <Link to="/submit-project">
                                <Button className="w-full">
                                  Submit Project
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>
                        
                        <div className="p-4 bg-gray-50 border border-gray-200">
                          <h4 className="font-medium text-gray-900 mb-3">Project Status</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Team Formed</span>
                              <div className="w-2 h-2 bg-green-500"></div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">GitHub Linked</span>
                              <div className={`w-2 h-2 ${myTeam.githubRepo ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Project Submitted</span>
                              <div className={`w-2 h-2 ${myTeam.submission ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {currentPhase === 'team_formation' && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-lg font-semibold text-gray-900">Available Teams</h2>
                          <Button
                            variant="ghost"
                            onClick={loadAvailableTeams}
                            loading={isLoadingTeams}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <FaSearch className="mr-2" />
                            Refresh
                          </Button>
                        </div>
                        
                        {availableTeams.length === 0 ? (
                          <Card className="p-8">
                            <div className="text-center">
                              <FaUsers className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-500">No teams available to join</p>
                            </div>
                          </Card>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {availableTeams.slice(0, 4).map((team) => (
                              <TeamCard
                                key={team._id}
                                team={team}
                                currentUserTeamId={myTeam._id}
                                onJoinRequest={handleJoinRequest}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : currentPhase === 'team_formation' ? (
                  <Card className="p-8">
                    <div className="text-center">
                      <FaUsers className="w-12 h-12 text-gray-900 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Join or Create a Team</h3>
                      <p className="text-gray-600 max-w-md mx-auto mb-6">
                        You need to be in a team to participate in the hackathon.
                        Join an existing team or create your own.
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Button
                          onClick={() => setIsCreateModalOpen(true)}
                          className="px-6"
                        >
                          <FaPlus className="mr-2" />
                          Create Team
                        </Button>
                        <Button
                          onClick={() => loadAvailableTeams()}
                          variant="secondary"
                          className="px-6"
                        >
                          <FaSearch className="mr-2" />
                          Browse Teams
                        </Button>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card className="p-8">
                    <div className="text-center">
                      <FaClock className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Team Formation Closed</h3>
                      <p className="text-gray-600 max-w-md mx-auto mb-4">
                        Team formation phase has ended. You cannot join or create teams at this time.
                      </p>
                      <div className="inline-flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-2 h-2 bg-red-500"></div>
                        Current Phase: {currentPhase?.replace('_', ' ').toUpperCase()}
                      </div>
                    </div>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <CreateTeamModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          setIsCreateModalOpen(false)
          dispatch(fetchMyTeam())
        }}
      />

      <JoinRequestModal
        isOpen={isJoinModalOpen}
        onClose={() => {
          setIsJoinModalOpen(false)
          setSelectedTeam(null)
        }}
        team={selectedTeam}
      />
    </div>
  )
}