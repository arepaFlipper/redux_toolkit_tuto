const store = require('./app/store');
const cake_actions = require('./features/cake/cake_slice').cake_actions;

console.log(`🎱%cindex.js:5 - Initial state, store.getState()`, 'font-weight:bold; background:467927040;color:#fff;');
console.log('Initial state', store.getState());

const unsubscribe = store.subscribe(() => {
  console.log(`🎱%cindex.js:10 - New state, store.getState()`, 'font-weight:bold; background:467927040;color:#fff;');
  console.log('Updated state', store.getState());
})

store.dispatch(cake_actions.ordered());
store.dispatch(cake_actions.ordered());
store.dispatch(cake_actions.ordered());
store.dispatch(cake_actions.restocked(3));

unsubscribe();
