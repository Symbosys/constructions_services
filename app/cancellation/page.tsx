'use client';

import React from 'react';

export default function CancellationPage() {
  return (
    <main className="main-container">
      {/* Cancellation Hero Banner */}
      <section className="cancellation-hero">
        <div className="cancellation-hero-content">
          <h1>
            Cancellation & <span>Refund Policy</span>
          </h1>
          <p>
            Understand the terms, timelines, and guidelines governing project cancellations and refunds for Construction Solutions & Services architectural, construction, and design services.
          </p>
          <div className="cancellation-meta">
            <span>Effective Date: July 28, 2026</span>
            <span>•</span>
            <span>Version 1.2</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="cancellation-container">
        <div className="cancellation-layout">
          {/* Sidebar Quick Navigation */}
          <aside className="cancellation-sidebar">
            <div className="sidebar-title">Table of Contents</div>
            <ul className="toc-list">
              <li><a href="#section-1" className="toc-link">1. Purpose & Overview</a></li>
              <li><a href="#section-2" className="toc-link">2. Architectural Planning Phase</a></li>
              <li><a href="#section-3" className="toc-link">3. Construction & Execution</a></li>
              <li><a href="#section-4" className="toc-link">4. PMC Services</a></li>
              <li><a href="#section-5" className="toc-link">5. Interior & Custom Works</a></li>
              <li><a href="#section-6" className="toc-link">6. Non-Refundable Costs</a></li>
              <li><a href="#section-7" className="toc-link">7. Cancellation Process</a></li>
              <li><a href="#section-8" className="toc-link">8. Refund Timelines</a></li>
              <li><a href="#section-9" className="toc-link">9. Mode of Refund</a></li>
              <li><a href="#section-10" className="toc-link">10. Scope Revisions</a></li>
              <li><a href="#section-11" className="toc-link">11. Force Majeure</a></li>
              <li><a href="#section-12" className="toc-link">12. Contact Support</a></li>
            </ul>
          </aside>

          {/* Cancellation Detail Cards */}
          <div className="cancellation-content">
            {/* Section 1 */}
            <article id="section-1" className="cancellation-card">
              <div className="cancellation-section-header">
                <div className="section-number">01</div>
                <h2>Purpose & Overview</h2>
              </div>
              <p>
                At <strong>Construction Solutions & Services</strong> (operated under <strong>ShareWalls</strong>), we commit dedicated architectural talent, engineering resources, and material procurement to every project upon engagement.
              </p>
              <p>
                This Cancellation and Refund Policy defines the terms under which clients may request project cancellations, the applicable retention fees based on project milestones, and the processing timelines for eligible refunds.
              </p>
            </article>

            {/* Section 2 */}
            <article id="section-2" className="cancellation-card">
              <div className="cancellation-section-header">
                <div className="section-number">02</div>
                <h2>Architectural Planning & Design Cancellations</h2>
              </div>
              <p>For architectural planning, 2D floor plans, 3D renderings, and structural concept design packages:</p>
              <ul>
                <li><strong>Before Design Work Commences (Within 24 Hours of Booking):</strong> 100% refund of the booking amount minus a nominal 3% payment gateway processing fee.</li>
                <li><strong>During Schematic & Conceptual Stage:</strong> If cancelled after site survey or initial layout drafting has begun, 50% of the initial design phase fee will be retained to cover professional labor costs.</li>
                <li><strong>After 3D Renders or Final Working Drawings Issued:</strong> 100% of the design phase fee is non-refundable, as full intellectual property and drafting deliverables have been produced.</li>
              </ul>
            </article>

            {/* Section 3 */}
            <article id="section-3" className="cancellation-card">
              <div className="cancellation-section-header">
                <div className="section-number">03</div>
                <h2>Civil Construction & On-Site Execution</h2>
              </div>
              <p>For turnkey construction, renovation, and civil structural projects:</p>
              <ul>
                <li><strong>Before Site Mobilization:</strong> If cancelled prior to contractor deployment or material ordering, the advance deposit will be refunded after deducting site survey and estimation costs.</li>
                <li><strong>Active Construction Phase:</strong> Once civil excavation or construction commences, refunds are calculated based on a formal audit. The client is responsible for paying for all executed works, on-site labor, and un-cancelable raw material orders.</li>
              </ul>
              <div className="highlight-box">
                <p><strong>Notice:</strong> Construction phase cancellations require a mandatory 14-day written notice to facilitate safe site handback and structural stabilization.</p>
              </div>
            </article>

            {/* Section 4 */}
            <article id="section-4" className="cancellation-card">
              <div className="cancellation-section-header">
                <div className="section-number">04</div>
                <h2>Project Management Consultancy (PMC)</h2>
              </div>
              <p>
                PMC services operate on a periodic retainer or milestone-based model. Clients may terminate PMC supervision agreements by providing 7 days written notice. Retainers paid for subsequent unrendered supervision periods will be refunded pro-rata.
              </p>
            </article>

            {/* Section 5 */}
            <article id="section-5" className="cancellation-card">
              <div className="cancellation-section-header">
                <div className="section-number">05</div>
                <h2>Interior Design & Customized Millwork</h2>
              </div>
              <p>
                Custom interior furniture, cabinetry, and bespoke millwork orders cannot be cancelled or refunded once material cutting or factory fabrication has initiated.
              </p>
            </article>

            {/* Section 6 */}
            <article id="section-6" className="cancellation-card">
              <div className="cancellation-section-header">
                <div className="section-number">06</div>
                <h2>Non-Refundable Expenses</h2>
              </div>
              <p>The following costs incurred by Construction Solutions & Services are strictly non-refundable:</p>
              <ul>
                <li>Government municipal approval fees, sanction filing charges, and legal sanction fees.</li>
                <li>Soil testing, topographical survey, and third-party structural engineering audit fees.</li>
                <li>Custom-fabricated building materials or pre-ordered non-returnable supplies.</li>
              </ul>
            </article>

            {/* Section 7 */}
            <article id="section-7" className="cancellation-card">
              <div className="cancellation-section-header">
                <div className="section-number">07</div>
                <h2>Cancellation Request Procedure</h2>
              </div>
              <p>
                To request a cancellation, clients must submit a formal written request via email to <strong>contructionsolutionsservices@gmail.com</strong> or deliver a written letter to our registered studio office.
              </p>
              <p>
                The request must state the project reference ID, property address, reason for cancellation, and client banking details for refund processing.
              </p>
            </article>

            {/* Section 8 */}
            <article id="section-8" className="cancellation-card">
              <div className="cancellation-section-header">
                <div className="section-number">08</div>
                <h2>Refund Processing Timelines</h2>
              </div>
              <p>Once a cancellation request is audited and approved by our finance department:</p>
              <ul>
                <li><strong>Audit & Financial Reconciliation:</strong> Completed within 7 to 10 business days from notice receipt.</li>
                <li><strong>Refund Credit:</strong> Approved refund amounts will be disbursed within 14 business days following audit completion.</li>
              </ul>
            </article>

            {/* Section 9 */}
            <article id="section-9" className="cancellation-card">
              <div className="cancellation-section-header">
                <div className="section-number">09</div>
                <h2>Mode of Refund</h2>
              </div>
              <p>
                All approved refunds will be credited back to the original source payment method (bank account, credit card, or UPI transfer) used during booking. Cash refunds are not issued under any circumstances.
              </p>
            </article>

            {/* Section 10 */}
            <article id="section-10" className="cancellation-card">
              <div className="cancellation-section-header">
                <div className="section-number">10</div>
                <h2>Project Modifications vs. Cancellation</h2>
              </div>
              <p>
                If you wish to modify project scope or pause execution due to budget constraints, we encourage opting for a Project Pause or Scope Amendment rather than full cancellation. Held deposits can be applied toward future phases within 6 months.
              </p>
            </article>

            {/* Section 11 */}
            <article id="section-11" className="cancellation-card">
              <div className="cancellation-section-header">
                <div className="section-number">11</div>
                <h2>Force Majeure & Special Circumstances</h2>
              </div>
              <p>
                In cases where cancellations arise due to legal property title disputes, natural disasters, or unexpected government zoning changes, Construction Solutions & Services will work in good faith to minimize client financial loss and issue maximum allowable refunds for unrendered services.
              </p>
            </article>

            {/* Section 12 */}
            <article id="section-12" className="cancellation-card">
              <div className="cancellation-section-header">
                <div className="section-number">12</div>
                <h2>Contact Cancellation Support</h2>
              </div>
              <p>If you have questions regarding an active cancellation request or refund audit status, please reach out to us:</p>
              <div className="contact-box">
                <h3>Construction Solutions & Services Cancellations Desk</h3>
                <p><strong>Phone:</strong> <a href="tel:9296998511">+91 92969 98511</a></p>
                <p><strong>Email:</strong> <a href="mailto:contructionsolutionsservices@gmail.com">contructionsolutionsservices@gmail.com</a></p>
                <p><strong>Parent Entity:</strong> Construction Solutions & Services (ShareWalls)</p>
                <p><strong>Address:</strong> Harmu Housing basant bihar colony B1 Ranchi 834002</p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
