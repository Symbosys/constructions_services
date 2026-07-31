'use client';

import React from 'react';
import { Search, Menu, Sun, Moon, LogOut, Command, Building2 } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onMenuToggle: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  userEmail: string;
  onLogout: () => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onMenuToggle,
  searchTerm,
  setSearchTerm,
  userEmail,
  onLogout,
  darkMode,
  setDarkMode,
}) => {
  const getTabTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard': return 'Executive Overview';
      case 'services': return 'Services & Blueprints';
      case 'home': return 'Home & 3D WebGL Config';
      case 'contact': return 'Inquiries & Client Leads';
      default: return 'Admin Control Center';
    }
  };

  return (
    <header className={`sticky top-0 z-30 backdrop-blur-2xl border-b px-6 py-4 flex items-center justify-between gap-4 transition-colors duration-300 ${
      darkMode
        ? 'bg-slate-900/80 border-slate-800/80 text-white'
        : 'bg-white/80 border-slate-200/80 text-slate-900 shadow-sm'
    }`}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className={`lg:hidden p-2.5 rounded-2xl border transition ${
            darkMode
              ? 'text-slate-300 hover:text-white bg-slate-800/80 border-slate-700/80'
              : 'text-slate-600 hover:text-slate-900 bg-slate-100 border-slate-300/80'
          }`}
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className={`text-xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {getTabTitle(currentTab)}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20">
              <Building2 className="w-3 h-3" /> ShareWalls CMS
            </span>
          </div>
          <p className={`text-xs font-medium hidden md:block mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Architectural Services & Structural Construction Management Portal
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search Bar with Keyboard Hint */}
        <div className="relative hidden md:block w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search leads, services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-12 py-2 border rounded-2xl text-xs font-medium transition duration-200 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 ${
              darkMode
                ? 'bg-slate-950/70 border-slate-800 text-slate-100 placeholder-slate-500'
                : 'bg-slate-100/80 border-slate-200 text-slate-900 placeholder-slate-400'
            }`}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] font-mono text-slate-400 bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700">
            <Command className="w-2.5 h-2.5" />K
          </span>
        </div>

        {/* Theme Quick Toggle */}
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2.5 rounded-2xl border transition duration-200 flex items-center justify-center ${
            darkMode
              ? 'bg-slate-800/80 text-amber-400 border-slate-700 hover:bg-slate-700'
              : 'bg-slate-100 text-amber-600 border-slate-200 hover:bg-slate-200/80'
          }`}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* User Profile Avatar & Logout */}
        <div className={`flex items-center gap-3 pl-3 border-l ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-yellow-500 text-white font-black text-xs flex items-center justify-center shadow-lg shadow-orange-500/20 ring-2 ring-orange-400/30">
            {(userEmail || 'A').charAt(0).toUpperCase()}
          </div>
          <div className="hidden lg:flex flex-col">
            <span className={`text-xs font-bold leading-tight truncate max-w-[150px] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {userEmail || 'admin@sharewalls.com'}
            </span>
            <span className={`text-[11px] font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Super Administrator
            </span>
          </div>

          <button
            type="button"
            onClick={onLogout}
            title="Sign Out Session"
            className={`p-2.5 rounded-2xl border transition duration-200 text-xs font-bold flex items-center gap-1.5 ${
              darkMode
                ? 'text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border-slate-800 hover:border-rose-500/30'
                : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50 border-slate-200 hover:border-rose-200'
            }`}
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden xl:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
