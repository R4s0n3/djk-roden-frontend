import * as React from 'react';
import './Verein.css';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LeadSlider from '../../lead/components/LeadSlider';
import historyImg from '../../shared/assets/PNG/placeholder.png';
import {Link} from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';


const Verein = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedLeads, setLoadedLeads] = React.useState();
    const [isData, setIsData] = React.useState(false);

    
    React.useEffect(()=>{
        const fetchData = async () => {
      
            try{
    
                const responseLeads = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/leads');

                setLoadedLeads(responseLeads.leads);
                setIsData(true);
                
            }catch(err){
                    console.log(err)
    
            }
        };
        fetchData();
    },[sendRequest]);





    return(<React.Fragment>
<ErrorModal error={error} onClear={clearError} />

  {isLoading && (
    <div className="center">
      <LoadingSpinner asOverlay />
    </div>
  )}

   { !isLoading && isData && <div className="verein">
            <div className="verein-container__header">
            <h1>Der Verein</h1>
            <hr />
            <p className="home-content__paragraph">Willkommen bei unserem Handballverein! Wir sind ein lebendiger und freundlicher Verein, der für Spieler aller Erfahrungsstufen offen ist. Egal, ob du ein absoluter Anfänger oder ein erfahrener Profi bist, wir haben für jeden etwas zu bieten. Wir trainieren regelmäßig und treten an Spieltagen auch gegen andere Mannschaften an. Auch die Geselligkeit kommt bei uns nicht zu kurz, und wir organisieren regelmäßig gesellschaftliche Veranstaltungen für unsere Mitglieder.
            Wenn du also auf der Suche nach einem unterhaltsamen und angenehmen Weg bist, dich fit zu halten, dann komm zu uns!</p>
            <div>
    <Button inverse to="/kontakt">Beitreten</Button>
    <Button to="/news">News</Button>
</div>

            </div>
            <div className="verein-container__history">
            <h1>Vereinsgeschichte</h1>
            <div className="history-img__container">
            <img src={historyImg} alt="history" />
            </div>
            <p className="home-content__paragraph">
            Die DJK besteht seit nun über 100 Jahren und blickt auf eine lange Geschichte zurück. Der Verein war eine treibende Kraft im Handballsport, hat zahlreiche Meisterschaften gewonnen und einige große Spieler des Sports hervorgebracht. Der Deutsche Handballbund kann auf eine lange Tradition zurückblicken und wird auch in den kommenden Jahren eine wichtige Rolle in diesem Sport spielen.
            </p>
           
           <Link reloadDocument to="/verein/history">→ Mehr erfahren</Link>
            </div>
           { isData && <React.Fragment>
           <h1>Vorstände der DJK Roden</h1>
           <hr />
            <div className="verein-container__lead">
            <h2>Vorstand Gesamtverein</h2>
            <LeadSlider speed={7000} items={loadedLeads.filter(p => p.category.title === "Gesamtvorstand")} />
            </div>
            <div className="verein-container__lead">
            <h2>Vorstand Handballabteilung</h2>
            <LeadSlider speed={8000}items={loadedLeads.filter(p => p.category.title === "Abteilungsvorstand")} />
            </div>
            <div className="verein-container__lead">
            <h2>Förderverein</h2>
            <LeadSlider speed={9000}items={loadedLeads.filter(p => p.category.title === "Förderverein")} />
            </div>
            </React.Fragment>}
            </div>}
            
   
           
          </React.Fragment>
    )
}

export default Verein;