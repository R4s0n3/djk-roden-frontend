import * as React from "react";
import './PostTeamsItem.css'
import {useNavigate} from "react-router-dom"
const PostTeamsItem = props => {
    const navigate = useNavigate();

    const navigateHandler = () => {
        navigate(`../mannschaften/${props.status}/${props.id}`);
        document.location.reload();

    }
    return(
        <div id={props.id} onClick={navigateHandler} className="post-teams-item">
            <div className="post-teams-item__image-container">
                <img src={process.env.REACT_APP_AWS_URL + `/${props.image}`} alt={props.name} />
            </div>
            <div className="post-teams-item__info-container">
                <div><h2>{props.name}</h2></div>
                <div><h3>{props.league}</h3></div>
            </div>
        </div>
    )
}

export default PostTeamsItem;