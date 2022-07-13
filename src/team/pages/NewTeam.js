import React,{useEffect, useState, useContext}from 'react';
import {useNavigate} from "react-router-dom";
import TeamsList from '../components/TeamsList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Input from '../../shared/components/FormElements/Input';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import Select from '../../shared/components/FormElements/Select';
import FormSlider from '../../shared/components/FormElements/FormSlider';
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_MAXLENGTH,
    VALIDATOR_REQUIRE,
    VALIDATOR_MIN
  } from "../../shared/util/validators";
import { useForm} from "../../shared/hooks/form-hook";
import Button from '../../shared/components/FormElements/Button';
import { AuthContext} from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './NewTeam.css';

const NewTeam = () => {
    const auth = useContext(AuthContext);
    const [loadedTeams, setLoadedTeams] = useState();
    const [createMode, setCreateMode] = useState(false); 
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [isLink, setIsLink] = useState(false);
    const [isFace, setIsFace] = useState(false);
    const [isInsta, setIsInsta] = useState(false);
    const [isLeague, setIsLeague] = useState(false);
    const [isIndex, setIsIndex] = useState(false);


    const [formState, inputHandler] = useForm({
        name:{
            value:"",
            isValid:false
        },
        status:{
            value:"",
            isValid:false
        },
        index:{
            value:0,
            isValid:true
        },
        image:{
            value:null,
            isValid:false
        },
        desc:{
            value:"",
            isValid:false
        },
        gender:{
            value:"",
            isValid:false
        },
        league:{
            value:"",
            isValid:true
        },
        insta:{
            value:"",
            isValid:true
        },
        fb:{
            value:"",
            isValid:true
        },
        link:{
            value:"",
            isValid:true
        }
    },false)


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
            formData.append('insta', formState.inputs.insta.value);
            formData.append('index', formState.inputs.index.value);
            formData.append('league',formState.inputs.league.value);
            formData.append('link',formState.inputs.link.value);
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


        const lengthOfTeams = (loadedTeams ? loadedTeams.filter(t => t.status === formState.inputs.status.value).length : 0 );

  


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
            <h2>Neue Mannschaft</h2>
            <p>Erstelle Mannschaften</p>
            
            <div>
                   <Card className="form-card">
                    <form autoComplete="off" className="team-form" onSubmit={createTeamHandler}>
                   
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
                        validators={[VALIDATOR_REQUIRE(),VALIDATOR_MAXLENGTH(1000)]}
                        errorText="Please enter a description. (max. 1000 Zeichen)"
                        onInput={inputHandler}
                    />
                     
                    <div className="form-buttons">
            <Button inverse={isLeague} type="button" onClick={()=>{setIsLeague(prev => !prev)}} size="small">Liga</Button>
            <Button inverse={isLink} type="button" onClick={()=>{setIsLink(prev => !prev)}} size="small">Link</Button>
            <Button inverse={isInsta} type="button" onClick={()=>{setIsInsta(prev => !prev)}} size="small">Insta</Button>
            <Button inverse={isFace} type="button" onClick={()=>{setIsFace(prev => !prev)}} size="small">FB</Button>
            <Button inverse={isIndex} type="button" onClick={()=>{setIsIndex(prev =>!prev)}} size="small">Index</Button> 
            </div>

                    {isLeague && <Input 
                        element="input"
                        id="league"
                        type="text"
                        label="Liga"
                        validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]}
                        errorText="Please enter a League"
                        onInput={inputHandler}
                        initialValid={true}
                    />}
                    {isLink && <Input 
                        element="input"
                        id="link"
                        type="url"
                        label="Tabelle"
                        validators={[]}
                        errorText="Please enter a link"
                        onInput={inputHandler}
                        initialValid={true}
                    />}

                    {isInsta && <Input 
                        element="input"
                        id="insta"
                        type="url"
                        label="Instagram"
                        validators={[]}
                        errorText="Please enter an instagram link"
                        onInput={inputHandler}
                        initialValid={true}
                    />}
                    {isFace && <Input 
                        element="input"
                        id="fb"
                        type="url"
                        label="Facebook"
                        validators={[]}
                        errorText="Please enter a facebook link."
                        onInput={inputHandler}
                        initialValid={true}
                    />}
                    {isIndex && <FormSlider
                                    id="index"
                                    onInput={inputHandler}
                                    min={0}
                                    max={lengthOfTeams}
                                    step={1}
                                    label="Index"
                                    validators={[VALIDATOR_MIN(0)]}
                                    initialValid={true}
                                    />}
         <Button type="submit" disabled={!formState.isValid}>
          Team erstellen
        </Button>
        <Button inverse onClick={cancelCreateMode}>
          Abbruch
        </Button>
                </form> 
                    </Card></div></div>}
            </div>
        </div>
    </React.Fragment>

    )
};

export default NewTeam;