import './Calendar.css';
import { CSSTransition } from 'react-transition-group';
const Calendar = (props) => {
    return(
        <CSSTransition
        in={props.show}
        timeout={300}
        classNames="calendar"
        unmountOnExit
        mountOnEnter
        >
        <div className='calendar-widget'>
            <h2>Termine</h2>
            <p>Derzeit ist noch nichts geplant :> <br/> Komm später wieder zurück.</p>
        </div>

        </CSSTransition>
    )
}

export default Calendar;