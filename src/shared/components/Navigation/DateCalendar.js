import * as React from "react";
import './Calendar.css';
import 'react-calendar/dist/Calendar.css';
import { CSSTransition } from 'react-transition-group';
import {useHttpClient} from '../../hooks/http-hook';
import ErrorModal from '../UIElements/ErrorModal';
import LoadingSpinner from '../UIElements/LoadingSpinner';
import Calendar from 'react-calendar';
const DateCalendar = (props) => {
    const {isLoading, error, clearError, sendRequest} = useHttpClient();
    const [value, setValue] = React.useState(new Date());
    const [loadedDates, setLoadedDates] = React.useState();

    React.useEffect(()=>{
        const fetchDates = async () => {
            try{
                const responseDates = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/dates');
                setLoadedDates(responseDates.dates);
            }catch(e){}
        }

        fetchDates();
    },[sendRequest])
    const gimmeChange = event => {
       console.log(event)

    }
    return(<>
    {isLoading && <LoadingSpinner />}
    <ErrorModal error={error} onClear={clearError} />
        <CSSTransition
        in={props.show}
        timeout={300}
        classNames="calendar"
        unmountOnExit
        mountOnEnter
        >
        
        <div className='calendar-widget'>
            <Calendar onChange={gimmeChange} value={value}/>
            <hr/>
            {loadedDates && loadedDates.filter(d => new Date(d.startDate).toLocaleDateString() === new Date(value).toLocaleDateString())}
        </div>
        </CSSTransition>
    </>
    )
}

export default DateCalendar;