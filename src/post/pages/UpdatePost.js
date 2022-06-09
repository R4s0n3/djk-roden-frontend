import React, {useEffect, useState, useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {Icon} from '@iconify/react';

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
    VALIDATOR_MIN
} from "../../shared/util/validators";

import Input from '../../shared/components/FormElements/Input';
import Select from '../../shared/components/FormElements/Select';
import MultipleSelect from '../../shared/components/FormElements/MultipleSelect';
import GalleryUpload from '../../shared/components/FormElements/GalleryUpload';
import Checkbox from '../../shared/components/FormElements/Checkbox';
import Button from '../../shared/components/FormElements/Button';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

import Card from '../../shared/components/UIElements/Card';
import { AuthContext} from '../../shared/context/auth-context';
import {useForm} from "../../shared/hooks/form-hook";
import { useHttpClient } from '../../shared/hooks/http-hook';
import './UpdatePost.css';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const UpdatePost = () => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedPost, setLoadedPost] = useState();
    const [isUpload, setIsUpload] = useState();
    const [loadedCategories, setLoadedCategories] = useState(); 
    const [loadedTeams, setLoadedTeams] = useState(); 
    const [isLink, setIsLink] = useState(false);
    const [isTeams, setIsTeams] = useState(false);
    const [galleryMode, setGalleryMode] = useState(false);


    // const [isReport, setIsReport] = useState(false);
    const isReport = false;
    const postId = useParams().postId;
    const navigate = useNavigate();

    const [formState, inputHandler, setFormData] = useForm({
        title: {
          value: "",
          isValid: false
        },
        content: {
          value: "",
          isValid: false
        },
        category: { 
          value: "",
          isValid: false
        },
        date: { 
          value: "",
          isValid: false
        },
        link: {
          value: "",
          isValid: true
        },
        published: { 
          value: false,
          isValid: true
        },
        highlighted: { 
          value: false,
          isValid: true
        },
        teams:{
          value:[],
          isValid: true
        }
      }, false)
    
      useEffect(()=>{

        const fetchPost = async () => {
            
            try{
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/posts/${postId}`);
                const responsePosts = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/posts');
                const responseTeams = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/teams');
                const responseDataCategories = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/categories');
                setLoadedTeams(responseTeams.teams);
                setLoadedCategories(responseDataCategories.categories);
                setLoadedPost(responseData.post);
                setFormData({
                    title:{
                        value:responseData.post.title,
                        isValid:true
                    },
                    content:{
                        value:responseData.post.content,
                        isValid:true
                    },
                    link:{
                      value:responseData.post.link,
                      isValid:true
                    },
                    date:{
                        value:responseData.post.date,
                        isValid:true
                    },
                    category:{
                        value:responseData.post.category,
                        isValid:true
                    },
                    report:{
                        value:responseData.post.report,
                        isValid:true
                    },
                    published:{
                        value:responseData.post.published,
                        isValid:true
                    },
                    teams:{
                      value:responseData.post.teams,
                      isValid:true
                    },
                    highlighted:{
                        value:responseData.post.highlighted,
                        isValid:true
                    }
                },true
            );
    
            }catch(err){}
        }
    
        fetchPost();
    
    },[sendRequest, postId, setFormData]);



    
    const postUpdateSubmitHandler = async event => {
        event.preventDefault();
    
        try {
          await sendRequest(
            process.env.REACT_APP_BACKEND_URL + `/posts/${postId}`,
            'PATCH',
            JSON.stringify({
                title: formState.inputs.title.value,
                content: formState.inputs.content.value,
                date: formState.inputs.date.value,
                category: formState.inputs.category.value,
                link: formState.inputs.link.value,
                teams: formState.inputs.teams.value,
                report: formState.inputs.report.value,
                published: formState.inputs.published.value,
                highlighted: formState.inputs.highlighted.value
            }),
            { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token
          }
          );
            navigate('/dashboard/posts');
        } catch (error) {
          
        }
      };
    
      const handleGallery = () => {
        setGalleryMode(true);
        setFormData({
          gallery:{
            value: null,
            isValid: false
          }
        },false);
      }
  
      const cancelGallery = () => {
        setGalleryMode(false);
        setFormData({
          title:{
            value:formState.inputs.title.value,
            isValid: formState.inputs.title.isValid
          },
          content:{
            value:formState.inputs.content.value,
            isValid: formState.inputs.content.isValid
          },
          link:{
            value:formState.inputs.link.value,
            isValid: formState.inputs.link.isValid
          },
          date:{
            value:formState.inputs.date.value,
            isValid: formState.inputs.date.isValid
          },
          category:{
            value:formState.inputs.category.value,
            isValid: formState.inputs.category.isValid
          },
          highlighted:{
            value:formState.inputs.highlighted.value,
            isValid: formState.inputs.highlighted.isValid
          },
          teams:{
            value:formState.inputs.teams.value,
            isValid: formState.inputs.teams.isValid
          },
          published:{
            value:formState.inputs.published.value,
            isValid: formState.inputs.published.isValid
          },
          image:{
            value:formState.inputs.image.value,
            isValid: formState.inputs.image.isValid
          },
        },false);
      }

      const confirmImageUploadHandler = async event => {
          event.preventDefault();
          
          try{
            const formData = new FormData();
            formData.append('image', formState.inputs.image.value);
            await sendRequest(
                  process.env.REACT_APP_BACKEND_URL + `/posts/patchimg/${postId}`,
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
                title:{
                    value:loadedPost.title,
                    isValid:true
                },
                content:{
                    value:loadedPost.content,
                    isValid:true
                },
                date:{
                    value:loadedPost.date,
                    isValid:true
                },
                category:{
                    value:loadedPost.category,
                    isValid:true
                },
                link:{
                  value:loadedPost.link,
                  isValid:true
                },
                report:{
                    value:loadedPost.report,
                    isValid:true
                },
                published:{
                    value:loadedPost.published,
                    isValid:true
                },
                highlighted:{
                    value:loadedPost.highlighted,
                    isValid:true
                },
                teams:{
                  value:loadedPost.teams,
                  isValid:true
                }
            },true);
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
    const createGalleryHandler = async event => {
      event.preventDefault();
      try{
       
        const formData = new FormData();
        for (const file of formState.inputs.gallery.value) {
          formData.append('gallery', file);
       }
      
        await sendRequest(process.env.REACT_APP_BACKEND_URL + `/posts/gallery/${postId}`,
        'PATCH',
        formData,{
          Authorization: 'Bearer ' + auth.token
        });
        navigate('/dashboard');
      }catch( err){
        console.log(err)
      }

    }
    
      if (isLoading) {
        return (
          <div className="center">
           <LoadingSpinner />
          </div>
        );
      }
    
    
      if (!loadedPost && !error) {
        return (
          <div className="center">
            <Card>
              <h2>Could not find post!</h2>
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
        {!isUpload && loadedPost.image && <img src={process.env.REACT_APP_AWS_URL + `/${loadedPost.image}`} alt={loadedPost.title} />}
        </div>
            {isUpload &&  <ImageUpload  center id="image" onInput={inputHandler} errorText="Please provide an image" /> }
            <Button disabled={galleryMode} onClick={uploadHandler} type="button" ><Icon className="djk-icon" icon={isUpload ? "akar-icons:arrow-back-thick" : "akar-icons:edit"} height="20px" color="#fff" /></Button>
            <Button disabled={isUpload} onClick={handleGallery}>Neue Galerie</Button>
            {isUpload && <Button type="submit" danger>Upload</Button>}
        </form>
       
        {galleryMode && <form className="gallery-form" onSubmit={createGalleryHandler} >
            <h2>Galerie erstellen</h2>
            <GalleryUpload
              id="gallery"
              onInput={inputHandler}
              errorText="Please enter valid gallery images"

            />
            <Button type="button" onClick={cancelGallery}>Verwerfen</Button>
            <Button type="submit" disabled={!formState.isValid}>Galerie erstellen</Button>
            </form>} 
           
        </div>
        <div>
       {!isLoading &&loadedTeams && loadedCategories && loadedPost && <form className="update-form" onSubmit={postUpdateSubmitHandler}>
        <h2>Update Post</h2>

        <div>
          <Input
            element="input"
            id="title"
            type="text"
            label="Titel"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a title."
            onInput={inputHandler}
            initialValid={true}
            initialValue={loadedPost.title}
          />  
          <Input
            element="textarea"
            id="content"
            type="text"
            label="Inhalt"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter some valid content."
            onInput={inputHandler}
            initialValid={true}
            initialValue={loadedPost.content}
          />
          <div className="form-buttons">
            <Button inverse={isLink} type="button" onClick={()=>{setIsLink(prev => !prev)}} size="small">Link</Button>
            <Button inverse={isTeams} type="button" onClick={()=>{setIsTeams(prev => !prev)}} size="small">Teams</Button>
            </div>
          <Input 
          element="input"
          id="link"
          type="text"
          label="Link"
          validators={[]}
          errorText="Please enter a link."
          onInput={inputHandler}
          initialValid={true}
          initialValue={loadedPost.link}
          />
         <MultipleSelect 
                id="teams"
                label="Teams"
                options={loadedTeams}
                optionsName="team-option"
                validators={[]}
                errorText="Please enter a team."
                initialValue={loadedPost.teams}
                onInput={inputHandler}
                initialValid={true}
            />
          
          </div>
          <div className="halfwidth">
          <Input
            element="input"
            id="date"
            type="date"
            label="Datum"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a date."
            onInput={inputHandler}
            initialValid={true}
            initialValue={loadedPost.date}  
          /> 
          <Select
          id="category"
          label="Kategorie"
          errorText="Please enter a valid category."
          options={loadedCategories}
          validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]}
          onInput={inputHandler}
          initialValid={true}
          initialValue={loadedPost.category.id}
          />
          </div>
          {isReport && <div className="report-form">
          <h2>Spielbericht</h2>
          <p>Bitte gebe unten die Spielbericht Daten ein.</p>
          <Select
          id="team"
          label="Mannschaft"
          errorText="Please enter a valid team."
          options={loadedTeams}
          validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]}
          onInput={inputHandler}
          />
          <Input 
            element="input"
            id="opponent"
            type="input"
            label="Gegner Mannschaft"
            validators={[]}
            errorText="Please enter a valid team."
            onInput={inputHandler}
          />
        <div className="halfwidth">
            <Input 
            element="input"
            id="htshome"
            type="number"
            label="Heim"
            placeholder="Halbzeit-Score"
            validators={[VALIDATOR_MIN(0)]}
            errorText="Please enter a valid score."
            onInput={inputHandler}
          />
        <Input 
            element="input"
            id="htsguest"
            type="number"
            label="Gast"
            placeholder="Halbzeit-Score"
            validators={[VALIDATOR_MIN(0)]}
            errorText="Please enter a valid score."
            onInput={inputHandler}
          />
        </div>
        <div className="halfwidth">

        <Input 
            element="input"
            id="eshome"
            type="input"
            label="Heim"
            placeholder="End-Score"
            validators={[VALIDATOR_MIN(formState.inputs.htshome.value)]}
            errorText="Score muss höher sein als Halbzeit-Score."
            onInput={inputHandler}
          />
        <Input 
            element="input"
            id="esguest"
            type="input"
            label="Gast"
            placeholder="End-Score"
            validators={[VALIDATOR_MIN(formState.inputs.htsguest.value)]}
            errorText="Score muss höher sein als Halbzeit-Score."
            onInput={inputHandler}
          />
        </div>
        <div>
       
        </div>
          </div>}
          <div className="flex-checkers">
          {isReport && <Checkbox
            id="homematch"
            type="checkbox"
            label="Heimspiel"
            validators={[]}
            errorText="unknown error."
            onCheck={inputHandler}  
            initialValid={true} 
            checkedText="Dieses Spiel ist ein Heimspiel."

          />  }

          <Checkbox
            id="published"
            type="checkbox"
            label="Publish"
            validators={[]}
            errorText="Please enter a title."
            onCheck={inputHandler}  
            initialValid={true}
            checkedText="Geht nach dem Erstellen sofort Online."  

          />  
          
          <Checkbox
            id="highlighted"
            type="checkbox"
            label="Highlight"
            validators={[]}
            errorText="Please enter a title."
            onCheck={inputHandler}
            initialValid={true}
            checkedText="Wird im Titelslider angezeigt."  
  
          />
          
          </div>

        <Button type="submit" disabled={!formState.isValid}>
            Update Post
        </Button>
    </form>}
    </div>

    </div>
      </React.Fragment>

      )    
}

export default UpdatePost;