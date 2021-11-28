import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import { useContext } from 'react';
import CartContex from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartCtx = useContext(CartContex);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.item.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddeHandler = (item) => {
    cartCtx.addItem(item);
  };
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.item.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddeHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
