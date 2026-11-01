import React, { useState } from 'react';
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Search,
  Building2,
  AlertCircle,
  Loader2,
  ChevronLeft
} from 'lucide-react';
import { loginAdmin } from '../services/api';

export default function AdminLoginPage({ onLoginSuccess, onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      const data = await loginAdmin({ email, password });
      if (onLoginSuccess) {
        onLoginSuccess(data.admin);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row font-sans">

      {/* LEFT: Classroom photo with warm forest-green overlay */}
      <div className="lg:w-1/2 relative flex flex-col justify-between overflow-hidden min-h-[320px] lg:min-h-screen">

        {/* Photo */}
        <img
          src="https://images.unsplash.com/photo-1758873271761-6cfe9b4f000c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
          alt="Students in classroom"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Warm dark gradient — forest green tint at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-900/50 to-brand-900/20" />

        {/* Top bar: Logo + portal link */}
        <div className="relative z-10 flex items-center justify-between p-8 sm:p-10 lg:p-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-500 flex items-center justify-center text-white shadow-lg">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white font-serif">
              CompassZ
            </span>
          </div>

          <button
            onClick={() => onNavigate('public')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cream-200 hover:text-white px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Back to Home
          </button>
        </div>

        {/* Headline + feature pills */}
        <div className="relative z-10 px-8 sm:px-10 lg:px-12 pb-10 lg:pb-14 max-w-lg">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white font-serif">
            Your inquiry desk{' '}
            <em className="not-italic text-accent-300">awaits.</em>
          </h1>
          <p className="mt-3 text-sm text-cream-200 leading-relaxed">
            Sign in to review enquiries and keep every student's journey on track.
          </p>

          <ul className="mt-7 space-y-3">
            <li className="flex items-center gap-3 text-sm font-medium text-cream-100">
              <CheckCircle2 className="w-4 h-4 text-accent-300 shrink-0" />
              View &amp; respond to all enquiries
            </li>
            <li className="flex items-center gap-3 text-sm font-medium text-cream-100">
              <Building2 className="w-4 h-4 text-accent-300 shrink-0" />
              Update and manage inquiry status
            </li>
            <li className="flex items-center gap-3 text-sm font-medium text-cream-100">
              <Search className="w-4 h-4 text-accent-300 shrink-0" />
              Filter, search and export records
            </li>
          </ul>
        </div>

        {/* Footer note */}
        <div className="relative z-10 px-8 sm:px-10 lg:px-12 pb-6 text-xs text-cream-300/70">
          CompassZ &copy; {new Date().getFullYear()} &bull; Secure Admin Portal
        </div>

      </div>

      {/* RIGHT: Warm cream login form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-cream-100">
        <div className="w-full max-w-md space-y-8">

          {/* Form header */}
          <div className="text-left">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-accent-500 mb-2">
              Admin Access
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-900 tracking-tight font-serif">
              Sign in to your dashboard
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Enter your credentials to access the inquiry management portal.
            </p>
          </div>

          {/* Error alert */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-sm">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label htmlFor="admin_email" className="block text-sm font-semibold text-brand-900 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  id="admin_email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@school.edu"
                  className="w-full bg-white border border-cream-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all shadow-sm"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="admin_password" className="block text-sm font-semibold text-brand-900 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="admin_password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-white border border-cream-300 rounded-xl pl-10 pr-10 py-3 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all shadow-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Sign In — terracotta accent matching public site CTA style */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-white bg-accent-500 hover:bg-accent-600 shadow-md shadow-accent-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Footer */}
          <p className="text-center text-xs text-slate-400 pt-2">
            Not an admin?{' '}
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('public')}
              className="font-semibold text-brand-700 hover:text-brand-900 transition-colors underline underline-offset-2"
            >
              Visit the Student Portal
            </button>
          </p>

        </div>
      </div>

    </div>
  );
}
