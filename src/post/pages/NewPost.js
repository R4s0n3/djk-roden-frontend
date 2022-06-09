import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";

import PostList from '../components/PostList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Input from '../../shared/components/FormElements/Input';
import Checkbox from '../../shared/components/FormElements/Checkbox';

import Select from '../../shared/components/FormElements/Select';
import MultipleSelect from '../../shared/components/FormElements/MultipleSelect';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
    VALIDATOR_MIN
  } from "../../shared/util/validators";

import { useForm } from "../../shared/hooks/form-hook";
import Button from '../../shared/components/FormElements/Button';
import { useHttpClient } from '../../shared/hooks/http-hook';
import {AuthContext} from '../../shared/context/auth-context';
import './NewPost.css';

const NewPost = () => {
  const auth = useContext(AuthContext);
  const [formState, inputHandler, setFormData ] = useForm({
    title: {
      value: "",
      isValid: false,
    },
    content: {
      value: "",
      isValid: false,
    },
    category: { 
      value: "",
      isValid: false,
    },
    link:{
      value:"",
      isValid: true
    },
    date: { 
      value: "",
      isValid: false,
    },
    published: { 
      value: false,
      isValid: true,
    },
    highlighted: { 
      value: false,
      isValid: true,
    },
   
    image: { 
      value: null,
      isValid: false,
    },
    teams:{
      value: [],
      isValid: true
    }
  }, false);

    const [loadedPosts, setLoadedPosts] = useState(); 
    const [loadedCategories, setLoadedCategories] = useState(); 
    const [loadedTeams, setLoadedTeams] = useState(); 
    const [createMode, setCreateMode] = useState(false);
    const [isReport, setIsReport] = useState(false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [isLink, setIsLink] = useState(false);
    const [isTeams, setIsTeams] = useState(false);

   
    let navigate = useNavigate();
    const handleClick = () =>{
        setCreateMode(true);
    }
    const cancelCreateMode = () => {
        setCreateMode(false);
    }

    const deletedPostHandler = deletedPostId => {
        setLoadedPosts(prevPosts => prevPosts.filter(post => post.id !== deletedPostId));
        navigate('/dashboard/posts')

      };

    useEffect(()=>{
        const fetchPosts = async () => {
            try{
                const responseDataPosts = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/posts');
                const responseTeams = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/teams');
                const responseDataCategories = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/categories');
                setLoadedPosts(responseDataPosts.posts);
                setLoadedTeams(responseTeams.teams);
                setLoadedCategories(responseDataCategories.categories);
                
            }catch(err){

            }
        };
        fetchPosts();
    },[sendRequest]);

    const createPostHandler = async event =>{
      event.preventDefault();
      let reportData;
      try{
        if(formState.inputs.category.value === '6223c9515d09b510c093dec3'){
          reportData = await sendRequest(
            process.env.REACT_APP_BACKEND_URL + '/reports',
            'POST',
            JSON.stringify({
              team: formState.inputs.team.value,
              opponent: formState.inputs.opponent.value,
              homematch: formState.inputs.homematch.value,
              htshome: formState.inputs.htshome.value,
              htsguest: formState.inputs.htsguest.value,
              eshome: formState.inputs.eshome.value,
              esguest: formState.inputs.esguest.value
            }),
            {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + auth.token

            });
        }
        const teams = formState.inputs.teams.value        
        const formData = new FormData();
        formData.append('title', formState.inputs.title.value);
        formData.append('content', formState.inputs.content.value);
        formData.append('date', formState.inputs.date.value);
        if(teams.length > 0){
          for (let i = 0; i < teams.length; i++) {
            formData.append('teams', teams[i]);
          }}
        formData.append('link', formState.inputs.link.value);
        formData.append('image', formState.inputs.image.value);
        formData.append('category', formState.inputs.category.value);
        formData.append('published', formState.inputs.published.value);
        formData.append('highlighted', formState.inputs.highlighted.value);
        if(formState.inputs.category.value === '6223c9515d09b510c093dec3'){
        formData.append('report', reportData.repId);
        }
        await sendRequest(process.env.REACT_APP_BACKEND_URL + '/posts',
        'POST',
        formData,{
          Authorization: 'Bearer ' + auth.token
        });
        navigate('/dashboard');
      }catch(err){

      }
      

    }
    const formChangeChecker = event => {    
      if(event.target.id === 'category' && event.target.value === "6223c9515d09b510c093dec3" ){
        setIsReport(true);
        setFormData({
          ...formState.inputs,
          team: {
            value: "",
            isValid: false,
          },
          opponent: {
            value: "",
            isValid: false,
          },
          homematch: {
            value: false,
            isValid: true,
          },
          htshome: {
            value: "",
            isValid: false,
          },
          htsguest: {
            value: "",
            isValid: false,
          },
          eshome: {
            value: "",
            isValid: false,
          },
          esguest: {
            value: "",
            isValid: false,
          },
        },
        false);

       }else if(event.target.id === 'category' && event.target.value !== "6239156487b6da644f43d199"){
        setIsReport(false);
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
          published:{
            value:formState.inputs.published.value,
            isValid: formState.inputs.published.isValid
          },
          image:{
            value:formState.inputs.image.value,
            isValid: formState.inputs.image.isValid
          },
          teams:{
            value:formState.inputs.teams.value,
            isValid: formState.inputs.teams.isValid
          }
        },false);
      }

    }

    return( <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
  
        {isLoading && (
          <div className="center">
            <LoadingSpinner asOverlay/>
          </div>
        )}
        <div className="dash-container new-post">
        <div className="post-control">
        <div>
        <h2>Hi! New Posts!</h2>
        {!isLoading && loadedPosts && loadedCategories && <PostList items={loadedPosts} onDeletePost={deletedPostHandler} />}
        {!createMode && <Button onClick={handleClick}>Neuer Post</Button>}
        </div>
        <div>
          {createMode && <form onChange={formChangeChecker} autoComplete="off" className="post-form" onSubmit={createPostHandler}>
          <h2>Neuer Post</h2>
          <ImageUpload  center id="image" onInput={inputHandler} errorText="Please provide an image" />

          <div>
          <Input
            element="input"
            id="title"
            type="text"
            label="Titel"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a title."
            onInput={inputHandler}  
          />  
          <Input
            element="textarea"
            id="content"
            type="text"
            label="Inhalt"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter some valid content."
            onInput={inputHandler}  
          />
           <div className="form-buttons">
            <Button inverse={isLink} type="button" onClick={()=>{setIsLink(prev => !prev)}} size="small">Link</Button>
            <Button inverse={isTeams} type="button" onClick={()=>{setIsTeams(prev => !prev)}} size="small">Teams</Button>
            </div>
          {isLink && <Input 
          element="input"
          id="link"
          type="text"
          label="Link"
          validators={[]}
          errorText="Please enter a link."
          onInput={inputHandler}
          initialValid={true}
          />}
          {isTeams && <MultipleSelect 
                id="teams"
                label="Team"
                options={loadedTeams}
                optionsName="team-option"
                validators={[]}
                errorText="Please enter a team."
                initialValue={[]}
                onInput={inputHandler}
                initialValid={true}
            />}
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
          /> 
         
          <Select
          id="category"
          label="Kategorie"
          errorText="Please enter a valid category."
          options={loadedCategories}
          validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(3)]}
          onInput={inputHandler}
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
          <div>

          <Button type="submit" disabled={!formState.isValid}>
          Post erstellen
        </Button>
        <Button type="button" inverse onClick={cancelCreateMode}>
          Abbruch
        </Button>       

          </div>

          </form>}
         
        </div>

        </div>

        </div>
        </React.Fragment>
    )

}


export default NewPost;