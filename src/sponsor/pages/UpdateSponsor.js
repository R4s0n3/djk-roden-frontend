import React, {useEffect, useState, useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {Icon} from '@iconify/react';

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
import './UpdateSponsor.css';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const UpdateSponsor = () => {

const auth = useContext(AuthContext);
const {isLoading, error, sendRequest, clearError } = useHttpClient();
const [loadedSponsor, setLoadedSponsor] = useState();
const [loadedCategories, setLoadedCategories] = useState();
const [isUpload, setIsUpload] = useState();

const sponsorId = useParams().sponsorId;
const navigate = useNavigate();

const [formState, inputHandler, setFormData] = useForm({
    name:{
        value:"",
        isValid:false
    },
    link:{
        value:"",
        isValid:false
    },
    category:{
        value:"",
        isValid:false
    }
});


useEffect(()=>{

    const fetchSponsor = async () => {

        try{
            const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/sponsors/${sponsorId}`);
            setLoadedSponsor(responseData.sponsor);
            setFormData({
                name:{
                    value:responseData.sponsor.name,
                    isValid:true
                },
                link:{
                    value:responseData.sponsor.link,
                    isValid:true
                },
                category:{
                    value:responseData.sponsor.category.id,
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

    fetchSponsor();
    fetchCategories();

},[sendRequest, sponsorId, setFormData]);

const sponsorUpdateSubmitHandler = async event => {
    event.preventDefault();

    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/sponsors/${sponsorId}`,
        'PATCH',
        JSON.stringify({
         name: formState.inputs.name.value,
         link: formState.inputs.link.value,
         category: formState.inputs.category.value
        }),
        { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token
      }
      );
        navigate('/dashboard/sponsors');
    } catch (error) {
      
    }
  };

  const confirmImageUploadHandler = async event => {
      event.preventDefault();
      

      try{
        const formData = new FormData();
        formData.append('image', formState.inputs.image.value);
        await sendRequest(
              process.env.REACT_APP_BACKEND_URL + `/sponsors/patchimg/${sponsorId}`,
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
                value:loadedSponsor.name,
                isValid:true
            },
            link:{
                value:loadedSponsor.link,
                isValid:true
            },
            category:{
                value:loadedSponsor.category.id,
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


  if (!loadedSponsor && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find sponsor!</h2>
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
    {!isUpload && <img src={process.env.REACT_APP_AWS_URL + `/${loadedSponsor.image}`} alt={loadedSponsor.name} />}
    </div>
        {isUpload &&  <ImageUpload  center id="image" onInput={inputHandler} errorText="Please provide an image" /> }
        <Button onClick={uploadHandler} type="button" ><Icon className="djk-icon" icon={isUpload ? "akar-icons:arrow-back-thick" : "akar-icons:edit"} height="20px" color="#fff" /></Button>
        {isUpload && <Button type="submit" danger>Upload</Button>}
    </form>
    </div>
    <div>
    <form className="update-form" onSubmit={sponsorUpdateSubmitHandler}>
    <h2>Update Sponsor</h2>
    <Input
        id="name"
        element="input"
        type="text"
        label="Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={loadedSponsor.name}
        initialValid={true}
        />
    <Input
        id="link"   
        element="input"
        type="url"
        label="Link"
        validators={[]}
        errorText="Please enter a valid link."
        onInput={inputHandler}
        initialValue={loadedSponsor.link}
        initialValid={true}
        />
    <Select 
        id="category"
        label="Kategorie"
        options={loadedCategories}
        validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(2)]}
        errorText="Please enter a category."
        onInput={inputHandler}
        initialValue={loadedSponsor.category.title}
        initialValid={true}

        />

        <Button type="submit" disabled={!formState.isValid}>
            Update Sponsor
        </Button>
    </form>

    </div>

    </div>
      </React.Fragment>
  )}

export default UpdateSponsor;