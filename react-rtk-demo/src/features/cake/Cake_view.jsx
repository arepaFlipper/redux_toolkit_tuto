import React from 'react';
import { useSelector } from 'react-redux';

const Cake_view = () => {
  const num_of_cakes = useSelector((state) => state.cake.numOfCakes);
  return (
    <div>
      <h2>Number of Cakes -{num_of_cakes} </h2>
      <button>Order Cake</button>
      <button>Restore Cakes</button>
    </div>
  );
};

export default Cake_view;
