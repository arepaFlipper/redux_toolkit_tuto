import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ordered, restocked } from './cakeSlice';

export const CakeView = () => {
  const numberOfCakes = useAppSelector((state) => state.cake.numOfCakes);
  const dispatch = useAppDispatch();
  const restockValue = 5
  return (
    <div>
      <h2>Number of cakes - {numberOfCakes} </h2>
      <button onClick={() => dispatch(ordered())}>Order Cake</button>
      <button onClick={() => dispatch(restocked(restockValue))}>Restock {restockValue} Cakes</button>
    </div>
  )
}
