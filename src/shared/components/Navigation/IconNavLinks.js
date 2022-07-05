import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {Icon} from '@iconify/react';
import DateCalendar from './DateCalendar';
import { AuthContext } from '../../context/auth-context';
import './IconNavLinks.css';
import SideDrawer from './SideDrawer';
import AdminNavLinks from './AdminNavLinks';
import {useWindowSize} from '../../hooks/size-hook';
const IconNavLinks = () => {
  const [isMobile, setIsMobile] = useState()
  const size = useWindowSize(true);
  useEffect(()=>{
    const checkMobile = ()=>{
      if(size.width > 420){
        setIsMobile(false);
      }else if(size.width < 420){
        setIsMobile(true);
      }
    }
    checkMobile();
  },[size]);
 
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
    <li className="nav-calendar" onClick={handleCal}>
      {!isMobile && "Termine"}
      {isMobile && <Icon className="djk-icon" icon="bx:calendar" height="20px" color="#006400" />}
    </li>

      {!auth.isLoggedIn && (
        <li>
          <NavLink reloadDocument to="/auth"><Icon className="djk-icon" icon="bxs:user" height="20px" color="#006400" /></NavLink>
        </li>
      )}

      {auth.isLoggedIn && (
      <li>
        <button onClick={handleAdminNav}><Icon className="djk-icon" icon="eos-icons:content-new" height="20px" color="#006400" /></button>
      </li>
    )}
      {auth.isLoggedIn && (
      <li>
        <button onClick={auth.logout}><Icon className="djk-icon" icon="ic:round-logout" height="20px" color="#006400" /></button>
      </li>
    )}
    <DateCalendar show={isCal} onClick={handleCal}/>
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
