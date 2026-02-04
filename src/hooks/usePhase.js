import { useSelector, useDispatch } from 'react-redux'
import { fetchCurrentPhase, transitionPhase } from '../store/slices/phaseSlice'

export function usePhase() {
  const { currentPhase, phaseStartTime, settings, isLoading } = useSelector((state) => state.phase)
  const dispatch = useDispatch()

  const refreshPhase = () => {
    dispatch(fetchCurrentPhase())
  }

  const transitionToPhase = (phase) => {
    return dispatch(transitionPhase(phase))
  }

  const isPhase = (phase) => currentPhase === phase

  const canPerformAction = (allowedPhases) => {
    return allowedPhases.includes(currentPhase)
  }

  return {
    currentPhase,
    phaseStartTime,
    settings,
    isLoading,
    refreshPhase,
    transitionToPhase,
    isPhase,
    canPerformAction,
    isRegistration: isPhase('registration'),
    isTeamFormation: isPhase('team_formation'),
    isHackathonLive: isPhase('hackathon_live'),
    isSubmission: isPhase('submission'),
    isJudging: isPhase('judging'),
    isResults: isPhase('results'),
  }
}

// ADD THIS EXPORT to fix the error
export function usePhaseCheck() {
  const { currentPhase } = useSelector((state) => state.phase)
  
  return {
    isPhase: (phase) => currentPhase === phase,
    isAnyPhase: (...phases) => phases.includes(currentPhase),
    getPhaseLabel: () => {
      const labels = {
        registration: 'Registration',
        team_formation: 'Team Formation',
        hackathon_live: 'Hackathon Live',
        submission: 'Submission',
        judging: 'Judging',
        results: 'Results'
      }
      return labels[currentPhase] || 'Registration'
    }
  }
}

// Optional: Add other exports if needed
export function useCurrentPhase() {
  const { currentPhase } = useSelector((state) => state.phase)
  return currentPhase
}