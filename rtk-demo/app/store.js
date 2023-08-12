const configure_store = require('@reduxjs/toolkit').configureStore;
const cake_reducer = require('../features/cake/cake_slice');
const icecream_reducer = require('../features/icecream/icecream_slice');

const store = configure_store({
  reducer: {
    cake: cake_reducer,
    icecream: icecream_reducer,
  },
});

module.exports = store;
