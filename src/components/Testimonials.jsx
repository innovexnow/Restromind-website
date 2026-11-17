import React from 'react';

export default function Testimonials() {
  const list = [
    {
      stars: '⭐⭐⭐⭐⭐',
      text: '"RestroMind completely transformed how we manage our restaurant. Orders go directly to the kitchen, no more confusion. Our revenue increased by 35% in just 2 months!"',
      avatar: 'RK',
      name: 'Rajesh Kumar',
      role: 'Owner, Spice Garden',
      delay: 0
    },
    {
      stars: '⭐⭐⭐⭐⭐',
      text: '"The QR ordering feature is a game-changer! Customers love it, our staff is less stressed, and we can focus on what matters — great food. Best decision ever!"',
      avatar: 'PS',
      name: 'Priya Sharma',
      role: 'Manager, The Food Hub',
      delay: 150
    },
    {
      stars: '⭐⭐⭐⭐⭐',
      text: '"Analytics feature gave us insights we never had before. Now we know which dishes to promote, when to run offers, and how to optimize our menu. Incredible tool!"',
      avatar: 'AM',
      name: 'Amit Mehta',
      role: 'Owner, Urban Bites',
      delay: 300
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header animate-on-scroll visible">
          <span className="section-tag"><i className="fas fa-comments"></i> Testimonials</span>
          <h2 className="section-title">Restaurant Owners <span className="gradient-text">Love Us</span></h2>
        </div>
        <div className="testimonials-grid">
          {list.map((t, idx) => (
            <div className="testimonial-card animate-on-scroll visible" data-delay={t.delay} key={idx}>
              <div className="testimonial-stars">{t.stars}</div>
              <p>{t.text}</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.avatar}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
