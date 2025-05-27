'use client';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer__content">
          <div className="footer__details">
            <div className="footer__logo">
              <Image 
                src="/assets/img/areion.png" 
                alt="Logo" 
                width={150} 
                height={50} 
                style={{ objectFit: 'contain' }}
              />
            </div>
            <p className="footer__text">
              Expand your business with us! Get the best content stategies and insights by signing up for our Newsletter!
            </p>
            <div className="footer__newletter">
              <form action="#" className="footer__newsletter-form">
                <input type="email" placeholder="Submit Email" required />
                <div className="icon">
                  <i className="fa fa-envelope"></i>
                </div>
              </form>
            </div>
          </div>
          
          <div className="footer__menu">
            <h3 className="footer__menu-title">Quick Links</h3>
            <ul className="footer__menu-list">
              <li><Link href="#hero">Home</Link></li>
              <li><Link href="#about">About</Link></li>
              <li><Link href="#services">Services</Link></li>
              <li><Link href="#packs">Packs</Link></li>
              <li><Link href="#team">Team</Link></li>
              <li><Link href="#contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer__menu">
            <h3 className="footer__menu-title">Quick Links</h3>
            <ul className="footer__menu-list">
              <li><a href="#">Facebook</a></li>
              <li><a href="https://x.com/AreionAgency">Twitter</a></li>
              <li><a href="https://www.instagram.com/areion.agency">Instagram</a></li>
              <li><a href="https://www.linkedin.com/company/areion-agency-smma/">Linkedin</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer__bottom">
          <div className="footer__bottom-icons">
            <p>Follow Us</p>
            <a href="#" className="facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://x.com/AreionAgency" className="twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com/areion.agency" className="instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/company/areion-agency-smma/" className="linkedin">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        
        <div className="footer__copyright">
          <p>© {new Date().getFullYear()} Areion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
