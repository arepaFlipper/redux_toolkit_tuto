import { configureStore } from '@reduxjs/toolkit';
// const redux_logger = require('redux-logger');
import cake_reducer from '../features/cake/cake_slice';
import icecream_reducer from '../features/icecream/icecream_slice';
import user_reducer from '../features/user/user_slice';

// const logger = redux_logger.createLogger();
const store = configureStore({
  reducer: {
    cake: cake_reducer,
    icecream: icecream_reducer,
    user: user_reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
