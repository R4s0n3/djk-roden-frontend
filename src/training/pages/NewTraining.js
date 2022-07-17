import React,{useEffect, useState, useContext}from 'react';
import TrainingsList from '../components/TrainingsList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Select from '../../shared/components/FormElements/Select';


import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
  } from "../../shared/util/validators";
import { useForm} from "../../shared/hooks/form-hook";
import Button from '../../shared/components/FormElements/Button';
import { AuthContext} from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

const NewTraining = props => {
    const auth = useContext(AuthContext);
    const [createMode, setCreateMode] = useState(false);
    const [formState, inputHandler] = useForm({
    start:{
        value:"",
        isValid:false
    },
    end:{
        value:"",
        isValid:false
    },
    day:{
        value:"",
        isValid:false
    },
    location:{
        value:"",
        isValid:false
    },
    link:{
        value:"",
        isValid:true
    },
    team:{
        value:"",
        isValid:false
    },
    index:{
      value:"",
      isValid:false
    }
    }, false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedTrainings, setLoadedTrainings] = useState();
    const [loadedTeams, setLoadedTeams] = useState();
    const [isLink, setIsLink] = useState(false);
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
         
            <div>
              <Card className="form-card">
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
                errorText="Please enter a end time."
                onInput={inputHandler}
            />
            <Input 
                element="input"
                id="location"
                type="text"
                label="Standort"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a location."
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
             <div className="form-buttons">
            <Button inverse={isLink} type="button" onClick={()=>{setIsLink(prev => !prev)}} size="small">Link</Button>
          
            </div>
             {isLink && <Input 
                element="input"
                id="link"
                type="url"
                label="Link"
                validators={[]}
                initialValid={true}
                errorText="Please enter a valid link."
                onInput={inputHandler}
            />}
            <Button type="submit">Training erstellen</Button>
            </form>
              </Card>
           
            </div>
           
            </div>}
     </div>
          </div>

            </React.Fragment>   )
}

export default NewTraining;