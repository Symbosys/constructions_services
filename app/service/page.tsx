'use client';

import React, { useState, useEffect } from 'react';
import { getAllServices } from '@/app/services/actions';

interface ServiceHeroData {
  title?: string;
  paragraph?: string;
  imageUrl?: string;
}

interface ServiceItem {
  id?: number;
  title: string;
  description: string;
  imageUrl: string;
  category?: string;
}

interface ServiceSummaryData {
  paragraph1?: string;
  paragraph2?: string;
  imageUrl?: string;
}

export default function ServicesPage() {
  const [hero] = useState<ServiceHeroData>({
    title: 'Our Services',
    paragraph:
      'Construction Solutions & Services crafts extraordinary spaces through innovative design and cutting-edge craftsmanship, blending luxury with functionality to transform your vision into reality.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  });

  const [items, setItems] = useState<ServiceItem[]>([
    {
      id: 1,
      title: 'Architectural Planning',
      description: 'Envisioning spaces with meticulous blueprints that fuse elegance and precision.',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=740&q=80',
      category: 'Architecture',
    },
    {
      id: 2,
      title: 'Constructions',
      description: 'Erecting iconic structures with unmatched quality and innovative craftsmanship.',
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=740&q=80',
      category: 'Construction',
    },
    {
      id: 3,
      title: 'Estimation',
      description: 'Delivering precise budgets to transform your vision without surprises.',
      imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=740&q=80',
      category: 'Estimation',
    },
  ]);

  const [summary] = useState<ServiceSummaryData>({
    paragraph1:
      '<strong>Construction Solutions & Services</strong> excels in architectural planning, drafting detailed technical blueprints, footing schedules, and rebar CAD specifications that align with your exact functional and structural requirements. Our engineering services ensure an optimized approach, balancing structural integrity with aesthetic perfection.',
    paragraph2:
      'By connecting advanced computational design with site execution, we guarantee that every blueprint, lift pit detail, and column plan translates into a safe, sustainable, and high-performance building.',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=740&q=80',
  });

  // Filter & Pagination States
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);
  const [loading, setLoading] = useState<boolean>(true);

  const categories = ['All', 'Architecture', 'Construction', 'Estimation', 'Interiors', 'Management'];

  // Load Services from database via Prisma Server Action
  useEffect(() => {
    async function loadServices() {
      setLoading(true);
      try {
        const res = await getAllServices();
        if (res.success && res.data && res.data.length > 0) {
          setItems(
            res.data.map((item) => ({
              id: item.id,
              title: item.title,
              description: item.description,
              imageUrl: item.imageUrl,
              category: item.category || 'Architecture',
            }))
          );
        }
      } catch (err) {
        console.warn('Failed to load services via Server Action:', err);
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  // Filter items based on selected category
  const filteredItems = items.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Calculate pagination boundaries
  const totalItems = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  return (
    <main className="main-container">
      {/* Service Hero Section */}
      <section className="services-hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              {hero.title || 'Our Services'}
              <span className="title-glow"></span>
            </h1>
            <p className="hero-paragraph">{hero.paragraph}</p>
          </div>
          <div className="hero-visual">
            <img
              src={hero.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'}
              alt={hero.title || 'Services Hero'}
              className="hero-img"
            />
          </div>
        </div>
      </section>

      {/* Service Showcase Section */}
      <section className="services-showcase-section">
        <div className="showcase-container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <h2 className="showcase-title my-0 text-left">Explore Our Expertise</h2>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 border ${
                    selectedCategory === cat
                      ? 'bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-500/20'
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-orange-500 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center text-slate-400 font-bold text-sm space-y-3">
              <div className="w-10 h-10 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mx-auto" />
              <p>Loading Architectural & Construction Services...</p>
            </div>
          ) : paginatedItems.length === 0 ? (
            <div className="py-20 text-center text-slate-400 bg-slate-900/60 border border-slate-800 rounded-3xl p-8">
              <h3 className="text-lg font-bold text-white mb-2">No Services Found</h3>
              <p className="text-xs">No service offerings available under &quot;{selectedCategory}&quot;.</p>
            </div>
          ) : (
            <div className="services-showcase">
              {paginatedItems.map((item, index) => (
                <div key={item.id || index} className="service-card">
                  <div className="card-image relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="service-img"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=740&q=80';
                      }}
                    />
                    {item.category && (
                      <span className="absolute top-3 left-3 bg-slate-950/80 text-orange-400 text-[10px] font-extrabold px-2.5 py-1 rounded-lg border border-slate-800 backdrop-blur-md">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <div className="card-content">
                    <h3 className="service-title">{item.title}</h3>
                    <p className="service-description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls Bar */}
          {filteredItems.length > 0 && (
            <div className="mt-12 p-4 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-2">
                <span>
                  Showing <strong className="text-white">{startIndex + 1}</strong> to{' '}
                  <strong className="text-white">{endIndex}</strong> of{' '}
                  <strong className="text-orange-500">{totalItems}</strong> services
                </span>

                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="ml-2 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 font-bold focus:outline-none focus:border-orange-500"
                >
                  <option value={6}>6 / page</option>
                  <option value={12}>12 / page</option>
                  <option value={18}>18 / page</option>
                  <option value={50}>50 / page</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={safeCurrentPage <= 1}
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-950 text-slate-200 font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:border-orange-500 transition"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-black transition ${
                      pageNum === safeCurrentPage
                        ? 'bg-orange-600 text-white shadow-md shadow-orange-500/30'
                        : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={safeCurrentPage >= totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-950 text-slate-200 font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:border-orange-500 transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Service Summary Section */}
      <div className="service-summary">
        <div className="summary-container">
          <div className="summary-image">
            <img
              src={summary.imageUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=740&q=80'}
              alt="Structural Blueprint & CAD Planning Showcase"
            />
          </div>
          <div className="summary-text">
            {summary.paragraph1 && (
              <p dangerouslySetInnerHTML={{ __html: summary.paragraph1 }} />
            )}
            {summary.paragraph2 && (
              <p dangerouslySetInnerHTML={{ __html: summary.paragraph2 }} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
