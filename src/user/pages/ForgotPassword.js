import * as React from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';
import {useForm}from "../../shared/hooks/form-hook";

import { VALIDATOR_EMAIL} from '../../shared/util/validators';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';




const ForgotPassword = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [emailSent, setEmailSent] = React.useState(false)
    const [formState, inputHandler] = useForm({
        email:{
            value:"",
            isValid:false
        }
    },false)

    const forgotPasswordSubmitHandler = async event => {
        event.preventDefault();
        try{
            await sendRequest(process.env.REACT_APP_BACKEND_URL + '/users/forgot-password',
                'POST',
                JSON.stringify({
                    email: formState.inputs.email.value
                }),
                {
                    'Content-Type': 'application/json'
                  }
            );
            setEmailSent(true);
        }catch(err){}


    }

return(
<React.Fragment>
<ErrorModal error={error} onClear={clearError} />
{isLoading && <LoadingSpinner asOverlay />}

<Card className="authentication">
  
  <h2>Passwort vergessen</h2>
  <p>{emailSent ? 'Ein Link um dein Passwort wiederherzustellen wurde an deine Email gesendet.' : 'Gib deine E-Mail unten ein.'}</p>
  {!emailSent && <form onSubmit={forgotPasswordSubmitHandler}>

    <Input
      element="input"
      id="email"
      type="email"
      label="E-Mail"
      validators={[VALIDATOR_EMAIL()]}
      errorText="Please enter a valid email address."
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

export default ForgotPassword;