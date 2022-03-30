import React from 'react';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import './PostGridItemLarge.css';

const PostGridItemLarge = (props) => {
    const shortContent = props.content.slice(0, 155);
    const DateString = props.date.slice(0, 11);
    const CardBGstyle = {
    backgroundImage: "url(" + process.env.REACT_APP_AWS_URL +  `/${props.image})`,
    backgroundSize: "cover",
    backgroundPosition:"center center"
  
    }
    return(
        <div>
            <Card>
            <div style={CardBGstyle}></div>
           
            <div>
                <h2>{props.title}</h2>
                <p>@{props.author} | {props.category} | {DateString}</p>
                <p>{shortContent}</p>
            </div>
            <div>
                <Button to={`/posts/${props.id}`}>Mehr</Button>
            </div>
            </Card>
        </div>
    )
}

export default PostGridItemLarge;