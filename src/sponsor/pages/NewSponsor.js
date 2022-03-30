import React,{useEffect, useState, useContext}from 'react';
import {useNavigate} from "react-router-dom";
import SponsorsList from '../components/SponsorsList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Input from '../../shared/components/FormElements/Input';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
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

const NewSponsor = props => {
    const {sponsorsform} = formstates
    const auth = useContext(AuthContext);
    const [createMode, setCreateMode] = useState(false);
    const [formState, inputHandler] = useForm(sponsorsform, false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedSponsors, setLoadedSponsors] = useState();
    const [loadedCategories, setLoadedCategories] = useState();

    const createSponsorHandler = async event =>{
        console.log(formState);
        event.preventDefault();
        let sponsorData;
       
        try{
            const formData = new FormData();
            formData.append('name', formState.inputs.name.value);
            formData.append('category', formState.inputs.category.value);
            formData.append('image', formState.inputs.image.value);
            formData.append('link', formState.inputs.link.value);
          sponsorData = await sendRequest(
            process.env.REACT_APP_BACKEND_URL + '/sponsors',
            'POST',
            formData,{
              Authorization: 'Bearer ' + auth.token
            });
          
            setLoadedSponsors([...loadedSponsors, sponsorData.sponsor]);
        }catch(err){}
    }

    useEffect(()=>{
      const fetchData = async () => {
          try{
  
              const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/sponsors');
              const responseCategories = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/categories');
              setLoadedSponsors(responseData.sponsors);
              setLoadedCategories(responseCategories.categories);
              
          }catch(err){
                  console.log(err)
  
          }
      };
      fetchData();
  },[sendRequest]);

  const handleClick = () =>{
      setCreateMode(prev => !prev);
    }

    const deletedSponsorHandler = deletedSponsorId => {
      
      setLoadedSponsors(prevSponsors => prevSponsors.filter(sponsor => sponsor.id !== deletedSponsorId));
    }


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
            <div className="halfwidth">
            <div>
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
            <Input 
                element="input"
                id="link"
                type="url"
                label="Link"
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(2)]}
                errorText="Please enter a link."
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
           
            <Button type="submit">+</Button>
            </form>
            </div>
            </div>
            </div>}
     </div>
          </div>

            </React.Fragment>   )
}

export default NewSponsor;