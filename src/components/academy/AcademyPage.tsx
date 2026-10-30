import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { lessonsData } from '../../data/lessonsData';
import { Lesson } from '../../types';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Code2, 
  Play, 
  Copy, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  HelpCircle, 
  Zap, 
  Sparkles, 
  Search,
  Layers,
  Cpu,
  ChevronRight
} from 'lucide-react';

export const AcademyPage: React.FC = () => {
  const { 
    t, 
    language, 
    isRTL, 
    userProfile, 
    toggleCompleteLesson, 
    setActiveEditorCode, 
    setCurrentPage, 
    setActiveSimulatorPreset 
  } = useApp();

  const [selectedLevel, setSelectedLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLesson, setActiveLesson] = useState<Lesson>(lessonsData[0]);
  const [copiedCode, setCopiedCode] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  const NextIcon = isRTL ? ArrowLeft : ArrowRight;
  const PrevIcon = isRTL ? ArrowRight : ArrowLeft;

  // Filter lessons
  const filteredLessons = lessonsData.filter((lesson) => {
    const matchesLevel = selectedLevel === 'all' || lesson.level === selectedLevel;
    const title = language === 'ku' ? lesson.titleKu : lesson.title;
    const desc = language === 'ku' ? lesson.shortDescKu : lesson.shortDesc;
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const currentIndex = lessonsData.findIndex(l => l.id === activeLesson.id);
  const prevLesson = currentIndex > 0 ? lessonsData[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessonsData.length - 1 ? lessonsData[currentIndex + 1] : null;

  const isCompleted = userProfile.completedLessons.includes(activeLesson.id);

  const handleCopyCode = () => {
    if (activeLesson.codeSnippet) {
      navigator.clipboard.writeText(activeLesson.codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleOpenInEditor = () => {
    if (activeLesson.codeSnippet) {
      setActiveEditorCode(activeLesson.codeSnippet);
      setCurrentPage('editor');
    }
  };

  const handleOpenInSim = () => {
    if (activeLesson.id === 'l-beg-2') setActiveSimulatorPreset('blink');
    else if (activeLesson.id === 'l-int-1') setActiveSimulatorPreset('ultrasonic');
    else if (activeLesson.id === 'l-int-2') setActiveSimulatorPreset('servo');
    else if (activeLesson.id === 'l-adv-1') setActiveSimulatorPreset('esp32');
    else setActiveSimulatorPreset('blink');
    setCurrentPage('simulator');
  };

  const selectLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setQuizAnswer(null);
    setShowQuizResult(false);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>KRD Embedded Curriculum</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {t.academy.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            {t.academy.subtitle}
          </p>
        </div>

        {/* User Progress Card */}
        <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#0D1424] border border-cyan-500/30 shadow-lg shadow-black/40">
          <div className="p-2.5 rounded-xl bg-cyan-950/80 text-cyan-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400">{t.academy.progress}</div>
            <div className="text-sm font-bold text-white font-mono">
              {userProfile.completedLessons.length} / {lessonsData.length} {language === 'ku' ? 'وانە' : 'Lessons'}
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Level Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800 w-full sm:w-auto overflow-x-auto">
          {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all whitespace-nowrap cursor-pointer ${
                selectedLevel === lvl
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,217,255,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lvl === 'all' ? t.academy.allLevels : (t.academy as any)[lvl]}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.academy.searchPlaceholder}
            className="w-full bg-[#0D1424] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 pl-9 pr-4 rtl:pl-4 rtl:pr-9 text-xs text-white placeholder-slate-500 outline-none transition-colors"
          />
        </div>
      </div>

      {/* Main Grid: Sidebar List + Active Lesson Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar: Lesson Navigation List */}
        <div className="lg:col-span-4 space-y-2.5 max-h-[800px] overflow-y-auto pr-1">
          {filteredLessons.map((lesson) => {
            const isSelected = activeLesson.id === lesson.id;
            const completed = userProfile.completedLessons.includes(lesson.id);

            return (
              <div
                key={lesson.id}
                onClick={() => selectLesson(lesson)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-500 shadow-[0_0_20px_rgba(0,217,255,0.2)]'
                    : 'bg-[#0D1424] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-bold ${
                      lesson.level === 'beginner' 
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                        : lesson.level === 'intermediate'
                        ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30'
                        : 'bg-purple-950 text-purple-400 border border-purple-500/30'
                    }`}>
                      {lesson.level}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {lesson.duration}
                    </span>
                  </div>

                  {completed ? (
                    <span title="Completed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-950" />
                    </span>
                  ) : (
                    <Circle className="w-4 h-4 text-slate-600" />
                  )}
                </div>

                <h3 className={`text-xs font-bold mt-2 transition-colors ${
                  isSelected ? 'text-cyan-300' : 'text-slate-200'
                }`}>
                  {language === 'ku' ? lesson.titleKu : lesson.title}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Main Content Viewer: Active Lesson */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1424] border border-cyan-500/30 space-y-8 shadow-2xl">
            
            {/* Lesson Title & Top Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                    {activeLesson.level}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{activeLesson.duration}</span>
                </div>
                <h2 className="text-2xl font-black text-white">
                  {language === 'ku' ? activeLesson.titleKu : activeLesson.title}
                </h2>
              </div>

              {/* Complete Toggle Button */}
              <button
                onClick={() => toggleCompleteLesson(activeLesson.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isCompleted
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{isCompleted ? t.academy.completed : t.academy.markCompleted}</span>
              </button>
            </div>

            {/* Learning Objectives */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-purple-500/30 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.academy.lessonObjectives}</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {(language === 'ku' ? activeLesson.objectivesKu : activeLesson.objectives).map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* In-depth Content */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line font-sans">
              {language === 'ku' ? activeLesson.contentKu : activeLesson.content}
            </div>

            {/* Circuit & Wiring Diagram (if available) */}
            {activeLesson.circuitInfo && (
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" />
                  <span>{t.academy.wiringSchematic}</span>
                </h4>
                
                <div className="text-xs text-slate-300">
                  <span className="font-semibold text-white">{language === 'ku' ? 'بۆردی سەرەکی:' : 'Target Board:'} </span>
                  <span className="font-mono text-cyan-300">{activeLesson.circuitInfo.board}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {activeLesson.circuitInfo.wiring.map((w, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#070B14] border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between font-mono text-[11px]">
                        <span className="text-cyan-400">{w.from}</span>
                        <NextIcon className="w-3 h-3 text-slate-500" />
                        <span className="text-purple-400">{w.to}</span>
                      </div>
                      {w.note && (
                        <p className="text-[10px] text-slate-500 italic">{w.note}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Code Snippet Box */}
            {activeLesson.codeSnippet && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-cyan-400 font-semibold flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>{t.academy.codeExample}</span>
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyCode}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? t.common.copied : t.common.copy}</span>
                    </button>

                    <button
                      onClick={handleOpenInEditor}
                      className="px-2.5 py-1 rounded-lg bg-blue-950 hover:bg-blue-900 border border-blue-500/40 text-blue-300 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>{t.academy.openInEditor}</span>
                    </button>

                    <button
                      onClick={handleOpenInSim}
                      className="px-2.5 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>{t.academy.openInSim}</span>
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#070B14] border border-slate-800 p-4 font-mono text-xs text-cyan-200 overflow-x-auto leading-relaxed shadow-inner">
                  <pre>{activeLesson.codeSnippet}</pre>
                </div>
              </div>
            )}

            {/* Practical Exercise Challenge */}
            <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>{t.academy.exercise}</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'ku' ? activeLesson.exercisePromptKu : activeLesson.exercisePrompt}
              </p>
            </div>

            {/* Mini Knowledge Quiz */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/40 space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <h4 className="text-sm font-bold text-white">{t.academy.quizTitle}</h4>
              </div>

              <p className="text-xs font-medium text-slate-200">
                {language === 'ku' ? activeLesson.miniQuiz.questionKu : activeLesson.miniQuiz.question}
              </p>

              <div className="space-y-2">
                {(language === 'ku' ? activeLesson.miniQuiz.optionsKu : activeLesson.miniQuiz.options).map((opt, optIdx) => {
                  const isSelected = quizAnswer === optIdx;
                  const isCorrect = activeLesson.miniQuiz.correctIndex === optIdx;
                  let btnStyle = 'bg-[#070B14] border-slate-800 text-slate-300 hover:border-slate-700';
                  
                  if (showQuizResult) {
                    if (isCorrect) btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300';
                    else if (isSelected) btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300';
                  } else if (isSelected) {
                    btnStyle = 'bg-cyan-950 border-cyan-500 text-cyan-300';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={showQuizResult}
                      onClick={() => {
                        setQuizAnswer(optIdx);
                        setShowQuizResult(true);
                      }}
                      className={`w-full p-3 rounded-xl border text-xs text-left rtl:text-right font-medium transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {showQuizResult && isCorrect && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {showQuizResult && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                  <div className="font-semibold text-cyan-400">
                    {language === 'ku' ? 'ڕوونکردنەوەی زانستی:' : 'Explanation:'}
                  </div>
                  <p className="text-slate-300">
                    {language === 'ku' ? activeLesson.miniQuiz.explanationKu : activeLesson.miniQuiz.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Prev / Next Navigation */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              {prevLesson ? (
                <button
                  onClick={() => selectLesson(prevLesson)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-2 border border-slate-800 cursor-pointer"
                >
                  <PrevIcon className="w-4 h-4" />
                  <span>{t.academy.prevLesson}</span>
                </button>
              ) : <div />}

              {nextLesson && (
                <button
                  onClick={() => selectLesson(nextLesson)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(0,217,255,0.3)] cursor-pointer"
                >
                  <span>{t.academy.nextLesson}</span>
                  <NextIcon className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
