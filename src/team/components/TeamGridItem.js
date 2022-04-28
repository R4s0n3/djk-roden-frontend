import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import './TeamGridItem.css';
import {Link, useNavigate} from 'react-router-dom';

const TeamGridItem = (props) => {

    const navigate = useNavigate();
    const shortTitle = props.title.slice(0,28);
    const shortContent = props.content.slice(0, 100);
    const CardBGstyle = {
    backgroundImage: "url(" + process.env.REACT_APP_AWS_URL +  `/${props.image})`,
    backgroundSize: "cover",
    filter: "contrast(1.25)",
    backgroundPosition:"center center",
    borderRadius:"8px 8px 0 0",
    flex:"3"
    }

    const navigateHandler = () => {
        navigate(`../mannschaften/${props.status.toLowerCase()}/${props.id}`);
        window.scroll(0, 0);
        document.location.reload();

    }

    return(
        <div className="team-grid__card-item">
            <Card className="team-grid__card">
            <div onClick={navigateHandler} style={CardBGstyle}></div>
           
            <div className="team-grid__card-content-container">
                <h3 className="team-grid__card-title">{props.title.length > 28 ? `${shortTitle} ...` : props.title}</h3>
                <p className="team-grid__card-info">{props.status} | <b>{props.gender}</b> | {props.league}</p>
                <p className="team-grid__card-content">{shortContent} ...</p>
            </div>
            <div className="team-grid__card-footer">
                <Link to={`../mannschaften/${props.status.toLowerCase()}/${props.id}`}>Mehr</Link>
            </div>
            </Card>
        </div>
    )
}

export default TeamGridItem; 