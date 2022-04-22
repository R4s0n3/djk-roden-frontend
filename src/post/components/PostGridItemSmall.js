import React from 'react';
import { Link} from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import './PostGridItemSmall.css';

const PostGridItemSmall = (props) => {
    const formatDate = d => {
        let oldDate = d;
        const year = oldDate.slice(0,4);
        const month = oldDate.slice(5,7);
        const day = oldDate.slice(8,10)
        return(
            `${day}.${month}.${year}`
        )

    }
    const shortTitle = props.title.slice(0,20);
    const DateString = props.date.slice(0, 11);
    const shortContent = props.content.slice(0, 50);


    return(
        <div className="post-grid__card-short-container">
            <Card className="post-grid__card-short">
<div className="post-grid__card-short__header">
        <h2 className="post-grid__card-title">{props.title.length > 20 ? `${shortTitle} ...` : props.title}</h2>
        <div className="post-round-img">
            <img src={process.env.REACT_APP_AWS_URL +  `/${props.image}`} alt={props.title} />
        </div>
</div>
           
        
            <div className="post-grid__cards-short__content-container">
                <p className="post-grid__card-info">@{props.author} | <b>{props.category}</b> | {formatDate(DateString)}</p>
                <p className="post-grid__card-short-content">{shortContent}...</p>
                <Link reloadDocument to={`/posts/${props.id}`}>Mehr</Link>

            </div>
            
         
              
          
            </Card>
        </div>
    )
}

export default PostGridItemSmall;