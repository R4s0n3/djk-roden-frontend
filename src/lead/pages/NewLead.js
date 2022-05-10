import React,{useEffect, useState, useContext}from 'react';
import LeadsList from '../components/LeadsList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Input from '../../shared/components/FormElements/Input';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import Select from '../../shared/components/FormElements/Select';

import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
  } from "../../shared/util/validators";
  
import { useForm} from "../../shared/hooks/form-hook";
import Button from '../../shared/components/FormElements/Button';
import { AuthContext} from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

const NewLead = props => {
    const auth = useContext(AuthContext);
    const [createMode, setCreateMode] = useState(false);
    const [formState, inputHandler] = useForm({
      name:{
          value:"",
          isValid:false
      },
      prename:{
          value:"",
          isValid:false
      },
      tel:{
          value:"",
          isValid:false
      },
      image:{
          value:null,
          isValid:false
      },
      category:{
          value:"",
          isValid:false
      },
      email:{
          value:"",
          isValid:false
      },
      position:{
          value:"",
          isValid:false
      }
  }, false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedLeads, setLoadedLeads] = useState();
    const [loadedCategories, setLoadedCategories] = useState();

    const createLeadHandler = async event =>{
        console.log(formState);
        event.preventDefault();
        let leadData;
       
        try{
            const formData = new FormData();
            formData.append('name', formState.inputs.name.value);
            formData.append('prename', formState.inputs.prename.value);
            formData.append('tel', formState.inputs.tel.value);
            formData.append('email', formState.inputs.email.value);
            formData.append('category', formState.inputs.category.value);
            formData.append('image', formState.inputs.image.value);
            formData.append('position', formState.inputs.position.value);
          leadData = await sendRequest(
            process.env.REACT_APP_BACKEND_URL + '/leads',
            'POST',
            formData,{
              Authorization: 'Bearer ' + auth.token
            });

            setLoadedLeads([...loadedLeads, leadData.lead]);
            window.scrollTo(0, 0);
      

        }catch(err){}
    }

    useEffect(()=>{
       
      const fetchData = async () => {
          try{
  
              const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/leads');
              const responseCategories = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/categories');
              setLoadedLeads(responseData.leads.reverse());
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

    const deletedLeadHandler = deletedLeadId => {
      
      setLoadedLeads(prevLeads => prevLeads.filter(lead => lead.id !== deletedLeadId));
    }


    return(
        <React.Fragment>
         <ErrorModal error={error} onClear={clearError} />
  
  {isLoading && (
    <div className="center">
      <LoadingSpinner asOverlay />
    </div>
  )}

  <div className="dash-container new-lead">
      <div className="leads-control">
          <div>
              <h2>Vorstände Übersicht</h2>
              {!isLoading && loadedLeads && <LeadsList items={loadedLeads} onDeleteLead={deletedLeadHandler}/>}
              <Button inverse={createMode} onClick={handleClick}>{createMode ? "Abbruch" : "Neuer Vorstand"}</Button>
              </div>
        {createMode &&  <div>
            <h2>Neues Mitglied</h2>
            <p>Erstelle Vorstandsmitglieder</p>
            <div className="halfwidth">
            <div>
            <form autoComplete="off" className="lead-form" onSubmit={createLeadHandler}>
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
                id="prename"
                type="text"
                label="Vorname"
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(2)]}
                errorText="Please enter a prename."
                onInput={inputHandler}
            />
            <Input 
                element="input"
                id="position"
                type="text"
                label="Funktion"
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(2)]}
                errorText="Please enter a lead position."
                onInput={inputHandler}
            />
            <Input 
                element="input"
                id="email"
                type="email"
                label="E-Mail"
                validators={[]}
                errorText="Please enter a valid E-Mail."
                onInput={inputHandler}
            />
            <Input 
                element="input"
                id="tel"
                type="text"
                label="Telefon"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a phone number."
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
           
            <Button type="submit">Vorstand erstellen</Button>
            </form>
            </div>
            </div>
            </div>}
     </div>
          </div>

            </React.Fragment>   )
}

export default NewLead;