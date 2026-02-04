import { format } from 'date-fns'
import Avatar from '../ui/Avatar'

export default function ChatMessage({ message, isOwn }) {
  const senderName = message.sender?.name || 'Unknown'
  const senderAvatar = message.sender?.avatar
  const timestamp = message.createdAt ? new Date(message.createdAt) : new Date()
  
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} space-x-3`}>
      {!isOwn && (
        <Avatar
          src={senderAvatar}
          alt={senderName}
          size="sm"
          className="flex-shrink-0"
        />
      )}
      
      <div className={`max-w-[70%] ${isOwn ? 'order-first' : ''}`}>
        {!isOwn && (
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {senderName}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {format(timestamp, 'HH:mm')}
            </span>
          </div>
        )}
        
        <div
          className={`rounded-2xl px-4 py-3 ${
            isOwn
              ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-br-none'
              : 'bg-gray-100 dark:bg-dark-800 text-gray-900 dark:text-gray-100 rounded-bl-none'
          }`}
        >
          <p className="break-words">{message.content}</p>
          {message.isEdited && (
            <div className="text-xs opacity-75 mt-1 italic">
              edited
            </div>
          )}
        </div>
        
        {isOwn && (
          <div className="text-right mt-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {format(timestamp, 'HH:mm')}
              {message.isEdited && ' • edited'}
            </span>
          </div>
        )}
      </div>
      
      {isOwn && (
        <Avatar
          src={senderAvatar}
          alt={senderName}
          size="sm"
          className="flex-shrink-0"
        />
      )}
    </div>
  )
}