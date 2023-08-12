const create_slice = require('@reduxjs/toolkit').createSlice;

const initial_state = {
  num_of_icecreams: 20,
}

const icecream_slice = create_slice({
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
  extraReducers: {
    ['cake/ordered']: (state) => {
      state.num_of_icecreams--;
    }
  }
})

module.exports = icecream_slice.reducer;
module.exports.icecream_actions = icecream_slice.actions;
