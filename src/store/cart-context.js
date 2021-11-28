import React from 'react';

const CartContex = React.createContext({
  item: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContex;
