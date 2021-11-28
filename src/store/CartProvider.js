import CartContex from './cart-context';
import { useReducer } from 'react';

const defaultCartState = {
  item: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const exitingCartItemIndex = state.item.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.item[exitingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.item];
      updatedItems[exitingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.item.concat(action.item);
    }

    return {
      item: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.item.findIndex(
      (item) => item.id === action.id
    );
    const exitingItem = state.item[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - exitingItem.price;
    let updatedItems;
    if (exitingItem.amount === 1) {
      updatedItems = state.item.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...exitingItem, amount: exitingItem.amount - 1 };
      updatedItems = [...state.item];
      updatedItems[existingCartItemIndex] = updatedItem;

      return {
        item: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };
  const cartContext = {
    item: cartState.item,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContex.Provider value={cartContext}>
      {props.children}
    </CartContex.Provider>
  );
};

export default CartProvider;
