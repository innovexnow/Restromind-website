import React from 'react';

export default function Comparison() {
  return (
    <section className="comparison-section">
      <div className="container">
        <div className="section-header animate-on-scroll visible">
          <span className="section-tag"><i className="fas fa-scale-balanced"></i> The Difference</span>
          <h2 className="section-title">Before & After <span className="gradient-text">RestroMind</span></h2>
        </div>
        <div className="comparison-table animate-on-scroll visible">
          <div className="comparison-col before">
            <div className="comparison-header">
              <span className="comparison-emoji">😩</span>
              <h3>Without RestroMind</h3>
            </div>
            <div className="comparison-item"><i className="fas fa-times"></i> Paper-based order taking & chaos</div>
            <div className="comparison-item"><i className="fas fa-times"></i> 15-minute ordering wait times</div>
            <div className="comparison-item"><i className="fas fa-times"></i> Lost upselling (waiters forget to pitch)</div>
            <div className="comparison-item"><i className="fas fa-times"></i> 30% Aggregator commission drain</div>
            <div className="comparison-item"><i className="fas fa-times"></i> Miscommunication & wrong food orders</div>
            <div className="comparison-item"><i className="fas fa-times"></i> Costly physical printed paper menus</div>
            <div className="comparison-item"><i className="fas fa-times"></i> Zero customer phone numbers or CRM</div>
            <div className="comparison-item"><i className="fas fa-times"></i> Slow 60-min table turns & counter queues</div>
          </div>
          <div className="comparison-vs animate-on-scroll visible">
            <span>VS</span>
          </div>
          <div className="comparison-col after">
            <div className="comparison-header">
              <span className="comparison-emoji">🚀</span>
              <h3>With RestroMind</h3>
            </div>
            <div className="comparison-item"><i className="fas fa-check"></i> Digital QR-based instant ordering</div>
            <div className="comparison-item"><i className="fas fa-check"></i> 40-second ordering — zero wait time</div>
            <div className="comparison-item"><i className="fas fa-check"></i> +24% Higher bill size via smart upsells</div>
            <div className="comparison-item"><i className="fas fa-check"></i> 100% Direct profit margins (0% commission)</div>
            <div className="comparison-item"><i className="fas fa-check"></i> Direct kitchen KDS screen & thermal KOT</div>
            <div className="comparison-item"><i className="fas fa-check"></i> 1-click dynamic digital photo menu</div>
            <div className="comparison-item"><i className="fas fa-check"></i> Automated WhatsApp loyalty & 5-star reviews</div>
            <div className="comparison-item"><i className="fas fa-check"></i> 35% Faster table turns & 5-sec UPI pay</div>
          </div>
        </div>
      </div>
    </section>
  );
}
