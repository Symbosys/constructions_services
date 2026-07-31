'use client';

import React from 'react';
import Dashboard from '../components/Dashboard';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  return (
    <Dashboard
      setCurrentTab={(tab) => router.push(`/admin/${tab}`)}
      darkMode={true}
    />
  );
}
