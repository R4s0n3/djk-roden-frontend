import React,{useEffect, useState, useContext}from 'react';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import './Dashboard.css';
import Button from '../../shared/components/FormElements/Button';
import { AuthContext} from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import TickersList from '../../ticker/components/TickersList';

import PostList from '../../post/components/PostList';
import TeamsList from '../../team/components/TeamsList';
import PlayersList from '../../player/components/PlayersList';
import TrainersList from '../../trainer/components/TrainersList';
import TrainingsList from '../../training/components/TrainingsList';
import LeadsList from '../../lead/components/LeadsList';
import DatesList from '../../date/components/DatesList';
import SponsorsList from '../../sponsor/components/SponsorsList';
import Input from "../../shared/components/FormElements/Input";

import {
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

const Dashboard = () => {
        const auth = useContext(AuthContext);
                
        const {isLoading, error, sendRequest, clearError} = useHttpClient(); 
        const [loadedSponsors, setLoadedSponsors] = useState();
        const [loadedTrainers, setLoadedTrainers] = useState();
        const [loadedPosts, setLoadedPosts] = useState();
        const [loadedTickers, setLoadedTickers] = useState();
        const [loadedTrainings, setLoadedTrainings] = useState();
        const [loadedTeams, setLoadedTeams] = useState();
        const [loadedPlayers, setLoadedPlayers] = useState();
        const [loadedDates, setLoadedDates] = useState();
        const [loadedLeads, setLoadedLeads] = useState();
        const [loadedData, setLoadedData] = useState(false);
        const [isTicker, setIsTicker] = useState(false);

        const [formState, inputHandler] = useForm(
          {
            title: {
              value: "",
              isValid: false,
            },
            link: {
              value: "",
              isValid: true,
            },
          },
          false
        );
      

        
        useEffect(()=>{
                const fetchData = async () => {
                    try{
            
                        const responsePosts = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/posts');
                        const responseTeams = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/teams');
                        const responsePlayers = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/players');
                        const responseTrainings = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/trainings');
                        const responseTrainers = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/trainers');
                        const responseDates = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/dates');
                        const responseLeads = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/leads');
                        const responseTickers = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/tickers');
                        const responseSponsors = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/sponsors');

                        setLoadedPosts(responsePosts.posts)
                        setLoadedTeams(responseTeams.teams)
                        setLoadedPlayers(responsePlayers.players)
                        setLoadedTrainings(responseTrainings.trainings)
                        setLoadedTrainers(responseTrainers.trainers)
                        setLoadedDates(responseDates.dates)
                        setLoadedTickers(responseTickers.tickers);
                        setLoadedSponsors(responseSponsors.sponsors)
                        setLoadedLeads(responseLeads.leads);
                        setLoadedData(true);
                        
                        
                    }catch(err){
                            console.log(err)
            
                    }
                };
                fetchData();
            },[sendRequest]);

            const deletedTrainerHandler = deletedTrainerId => {
      
              setLoadedTrainers(prevTrainers => prevTrainers.filter(trainer => trainer.id !== deletedTrainerId));
            } 
            
            const deletedTickerHandler = deletedTickerId => {
      
              setLoadedTickers(prevTickers => prevTickers.filter(ticker => ticker.id !== deletedTickerId));
            }

           

            const deletedTrainingHandler = deletedTrainingId => {
      
              setLoadedTrainings(prevTrainings => prevTrainings.filter(training => training.id !== deletedTrainingId));
            }

            const deletedLeadHandler = deletedLeadId => {
      
              setLoadedLeads(prevLeads => prevLeads.filter(lead => lead.id !== deletedLeadId));
            }

            const deletedPostHandler = deletedPostId => {
      
              setLoadedPosts(prevPosts => prevPosts.filter(post => post.id !== deletedPostId));
            }

            const deletedDateHandler = deletedDateId => {
      
              setLoadedDates(prevDates => prevDates.filter(date => date.id !== deletedDateId));
            }
            const deletedSponsorHandler = deletedSponsorId => {
      
              setLoadedSponsors(prevSponsors => prevSponsors.filter(sponsor => sponsor.id !== deletedSponsorId));
            }
            const deletedTeamHandler = deletedTeamId => {
      
              setLoadedTeams(prevTeams => prevTeams.filter(team => team.id !== deletedTeamId));
            }
            const deletedPlayerHandler = deletedPlayerId => {
      
              setLoadedPlayers(prevPlayers => prevPlayers.filter(player => player.id !== deletedPlayerId));
            }


const tickerSubmitHandler = async event => {
  event.preventDefault();
  try{
    const createTicker = await sendRequest(
      process.env.REACT_APP_BACKEND_URL + '/tickers',
      'POST',
      JSON.stringify({
        title: formState.inputs.title.value,
        link: formState.inputs.link.value
      }),
      {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.token
      }
      );
      setLoadedTickers([...loadedTickers, createTicker.ticker]);
      console.log(createTicker);
      console.log(createTicker.ticker);
  }catch(err){}
}          
const tickersHandler= () =>{
    setIsTicker(prev => !prev)
}
    return (<React.Fragment>
         <ErrorModal error={error} onClear={clearError} />
  
  {isLoading && (
    <div className="center">
      <LoadingSpinner asOverlay />
    </div>
  )}
        <div className="dash-container user-dashboard">
{!isLoading && loadedData && <div style={{padding:"0 .5rem"}}>
<h2>Dashboard Übersicht</h2>
<div className="halfwidth">
<div>
<h2>Live Tickers</h2>
    <TickersList items={loadedTickers} onDeleteTicker={deletedTickerHandler}/>
    <div>
    <Button type="button" inverse={isTicker} onClick={tickersHandler}>{isTicker ? "Abbruch" : "Neuer Ticker" }</Button>

    </div>
</div>
    {isTicker && <div>
      <form onSubmit={tickerSubmitHandler} >
      <h2>Neuer Ticker</h2>
      <Input
            element="input"
            id="title"
            type="text"
            label="Text"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="link"
            type="url"
            label="Link"
            validators={[]}
            initialValid={true}
            errorText="Please enter a valid link."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
           +
          </Button>

      </form>
    </div>}
</div>
<div>
<h2>Posts</h2>
<PostList items={loadedPosts} onDeletePost={deletedPostHandler}/>
<Button to="/dashboard/posts">Neuer Post</Button>
</div>
<div>
<h2>Mannschaften</h2>
<TeamsList items={loadedTeams} onDeleteTeam={deletedTeamHandler}/>
<Button to="/dashboard/teams">Neues Team</Button>
</div>
<div>
<h2>Spieler</h2>
<PlayersList items={loadedPlayers} onDeletePlayer={deletedPlayerHandler}/>
<Button to="/dashboard/players">Neuer Spieler</Button>
</div>
<div>
<h2>Trainer</h2>
<TrainersList items={loadedTrainers} onDeleteTrainer={deletedTrainerHandler}/>
<div>
<Button to="/dashboard/trainers">Neuer Trainer</Button>
</div>
</div>

{loadedTrainings && <div>
<h2>Trainings</h2>
<TrainingsList items={loadedTrainings} onDeleteTraining={deletedTrainingHandler}/>
<div>
<Button to="/dashboard/trainings">Neues Training</Button>
</div>

</div>}

<div>
<h2>Termine</h2>
<DatesList items={loadedDates} onDeleteDate={deletedDateHandler}/>
<div>
<Button to="/dashboard/dates">Neuer Termin</Button>
</div>

</div>

<div>
<h2>Vorstand</h2>
<LeadsList items={loadedLeads} onDeleteLead={deletedLeadHandler}/>
<div>
<Button to="/dashboard/leads">Neues Mitglied</Button>
</div>
</div>

<div>
<h2>Sponsoren</h2>
<SponsorsList items={loadedSponsors} onDeleteSponsor={deletedSponsorHandler}/>
<Button to="/dashboard/sponsors">Neuer Sponsor</Button>

</div>
</div>
}
</div>

</React.Fragment>)
}

export default Dashboard;