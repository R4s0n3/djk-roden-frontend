import React from "react";
import Slider from "react-slick";
import PostSliderTopItem from "./PostSliderTopItem";
import './PostSliderTop.css'

const PostSliderTop = (props) => {
  const createItems = (data, index) => {
    
    return (
      <PostSliderTopItem
        id={data.id}
        key={index}
        image={data.image}
        title={data.title}
        content={data.content}
        date={data.date}
       
      />
    );
  };
  

  return (
    <div className="top-slider">
      <Slider {...props.settings}>{props.items.filter(post => post.highlighted === "true" && post.published === "true").map(createItems)}</Slider>
    </div>
  );
};
export default PostSliderTop;
