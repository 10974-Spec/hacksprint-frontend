import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { teamAPI } from '../../api/teams'
import { toast } from 'react-toastify'

export const fetchMyTeam = createAsyncThunk(
  'team/fetchMyTeam',
  async (_, { rejectWithValue }) => {
    try {
      const response = await teamAPI.getMyTeam()
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data)
    }
  }
)

export const createTeam = createAsyncThunk(
  'team/create',
  async (teamData, { rejectWithValue }) => {
    try {
      const response = await teamAPI.createTeam(teamData)
      toast.success('Team created successfully!')
      return response.team
    } catch (error) {
      toast.error(error.response?.data?.error || 'Team creation failed')
      return rejectWithValue(error.response?.data)
    }
  }
)

export const sendJoinRequest = createAsyncThunk(
  'team/sendJoinRequest',
  async ({ teamId, message }, { rejectWithValue }) => {
    try {
      const response = await teamAPI.sendJoinRequest(teamId, message)
      toast.success('Join request sent!')
      return response
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to send join request')
      return rejectWithValue(error.response?.data)
    }
  }
)

const teamSlice = createSlice({
  name: 'team',
  initialState: {
    myTeam: null,
    members: [],
    joinRequests: [],
    isLoading: false,
  },
  reducers: {
    setTeam: (state, action) => {
      state.myTeam = action.payload.team
      state.members = action.payload.members || []
      state.joinRequests = action.payload.joinRequests || []
    },
    addMember: (state, action) => {
      state.members.push(action.payload)
    },
    updateTeam: (state, action) => {
      state.myTeam = { ...state.myTeam, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyTeam.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchMyTeam.fulfilled, (state, action) => {
        state.isLoading = false
        state.myTeam = action.payload.team
        state.members = action.payload.members
        state.joinRequests = action.payload.joinRequests
      })
      .addCase(fetchMyTeam.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.myTeam = action.payload
        state.members = [{
          user: action.payload.owner,
          role: 'owner'
        }]
      })
  },
})

export const { setTeam, addMember, updateTeam } = teamSlice.actions
export default teamSlice.reducer