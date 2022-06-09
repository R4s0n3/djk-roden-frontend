import React,{useState}from 'react';
import './NewsGrid.css';
import PostGridItemLarge from './PostGridItemLarge';
import Button from '../../shared/components/FormElements/Button';
const NewsGrid = props => {
    const initialCount = 4;
    const [count, setCount] = useState(initialCount);
    const [filterState, setFilterState] = useState();
    const [outOfPosts,setOutOfPosts] = useState(false);

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
    const increaseCount = () =>{
      const postsCount = props.items.length;
      
      if(count <= postsCount){
        console.log("c1: ", count);
        setCount(count+4);
        console.log(postsCount);
      }else{
        setCount(count+4);
        console.log("c2: ", count)

        setOutOfPosts(true);
      }
      
    }
  

    const handleAll = () => {
      setCount(initialCount);
      setOutOfPosts(false);
      setFilterState(false);
    }
    
    const handleFilters = e => {
      e.preventDefault();
      console.log(e.target)
      setCount(initialCount);
      setOutOfPosts(false);
      setFilterState(e.target.innerHTML);
    }

    const createFilter = (data, index) => {
      return(
        <Button key={index} inverse={filterState === data.title} type="button" onClick={handleFilters}>{data.title}</Button>
        
      )
    }

    return(<React.Fragment>

<div style={{margin:"0 0 1rem 0.5%"}}>
       <Button inverse={!filterState} type="button"  onClick={handleAll}>Alle</Button>
      {props.filters.map(createFilter)}
     </div>

      <div className="post-grid">
    
        <div className="post-grid__col-full">
          
          {filterState && props.items.filter(post => post.category.title === filterState).slice(0,count).map(createCardsLG)}
          {!filterState && props.items.slice(0,count).sort((a,b) => a.index - b.index).map(createCardsLG)}
        </div>
       
        </div>
       

     <div style={{margin:"0 0 1rem 0.5%"}}> 
     <Button type="button" disabled={outOfPosts} onClick={increaseCount} >{outOfPosts ? "Das wars." : "Mehr Posts"}</Button>
     </div>
    </React.Fragment>)
}

export default NewsGrid;

