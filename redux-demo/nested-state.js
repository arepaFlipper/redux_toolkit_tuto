const initialState = {
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      return {
        ...state,
        address: {
          ...state.address,
          street: action.payload,
        },
      };

    default: {
      return state;
    }
  };
};

const store = Redux.createStore(reducer);
console.log('Initial state', store.getState());
const unsubscribe = store.subscribe(() => {
  console.log('Updated state', store.getState());
});

store.dispatch(updateStreet('Fake Street 123'));
unsubscribe();
