import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Play, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  ExternalLink, 
  Cpu, 
  HelpCircle, 
  Lightbulb, 
  Code2, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface SimulatorPreset {
  id: string;
  name: string;
  nameKu: string;
  board: string;
  components: string[];
  wokwiUrl: string;
  description: string;
  descriptionKu: string;
}

export const SimulatorPage: React.FC = () => {
  const { t, language, activeSimulatorPreset, setActiveSimulatorPreset, setCurrentPage } = useApp();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const presets: SimulatorPreset[] = [
    {
      id: 'blink',
      name: t.simulator.presetBlink,
      nameKu: 'ئاردوینۆ ئۆنۆ - ترووکاندنی لید (LED Blink)',
      board: 'Arduino Uno R3',
      components: ['Arduino Uno', 'Red 5mm LED', '220Ω Resistor'],
      wokwiUrl: 'https://wokwi.com/projects/new/arduino-uno',
      description: 'The "Hello World" of physical computing. Test basic digital output toggling at 1Hz frequency.',
      descriptionKu: 'سەرەتاییترین بەرنامەی ئاردوینۆ بۆ ترووکاندنی لید بە فریکوێنسی ١ چرکە بە ١ چرکە.'
    },
    {
      id: 'ultrasonic',
      name: t.simulator.presetUltrasonic,
      nameKu: 'هەستەوەری دوری پێوی ئەڵتراسۆنیک HC-SR04',
      board: 'Arduino Uno R3',
      components: ['Arduino Uno', 'HC-SR04 Ultrasonic Sonar', 'Virtual Obstacle Slider'],
      wokwiUrl: 'https://wokwi.com/projects/305566932847821378',
      description: 'Simulates acoustic pulse reflection. Click on the sensor in simulation to drag the virtual obstacle.',
      descriptionKu: 'پێوانەکردنی دووری. کرتە لەسەر هەستەوەرەکە بکە لەناو سیمولەیتەر بۆ گۆڕینی شوێنی تەنەکە.'
    },
    {
      id: 'servo',
      name: t.simulator.presetServo,
      nameKu: 'مۆتۆڕی سێرڤۆ SG90 و کۆنترۆڵی زاویە',
      board: 'Arduino Uno R3',
      components: ['Arduino Uno', 'SG90 Micro Servo', 'Potentiometer'],
      wokwiUrl: 'https://wokwi.com/projects/305567302484394562',
      description: 'Closed-loop 50Hz PWM angle steering between 0 and 180 degrees with real-time visual rotation.',
      descriptionKu: 'کۆنترۆڵکردنی زاویەی سێرڤۆ مۆتۆڕ لە نێوان ٠ تا ١٨٠ پلە بە بینینی سوڕانەوەی ڕاستەوخۆ.'
    },
    {
      id: 'lcd',
      name: t.simulator.presetLcd,
      nameKu: 'شاشەی LCD 1602 بە پرۆتۆکۆلی I2C',
      board: 'Arduino Uno R3',
      components: ['Arduino Uno', '16x2 Character LCD (PCF8574 Backpack)'],
      wokwiUrl: 'https://wokwi.com/projects/305567634842190402',
      description: 'Renders custom text characters and animations over 2-wire serial I2C bus.',
      descriptionKu: 'نیشاندانی تێکست و ژمارە لەسەر شاشەی کارەبایی بە تەنها دوو وایەری I2C.'
    },
    {
      id: 'esp32',
      name: t.simulator.presetEsp32,
      nameKu: 'مایکرۆکۆنترۆلەری ESP32 و بازنەی ڕەنگی NeoPixel',
      board: 'ESP32 DevKit',
      components: ['ESP32 Dual-Core', 'WS2812B NeoPixel Ring (16 LEDs)'],
      wokwiUrl: 'https://wokwi.com/projects/new/esp32',
      description: 'High-speed 240MHz 32-bit execution with cascading RGB color wave effects.',
      descriptionKu: 'کارپێکردنی مایکرۆکۆنترۆلەری بەهێزی ESP32 لەگەڵ بازنەی لیدی ڕەنگاوڕەنگی زیرەک.'
    }
  ];

  const currentPreset = presets.find(p => p.id === activeSimulatorPreset) || presets[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2">
            <Play className="w-3.5 h-3.5" />
            <span>Official Wokwi Engine Integration</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {t.simulator.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            {t.simulator.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={currentPreset.wokwiUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            <span>Open in Wokwi Standalone</span>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          </a>
        </div>
      </div>

      {/* Preset Switcher Carousel */}
      <div className="space-y-2">
        <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
          {t.simulator.selectPreset}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {presets.map((p) => {
            const active = p.id === currentPreset.id;
            return (
              <button
                key={p.id}
                onClick={() => setActiveSimulatorPreset(p.id)}
                className={`p-3.5 rounded-2xl border text-left rtl:text-right transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  active
                    ? 'bg-cyan-950/60 border-cyan-500 shadow-[0_0_20px_rgba(0,217,255,0.25)]'
                    : 'bg-[#0D1424] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">{p.board}</span>
                  {active && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                </div>
                <h4 className={`text-xs font-bold ${active ? 'text-white' : 'text-slate-300'}`}>
                  {language === 'ku' ? p.nameKu : p.name}
                </h4>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Simulator Workspace */}
      <div className={`relative rounded-3xl bg-[#0D1424] border border-cyan-500/30 overflow-hidden shadow-2xl transition-all ${
        isFullscreen ? 'fixed inset-4 z-50 rounded-2xl' : 'h-[650px]'
      }`}>
        
        {/* Workspace Toolbar */}
        <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 px-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-xs font-mono text-slate-400 font-semibold border-l border-slate-800 pl-3">
              {currentPreset.board} | {language === 'ku' ? currentPreset.nameKu : currentPreset.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs flex items-center gap-1 cursor-pointer"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4 text-cyan-400" /> : <Maximize2 className="w-4 h-4 text-cyan-400" />}
              <span className="hidden sm:inline">{isFullscreen ? 'Exit Fullscreen' : t.simulator.openFullscreen}</span>
            </button>
          </div>
        </div>

        {/* Embedded Iframe */}
        <iframe
          key={currentPreset.id}
          src={currentPreset.wokwiUrl}
          className="w-full h-[calc(100%-48px)] border-0"
          title="Wokwi Arduino Simulator"
          loading="lazy"
          allow="cross-origin-isolated; autoplay"
        />
      </div>

      {/* Quick Guide & Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
            <Play className="w-4 h-4" />
            <span>{language === 'ku' ? 'هەنگاوی یەکەم' : 'Step 1: Start Simulation'}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t.simulator.guide1}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold">
            <Lightbulb className="w-4 h-4" />
            <span>{language === 'ku' ? 'هەنگاوی دووەم' : 'Step 2: Interact With Parts'}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t.simulator.guide2}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
            <Code2 className="w-4 h-4" />
            <span>{language === 'ku' ? 'هەنگاوی سێیەم' : 'Step 3: Modify Firmware'}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t.simulator.guide3}
          </p>
        </div>
      </div>

    </div>
  );
};
