import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { ordered, restocked } from './cakeSlice';

export const CakeView = () => {
  const numberOfCakes = useSelector((state) => state.cake.numOfCakes)
  const dispatch = useDispatch()
  const restockValue = 5
  return (
    <div>
      <h2>Number of cakes - {numberOfCakes} </h2>
      <button onClick={() => dispatch(ordered())}>Order Cake</button>
      <button onClick={() => dispatch(restocked(restockValue))}>Restock {restockValue} Cakes</button>
    </div>
  )
}
