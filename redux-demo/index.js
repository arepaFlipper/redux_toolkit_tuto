const redux = require('redux');
const createStore = redux.createStore;
const bindActinCreators = redux.bindActionCreators;

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';

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


const initialState = {
  numOfCakes: 10,
}

// (previousState, action)=> newState

const reducer = (state = initialState, action) => {
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

const store = createStore(reducer);
console.log('Initial state', store.getState());

const unsubscribe = store.subscribe(() => {
  console.log('Update state', store.getState());
})

// store.dispatch(orderCake()); // remove 1
// store.dispatch({ type: CAKE_ORDERED, payload: 1 });
// store.dispatch(orderCake()); // remove 1
// store.dispatch(restockCake(3)); // add 3 to have qty back to 10

const actions = bindActinCreators({ orderCake, restockCake }, store.dispatch);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(4);

unsubscribe();

