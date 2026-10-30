import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { componentsData } from '../../data/componentsData';
import { ComponentItem } from '../../types';
import { 
  Box, 
  Search, 
  Cpu, 
  Zap, 
  FileText, 
  ExternalLink, 
  X, 
  Code2, 
  Copy, 
  Check, 
  Sparkles,
  Layers,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const ComponentsPage: React.FC = () => {
  const { t, language, setActiveEditorCode, setCurrentPage } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeComponent, setActiveComponent] = useState<ComponentItem | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Extract unique categories
  const categories = ['all', ...Array.from(new Set(componentsData.map(c => c.category)))];

  const filtered = componentsData.filter((comp) => {
    const matchesCat = selectedCategory === 'all' || comp.category === selectedCategory;
    const nameMatch = comp.name.toLowerCase().includes(searchQuery.toLowerCase());
    const desc = language === 'ku' ? comp.descriptionKu : comp.description;
    const descMatch = desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && (nameMatch || descMatch);
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleOpenInEditor = (code: string) => {
    setActiveEditorCode(code);
    setCurrentPage('editor');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-cyan-500/20 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
          <Box className="w-3.5 h-3.5" />
          <span>Verified Electronics Encyclopedia</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {t.components.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          {t.components.subtitle}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.components.searchPlaceholder}
            className="w-full bg-[#0D1424] border border-slate-800 focus:border-cyan-500 rounded-xl py-2.5 pl-9 pr-4 rtl:pl-4 rtl:pr-9 text-xs text-white placeholder-slate-500 outline-none transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-[0_0_15px_rgba(0,217,255,0.3)]'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat === 'all' ? t.components.allCategories : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((comp) => (
          <div
            key={comp.id}
            onClick={() => setActiveComponent(comp)}
            className="rounded-2xl bg-[#0D1424] border border-slate-800 hover:border-cyan-500/50 overflow-hidden transition-all duration-300 group cursor-pointer flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={comp.image}
                  alt={comp.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1424] via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-slate-900/90 text-cyan-300 border border-cyan-500/40">
                    {language === 'ku' ? comp.categoryKu : comp.category}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                  {comp.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {language === 'ku' ? comp.descriptionKu : comp.description}
                </p>

                {/* Quick specs */}
                <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400">
                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-500 block text-[9px] uppercase">Voltage</span>
                    <span className="text-cyan-400 font-bold">{comp.operatingVoltage}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-500 block text-[9px] uppercase">Current</span>
                    <span className="text-purple-400 font-bold truncate block">{comp.currentDraw}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-500 text-cyan-400 text-xs font-bold transition-all flex items-center justify-center gap-1.5">
                <span>{t.components.viewDetails}</span>
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Modal Viewer */}
      {activeComponent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0D1424] border border-cyan-500/40 p-6 sm:p-8 space-y-6 shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveComponent(null)}
              className="absolute top-6 right-6 rtl:right-auto rtl:left-6 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-900 shrink-0 border border-slate-700">
                <img src={activeComponent.image} alt={activeComponent.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  {language === 'ku' ? activeComponent.categoryKu : activeComponent.category}
                </span>
                <h2 className="text-2xl font-black text-white">{activeComponent.name}</h2>
                <p className="text-xs text-slate-400">
                  {language === 'ku' ? activeComponent.descriptionKu : activeComponent.description}
                </p>
              </div>
            </div>

            {/* Technical Specs & Working Principle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                  {t.components.specs}
                </span>
                <div className="space-y-1 text-xs">
                  <div><span className="text-slate-400">{t.components.voltage}:</span> <span className="text-white font-mono">{activeComponent.operatingVoltage}</span></div>
                  <div><span className="text-slate-400">{t.components.current}:</span> <span className="text-white font-mono">{activeComponent.currentDraw}</span></div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold block">
                  {t.components.principle}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'ku' ? activeComponent.workingPrincipleKu : activeComponent.workingPrinciple}
                </p>
              </div>
            </div>

            {/* Pin Configuration Table */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                {t.components.pinout}
              </h3>
              <div className="rounded-xl border border-slate-800 overflow-hidden">
                <table className="w-full text-xs text-left rtl:text-right">
                  <thead className="bg-slate-900 text-slate-400 font-mono text-[11px]">
                    <tr>
                      <th className="p-2.5">{t.components.pinName}</th>
                      <th className="p-2.5">{t.components.pinFunction}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-[#070B14]">
                    {activeComponent.pinout.map((p, i) => (
                      <tr key={i} className="hover:bg-slate-900/40">
                        <td className="p-2.5 font-mono text-cyan-400 font-bold whitespace-nowrap">{p.pin}</td>
                        <td className="p-2.5 text-slate-300">
                          {language === 'ku' ? p.functionKu : p.function}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Wiring & Safety Tip */}
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/40 text-xs text-amber-200 leading-relaxed space-y-1">
              <div className="font-bold font-mono uppercase flex items-center gap-1.5 text-amber-300">
                <ShieldCheck className="w-4 h-4" />
                <span>{t.components.wiringTip}</span>
              </div>
              <p>{language === 'ku' ? activeComponent.wiringTipKu : activeComponent.wiringTip}</p>
            </div>

            {/* Example Sketch */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                  <Code2 className="w-4 h-4" />
                  <span>{t.components.exampleCode}</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyCode(activeComponent.exampleCode)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? t.common.copied : t.common.copy}</span>
                  </button>
                  <button
                    onClick={() => handleOpenInEditor(activeComponent.exampleCode)}
                    className="px-2.5 py-1 rounded-lg bg-blue-950 hover:bg-blue-900 border border-blue-500/40 text-blue-300 text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>{t.academy.openInEditor}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#070B14] border border-slate-800 font-mono text-xs text-cyan-200 overflow-x-auto">
                <pre>{activeComponent.exampleCode}</pre>
              </div>
            </div>

            {/* Datasheet Link if available */}
            {activeComponent.datasheetUrl && (
              <div className="pt-2 flex justify-end">
                <a
                  href={activeComponent.datasheetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Official PDF Datasheet</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
