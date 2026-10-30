import React from 'react';
import { useApp } from '../../context/AppContext';
import { Cpu, Heart, Sparkles, Terminal, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, t, language } = useApp();

  return (
    <footer className="relative bg-[#05080E] border-t border-cyan-500/20 text-slate-400 overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(0,217,255,0.4)]">
                <Cpu className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-base tracking-wide">
                KRD ARDUINO
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              {t.brand.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-cyan-400/90 font-mono">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>100% Free & Open-Source</span>
            </div>
          </div>

          {/* Quick Learning Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 tracking-wider uppercase font-mono">
              {language === 'ku' ? 'فێربوون و کۆدین' : 'Learn & Code'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentPage('academy')} className="hover:text-cyan-400 transition-colors">
                  {t.nav.academy}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('simulator')} className="hover:text-cyan-400 transition-colors">
                  {t.nav.simulator}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('editor')} className="hover:text-cyan-400 transition-colors">
                  {t.nav.editor}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('circuit-to-code')} className="hover:text-cyan-400 transition-colors">
                  {t.nav.circuitToCode}
                </button>
              </li>
            </ul>
          </div>

          {/* Hardware & Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 tracking-wider uppercase font-mono">
              {language === 'ku' ? 'هاردوێر و ئامڕازەکان' : 'Hardware & Tools'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentPage('components')} className="hover:text-cyan-400 transition-colors">
                  {t.nav.components}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('pinout')} className="hover:text-cyan-400 transition-colors">
                  {t.nav.pinout}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('calculators')} className="hover:text-cyan-400 transition-colors">
                  {t.nav.calculators}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('troubleshooting')} className="hover:text-cyan-400 transition-colors">
                  {t.nav.troubleshooting}
                </button>
              </li>
            </ul>
          </div>

          {/* Community & AI */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 tracking-wider uppercase font-mono">
              {language === 'ku' ? 'زیرەکی دەستکرد و کۆمەڵگە' : 'AI & Community'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentPage('ai')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.nav.ai}</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('projects')} className="hover:text-cyan-400 transition-colors">
                  {t.nav.projects}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('community')} className="hover:text-cyan-400 transition-colors">
                  {t.nav.community}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('dashboard')} className="hover:text-cyan-400 transition-colors">
                  {t.nav.dashboard}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} KRD Arduino Universe. Developed for modern embedded engineers & creators.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for Kurdish & Global Technology Innovators</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
