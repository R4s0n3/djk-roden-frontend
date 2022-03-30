import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavLinks.css';

const NavLinks = () => {

  return (
    <ul className="nav-links">
        <li>
          <NavLink to="/verein">Verein</NavLink>
        </li>
        <li>
          <NavLink to="/news">News</NavLink>
        </li>
        <li>
          <NavLink to="/mannschaften/aktive">Aktive</NavLink>
        </li>
        <li>
          <NavLink to="/mannschaften/jugend">Jugend</NavLink>
        </li>
        <li className="show-on-mobile">
          <NavLink to="/sponsoring">Sponsoring</NavLink>
        </li>
        <li className="show-on-mobile">
          <NavLink to="/kontakt">Kontakt</NavLink>
        </li>

    </ul>
  );
};

export default NavLinks;
