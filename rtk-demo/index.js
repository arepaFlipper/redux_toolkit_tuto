const store = require('./app/store');
const cake_actions = require('./features/cake/cake_slice').cake_actions;
const icecream_actions = require('./features/icecream/icecream_slice').icecream_actions;
const fetch_users = require('./features/user/user_slice').fetch_users;

console.log(`🎱%cindex.js:5 - Initial state, store.getState()`, 'font-weight:bold; background:467927040;color:#fff;');
console.log('Initial state', store.getState());

const unsubscribe = store.subscribe(() => {
  console.log(`🍌%cindex.js:11 - Updated state, store.getState()`, 'font-weight:bold; background:952565760;color:#fff;');
  console.log('Updated state', store.getState());
})

store.dispatch(fetch_users());
