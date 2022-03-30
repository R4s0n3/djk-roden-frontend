import React from 'react';
import './PostSlider.css';
import Slider from "react-slick";
import PostSliderItem from './PostSliderItem';

const PostSlider = props => {
    const createItems = (data, index) => {
   
        return (
          <PostSliderItem
            id={data.id}
            key={index}
            image={data.image}
            title={data.title}
            content={data.content}
            creator={data.creator.name}
          />
        );
      };
    
    return(
    <div className="post-slider">
      <Slider {...props.settings}>{props.items.filter(post => post.highlighted === "false" && post.published === "true").map(createItems)}</Slider>
    </div>
    )
}

export default PostSlider;