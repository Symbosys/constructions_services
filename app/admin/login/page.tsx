'use client';

import React, { useState } from 'react';
import Login from '../components/Login';

export default function LoginPage() {
  const [darkMode, setDarkMode] = useState(true);

  const handleSuccess = (email: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin';
    }
  };

  return (
    <Login
      onLoginSuccess={handleSuccess}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />
  );
}
