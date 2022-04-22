import {Link} from 'react-router-dom';
import './Mannschaften.css';

const Mannschaften = () => {


    return(
        <div id="Mannschaften" className="main-container">
        <div>
            <h1>Mannschaften</h1>
            <hr />
            <p>Über welche Mannschaften möchtest du mehr erfahren?</p>
        </div>
        <div className="halfwidth">
        <div>
            <Link to="/mannschaften/jugend">JUGEND</Link>
            </div>
            <div>
            <Link to="/mannschaften/aktive">AKTIVE</Link>
            </div>
        </div>
         
        </div>
    )
}

export default Mannschaften;