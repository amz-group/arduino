import React from 'react';
import { useApp } from '../../context/AppContext';
import { lessonsData } from '../../data/lessonsData';
import { projectsData } from '../../data/projectsData';
import { componentsData } from '../../data/componentsData';
import { 
  BookOpen, 
  Play, 
  FolderGit2, 
  Bot, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Shield, 
  Users, 
  Code, 
  Radio, 
  Compass, 
  Activity,
  Layers,
  ChevronRight,
  Star
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setCurrentPage, t, language, isRTL, setActiveSimulatorPreset } = useApp();

  const NextIcon = isRTL ? ArrowLeft : ArrowRight;

  const stats = [
    { label: t.hero.statsLearners, value: '14,800+', icon: <Users className="w-5 h-5 text-cyan-400" /> },
    { label: t.hero.statsComponents, value: '120+', icon: <Cpu className="w-5 h-5 text-purple-400" /> },
    { label: t.hero.statsProjects, value: '85+', icon: <FolderGit2 className="w-5 h-5 text-blue-400" /> },
    { label: t.hero.statsFree, value: '100%', icon: <Shield className="w-5 h-5 text-emerald-400" /> },
  ];

  const features = [
    {
      title: language === 'ku' ? 'ئەکادیمیای قۆناغ بە قۆناغ' : 'Structured Academy',
      desc: language === 'ku' ? 'مەنهەجی زانستی لە بنەماکانی لیدەوە هەتا مایکرۆکۆنترۆلەری پێشکەوتووی ESP32.' : 'From beginner Ohm\'s law circuits to advanced dual-core ESP32 IoT nodes.',
      icon: <BookOpen className="w-6 h-6 text-cyan-400" />,
      action: () => setCurrentPage('academy'),
      badge: 'Curriculum'
    },
    {
      title: language === 'ku' ? 'سیمولەیتەری ڕاستەقینەی Wokwi' : 'Real Circuit Simulator',
      desc: language === 'ku' ? 'بەستن و تاقیکردنەوەی ئۆنلاین بەبێ ترسی سووتانی پارچە ئەلیکترۆنیەکان.' : 'Interactive hardware and MCU emulation sandbox with live debugging.',
      icon: <Play className="w-6 h-6 text-emerald-400" />,
      action: () => setCurrentPage('simulator'),
      badge: 'Interactive'
    },
    {
      title: language === 'ku' ? 'یاریدەدەری زیرەکی دەستکرد' : 'Arduino AI Assistant',
      desc: language === 'ku' ? 'کۆد دروست بکە، هەڵەکانی کۆد بدۆزەرەوە، و نەخشەی پینەکان بە کوردی بپشکنە.' : 'Specialized electronics neural agent for C++ debugging and circuit math.',
      icon: <Bot className="w-6 h-6 text-purple-400" />,
      action: () => setCurrentPage('ai'),
      badge: 'Gemini 3.8'
    },
    {
      title: language === 'ku' ? 'بازنە بۆ کۆد (Circuit to Code)' : 'Circuit-to-Code Generator',
      desc: language === 'ku' ? 'پارچەکان دیاریبکە تا سیستەمەکە نەخشەی بەستنی پین و کۆدەکەت بۆ بنوسێت.' : 'Select microcontrollers and peripherals to generate verified sketches and wiring tables.',
      icon: <Code className="w-6 h-6 text-blue-400" />,
      action: () => setCurrentPage('circuit-to-code'),
      badge: 'Unique Tool'
    },
    {
      title: language === 'ku' ? 'ڕێبەری پینەکان (Pinout)' : 'Pinout Explorer',
      desc: language === 'ku' ? 'نەخشەی ڕاستەوخۆی پینەکان لەگەڵ دۆخی PWM، ئانالۆگ و پەیوەندی I2C/SPI.' : 'Interactive board headers showing voltage levels, communication buses, and timer PWM.',
      icon: <Radio className="w-6 h-6 text-rose-400" />,
      action: () => setCurrentPage('pinout'),
      badge: 'Interactive'
    },
    {
      title: language === 'ku' ? 'ژمێرەرە ئەلیکترۆنیەکان' : 'Engineering Calculators',
      desc: language === 'ku' ? 'یاسای ئۆم، بەرگری لید، دابەشکەری ڤۆڵتیە و کاتی پاتری لە یەک شوێندا.' : 'Validated precision calculators with schematics, mathematical formulas, and design tips.',
      icon: <Compass className="w-6 h-6 text-amber-400" />,
      action: () => setCurrentPage('calculators'),
      badge: 'Calculators'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden circuit-bg border-b border-cyan-500/20">
        
        {/* Futuristic glowing spheres */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 shadow-[0_0_20px_rgba(0,217,255,0.2)]">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-xs font-semibold text-cyan-300 font-mono tracking-wide">
                {t.hero.badge}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {language === 'ku' ? (
                <>
                  بەخێربێن بۆ <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 glow-text-cyan">KRD Arduino Universe</span>
                </>
              ) : (
                <>
                  Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 glow-text-cyan">KRD Arduino Universe</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {t.hero.subtitle}
            </p>

            {/* 4 Main Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => setCurrentPage('academy')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(0,217,255,0.4)] transition-all duration-300 flex items-center gap-2 group cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-slate-950" />
                <span>{t.hero.startLearning}</span>
                <NextIcon className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setActiveSimulatorPreset('blink');
                  setCurrentPage('simulator');
                }}
                className="px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 hover:border-emerald-400 font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4" />
                <span>{t.hero.openSimulator}</span>
              </button>

              <button
                onClick={() => setCurrentPage('projects')}
                className="px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-500/40 hover:border-amber-400 font-bold text-sm shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>{t.hero.exploreProjects}</span>
              </button>

              <button
                onClick={() => setCurrentPage('ai')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-900/80 to-indigo-900/80 hover:from-purple-800 hover:to-indigo-800 text-purple-200 border border-purple-500/50 hover:border-purple-400 font-bold text-sm shadow-[0_0_25px_rgba(128,87,255,0.3)] transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <Bot className="w-4 h-4 text-purple-300" />
                <span>{t.hero.askAi}</span>
              </button>
            </div>

            {/* Quick Microcontroller Badges */}
            <div className="pt-6 flex items-center justify-center gap-2 text-xs text-slate-400 flex-wrap">
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 font-mono text-cyan-400">Arduino Uno R3</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 font-mono text-blue-400">Arduino Nano</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 font-mono text-purple-400">Arduino Mega 2560</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 font-mono text-emerald-400">ESP32 Dual-Core</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 font-mono text-rose-400">ESP8266 Wi-Fi</span>
            </div>

          </div>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-[#0D1424]/90 border border-cyan-500/20 backdrop-blur-xl flex items-center gap-4 hover:border-cyan-500/50 transition-colors shadow-lg shadow-black/40"
              >
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/50">
                  {s.icon}
                </div>
                <div>
                  <div className="text-2xl font-black text-white font-mono tracking-tight">{s.value}</div>
                  <div className="text-xs text-slate-400 font-medium">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FEATURE CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.home.featuresTitle}
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            {t.home.featuresSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              onClick={feat.action}
              className="p-6 rounded-2xl bg-[#0D1424]/80 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,217,255,0.15)] group cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700 group-hover:border-cyan-500/40 transition-colors">
                    {feat.icon}
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    {feat.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
              <div className="pt-6 flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                <span>{language === 'ku' ? 'چوونە ژوورەوە' : 'Open Module'}</span>
                <NextIcon className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LEARNING PATHS (BEGINNER / INTERMEDIATE / ADVANCED) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0D1424] via-[#090E1B] to-[#070B14] border border-cyan-500/30 relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl space-y-3 mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              {language === 'ku' ? 'ڕێڕەوی خوێندنی ئەندازیاری' : 'Engineering Progression'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {t.home.pathsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {t.home.pathsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Beginner */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-400 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    Tier 01
                  </span>
                  <Zap className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white">{t.home.beginnerPath}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{t.home.beginnerPathDesc}</p>
              </div>
              <button
                onClick={() => setCurrentPage('academy')}
                className="w-full py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>{t.home.explorePath}</span>
                <NextIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Intermediate */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-400 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                    Tier 02
                  </span>
                  <Layers className="w-4 h-4 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white">{t.home.intermediatePath}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{t.home.intermediatePathDesc}</p>
              </div>
              <button
                onClick={() => setCurrentPage('academy')}
                className="w-full py-2.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>{t.home.explorePath}</span>
                <NextIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Advanced */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-purple-500/30 hover:border-purple-400 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-purple-950 text-purple-400 border border-purple-500/30">
                    Tier 03
                  </span>
                  <Cpu className="w-4 h-4 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white">{t.home.advancedPath}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{t.home.advancedPathDesc}</p>
              </div>
              <button
                onClick={() => setCurrentPage('academy')}
                className="w-full py-2.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>{t.home.explorePath}</span>
                <NextIcon className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* POPULAR LESSONS & FEATURED PROJECTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {t.home.popularTutorials}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'ku' ? 'وانە سەرەکییەکان بە وێنە و کۆد و تاقیکردنەوە' : 'Verified hands-on lessons with hardware schematics and C++ code'}
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('academy')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>{language === 'ku' ? 'هەموو وانەکان' : 'View All'}</span>
            <NextIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lessonsData.slice(0, 3).map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => setCurrentPage('academy')}
              className="p-5 rounded-2xl bg-[#0D1424] border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                    {lesson.level}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{lesson.duration}</span>
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                  {language === 'ku' ? lesson.titleKu : lesson.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {language === 'ku' ? lesson.shortDescKu : lesson.shortDesc}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="text-[11px] font-mono text-purple-400">3 Objectives</span>
                <span className="text-cyan-400 group-hover:underline flex items-center gap-1 font-semibold">
                  {language === 'ku' ? 'خوێندنەوە' : 'Study'}
                  <NextIcon className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {t.home.featuredProjects}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'ku' ? 'پڕۆژەی تاقیکراوە بە لیستی پارچەکان و تێچووی خەمڵێنراو' : 'Complete hardware builds with circuit diagrams and verified firmware'}
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('projects')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>{language === 'ku' ? 'هەموو پڕۆژەکان' : 'Explore All'}</span>
            <NextIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.slice(0, 3).map((proj) => (
            <div
              key={proj.id}
              onClick={() => setCurrentPage('projects')}
              className="rounded-2xl bg-[#0D1424] border border-slate-800 hover:border-purple-500/50 overflow-hidden transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1424] via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-slate-900/90 text-cyan-300 border border-cyan-500/40">
                    {language === 'ku' ? proj.categoryKu : proj.category}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-bold text-sm text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                  {language === 'ku' ? proj.titleKu : proj.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {language === 'ku' ? proj.summaryKu : proj.summary}
                </p>

                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-emerald-400 font-bold">{proj.estimatedCost}</span>
                  <span>{proj.timeNeeded}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR COMPONENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {t.home.popularComponents}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'ku' ? 'پارچە ئەلیکترۆنیە باوەکان بە ڤۆڵتیە و تایبەتمەندی تەکنیکی' : 'Verified electronics components with electrical specifications and wiring diagrams'}
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('components')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>{language === 'ku' ? 'کتێبخانەی پارچەکان' : 'View Library'}</span>
            <NextIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {componentsData.slice(0, 4).map((comp) => (
            <div
              key={comp.id}
              onClick={() => setCurrentPage('components')}
              className="p-4 rounded-xl bg-[#0D1424] border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer group"
            >
              <div className="w-full h-28 rounded-lg overflow-hidden bg-slate-900 mb-3">
                <img src={comp.image} alt={comp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <h4 className="font-bold text-xs text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                {comp.name}
              </h4>
              <p className="text-[10px] text-cyan-400 font-mono mt-1">{comp.operatingVoltage}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {t.home.testimonialsTitle}
            </h2>
            <p className="text-xs text-slate-400">
              {language === 'ku' ? 'ئەزموونی فێرخوازان و دروستکەرانی پڕۆژە بە زمانی کوردی و ئینگلیزی' : 'Voices of makers, polytechnic students, and embedded software architects'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-[#070B14] border border-slate-800 space-y-3">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                {language === 'ku' 
                  ? '"بۆ یەکەمجارە پلاتفۆرمێکی ئەلیکترۆنی هێندە دەوڵەمەند بە زمانی کوردی بەردەست دەبێت. ڕێبەری پینەکان و وەرگێڕانی دروستی دەستەواژە تەکنیکییەکان بێوێنەیە."'
                  : '"Finally a modern embedded engineering platform with pristine technical precision, dual Kurdish/English interface, and instant interactive simulator."'}
              </p>
              <div className="text-xs font-semibold text-white">Hawkar Slemani</div>
              <div className="text-[10px] text-cyan-400 font-mono">Mechatronics Student, University of Sulaimani</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#070B14] border border-slate-800 space-y-3">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                {language === 'ku'
                  ? '"زیرەکی دەستکردەکەی لە ئاستێکی زۆر باڵادایە. کاتێک کێشەی تەزووی سێرڤۆ مۆتۆڕم هەبوو لە چەند چرکەیەکدا هۆکاری reset بوونەکەی بۆ ڕوونکردمەوە."'
                  : '"The Arduino AI assistant diagnosed my brownout reset issue within seconds and explained the exact decoupling capacitor setup needed."'}
              </p>
              <div className="text-xs font-semibold text-white">Rebin K. Barzan</div>
              <div className="text-[10px] text-purple-400 font-mono">IoT Firmware Engineer, Erbil Tech Hub</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#070B14] border border-slate-800 space-y-3">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                {language === 'ku'
                  ? '"ژمێرەری یاسای ئۆم و بەرگری لید ڕزگارکەری هەموو کەسێکە لە کاتی دروستکردنی بۆرد و تەختەی برێدبۆرد."'
                  : '"The electronics calculators and Wokwi simulator integration allow my high school robotics club to build safe circuits without blowing up components."'}
              </p>
              <div className="text-xs font-semibold text-white">Duhok Maker Space</div>
              <div className="text-[10px] text-emerald-400 font-mono">STEM Education Club</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-cyan-950/70 via-blue-950/70 to-purple-950/70 border border-cyan-500/40 text-center space-y-6 shadow-[0_0_50px_rgba(0,217,255,0.15)]">
          <h2 className="text-3xl font-black text-white">
            {t.home.readyToInnovate}
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            {t.home.joinThousands}
          </p>
          <button
            onClick={() => setCurrentPage('academy')}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold text-sm shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>{t.home.launchApp}</span>
          </button>
        </div>
      </section>

    </div>
  );
};
