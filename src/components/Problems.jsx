import React from 'react';

export default function Problems() {
  const problems = [
    {
      icon: 'fa-file-pen',
      title: 'Manual Order Taking',
      desc: 'Waiters take orders on paper, miscommunication happens, wrong orders reach the kitchen. Customers get frustrated.',
      impact: '30% orders have errors',
      delay: 0
    },
    {
      icon: 'fa-clock',
      title: 'Long Wait Times',
      desc: 'Customers wait 15-20 minutes just to place an order. During peak hours, the chaos multiplies.',
      impact: '40% customers leave due to wait',
      delay: 100
    },
    {
      icon: 'fa-chart-column',
      title: 'No Data, No Insights',
      desc: "Which dish sells most? When is peak hour? What's the daily revenue? No answers — just guesswork.",
      impact: 'Lost growth opportunities',
      delay: 200
    },
    {
      icon: 'fa-chart-line',
      title: 'Crushing 30% Commissions',
      desc: 'Food aggregators eat away 25-32% of your hard-earned margins. You do all the cooking and operations, while they pocket your profits.',
      impact: '30%+ profit wiped out',
      delay: 300
    },
    {
      icon: 'fa-user-group',
      title: 'Staff Mismanagement',
      desc: 'No way to track staff performance, assign roles, or manage shifts. Everything is managed verbally.',
      impact: 'Low staff productivity',
      delay: 400
    },
    {
      icon: 'fa-money-bill-transfer',
      title: 'Revenue Leakage',
      desc: 'No proper billing system, manual calculations lead to errors. Money is lost without even knowing.',
      impact: 'Up to 15% revenue loss',
      delay: 500
    }
  ];

  return (
    <section className="problems-section" id="problems">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-tag"><i className="fas fa-triangle-exclamation"></i> The Problem</span>
          <h2 className="section-title">Running a Restaurant is <span className="gradient-text">Stressful</span></h2>
          <p className="section-subtitle">Every restaurant owner faces these daily challenges. Sound familiar?</p>
        </div>
        <div className="problems-grid">
          {problems.map((p, idx) => (
            <div className="problem-card animate-on-scroll visible" data-delay={p.delay} key={idx}>
              <div className="problem-icon"><i className={`fas ${p.icon}`}></i></div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="problem-impact">
                <i className="fas fa-exclamation-triangle"></i> {p.impact}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
