import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminNavLinks.css';

const AdminNavLinks = props => {

  return (
    <ul className="admin-nav-links">
        <li className="admin-li">
          <NavLink reloadDocument to="/dashboard">Dashboard</NavLink>
        </li>
        <li className="admin-li">
          <NavLink reloadDocument to="/dashboard/users">Users</NavLink>
        </li>
        <li className="admin-li">
          <NavLink reloadDocument to="/dashboard/categories">Kategorien</NavLink>
        </li>
        <li className="admin-li">
          <NavLink reloadDocument to="/dashboard/posts">Posts</NavLink>
        </li>
        <li className="admin-li">
          <NavLink reloadDocument to="/dashboard/teams">Mannschaften</NavLink>
        </li>
        <li className="admin-li">
          <NavLink reloadDocument to="/dashboard/players">Spieler</NavLink>
        </li>
        <li className="admin-li">
          <NavLink reloadDocument to="/dashboard/trainers">Trainer</NavLink>
        </li>
        <li className="admin-li">
          <NavLink reloadDocument to="/dashboard/trainings">Trainingszeiten</NavLink>
        </li>
        <li className="admin-li">
          <NavLink  reloadDocument to="/dashboard/dates">Termine</NavLink>
        </li>
        <li className="admin-li">
          <NavLink reloadDocument to="/dashboard/leads">Vorstand</NavLink>
        </li>
        <li className="admin-li">
          <NavLink reloadDocument to="/dashboard/sponsors">Sponsoren</NavLink>
        </li>
       
    </ul>
  );
};

export default AdminNavLinks;
