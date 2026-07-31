'use client';

import React, { useState, useEffect } from 'react';

interface TimelineMilestone {
  id?: number;
  year: string;
  description: string;
  imageUrl?: string;
}

export default function AboutPage() {
  // Dynamic state matching Express Backend API (http://localhost:3001/about)
  const [aboutTitle, setAboutTitle] = useState('About Us');
  const [aboutParagraph, setAboutParagraph] = useState(
    'Construction Solutions & Services is a premier technology-driven architectural & civil construction firm specialized in computational design, 3D structural modeling, and luxury building execution.'
  );
  const [aboutImageUrl, setAboutImageUrl] = useState('/assets/images/about_hero_villa.png');

  const [missionTitle, setMissionTitle] = useState('Our Mission');
  const [missionContent, setMissionContent] = useState(
    'We aim to create rewarding experiences by combining functionality, innovation, and high-quality design. Every interaction with our partners and clients should be memorable—a talk of a lifetime.'
  );

  const [visionTitle, setVisionTitle] = useState('Our Vision');
  const [visionContent, setVisionContent] = useState(
    'We aspire to be a reputable, sustainable, and desirable premier luxurious interior design firm globally. Our state-of-the-art designs and superior quality finishing set new standards. Our history and cultural values continue to guide us toward excellence. At Construction Solutions & Services, we turn spaces into masterpieces, leaving a lasting impression on those who inhabit them. 🌟🏢'
  );

  const [timeline, setTimeline] = useState<TimelineMilestone[]>([
    {
      year: '2022',
      description: 'Foundational research in computational BIM modeling and civil structural planning.',
    },
    {
      year: '2023',
      description: 'Expanded operations across Ranchi and East India, delivering high-precision architectural blueprints.',
    },
    {
      year: '2024',
      description: 'Integrated AI CAD specs and real-time 3D building construction monitoring.',
    },
    {
      year: '2025',
      description: 'Construction Solutions & Services was founded to disrupt the home interiors & building construction industry, turning spaces into masterpieces with innovation and luxury.',
      imageUrl: 'https://img.freepik.com/premium-photo/grey-rustic-marble-texture-background-high-resolution-italian-random-matt-ai-generated_994744-13456.jpg?ga=GA1.1.1753781777.1731892754&semt=ais_country_boost&w=740',
    },
  ]);

  // Fetch About Data from Express Backend API (http://localhost:3001/about)
  useEffect(() => {
    async function fetchAboutData() {
      try {
        const response = await fetch('http://localhost:3001/about');
        if (!response.ok) return;
        const resData = await response.json();

        if (resData.success && resData.data) {
          const { about, timeline: apiTimeline } = resData.data;

          if (about) {
            if (about.title) setAboutTitle(about.title);
            if (about.paragraph) setAboutParagraph(about.paragraph);
            if (about.imageUrl) setAboutImageUrl(about.imageUrl);
            if (about.missionTitle) setMissionTitle(about.missionTitle);
            if (about.missionContent) setMissionContent(about.missionContent);
            if (about.visionTitle) setVisionTitle(about.visionTitle);
            if (about.visionContent) setVisionContent(about.visionContent);
          }

          if (apiTimeline && Array.isArray(apiTimeline) && apiTimeline.length > 0) {
            setTimeline(apiTimeline);
          }
        }
      } catch (err) {
        console.warn('Express backend API at http://localhost:3001/about unreachable, using fallback state:', err);
      }
    }

    fetchAboutData();
  }, []);

  return (
    <div className="main-container">
      {/* About Hero Section */}
      <section className="about-hero-section">
        <div className="about-page-text">
          <h1 className="about-title">
            {aboutTitle}
            <span className="title-underline"></span>
          </h1>
          <p
            className="about-paragraph"
            dangerouslySetInnerHTML={{ __html: aboutParagraph }}
          />
        </div>
        <div className="about-image-wrapper">
          <div className="image-overlay"></div>
          <img
            src={aboutImageUrl}
            alt={aboutTitle}
            className="about-image"
          />
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="journey-section">
        <div className="journey-container">
          {/* Mission Card */}
          <div className="journey-card mission-card">
            <div className="card-content">
              <h1 className="journey-title">
                {missionTitle}
                <span className="title-underline"></span>
              </h1>
              <p>{missionContent}</p>
            </div>
            <div className="card-icon">
              <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Vision Card */}
          <div className="journey-card vision-card">
            <div className="card-content">
              <h1 className="journey-title">
                {visionTitle}
                <span className="title-underline"></span>
              </h1>
              <p>{visionContent}</p>
            </div>
            <div className="card-icon">
              <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Our Growth Journey Section */}
      <section className="growth-section">
        <div className="growth-overlay"></div>
        <div className="growth-container">
          <h1 className="growth-title">
            Our Growth Journey
            <span className="title-glow"></span>
          </h1>
          <div className="growth-timeline">
            {timeline.map((item, index) => {
              const sideClass = index % 2 === 0 ? 'left' : 'right';
              return (
                <div key={index} className="growth-timeline-item" data-year={item.year}>
                  <div className="growth-timeline-dot"></div>
                  <div className={`growth-timeline-content ${sideClass}`}>
                    <h2 className="timeline-year">{item.year}</h2>
                    <p>{item.description}</p>
                    {item.imageUrl && (
                      <div className="timeline-visual">
                        <img
                          src={item.imageUrl}
                          alt={`${item.year} Showcase`}
                          className="timeline-img"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
