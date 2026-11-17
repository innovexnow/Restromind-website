import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              <img src="assets/images/logo.png" alt="RestroMind Logo" className="logo-img" />
              <span className="logo-text">Restro<span className="logo-highlight">Mind</span></span>
            </a>
            <p>The smartest way to manage your restaurant. From digital menus to real-time analytics — everything you need in one platform.</p>
          </div>
          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#user-app">User App</a>
            <a href="#admin-app">Admin App</a>
          </div>
          <div className="footer-links-col">
            <h4>Support</h4>
            <a href="#contact">Contact Us</a>
            <a href="#faq">FAQ</a>
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>
          </div>
          <div className="footer-links-col">
            <h4>Download</h4>
            <a href="#contact"><i className="fab fa-google-play"></i> User App (Android)</a>
            <a href="#contact"><i className="fab fa-google-play"></i> Admin App (Android)</a>
            <a href="#contact"><i className="fab fa-apple"></i> Coming Soon on iOS</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 RestroMind. All rights reserved. Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
}
