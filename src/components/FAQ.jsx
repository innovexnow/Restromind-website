import React from 'react';

export default function FAQ() {
  const faqs = [
    {
      q: 'How can RestroMind help my restaurant?',
      a: 'RestroMind brings QR ordering, digital menus, live order handling and restaurant insights into one simple workflow.'
    },
    {
      q: 'Can I update my menu and prices myself?',
      a: 'Yes. The menu control tools let your team update items, prices, photos and availability as your menu changes.'
    },
    {
      q: 'How do I request a demo or get started?',
      a: 'Send us a message through the contact form with your restaurant details. Our team will follow up to arrange a walkthrough.'
    },
    {
      q: 'Does RestroMind support dine-in and takeaway orders?',
      a: 'The platform is designed to help manage dine-in, takeaway and delivery orders from a shared operations view.'
    }
  ];

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="section-header animate-on-scroll visible">
          <span className="section-tag"><i className="fas fa-lightbulb"></i> Quick Answers</span>
          <h2 className="section-title">Frequently Asked <span className="gradient-text">Questions</span></h2>
          <p className="section-subtitle">A few helpful details while our support team prepares your demo.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <details className="faq-item" key={idx}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
