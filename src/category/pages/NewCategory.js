import React,{useEffect, useState, useContext}from 'react';
import CategoriesList from '../components/CategoriesList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Input from '../../shared/components/FormElements/Input';

import {
    VALIDATOR_REQUIRE,
  } from "../../shared/util/validators";
import { useForm} from "../../shared/hooks/form-hook";
import Button from '../../shared/components/FormElements/Button';
import { AuthContext} from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

const NewCategory = props => {
    const auth = useContext(AuthContext);
    const [createMode, setCreateMode] = useState(false);
    const [formState, inputHandler] = useForm({
      title:{
          value:"",
          isValid:false
      }
  }, false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedCategories, setLoadedCategories] = useState();

    const createCategoryHandler = async event =>{
        console.log(formState);
        event.preventDefault();
        let categoryData;
        try{
          categoryData = await sendRequest(
            process.env.REACT_APP_BACKEND_URL + '/categories',
            'POST',
            JSON.stringify({
              title: formState.inputs.title.value
            }),{
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + auth.token
            });

            setLoadedCategories([...loadedCategories, categoryData.category]);
            window.scrollTo(0, 0);

        }catch(err){}
    }

    useEffect(()=>{
      const fetchData = async () => {
          try{
  
              const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/categories');
              setLoadedCategories(responseData.categories.reverse());
              
          }catch(err){
                  console.log(err)
  
          }
      };
      fetchData();
  },[sendRequest]);

  const handleClick = () =>{
      setCreateMode(prev => !prev);
    }

    const deletedCategoryHandler = deletedCategoryId => {
      
      setLoadedCategories(prevCategories => prevCategories.filter(category => category.id !== deletedCategoryId));
    }


    return(
        <React.Fragment>
         <ErrorModal error={error} onClear={clearError} />
  
  {isLoading && (
    <div className="center">
      <LoadingSpinner asOverlay />
    </div>
  )}

  <div className="dash-container new-category">
      <div className="category-control">
          <div>
              <h2>Kategorie Übersicht</h2>
              {!isLoading && loadedCategories && <CategoriesList items={loadedCategories} onDeleteCategory={deletedCategoryHandler}/>}
              <Button inverse={createMode} onClick={handleClick}>{createMode ? "Abbruch" : "Neue Kategorie"}</Button>
              </div>
        {createMode &&  <div>
            <h2>Kategorieliste</h2>
            <p>Erstelle eine neue Kategorie</p>
            <div className="halfwidth">
            <div>
            <form autoComplete="off" className="category-form" onSubmit={createCategoryHandler}>
         
            <Input 
                element="input"
                id="title"
                type="text"
                label="Kategorie"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a title."
                onInput={inputHandler}
            />
          
            <Button type="submit">Kategory erstellen</Button>
            </form>
            </div>
            </div>
            </div>}
     </div>
          </div>

            </React.Fragment>   )
}

export default NewCategory;