/* ========================================
   RestroMind Website - JavaScript
   ======================================== */

// ---- Preloader ----
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2000);
});

// ---- Navbar Scroll Effect ----
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ---- Mobile Navigation Toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ---- Active Nav Link on Scroll ----
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ---- Scroll Animations (Intersection Observer) ----
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, parseInt(delay));
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// ---- Counter Animation ----
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };
                
                updateCounter();
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    counterObserver.observe(heroStats);
}

// ---- Contact Form Handler ----
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        restaurant: document.getElementById('restaurant').value,
        city: document.getElementById('city').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };
    
    // Send email using EmailJS or similar service
    // For now, we'll use a mailto fallback and show success
    try {
        // Option 1: Send via EmailJS (uncomment and configure)
        // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData);
        
        // Option 2: Send via mailto (fallback)
        const mailtoLink = `mailto:restromind@gmail.com?subject=Restaurant Inquiry from ${formData.name}&body=Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0ARestaurant: ${formData.restaurant}%0ACity: ${formData.city}%0A%0AMessage:%0A${formData.message}`;
        
        // Open mailto link in background
        const tempLink = document.createElement('a');
        tempLink.href = mailtoLink;
        tempLink.target = '_blank';
        tempLink.click();
        
        // Show success modal
        setTimeout(() => {
            successModal.classList.add('active');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1000);
        
    } catch (error) {
        console.error('Error sending message:', error);
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        alert('Something went wrong. Please try again or email us directly at restromind@gmail.com');
    }
});

function closeModal() {
    successModal.classList.remove('active');
}

// Close modal on overlay click
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        closeModal();
    }
});

// ---- Smooth Scroll for Anchor Links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ---- Parallax Effect for Hero Shapes ----
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    const emojis = document.querySelectorAll('.floating-emoji');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.02;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    emojis.forEach((emoji, index) => {
        const speed = (index + 1) * 0.03;
        emoji.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ---- Dashboard Chart Bar Animation ----
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.chart-bar');
            bars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.transition = 'height 1s ease-out';
                }, index * 100);
            });
            
            const fills = entry.target.querySelectorAll('.pop-fill');
            fills.forEach((fill, index) => {
                const targetWidth = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.width = targetWidth;
                }, index * 200 + 500);
            });
            
            chartObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const dashboardMock = document.querySelector('.admin-dashboard-mock');
if (dashboardMock) {
    chartObserver.observe(dashboardMock);
}

// ---- Typing Effect for Hero (subtle) ----
const greetingEl = document.querySelector('.app-greeting');
if (greetingEl) {
    const greetings = ['Good Evening! 👋', 'Welcome Back! 🎉', 'Hungry? 😋', 'Let\'s Eat! 🍽️'];
    let greetingIndex = 0;
    
    setInterval(() => {
        greetingIndex = (greetingIndex + 1) % greetings.length;
        greetingEl.style.opacity = '0';
        setTimeout(() => {
            greetingEl.textContent = greetings[greetingIndex];
            greetingEl.style.opacity = '1';
        }, 300);
    }, 3000);
}

// ---- Keyboard Accessibility ----
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
        
        // Close modal
        closeModal();
    }
});

// ---- Console Easter Egg ----
console.log(
    '%c🍽️ RestroMind %c— Making Restaurants Smarter!',
    'font-size: 24px; font-weight: bold; color: #FF6B35;',
    'font-size: 16px; color: #666;'
);
console.log(
    '%cInterested in RestroMind? Contact us at restromind@gmail.com',
    'font-size: 14px; color: #004E89;'
);

// ========================================================
// Interactive Figma Screen Switchers
// ========================================================
const userScreenMap = {
    'explore': 'assets/images/user/explore.png',
    'restaurant': 'assets/images/user/restaurant-detail.png',
    'dish': 'assets/images/user/dish-detail.png',
    'cart': 'assets/images/user/cart.png',
    'track': 'assets/images/user/track-order.png',
    'success': 'assets/images/user/order-success.png'
};

const userScreenImg = document.getElementById('userAppScreenImg');
const screenTabs = document.querySelectorAll('.screen-tab');

screenTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        screenTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const screenKey = tab.getAttribute('data-screen');
        if (userScreenImg && userScreenMap[screenKey]) {
            userScreenImg.classList.remove('fade-in');
            void userScreenImg.offsetWidth; // trigger reflow
            userScreenImg.src = userScreenMap[screenKey];
            userScreenImg.classList.add('fade-in');
        }
    });
});

const adminScreenMap = {
    'dashboard': 'assets/images/admin/dashboard-overview.png',
    'orders': 'assets/images/admin/orders.png',
    'print': 'assets/images/admin/order-print.png',
    'menu': 'assets/images/admin/menu-management.png',
    'analytics': 'assets/images/admin/analytics.png',
    'revenue': 'assets/images/admin/revenue.png'
};

const adminScreenContent = {
    'dashboard': {
        badge: '⚡ Live Operations',
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
        badge: '📋 Live Kitchen Dispatch',
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
        badge: '🖨️ Thermal KDS Print',
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
        badge: '🍲 Menu Control Studio',
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
        badge: '📈 Smart Intelligence',
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
        badge: '💳 Financial Health',
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

const adminScreenImg = document.getElementById('adminAppScreenImg');
const adminTabs = document.querySelectorAll('.admin-tab');
const adminDetailBadge = document.getElementById('adminDetailBadge');
const adminDetailTitle = document.getElementById('adminDetailTitle');
const adminDetailDesc = document.getElementById('adminDetailDesc');
const adminDetailBullets = document.getElementById('adminDetailBullets');

adminTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        adminTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const screenKey = tab.getAttribute('data-admin-screen');
        if (adminScreenImg && adminScreenMap[screenKey]) {
            adminScreenImg.classList.remove('fade-in');
            void adminScreenImg.offsetWidth;
            adminScreenImg.src = adminScreenMap[screenKey];
            adminScreenImg.classList.add('fade-in');
        }

        const content = adminScreenContent[screenKey];
        if (content) {
            if (adminDetailBadge) adminDetailBadge.textContent = content.badge;
            if (adminDetailTitle) adminDetailTitle.textContent = content.title;
            if (adminDetailDesc) adminDetailDesc.textContent = content.desc;
            if (adminDetailBullets) {
                adminDetailBullets.innerHTML = content.bullets
                    .map(b => `<div class="admin-bullet"><i class="fas fa-check-circle"></i> <span>${b}</span></div>`)
                    .join('');
            }
        }
    });
});

// Interactive 3D Tilt on Feature Cards and Device Frames
document.querySelectorAll('.feature-card, .problem-card, .step-card, .screen-showcase-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});


// ========================================================
// Live Kitchen, Chef & Operations Simulation
// ========================================================
let chefSecondsLeft = 225; // 3m 45s
const dishTimerEl = document.getElementById('dishTimer');

setInterval(() => {
    if (dishTimerEl) {
        chefSecondsLeft--;
        if (chefSecondsLeft < 10) chefSecondsLeft = 240;
        const mins = Math.floor(chefSecondsLeft / 60);
        const secs = chefSecondsLeft % 60;
        dishTimerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
}, 1000);

// Table Matrix Data
const tableData = {
    1: { title: 'Table #1 (Window Booth)', status: 'Dining • 2 Guests', order: '2x Margherita Pizza, 1x Iced Tea', bill: '₹680', waiter: 'Rohit M.', time: 'Seated 34 mins ago' },
    2: { title: 'Table #2 (Center Lounge)', status: 'In Kitchen • 4 Guests', order: '1x Truffle Mushroom Pizza, 1x Coke', bill: '₹890', waiter: 'Sneha P.', time: 'Ordered 6 mins ago' },
    3: { title: 'Table #3 (Garden Patio)', status: '🟢 Available', order: 'Cleaned & Sanitized • Ready for seating', bill: '₹0', waiter: 'Unassigned', time: 'Vacated 4 mins ago' },
    4: { title: 'Table #4 (Private Booth)', status: '🔥 Chef Cooking • 3 Guests', order: '1x Butter Chicken, 2x Garlic Naan', bill: '₹940', waiter: 'Rohit M.', time: 'Cooking in station #1' },
    5: { title: 'Table #5 (Family Dining)', status: '💳 Bill Requested • 5 Guests', order: 'Full Course Dinner (5 items)', bill: '₹2,480', waiter: 'Aman K.', time: 'Settling via QR Code' },
    6: { title: 'Table #6 (Bar Corner)', status: '🟢 Available', order: 'Ready for walk-in or reservation', bill: '₹0', waiter: 'Unassigned', time: 'Ready' },
    7: { title: 'Table #7 (High Top)', status: 'Dining • 4 Guests', order: '1x Paneer Tikka Platter, 2x Mojitos', bill: '₹1,150', waiter: 'Sneha P.', time: 'Seated 18 mins ago' },
    8: { title: 'Table #8 (VIP Lounge)', status: '⭐ Reserved (8:00 PM)', order: 'Reserved for Rahul Sharma (Party of 6)', bill: '₹0', waiter: 'Aman K.', time: 'Arriving in 35 mins' }
};

const tableBoxes = document.querySelectorAll('.table-box');
const insTitle = document.getElementById('insTableTitle');
const insStatus = document.getElementById('insTableStatus');
const insOrder = document.getElementById('insTableOrder');
const insBill = document.getElementById('insTableBill');

tableBoxes.forEach(box => {
    box.addEventListener('click', () => {
        tableBoxes.forEach(b => b.classList.remove('active'));
        box.classList.add('active');
        
        const num = box.getAttribute('data-table');
        const data = tableData[num];
        if (data) {
            if (insTitle) insTitle.textContent = data.title;
            if (insStatus) insStatus.textContent = data.status;
            if (insOrder) insOrder.textContent = data.order;
            if (insBill) insBill.textContent = data.bill;
        }
    });
});

// Simulate New Order Button
const btnSimulate = document.getElementById('btnSimulateOrder');
const simOrderCountEl = document.getElementById('simOrderCount');
const ticketsListEl = document.getElementById('ticketsList');
const activeFoodDishEl = document.getElementById('activeFoodDish');
const currentDishTitleEl = document.getElementById('currentDishTitle');
const dishTableEl = document.getElementById('dishTable');
const queueLengthEl = document.getElementById('queueLength');

const sampleDishes = [
    { dish: 'Woodfire Truffle Pizza', emoji: '🍕', price: '₹580', table: 'Table #3' },
    { dish: 'Paneer Butter Masala & Kulcha', emoji: '🥘', price: '₹420', table: 'Table #6' },
    { dish: 'Crispy Veg Dimsum Platter', emoji: '🥟', price: '₹340', table: 'Table #1' },
    { dish: 'Smoked BBQ Chicken Wings', emoji: '🍗', price: '₹490', table: 'Table #5' },
    { dish: 'Classic Margherita with Mozzarella', emoji: '🍕', price: '₹399', table: 'Table #2' }
];

let orderId = 207;

if (btnSimulate) {
    btnSimulate.addEventListener('click', () => {
        const randomItem = sampleDishes[Math.floor(Math.random() * sampleDishes.length)];
        
        // 1. Increment orders today
        if (simOrderCountEl) {
            let count = parseInt(simOrderCountEl.textContent, 10) || 142;
            simOrderCountEl.textContent = count + 1;
        }

        // 2. Animate chef station
        if (activeFoodDishEl) {
            activeFoodDishEl.textContent = randomItem.emoji;
            activeFoodDishEl.style.transform = 'scale(1.4)';
            setTimeout(() => activeFoodDishEl.style.transform = '', 400);
        }
        if (currentDishTitleEl) currentDishTitleEl.textContent = randomItem.dish;
        if (dishTableEl) dishTableEl.textContent = randomItem.table;

        chefSecondsLeft = 180; // reset timer to 3 mins

        // 3. Add to KDS tickets list
        if (ticketsListEl) {
            const ticket = document.createElement('div');
            ticket.className = 'ticket-card flash queued';
            ticket.innerHTML = `
                <div class="ticket-top">
                    <strong>#${orderId} • ${randomItem.table}</strong>
                    <span class="ticket-status-pill in-prep">Just In!</span>
                </div>
                <div class="ticket-items">1x ${randomItem.dish} (${randomItem.price})</div>
            `;
            ticketsListEl.prepend(ticket);
            orderId++;

            // limit visible queue to 4 items
            if (ticketsListEl.children.length > 4) {
                ticketsListEl.lastElementChild.remove();
            }
            if (queueLengthEl) queueLengthEl.textContent = ticketsListEl.children.length;
        }

        // 4. Temporary button feedback
        btnSimulate.innerHTML = '<i class="fas fa-check"></i> Order Fired to Pan!';
        btnSimulate.style.background = '#10B981';
        setTimeout(() => {
            btnSimulate.innerHTML = '<i class="fas fa-plus-circle"></i> Simulate New Order!';
            btnSimulate.style.background = '';
        }, 1500);
    });
}
