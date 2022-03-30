import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css';

const SideDrawer = props => {

  const nodeRef = useRef(null);

  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      nodeRef={nodeRef}
      classNames="drawer"
      unmountOnExit
      mountOnEnter
    >
      <div ref={nodeRef} className="side-drawer" onClick={props.onClick}>{props.children}</div>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;
