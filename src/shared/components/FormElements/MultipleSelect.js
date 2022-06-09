import React, {useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import './MultipleSelect.css';

const inputReducer = (state, action) => {
    switch(action.type){
        case 'CHANGE':
        return{
            ...state,
            value: action.val,
            isValid: validate(action.val, action.validators)
        };
        case 'TOUCH':{
            return{
                ...state,
                isTouched:true
            }
        }
        default:
            return state;
    }
};

const Select = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue,
        isTouched: false,
        isValid: props.initialValid || false
    });

    const {id, onInput} = props;
    const {value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid)
    },[id, value, isValid, onInput]);

    const changeHandler = event => {
        let selections = [];
  var options = document.getElementsByClassName(props.optionsName);
  for (var i = 0; i < options.length; i++) {
    if (options[i].selected) {
      selections.push(options[i].value);
    }
  }

        dispatch({
            type: 'CHANGE',
            val: selections,
            validators: props.validators
        });
    };

    const touchHandler =() => {
        dispatch({
            type:'TOUCH'
        });
    };

    const createOption = (data, index) =>{
        const optionsStyle={
            padding:"1rem 0.5rem",

        }
        return(
            <React.Fragment>
                <option style={optionsStyle} className={props.optionsName} key={index} id={data.id} value={data.id}>{data.title || data.name}</option>
            </React.Fragment>
        )
    }
        
    return (
        <div 
            className={`form-control ${!inputState.isValid && inputState.isTouched &&
        'form-control--invalid'}`}>
        <label htmlFor={props.id}>{props.label}</label>
        <select className="multiple-selection" multiple id={props.id} onChange={changeHandler} value={inputState.value} onBlur={touchHandler} >
            {props.options.map(createOption)}
        </select>
        {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    );
};

export default Select;