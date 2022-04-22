import React,{useEffect, useState, useContext}from 'react';
import DatesList from '../components/DatesList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Input from '../../shared/components/FormElements/Input';
import Checkbox from '../../shared/components/FormElements/Checkbox';
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

const NewDate = props => {
    const auth = useContext(AuthContext);
    const [createMode, setCreateMode] = useState(false);
    const [formState, inputHandler, setFormData] = useForm({
      title:{
          value:"",
          isValid:false
      }, 
      date:{
          value:"",
          isValid:false
      },
      category:{
          value:"",
          isValid:false
      }
}, false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [isGame, setIsGame] = useState(false)
    const [loadedDates, setLoadedDates] = useState();
    const [loadedTeams, setLoadedTeams] = useState();
    const [loadedCategories, setLoadedCategories] = useState();
    const createDateHandler = async event =>{
        event.preventDefault();
        let dateData;
        

          if(formState.inputs.category.value === "6239156487b6da644f43d199"){
            try{
            dateData = await sendRequest(
              process.env.REACT_APP_BACKEND_URL + '/dates',
              'POST',
              JSON.stringify({
               title: formState.inputs.title.value,
               date: formState.inputs.date.value,
               category: formState.inputs.category.value,
               team: formState.inputs.team.value,
               opponent: formState.inputs.opponent.value,
               homematch: formState.inputs.homematch.value
  
              }),{
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
              });
              setLoadedDates([...loadedDates, dateData.date]);

            }catch(err){}
          }else{
            try{
            dateData = await sendRequest(
              process.env.REACT_APP_BACKEND_URL + '/dates',
              'POST',
              JSON.stringify({
               title: formState.inputs.title.value,
               date: formState.inputs.date.value,
               category: formState.inputs.category.value  
              }),{
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
              });
              setLoadedDates([...loadedDates, dateData.date]);

          }catch(err){}
           
          }
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
    const formChangeHandler = event => {
        console.log(event.target.id);
              if(event.target.id === 'category' && event.target.value === "6239156487b6da644f43d199" ){
                console.log("triggered1")
        setFormData({
          ...formState.inputs,
          team: {
            value: "",
            isValid: false,
          },
          opponent: {
            value: "",
            isValid: false,
          },
          homematch: {
            value: false,
            isValid: true,
          }
        },
        false)
        setIsGame(true);


    }else if(event.target.id === 'category' && event.target.value !== "6239156487b6da644f43d199"){
      console.log("triggered2")
      setFormData({
        title:{
            value:formState.inputs.title.value,
            isValid:formState.inputs.title.isValid
        }, 
        date:{
            value:formState.inputs.date.value,
            isValid:formState.inputs.date.isValid

        },
        category:{
          value:formState.inputs.category.value,
          isValid:formState.inputs.category.isValid

        }
},false)
      setIsGame(false);
    }
    }
const gimmeData = () => {
  console.log(formState.inputs);
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
              <Button inverse={createMode} onClick={handleClick}>{createMode ? "Abbruch" : "Neuer Termin"}</Button>
              </div>
        {createMode && loadedCategories && loadedTeams &&  <div>
            <h2>Termine</h2>
            <p>Erstelle Termine</p>
            <div className="halfwidth">
            <div>
            <form onChange={formChangeHandler} autoComplete="off" className="date-form" onSubmit={createDateHandler}>
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
                type="date"
                label="Datum"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a date."
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
            {isGame && <div className="game-control">
            <div className="halfwidth">
            <Select 
                id="team"
                label="Mannschaft"
                options={loadedTeams}
                validators={[]}
                errorText="Please enter a team."
                onInput={inputHandler}
            />
             <Input 
                element="input"
                id="opponent"
                type="text"
                label="Gegner"
                validators={[]}
                errorText="Please enter an opponent."
                onInput={inputHandler}
            />
            </div>
                <Checkbox
            id="homematch"
            type="checkbox"
            label="Heimspiel"
            validators={[]}
            errorText="Please enter a title."
            onCheck={inputHandler}  
          />
           

            </div>}
            <Button type="submit">+</Button>
            <Button type="button" onClick={gimmeData}>DATA</Button>
            <Button type="button" onClick={() => console.log(formState.inputs)}>State</Button>
            </form>
            </div>
            </div>
            </div>}
     </div>
          </div>

            </React.Fragment>   )
}

export default NewDate;