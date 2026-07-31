'use client';

import React from 'react';
import Link from 'next/link';
import { PhoneCall, MapPin, Mail, Building2, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8 sm:pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Contact Info Column */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/20">
                <Building2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="font-extrabold text-base sm:text-lg tracking-tight text-white leading-none">
                  Construction <span className="text-orange-500">Solutions</span>
                </div>
                <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-1">
                  &amp; Services • Architecture
                </div>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed font-medium max-w-sm">
              Crafting extraordinary architectural spaces, structural engineering blueprints, and luxury civil construction across Ranchi &amp; India.
            </p>

            <div className="pt-2 space-y-3 text-xs font-semibold text-slate-300">
              <a href="tel:+919296998511" className="flex items-center gap-2.5 hover:text-orange-400 transition py-1">
                <PhoneCall className="w-4 h-4 text-orange-500 shrink-0" />
                <span>+91 92969 98511</span>
              </a>
              <div className="flex items-start gap-2.5 text-slate-400 py-0.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Harmu Housing Basant Bihar Colony B1, Ranchi, Jharkhand 834002</span>
              </div>
              <a href="mailto:contructionsolutionsservices@gmail.com" className="flex items-center gap-2.5 hover:text-orange-400 transition py-1">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span className="break-all sm:break-normal">contructionsolutionsservices@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-widest text-orange-500">
              Site Map
            </h4>
            <ul className="space-y-2.5 text-xs font-bold">
              <li><Link href="/" className="hover:text-white transition inline-flex items-center gap-1.5 group py-0.5"><ArrowRight className="w-3 h-3 text-orange-500 group-hover:translate-x-1 transition-transform" /> Home</Link></li>
              <li><Link href="/service" className="hover:text-white transition inline-flex items-center gap-1.5 group py-0.5"><ArrowRight className="w-3 h-3 text-orange-500 group-hover:translate-x-1 transition-transform" /> Services</Link></li>
              <li><Link href="/about" className="hover:text-white transition inline-flex items-center gap-1.5 group py-0.5"><ArrowRight className="w-3 h-3 text-orange-500 group-hover:translate-x-1 transition-transform" /> About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition inline-flex items-center gap-1.5 group py-0.5"><ArrowRight className="w-3 h-3 text-orange-500 group-hover:translate-x-1 transition-transform" /> Contact Us</Link></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-widest text-orange-500">
              Our Expertise
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li><Link href="/service" className="hover:text-slate-200 transition inline-block py-0.5">Architectural Blueprints &amp; 3D Elevations</Link></li>
              <li><Link href="/service" className="hover:text-slate-200 transition inline-block py-0.5">Civil Contracting &amp; Construction</Link></li>
              <li><Link href="/service" className="hover:text-slate-200 transition inline-block py-0.5">BOQ Estimation &amp; Structural Load Audits</Link></li>
              <li><Link href="/service" className="hover:text-slate-200 transition inline-block py-0.5">Project Management Consultancy (PMC)</Link></li>
              <li><Link href="/service" className="hover:text-slate-200 transition inline-block py-0.5">Luxury Home &amp; Commercial Interiors</Link></li>
            </ul>
          </div>

          {/* Legal Policies Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-widest text-orange-500">
              Legal &amp; Policies
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li><Link href="/terms" className="hover:text-slate-200 transition inline-block py-0.5">Terms &amp; Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-slate-200 transition inline-block py-0.5">Privacy Policy</Link></li>
              <li><Link href="/cancellation" className="hover:text-slate-200 transition inline-block py-0.5">Cancellation &amp; Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[11px] font-bold text-slate-500">
          <p>© 2026 Construction Solutions &amp; Services (ShareWalls). All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Link href="/privacy" className="hover:text-slate-400 transition py-1">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-400 transition py-1">Terms</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-slate-400 transition py-1">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
