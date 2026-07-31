'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Login from '../components/Login';

export default function LoginPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);

  const handleSuccess = (email: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_email', email);
    }
    router.push('/admin/dashboard');
  };

  return (
    <Login
      onLoginSuccess={handleSuccess}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />
  );
}
