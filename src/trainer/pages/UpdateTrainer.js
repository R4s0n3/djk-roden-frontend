import React, {useEffect, useState, useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from "../../shared/util/validators";

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Select from '../../shared/components/FormElements/Select';

import Card from '../../shared/components/UIElements/Card';
import { AuthContext} from '../../shared/context/auth-context';
import {useForm} from "../../shared/hooks/form-hook";
import { useHttpClient } from '../../shared/hooks/http-hook';
import './UpdateTrainer.css';

const UpdateTrainer = () => {

const auth = useContext(AuthContext);
const {isLoading, error, sendRequest, clearError } = useHttpClient();
const [loadedTrainer, setLoadedTrainer] = useState();
const [loadedTeams, setLoadedTeams] = useState();

const trainerId = useParams().trainerId;
const navigate = useNavigate();

const [formState, inputHandler, setFormData] = useForm({
    name:{
        value:"",
        isValid:false
    },
    tel:{
        value:"",
        isValid:true
    },
    image:{
        value:null,
        isValid:false
    },
    email:{
        value:"",
        isValid:false
    },
    team:{
        value:"",
        isValid:false
    }
}, false);


useEffect(()=>{

    const fetchTrainer = async () => {

        try{
            const responseTeams = await sendRequest(process.env.REACT_APP_BACKEND_URL + "/teams");
            setLoadedTeams(responseTeams.teams);
            const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/trainers/${trainerId}`);
            setLoadedTrainer(responseData.trainer);
            setFormData({
                name:{
                    value:responseData.trainer.name,
                    isValid:true
                },
                prename:{
                    value:responseData.trainer.prename,
                    isValid:true
                },
                tel:{
                    value:responseData.trainer.tel,
                    isValid:true
                },
                email:{
                    value:responseData.trainer.email,
                    isValid:true
                },
                team:{
                    value:responseData.team,
                    isValid:true
                }
            }, true
            );

        }catch(err){}
    }

 

    fetchTrainer();

},[sendRequest, trainerId, setFormData]);

const trainerUpdateSubmitHandler = async event => {
    event.preventDefault();

    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/trainers/${trainerId}`,
        'PATCH',
        JSON.stringify({
         name: formState.inputs.name.value,
         prename: formState.inputs.prename.value,
         tel: formState.inputs.tel.value,
         email: formState.inputs.email.value,
         team: formState.inputs.team.value
        }),
        { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token
      }
      );
        navigate('/dashboard/trainers');
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


  if (!loadedTrainer && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find trainer!</h2>
        </Card>
      </div>
    );
  }

  return(
      <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    <div className="update dash-container">
    <div>
    <form className="update-form" onSubmit={trainerUpdateSubmitHandler}>
    <h2>Update Trainer</h2>
    <Input 
                element="input"
                id="name"
                type="text"
                label="Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                initialValue={loadedTrainer.name}
                initialValid={true}
                onInput={inputHandler}
            />
            <Input 
                element="input"
                id="prename"
                type="text"
                label="Vorname"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a prename."
                initialValue={loadedTrainer.prename}
                initialValid={true}
                onInput={inputHandler}
            />
            <Input 
                element="input"
                id="tel"
                type="number"
                label="Telefon"
                validators={[]}
                errorText="Please enter a valid age."
                initialValue={loadedTrainer.tel}
                initialValid={true}
                onInput={inputHandler}
            />
            <Input 
                element="input"
                id="email"
                type="text"
                initialValue={loadedTrainer.email}
                initialValid={true}
                label="E-Mail"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid E-Mail."
                onInput={inputHandler}
            />
            {loadedTeams && <Select 
                id="team"
                label="Team"
                options={loadedTeams}
                initialValid={true}
                initialValue={loadedTrainer.team.id}
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(2)]}
                errorText="Please enter a team."
                onInput={inputHandler}
            />}

        <Button type="submit" disabled={!formState.isValid}>
            Update Trainer
        </Button>
    </form>

    </div>

    </div>
      </React.Fragment>
  )}

export default UpdateTrainer;