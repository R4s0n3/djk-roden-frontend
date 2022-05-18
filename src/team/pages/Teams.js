import * as React from 'react';
import './Teams.css';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import TeamGrid from '../components/TeamGrid';
import { useHttpClient } from '../../shared/hooks/http-hook';


const Teams = props => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedTeams, setLoadedTeams] = React.useState();
    const [isData, setIsData] = React.useState(false);

    React.useEffect(()=>{
        const fetchData = async () => {
      
            try{
    
                const responseTeams = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/teams');    
                const filteredTeams = responseTeams.teams.filter(p => p.status === props.filter)         
                const sortedTeams = filteredTeams.sort((a, b) => a.name.localeCompare(b.name))   
                setLoadedTeams(sortedTeams);            
                setIsData(true);
                
            }catch(err){}
        };
        fetchData();
    },[sendRequest, props.filter]);

    let teamFilters;
    if(props.filter === "Aktive"){
        teamFilters = ['Damen', 'Herren'];
    }
    if(props.filter === "Jugend"){
        teamFilters = ['Männlich','Weiblich', 'Gemischt'];
    }
    

    return(<React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
  
        {!isData && (
        <div className="center">
        <LoadingSpinner asOverlay />
        </div>
        )}

{ !isLoading && isData && <div className="teams-container main-container">


        <h2>Mannschaften {props.filter}</h2>
        <div>
            <TeamGrid items={loadedTeams} filters={teamFilters} />
        </div>
        </div>}
   </React.Fragment> )
    }

export default Teams;