import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.scss';
import etereaLogo from '../../assets/logos/ETÉREA_Icono_antracita.svg';
import burgerMenu from '../../assets/icons/burguer-menu.svg';
import crossIcon from '../../assets/icons/cross.svg';
import rhombusIcon from '../../assets/icons/rombo.svg';

const ANIMATION_DURATION = 120; // ms, igual que el fade

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCross, setShowCross] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isVipPage = location.pathname === '/vip-assistance';

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleMenuClick = () => {
    if (!isMenuOpen) {
      setShowCross(true);
      setTimeout(() => setIsMenuOpen(true), ANIMATION_DURATION);
    } else {
      setShowCross(false);
      setTimeout(() => setIsMenuOpen(false), ANIMATION_DURATION);
    }
  };

  const closeMenu = () => {
    setShowCross(false);
    setTimeout(() => setIsMenuOpen(false), ANIMATION_DURATION);
  };

  return (
    <>
      <nav className={`navbar${isMenuOpen ? ' navbar--menu-open' : ''}${isLanding ? ' navbar--fixed' : ''}${isVipPage ? ' navbar--vip' : ''}`}>
        <div className="navbar__container">
          <Link to="/" className="navbar__logo-link" onClick={closeMenu}>
            <img src={etereaLogo} alt="Eterea Logo" className="navbar__logo" />
          </Link>
          <button 
            className="navbar__menu-button"
            onClick={handleMenuClick}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <img 
              src={burgerMenu} 
              alt="Menú" 
              className={`navbar__menu-icon${!showCross ? ' navbar__menu-icon--active' : ' navbar__menu-icon--fadeout'}`}
            />
            <img 
              src={crossIcon} 
              alt="Cerrar" 
              className={`navbar__menu-icon${showCross ? ' navbar__menu-icon--active' : ' navbar__menu-icon--fadeout'}`}
            />
          </button>
        </div>
      </nav>

      <div className={`menu-overlay${isMenuOpen ? ' menu-overlay--open' : ''}`}>
        <div className="menu-overlay__content">
          <div className="menu-overlay__main-items">
            <Link to="/eventos" className="menu-overlay__item eterea-title" onClick={closeMenu}>
              <span className="menu-overlay__rhombus menu-overlay__rhombus--left">
                <img src={rhombusIcon} alt="" />
              </span>
              CURATED EVENT
              <span className="menu-overlay__rhombus menu-overlay__rhombus--right">
                <img src={rhombusIcon} alt="" />
              </span>
            </Link>
            <Link to="/bodas" className="menu-overlay__item eterea-title" onClick={closeMenu}>
              <span className="menu-overlay__rhombus menu-overlay__rhombus--left">
                <img src={rhombusIcon} alt="" />
              </span>
              BODAS
              <span className="menu-overlay__rhombus menu-overlay__rhombus--right">
                <img src={rhombusIcon} alt="" />
              </span>
            </Link>
            <Link to="/vip-assistance" className="menu-overlay__item eterea-title" onClick={closeMenu}>
              <span className="menu-overlay__rhombus menu-overlay__rhombus--left">
                <img src={rhombusIcon} alt="" />
              </span>
              VIP ASSISTANCE
              <span className="menu-overlay__rhombus menu-overlay__rhombus--right">
                <img src={rhombusIcon} alt="" />
              </span>
            </Link>
          </div>
          <div className="menu-overlay__secondary-items">
            <Link to="/nosotras" className="menu-overlay__item eterea-title" onClick={closeMenu}>
              <span className="menu-overlay__rhombus menu-overlay__rhombus--left">
                <img src={rhombusIcon} alt="" />
              </span>
              NOSOTRAS
              <span className="menu-overlay__rhombus menu-overlay__rhombus--right">
                <img src={rhombusIcon} alt="" />
              </span>
            </Link>
            <Link to="/contacto" className="menu-overlay__item eterea-title" onClick={closeMenu}>
              <span className="menu-overlay__rhombus menu-overlay__rhombus--left">
                <img src={rhombusIcon} alt="" />
              </span>
              CONTACTO
              <span className="menu-overlay__rhombus menu-overlay__rhombus--right">
                <img src={rhombusIcon} alt="" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="navbar__menu">
          <div className="navbar__menu-content">
                      <Link to="/eventos" className="navbar__menu-link" onClick={closeMenu}>
            Eventos
          </Link>
          <Link to="/bodas" className="navbar__menu-link" onClick={closeMenu}>
            Bodas
          </Link>
          <Link to="/vip-assistance" className="navbar__menu-link" onClick={closeMenu}>
            VIP Assistance
          </Link>
            <Link to="/nosotras" className="navbar__menu-link" onClick={closeMenu}>
              Nosotras
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar; 