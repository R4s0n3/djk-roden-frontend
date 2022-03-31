import React,{useEffect,useState}from 'react';
import './PostGrid.css';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import PostGridItemLarge from './PostGridItemLarge';
import PostGridItemSmall from './PostGridItemSmall';
import Button from '../../shared/components/FormElements/Button';
const PostGrid = () => {
    const [loadedPosts, setLoadedPosts] = useState();
    const {isLoading, error, sendRequest,clearError} = useHttpClient();
        
    useEffect(()=>{
        const fetchPosts = async()=>{
            try{
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/posts');
                setLoadedPosts(responseData.posts.reverse());
               
            }catch(err){

            }
        }
        fetchPosts();
    },[sendRequest]);

    const createCardsLG =(data,index)=>{
        return(<PostGridItemLarge
        key={index}
        content={data.content}
                date={data.date}
                image={data.image}
                category={data.category.title}
                id={data.id}
                title={data.title}
                author={data.creator.name}
        />
        )
    }

    const createCardsSM =(data,index) =>{
        return(
            <PostGridItemSmall
            key={index}
                title={data.title}
                id={data.id}
                date={data.date}
                image={data.image}
                author={data.creator.name}
                category={data.category.title}
                content={data.content}
            />
        )
    }
  
    return(<React.Fragment>
     <ErrorModal error={error} onClear={clearError} />
     
  
{isLoading && (
  <div className="center">
    <LoadingSpinner asOverlay/>
  </div>
)}
     {!isLoading && loadedPosts && <div className="post-grid">
        <div className="post-grid__col-long">
          {loadedPosts.slice(0,3).map(createCardsLG)}
        </div>
        <div className="post-grid__col-short">
        {loadedPosts.slice(3,5).map(createCardsSM)}
        <div>
        <Button to="/posts">Mehr Posts</Button>

        </div>
        </div>
        </div>}
    </React.Fragment>)
}

export default PostGrid;

