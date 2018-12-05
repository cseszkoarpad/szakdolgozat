import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => (
  <footer>
    <div className="footer-menu-wrapper">
      <ul className="footer-list">
        <li><a href="/auth/google">Regisztráció</a></li>
        <li><a href="/auth/google">Bejelentkezés</a></li>
      </ul>
      <ul className="footer-list">
        <li><Link to="/kapcsolat">Kapcsolat</Link></li>
        {/*<li><Link to="/adatvedelmi-tajekoztato">Adatvédelmi tájékoztató</Link></li>
        <li><Link to="/aszf-jogi-nyilatkozat">ÁSZF és jogi nyilatkozat</Link></li>*/}
      </ul>
      <Link to={'/'}>
        <img
          src="http://www.pngpix.com/wp-content/uploads/2016/06/PNGPIX-COM-Yellow-Ferrari-F12tdf-Car-Front-PNG-Image.png"
          alt="premium-auto-portal-logo-" className="footer-logo"/>
      </Link>
    </div>
    <div className="footer-copyright">
      © {new Date().getFullYear()}. Személygépjármű portál
    </div>
  </footer>
);

export default Footer;