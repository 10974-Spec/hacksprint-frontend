import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { adminAPI } from '../../api/admin'
import { toast } from 'react-toastify'

export const fetchCurrentPhase = createAsyncThunk(
  'phase/fetchCurrent',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getStats()
      return {
        currentPhase: response.currentPhase,
        phaseStartTime: response.phaseStartTime,
        settings: response.settings
      }
    } catch (error) {
      return rejectWithValue(error.response?.data)
    }
  }
)

export const transitionPhase = createAsyncThunk(
  'phase/transition',
  async (phase, { rejectWithValue }) => {
    try {
      const response = await adminAPI.transitionPhase(phase)
      toast.success(`Phase transitioned to ${phase.replace('_', ' ')}`)
      return response
    } catch (error) {
      toast.error(error.response?.data?.error || 'Transition failed')
      return rejectWithValue(error.response?.data)
    }
  }
)

const phaseSlice = createSlice({
  name: 'phase',
  initialState: {
    currentPhase: null,
    phaseStartTime: null,
    settings: null,
    isLoading: false,
  },
  reducers: {
    setPhase: (state, action) => {
      state.currentPhase = action.payload.currentPhase
      state.phaseStartTime = action.payload.phaseStartTime
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentPhase.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCurrentPhase.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentPhase = action.payload.currentPhase
        state.phaseStartTime = action.payload.phaseStartTime
        state.settings = action.payload.settings
      })
      .addCase(fetchCurrentPhase.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(transitionPhase.fulfilled, (state, action) => {
        state.currentPhase = action.payload.newPhase
        state.phaseStartTime = action.payload.timestamp
      })
  },
})

export const { setPhase } = phaseSlice.actions
export default phaseSlice.reducer