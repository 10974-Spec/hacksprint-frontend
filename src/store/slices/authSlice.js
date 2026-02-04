import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authAPI } from '../../api/auth'
import { toast } from 'react-toastify'

// Helper function to extract serializable error data
const getSerializableError = (error) => {
  if (!error) {
    return { error: 'Unknown error occurred' }
  }
  
  // If error already has a serializable structure
  if (error.error && typeof error.error === 'string') {
    return error
  }
  
  // Extract from Axios error response
  if (error.response?.data) {
    return {
      error: error.response.data.error || 'Request failed',
      message: error.response.data.message,
      status: error.response.status
    }
  }
  
  // Extract from standard Error object
  if (error.message) {
    return { error: error.message }
  }
  
  // Handle string errors
  if (typeof error === 'string') {
    return { error }
  }
  
  // Last resort - stringify
  return { error: JSON.stringify(error) }
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log('🔐 Login attempt for:', email)
      const response = await authAPI.login(email, password)
      console.log('✅ Login response received:', response)
      
      // Check if response.data exists (Axios wraps it)
      const responseData = response.data || response
      
      if (!responseData.tokens) {
        throw new Error('No tokens in response')
      }
      
      localStorage.setItem('accessToken', responseData.tokens.accessToken)
      localStorage.setItem('refreshToken', responseData.tokens.refreshToken)
      toast.success('Logged in successfully!')
      
      return {
        user: responseData.user,
        tokens: responseData.tokens
      }
    } catch (error) {
      console.error('❌ Login error:', error)
      
      // Get serializable error data
      const errorData = getSerializableError(error)
      
      // Show toast with error message
      toast.error(errorData.error || 'Login failed')
      
      // Return serializable error
      return rejectWithValue(errorData)
    }
  }
)

export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('📝 Signup attempt for:', userData.email)
      const response = await authAPI.signup(userData)
      console.log('✅ Signup response:', response)
      
      const responseData = response.data || response
      
      toast.success('Registration successful! Awaiting admin approval.')
      
      return {
        user: responseData.user,
        tokens: responseData.tokens,
        message: responseData.message
      }
    } catch (error) {
      console.error('❌ Signup error:', error)
      
      const errorData = getSerializableError(error)
      toast.error(errorData.error || 'Registration failed')
      
      return rejectWithValue(errorData)
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { tokens } = getState().auth
      if (tokens?.accessToken) {
        await authAPI.logout()
      }
    } catch (error) {
      console.error('Logout error:', error)
      // Don't reject here - we still want to clear local storage
    } finally {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      toast.info('Logged out successfully')
    }
  }
)

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) {
        throw new Error('No refresh token')
      }
      
      const response = await authAPI.refreshToken(refreshToken)
      const responseData = response.data || response
      
      localStorage.setItem('accessToken', responseData.accessToken)
      localStorage.setItem('refreshToken', responseData.refreshToken)
      
      return {
        accessToken: responseData.accessToken,
        refreshToken: responseData.refreshToken
      }
    } catch (error) {
      console.error('Refresh token error:', error)
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      
      const errorData = getSerializableError(error)
      return rejectWithValue(errorData)
    }
  }
)

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { getState, dispatch }) => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      return { user: null, tokens: null }
    }
    
    try {
      const response = await authAPI.getProfile()
      const responseData = response.data || response
      
      return {
        user: responseData.user,
        tokens: {
          accessToken,
          refreshToken: localStorage.getItem('refreshToken')
        }
      }
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          await dispatch(refreshToken()).unwrap()
          const response = await authAPI.getProfile()
          const responseData = response.data || response
          
          return {
            user: responseData.user,
            tokens: {
              accessToken: localStorage.getItem('accessToken'),
              refreshToken: localStorage.getItem('refreshToken')
            }
          }
        } catch (refreshError) {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          return { user: null, tokens: null }
        }
      }
      return { user: null, tokens: null }
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    tokens: null,
    isLoading: false,
    isAuthenticated: false,
    error: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = !!action.payload
    },
    setTokens: (state, action) => {
      state.tokens = action.payload
    },
    clearAuth: (state) => {
      state.user = null
      state.tokens = null
      state.isAuthenticated = false
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.tokens = action.payload.tokens
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload?.error || 'Login failed'
      })
      
      // Signup
      .addCase(signup.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(signup.fulfilled, (state) => {
        state.isLoading = false
        state.error = null
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload?.error || 'Registration failed'
      })
      
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.tokens = null
        state.isAuthenticated = false
        state.error = null
      })
      
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.tokens = action.payload.tokens
        state.isAuthenticated = !!action.payload.user
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false
        state.user = null
        state.tokens = null
        state.isAuthenticated = false
      })
      
      // Refresh Token
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.tokens = {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken
        }
      })
  },
})

export const { setUser, setTokens, clearAuth, clearError } = authSlice.actions
export default authSlice.reducer