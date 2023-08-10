const CAKE_ORDERED = 'CAKE_ORDERED';

const orderCake = () => {
  return (
    {
      type: CAKE_ORDERED,
      quantity: 1,
    }
  )
}
