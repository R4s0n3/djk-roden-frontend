import React, {useState, useEffect} from "react";
import './PostSliderTopItem.css';
import Button from '../../shared/components/FormElements/Button';
import { useNavigate } from "react-router-dom";
import {useWindowSize} from '../../shared/hooks/size-hook';

const PostSliderTopItem = (props) => {
  const navigate = useNavigate()

  const [imgHeight, setImgHeight] = useState();
  const size = useWindowSize(true);

 useEffect(()=>{
  const getCardsWidth= ()=>{
      const sliderImgs = document.getElementsByClassName('slider-item__img-container');
      const cardWidth = sliderImgs[0].offsetWidth;
     console.log(cardWidth);
      const ImgHeight = cardWidth / 3 * 2;
      console.log(ImgHeight);

      setImgHeight(ImgHeight);
  } 
  const oldSize = size;
  getCardsWidth();

  if(oldSize !== size){
      getCardsWidth();
  }
 },[size])

  const imgStyles={
    backgroundImage: "url(" + process.env.REACT_APP_AWS_URL +  `/${props.image})`,
    backgroundSize: "cover",
    filter: "contrast(1.25)",
    backgroundPosition:"center center",
    height: imgHeight + "px"
  }
  const itemClickHandler = () =>{
    navigate(`/posts/${props.id}`);
  }
  

  return (
    <div className="slider-item">
      <div className="slider-item__content-container">
      
      <div className="slider-item__inner">
      
      {/* <i onClick={itemClickHandler}>
      <Icon className="djk-icon" icon="bx:calendar" height="22px" color="#006400" /> {formatDate(props.date)}
      </i> */}
      <h2 onClick={itemClickHandler}>{props.title.toUpperCase()}</h2>
      <p> {props.content}</p>
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
