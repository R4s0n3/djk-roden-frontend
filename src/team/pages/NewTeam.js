import React,{useEffect, useState, useContext}from 'react';
import {useNavigate} from "react-router-dom";
import TeamsList from '../components/TeamsList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Input from '../../shared/components/FormElements/Input';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import Select from '../../shared/components/FormElements/Select';


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
import formstates from '../../shared/util/formstates';

import './NewTeam.css';

const NewTeam = () => {
    const {teamform} = formstates;
    const auth = useContext(AuthContext);
    const [loadedTeams, setLoadedTeams] = useState();
    const [createMode, setCreateMode] = useState(false); 
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    const [formState, inputHandler] = useForm(teamform,false)


  const genderOptions = [{title:'Weiblich'},{title:'Männlich'},{title:'Gemischt'}];
  const statusOptions = [{title:'Jugend'},{title:'Aktive'}];

  let navigate = useNavigate();

  useEffect(()=>{
    const fetchData = async () => {
        try{

            const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL +'/teams');
            setLoadedTeams(responseData.teams);
            
        }catch(err){
                console.log(err)

        }
    };
    fetchData();
},[sendRequest]);


    const handleClick = () =>{
        setCreateMode(prev => !prev);

    }

    const cancelCreateMode = () => {
        setCreateMode(false);
    }

    const deletedTeamHandler = deletedTeamId => {
        setLoadedTeams(prevTeams => prevTeams.filter(team => team.id !== deletedTeamId));
    }


    const createTeamHandler = async event => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', formState.inputs.name.value);
            formData.append('status', formState.inputs.status.value);
            formData.append('image', formState.inputs.image.value);
            formData.append('desc', formState.inputs.desc.value);
            formData.append('league',formState.inputs.league.value);
            formData.append('insta', formState.inputs.insta.value);
            formData.append('fb', formState.inputs.fb.value);
            formData.append('gender',formState.inputs.gender.value);
            const createdTeam = await sendRequest(
            process.env.REACT_APP_BACKEND_URL + '/teams',
               'POST',
              formData,
              {
                Authorization: 'Bearer ' + auth.token
              }
             );
             setLoadedTeams([...loadedTeams, createdTeam.newTeam])
            navigate('/dashboard');
            } catch (err) {}
        }



  


    return(<React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
  
        {isLoading && (
          <div className="center">
            <LoadingSpinner asOverlay />
          </div>
        )}

        <div className="dash-container new-team">
            <div className="teams-control">
                <div>
                    <h2>Teams Übersicht</h2>
                    {!isLoading && loadedTeams && <TeamsList items={loadedTeams} onDeleteTeam={deletedTeamHandler}/>}
                    <Button inverse={createMode} onClick={handleClick}>{createMode ? "Abbruch" : "Neues Team"}</Button>
                    </div>
                   {createMode && <div>
                    <form autoComplete="off" className="team-form" onSubmit={createTeamHandler}>
                    <h2>Teamdaten</h2>
                    <p>Bitte gebe unten die Teamdaten ein.</p>
                    <ImageUpload  center id="image" onInput={inputHandler} errorText="Please provide an image" />
                    <Input 
                        element="input"
                        id="name"
                        type="text"
                        label="Name"
                        validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]}
                        errorText="Please enter a name"
                        onInput={inputHandler}
                    />
                    <div className="halfwidth">
                    <Select
                      id="status"
                      label="Aktiv/Jugend"
                      validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]}
                      errorText="Please enter a status"
                      options={statusOptions}
                      onInput={inputHandler}

                    />
                    <Select
                      id="gender"
                      label="Gender"
                      validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]}
                      errorText="Please enter gender"
                      options={genderOptions}
                      onInput={inputHandler}

                    />
                    </div>
                   
                    <Input 
                        element="textarea"
                        id="desc"
                        type="text"
                        label="Beschreibung"
                        validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3),VALIDATOR_MAXLENGTH(250)]}
                        errorText="Please enter a description"
                        onInput={inputHandler}
                    />
                    <Input 
                        element="input"
                        id="league"
                        type="text"
                        label="Liga"
                        validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]}
                        errorText="Please enter a League"
                        onInput={inputHandler}
                    />
                    <Input 
                        element="input"
                        id="insta"
                        type="text"
                        label="Instagram"
                        validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]}
                        errorText="Please enter an instagram link"
                        onInput={inputHandler}
                    />
                    <Input 
                        element="input"
                        id="fb"
                        type="text"
                        label="Facebook"
                        validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]}
                        errorText="Please enter a facebook link."
                        onInput={inputHandler}
                    />
         <Button type="submit" disabled={!formState.isValid}>
          CREATE TEAM
        </Button>
        <Button inverse onClick={cancelCreateMode}>
          Abbruch
        </Button>
                </form> 
                    </div>}
            </div>
        </div>
    </React.Fragment>

    )
};

export default NewTeam;