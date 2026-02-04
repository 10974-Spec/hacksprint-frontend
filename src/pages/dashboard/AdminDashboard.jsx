import { useState, useEffect } from 'react'
import { 
  FaUsers, 
  FaCheckCircle, 
  FaClock, 
  FaTrophy, 
  FaLock, 
  FaExchangeAlt,
  FaRedo,
  FaUserCheck,
  FaFileAlt
} from 'react-icons/fa'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { useSelector, useDispatch } from 'react-redux'
import { adminAPI } from '../../api/admin'
import { fetchCurrentPhase, transitionPhase } from '../../store/slices/phaseSlice'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Sidebar from '../../components/layout/Sidebar'
import { useToast } from '../../components/ui/MinimalToast'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    approvedDevelopers: 0,
    pendingDevelopers: 0,
    totalTeams: 0,
    lockedTeams: 0,
    totalSubmissions: 0,
  })
  const [pendingDevelopers, setPendingDevelopers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLockingTeams, setIsLockingTeams] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isForcingPhase, setIsForcingPhase] = useState(false)
  
  const { currentPhase = 'registration', isLoading: phaseLoading } = useSelector((state) => state.phase || {})
  const dispatch = useDispatch()
  const toast = useToast()

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setIsLoading(true)
      
      const [statsRes, pendingRes] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getPendingDevelopers(),
      ])
      
      setStats({
        totalUsers: statsRes?.data?.stats?.totalUsers || 0,
        approvedDevelopers: statsRes?.data?.stats?.approvedDevelopers || 0,
        pendingDevelopers: statsRes?.data?.stats?.pendingDevelopers || 0,
        totalTeams: statsRes?.data?.stats?.totalTeams || 0,
        lockedTeams: statsRes?.data?.stats?.lockedTeams || 0,
        totalSubmissions: statsRes?.data?.stats?.totalSubmissions || 0,
      })
      
      setPendingDevelopers(pendingRes?.data?.users || [])
      
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
      toast.error(error.response?.data?.error || 'Failed to load data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleApproveDeveloper = async (userId, status) => {
    try {
      await adminAPI.approveDeveloper(userId, status)
      toast.success(`Developer ${status} successfully`)
      loadDashboardData()
    } catch (error) {
      toast.error(error.response?.data?.error || `Failed to ${status} developer`)
    }
  }

  const handleLockTeams = async () => {
    if (!confirm('Lock all teams? This cannot be undone.')) return
    
    try {
      setIsLockingTeams(true)
      await adminAPI.lockTeams()
      toast.success('All teams locked')
      dispatch(fetchCurrentPhase())
      loadDashboardData()
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to lock teams')
    } finally {
      setIsLockingTeams(false)
    }
  }

  const handlePhaseTransition = async (phase) => {
    if (!phase) return
    
    if (!confirm(`Transition to ${phase.replace('_', ' ')} phase?`)) return
    
    try {
      setIsTransitioning(true)
      await dispatch(transitionPhase(phase)).unwrap()
      toast.success(`Phase transitioned to ${phase.replace('_', ' ')}`)
      loadDashboardData()
    } catch (error) {
      toast.error(error.message || 'Failed to transition phase')
    } finally {
      setIsTransitioning(false)
    }
  }

  const handleForcePhase = async (phase) => {
    if (!phase) return
    
    if (!confirm(`Force set phase to ${phase.replace('_', ' ')}?`)) return
    
    try {
      setIsForcingPhase(true)
      await adminAPI.forcePhase(phase)
      toast.success(`Phase forced to ${phase.replace('_', ' ')}`)
      dispatch(fetchCurrentPhase())
      loadDashboardData()
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to force phase')
    } finally {
      setIsForcingPhase(false)
    }
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <FaUsers className="w-5 h-5" />,
    },
    {
      title: 'Approved Developers',
      value: stats.approvedDevelopers,
      icon: <FaUserCheck className="w-5 h-5" />,
    },
    {
      title: 'Pending',
      value: stats.pendingDevelopers,
      icon: <FaClock className="w-5 h-5" />,
    },
    {
      title: 'Total Teams',
      value: stats.totalTeams,
      icon: <HiOutlineUserGroup className="w-5 h-5" />,
    },
    {
      title: 'Locked Teams',
      value: stats.lockedTeams,
      icon: <FaLock className="w-5 h-5" />,
    },
    {
      title: 'Submissions',
      value: stats.totalSubmissions,
      icon: <FaFileAlt className="w-5 h-5" />,
    },
  ]

  const phaseOptions = {
    registration: { next: 'team_formation', label: 'Registration' },
    team_formation: { next: 'hackathon_live', label: 'Team Formation' },
    hackathon_live: { next: 'submission', label: 'Hackathon Live' },
    submission: { next: 'judging', label: 'Submission' },
    judging: { next: 'results', label: 'Judging' },
    results: { next: null, label: 'Results' },
  }

  const currentPhaseData = phaseOptions[currentPhase] || phaseOptions.registration
  const nextPhase = currentPhaseData?.next

  const allPhases = [
    { value: 'registration', label: 'Registration' },
    { value: 'team_formation', label: 'Team Formation' },
    { value: 'hackathon_live', label: 'Hackathon Live' },
    { value: 'submission', label: 'Submission' },
    { value: 'judging', label: 'Judging' },
    { value: 'results', label: 'Results' },
  ]

  if (isLoading || phaseLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin border-2 border-gray-300 border-t-gray-600 h-8 w-8"></div>
            <span className="ml-3 text-gray-500">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <Sidebar />
          
          <div className="flex-1">
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-500">Manage hackathon participants and timeline</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {statCards.map((stat, index) => (
                <Card key={index} className="p-5 border border-black rounded-none shadow-none hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-2xl font-semibold text-gray-900 mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-500">{stat.title}</div>
                    </div>
                    <div className="p-3">
                      <div className="text-gray-900">{stat.icon}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pending Approvals */}
              <Card className="p-6 border border-black rounded-none shadow-none">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Pending Approvals</h2>
                  <span className="px-3 py-1 border border-black text-gray-900 text-sm font-medium">
                    {pendingDevelopers.length} pending
                  </span>
                </div>

                {pendingDevelopers.length === 0 ? (
                  <div className="text-center py-8 border border-gray-200">
                    <FaCheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">All developers have been processed</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {pendingDevelopers.map((dev) => (
                      <div key={dev._id} className="flex items-center justify-between p-4 border border-black hover:bg-gray-50 transition-colors">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate mb-1">
                            {dev.name || 'Unknown User'}
                          </div>
                          <div className="text-sm text-gray-500 truncate mb-2">
                            {dev.email || 'No email'}
                          </div>
                          {dev.projectIdea && (
                            <div className="text-xs text-gray-400 italic truncate">
                              "{dev.projectIdea}"
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button
                            size="sm"
                            onClick={() => handleApproveDeveloper(dev._id, 'approved')}
                            className="border border-black text-gray-900 hover:bg-gray-100 rounded-none"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleApproveDeveloper(dev._id, 'rejected')}
                            className="text-gray-900 hover:bg-gray-100 border border-black rounded-none"
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* Event Control */}
              <Card className="p-6 border border-black rounded-none shadow-none">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Event Control</h2>
                
                <div className="space-y-6">
                  {/* Current Phase */}
                  <div className="p-4 border border-black">
                    <div className="text-sm text-gray-500 mb-2">Current Phase</div>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold text-gray-900 capitalize">
                        {currentPhase?.replace('_', ' ') || 'registration'}
                      </div>
                      <div className="px-3 py-1 text-sm font-medium border border-black text-gray-900">
                        Active
                      </div>
                    </div>
                  </div>

                  {/* Phase Transition */}
                  {nextPhase && currentPhase !== nextPhase && (
                    <div>
                      <div className="text-sm text-gray-500 mb-3">Advance to next phase</div>
                      <Button
                        onClick={() => handlePhaseTransition(nextPhase)}
                        className="w-full justify-center border border-black rounded-none"
                        loading={isTransitioning}
                        disabled={isTransitioning}
                      >
                        <FaExchangeAlt className="mr-2" />
                        Transition to {allPhases.find(p => p.value === nextPhase)?.label}
                      </Button>
                    </div>
                  )}

                  {/* Force Phase Control */}
                  <div className="pt-6 border-t border-black">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm font-medium text-gray-900">Force Phase Change</div>
                      <span className="text-xs text-gray-900 border border-black px-2 py-1">
                        Admin Override
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {allPhases.map((phase) => (
                        <button
                          key={phase.value}
                          onClick={() => handleForcePhase(phase.value)}
                          className={`px-3 py-2 text-sm border border-black ${
                            currentPhase === phase.value 
                              ? 'bg-gray-900 text-white border-gray-900' 
                              : 'text-gray-700 hover:bg-gray-100'
                          } disabled:opacity-50 rounded-none`}
                          disabled={isForcingPhase}
                        >
                          {phase.label}
                        </button>
                      ))}
                    </div>
                    
                    <p className="text-xs text-gray-500">
                      Bypasses all validation rules. Use only when necessary.
                    </p>
                  </div>

                  {/* Team Locking */}
                  {currentPhase === 'team_formation' && (
                    <div className="pt-6 border-t border-black">
                      <div className="text-sm text-gray-500 mb-3">Team Management</div>
                      <Button
                        onClick={handleLockTeams}
                        variant="ghost"
                        className="w-full justify-center border border-black hover:bg-gray-100 rounded-none"
                        loading={isLockingTeams}
                        disabled={isLockingTeams}
                      >
                        <FaLock className="mr-2" />
                        {isLockingTeams ? 'Locking...' : 'Lock All Teams'}
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Footer Actions */}
            <div className="mt-10 pt-6 border-t border-black">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Phase: <span className="font-medium text-gray-700 capitalize">
                    {currentPhase?.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      localStorage.clear()
                      window.location.reload()
                    }}
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-gray-900 border border-black rounded-none"
                  >
                    Clear & Reload
                  </Button>
                  <Button
                    onClick={loadDashboardData}
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 border border-black rounded-none"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin border-2 border-gray-300 border-t-gray-600 h-4 w-4"></div>
                        Refreshing...
                      </>
                    ) : (
                      <>
                        <FaRedo className="w-3 h-3" />
                        Refresh
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}