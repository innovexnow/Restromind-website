import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sectionIds = ['home', 'benefits', 'problems', 'features', 'live-kitchen', 'how-it-works', 'user-app', 'admin-app', 'contact'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const toggleMenu = () => {
    setIsOpen(prev => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <a href="#home" className="nav-logo" onClick={closeMenu}>
          <img src="assets/images/logo.png" alt="RestroMind Logo" className="logo-img" />
          <span className="logo-text">Restro<span className="logo-highlight">Mind</span></span>
        </a>
        <div className={`nav-links ${isOpen ? 'active' : ''}`} id="navLinks">
          <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} onClick={closeMenu}>Home</a>
          <a href="#benefits" className={`nav-link ${activeSection === 'benefits' ? 'active' : ''}`} onClick={closeMenu}>Benefits</a>
          <a href="#problems" className={`nav-link ${activeSection === 'problems' ? 'active' : ''}`} onClick={closeMenu}>Problems We Solve</a>
          <a href="#features" className={`nav-link ${activeSection === 'features' ? 'active' : ''}`} onClick={closeMenu}>Features</a>
          <a href="#live-kitchen" className={`nav-link ${activeSection === 'live-kitchen' ? 'active' : ''}`} onClick={closeMenu}>Live Kitchen</a>
          <a href="#how-it-works" className={`nav-link ${activeSection === 'how-it-works' ? 'active' : ''}`} onClick={closeMenu}>How It Works</a>
          <a href="#user-app" className={`nav-link ${activeSection === 'user-app' || activeSection === 'admin-app' ? 'active' : ''}`} onClick={closeMenu}>Apps</a>
          <a href="#contact" className="nav-link nav-cta-link" onClick={closeMenu}>Get Started Free</a>
        </div>
        <button 
          className={`nav-toggle ${isOpen ? 'active' : ''}`} 
          id="navToggle" 
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
