const configure_store = require('@reduxjs/toolkit').configureStore;
// const redux_logger = require('redux-logger');
const cake_reducer = require('../features/cake/cake_slice');
const icecream_reducer = require('../features/icecream/icecream_slice');
const user_reducer = require('../features/user/user_slice');

// const logger = redux_logger.createLogger();
const store = configure_store({
  reducer: {
    cake: cake_reducer,
    icecream: icecream_reducer,
    user: user_reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

module.exports = store;

