import React from 'react';

export default function Benefits() {
  const benefits = [
    {
      iconBadge: 'speed',
      icon: 'fa-bolt',
      metric: '+35% Faster',
      title: 'Turn Tables 35% Faster',
      desc: 'Guests sit, scan table QR, and order in seconds. Kitchen gets direct tokens immediately. Diners finish 15-20 minutes faster, allowing you to seat 35% more tables during peak dinner rushes.',
      highlightIcon: 'fa-arrow-trend-up',
      highlightText: 'Average dine-in time drops from 60 mins to 38 mins',
      delay: 0
    },
    {
      iconBadge: 'green',
      icon: 'fa-coins',
      metric: '+24% AOV',
      title: 'Boost Average Bill Size',
      desc: 'High-resolution appetizing photo menus paired with smart auto-recommendations ("Add Truffle Fries or Mocktail for ₹99") effortlessly trigger impulse upselling that busy waiters miss.',
      highlightIcon: 'fa-chart-line',
      highlightText: 'Average order value increases by ₹140 to ₹220 per table',
      delay: 100
    },
    {
      iconBadge: 'shield',
      icon: 'fa-shield-halved',
      metric: '0% Commission',
      title: 'Save 30% Delivery Commissions',
      desc: 'Take back your margins from Zomato and Swiggy. Dine-in, pickup, and direct takeaway orders go through your own branded QR menu — you keep 100% of your earnings.',
      highlightIcon: 'fa-piggy-bank',
      highlightText: 'Average restaurant saves ₹40,000–₹80,000 every month',
      delay: 200
    },
    {
      iconBadge: 'chef',
      icon: 'fa-utensils',
      metric: '0% Errors',
      title: '100% Kitchen Accuracy & Direct KDS',
      desc: "No handwritten slips lost in the rush. Order modifications, spice levels, and allergies display cleanly on the chef's Kitchen Display System with auto-station routing.",
      highlightIcon: 'fa-check-circle',
      highlightText: 'Zero food re-makes or disappointed customer complaints',
      delay: 300
    },
    {
      iconBadge: 'pay',
      icon: 'fa-credit-card',
      metric: '5 Sec Pay',
      title: 'Instant Table-Side UPI & Split Bill',
      desc: 'No more waiting 10 minutes for a waiter to bring the bill folder or EDC machine. Customers view live itemized totals, split bills with friends, and pay via UPI in 5 seconds.',
      highlightIcon: 'fa-bolt',
      highlightText: 'Eliminates checkout bottlenecks and cashier counter crowds',
      delay: 400
    },
    {
      iconBadge: 'chat',
      icon: 'fa-comments',
      metric: '3x Returns',
      title: 'WhatsApp Loyalty CRM & Google Reviews',
      desc: "Automatically send digital tax receipts to diners' WhatsApp. Solicit 5-star Google reviews while food satisfaction is at its peak, and broadcast festival offers to drive repeat visits.",
      highlightIcon: 'fa-heart',
      highlightText: 'Build your own customer database and 3x repeat loyalty',
      delay: 500
    }
  ];

  return (
    <section className="benefits-section" id="benefits">
      <div className="container">
        <div className="section-header animate-on-scroll visible">
          <span className="section-tag"><i className="fas fa-chart-line"></i> Proven Business Impact</span>
          <h2 className="section-title">How RestroMind Multiplies Your <span className="gradient-text">Restaurant Profits</span></h2>
          <p className="section-subtitle">Real measurable benefits designed specifically for Indian restaurants, cafes, bars, and cloud kitchens.</p>
        </div>
        
        <div className="benefits-grid">
          {benefits.map((b, idx) => (
            <div className="benefit-card animate-on-scroll visible" data-delay={b.delay} key={idx}>
              <div className="benefit-card-glow"></div>
              <div className="benefit-header">
                <div className={`benefit-icon-badge ${b.iconBadge}`}><i className={`fas ${b.icon}`}></i></div>
                <div className="benefit-metric-pill green">{b.metric}</div>
              </div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
              <div className="benefit-highlight">
                <i className={`fas ${b.highlightIcon}`}></i>
                <span>{b.highlightText}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Banner */}
        <div className="benefit-roi-banner animate-on-scroll visible">
          <div className="roi-content">
            <div className="roi-badge">⚡ THE RESTROMIND GUARANTEE</div>
            <h3>Zero Expensive POS Hardware. See Revenue Jump in 7 Days.</h3>
            <p>Works seamlessly on existing smartphones, tablets, or thermal printers with instant 10-minute setup.</p>
          </div>
          <div className="roi-action">
            <a href="#contact" className="btn btn-primary btn-lg">
              <i className="fas fa-chart-pie"></i> Calculate Your Restaurant's ROI
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
