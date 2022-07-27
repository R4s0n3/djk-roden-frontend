import * as React from "react";
import './Calendar.css';
import 'react-calendar/dist/Calendar.css';
import { CSSTransition } from 'react-transition-group';
import { Link } from "react-router-dom";
import {useHttpClient} from '../../hooks/http-hook';
import ErrorModal from '../UIElements/ErrorModal';
import LoadingSpinner from '../UIElements/LoadingSpinner';
import Calendar from 'react-calendar';
import { Icon } from "@iconify/react";

const DateCalendar = (props) => {
    const {isLoading, error, clearError, sendRequest} = useHttpClient();
    const [value, setValue] = React.useState(new Date());
    const [loadedDates, setLoadedDates] = React.useState();

    const dateItems = (data, index) => {
        console.log(data)
        const createDate = (d) => {
            
            const convertedDate = new Date(d).toLocaleTimeString();
            console.log('date: ', convertedDate);
            return convertedDate.slice(0,5);
        }

        let dateColor;
        if( data.category.title === "Spiel"){
            dateColor = "blue"
        }else if(data.category.title === "Aktion"){
            dateColor = "green"
        }else{
            dateColor = "grey"
        }
        const dateStyle= {
            listStyle: "none",
            margin:"0.25rem 0",
            borderLeft:`2px solid ${dateColor}`
        }
       
        return <>
        <li key={index} style={dateStyle}>
            <div>
            {data.title} <Icon icon="bxs:time" width="12" /> {createDate(data.date)} Uhr
            </div>
           {data.home && <div>
            <Link to={`./mannschaften/info/${data.team.id}`} style={{display:"block", fontSize: "1rem", overflow: "hidden", textOverflow: "ellipsis" , whiteSpace: "nowrap"}} >{data.home} - {data.guest}</Link>
            </div>}
            {data.location && <div>
            <a style={{display:"block", fontSize: "1rem", overflow: "hidden", textOverflow: "ellipsis" , whiteSpace: "nowrap"}}target="blank" rel="noopener noreferrer" href={"https://www.google.com/maps/search/" + data.location} ><Icon icon="fa6-solid:location-dot" height="12" /> {data.location}</a>
            </div>}
            </li>
        </>
    }
    React.useEffect(()=>{

        const fetchDates = async () => {
           
          
        
            try{
                const responseDates = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/dates');
                
                setLoadedDates(responseDates.dates);
                
                
            }catch(e){}
        }
        
        fetchDates();

    },[sendRequest]);

    const gimmeChange = event => {
        console.log(event.toLocaleDateString())
       setValue(new Date(event))
        console.log(value);
    }

    const handleTiles = ({activeStartDate, date, view}) => {
        let disabledTiles = [];
        console.log(view);
        for (const date of loadedDates){
            const formattedDate = new Date(date.date).toLocaleDateString()
            disabledTiles.push(formattedDate);
        }
        if(disabledTiles.includes(date.toLocaleDateString())){
            return false;
        }else if(view !== "month"){
            return false;
        }else{
            return true;
        }
       
    }
    
    return(<>
    {isLoading && <LoadingSpinner invisible />}
    <ErrorModal error={error} onClear={clearError}  />
        <CSSTransition
        in={props.show}
        timeout={300}
        classNames="calendar"
        unmountOnExit
        mountOnEnter
        >
        
        <div className='calendar-widget'>
            <Calendar tileDisabled={handleTiles} onChange={gimmeChange} value={value} />
            <hr/>
            <ul>
            {loadedDates && loadedDates.filter(d => new Date(d.date).toLocaleDateString() === new Date(value).toLocaleDateString()).map(dateItems)}
            {loadedDates && loadedDates.filter(d => new Date(d.date).toLocaleDateString() === new Date(value).toLocaleDateString()).length === 0 && <li>keine Termine</li>}
            </ul>
        </div>
        </CSSTransition>
    </>
    )
}

export default DateCalendar;