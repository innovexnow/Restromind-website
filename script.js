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

const adminScreenImg = document.getElementById('adminAppScreenImg');
const adminTabs = document.querySelectorAll('.admin-tab');

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

