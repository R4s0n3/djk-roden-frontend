 import {Link} from 'react-router-dom';
import './Kontakt.css';
import Button from '../../shared/components/FormElements/Button';
const Kontakt = () => {
    return(
        <div className="main-container kontakt">
            <h1>Kontakt</h1>
            <hr />
            <h3>Ansprechpartner DJK Saarlouis-Roden Abt. Handball</h3>
            <h2>Formulare zum Download</h2>
            <Button >Vereinsanmeldung</Button>
            <Button >Datenschutzerklärung</Button>
            <Button >Förderverein</Button>
            <h2>Allgemeine Rückfragen:</h2>
            <ul>
                <li>Herr Norbert Löffler</li>
                <li><a href="mailto:norbert.loeffler@djk-roden.de">norbert.loeffler@djk-roden.de</a></li>
                <li>1. Vorsitzender</li>
            </ul>
            <h2>Jugendbereich:</h2>
            <ul>
                <li>Frau Marie Herrmann</li>
                <li><a href="mailto:marie.herrmann@djk-roden.de">marie.herrmann@djk-roden.de</a></li>
                <li>2. Vorsitzende / Jugendkoordination</li>
            </ul>
            <h2>Weitere Kontaktmöglichkeiten</h2>
            <p>Auf den Seiten der Mannschaften finden Sie ausführlichere Kontaktinformationen.</p>
            <Link to="/mannschaften">Mannschaften</Link>
        </div>
    )
}

export default Kontakt;