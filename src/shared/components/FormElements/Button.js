import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

const Button = props => {
  if (props.href) {
    return (
      <a       
        id={props.id}
        className={`button button--${props.size || 'default'} ${props.inverse &&
          'button--inverse'} ${props.danger && 'button--danger'} ${props.icon && 'button--icon'}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        id={props.id}
        to={props.to}
        exact={props.exact}
        className={`button button--${props.size || 'default'} ${props.inverse &&
          'button--inverse'} ${props.danger && 'button--danger'} ${props.icon && 'button--icon'}`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`button button--${props.size || 'default'} ${props.inverse &&
        'button--inverse'} ${props.danger && 'button--danger'} ${props.icon && 'button--icon'}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      id={props.id}
    >
      {props.children}
    </button>
  );
};

export default Button;
