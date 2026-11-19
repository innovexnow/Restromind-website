import React, { useState, useEffect, useRef } from 'react';

const adminScreenMap = {
  'dashboard': 'assets/images/admin/dashboard-overview.png?v=sharp',
  'orders': 'assets/images/admin/orders.png?v=sharp',
  'print': 'assets/images/admin/order-print.png?v=sharp',
  'menu': 'assets/images/admin/menu-management-screen.png?v=menu_fill_v3',
  'analytics': 'assets/images/admin/analytics.png?v=new_theme_v2',
  'revenue': 'assets/images/admin/revenue.png?v=new_theme_v2'
};

const adminScreenContent = {
  'dashboard': {
    badge: 'Live Operations',
    badgeIcon: 'fa-bolt',
    title: 'Real-Time Restaurant Overview',
    desc: 'Instant visibility over daily revenue, order volumes, active dining tables, and staff performance in a single synchronized interface.',
    bullets: [
      'Live revenue tracking with automatic payment reconciliation',
      'Instant table occupancy status (Occupied, Available, Reserved)',
      'Peak rush hours heatmap and top-selling dish alerts',
      'Real-time cloud backup with offline fallback mode'
    ]
  },
  'orders': {
    badge: 'Live Kitchen Dispatch',
    badgeIcon: 'fa-clipboard-list',
    title: 'Real-Time Kitchen Orders (KDS)',
    desc: 'Eliminate paper tickets and kitchen confusion. Orders appear instantaneously on digital displays with live preparation status.',
    bullets: [
      'Instant dine-in, takeaway and delivery categorization',
      'Live countdown timers and visual alerts for every dish',
      'One-tap status updates (New, Preparing, Ready, Served)',
      'Multi-station routing for bar, starters & kitchen'
    ]
  },
  'print': {
    badge: 'Thermal KDS Print',
    badgeIcon: 'fa-print',
    title: 'Automated KOT & Bill Printing',
    desc: 'Seamless Bluetooth & Wi-Fi thermal printer integration. Generates custom kitchen order tokens and customer receipts automatically.',
    bullets: [
      'Zero-delay wireless printing upon order confirmation',
      'Custom bill layouts with restaurant branding & QR UPI payments',
      'Token sequence numbers for fast counter pickup',
      'Detailed item modifiers and chef cooking notes included'
    ]
  },
  'menu': {
    badge: 'Menu Control Studio',
    badgeIcon: 'fa-book-open',
    title: '1-Click Menu & Pricing Management',
    desc: 'Take full control over your catalog. Update item prices, toggle dish availability, and introduce seasonal specials instantly.',
    bullets: [
      'Mark out-of-stock items in real-time across all customer phones',
      'Dynamic category organization and custom dish modifiers',
      'Multi-pricing rules for dine-in, delivery, and happy hours',
      'Rich dish descriptions, allergen badges and calorie tags'
    ]
  },
  'analytics': {
    badge: 'Smart Intelligence',
    badgeIcon: 'fa-chart-line',
    title: 'Deep Analytics & Business Growth',
    desc: 'Make data-backed decisions that maximize profits. Identify your most profitable items, slow-moving stock, and customer retention metrics.',
    bullets: [
      'Daily, weekly and monthly sales trends with visual growth charts',
      'Top-performing dishes and profit margin analysis',
      'Peak dining hours and table turnover speed tracking',
      'Customer frequency and repeat dining statistics'
    ]
  },
  'revenue': {
    badge: 'Financial Health',
    badgeIcon: 'fa-coins',
    title: 'Revenue Reconciliation & Reports',
    desc: 'Complete financial clarity with automated revenue categorization, cash vs digital payment audits, and 1-click accounting exports.',
    bullets: [
      'Cash, UPI, Credit Card and Split-payment breakdown',
      'GST & tax liability reports ready for accountant filing',
      'Daily closing register and cashier shift audits',
      '1-click CSV & PDF export for seamless bookkeeping'
    ]
  }
};

const tabs = [
  { key: 'dashboard', label: 'Live Overview', icon: 'fa-tachometer-alt' },
  { key: 'orders', label: 'Live Orders', icon: 'fa-clipboard-list' },
  { key: 'print', label: 'Order Print KDS', icon: 'fa-print' },
  { key: 'menu', label: 'Menu Control', icon: 'fa-book-open' },
  { key: 'analytics', label: 'Analytics & Stats', icon: 'fa-chart-line' },
  { key: 'revenue', label: 'Revenue', icon: 'fa-receipt' }
];

export default function AdminAppShowcase() {
  const [activeTab, setActiveTab] = useState('dashboard');
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
        // ALWAYS show Live Overview (dashboard) first when user comes to this section
        setActiveTab('dashboard');
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

  const currentContent = adminScreenContent[activeTab] || adminScreenContent['dashboard'];

  return (
    <section className="app-showcase admin-app-section" id="admin-app" ref={sectionRef}>
      <div className="container">
        <div className="section-header animate-on-scroll visible">
          <span className="section-tag"><i className="fas fa-store"></i> For Restaurant Owners</span>
          <h2 className="section-title">RestroMind <span className="gradient-text">Admin App</span></h2>
          <p className="section-subtitle">Your entire restaurant operations — managed from a single powerful dashboard</p>
        </div>
        <div className="admin-showcase-content">
          <div 
            className="admin-dashboard-interactive animate-on-scroll visible"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="admin-screen-tabs">
              {tabs.map(t => (
                <button 
                  key={t.key}
                  className={`admin-tab ${activeTab === t.key ? 'active' : ''}`}
                  onClick={() => handleTabClick(t.key)}
                >
                  <i className={`fas ${t.icon}`}></i> {t.label}
                </button>
              ))}
            </div>
            <div className="admin-studio-showcase">
              {/* Left: Device Mockup */}
              <div className="admin-device-wrapper">
                <div className="admin-phone-frame">
                  <div className="admin-phone-dynamic-island"><span className="camera-lens"></span></div>
                  <div className="admin-phone-screen">
                    <img 
                      key={activeTab}
                      src={adminScreenMap[activeTab]} 
                      alt="RestroMind Admin Dashboard" 
                      className="admin-img-display fade-in" 
                      data-screen={activeTab}
                    />
                  </div>
                  <div className="admin-phone-home-indicator"></div>
                  <div className="admin-phone-glow"></div>
                </div>
              </div>

              {/* Right: Dynamic Screen Details */}
              <div className="admin-screen-details">
                <div className="admin-detail-badge">
                  <i className={`fas ${currentContent.badgeIcon}`} aria-hidden="true"></i> {currentContent.badge}
                </div>
                <h3 className="admin-detail-title">{currentContent.title}</h3>
                <p className="admin-detail-desc">{currentContent.desc}</p>
                <div className="admin-detail-bullets">
                  {currentContent.bullets.map((b, idx) => (
                    <div className="admin-bullet" key={idx}>
                      <i className="fas fa-check-circle"></i> <span>{b}</span>
                    </div>
                  ))}
                </div>
                <div className="admin-detail-action">
                  <a href="#contact" className="btn btn-primary btn-md">
                    <i className="fas fa-calendar-check"></i> Request Admin Demo
                  </a>
                  <span className="admin-meta-note"><i className="fas fa-bolt"></i> Android & iOS Compatible</span>
                </div>
              </div>
            </div>
          </div>

          <div className="admin-features-grid animate-on-scroll visible">
            <div className="admin-feature-card">
              <div className="admin-feature-icon"><i className="fas fa-clipboard-list"></i></div>
              <h4>Live Order Management</h4>
              <p>Accept, reject, track orders in real-time. See order details, table numbers, special instructions.</p>
            </div>
            <div className="admin-feature-card">
              <div className="admin-feature-icon"><i className="fas fa-book-open"></i></div>
              <h4>Menu Control</h4>
              <p>Add/edit menu items, set prices, upload images, toggle availability — all instantly.</p>
            </div>
            <div className="admin-feature-card">
              <div className="admin-feature-icon"><i className="fas fa-fire-burner"></i></div>
              <h4>Kitchen Display (KDS)</h4>
              <p>Real-time kitchen screen shows orders as they come in. Chefs mark items as preparing/ready.</p>
            </div>
            <div className="admin-feature-card">
              <div className="admin-feature-icon"><i className="fas fa-chart-column"></i></div>
              <h4>Deep Analytics</h4>
              <p>Revenue trends, peak hours, customer insights, item performance — data-driven decisions.</p>
            </div>
            <div className="admin-feature-card">
              <div className="admin-feature-icon"><i className="fas fa-comments"></i></div>
              <h4>WhatsApp CRM & Invoices</h4>
              <p>Automated digital receipts sent straight to customer WhatsApp with 5-star Google review triggers and repeat loyalty rewards.</p>
            </div>
            <div className="admin-feature-card">
              <div className="admin-feature-icon"><i className="fas fa-bullseye"></i></div>
              <h4>Marketing & Loyalty</h4>
              <p>Create discount campaigns, broadcast festive combos, manage loyalty tiers — turn one-time diners into regulars.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
