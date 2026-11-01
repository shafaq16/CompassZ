import React from 'react';
import { ArrowRight } from 'lucide-react';

const PHASES = [
  {
    label: 'Listen & Discover',
    body: 'We start by understanding who you are — your goals, your constraints, and what you hope to find. No assumptions, just honest conversation.',
    bar: { start: 0, span: 3 }, // grid columns 0-3
    color: 'bg-brand-900',
    textColor: 'text-white',
  },
  {
    label: 'Match & Guide',
    body: 'We translate your needs into direction — connecting you with the right institutions, programmes, and opportunities that actually fit.',
    bar: { start: 2, span: 4 }, // grid columns 2-6
    color: 'bg-brand-700',
    textColor: 'text-white',
  },
  {
    label: 'Apply & Track',
    body: 'From forms to follow-ups, we walk with you through every step. Your inquiry is logged, updated, and tracked in real time.',
    bar: { start: 4, span: 5 }, // grid columns 4-9
    color: 'bg-accent-500',
    textColor: 'text-white',
  },
  {
    label: 'Succeed & Grow',
    body: 'Admission is the beginning. We stay connected — helping you navigate what comes after and celebrating every milestone you reach.',
    bar: { start: 7, span: 4 }, // grid columns 7-11
    color: 'bg-brand-900',
    textColor: 'text-white',
  },
];

const COLS = 11; // number of vertical grid lines

export default function AboutSection({ onScrollToForm }) {
  return (
    <section id="about" className="bg-cream-100 py-16 sm:py-24 scroll-mt-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Editorial headline */}
        <div className="mb-10 sm:mb-14">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-accent-500 mb-4">
            Our approach
          </p>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-serif text-brand-900 leading-[1.05] tracking-tight">
            The Process
          </h2>
          <p className="mt-5 text-sm text-slate-500 leading-relaxed max-w-sm">
            Honest, step-by-step support for families, students, and schools — from first question to final outcome.
          </p>
        </div>

        {/* Staggered bar timeline */}
        <div className="relative mb-2">
          {/* Vertical grid lines */}
          <div
            className="absolute inset-0 flex pointer-events-none"
            aria-hidden="true"
          >
            {Array.from({ length: COLS + 1 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 border-l border-slate-200/70 last:border-r last:border-slate-200/70"
              />
            ))}
          </div>

          {/* Bars */}
          <div className="relative flex flex-col gap-2.5 py-6">
            {PHASES.map((phase, i) => {
              const leftPct  = (phase.bar.start / COLS) * 100;
              const widthPct = (phase.bar.span  / COLS) * 100;
              return (
                <div key={phase.label} className="relative h-12 sm:h-14">
                  <div
                    className={`absolute top-0 bottom-0 ${phase.color} ${phase.textColor} flex items-center px-4 sm:px-6 rounded-sm`}
                    style={{
                      left:  `${leftPct}%`,
                      width: `${widthPct}%`,
                    }}
                  >
                    <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
                      {phase.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Column numbers */}
          <div
            className="relative flex text-[10px] font-medium text-slate-300 select-none"
            aria-hidden="true"
          >
            {Array.from({ length: COLS }).map((_, i) => (
              <div key={i} className="flex-1 text-center pb-1">
                {String(i + 1).padStart(2, '0')}
              </div>
            ))}
          </div>
        </div>

        {/* Phase descriptions — 4-column editorial grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 pt-10 border-t border-slate-200">
          {PHASES.map((phase, i) => (
            <div key={phase.label} className="space-y-3">
              <h3 className="text-lg sm:text-xl font-bold text-brand-900 font-serif leading-tight">
                {phase.label}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">{phase.body}</p>
              {i === PHASES.length - 1 && (
                <button
                  onClick={onScrollToForm}
                  className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-accent-500 hover:text-accent-600 transition-colors cursor-pointer"
                >
                  Make an inquiry <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
