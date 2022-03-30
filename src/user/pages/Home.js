import './Home.css';
import React,{useEffect, useState, useContext}from 'react';
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
    // const [loadedUsers, setLoadedUsers] = useState();
    // const [loadedTrainers, setLoadedTrainers] = useState();
    const [loadedPosts, setLoadedPosts] = useState();
    const [loadedTickers, setLoadedTickers] = useState();
    // const [loadedTrainings, setLoadedTrainings] = useState();
    // const [loadedTeams, setLoadedTeams] = useState();
    // const [loadedPlayers, setLoadedPlayers] = useState();
    // const [loadedDates, setLoadedDates] = useState();
    // const [loadedLeads, setLoadedLeads] = useState();
    const [loadedData, setLoadedData] = useState(false);

  const newsSliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 750,
    autoplaySpeed:8000,
    cssEase: "ease-in-out"
  }
    const sliderSettings = {
      dots: true,
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
        
                    // const responseUsers = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/users');
                    const responsePosts = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/posts');
                    const responseTickers = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/tickers');
                    // const responseTeams = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/teams');
                    // const responsePlayers = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/players');
                    // const responseTrainings = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/trainings');
                    // const responseTrainers = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/trainers');
                    // const responseDates = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/dates');
                    // const responseLeads = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/leads');
                    const responseSponsors = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/sponsors');

                    // setLoadedUsers(responseUsers.users)
                    setLoadedPosts(responsePosts.posts)
                    setLoadedTickers(responseTickers.tickers)
                    // setLoadedTeams(responseTeams.teams)
                    // setLoadedPlayers(responsePlayers.players)
                    // setLoadedTrainings(responseTrainings.trainings)
                    // setLoadedTrainers(responseTrainers.trainers)
                    // setLoadedDates(responseDates.dates)
                    setLoadedSponsors(responseSponsors.sponsors)
                    // setLoadedLeads(responseLeads.leads);
                    setLoadedData(true);
                    
                }catch(err){
                        console.log(err)
        
                }
            };
            fetchData();
        },[sendRequest]);
    
      
        
    return (<React.Fragment>
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
      <p className="home-content__paragraph">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
      sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
      aliquyam erat, sed diam voluptua. At vero eos et accusam et justo 
      duo dolores et ea rebum. </p>
    <PostGrid  />
    </section>
    <section className="app-cta halfwidth">
    <div>
    <h2>Unsere DJK App</h2>
    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
    sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
     sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
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