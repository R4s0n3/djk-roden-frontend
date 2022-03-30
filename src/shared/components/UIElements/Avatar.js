import React from 'react';

import './Avatar.css';

const Avatar = props => {

  const imgSrc = `https://avatars.dicebear.com/api/bottts/${props.name}.svg`;
  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <img
        src={imgSrc}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};

export default Avatar;
