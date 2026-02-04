import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import useWebSocket from '../../hooks/useWebSocket'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import SystemMessage from './SystemMessage'
import Card from '../ui/Card'

export default function ChatRoom({ teamId }) {
  const { user } = useSelector((state) => state.auth)
  const { messages, sendMessage, isConnected } = useWebSocket(teamId)
  const messagesEndRef = useRef(null)
  const [isAtBottom, setIsAtBottom] = useState(true)

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom()
    }
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target
    const isBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 50
    setIsAtBottom(isBottom)
  }

  const handleSendMessage = (content) => {
    sendMessage(content)
  }

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold">Team Chat</h3>
          <div className="flex items-center space-x-2 mt-1">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
        {!isAtBottom && (
          <button
            onClick={scrollToBottom}
            className="px-3 py-1.5 bg-primary-500 text-white rounded-lg text-sm hover:bg-primary-600 transition-colors"
          >
            Scroll to bottom
          </button>
        )}
      </div>

      <div
        className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2"
        onScroll={handleScroll}
        style={{ maxHeight: '500px' }}
      >
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          messages.map((message) => {
            if (message.messageType === 'system') {
              return <SystemMessage key={message._id || message.tempId} message={message} />
            }
            return (
              <ChatMessage
                key={message._id || message.tempId}
                message={message}
                isOwn={message.sender?._id === user?.id || message.sender === user?.id}
              />
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={handleSendMessage} disabled={!isConnected} />
    </Card>
  )
}