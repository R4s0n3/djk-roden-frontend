import * as React from 'react';
import Slider from '@mui/material/Slider';
import { validate } from '../../util/validators';
import './FormSlider.css';

const inputReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE':
        return {
          ...state,
          value: action.val,
          isValid: validate(action.val, action.validators)
        };
      default:
        return state;
    }
  };

const FormSlider = props => {
    const [inputState, dispatch] = React.useReducer(inputReducer, {
        value: props.initialValue || 0,

        isValid: props.initialValid || false
      });
    
      const { id, onInput } = props;
      const { value, isValid } = inputState;
    
      React.useEffect(() => {
        onInput(id, value, isValid)
      }, [id, value, isValid, onInput]);
    
      const changeHandler = event => {
        dispatch({
          type: 'CHANGE',
          val: event.target.value,
          validators: props.validators
        });
        console.log(inputState);
      };

    
    return(
    <div className={`form-control ${!inputState.isValid && inputState.isTouched &&
        'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
<Slider
    className="form-slider"
    id={props.id}
    value={inputState.value}
    aria-label={props.label}
    defaultValue={props.initialValue}
    valueLabelDisplay="auto"
    step={props.step}
    marks
    onChange={changeHandler}
    min={props.min}
    max={props.max}
    sx={{
        width: "50%",
        color: '#006400',
      }}
  />
    </div>
    )
}
export default FormSlider;

