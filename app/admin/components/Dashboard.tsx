'use client';

import React, { useState, useEffect } from 'react';
import apiClient from '../config/apiClient';
import type { ContactMessage, ServiceItem } from '../types/admin';
import { getAllContactMessages } from '@/app/contact/actions';
import { getAllServices } from '@/app/services/actions';
import {
  Zap,
  Wrench,
  Mail,
  Building2,
  ChevronRight,
  TrendingUp,
  Activity
} from 'lucide-react';

interface DashboardProps {
  services?: ServiceItem[];
  messages?: ContactMessage[];
  setCurrentTab: (tab: string) => void;
  darkMode?: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  services: initialServices = [],
  messages: initialMessages = [],
  setCurrentTab,
  darkMode = true,
}) => {
  const [messagesList, setMessagesList] = useState<ContactMessage[]>(initialMessages);
  const [servicesList, setServicesList] = useState<ServiceItem[]>(initialServices);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fallbackServices: ServiceItem[] = [
    {
      id: 1,
      title: 'Structural Architecture & Blueprinting',
      description: 'IS-456 compliant structural blueprints and 3D architectural renders.',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      category: 'Architecture',
    },
    {
      id: 2,
      title: 'Turnkey Commercial Construction',
      description: 'End-to-end execution, civil engineering, BOQ estimation, and site supervision.',
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80',
      category: 'Construction',
    },
    {
      id: 3,
      title: 'Interior Space Planning & 3D Renders',
      description: 'Custom interior layouts, material specs, and high-res architectural renders.',
      imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
      category: 'Interior Design',
    },
  ];

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardData() {

      // 1. Fetch Contact Messages from Database via Server Action
      try {
        const actionRes = await getAllContactMessages();
        if (isMounted) {
          if (actionRes.success && Array.isArray(actionRes.data)) {
            setMessagesList(actionRes.data as ContactMessage[]);
          }
        }
      } catch (err) {
        console.warn('Notice loading contact messages in Dashboard:', err);
      }

      // 2. Fetch Services Catalog via Server Action
      try {
        if (isMounted) {
          if (initialServices.length > 0) {
            setServicesList(initialServices);
          } else {
            try {
              const srvRes = await getAllServices();
              if (srvRes.success && Array.isArray(srvRes.data) && srvRes.data.length > 0) {
                setServicesList(srvRes.data as ServiceItem[]);
              } else {
                setServicesList(fallbackServices);
              }
            } catch {
              setServicesList(fallbackServices);
            }
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const unreadCount = messagesList.filter((m) => m.status === 'unread').length;

  return (
    <div className="space-y-8 w-full block">
      {/* Top Banner Overview */}
      <div
        className={`relative overflow-hidden border rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl transition-colors duration-300 ${
          darkMode
            ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-slate-800 text-white'
            : 'bg-gradient-to-br from-white via-slate-50 to-orange-50/30 border-slate-200 text-slate-900'
        }`}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/30 text-xs font-extrabold uppercase tracking-wider">
              <Zap className="w-4 h-4 shrink-0" />
              <span>System Operational • Prisma Database Active</span>
            </div>
            <h1
              className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Executive Architectural & Civil CMS
            </h1>
            <p
              className={`text-xs sm:text-sm leading-relaxed font-medium ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Manage website offerings, client inquiry leads, company milestones, and dynamic portal content from a unified control center.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setCurrentTab('services')}
              className="px-5 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-orange-500/25 transition-all duration-200 flex items-center gap-2"
            >
              <Wrench className="w-4 h-4 shrink-0" />
              <span>Manage Offerings</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentTab('contact')}
              className={`px-5 py-3 font-extrabold text-xs rounded-2xl border transition-all duration-200 flex items-center gap-2 ${
                darkMode
                  ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
              }`}
            >
              <Mail className="w-4 h-4 text-orange-500 shrink-0" />
              <span>Client Leads ({messagesList.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1: Services */}
        <div
          className={`border rounded-3xl p-6 backdrop-blur-xl transition-all duration-300 group flex flex-col justify-between min-h-[140px] shadow-lg ${
            darkMode
              ? 'bg-slate-900/80 border-slate-800 hover:border-orange-500/40'
              : 'bg-white/95 border-slate-200 hover:border-orange-500/40'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-2xl text-orange-500 group-hover:scale-110 transition-transform">
              <Wrench className="w-5 h-5 shrink-0" />
            </div>
            <span className="text-[11px] font-extrabold text-emerald-500 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3 shrink-0" /> Published
            </span>
          </div>
          <div>
            <div className={`text-3xl sm:text-4xl font-black tracking-tight leading-none ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {servicesList.length}
            </div>
            <p className={`text-xs font-semibold mt-2 leading-tight ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Catalog Services Active
            </p>
          </div>
        </div>

        {/* Metric 2: Inquiries */}
        <div
          className={`border rounded-3xl p-6 backdrop-blur-xl transition-all duration-300 group flex flex-col justify-between min-h-[140px] shadow-lg ${
            darkMode
              ? 'bg-slate-900/80 border-slate-800 hover:border-orange-500/40'
              : 'bg-white/95 border-slate-200 hover:border-orange-500/40'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-500 group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5 shrink-0" />
            </div>
            <span
              className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full border ${
                unreadCount > 0
                  ? 'text-amber-500 bg-amber-500/10 border-amber-500/30'
                  : 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30'
              }`}
            >
              {unreadCount} Unread
            </span>
          </div>
          <div>
            <div className={`text-3xl sm:text-4xl font-black tracking-tight leading-none ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {messagesList.length}
            </div>
            <p className={`text-xs font-semibold mt-2 leading-tight ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Total Client Inquiries
            </p>
          </div>
        </div>

        {/* Metric 3: Structural Blueprints */}
        <div
          className={`border rounded-3xl p-6 backdrop-blur-xl transition-all duration-300 group flex flex-col justify-between min-h-[140px] shadow-lg ${
            darkMode
              ? 'bg-slate-900/80 border-slate-800 hover:border-orange-500/40'
              : 'bg-white/95 border-slate-200 hover:border-orange-500/40'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-500 group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5 shrink-0" />
            </div>
            <span className="text-[11px] font-extrabold text-blue-500 bg-blue-500/10 border border-blue-500/30 px-2.5 py-1 rounded-full">
              IS-456 Verified
            </span>
          </div>
          <div>
            <div className={`text-3xl sm:text-4xl font-black tracking-tight leading-none ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              14,000+
            </div>
            <p className={`text-xs font-semibold mt-2 leading-tight ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Structural Blueprints
            </p>
          </div>
        </div>

        {/* Metric 4: CMS Engine Status */}
        <div
          className={`border rounded-3xl p-6 backdrop-blur-xl transition-all duration-300 group flex flex-col justify-between min-h-[140px] shadow-lg ${
            darkMode
              ? 'bg-slate-900/80 border-slate-800 hover:border-orange-500/40'
              : 'bg-white/95 border-slate-200 hover:border-orange-500/40'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-purple-500 group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5 shrink-0" />
            </div>
            <span className="text-[11px] font-extrabold text-purple-500 bg-purple-500/10 border border-purple-500/30 px-2.5 py-1 rounded-full">
              Live DB
            </span>
          </div>
          <div>
            <div className={`text-3xl sm:text-4xl font-black tracking-tight leading-none ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Active
            </div>
            <p className={`text-xs font-semibold mt-2 leading-tight ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              CMS Data Pipeline
            </p>
          </div>
        </div>
      </div>

      {/* Content Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Client Leads Table (2 Columns) */}
        <div
          className={`lg:col-span-2 border rounded-3xl p-6 backdrop-blur-xl space-y-4 shadow-xl ${
            darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/95 border-slate-200'
          }`}
        >
          <div
            className={`flex items-center justify-between pb-4 border-b ${
              darkMode ? 'border-slate-800' : 'border-slate-200'
            }`}
          >
            <div>
              <h2 className={`text-lg font-black leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Recent Client Inquiries
              </h2>
              <p className={`text-xs font-medium mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Leads captured live from website contact portal
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCurrentTab('contact')}
              className="text-xs font-extrabold text-orange-500 hover:text-orange-600 flex items-center gap-1 transition shrink-0"
            >
              <span>View All Leads ({messagesList.length})</span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </button>
          </div>

          <div className="overflow-x-auto">
            {messagesList.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs font-medium">
                No user inquiries captured yet.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead
                  className={`text-[11px] font-extrabold uppercase tracking-wider border-b ${
                    darkMode
                      ? 'bg-slate-950/80 text-slate-400 border-slate-800'
                      : 'bg-slate-100/80 text-slate-500 border-slate-200'
                  }`}
                >
                  <tr>
                    <th className="px-4 py-3.5 rounded-l-2xl">Client Name</th>
                    <th className="px-4 py-3.5">Contact Detail</th>
                    <th className="px-4 py-3.5">Domain</th>
                    <th className="px-4 py-3.5 rounded-r-2xl">Status</th>
                  </tr>
                </thead>
                <tbody className={`divide-y text-xs ${darkMode ? 'divide-slate-800/50' : 'divide-slate-200/80'}`}>
                  {messagesList.slice(0, 5).map((msg) => (
                    <tr
                      key={msg.id}
                      className={`transition duration-150 ${
                        darkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="px-4 py-4 align-middle">
                        <div className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                          {msg.name}
                        </div>
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <div className={`font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                          {msg.email}
                        </div>
                        <div className="text-slate-400 font-mono text-[11px] mt-0.5">{msg.phone || 'No phone'}</div>
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <span className="inline-block text-[11px] font-extrabold px-2.5 py-1 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20 whitespace-nowrap">
                          {msg.domain || 'General'}
                        </span>
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <span
                          className={`inline-block text-[11px] font-extrabold px-2.5 py-1 rounded-full capitalize whitespace-nowrap ${
                            msg.status === 'unread'
                              ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                              : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                          }`}
                        >
                          {msg.status || 'unread'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Active Offerings Catalog Preview (1 Column) */}
        <div
          className={`border rounded-3xl p-6 backdrop-blur-xl space-y-4 shadow-xl ${
            darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/95 border-slate-200'
          }`}
        >
          <div
            className={`flex items-center justify-between pb-3 border-b ${
              darkMode ? 'border-slate-800' : 'border-slate-200'
            }`}
          >
            <div>
              <h2 className={`text-lg font-black leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Active Offerings
              </h2>
              <p className={`text-xs font-medium mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Live published catalog
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCurrentTab('services')}
              className="text-xs font-extrabold text-orange-500 hover:text-orange-600 flex items-center gap-1 transition shrink-0"
            >
              <span>Edit</span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </button>
          </div>

          <div className="space-y-3">
            {servicesList.slice(0, 4).map((service) => (
              <div
                key={service.id}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border transition ${
                  darkMode
                    ? 'bg-slate-950/60 border-slate-800/60 hover:border-slate-700'
                    : 'bg-slate-50 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className={`text-xs font-extrabold truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {service.title}
                  </h3>
                  <p className={`text-[11px] font-medium truncate mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {service.description}
                  </p>
                </div>
                <span className="text-[10px] font-extrabold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 shrink-0">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
