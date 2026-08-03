"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getHomeData } from "@/app/admin/home/actions";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Compass,
  CheckCircle2,
  Trophy,
  Zap,
  Award,
  Users,
} from "lucide-react";

interface HomeStep {
  id?: number;
  stepNumber: string;
  title: string;
  description: string;
  iconUrl?: string;
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
}

export default function HomePage() {
  const [heroCoverImg, setHeroCoverImg] = useState(
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  );
  const [heroTitle, setHeroTitle] = useState(
    "Designing & Building Architectural Wonders",
  );
  const [heroSubtitle, setHeroSubtitle] = useState(
    "Watch your dream project come to life in real-time. We integrate computational AI design, 3D structural modeling, and high-precision civil construction execution.",
  );
  const [planningP1, setPlanningP1] = useState(
    "Construction Solutions & Services excels in high-precision architectural planning and structural engineering. We deliver comprehensive CAD blueprints, column schedules, lift pit rebar details, and foundation plans tailored to your project’s exact structural load requirements.",
  );
  const [planningP2, setPlanningP2] = useState(
    "Our systematic planning approach optimizes space usage, ensures full building code compliance, and seamlessly connects architectural aesthetics with civil engineering execution for error-free construction.",
  );

  const [steps] = useState<HomeStep[]>([
    {
      stepNumber: "01",
      title: "Raise a Request",
      description:
        "Share your vision and requirements. We’ll begin designing your dream project with precision and creativity.",
    },
    {
      stepNumber: "02",
      title: "Collaborate & Design",
      description:
        "Our team collaborates with you on every detail — creating blueprints that blend style and function.",
    },
    {
      stepNumber: "03",
      title: "Execute & Deliver",
      description:
        "Watch your vision come to life with expert execution, detailed supervision, and timely delivery.",
    },
  ]);

  const [stats, setStats] = useState<HomeStat[]>([
    { value: "150+", label: "Luxury Projects Delivered" },
    { value: "100%", label: "Safety & Compliance Audit" },
    { value: "15 Yrs", label: "Architectural Excellence" },
    { value: "1,500+", label: "Design Concepts" },
  ]);

  const [advantages] = useState<HomeAdvantage[]>([
    {
      title: "Efficiency",
      description:
        "99% reduction in project design and development time through computational CAD modeling.",
    },
    {
      title: "Optimization",
      description:
        "Adaptive architectural blueprints tailored to exact site load requirements.",
    },
    {
      title: "Reliability",
      description:
        "Highest precision designs that are 100% error-free and IS-code compliant.",
    },
    {
      title: "Usability",
      description:
        "Seamless cloud collaboration and real-time 3D building model previews.",
    },
  ]);

  // Load Home data from database via Prisma Server Action
  useEffect(() => {
    async function loadHomeData() {
      try {
        const res = await getHomeData();
        if (res.success && res.data) {
          const { hero, planning, stats: apiStats } = res.data;
          if (hero?.imageUrl) setHeroCoverImg(hero.imageUrl);
          if (hero?.title) setHeroTitle(hero.title);
          if (hero?.subtitle) setHeroSubtitle(hero.subtitle);
          if (planning?.paragraph1) setPlanningP1(planning.paragraph1);
          if (planning?.paragraph2) setPlanningP2(planning.paragraph2);
          if (apiStats && Array.isArray(apiStats) && apiStats.length > 0) {
            setStats(apiStats);
          }
        }
      } catch (err) {
        console.warn("Failed to load Home data via Server Action:", err);
      }
    }

    loadHomeData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-500 selection:text-white pt-6 sm:pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Responsive Hero Section */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-12 lg:p-16 shadow-xl shadow-slate-200/60">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-600 text-xs font-extrabold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                <span>Next-Gen Architectural Studio</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                {heroTitle}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-medium">
                {heroSubtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/service"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-xs shadow-lg shadow-orange-500/25 transition group"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-extrabold text-xs transition"
                >
                  Get a Free Quote
                </Link>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 3D
                  Structural Execution
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> IS-Code
                  Compliant
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100%
                  Precision Engineering
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden border border-slate-200 shadow-2xl group">
                <img
                  src={heroCoverImg}
                  alt="3D Architectural Building Construction"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg">
                  <p className="text-xs font-black text-slate-900">
                    Live 3D Building Construction
                  </p>
                  <p className="text-[11px] text-orange-600 font-bold mt-0.5">
                    High-Precision Structural Framing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Expertise Grid */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              Our Core Expertise
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Delivering full-spectrum architectural design, structural
              engineering, and construction services.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              "Architectural Planning",
              "Civil Construction",
              "BOQ Cost Estimation",
              "Landscape Architecture",
              "Project Management (PMC)",
              "Interior Designing",
              "Building Renovation",
              "Structural Audit",
            ].map((service, idx) => (
              <Link
                key={idx}
                href="/service"
                className="p-5 rounded-2xl border border-slate-200/90 bg-white hover:border-orange-500/40 hover:shadow-lg transition-all duration-200 flex flex-col items-start justify-between group"
              >
                <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold text-xs mb-3 group-hover:scale-110 transition-transform">
                  0{idx + 1}
                </div>
                <span className="text-xs font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                  {service}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Structural Blueprint & CAD Section */}
        <section className="rounded-3xl border border-slate-200/90 bg-white p-8 lg:p-12 shadow-xl shadow-slate-200/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
                <img
                  src="/assets/images/blueprint_structural_plan.png"
                  alt="Architectural Blueprint & Structural Engineering Plan"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=740&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-700 text-xs font-extrabold">
                <Compass className="w-3.5 h-3.5 text-amber-600" />
                <span>CAD Blueprints &amp; Structural Specs</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Precision Structural Planning &amp; CAD Blueprints
              </h2>
              <div
                className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium space-y-2"
                dangerouslySetInnerHTML={{ __html: planningP1 }}
              />
              <div
                className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium"
                dangerouslySetInnerHTML={{ __html: planningP2 }}
              />
            </div>
          </div>
        </section>

        {/* How It Works Timeline */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              How We Turn Visions Into Reality
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              A structured, 3-step workflow engineered for quality,
              transparency, and timely delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200/90 bg-white p-8 space-y-4 shadow-sm hover:shadow-xl transition-all duration-300 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-black text-lg flex items-center justify-center shadow-md shadow-orange-500/20">
                    {step.stepNumber}
                  </div>
                  <Trophy className="w-6 h-6 text-slate-300 group-hover:text-orange-500 transition-colors" />
                </div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Responsive Stats Bar */}
        <section className="rounded-3xl border border-slate-200/90 bg-slate-900 text-white p-8 lg:p-12 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((st, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-orange-500 tracking-tight">
                  {st.value}
                </div>
                <div className="text-xs font-bold text-slate-400">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Advantages Grid */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              Why Partner With Us?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              We bring computational innovation, absolute transparency, and
              structural safety to every project.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((adv, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl border border-slate-200/90 bg-white space-y-3 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center">
                  {idx === 0 ? (
                    <Zap className="w-5 h-5" />
                  ) : idx === 1 ? (
                    <Building2 className="w-5 h-5" />
                  ) : idx === 2 ? (
                    <Award className="w-5 h-5" />
                  ) : (
                    <Users className="w-5 h-5" />
                  )}
                </div>
                <h3 className="text-base font-black text-slate-900">
                  {adv.title}
                </h3>
                <p className="text-xs font-medium text-slate-600 leading-relaxed">
                  {adv.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
