"use client";

import React from "react";

export default function PrivacyPage() {
  return (
    <main className="main-container">
      {/* Privacy Hero Banner */}
      <section className="privacy-hero">
        <div className="privacy-hero-content">
          <h1>
            Privacy <span>Policy</span>
          </h1>
          <p>
            Learn how Construction Solutions & Services collects, protects, and
            manages your personal data and project details with transparency and
            confidentiality.
          </p>
          <div className="privacy-meta">
            <span>Effective Date: July 28, 2026</span>
            <span>•</span>
            <span>Version 1.2</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="privacy-container">
        <div className="privacy-layout">
          {/* Sidebar Quick Navigation */}
          <aside className="privacy-sidebar">
            <div className="sidebar-title">Table of Contents</div>
            <ul className="toc-list">
              <li>
                <a href="#section-1" className="toc-link">
                  1. Overview & Commitment
                </a>
              </li>
              <li>
                <a href="#section-2" className="toc-link">
                  2. Information We Collect
                </a>
              </li>
              <li>
                <a href="#section-3" className="toc-link">
                  3. How We Use Information
                </a>
              </li>
              <li>
                <a href="#section-4" className="toc-link">
                  4. Architectural & Site Data
                </a>
              </li>
              <li>
                <a href="#section-5" className="toc-link">
                  5. Data Sharing & Third Parties
                </a>
              </li>
              <li>
                <a href="#section-6" className="toc-link">
                  6. Data Security & Storage
                </a>
              </li>
              <li>
                <a href="#section-7" className="toc-link">
                  7. Cookies & Analytics
                </a>
              </li>
              <li>
                <a href="#section-8" className="toc-link">
                  8. Data Retention
                </a>
              </li>
              <li>
                <a href="#section-9" className="toc-link">
                  9. Your Privacy Rights
                </a>
              </li>
              <li>
                <a href="#section-10" className="toc-link">
                  10. Children's Privacy
                </a>
              </li>
              <li>
                <a href="#section-11" className="toc-link">
                  11. Policy Modifications
                </a>
              </li>
              <li>
                <a href="#section-12" className="toc-link">
                  12. Contact Data Officer
                </a>
              </li>
            </ul>
          </aside>

          {/* Privacy Detail Cards */}
          <div className="privacy-content">
            {/* Section 1 */}
            <article id="section-1" className="privacy-card">
              <div className="privacy-section-header">
                <div className="section-number">01</div>
                <h2>Overview & Commitment to Privacy</h2>
              </div>
              <p>
                At <strong>Construction Solutions & Services</strong> (operated
                under <strong>ShareWalls</strong>), we respect your privacy and
                are committed to protecting the personal information and
                proprietary site data you share with us.
              </p>
              <p>
                This Privacy Policy outlines how we collect, use, store,
                disclose, and safeguard your information when you visit our
                website, use our AI design estimation portals, engage our
                architectural planning teams, or commission construction and
                interior design services.
              </p>
            </article>

            {/* Section 2 */}
            <article id="section-2" className="privacy-card">
              <div className="privacy-section-header">
                <div className="section-number">02</div>
                <h2>Information We Collect</h2>
              </div>
              <p>
                We collect several types of information to deliver tailored
                architectural and building services:
              </p>
              <ul>
                <li>
                  <strong>Personal Contact Information:</strong> Name, phone
                  number, email address, mailing address, and client
                  communication preferences when you request a quote or
                  consultation.
                </li>
                <li>
                  <strong>Project & Property Specifications:</strong> Plot
                  dimensions, site addresses, structural requirements, budget
                  ranges, architectural style preferences, and CAD/blueprint
                  uploads.
                </li>
                <li>
                  <strong>Financial & Billing Information:</strong> Payment
                  details, milestone transaction records, and GST/tax
                  identifiers required for project invoicing.
                </li>
                <li>
                  <strong>Technical & Usage Data:</strong> IP address, browser
                  type, operating system, referrer URL, pages viewed, and
                  session metrics collected automatically during website
                  navigation.
                </li>
              </ul>
            </article>

            {/* Section 3 */}
            <article id="section-3" className="privacy-card">
              <div className="privacy-section-header">
                <div className="section-number">03</div>
                <h2>How We Use Your Information</h2>
              </div>
              <p>
                We utilize the collected information for the following
                legitimate business purposes:
              </p>
              <ul>
                <li>
                  Formulating architectural plans, 3D renderings, structural
                  blueprints, and site estimations.
                </li>
                <li>
                  Managing construction execution, Project Management
                  Consultancy (PMC), landscaping, and interior projects.
                </li>
                <li>
                  Sending milestone invoices, progress updates, design draft
                  reviews, and service notifications.
                </li>
                <li>
                  Training and improving our AI computational design tools and
                  automated spatial layout algorithms.
                </li>
                <li>
                  Complying with municipal building sanction requirements and
                  legal obligations.
                </li>
              </ul>
              <div className="highlight-box">
                <p>
                  <strong>Strict Promise:</strong> We never sell, rent, or trade
                  your personal information to third-party telemarketers or
                  external advertisers.
                </p>
              </div>
            </article>

            {/* Section 4 */}
            <article id="section-4" className="privacy-card">
              <div className="privacy-section-header">
                <div className="section-number">04</div>
                <h2>Architectural & Site Data Confidentiality</h2>
              </div>
              <p>
                We treat all client property blueprints, floor plans, site
                surveys, and structural schematics as strictly confidential.
                Site media and architectural renders produced for your project
                will only be featured in our portfolio or marketing materials
                with your prior explicit consent.
              </p>
            </article>

            {/* Section 5 */}
            <article id="section-5" className="privacy-card">
              <div className="privacy-section-header">
                <div className="section-number">05</div>
                <h2>Data Sharing & Authorized Third Parties</h2>
              </div>
              <p>
                We share your data only with trusted partners directly involved
                in fulfilling your project:
              </p>
              <ul>
                <li>
                  <strong>
                    Licensed Subcontractors & Structural Engineers:
                  </strong>{" "}
                  On-site supervisors, civil engineers, and trade specialists
                  carrying out execution under non-disclosure agreements.
                </li>
                <li>
                  <strong>Government & Municipal Authorities:</strong> Local
                  zoning boards or planning sanction departments when handling
                  permit filings on your behalf.
                </li>
                <li>
                  <strong>Technology Infrastructure Providers:</strong> Secure
                  cloud storage, database hosting, and payment gateways that
                  process platform operations.
                </li>
              </ul>
            </article>

            {/* Section 6 */}
            <article id="section-6" className="privacy-card">
              <div className="privacy-section-header">
                <div className="section-number">06</div>
                <h2>Data Protection & Security Measures</h2>
              </div>
              <p>
                We implement robust physical, technical, and administrative
                security measures to protect your data against unauthorized
                access, alteration, disclosure, or destruction. Information
                transferred through our web platform is encrypted using
                industry-standard SSL/TLS protocols.
              </p>
            </article>

            {/* Section 7 */}
            <article id="section-7" className="privacy-card">
              <div className="privacy-section-header">
                <div className="section-number">07</div>
                <h2>Cookies & Analytics</h2>
              </div>
              <p>
                Our website uses cookies and similar tracking technologies to
                enhance user experience, remember session preferences, and
                measure website performance. You can manage cookie settings
                through your internet browser parameters at any time.
              </p>
            </article>

            {/* Section 8 */}
            <article id="section-8" className="privacy-card">
              <div className="privacy-section-header">
                <div className="section-number">08</div>
                <h2>Data Retention Policy</h2>
              </div>
              <p>
                We retain client project files and personal contact details for
                as long as necessary to complete architectural services, fulfill
                structural warranty commitments, and satisfy statutory tax and
                legal recordkeeping requirements.
              </p>
            </article>

            {/* Section 9 */}
            <article id="section-9" className="privacy-card">
              <div className="privacy-section-header">
                <div className="section-number">09</div>
                <h2>Your Privacy Rights & Choices</h2>
              </div>
              <p>
                Depending on your jurisdiction, you possess rights regarding
                your personal data, including the right to access, rectify, or
                request deletion of your information, or restrict certain
                processing activities. To exercise your rights, contact our Data
                Officer.
              </p>
            </article>

            {/* Section 10 */}
            <article id="section-10" className="privacy-card">
              <div className="privacy-section-header">
                <div className="section-number">10</div>
                <h2>Children's Privacy</h2>
              </div>
              <p>
                Our website and services are directed exclusively to adults aged
                18 and older. We do not knowingly collect personal data from
                individuals under 18 years of age.
              </p>
            </article>

            {/* Section 11 */}
            <article id="section-11" className="privacy-card">
              <div className="privacy-section-header">
                <div className="section-number">11</div>
                <h2>Modifications to this Policy</h2>
              </div>
              <p>
                We reserve the right to modify this Privacy Policy at any time.
                Any changes will be posted on this page with an updated
                "Effective Date" at the top of the policy.
              </p>
            </article>

            {/* Section 12 */}
            <article id="section-12" className="privacy-card">
              <div className="privacy-section-header">
                <div className="section-number">12</div>
                <h2>Contact Privacy Team</h2>
              </div>
              <p>
                If you have any questions, concerns, or requests regarding this
                Privacy Policy, please contact our team:
              </p>
              <div className="contact-box">
                <h3>Construction Solutions & Services Privacy Office</h3>
                <p>
                  <strong>Phone:</strong>{" "}
                  <a href="tel:9296998511">+91 92969 98511</a>
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:contructionsolutionsservices@gmail.com">
                    contructionsolutionsservices@gmail.com
                  </a>
                </p>
                <p>
                  <strong>Parent Entity:</strong> Construction Solutions &
                  Services (ShareWalls)
                </p>
                <p>
                  <strong>Address:</strong> Harmu Housing basant bihar colony B1
                  Ranchi 834002
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
