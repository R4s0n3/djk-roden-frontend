import React,{ useState} from "react";
import './AdminBar.css';
import AdminNavLinks from './AdminNavLinks';
import Sidebar from './Sidebar';

const AdminBar = () => {
     const [isAdminBar, setIsAdminBar] = useState(false)   
    return(
        <Sidebar>
           <nav className="admin-navigation__sidebar-nav">
          <AdminNavLinks isOpen={isAdminBar} />
        </nav>
        </Sidebar>
    )
}

export default AdminBar;