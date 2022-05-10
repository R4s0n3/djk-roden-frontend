import React, {useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import './Select.css';

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
        value:props.initialValue,
        isTouched: false,
        isValid: props.initialValid || false
    });

    const {id, onInput} = props;
    const {value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid)
    },[id, value, isValid, onInput]);

    const changeHandler = event => {
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators
        });
    };

    const touchHandler =() => {
        dispatch({
            type:'TOUCH'
        });
    };

    const createOption = (data, index) =>{
        return(
            <React.Fragment>
                <option key={index} id={data.id} value={data.id}>{data.title || data.name}</option>
            </React.Fragment>
        )
    }
        
    return (
        <div
            className={`form-control ${!inputState.isValid && inputState.isTouched &&
        'form-control--invalid'}`}>
        <label htmlFor={props.id}>{props.label}</label>
        <select id={props.id} onChange={changeHandler} value={inputState.value} onBlur={touchHandler} >
            <option id="placeholderoption" key="0" value={null}>--</option>
            {props.options.map(createOption)}
        </select>
        {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    );
};

export default Select;