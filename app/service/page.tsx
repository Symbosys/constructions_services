'use client';

import React, { useState, useEffect } from 'react';
import { getAllServices } from '@/app/services/actions';
import {
  Sparkles,
  Search,
  LayoutGrid,
  List,
  Building2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Compass,
  FileCheck2,
  ArrowUpRight
} from 'lucide-react';

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
    title: 'Our Architectural & Construction Services',
    paragraph:
      'Crafting extraordinary living spaces through innovative 3D blueprints, structural engineering, and luxury civil construction.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  });

  const [items, setItems] = useState<ServiceItem[]>([
    {
      id: 1,
      title: 'Architectural Blueprint Planning',
      description: 'IS-code compliant 2D floor plans, 3D architectural elevations, and structural detailing for modern homes.',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=740&q=80',
      category: 'Architecture',
    },
    {
      id: 2,
      title: 'Civil Construction & Contracting',
      description: 'End-to-end building construction, reinforced concrete foundations, and site supervision.',
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=740&q=80',
      category: 'Construction',
    },
    {
      id: 3,
      title: 'Cost Estimation & Structural Audit',
      description: 'BOQ calculations, material budgeting, and structural safety load audits to eliminate cost surprises.',
      imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=740&q=80',
      category: 'Estimation',
    },
  ]);

  const [summary] = useState<ServiceSummaryData>({
    paragraph1:
      '<strong>Construction Solutions & Services</strong> excels in architectural planning, drafting detailed technical blueprints, footing schedules, and rebar CAD specifications that align with your exact functional and structural requirements.',
    paragraph2:
      'By connecting advanced computational design with site execution, we guarantee that every blueprint, lift pit detail, and column plan translates into a safe, sustainable, and high-performance building.',
    imageUrl: '/assets/images/blueprint_structural_plan.png',
  });

  // Filter & Pagination States
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
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
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
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

  // Filter items based on selected category & search query
  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Reset page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  // Calculate pagination boundaries
  const totalItems = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-500 selection:text-white pt-6 sm:pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Modern Hero Section - Light Theme */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-12 lg:p-14 shadow-xl shadow-slate-200/60">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-600 text-xs font-extrabold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                <span>Premier Construction & Engineering</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                {hero.title || 'Our Services'}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-medium">
                {hero.paragraph}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-orange-500" />
                  <span>IS-Code Compliant</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
                  <Compass className="w-4 h-4 text-amber-500" />
                  <span>3D Elevations & BOQ</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xl group">
                <img
                  src={hero.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'}
                  alt={hero.title || 'Services Hero'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg">
                  <p className="text-xs font-extrabold text-slate-900">Architectural & Structural Excellence</p>
                  <p className="text-[11px] text-orange-600 font-bold mt-0.5">End-to-End Building Solutions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Controls & Catalog Section */}
        <section className="space-y-6">
          {/* Header Bar with Search & View Mode */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-lg shadow-slate-200/50">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Explore Our Offerings</h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Browse through our catalog of architectural blueprints, civil engineering, and estimation services.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search offerings..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:border-orange-500 transition"
                />
              </div>

              {/* View Switcher Buttons */}
              <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    viewMode === 'grid' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    viewMode === 'list' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-200 shrink-0 border ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white border-orange-400/40 shadow-md shadow-orange-500/25 scale-105'
                      : 'bg-white text-slate-600 border-slate-200/90 hover:bg-slate-100 hover:text-slate-900 shadow-xs'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Catalog Content Grid / List */}
          {loading ? (
            <div className="py-24 text-center text-slate-500 font-bold text-xs space-y-4 rounded-3xl bg-white border border-slate-200 shadow-md">
              <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mx-auto" />
              <p className="uppercase tracking-widest">Loading Architectural Catalog...</p>
            </div>
          ) : paginatedItems.length === 0 ? (
            <div className="py-20 text-center bg-white border border-slate-200 rounded-3xl p-8 space-y-3 shadow-md">
              <Building2 className="w-12 h-12 text-orange-500/60 mx-auto" />
              <h3 className="text-base font-black text-slate-900">No Matching Offerings Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No services found for category &quot;{selectedCategory}&quot; {searchTerm && `matching "${searchTerm}"`}.
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedItems.map((item, index) => (
                <div
                  key={item.id || index}
                  className="group rounded-3xl border border-slate-200/90 bg-white overflow-hidden flex flex-col justify-between hover:border-orange-500/40 transition-all duration-300 shadow-sm hover:shadow-xl"
                >
                  <div>
                    <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=740&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                      {item.category && (
                        <span className="absolute top-4 left-4 text-[10px] font-extrabold px-3 py-1 rounded-full bg-white/90 text-orange-600 border border-slate-200 shadow-md backdrop-blur-md">
                          {item.category}
                        </span>
                      )}
                    </div>

                    <div className="p-6 space-y-2">
                      <h3 className="text-base font-black text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs font-medium text-slate-600 leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 px-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                      <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" /> Verified Blueprint
                    </span>
                    <a
                      href="/contact"
                      className="text-xs font-extrabold text-orange-600 hover:text-orange-700 flex items-center gap-1 transition"
                    >
                      Inquire <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden divide-y divide-slate-100 shadow-sm">
              {paginatedItems.map((item, index) => (
                <div
                  key={item.id || index}
                  className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=740&q=80';
                      }}
                    />
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-black text-slate-900 truncate">{item.title}</h3>
                        {item.category && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-600 border border-orange-500/20 shrink-0">
                            {item.category}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-slate-600 line-clamp-1">{item.description}</p>
                    </div>
                  </div>

                  <a
                    href="/contact"
                    className="px-4 py-2 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 border border-orange-500/30 text-xs font-extrabold transition shrink-0 self-end sm:self-auto flex items-center gap-1"
                  >
                    Get Estimate <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls Bar */}
          {filteredItems.length > 0 && (
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <span>
                  Showing <strong className="text-slate-900">{startIndex + 1}</strong> to{' '}
                  <strong className="text-slate-900">{endIndex}</strong> of{' '}
                  <strong className="text-orange-600">{totalItems}</strong> services
                </span>

                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="ml-2 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 font-bold focus:outline-none focus:border-orange-500"
                >
                  <option value={6}>6 per page</option>
                  <option value={12}>12 per page</option>
                  <option value={18}>18 per page</option>
                  <option value={50}>50 per page</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={safeCurrentPage <= 1}
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:border-orange-500 transition flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-black transition ${
                      pageNum === safeCurrentPage
                        ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md shadow-orange-500/25'
                        : 'bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={safeCurrentPage >= totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:border-orange-500 transition flex items-center gap-1"
                >
                  Next <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Structural Blueprint & Engineering Summary */}
        <section className="rounded-3xl border border-slate-200/90 bg-white p-8 lg:p-12 shadow-xl shadow-slate-200/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
                <img
                  src={summary.imageUrl || '/assets/images/blueprint_structural_plan.png'}
                  alt="Structural Blueprint & CAD Planning Showcase"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=740&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Architectural CAD Blueprint & Civil Supervision
              </h3>
              {summary.paragraph1 && (
                <div
                  className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium"
                  dangerouslySetInnerHTML={{ __html: summary.paragraph1 }}
                />
              )}
              {summary.paragraph2 && (
                <div
                  className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium"
                  dangerouslySetInnerHTML={{ __html: summary.paragraph2 }}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
