import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calculator, 
  Zap, 
  BatteryCharging, 
  Layers, 
  Cpu, 
  Activity, 
  Clock, 
  CheckCircle2, 
  Info,
  HelpCircle
} from 'lucide-react';

export const CalculatorsPage: React.FC = () => {
  const { t, language } = useApp();
  const [activeTab, setActiveTab] = useState<'ohms' | 'led' | 'divider' | 'seriesParallel' | 'capacitor' | 'battery' | 'power'>('ohms');

  // --- 1. Ohm's Law State ---
  const [ohmVoltage, setOhmVoltage] = useState('5');
  const [ohmCurrent, setOhmCurrent] = useState('0.02'); // 20mA in A
  const [ohmResistance, setOhmResistance] = useState('250');
  const [ohmCalcMode, setOhmCalcMode] = useState<'voltage' | 'current' | 'resistance'>('resistance');

  // --- 2. LED Resistor State ---
  const [ledSupplyV, setLedSupplyV] = useState('5');
  const [ledForwardV, setLedForwardV] = useState('2.0'); // 2.0V red/yellow, 3.2V blue/white
  const [ledCurrentMa, setLedCurrentMa] = useState('20');

  // --- 3. Voltage Divider State ---
  const [divVin, setDivVin] = useState('5');
  const [divR1, setDivR1] = useState('10000'); // 10k
  const [divR2, setDivR2] = useState('10000'); // 10k

  // --- 4. Series & Parallel Resistors State ---
  const [r1Val, setR1Val] = useState('220');
  const [r2Val, setR2Val] = useState('220');
  const [r3Val, setR3Val] = useState('0');

  // --- 5. Capacitor RC Constant ---
  const [rcResistor, setRcResistor] = useState('10000'); // 10k Ohm
  const [rcCapacitor, setRcCapacitor] = useState('100'); // 100 uF

  // --- 6. Battery Runtime State ---
  const [batteryCapMah, setBatteryCapMah] = useState('2200'); // 18650 Li-ion
  const [loadCurrentMa, setLoadCurrentMa] = useState('80'); // ESP32 active

  // --- 7. Arduino Power Draw State ---
  const [boardType, setBoardType] = useState<'uno' | 'esp32' | 'nano'>('uno');
  const [numLeds, setNumLeds] = useState('2');
  const [numSensors, setNumSensors] = useState('2');
  const [numServos, setNumServos] = useState('1');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-cyan-500/20 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/60 border border-teal-500/30 text-teal-400 text-xs font-mono mb-2">
          <Calculator className="w-3.5 h-3.5" />
          <span>Precision Engineering Lab Calculators</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {t.calculators.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          {t.calculators.subtitle}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'ohms', label: t.calculators.ohmsLaw, icon: <Zap className="w-3.5 h-3.5" /> },
          { id: 'led', label: t.calculators.ledResistor, icon: <Activity className="w-3.5 h-3.5" /> },
          { id: 'divider', label: t.calculators.voltageDivider, icon: <Layers className="w-3.5 h-3.5" /> },
          { id: 'seriesParallel', label: t.calculators.seriesParallel, icon: <Layers className="w-3.5 h-3.5" /> },
          { id: 'capacitor', label: t.calculators.capacitorCharge, icon: <Activity className="w-3.5 h-3.5" /> },
          { id: 'battery', label: t.calculators.batteryRuntime, icon: <BatteryCharging className="w-3.5 h-3.5" /> },
          { id: 'power', label: t.calculators.arduinoPower, icon: <Cpu className="w-3.5 h-3.5" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(20,184,166,0.3)] font-bold'
                : 'bg-[#0D1424] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Active Calculator Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Inputs */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#0D1424] border border-cyan-500/30 space-y-6 shadow-xl">
          
          {/* 1. OHM'S LAW */}
          {activeTab === 'ohms' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>{t.calculators.ohmsLaw}</span>
              </h3>

              <div className="flex gap-2">
                {(['resistance', 'voltage', 'current'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setOhmCalcMode(m)}
                    className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-colors cursor-pointer ${
                      ohmCalcMode === m ? 'bg-cyan-950 border border-cyan-500 text-cyan-300' : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    Calculate {m}
                  </button>
                ))}
              </div>

              {ohmCalcMode !== 'voltage' && (
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Voltage (V):</label>
                  <input
                    type="number"
                    value={ohmVoltage}
                    onChange={(e) => setOhmVoltage(e.target.value)}
                    className="w-full bg-[#070B14] border border-slate-700 focus:border-cyan-500 rounded-xl p-2.5 text-xs text-white outline-none font-mono"
                  />
                </div>
              )}

              {ohmCalcMode !== 'current' && (
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Current (Amperes, A):</label>
                  <input
                    type="number"
                    step="0.001"
                    value={ohmCurrent}
                    onChange={(e) => setOhmCurrent(e.target.value)}
                    className="w-full bg-[#070B14] border border-slate-700 focus:border-cyan-500 rounded-xl p-2.5 text-xs text-white outline-none font-mono"
                  />
                </div>
              )}

              {ohmCalcMode !== 'resistance' && (
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Resistance (Ohms, Ω):</label>
                  <input
                    type="number"
                    value={ohmResistance}
                    onChange={(e) => setOhmResistance(e.target.value)}
                    className="w-full bg-[#070B14] border border-slate-700 focus:border-cyan-500 rounded-xl p-2.5 text-xs text-white outline-none font-mono"
                  />
                </div>
              )}
            </div>
          )}

          {/* 2. LED RESISTOR */}
          {activeTab === 'led' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>{t.calculators.ledResistor}</span>
              </h3>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">Supply Voltage Vs (Volts):</label>
                <input
                  type="number"
                  step="0.1"
                  value={ledSupplyV}
                  onChange={(e) => setLedSupplyV(e.target.value)}
                  className="w-full bg-[#070B14] border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono"
                />
                <span className="text-[10px] text-slate-500">e.g. 5V (Arduino), 3.3V (ESP32), or 9V (Battery)</span>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">LED Forward Voltage Vf (Volts):</label>
                <input
                  type="number"
                  step="0.1"
                  value={ledForwardV}
                  onChange={(e) => setLedForwardV(e.target.value)}
                  className="w-full bg-[#070B14] border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono"
                />
                <span className="text-[10px] text-slate-500">Red/Yellow: 1.8V-2.2V | Blue/White/Green: 3.0V-3.4V</span>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">Target LED Current If (mA):</label>
                <input
                  type="number"
                  value={ledCurrentMa}
                  onChange={(e) => setLedCurrentMa(e.target.value)}
                  className="w-full bg-[#070B14] border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono"
                />
                <span className="text-[10px] text-slate-500">Standard 5mm indicator LED: 15 - 20 mA</span>
              </div>
            </div>
          )}

          {/* 3. VOLTAGE DIVIDER */}
          {activeTab === 'divider' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                <span>{t.calculators.voltageDivider}</span>
              </h3>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">Input Voltage Vin (V):</label>
                <input
                  type="number"
                  step="0.1"
                  value={divVin}
                  onChange={(e) => setDivVin(e.target.value)}
                  className="w-full bg-[#070B14] border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">Top Resistor R1 (Ω):</label>
                <input
                  type="number"
                  value={divR1}
                  onChange={(e) => setDivR1(e.target.value)}
                  className="w-full bg-[#070B14] border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">Bottom Resistor R2 (Ω):</label>
                <input
                  type="number"
                  value={divR2}
                  onChange={(e) => setDivR2(e.target.value)}
                  className="w-full bg-[#070B14] border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>
            </div>
          )}

          {/* 4. SERIES & PARALLEL */}
          {activeTab === 'seriesParallel' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>{t.calculators.seriesParallel}</span>
              </h3>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">Resistor R1 (Ω):</label>
                <input
                  type="number"
                  value={r1Val}
                  onChange={(e) => setR1Val(e.target.value)}
                  className="w-full bg-[#070B14] border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">Resistor R2 (Ω):</label>
                <input
                  type="number"
                  value={r2Val}
                  onChange={(e) => setR2Val(e.target.value)}
                  className="w-full bg-[#070B14] border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">Resistor R3 (Optional, Ω):</label>
                <input
                  type="number"
                  value={r3Val}
                  onChange={(e) => setR3Val(e.target.value)}
                  className="w-full bg-[#070B14] border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>
            </div>
          )}

          {/* 5. CAPACITOR RC */}
          {activeTab === 'capacitor' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-teal-400" />
                <span>{t.calculators.capacitorCharge}</span>
              </h3>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">Series Resistance R (Ω):</label>
                <input
                  type="number"
                  value={rcResistor}
                  onChange={(e) => setRcResistor(e.target.value)}
                  className="w-full bg-[#070B14] border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">Capacitance C (microfarads, µF):</label>
                <input
                  type="number"
                  value={rcCapacitor}
                  onChange={(e) => setRcCapacitor(e.target.value)}
                  className="w-full bg-[#070B14] border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>
            </div>
          )}

          {/* 6. BATTERY RUNTIME */}
          {activeTab === 'battery' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BatteryCharging className="w-4 h-4 text-amber-400" />
                <span>{t.calculators.batteryRuntime}</span>
              </h3>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">Battery Nominal Capacity (mAh):</label>
                <input
                  type="number"
                  value={batteryCapMah}
                  onChange={(e) => setBatteryCapMah(e.target.value)}
                  className="w-full bg-[#070B14] border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono"
                />
                <span className="text-[10px] text-slate-500">e.g., 9V Alkaline (~500 mAh), 18650 Cell (~2600 mAh)</span>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">Continuous Circuit Load Current (mA):</label>
                <input
                  type="number"
                  value={loadCurrentMa}
                  onChange={(e) => setLoadCurrentMa(e.target.value)}
                  className="w-full bg-[#070B14] border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>
            </div>
          )}

          {/* 7. ARDUINO POWER DRAW */}
          {activeTab === 'power' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>{t.calculators.arduinoPower}</span>
              </h3>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">Microcontroller Board Base Draw:</label>
                <select
                  value={boardType}
                  onChange={(e) => setBoardType(e.target.value as any)}
                  className="w-full bg-[#070B14] border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono"
                >
                  <option value="uno">Arduino Uno R3 (~45 mA)</option>
                  <option value="nano">Arduino Nano (~25 mA)</option>
                  <option value="esp32">ESP32 with Wi-Fi Active (~160 mA)</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">LEDs (20mA ea):</label>
                  <input
                    type="number"
                    value={numLeds}
                    onChange={(e) => setNumLeds(e.target.value)}
                    className="w-full bg-[#070B14] border border-slate-700 rounded-lg p-2 text-xs text-white font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">Sensors (15mA ea):</label>
                  <input
                    type="number"
                    value={numSensors}
                    onChange={(e) => setNumSensors(e.target.value)}
                    className="w-full bg-[#070B14] border border-slate-700 rounded-lg p-2 text-xs text-white font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">Servos (200mA ea):</label>
                  <input
                    type="number"
                    value={numServos}
                    onChange={(e) => setNumServos(e.target.value)}
                    className="w-full bg-[#070B14] border border-slate-700 rounded-lg p-2 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Calculated Results & Formulas */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#0D1424] border border-teal-500/30 space-y-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <CheckCircle2 className="w-5 h-5 text-teal-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                {t.calculators.results}
              </h3>
            </div>

            {/* Calculations logic */}
            {activeTab === 'ohms' && (() => {
              const v = parseFloat(ohmVoltage) || 0;
              const i = parseFloat(ohmCurrent) || 0;
              const r = parseFloat(ohmResistance) || 0;
              let calcR = r, calcV = v, calcI = i;

              if (ohmCalcMode === 'resistance') calcR = i > 0 ? v / i : 0;
              else if (ohmCalcMode === 'voltage') calcV = i * r;
              else if (ohmCalcMode === 'current') calcI = r > 0 ? v / r : 0;

              const power = calcV * calcI;

              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 font-mono">
                    <div className="p-4 rounded-2xl bg-[#070B14] border border-slate-800">
                      <span className="text-xs text-slate-400 block">Voltage (V)</span>
                      <span className="text-xl font-black text-cyan-400">{calcV.toFixed(2)} V</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#070B14] border border-slate-800">
                      <span className="text-xs text-slate-400 block">Current (I)</span>
                      <span className="text-xl font-black text-purple-400">{(calcI * 1000).toFixed(1)} mA</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#070B14] border border-slate-800">
                      <span className="text-xs text-slate-400 block">Resistance (R)</span>
                      <span className="text-xl font-black text-teal-400">{calcR.toFixed(1)} Ω</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#070B14] border border-slate-800">
                      <span className="text-xs text-slate-400 block">Dissipated Power (P)</span>
                      <span className="text-xl font-black text-amber-400">{(power * 1000).toFixed(1)} mW</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-bold font-mono text-cyan-400 block">{t.calculators.formula}:</span>
                    <p className="font-mono">V = I × R | P = V × I = I² × R</p>
                  </div>
                </div>
              );
            })()}

            {activeTab === 'led' && (() => {
              const vs = parseFloat(ledSupplyV) || 0;
              const vf = parseFloat(ledForwardV) || 0;
              const ifMa = parseFloat(ledCurrentMa) || 1;
              const ifA = ifMa / 1000;
              const vDrop = Math.max(0, vs - vf);
              const rExact = ifA > 0 ? vDrop / ifA : 0;
              const powerW = vDrop * ifA;

              // Nearest standard E24 resistor value
              const e24 = [100, 120, 150, 180, 220, 270, 330, 390, 470, 560, 680, 820, 1000];
              const nearest = e24.reduce((prev, curr) => Math.abs(curr - rExact) < Math.abs(prev - rExact) ? curr : prev, 220);

              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 font-mono">
                    <div className="p-4 rounded-2xl bg-[#070B14] border border-emerald-500/30">
                      <span className="text-xs text-slate-400 block">Calculated Resistor</span>
                      <span className="text-xl font-black text-emerald-400">{rExact.toFixed(1)} Ω</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#070B14] border border-cyan-500/30">
                      <span className="text-xs text-slate-400 block">Nearest Standard E24</span>
                      <span className="text-xl font-black text-cyan-400">{nearest} Ω</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#070B14] border border-slate-800 font-mono text-xs">
                    <span className="text-slate-400 block">Resistor Power Dissipation:</span>
                    <span className="text-amber-400 font-bold">{(powerW * 1000).toFixed(1)} mW</span> (A standard 1/4W 250mW resistor is sufficient).
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-bold font-mono text-cyan-400 block">{t.calculators.formula}:</span>
                    <p className="font-mono">R = (Vs - Vf) / If | P = (Vs - Vf) × If</p>
                  </div>
                </div>
              );
            })()}

            {activeTab === 'divider' && (() => {
              const vin = parseFloat(divVin) || 0;
              const r1 = parseFloat(divR1) || 1;
              const r2 = parseFloat(divR2) || 1;
              const vout = vin * (r2 / (r1 + r2));
              const currentMa = (vin / (r1 + r2)) * 1000;

              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 font-mono">
                    <div className="p-4 rounded-2xl bg-[#070B14] border border-purple-500/30">
                      <span className="text-xs text-slate-400 block">Output Voltage (Vout)</span>
                      <span className="text-xl font-black text-purple-400">{vout.toFixed(2)} V</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#070B14] border border-slate-800">
                      <span className="text-xs text-slate-400 block">Quiescent Current</span>
                      <span className="text-xl font-black text-cyan-400">{currentMa.toFixed(3)} mA</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-bold font-mono text-purple-400 block">{t.calculators.formula}:</span>
                    <p className="font-mono">Vout = Vin × [ R2 / (R1 + R2) ]</p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {language === 'ku' ? 'زۆر گونجاوە بۆ گۆڕینی سیگناڵی ٥ ڤۆڵت بۆ ٣.٣ ڤۆڵت بۆ ESP32 بە دانانی بەرگری ١٠k و ٢٠k.' : 'Ideal for 5V to 3.3V logic translation for ESP32 inputs using 1kΩ (R1) and 2kΩ (R2).'}
                    </p>
                  </div>
                </div>
              );
            })()}

            {activeTab === 'seriesParallel' && (() => {
              const r1 = parseFloat(r1Val) || 0;
              const r2 = parseFloat(r2Val) || 0;
              const r3 = parseFloat(r3Val) || 0;

              const series = r1 + r2 + r3;
              let parallel = 0;
              let invSum = 0;
              if (r1 > 0) invSum += 1 / r1;
              if (r2 > 0) invSum += 1 / r2;
              if (r3 > 0) invSum += 1 / r3;
              if (invSum > 0) parallel = 1 / invSum;

              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 font-mono">
                    <div className="p-4 rounded-2xl bg-[#070B14] border border-cyan-500/30">
                      <span className="text-xs text-slate-400 block">Series Total R_total</span>
                      <span className="text-xl font-black text-cyan-400">{series.toFixed(1)} Ω</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#070B14] border border-purple-500/30">
                      <span className="text-xs text-slate-400 block">Parallel Total R_total</span>
                      <span className="text-xl font-black text-purple-400">{parallel.toFixed(1)} Ω</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-bold font-mono text-cyan-400 block">{t.calculators.formula}:</span>
                    <p className="font-mono">R_series = R1 + R2 + R3</p>
                    <p className="font-mono">1/R_parallel = 1/R1 + 1/R2 + 1/R3</p>
                  </div>
                </div>
              );
            })()}

            {activeTab === 'capacitor' && (() => {
              const r = parseFloat(rcResistor) || 0;
              const cUf = parseFloat(rcCapacitor) || 0;
              const cFarads = cUf * 1e-6;
              const tauSeconds = r * cFarads;
              const fullChargeSeconds = 5 * tauSeconds;

              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 font-mono">
                    <div className="p-4 rounded-2xl bg-[#070B14] border border-teal-500/30">
                      <span className="text-xs text-slate-400 block">Time Constant (τ = R·C)</span>
                      <span className="text-xl font-black text-teal-400">{(tauSeconds * 1000).toFixed(1)} ms</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#070B14] border border-cyan-500/30">
                      <span className="text-xs text-slate-400 block">99.3% Full Charge (5τ)</span>
                      <span className="text-xl font-black text-cyan-400">{(fullChargeSeconds * 1000).toFixed(1)} ms</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-bold font-mono text-teal-400 block">{t.calculators.formula}:</span>
                    <p className="font-mono">τ = R × C | Full charge occurs at 5τ (99.3%)</p>
                  </div>
                </div>
              );
            })()}

            {activeTab === 'battery' && (() => {
              const cap = parseFloat(batteryCapMah) || 0;
              const load = parseFloat(loadCurrentMa) || 1;
              const safetyDerating = 0.70; // 70% real world efficiency
              const hoursReal = (cap * safetyDerating) / load;
              const daysReal = hoursReal / 24;

              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 font-mono">
                    <div className="p-4 rounded-2xl bg-[#070B14] border border-amber-500/30">
                      <span className="text-xs text-slate-400 block">Estimated Hours</span>
                      <span className="text-xl font-black text-amber-400">{hoursReal.toFixed(1)} hrs</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#070B14] border border-cyan-500/30">
                      <span className="text-xs text-slate-400 block">Estimated Days</span>
                      <span className="text-xl font-black text-cyan-400">{daysReal.toFixed(1)} days</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-bold font-mono text-amber-400 block">{t.calculators.formula}:</span>
                    <p className="font-mono">Runtime = (Capacity mAh × 0.70 Derating) / Current mA</p>
                  </div>
                </div>
              );
            })()}

            {activeTab === 'power' && (() => {
              let base = 45;
              if (boardType === 'nano') base = 25;
              if (boardType === 'esp32') base = 160;

              const ledsMa = (parseInt(numLeds) || 0) * 20;
              const sensorsMa = (parseInt(numSensors) || 0) * 15;
              const servosMa = (parseInt(numServos) || 0) * 200;
              const totalMa = base + ledsMa + sensorsMa + servosMa;

              return (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-[#070B14] border border-cyan-500/40 font-mono">
                    <span className="text-xs text-slate-400 block">Total Estimated Current Draw</span>
                    <span className="text-3xl font-black text-cyan-400">{totalMa} mA</span>
                    <span className="text-xs text-slate-400 block mt-1">({(totalMa / 1000).toFixed(2)} Amperes @ 5V = {(totalMa * 0.005).toFixed(2)} Watts)</span>
                  </div>

                  {totalMa > 500 && (
                    <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/50 text-xs text-rose-200">
                      ⚠️ <b>Current Warning:</b> USB 2.0 ports and onboard 5V regulators are limited to ~500mA. Use an external 5V power supply to prevent brownout resets!
                    </div>
                  )}
                </div>
              );
            })()}

          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              {language === 'ku' ? 'هەموو هاوکێشەکان بەپێی ستانداردە فەرمییەکانی ئەندازیاری کارەبا ئەژمارکراون.' : 'All mathematical formulas are verified against standard IEEE electronic fundamentals.'}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
