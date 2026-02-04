import { useEffect, useRef, useState, useCallback } from 'react'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export default function useWebSocket(teamId) {
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState([])
  const socketRef = useRef(null)
  const { user, tokens } = useSelector((state) => state.auth)

  const sendMessage = useCallback((content) => {
    if (socketRef.current && isConnected && teamId) {
      socketRef.current.emit('chat:message', {
        teamId,
        userId: user?.id,
        content,
        messageType: 'text'
      })

      const tempMessage = {
        tempId: Date.now(),
        team: teamId,
        sender: user?.id,
        sender: { _id: user?.id, name: user?.name, avatar: user?.avatar },
        messageType: 'text',
        content,
        createdAt: new Date().toISOString(),
        isTemp: true
      }

      setMessages(prev => [...prev, tempMessage])
    }
  }, [teamId, user, isConnected])

  useEffect(() => {
    if (!teamId || !user?.id || !tokens?.accessToken) return

    const socket = io(import.meta.env.VITE_SOCKET_URL, {
      auth: {
        token: tokens.accessToken
      },
      transports: ['websocket', 'polling']
    })

    socketRef.current = socket

    socket.on('connect', () => {
      setIsConnected(true)
      socket.emit('join:team', { teamId, userId: user.id })
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.on('error', (error) => {
      toast.error(error.message || 'WebSocket error')
    })

    socket.on('chat:message', (message) => {
      setMessages(prev => {
        const existingIndex = prev.findIndex(m => m.tempId && m.tempId === message.tempId)
        if (existingIndex > -1) {
          const newMessages = [...prev]
          newMessages[existingIndex] = { ...message, isTemp: false }
          return newMessages
        }
        return [...prev, { ...message, isTemp: false }]
      })
    })

    socket.on('chat:message:update', (updatedMessage) => {
      setMessages(prev =>
        prev.map(msg =>
          msg._id === updatedMessage._id ? updatedMessage : msg
        )
      )
    })

    socket.on('team:member:joined', (data) => {
      const systemMessage = {
        _id: Date.now().toString(),
        team: teamId,
        sender: data.user._id,
        sender: { _id: data.user._id, name: data.user.name },
        messageType: 'system',
        content: `${data.user.name} joined the team`,
        metadata: { action: 'member_joined' },
        createdAt: new Date().toISOString()
      }
      setMessages(prev => [...prev, systemMessage])
    })

    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [teamId, user?.id, tokens?.accessToken])

  return {
    isConnected,
    messages,
    sendMessage,
    socket: socketRef.current
  }
}