import React from 'react';
import { Link} from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import './PostGridItemSmall.css';

const PostGridItemSmall = (props) => {
    const DateString = props.date.slice(0, 11);
    const shortContent = props.content.slice(0, 50);

    const CardBGstyle = {
    backgroundImage: "url(" + process.env.REACT_APP_AWS_URL +  `/${props.image})`,
    backgroundSize: "cover",
    filter: "contrast(1.25)",
    backgroundPosition:"center center",
    }
    return(
        <div className="post-grid__card-short-container">
            <Card className="post-grid__card-short">
           
           
            <div className="post-round-img" style={CardBGstyle}></div>
            <div>
            <h2 className="post-grid__card-title">{props.title}</h2>
                <p className="post-grid__card-info">@{props.author} | <b>{props.category}</b> | {DateString}</p>
                <p className="post-grid__card-content">{shortContent}...</p>
                <Link to={`/posts/${props.id}`}>Mehr</Link>

            </div>
            
         
              
          
            </Card>
        </div>
    )
}

export default PostGridItemSmall;