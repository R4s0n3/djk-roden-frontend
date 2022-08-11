import * as React from 'react';
import './Verein.css';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LeadSlider from '../../lead/components/LeadSlider';
import historyImg from '../../shared/assets/PNG/history.png';
import foerderImg from '../../shared/assets/PNG/Foerder.jpg';
import abtImg from '../../shared/assets/PNG/Abt.jpg';
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
                const sortedLeads = responseLeads.leads.sort((a, b) => a.index - b.index);
                setLoadedLeads(sortedLeads);
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

 {!isLoading && isData && <div className="verein">
            <div className="verein-container__header">
            <h1>Der Verein</h1>
            <hr />
            <p className="home-content__paragraph">Die DJK Saarlouis-Roden setzt sich aus drei Abteilungen zusammen.<br /><br />
Wir bieten neben der Handballabteilung auch die Sportarten Tischtennis sowie Basketball an. Mit unseren Mitgliedern zählen wir zu einem der größten Vereine der Stadt Saarlouis. Bei uns ist jeder willkommen denn wir bieten nicht nur eine Gemeinschaft, sondern auch Spitzen- und Breitensport, sodass jeder sein Zuhause bei uns findet. Denn worauf es uns wirklich ankommt, sind nicht nur Siege. Es sind die Menschen. Das Mehr im Sport: Leistung finden wir gut, wenn sie fair und menschenwürdig erbracht wird.</p>
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
            Häufig taucht die Frage auf, wer oder was ist eigentlich die DJK, was heißt DJK, was unterscheidet die DJK von einem anderen Sportverein?
Der DJK-Sportverband zählt mit seinen über 500.000 Mitgliedern sowie über 100 Vereinen aus allen Sportarten zu einem der größten Verbände in Deutschland. Die DJK steht für ihre Gemeinschaft und ihr Miteinander. Geprägt wurde das in dem über 100-jährigen Bestehen des DJK-Sportverbandes durch den Ursprung des christlich wertorientierten Sportverbands unter katholischem Dach.
<br /><br/>Wenn du noch mehr über die DJK erfahren möchtest, dann schau dir doch hier unsere Vereinsgeschichte an!

            </p>
           
           <Link reloadDocument to="/verein/history">→ Mehr erfahren</Link>
            </div>
           <React.Fragment>
           <h1>Vorstände der DJK Roden</h1>
            <div className="verein-container__lead">
            <h2>Vorstand Gesamtverein</h2>
           
            <LeadSlider speed={7000} items={loadedLeads.filter(p => p.category.title === "Vorstand Gesamtverein").sort((a, b) => a.index - b.index)} />
            </div>
            <div className="verein-container__lead">
            <h2>Vorstand Handballabteilung</h2>
            <div className="leads-img__container">
            <img src={abtImg} alt="history" />
            </div>
            <LeadSlider speed={8000} items={loadedLeads.filter(p => p.category.title === "Vorstand Handballabteilung").sort((a, b) => a.index - b.index)} />
            </div>
            <div className="verein-container__lead">
            <h2>Förderverein</h2>
            <p className="home-content__paragraph">
            Um die Förderung der Jugendabteilung der DJK Roden weiterhin zu unterstützen wurde der „Förderverein der DJK Roden Abteilung Handball“ gegründet.
            <br />
            <br />
            Die Handballabteilung der DJK Roden leistet mit großer Anteilnahme, sozialer Verantwortung und nicht nur leistungsorientiertem Sport einen wichtigen gesellschaftlichen Beitrag.
            <br />
            Ergebnisse kompetenter Trainer und großes Engagement freiwilliger Helfer zeichnen sich durch regelmäßige Erfolge in der Jugendarbeit und auch bei den Aktiven aus.
            <br />
            Natürlich sind neben persönlichem Einsatz Aller auch finanzielle Mittel notwendig. Daher haben wir es uns zur Aufgabe gemacht, alle motivierten Spieler, Trainer und Helfer mit finanziellen Mitteln zu unterstützen, um so die Erfolge und sportliche Entwicklung aller Kinder weiter zu fördern.
            <br />
            Dies umfasst Zuschüsse u.a. für die Aus- und Weiterbildung von Trainern und Schiedsrichtern, Anschaffung von Trainingsmaterial wie Trikots, Trainingsanzügen oder auch Handbällen, sowie die Anreise zu den Spielstätten der gegnerischen Mannschaften. 
            <br />
            Für all diese Ausgaben reichen heutzutage Vereinsbeiträge bei weitem nicht aus. Darum sind wir auf Unterstützung, die ausschließlich der Handballabteilung der DJK Roden zu Gute kommt angewiesen.
            <br />
            Ob Geschwister, Eltern, Großeltern, Firmen oder einfach nur Initiatoren: Helfen Sie mit und werden Sie Mitglied.
            <br/>
            Die Zukunft des Sports liegt in der Hand unserer Kinder!
            <br />
            Falls Sie noch Fragen haben, schreiben Sie uns einfach an. 
            </p>
            <div className="leads-img__container">
            <img src={foerderImg} alt="history" />
            </div>
        
             <LeadSlider speed={9000} items={loadedLeads.filter(p => p.category.title === "Förderverein").sort((a, b) => a.index - b.index)} />
            </div>
           
              
            
            </React.Fragment>
           
            </div>}
            
          
           
          </React.Fragment>
    )
}

export default Verein;