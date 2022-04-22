import React from 'react';
import './PostGrid.css';
import PostGridItemLarge from './PostGridItemLarge';
import PostGridItemSmall from './PostGridItemSmall';
import Button from '../../shared/components/FormElements/Button';
const PostGrid = props => {
    const createCardsLG =(data,index)=>{
        return(<PostGridItemLarge
        key={index}
        content={data.content}
                date={data.createdAt}
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
                date={data.createdAt}
                image={data.image}
                author={data.creator.name}
                category={data.category.title}
                content={data.content}
               
            />
        )
    }
  
    return( <div className="post-grid">
        <div className="post-grid__col-long">
          {props.items.slice(0,3).map(createCardsLG)}
        </div>
        <div className="post-grid__col-short">
        {props.items.slice(3,5).map(createCardsSM)}
        <div>
        <div style={{padding:"0 0.5rem"}}>
        <Button to="/news">Mehr News</Button>

        </div>

        </div>
        </div>
        </div>)
}

export default PostGrid;

