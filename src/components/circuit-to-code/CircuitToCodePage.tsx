import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Workflow, 
  Cpu, 
  Box, 
  Code2, 
  Play, 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight,
  Layers,
  ShieldCheck
} from 'lucide-react';

export const CircuitToCodePage: React.FC = () => {
  const { t, language, setActiveEditorCode, setCurrentPage, setActiveSimulatorPreset } = useApp();

  const [selectedBoard, setSelectedBoard] = useState('Arduino Uno R3');
  const [selectedComponents, setSelectedComponents] = useState<string[]>([
    'HC-SR04 Ultrasonic Sensor',
    'SG90 Micro Servo'
  ]);
  const [projectGoal, setProjectGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const availableBoards = [
    'Arduino Uno R3',
    'Arduino Nano',
    'Arduino Mega 2560',
    'ESP32 NodeMCU DevKit',
    'ESP8266 NodeMCU'
  ];

  const availableComponents = [
    { name: 'Red 5mm LED', category: 'Actuators' },
    { name: 'Piezo Buzzer (Active / Passive)', category: 'Actuators' },
    { name: 'HC-SR04 Ultrasonic Sensor', category: 'Sensors' },
    { name: 'SG90 Micro Servo', category: 'Actuators' },
    { name: 'DHT11 / DHT22 Temp & Humidity', category: 'Sensors' },
    { name: '1602 LCD with I2C Backpack', category: 'Displays' },
    { name: '0.96 inch I2C OLED (SSD1306)', category: 'Displays' },
    { name: 'HC-SR501 PIR Motion Sensor', category: 'Sensors' },
    { name: '5V Single Channel Relay Module', category: 'Power' },
    { name: 'L298N Dual DC Motor Driver', category: 'Actuators' },
    { name: '10kΩ Potentiometer (Analog Input)', category: 'Sensors' },
    { name: 'Tactile Pushbutton (Pull-up)', category: 'Sensors' },
    { name: 'WS2812B NeoPixel RGB Ring', category: 'Displays' }
  ];

  const toggleComponent = (compName: string) => {
    if (selectedComponents.includes(compName)) {
      setSelectedComponents(selectedComponents.filter(c => c !== compName));
    } else {
      setSelectedComponents([...selectedComponents, compName]);
    }
  };

  const handleGenerate = async () => {
    if (selectedComponents.length === 0) return;
    setIsGenerating(true);
    setGeneratedResult(null);

    try {
      const res = await fetch('/api/gemini/circuit-to-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          board: selectedBoard,
          components: selectedComponents,
          description: projectGoal,
          language
        })
      });

      const data = await res.json();
      if (res.ok && data.result) {
        setGeneratedResult(data.result);
      } else {
        setGeneratedResult(data.error || 'Failed to generate circuit code.');
      }
    } catch (err: any) {
      setGeneratedResult(`Error: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCode = () => {
    if (generatedResult) {
      navigator.clipboard.writeText(generatedResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const extractCode = (markdown: string) => {
    const match = markdown.match(/```(?:cpp|c|arduino)?([\s\S]*?)```/);
    return match ? match[1].trim() : markdown;
  };

  const handleSendToEditor = () => {
    if (generatedResult) {
      const codeOnly = extractCode(generatedResult);
      setActiveEditorCode(codeOnly);
      setCurrentPage('editor');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-cyan-500/20 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
          <Workflow className="w-3.5 h-3.5" />
          <span>Intelligent Hardware Synthesizer</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {t.circuitToCode.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          {t.circuitToCode.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Board & Component Selection */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Step 1: Select Board */}
          <div className="p-6 rounded-3xl bg-[#0D1424] border border-cyan-500/30 space-y-4 shadow-xl">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>{t.circuitToCode.chooseBoard}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {availableBoards.map((b) => {
                const isSelected = selectedBoard === b;
                return (
                  <button
                    key={b}
                    onClick={() => setSelectedBoard(b)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left rtl:text-right transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-300 shadow-[0_0_15px_rgba(0,217,255,0.2)]'
                        : 'bg-[#070B14] border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{b}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Choose Components */}
          <div className="p-6 rounded-3xl bg-[#0D1424] border border-purple-500/30 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center gap-2">
                <Box className="w-4 h-4" />
                <span>{t.circuitToCode.chooseComponents}</span>
              </h3>
              <span className="text-xs font-mono text-purple-300">
                {selectedComponents.length} {language === 'ku' ? 'پارچە' : 'Selected'}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-1">
              {availableComponents.map((item, idx) => {
                const checked = selectedComponents.includes(item.name);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleComponent(item.name)}
                    className={`p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                      checked
                        ? 'bg-purple-950/60 border-purple-500 text-purple-200'
                        : 'bg-[#070B14] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {}}
                        className="rounded border-slate-700 text-purple-600 focus:ring-0 cursor-pointer"
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-500">
                      {item.category}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Project Goal Description */}
          <div className="p-6 rounded-3xl bg-[#0D1424] border border-slate-800 space-y-3 shadow-xl">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
              {t.circuitToCode.projectDescription}
            </h3>
            <textarea
              value={projectGoal}
              onChange={(e) => setProjectGoal(e.target.value)}
              rows={3}
              placeholder={t.circuitToCode.descPlaceholder}
              className="w-full bg-[#070B14] border border-slate-700 focus:border-cyan-500 rounded-xl p-3 text-xs text-slate-200 outline-none transition-colors"
            />

            <button
              disabled={selectedComponents.length === 0 || isGenerating}
              onClick={handleGenerate}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-extrabold text-xs shadow-[0_0_25px_rgba(0,217,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>{t.circuitToCode.generating}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>{t.circuitToCode.generateButton}</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Right Column: Generated Output */}
        <div className="lg:col-span-7">
          <div className="h-full min-h-[500px] p-6 sm:p-8 rounded-3xl bg-[#0D1424] border border-cyan-500/30 flex flex-col justify-between shadow-2xl space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white">{t.circuitToCode.resultTitle}</h3>
                </div>

                {generatedResult && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyCode}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? t.common.copied : t.common.copy}</span>
                    </button>

                    <button
                      onClick={handleSendToEditor}
                      className="px-3 py-1.5 rounded-lg bg-blue-950 hover:bg-blue-900 border border-blue-500/40 text-xs font-semibold text-blue-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>{t.circuitToCode.sendToEditor}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Result Container */}
              <div className="p-4 rounded-2xl bg-[#070B14] border border-slate-800 font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap overflow-x-auto min-h-[400px]">
                {generatedResult ? (
                  generatedResult
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-10 space-y-3 text-slate-500">
                    <Workflow className="w-12 h-12 text-slate-700" />
                    <p className="max-w-xs text-xs">
                      {language === 'ku'
                        ? 'پارچەکانی خۆت لە لای چەپ دیاریبکە و کرتە لەسەر دروستکردن بکە تا نەخشەی پین و کۆدەکەت بۆ بنووسرێت.'
                        : 'Select your microcontroller and components on the left, then click "Generate Circuit Wiring & Code".'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick action: simulator */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                {language === 'ku' ? 'دەتەوێت بازنەکە پێش بەستن تاقیبکەیتەوە؟' : 'Ready to simulate before physical soldering?'}
              </span>
              <button
                onClick={() => setCurrentPage('simulator')}
                className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{t.academy.openInSim}</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
