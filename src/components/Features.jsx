import React, { useRef, useEffect } from 'react';

export default function Features() {
  const carouselRef = useRef(null);

  const featuresList = [
    { icon: 'fa-qrcode', title: 'QR Code Ordering', desc: 'Customers scan QR at their table, browse digital menu, and place orders instantly. No waiter needed!' },
    { icon: 'fa-book-open', title: 'Digital Menu Management', desc: 'Create beautiful digital menus with images, categories, pricing. Update in real-time — no reprinting!' },
    { icon: 'fa-chart-line', title: 'Real-Time Analytics', desc: 'Track revenue, popular items, peak hours, customer behavior — all on a beautiful dashboard.' },
    { icon: 'fa-fire-burner', title: 'Kitchen Display System', desc: 'Orders go directly to kitchen screens. Chefs see orders in real-time. No more lost order slips!' },
    { icon: 'fa-wand-magic-sparkles', title: 'Smart Upselling & Combos', desc: 'Mouth-watering dish photos with automated pairing prompts ("Add Cold Brew for ₹99") that boost average ticket size by +24% effortlessly.' },
    { icon: 'fa-chair', title: 'Table & Booking Management', desc: 'Manage table status, handle reservations, generate unique QR codes for each table.' },
    { icon: 'fa-users', title: 'Staff Management', desc: 'Add staff, assign roles (chef, waiter, manager), track performance — all from one dashboard.' },
    { icon: 'fa-credit-card', title: 'Payment Integration', desc: 'Accept UPI, cards, and digital wallets. Auto-generated bills. Zero payment hassles.' },
    { icon: 'fa-star', title: 'Reviews & Ratings', desc: 'Collect customer feedback, respond to reviews, improve service based on real data.' },
    { icon: 'fa-gift', title: 'Offers & Loyalty Program', desc: 'Create discount coupons, happy hour deals, reward loyal customers with points system.' },
    { icon: 'fa-bell', title: 'Push Notifications', desc: "Send promotional offers, order updates, and announcements directly to customers' phones." },
    { icon: 'fa-receipt', title: 'Reports & Billing', desc: 'Generate detailed reports, track transactions, export revenue data — everything automated.' }
  ];

  const screens = [
    { img: 'assets/images/user/explore.png', title: 'Dine-In Menu', sub: 'Categories & Featured Picks' },
    { img: 'assets/images/user/dish-detail.png', title: 'Item Customizer', sub: 'Portion, Add-ons & Chef Notes' },
    { img: 'assets/images/user/cart.png', title: 'Instant Cart', sub: 'Coupons & Split Billing' },
    { img: 'assets/images/user/track-order.png', title: 'Live Order Status', sub: 'Kitchen Sync in Real-Time' },
    { img: 'assets/images/admin/dashboard-overview.png', title: 'Admin Dashboard', sub: 'Live Sales & Performance' },
    { img: 'assets/images/admin/orders.png', title: 'Kitchen Orders (KDS)', sub: 'Instant Dispatch to Kitchen' },
    { img: 'assets/images/admin/menu-management.png?v=menu-manager-fit', title: '1-Click Menu Control', sub: 'Price, Stock & Dish Toggles', screen: 'admin-menu-manager' }
  ];

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let timer = null;
    let isInView = false;
    let isHovered = false;

    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };

    const start = () => {
      stop();
      if (!isInView || isHovered) return;
      timer = setInterval(scrollStep, 3500);
    };

    const scrollStep = () => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'instant' });
      } else {
        el.scrollBy({ left: 260, behavior: 'smooth' });
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      const entered = entry.isIntersecting && !isInView;
      isInView = entry.isIntersecting;
      stop();

      if (entered) {
        el.scrollTo({ left: 0, behavior: 'instant' });
        start();
      }
    }, { threshold: 0.2 });

    observer.observe(el);

    const onMouseEnter = () => {
      isHovered = true;
      stop();
    };
    const onMouseLeave = () => {
      isHovered = false;
      start();
    };

    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      stop();
      observer.disconnect();
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="section-header animate-on-scroll visible">
          <span className="section-tag"><i className="fas fa-wand-magic-sparkles"></i> Features</span>
          <h2 className="section-title">Everything You Need to <span className="gradient-text">Run Smarter</span></h2>
          <p className="section-subtitle">RestroMind provides a complete suite of tools for both restaurant owners and their customers</p>
        </div>
        <div className="features-grid">
          {featuresList.map((f, idx) => (
            <div className="feature-card animate-on-scroll visible" data-delay={idx * 50} key={idx}>
              <div className="feature-icon-wrap">
                <div className="feature-icon"><i className={`fas ${f.icon}`}></i></div>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Interactive App Experience Showcase Banner */}
        <div className="screens-marquee-wrapper animate-on-scroll visible">
          <div className="marquee-header">
            <span className="pill-badge">✨ Live App Preview</span>
            <h3 className="marquee-title">Explore Real RestroMind User & Admin Interfaces</h3>
            <p className="marquee-sub">Original design components straight from production Flutter apps</p>
          </div>
          <div className="screens-carousel" ref={carouselRef} role="region" aria-label="RestroMind app screen previews" tabIndex={0}>
            {screens.map((s, idx) => (
              <div className="screen-showcase-card" key={idx} data-screen={s.screen}>
                <div className="card-screen-wrap">
                  <img src={s.img} alt={s.title} />
                </div>
                <div className="card-caption">
                  <strong>{s.title}</strong>
                  <span>{s.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
