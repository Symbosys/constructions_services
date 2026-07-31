"use client";

import React from "react";

export default function TermsPage() {
  return (
    <main className="main-container">
      {/* Terms Hero Banner */}
      <section className="terms-hero">
        <div className="terms-hero-content">
          <h1>
            Terms & <span>Conditions</span>
          </h1>
          <p>
            Please read these Terms and Conditions carefully before using the
            services, website, or tools provided by Construction Solutions &
            Services and ShareWalls.
          </p>
          <div className="terms-meta">
            <span>Effective Date: July 28, 2026</span>
            <span>•</span>
            <span>Version 1.2</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="terms-container">
        <div className="terms-layout">
          {/* Sidebar Quick Navigation */}
          <aside className="terms-sidebar">
            <div className="sidebar-title">Table of Contents</div>
            <ul className="toc-list">
              <li>
                <a href="#section-1" className="toc-link">
                  1. Acceptance of Terms
                </a>
              </li>
              <li>
                <a href="#section-2" className="toc-link">
                  2. Scope of Services
                </a>
              </li>
              <li>
                <a href="#section-3" className="toc-link">
                  3. User Obligations
                </a>
              </li>
              <li>
                <a href="#section-4" className="toc-link">
                  4. Intellectual Property
                </a>
              </li>
              <li>
                <a href="#section-5" className="toc-link">
                  5. Fees & Payments
                </a>
              </li>
              <li>
                <a href="#section-6" className="toc-link">
                  6. Project Scope & Revisions
                </a>
              </li>
              <li>
                <a href="#section-7" className="toc-link">
                  7. Site Access & Permits
                </a>
              </li>
              <li>
                <a href="#section-8" className="toc-link">
                  8. Cancellation & Refunds
                </a>
              </li>
              <li>
                <a href="#section-9" className="toc-link">
                  9. Warranties & Disclaimers
                </a>
              </li>
              <li>
                <a href="#section-10" className="toc-link">
                  10. Limitation of Liability
                </a>
              </li>
              <li>
                <a href="#section-11" className="toc-link">
                  11. Governing Law
                </a>
              </li>
              <li>
                <a href="#section-12" className="toc-link">
                  12. Contact Us
                </a>
              </li>
            </ul>
          </aside>

          {/* Terms Detail Cards */}
          <div className="terms-content">
            {/* Section 1 */}
            <article id="section-1" className="terms-card">
              <div className="terms-section-header">
                <div className="section-number">01</div>
                <h2>Acceptance of Terms</h2>
              </div>
              <p>
                Welcome to <strong>Construction Solutions & Services</strong>{" "}
                (operated under <strong>ShareWalls</strong>). By accessing our
                website, engaging our architectural design services, using our
                computational design platforms, or requesting project
                estimations, you acknowledge that you have read, understood, and
                agreed to be bound by these Terms and Conditions.
              </p>
              <p>
                If you do not agree with any part of these terms, you must
                refrain from utilizing our website, services, and digital tools.
                These terms apply to all visitors, registered clients,
                homeowners, contractors, and partners who interact with our
                services.
              </p>
            </article>

            {/* Section 2 */}
            <article id="section-2" className="terms-card">
              <div className="terms-section-header">
                <div className="section-number">02</div>
                <h2>Scope of Architectural & Construction Services</h2>
              </div>
              <p>
                Construction Solutions & Services provides a comprehensive range
                of design and engineering consultancy services including, but
                not limited to:
              </p>
              <ul>
                <li>
                  <strong>Architectural Planning & Concept Design:</strong>{" "}
                  Drafting spatial blueprints, 2D/3D layout concepts, and floor
                  plans.
                </li>
                <li>
                  <strong>Construction & Structural Execution:</strong> On-site
                  building execution, civil works, and structural engineering
                  oversight.
                </li>
                <li>
                  <strong>Cost Estimation & Bill of Quantities (BOQ):</strong>{" "}
                  Detailed material, labor, and timeline projections for
                  proposed developments.
                </li>
                <li>
                  <strong>Landscaping & Site Planning:</strong> Outdoor spatial
                  architecture, environmental planning, and site integration.
                </li>
                <li>
                  <strong>Project Management Consultancy (PMC):</strong>{" "}
                  Supervision, quality control, vendor coordination, and
                  progress monitoring.
                </li>
                <li>
                  <strong>Interior & Renovation Design:</strong> Interior
                  layouts, aesthetic upgrades, spatial remodeling, and material
                  selection.
                </li>
                <li>
                  <strong>AI & Computational Architecture:</strong> Automated
                  spatial optimization and digital prototyping.
                </li>
              </ul>
              <div className="highlight-box">
                <p>
                  <strong>Note:</strong> All initial conceptual renders and
                  AI-generated models are preliminary visual representations.
                  Execution drawings finalized with structural engineers govern
                  the actual construction process.
                </p>
              </div>
            </article>

            {/* Section 3 */}
            <article id="section-3" className="terms-card">
              <div className="terms-section-header">
                <div className="section-number">03</div>
                <h2>User & Client Obligations</h2>
              </div>
              <p>
                As a user or client engaging with Construction Solutions &
                Services, you agree to:
              </p>
              <ul>
                <li>
                  Provide accurate, current, and complete details regarding
                  project requirements, property boundaries, and financial
                  specifications.
                </li>
                <li>
                  Ensure that you hold lawful title, leasehold, or authorized
                  power of attorney for any property submitted for architectural
                  planning or construction.
                </li>
                <li>
                  Refrain from uploading or submitting fraudulent, misleading,
                  or infringing documents through our website or service request
                  portals.
                </li>
                <li>
                  Maintain the confidentiality of any credentials or private
                  client portal accounts assigned to you.
                </li>
              </ul>
            </article>

            {/* Section 4 */}
            <article id="section-4" className="terms-card">
              <div className="terms-section-header">
                <div className="section-number">04</div>
                <h2>Intellectual Property & Design Rights</h2>
              </div>
              <p>
                All content on this website—including software, graphics,
                architectural templates, 3D renderings, floor plans, branding,
                logos, and proprietary computational algorithms—is the exclusive
                intellectual property of{" "}
                <strong>Construction Solutions & Services</strong>.
              </p>
              <p>
                Upon full payment of agreed contract fees, clients receive a
                non-exclusive, non-transferable license to utilize the finalized
                architectural blueprints and design documents solely for the
                specific construction project specified in the agreement.
                Unauthorized resale, reproduction, or redistribution of our
                proprietary designs to third parties is strictly prohibited.
              </p>
            </article>

            {/* Section 5 */}
            <article id="section-5" className="terms-card">
              <div className="terms-section-header">
                <div className="section-number">05</div>
                <h2>Fee Structure, Estimation & Payment Terms</h2>
              </div>
              <p>
                Payment terms for architectural planning, design, and
                construction services are structured as follows:
              </p>
              <ul>
                <li>
                  <strong>Quotations & Estimates:</strong> Cost estimates
                  provided on the platform or in initial consultations are based
                  on preliminary data and market rates. Final figures depend on
                  finalized BOQs, structural audits, and client material
                  choices.
                </li>
                <li>
                  <strong>Milestone Payments:</strong> Design and construction
                  engagements operate on a scheduled milestone payment plan as
                  set forth in your individual Service Level Agreement (SLA).
                </li>
                <li>
                  <strong>Retainer / Booking Amount:</strong> Initial deposit
                  fees required to commence architectural planning or site
                  surveys are non-refundable once site work or layout drafting
                  has initiated.
                </li>
                <li>
                  <strong>Taxes & Statutory Levies:</strong> All applicable
                  local taxes, GST, or statutory fees will be clearly enumerated
                  on billing invoices and remain the responsibility of the
                  client.
                </li>
              </ul>
            </article>

            {/* Section 6 */}
            <article id="section-6" className="terms-card">
              <div className="terms-section-header">
                <div className="section-number">06</div>
                <h2>Project Scope Modifications & Revisions</h2>
              </div>
              <p>
                We strive to deliver designs aligned with your exact vision.
                Each architectural planning package includes a designated number
                of design revision cycles specified in your service contract.
              </p>
              <p>
                Any major structural modifications, site dimension changes, or
                additions requested after formal approval of the schematic
                design phase will constitute a Change Order and may incur
                supplementary design fees and revised delivery timelines.
              </p>
            </article>

            {/* Section 7 */}
            <article id="section-7" className="terms-card">
              <div className="terms-section-header">
                <div className="section-number">07</div>
                <h2>Site Access, Approvals & Local Building Permits</h2>
              </div>
              <p>
                The client is responsible for obtaining all necessary municipal
                approvals, building permits, zoning variances, and local
                sanctions unless Construction Solutions & Services is explicitly
                contracted under a formal PMC agreement to assist with
                regulatory compliance.
              </p>
              <p>
                Clients must grant Construction Solutions & Services personnel
                and authorized subcontractors safe, unobstructed access to the
                project site during scheduled inspection and construction hours.
              </p>
            </article>

            {/* Section 8 */}
            <article id="section-8" className="terms-card">
              <div className="terms-section-header">
                <div className="section-number">08</div>
                <h2>Cancellation, Refund & Termination Policy</h2>
              </div>
              <p>
                Either party may terminate a service contract in accordance with
                the specific cancellation guidelines defined in the project
                agreement:
              </p>
              <ul>
                <li>
                  <strong>Design Phase:</strong> If a client cancels before the
                  completion of the schematic phase, fees will be calculated
                  based on hours worked and completed deliverables up to the
                  date of written notice.
                </li>
                <li>
                  <strong>Construction & Execution Phase:</strong> Cancellations
                  during active construction require settling all executed work,
                  procured materials, and unassignable subcontractor
                  commitments.
                </li>
              </ul>
            </article>

            {/* Section 9 */}
            <article id="section-9" className="terms-card">
              <div className="terms-section-header">
                <div className="section-number">09</div>
                <h2>Warranties & Disclaimers</h2>
              </div>
              <p>
                Construction Solutions & Services executes all services with
                professional care, adherence to industry standards, and
                precision engineering. However, our website and digital tools
                are provided on an "as is" and "as available" basis.
              </p>
              <p>
                We do not warrant uninterrupted access to digital platforms, nor
                are we liable for site delays caused by force majeure events,
                severe weather conditions, labor disputes, material market
                shortages, or delayed client approvals.
              </p>
            </article>

            {/* Section 10 */}
            <article id="section-10" className="terms-card">
              <div className="terms-section-header">
                <div className="section-number">10</div>
                <h2>Limitation of Liability</h2>
              </div>
              <p>
                To the maximum extent permitted by applicable law, Construction
                Solutions & Services, ShareWalls, its officers, employees, or
                partners shall not be liable for any indirect, incidental,
                punitive, or consequential damages arising out of your use of
                our architectural services or reliance on website content.
              </p>
              <p>
                In any event, our maximum cumulative liability for any direct
                claims arising under a project contract shall not exceed the
                total design fees paid by the client for that specific
                engagement.
              </p>
            </article>

            {/* Section 11 */}
            <article id="section-11" className="terms-card">
              <div className="terms-section-header">
                <div className="section-number">11</div>
                <h2>Governing Law & Dispute Resolution</h2>
              </div>
              <p>
                These Terms and Conditions shall be governed by and construed in
                accordance with the laws of the jurisdiction in which
                Construction Solutions & Services operates. Any dispute,
                controversy, or claim arising out of or relating to these terms
                shall first be submitted to good-faith mediation prior to
                seeking relief in competent courts.
              </p>
            </article>

            {/* Section 12 */}
            <article id="section-12" className="terms-card">
              <div className="terms-section-header">
                <div className="section-number">12</div>
                <h2>Contact Information</h2>
              </div>
              <p>
                If you have any questions, concerns, or requests for
                clarification regarding these Terms and Conditions, please
                contact our support team:
              </p>
              <div className="contact-box">
                <h3>Construction Solutions & Services Support</h3>
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
