import * as React from 'react';
import {useParams} from 'react-router-dom';
import {useHttpClient} from '../../shared/hooks/http-hook';
import TeamItem from '../components/TeamItem';
import PostGrid from '../../post/components/PostGrid';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import SponsorGrid from '../../sponsor/components/SponsorGrid';
import './Team.css';



const Team = () => {
    const [loadedTeam, setLoadedTeam] = React.useState([]);
    const [loadedPosts, setLoadedPosts] = React.useState();
    const [loadedSponsors, setLoadedSponsors] = React.useState();
    const [loadedData, setLoadedData ] = React.useState(false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const {teamId} = useParams(); 
   

    
    React.useEffect(()=>{
        const fetchData = async () => {
            try{
                const myTeam = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/teams/${teamId}`);
                setLoadedTeam(myTeam.team);
                
                const responsePosts = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/posts');
                let filteredPosts = responsePosts.posts.filter(p => p.teams.find(t => t.id === teamId));
                console.log("filtered Posts: ", filteredPosts);
                setLoadedPosts(filteredPosts);

                const responseSponsors = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/sponsors');
                
                const teamSponsors = responseSponsors.sponsors.filter(s => s.teams.includes(teamId));
                setLoadedSponsors(teamSponsors);
                setLoadedData(true);
                console.log(teamSponsors)

                }catch(err){}
        }
       fetchData()
        },[sendRequest, teamId]);
        


    
    
    return(<React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        
   {isLoading && (
     <div className="center">
       <LoadingSpinner asOverlay/>
     </div>
   )}
        <div className="team">
{loadedData && loadedTeam && <TeamItem 
                key={loadedTeam.index}
                id={loadedTeam.id}
                title={loadedTeam.name}
                status={loadedTeam.status}
                gender={loadedTeam.gender}
                imageUrl={loadedTeam.image}
                league={loadedTeam.league}
                content={loadedTeam.desc}
                players={loadedTeam.players}
                trainers={loadedTeam.trainers}
                trainings={loadedTeam.trainings}
                link={loadedTeam.link}
                fb={loadedTeam.fb}
                insta={loadedTeam.insta}
            />}

{loadedData && loadedPosts && loadedPosts.length > 0 && <div className="featured-posts__container">
    <h2>Teamberichte</h2>
   <PostGrid items={loadedPosts} />

</div> }
{loadedData && loadedSponsors.length > 0 && <div className="featured-sponsors__container">
    <h2>{loadedTeam.name} Sponsoren</h2>
{loadedSponsors && <SponsorGrid items={loadedSponsors} />}
    </div>}
        </div>
    </React.Fragment>)
}

export default Team;