import React,{useEffect, useState, useContext}from 'react';
import DatesList from '../components/DatesList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Input from '../../shared/components/FormElements/Input';
import Select from '../../shared/components/FormElements/Select';


import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
  } from "../../shared/util/validators";
import { useForm} from "../../shared/hooks/form-hook";
import Button from '../../shared/components/FormElements/Button';
import { AuthContext} from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import XlsUpload from '../../shared/components/FormElements/XlsUpload';

const NewDate = props => {
    const auth = useContext(AuthContext);
    const [createMode, setCreateMode] = useState(false);
    const [bulbMode, setBulbMode] = useState(false);
    const [formState, inputHandler] = useForm({
      title:{
          value:"",
          isValid:false
      }, 
      date:{
          value:"",
          isValid:false
      },
      
      location:{
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
      }
}, false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedDates, setLoadedDates] = useState();
    const [loadedTeams, setLoadedTeams] = useState();
    const [loadedCategories, setLoadedCategories] = useState();

    const createDateHandler = async event =>{
        event.preventDefault();
      
        

            try{
            const dateData = await sendRequest(
              process.env.REACT_APP_BACKEND_URL + '/dates',
              'POST',
              JSON.stringify({
               title: formState.inputs.title.value,
               date: formState.inputs.date.value,
               team: formState.inputs.team.value,
               home: formState.inputs.home.value,
               guest: formState.inputs.guest.value,
               location: formState.inputs.location.value,
               category: formState.inputs.category.value
              }),{
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
              });
              setLoadedDates([...loadedDates, dateData.date]);
              window.scroll(0,0)
            }catch(err){}

    }

    useEffect(()=>{
      const fetchData = async () => {
          try{
  
              const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/dates');
              const responseTeams = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/teams');
              const responseCategories = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/categories');
              setLoadedDates(responseData.dates);
              setLoadedTeams(responseTeams.teams);
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

    const deletedDateHandler = deletedDateId => {
      
      setLoadedDates(prevDates => prevDates.filter(date => date.id !== deletedDateId));
    }
    return(
        <React.Fragment>
         <ErrorModal error={error} onClear={clearError} />
  
  {isLoading && (
    <div className="center">
      <LoadingSpinner asOverlay />
    </div>
  )}

  <div className="dash-container new-date">
      <div className="dates-control">
          <div>
              <h2>Termine Übersicht</h2>
              {!isLoading && loadedDates && <DatesList items={loadedDates} onDeleteDate={deletedDateHandler}/>}
              <Button disabled={bulbMode} inverse={createMode} onClick={handleClick}>{createMode ? "Abbruch" : "Neuer Termin"}</Button>
              <Button disabled={createMode} inverse={bulbMode} onClick={() => setBulbMode(prev => !prev)} >{bulbMode ? "Abbruch" : "Importieren"}</Button>
              </div>
        {createMode && loadedCategories &&  <div>
            <h2>Termine</h2>
            <p>Erstelle Termine</p>
           
            <div>
            <form autoComplete="off" className="date-form" onSubmit={createDateHandler}>
            <Input 
                element="input"
                id="title"
                type="text"
                label="Titel"
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(2)]}
                errorText="Please enter a title."
                onInput={inputHandler}
            />
            <Input 
                element="input"
                id="date"
                type="datetime-local"
                label="Datum"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a date."
                onInput={inputHandler}
            />
            <Input 
                element="input"
                id="home"
                type="text"
                label="Heim"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a team name."
                onInput={inputHandler}
            />
            <Input 
                element="input"
                id="guest"
                type="text"
                label="Gast"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a team name."
                onInput={inputHandler}
            />
            <Input 
                element="input"
                id="location"
                type="text"
                label="Ort"
                validators={[]}
                errorText="Please enter a location."
                onInput={inputHandler}
            />
           
            <Select 
                id="category"
                label="Kategorie"
                options={loadedCategories}
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]}
                errorText="Please enter a category."
                onInput={inputHandler}
            />
            <Select 
                id="team"
                label="Team"
                options={loadedTeams}
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]}
                errorText="Please enter a team."
                onInput={inputHandler}
            />
  
            <Button type="submit">Neuer Termin</Button>
            </form>
            </div>
          
            </div>}
        {bulbMode && <div>
            <XlsUpload />
        </div>}
     </div>
    
          </div>

            </React.Fragment>   )
}

export default NewDate;