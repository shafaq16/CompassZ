import React from 'react';
import { ArrowRight } from 'lucide-react';

/* Floating inquiry-status card */
function StatusCard({ name, type, status, delay = '0ms' }) {
  const statusColors = {
    'New': 'text-slate-500',
    'In Progress': 'text-accent-500',
    'Resolved': 'text-brand-600',
  };
  return (
    <div
      className="bg-white rounded-2xl px-5 py-4 shadow-md border border-cream-200 min-w-[200px] animate-fade-up"
      style={{ animationDelay: delay }}
    >
      <div className="flex items-center justify-between mb-0.5">
        <span className="text-sm font-semibold text-slate-800">{name}</span>
        <span className={`text-xs font-medium ${statusColors[status] || 'text-slate-400'}`}>{status}</span>
      </div>
      <p className="text-xs text-slate-400">{type}</p>
    </div>
  );
}

export default function HeroSection({ onScrollToForm }) {
  return (
    <section id="home" className="relative overflow-hidden bg-cream-100 pt-14 pb-20 lg:pt-20 lg:pb-28 scroll-mt-20">

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — copy */}
          <div className="space-y-7 text-center lg:text-left">

            {/* Eyebrow */}
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-accent-500">
              Admissions &amp; Inquiry Desk
            </p>

            {/* Headline — Playfair Display */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.13] text-brand-900 font-serif">
              Every question deserves a{' '}
              <em className="not-italic text-accent-500">fast,</em>
              {' '}<em className="not-italic text-accent-500">human</em> answer.
            </h1>

            {/* Sub-copy */}
            <p className="text-slate-500 text-base leading-relaxed max-w-md mx-auto lg:mx-0">
              CompassZ gives families, students and schools one place to ask about
              admissions, scholarships and events, and gives your team one place to answer.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-1">
              <button
                onClick={onScrollToForm}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold shadow-md shadow-accent-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Make an inquiry
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => { window.history.pushState(null, '', '#programs'); document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent border border-slate-300 hover:border-brand-700 text-slate-700 hover:text-brand-700 text-sm font-semibold transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                Explore programmes
              </button>
            </div>
          </div>

          {/* RIGHT — floating cards visual */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-sm flex flex-col gap-4 py-4">
              <div className="flex justify-end animate-fade-up" style={{ animationDelay: '0ms' }}>
                <StatusCard name="Priya Das" type="Scholarship inquiry" status="In Progress" delay="0ms" />
              </div>
              <div className="flex justify-start animate-fade-up" style={{ animationDelay: '120ms' }}>
                <StatusCard name="Rahul Sharma" type="Admission inquiry" status="New" delay="120ms" />
              </div>
              <div className="flex justify-center animate-fade-up" style={{ animationDelay: '240ms' }}>
                <StatusCard name="Green Valley School" type="Concert inquiry" status="Resolved" delay="240ms" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom forest band */}
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-brand-900" />
    </section>
  );
}
