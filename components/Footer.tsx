"use client";

import React from "react";
import Link from "next/link";
import { PhoneCall, MapPin, Mail, ArrowRight } from "lucide-react";

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3Z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function PinterestIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.592 0 12.017 0z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8 sm:pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Contact Info Column */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block group overflow-visible">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xl inline-block transition-transform duration-200">
                <img
                  src="/assets/images/logo2.png"
                  alt="Construction Solutions & Services Logo"
                  className="h-16 sm:h-20 lg:h-24 w-auto max-w-[320px] sm:max-w-[400px] object-contain transform scale-105 origin-left"
                  style={{
                    filter: "contrast(1.08) brightness(1.02) saturate(1.08)",
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/assets/images/logo3.png";
                  }}
                />
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed font-medium max-w-sm">
              Crafting extraordinary architectural spaces, structural
              engineering blueprints, and luxury civil construction across
              Ranchi &amp; India.
            </p>

            <div className="pt-2 space-y-3 text-xs font-semibold text-slate-300">
              <a
                href="tel:+919296998511"
                className="flex items-center gap-2.5 hover:text-orange-400 transition py-1"
              >
                <PhoneCall className="w-4 h-4 text-orange-500 shrink-0" />
                <span>+91 92969 98511</span>
              </a>
              <div className="flex items-start gap-2.5 text-slate-400 py-0.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  Harmu Housing Colony Road Number-1/B, Harmu, Ranchi, Jharkhand 834002
                </span>
              </div>
              <a
                href="mailto:contructionsolutionsservices@gmail.com"
                className="flex items-center gap-2.5 hover:text-orange-400 transition py-1"
              >
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span className="break-all sm:break-normal">
                  contructionsolutionsservices@gmail.com
                </span>
              </a>
            </div>

            {/* Social Media Links */}
            <div className="pt-3 flex flex-wrap items-center gap-2.5">
              <a
                href="https://www.linkedin.com/in/construction-solutions-services/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-orange-400 hover:border-orange-500/50 hover:bg-slate-800/80 transition-all duration-200 text-xs font-semibold shadow-sm"
              >
                <LinkedinIcon className="w-4 h-4 text-orange-500 shrink-0" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/constructionsolutionsservices/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-orange-400 hover:border-orange-500/50 hover:bg-slate-800/80 transition-all duration-200 text-xs font-semibold shadow-sm"
              >
                <InstagramIcon className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Instagram</span>
              </a>
              <a
                href="https://x.com/cs_services25"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter Profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-orange-400 hover:border-orange-500/50 hover:bg-slate-800/80 transition-all duration-200 text-xs font-semibold shadow-sm"
              >
                <TwitterIcon className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Twitter</span>
              </a>
              <a
                href="https://www.facebook.com/constructionsolutionsservices/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-orange-400 hover:border-orange-500/50 hover:bg-slate-800/80 transition-all duration-200 text-xs font-semibold shadow-sm"
              >
                <FacebookIcon className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Facebook</span>
              </a>
              <a
                href="https://in.pinterest.com/contructionsolutionsservices/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest Profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-orange-400 hover:border-orange-500/50 hover:bg-slate-800/80 transition-all duration-200 text-xs font-semibold shadow-sm"
              >
                <PinterestIcon className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Pinterest</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-widest text-orange-500">
              Site Map
            </h4>
            <ul className="space-y-2.5 text-xs font-bold">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition inline-flex items-center gap-1.5 group py-0.5"
                >
                  <ArrowRight className="w-3 h-3 text-orange-500 group-hover:translate-x-1 transition-transform" />{" "}
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/service"
                  className="hover:text-white transition inline-flex items-center gap-1.5 group py-0.5"
                >
                  <ArrowRight className="w-3 h-3 text-orange-500 group-hover:translate-x-1 transition-transform" />{" "}
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition inline-flex items-center gap-1.5 group py-0.5"
                >
                  <ArrowRight className="w-3 h-3 text-orange-500 group-hover:translate-x-1 transition-transform" />{" "}
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition inline-flex items-center gap-1.5 group py-0.5"
                >
                  <ArrowRight className="w-3 h-3 text-orange-500 group-hover:translate-x-1 transition-transform" />{" "}
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-widest text-orange-500">
              Our Expertise
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li>
                <Link
                  href="/service"
                  className="hover:text-slate-200 transition inline-block py-0.5"
                >
                  Architectural Blueprints &amp; 3D Elevations
                </Link>
              </li>
              <li>
                <Link
                  href="/service"
                  className="hover:text-slate-200 transition inline-block py-0.5"
                >
                  Civil Contracting &amp; Construction
                </Link>
              </li>
              <li>
                <Link
                  href="/service"
                  className="hover:text-slate-200 transition inline-block py-0.5"
                >
                  BOQ Estimation &amp; Structural Load Audits
                </Link>
              </li>
              <li>
                <Link
                  href="/service"
                  className="hover:text-slate-200 transition inline-block py-0.5"
                >
                  Project Management Consultancy (PMC)
                </Link>
              </li>
              <li>
                <Link
                  href="/service"
                  className="hover:text-slate-200 transition inline-block py-0.5"
                >
                  Luxury Home &amp; Commercial Interiors
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Policies Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-widest text-orange-500">
              Legal &amp; Policies
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-slate-200 transition inline-block py-0.5"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-slate-200 transition inline-block py-0.5"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cancellation"
                  className="hover:text-slate-200 transition inline-block py-0.5"
                >
                  Cancellation &amp; Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-center text-[11px] font-bold text-slate-500">
          <p>
            © 2026 Construction Solutions &amp; Services. All rights reserved.
          </p>
          <p className="text-slate-400 font-extrabold tracking-wide">
            Developed by{" "}
            <span className="text-orange-500 hover:text-orange-400 transition">
              Symbosys
            </span>
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/construction-solutions-services/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="hover:text-orange-400 transition p-1"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.instagram.com/constructionsolutionsservices/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="hover:text-orange-400 transition p-1"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://x.com/cs_services25"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Profile"
              className="hover:text-orange-400 transition p-1"
            >
              <TwitterIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.facebook.com/constructionsolutionsservices/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Profile"
              className="hover:text-orange-400 transition p-1"
            >
              <FacebookIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://in.pinterest.com/contructionsolutionsservices/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest Profile"
              className="hover:text-orange-400 transition p-1"
            >
              <PinterestIcon className="w-3.5 h-3.5" />
            </a>
            <span>•</span>
            <Link
              href="/privacy"
              className="hover:text-slate-400 transition py-1"
            >
              Privacy
            </Link>
            <span>•</span>
            <Link
              href="/terms"
              className="hover:text-slate-400 transition py-1"
            >
              Terms
            </Link>
            <span>•</span>
            <Link
              href="/contact"
              className="hover:text-slate-400 transition py-1"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
