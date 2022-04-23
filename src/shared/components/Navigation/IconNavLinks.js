import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {Icon} from '@iconify/react';
import Calendar from './Calendar';
import { AuthContext } from '../../context/auth-context';
import './IconNavLinks.css';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';
import AdminNavLinks from './AdminNavLinks';

const IconNavLinks = () => {
  const auth = useContext(AuthContext);
  const [ isCal, setIsCal ] = useState(false)
  const [ isAdminBar, setIsAdminBar ] = useState(false)
  const handleCal = () =>{
    setIsCal(prev => !prev)
  }
  const handleAdminNav = () => {
    setIsAdminBar(prev => !prev)
  }
  const closeBarHandler = () => {
    setIsAdminBar(false)
  }
  return (
    <ul className="icon-nav-links">

    <li className="hide-on-mobile">
          <NavLink reloadDocument to="/sponsoring">Sponsoring</NavLink>
        </li>
        <li className="hide-on-mobile">
          <NavLink reloadDocument to="/kontakt">Kontakt</NavLink>
    </li>
    <li>
    <button onClick={handleCal}>
          <Icon className="djk-icon" icon="akar-icons:calendar" height="20px" color="#4BB05A" />
          </button>

    </li>

      {!auth.isLoggedIn && (
        <li>
          <NavLink reloadDocument to="/auth"><Icon className="djk-icon" icon="bxs:user" height="20px" color="#4BB05A" /></NavLink>
        </li>
      )}

      {auth.isLoggedIn && (
      <li>
        <button onClick={handleAdminNav}><Icon className="djk-icon" icon="eos-icons:content-new" height="20px" color="#4BB05A" /></button>
      </li>
    )}
      {auth.isLoggedIn && (
      <li>
        <button onClick={auth.logout}><Icon className="djk-icon" icon="ic:round-logout" height="20px" color="#4BB05A" /></button>
      </li>
    )}
    <Calendar show={isCal} onClick={handleCal}/>
    {isAdminBar && <Backdrop onClick={closeBarHandler} />}
     { <SideDrawer show={isAdminBar} onClick={closeBarHandler}>
        <nav className="admin-navigation__drawer-nav">
          <AdminNavLinks />
        </nav>
      </SideDrawer>      
    }
    </ul>
  );
};

export default IconNavLinks;
