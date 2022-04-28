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
const [loadedCategories, setLoadedCategories] = useState();

const dateId = useParams().dateId;
const navigate = useNavigate();

const [formState, inputHandler, setFormData] = useForm({
    title:{
        value:"",
        isValid:false
    },
    startDate:{
        value:"",
        isValid:false
    },
    endDate:{
        value:"",
        isValid:false
    },
    category:{
        value:"",
        isValid:false
    },
    location:{
        value:"",
        isValid:false
    }
});


useEffect(()=>{

    const fetchData = async () => {

        try{
            const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/dates/${dateId}`);
            const responseCategories = await sendRequest(process.env.REACT_APP_BACKEND_URL + "/categories");
            setLoadedDate(responseData.date);
            setLoadedCategories(responseCategories.categories);
            setFormData({
                title:{
                    value:responseData.date.title,
                    isValid:true
                },
                startDate:{
                    value:responseData.date.startDate,
                    isValid:true
                },
                endDate:{
                    value:responseData.date.endDate,
                    isValid:true
                },
                category:{
                    value:responseData.date.category.id,
                    isValid:true
                },
                location:{
                    value:responseData.date.location,
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
         startDate: formState.inputs.startDate.value,
         endDate: formState.inputs.endDate.value,
         category: formState.inputs.category.value,
         location: formState.inputs.location.value
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
    <h2>Update Kategorie</h2>
    <Input
        id="title"
        element="input"
        type="text"
        label="Kategorie"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={loadedDate.title}
        initialValid={true}
        />
    <Input
        id="startDate"
        element="input"
        type="datetime-local"
        label="Start"
        validators={[]}
        errorText="Please enter a valid date."
        onInput={inputHandler}
        initialValue={loadedDate.startDate}
        initialValid={true}
        />
    <Input
        id="endDate"
        element="input"
        type="datetime-local"
        label="Ende"
        validators={[]}
        errorText="Please enter a valid date."
        onInput={inputHandler}
        initialValue={loadedDate.endDate}
        initialValid={true}
        />
    
    <Input
        id="location"
        element="input"
        type="text"
        label="Standort"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid location."
        onInput={inputHandler}
        initialValue={loadedDate.location}
        initialValid={true}
        />
    <Select 
        id="category"
        label="Kategorie"
        options={loadedCategories}
        validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]}
        errorText="Please enter a category."
        initialValue={loadedDate.category.id}
        initialValid={true}
        onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
            Update Termin
        </Button>
    </form>

    </div>

    </div>}
      </React.Fragment>
  )}

export default UpdateDate;