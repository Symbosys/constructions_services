'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="brand-logo-wrapper">
          <img
            src="/assets/images/circle.png"
            alt="Construction Solutions & Services Logo"
            className="brand-logo-img"
          />
          <div className="logo">
            Construction <span>Solutions & Services</span>
          </div>
        </Link>
        <ul className="nav-links">
          <li>
            <Link href="/" className={pathname === '/' ? 'text-orange-500 font-bold' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/service" className={pathname === '/service' ? 'text-orange-500 font-bold' : ''}>
              Services
            </Link>
          </li>
          <li>
            <Link href="/about" className={pathname === '/about' ? 'text-orange-500 font-bold' : ''}>
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className={pathname === '/contact' ? 'text-orange-500 font-bold' : ''}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
