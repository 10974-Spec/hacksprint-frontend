import { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import Button from '../ui/Button'

export default function ChatInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center space-x-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          className="input-field flex-1"
          disabled={disabled}
        />
        <Button
          type="submit"
          disabled={!message.trim() || disabled}
          variant="primary"
          size="icon"
        >
          <FaPaperPlane className="w-5 h-5" />
        </Button>
      </div>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Press Enter to send
      </p>
    </form>
  )
}