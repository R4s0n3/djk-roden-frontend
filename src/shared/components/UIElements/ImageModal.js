import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';
import './ImageModal.css';

const ModalOverlay = props => {
  const content = (
    <div className={`image-modal ${props.className}`} style={props.style}>
    
        <div onClick={props.onCancel} className={`image-modal__content ${props.contentClass}`}>
          {props.children}
        </div>
     
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const ImageModal = props => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default ImageModal;
