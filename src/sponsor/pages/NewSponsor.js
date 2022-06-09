import React,{useEffect, useState, useContext}from 'react';
import SponsorsList from '../components/SponsorsList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Input from '../../shared/components/FormElements/Input';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import Select from '../../shared/components/FormElements/Select';
import MultipleSelect from '../../shared/components/FormElements/MultipleSelect';
import FormSlider from '../../shared/components/FormElements/FormSlider';

import Card from '../../shared/components/UIElements/Card';
import './NewSponsor.css';
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_MIN,
    VALIDATOR_REQUIRE,
  } from "../../shared/util/validators";
import { useForm} from "../../shared/hooks/form-hook";
import Button from '../../shared/components/FormElements/Button';
import { AuthContext} from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

const NewSponsor = props => {
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  useEffect(()=>{

    const fetchData = async () => {
        try{

            const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/sponsors');
            setLoadedSponsors(responseData.sponsors.reverse());
            const responseCategories = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/categories');
            setLoadedCategories(responseCategories.categories);
            const responseTeams = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/teams');
            setLoadedTeams(responseTeams.teams);
            
        }catch(err){  
        }
    };
    fetchData();

},[sendRequest]);

    const auth = useContext(AuthContext);
    const [createMode, setCreateMode] = useState(false);
    const [formState, inputHandler] = useForm({
      name:{
          value:"",
          isValid:false
      },
      link:{
          value:"",
          isValid:true
      },
      image:{
          value:null,
          isValid:false
      },
      category:{
          value:"",
          isValid:false
      },
      teams:{
        value: [],
        isValid:true
      },
      index:{
        value:0,
        isValid:true
      }
  }, false);

    const [loadedSponsors, setLoadedSponsors] = useState();
    const [loadedTeams, setLoadedTeams] = useState();
    const [loadedCategories, setLoadedCategories] = useState();
    const [isLink, setIsLink] = useState(false);
    const [isTeams, setIsTeams] = useState(false);
    const [isIndex, setIsIndex] = useState(false);


    const createSponsorHandler = async event =>{
        event.preventDefault();
        let sponsorData;
        
        try{
          const teams = formState.inputs.teams.value;
            const formData = new FormData();
            formData.append('name', formState.inputs.name.value);
            formData.append('category', formState.inputs.category.value);
            formData.append('image', formState.inputs.image.value);
            formData.append('index', formState.inputs.index.value);
            formData.append('link', formState.inputs.link.value);
            if(teams.length > 0){
              for (let i = 0; i < teams.length; i++) {
                formData.append('teams', teams[i]);
              }}
          sponsorData = await sendRequest(
            process.env.REACT_APP_BACKEND_URL + '/sponsors',
            'POST',
            formData,{
              Authorization: 'Bearer ' + auth.token
            });
          
            setLoadedSponsors([...loadedSponsors, sponsorData.sponsor]);
            setCreateMode(false);
            document.location.reload();
        }catch(err){}
    }

   
  const handleClick = () =>{
      setCreateMode(prev => !prev);
    }

    const deletedSponsorHandler = deletedSponsorId => {
      
      setLoadedSponsors(prevSponsors => prevSponsors.filter(sponsor => sponsor.id !== deletedSponsorId));
    }

    const lengthOfSponsors = (loadedSponsors ? loadedSponsors.filter(s => s.category.id === formState.inputs.category.value).length : 0 );

    return(
        <React.Fragment>
         <ErrorModal error={error} onClear={clearError} />
  
  {isLoading && (
    <div className="center">
      <LoadingSpinner asOverlay />
    </div>
  )}

  <div className="dash-container new-sponsor">
      <div className="sponsors-control">
          <div>
              <h2>Sponsoren Übersicht</h2>
              {!isLoading && loadedSponsors && <SponsorsList items={loadedSponsors} onDeleteSponsor={deletedSponsorHandler}/>}
              <Button inverse={createMode} onClick={handleClick}>{createMode ? "Abbruch" : "Neuer Sponsor"}</Button>
              </div>
        {createMode &&  <div>
            <h2>Neuer Sponsor</h2>
            <p>Erstelle Sponsoren</p>
            
            <div>
              <Card className="form-card">
              <form autoComplete="off" className="sponsor-form" onSubmit={createSponsorHandler}>
            <ImageUpload  center id="image" onInput={inputHandler} errorText="Please provide an image" />


            <Input 
                element="input"
                id="name"
                type="text"
                label="Name"
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(2)]}
                errorText="Please enter a name."
                onInput={inputHandler}
            />
            <Select 
                id="category"
                label="Kategorie"
                options={loadedCategories}
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(2)]}
                errorText="Please enter a category."
                onInput={inputHandler}
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
                initialValid={true}
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
            <Button disabled={!formState.isValid} type="submit">Sponsor erstellen</Button>
            </form>
              </Card>
      
            </div>
          
            </div>}
     </div>
          </div>

            </React.Fragment>   )
}

export default NewSponsor;