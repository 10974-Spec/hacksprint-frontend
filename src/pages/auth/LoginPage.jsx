import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FaEnvelope, FaLock, FaArrowLeft, FaGoogle, FaFacebook, FaGithub, FaHeart } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { login } from '../../store/slices/authSlice'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useToast } from '../../hooks/useDebouncedToast'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const toast = useToast()

  const message = location.state?.message

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const handleSocialLogin = (provider) => {
    toast.info(`Sign in with ${provider} clicked`)
    // You can implement actual OAuth login here
  }

  const handleDonate = () => {
    toast.info('Thank you for considering a donation!')
    // You can navigate to donation page or open modal
  }

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      
      const result = await dispatch(login(data)).unwrap()
      toast.success('Login successful')
      navigate('/dashboard')
      
    } catch (error) {
      let errorMessage = 'Login failed'
      
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
      <div className="px-6 py-4">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <FaArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>
      </div>

      <div className="max-w-md mx-auto px-4 py-12">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <img 
              src="/logo1.png" 
              alt="Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/80?text=Logo";
              }}
            />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Sign In</h1>
          <p className="text-gray-500">
            Enter your credentials to continue
          </p>
        </div>

        {/* Social Login Buttons Card */}
        <div className="bg-white border border-gray-200 p-6 mb-6">
          <div className="space-y-4">
            <h3 className="text-center text-gray-700 font-medium mb-4">
              Or continue with
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
                Social login may have limited features. For full access, please use email login.
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
            <span className="px-4 bg-gray-50 text-gray-500">Or sign in with email</span>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white border border-gray-200 p-6">
          {message && (
            <div className="mb-4 p-3 bg-gray-50 border border-gray-200">
              <p className="text-gray-900 text-sm">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm text-gray-900 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" loading={isSubmitting}>
              Sign In
            </Button>

            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <Link to="/signup" className="text-gray-900 hover:underline font-medium">
                  Sign up
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
  )
}