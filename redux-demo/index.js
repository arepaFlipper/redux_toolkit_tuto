const redux = require('redux');
const createStore = redux.createStore;
const bindActinCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

const orderCake = () => {
  return (
    {
      type: CAKE_ORDERED,
      payload: 1,
    }
  )
}

const restockCake = (qty = 1) => {
  return (
    {
      type: CAKE_RESTOCKED,
      payload: qty,
    }
  )
}

const orderIcecream = (qty = 1) => {
  return (
    {
      type: ICECREAM_ORDERED,
      payload: qty,
    }
  )
}

const restockIcecream = (qty = 1) => {
  return (
    {
      type: ICECREAM_RESTOCKED,
      payload: qty,
    }
  )
}

const initialCakeState = {
  numOfCakes: 10,
}

const initialIcecreamState = {
  numOfIcecreams: 20,
}

// (previousState, action)=> newState

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {

    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };

    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      }

    default:
      return state;
  };
};

const icecreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {

    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams - 1,
      };

    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams + action.payload,
      }

    case CAKE_ORDERED:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams - 1,
      };

    default:
      return state;
  };
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  icecream: icecreamReducer
});

const store = createStore(rootReducer); // remove the logger beacuse it makes too much noise.
console.log('Initial state', store.getState());

const unsubscribe = store.subscribe(() => {
  console.log('Updated state', store.getState());
});

const actions = bindActinCreators({ orderCake, restockCake, orderIcecream, restockIcecream }, store.dispatch);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIcecream();
actions.orderIcecream();
actions.restockIcecream(2);

unsubscribe();

