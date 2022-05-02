import React, {useState} from 'react';
import './TeamGrid.css';
import Button from '../../shared/components/FormElements/Button';
import TeamGridItem from './TeamGridItem';

const TeamGrid = props => {
  const [filterState, setFilterState] = useState();
  const genderOptions = [{title:'Weiblich'},{title:'Männlich'},{title:'Gemischt'}];

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


    const handleAll = () => {
      setFilterState(false);
    }
    
    const handleFilters = e => {
      e.preventDefault();
      setFilterState(e.target.innerHTML);
    }

    const createFilter = (data, index) => {
      return(
        <Button key={index} inverse={filterState === data.title} type="button" onClick={handleFilters}>{data.title}</Button>
        
      )
    }

    return(
        <div className="team-grid">
       <div style={{margin:"0 0 1rem 0.5%"}}>
       <Button inverse={!filterState} type="button"  onClick={handleAll}>Alle</Button>
      {genderOptions.map(createFilter)}
     </div>
        <div className="team-grid__col-full">
        {filterState && props.items.filter(team => team.gender === filterState).map(createCardsLG)}
          {!filterState && props.items.map(createCardsLG)}
        </div>
        </div>
       )}

export default TeamGrid;

