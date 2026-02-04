import { useSelector, useDispatch } from 'react-redux'
import { fetchMyTeam, sendJoinRequest, createTeam } from '../store/slices/teamSlice'

export function useTeam() {
  const { myTeam, members, joinRequests, isLoading } = useSelector((state) => state.team)
  const dispatch = useDispatch()

  const refreshTeam = () => {
    dispatch(fetchMyTeam())
  }

  const requestToJoin = (teamId, message = '') => {
    return dispatch(sendJoinRequest({ teamId, message }))
  }

  const createNewTeam = (teamData) => {
    return dispatch(createTeam(teamData))
  }

  const isTeamMember = (userId) => {
    return members.some(member => member.user._id === userId)
  }

  const isTeamOwner = (userId) => {
    return myTeam?.owner === userId
  }

  return {
    myTeam,
    members,
    joinRequests,
    isLoading,
    refreshTeam,
    requestToJoin,
    createNewTeam,
    isTeamMember,
    isTeamOwner,
    hasTeam: !!myTeam,
    memberCount: members.length,
    maxMembers: myTeam?.maxMembers || 0,
    isFull: members.length >= (myTeam?.maxMembers || 0),
  }
}