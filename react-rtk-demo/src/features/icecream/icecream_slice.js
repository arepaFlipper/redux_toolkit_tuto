import { createSlice } from '@reduxjs/toolkit';
import { ordered as cake_ordered } from '../cake/cake_slice';

const initial_state = {
  num_of_icecreams: 20,
}

const icecream_slice = createSlice({
  name: "icecream",
  initialState: initial_state,
  reducers: {
    ordered: (state) => {
      state.num_of_icecreams--;
    },
    restocked: (state, action) => {
      state.num_of_icecreams += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(cake_ordered.ordered, (state) => {
      state.num_of_icecreams--;
    });
  }
})

export default icecream_slice.reducer;
export const { ordered, restocked } = icecream_slice.actions;
