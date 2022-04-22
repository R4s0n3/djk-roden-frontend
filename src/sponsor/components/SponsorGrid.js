import React from 'react';
import SponsorGridItem from './SponsorGridItem';
import './SponsorGrid.css';

const SponsorGrid = props => {

    const createItems = (data, index) => {
        return(
            <SponsorGridItem
            key={index}
            id={data.id}
            link={data.link}
            category={data.category.title}
            image={data.image}
            title={data.name}
            />
        )
    }

    return(<React.Fragment>
        <div className="sponsor-grid">
        <div className="sponsor-grid__col-full">
        {props.items.map(createItems)}
        </div>
        </div>
</React.Fragment>)
}

export default SponsorGrid;