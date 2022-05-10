 import {Link} from 'react-router-dom';
import './Kontakt.css';
import Button from '../../shared/components/FormElements/Button';
import Vereinsanmeldung from '../../shared/assets/DJK/Vereinsanmeldung.pdf';
import Förderverein from '../../shared/assets/DJK/Foerderverein.pdf';

const Kontakt = () => {
    return(
        <div className="main-container kontakt">
            <h1>Kontakt</h1>
            <hr />
            <h3>Ansprechpartner DJK Saarlouis-Roden Abt. Handball</h3>
            <h2>Beitrittsformulare zum Download</h2>
            <Button clasName="dl-button" type="button" href={Vereinsanmeldung} download>Verein</Button>
            <Button clasName="dl-button" type="button" href={Förderverein} download>Förderverein</Button>
            <h2>Allgemeine Rückfragen:</h2>
            <ul>
                <li>Herr Norbert Löffler</li>
                <li><a className="contact-link" href="mailto:norbert.loeffler@djk-roden.de">norbert.loeffler@djk-roden.de</a></li>
                <li>1. Vorsitzender</li>
            </ul>
            <h2>Jugendbereich:</h2>
            <ul>
                <li>Frau Marie Herrmann</li>
                <li><a className="contact-link" href="mailto:marie.herrmann@djk-roden.de">marie.herrmann@djk-roden.de</a></li>
                <li>2. Vorsitzende / Jugendkoordination</li>
            </ul>
            <h2>Weitere Kontaktmöglichkeiten</h2>
            <p>Auf den Seiten der Mannschaften finden Sie ausführlichere Kontaktinformationen.</p>
            <Link className="contact-link" to="/mannschaften">Mannschaften</Link>
        </div>
    )
}

export default Kontakt;