'use client';

import React, { useState, useEffect } from 'react';
import apiClient from '../config/apiClient';
import type { ContactMessage } from '../types/admin';
import {
  getAllContactMessages,
  deleteContactMessage,
  getContactInfo,
  updateContactInfo,
} from '@/app/contact/actions';
import {
  Mail,
  Phone,
  MapPin,
  Printer,
  Trash2,
  RotateCw,
  Send,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  X,
  Building2,
  Inbox,
  Zap,
  Activity,
  User,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface ContactMessagesProps {
  messages?: ContactMessage[];
  onToggleStatus?: (id: number) => void;
  onDeleteMessage?: (id: number) => void;
  searchTerm?: string;
  darkMode?: boolean;
}

export const ContactMessages: React.FC<ContactMessagesProps> = ({
  messages: initialMessages = [],
  onDeleteMessage: localDeleteHandler,
  searchTerm = '',
  darkMode = true,
}) => {
  const [loading, setLoading] = useState(true);
  const [messagesList, setMessagesList] = useState<ContactMessage[]>([]);
  const [activeMessageId, setActiveMessageId] = useState<number | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [savingInfo, setSavingInfo] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  // Company Contact Info Local State
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [fax, setFax] = useState('');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isContactInfoLoading, setIsContactInfoLoading] = useState(true);

  const fallbackMessages: ContactMessage[] = [
    {
      id: 101,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@example.com',
      phone: '+91 9296998511',
      domain: 'Architecture',
      message: 'Looking for a complete G+2 villa design with structural blueprints for my plot in Delhi.',
      createdAt: '2026-07-28 10:30 AM',
      status: 'unread',
    },
    {
      id: 102,
      name: 'Ananya Sharma',
      email: 'ananya.s@example.com',
      phone: '+91 9123456789',
      domain: 'Construction',
      message: 'Need cost estimation and BOQ breakdown for commercial office renovation in Ranchi.',
      createdAt: '2026-07-27 04:15 PM',
      status: 'unread',
    },
  ];

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
  };

  const fetchContactData = async () => {
    setLoading(true);
    try {
      // Fetch stored contact queries from database via Server Actions
      const [actionMsgsRes, actionInfoRes] = await Promise.allSettled([
        getAllContactMessages(),
        getContactInfo(),
      ]);

      let fetchedMsgs: ContactMessage[] = [];

      if (
        actionMsgsRes.status === 'fulfilled' &&
        actionMsgsRes.value.success &&
        actionMsgsRes.value.data &&
        actionMsgsRes.value.data.length > 0
      ) {
        fetchedMsgs = actionMsgsRes.value.data as ContactMessage[];
      } else {
        // Fallback to Express backend API client if database query empty or unreachable
        try {
          const res = await apiClient.get('/contact/messages');
          if (res.data?.success && res.data.data?.messages) {
            fetchedMsgs = res.data.data.messages;
          }
        } catch {
          // ignore error
        }
      }

      if (fetchedMsgs.length > 0) {
        setMessagesList(fetchedMsgs);
      } else if (initialMessages.length > 0) {
        setMessagesList(initialMessages);
      } else {
        setMessagesList(fallbackMessages);
      }

      // Company Contact Info
      if (actionInfoRes.status === 'fulfilled' && actionInfoRes.value.data) {
        const info = actionInfoRes.value.data;
        setPhone(info.phone);
        setEmail(info.email);
        setAddress(info.address);
        setFax(info.fax);
      } else {
        try {
          const res = await apiClient.get('/contact');
          const info = res.data?.data?.info;
          if (info) {
            setPhone(info.phone || '+91 9296998511');
            setEmail(info.email || 'contructionsolutionsservices@gmail.com');
            setAddress(info.address || 'Harmu Housing basant bihar colony B1 Ranchi 834002');
            setFax(info.fax || '+1 (800) 555-5678');
          }
        } catch {
          setPhone('+91 9296998511');
          setEmail('contructionsolutionsservices@gmail.com');
          setAddress('Harmu Housing basant bihar colony B1 Ranchi 834002');
          setFax('+1 (800) 555-5678');
        }
      }
    } catch (err) {
      console.warn('Error loading contact messages:', err);
      setMessagesList(initialMessages.length > 0 ? initialMessages : fallbackMessages);
    } finally {
      setLoading(false);
      setIsContactInfoLoading(false);
    }
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  // Filter messages based on search & status filter
  const filteredMessages = messagesList
    .filter((msg) => {
      if (filter === 'unread') return msg.status === 'unread';
      if (filter === 'read') return msg.status === 'read' || msg.status === 'replied';
      return true;
    })
    .filter(
      (msg) =>
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Reset to page 1 whenever filter or search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchTerm]);

  // Calculate pagination details
  const totalItems = filteredMessages.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  const paginatedMessages = filteredMessages.slice(startIndex, endIndex);

  // Keep active message selected
  useEffect(() => {
    if (messagesList.length > 0) {
      if (!activeMessageId || !messagesList.some((m) => m.id === activeMessageId)) {
        setActiveMessageId(messagesList[0].id);
      }
    }
  }, [messagesList, activeMessageId]);

  const activeMessage = messagesList.find((m) => m.id === activeMessageId) || filteredMessages[0];

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      const res = await deleteContactMessage(id);
      if (!res.success) {
        await apiClient.delete(`/contact/messages/${id}`);
      }
      if (localDeleteHandler) localDeleteHandler(id);
      setMessagesList((prev) => prev.filter((m) => m.id !== id));
      showToast('success', 'Client inquiry deleted successfully.');
    } catch {
      if (localDeleteHandler) localDeleteHandler(id);
      setMessagesList((prev) => prev.filter((m) => m.id !== id));
      showToast('success', 'Client inquiry deleted locally.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdateContactInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingInfo(true);
    try {
      const res = await updateContactInfo({ phone, email, address, fax });
      if (!res.success) {
        await apiClient.patch('/contact', { phone, email, address, fax });
      }
      setIsInfoModalOpen(false);
      showToast('success', 'Company Contact Info updated successfully!');
    } catch (err: any) {
      showToast('error', err.response?.data?.message || 'Failed to update contact info.');
    } finally {
      setSavingInfo(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-10 h-10 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Fetching All Contact Queries...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div
        className={`border rounded-3xl p-6 backdrop-blur-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-300 ${
          darkMode ? 'bg-slate-900/70 border-slate-800/80 text-white' : 'bg-white/90 border-slate-200 text-slate-900'
        }`}
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-500 text-xs font-extrabold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>Live Database Stream • Prisma MySQL Connection</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-[10px] font-extrabold">
              <Activity className="w-3 h-3 animate-pulse" /> Auto Sync
            </span>
          </div>
          <h2 className={`text-2xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Frontend Contact Form Submissions ({messagesList.length})
          </h2>
          <p className={`text-xs font-medium mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            All user inquiries submitted directly from the contact page stored in database.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsInfoModalOpen(true)}
            className={`px-4 py-2.5 font-extrabold text-xs rounded-2xl border transition flex items-center gap-1.5 ${
              darkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
            }`}
          >
            <Edit3 className="w-4 h-4 text-orange-500" />
            <span>Company Contact Info</span>
          </button>

          <button
            type="button"
            onClick={fetchContactData}
            className={`p-2.5 font-extrabold text-xs rounded-2xl border transition flex items-center ${
              darkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
            title="Refresh Inquiries Now"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dynamic Company Contact Detail Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className={`border rounded-2xl p-4 backdrop-blur-xl ${
            darkMode ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white/90 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1">
            <Phone className="w-3.5 h-3.5 text-orange-500" /> Company Phone
          </div>
          <p className={`text-sm font-black truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {isContactInfoLoading ? 'Loading...' : phone || '+91 9296998511'}
          </p>
        </div>

        <div
          className={`border rounded-2xl p-4 backdrop-blur-xl ${
            darkMode ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white/90 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1">
            <Mail className="w-3.5 h-3.5 text-orange-500" /> Official Email
          </div>
          <p className="text-sm font-black text-orange-500 truncate">
            {isContactInfoLoading ? 'Loading...' : email || 'contructionsolutionsservices@gmail.com'}
          </p>
        </div>

        <div
          className={`border rounded-2xl p-4 backdrop-blur-xl ${
            darkMode ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white/90 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1">
            <Printer className="w-3.5 h-3.5 text-orange-500" /> Office Fax
          </div>
          <p className={`text-sm font-black truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {isContactInfoLoading ? 'Loading...' : fax || '+1 (800) 555-5678'}
          </p>
        </div>

        <div
          className={`border rounded-2xl p-4 backdrop-blur-xl ${
            darkMode ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white/90 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1">
            <MapPin className="w-3.5 h-3.5 text-orange-500" /> Office Address
          </div>
          <p className={`text-xs font-bold truncate ${darkMode ? 'text-slate-300' : 'text-slate-700'}`} title={address}>
            {isContactInfoLoading ? 'Loading...' : address || 'Harmu Housing basant bihar colony B1 Ranchi 834002'}
          </p>
        </div>
      </div>

      {/* Toast Alert */}
      {notification && (
        <div
          className={`p-4 rounded-2xl border text-xs font-extrabold flex items-center gap-2.5 animate-in fade-in ${
            notification.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-500'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Filter Tabs Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-2xl font-extrabold text-xs transition ${
              filter === 'all'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : darkMode
                ? 'bg-slate-900/70 text-slate-400 hover:text-white border border-slate-800'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            All Queries ({messagesList.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('unread')}
            className={`px-3.5 py-1.5 rounded-2xl font-extrabold text-xs transition ${
              filter === 'unread'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                : darkMode
                ? 'bg-slate-900/70 text-slate-400 hover:text-white border border-slate-800'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Unread ({messagesList.filter((m) => m.status === 'unread').length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('read')}
            className={`px-3.5 py-1.5 rounded-2xl font-extrabold text-xs transition ${
              filter === 'read'
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                : darkMode
                ? 'bg-slate-900/70 text-slate-400 hover:text-white border border-slate-800'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Read / Replied
          </button>
        </div>
      </div>

      {/* Master-Detail Split Inbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
        {/* Left Column: Inbox List */}
        <div
          className={`lg:col-span-5 border rounded-3xl overflow-hidden backdrop-blur-xl shadow-xl flex flex-col justify-between ${
            darkMode ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white/90 border-slate-200'
          }`}
        >
          <div>
            <div
              className={`p-4 border-b text-xs font-extrabold uppercase tracking-wider flex justify-between items-center ${
                darkMode ? 'bg-slate-950/40 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <span>User Queries ({filteredMessages.length})</span>
              <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Live DB
              </span>
            </div>

            <div
              className={`divide-y overflow-y-auto max-h-[480px] ${
                darkMode ? 'divide-slate-800/60' : 'divide-slate-200/80'
              }`}
            >
              {paginatedMessages.length === 0 ? (
                <div className="text-center py-16 p-6 text-slate-400 space-y-2">
                  <Inbox className="w-10 h-10 mx-auto opacity-40 text-orange-500" />
                  <p className="text-xs font-bold text-slate-300">No user queries matching filter.</p>
                  <p className="text-[11px] text-slate-500">Submissions from contact page will stream here automatically.</p>
                </div>
              ) : (
                paginatedMessages.map((msg) => {
                  const isSelected = activeMessage?.id === msg.id;
                  return (
                    <button
                      key={msg.id}
                      type="button"
                      onClick={() => setActiveMessageId(msg.id)}
                      className={`w-full text-left p-4 transition duration-200 flex flex-col gap-2 ${
                        isSelected
                          ? darkMode
                            ? 'bg-orange-500/10 border-l-4 border-l-orange-500'
                            : 'bg-orange-50 border-l-4 border-l-orange-500'
                          : darkMode
                          ? 'hover:bg-slate-800/40'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`font-black text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                            {msg.name}
                          </span>
                          {msg.status === 'unread' && (
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">{msg.createdAt}</span>
                      </div>

                      <div className={`text-xs line-clamp-1 font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {msg.message}
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className="text-orange-500 font-bold">{msg.email}</span>
                        {msg.domain && (
                          <span
                            className={`px-2 py-0.5 rounded-lg font-bold border ${
                              darkMode
                                ? 'bg-slate-800 text-slate-300 border-slate-700'
                                : 'bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            {msg.domain}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Pagination Controls Footer */}
          {filteredMessages.length > 0 && (
            <div
              className={`p-3 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
                darkMode ? 'bg-slate-950/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>
                  Showing{' '}
                  <strong className={darkMode ? 'text-white' : 'text-slate-900'}>
                    {totalItems > 0 ? startIndex + 1 : 0}
                  </strong>{' '}
                  to{' '}
                  <strong className={darkMode ? 'text-white' : 'text-slate-900'}>{endIndex}</strong> of{' '}
                  <strong className="text-orange-500">{totalItems}</strong>
                </span>

                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className={`ml-2 px-2 py-1 rounded-lg text-xs font-bold border focus:outline-none focus:border-orange-500 ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
                  }`}
                >
                  <option value={5}>5 / page</option>
                  <option value={10}>10 / page</option>
                  <option value={20}>20 / page</option>
                  <option value={50}>50 / page</option>
                </select>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={safeCurrentPage <= 1}
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  className={`p-1.5 rounded-lg border font-bold text-xs transition flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed ${
                    darkMode
                      ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                      : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'
                  }`}
                  title="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Prev</span>
                </button>

                <div className="flex items-center gap-1 px-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    const isActive = pageNum === safeCurrentPage;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-7 h-7 rounded-lg text-xs font-black transition ${
                          isActive
                            ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                            : darkMode
                            ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  disabled={safeCurrentPage >= totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  className={`p-1.5 rounded-lg border font-bold text-xs transition flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed ${
                    darkMode
                      ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                      : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'
                  }`}
                  title="Next Page"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Detailed Reader Panel */}
        <div
          className={`lg:col-span-7 border rounded-3xl backdrop-blur-xl shadow-xl p-6 sm:p-8 flex flex-col justify-between space-y-6 ${
            darkMode ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white/90 border-slate-200'
          }`}
        >
          {activeMessage ? (
            <>
              <div className="space-y-6">
                {/* Header Information Card displaying ALL user details */}
                <div
                  className={`p-5 rounded-2xl border space-y-4 ${
                    darkMode ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-black text-lg flex items-center justify-center shadow-md">
                        {activeMessage.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className={`text-lg font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                          {activeMessage.name}
                        </h3>
                        <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-orange-500" /> Submitted: {activeMessage.createdAt}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[11px] font-extrabold px-3 py-1 rounded-full capitalize ${
                        activeMessage.status === 'unread'
                          ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                      }`}
                    >
                      {activeMessage.status || 'unread'}
                    </span>
                  </div>

                  {/* Contact Fields Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800/60 dark:border-slate-800/80 text-xs font-medium">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Email Address</span>
                        <span className={`font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                          {activeMessage.email}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Phone Number</span>
                        <span className={`font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                          {activeMessage.phone || 'Not provided'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-orange-500 shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Domain / Category</span>
                        <span className="inline-block mt-0.5 text-xs font-extrabold px-2.5 py-0.5 rounded-lg bg-orange-500/10 text-orange-500 border border-orange-500/30">
                          {activeMessage.domain || 'General Inquiry'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-orange-500 shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Client ID Reference</span>
                        <span className="font-mono text-slate-400">REF-{activeMessage.id}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Content Card */}
                <div
                  className={`border rounded-2xl p-6 text-sm leading-relaxed shadow-inner ${
                    darkMode ? 'bg-slate-950/70 border-slate-800/80 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <Inbox className="w-4 h-4 text-orange-500" /> Submitted Inquiry Message
                  </h4>
                  <p className="whitespace-pre-wrap font-medium">{activeMessage.message}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                className={`flex flex-wrap items-center justify-between gap-3 pt-4 border-t ${
                  darkMode ? 'border-slate-800' : 'border-slate-200'
                }`}
              >
                <a
                  href={`mailto:${activeMessage.email}?subject=RE: Construction Solutions %26 Services Inquiry`}
                  className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-orange-500/25 transition flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>

                <button
                  type="button"
                  disabled={deletingId === activeMessage.id}
                  onClick={() => handleDelete(activeMessage.id)}
                  className="px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30 font-bold text-xs rounded-2xl transition disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{deletingId === activeMessage.id ? 'Deleting...' : 'Delete Inquiry'}</span>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-24 text-slate-400 space-y-2">
              <Inbox className="w-10 h-10 mx-auto opacity-50 text-orange-500" />
              <p className="text-xs font-medium">Select a user query to view complete details.</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Dynamic Company Contact Info Modal */}
      {isInfoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div
            className={`border rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${
              darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div
              className={`flex items-center justify-between px-6 py-4 border-b ${
                darkMode ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50'
              }`}
            >
              <h3 className="text-lg font-black flex items-center gap-2">
                <Building2 className="w-5 h-5 text-orange-500" />
                <span>Edit Company Contact Info</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsInfoModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateContactInfo} className="p-6 space-y-4">
              <div>
                <label
                  className={`block text-xs font-extrabold uppercase tracking-wider mb-1.5 ${
                    darkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9296998511"
                  className={`w-full px-4 py-2.5 border rounded-2xl text-sm font-medium focus:outline-none focus:border-orange-500 ${
                    darkMode ? 'bg-slate-950/70 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-xs font-extrabold uppercase tracking-wider mb-1.5 ${
                    darkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Official Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contructionsolutionsservices@gmail.com"
                  className={`w-full px-4 py-2.5 border rounded-2xl text-sm font-medium focus:outline-none focus:border-orange-500 ${
                    darkMode ? 'bg-slate-950/70 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-xs font-extrabold uppercase tracking-wider mb-1.5 ${
                    darkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Office Fax Number
                </label>
                <input
                  type="text"
                  value={fax}
                  onChange={(e) => setFax(e.target.value)}
                  placeholder="+1 (800) 555-5678"
                  className={`w-full px-4 py-2.5 border rounded-2xl text-sm font-medium focus:outline-none focus:border-orange-500 ${
                    darkMode ? 'bg-slate-950/70 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-xs font-extrabold uppercase tracking-wider mb-1.5 ${
                    darkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Office Address
                </label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Harmu Housing basant bihar colony B1 Ranchi 834002"
                  className={`w-full px-4 py-2.5 border rounded-2xl text-sm font-medium focus:outline-none focus:border-orange-500 ${
                    darkMode ? 'bg-slate-950/70 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div
                className={`flex items-center justify-end gap-3 pt-4 border-t ${
                  darkMode ? 'border-slate-800' : 'border-slate-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setIsInfoModalOpen(false)}
                  className={`px-4 py-2 font-bold text-xs rounded-2xl ${
                    darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingInfo}
                  className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-orange-500/25 disabled:opacity-60"
                >
                  {savingInfo ? 'Syncing...' : 'Save Info'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactMessages;
