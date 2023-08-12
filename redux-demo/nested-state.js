const redux = require('redux');
const produce = require('immer').produce;

const initial_state = {
  name: 'Cristian F. Tovar',
  address: {
    street: 'Av. Miguel Hidalgo 123',
    city: 'Guadalajara',
    state: 'CA',
  }
};

const STREET_UPDATED = 'STREET_UPDATED';
const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      })

    default: {
      return state;
    }
  };
};

const store = redux.createStore(reducer);
console.log('Initial state', store.getState());
const unsubscribe = store.subscribe(() => {
  console.log('Updated state', store.getState());
});

store.dispatch(updateStreet('Fake Street 123'));
unsubscribe();
