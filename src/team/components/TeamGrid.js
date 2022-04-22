import React from 'react';
import './TeamGrid.css';
import TeamGridItem from './TeamGridItem';

const TeamGrid = props => {

    const createCardsLG =(data,index)=>{
        return(<TeamGridItem
        key={index}
        content={data.desc}
        image={data.image}
        id={data.id}
        title={data.name}
        status={data.status}    
        gender={data.gender}
        league={data.league}

        />
        )
    }

    return(
        <div className="team-grid">
        <div className="team-grid__col-full">
          {props.items.map(createCardsLG)}
        </div>
        </div>
       )}

export default TeamGrid;

