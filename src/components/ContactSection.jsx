import React, { useState } from 'react';

const REGEX_PATTERNS = {
  // Letters, spaces, apostrophes, hyphens, min 2 chars, max 60 chars
  name: /^[a-zA-Z\s'.\-]{2,60}$/,
  // Standard RFC 5322 compliant email regex
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  // Indian standard phone (10 digits starting with 6-9, optionally with +91 or 0)
  indianPhone: /^(?:\+91[\-\s]?|0)?[6-9]\d{9}$/,
  // International format (+ followed by 10 to 14 digits)
  intlPhone: /^\+[1-9]\d{9,14}$/,
  // Optional restaurant name (min 2, max 100 chars)
  restaurant: /^[a-zA-Z0-9\s&'.,\-]{2,100}$/,
  // Optional city (letters and spaces, min 2, max 60 chars)
  city: /^[a-zA-Z\s'.\-]{2,60}$/
};

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    restaurant: '',
    city: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  // Field level validator
  const validateField = (fieldName, rawValue) => {
    const value = typeof rawValue === 'string' ? rawValue.trim() : '';

    switch (fieldName) {
      case 'name':
        if (!value) return 'Full Name is mandatory';
        if (value.length < 2) return 'Name must be at least 2 characters';
        if (!REGEX_PATTERNS.name.test(value)) return 'Name should contain only letters and spaces';
        return '';

      case 'email':
        if (!value) return 'Email Address is mandatory';
        if (!REGEX_PATTERNS.email.test(value)) return 'Please enter a valid email address (e.g. name@example.com)';
        return '';

      case 'phone': {
        if (!value) return 'Phone Number is mandatory';
        const clean = value.replace(/[\s\-\(\)]/g, '');
        if (/[^0-9+]/.test(clean)) return 'Phone number can only contain digits and optional +';
        
        const isIndian = REGEX_PATTERNS.indianPhone.test(clean);
        const isIntl = REGEX_PATTERNS.intlPhone.test(clean);
        
        if (!isIndian && !isIntl) {
          const digitsOnly = clean.replace(/\D/g, '');
          if (digitsOnly.length < 10) return 'Phone number must have at least 10 digits';
          if (digitsOnly.length > 13) return 'Phone number cannot exceed 13 digits (enter a valid 10-digit number)';
          if (digitsOnly.length === 10 && !/^[6-9]/.test(digitsOnly)) {
            return 'Mobile number must start with 6, 7, 8, or 9';
          }
          return 'Please enter a valid 10-digit mobile number (e.g. +91 98765 43210)';
        }
        return '';
      }

      case 'restaurant':
        if (value && value.length < 2) return 'Restaurant name must be at least 2 characters';
        if (value && value.length > 100) return 'Restaurant name cannot exceed 100 characters';
        if (value && !REGEX_PATTERNS.restaurant.test(value)) return 'Restaurant name contains invalid characters';
        return '';

      case 'city':
        if (value && value.length < 2) return 'City must be at least 2 characters';
        if (value && value.length > 60) return 'City cannot exceed 60 characters';
        if (value && !REGEX_PATTERNS.city.test(value)) return 'City should contain only letters and spaces';
        return '';

      case 'message':
        if (!value) return 'Message / Query is mandatory';
        if (value.length < 10) return `Message must be at least 10 characters (currently ${value.length}/10)`;
        if (value.length > 3000) return 'Message cannot exceed 3000 characters';
        return '';

      default:
        return '';
    }
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time error feedback if the field has already been touched
    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = {
      name: true,
      email: true,
      phone: true,
      restaurant: true,
      city: true,
      message: true
    };
    setTouched(allTouched);

    const validationErrors = validateAll();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus({
        state: 'error',
        message: 'Please fill out all mandatory fields correctly before submitting.'
      });

      // Automatically focus first invalid input
      const firstInvalidField = Object.keys(validationErrors)[0];
      const targetElement = document.getElementById(firstInvalidField);
      if (targetElement) {
        targetElement.focus();
      }
      return;
    }

    setStatus({ state: 'loading', message: 'Sending your message...' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({
          state: 'success',
          message: 'Thank you! Your message has been sent successfully. Our team will contact you within 24 hours.'
        });
        setFormData({ name: '', email: '', phone: '', restaurant: '', city: '', message: '' });
        setErrors({});
        setTouched({});
      } else {
        setStatus({
          state: 'error',
          message: data.error || 'Failed to send message. Please try again or email us directly at innovexnow@gmail.com'
        });
      }
    } catch {
      setStatus({
        state: 'error',
        message: 'Network issue or server unavailable. Please try again or reach us at innovexnow@gmail.com'
      });
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
          <form className="contact-form animate-on-scroll visible" id="contactForm" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className={`form-group ${touched.name && errors.name ? 'has-error' : touched.name && formData.name && !errors.name ? 'has-success' : ''}`}>
                <label htmlFor="name">
                  Full Name <span className="required-star">*</span>
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Your full name" 
                  required
                  maxLength={60}
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name && errors.name && (
                  <div className="form-field-error">
                    <i className="fas fa-circle-exclamation"></i>
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>
              <div className={`form-group ${touched.email && errors.email ? 'has-error' : touched.email && formData.email && !errors.email ? 'has-success' : ''}`}>
                <label htmlFor="email">
                  Email Address <span className="required-star">*</span>
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="your@email.com" 
                  required 
                  maxLength={100}
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && (
                  <div className="form-field-error">
                    <i className="fas fa-circle-exclamation"></i>
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className={`form-group ${touched.phone && errors.phone ? 'has-error' : touched.phone && formData.phone && !errors.phone ? 'has-success' : ''}`}>
                <label htmlFor="phone">
                  Phone Number <span className="required-star">*</span>
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  placeholder="+91 98765 43210" 
                  required 
                  maxLength={16}
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.phone && errors.phone && (
                  <div className="form-field-error">
                    <i className="fas fa-circle-exclamation"></i>
                    <span>{errors.phone}</span>
                  </div>
                )}
              </div>
              <div className={`form-group ${touched.restaurant && errors.restaurant ? 'has-error' : ''}`}>
                <label htmlFor="restaurant">Restaurant Name</label>
                <input 
                  type="text" 
                  id="restaurant" 
                  name="restaurant" 
                  placeholder="Your restaurant name" 
                  maxLength={100}
                  value={formData.restaurant}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.restaurant && errors.restaurant && (
                  <div className="form-field-error">
                    <i className="fas fa-circle-exclamation"></i>
                    <span>{errors.restaurant}</span>
                  </div>
                )}
              </div>
            </div>
            <div className={`form-group ${touched.city && errors.city ? 'has-error' : ''}`}>
              <label htmlFor="city">City</label>
              <input 
                type="text" 
                id="city" 
                name="city" 
                placeholder="Your city" 
                maxLength={60}
                value={formData.city}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.city && errors.city && (
                <div className="form-field-error">
                  <i className="fas fa-circle-exclamation"></i>
                  <span>{errors.city}</span>
                </div>
              )}
            </div>
            <div className={`form-group ${touched.message && errors.message ? 'has-error' : touched.message && formData.message && !errors.message ? 'has-success' : ''}`}>
              <label htmlFor="message">
                Your Message / Query <span className="required-star">*</span>
              </label>
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                placeholder="Tell us about your restaurant and how we can help you (minimum 10 characters)..." 
                required
                maxLength={3000}
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
              ></textarea>
              {touched.message && errors.message && (
                <div className="form-field-error">
                  <i className="fas fa-circle-exclamation"></i>
                  <span>{errors.message}</span>
                </div>
              )}
            </div>

            {status.message && (
              <div 
                style={{
                  padding: '12px 18px',
                  borderRadius: '12px',
                  marginBottom: '16px',
                  fontSize: '14px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: status.state === 'success' ? '#ecfdf5' : '#fef2f2',
                  color: status.state === 'success' ? '#059669' : '#dc2626',
                  border: `1px solid ${status.state === 'success' ? '#a7f3d0' : '#fecaca'}`
                }}
              >
                <i className={`fas ${status.state === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation'}`}></i>
                <span>{status.message}</span>
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
