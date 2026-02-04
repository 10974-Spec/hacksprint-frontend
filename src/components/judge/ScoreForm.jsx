import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FaLightbulb, FaCode, FaPalette, FaMicrophone } from 'react-icons/fa'
import Input from '../ui/Input'
import Button from '../ui/Button'

const scoreSchema = z.object({
  innovation: z.number().min(0).max(25),
  functionality: z.number().min(0).max(25),
  design: z.number().min(0).max(25),
  presentation: z.number().min(0).max(25),
  comments: z.string().max(500).optional(),
})

export default function ScoreForm({ onSubmit, submission, loading = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(scoreSchema),
    defaultValues: {
      innovation: 0,
      functionality: 0,
      design: 0,
      presentation: 0,
      comments: '',
    },
  })

  const innovation = watch('innovation') || 0
  const functionality = watch('functionality') || 0
  const design = watch('design') || 0
  const presentation = watch('presentation') || 0
  const totalScore = innovation + functionality + design + presentation

  const criteria = [
    {
      name: 'innovation',
      label: 'Innovation & Creativity',
      icon: <FaLightbulb />,
      description: 'How original and creative is the solution?',
      value: innovation,
    },
    {
      name: 'functionality',
      label: 'Technical Implementation',
      icon: <FaCode />,
      description: 'How well does it work technically?',
      value: functionality,
    },
    {
      name: 'design',
      label: 'Design & UI/UX',
      icon: <FaPalette />,
      description: 'How good is the design and user experience?',
      value: design,
    },
    {
      name: 'presentation',
      label: 'Presentation & Demo',
      icon: <FaMicrophone />,
      description: 'How well was it presented and demonstrated?',
      value: presentation,
    },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
        {criteria.map((criterion) => (
          <div key={criterion.name} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-lg flex items-center justify-center">
                  {criterion.icon}
                </div>
                <div>
                  <div className="font-medium">{criterion.label}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {criterion.description}
                  </div>
                </div>
              </div>
              <div className="text-lg font-bold">{criterion.value}/25</div>
            </div>
            
            <input
              type="range"
              min="0"
              max="25"
              step="1"
              className="w-full h-2 bg-gray-200 dark:bg-dark-800 rounded-lg appearance-none cursor-pointer"
              {...register(criterion.name, { valueAsNumber: true })}
            />
            
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>0 - Poor</span>
              <span>12.5 - Average</span>
              <span>25 - Excellent</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-2xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Score</div>
            <div className="text-4xl font-bold mt-2">{totalScore}/100</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 dark:text-gray-400">Percentage</div>
            <div className="text-3xl font-bold mt-2">{totalScore}%</div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Comments (Optional)
        </label>
        <textarea
          className="input-field min-h-[120px]"
          placeholder="Provide constructive feedback..."
          {...register('comments')}
        />
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Max 500 characters
        </p>
      </div>

      <div className="pt-6 border-t border-gray-200/50 dark:border-dark-700/50">
        <Button type="submit" loading={loading} className="w-full">
          Submit Score
        </Button>
      </div>
    </form>
  )
}