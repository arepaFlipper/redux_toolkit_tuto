import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

type TUser = {
  id: number;
  string: string;
}

type TInitialState = {
  loading: boolean;
  users: TUser[];
  error: string;
}

const initialState: TInitialState = {
  loading: false,
  users: [],
  error: ''
}

// Generates pending, fulfilled and rejected action types
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    return response.data
  } catch (error) {
    return error.message;
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<TUser[]>) => {
      state.loading = false
      state.users = action.payload
      state.error = ''
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false
      state.users = []
      state.error = action.error.message || 'Something went wrong'
    })
  }
})

export default userSlice.reducer
