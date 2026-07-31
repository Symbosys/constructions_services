'use client';

import React, { useState } from 'react';
import ServicesPage from '../components/ServicesPage';

export default function ServicesAdminPage() {
  const [searchTerm] = useState('');
  return <ServicesPage searchTerm={searchTerm} darkMode={true} />;
}
