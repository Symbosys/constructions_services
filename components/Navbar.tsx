'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, PhoneCall, ArrowRight, Building2 } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/service' },
    { label: 'About', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
              <img
                src="/assets/images/circle.png"
                alt="Construction Solutions & Services Logo"
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <Building2 className="w-4 h-4 absolute text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="text-sm sm:text-base md:text-lg font-black tracking-tight text-slate-900 leading-none">
                Construction <span className="text-orange-600">Solutions</span>
              </div>
              <div className="text-[8px] sm:text-[9px] font-bold text-slate-500 tracking-wider uppercase mt-0.5">
                &amp; Services • Architecture
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                    active
                      ? 'bg-orange-500/10 text-orange-600 font-black'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Buttons (Contact Us CTA) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <a
              href="tel:+919296998511"
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-orange-500" />
              <span>+91 92969 98511</span>
            </a>

            {/* Always Visible Contact Us Button */}
            <Link
              href="/contact"
              className="flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-black shadow-md shadow-orange-500/20 transition group shrink-0"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition focus:outline-none shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/90 bg-white/98 backdrop-blur-xl px-4 pt-2 pb-5 space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition ${
                    active
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="tel:+919296998511"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-extrabold text-slate-800 bg-slate-50"
            >
              <PhoneCall className="w-3.5 h-3.5 text-orange-500" />
              <span>+91 92969 98511</span>
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white text-xs font-black shadow-md shadow-orange-500/20"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
