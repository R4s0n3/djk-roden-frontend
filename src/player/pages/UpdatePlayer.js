import React, {useEffect, useState, useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {Icon} from '@iconify/react';
import FormSlider from '../../shared/components/FormElements/FormSlider';

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
    VALIDATOR_MIN
} from "../../shared/util/validators";

import Input from '../../shared/components/FormElements/Input';
import Select from '../../shared/components/FormElements/Select';
import Button from '../../shared/components/FormElements/Button';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

import Card from '../../shared/components/UIElements/Card';
import { AuthContext} from '../../shared/context/auth-context';
import {useForm} from "../../shared/hooks/form-hook";
import { useHttpClient } from '../../shared/hooks/http-hook';
import './UpdatePlayer.css';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const UpdatePlayer = () => {

const auth = useContext(AuthContext);
const {isLoading, error, sendRequest, clearError } = useHttpClient();
const [loadedPlayer, setLoadedPlayer] = useState();
const [loadedPlayers, setLoadedPlayers] = useState();
const [loadedTeams, setLoadedTeams] = useState();
const [isUpload, setIsUpload] = useState();

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


const playerId = useParams().playerId;
const navigate = useNavigate();

const [formState, inputHandler, setFormData] = useForm({
    name:{
        value:"",
        isValid:false
    },
    prename:{
        value:"",
        isValid:false
    },
    age:{
        value:"",
        isValid:true
    },
    position:{
        value:null,
        isValid:true
    },
    index:{
      value:0,
      isValid:true
    },
    number:{
        value:"",
        isValid:true
    },
    team:{
        value:"",
        isValid:false
    }
}, false);


useEffect(()=>{

    const fetchPlayer = async () => {

        try{
            const responsePlayers = await sendRequest(process.env.REACT_APP_BACKEND_URL + "/players");
            setLoadedPlayers(responsePlayers.players);
            const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/players/${playerId}`);
            setLoadedPlayer(responseData.player);
            setFormData({
                name:{
                    value:responseData.player.name,
                    isValid:true
                },
                prename:{
                    value:responseData.player.prename,
                    isValid:true
                },
                age:{
                    value:responseData.player.age,
                    isValid:true
                },
                position:{
                    value:responseData.player.position,
                    isValid:true
                },
                number:{
                    value:responseData.player.number,
                    isValid:true
                },
                team:{
                    value:responseData.player.team,
                    isValid:true
                },
                index:{
                  value:responseData.player.index,
                  isValid:true
                }
            }, true
            );

        }catch(err){}
    }
    const fetchTeams = async () => {
        try{
            const responseTeams = await sendRequest(process.env.REACT_APP_BACKEND_URL + "/teams")
            setLoadedTeams(responseTeams.teams);
        }catch(err){}
    } 
    fetchTeams();
    fetchPlayer();

},[sendRequest, playerId, setFormData]);


const lengthOfPlayers = (loadedPlayers ? loadedPlayers.filter(p => p.team.includes(formState.inputs.team.value)).length - 1 : 0 );

const playerUpdateSubmitHandler = async event => {
    event.preventDefault();

    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/players/${playerId}`,
        'PATCH',
        JSON.stringify({
         name: formState.inputs.name.value,
         prename: formState.inputs.prename.value,
         age: formState.inputs.age.value,
         team: formState.inputs.team.value,
         index: formState.inputs.index.value,
         number: formState.inputs.number.value,
         position: formState.inputs.position.value
        }),
        { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token
      }
      );
        navigate('/dashboard/players');
    } catch (error) {
      
    }
  };

  const confirmImageUploadHandler = async event => {
      event.preventDefault();
      

      try{
        const formData = new FormData();
        formData.append('image', formState.inputs.image.value);
        await sendRequest(
              process.env.REACT_APP_BACKEND_URL + `/players/patchimg/${playerId}`,
              'PATCH',
              formData,
              {Authorization: 'Bearer ' + auth.token}
              )
        document.location.reload();
        setIsUpload(false);


      }catch(err){}
    
  }
const uploadHandler = () => {

    if(isUpload){
        setFormData({
            name:{
                value:loadedPlayer.name,
                isValid:true
            },
            prename:{
                value:loadedPlayer.prename,
                isValid:true
            },
            age:{
                value:loadedPlayer.age,
                isValid:true
            },
            position:{
                value:loadedPlayer.position,
                isValid:true
            },
            index:{
              value:loadedPlayer.index,
              isValid:true
            },
            number:{
                value:loadedPlayer.number,
                isValid:true
            },
            team:{
                value:loadedPlayer.team,
                isValid:true
            }
        }, true
        );
        setIsUpload(false);
    }

    if(!isUpload){
        setFormData({
            image:{
                value:null,
                isValid:false
            }
        },false);
        setIsUpload(true);

    }
}
  

  if (isLoading) {
    return (
      <div className="center">
       <LoadingSpinner />
      </div>
    );
  }


  if (!loadedPlayer && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find player!</h2>
        </Card>
      </div>
    );
  }

  return(
      <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    <div className="update dash-container">
    <div className="update-image__form-container">
    <form onSubmit={confirmImageUploadHandler}>
    <div className="update-image__preview-container">
    {!isUpload && loadedPlayer.image && <img src={process.env.REACT_APP_AWS_URL + `/${loadedPlayer.image}`} alt={loadedPlayer.name} />}
    </div>
        {isUpload &&  <ImageUpload  center id="image" onInput={inputHandler} errorText="Please provide an image" /> }
        <Button onClick={uploadHandler} type="button" ><Icon className="djk-icon" icon={isUpload ? "akar-icons:arrow-back-thick" : "akar-icons:edit"} height="20px" color="#fff" /></Button>
        {isUpload && <Button type="submit" danger>Upload</Button>}
    </form>
    </div>
    <div>
    <form className="update-form" onSubmit={playerUpdateSubmitHandler}>
    <h2>Update Player</h2>
    <Input 
                element="input"
                id="name"
                type="text"
                label="Name"
                initialValid={true}
                initialValue={loadedPlayer.name}
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
            />
            <Input 
                element="input"
                id="prename"
                type="text"
                label="Vorname"
                initialValid={true}
                initialValue={loadedPlayer.prename}
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a prename."
                onInput={inputHandler}
            />
            {loadedTeams &&  <Select 
                id="team"
                label="Mannschaft"
                options={loadedTeams}
                initialValid={true}
                initialValue={loadedPlayer.team}
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(2)]}
                errorText="Please enter a team."
                onInput={inputHandler}
            />}

              <Input 
                element="input"
                id="position"
                type="text"
                datalist="positions"
                label="Position"
                initialValid={true}
                initialValue={loadedPlayer.position}
                validators={[]}
                errorText="Please enter a position."
                onInput={inputHandler}
              />

       

         
            <Input 
                element="input"
                id="age"
                type="date"
                label="Geburtstag"
                initialValid={true}
                initialValue={loadedPlayer.age}
                validators={[]}
                errorText="Please enter a valid age."
                onInput={inputHandler}
            />
              <Input 
                element="input"
                id="number"
                type="number"
                label="Nummer"
                initialValid={true}
                initialValue={loadedPlayer.number}
                validators={[]}
                errorText="Please enter a number" 
                onInput={inputHandler}
            />
             <FormSlider
            id="index"
            onInput={inputHandler}
            min={0}
            initialValue={loadedPlayer.index}
            max={lengthOfPlayers}
            step={1}
            label="Index"
            validators={[VALIDATOR_MIN(0)]}
          />
            <datalist id="positions">
 {positions.map(createOptions)}
</datalist>
        <Button type="submit" disabled={!formState.isValid}>
            Update Player
        </Button>
    </form>

    </div>

    </div>
      </React.Fragment>
  )}

export default UpdatePlayer;