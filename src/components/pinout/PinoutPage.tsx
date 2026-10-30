import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { pinoutsData } from '../../data/pinoutsData';
import { BoardPin, BoardPinout } from '../../types';
import { 
  MapPin, 
  Cpu, 
  Zap, 
  Radio, 
  Copy, 
  Check, 
  Code2, 
  Info,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

export const PinoutPage: React.FC = () => {
  const { t, language, setActiveEditorCode, setCurrentPage } = useApp();
  
  const [activeBoardId, setActiveBoardId] = useState<string>('uno');
  const [pinFilter, setPinFilter] = useState<'all' | 'digital' | 'analog' | 'pwm' | 'power' | 'communication'>('all');
  
  const currentBoard = pinoutsData.find(b => b.id === activeBoardId) || pinoutsData[0];
  const [selectedPin, setSelectedPin] = useState<BoardPin>(currentBoard.pins[0]);
  const [copiedCode, setCopiedCode] = useState(false);

  // Switch board
  const handleBoardSelect = (bId: string) => {
    setActiveBoardId(bId);
    const b = pinoutsData.find(x => x.id === bId) || pinoutsData[0];
    setSelectedPin(b.pins[0]);
  };

  const filteredPins = currentBoard.pins.filter((p) => {
    if (pinFilter === 'all') return true;
    if (pinFilter === 'power') return p.type === 'power' || p.type === 'ground';
    return p.type === pinFilter;
  });

  const getPinColor = (type: string) => {
    switch (type) {
      case 'digital': return 'bg-cyan-500 text-slate-950 border-cyan-400';
      case 'analog': return 'bg-purple-500 text-white border-purple-400';
      case 'pwm': return 'bg-emerald-500 text-slate-950 border-emerald-400';
      case 'power': return 'bg-rose-500 text-white border-rose-400';
      case 'ground': return 'bg-slate-700 text-white border-slate-600';
      case 'communication': return 'bg-amber-500 text-slate-950 border-amber-400';
      default: return 'bg-slate-800 text-slate-200 border-slate-700';
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-cyan-500/20 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-400 text-xs font-mono mb-2">
          <MapPin className="w-3.5 h-3.5" />
          <span>Interactive Microcontroller Hardware Map</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {t.pinout.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          {t.pinout.subtitle}
        </p>
      </div>

      {/* Board Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono uppercase text-slate-400 font-semibold mr-2 rtl:mr-0 rtl:ml-2">
          {t.pinout.selectBoard}:
        </span>
        {pinoutsData.map((b) => (
          <button
            key={b.id}
            onClick={() => handleBoardSelect(b.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeBoardId === b.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-[0_0_20px_rgba(0,217,255,0.4)]'
                : 'bg-[#0D1424] text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{b.name}</span>
          </button>
        ))}
      </div>

      {/* Pin Type Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: t.pinout.filterAll },
          { id: 'digital', label: t.pinout.filterDigital, color: 'text-cyan-400' },
          { id: 'analog', label: t.pinout.filterAnalog, color: 'text-purple-400' },
          { id: 'pwm', label: t.pinout.filterPwm, color: 'text-emerald-400' },
          { id: 'power', label: t.pinout.filterPower, color: 'text-rose-400' },
          { id: 'communication', label: t.pinout.filterComms, color: 'text-amber-400' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setPinFilter(f.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              pinFilter === f.id
                ? 'bg-slate-800 text-white border border-cyan-500/50'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <span className={f.color}>{f.label}</span>
          </button>
        ))}
      </div>

      {/* Main Grid: Interactive Board Layout + Pin Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Board Visual Pin Matrix */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#0D1424] border border-cyan-500/30 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">{currentBoard.name}</h3>
              <p className="text-[11px] font-mono text-cyan-400 mt-0.5">
                {currentBoard.chip} • {currentBoard.clockSpeed} • {currentBoard.voltage}
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500">
              {filteredPins.length} pins visible
            </span>
          </div>

          <p className="text-xs text-slate-400 italic">
            {t.pinout.hoverInstruction}
          </p>

          {/* Interactive Pin List / Header Emulation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
            {filteredPins.map((p) => {
              const isSelected = selectedPin.pin === p.pin;
              return (
                <div
                  key={p.pin}
                  onClick={() => setSelectedPin(p)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_15px_rgba(0,217,255,0.3)] scale-[1.02]'
                      : 'bg-[#070B14] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 border ${getPinColor(p.type)}`}>
                      {p.pin.replace('Digital Pin ', 'D').replace('GPIO ', '')}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">{p.name}</h4>
                      <span className="text-[10px] text-slate-500 font-mono capitalize">{p.type}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-cyan-400 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                    {p.voltage}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Pin Inspector Drawer */}
        <div className="lg:col-span-5">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1424] border border-cyan-500/30 space-y-6 shadow-2xl h-full flex flex-col justify-between">
            <div className="space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl font-mono font-bold flex items-center justify-center text-sm shadow-md border ${getPinColor(selectedPin.type)}`}>
                    {selectedPin.pin}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedPin.name}</h3>
                    <span className="text-xs font-mono text-cyan-400 capitalize">{selectedPin.type} Domain</span>
                  </div>
                </div>
              </div>

              {/* Specs Table */}
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">{t.pinout.voltage}:</span>
                  <span className="font-mono font-bold text-white">{selectedPin.voltage}</span>
                </div>

                {selectedPin.protocols && selectedPin.protocols.length > 0 && (
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="text-slate-400 block">{t.pinout.protocols}:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedPin.protocols.map((proto, idx) => (
                        <span key={idx} className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                          {proto}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-mono uppercase text-[10px] block">{t.pinout.description}:</span>
                  <p className="text-slate-200 leading-relaxed">
                    {language === 'ku' ? selectedPin.descriptionKu : selectedPin.description}
                  </p>
                </div>
              </div>

              {/* Example C++ Setup */}
              {selectedPin.exampleCode && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5" />
                      <span>{t.pinout.codeSample}</span>
                    </span>
                    <button
                      onClick={() => handleCopyCode(selectedPin.exampleCode!)}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode ? t.common.copied : t.common.copy}</span>
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-[#070B14] border border-slate-800 font-mono text-xs text-cyan-200">
                    <code>{selectedPin.exampleCode}</code>
                  </div>
                </div>
              )}

            </div>

            <button
              onClick={() => {
                if (selectedPin.exampleCode) {
                  setActiveEditorCode(`// Pin Setup for ${selectedPin.name}\nvoid setup() {\n  ${selectedPin.exampleCode}\n}\nvoid loop() {}`);
                  setCurrentPage('editor');
                }
              }}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-500 text-cyan-400 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <Code2 className="w-4 h-4" />
              <span>{language === 'ku' ? 'تاقیکردنەوە لە ستۆدیۆی کۆد' : 'Load in Code Studio'}</span>
            </button>

          </div>
        </div>

      </div>

    </div>
  );
};
