'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface HomeStep {
  id?: number;
  stepNumber: string;
  title: string;
  description: string;
  iconUrl?: string;
  learnMoreUrl?: string;
}

interface HomeStat {
  id?: number;
  value: string;
  label: string;
}

interface HomeAdvantage {
  id?: number;
  title: string;
  description: string;
  iconUrl?: string;
}

export default function HomePage() {
  // Dynamic State matching Express Backend API (http://localhost:3001/home)
  const [heroCoverImg, setHeroCoverImg] = useState('/assets/images/hero_3d_building_construction.png');
  const [planningP1, setPlanningP1] = useState(
    'House of Arch excels in high-precision architectural planning and structural engineering. We deliver comprehensive CAD blueprints, column schedules, lift pit rebar details, and foundation plans tailored to your project\'s exact structural load requirements.'
  );
  const [planningP2, setPlanningP2] = useState(
    'Our systematic planning approach optimizes space usage, ensures full building code compliance, and seamlessly connects architectural aesthetics with civil engineering execution for error-free construction.'
  );

  const [steps, setSteps] = useState<HomeStep[]>([
    {
      stepNumber: '01',
      title: 'Raise a Request',
      description: 'Share your vision and requirements. We’ll begin designing your dream project with precision and creativity.',
      iconUrl: '/assets/icons/trophy.png',
      learnMoreUrl: '#',
    },
    {
      stepNumber: '02',
      title: 'Collaborate & Design',
      description: 'Our team collaborates with you on every detail — creating blueprints that blend style and function.',
      iconUrl: '/assets/icons/trophy.png',
      learnMoreUrl: '#',
    },
    {
      stepNumber: '03',
      title: 'Execute & Deliver',
      description: 'Watch your vision come to life with expert execution, detailed supervision, and timely delivery.',
      iconUrl: '/assets/icons/trophy.png',
      learnMoreUrl: '#',
    },
  ]);

  const [stats, setStats] = useState<HomeStat[]>([
    { value: '14,000+', label: 'Projects Completed' },
    { value: '140+', label: 'Happy Clients' },
    { value: '1,500+', label: 'Site Visits' },
    { value: '1,500+', label: 'Design Concepts' },
  ]);

  const [advantages, setAdvantages] = useState<HomeAdvantage[]>([
    {
      title: 'Efficiency',
      description: '99% reduction in project design and development time.',
      iconUrl: '/assets/advantages/Efficiency.avif',
    },
    {
      title: 'Optimization',
      description: 'AI leads to greater adaptation to user requirements.',
      iconUrl: '/assets/advantages/optimization.png',
    },
    {
      title: 'Reliability',
      description: 'The resulting designs have the highest precision and are 100% error-free.',
      iconUrl: '/assets/advantages/Reliability.png',
    },
    {
      title: 'Usability',
      description: 'User-friendly and easy to use 24/7 on the cloud, no installation needed.',
      iconUrl: '/assets/advantages/Usability.png',
    },
    {
      title: 'Flexibility',
      description: 'Total adaptation to the regulatory and user design criteria in each project.',
      iconUrl: '/assets/advantages/Flexibility.png',
    },
  ]);

  // Mouse Parallax Effect State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
      const moveY = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fetch Home Data from Express Backend API (http://localhost:3001/home)
  useEffect(() => {
    async function fetchHomeData() {
      try {
        const response = await fetch('http://localhost:3001/home');
        if (!response.ok) return;
        const resData = await response.json();

        if (resData.success && resData.data) {
          const { hero, planning, steps: apiSteps, stats: apiStats, advantages: apiAdvantages } = resData.data;

          if (hero?.imageUrl) setHeroCoverImg(hero.imageUrl);
          if (planning?.paragraph1) setPlanningP1(planning.paragraph1);
          if (planning?.paragraph2) setPlanningP2(planning.paragraph2);
          if (apiSteps && Array.isArray(apiSteps) && apiSteps.length > 0) setSteps(apiSteps);
          if (apiStats && Array.isArray(apiStats) && apiStats.length > 0) setStats(apiStats);
          if (apiAdvantages && Array.isArray(apiAdvantages) && apiAdvantages.length > 0) setAdvantages(apiAdvantages);
        }
      } catch (err) {
        console.warn('Express backend API unreachable, using client defaults:', err);
      }
    }

    fetchHomeData();
  }, []);

  return (
    <main className="main-container">
      {/* Full-Bleed 3D Building Construction Cover Hero Section */}
      <section className="hero-cover-section">
        {/* Full Cover 3D Render Image */}
        <div className="hero-cover-image-wrapper">
          <img
            src={heroCoverImg}
            alt="3D Architectural Building Construction In Progress"
            className="hero-cover-img"
            style={{
              transform: `scale(1.03) translate(${mousePos.x}px, ${mousePos.y}px)`,
            }}
          />
          <div className="hero-cover-overlay"></div>
          {/* AI Laser Scanning Line */}
          <div className="laser-scan-line"></div>
        </div>

        {/* Floating Glassmorphism Hero Content Container */}
        <div className="hero-cover-container">
          <div className="hero-glass-card">
            <div className="hero-badge">
              <span className="badge-dot"></span> Next-Gen AI Architectural Studio
            </div>
            <h1 className="hero-title">
              Designing & Building <span className="gradient-text">Architectural Wonders</span>
            </h1>
            <p className="hero-description">
              Watch your dream project come to life in real-time. We integrate computational AI design, 3D structural modeling, and high-precision civil construction execution.
            </p>
            <div className="hero-cta-group">
              <Link href="/service" className="btn-primary">
                Explore Services <span className="arrow">→</span>
              </Link>
              <Link href="/contact" className="btn-secondary">
                Get a Quote
              </Link>
            </div>
            <div className="hero-features">
              <div className="feature-tag">
                <span className="check-icon">✓</span> 3D Structural Execution
              </div>
              <div className="feature-tag">
                <span className="check-icon">✓</span> Real-Time AI Monitoring
              </div>
              <div className="feature-tag">
                <span className="check-icon">✓</span> 99% Precision Engineering
              </div>
            </div>
          </div>

          {/* Live Floating 3D Construction Stats Badges */}
          <div className="hero-cover-badges">
            <div className="floating-badge badge-3d-live">
              <div className="badge-icon">🏗️</div>
              <div className="badge-info">
                <strong>Building In Progress</strong>
                <span>3D Structural Framing</span>
              </div>
            </div>

            <div className="floating-badge badge-3d-ai">
              <div className="badge-icon">⚡</div>
              <div className="badge-info">
                <strong>AI CAD Specs</strong>
                <span>Live Material Estimation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="services-section">
        <div className="services-header">
          <h1>Our Services</h1>
        </div>

        <div className="services-grid">
          <p className="service-item">Architectural Planning</p>
          <p className="service-item">Construction</p>
          <p className="service-item">Estimation</p>
          <p className="service-item">Landscaping</p>
          <p className="service-item">PMC</p>
          <p className="service-item">Designing</p>
          <p className="service-item">Renovation</p>
          <p className="service-item">Interior</p>
        </div>
      </section>

      {/* Service Planning & Structural Blueprints */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-image">
            <img
              src="/assets/images/blueprint_structural_plan.png"
              alt="Architectural Blueprint & Structural Engineering Plan"
            />
            <div className="about-badge">
              <span className="badge-icon">📐</span> Structural CAD & Blueprint Specs
            </div>
          </div>
          <div className="about-text">
            <h2>Precision Structural Planning & CAD Blueprints</h2>
            <p dangerouslySetInnerHTML={{ __html: planningP1 }} />
            <p dangerouslySetInnerHTML={{ __html: planningP2 }} />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h1 className="section-title">How It Works</h1>

        <div className="timeline">
          {steps.map((step, index) => {
            const sideClass = index % 2 === 0 ? 'left' : 'right';
            return (
              <div key={index} className={`timeline-item ${sideClass}`}>
                <div className="timeline-icon">
                  <img
                    src={step.iconUrl || '/assets/icons/trophy.png'}
                    alt={step.title}
                  />
                </div>
                <div className="timeline-content">
                  <span className="step-number">{step.stepNumber}</span>
                  <h2 className="step-title">{step.title}</h2>
                  <p>{step.description}</p>
                  <a href={step.learnMoreUrl || '#'} className="learn-more">
                    Learn More →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((st, index) => (
            <div key={index} className="stat-box">
              <h1>{st.value}</h1>
              <p>{st.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Advantages Section */}
      <section className="advantages-section">
        <h1 className="advantages-title">There are many advantages</h1>
        <div className="advantage-grid">
          {advantages.map((adv, index) => (
            <div key={index} className="advantage-card">
              <img
                src={adv.iconUrl || '/assets/advantages/Efficiency.avif'}
                alt={adv.title}
                className="advantage-icon"
              />
              <div className="advantage-title">{adv.title}</div>
              <div className="advantage-desc">{adv.description}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
