import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { projectsData } from '../../data/projectsData';
import { ProjectItem } from '../../types';
import { 
  FolderGit2, 
  Search, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  Bookmark, 
  BookmarkCheck, 
  Code2, 
  Copy, 
  Check, 
  Wrench, 
  X, 
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { t, language, userProfile, toggleSaveProject, setActiveEditorCode, setCurrentPage, addXp } = useApp();
  
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [completedProjects, setCompletedProjects] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('krd_completed_projects');
      return saved ? JSON.parse(saved) : ['proj-blink'];
    } catch {
      return ['proj-blink'];
    }
  });

  const filtered = projectsData.filter((proj) => {
    const matchesDiff = selectedDifficulty === 'all' || proj.level === selectedDifficulty;
    const title = language === 'ku' ? proj.titleKu : proj.title;
    const summary = language === 'ku' ? proj.summaryKu : proj.summary;
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiff && matchesSearch;
  });

  const handleToggleCompleted = (id: string) => {
    const isDone = completedProjects.includes(id);
    const updated = isDone ? completedProjects.filter(p => p !== id) : [...completedProjects, id];
    setCompletedProjects(updated);
    localStorage.setItem('krd_completed_projects', JSON.stringify(updated));
    if (!isDone) {
      addXp(100);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenInEditor = (code: string) => {
    setActiveEditorCode(code);
    setCurrentPage('editor');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-cyan-500/20 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-400 text-xs font-mono mb-2">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Real-World Engineering Builds</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {t.projects.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          {t.projects.subtitle}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Difficulty Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800 w-full sm:w-auto">
          {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                selectedDifficulty === diff
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {diff === 'all' ? t.projects.allLevels : (t.academy as any)[diff]}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.projects.searchPlaceholder}
            className="w-full bg-[#0D1424] border border-slate-800 focus:border-amber-500 rounded-xl py-2 pl-9 pr-4 rtl:pl-4 rtl:pr-9 text-xs text-white placeholder-slate-500 outline-none transition-colors"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((proj) => {
          const isSaved = userProfile.savedProjects.includes(proj.id);
          const isDone = completedProjects.includes(proj.id);

          return (
            <div
              key={proj.id}
              onClick={() => setActiveProject(proj)}
              className="rounded-2xl bg-[#0D1424] border border-slate-800 hover:border-amber-500/50 overflow-hidden transition-all duration-300 group cursor-pointer flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1424] via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-slate-900/90 text-amber-300 border border-amber-500/40">
                      {language === 'ku' ? proj.categoryKu : proj.category}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveProject(proj.id);
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-slate-300 hover:text-amber-400 transition-colors"
                    title="Bookmark project"
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-400 fill-amber-400" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="text-emerald-400 font-bold">{proj.estimatedCost}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {proj.timeNeeded}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                    {language === 'ku' ? proj.titleKu : proj.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {language === 'ku' ? proj.summaryKu : proj.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between text-xs">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                  proj.level === 'beginner' ? 'text-emerald-400 bg-emerald-950/60' :
                  proj.level === 'intermediate' ? 'text-cyan-400 bg-cyan-950/60' : 'text-purple-400 bg-purple-950/60'
                }`}>
                  {proj.level}
                </span>

                <button className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1">
                  <span>{language === 'ku' ? 'بینینی پڕۆژە' : 'View Blueprint'}</span>
                  <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Project Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0D1424] border border-amber-500/40 p-6 sm:p-8 space-y-6 shadow-2xl">
            
            {/* Close */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-6 right-6 rtl:right-auto rtl:left-6 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-12 rtl:pr-0 rtl:pl-12">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40">
                  {language === 'ku' ? activeProject.categoryKu : activeProject.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {activeProject.estimatedCost} • {activeProject.timeNeeded}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white">
                {language === 'ku' ? activeProject.titleKu : activeProject.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {language === 'ku' ? activeProject.summaryKu : activeProject.summary}
              </p>
            </div>

            {/* Bill of Materials & Circuit Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Components BOM */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  {t.projects.requiredParts}
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeProject.components.map((c, i) => (
                    <li key={i} className="flex items-center justify-between border-b border-slate-800/60 pb-1">
                      <span>{c.name}</span>
                      <span className="font-mono text-cyan-400 font-bold">x{c.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Circuit Architecture */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  {t.projects.circuitOverview}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'ku' ? activeProject.circuitSummaryKu : activeProject.circuitSummary}
                </p>
              </div>
            </div>

            {/* Step-by-Step Wiring */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                {t.projects.wiringInstructions}
              </h4>
              <div className="space-y-1.5">
                {(language === 'ku' ? activeProject.wiringStepsKu : activeProject.wiringSteps).map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#070B14] border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center font-mono text-[10px] shrink-0 font-bold">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Sketch */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                  <Code2 className="w-4 h-4" />
                  <span>{t.projects.sourceCode}</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyCode(activeProject.code)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? t.common.copied : t.common.copy}</span>
                  </button>
                  <button
                    onClick={() => handleOpenInEditor(activeProject.code)}
                    className="px-2.5 py-1 rounded-lg bg-blue-950 hover:bg-blue-900 border border-blue-500/40 text-blue-300 text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>{t.academy.openInEditor}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#070B14] border border-slate-800 font-mono text-xs text-cyan-200 overflow-x-auto max-h-60">
                <pre>{activeProject.code}</pre>
              </div>
            </div>

            {/* Testing Procedure & Troubleshooting */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t.projects.testingProcedure}</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {(language === 'ku' ? activeProject.testingStepsKu : activeProject.testingSteps).map((step, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-mono">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{t.projects.troubleshooting}</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {(language === 'ku' ? activeProject.troubleshootingTipsKu : activeProject.troubleshootingTips).map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-400 font-mono">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mark as built action */}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => handleToggleCompleted(activeProject.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  completedProjects.includes(activeProject.id)
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{completedProjects.includes(activeProject.id) ? t.projects.done : t.projects.markDone}</span>
              </button>

              <button
                onClick={() => {
                  toggleSaveProject(activeProject.id);
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5 cursor-pointer"
              >
                <Bookmark className="w-4 h-4 text-amber-400" />
                <span>{userProfile.savedProjects.includes(activeProject.id) ? t.projects.savedProject : t.projects.saveProject}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
