import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sendJoinRequest } from '../../store/slices/teamSlice'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'

export default function JoinRequestModal({ isOpen, onClose, team }) {
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!team?._id) return
    
    try {
      setIsSubmitting(true)
      await dispatch(sendJoinRequest({
        teamId: team._id,
        message: message.trim()
      })).unwrap()
      
      setMessage('')
      onClose()
    } catch (error) {
      console.error('Failed to send join request:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!team) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Request to Join ${team.name}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-4 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 rounded-xl">
          <div className="flex items-center space-x-3">
            {team.image?.url ? (
              <img
                src={team.image.url}
                alt={team.name}
                className="w-12 h-12 rounded-xl object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">{team.name.charAt(0)}</span>
              </div>
            )}
            <div>
              <h4 className="font-bold">{team.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {team.memberCount}/{team.maxMembers} members
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Message to Team Owner (Optional)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell the team owner why you'd like to join..."
            className="input-field min-h-[120px]"
            maxLength={200}
          />
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {message.length}/200 characters
          </p>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200/50 dark:border-dark-700/50">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Send Request
          </Button>
        </div>
      </form>
    </Modal>
  )
}