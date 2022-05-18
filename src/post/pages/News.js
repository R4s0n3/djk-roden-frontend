import * as React from 'react';
import './News.css';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import SponsorSlider from '../../sponsor/components/SponsorSlider';
import { useHttpClient } from '../../shared/hooks/http-hook';
import NewsGrid from '../../post/components/NewsGrid';
import LiveTicker from '../../shared/components/UIElements/LiveTicker';
import Button from '../../shared/components/FormElements/Button';

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

                setLoadedPosts(responsePosts.posts.filter(p => p.published === "true").reverse());
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
    Willkommen im News-Bereich der DJK! Hier findest du alle aktuellen Nachrichten und Informationen über unseren Verein und seine Aktivitäten. Bleibe auf dem Laufenden, indem du regelmäßig vorbeischaust!
    </p>

</div> 




<div>
      <NewsGrid items={loadedPosts} filters={loadedCategories} />
</div>
    
    
 </div>

 <LiveTicker items={loadedTickers} />

 <div className="news-page__container">
    <h2>Spiele mit deinem lokalen Handballverein!</h2>
    <p className="home-content__paragraph">Du suchst nach guten Gründen, dem örtlichen Handballverein beizutreten? Schau dir unsere Teams an!</p>
    <p className="home-content__paragraph">Wir sind immer da, um dir ein kaltes Getränk anzubieten oder mit dir zu plaudern, während du dein ganz eigenes Spiel spielst.</p>
    <p className="home-content__paragraph">Das Beste ist, dass wir nie zu weit von den neuen Spielern oder Spielerinnen entfernt sind, die sich uns anschließen möchten. Mache einen Spaziergang und entspanne dich mit unseren Teams, bevor das Spiel beginnt.</p>
    <p className="home-content__paragraph">Die HG Saarlouis bietet einen großartigen Ort zum Spielen und wir sind sicher, dass es auch dir gefallen wird. Tritt uns noch heute bei!</p>
<div>
    <Button inverse to="/kontakt">Beitreten</Button>
    <Button to="/mannschaften">Teams</Button>
</div>
</div>
   <SponsorSlider items={loadedSponsors} /> 
    </div>}
 </React.Fragment>
    )
}

export default News;