import { useSelector } from 'react-redux'
import { FaInfoCircle, FaLock, FaTrophy, FaCode, FaUsers, FaUpload } from 'react-icons/fa'

export default function PhaseBanner() {
  const { currentPhase } = useSelector((state) => state.phase)

  const getPhaseConfig = () => {
    const configs = {
      registration: {
        title: 'Registration Open',
        description: 'Sign up now to participate in the hackathon. Registration will close soon!',
        icon: <FaInfoCircle />,
        color: 'bg-blue-500/20 border-blue-500/30',
        textColor: 'text-blue-600 dark:text-blue-400',
      },
      team_formation: {
        title: 'Team Formation Live',
        description: 'Create or join a team. You can have up to 4 members.',
        icon: <FaUsers />,
        color: 'bg-green-500/20 border-green-500/30',
        textColor: 'text-green-600 dark:text-green-400',
      },
      hackathon_live: {
        title: 'Hackathon Live!',
        description: 'Teams are locked. Start building your amazing projects!',
        icon: <FaLock />,
        color: 'bg-purple-500/20 border-purple-500/30',
        textColor: 'text-purple-600 dark:text-purple-400',
      },
      submission: {
        title: 'Submission Phase',
        description: 'Submit your projects before the deadline. Make sure everything is perfect!',
        icon: <FaUpload />,
        color: 'bg-yellow-500/20 border-yellow-500/30',
        textColor: 'text-yellow-600 dark:text-yellow-400',
      },
      judging: {
        title: 'Judging in Progress',
        description: 'Our judges are evaluating the submissions. Results will be announced soon.',
        icon: <FaCode />,
        color: 'bg-orange-500/20 border-orange-500/30',
        textColor: 'text-orange-600 dark:text-orange-400',
      },
      results: {
        title: 'Results Published!',
        description: 'Check out the leaderboard to see who won. Congratulations to all participants!',
        icon: <FaTrophy />,
        color: 'bg-pink-500/20 border-pink-500/30',
        textColor: 'text-pink-600 dark:text-pink-400',
      },
    }
    return configs[currentPhase] || configs.registration
  }

  if (!currentPhase) return null

  const config = getPhaseConfig()

  return (
    <div className={`${config.color} border-b ${config.textColor}`}>
      <div className="section-padding py-3">
        <div className="flex items-center justify-center space-x-3">
          <div className="flex items-center justify-center w-6 h-6">
            {config.icon}
          </div>
          <div className="flex-1 text-center">
            <div className="font-bold">{config.title}</div>
            <div className="text-sm opacity-90">{config.description}</div>
          </div>
        </div>
      </div>
    </div>
  )
}