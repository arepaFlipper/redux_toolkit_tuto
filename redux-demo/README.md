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
