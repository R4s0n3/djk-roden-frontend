import React from "react";
import logo from '../../assets/SVG/djk-sls-roden.svg';
import {Link}from 'react-router-dom';
import {Icon} from '@iconify/react';
import "./Footer.css";
const Footer = () => {

    const YEAR = new Date().getFullYear();
    const footerStyle= {
        "color": "#fff",
        "textDecoration": "none"
    }
    return(<div>
  <footer className="main-footer">
  <div>
  <img src={logo} alt="logo" height="150px"/>
  <ul className="footer-ul">
      <li><a href="https://www.hvsaar.de/nc/spielbetrieb/hallenverzeichnis/" rel="noreferrer" target="_blank">Hallenverzeichnis</a></li>
      <li><Link reloadDocument to="/kontakt">Kontakt</Link></li>
      <li><Link reloadDocument to="/impressum">Impressum</Link></li>
      <li><Link reloadDocument to="/datenschutz">Datenschutz</Link></li>
    
  </ul>
  <div className="maintance-social-links">
            <a href="https://www.instagram.com/hgs_the.next.ones_/" rel="noreferrer" target="_blank"><Icon className="djk-icon" icon="akar-icons:instagram-fill" height="40px" color="#fff" /></a>
            <a href="https://de-de.facebook.com/hgsthenextones/" rel="noreferrer" target="_blank"><Icon className="djk-icon" icon="akar-icons:facebook-fill" height="40px" color="#fff" /></a>
            </div>

  <p><a style={footerStyle} href="https://vcard.miomideal.com" rel="noreferrer" target="_blank">© {YEAR} Mio Mideal </a></p>

  </div>
        </footer>
    </div>
      
    )
}
export default Footer;