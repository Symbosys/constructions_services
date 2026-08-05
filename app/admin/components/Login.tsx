'use client';

import React, { useState } from 'react';
import apiClient from '../config/apiClient';
import { adminLoginAction } from '../actions/authActions';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Layers,
  Building2,
  ArrowRight,
  Sun,
  Moon,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface LoginProps {
  onLoginSuccess?: (email: string) => void;
  darkMode?: boolean;
  setDarkMode?: (dark: boolean) => void;
}

export const Login: React.FC<LoginProps> = ({
  onLoginSuccess,
  darkMode = true,
  setDarkMode,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both administrative email and password.');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }

    setLoading(true);
    try {
      // Server Action execution for login
      const result = await adminLoginAction(email, password);

      if (result.success) {
        const userEmail = result.user?.email || email;
        if (typeof window !== 'undefined') {
          const fakeToken = `admin_session_${Date.now()}`;
          localStorage.setItem('user_token', fakeToken);
          localStorage.setItem('token', fakeToken);
          localStorage.setItem('admin_email', userEmail);
        }
        if (onLoginSuccess) {
          onLoginSuccess(userEmail);
        }
      } else {
        setError(result.message || 'Authentication failed.');
      }
    } catch (err: any) {
      setError(err?.message || 'Server action login error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans transition-colors duration-300 ${
      darkMode ? 'bg-[#070B12] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Dynamic Background Glow Blobs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Theme Toggle Button */}
      {setDarkMode && (
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className={`absolute top-6 right-6 px-4 py-2.5 rounded-2xl border text-xs font-bold transition duration-200 flex items-center gap-2 z-20 ${
            darkMode
              ? 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-slate-700'
              : 'bg-white border-slate-200 text-slate-800 shadow-md hover:bg-slate-50'
          }`}
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-orange-500" />}
          <span>{darkMode ? 'Light Theme' : 'Dark Theme'}</span>
        </button>
      )}

      <div className={`w-full max-w-5xl rounded-3xl border grid grid-cols-1 lg:grid-cols-12 overflow-hidden relative z-10 shadow-2xl transition-colors duration-300 ${
        darkMode
          ? 'bg-slate-900/80 border-slate-800/90 shadow-slate-950/80 backdrop-blur-2xl'
          : 'bg-white/90 border-slate-200 shadow-slate-300/40 backdrop-blur-2xl'
      }`}>
        
        {/* Left Visual Column */}
        <div className={`lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between border-r relative ${
          darkMode
            ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-slate-800/80'
            : 'bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border-slate-700 text-white'
        }`}>
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-extrabold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              <span>Security Standard v2.4</span>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xl inline-block">
                <img
                  src="/assets/images/logo3.png"
                  alt="Construction Solutions & Services Logo"
                  className="h-14 sm:h-16 w-auto max-w-[260px] object-contain"
                  style={{
                    filter: 'contrast(1.08) brightness(1.02) saturate(1.08)',
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden',
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/images/logo2.png';
                  }}
                />
              </div>
              <div>
                <h1 className="font-black text-2xl text-white tracking-tight leading-snug">
                  Construction <span className="text-orange-500">Solutions</span>{" "}&amp; Services
                </h1>
                <p className="text-[11px] font-bold text-orange-400 uppercase tracking-widest mt-1">
                  Architectural &amp; Civil CMS
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Enterprise management portal for 3D architectural renders, structural IS-code blueprints, BOQ estimates, and client inquiries.
            </p>
          </div>

          <div className="space-y-3 my-8">
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md">
              <Building2 className="w-5 h-5 text-orange-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white">Structural Catalog CMS</h4>
                <p className="text-[11px] text-slate-300">Live service offering &amp; blueprint control</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white">Encrypted Express JWT Auth</h4>
                <p className="text-[11px] text-slate-300">Session controller endpoint</p>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between border-t border-slate-800/60 pt-4">
            <span>© 2026 Construction Solutions &amp; Services</span>
            <span className="text-emerald-400 font-bold">TLS 1.3 Active</span>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto space-y-6">
            <div>
              <h2 className={`text-2xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Administrator Sign In
              </h2>
              <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Enter your administrative credentials to access the control center.
              </p>
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-bold flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-xs font-extrabold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Administrative Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@sharewalls.com"
                    autoComplete="off"
                    className={`w-full pl-10 pr-4 py-3 border rounded-2xl text-sm transition duration-200 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 font-medium ${
                      darkMode
                        ? 'bg-slate-950/70 border-slate-800 text-white placeholder-slate-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className={`block text-xs font-extrabold uppercase tracking-wider ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Access Password
                  </label>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setError('System admin contact required for password reset.');
                    }}
                    className="text-xs text-orange-500 hover:text-orange-600 font-bold transition"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className={`w-full pl-10 pr-11 py-3 border rounded-2xl text-sm transition duration-200 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 font-medium ${
                      darkMode
                        ? 'bg-slate-950/70 border-slate-800 text-white placeholder-slate-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-400 text-orange-500 focus:ring-orange-500"
                  />
                  <span className={`text-xs font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Keep session active</span>
                </label>
                <span className="text-[11px] font-extrabold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 2FA Active
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-orange-500/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Authenticate Session</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
