import React, { useEffect, useState } from 'react';

export default function Hero() {
  const [counts, setCounts] = useState({ turns: 0, orderVal: 0, comm: 0, rests: 0 });

  useEffect(() => {
    let frame = 0;
    const duration = 1500;
    const start = performance.now();

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounts({
        turns: Math.floor(ease * 35),
        orderVal: Math.floor(ease * 24),
        comm: 0,
        rests: Math.floor(ease * 500)
      });

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <section className="hero" id="home">
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="floating-emoji emoji-1">🍕</div>
          <div className="floating-emoji emoji-2">🍔</div>
          <div className="floating-emoji emoji-3">🥗</div>
          <div className="floating-emoji emoji-4">☕</div>
          <div className="floating-emoji emoji-5">🍜</div>
        </div>
        <div className="container hero-content">
          <div className="hero-text">
            <div className="hero-badge animate-slide-up">
              <span className="badge-dot"></span>
              🚀 Built for High-Volume Restaurants & Cafes
            </div>
            <h1 className="hero-title animate-slide-up delay-1">
              Multiply Restaurant Profits, <br />
              <span className="gradient-text">Zero Waiter Chaos</span>
            </h1>
            <p className="hero-description animate-slide-up delay-2">
              Turn tables <strong>35% faster</strong>, boost average order checks by <strong>24%</strong>, and eliminate <strong>30% aggregator commissions</strong>. 
              Interactive QR menus, live chef KDS, 5-second table-side UPI pay, and automated WhatsApp CRM — built to scale your revenue.
            </p>
            <div className="hero-buttons animate-slide-up delay-3">
              <a href="#contact" className="btn btn-primary btn-lg">
                <i className="fas fa-rocket"></i> Get Started Free
              </a>
              <a href="#benefits" className="btn btn-outline btn-lg">
                <i className="fas fa-chart-line"></i> View Real Benefits
              </a>
            </div>
            <div className="hero-stats animate-slide-up delay-4">
              <div className="stat-item">
                <span className="stat-prefix">+</span><span className="stat-number">{counts.turns}</span><span className="stat-suffix">%</span>
                <span className="stat-label">Faster Table Turns</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-prefix">+</span><span className="stat-number">{counts.orderVal}</span><span className="stat-suffix">%</span>
                <span className="stat-label">Higher Order Value</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">{counts.comm}</span><span className="stat-suffix">%</span>
                <span className="stat-label">Commission to Swiggy/Zomato</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">{counts.rests}</span><span className="stat-suffix">+</span>
                <span className="stat-label">Restaurants Live</span>
              </div>
            </div>
          </div>
          <div className="hero-visual animate-slide-right delay-2">
            <div className="dual-phone-mockup">
              {/* User App Phone */}
              <div className="phone-mockup phone-hero-user">
                <div className="phone-frame">
                  <div className="phone-dynamic-island"><span className="camera-lens"></span></div>
                  <div className="phone-screen phone-screen-img">
                    <img src="assets/images/user/explore.png" alt="RestroMind User App" className="screen-img-hero" />
                    <div className="screen-overlay-gradient"></div>
                  </div>
                  <div className="phone-home-indicator"></div>
                </div>
                <div className="hero-floating-badge badge-top-left animate-float-slow">
                  <div className="badge-icon">⚡</div>
                  <div className="badge-text">
                    <strong>Instant QR Order</strong>
                    <span>Zero Wait Time</span>
                  </div>
                </div>
                <div className="phone-glow"></div>
              </div>

              {/* Admin App Phone */}
              <div className="phone-mockup phone-hero-admin">
                <div className="phone-frame small">
                  <div className="phone-dynamic-island"><span className="camera-lens"></span></div>
                  <div className="phone-screen phone-screen-img">
                    <img src="assets/images/admin/dashboard-overview.png" alt="RestroMind Kitchen Orders" className="screen-img-hero" />
                    <div className="screen-overlay-gradient"></div>
                  </div>
                  <div className="phone-home-indicator"></div>
                </div>
                <div className="hero-floating-badge badge-bottom-right animate-float-fast">
                  <div className="badge-icon">👨‍🍳</div>
                  <div className="badge-text">
                    <strong>Kitchen KDS Sync</strong>
                    <span className="badge-green">Table #4 • 2 Items</span>
                  </div>
                </div>
                <div className="phone-glow"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,64 C480,120 960,0 1440,64 L1440,120 L0,120 Z" fill="#fff"></path>
          </svg>
        </div>
      </section>

      {/* Live Operations Pulse Ticker */}
      <div className="live-ticker-strip">
        <div className="ticker-badge-fixed">
          <span className="live-blink-dot"></span>
          <span className="ticker-badge-text">LIVE OPERATIONS PULSE</span>
        </div>
        <div className="ticker-carousel-mask">
          <div className="ticker-track">
            <div className="ticker-item"><span className="ticker-tag new">NEW ORDER</span> Table #4 placed QR Order • 1x Truffle Pizza, 2x Cold Brews (+₹780)</div>
            <div className="ticker-item"><span className="ticker-tag chef">CHEF KDS</span> Station 1: Chef Vikram cooking "Paneer Tikka" (3m left)</div>
            <div className="ticker-item"><span className="ticker-tag print">AUTO KOT</span> Token #42 sent instantly to Kitchen Thermal Station</div>
            <div className="ticker-item"><span className="ticker-tag upsell">SMART UPSELL</span> Table #3 added "Chocolate Lava Cake" via combo prompt (+₹190)</div>
            <div className="ticker-item"><span className="ticker-tag pay">INSTANT UPI</span> Table #7 paid ₹1,420 via PhonePe QR • Split 3 ways</div>
            <div className="ticker-item"><span className="ticker-tag crm">WHATSAPP CRM</span> Auto-sent digital bill & collected 5/5 ⭐ Google review</div>
            <div className="ticker-item"><span className="ticker-tag turn">TABLE FREED</span> Table #2 turnaround completed in 36m (35% faster)</div>
            {/* Loop for smooth marquee */}
            <div className="ticker-item"><span className="ticker-tag new">NEW ORDER</span> Table #9 ordered 2x Butter Chicken, 4x Garlic Naan (+₹940)</div>
            <div className="ticker-item"><span className="ticker-tag chef">CHEF KDS</span> Station 2: Chef Amit marked "Truffle Risotto" Ready to Serve</div>
            <div className="ticker-item"><span className="ticker-tag pay">INSTANT UPI</span> Table #5 settled ₹620 via Google Pay • Zero wait</div>
            <div className="ticker-item"><span className="ticker-tag direct">0% COMM</span> Direct QR table order saved ₹186 in aggregator fees</div>
          </div>
        </div>
      </div>
    </>
  );
}
