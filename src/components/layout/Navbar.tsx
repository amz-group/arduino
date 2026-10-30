import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';
import { 
  Cpu, 
  BookOpen, 
  Box, 
  Play, 
  Code2, 
  Bot, 
  Workflow, 
  FolderGit2, 
  MapPin, 
  Calculator, 
  Award, 
  Wrench, 
  Users, 
  LayoutDashboard, 
  Languages, 
  Menu, 
  X,
  Sparkles,
  Zap
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, language, setLanguage, t, isRTL, userProfile } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: Array<{ id: PageId; label: string; icon: React.ReactNode; badge?: string }> = [
    { id: 'home', label: t.nav.home, icon: <Cpu className="w-4 h-4 text-cyan-400" /> },
    { id: 'academy', label: t.nav.academy, icon: <BookOpen className="w-4 h-4 text-purple-400" /> },
    { id: 'components', label: t.nav.components, icon: <Box className="w-4 h-4 text-cyan-400" /> },
    { id: 'simulator', label: t.nav.simulator, icon: <Play className="w-4 h-4 text-emerald-400" />, badge: 'Wokwi' },
    { id: 'editor', label: t.nav.editor, icon: <Code2 className="w-4 h-4 text-blue-400" /> },
    { id: 'ai', label: t.nav.ai, icon: <Bot className="w-4 h-4 text-cyan-400" />, badge: 'AI' },
    { id: 'circuit-to-code', label: t.nav.circuitToCode, icon: <Workflow className="w-4 h-4 text-purple-400" /> },
    { id: 'projects', label: t.nav.projects, icon: <FolderGit2 className="w-4 h-4 text-amber-400" /> },
    { id: 'pinout', label: t.nav.pinout, icon: <MapPin className="w-4 h-4 text-rose-400" /> },
    { id: 'calculators', label: t.nav.calculators, icon: <Calculator className="w-4 h-4 text-teal-400" /> },
    { id: 'quiz', label: t.nav.quiz, icon: <Award className="w-4 h-4 text-yellow-400" /> },
    { id: 'troubleshooting', label: t.nav.troubleshooting, icon: <Wrench className="w-4 h-4 text-red-400" /> },
    { id: 'community', label: t.nav.community, icon: <Users className="w-4 h-4 text-indigo-400" /> },
    { id: 'dashboard', label: t.nav.dashboard, icon: <LayoutDashboard className="w-4 h-4 text-cyan-400" /> },
  ];

  const handleNavClick = (id: PageId) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ku' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#070B14]/90 border-b border-cyan-500/20 shadow-lg shadow-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-[2px] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(0,217,255,0.5)]">
              <div className="w-full h-full bg-[#070B14] rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-lg tracking-wider">
                  KRD
                </span>
                <span className="font-bold text-white text-base tracking-wide">
                  ARDUINO
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400/80 px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                  Universe
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
                {t.brand.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation - Key items */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.slice(0, 8).map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    active
                      ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,217,255,0.25)]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-mono px-1 py-0.2 bg-purple-900/60 text-purple-300 rounded border border-purple-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* More dropdown or secondary links */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'ku' ? 'زیاتر' : 'More'}</span>
              </button>
              <div className="absolute right-0 top-full mt-1 w-52 py-2 bg-[#0D1424] border border-cyan-500/30 rounded-xl shadow-2xl backdrop-blur-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                {navItems.slice(8).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-cyan-300 hover:bg-cyan-950/40 text-left transition-colors"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            {/* User XP Badge */}
            <button
              onClick={() => handleNavClick('dashboard')}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-purple-500/30 hover:border-purple-400 transition-all text-xs text-purple-300"
            >
              <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold">{userProfile.xp} XP</span>
              <span className="text-[10px] text-slate-400 font-mono">Lv.{userProfile.level}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-400 text-xs font-medium text-cyan-300 hover:bg-cyan-950/40 transition-all shadow-[0_0_10px_rgba(0,217,255,0.15)]"
              title="Switch language (کوردی / English)"
            >
              <Languages className="w-3.5 h-3.5" />
              <span className="font-semibold">{t.nav.switchLanguage}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-700/50"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0D1424]/95 backdrop-blur-2xl border-b border-cyan-500/30 max-h-[85vh] overflow-y-auto px-4 py-4 space-y-1">
          <div className="p-3 mb-2 rounded-xl bg-slate-900/90 border border-purple-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-bold text-white">{userProfile.name}</span>
            </div>
            <span className="text-xs font-mono text-cyan-400">{userProfile.xp} XP (Lv.{userProfile.level})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'bg-cyan-950/80 border border-cyan-500 text-cyan-300 shadow-[0_0_15px_rgba(0,217,255,0.2)]'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 bg-purple-900/80 text-purple-300 rounded border border-purple-500/40">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
