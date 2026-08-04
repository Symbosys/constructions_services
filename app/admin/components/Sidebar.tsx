'use client';

import React from 'react';
import {
  LayoutDashboard,
  Wrench,
  Home,
  Info,
  Mail,
  FileText,
  ShieldCheck,
  FileCode2,
  Moon,
  Sun,
  LogOut,
  X,
  Layers,
  Activity
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onLogout: () => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  isOpen,
  setIsOpen,
  onLogout,
  darkMode,
  setDarkMode,
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: 'Live' },
    { id: 'services', label: 'Services Manager', icon: Wrench, badge: 'CRUD' },
    // { id: 'home', label: 'Home & 3D Config', icon: Home },
    { id: 'contact', label: 'Inquiries & Leads', icon: Mail, badge: 'Leads' },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 backdrop-blur-2xl border-r flex flex-col p-6 transition-all duration-300 ease-out ${
          darkMode
            ? 'bg-slate-900/95 border-slate-800/80 text-slate-100'
            : 'bg-white/95 border-slate-200/90 text-slate-900 shadow-2xl shadow-slate-200/60'
        } ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand Logo Header */}
        <div
          className={`flex items-center justify-between mb-6 pb-5 border-b ${
            darkMode ? 'border-slate-800/80' : 'border-slate-200/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-orange-500/25 ring-2 ring-orange-400/20 text-white font-black text-xl">
              <Layers className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div
                className={`font-extrabold text-xl tracking-tight leading-none ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                Share<span className="text-orange-500">Walls</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500 bg-orange-500/10 border border-orange-500/30 px-2 py-0.5 rounded-full">
                  Admin CMS v2.4
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className={`lg:hidden p-2 rounded-xl transition ${
              darkMode
                ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/25 border border-orange-400/30'
                    : darkMode
                      ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/90'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isActive
                        ? 'text-white scale-110'
                        : 'group-hover:scale-110'
                    }`}
                  />
                  <span className="tracking-tight">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full transition-colors ${
                      isActive
                        ? 'bg-white/20 text-white backdrop-blur-md'
                        : darkMode
                          ? 'bg-slate-800 text-slate-300 border border-slate-700/60'
                          : 'bg-slate-200/80 text-slate-700 border border-slate-300/80'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer System Status & Controls */}
        <div
          className={`pt-4 mt-auto border-t space-y-3 ${
            darkMode ? 'border-slate-800/80' : 'border-slate-200/80'
          }`}
        >
          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl border text-xs font-bold transition-all duration-200 ${
              darkMode
                ? 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-950'
                : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              {darkMode ? (
                <Moon className="w-4 h-4 text-amber-400 fill-amber-400/20" />
              ) : (
                <Sun className="w-4 h-4 text-orange-500 fill-orange-500/20" />
              )}
              <span>{darkMode ? 'Dark Appearance' : 'Light Appearance'}</span>
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-500 font-bold border border-orange-500/20">
              Toggle
            </span>
          </button>

          {/* System API Status */}
          <div
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl border text-xs ${
              darkMode
                ? 'bg-slate-950/60 border-slate-800/60 text-slate-300'
                : 'bg-slate-50 border-slate-200/80 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-xs flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-emerald-500" />
                API Connected
              </span>
            </div>
            <span className="font-mono text-[10px] font-bold opacity-75 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded-md">
              PORT 3001
            </span>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30 rounded-2xl font-bold text-xs transition duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
