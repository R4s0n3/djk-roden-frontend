import React from 'react';

import './InputButton.css';


const InputButton = props => {


  
  return (
  
     <input
        id={props.id}
        className="button-input"
        type="button"
        value={props.name}
        style={{ background: `#${props.color}` }}
        onClick={props.onClick}
      />
   
  );
};

export default InputButton;
