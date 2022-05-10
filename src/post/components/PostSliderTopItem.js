import React from "react";
import './PostSliderTopItem.css';
import Button from '../../shared/components/FormElements/Button';
import { useNavigate } from "react-router-dom";


const PostSliderTopItem = (props) => {
  const navigate = useNavigate()
  const formatDate = d => {
    let oldDate = d;
    const year = oldDate.slice(0,4);
    const month = oldDate.slice(5,7);
    const day = oldDate.slice(8,10)
    return(
        `${day}.${month}.${year}`
    )

}
  const shortContent = props.content.slice(0, 85);
  const imgStyles={
    backgroundImage: "url(" + process.env.REACT_APP_AWS_URL +  `/${props.image})`,
    backgroundSize: "cover",
    filter: "contrast(1.25)",
    backgroundPosition:"center center",
    flex:'3'
  }
  const itemClickHandler = () =>{
    navigate(`/posts/${props.id}`);
  }
  

  return (
    <div className="slider-item">
      <div className="slider-item__content-container">
      <i  onClick={itemClickHandler}>
        {formatDate(props.date)}
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
