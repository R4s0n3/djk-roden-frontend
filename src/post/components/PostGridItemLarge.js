import React, { useEffect, useState} from 'react';
import Card from '../../shared/components/UIElements/Card';
import './PostGridItemLarge.css';
import {Link, useNavigate}from 'react-router-dom';
import {useWindowSize} from '../../shared/hooks/size-hook';

const PostGridItemLarge = (props) => {
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
    const CardBGstyle = {
    backgroundImage: "url(" + process.env.REACT_APP_AWS_URL +  `/${props.image})`,
    backgroundSize: "cover",
    filter: "contrast(1.25)",
    backgroundPosition:"center center",
    borderRadius:"8px 8px 0 0",
    paddingTop: "66%"
    }

   

    return(
        <div className="post-grid__card-item">
            <Card  className="post-grid__card">
                <span className="post-grid__card-date">{formatDate(DateString)}</span>
            <div onClick={navigateHandler} className="post-grid__card-img"  style={CardBGstyle}></div>
           
            <div onClick={navigateHandler} className="post-grid__card-content-container">
                <h3 className="post-grid__card-title">{props.title}</h3>
                <p className="post-grid__card-info">@{props.author} | <b>{props.category}</b></p>
                <p className="post-grid__card-content">{props.content}</p>
            </div>
            <div className="post-grid__card-footer">
                <Link reloadDocument to={`../posts/${props.id}`}>Mehr</Link>
            </div>
            </Card>
        </div>
    )
}

export default PostGridItemLarge; 