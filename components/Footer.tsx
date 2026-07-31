'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <Link href="/" className="brand-logo-wrapper mb-3">
            <img
              src="/assets/images/circle.png"
              alt="Construction Solutions & Services Logo"
              className="brand-logo-img"
            />
            <div className="footer-logo">
              Construction <span>Solutions & Services</span>
            </div>
          </Link>
          <p className="footer-tagline">
            Crafting extraordinary architectural spaces, structural engineering blueprints, and luxury construction.
          </p>
          <div className="footer-contact-info">
            <p><span>📞</span> +91 92969 98511</p>
            <p><span>📍</span> Harmu Housing basant bihar colony B1 Ranchi 834002</p>
            <p><span>✉️</span> contructionsolutionsservices@gmail.com</p>
          </div>
        </div>

        {/* Link Columns */}
        <div className="footer-section">
          <div className="footer-column">
            <h3>Site Map</h3>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/service">Services</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Legal & Policies</h3>
            <ul>
              <li><Link href="/terms">Terms & Conditions</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/cancellation">Cancellation & Refund Policy</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Our Services</h3>
            <ul>
              <li><Link href="/service">Architectural Planning</Link></li>
              <li><Link href="/service">Civil Construction</Link></li>
              <li><Link href="/service">Project Management (PMC)</Link></li>
              <li><Link href="/service">Interior Designing</Link></li>
              <li><Link href="/service">Structural Renovation</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom Copyright Bar */}
      <div className="footer-bottom-bar">
        <p>© 2026 Construction Solutions & Services (ShareWalls). All rights reserved.</p>
      </div>
    </footer>
  );
}
