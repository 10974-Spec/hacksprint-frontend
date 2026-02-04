import { useState, useEffect } from 'react'
import { FaUser, FaEnvelope, FaUsers, FaTrophy, FaBell, FaEdit } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { userAPI } from '../../api/user'
import { teamAPI } from '../../api/teams'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Sidebar from '../../components/layout/Sidebar'

export default function ProfilePage() {
  const [profile, setProfile] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [team, setTeam] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    loadProfileData()
  }, [])

  const loadProfileData = async () => {
    try {
      setIsLoading(true)
      const [profileRes, notificationsRes] = await Promise.all([
        userAPI.getProfile(),
        userAPI.getNotifications({ limit: 10 }),
      ])
      
      setProfile(profileRes.user)
      setNotifications(notificationsRes.notifications || [])
      
      if (profileRes.user.team) {
        const teamRes = await teamAPI.getTeam(profileRes.user.team._id)
        setTeam(teamRes.team)
      }
    } catch (error) {
      console.error('Failed to load profile data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const updates = {
      name: formData.get('name'),
      projectIdea: formData.get('projectIdea'),
    }

    try {
      setIsUpdating(true)
      const response = await userAPI.updateProfile(updates)
      setProfile(response.user)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update profile:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const markNotificationAsRead = async (notificationId) => {
    try {
      await userAPI.markNotificationAsRead(notificationId)
      setNotifications(notifications.map(n => 
        n._id === notificationId ? { ...n, isRead: true } : n
      ))
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-8">
            <Sidebar />
            <div className="flex-1">
              <Card className="border border-black rounded-none">
                <div className="text-center py-12">
                  <div className="animate-spin border-2 border-gray-300 border-t-gray-900 h-12 w-12 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
              </Card>
            </div>
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
            <div className="mb-8">
              <div className="flex items-center justify-between border-b border-black pb-4">
                <div>
                  <h1 className="text-3xl font-semibold text-gray-900 mb-2">Your Profile</h1>
                  <p className="text-gray-500">
                    Manage your account and view your activity
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setIsEditing(!isEditing)}
                  className="border border-black rounded-none"
                >
                  <FaEdit className="mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="border border-black rounded-none p-6">
                  <div className="flex items-center space-x-6 mb-8">
                    <div className="w-24 h-24 bg-gray-900 flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">
                        {profile?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900">{profile?.name}</h2>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <FaEnvelope className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{profile?.email}</span>
                        </div>
                        <div className="border border-black px-3 py-1 text-sm capitalize text-gray-900">
                          {profile?.role}
                        </div>
                      </div>
                    </div>
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                      <Input
                        label="Full Name"
                        name="name"
                        defaultValue={profile?.name}
                        required
                        className="border border-black rounded-none"
                      />
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-900">
                          Project Idea
                        </label>
                        <textarea
                          name="projectIdea"
                          defaultValue={profile?.projectIdea}
                          className="w-full px-3 py-2 border border-black focus:outline-none focus:ring-0"
                          placeholder="Share your project idea..."
                          rows="4"
                        />
                      </div>

                      <div className="flex justify-end space-x-3">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setIsEditing(false)}
                          className="border border-black rounded-none"
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit" 
                          loading={isUpdating}
                          className="border border-black rounded-none bg-gray-900 text-white hover:bg-gray-800"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      {profile?.projectIdea && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Project Idea</h4>
                          <p className="text-gray-700 whitespace-pre-line border border-gray-200 p-4">
                            {profile.projectIdea}
                          </p>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 border border-black">
                          <div className="text-sm text-gray-500">Account Status</div>
                          <div className="font-semibold text-gray-900 capitalize mt-1">
                            {profile?.approvalStatus}
                          </div>
                        </div>
                        <div className="p-4 border border-black">
                          <div className="text-sm text-gray-500">Member Since</div>
                          <div className="font-semibold text-gray-900 mt-1">
                            {new Date(profile?.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>

                <Card className="border border-black rounded-none p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Recent Notifications</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => userAPI.markAllNotificationsAsRead()}
                      className="border border-black rounded-none text-sm"
                    >
                      Mark All as Read
                    </Button>
                  </div>

                  {notifications.length === 0 ? (
                    <div className="text-center py-8 border border-gray-200">
                      <FaBell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No notifications</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div
                          key={notification._id}
                          className={`p-4 border ${
                            notification.isRead
                              ? 'border-gray-200'
                              : 'border-black'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">{notification.title}</div>
                              <p className="text-sm text-gray-600 mt-1">
                                {notification.message}
                              </p>
                            </div>
                            {!notification.isRead && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => markNotificationAsRead(notification._id)}
                                className="border border-black rounded-none text-sm"
                              >
                                Mark Read
                              </Button>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 mt-2">
                            {new Date(notification.createdAt).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>

              <div className="space-y-6">
                {team && (
                  <Card className="border border-black rounded-none p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gray-900 flex items-center justify-center">
                        <FaUsers className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Your Team</h4>
                        <div className="text-sm text-gray-600">
                          {team.name}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600">Members</span>
                        <span className="font-medium text-gray-900">{team.memberCount}/{team.maxMembers}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Project Status</span>
                        <span className={`px-3 py-1 border border-black text-xs ${
                          team.submission
                            ? 'text-gray-900'
                            : 'text-gray-900'
                        }`}>
                          {team.submission ? 'Submitted' : 'In Progress'}
                        </span>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      className="w-full border border-black rounded-none hover:bg-gray-100"
                      onClick={() => window.location.href = `/teams/${team._id}`}
                    >
                      View Team
                    </Button>
                  </Card>
                )}

                <Card className="border border-black rounded-none p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Account Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="text-sm text-gray-600">User ID</span>
                      <span className="font-mono text-xs text-gray-900">{user?.id?.substring(0, 8)}...</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="text-sm text-gray-600">Role</span>
                      <span className="capitalize text-gray-900">{user?.role}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="text-sm text-gray-600">Approval Status</span>
                      <span className="capitalize text-gray-900">{user?.approvalStatus}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Login</span>
                      <span className="text-gray-900">
                        {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}