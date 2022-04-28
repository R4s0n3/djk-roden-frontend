import React, {useEffect, useState, useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
    VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

import Card from '../../shared/components/UIElements/Card';
import { AuthContext} from '../../shared/context/auth-context';
import {useForm} from "../../shared/hooks/form-hook";
import { useHttpClient } from '../../shared/hooks/http-hook';
import './UpdateCategory.css';

const UpdateCategory = () => {

const auth = useContext(AuthContext);
const {isLoading, error, sendRequest, clearError } = useHttpClient();
const [loadedCategory, setLoadedCategory] = useState();

const categoryId = useParams().categoryId;
const navigate = useNavigate();

const [formState, inputHandler, setFormData] = useForm({
    title:{
        value:"",
        isValid:false
    }
});


useEffect(()=>{

    const fetchCategory = async () => {

        try{
            const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/categories/${categoryId}`);
            setLoadedCategory(responseData.category);
            setFormData({
                title:{
                    value:responseData.category.title,
                    isValid:true
                }
            },true
            );

        }catch(err){}
    }

 

    fetchCategory();

},[sendRequest, categoryId, setFormData]);

const categoryUpdateSubmitHandler = async event => {
    event.preventDefault();

    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/categories/${categoryId}`,
        'PATCH',
        JSON.stringify({
         title: formState.inputs.title.value
        }),
        { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token
      }
      );
        navigate('/dashboard/categories');
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


  if (!loadedCategory && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find category!</h2>
        </Card>
      </div>
    );
  }

  return(
      <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    <div className="update dash-container">
    <div>
    <form className="update-form" onSubmit={categoryUpdateSubmitHandler}>
    <h2>Update Kategorie</h2>
    <Input
        id="title"
        element="input"
        type="text"
        label="Kategorie"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={loadedCategory.title}
        initialValid={true}
        />
 

        <Button type="submit" disabled={!formState.isValid}>
            Update Kategorie
        </Button>
    </form>

    </div>

    </div>
      </React.Fragment>
  )}

export default UpdateCategory;