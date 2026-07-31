'use client';

import React, { useState } from 'react';
import ContactMessages from '../components/ContactMessages';

export default function ContactMessagesPage() {
  const [searchTerm] = useState('');
  return <ContactMessages searchTerm={searchTerm} darkMode={true} />;
}
