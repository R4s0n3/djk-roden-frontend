import React, {useEffect, useState, useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
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
import './UpdateDate.css';

const UpdateDate = () => {

const auth = useContext(AuthContext);
const {isLoading, error, sendRequest, clearError } = useHttpClient();
const [loadedDate, setLoadedDate] = useState();
const [loadedTeams, setLoadedTeams] = useState();
const [loadedCategories, setLoadedCategories] = useState();
const [isGame, setIsGame] = useState(false);
const [isLocation, setIsLocation] = useState(false);

const dateId = useParams().dateId;
const navigate = useNavigate();

const [formState, inputHandler, setFormData] = useForm({
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
    },
    home:{
      value:"",
      isValid:false
    },
    guest:{
      value:"",
      isValid:false
    }
});


useEffect(()=>{

    const fetchData = async () => {

        try{
            const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/dates/${dateId}`);
            const responseCategories = await sendRequest(process.env.REACT_APP_BACKEND_URL + "/categories");
            const responseTeams = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/teams');
            setLoadedTeams(responseTeams.teams);
            setLoadedDate(responseData.date);
            setLoadedCategories(responseCategories.categories);
            console.log(responseData.date.date)
            setFormData({
                 title:{
                    value:responseData.date.title,
                    isValid:true
                }, 
                date:{
                    value:responseData.date.date,
                    isValid:true
                },
                location:{
                    value:responseData.date.location,
                    isValid:true
                },
                category:{
                    value:responseData.date.category,
                    isValid:true
                },
                team:{
                    value:responseData.date.team,
                    isValid:true
                },
                home:{
                    value:responseData.date.home,
                    isValid:true
                },
                guest:{
                    value:responseData.date.guest,
                    isValid:true
                }
            },true
            );

        }catch(err){}
    }

    fetchData();

},[sendRequest, dateId, setFormData]);

const dateUpdateSubmitHandler = async event => {
    event.preventDefault();

    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/dates/${dateId}`,
        'PATCH',
        JSON.stringify({
            title: formState.inputs.title.value,
            date: formState.inputs.date.value,
            team: formState.inputs.team.value,
            home: formState.inputs.home.value,
            guest: formState.inputs.guest.value,
            location: formState.inputs.location.value,
            category: formState.inputs.category.value
        }),
        { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token
      }
      );
        navigate('/dashboard/dates');
    } catch (error) {
      
    }
  };

  

  if (isLoading) {
    return (
      <div className="center">
       <LoadingSpinner />
      </div>
    );
  }


  if (!loadedDate && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find date!</h2>
        </Card>
      </div>
    );
  }

  return(
      <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    {!isLoading && loadedCategories && <div className="update dash-container">
    <div>
    <form className="update-form" onSubmit={dateUpdateSubmitHandler}>
    <h2>Update Termin</h2>
    <Input 
                element="input"
                id="title"
                type="text"
                label="Titel"
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(2)]}
                errorText="Please enter a title."
                initialValid={true}
                initialValue={loadedDate.title}
                onInput={inputHandler}
            />
            <Select 
                id="category"
                label="Kategorie"
                options={loadedCategories}
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]}
                errorText="Please enter a category."
                onInput={inputHandler}
                initialValid={true}
                initialValue={loadedDate.category.id}
            />
            <Input 
                element="input"
                id="date"
                type="datetime-local"
                label="Datum"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a date."
                onInput={inputHandler}
                initialValid={true}
                initialValue={loadedDate.date}
            />
                         <div className="form-buttons">
            <Button inverse={isGame} type="button" onClick={()=>{setIsGame(prev => !prev)}} size="small">Spieltermin</Button>
            <Button inverse={isLocation} type="button" onClick={()=>{setIsLocation(prev => !prev)}} size="small">Standort</Button>
            </div>
            {isGame && <Input 
                element="input"
                id="home"
                type="text"
                label="Heim"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a team name."
                onInput={inputHandler}
                initialValid={true}
                initialValue={loadedDate?.home}
            />}
            {isGame && <Input 
                element="input"
                id="guest"
                type="text"
                label="Gast"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a team name."
                onInput={inputHandler}
                initialValid={true}
                initialValue={loadedDate?.guest}
            />}
             {isGame && <Select 
                id="team"
                label="Team"
                options={loadedTeams}
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]}
                errorText="Please enter a team."
                onInput={inputHandler}
                initialValid={true}
                initialValue={loadedDate?.team.id}
            />}
            {isLocation && <Input 
                element="input"
                id="location"
                type="text"
                label="Ort"
                validators={[]}
                errorText="Please enter a location."
                onInput={inputHandler}
                initialValid={true}
                initialValue={loadedDate?.location}
            />}
        <Button type="submit" disabled={!formState.isValid}>
            Update Termin
        </Button>
    </form>

    </div>

    </div>}
      </React.Fragment>
  )}

export default UpdateDate;