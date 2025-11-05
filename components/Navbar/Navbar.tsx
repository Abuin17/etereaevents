'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navbar.scss';
const etereaLogo = '/assets/logos/ETÉREA_Icono_antracita.svg';
const burgerMenu = '/assets/icons/burguer-menu.svg';
const crossIcon = '/assets/icons/cross.svg';
const rhombusIcon = '/assets/icons/rombo.svg';

const ANIMATION_DURATION = 120; // ms, igual que el fade

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCross, setShowCross] = useState(false);
  const pathname = usePathname();
  const isLanding = pathname === '/';
  const isVipPage = pathname === '/vip-assistance';

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
          <Link href="/" className="navbar__logo-link" onClick={closeMenu}>
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
            <Link href="/eventos" className="menu-overlay__item eterea-title" onClick={closeMenu}>
              <span className="menu-overlay__rhombus menu-overlay__rhombus--left">
                <img src={rhombusIcon} alt="" />
              </span>
              CURATED EVENT
              <span className="menu-overlay__rhombus menu-overlay__rhombus--right">
                <img src={rhombusIcon} alt="" />
              </span>
            </Link>
            {/* TEMPORARILY DISABLED - Bodas page */}
            {/* <Link href="/bodas" className="menu-overlay__item eterea-title" onClick={closeMenu}>
              <span className="menu-overlay__rhombus menu-overlay__rhombus--left">
                <img src={rhombusIcon} alt="" />
              </span>
              TAILORED WEDDINGS
              <span className="menu-overlay__rhombus menu-overlay__rhombus--right">
                <img src={rhombusIcon} alt="" />
              </span>
            </Link> */}
            <Link href="/vip-assistance" className="menu-overlay__item eterea-title" onClick={closeMenu}>
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
            <Link href="/nosotras" className="menu-overlay__item eterea-title" onClick={closeMenu}>
              <span className="menu-overlay__rhombus menu-overlay__rhombus--left">
                <img src={rhombusIcon} alt="" />
              </span>
              NOSOTRAS
              <span className="menu-overlay__rhombus menu-overlay__rhombus--right">
                <img src={rhombusIcon} alt="" />
              </span>
            </Link>
            <Link href="/contacto" className="menu-overlay__item eterea-title" onClick={closeMenu}>
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
                      <Link href="/eventos" className="navbar__menu-link" onClick={closeMenu}>
            Eventos
          </Link>
          {/* TEMPORARILY DISABLED - Bodas page */}
          {/* <Link href="/bodas" className="navbar__menu-link" onClick={closeMenu}>
            Tailored Weddings
          </Link> */}
          <Link href="/vip-assistance" className="navbar__menu-link" onClick={closeMenu}>
            VIP Assistance
          </Link>
            <Link href="/nosotras" className="navbar__menu-link" onClick={closeMenu}>
              Nosotras
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar; 