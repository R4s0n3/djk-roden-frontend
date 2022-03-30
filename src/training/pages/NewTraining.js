import React,{useEffect, useState, useContext}from 'react';
import {useNavigate} from "react-router-dom";
import TrainingsList from '../components/TrainingsList';
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

const NewTraining = props => {
    const {trainingsform} = formstates
    const auth = useContext(AuthContext);
    const [createMode, setCreateMode] = useState(false);
    const [formState, inputHandler] = useForm(trainingsform, false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedTrainings, setLoadedTrainings] = useState();
    const [loadedTeams, setLoadedTeams] = useState();
    const days = [{title:'Montag'},{title:'Dienstag'},{title:'Mittwoch'},{title:'Donnerstag'},{title:'Freitag'},{title:'Samstag'},{title:'Sonntag'}];

    const createTrainingHandler = async event =>{
        event.preventDefault();
        let trainingData;
        try{
          trainingData = await sendRequest(
            process.env.REACT_APP_BACKEND_URL + '/trainings',
            'POST',
            JSON.stringify({
              start: formState.inputs.start.value,
              end: formState.inputs.end.value,
              day: formState.inputs.day.value,
              location: formState.inputs.location.value,
              link: formState.inputs.link.value,
              team: formState.inputs.team.value

            }),{
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + auth.token
            });

            setLoadedTrainings([...loadedTrainings, trainingData.training]);
        }catch(err){}
    }

    useEffect(()=>{
      const fetchData = async () => {
          try{
  
              const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/trainings');
              const responseTeams = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/teams');
              setLoadedTrainings(responseData.trainings);
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

    const deletedTrainingHandler = deletedTrainingId => {
      
      setLoadedTrainings(prevTrainings => prevTrainings.filter(training => training.id !== deletedTrainingId));
    }


    return(
        <React.Fragment>
         <ErrorModal error={error} onClear={clearError} />
  
  {isLoading && (
    <div className="center">
      <LoadingSpinner asOverlay />
    </div>
  )}

  <div className="dash-container new-training">
      <div className="trainings-control">
          <div>
              <h2>Trainingszeiten Übersicht</h2>
              {!isLoading && loadedTrainings && <TrainingsList items={loadedTrainings} onDeleteTraining={deletedTrainingHandler}/>}
              <Button inverse={createMode} onClick={handleClick}>{createMode ? "Abbruch" : "Neues Training"}</Button>
              </div>
        {createMode &&  <div>
            <h2>Trainingszeiten</h2>
            <p>Erstelle Training</p>
            <div className="halfwidth">
            <div>
            <form autoComplete="off" className="training-form" onSubmit={createTrainingHandler}>
            <Input 
                element="input"
                id="start"
                type="time"
                label="Start"
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(2)]}
                errorText="Please enter a start time."
                onInput={inputHandler}
            />
            <Input 
                element="input"
                id="end"
                type="time"
                label="Ende"
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(2)]}
                errorText="Please enter a prename."
                onInput={inputHandler}
            />
            <Input 
                element="input"
                id="location"
                type="text"
                label="Standort"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a link."
                onInput={inputHandler}
            />
            <Input 
                element="input"
                id="link"
                type="text"
                label="Link"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid link."
                onInput={inputHandler}
            />
            <Select 
                id="day"
                label="Tag"
                options={days}
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(2)]}
                errorText="Please enter a day."
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
            <Button type="submit">+</Button>
            </form>
            </div>
            </div>
            </div>}
     </div>
          </div>

            </React.Fragment>   )
}

export default NewTraining;