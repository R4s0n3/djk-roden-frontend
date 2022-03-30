import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminNavLinks.css';
import {Icon} from '@iconify/react';

const AdminNavLinks = props => {

  return (
    <ul className="admin-nav-links">
        <li className="admin-li">
          <NavLink to="/dashboard"><Icon className="djk-icon" icon="dashicons:dashboard" height="20px" color="#000" />Dashboard</NavLink>
        </li>
        <li className="admin-li">
          <NavLink to="/dashboard/users"><Icon className="djk-icon" icon="ph:users-three-fill" height="20px" color="#000" />Users</NavLink>
        </li>
        <li className="admin-li">
          <NavLink to="/dashboard/posts"><Icon className="djk-icon" icon="fluent:news-24-filled" height="20px" color="#000" />Posts</NavLink>
        </li>
        <li className="admin-li">
          <NavLink to="/dashboard/teams"><Icon className="djk-icon" icon="fluent:people-team-20-filled" height="20px" color="#000" />Mannschaften</NavLink>
        </li>
        <li className="admin-li">
          <NavLink to="/dashboard/players"><Icon className="djk-icon" icon="mdi:handball" height="20px" color="#000" />Spieler</NavLink>
        </li>
        <li className="admin-li">
          <NavLink to="/dashboard/trainers"><Icon className="djk-icon" icon="mdi:whistle" height="20px" color="#000" />Trainer</NavLink>
        </li>
        <li className="admin-li">
          <NavLink to="/dashboard/trainings"><Icon className="djk-icon" icon="carbon:event-schedule" height="20px" color="#000" />Trainingszeiten</NavLink>
        </li>
        <li className="admin-li">
          <NavLink to="/dashboard/dates"><Icon className="djk-icon" icon="akar-icons:calendar" height="20px" color="#000" />Termine</NavLink>
        </li>
        <li className="admin-li">
          <NavLink to="/dashboard/leads"><Icon className="djk-icon" icon="ph:coins-fill" height="20px" color="#000" />Vorstand</NavLink>
        </li>
        <li className="admin-li">
          <NavLink to="/dashboard/sponsors"><Icon className="djk-icon" icon="cil:badge" height="20px" color="#000" />Sponsoren</NavLink>
        </li>
       
    </ul>
  );
};

export default AdminNavLinks;
