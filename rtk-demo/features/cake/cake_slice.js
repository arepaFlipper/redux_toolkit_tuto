const create_slice = require('@reduxjs/toolkit').createSlice;

const initialState = {
  numOfCakes: 10,
}

const cake_slice = create_slice({
  name: 'cake',
  initialState,
  reducers: {
    ordered: (state) => {
      state.numOfCakes--; // createSlice uses immer under the hood
    },
    restocked: (state, action) => {
      state.numOfCakes += action.payload
    },
  },
});

module.exports = cake_slice.reducer;
module.exports.cake_actions = cake_slice.actions;
