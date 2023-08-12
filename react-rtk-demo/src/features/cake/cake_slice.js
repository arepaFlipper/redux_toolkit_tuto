import { createSlice } from '@reduxjs/toolkit';

const initial_state = {
  numOfCakes: 10,
}

const cake_slice = createSlice({
  name: 'cake',
  initialState: initial_state,
  reducers: {
    ordered: (state) => {
      state.numOfCakes--; // createSlice uses immer under the hood
    },
    restocked: (state, action) => {
      state.numOfCakes += action.payload
    },
  },
});

export default cake_slice.reducer;
export const { ordered, restocked } = cake_slice.actions;
