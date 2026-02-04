import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FaArrowLeft, FaUsers } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { teamAPI } from '../../api/teams'
import ChatRoom from '../../components/chat/ChatRoom'
import TeamMembers from '../../components/team/TeamMembers'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Sidebar from '../../components/layout/Sidebar'

export default function TeamChatPage() {
  const { teamId } = useParams()
  const [team, setTeam] = useState(null)
  const [members, setMembers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    loadTeamData()
  }, [teamId])

  const loadTeamData = async () => {
    try {
      setIsLoading(true)
      const response = await teamAPI.getTeam(teamId)
      setTeam(response.team)
      setMembers(response.members || [])
    } catch (error) {
      console.error('Failed to load team data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const isMember = members.some(member => member.user?._id === user?.id)

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
                  <p className="mt-4 text-gray-600 dark:text-gray-400">Loading chat...</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!isMember && user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
        <div className="section-padding py-8">
          <div className="flex gap-8">
            <Sidebar />
            <div className="flex-1">
              <Card>
                <div className="text-center py-12">
                  <FaUsers className="w-16 h-16 text-red-500 mx-auto mb-6" />
                  <h3 className="text-xl font-bold mb-4">Access Denied</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    You must be a team member to access the chat.
                  </p>
                  <Button onClick={() => window.history.back()}>
                    <FaArrowLeft className="mr-2" />
                    Go Back
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
                  <h1 className="text-3xl font-bold mb-2">{team?.name} Chat</h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Real-time communication with your team members
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => window.history.back()}
                >
                  <FaArrowLeft className="mr-2" />
                  Back to Team
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ChatRoom teamId={teamId} />
              </div>
              
              <div>
                <TeamMembers members={members} currentUserId={user?.id} isOwner={team?.owner?._id === user?.id} />
                
                <Card className="mt-8">
                  <h3 className="text-lg font-bold mb-4">Chat Guidelines</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Be respectful to all team members</li>
                    <li>• Stay on topic and focus on the project</li>
                    <li>• Share relevant links and resources</li>
                    <li>• Keep discussions professional</li>
                    <li>• Report any issues to the team owner</li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}