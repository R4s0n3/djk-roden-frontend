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
import MultipleSelect from '../../shared/components/FormElements/MultipleSelect';
import { AuthContext} from '../../shared/context/auth-context';
import {useForm} from "../../shared/hooks/form-hook";
import { useHttpClient } from '../../shared/hooks/http-hook';
import './UpdateSponsor.css';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const UpdateSponsor = () => {

const auth = useContext(AuthContext);
const {isLoading, error, sendRequest, clearError } = useHttpClient();
const [loadedSponsor, setLoadedSponsor] = useState();
const [loadedTeams, setLoadedTeams] = useState();
const [loadedCategories, setLoadedCategories] = useState();
const [loadedSponsors, setLoadedSponsors] = useState();
const [isUpload, setIsUpload] = useState();
const [isLink, setIsLink] = useState(false);
const [isTeams, setIsTeams] = useState(false);
const [isIndex, setIsIndex] = useState(false);


const sponsorId = useParams().sponsorId;
const navigate = useNavigate();

const [formState, inputHandler, setFormData] = useForm({
    name:{
        value:"",
        isValid:false
    },
    link:{
        value:"",
        isValid:false
    },
    category:{
        value:"",
        isValid:false
    },
    team:{
        value:"",
        isValid:false
    },
    index:{
        value:0,
        isValid:false
    }
},false);


useEffect(()=>{

    const fetchSponsor = async () => {

        try{
            const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/sponsors/${sponsorId}`);
            const responseSponsors = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/sponsors');
            setLoadedSponsors(responseSponsors.sponsors);
            setLoadedSponsor(responseData.sponsor);
            setFormData({
                name:{
                    value:responseData.sponsor.name,
                    isValid:true
                },
                link:{
                    value:responseData.sponsor.link,
                    isValid:true
                },
                category:{
                    value:responseData.sponsor.category.id,
                    isValid:true
                },
                team:{
                    value:responseData.sponsor.team,
                    isValid:true
                },
                index:{
                    value:responseData.sponsor.index,
                    isValid:true
                }
            },true
            );

        }catch(err){}
    }

    const fetchCategories = async () => {

        try{
            const responseCategories = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/categories');
            setLoadedCategories(responseCategories.categories);
        }catch(err){}

    }

    const fetchTeams = async () => {
        try{
            const responseTeams = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/teams');
            setLoadedTeams(responseTeams.teams);
        }catch(err){}
    }
    
    fetchSponsor();
    fetchCategories();
    fetchTeams();

},[sendRequest, sponsorId, setFormData]);

const sponsorUpdateSubmitHandler = async event => {
    event.preventDefault();

    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/sponsors/${sponsorId}`,
        'PATCH',
        JSON.stringify({
         name: formState.inputs.name.value,
         link: formState.inputs.link.value,
         index: formState.inputs.index.value,
         category: formState.inputs.category.value,
         teams: formState.inputs.teams.value
        }),
        { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token
      }
      );
        navigate('/dashboard/sponsors');
    } catch (error) {
      
    }
  };
  const lengthOfSponsors = (!isUpload && loadedSponsors ? loadedSponsors.filter(s => s.category.id === formState.inputs.category.value).length - 1 : 0 );

  const confirmImageUploadHandler = async event => {
      event.preventDefault();
      

      try{
        const formData = new FormData();
        formData.append('image', formState.inputs.image.value);
        await sendRequest(
              process.env.REACT_APP_BACKEND_URL + `/sponsors/patchimg/${sponsorId}`,
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
                value:loadedSponsor.name,
                isValid:true
            },
            link:{
                value:loadedSponsor.link,
                isValid:true
            },
            category:{
                value:loadedSponsor.category.id,
                isValid:true
            },
            teams:{
                value:loadedSponsor.teams,
                isValid:true
            },
            index:{
                value:loadedSponsor.index,
                isValid:true
            }
        },true
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


  if (!loadedSponsor && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find sponsor!</h2>
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
    {!isUpload && <img src={process.env.REACT_APP_AWS_URL + `/${loadedSponsor.image}`} alt={loadedSponsor.name} />}
    </div>
        {isUpload &&  <ImageUpload  center id="image" onInput={inputHandler} errorText="Please provide an image" /> }
        <Button onClick={uploadHandler} type="button" ><Icon className="djk-icon" icon={isUpload ? "akar-icons:arrow-back-thick" : "akar-icons:edit"} height="20px" color="#fff" /></Button>
        {isUpload && <Button type="submit" danger>Upload</Button>}
    </form>
    </div>
    <div>
    <form className="update-form" onSubmit={sponsorUpdateSubmitHandler}>
    <h2>Update Sponsor</h2>
    <Input
        id="name"
        element="input"
        type="text"
        label="Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={loadedSponsor.name}
        initialValid={true}
        />
    <Select 
        id="category"
        label="Kategorie"
        options={loadedCategories}
        validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(2)]}
        errorText="Please enter a category."
        onInput={inputHandler}
        initialValue={loadedSponsor.category.title}
        initialValid={true}

        />
      
         <div className="form-buttons">
            <Button inverse={isLink} type="button" onClick={()=>{setIsLink(prev => !prev)}} size="small">Link</Button>
            <Button inverse={isTeams} type="button" onClick={()=>{setIsTeams(prev => !prev)}} size="small">Teams</Button>
            <Button inverse={isIndex} type="button" onClick={()=>{setIsIndex(prev => !prev)}} size="small">Index</Button>
            </div>

            {isLink && <Input 
                element="input"
                id="link"
                type="url"
                label="Link"
                validators={[]}
                errorText="Please enter a link."
                onInput={inputHandler}
            />}
            
            {isTeams && <MultipleSelect 
                id="teams"
                label="Team"
                options={loadedTeams}
                optionsName="team-option"
                validators={[]}
                errorText="Please enter a team."
                initialValue={[]}
                onInput={inputHandler}
                initialValid={true}
            />}
        
            {isIndex && <FormSlider
            id="index"
            onInput={inputHandler}
            min={0}
            max={lengthOfSponsors}
            step={1}
            label="Index"
            validators={[VALIDATOR_MIN(0)]}
          />}

        <Button type="submit" disabled={!formState.isValid}>
            Update Sponsor
        </Button>
    </form>

    </div>

    </div>
      </React.Fragment>
  )}

export default UpdateSponsor;