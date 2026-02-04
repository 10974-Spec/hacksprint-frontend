import { io } from 'socket.io-client'

let socket = null

export const initializeSocket = (token) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_SOCKET_URL, {
      auth: { token },
      transports: ['websocket', 'polling']
    })
  }
  return socket
}

export const getSocket = () => {
  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

export const joinTeamRoom = (teamId, userId) => {
  if (socket) {
    socket.emit('join:team', { teamId, userId })
  }
}

export const leaveTeamRoom = (teamId) => {
  if (socket) {
    socket.emit('leave:team', { teamId })
  }
}