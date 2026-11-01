import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, X, Clock, Mail, MapPin } from 'lucide-react';
import { submitInquiry } from '../services/api';

const USER_TYPES = ['Parent', 'Student', 'School'];
const CATEGORIES = ['Scholarship', 'Admission', 'Study Abroad', 'Hackathon', 'Competition', 'Quiz', 'Concert', 'General Query'];

const inputBase =
  'w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 ' +
  'focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all';

export default function InquiryForm({ onSubmitted, initialCategory }) {
  const [formData, setFormData] = useState({
    user_type: 'Parent',
    category: initialCategory || 'Scholarship',
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    if (initialCategory && CATEGORIES.includes(initialCategory)) {
      setFormData(p => ({ ...p, category: initialCategory }));
    }
  }, [initialCategory]);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      const msg = 'Please fill in all required fields.';
      setErrorMessage(msg);
      setToast({ type: 'error', title: 'Validation error', message: msg });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      const msg = 'Please provide a valid email address.';
      setErrorMessage(msg);
      setToast({ type: 'error', title: 'Invalid email', message: msg });
      return;
    }

    try {
      setLoading(true);
      const res = await submitInquiry(formData);
      const ok = res.message || 'Inquiry submitted! Our team will be in touch soon.';
      setSuccessMessage(ok);
      setToast({ type: 'success', title: 'Inquiry submitted!', message: 'Our counselling team will get back to you shortly.' });
      setFormData({ user_type: 'Parent', category: 'Scholarship', name: '', email: '', phone: '', message: '' });
      if (onSubmitted) onSubmitted(res.inquiry);
    } catch (err) {
      const msg = err.message || 'Something went wrong. Please try again.';
      setErrorMessage(msg);
      setToast({ type: 'error', title: 'Submission failed', message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-20">

      {/* Toast */}
      {toast && (
        <div
          role="alert"
          aria-live="assertive"
          className={`fixed top-20 right-4 sm:right-8 z-50 w-[calc(100%-2rem)] sm:w-80 p-4 rounded-2xl shadow-xl border flex items-start gap-3 animate-fade-in ${toast.type === 'success' ? 'bg-white border-brand-200' : 'bg-white border-rose-200'
            }`}
        >
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${toast.type === 'success' ? 'bg-brand-700 text-white' : 'bg-rose-500 text-white'
            }`}>
            {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900">{toast.title}</p>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{toast.message}</p>
          </div>
          <button onClick={() => setToast(null)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer focus:outline-none">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">

        {/* ─── LEFT — dark forest panel ─── */}
        <div className="relative bg-brand-900 px-8 sm:px-14 py-16 sm:py-20 flex flex-col justify-between overflow-hidden">

          {/* Subtle background texture circles */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-brand-700/30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-0 w-56 h-56 rounded-full bg-accent-500/10 blur-2xl pointer-events-none" />

          {/* Top copy */}
          <div className="relative z-10">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-accent-400 mb-5">
              Get in touch
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold font-serif text-white leading-[1.1] mb-6">
              Have a question?<br />
              We're here<br />
              to help.
            </h2>
            <p className="text-sm text-brand-300 leading-relaxed max-w-xs">
              Tell us who you are and what you'd like to know.
              Your inquiry goes straight to our counselling team.
            </p>
          </div>

          {/* Bottom info blocks */}
          <div className="relative z-10 mt-14 grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10 border-t border-brand-700/60">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-3.5 h-3.5 text-accent-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-400">Response Time</span>
              </div>
              <p className="text-sm font-semibold text-white">Within 24 hours</p>
              <p className="text-xs text-brand-400 mt-0.5">Mon – Sat, 9 AM – 6 PM</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-3.5 h-3.5 text-accent-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-400">Email</span>
              </div>
              <p className="text-sm font-semibold text-white">hello@CompassZ.edu</p>
              <p className="text-xs text-brand-400 mt-0.5">Or submit the form →</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-3.5 h-3.5 text-accent-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-400">Enquiries</span>
              </div>
              <p className="text-sm font-semibold text-white">Scholarships · Admissions</p>
              <p className="text-xs text-brand-400 mt-0.5">Study Abroad · Events · More</p>
            </div>
          </div>
        </div>

        {/* ─── RIGHT — floating white form card ─── */}
        <div className="bg-cream-100 flex items-center justify-center px-6 sm:px-12 py-14">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-cream-200 p-7 sm:p-9">

            {/* Card header */}
            <h3 className="text-xl font-bold text-brand-900 font-serif mb-1">Tell Us What You Need</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Our team is ready to assist you with every detail, big or small.
            </p>

            {/* Alerts */}
            {successMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-brand-50 border border-brand-200 flex items-start gap-2.5 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
                <p className="text-xs text-brand-800">{successMessage}</p>
              </div>
            )}
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 animate-fade-in">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <p className="text-xs text-rose-700">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name + Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Full Name</label>
                  <input
                    type="text" id="name" name="name"
                    value={formData.name} onChange={handleChange}
                    placeholder="Aarav Sharma"
                    className={inputBase} required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Phone Number</label>
                  <input
                    type="tel" id="phone" name="phone"
                    value={formData.phone} onChange={handleChange}
                    placeholder="98765 43210"
                    className={inputBase} required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Email Address</label>
                <input
                  type="email" id="email" name="email"
                  value={formData.email} onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputBase} required
                />
              </div>

              {/* I am a — pill selector */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">I Am A</p>
                <div className="flex flex-wrap gap-2">
                  {USER_TYPES.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, user_type: type }))}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${formData.user_type === type
                        ? 'bg-brand-900 border-brand-900 text-white'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-brand-400 hover:text-brand-700'
                        }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inquiry about — pill selector */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Inquiry About</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, category: cat }))}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${formData.category === cat
                        ? 'bg-accent-500 border-accent-500 text-white'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-accent-300 hover:text-accent-600'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Your Question</label>
                <textarea
                  id="message" name="message"
                  rows={4}
                  value={formData.message} onChange={handleChange}
                  placeholder="Tell us what you'd like to know…"
                  className={`${inputBase} resize-y`}
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white bg-brand-900 hover:bg-brand-800 shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading
                  ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Submitting…</span></>
                  : <><Send className="w-4 h-4" /><span>Submit inquiry</span></>
                }
              </button>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
