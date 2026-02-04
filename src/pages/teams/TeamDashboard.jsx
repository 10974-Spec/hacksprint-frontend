import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaUsers, FaEnvelope, FaLock, FaGithub, FaComment } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { usePhase } from '../../hooks/usePhase'
import { fetchMyTeam } from '../../store/slices/teamSlice'
import { teamAPI } from '../../api/teams'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import TeamMembers from '../../components/team/TeamMembers'
import TeamStats from '../../components/team/TeamStats'
import CreateTeamModal from '../../components/team/CreateTeamModal'
import JoinRequestModal from '../../components/team/JoinRequestModal'
import Sidebar from '../../components/layout/Sidebar'

export default function TeamDashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [joinRequests, setJoinRequests] = useState([])
  const [isLoadingRequests, setIsLoadingRequests] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const { myTeam, members, isLoading } = useSelector((state) => state.team)
  const { isTeamFormation } = usePhase()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMyTeam())
    if (myTeam?._id && myTeam?.owner === user?.id) {
      loadJoinRequests()
    }
  }, [dispatch, myTeam?._id, user?.id])

  const loadJoinRequests = async () => {
    try {
      setIsLoadingRequests(true)
      const response = await teamAPI.getJoinRequests(myTeam._id)
      setJoinRequests(response.requests || [])
    } catch (error) {
      console.error('Failed to load join requests:', error)
    } finally {
      setIsLoadingRequests(false)
    }
  }

  const handleJoinRequest = (team) => {
    setSelectedTeam(team)
    setIsJoinModalOpen(true)
  }

  const handleApproveRequest = async (requestId, action) => {
    try {
      await teamAPI.handleJoinRequest(requestId, action)
      loadJoinRequests()
      dispatch(fetchMyTeam())
    } catch (error) {
      console.error('Failed to handle join request:', error)
    }
  }

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
                  <p className="mt-4 text-gray-600 dark:text-gray-400">Loading team data...</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!myTeam) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
        <div className="section-padding py-8">
          <div className="flex gap-8">
            <Sidebar />
            <div className="flex-1">
              {isTeamFormation ? (
                <Card>
                  <div className="text-center py-12">
                    <FaUsers className="w-16 h-16 text-primary-500 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold mb-4">No Team Yet</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                      Join an existing team or create your own to participate in the hackathon.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-8"
                      >
                        <FaPlus className="mr-2" />
                        Create Team
                      </Button>
                      <Link to="/teams/browse">
                        <Button variant="secondary" className="px-8">
                          Browse Teams
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card>
                  <div className="text-center py-12">
                    <FaLock className="w-16 h-16 text-red-500 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold mb-4">Team Formation Closed</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                      The team formation phase has ended. You cannot join or create teams at this time.
                    </p>
                  </div>
                </Card>
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
                  <h1 className="text-3xl font-bold mb-2">{myTeam.name}</h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    {myTeam.description}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  {myTeam.githubRepo && (
                    <Button variant="ghost" size="icon">
                      <FaGithub className="w-5 h-5" />
                    </Button>
                  )}
                  <Link to={`/teams/${myTeam._id}/chat`}>
                    <Button variant="ghost" size="icon">
                      <FaComment className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {myTeam.owner === user?.id && joinRequests.length > 0 && (
                  <Card>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold">Join Requests</h2>
                      <span className="px-3 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-full text-sm">
                        {joinRequests.length} pending
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {joinRequests.map((request) => (
                        <div key={request._id} className="p-4 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 rounded-xl">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{request.user?.name}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                                <FaEnvelope className="w-3 h-3 mr-2" />
                                {request.user?.email}
                              </div>
                              {request.message && (
                                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                  "{request.message}"
                                </div>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                onClick={() => handleApproveRequest(request._id, 'approve')}
                                className="bg-green-500 hover:bg-green-600"
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleApproveRequest(request._id, 'reject')}
                                className="text-red-600 dark:text-red-400"
                              >
                                Reject
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                <TeamMembers members={members} currentUserId={user?.id} isOwner={myTeam.owner === user?.id} />
              </div>

              <div className="space-y-8">
                <TeamStats
                  team={myTeam}
                  submission={myTeam.submission}
                  githubRepo={myTeam.githubRepo}
                />

                <Card>
                  <h3 className="text-lg font-bold mb-4">Team Actions</h3>
                  <div className="space-y-3">
                    <Link to={`/teams/${myTeam._id}/chat`}>
                      <Button variant="secondary" className="w-full justify-start">
                        <FaComment className="mr-3" />
                        Team Chat
                      </Button>
                    </Link>
                    
                    {myTeam.owner === user?.id && (
                      <Button variant="ghost" className="w-full justify-start">
                        <FaUsers className="mr-3" />
                        Manage Team
                      </Button>
                    )}
                    
                    {isTeamFormation && myTeam.owner === user?.id && !myTeam.isLocked && (
                      <Button variant="ghost" className="w-full justify-start">
                        <FaLock className="mr-3" />
                        Lock Team
                      </Button>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

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