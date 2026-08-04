// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   getHomeData,
//   updateHomeHero,
//   updateHomePlanning,
//   createHomeStat,
//   deleteHomeStat,
//   HomeStatData,
// } from '../home/actions';
// import {
//   Edit3,
//   Sliders,
//   Eye,
//   Plus,
//   Save,
//   RotateCw,
//   Zap,
//   CheckCircle2,
//   AlertTriangle,
//   Layers,
//   X,
//   UploadCloud,
//   Trash2,
//   Image as ImageIcon
// } from 'lucide-react';

// interface HomeManagerProps {
//   darkMode?: boolean;
// }

// export const HomeManager: React.FC<HomeManagerProps> = ({ darkMode = true }) => {
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Local Form States
//   const [heroTitle, setHeroTitle] = useState('Designing Dream Homes & High-Rise Structures');
//   const [heroSubtitle, setHeroSubtitle] = useState(
//     'Explore full-bleed 3D architectural renders, structural blueprints, and IS-code compliant construction estimates.'
//   );
//   const [heroImageUrl, setHeroImageUrl] = useState('');
//   const [planningParagraph1, setPlanningParagraph1] = useState('');
//   const [planningParagraph2, setPlanningParagraph2] = useState('');
//   const [planningImageUrl, setPlanningImageUrl] = useState('');
//   const [modelMode, setModelMode] = useState('realistic');
//   const [fpsLimit, setFpsLimit] = useState(60);

//   // Stats State
//   const [statsList, setStatsList] = useState<HomeStatData[]>([]);
//   const [newStatValue, setNewStatValue] = useState('');
//   const [newStatLabel, setNewStatLabel] = useState('');
//   const [creatingStat, setCreatingStat] = useState(false);
//   const [deletingStatId, setDeletingStatId] = useState<number | null>(null);

//   const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

//   const showToast = (type: 'success' | 'error', message: string) => {
//     setNotification({ type, message });
//     setTimeout(() => setNotification(null), 3500);
//   };

//   const fetchHomeData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await getHomeData();
//       if (res.success && res.data) {
//         const { hero, planning, stats } = res.data;
//         if (hero) {
//           if (hero.title) setHeroTitle(hero.title);
//           if (hero.subtitle) setHeroSubtitle(hero.subtitle);
//           if (hero.imageUrl) setHeroImageUrl(hero.imageUrl);
//         }
//         if (planning) {
//           if (planning.paragraph1) setPlanningParagraph1(planning.paragraph1);
//           if (planning.paragraph2) setPlanningParagraph2(planning.paragraph2);
//           if (planning.imageUrl) setPlanningImageUrl(planning.imageUrl);
//         }
//         if (stats && Array.isArray(stats)) setStatsList(stats);
//       } else {
//         setError(res.message || 'Failed to load Home data from database.');
//       }
//     } catch (err: any) {
//       console.warn('Error fetching Home data via Server Action:', err);
//       setError('Error fetching Home data.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHomeData();
//   }, []);

//   const handleImageUpload = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     setImageState: React.Dispatch<React.SetStateAction<string>>
//   ) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 15 * 1024 * 1024) {
//         showToast('error', 'File size exceeds 15MB limit. Please choose a smaller image.');
//         return;
//       }
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         if (typeof reader.result === 'string') {
//           const rawDataUrl = reader.result;
//           const img = new Image();
//           img.src = rawDataUrl;
//           img.onload = () => {
//             const canvas = document.createElement('canvas');
//             const MAX_WIDTH = 1200;
//             const MAX_HEIGHT = 1200;
//             let width = img.width;
//             let height = img.height;

//             if (width > height) {
//               if (width > MAX_WIDTH) {
//                 height = Math.round((height * MAX_WIDTH) / width);
//                 width = MAX_WIDTH;
//               }
//             } else {
//               if (height > MAX_HEIGHT) {
//                 width = Math.round((width * MAX_HEIGHT) / height);
//                 height = MAX_HEIGHT;
//               }
//             }

//             canvas.width = width;
//             canvas.height = height;
//             const ctx = canvas.getContext('2d');
//             if (ctx) {
//               ctx.drawImage(img, 0, 0, width, height);
//               const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
//               setImageState(compressedDataUrl);
//               showToast('success', `Image "${file.name}" uploaded and optimized successfully!`);
//             } else {
//               setImageState(rawDataUrl);
//               showToast('success', `Image "${file.name}" loaded successfully!`);
//             }
//           };
//           img.onerror = () => {
//             setImageState(rawDataUrl);
//             showToast('success', `Image "${file.name}" loaded!`);
//           };
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSaveAll = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       const heroRes = await updateHomeHero({
//         title: heroTitle,
//         subtitle: heroSubtitle,
//         imageUrl: heroImageUrl,
//       });

//       const planningRes = await updateHomePlanning({
//         paragraph1: planningParagraph1,
//         paragraph2: planningParagraph2,
//         imageUrl: planningImageUrl,
//       });

//       if (heroRes.success && planningRes.success) {
//         showToast('success', 'Home Page hero & planning content updated in database!');
//       } else {
//         showToast('error', heroRes.message || planningRes.message || 'Failed to save Home settings.');
//       }
//     } catch (err: any) {
//       showToast('error', err.message || 'Failed to update Home Page content.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleAddStat = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newStatValue || !newStatLabel) return;
//     setCreatingStat(true);
//     try {
//       const res = await createHomeStat(newStatValue, newStatLabel);
//       if (res.success && res.data) {
//         setStatsList((prev) => [...prev, res.data as HomeStatData]);
//         setNewStatValue('');
//         setNewStatLabel('');
//         showToast('success', res.message || `Stat box (${newStatValue}) created!`);
//       } else {
//         showToast('error', res.message || 'Failed to create stat box.');
//       }
//     } catch (err: any) {
//       showToast('error', err.message || 'Failed to create stat box.');
//     } finally {
//       setCreatingStat(false);
//     }
//   };

//   const handleDeleteStat = async (id: number) => {
//     setDeletingStatId(id);
//     try {
//       const res = await deleteHomeStat(id);
//       if (res.success) {
//         setStatsList((prev) => prev.filter((s) => s.id !== id));
//         showToast('success', res.message || 'Stat box deleted successfully.');
//       } else {
//         setStatsList((prev) => prev.filter((s) => s.id !== id));
//         showToast('success', 'Stat box removed.');
//       }
//     } catch {
//       setStatsList((prev) => prev.filter((s) => s.id !== id));
//       showToast('success', 'Stat box removed.');
//     } finally {
//       setDeletingStatId(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
//         <div className="w-10 h-10 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
//         <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
//           Fetching Home Page Settings via Prisma Server Actions...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {/* Top Header Banner */}
//       <div
//         className={`border rounded-3xl p-6 backdrop-blur-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-300 ${
//           darkMode ? 'bg-slate-900/70 border-slate-800/80 text-white' : 'bg-white/90 border-slate-200 text-slate-900'
//         }`}
//       >
//         <div>
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-500 text-xs font-extrabold uppercase tracking-wider mb-2">
//             <Zap className="w-3.5 h-3.5" />
//             <span>Prisma MySQL Connected • Home Server Actions</span>
//           </div>
//           <h2 className={`text-2xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
//             Home & 3D WebGL Configurator
//           </h2>
//           <p className={`text-xs font-medium mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
//             Manage Homepage Hero text, 3D Architectural Viewer settings, Planning text, and Stat Counters.
//           </p>
//         </div>

//         <div className="flex items-center gap-2 self-start md:self-auto">
//           <button
//             type="button"
//             onClick={fetchHomeData}
//             className={`px-4 py-3 font-extrabold text-xs rounded-2xl border transition duration-200 flex items-center gap-2 ${
//               darkMode
//                 ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
//                 : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
//             }`}
//           >
//             <RotateCw className="w-4 h-4" />
//             <span>Refetch</span>
//           </button>

//           <button
//             type="button"
//             onClick={handleSaveAll}
//             disabled={saving}
//             className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-orange-500/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
//           >
//             <Save className="w-4 h-4" />
//             <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
//           </button>
//         </div>
//       </div>

//       {/* Toast Alert Banner */}
//       {notification && (
//         <div
//           className={`p-4 rounded-2xl border text-xs font-extrabold flex items-center gap-2.5 animate-in fade-in ${
//             notification.type === 'success'
//               ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
//               : 'bg-rose-500/10 border-rose-500/30 text-rose-500'
//           }`}
//         >
//           {notification.type === 'success' ? (
//             <CheckCircle2 className="w-4 h-4 shrink-0" />
//           ) : (
//             <AlertTriangle className="w-4 h-4 shrink-0" />
//           )}
//           <span>{notification.message}</span>
//         </div>
//       )}

//       {/* 1. Hero Content & Image Config */}
//       <div
//         className={`border rounded-3xl p-6 backdrop-blur-xl space-y-6 ${
//           darkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white/90 border-slate-200 shadow-sm'
//         }`}
//       >
//         <div className="flex items-center gap-3 pb-4 border-b border-slate-800/80">
//           <Edit3 className="w-5 h-5 text-orange-500" />
//           <h3 className={`text-base font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
//             1. Hero Header & Banner Image
//           </h3>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-4">
//             <div>
//               <label className={`block text-xs font-extrabold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
//                 Hero Main Heading *
//               </label>
//               <input
//                 type="text"
//                 value={heroTitle}
//                 onChange={(e) => setHeroTitle(e.target.value)}
//                 placeholder="e.g. Designing Dream Homes..."
//                 className={`w-full px-4 py-3 border rounded-2xl text-sm font-medium focus:outline-none focus:border-orange-500 ${
//                   darkMode ? 'bg-slate-950/70 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
//                 }`}
//               />
//             </div>

//             <div>
//               <label className={`block text-xs font-extrabold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
//                 Hero Subtitle / Description *
//               </label>
//               <textarea
//                 rows={3}
//                 value={heroSubtitle}
//                 onChange={(e) => setHeroSubtitle(e.target.value)}
//                 placeholder="Subtitle text describing structural planning..."
//                 className={`w-full px-4 py-3 border rounded-2xl text-sm font-medium focus:outline-none focus:border-orange-500 ${
//                   darkMode ? 'bg-slate-950/70 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
//                 }`}
//               />
//             </div>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <label className={`block text-xs font-extrabold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
//                 Hero Banner Image URL / Upload Asset
//               </label>
//               <input
//                 type="url"
//                 value={heroImageUrl}
//                 onChange={(e) => setHeroImageUrl(e.target.value)}
//                 placeholder="https://images.unsplash.com/..."
//                 className={`w-full px-4 py-3 border rounded-2xl text-sm font-medium focus:outline-none focus:border-orange-500 mb-3 ${
//                   darkMode ? 'bg-slate-950/70 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
//                 }`}
//               />
//               <div className="flex items-center gap-3">
//                 <label
//                   className={`cursor-pointer px-4 py-2.5 rounded-2xl border text-xs font-extrabold flex items-center gap-2 transition ${
//                     darkMode
//                       ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
//                       : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
//                   }`}
//                 >
//                   <UploadCloud className="w-4 h-4 text-orange-500" />
//                   <span>Upload Hero Image</span>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => handleImageUpload(e, setHeroImageUrl)}
//                     className="hidden"
//                   />
//                 </label>
//                 {heroImageUrl && (
//                   <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
//                     <ImageIcon className="w-3.5 h-3.5" /> Hero image set
//                   </span>
//                 )}
//               </div>
//             </div>

//             {heroImageUrl && (
//               <div className="h-32 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 relative">
//                 <img src={heroImageUrl} alt="Hero preview" className="w-full h-full object-cover" />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* 2. WebGL 3D Architectural Viewer Settings */}
//       <div
//         className={`border rounded-3xl p-6 backdrop-blur-xl space-y-6 ${
//           darkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white/90 border-slate-200 shadow-sm'
//         }`}
//       >
//         <div className="flex items-center gap-3 pb-4 border-b border-slate-800/80">
//           <Sliders className="w-5 h-5 text-orange-500" />
//           <h3 className={`text-base font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
//             2. WebGL 3D Architectural Model Viewer Config
//           </h3>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           <div>
//             <label className={`block text-xs font-extrabold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
//               3D Render Shader Mode
//             </label>
//             <select
//               value={modelMode}
//               onChange={(e) => setModelMode(e.target.value)}
//               className={`w-full px-4 py-3 border rounded-2xl text-sm font-medium focus:outline-none focus:border-orange-500 ${
//                 darkMode ? 'bg-slate-950/70 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
//               }`}
//             >
//               <option value="realistic">Photorealistic PBR Shading (Raytraced)</option>
//               <option value="wireframe">Architectural Wireframe Mode</option>
//               <option value="blueprint">Cyan Blueprint Vector CAD</option>
//             </select>
//           </div>

//           <div>
//             <label className={`block text-xs font-extrabold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
//               Target Render FPS Limit
//             </label>
//             <select
//               value={fpsLimit}
//               onChange={(e) => setFpsLimit(Number(e.target.value))}
//               className={`w-full px-4 py-3 border rounded-2xl text-sm font-medium focus:outline-none focus:border-orange-500 ${
//                 darkMode ? 'bg-slate-950/70 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
//               }`}
//             >
//               <option value={30}>30 FPS (Power Saving)</option>
//               <option value={60}>60 FPS (Smooth Standard)</option>
//               <option value={120}>120 FPS (Ultra Smooth 120Hz)</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* 3. Planning & Architectural Showcase Content */}
//       <div
//         className={`border rounded-3xl p-6 backdrop-blur-xl space-y-6 ${
//           darkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white/90 border-slate-200 shadow-sm'
//         }`}
//       >
//         <div className="flex items-center gap-3 pb-4 border-b border-slate-800/80">
//           <Layers className="w-5 h-5 text-orange-500" />
//           <h3 className={`text-base font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
//             3. Planning & Engineering Showcase Paragraphs
//           </h3>
//         </div>

//         <div className="space-y-4">
//           <div>
//             <label className={`block text-xs font-extrabold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
//               Paragraph 1 (Main Structural Description)
//             </label>
//             <textarea
//               rows={3}
//               value={planningParagraph1}
//               onChange={(e) => setPlanningParagraph1(e.target.value)}
//               placeholder="e.g. Architectural blueprint planning and drafting..."
//               className={`w-full px-4 py-3 border rounded-2xl text-sm font-medium focus:outline-none focus:border-orange-500 ${
//                 darkMode ? 'bg-slate-950/70 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
//               }`}
//             />
//           </div>

//           <div>
//             <label className={`block text-xs font-extrabold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
//               Paragraph 2 (Engineering & Execution Details)
//             </label>
//             <textarea
//               rows={3}
//               value={planningParagraph2}
//               onChange={(e) => setPlanningParagraph2(e.target.value)}
//               placeholder="e.g. Connecting computational design with site execution..."
//               className={`w-full px-4 py-3 border rounded-2xl text-sm font-medium focus:outline-none focus:border-orange-500 ${
//                 darkMode ? 'bg-slate-950/70 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
//               }`}
//             />
//           </div>
//         </div>
//       </div>

//       {/* 4. Stat Counter Boxes (Add & Delete) */}
//       <div
//         className={`border rounded-3xl p-6 backdrop-blur-xl space-y-6 ${
//           darkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white/90 border-slate-200 shadow-sm'
//         }`}
//       >
//         <div className="flex items-center gap-3 pb-4 border-b border-slate-800/80">
//           <Eye className="w-5 h-5 text-orange-500" />
//           <h3 className={`text-base font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
//             4. Stat Counter Highlights
//           </h3>
//         </div>

//         {/* Existing Stat Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {statsList.map((stat) => (
//             <div
//               key={stat.id}
//               className={`border rounded-2xl p-4 flex items-center justify-between gap-3 ${
//                 darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
//               }`}
//             >
//               <div>
//                 <div className="text-xl font-black text-orange-500">{stat.value}</div>
//                 <div className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
//                   {stat.label}
//                 </div>
//               </div>
//               <button
//                 type="button"
//                 disabled={deletingStatId === stat.id}
//                 onClick={() => handleDeleteStat(stat.id)}
//                 className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30 transition disabled:opacity-50"
//                 title="Delete Stat Box"
//               >
//                 <Trash2 className="w-4 h-4" />
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Add New Stat Form */}
//         <form onSubmit={handleAddStat} className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center gap-4">
//           <input
//             type="text"
//             required
//             value={newStatValue}
//             onChange={(e) => setNewStatValue(e.target.value)}
//             placeholder="Value (e.g. 150+)"
//             className={`w-full sm:w-1/3 px-4 py-2.5 border rounded-2xl text-sm font-medium focus:outline-none focus:border-orange-500 ${
//               darkMode ? 'bg-slate-950/70 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
//             }`}
//           />
//           <input
//             type="text"
//             required
//             value={newStatLabel}
//             onChange={(e) => setNewStatLabel(e.target.value)}
//             placeholder="Label (e.g. Luxury Renders Delivered)"
//             className={`w-full sm:w-2/3 px-4 py-2.5 border rounded-2xl text-sm font-medium focus:outline-none focus:border-orange-500 ${
//               darkMode ? 'bg-slate-950/70 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
//             }`}
//           />
//           <button
//             type="submit"
//             disabled={creatingStat}
//             className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-2xl transition flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
//           >
//             <Plus className="w-4 h-4" />
//             <span>{creatingStat ? 'Adding...' : 'Add Stat Box'}</span>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default HomeManager;
