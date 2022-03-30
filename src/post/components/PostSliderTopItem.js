import React from "react";
import './PostSliderTopItem.css';
import Button from '../../shared/components/FormElements/Button';
import { useNavigate } from "react-router-dom";


const PostSliderTopItem = (props) => {
  const navigate = useNavigate()
  const shortContent = props.content.slice(0, 85);
  const imgStyles={
    backgroundImage: "linear-gradient(to bottom, rgba(40, 204, 100,0.3), rgba(40, 204, 100,0.75)),url(" + process.env.REACT_APP_AWS_URL +  `/${props.image})`,
    backgroundSize: "cover",
    backgroundPosition:"center center"
  }
  const itemClickHandler = () =>{
    navigate(`/posts/${props.id}`);
  }
  
  const DateString = props.date.slice(0,11);
  return (
    <div className="slider-item">
      <div className="slider-item__content-container">
      <i  onClick={itemClickHandler}>
        {DateString}
      </i>
      <div className="slider-item__inner">
      <h2  onClick={itemClickHandler}>{props.title}</h2>
        <p  onClick={itemClickHandler}>{shortContent}...</p>
        <div>
        <Button to={`/posts/${props.id}`}>MEHR</Button>

      </div>
        </div>
      </div>
      <div className="slider-item__img-container"  onClick={itemClickHandler} style={imgStyles}>
      </div>

    </div>
  );
};

export default PostSliderTopItem;
