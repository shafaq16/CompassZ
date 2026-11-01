import React from 'react';
import {
  Award,
  GraduationCap,
  Music,
  HelpCircle,
  Plane,
  Code2,
  Trophy,
  Brain,
  ArrowRight,
} from 'lucide-react';

const PROGRAMS = [
  {
    category: 'Scholarship',
    title: 'Scholarship Programs',
    badge: 'Financial Aid & Merit',
    icon: Award,
    description:
      'Merit-based scholarships, STEM aptitude rewards, and sports excellence grants for aspiring students.',
    highlights: ['Class 6–12 entrance scholarships', 'Up to 100% tuition assistance', 'Fast-track evaluation'],
    color: 'blue',
  },
  {
    category: 'Admission',
    title: 'Admission Guidance',
    badge: 'K-12 & Higher Secondary',
    icon: GraduationCap,
    description:
      'End-to-end admission counselling for top-tier schools, Grade 11 stream selection, and application kits.',
    highlights: ['Seat availability tracking', 'Stream counselling sessions', 'Documentation assistance'],
    color: 'brand',
  },
  {
    category: 'Study Abroad',
    title: 'Study Abroad',
    badge: 'International Programmes',
    icon: Plane,
    description:
      'Guidance on international exchange programmes, overseas university applications, and visa counselling.',
    highlights: ['University shortlisting & SOP support', 'Scholarship & funding advice', 'Visa & pre-departure prep'],
    color: 'sky',
  },
  {
    category: 'Hackathon',
    title: 'Hackathons',
    badge: 'Tech & Innovation',
    icon: Code2,
    description:
      'Inter-school and inter-college hackathons that bring together young innovators to build and compete.',
    highlights: ['Team & solo registrations', 'Problem statement releases', 'Mentorship & judging panels'],
    color: 'violet',
  },
  {
    category: 'Competition',
    title: 'Competitions',
    badge: 'Multi-Institute',
    icon: Trophy,
    description:
      'Academic olympiads, science fairs, debate tournaments, and art competitions across institutions.',
    highlights: ['Olympiad & science fairs', 'Debate & elocution contests', 'Creative & performing arts'],
    color: 'amber',
  },
  {
    category: 'Quiz',
    title: 'Quiz & Bowl Events',
    badge: 'Inter-School & College',
    icon: Brain,
    description:
      'General knowledge, subject-specific, and rapid-fire quiz contests between schools and colleges.',
    highlights: ['Live inter-school quiz rounds', 'Category-based subject quizzes', 'Audience & online participation'],
    color: 'emerald',
  },
  {
    category: 'Concert',
    title: 'Concerts & Arts',
    badge: 'Cultural & Performing Arts',
    icon: Music,
    description:
      'Annual inter-school music competitions, creative arts workshops, and cultural symposiums.',
    highlights: ['School band registrations', 'Audience & bulk passes', 'Masterclass workshops'],
    color: 'purple',
  },
  {
    category: 'General Query',
    title: 'General Enquiries',
    badge: 'Academic Counselling',
    icon: HelpCircle,
    description:
      'Specific questions about curriculum, doubt clearing, or partner institutions? Our team is available.',
    highlights: ['Direct phone & email support', 'Response within 24 hours', 'Senior advisor consults'],
    color: 'slate',
  },
];

const COLOR_MAP = {
  brand:   { icon: 'bg-brand-50 text-brand-700 border-brand-100',   badge: 'bg-brand-50 text-brand-700 border-brand-200',   dot: 'bg-brand-500',   border: 'hover:border-brand-300'   },
  blue:    { icon: 'bg-blue-50 text-blue-600 border-blue-100',       badge: 'bg-blue-50 text-blue-700 border-blue-200',       dot: 'bg-blue-500',    border: 'hover:border-blue-300'    },
  sky:     { icon: 'bg-sky-50 text-sky-600 border-sky-100',          badge: 'bg-sky-50 text-sky-700 border-sky-200',          dot: 'bg-sky-400',     border: 'hover:border-sky-300'     },
  violet:  { icon: 'bg-violet-50 text-violet-600 border-violet-100', badge: 'bg-violet-50 text-violet-700 border-violet-200', dot: 'bg-violet-500',  border: 'hover:border-violet-300'  },
  amber:   { icon: 'bg-amber-50 text-amber-600 border-amber-100',    badge: 'bg-amber-50 text-amber-700 border-amber-200',    dot: 'bg-amber-400',   border: 'hover:border-amber-300'   },
  emerald: { icon: 'bg-emerald-50 text-emerald-600 border-emerald-100', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500', border: 'hover:border-emerald-300' },
  purple:  { icon: 'bg-purple-50 text-purple-600 border-purple-100', badge: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-purple-500',  border: 'hover:border-purple-300'  },
  slate:   { icon: 'bg-slate-100 text-slate-600 border-slate-200',   badge: 'bg-slate-100 text-slate-600 border-slate-200',   dot: 'bg-slate-400',   border: 'hover:border-slate-300'   },
};

export default function ProgramsSection({ onSelectProgram }) {
  return (
    <section id="programs" className="bg-cream-50 py-16 sm:py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-accent-500 mb-3">
            Academic Offerings
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-900 font-serif leading-snug">
            Explore our programmes
          </h2>
          <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-xl">
            Select a programme below to submit a direct inquiry — scholarships, admissions, study
            abroad, hackathons, competitions, quizzes and more.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROGRAMS.map((prog, i) => {
            const Icon = prog.icon;
            const c = COLOR_MAP[prog.color];
            return (
              <div
                key={prog.category}
                className={`group bg-white rounded-2xl p-5 border border-cream-200 ${c.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col animate-fade-up cursor-pointer`}
                style={{ animationDelay: `${i * 50}ms` }}
                onClick={() => onSelectProgram(prog.category)}
              >
                {/* Icon + badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${c.icon} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${c.badge}`}>
                    {prog.badge}
                  </span>
                </div>

                {/* Title + description */}
                <h3 className="text-sm font-bold text-slate-900 font-serif mb-1 group-hover:text-brand-700 transition-colors">
                  {prog.title}
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-3 flex-1 line-clamp-3">
                  {prog.description}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5 pt-3 border-t border-slate-100 mb-3">
                  {prog.highlights.map(h => (
                    <div key={h} className="flex items-center gap-1.5 text-[10px] text-slate-500">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
                      {h}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-brand-700 bg-brand-50 group-hover:bg-brand-700 group-hover:text-white transition-all"
                >
                  Enquire
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
