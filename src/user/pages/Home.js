import './Home.css';
import React,{useEffect, useState}from 'react';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Button from '../../shared/components/FormElements/Button';
import PostSliderTop from '../../post/components/PostSliderTop';
import SponsorSlider from '../../sponsor/components/SponsorSlider';
import { useHttpClient } from '../../shared/hooks/http-hook';
import PostGrid from '../../post/components/PostGrid';
import LiveTicker from '../../shared/components/UIElements/LiveTicker';
import appmock from '../../shared/assets/PNG/app-mockup.png';
import { Icon } from '@iconify/react';

const Home = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient(); 
    const [loadedSponsors, setLoadedSponsors] = useState();
    const [loadedPosts, setLoadedPosts] = useState();
    const [loadedTickers, setLoadedTickers] = useState();
    const [loadedData, setLoadedData] = useState(false);

  
    const sliderSettings = {
      dots: true,
      prevArrow: false,
    nextArrow: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 750,
    autoplaySpeed:8000,
    cssEase: "ease-in-out"
    };

   
    useEffect(()=>{
            const fetchData = async () => {
          
                try{
        
                    const responsePosts = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/posts');
                    const responseTickers = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/tickers');             
                    const responseSponsors = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/sponsors');

                    setLoadedPosts(responsePosts.posts.filter(p => p.published === "true").reverse())
                    setLoadedTickers(responseTickers.tickers)
                    setLoadedSponsors(responseSponsors.sponsors)
                    setLoadedData(true);
                    
                }catch(err){
                        console.log(err)
        
                }
            };
            fetchData();
        },[sendRequest]);
    
      
        
    return (<React.Fragment>
    <h1 className="sr-only">DJK Saarlouis-Roden</h1>
      <ErrorModal error={error} onClear={clearError} />
  
  {isLoading && (
    <div className="center">
      <LoadingSpinner asOverlay />
    </div>
  )}
    <div className="home-page">
    <div className="home-header">
    {!isLoading && loadedData && <PostSliderTop settings={sliderSettings} items={loadedPosts}/>}
    </div>
    <div className="home-ticker">
      {!isLoading && loadedData && <LiveTicker items={loadedTickers} />}
    </div>
    {!isLoading && loadedData && <div className="home-content">
    <i className="bg"></i>
    <section className="posts">
    <h2>News</h2>
      <p className="home-content__paragraph">
      Willkommen im News-Bereich der DJK! Hier findest du alle aktuellen Nachrichten und Informationen über unseren Verein und seine Aktivitäten. Bleibe auf dem Laufenden, indem du regelmäßig vorbeischaust!
      </p>
    <PostGrid items={loadedPosts} />
    </section>
    <section className="app-cta halfwidth">
    <div>
    <h2>Unsere DJK App</h2>
    <p>Wir freuen uns, dir mitteilen zu können, dass die App unseres Vereins jetzt zum Download zur Verfügung steht. Hol' dir die neuesten Nachrichten, Veranstaltungen und Spiele direkt auf dein Handy. Lade sie jetzt herunter und werde Teil der DJK.
     </p>
    <div className="icon-buttons-container"> 
    <Button icon><Icon icon="ant-design:apple-filled"  height="20px"/> <span>Appstore</span></Button>
    <Button icon><Icon icon="ion:logo-google-playstore" height="20px"/><span>Playstore</span></Button></div>
    </div>
    <div>
      <img className="home-img" alt="iphone mock up"src={appmock} />
    </div>
    </section> 
    </div>}
   {!isLoading && loadedData && <div className="home-sponsors">
    <SponsorSlider items={loadedSponsors} />
    </div>}
    </div>

    </React.Fragment>
        )
}

export default Home;