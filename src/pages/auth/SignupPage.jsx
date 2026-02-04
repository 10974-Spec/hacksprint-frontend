import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FaUser, FaEnvelope, FaLock, FaLightbulb, FaArrowLeft, FaGoogle, FaFacebook, FaGithub, FaHeart } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { signup } from '../../store/slices/authSlice'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useToast } from '../../hooks/useDebouncedToast'

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  projectIdea: z.string().max(500, 'Project idea must be less than 500 characters').optional(),
})

export default function SignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  })

  const handleSocialLogin = (provider) => {
    toast.info(`Sign up with ${provider} clicked`)
    // You can implement actual OAuth registration here
  }

  const handleDonate = () => {
    toast.info('Thank you for considering a donation!')
    // You can navigate to donation page or open modal
  }

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      await dispatch(signup(data)).unwrap()
      toast.success('Registration successful! Please login.')
      navigate('/login', { state: { message: 'Registration successful! Please login.' } })
    } catch (error) {
      let errorMessage = 'Registration failed'
      
      if (error && typeof error === 'object') {
        if (error.message) {
          errorMessage = error.message
        } else if (error.error) {
          errorMessage = error.error
        } else if (error.response?.data?.error) {
          errorMessage = error.response.data.error
        }
      }
      
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-md">
          <FaArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>
      </div>

      <div className="flex min-h-screen">
        {/* Left Side: Signup Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-12 py-12">
          <div className="max-w-md mx-auto w-full">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <img 
                  src="/logo1.png" 
                  alt="Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/64?text=Logo";
                  }}
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Join the Hackathon</h1>
              <p className="text-gray-500">
                Create your account and start building
              </p>
            </div>

            {/* Social Login Buttons Card */}
            <div className="bg-white border border-gray-200 p-6 mb-6">
              <div className="space-y-4">
                <h3 className="text-center text-gray-700 font-medium mb-4">
                  Sign up with social
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Google')}
                    className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <FaGoogle className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Facebook')}
                    className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <FaFacebook className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Facebook</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialLogin('GitHub')}
                    className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <FaGithub className="w-5 h-5 text-gray-800 mr-2" />
                    <span className="text-sm font-medium text-gray-900">GitHub</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDonate}
                    className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <FaHeart className="w-5 h-5 text-red-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Donate</span>
                  </button>
                </div>

                <div className="text-center pt-4 border-t border-gray-100">
                  <p className="text-gray-500 text-xs">
                    Social sign up may have limited features. For full access, please use email registration.
                  </p>
                </div>
              </div>
            </div>

            {/* Divider with "Or" text */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-50 text-gray-500">Or sign up with email</span>
              </div>
            </div>

            {/* Signup Form */}
            <div className="bg-white border border-gray-200 p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  leftIcon={<FaUser className="w-4 h-4" />}
                  error={errors.name?.message}
                  {...register('name')}
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  leftIcon={<FaEnvelope className="w-4 h-4" />}
                  error={errors.email?.message}
                  {...register('email')}
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  leftIcon={<FaLock className="w-4 h-4" />}
                  error={errors.password?.message}
                  {...register('password')}
                />

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Project Idea (Optional)
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-3">
                      <FaLightbulb className="w-4 h-4 text-gray-400" />
                    </div>
                    <textarea
                      className="w-full px-3 py-2.5 border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-white pl-10 min-h-[100px]"
                      placeholder="Share your initial project idea..."
                      {...register('projectIdea')}
                    />
                  </div>
                  {errors.projectIdea && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.projectIdea.message}
                    </p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    Helps admins understand your interests
                  </p>
                </div>

                <div className="p-3 bg-gray-50 border border-gray-200">
                  <p className="text-sm text-gray-600">
                    Your account will need admin approval before you can join teams. You'll be notified via email.
                  </p>
                </div>

                <Button type="submit" className="w-full" loading={isSubmitting}>
                  Create Account
                </Button>

                <div className="text-center pt-4 border-t border-gray-100">
                  <p className="text-gray-600 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-gray-900 hover:underline font-medium">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            {/* Simple Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Hackathon Platform. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Image with White Fade */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <div className="absolute inset-0">
            <img
              src="/img1.jpeg"
              alt="Hackathon Collaboration"
              className="w-full h-full object-cover"
            />
            
            {/* White Gradient Fade at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white via-white/90 to-transparent"></div>
            
            {/* Logo Overlay in Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/70 p-8 rounded-lg backdrop-blur-sm">
                <div className="text-white text-4xl font-bold">
                  HACKATHON <span className="text-blue-400">2024</span>
                </div>
                <div className="text-white/80 text-center mt-2 text-lg">
                  Build Something Amazing
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}