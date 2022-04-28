import React, {useEffect, useState, useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {Icon} from '@iconify/react';

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
    VALIDATOR_EMAIL
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
import './UpdateLead.css';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const UpdateLead = () => {

const auth = useContext(AuthContext);
const {isLoading, error, sendRequest, clearError } = useHttpClient();
const [loadedLead, setLoadedLead] = useState();
const [loadedCategories, setLoadedCategories] = useState();
const [isUpload, setIsUpload] = useState();

const leadId = useParams().leadId;
const navigate = useNavigate();

const [formState, inputHandler, setFormData] = useForm({
    name:{
        value:"",
        isValid:false
    },
    prename:{
        value:"",
        isValid:false
    },
    tel:{
        value:"",
        isValid:false
    },
    category:{
        value:"",
        isValid:false
    },
    email:{
        value:"",
        isValid:false
    },
    position:{
        value:"",
        isValid:false
    }
},false);


useEffect(()=>{

    const fetchLead = async () => {

        try{
            const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/leads/${leadId}`);
            setLoadedLead(responseData.lead);
            setFormData({
                name:{
                    value:responseData.lead.name,
                    isValid:true
                },
                prename:{
                    value:responseData.lead.prename,
                    isValid:true
                },
                tel:{
                    value:responseData.lead.tel,
                    isValid:true
                },
                category:{
                    value:responseData.lead.category,
                    isValid:true
                },
                email:{
                    value:responseData.lead.email,
                    isValid:true
                },
                position:{
                    value:responseData.lead.position,
                    isValid:true
                }

            },true
            );

        }catch(err){}
    }

    const fetchCategories = async () => {

        try{
            const responseCategories = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/categories');
            setLoadedCategories(responseCategories.categories);
        }catch(err){}

    }

    fetchLead();
    fetchCategories();

},[sendRequest, leadId, setFormData]);

const leadUpdateSubmitHandler = async event => {
    event.preventDefault();

    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/leads/${leadId}`,
        'PATCH',
        JSON.stringify({
         name: formState.inputs.name.value,
         prename: formState.inputs.prename.value,
         category: formState.inputs.category.value,
         tel: formState.inputs.tel.value,
         email: formState.inputs.email.value,
         position: formState.inputs.position.value
        }),
        { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token
      }
      );
        navigate('/dashboard/leads');
    } catch (error) {
      
    }
  };

  const confirmImageUploadHandler = async event => {
      event.preventDefault();
      

      try{
        const formData = new FormData();
        formData.append('image', formState.inputs.image.value);
        await sendRequest(
              process.env.REACT_APP_BACKEND_URL + `/leads/patchimg/${leadId}`,
              'PATCH',
              formData,
              {Authorization: 'Bearer ' + auth.token}
              )
        document.location.reload();
        setIsUpload(false);


      }catch(err){}
    
  }
const uploadHandler = () => {

    if(isUpload){
        setFormData({
            name:{
                value:loadedLead.name,
                isValid:true
            },
            prename:{
                value:loadedLead.link,
                isValid:true
            },
            category:{
                value:loadedLead.category.id,
                isValid:true
            },
            tel:{
                value:loadedLead.tel,
                isValid:true
            },
            email:{
                value:loadedLead.email,
                isValid:true
            },
            position:{
                value:loadedLead.position,
                isValid:true
            }
        },true
        );
        setIsUpload(false);
    }

    if(!isUpload){
        setFormData({
            image:{
                value:null,
                isValid:false
            }
        },false);
        setIsUpload(true);

    }
}
  

  if (isLoading) {
    return (
      <div className="center">
       <LoadingSpinner />
      </div>
    );
  }


  if (!loadedLead && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find lead!</h2>
        </Card>
      </div>
    );
  }

  return(
      <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    <div className="update dash-container">
    <div className="update-image__form-container">
    <form onSubmit={confirmImageUploadHandler}>
    <div className="update-image__preview-container">
    {!isUpload && <img src={process.env.REACT_APP_AWS_URL + `/${loadedLead.image}`} alt={loadedLead.name} />}
    </div>
        {isUpload &&  <ImageUpload  center id="image" onInput={inputHandler} errorText="Please provide an image" /> }
        <Button onClick={uploadHandler} type="button" ><Icon className="djk-icon" icon={isUpload ? "akar-icons:arrow-back-thick" : "akar-icons:edit"} height="20px" color="#fff" /></Button>
        {isUpload && <Button type="submit" danger>Upload</Button>}
    </form>
    </div>
    <div>
    <form className="update-form" onSubmit={leadUpdateSubmitHandler}>
    <h2>Update Lead</h2>
    <Input
        id="name"
        element="input"
        type="text"
        label="Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a name."
        onInput={inputHandler}
        initialValue={loadedLead.name}
        initialValid={true}
        />
    <Input
        id="prename"   
        element="input"
        type="text"
        label="Vorname"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a name."
        onInput={inputHandler}
        initialValue={loadedLead.prename}
        initialValid={true}
        />
    <Input
        id="email"   
        element="input"
        type="text"
        label="E-Mail"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
        errorText="Please enter a valid email adress."
        onInput={inputHandler}
        initialValue={loadedLead.email}
        initialValid={true}
        />
    <Input
        id="position"   
        element="input"
        type="text"
        label="Funktion"
        validators={[]}
        errorText="Please enter a lead position."
        onInput={inputHandler}
        initialValue={loadedLead.position}
        initialValid={true}
        />
    <Select 
        id="category"
        label="Kategorie"
        options={loadedCategories}
        validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(2)]}
        errorText="Please enter a category."
        onInput={inputHandler}
        initialValue={loadedLead.category.title}
        initialValid={true}

        />

        <Button type="submit" disabled={!formState.isValid}>
            Update Vorstand
        </Button>
    </form>

    </div>

    </div>
      </React.Fragment>
  )}

export default UpdateLead;