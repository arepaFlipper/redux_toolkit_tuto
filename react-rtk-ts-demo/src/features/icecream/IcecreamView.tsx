import React, { useState } from 'react'
import { ordered, restocked } from './icecreamSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

export const IcecreamView = () => {
  const [value, setValue] = useState(1);
  const numberOfIcecreams = useAppSelector((state) => state.icecream.numOfIcecreams);
  const dispatch = useAppDispatch();
  return (
    <div>
      <h2>Number of ice creams - {numberOfIcecreams}</h2>
      <button onClick={() => dispatch(ordered())}>Order Ice cream</button>
      <input type="number" value={value} onChange={e => setValue(parseInt(e.target.value))} />
      <button onClick={() => dispatch(restocked(value))}>Restock {value} Ice creams</button>
    </div>
  )
}
