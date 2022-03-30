import React from 'react';
import logo from '../../../assets/svg/logo_bild.svg';
import discord from '../../../assets/svg/discordapp.svg';
import legal from '../../../assets/svg/legal.svg';
import impressum from '../../../assets/svg/impressum.svg';
import './Footer.css';

const Footer = () => {
    return(<footer id="page-footer">
        <div>
        <h3>Firemaw's most wanted</h3>
        </div>
        <div>
        <img className="footer-logo" src={logo} width="50" alt="logo" />
        </div>
        <div><div className="footer-icon-box">
        <a href="https://discord.gg/ZRjQwB3WQQ"><img className="footer-icon" src={discord} height="30" alt="discord" />  </a>
       <img className="footer-icon" src={legal} height="30" alt="legal" />
    <img className="footer-icon" src={impressum} height="30" alt="impressum" />
        </div>
        </div>
    </footer>)
}

export default Footer;