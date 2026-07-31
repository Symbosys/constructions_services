'use client';

import React, { useState, useEffect } from 'react';
import { getContactInfo, submitContactMessage } from './actions';

interface ContactInfo {
  phone?: string;
  email?: string;
  fax?: string;
  address?: string;
}

export default function ContactPage() {
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [domain, setDomain] = useState('');
  const [message, setMessage] = useState('');

  // Submit Feedback & Loading State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Dynamic Contact Info State (Phone, Email, Fax, Address)
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: '+91 92969 98511',
    email: 'contructionsolutionsservices@gmail.com',
    fax: '+1 (800) 555-5678',
    address: 'Harmu Housing basant bihar colony B1 Ranchi 834002',
  });

  // Fetch dynamic company contact details on mount using Server Action
  useEffect(() => {
    async function fetchContactInfo() {
      try {
        const res = await getContactInfo();
        if (res.success && res.data) {
          setContactInfo(res.data);
        }
      } catch (err) {
        console.warn('Failed to fetch contact info via Server Action:', err);
      }
    }

    fetchContactInfo();
  }, []);

  // Handle Form Submission using Server Action
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setFeedback({ type: 'error', text: 'Please fill in all required fields (Name, Email, Message).' });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitContactMessage({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        domain: domain.trim() || undefined,
        message: message.trim(),
      });

      if (res.success) {
        setFeedback({
          type: 'success',
          text: res.message,
        });
        setName('');
        setEmail('');
        setPhone('');
        setDomain('');
        setMessage('');
      } else {
        setFeedback({
          type: 'error',
          text: res.message,
        });
      }
    } catch (err) {
      console.error('Error submitting contact form via Server Action:', err);
      setFeedback({
        type: 'error',
        text: 'Unable to submit message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="main-container">
      {/* Hero Section */}
      <section className="contact-hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Connect with Your Design Vision
              <span className="title-glow"></span>
            </h1>
            <p className="hero-subtitle">
              Let Construction Solutions & Services transform your space into a masterpiece. Reach out to start your journey with luxury and innovation.
            </p>
            <a href="#contact-form" className="hero-cta">Get in Touch</a>
          </div>
          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="Luxury Interior Architecture"
              className="hero-img"
            />
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section" id="contact-form">
        <div className="form-overlay"></div>
        <div className="form-container">
          <h2 className="form-title">
            Send Us a Message
            <span className="title-glow"></span>
          </h2>

          {feedback && (
            <div
              className={`mb-6 p-4 rounded-xl text-sm font-semibold text-center border ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-rose-50 text-rose-800 border-rose-300'
              }`}
            >
              {feedback.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="form-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="form-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="form-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your Phone Number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="domain">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="form-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01" />
                </svg>
                Domain
              </label>
              <input
                type="text"
                id="domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="Your Domain (e.g., Architecture)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="form-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
                </svg>
                Message *
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Message"
                rows={5}
                required
              />
            </div>

            <div className="form-button">
              <button type="submit" disabled={isSubmitting} className="form-submit">
                {isSubmitting ? 'Submitting Inquiry...' : 'Contact'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Reach Us with Ease Cards Section */}
      <section className="contact-cards-section">
        <div className="cards-overlay"></div>
        <div className="cards-container">
          <h2 className="cards-title">
            Reach Us with Ease
            <span className="title-glow"></span>
          </h2>
          <div className="cards-grid">
            {/* Phone Card */}
            <div className="contact-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="card-title">Phone</h3>
              <p className="card-details">{contactInfo.phone}</p>
            </div>

            {/* Email Card */}
            <div className="contact-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 9l7 4 7-4" />
                </svg>
              </div>
              <h3 className="card-title">Email</h3>
              <p className="card-details">{contactInfo.email}</p>
            </div>

            {/* Fax Card */}
            <div className="contact-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l4-4h.586A1.994 1.994 0 009 12.586" />
                </svg>
              </div>
              <h3 className="card-title">Fax</h3>
              <p className="card-details">{contactInfo.fax}</p>
            </div>

            {/* Address Card */}
            <div className="contact-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="card-title">Address</h3>
              <p className="card-details">{contactInfo.address}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
