import React,{useEffect, useState, useContext}from 'react';
import PlayersList from '../components/PlayersList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Input from '../../shared/components/FormElements/Input';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import Select from '../../shared/components/FormElements/Select';


import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
    } from "../../shared/util/validators";
import { useForm} from "../../shared/hooks/form-hook";
import Button from '../../shared/components/FormElements/Button';
import { AuthContext} from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

const NewPlayer = props => {
    const auth = useContext(AuthContext);
    const [createMode, setCreateMode] = useState(false);
    const [formState, inputHandler] = useForm({
      name:{
          value:"",
          isValid:false
      },
      prename:{
          value:"",
          isValid:false
      },
      age:{
          value:" ",
          isValid:true
      },
      image:{
          value:null,
          isValid:false
      },
      position:{
          value:"",
          isValid:true
      },
      number:{
          value:"0",
          isValid:true
      },
      team:{
          value:"",
          isValid:false
      }
  }, false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedPlayers, setLoadedPlayers] = useState();
    const [loadedTeams, setLoadedTeams] = useState();

    const [isAge, setIsAge] = useState(false);
    const [isNumber, setIsNumber] = useState(false);

    const positions = [
      {
        position: "RA"
    },
      {
        position: "RR"
    },
      {
        position: "RM"
    },
      {
        position: "RL"
    },
      {
        position: "LA"
    },
      {
        position: "KM"
    },
      {
        position: "TW"
    },
      {
        position: "Rückraum"
    },
      {
        position: "Außen"
    },
      {
        position: "Kreis"
    },
      {
        position: "Tor"
    }
  ]

  const createOptions = (data, index)=>{
    return(<>
      <option key={index} value={data.position} />
    </>
    )
  }

  const handleAge = () => {
    setIsAge(prev => !prev);
  }

  const handleNumbers = () => {
    setIsNumber(prev => !prev);
  }

    const createPlayerHandler = async event =>{
        console.log(formState);
        event.preventDefault();
        let playerData;
        try{
          const formData = new FormData();
          formData.append('name',formState.inputs.name.value);
          formData.append('prename',formState.inputs.prename.value);
          formData.append('age',formState.inputs.age.value);
          formData.append('image',formState.inputs.image.value);
          formData.append('team',formState.inputs.team.value);
          formData.append('position',formState.inputs.position.value);
          formData.append('number',formState.inputs.number.value);
    
          playerData = await sendRequest(
            process.env.REACT_APP_BACKEND_URL + '/players',
            'POST',
            formData,{
              Authorization: 'Bearer ' + auth.token
            });

            setLoadedPlayers([...loadedPlayers, playerData.player]);
        }catch(err){}
    }

    useEffect(()=>{
      const fetchData = async () => {
          try{
  
              const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/players');
              const responseTeams = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/teams');
              setLoadedPlayers(responseData.players);
              setLoadedTeams(responseTeams.teams);
              
          }catch(err){
                  console.log(err)
  
          }
      };
      fetchData();
  },[sendRequest]);

  const handleClick = () =>{
      setCreateMode(prev => !prev);
    }

    const deletedPlayerHandler = deletedPlayerId => {
      
      setLoadedPlayers(prevPlayers => prevPlayers.filter(player => player.id !== deletedPlayerId))
    }


    return(
        <React.Fragment>
         <ErrorModal error={error} onClear={clearError} />
  
  {isLoading && (
    <div className="center">
      <LoadingSpinner asOverlay />
    </div>
  )}

  <div className="dash-container new-player">
      <div className="players-control">
          <div>
              <h2>Spieler Übersicht</h2>
              {!isLoading && loadedPlayers && <PlayersList items={loadedPlayers} onDeletePlayer={deletedPlayerHandler}/>}
              <Button inverse={createMode} onClick={handleClick}>{createMode ? "Abbruch" : "Neuer Player"}</Button>
              </div>
        {createMode &&  <div>
            <h2>Spielerliste</h2>
            <p>Erstelle Spieler</p>
            <div className="halfwidth">
            <div>
            <form className="player-form" onSubmit={createPlayerHandler}>
            <ImageUpload  center id="image" onInput={inputHandler} errorText="Please provide an image" />
            <Input 
                element="input"
                id="name"
                type="text"
                label="Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
            />
            <Input 
                element="input"
                id="prename"
                type="text"
                label="Vorname"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a prename."
                onInput={inputHandler}
            />
              <Select 
                id="team"
                label="Mannschaft"
                options={loadedTeams}
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(2)]}
                errorText="Please enter a team."
                onInput={inputHandler}
            />

              <Input 
                element="input"
                id="position"
                type="text"
                datalist="positions"
                label="Position"
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(2)]}
                errorText="Please enter a position."
                onInput={inputHandler}
              />

            <div className="player-input__optional">
       

            {isAge &&
  <Input 
                element="input"
                id="age"
                type="date"
                label="Geburtstag"
                validators={[]}
                errorText="Please enter a valid age."
                onInput={inputHandler}
            />}
                 <Button inverse={isAge} onClick={handleAge} type="button">{isAge ? "Verwerfen" : "Geburtstag"}</Button>
            </div>
          
         

            <div className="player-input__optional">


              {isNumber &&  <Input 
                element="input"
                id="number"
                type="number"
                label="Nummer"
                validators={[]}
                errorText="Please enter a number" 
                onInput={inputHandler}
            />}
            <Button inverse={isNumber} onClick={handleNumbers} type="button">{isNumber ? "Verwerfen" : "Nummer"}</Button>
            </div> 
            <Button danger type="submit">Spieler erstellen</Button>
            <datalist id="positions">
 {positions.map(createOptions)}
</datalist>
            </form>
            </div>
            </div>
            </div>}
     </div>
          </div>

            </React.Fragment>   )
}

export default NewPlayer;