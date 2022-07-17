import * as React from "react";
import './Calendar.css';
import 'react-calendar/dist/Calendar.css';
import { CSSTransition } from 'react-transition-group';
import {useHttpClient} from '../../hooks/http-hook';
import ErrorModal from '../UIElements/ErrorModal';
import LoadingSpinner from '../UIElements/LoadingSpinner';
import Calendar from 'react-calendar';
import { Icon } from "@iconify/react";

const DateCalendar = (props) => {
    const {isLoading, error, clearError, sendRequest} = useHttpClient();
    const [value, setValue] = React.useState(new Date());
    const [loadedDates, setLoadedDates] = React.useState();


    // const calendarTiles = document.getElementsByClassName('react-calendar__month-view__days__day');
    // let TilesToMatch = {
    //     all:[],
    //     loaded:[]
    // }
        
    
    
    // function getDate(str) {
    //     var regex = /aria-label="(.*?)"/;
    //     var match = regex.exec(str);
    //     return match[1];
    //   }


    const dateItems = (data, index) => {

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
            {data.home} - {data.guest} 
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

    // const handleTiles = ({activeStartDate, date, view}) => {

    //    console.log("1: ", activeStartDate)
    //    console.log("2: ", date.getDate())
    
    //    console.log("3: ", view)
    // }
    return(<>
    {isLoading && <LoadingSpinner asOverlay />}
    <ErrorModal error={error} onClear={clearError}  />
        <CSSTransition
        in={props.show}
        timeout={300}
        classNames="calendar"
        unmountOnExit
        mountOnEnter
        >
        
        <div className='calendar-widget'>
            <Calendar onChange={gimmeChange} value={value} />
            <hr/>
            <ul>
            {loadedDates && loadedDates.filter(d => new Date(d.date).toLocaleDateString() === new Date(value).toLocaleDateString()).map(dateItems)}
            </ul>
        </div>
        </CSSTransition>
    </>
    )
}

export default DateCalendar;