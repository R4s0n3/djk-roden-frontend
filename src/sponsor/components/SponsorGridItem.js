import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import './SponsorGridItem.css';

const SponsorGridItem = (props) => {

    
    
    const CardBGstyle = {
    backgroundImage: "url(" + process.env.REACT_APP_AWS_URL +  `/${props.image})`,
    backgroundSize: "cover",
    filter: "contrast(1.25)",
    backgroundPosition:"center center",
    borderRadius:"8px 8px 0 0",
    flex:"2"
    }

    return(
        <div className="sponsor-grid__card-item">
            <Card className="sponsor-grid__card">
            <div style={CardBGstyle}></div>
           
            <div className="sponsor-grid__card-content-container">
                <h3 className="sponsor-grid__card-title">{props.title}</h3>
                <a className="sponsor-grid__card-link" href={props.link}>{props.link}</a>
                <p className="sponsor-grid__card-info"><b>{props.category}</b></p>
            </div>
            </Card>
        </div>
    )
}

export default SponsorGridItem; 