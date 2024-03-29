import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/SVG/100_jahre_ohne.svg';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import IconNavLinks from './IconNavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';

import './MainNavigation.css';

const MainNavigation = props => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
        <div className="main-navigation_header-logo">
        <Link reloadDocument to="/"><img src={logo} alt="logo" height="35px" /></Link>
        </div>
        <nav className="main-navigation__header-icon-nav">
          <IconNavLinks />
        </nav>  
          
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
