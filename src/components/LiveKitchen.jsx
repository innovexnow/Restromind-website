import React, { useState, useEffect } from 'react';

export default function LiveKitchen() {
  const [orderCount, setOrderCount] = useState(142);
  const [btnState, setBtnState] = useState('normal');
  const [selectedTable, setSelectedTable] = useState(1);

  const dishes = [
    { title: 'Butter Chicken & Garlic Naan', emoji: '🍛', table: 'Table #4', time: '03:45', chef: 'Chef Rajesh' },
    { title: 'Woodfired Truffle Mushroom Pizza', emoji: '🍕', table: 'Table #2', time: '02:15', chef: 'Chef Amit' },
    { title: 'Paneer Tikka & Mint Chutney', emoji: '🍢', table: 'Table #7', time: '04:10', chef: 'Chef Vikram' },
    { title: 'Smoked BBQ Wagyu Taco Platter', emoji: '🌮', table: 'Table #1', time: '01:50', chef: 'Chef Rajesh' },
    { title: 'Molten Chocolate Lava Cake', emoji: '🍰', table: 'Table #5', time: '02:40', chef: 'Chef Sneha' }
  ];

  const [currentDishIndex, setCurrentDishIndex] = useState(0);

  const [tickets, setTickets] = useState([
    { id: '#204', table: 'Table 4', status: 'In Pan (3m)', items: '1x Butter Chicken, 2x Garlic Naan', prep: true },
    { id: '#205', table: 'Table 2', status: 'In Queue', items: '1x Truffle Mushroom Pizza, 1x Coke', prep: false },
    { id: '#206', table: 'Table 7', status: 'In Queue', items: '1x Paneer Tikka Platter, 2x Mojitos', prep: false }
  ]);

  const tablesData = {
    1: { title: 'Table #1 (Window Seating)', status: 'Dining • 2 Guests', order: '2x Margherita Pizza, 1x Iced Tea', bill: '₹680', waiter: 'Rohit M.', time: 'Seated 34 mins ago' },
    2: { title: 'Table #2 (Center Booth)', status: 'In Kitchen • 4 Guests', order: '1x Truffle Mushroom Pizza, 1x Coke, 2x Garlic Bread', bill: '₹1,240', waiter: 'Kunal S.', time: 'Seated 18 mins ago' },
    3: { title: 'Table #3 (Garden View)', status: 'Available • Cleaned', order: 'No active order (Ready for guests)', bill: '₹0', waiter: 'Assigned: Rohit M.', time: 'Freed 6 mins ago' },
    4: { title: 'Table #4 (Family Corner)', status: 'Chef Cooking • 3 Guests', order: '1x Butter Chicken, 2x Garlic Naan, 1x Dal Makhani', bill: '₹1,480', waiter: 'Sneha P.', time: 'Seated 25 mins ago' },
    5: { title: 'Table #5 (High Top 2)', status: 'Paying Bill • 2 Guests', order: '1x BBQ Taco Platter, 2x Craft Brews', bill: '₹950', waiter: 'Kunal S.', time: 'Bill Sent to PhonePe QR' },
    6: { title: 'Table #6 (Private Alcove)', status: 'Available • Cleaned', order: 'No active order (Ready for guests)', bill: '₹0', waiter: 'Assigned: Sneha P.', time: 'Freed 12 mins ago' },
    7: { title: 'Table #7 (Patio Deck)', status: 'Eating • 4 Guests', order: '1x Paneer Tikka Platter, 2x Virgin Mojitos', bill: '₹890', waiter: 'Rohit M.', time: 'Seated 42 mins ago' },
    8: { title: 'Table #8 (VIP Lounge)', status: 'Reserved • 6 Guests', order: 'Pre-booked for 8:00 PM Birthday Dinner', bill: 'Deposit: ₹2,000', waiter: 'Head Captain: Vikram', time: 'Arriving in 15 mins' }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDishIndex(prev => (prev + 1) % dishes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const cur = dishes[currentDishIndex];
  const tableInfo = tablesData[selectedTable] || tablesData[1];

  const handleSimulate = () => {
    setOrderCount(prev => prev + 1);
    const newId = `#${orderCount + 65}`;
    const randomDish = dishes[Math.floor(Math.random() * dishes.length)];
    const newTicket = {
      id: newId,
      table: randomDish.table,
      status: 'Just In!',
      items: `1x ${randomDish.title}`,
      prep: false
    };

    setTickets(prev => [newTicket, ...prev.slice(0, 3)]);
    setBtnState('fired');
    setTimeout(() => setBtnState('normal'), 1400);
  };

  return (
    <section className="live-kitchen-section" id="live-kitchen">
      <div className="container">
        <div className="section-header animate-on-scroll visible">
          <span className="section-tag"><i className="fas fa-fire-burner"></i> Live Kitchen & Operations</span>
          <h2 className="section-title">See RestroMind in <span className="gradient-text">Live Action</span></h2>
          <p className="section-subtitle">Watch how orders travel from customer QR scans directly into chef frying pans and real-time manager dashboards</p>
        </div>

        <div className="kitchen-sim-container animate-on-scroll visible">
          {/* Top Console Header */}
          <div className="sim-header-bar">
            <div className="sim-brand-title">
              <span className="sim-status-dot"></span>
              <strong>Kitchen KDS & Operations Simulator</strong>
              <span className="sim-pill">Auto-Sync Enabled</span>
            </div>
            <div className="sim-action-controls">
              <span className="sim-orders-counter"><i className="fas fa-receipt"></i> Orders Today: <strong>{orderCount}</strong></span>
              <button 
                className="btn btn-sm btn-primary" 
                onClick={handleSimulate}
                style={btnState === 'fired' ? { background: '#10B981', borderColor: '#10B981' } : {}}
              >
                {btnState === 'fired' ? (
                  <><i className="fas fa-check"></i> Order Fired to Pan!</>
                ) : (
                  <><i className="fas fa-plus-circle"></i> Simulate New Order!</>
                )}
              </button>
            </div>
          </div>

          {/* Main Simulator Grid */}
          <div className="sim-main-grid">
            {/* Column 1: Live Animated Chef & Kitchen Station */}
            <div className="sim-station-card chef-station">
              <div className="station-header">
                <div className="station-info">
                  <span className="station-icon">👨‍🍳</span>
                  <div>
                    <h4>Station #1: Master Chef Station</h4>
                    <span className="station-sub">Live Kitchen Display System (KDS)</span>
                  </div>
                </div>
                <span className="station-badge cooking">🔥 Cooking Active</span>
              </div>

              {/* Animated Cooking Stage */}
              <div className="chef-cooking-stage">
                <div className="animated-chef-avatar">
                  <div className="chef-avatar-wrapper">
                    <div className="chef-hat">👨‍🍳</div>
                    <div className="cooking-pan-rig">
                      <div className="pan-handle"></div>
                      <div className="pan-base">
                        <div className="food-sizzle-dish">{cur.emoji}</div>
                        <div className="steam-vapors">
                          <span className="steam s1">♨️</span>
                          <span className="steam s2">♨️</span>
                          <span className="steam s3">♨️</span>
                        </div>
                      </div>
                      <div className="flame-rig">
                        <span className="flame f1">🔥</span>
                        <span className="flame f2">🔥</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="current-dish-banner">
                  <span className="dish-status-label">CURRENTLY PREPARING</span>
                  <h3 className="dish-title">{cur.title}</h3>
                  <div className="dish-meta-row">
                    <span><i className="fas fa-chair"></i> <strong>{cur.table}</strong></span>
                    <span><i className="fas fa-stopwatch"></i> <strong>{cur.time}</strong> left</span>
                    <span className="chef-name"><i className="fas fa-user-check"></i> {cur.chef}</span>
                  </div>
                </div>
              </div>

              {/* Live Order Tickets Queue */}
              <div className="kds-tickets-queue">
                <h5><i className="fas fa-list-ul"></i> Incoming Kitchen Queue (<span>{tickets.length}</span> orders)</h5>
                <div className="tickets-list">
                  {tickets.map((t, idx) => (
                    <div className={`ticket-card ${t.prep ? 'preparing' : 'queued'}`} key={idx}>
                      <div className="ticket-top">
                        <strong>{t.id} • {t.table}</strong>
                        <span className={`ticket-status-pill ${t.prep ? 'in-prep' : 'in-queue'}`}>{t.status}</span>
                      </div>
                      <div className="ticket-items">{t.items}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Live Dining Floor & Table Management */}
            <div className="sim-station-card floor-station">
              <div className="station-header">
                <div className="station-info">
                  <span className="station-icon">🏢</span>
                  <div>
                    <h4>Floor & Table Management</h4>
                    <span className="station-sub">Click any table to inspect live status</span>
                  </div>
                </div>
                <span className="station-badge floor-live">🟢 6/8 Occupied</span>
              </div>

              {/* Table Grid */}
              <div className="tables-matrix-grid">
                {[
                  { num: 1, label: 'T-1', icon: '👥 2', badge: 'Dining', type: 'occupied' },
                  { num: 2, label: 'T-2', icon: '👥 4', badge: 'In Kitchen', type: 'occupied' },
                  { num: 3, label: 'T-3', icon: '🪑 Free', badge: 'Available', type: 'available' },
                  { num: 4, label: 'T-4', icon: '👥 3', badge: 'Chef Cooking', type: 'occupied' },
                  { num: 5, label: 'T-5', icon: '💳 Bill', badge: 'Paying', type: 'billing' },
                  { num: 6, label: 'T-6', icon: '🪑 Free', badge: 'Available', type: 'available' },
                  { num: 7, label: 'T-7', icon: '👥 4', badge: 'Eating', type: 'occupied' },
                  { num: 8, label: 'T-8', icon: '⭐ 8PM', badge: 'Reserved', type: 'reserved' }
                ].map((tb) => (
                  <div 
                    className={`table-box ${tb.type} ${selectedTable === tb.num ? 'active' : ''}`}
                    onClick={() => setSelectedTable(tb.num)}
                    key={tb.num}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="table-num">{tb.label}</div>
                    <div className="table-icon">{tb.icon}</div>
                    <span className={`t-badge ${tb.type === 'available' ? 'free' : (tb.type === 'billing' ? 'bill' : (tb.type === 'reserved' ? 'rsv' : 'cooking'))}`}>
                      {tb.badge}
                    </span>
                  </div>
                ))}
              </div>

              {/* Selected Table Inspector */}
              <div className="table-inspector-card">
                <div className="inspector-top">
                  <div>
                    <span className="ins-label">ACTIVE TABLE DETAILS</span>
                    <h4>{tableInfo.title}</h4>
                  </div>
                  <span className="ins-status-tag">{tableInfo.status}</span>
                </div>
                <div className="inspector-order-row">
                  <div className="ins-col">
                    <small>CURRENT ORDER</small>
                    <strong>{tableInfo.order}</strong>
                  </div>
                  <div className="ins-col right">
                    <small>BILL AMOUNT</small>
                    <strong className="ins-price">{tableInfo.bill}</strong>
                  </div>
                </div>
                <div className="inspector-footer">
                  <span><i className="fas fa-user-tie"></i> Waiter: {tableInfo.waiter}</span>
                  <span><i className="fas fa-clock"></i> {tableInfo.time}</span>
                  <span className="status-verified"><i className="fas fa-check-double"></i> UPI QR Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
