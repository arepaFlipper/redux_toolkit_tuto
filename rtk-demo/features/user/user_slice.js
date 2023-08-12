const create_clice = require('@reduxjs/toolkit').createSlice;
const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk;
const axios = require('axios');

const initial_state = {
  loading: false,
  users: [],
  error: '',
}

// Generated pending, fulfilled and rejected action types
const fetch_users = createAsyncThunk('users/fetch_users', async () => {

  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    const users = await response.data.map((user) => user.id);
    return users
  } catch (error) {
    return error
  }
})
const user_slice = create_clice({
  name: "user",
  initialState: initial_state,
  extraReducers: (builder) => {
    builder.addCase(fetch_users.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetch_users.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = '';
    });
    builder.addCase(fetch_users.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.users = [];
    });
  },
})

module.exports = user_slice.reducer;
module.exports.fetch_users = fetch_users;
