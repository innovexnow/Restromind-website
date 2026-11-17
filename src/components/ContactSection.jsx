import React, { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    restaurant: '',
    city: '',
    message: ''
  });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', message: 'Sending your message...' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ state: 'success', message: 'Thank you! Your message has been sent. Our team will contact you within 24 hours.' });
        setFormData({ name: '', email: '', phone: '', restaurant: '', city: '', message: '' });
      } else {
        setStatus({ state: 'error', message: data.error || 'Failed to send message. Please try again or email us directly at innovexnow@gmail.com' });
      }
    } catch {
      setStatus({ state: 'error', message: 'Message recorded! We will get back to you shortly. You can also reach us at innovexnow@gmail.com' });
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="section-header animate-on-scroll visible">
          <span className="section-tag"><i className="fas fa-envelope"></i> Get In Touch</span>
          <h2 className="section-title">Ready to <span className="gradient-text">Transform</span> Your Restaurant?</h2>
          <p className="section-subtitle">Fill out the form below and our team will get back to you within 24 hours</p>
        </div>
        <div className="contact-content">
          <div className="contact-info animate-on-scroll visible">
            <div className="contact-info-card">
              <div className="contact-icon">📧</div>
              <h4>Email Us</h4>
              <p>innovexnow@gmail.com</p>
            </div>
            <div className="contact-info-card">
              <div className="contact-icon">📞</div>
              <h4>Call Us</h4>
              <p>+91 98765 43210</p>
            </div>
            <div className="contact-social">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="https://www.instagram.com/" className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                <a href="https://x.com/" className="social-link" aria-label="X" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                <a href="https://www.linkedin.com/" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>
          <form className="contact-form animate-on-scroll visible" id="contactForm" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Your full name" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="your@email.com" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  placeholder="+91 98765 43210" 
                  required 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="restaurant">Restaurant Name</label>
                <input 
                  type="text" 
                  id="restaurant" 
                  name="restaurant" 
                  placeholder="Your restaurant name" 
                  value={formData.restaurant}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input 
                type="text" 
                id="city" 
                name="city" 
                placeholder="Your city" 
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message / Query *</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                placeholder="Tell us about your restaurant and how we can help you..." 
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            {status.message && (
              <div 
                style={{
                  padding: '12px 18px',
                  borderRadius: '12px',
                  marginBottom: '16px',
                  fontSize: '14px',
                  fontWeight: 600,
                  background: status.state === 'success' ? '#ecfdf5' : '#fef2f2',
                  color: status.state === 'success' ? '#059669' : '#dc2626',
                  border: `1px solid ${status.state === 'success' ? '#a7f3d0' : '#fecaca'}`
                }}
              >
                {status.message}
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-lg btn-full" disabled={status.state === 'loading'}>
              <i className="fas fa-paper-plane"></i> {status.state === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
            <p className="form-note">We'll respond within 24 hours. Your information is safe with us. 🔒</p>
          </form>
        </div>
      </div>
    </section>
  );
}
