import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FaUpload } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { createTeam } from '../../store/slices/teamSlice'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'

const teamSchema = z.object({
  name: z.string().min(3, 'Team name must be at least 3 characters').max(50, 'Team name must be less than 50 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be less than 500 characters'),
  maxMembers: z.number().min(1).max(10).default(4),
  projectIdea: z.string().max(1000, 'Project idea must be less than 1000 characters').optional(),
})

export default function CreateTeamModal({ isOpen, onClose, onSuccess }) {
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      maxMembers: 4,
    },
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data) => {
    try {
      setIsUploading(true)
      await dispatch(createTeam(data)).unwrap()
      
      if (imageFile && onSuccess?.teamId) {
        const formData = new FormData()
        formData.append('image', imageFile)
        // Upload image logic here
      }
      
      reset()
      setImageFile(null)
      setImagePreview(null)
      onClose()
      onSuccess?.()
    } catch (error) {
      console.error('Failed to create team:', error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Team" size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input
              label="Team Name"
              placeholder="Enter a creative team name"
              error={errors.name?.message}
              {...register('name')}
            />
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Team Description
              </label>
              <textarea
                className="input-field min-h-[100px]"
                placeholder="Describe your team's vision and goals..."
                {...register('description')}
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.description.message}
                </p>
              )}
            </div>
            
            <Input
              label="Max Team Members"
              type="number"
              min="1"
              max="10"
              error={errors.maxMembers?.message}
              {...register('maxMembers', { valueAsNumber: true })}
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Team Image
              </label>
              <div className="relative">
                <div className="border-2 border-dashed border-gray-300 dark:border-dark-700 rounded-2xl p-6 text-center hover:border-primary-500 transition-colors">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null)
                          setImagePreview(null)
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="py-8">
                      <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full flex items-center justify-center mb-4">
                        <FaUpload className="w-8 h-8 text-primary-500" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Drag & drop or click to upload
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Project Idea (Optional)
              </label>
              <textarea
                className="input-field min-h-[120px]"
                placeholder="Share your initial project idea..."
                {...register('projectIdea')}
              />
              {errors.projectIdea && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.projectIdea.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200/50 dark:border-dark-700/50">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting || isUploading}>
            Create Team
          </Button>
        </div>
      </form>
    </Modal>
  )
}