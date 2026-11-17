import React from 'react';

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <div className="section-header animate-on-scroll visible">
          <span className="section-tag"><i className="fas fa-route"></i> How It Works</span>
          <h2 className="section-title">Get Started in <span className="gradient-text">3 Simple Steps</span></h2>
          <p className="section-subtitle">Setting up RestroMind is as easy as ordering food!</p>
        </div>
        <div className="steps-container">
          <div className="step-card animate-on-scroll visible" data-delay="0">
            <div className="step-number">01</div>
            <div className="step-icon"><i className="fas fa-mobile-screen-button"></i></div>
            <h3>Sign Up & Setup</h3>
            <p>Download the RestroMind Admin App, register your restaurant, add your menu, tables, and staff details. Takes just 30 minutes!</p>
          </div>
          <div className="step-connector animate-on-scroll visible">
            <div className="connector-line"></div>
            <div className="connector-dot"></div>
          </div>
          <div className="step-card animate-on-scroll visible" data-delay="200">
            <div className="step-number">02</div>
            <div className="step-icon"><i className="fas fa-qrcode"></i></div>
            <h3>Place QR Codes</h3>
            <p>Generate unique QR codes for each table from the app. Print and place them on tables. Customers scan to see your digital menu instantly!</p>
          </div>
          <div className="step-connector animate-on-scroll visible">
            <div className="connector-line"></div>
            <div className="connector-dot"></div>
          </div>
          <div className="step-card animate-on-scroll visible" data-delay="400">
            <div className="step-number">03</div>
            <div className="step-icon"><i className="fas fa-circle-check"></i></div>
            <h3>Go Live!</h3>
            <p>That's it! Customers order from their phones, kitchen gets orders in real-time, you track everything on your dashboard. Magic! ✨</p>
          </div>
        </div>
      </div>
    </section>
  );
}
