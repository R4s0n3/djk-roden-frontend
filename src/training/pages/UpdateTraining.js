import React, {useEffect, useState, useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
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
import './UpdateTraining.css';

const UpdateTraining = () => {

const auth = useContext(AuthContext);
const {isLoading, error, sendRequest, clearError } = useHttpClient();
const [loadedTraining, setLoadedTraining] = useState();

const trainingId = useParams().trainingId;
const navigate = useNavigate();

const days = [{title:'Montag'},{title:'Dienstag'},{title:'Mittwoch'},{title:'Donnerstag'},{title:'Freitag'},{title:'Samstag'},{title:'Sonntag'}];

const [formState, inputHandler, setFormData] = useForm({
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
        isValid:false
    }
},false);


useEffect(()=>{

    const fetchTraining = async () => {

        try{
            const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/trainings/${trainingId}`);
            setLoadedTraining(responseData.training);
            setFormData({
                start:{
                    value:responseData.training.start,
                    isValid:true
                },
                end:{
                    value:responseData.training.end,
                    isValid:true
                },
                day:{
                    value:responseData.training.day,
                    isValid:true
                },
                location:{
                    value:responseData.training.location,
                    isValid:true
                },
                link:{
                    value:responseData.training.link,
                    isValid:true
                }
            },true
            );

        }catch(err){}
    }

 

    fetchTraining();

},[sendRequest, trainingId, setFormData]);

const trainingUpdateSubmitHandler = async event => {
    event.preventDefault();

    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/trainings/${trainingId}`,
        'PATCH',
        JSON.stringify({
         start: formState.inputs.start.value,
         end: formState.inputs.end.value,
         day: formState.inputs.day.value,
         location: formState.inputs.location.value,
         link: formState.inputs.link.value
            }),
        { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token
      }
      );
        navigate('/dashboard/trainings');
    } catch (error) {
      
    }
  };

  

  if (isLoading) {
    return (
      <div className="center">
       <LoadingSpinner />
      </div>
    );
  }


  if (!loadedTraining && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find training!</h2>
        </Card>
      </div>
    );
  }

  return(
      <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    <div className="update-training dash-container">
    <div>
    <form className="training-form" onSubmit={trainingUpdateSubmitHandler}>
    <h2>Update Training</h2>
            <Input 
                element="input"
                id="start"
                type="time"
                label="Start"
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(2)]}
                errorText="Please enter a start time."
                initialValid={true}
                initialValue={loadedTraining.start}
                onInput={inputHandler}
            />
            <Input 
                element="input"
                id="end"
                type="time"
                label="Ende"
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(2)]}
                errorText="Please enter a end time."
                initialValid={true}
                initialValue={loadedTraining.end}
                onInput={inputHandler}
            />
            <Input 
                element="input"
                id="location"
                type="text"
                label="Standort"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a location."
                initialValid={true}
                initialValue={loadedTraining.location}
                onInput={inputHandler}
            />
            <Input 
                element="input"
                id="link"
                type="text"
                label="Link"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid link."
                initialValid={true}
                initialValue={loadedTraining.link}
                onInput={inputHandler}
            />
            <Select 
                id="day"
                label="Tag"
                options={days}
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(2)]}
                errorText="Please enter a day."
                initialValid={true}
                initialValue={loadedTraining.day}
                onInput={inputHandler}
            />
            

        <Button type="submit" disabled={!formState.isValid}>
            Update Training
        </Button>
    </form>

    </div>

    </div>
      </React.Fragment>
  )}

export default UpdateTraining;