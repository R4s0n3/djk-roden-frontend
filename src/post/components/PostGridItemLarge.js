import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import './PostGridItemLarge.css';

const PostGridItemLarge = (props) => {
    const shortContent = props.content.slice(0, 120);
    const DateString = props.date.slice(0, 11);
    const CardBGstyle = {
    backgroundImage: "url(" + process.env.REACT_APP_AWS_URL +  `/${props.image})`,
    backgroundSize: "cover",
    filter: "contrast(1.25)",
    flex:"3",
    backgroundPosition:"center center"
  
    }
    return(
        <div className="post-grid__card-item">
            <Card className="post-grid__card">
            <div style={CardBGstyle}></div>
           
            <div className="post-grid__card-content-container">
                <h3 className="post-grid__card-title">{props.title}</h3>
                <p className="post-grid__card-info">@{props.author} | <b>{props.category}</b> | {DateString}</p>
                <p className="post-grid__card-content">{shortContent}</p>
            </div>
            <div className="post-grid__card-footer">
                <a href={`/posts/${props.id}`}>Mehr</a>
            </div>
            </Card>
        </div>
    )
}

export default PostGridItemLarge; 