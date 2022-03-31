import './Maintance.css';
import illuMainT from '../../shared/assets/SVG/illu_wartung.png';
import {Icon} from '@iconify/react';

const Maintance = () => {
    return (
        <div className="maintance">
            <h2>Wartungsmodus</h2>
            <p>Unsere Seite befindet sich gerade im Wartungsmodus. Komme zu einem späteren Zeitpunkt wieder zurück. Besuche uns doch in derzeit auf unseren Social Media Kanälen. Die Links findest du unten!</p>
            <img src={illuMainT} alt="maintance_banner" />
            <div className="maintance-social-links">
            <a href="https://www.instagram.com/hgs_the.next.ones_/"><Icon className="djk-icon" icon="akar-icons:instagram-fill" height="40px" color="#28cc64" /></a>
            <a href="https://de-de.facebook.com/hgsthenextones/"><Icon className="djk-icon" icon="akar-icons:facebook-fill" height="40px" color="#28cc64" /></a>
            </div>
        </div>
    )
}

export default Maintance;