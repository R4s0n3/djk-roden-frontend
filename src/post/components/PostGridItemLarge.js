import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import './PostGridItemLarge.css';
import {Link, useNavigate}from 'react-router-dom';

const PostGridItemLarge = (props) => {
    const navigate = useNavigate();

    const navigateHandler = () => {
        navigate(`../posts/${props.id}`);
        document.location.reload();

    }
    const formatDate = d => {
        let oldDate = d;
        const year = oldDate.slice(0,4);
        const month = oldDate.slice(5,7);
        const day = oldDate.slice(8,10)
        return(
            `${day}.${month}.${year}`
        )

    }
    const shortTitle = props.title.slice(0,28);
    const shortContent = props.content.slice(0, 100);
    const DateString = props.date.slice(0, 11);
    const CardBGstyle = {
    backgroundImage: "url(" + process.env.REACT_APP_AWS_URL +  `/${props.image})`,
    backgroundSize: "cover",
    filter: "contrast(1.25)",
    backgroundPosition:"center center",
    borderRadius:"8px 8px 0 0",
    flex:"3"
    }

   

    return(
        <div className="post-grid__card-item">
            <Card className="post-grid__card">
            <div onClick={navigateHandler} style={CardBGstyle}></div>
           
            <div className="post-grid__card-content-container">
                <h3 className="post-grid__card-title">{props.title.length > 28 ? `${shortTitle} ...` : props.title}</h3>
                <p className="post-grid__card-info">@{props.author} | <b>{props.category}</b> | {formatDate(DateString)}</p>
                <p className="post-grid__card-content">{shortContent} ...</p>
            </div>
            <div className="post-grid__card-footer">
                <Link reloadDocument to={`../posts/${props.id}`}>Mehr</Link>
            </div>
            </Card>
        </div>
    )
}

export default PostGridItemLarge; 