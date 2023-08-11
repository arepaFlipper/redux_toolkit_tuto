const redux = require('redux');;
const createStore = redux.createStore;

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

const store = createStore(reducer);
