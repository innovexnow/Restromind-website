import React, { useState, useEffect, useRef } from 'react';

const userScreenMap = {
  'explore': 'assets/images/user/explore.png?v=original_v1',
  'restaurant': 'assets/images/user/restaurant-detail.png?v=restaurant_menu_v3',
  'dish': 'assets/images/user/dish-detail.png?v=original_v1',
  'cart': 'assets/images/user/cart.png?v=original_v1',
  'track': 'assets/images/user/track-order.png?v=original_v1',
  'success': 'assets/images/user/order-success.png?v=original_v1'
};

const tabs = [
  { key: 'explore', label: 'Explore', icon: 'fa-compass' },
  { key: 'restaurant', label: 'Menu', icon: 'fa-store' },
  { key: 'dish', label: 'Details', icon: 'fa-utensils' },
  { key: 'cart', label: 'Cart', icon: 'fa-shopping-bag' },
  { key: 'track', label: 'Tracking', icon: 'fa-map-marker-alt' },
  { key: 'success', label: 'Success', icon: 'fa-check-circle' }
];

export default function UserAppShowcase() {
  const [activeTab, setActiveTab] = useState('explore');
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef(null);

  // 1. Detect when section enters or leaves viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
      if (entry.isIntersecting) {
        // ALWAYS show Explore first when user comes to this section
        setActiveTab('explore');
      }
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 2. Auto-rotate tabs every 3.5s when in view and not hovered
  useEffect(() => {
    if (!isInView || isHovered) return;

    const interval = setInterval(() => {
      setActiveTab(prev => {
        const idx = tabs.findIndex(t => t.key === prev);
        const nextIdx = (idx + 1) % tabs.length;
        return tabs[nextIdx].key;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isInView, isHovered]);

  const handleTabClick = (key) => {
    setActiveTab(key);
  };

  return (
    <section className="app-showcase user-app-section" id="user-app" ref={sectionRef}>
      <div className="container">
        <div className="section-header animate-on-scroll visible">
          <span className="section-tag"><i className="fas fa-mobile-screen-button"></i> For Customers</span>
          <h2 className="section-title">RestroMind <span className="gradient-text">User App</span></h2>
          <p className="section-subtitle">A seamless dining experience for your customers — from scanning QR to tracking orders</p>
        </div>
        <div className="app-showcase-content">
          <div className="app-features-list animate-on-scroll visible">
            <div className="app-feature-item">
              <div className="app-feature-icon"><i className="fas fa-camera"></i></div>
              <div>
                <h4>Scan & Order</h4>
                <p>Scan the QR code at your table and instantly browse the restaurant's digital menu. Place orders without waiting for a waiter.</p>
              </div>
            </div>
            <div className="app-feature-item">
              <div className="app-feature-icon"><i className="fas fa-magnifying-glass"></i></div>
              <div>
                <h4>Search & Discover</h4>
                <p>Find nearby restaurants, search for your favorite dishes, explore new cuisines — all in one app.</p>
              </div>
            </div>
            <div className="app-feature-item">
              <div className="app-feature-icon"><i className="fas fa-location-dot"></i></div>
              <div>
                <h4>Real-Time Order Tracking</h4>
                <p>Know exactly when your food is being prepared, ready, and served. No more wondering "where's my order?"</p>
              </div>
            </div>
            <div className="app-feature-item">
              <div className="app-feature-icon"><i className="fas fa-chair"></i></div>
              <div>
                <h4>Book Tables</h4>
                <p>Reserve tables in advance. Pick your date, time, and preferred seating. Get instant confirmation.</p>
              </div>
            </div>
            <div className="app-feature-item">
              <div className="app-feature-icon"><i className="fas fa-credit-card"></i></div>
              <div>
                <h4>Easy Payments</h4>
                <p>Pay seamlessly via UPI, credit/debit cards, or digital wallets. Split bills with friends too!</p>
              </div>
            </div>
            <div className="app-feature-item">
              <div className="app-feature-icon"><i className="fas fa-gift"></i></div>
              <div>
                <h4>Rewards & Offers</h4>
                <p>Earn loyalty points on every order. Apply coupons, unlock deals, and get rewarded for being a regular!</p>
              </div>
            </div>
          </div>
          <div className="app-phone-showcase animate-on-scroll delay-2 visible">
            <div 
              className="showcase-phones-interactive"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="interactive-screen-tabs">
                {tabs.map(t => (
                  <button 
                    key={t.key}
                    className={`screen-tab ${activeTab === t.key ? 'active' : ''}`}
                    onClick={() => handleTabClick(t.key)}
                  >
                    <i className={`fas ${t.icon}`}></i> {t.label}
                  </button>
                ))}
              </div>
              <div className="showcase-phone-main">
                <div className="phone-frame modern">
                  <div className="phone-dynamic-island"><span className="camera-lens"></span></div>
                  <div className="phone-screen phone-screen-img">
                    <img 
                      key={activeTab}
                      src={userScreenMap[activeTab]} 
                      alt="RestroMind User App" 
                      className="screen-img-display fade-in" 
                      data-screen={activeTab}
                    />
                  </div>
                  <div className="phone-home-indicator"></div>
                </div>
                <div className="phone-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
