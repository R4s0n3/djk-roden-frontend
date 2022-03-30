import './Sidebar.css';
import { CSSTransition } from 'react-transition-group';

const Sidebar = (props) => {
    return(<CSSTransition
        in={props.show}
        timeout={200}
        classNames="sidebar"
        unmountOnExit
        mountOnEnter
      >
        <aside className="sidebar hide-on-mobile" onClick={props.onClick}>{props.children}</aside>
        </CSSTransition>
    )
    
}

export default Sidebar;