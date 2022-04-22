import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import './Checkbox.css';

const checkboxReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE':
        return {
          ...state,
          value: action.val,
          isValid: validate(action.val, action.validators)
        };
      case 'TOUCH': {
        return {
          ...state,
          isTouched: true
        }
      }
      default:
        return state;
    }
  };

const Checkbox = (props) =>{
    const [checkboxState, dispatch] = useReducer(checkboxReducer,{
        value:props.initialValue || false,
        isTouched:false,
        isValid:props.initialValid || false
    });

    const {id, onCheck} = props;
    const {value, isValid} = checkboxState;

    useEffect(()=>{
        onCheck(id, value, isValid)
    },[id, value,isValid, onCheck]);

    const changeHandler = event =>{
        dispatch({
            type:'CHANGE',
            val:event.target.checked,
            validators: props.validators
        });
    };

    const touchHandler =() => {
        dispatch({
            type:'TOUCH'
        });
    };

    return(
        <div
        className={`form-control ${!checkboxState.isValid && checkboxState.isTouched &&
          'form-control--invalid'}`}
      >
        <label htmlFor={props.id}>{props.label}</label>
        <div className="checkbox-container">
        <input 
            id={props.id}
            type="checkbox"
            onChange={changeHandler}
            onBlur={touchHandler}
            value={checkboxState.value}
        />
        {!checkboxState.isValid && checkboxState.isTouched && <p>{props.errorText}</p>}
        {checkboxState.value === true && <p className="checked-text">{props.checkedText}</p>}
        </div>
     
      </div>
    )
}

export default Checkbox;