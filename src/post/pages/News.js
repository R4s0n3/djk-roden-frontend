import * as React from 'react';
import './News.css';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import SponsorSlider from '../../sponsor/components/SponsorSlider';
import { useHttpClient } from '../../shared/hooks/http-hook';
import NewsGrid from '../../post/components/NewsGrid';
import LiveTicker from '../../shared/components/UIElements/LiveTicker';
import Button from '../../shared/components/FormElements/Button';
import ball from '../../shared/assets/SVG/ball-green.svg';

const News = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedSponsors, setLoadedSponsors] = React.useState();
    const [loadedPosts, setLoadedPosts] = React.useState();
    const [loadedCategories, setLoadedCategories] = React.useState();
    const [loadedTickers, setLoadedTickers] = React.useState();
    const [isData, setIsData] = React.useState(false);

    
    React.useEffect(()=>{
        const fetchData = async () => {
      
            try{
    
                const responseTickers = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/tickers');             
                const responseSponsors = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/sponsors');
                const responsePosts = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/posts');
                const responseCategories = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/categories');
                const filteredPosts = responsePosts.posts.filter(p => p.published === "true");
                
                setLoadedPosts(filteredPosts);
                setLoadedTickers(responseTickers.tickers)
                setLoadedSponsors(responseSponsors.sponsors.filter(s => s.category.title === "Sponsoren Verein"));
                setLoadedCategories(responseCategories.categories.filter(c => c.filter === "true").sort().reverse())
                setIsData(true);
                
            }catch(err){
                    console.log(err)
    
            }
        };
        fetchData();
    },[sendRequest]);

  

    return(
        <React.Fragment>
<ErrorModal error={error} onClear={clearError} />
  
  {isLoading && (
    <div className="center">
      <LoadingSpinner asOverlay />
    </div>
  )}

  { !isLoading && isData && <div className="news-page">
 <div className="news-page__container">
   
<div style={{margin:"5% 0.5%"}}>
<h1>
        News
    </h1>
    <hr />
    <p className="home-content__paragraph">
    Willkommen im Newsbereich der DJK Saarlouis - Roden. Hier findest du alle aktuellen News und Informationen über unseren Verein und unsere Aktivitäten. Schaue regelmäßig vorbei und bleibe auf dem Laufenden.    </p>

</div> 




<div>
      <NewsGrid items={loadedPosts} filters={loadedCategories} />
</div>
    
    
 </div>

 <LiveTicker items={loadedTickers} />
<div className="news-page__container news-info__container">
    <div className="news-page__container-img">
        <img className="ball" src={ball} alt="rotating-ball"/>
    </div>
<div className="news-page__container-content">
    <h2>Werde jetzt Teil der DJK Handballfamilie</h2>
    <p>Du suchst nach guten Gründen, dem örtlichen Handballverein beizutreten? Schau dir unseren Verein und die Teams an.</p>
    <p>Ein Verein der für und durch seine Mitglieder lebt. Mit einer Mitgliedschaft bei der DJK Saarlouis-Roden, unterstützt du nicht nur den Erhalt des männlichen Leistungshandball in Saarlouis, sondern ermöglichst weiterhin die umfangreiche und wichtige Nachwuchsarbeit von den Minis bis hin zur A-Jugend in den unterschiedlichen Trainingszeiten der HG Saarlouis.</p>
    <p>Und was wäre Saarlouis ohne den Handball?</p>
    <p>Die HG Saarlouis bietet einen großartigen Ort zum Spielen und eröffnet für alle Handball-Verrückten eine Chance dabei zu sein. Tritt uns noch heute als passives, aktives oder förderndes Mitglied bei und unterstütze unsere Arbeit. </p>
<div>
    <Button inverse to="/kontakt">Beitreten</Button>
    <Button to="/mannschaften">Teams</Button>
</div>
</div>

</div>
   <SponsorSlider items={loadedSponsors} /> 
    </div>}
 </React.Fragment>
    )
}

export default News;