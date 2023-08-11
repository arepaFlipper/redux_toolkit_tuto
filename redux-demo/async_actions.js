const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
  loading: false,

  users: [],
  error: '',
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

const fetchUserRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  }
}

const fetchUserSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  }
}

const fetchUserFailed = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      }

    case FETCH_USERS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: '',
      }

    case FETCH_USERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        users: [],
      }
  }
}

const fetchUsers = () => {
  return async (dispatch) => {
    await dispatch(fetchUserRequest());
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/usersssdf')
      const users = await response.data.map((user) => user.id);
      await dispatch(fetchUserSuccess(users));
    } catch (error) {
      await dispatch(fetchUserFailed(error.message));
    }
  }
}
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => { console.log(store.getState()) });
store.dispatch(fetchUsers());
