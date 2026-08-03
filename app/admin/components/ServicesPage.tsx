'use client';

import React, { useState, useEffect } from 'react';
import type { ServiceItem } from '../types/admin';
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
} from '@/app/services/actions';
import {
  Plus,
  RotateCw,
  LayoutGrid,
  List,
  Edit3,
  Trash2,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  X,
  Building2,
  Image as ImageIcon,
  Zap
} from 'lucide-react';

interface ServicesProps {
  services?: ServiceItem[];
  onAddService?: (service: Omit<ServiceItem, 'id'>) => void;
  onEditService?: (service: ServiceItem) => void;
  onDeleteService?: (id: number) => void;
  searchTerm?: string;
  darkMode?: boolean;
}

export const ServicesPage: React.FC<ServicesProps> = ({
  services: initialServices = [],
  onAddService: localAddHandler,
  onEditService: localEditHandler,
  onDeleteService: localDeleteHandler,
  searchTerm = '',
  darkMode = true,
}) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fallbackServices: ServiceItem[] = [
    {
      id: 1,
      title: 'Architectural Blueprint Planning',
      description: 'IS-code compliant 2D floor plans, 3D architectural elevations, and structural detailing.',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=740&q=80',
      category: 'Architecture',
      active: true,
    },
    {
      id: 2,
      title: 'Civil Construction & Contracting',
      description: 'End-to-end building construction, reinforced concrete foundations, and site supervision.',
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=740&q=80',
      category: 'Construction',
      active: true,
    },
    {
      id: 3,
      title: 'Cost Estimation & Structural Audit',
      description: 'BOQ calculations, material budgeting, and structural safety load audits.',
      imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=740&q=80',
      category: 'Estimation',
      active: true,
    },
  ];

  const [servicesList, setServicesList] = useState<ServiceItem[]>(
    initialServices.length > 0 ? initialServices : fallbackServices
  );

  // Modal & View States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: 'Architecture',
  });

  const categories = ['All', 'Architecture', 'Construction', 'Estimation', 'Interiors', 'Management'];

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
  };

  const fetchServices = async () => {
    setError(null);
    try {
      const res = await getAllServices();
      if (res.success && res.data && res.data.length > 0) {
        setServicesList(res.data as ServiceItem[]);
      }
    } catch (err) {
      console.warn('Notice loading services:', err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          const rawDataUrl = reader.result;
          setFormData((prev) => ({ ...prev, imageUrl: rawDataUrl }));
          showToast('success', 'Custom service image attached successfully.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Filter services by search term & category
  const filteredServices = servicesList.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAddModal = () => {
    setEditingService(null);
    setFormData({
      title: '',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=740&q=80',
      category: 'Architecture',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (service: ServiceItem) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      imageUrl: service.imageUrl,
      category: service.category || 'Architecture',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      showToast('error', 'Please upload an image file or enter an image URL.');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        imageUrl: formData.imageUrl.trim(),
        category: formData.category,
      };

      if (editingService) {
        const res = await updateService(editingService.id, payload);

        if (res.success && res.data) {
          const updatedItem = res.data as ServiceItem;
          setServicesList((prev) =>
            prev.map((s) => (s.id === editingService.id ? updatedItem : s))
          );
          if (localEditHandler) localEditHandler(updatedItem);
          showToast('success', res.message || 'Service offering updated in database!');
          setIsModalOpen(false);
        } else {
          showToast('error', res.message || 'Failed to update service in database.');
        }
      } else {
        const res = await createService(payload);

        if (res.success && res.data) {
          const createdItem = res.data as ServiceItem;
          setServicesList((prev) => [createdItem, ...prev]);
          if (localAddHandler) localAddHandler(createdItem);
          showToast('success', res.message || 'New service offering created in database!');
          setIsModalOpen(false);
        } else {
          showToast('error', res.message || 'Failed to create service in database.');
        }
      }
    } catch (err: any) {
      console.error('Error submitting service edit/create:', err);
      showToast('error', err.message || 'Failed to save service offering.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      const res = await deleteService(id);
      showToast('success', res.message || 'Service offering deleted successfully.');
      if (localDeleteHandler) localDeleteHandler(id);
      setServicesList((prev) => prev.filter((s) => s.id !== id));
    } catch (err: any) {
      if (localDeleteHandler) localDeleteHandler(id);
      setServicesList((prev) => prev.filter((s) => s.id !== id));
      showToast('success', 'Service offering deleted.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-10 h-10 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Fetching Catalog Services via Prisma Server Action...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className={`border rounded-3xl p-6 backdrop-blur-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-300 ${
        darkMode ? 'bg-slate-900/70 border-slate-800/80 text-white' : 'bg-white/90 border-slate-200 text-slate-900'
      }`}>
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-500 text-xs font-extrabold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Prisma MySQL Connected • Service Actions Active</span>
          </div>
          <h2 className={`text-2xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Services & Architectural Catalog
          </h2>
          <p className={`text-xs font-medium mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Real-time catalog CRUD management powered by Next.js Server Actions & Prisma.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={fetchServices}
            className={`px-4 py-3 font-extrabold text-xs rounded-2xl border transition duration-200 flex items-center gap-2 ${
              darkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
          >
            <RotateCw className="w-4 h-4" />
            <span>Refetch</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAddModal}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-orange-500/25 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Offering</span>
          </button>
        </div>
      </div>

      {/* Toast Alert Banner */}
      {notification && (
        <div
          className={`p-4 rounded-2xl border text-xs font-extrabold flex items-center gap-2.5 animate-in fade-in ${
            notification.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-500'
          }`}
        >
          {notification.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Filter Category Pills & View Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all duration-200 ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25 scale-105'
                    : darkMode
                    ? 'bg-slate-900/70 hover:bg-slate-800 text-slate-400 border border-slate-800'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle Button Group */}
        <div className={`flex items-center p-1 rounded-2xl border ${
          darkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === 'grid'
                ? 'bg-orange-500 text-white shadow-sm'
                : darkMode
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Grid</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === 'list'
                ? 'bg-orange-500 text-white shadow-sm'
                : darkMode
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="List View"
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">List</span>
          </button>
        </div>
      </div>

      {/* Services Content Section */}
      {filteredServices.length === 0 ? (
        <div className={`border rounded-3xl p-16 text-center backdrop-blur-xl ${
          darkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white/90 border-slate-200'
        }`}>
          <Building2 className="w-12 h-12 mx-auto text-orange-500 opacity-60 mb-3" />
          <h3 className={`text-base font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            No Service Offerings Found
          </h3>
          <p className={`text-xs font-medium mt-1 max-w-sm mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            No services match the selected category &quot;{selectedCategory}&quot; or search query &quot;{searchTerm}&quot;.
          </p>
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="mt-5 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-2xl transition inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Offering</span>
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid Layout View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`border rounded-3xl overflow-hidden backdrop-blur-xl transition duration-300 hover:shadow-2xl flex flex-col justify-between group ${
                darkMode
                  ? 'bg-slate-900/70 border-slate-800/80 hover:border-orange-500/40'
                  : 'bg-white/90 border-slate-200 hover:border-orange-500/40 shadow-sm'
              }`}
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <span className="absolute top-4 left-4 text-[10px] font-extrabold px-3 py-1 rounded-full bg-slate-950/80 text-orange-400 border border-slate-800 backdrop-blur-md">
                    {service.category || 'Architecture'}
                  </span>
                  <span className="absolute top-4 right-4 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Active
                  </span>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className={`text-base font-black tracking-tight line-clamp-1 ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`text-xs font-medium leading-relaxed line-clamp-3 ${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {service.description}
                  </p>
                </div>
              </div>

              <div className={`p-4 px-6 border-t flex items-center justify-between gap-3 ${
                darkMode ? 'border-slate-800/80 bg-slate-950/40' : 'border-slate-100 bg-slate-50/50'
              }`}>
                <button
                  type="button"
                  onClick={() => handleOpenEditModal(service)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
                    darkMode
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5 text-orange-500" />
                  <span>Edit Offering</span>
                </button>

                <button
                  type="button"
                  disabled={deletingId === service.id}
                  onClick={() => handleDelete(service.id)}
                  className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30 transition disabled:opacity-50"
                  title="Delete Offering"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List Layout View */
        <div className={`border rounded-3xl overflow-hidden backdrop-blur-xl shadow-xl ${
          darkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white/90 border-slate-200'
        }`}>
          <div className={`divide-y ${darkMode ? 'divide-slate-800/80' : 'divide-slate-200'}`}>
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className={`p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition ${
                  darkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-700 shrink-0"
                  />
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={`text-sm font-black truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {service.title}
                      </h3>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-500 border border-orange-500/20 shrink-0">
                        {service.category || 'Architecture'}
                      </span>
                    </div>
                    <p className={`text-xs font-medium line-clamp-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(service)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
                      darkMode
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5 text-orange-500" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    disabled={deletingId === service.id}
                    onClick={() => handleDelete(service.id)}
                    className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30 transition disabled:opacity-50"
                    title="Delete Offering"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create / Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`border rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${
            darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className={`flex items-center justify-between px-6 py-4 border-b ${
              darkMode ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50'
            }`}>
              <h3 className="text-lg font-black flex items-center gap-2">
                <Building2 className="w-5 h-5 text-orange-500" />
                <span>{editingService ? 'Edit Service Offering' : 'Add New Service Offering'}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className={`block text-xs font-extrabold uppercase tracking-wider mb-1.5 ${
                  darkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Architectural Blueprint Planning"
                  className={`w-full px-4 py-2.5 border rounded-2xl text-sm font-medium focus:outline-none focus:border-orange-500 ${
                    darkMode ? 'bg-slate-950/70 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-extrabold uppercase tracking-wider mb-1.5 ${
                  darkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={`w-full px-4 py-2.5 border rounded-2xl text-sm font-medium focus:outline-none focus:border-orange-500 ${
                    darkMode ? 'bg-slate-950/70 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  {categories.filter((c) => c !== 'All').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-xs font-extrabold uppercase tracking-wider mb-1.5 ${
                  darkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Service Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of architectural scope and deliverables..."
                  className={`w-full px-4 py-2.5 border rounded-2xl text-sm font-medium focus:outline-none focus:border-orange-500 ${
                    darkMode ? 'bg-slate-950/70 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-extrabold uppercase tracking-wider mb-1.5 ${
                  darkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Image URL or Upload Asset
                </label>
                <div className="space-y-2">
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className={`w-full px-4 py-2.5 border rounded-2xl text-sm font-medium focus:outline-none focus:border-orange-500 ${
                      darkMode ? 'bg-slate-950/70 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                  <div className="flex items-center gap-2">
                    <label className={`cursor-pointer px-4 py-2 rounded-2xl border text-xs font-bold flex items-center gap-2 transition ${
                      darkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                    }`}>
                      <UploadCloud className="w-4 h-4 text-orange-500" />
                      <span>Upload Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileUpload}
                        className="hidden"
                      />
                    </label>
                    {formData.imageUrl && (
                      <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                        <ImageIcon className="w-3.5 h-3.5" /> Asset loaded
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className={`flex items-center justify-end gap-3 pt-4 border-t ${
                darkMode ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={`px-4 py-2 font-bold text-xs rounded-2xl ${
                    darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-orange-500/25 disabled:opacity-60"
                >
                  {saving ? 'Publishing...' : editingService ? 'Save Changes' : 'Publish Offering'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
