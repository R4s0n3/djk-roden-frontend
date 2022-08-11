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
                const filteredSponsors = responseSponsors.sponsors.sort((a,b) => a.index - b.index)
                setLoadedSponsors(filteredSponsors)
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
           
           
           { isData && <React.Fragment>
           <h1>Sponsoren der DJK Roden</h1>
           <hr />
           <p className="home-content__paragraph">
           Danke allen Sponsoren und Gönnern des Vereins.
           <br />
          Ohne Eure/Ihre finanzielle oder auch materielle Unterstützung wäre es uns nicht möglich, gerade die Jugendarbeit auf diesem im Saarland herausragenden Niveau immer wieder zu halten und fortzuführen.
          <br />
          Wir würden uns freuen, auch in den nächsten Jahren gemeinsam mit Euch/Ihnen den Jugendhandball in Saarlouis voranzubringen.
            </p>
            <div className="verein-container__lead">
            <h2>Sponsoren Verein</h2>
          
            <SponsorGrid items={loadedSponsors.filter(s => s.category.title === "Sponsoren Verein")} />
            </div>
            <div className="verein-container__lead">
            <h2>Sponsoren Teams</h2>
            <SponsorGrid items={loadedSponsors.filter(s => s.category.title === "Sponsoren Teams")} />
            </div>
            </React.Fragment>}
            <div className="verein-container__header">
            <h1>Sponsoring</h1>
            <hr />
            <p className="home-content__paragraph">
            Werden Sie Teil unserer Handballfamilie und melden Sie sich heute noch als Sponsor an. Seit vielen Jahren blicken wir auf eine erfolgreiche Nachwuchsarbeit und dürfen regelmäßig Meisterschaften feiern. Im männlichen Bereich ist unser Maßstab, in jeder Altersklasse mit mind. einer Mannschaft in der höchstmöglichen Spielklasse vertreten zu sein. So können wir mit Stolz immer wieder eine Mannschaft in der Jugendbundesliga stellen und sind in den Oberligen kaum noch wegzudenken. Aber auch im weiblichen Bereich erfreuen wir uns seit einigen Jahren stetig wachsendem Zuwachs, sodass wir immer mehr reine Mädchenmannschaften stellen können. Ein Bereich, den wir in den kommenden Jahren weiter ausbauen wollen.
            <br />
            Dies bietet Ihnen eine großartige Möglichkeit, auch über die regionalen Grenzen hinaus, an Bekanntheit dazu zu gewinnen.
            <br />
            Um den Standard unserer Trainings und Spiele weiter hochzuhalten, benötigen wir dauerhaft verlässliche Partner an unserer Seite, die uns bei der Anschaffung von Trainingsgeräten, Trikots oder auch den Unkosten für den Spielbetrieb unterstützen. 
            <br />
            Haben wir Ihr Interesse geweckt? Dann kontaktieren Sie uns doch gleich.
            </p>
            <div>
            <Button inverse to="/kontakt">Sponsor werden</Button>
            <Button href="">Spenden</Button>
           
            </div>
            </div>
            </div>}

            
            
   
           
          </React.Fragment>
    )
}

export default Sponsors;