import React,{useEffect, useState, useContext}from 'react';
import LeadsList from '../components/LeadsList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Input from '../../shared/components/FormElements/Input';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import Select from '../../shared/components/FormElements/Select';
import formstates from '../../shared/util/formstates';


import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
  } from "../../shared/util/validators";
import { useForm} from "../../shared/hooks/form-hook";
import Button from '../../shared/components/FormElements/Button';
import { AuthContext} from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

const NewLead = props => {
    const {leadsform} = formstates
    const auth = useContext(AuthContext);
    const [createMode, setCreateMode] = useState(false);
    const [formState, inputHandler] = useForm(leadsform, false);
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
            formData.append('comment', formState.inputs.comment.value);
          leadData = await sendRequest(
            process.env.REACT_APP_BACKEND_URL + '/leads',
            'POST',
            formData,{
              Authorization: 'Bearer ' + auth.token
            });

            setLoadedLeads([...loadedLeads, leadData.lead]);
        }catch(err){}
    }

    useEffect(()=>{
      const fetchData = async () => {
          try{
  
              const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/leads');
              const responseCategories = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/categories');
              setLoadedLeads(responseData.leads);
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
                element="textarea"
                id="comment"
                type="text"
                label="Kommentar"
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(2)]}
                errorText="Please enter a comment."
                onInput={inputHandler}
            />
            <Input 
                element="input"
                id="email"
                type="text"
                label="E-Mail"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid E-Mail."
                onInput={inputHandler}
            />
            <Input 
                element="input"
                id="tel"
                type="number"
                label="Telefon"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid age."
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

export default NewLead;