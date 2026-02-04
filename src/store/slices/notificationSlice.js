import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { userAPI } from '../../api/user'

export const fetchNotifications = createAsyncThunk(
  'notifications/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.getNotifications()
      // Ensure we always return an array
      return response.notifications || []
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
      return rejectWithValue(error.response?.data || { error: 'Failed to fetch notifications' })
    }
  }
)

export const markAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (notificationId, { rejectWithValue }) => {
    try {
      await userAPI.markNotificationAsRead(notificationId)
      return notificationId
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
      return rejectWithValue(error.response?.data || { error: 'Failed to mark notification as read' })
    }
  }
)

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: [],
    unreadCount: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    addNotification: (state, action) => {
      if (action.payload) {
        state.items.unshift(action.payload)
        if (!action.payload.isRead) {
          state.unreadCount += 1
        }
      }
    },
    clearNotifications: (state) => {
      state.items = []
      state.unreadCount = 0
      state.error = null
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false
        // Ensure action.payload is an array
        const notifications = Array.isArray(action.payload) ? action.payload : []
        state.items = notifications
        // Safe filter operation with null check
        state.unreadCount = notifications.filter(n => n && !n.isRead).length
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload?.error || 'Failed to load notifications'
        state.items = []
        state.unreadCount = 0
      })
      
      // Mark as Read
      .addCase(markAsRead.pending, (state) => {
        state.error = null
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        if (action.payload) {
          const notification = state.items.find(n => n && n._id === action.payload)
          if (notification) {
            notification.isRead = true
            state.unreadCount = Math.max(0, state.unreadCount - 1)
          }
        }
      })
      .addCase(markAsRead.rejected, (state, action) => {
        state.error = action.payload?.error || 'Failed to mark notification as read'
      })
  },
})

export const { addNotification, clearNotifications, setError } = notificationSlice.actions
export default notificationSlice.reducer