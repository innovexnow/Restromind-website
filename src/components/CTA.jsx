import React from 'react';

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content animate-on-scroll visible">
          <h2>Ready to Make Your Restaurant <span className="gradient-text">Smarter?</span></h2>
          <p>Join 500+ restaurants already using RestroMind to boost their revenue and customer satisfaction.</p>
          <div className="cta-buttons">
            <a href="#contact" className="btn btn-white btn-lg">
              <i className="fas fa-rocket"></i> Get Started Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
