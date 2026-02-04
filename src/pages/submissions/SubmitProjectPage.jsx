import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUpload, FaCheckCircle, FaClock } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { usePhase } from '../../hooks/usePhase'
import { submissionAPI } from '../../api/submissions'
import { teamAPI } from '../../api/teams'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import SubmissionForm from '../../components/submissions/SubmissionForm'
import Sidebar from '../../components/layout/Sidebar'

export default function SubmitProjectPage() {
  const [team, setTeam] = useState(null)
  const [submission, setSubmission] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { isSubmission } = usePhase()

  useEffect(() => {
    loadTeamAndSubmission()
  }, [])

  const loadTeamAndSubmission = async () => {
    try {
      setIsLoading(true)
      const teamRes = await teamAPI.getMyTeam()
      setTeam(teamRes.team)
      
      if (teamRes.team?.submission) {
        const submissionRes = await submissionAPI.getSubmission(teamRes.team.submission)
        setSubmission(submissionRes.submission)
      }
    } catch (error) {
      console.error('Failed to load team data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (data) => {
    if (!team?._id) return
    
    try {
      setIsSubmitting(true)
      await submissionAPI.createSubmission(team._id, data)
      navigate('/dashboard')
    } catch (error) {
      console.error('Failed to submit project:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isSubmission) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
        <div className="section-padding py-8">
          <div className="flex gap-8">
            <Sidebar />
            <div className="flex-1">
              <Card>
                <div className="text-center py-12">
                  <FaClock className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
                  <h3 className="text-xl font-bold mb-4">Submission Closed</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Project submission is not currently open. Please wait for the submission phase.
                  </p>
                  <Button onClick={() => navigate('/dashboard')}>
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
                  <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!team) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
        <div className="section-padding py-8">
          <div className="flex gap-8">
            <Sidebar />
            <div className="flex-1">
              <Card>
                <div className="text-center py-12">
                  <FaUpload className="w-16 h-16 text-red-500 mx-auto mb-6" />
                  <h3 className="text-xl font-bold mb-4">No Team Found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    You need to be in a team to submit a project.
                  </p>
                  <Button onClick={() => navigate('/teams')}>
                    Go to Teams
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (submission) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
        <div className="section-padding py-8">
          <div className="flex gap-8">
            <Sidebar />
            <div className="flex-1">
              <Card>
                <div className="text-center py-12">
                  <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                  <h3 className="text-xl font-bold mb-4">Project Already Submitted</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Your team has already submitted the project:
                  </p>
                  <div className="max-w-2xl mx-auto mb-8">
                    <div className="p-6 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl">
                      <h4 className="text-lg font-bold mb-2">{submission.projectName}</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {submission.description}
                      </p>
                      {submission.isLocked && (
                        <div className="mt-4 px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-sm inline-block">
                          Submission Locked
                        </div>
                      )}
                    </div>
                  </div>
                  <Button onClick={() => navigate(`/submissions/${submission._id}`)}>
                    View Submission
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
              <h1 className="text-3xl font-bold mb-2">Submit Project</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Submit your hackathon project for judging
              </p>
            </div>

            <Card>
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                    <FaUpload className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Team: {team.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {team.memberCount} members • {team.projectIdea ? 'Project idea set' : 'No project idea'}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 rounded-xl">
                  <h4 className="font-bold mb-2">Submission Guidelines</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Fill out all required fields accurately</li>
                    <li>• Provide a clear project description</li>
                    <li>• List all technologies used</li>
                    <li>• Include demo and GitHub links if available</li>
                    <li>• Specify your pitch location</li>
                    <li>• Once submitted, your project cannot be modified</li>
                  </ul>
                </div>
              </div>

              <SubmissionForm
                onSubmit={handleSubmit}
                loading={isSubmitting}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}