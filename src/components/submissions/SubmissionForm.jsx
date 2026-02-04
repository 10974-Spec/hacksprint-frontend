import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FaPlus, FaTrash } from 'react-icons/fa'
import Input from '../ui/Input'
import Button from '../ui/Button'

const submissionSchema = z.object({
  projectName: z.string().min(3, 'Project name must be at least 3 characters').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000),
  techStack: z.array(z.string()).min(1, 'Add at least one technology'),
  demoLink: z.string().url('Must be a valid URL').or(z.literal('')),
  githubLink: z.string().url('Must be a valid URL').or(z.literal('')),
  pitchLocation: z.string().min(3, 'Pitch location is required'),
  submissionVideo: z.string().url('Must be a valid URL').or(z.literal('')),
})

export default function SubmissionForm({ onSubmit, initialData = {}, loading = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      techStack: [],
      demoLink: '',
      githubLink: '',
      submissionVideo: '',
      ...initialData,
    },
  })

  const techStack = watch('techStack') || []
  const [newTech, setNewTech] = useState('')

  const addTechnology = () => {
    if (newTech.trim()) {
      setValue('techStack', [...techStack, newTech.trim()])
      setNewTech('')
    }
  }

  const removeTechnology = (index) => {
    const newTechStack = techStack.filter((_, i) => i !== index)
    setValue('techStack', newTechStack)
  }

  const handleFormSubmit = (data) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Input
            label="Project Name"
            placeholder="Enter your project name"
            error={errors.projectName?.message}
            {...register('projectName')}
          />
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Project Description
            </label>
            <textarea
              className="input-field min-h-[150px]"
              placeholder="Describe your project in detail..."
              {...register('description')}
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Technology Stack
            </label>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  placeholder="Add a technology"
                  className="input-field flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                />
                <Button type="button" onClick={addTechnology} variant="ghost" size="icon">
                  <FaPlus className="w-5 h-5" />
                </Button>
              </div>
              {errors.techStack && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.techStack.message}
                </p>
              )}
              
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-lg"
                  >
                    <span className="text-sm">{tech}</span>
                    <button
                      type="button"
                      onClick={() => removeTechnology(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Input
            label="Demo Link (Optional)"
            placeholder="https://demo.yourproject.com"
            error={errors.demoLink?.message}
            {...register('demoLink')}
          />
          
          <Input
            label="GitHub Repository (Optional)"
            placeholder="https://github.com/username/repo"
            error={errors.githubLink?.message}
            {...register('githubLink')}
          />
          
          <Input
            label="Pitch Location"
            placeholder="Table #12 or Online Room A"
            error={errors.pitchLocation?.message}
            {...register('pitchLocation')}
          />
          
          <Input
            label="Submission Video (Optional)"
            placeholder="https://youtube.com/your-video"
            error={errors.submissionVideo?.message}
            {...register('submissionVideo')}
          />
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200/50 dark:border-dark-700/50">
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="ghost" onClick={() => reset()}>
            Reset
          </Button>
          <Button type="submit" loading={loading}>
            Submit Project
          </Button>
        </div>
      </div>
    </form>
  )
}