const store = require('./app/store');
const cake_actions = require('./features/cake/cake_slice').cake_actions;
const icecream_actions = require('./features/icecream/icecream_slice').icecream_actions;

console.log(`🎱%cindex.js:5 - Initial state, store.getState()`, 'font-weight:bold; background:467927040;color:#fff;');
console.log('Initial state', store.getState());

const unsubscribe = store.subscribe(() => {
  console.log(`🥩%cindex.js:11 - Updated state, store.getState()`, 'font-weight:bold; background:952565760;color:#fff;');
  console.log('Updated state', store.getState());
})

store.dispatch(cake_actions.ordered());
store.dispatch(cake_actions.ordered());
store.dispatch(cake_actions.ordered());
store.dispatch(cake_actions.restocked(3));

store.dispatch(icecream_actions.ordered());
store.dispatch(icecream_actions.ordered());
store.dispatch(icecream_actions.restocked(2));

unsubscribe();
