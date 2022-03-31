import React from "react";
import logo from '../../assets/SVG/djk-white.svg';
import {Icon} from '@iconify/react';
import "./Footer.css";
const Footer = () => {

    const footerStyle= {
        "color": "#fff",
        "textDecoration": "none"
    }
    return(<div>
  <footer className="main-footer">
  <div>
  <img src={logo} alt="logo" height="150px"/>
  <ul className="footer-ul">
      <li><a href="https://www.example.com">First Link</a></li>
      <li><a href="https://www.example.com">Second Link</a></li>
      <li><a href="https://www.example.com">Third Link</a></li>
      <li><a href="https://www.example.com">Fourth Link</a></li>
      <li><a href="https://www.example.com">Fifth Link</a></li>
  </ul>
  <div className="maintance-social-links">
            <a href="https://www.instagram.com/hgs_the.next.ones_/"><Icon className="djk-icon" icon="akar-icons:instagram-fill" height="40px" color="#fff" /></a>
            <a href="https://de-de.facebook.com/hgsthenextones/"><Icon className="djk-icon" icon="akar-icons:facebook-fill" height="40px" color="#fff" /></a>
            </div>

  <p><a style={footerStyle} href="https://vcard.miomideal.com">© Mio Mideal</a></p>

  </div>
        </footer>
    </div>
      
    )
}
export default Footer;