import React,{useEffect, useState, useContext}from 'react';
import {useNavigate} from "react-router-dom";
import TrainersList from '../components/TrainersList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Input from '../../shared/components/FormElements/Input';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Select from '../../shared/components/FormElements/Select';
import formstates from '../../shared/util/formstates';


import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
    VALIDATOR_MAXLENGTH
  } from "../../shared/util/validators";
import { useForm} from "../../shared/hooks/form-hook";
import Button from '../../shared/components/FormElements/Button';
import { AuthContext} from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { Icon } from '@iconify/react';

const NewTrainer = props => {
    const {trainerform} = formstates
    const auth = useContext(AuthContext);
    const [createMode, setCreateMode] = useState(false);
    const [formState, inputHandler] = useForm(trainerform, false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedTrainers, setLoadedTrainers] = useState();
    const [loadedTeams, setLoadedTeams] = useState();

    const createTrainerHandler = async event =>{
        console.log(formState);
        event.preventDefault();
        let trainerData;
        try{
          trainerData = await sendRequest(
            process.env.REACT_APP_BACKEND_URL + '/trainers',
            'POST',
            JSON.stringify({
              name: formState.inputs.name.value,
              prename: formState.inputs.prename.value,
              tel: formState.inputs.tel.value,
              email: formState.inputs.email.value,
              team: formState.inputs.team.value

            }),{
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + auth.token
            });

            setLoadedTrainers([...loadedTrainers, trainerData.trainer]);
        }catch(err){}
    }

    useEffect(()=>{
      const fetchData = async () => {
          try{
  
              const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/trainers');
              const responseTeams = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/teams');
              setLoadedTrainers(responseData.trainers);
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

    const deletedTrainerHandler = deletedTrainerId => {
      
      setLoadedTrainers(prevTrainers => prevTrainers.filter(trainer => trainer.id !== deletedTrainerId));
    }


    return(
        <React.Fragment>
         <ErrorModal error={error} onClear={clearError} />
  
  {isLoading && (
    <div className="center">
      <LoadingSpinner asOverlay />
    </div>
  )}

  <div className="dash-container new-trainer">
      <div className="trainers-control">
          <div>
              <h2>Trainer Übersicht</h2>
              {!isLoading && loadedTrainers && <TrainersList items={loadedTrainers} onDeleteTrainer={deletedTrainerHandler}/>}
              <Button inverse={createMode} onClick={handleClick}>{createMode ? "Abbruch" : "Neuer Trainer"}</Button>
              </div>
        {createMode &&  <div>
            <h2>Trainerliste</h2>
            <p>Erstelle Trainer</p>
            <div className="halfwidth">
            <div>
            <form autoComplete="off" className="trainer-form" onSubmit={createTrainerHandler}>
            <Input 
                element="input"
                id="name"
                type="text"
                label="Name"
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(2)]}
                errorText="Please enter a name."
                onInput={inputHandler}
            />
            <Input 
                element="input"
                id="prename"
                type="text"
                label="Vorname"
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(2)]}
                errorText="Please enter a prename."
                onInput={inputHandler}
            />
            <Input 
                element="input"
                id="tel"
                type="number"
                label="Telefon"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid age."
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
                id="email"
                type="text"
                
                label="E-Mail"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid E-Mail."
                onInput={inputHandler}
            />
            <Button type="submit">+</Button>
            </form>
            </div>
            </div>
            </div>}
     </div>
          </div>

            </React.Fragment>   )
}

export default NewTrainer;