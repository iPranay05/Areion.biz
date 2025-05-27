'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <header className={isSticky ? 'sticky' : ''}>
      <div className="container flex-row">
        <div className="header__logo">
          <Image 
            src="/assets/img/areion.png" 
            alt="Logo" 
            width={150} 
            height={150} 
            style={{ objectFit: 'contain' }}
          />
        </div>
        <nav>
          <ul className={`header__menu flex-row ${showMenu ? 'show' : ''}`}>
            <li>
              <Link href="#hero" onClick={closeMenu}>Home</Link>
            </li>
            <li>
              <Link href="#about" onClick={closeMenu}>About</Link>
            </li>
            <li>
              <Link href="#services" onClick={closeMenu}>Services</Link>
            </li>
            <li>
              <Link href="#packs" onClick={closeMenu}>Packs</Link>
            </li>
            <li>
              <Link href="#team" onClick={closeMenu}>Team</Link>
            </li>
            <li>
              <Link href="#testimonial" onClick={closeMenu}>Testimonials</Link>
            </li>
            <li>
              <Link href="#contact" onClick={closeMenu}>Contact</Link>
            </li>
            <li>
              <Link href="/chatbot" onClick={closeMenu} className="ai-assistant-link">AI Assistant</Link>
            </li>
          </ul>
        </nav>
        <div className="right flex-center">
          <Link href="#contact" className="btn btn-secondary">Get a Quote</Link>
          <div className="menu-btn" onClick={toggleMenu}>
            <i className="fas fa-bars"></i>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
