import React, {useEffect, useState, useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {Icon} from '@iconify/react';

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
    VALIDATOR_MAXLENGTH
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
import './UpdateTeam.css';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const UpdateTeam = () => {

const auth = useContext(AuthContext);
const {isLoading, error, sendRequest, clearError } = useHttpClient();
const [loadedTeam, setLoadedTeam] = useState();
const [isUpload, setIsUpload] = useState();

const genderOptions = [{title:'Weiblich'},{title:'Männlich'},{title:'Gemischt'}];
const statusOptions = [{title:'Jugend'},{title:'Aktive'}];


const teamId = useParams().teamId;
const navigate = useNavigate();

const [formState, inputHandler, setFormData] = useForm({
    name:{
        value:"",
        isValid:false
    },
    status:{
        value:"",
        isValid:false
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
        isValid:false
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
},false
);


useEffect(()=>{

    const fetchTeam = async () => {

        try{
            const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/teams/${teamId}`);
            setLoadedTeam(responseData.team);
            setFormData({
                name:{
                    value:responseData.team.name,
                    isValid:true
                },
                status:{
                    value:responseData.team.status,
                    isValid:true
                },
                desc:{
                    value:responseData.team.desc,
                    isValid:true
                },
                gender:{
                    value:responseData.team.gender,
                    isValid:true
                },
                league:{
                    value:responseData.team.league,
                    isValid:true
                },
                insta:{
                    value:responseData.team.insta,
                    isValid:true
                },
                fb:{
                    value:responseData.team.fb,
                    isValid:true
                },
                link:{
                    value:responseData.team.link,
                    isValid:true
                }
            },true
        );

        }catch(err){}
    }
  
    fetchTeam();

},[sendRequest, teamId, setFormData]);

const teamUpdateSubmitHandler = async event => {
    event.preventDefault();

    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/teams/${teamId}`,
        'PATCH',
        JSON.stringify({
            name: formState.inputs.name.value,
            status: formState.inputs.status.value,
            desc: formState.inputs.desc.value,
            gender: formState.inputs.gender.value,
            league: formState.inputs.league.value,
            insta: formState.inputs.insta.value,
            fb: formState.inputs.fb.value,
            link: formState.inputs.link.value
        }),
        { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token
      }
      );
        navigate('/dashboard/teams');
    } catch (error) {
      
    }
  };

  const confirmImageUploadHandler = async event => {
      event.preventDefault();
      

      try{
        const formData = new FormData();
        formData.append('image', formState.inputs.image.value);
        await sendRequest(
              process.env.REACT_APP_BACKEND_URL + `/teams/patchimg/${teamId}`,
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
        setFormData();
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


  if (!loadedTeam && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find team!</h2>
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
    {!isUpload && loadedTeam.image && <img src={process.env.REACT_APP_AWS_URL + `/${loadedTeam.image}`} alt={loadedTeam.name} />}
    </div>
        {isUpload &&  <ImageUpload  center id="image" onInput={inputHandler} errorText="Please provide an image" /> }
        <Button onClick={uploadHandler} type="button" ><Icon className="djk-icon" icon={isUpload ? "akar-icons:arrow-back-thick" : "akar-icons:edit"} height="20px" color="#fff" /></Button>
        {isUpload && <Button type="submit" danger>Upload</Button>}
    </form>
    </div>
    <div>
    <form className="update-form" onSubmit={teamUpdateSubmitHandler}>
    <h2>Update Team</h2>

    <Input 
                        element="input"
                        id="name"
                        type="text"
                        label="Name"
                        validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]}
                        errorText="Please enter a name"
                        onInput={inputHandler}
                        initialValue={loadedTeam.name}
                        initialValid={true}
                    />
                
                    <Select
                      id="status"
                      label="Aktiv/Jugend"
                      validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]}
                      errorText="Please enter a status"
                      options={statusOptions}
                      onInput={inputHandler}
                      initialValue={loadedTeam.status}
                        initialValid={true}
                    />
                    <Select
                      id="gender"
                      label="Gender"
                      validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]}
                      errorText="Please enter gender"
                      options={genderOptions}
                      onInput={inputHandler}
                      initialValue={loadedTeam.gender}
                        initialValid={true}
                    />
                  
                    <Input 
                        element="textarea"
                        id="desc"
                        type="text"
                        label="Beschreibung"
                        validators={[VALIDATOR_REQUIRE(),VALIDATOR_MAXLENGTH(1000)]}
                        errorText="Please enter a description. (max. 1000 Zeichen)"
                        onInput={inputHandler}
                        initialValue={loadedTeam.desc}
                        initialValid={true}
                    />

                    <Input 
                        element="input"
                        id="league"
                        type="text"
                        label="Liga"
                        validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]}
                        errorText="Please enter a League"
                        onInput={inputHandler}
                        initialValue={loadedTeam.league}
                        initialValid={true}
                    />
                    <Input 
                        element="input"
                        id="link"
                        type="url"
                        label="Tabelle"
                        validators={[]}
                        errorText="Please enter a link"
                        onInput={inputHandler}
                        initialValue={loadedTeam.link}
                        initialValid={true}
                    />
                    <Input 
                        element="input"
                        id="insta"
                        type="url"
                        label="Instagram"
                        validators={[]}
                        errorText="Please enter an instagram link"
                        onInput={inputHandler}
                        initialValue={loadedTeam.insta}
                        initialValid={true}
                    />
                    <Input 
                        element="input"
                        id="fb"
                        type="url"
                        label="Facebook"
                        validators={[]}
                        errorText="Please enter a facebook link."
                        onInput={inputHandler}
                        initialValue={loadedTeam.fb}
                        initialValid={true}
                    />

        <Button type="submit" disabled={!formState.isValid}>
            Update Team
        </Button>
    </form>

    </div>

    </div>
      </React.Fragment>
  )}

export default UpdateTeam;