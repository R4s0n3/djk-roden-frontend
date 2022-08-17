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
                const sortedTeams = filteredTeams.sort((a, b) => a.index - b.index);   
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
        <h3>Wir stellen uns vor</h3>
        {props.filter === "Aktive" && <p className="home-content__paragraph">Im Aktivenbereich bieten wir vom Leistungssport, bis hin zum Amateurhandball, eine Plattform für jeden.</p>}

        {props.filter === "Jugend" && <p className="home-content__paragraph">
        Während wir bei unseren Breitensportmannschaften verstärkt den Fokus auf Gemeinschaftserlebnisse und den Spaß an Bewegung und unserem Sport legen, konzentrieren wir uns bei unseren Leistungsmannschaften auf die individuelle Entwicklung der Spieler, gemeinsame sportliche Erfolge und die Leistungsmaximierung der Teams.
        <br /><br />
        Entsprechend spielen wir im männl. Jugendbereich seit vielen Jahren in allen Altersgruppen mit mindestens einer Jugendmannschaft in der höchstmöglichen Spielklasse. Aber auch im weiblichen Bereich erleben wir aktuell einen enormen Zuwachs, sodass wir zunehmend reine Mädchenmannschaften aufbauen können.

        </p>}
        <div>
            <TeamGrid items={loadedTeams.sort((a, b) => a.index - b.index)} filters={teamFilters} />
        </div>
        </div>}

   </React.Fragment> )
    }

export default Teams;