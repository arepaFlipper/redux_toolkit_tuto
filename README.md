# Three Core Concepts

## Cake Shop

| Entities | Activities |
|-------------- | -------------- |
| Entity | Detail | Activity | Detail |
|-------------- | -------------- | -------------- |  ---------------- |
| Shop | Stores ckaes on a shelf | Customer | Order a cake |
| Shopkeeper | Behind the counter | Shopkeeper | Box a cake from the self |
| Customer | At the store entrance | Sale | Receipt to keep track |

### Three Core Concepts contd.

| Cake Shop Scenario | Redux | Purpose |
|-------------- | -------------- | -------------- |
| Shop | Store | Holds the state of your application |
| Cake | Action | Describes what happened |
| Shopkeeper | Reducer | Ties the store and actions together |

- A **store** that holds the state of your application.
- An **action** that describes what happened in the application.
- A **reducer** which handles the action and decides how to update the state.

### Three Principles

#### First Principle
> "The global of you application is stored as an object inside a single store."

Maintain our application state in a single object which would be managed by Redux store.

<u>Cake Shop</u>-

Let's assume we are tracking the number of cakes on the shelf.

```
{
    numberOfCakes: 10
}
```

#### Second Principle
> "The only way to change the state is to dispatch an action, an object that describes what happened"

To update the state of your app, you need to let Redux know about that with an action.
Not allowed to directly update the state object.

<u>Cake Shop</u>-

Scan the QR code and place an order - CAKE_ORDERED:

```
{
    numberOfCakes: 10
}
```

#### Third Principle
> "To specify how the state tree is updated based on actions, you write pure reducers."

Reducer - (previousState, action) => newState

<u>Cake Shop</u>

Reducer is the shopkeeper:

```
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case CAKE_ORDERED:
        return {
          numberOfCakes: state.numberOfCakes - 1  
        }
    }
}
```

#### Three Principles Overview

![Three Principles Overview](images/redux-demo/three-principles.png)

## Actions
- The only way your application can interact with the store.
- Carry some information from your app to the Redux store.
- Plain JavaScript objects.
- Have a 'type' property that describes something that happened in the application.
- The 'type' property is typically defined as string constants.

## reducers

- Specify how the app's state changes in response to actions sent to the store.
- Function that accepts state and action as arguments, and returns the next state of the application.
- `(previousState, action)=> newState`

![reducers](Redux6.png)

## Store
- One store for the entire application.
- Responsabilities:
  - Holds App state
  - Allows access to state via `getState()`
  - Allows state to be updated via `dispatch()`
  - Registers listeners via `subscribe(listener)`
  - Handles un-registering of listeners via the function returned by `subscribe(listener)`

Execute:

```
❯ npm install @reduxjs/toolkit react-redux axios

❯ node ./index.js
Initial state { numOfCakes: 10 }
Update state { numOfCakes: 9 }
Update state { numOfCakes: 8 }
Update state { numOfCakes: 7 }

```

## Restocking cakes
- Everyday, a vendor comes to the shop to restock the shelves.
- The vendor can stock up one or more number of cakes depending on the previous day sales.


```
❯ node ./index.js
Initial state { numOfCakes: 10 }
Update state { numOfCakes: 9 }
Update state { numOfCakes: 8 }
Update state { numOfCakes: 7 }
Update state { numOfCakes: 10 }

```

```
❯ node ./index.js
Initial state { numOfCakes: 10 }
Update state { numOfCakes: 9 }
Update state { numOfCakes: 8 }
Update state { numOfCakes: 7 }
Update state { numOfCakes: 11 }
```

## Cakes & Ice Creams!
- Cake Shop
- Cakes stored on the shelf
- Shopkeeper to handle CAKE_ORDERED from customer

---

- Sell ice creams!
- Ice creams stored in the freezer
- New Shopkeeper to handle ICECREAM_ORDERED from customer

---

- State of the shop is now the number of cakes on the shelf along with the number of ice creams in the freezer.
- Separate shopkeepers help with scalability.
- Separate shopkeepers help narrow down on a problem when one does arise.

## Multiple Reducers

```
❯ node ./index.js
Initial state { numOfCakes: 10, numOfIcecreams: 20 }
Update state { numOfCakes: 9, numOfIcecreams: 20 }
Update state { numOfCakes: 8, numOfIcecreams: 20 }
Update state { numOfCakes: 7, numOfIcecreams: 20 }
Update state { numOfCakes: 10, numOfIcecreams: 20 }
Update state { numOfCakes: 10, numOfIcecreams: 19 }
Update state { numOfCakes: 10, numOfIcecreams: 18 }
Update state { numOfCakes: 10, numOfIcecreams: 20 }

```

## Combine Reducers
```
❯ node ./index.js
Initial state { cake: { numOfCakes: 10 }, icecream: { numOfIcecreams: 20 } }
Update state { cake: { numOfCakes: 9 }, icecream: { numOfIcecreams: 20 } }
Update state { cake: { numOfCakes: 8 }, icecream: { numOfIcecreams: 20 } }
Update state { cake: { numOfCakes: 7 }, icecream: { numOfIcecreams: 20 } }
Update state { cake: { numOfCakes: 10 }, icecream: { numOfIcecreams: 20 } }
Update state { cake: { numOfCakes: 10 }, icecream: { numOfIcecreams: 19 } }
Update state { cake: { numOfCakes: 10 }, icecream: { numOfIcecreams: 18 } }
Update state { cake: { numOfCakes: 10 }, icecream: { numOfIcecreams: 20 } }
```
## Immer
Sometimes you need to update sub-properties of the state:
We may perform this task by the hard way:
```
❯ node ./nested-state.js
Initial state {
  name: 'Cristian F. Tovar',
  address: {
    street: 'Av. Miguel Hidalgo 123',
    city: 'Guadalajara',
    state: 'CA'
  }
}
Updated state {
  name: 'Cristian F. Tovar',
  address: { street: 'Fake Street 123', city: 'Guadalajara', state: 'CA' }
}

```
Although the code works good, we will struggle with the constantly keep track of the nested-state
to ensure we are modifying only the required property.

To help ease the updation process, we can use Immer:
```
❯ npm install immer
```
We now may replace the nested state to return:
```
    case STREET_UPDATED:
      return {
        ...state,
        address: {
          ...state.address,
          street: action.payload,
        },
      };

```

With the following return:

```
    case STREET_UPDATED:
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      })
```

And then the refactor is going to perform the same output:
```
❯ node ./nested-state.js
Initial state {
  name: 'Cristian F. Tovar',
  address: {
    street: 'Av. Miguel Hidalgo 123',
    city: 'Guadalajara',
    state: 'CA'
  }
}
Updated state {
  name: 'Cristian F. Tovar',
  address: { street: 'Fake Street 123', city: 'Guadalajara', state: 'CA' }
}

```

## Middleware
- Is the suggested way to extend Redux with custom functionality.
- Provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.
- Use middleware for logging, crash reporting, performing asynchronous tasks etc.

steps to use middleware in Redux:

1. import the middleware.
2. pass it into the store as an argument to the createStore() function and pass in the Middleware
to the apply middleware method. This step is where we extend Redux with additional 
functionalities (like asynchronous actions management).

`❯ npm i redux-logger`

```
❯ node ./index.js
Initial state { cake: { numOfCakes: 10 }, icecream: { numOfIcecreams: 20 } }
 action CAKE_ORDERED @ 10:08:23.226
   prev state { cake: { numOfCakes: 10 }, icecream: { numOfIcecreams: 20 } }
   action     { type: 'CAKE_ORDERED', payload: 1 }
   next state { cake: { numOfCakes: 9 }, icecream: { numOfIcecreams: 20 } }
 action CAKE_ORDERED @ 10:08:23.227
   prev state { cake: { numOfCakes: 9 }, icecream: { numOfIcecreams: 20 } }
   action     { type: 'CAKE_ORDERED', payload: 1 }
   next state { cake: { numOfCakes: 8 }, icecream: { numOfIcecreams: 20 } }
 action CAKE_ORDERED @ 10:08:23.228
   prev state { cake: { numOfCakes: 8 }, icecream: { numOfIcecreams: 20 } }
   action     { type: 'CAKE_ORDERED', payload: 1 }
   next state { cake: { numOfCakes: 7 }, icecream: { numOfIcecreams: 20 } }
 action CAKE_RESTOCKED @ 10:08:23.229
   prev state { cake: { numOfCakes: 7 }, icecream: { numOfIcecreams: 20 } }
   action     { type: 'CAKE_RESTOCKED', payload: 3 }
   next state { cake: { numOfCakes: 10 }, icecream: { numOfIcecreams: 20 } }
 action ICECREAM_ORDERED @ 10:08:23.229
   prev state { cake: { numOfCakes: 10 }, icecream: { numOfIcecreams: 20 } }
   action     { type: 'ICECREAM_ORDERED', payload: 1 }
   next state { cake: { numOfCakes: 10 }, icecream: { numOfIcecreams: 19 } }
 action ICECREAM_ORDERED @ 10:08:23.230
   prev state { cake: { numOfCakes: 10 }, icecream: { numOfIcecreams: 19 } }
   action     { type: 'ICECREAM_ORDERED', payload: 1 }
   next state { cake: { numOfCakes: 10 }, icecream: { numOfIcecreams: 18 } }
 action ICECREAM_RESTOCKED @ 10:08:23.230
   prev state { cake: { numOfCakes: 10 }, icecream: { numOfIcecreams: 18 } }
   action     { type: 'ICECREAM_RESTOCKED', payload: 2 }
   next state { cake: { numOfCakes: 10 }, icecream: { numOfIcecreams: 20 } }
```

## Actions
#### Synchronous Actions
- As soon as an action was dispatched, the state was immediately update.
- if you dispatch the CAKE_ORDERED action, the numOfCakes was right away decremented by 1.
- Same with ICECREAM_ORDERED action as well.

#### Async Actions
- Asynchronous API calls to fetch data from an end point and use that data in your application.

### Our Application
Fetches a list of users from an API end point and stores it in the Redux store.

- State ?

- Actions ?

- Reducer ?

### State
```
state = {
  loading: true,
  data: [],
  error: '',
}
```

**loading** Display a loading spinner in your component.
**data** List of users.
**error** Display error to the user.

### Actions
- FETCH_USERS_REQUESTED --- Fetch list of users.
- FETCH_USERS_SUCCEEDED --- Fetched successfully.
- FETCH_USERS_FAILED --- Error when fetching the data.

### Reducers
```
case: FETCH_USERS_REQUESTED
      loading: true

case: FETCH_USERS_SUCCEEDED
      loading: false
      users: data (from API)

case: FETCH_USERS_FAILED
      loading: false
      error: error (from API)
```

## Async action creators

- <u>axios</u> 
  - Requests to an API endpoint.
- <u>redux-thunk</u> 
  - Define async action creators.
  - Middleware.

Install redux-thunk:
```
❯ npm install axios redux-thunk
```

visit: https://jsonplaceholder.typicode.com/
visit: https://jsonplaceholder.typicode.com/users

```
❯ node ./async_actions.js
{ loading: true, users: [], error: '' }
{
  loading: false,
  users: [
    1, 2, 3, 4,  5,
    6, 7, 8, 9, 10
  ],
  error: ''
}
```

## Redux concerns
Redux requires too much boilerplate code.
- Action
- Action object
- Action creator
- Switch statement in a reducer

A lot of other packages have to be installed to work with redux:
- Redux-thunk.
- Immer.
- Redux-devtools.

There was a need to improve the developer experience for redux.

This resulted in the creation of Redux Toolkit:

### Redux Toolkit
Redux toolkit is the official, opinionated, batteries-included tool-set for
efficient Redux development.
- Abstract over the setup process
- Handle the most common use cases
- Include some useful utilities

## Project Setup
```
❯ npm init --yes
Wrote to /home/tovar/Documents/yt-tutos/Codevolution/Redux-Toolkit-Tutorials/rtk-demo/package.json:

{
  "name": "rtk-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

❯ npm i @reduxjs/toolkit
```

## Configure the store
- Create an Slice using createSlice() function, which generates
the actions and reducers.
- Perform direct mutations on the state and that is completely okay with 
immer being used under the hood.
- Create the store using the configure store function and attach the reducer.
- Dispatch actions on the store using store dispatch.
- inspect the state using store.getState()
- listen to changes using store.subscribe()

```

❯ node ./index.js
🎱index.js:5 - Initial state, store.getState()
Initial state { cake: { numOfCakes: 10 }, icecream: { num_of_icecreams: 20 } }
🎱index.js:10 - New state, store.getState()
Updated state { cake: { numOfCakes: 9 }, icecream: { num_of_icecreams: 20 } }
🎱index.js:10 - New state, store.getState()
Updated state { cake: { numOfCakes: 8 }, icecream: { num_of_icecreams: 20 } }
🎱index.js:10 - New state, store.getState()
Updated state { cake: { numOfCakes: 7 }, icecream: { num_of_icecreams: 20 } }
🎱index.js:10 - New state, store.getState()
Updated state { cake: { numOfCakes: 10 }, icecream: { num_of_icecreams: 20 } }
🎱index.js:10 - New state, store.getState()
Updated state { cake: { numOfCakes: 10 }, icecream: { num_of_icecreams: 19 } }
🎱index.js:10 - New state, store.getState()
Updated state { cake: { numOfCakes: 10 }, icecream: { num_of_icecreams: 18 } }
🎱index.js:10 - New state, store.getState()
Updated state { cake: { numOfCakes: 10 }, icecream: { num_of_icecreams: 20 } }

```
## 22 Logger Middleware

```
❯ npm i redux-logger

added 2 packages, and audited 10 packages in 2s

1 package is looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

```
❯ node ./index.js
🎱index.js:5 - Initial state, store.getState()
Initial state { cake: { numOfCakes: 10 }, icecream: { num_of_icecreams: 20 } }
🎱index.js:10 - New state, store.getState()
Updated state { cake: { numOfCakes: 9 }, icecream: { num_of_icecreams: 20 } }
 action cake/ordered @ 19:52:36.086
   prev state { cake: { numOfCakes: 10 }, icecream: { num_of_icecreams: 20 } }
   action     { type: 'cake/ordered', payload: undefined }
   next state { cake: { numOfCakes: 9 }, icecream: { num_of_icecreams: 20 } }
🎱index.js:10 - New state, store.getState()
Updated state { cake: { numOfCakes: 8 }, icecream: { num_of_icecreams: 20 } }
 action cake/ordered @ 19:52:36.088
   prev state { cake: { numOfCakes: 9 }, icecream: { num_of_icecreams: 20 } }
   action     { type: 'cake/ordered', payload: undefined }
   next state { cake: { numOfCakes: 8 }, icecream: { num_of_icecreams: 20 } }
🎱index.js:10 - New state, store.getState()
Updated state { cake: { numOfCakes: 7 }, icecream: { num_of_icecreams: 20 } }
 action cake/ordered @ 19:52:36.090
   prev state { cake: { numOfCakes: 8 }, icecream: { num_of_icecreams: 20 } }
   action     { type: 'cake/ordered', payload: undefined }
   next state { cake: { numOfCakes: 7 }, icecream: { num_of_icecreams: 20 } }
🎱index.js:10 - New state, store.getState()
Updated state { cake: { numOfCakes: 10 }, icecream: { num_of_icecreams: 20 } }
 action cake/restocked @ 19:52:36.091
   prev state { cake: { numOfCakes: 7 }, icecream: { num_of_icecreams: 20 } }
   action     { type: 'cake/restocked', payload: 3 }
   next state { cake: { numOfCakes: 10 }, icecream: { num_of_icecreams: 20 } }
🎱index.js:10 - New state, store.getState()
Updated state { cake: { numOfCakes: 10 }, icecream: { num_of_icecreams: 19 } }
 action icecream/ordered @ 19:52:36.092
   prev state { cake: { numOfCakes: 10 }, icecream: { num_of_icecreams: 20 } }
   action     { type: 'icecream/ordered', payload: undefined }
   next state { cake: { numOfCakes: 10 }, icecream: { num_of_icecreams: 19 } }
🎱index.js:10 - New state, store.getState()
Updated state { cake: { numOfCakes: 10 }, icecream: { num_of_icecreams: 18 } }
 action icecream/ordered @ 19:52:36.093
   prev state { cake: { numOfCakes: 10 }, icecream: { num_of_icecreams: 19 } }
   action     { type: 'icecream/ordered', payload: undefined }
   next state { cake: { numOfCakes: 10 }, icecream: { num_of_icecreams: 18 } }
🎱index.js:10 - New state, store.getState()
Updated state { cake: { numOfCakes: 10 }, icecream: { num_of_icecreams: 20 } }
 action icecream/restocked @ 19:52:36.093
   prev state { cake: { numOfCakes: 10 }, icecream: { num_of_icecreams: 18 } }
   action     { type: 'icecream/restocked', payload: 2 }
   next state { cake: { numOfCakes: 10 }, icecream: { num_of_icecreams: 20 } }
```

## Extra Reducers

In the redux-demo project, we can notice that we have split the reducers into
cakeReducer and icecreamReducer. Then bot are fed into combine reducers which is then
provided to the store.

Even though we have separate reducers, when we despatch an action both the reducers 
receive that action, one of them acts on that action and the other just ignores it.

To understand this better, we can add an extra case CAKE_ORDERED to the icecreamReducer.

First run the following command:
```
❯ node ./redux-demo/index.js
Initial state { cake: { numOfCakes: 10 }, icecream: { numOfIcecreams: 20 } }
Updated state { cake: { numOfCakes: 9 }, icecream: { numOfIcecreams: 20 } }
Updated state { cake: { numOfCakes: 8 }, icecream: { numOfIcecreams: 20 } }
Updated state { cake: { numOfCakes: 7 }, icecream: { numOfIcecreams: 20 } }
Updated state { cake: { numOfCakes: 10 }, icecream: { numOfIcecreams: 20 } }
Updated state { cake: { numOfCakes: 10 }, icecream: { numOfIcecreams: 19 } }
Updated state { cake: { numOfCakes: 10 }, icecream: { numOfIcecreams: 18 } }
Updated state { cake: { numOfCakes: 10 }, icecream: { numOfIcecreams: 20 } }
```
To see current state of the redux-demo, then let's say that we want to give away
a cake when icecream is ordered. We can add the case CAKE_ORDERED into the icecreamReducer:
```
    case CAKE_ORDERED:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams - 1,
      };
```

Now when we execute:
```
❯ node ./redux-demo/index.js
Initial state { cake: { numOfCakes: 10 }, icecream: { numOfIcecreams: 20 } }
Updated state { cake: { numOfCakes: 9 }, icecream: { numOfIcecreams: 19 } }
Updated state { cake: { numOfCakes: 8 }, icecream: { numOfIcecreams: 18 } }
Updated state { cake: { numOfCakes: 7 }, icecream: { numOfIcecreams: 17 } }
Updated state { cake: { numOfCakes: 10 }, icecream: { numOfIcecreams: 17 } }
Updated state { cake: { numOfCakes: 10 }, icecream: { numOfIcecreams: 16 } }
Updated state { cake: { numOfCakes: 10 }, icecream: { numOfIcecreams: 15 } }
Updated state { cake: { numOfCakes: 10 }, icecream: { numOfIcecreams: 17 } }
```
In this change, we can see that whenever a cake is ordered, both the cake counter
and the icecream counter decrease by 1.

In conclusion, each reducer can update only its portion of the application state. However,
it can respond to any action dispatched in the application.

So, the `icecream_reducer` can only update the numberOfIcecreams, but it can still respond
to the CAKE_ORDERED action type. The reason of this is because with toolkit that
is not going to happened.
By default reducers from one create slice will only respond to the action types
generated by the same slice.

If you want a slice to respond to other action types besides the types it has 
generated, you'll need to make use of **extra reducers**.

<u>Extra reducers</u> This appart from the reducer generated by create slice.

Let's repeat the same scenario but in rtk-demo.

```
❯ node ./rtk-demo/index.js
The object notation for `createSlice.extraReducers` is deprecated, and will be removed in RTK 2.0. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice
🎱index.js:5 - Initial state, store.getState()
Initial state { cake: { numOfCakes: 10 }, icecream: { num_of_icecreams: 20 } }
🥩index.js:11 - Updated state, store.getState()
Updated state { cake: { numOfCakes: 9 }, icecream: { num_of_icecreams: 19 } }
🥩index.js:11 - Updated state, store.getState()
Updated state { cake: { numOfCakes: 8 }, icecream: { num_of_icecreams: 18 } }
🥩index.js:11 - Updated state, store.getState()
Updated state { cake: { numOfCakes: 7 }, icecream: { num_of_icecreams: 17 } }
🥩index.js:11 - Updated state, store.getState()
Updated state { cake: { numOfCakes: 10 }, icecream: { num_of_icecreams: 17 } }
🥩index.js:11 - Updated state, store.getState()
Updated state { cake: { numOfCakes: 10 }, icecream: { num_of_icecreams: 16 } }
🥩index.js:11 - Updated state, store.getState()
Updated state { cake: { numOfCakes: 10 }, icecream: { num_of_icecreams: 15 } }
🥩index.js:11 - Updated state, store.getState()
Updated state { cake: { numOfCakes: 10 }, icecream: { num_of_icecreams: 17 } }
```

In the same way both the num_of_icecreams and num_of_cakes decreases by 1, when 
an icecream is ordered.
