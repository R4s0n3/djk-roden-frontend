import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import './TeamGridItem.css';
import {Link, useNavigate} from 'react-router-dom';
const TeamGridItem = (props) => {

       
    const navigate = useNavigate();
    const CardBGstyle = {
    backgroundImage: "url(" + process.env.REACT_APP_AWS_URL +  `/${props.image})`,
    backgroundSize: "cover",
    filter: "contrast(1.25)",
    backgroundPosition:"center center",
    borderRadius:"8px 8px 0 0",
    paddingTop: "66%"
    }

    const navigateHandler = () => {
        navigate(`../mannschaften/${props.status.toLowerCase()}/${props.id}`);
        window.scroll(0, 0);
        document.location.reload();

    }

    return(
        <div className="team-grid__card-item">
            <Card className="team-grid__card">
            <div className="team-grid__card-img" onClick={navigateHandler} style={CardBGstyle}></div>
           
            <div className="team-grid__card-content-container">
                <h3 className="team-grid__card-title">{props.title}</h3>
                <p className="team-grid__card-info"><b>{props.gender}</b> | {props.league}</p>
                <p className="team-grid__card-content">{props.content}</p>
            </div>
            <div className="team-grid__card-footer">
                <Link to={`../mannschaften/${props.status.toLowerCase()}/${props.id}`}>Mehr</Link>
            </div>
            </Card>
        </div>
    )
}

export default TeamGridItem; 