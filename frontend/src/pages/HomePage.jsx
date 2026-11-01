import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProgramsSection from '../components/ProgramsSection';
import InquiryForm from '../components/InquiryForm';
import { GraduationCap } from 'lucide-react';

export default function HomePage({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('Scholarship');

  const handleScrollToForm = () => {
    window.history.pushState(null, '', '#contact');
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectProgram = (category) => {
    setSelectedCategory(category);
    window.history.pushState(null, '', '#contact');
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 text-slate-800 font-sans">
      <Navbar onNavigate={onNavigate} activeView="public" />

      <main className="flex-1">
        <HeroSection onScrollToForm={handleScrollToForm} />
        <AboutSection onScrollToForm={handleScrollToForm} />
        <ProgramsSection onSelectProgram={handleSelectProgram} />
        <InquiryForm initialCategory={selectedCategory} onSubmitted={() => { }} />
      </main>

      {/* Footer — dark forest */}
      <footer className="bg-brand-900 py-6 text-sm text-brand-300">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-white">
            <GraduationCap className="w-4 h-4 text-accent-400" />
            <span className="font-semibold font-serif">CompassZ</span>
          </div>
          <p className="text-brand-400 text-xs">
            &copy; {new Date().getFullYear()} CompassZ. Admissions &amp; inquiry management demo.
          </p>
        </div>
      </footer>
    </div>
  );
}
