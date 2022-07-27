import React from 'react';
import './LoadingSpinner.css';
import {Icon} from '@iconify/react';

const LoadingSpinner = props => {
  return (
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
     {!props.invisible && <div className="logo-spin"><Icon icon="eos-icons:bubble-loading" color="#006400" width="85" height="85" /></div>}
    </div>
  );
};

export default LoadingSpinner;
