import classes from './Modal.module.css';
import { Fragment } from 'react';
import { createPortal } from 'react-dom';

const Backdrop = (props) => {
  return <div className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const prortalElement = document.getElementById('overlays');
const Modal = (props) => {
  return (
    <Fragment>
      {createPortal(<Backdrop />, prortalElement)}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        prortalElement
      )}
    </Fragment>
  );
};

export default Modal;
