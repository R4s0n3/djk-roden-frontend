import React from 'react';

import './Avatar.css';

const Avatar = props => {
let avatarSrc;
  if(!props.imgSrc || props.imgSrc === null){
   avatarSrc = `https://ui-avatars.com/api/?name=${props.prename}+${props.name}.svg`;
  }else{
     avatarSrc = process.env.REACT_APP_AWS_URL + `/${props.imgSrc}`;
  }

  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <img
        src={avatarSrc}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};

export default Avatar;
