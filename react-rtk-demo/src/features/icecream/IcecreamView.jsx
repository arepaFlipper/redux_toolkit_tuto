import React from 'react'
import { useSelector } from 'react-redux'

export const IcecreamView = () => {
  const numberOfIcecreams = useSelector((state) => state.icecream.numOfIcecreams)
  return (
    <div>
      <h2>Number of ice creams - {numberOfIcecreams}</h2>
      <button>Order Ice cream</button>
      <button>Restock Ice creams</button>
    </div>
  )
}
