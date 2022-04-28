import React, {useEffect, useState, useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_EMAIL
} from "../../shared/util/validators";

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

import Card from '../../shared/components/UIElements/Card';
import { AuthContext} from '../../shared/context/auth-context';
import {useForm} from "../../shared/hooks/form-hook";
import { useHttpClient } from '../../shared/hooks/http-hook';
import './UpdateTrainer.css';

const UpdateUser = () => {

const auth = useContext(AuthContext);
const {isLoading, error, sendRequest, clearError } = useHttpClient();
const [loadedUser, setLoadedUser] = useState();

const userId = useParams().userId;
const navigate = useNavigate();

const [formState, inputHandler, setFormData] = useForm({
    name:{
        value:"",
        isValid:false
    },
    email:{
        value:"",
        isValid:false
    }
}, false);


useEffect(()=>{

    const fetchUser = async () => {

        try{
            const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/users/${userId}`);
            setLoadedUser(responseData.user);
            setFormData({
                name:{
                    value:responseData.user.name,
                    isValid:true
                },
                email:{
                    value:responseData.user.email,
                    isValid:true
                }
            }, true
            );

        }catch(err){}
    }

 

    fetchUser();

},[sendRequest, userId, setFormData]);

const userUpdateSubmitHandler = async event => {
    event.preventDefault();

    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/users/${userId}`,
        'PATCH',
        JSON.stringify({
         name: formState.inputs.name.value,
         email: formState.inputs.email.value
        }),
        { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token
      }
      );
        navigate('/dashboard/users');
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


  if (!loadedUser && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find user!</h2>
        </Card>
      </div>
    );
  }

  return(
      <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    <div className="update dash-container">
    <div>
    <form className="update-form" onSubmit={userUpdateSubmitHandler}>
    <h2>Update Users</h2>
    <Input 
                element="input"
                id="name"
                type="text"
                label="Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                initialValue={loadedUser.name}
                initialValid={true}
                onInput={inputHandler}
            />
            <Input 
                element="input"
                id="email"
                type="text"
                initialValue={loadedUser.email}
                initialValid={true}
                label="E-Mail"
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_EMAIL()]}
                errorText="Please enter a valid E-Mail."
                onInput={inputHandler}
            />
 

        <Button type="submit" disabled={!formState.isValid}>
            Update User
        </Button>
    </form>

    </div>

    </div>
      </React.Fragment>
  )}

export default UpdateUser;