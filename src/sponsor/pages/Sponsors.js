import * as React from 'react';
import './Sponsors.css';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import SponsorGrid from '../components/SponsorGrid';
import Button from '../../shared/components/FormElements/Button';



const Sponsors = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedSponsors, setLoadedSponsors] = React.useState();
    const [isData, setIsData] = React.useState(false);

    
    React.useEffect(()=>{
        const fetchData = async () => {
      
            try{
    
                const responseSponsors = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/sponsors');

                setLoadedSponsors(responseSponsors.sponsors)
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
            <h1>Sponsoring</h1>
            <hr />
            <p className="home-content__paragraph">Wir sind eine Gruppe von Gleichgesinnten, die sich für die von uns gewählte Tätigkeit begeistern. Um unseren Mitgliedern auch weiterhin das bestmögliche Erlebnis bieten zu können, sind wir immer auf der Suche nach neuen Sponsoren.
            Wenn Sie daran interessiert sind, als Sponsor für unseren Club tätig zu werden, nehmen Sie bitte Kontakt mit uns auf. Wir würden uns freuen, mit Ihnen über die Vorteile eines Sponsorings für unseren Club zu sprechen. Wir glauben, dass ein Sponsoring unseres Clubs eine großartige Möglichkeit ist, Ihr Unternehmen oder Ihre Organisation zu fördern, und wir wären stolz darauf, Sie an Bord zu haben.
            Vielen Dank für Ihre Zeit, und wir hoffen, bald von Ihnen zu hören.</p>
            <div>
            <Button inverse to="/kontakt">Sponsor werden</Button>
            <Button href="">Spenden</Button>
           
            </div>
            </div>
           
           { isData && <React.Fragment>
           <h1>Sponsoren der DJK Roden</h1>
           <hr />
           <p className="home-content__paragraph">
            Wir möchten uns ganz herzlich bei unseren Sponsoren für ihre Hilfe bedanken, die unseren Verein möglich macht. Ohne ihre Unterstützung wären wir nicht in der Lage, die großartige Arbeit zu leisten, die wir tun. Vielen Dank für Ihre anhaltende Unterstützung!
            </p>
            <div className="verein-container__lead">
            <h2>Hauptsponsoren</h2>
          
            <SponsorGrid items={loadedSponsors.filter(s => s.category.title === "Sponsor")} />
            </div>
            <div className="verein-container__lead">
            <h2>Teilsponsoren</h2>
            <SponsorGrid items={loadedSponsors.filter(s => s.category.title === "Sponsor")} />
            </div>
            <div className="verein-container__lead">
            <h2>Minisponsoren</h2>
            <SponsorGrid items={loadedSponsors.filter(s => s.category.title === "Sponsor")} />
            </div>
            </React.Fragment>}
            </div>}
            
   
           
          </React.Fragment>
    )
}

export default Sponsors;