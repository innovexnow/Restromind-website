import React, { useEffect } from 'react';
import Preloader from './components/Preloader.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Problems from './components/Problems.jsx';
import Benefits from './components/Benefits.jsx';
import Features from './components/Features.jsx';
import LiveKitchen from './components/LiveKitchen.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import UserAppShowcase from './components/UserAppShowcase.jsx';
import AdminAppShowcase from './components/AdminAppShowcase.jsx';
import Comparison from './components/Comparison.jsx';
import Testimonials from './components/Testimonials.jsx';
import ContactSection from './components/ContactSection.jsx';
import CTA from './components/CTA.jsx';
import FAQ from './components/FAQ.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  useEffect(() => {
    // Scroll animation observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // Interactive 3D tilt on cards
    const cards = document.querySelectorAll('.feature-card, .problem-card, .step-card, .screen-showcase-card');
    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    };

    const handleMouseLeave = (e) => {
      e.currentTarget.style.transform = '';
    };

    cards.forEach(card => {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      observer.disconnect();
      cards.forEach(card => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <Problems />
        <Benefits />
        <Features />
        <LiveKitchen />
        <HowItWorks />
        <UserAppShowcase />
        <AdminAppShowcase />
        <Comparison />
        <Testimonials />
        <ContactSection />
        <CTA />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
