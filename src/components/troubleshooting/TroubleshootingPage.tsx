import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { troubleshootingData } from '../../data/troubleshootingData';
import { TroubleshootingItem } from '../../types';
import { 
  Wrench, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Code2, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Cpu, 
  ShieldAlert,
  HelpCircle
} from 'lucide-react';

export const TroubleshootingPage: React.FC = () => {
  const { t, language, setActiveEditorCode, setCurrentPage } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string>(troubleshootingData[0].id);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const categories = ['all', 'connection', 'upload', 'power', 'hardware'];

  const filtered = troubleshootingData.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const title = language === 'ku' ? item.titleKu : item.title;
    const causes = (language === 'ku' ? item.possibleCausesKu : item.possibleCauses).join(' ');
    const searchMatch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        causes.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && searchMatch;
  });

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-cyan-500/20 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-xs font-mono mb-2">
          <Wrench className="w-3.5 h-3.5" />
          <span>Hardware & Firmware Diagnostics</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {t.troubleshooting.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {t.troubleshooting.subtitle}
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-rose-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                  : 'bg-[#0D1424] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Issues' : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.troubleshooting.searchPlaceholder}
            className="w-full bg-[#0D1424] border border-slate-800 focus:border-rose-500 rounded-xl py-2 pl-9 pr-4 rtl:pl-4 rtl:pr-9 text-xs text-white placeholder-slate-500 outline-none transition-colors"
          />
        </div>
      </div>

      {/* Knowledge Base Accordions */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-3xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'bg-[#0D1424] border-rose-500/40 shadow-xl'
                  : 'bg-[#0D1424]/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Accordion Bar */}
              <div
                onClick={() => setExpandedId(isExpanded ? '' : item.id)}
                className="p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl shrink-0 ${
                    item.severity === 'high' ? 'bg-rose-950 text-rose-400' : 'bg-amber-950 text-amber-400'
                  }`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                        {language === 'ku' ? item.categoryKu : item.category}
                      </span>
                      <span className={`text-[10px] font-mono font-bold uppercase ${
                        item.severity === 'high' ? 'text-rose-400' : 'text-amber-400'
                      }`}>
                        {item.severity} severity
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {language === 'ku' ? item.titleKu : item.title}
                    </h3>
                  </div>
                </div>

                <div className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {/* Accordion Expanded Details */}
              {isExpanded && (
                <div className="p-6 pt-0 border-t border-slate-800/80 space-y-6 text-xs leading-relaxed">
                  
                  {/* Symptoms & Causes Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    
                    <div className="p-4 rounded-2xl bg-[#070B14] border border-slate-800 space-y-2">
                      <h4 className="font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-amber-400" />
                        <span>{t.troubleshooting.symptoms}</span>
                      </h4>
                      <ul className="space-y-1 text-slate-300">
                        {(language === 'ku' ? item.symptomsKu : item.symptoms).map((s, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-400">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#070B14] border border-slate-800 space-y-2">
                      <h4 className="font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4 text-rose-400" />
                        <span>{t.troubleshooting.causes}</span>
                      </h4>
                      <ul className="space-y-1 text-slate-300">
                        {(language === 'ku' ? item.possibleCausesKu : item.possibleCauses).map((c, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-rose-400">•</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Step-by-Step Fix */}
                  <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                    <h4 className="font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t.troubleshooting.solution}</span>
                    </h4>
                    <div className="space-y-2 text-slate-300">
                      {(language === 'ku' ? item.stepsToFixKu : item.stepsToFix).map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-300 font-mono text-[10px] flex items-center justify-center shrink-0 font-bold border border-emerald-500/40">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fix Code snippet if provided */}
                  {item.codeFix && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                          <Code2 className="w-4 h-4" />
                          <span>{t.troubleshooting.codeSnippet}</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopyCode(item.id, item.codeFix!)}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 cursor-pointer"
                          >
                            {copiedCodeId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedCodeId === item.id ? t.common.copied : t.common.copy}</span>
                          </button>
                          <button
                            onClick={() => {
                              setActiveEditorCode(item.codeFix!);
                              setCurrentPage('editor');
                            }}
                            className="px-2.5 py-1 rounded bg-blue-950 hover:bg-blue-900 border border-blue-500/40 text-blue-300 text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <Code2 className="w-3 h-3" />
                            <span>{t.academy.openInEditor}</span>
                          </button>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#070B14] border border-slate-800 font-mono text-xs text-cyan-200">
                        <pre>{item.codeFix}</pre>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
