import * as React from 'react';
import {useParams} from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import {useForm}from "../../shared/hooks/form-hook";
import {AuthContext} from '../../shared/context/auth-context';

import { VALIDATOR_MINLENGTH, VALIDATOR_COMPARE} from '../../shared/util/validators';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';


const ResetPassword = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [validatedUser, setValidatedUser] = React.useState();
    const auth = React.useContext(AuthContext);
    const userId = useParams().userId;
    const token = useParams().token;

    const [formState, inputHandler] = useForm({
        password:{
            value:"",
            isValid:false
        },
        password2:{
            value:"",
            isValid:false
        }
    },false)

    React.useEffect(()=>{
        const validateLink = async () => {
            try{
              const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/users/reset-password/${userId}/${token}`);
                setValidatedUser(responseData.email);
                auth.login(userId, token);
            }catch(err){}

        }

        validateLink();
        
    },[sendRequest, auth, userId, token])
    const resetPasswordSubmitHandler = () => {

    }

    return(
<React.Fragment>
<ErrorModal error={error} onClear={clearError} />
{isLoading && <LoadingSpinner asOverlay />}

<Card className="authentication">
  
  <h2>Passwort zurücksetzen</h2>
  
  {!isLoading && token && validatedUser && <p>{validatedUser.email}</p>}
   {!isLoading && token && <form onSubmit={resetPasswordSubmitHandler}>

    <Input
      element="input"
      id="password"
      type="password"
      label="Neues Passwort"
      validators={[VALIDATOR_MINLENGTH(6)]}
      errorText="Please enter a valid password. (min. 6 characters)"
      onInput={inputHandler}
    />
    <Input
      element="input"
      id="password2"
      type="password"
      label="Passwort bestätigen"
      validators={[VALIDATOR_COMPARE(formState.inputs.password.value)]}
      errorText="Doesn't match your password"
      onInput={inputHandler}
    />
    <Button type="submit" disabled={!formState.isValid}>
    Zurücksetzen
    </Button>
  </form>}
</Card>
</React.Fragment>

    )
}
export default ResetPassword;