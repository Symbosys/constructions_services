'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from './components/Sidebar';
import { Navbar as AdminNavbar } from './components/Navbar';
import { adminLogoutAction } from './actions/authActions';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  // Hide admin layout structure for login page
  const isLoginPage = pathname === '/admin/login';
  if (isLoginPage) {
    return <div className="min-h-screen bg-slate-950 text-slate-100">{children}</div>;
  }

  // Determine current tab from route path (e.g., /admin/dashboard -> 'dashboard')
  const currentTab = pathname?.split('/')[2] || 'dashboard';

  const handleTabChange = (tab: string) => {
    router.push(`/admin/${tab}`);
  };

  const handleLogout = async () => {
    await adminLogoutAction();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_token');
      localStorage.removeItem('token');
      localStorage.removeItem('admin_email');
    }
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Admin Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onLogout={handleLogout}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Content Area next to Sidebar */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Sticky Admin Header */}
        <AdminNavbar
          currentTab={currentTab}
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          userEmail="admin@sharewalls.com"
          onLogout={handleLogout}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Page View Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
