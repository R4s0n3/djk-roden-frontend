import React from "react";
import './AdminBar.css';
import AdminNavLinks from './AdminNavLinks';
import Sidebar from './Sidebar';

const AdminBar = () => {
    return(
        <Sidebar>
           <nav className="admin-navigation__sidebar-nav">
          <AdminNavLinks />
        </nav>
        </Sidebar>
    )
}

export default AdminBar;