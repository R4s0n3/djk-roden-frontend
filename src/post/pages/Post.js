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
    const [loadedTeam, setLoadedTeam] = React.useState();
    const [loadedPosts, setLoadedPosts] = React.useState([]);
    const [loadedData, setLoadedData ] = React.useState(false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const {postId} = useParams(); 

   React.useEffect(()=>{
    const fetchData = async () => {

        try{
            const userPost = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/posts/${postId}`)
            const responsePosts = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/posts');
            setLoadedPosts(responsePosts.posts.filter(post => post.id !== userPost.post.id && post.category.title === userPost.post.category.title).reverse());
            setSinglePost(p => [...p, userPost.post]);
            if(userPost.post.report){
            const teamId = userPost.post.report.team;
            const reportTeam = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/teams/' + teamId);
            setLoadedTeam(reportTeam.team);
            }
            setLoadedData(true)
            }catch(err){}

       

    
    }
    

   fetchData()
    },[sendRequest, postId]);


    const createItem = (data, index) => {
        if(data.category.title === "Spielbericht"){
            const { opponent, htshome, htsguest, homematch, eshome, esguest} = data.report; 
            
            return(
                <PostItem
                    key={index}
                    id={data.id}
                    title={data.title}
                    imageUrl={data.image}
                    author={data.creator.name}
                    date={data.date}
                    link={data.link}
                    teams={data.teams}
                    category={data.category.title}
                    content={data.content}
                    reportId={data.report.id}
                    team={loadedTeam}
                    opponent={opponent}
                    homematch={homematch}
                    htshome={htshome}
                    htsguest={htsguest}
                    eshome={eshome}
                    esguest={esguest}
                    gallery={data.gallery}
    
    
                />
            )
        }else{
            return(
                <PostItem
                    key={index}
                    id={data.id}
                    title={data.title}
                    link={data.link}
                    imageUrl={data.image}
                    author={data.creator.name}
                    date={data.date}
                    category={data.category.title}
                    content={data.content}
                    gallery={data.gallery}
                    teams={data.teams}
                
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