import React, { useState, useEffect } from 'react';
import { GraduationCap, ArrowRight, Menu, X } from 'lucide-react';
import { getAuthToken } from '../services/api';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'programs', label: 'Programs' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ onNavigate, activeView }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const isAuthenticated = !!getAuthToken();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (activeView !== 'public') return;
    const initialHash = window.location.hash.replace('#', '').toLowerCase();
    if (initialHash && ['home', 'about', 'programs', 'contact'].includes(initialHash)) {
      setActiveSection(initialHash);
      setTimeout(() => {
        document.getElementById(initialHash)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }

    const handleScroll = () => {
      const ids = ['home', 'about', 'programs', 'contact'];
      const pos = window.scrollY + 200;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && pos >= el.offsetTop) {
          setActiveSection(ids[i]);
          if (window.location.hash !== `#${ids[i]}`) {
            window.history.replaceState(null, '', `#${ids[i]}`);
          }
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeView]);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    window.history.pushState(null, '', `#${sectionId}`);
    if (activeView !== 'public') {
      onNavigate('public', sectionId);
      setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-cream-100/95 backdrop-blur-md shadow-sm' : 'bg-cream-100'
        } border-b border-cream-200`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 group focus:outline-none cursor-pointer"
            aria-label="CompassZ home"
          >
            <GraduationCap className="w-5 h-5 text-accent-500" />
            <span className="text-lg font-semibold tracking-tight text-brand-700 font-serif">
              CompassZ
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer rounded-md ${activeSection === item.id
                    ? 'text-brand-700'
                    : 'text-slate-500 hover:text-brand-700'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => onNavigate(isAuthenticated ? 'dashboard' : 'login')}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium text-brand-700 border border-brand-700/60 hover:bg-brand-700 hover:text-white transition-all cursor-pointer"
            >
              {isAuthenticated ? 'Dashboard' : 'Staff login'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-md text-slate-500 hover:bg-cream-200 focus:outline-none cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-cream-200 bg-cream-100 px-5 pt-3 pb-5 space-y-1 animate-fade-in">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeSection === item.id
                  ? 'text-brand-700 bg-brand-50'
                  : 'text-slate-600 hover:text-brand-700 hover:bg-cream-200'
                }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-cream-200">
            <button
              onClick={() => { setMobileMenuOpen(false); onNavigate(isAuthenticated ? 'dashboard' : 'login'); }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-brand-700 border border-brand-700/60 hover:bg-brand-700 hover:text-white transition-all cursor-pointer"
            >
              {isAuthenticated ? 'Dashboard' : 'Staff login'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
