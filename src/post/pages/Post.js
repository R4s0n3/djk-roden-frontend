import * as React from 'react';
import {useParams} from 'react-router-dom';
import {useHttpClient} from '../../shared/hooks/http-hook';
import PostItem from '../components/PostItem';
import PostGrid from '../components/PostGrid';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import './Post.css';

const Post = () => {
    const [singlePost, setSinglePost] = React.useState([]);
    const [loadedPosts, setLoadedPosts] = React.useState([]);
    const [loadedData, setLoadedData ] = React.useState(false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const {postId} = useParams(); 

   React.useEffect(()=>{
    const fetchData = async () => {
        try{
            const myPost = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/posts/${postId}`)
            const responsePosts = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/posts');
            setLoadedPosts(responsePosts.posts.filter(post => post.category.title === myPost.post.category.title));
            setSinglePost(p => [...p, myPost.post]);
            setLoadedData(true);
            }catch(err){}
    }
   fetchData()
    },[sendRequest, postId]);


    const createItem = (data, index) => {
        if(data.category.title === "Spielbericht"){
            const { opponent, htshome, htsguest, homematch, eshome, esguest} = data.report; 
            console.log(data.report.id);

            return(
                <PostItem
                    key={index}
                    id={data.id}
                    title={data.title}
                    imageUrl={data.image}
                    author={data.creator.name}
                    date={data.date}
                    category={data.category.title}
                    content={data.content}
                    reportId={data.report.id}
                    opponent={opponent}
                    homematch={homematch}
                    htshome={htshome}
                    htsguest={htsguest}
                    eshome={eshome}
                    esguest={esguest}
    
    
                />
            )
        }else{
            return(
                <PostItem
                    key={index}
                    id={data.id}
                    title={data.title}
                    imageUrl={data.image}
                    author={data.creator.name}
                    date={data.date}
                    category={data.category.title}
                    content={data.content}
    
    
                />
            )
        }

       
    }
    return(<React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        
   {isLoading && (
     <div className="center">
       <LoadingSpinner asOverlay/>
     </div>
   )}

        <div className="main-container post">
<div className="single-post__container">
{!isLoading && loadedData && singlePost.slice(0,1).map(createItem)}
</div>
 {!isLoading && loadedData && <div className="featured-posts__container">
    <h2>Mehr Posts</h2>
   <PostGrid items={loadedPosts.filter(p => p.published === "true")} />
</div> }
        </div>
        </React.Fragment>  )

}

export default Post;