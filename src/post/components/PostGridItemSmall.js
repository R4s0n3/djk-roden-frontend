import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import './PostGridItemSmall.css';

const PostGridItemSmall = (props) => {
    const navigate = useNavigate();

    const navigateHandler = () => {
        navigate(`../posts/${props.id}`);
        document.location.reload();

    }
    const formatDate = d => {
        let oldDate = d;
        const year = oldDate.slice(2,4);
        const month = oldDate.slice(5,7);
        const day = oldDate.slice(8,10)
        return(
            `${day}.${month}.${year}`
        )

    }
    const DateString = props.date.slice(0, 11);


    return(
        <div className="post-grid__card-short-container">
            <Card onClick={navigateHandler} className="post-grid__card-short">
            <span className="post-grid__card-date">{formatDate(DateString)}</span>

<div className="post-grid__card-short__header">
        <h2 className="post-grid__card-title">{props.title}</h2>
        <div className="post-round-img">
            <img src={process.env.REACT_APP_AWS_URL +  `/${props.image}`} alt={props.title} />
        </div>
</div>
           
        
            <div className="post-grid__cards-short__content-container">
                <p className="post-grid__card-info">@{props.author} | <b>{props.category}</b></p>
                <p className="post-grid__card-short-content">{props.content}</p>
                <Link reloadDocument to={`/posts/${props.id}`}>Mehr</Link>

            </div>
            
         
              
          
            </Card>
        </div>
    )
}

export default PostGridItemSmall;