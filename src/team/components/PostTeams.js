import * as React from "react";
import PostTeamsItem from "./PostTeamsItem";
import './PostTeams.css'

const PostTeams = props => {
    const createItems = (data, index) => {
        return(
            <PostTeamsItem
                id={data.id}
                key={index}
                image={data.image}
                name={data.name}
                league={data.league}
                status={data.status}
            />
        )
    }
    return(<div>
        <div className="post-teams">
            <h2>Mannschaften</h2>
        </div>
 <div className="post-teams-container">
            {props.items.map(createItems)}
        </div>
    </div>
       
    )
}

export default PostTeams;