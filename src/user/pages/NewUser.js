import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";

import UsersList from '../components/UsersList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Input from '../../shared/components/FormElements/Input';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
  } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Button from '../../shared/components/FormElements/Button';
import { useHttpClient } from '../../shared/hooks/http-hook';
import {AuthContext} from '../../shared/context/auth-context';
import './NewUser.css';

const NewUser = () => {
  const auth = useContext(AuthContext);
    const [loadedUsers, setLoadedUsers] = useState(); 
    const [createMode, setCreateMode] = useState(false); 
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    let navigate = useNavigate();
    const handleClick = () =>{
        setCreateMode(true);
    }
    const cancelCreateMode = () => {
        setCreateMode(false);
    }

    const deletedUserHandler = deletedUserId => {
        setLoadedUsers(prevUsers => prevUsers.filter(user => user.id !== deletedUserId));
      };
    const defaultForm =  {
        name: {
          value: "",
          isValid: false,
        },
        email: {
          value: "",
          isValid: false,
        },
        password: { 
          value: "",
          isValid: false,
        }
      }
    const [formState, inputHandler ] = useForm(defaultForm, false);
    useEffect(()=>{
        const fetchUsers = async () => {
            try{
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/users');
                setLoadedUsers(responseData.users);
                
            }catch(err){
                    console.log(err)

            }
        };
        fetchUsers();
    },[sendRequest]);

    const createUserHandler = async event => {
        event.preventDefault();
        try {
            
            await sendRequest(
              process.env.REACT_APP_BACKEND_URL + '/users/signup',
               'POST',
               JSON.stringify({
                name: formState.inputs.name.value,
                email: formState.inputs.email.value,
                password: formState.inputs.password.value
              }),
              {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
              }
             );
            navigate('/dashboard');
            } catch (err) {}
        }
    

    return( <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />

      
     
  
        {isLoading && (
          <div className="center">
            <LoadingSpinner asOverlay/>
          </div>
        )}
        <div className="dash-container new-user">
            
            <div className="users-control">
                <div><h2>Alle Users</h2> {!isLoading && loadedUsers && <UsersList items={loadedUsers} onDeleteUser={deletedUserHandler}/>}{!createMode && <Button onClick={handleClick}>Neuer User</Button>}
</div>
                <div>
          {createMode && <form autoComplete="off" className="user-form" onSubmit={createUserHandler}>
          <h2>Neuer User</h2>
          <Input
            element="input"
            id="name"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />

        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password, at least 6 characters."
          onInput={inputHandler}
        />
        <div>
          
        </div>
        <Button type="submit" disabled={!formState.isValid}>
          CREATE USER
        </Button>
        <Button inverse onClick={cancelCreateMode}>
          Abbruch
        </Button>
      </form>}</div>
            </div>
        </div>
        </React.Fragment>
    )
}

export default NewUser;