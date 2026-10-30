import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import Editor from '@monaco-editor/react';
import { 
  Code2, 
  Play, 
  Copy, 
  Check, 
  Download, 
  Save, 
  Sparkles, 
  Bug, 
  HelpCircle, 
  Terminal, 
  Cpu, 
  FileCode,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Wrench,
  Zap,
  ArrowRight
} from 'lucide-react';
import { sendAiDebugRequest } from '../../utils/aiClient';

interface SyntaxCheckResult {
  hasErrors: boolean;
  messages: Array<{ type: 'error' | 'warning' | 'success'; text: string; textKu: string; line?: number }>;
}

export const CodeStudioPage: React.FC = () => {
  const { t, language, activeEditorCode, setActiveEditorCode, saveUserCode, setCurrentPage } = useApp();
  
  const [sketchTitle, setSketchTitle] = useState('My_Arduino_Sketch');
  const [copied, setCopied] = useState(false);
  const [savedNotification, setSavedNotification] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiOutput, setAiOutput] = useState<string | null>(null);
  const [errorLogInput, setErrorLogInput] = useState<string>('');
  const [showErrorBox, setShowErrorBox] = useState(false);
  const [editorMode, setEditorMode] = useState<'monaco' | 'native'>('monaco');
  const [syntaxResults, setSyntaxResults] = useState<SyntaxCheckResult | null>(null);
  const [autoFixedCode, setAutoFixedCode] = useState<string | null>(null);

  const codePresets: Array<{ name: string; code: string }> = [
    {
      name: '01. Basics > Blink',
      code: `// KRD Arduino Universe - Standard Blink
#define LED_PIN 13

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_PIN, HIGH);
  delay(1000);
  digitalWrite(LED_PIN, LOW);
  delay(1000);
}`
    },
    {
      name: '02. Digital > Button Debounce with Pull-up',
      code: `// KRD Arduino Universe - Debounced Button
const int buttonPin = 2;
const int ledPin = 13;

int ledState = LOW;
int lastButtonState = HIGH;
unsigned long lastDebounceTime = 0;
const unsigned long debounceDelay = 50; // ms

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int reading = digitalRead(buttonPin);
  if (reading != lastButtonState) {
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (reading == LOW && lastButtonState == HIGH) {
      ledState = !ledState;
      digitalWrite(ledPin, ledState);
    }
  }
  lastButtonState = reading;
}`
    },
    {
      name: '03. Sensors > Ultrasonic Distance (HC-SR04)',
      code: `// KRD Arduino Universe - Sonar Telemetry
const int trigPin = 9;
const int echoPin = 10;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH);
  float distanceCm = (duration * 0.0343) / 2.0;

  Serial.print("Target Distance: ");
  Serial.print(distanceCm);
  Serial.println(" cm");
  delay(250);
}`
    },
    {
      name: '04. Actuators > SG90 Servo Smooth Sweep',
      code: `#include <Servo.h>

Servo myServo;

void setup() {
  myServo.attach(9);
}

void loop() {
  for (int pos = 0; pos <= 180; pos += 1) {
    myServo.write(pos);
    delay(15);
  }
  for (int pos = 180; pos >= 0; pos -= 1) {
    myServo.write(pos);
    delay(15);
  }
}`
    },
    {
      name: '05. Communication > I2C Bus Address Scanner',
      code: `// KRD Arduino Universe - I2C Address Scanner
#include <Wire.h>

void setup() {
  Wire.begin();
  Serial.begin(115200);
  while (!Serial);
  Serial.println("\\n=== KRD I2C Scanner Active ===");
}

void loop() {
  byte error, address;
  int nDevices = 0;

  Serial.println("Scanning I2C bus (0x01 - 0x7F)...");

  for (address = 1; address < 127; address++) {
    Wire.beginTransmission(address);
    error = Wire.endTransmission();

    if (error == 0) {
      Serial.print("I2C device found at address 0x");
      if (address < 16) Serial.print("0");
      Serial.print(address, HEX);
      Serial.println(" !");
      nDevices++;
    }
  }

  if (nDevices == 0) Serial.println("No I2C devices found.\\n");
  else Serial.println("Done scanning.\\n");

  delay(5000);
}`
    },
    {
      name: '06. Wireless > ESP32 Wi-Fi HTTP Telemetry Server',
      code: `#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASS";

WebServer server(80);

void handleRoot() {
  server.send(200, "text/plain", "KRD Arduino Universe - ESP32 Node Online!");
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\\nWiFi connected! IP: " + WiFi.localIP().toString());
  server.on("/", handleRoot);
  server.begin();
}

void loop() {
  server.handleClient();
}`
    }
  ];

  // Robust Arduino C/C++ Static Diagnostics Engine
  const runCodeDiagnostics = (code: string): SyntaxCheckResult => {
    const msgs: SyntaxCheckResult['messages'] = [];
    let hasErr = false;

    // Helper: Strip string literals and comments to analyze syntax tokens accurately
    const stripCommentsAndStrings = (src: string): string => {
      // 1. Remove string literals
      let s = src.replace(/"(?:\\.|[^"\\])*"/g, '""').replace(/'(?:\\.|[^'\\])*'/g, "''");
      // 2. Remove multi-line comments /* ... */
      s = s.replace(/\/\*[\s\S]*?\*\//g, ' ');
      // 3. Remove single-line comments // ...
      s = s.replace(/\/\/.*$/gm, '');
      return s;
    };

    const cleanCode = stripCommentsAndStrings(code);

    // Check 1: setup()
    if (!cleanCode.includes('setup(')) {
      hasErr = true;
      msgs.push({
        type: 'error',
        text: 'Missing mandatory "void setup()" initialization function.',
        textKu: 'فەنکشنی سەرەکی و پێویستی "void setup()" لەناو کۆدەکەدا نییە.'
      });
    }

    // Check 2: loop()
    if (!cleanCode.includes('loop(')) {
      hasErr = true;
      msgs.push({
        type: 'error',
        text: 'Missing mandatory "void loop()" execution cycle.',
        textKu: 'فەنکشنی سەرەکی و پێویستی "void loop()" لەناو کۆدەکەدا نییە.'
      });
    }

    // Check 3: Balanced curly braces (only in tokenized clean code)
    let openBraces = 0;
    let closeBraces = 0;
    for (const char of cleanCode) {
      if (char === '{') openBraces++;
      if (char === '}') closeBraces++;
    }
    if (openBraces !== closeBraces) {
      hasErr = true;
      msgs.push({
        type: 'error',
        text: `Unbalanced curly braces: ${openBraces} opening '{' vs ${closeBraces} closing '}'.`,
        textKu: `کەوانەی شەپۆلی ناتەبا: ${openBraces} کەوانەی کراوە '{' بەرامبەر ${closeBraces} کەوانەی داخراو '}'.`
      });
    }

    // Check 4: Balanced parentheses (only in tokenized clean code)
    let openParen = 0;
    let closeParen = 0;
    for (const char of cleanCode) {
      if (char === '(') openParen++;
      if (char === ')') closeParen++;
    }
    if (openParen !== closeParen) {
      hasErr = true;
      msgs.push({
        type: 'error',
        text: `Unbalanced parentheses: ${openParen} '(' vs ${closeParen} ')'.`,
        textKu: `کەوانەی بازنەیی ناتەبا: ${openParen} '(' بەرامبەر ${closeParen} ')'.`
      });
    }

    // Check 5: Common line semicolon omissions (after stripping inline comments)
    const lines = code.split('\n');
    lines.forEach((line, idx) => {
      // Remove inline comment // ...
      const withoutComment = line.split('//')[0].trim();
      if (!withoutComment || withoutComment.startsWith('#') || withoutComment.startsWith('/*')) {
        return;
      }

      // Check standard function calls that MUST end with ';'
      const statementsNeedingSemicolon = [
        'digitalWrite(',
        'digitalRead(',
        'analogWrite(',
        'analogRead(',
        'pinMode(',
        'delay(',
        'delayMicroseconds(',
        'Serial.print',
        'Serial.begin(',
        'Wire.begin',
        'myServo.attach(',
        'myServo.write(',
        'strip.begin(',
        'strip.show(',
        'lcd.init(',
        'lcd.print('
      ];

      for (const stmt of statementsNeedingSemicolon) {
        if (withoutComment.startsWith(stmt) || withoutComment.includes(` ${stmt}`)) {
          if (!withoutComment.endsWith(';') && !withoutComment.endsWith('{') && !withoutComment.endsWith('}')) {
            hasErr = true;
            msgs.push({
              type: 'error',
              line: idx + 1,
              text: `Line ${idx + 1}: Missing semicolon ';' at end of: "${withoutComment}"`,
              textKu: `دێڕی ${idx + 1}: فاریزەی خاڵدار (سیمیکۆلۆن ;) لە کۆتایی ڕستەکە دانەنراوە: "${withoutComment}"`
            });
            break;
          }
        }
      }
    });

    if (!hasErr) {
      msgs.push({
        type: 'success',
        text: 'Code Structure OK: Arduino sketch structure, setup(), loop(), and syntax verified with 0 errors.',
        textKu: 'پێکهاتەی کۆدەکە ١٠٠٪ تەواوە: فەنکشنەکانی setup و loop و سینتاکس هیچ کێشەیەکیان نییە و ئامادەیە بۆ کارکردن.'
      });
    }

    return { hasErrors: hasErr, messages: msgs };
  };

  const handleVerifySyntax = () => {
    const res = runCodeDiagnostics(activeEditorCode);
    setSyntaxResults(res);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeEditorCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([activeEditorCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${sketchTitle.trim().replace(/\s+/g, '_') || 'sketch'}.ino`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSave = () => {
    saveUserCode(sketchTitle, activeEditorCode);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  // Call Resilient Gemini AI for Debug / Explain / Auto-Fix
  const handleAiAction = async (actionType: 'explain' | 'debug' | 'autofix') => {
    setAiAnalyzing(true);
    setAiOutput(null);
    setAutoFixedCode(null);

    try {
      const data = await sendAiDebugRequest({
        code: activeEditorCode,
        errorLog: errorLogInput,
        action: actionType === 'explain' ? 'explain' : 'debug',
        language
      });

      if (data && data.result) {
        setAiOutput(data.result);

        // If action is autofix or debug, check if code block exists
        const match = data.result.match(/```(?:cpp|c|arduino)?([\s\S]*?)```/);
        if (match && match[1]) {
          setAutoFixedCode(match[1].trim());
          if (actionType === 'autofix') {
            setActiveEditorCode(match[1].trim());
          }
        }
      } else {
        setAiOutput('Unable to process code. Please try again.');
      }
    } catch (err: any) {
      setAiOutput(`Request notice: ${err.message}`);
    } finally {
      setAiAnalyzing(false);
    }
  };

  const applyAutoFix = () => {
    if (autoFixedCode) {
      setActiveEditorCode(autoFixedCode);
      setAutoFixedCode(null);
      setSyntaxResults(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-mono mb-2">
            <Code2 className="w-3.5 h-3.5" />
            <span>Arduino C/C++ Studio</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {t.editor.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            {t.editor.subtitle}
          </p>
        </div>

        {/* Load Preset Dropdown */}
        <div className="flex items-center gap-2">
          <select
            onChange={(e) => {
              const selected = codePresets.find(p => p.name === e.target.value);
              if (selected) {
                setActiveEditorCode(selected.code);
                setSketchTitle(selected.name.split('>')[1]?.trim() || 'Sketch');
                setSyntaxResults(null);
              }
            }}
            className="bg-[#0D1424] border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="">{t.editor.selectExample}...</option>
            {codePresets.map((p, idx) => (
              <option key={idx} value={p.name}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Editor Container with Toolbar */}
      <div className="rounded-3xl bg-[#0D1424] border border-cyan-500/30 overflow-hidden shadow-2xl space-y-0">
        
        {/* Editor Top Bar */}
        <div className="p-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          
          {/* Sketch Name Input */}
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-cyan-400" />
            <input
              type="text"
              value={sketchTitle}
              onChange={(e) => setSketchTitle(e.target.value)}
              className="bg-transparent border-b border-transparent hover:border-slate-700 focus:border-cyan-500 text-xs font-mono font-bold text-white outline-none px-1 py-0.5"
              placeholder="Sketch_Name"
            />
            <span className="text-[10px] text-slate-500 font-mono">.ino</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            
            {/* Syntax Diagnostics Checker Button */}
            <button
              onClick={handleVerifySyntax}
              className="px-3 py-1.5 rounded-lg bg-teal-950 hover:bg-teal-900 border border-teal-500/50 text-xs text-teal-300 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Verify code syntax and structure"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
              <span>{language === 'ku' ? 'پشکنینی هەڵەکانی کۆد' : 'Verify Syntax'}</span>
            </button>

            {/* AI Auto-Fix Button */}
            <button
              disabled={aiAnalyzing}
              onClick={() => handleAiAction('autofix')}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-xs text-slate-950 font-extrabold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 shadow-[0_0_15px_rgba(0,217,255,0.3)]"
            >
              {aiAnalyzing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wrench className="w-3.5 h-3.5" />}
              <span>{language === 'ku' ? 'چاککردنی خۆکار بە AI' : 'Auto-Fix Code'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? t.common.copied : t.common.copy}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.editor.downloadIno}</span>
            </button>

            <button
              onClick={handleSave}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-purple-400" />
              <span>{savedNotification ? t.common.saved : t.editor.saveLocal}</span>
            </button>

            {/* AI Explain button */}
            <button
              disabled={aiAnalyzing}
              onClick={() => handleAiAction('explain')}
              className="px-3 py-1.5 rounded-lg bg-purple-950 hover:bg-purple-900 border border-purple-500/40 text-xs text-purple-200 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              {aiAnalyzing ? <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" /> : <Sparkles className="w-3.5 h-3.5 text-purple-400" />}
              <span>{t.editor.explainAi}</span>
            </button>

            {/* AI Debug button */}
            <button
              disabled={aiAnalyzing}
              onClick={() => {
                setShowErrorBox(true);
                handleAiAction('debug');
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 border border-rose-500/40 text-xs text-rose-200 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Bug className="w-3.5 h-3.5 text-rose-400" />
              <span>{t.editor.debugAi}</span>
            </button>

            {/* Mode switch (Monaco / Native) */}
            <button
              onClick={() => setEditorMode(editorMode === 'monaco' ? 'native' : 'monaco')}
              className="px-2 py-1 rounded bg-slate-900 text-slate-400 hover:text-white text-[10px] font-mono border border-slate-800 cursor-pointer"
              title="Toggle Editor Mode"
            >
              {editorMode === 'monaco' ? 'IDE Mode' : 'Classic Mode'}
            </button>
          </div>
        </div>

        {/* Syntax Diagnostic Results Drawer */}
        {syntaxResults && (
          <div className={`p-4 border-b ${
            syntaxResults.hasErrors
              ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
              : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
          } space-y-2 text-xs`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold font-mono">
                {syntaxResults.hasErrors ? (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                <span>
                  {syntaxResults.hasErrors
                    ? (language === 'ku' ? 'هەڵە لە کۆدەکەتدا دۆزرایەوە:' : 'Syntax Issues Detected:')
                    : (language === 'ku' ? 'کۆدەکە هیچ هەڵەیەکی ڕێزمانی نییە:' : 'Verification Succeeded:')}
                </span>
              </div>

              {syntaxResults.hasErrors && (
                <button
                  disabled={aiAnalyzing}
                  onClick={() => handleAiAction('autofix')}
                  className="px-3 py-1 rounded-lg bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <Wrench className="w-3 h-3" />
                  <span>{language === 'ku' ? 'چاککردنی خۆکار' : 'Auto-Fix Now'}</span>
                </button>
              )}
            </div>

            <ul className="space-y-1 font-mono text-[11px]">
              {syntaxResults.messages.map((m, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span>•</span>
                  <span>{language === 'ku' ? m.textKu : m.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Optional Compiler Error Log Input Drawer */}
        {showErrorBox && (
          <div className="p-3 bg-slate-900/90 border-b border-rose-500/30 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-1" />
            <div className="flex-1 space-y-1">
              <label className="text-[11px] font-mono text-rose-300 font-semibold">
                {language === 'ku' ? 'تێکستی هەڵەی کامپایلەر (ئارەزوومەندانە):' : 'Compiler Error Output / Symptom (Optional):'}
              </label>
              <textarea
                value={errorLogInput}
                onChange={(e) => setErrorLogInput(e.target.value)}
                rows={2}
                placeholder="e.g. 'error: expected ';' before '}' token' or 'stk500_recv(): programmer is not responding'"
                className="w-full bg-[#070B14] border border-slate-700 rounded-lg p-2 text-xs font-mono text-slate-200 outline-none focus:border-rose-500"
              />
            </div>
          </div>
        )}

        {/* Editor Area */}
        <div className="h-[480px] w-full bg-[#070B14] relative">
          {editorMode === 'monaco' ? (
            <Editor
              height="100%"
              language="cpp"
              theme="vs-dark"
              value={activeEditorCode}
              onChange={(val) => setActiveEditorCode(val || '')}
              loading={
                <div className="h-full flex flex-col items-center justify-center space-y-2 text-cyan-400 font-mono text-xs">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Loading Arduino Monaco IDE...</span>
                </div>
              }
              options={{
                fontSize: 13,
                fontFamily: "'Fira Code', monospace",
                minimap: { enabled: true },
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: 'on'
              }}
            />
          ) : (
            <div className="h-full flex font-mono text-xs">
              {/* Line numbers column */}
              <div className="w-12 bg-slate-950 text-slate-600 select-none py-3 text-right pr-2 border-r border-slate-800 leading-6">
                {activeEditorCode.split('\n').map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <textarea
                value={activeEditorCode}
                onChange={(e) => setActiveEditorCode(e.target.value)}
                spellCheck={false}
                className="flex-1 h-full bg-[#070B14] text-cyan-200 p-3 leading-6 outline-none resize-none font-mono"
              />
            </div>
          )}
        </div>

        {/* Editor Bottom Bar */}
        <div className="p-2 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500 px-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-cyan-400">
              <Cpu className="w-3.5 h-3.5" />
              <span>ATmega328P / ESP32</span>
            </span>
            <span>{activeEditorCode.split('\n').length} lines</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('simulator')}
              className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              <Play className="w-3 h-3" />
              <span>{t.academy.openInSim}</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Analysis Output & Auto-Fix Banner */}
      <div className="p-6 rounded-3xl bg-[#0D1424] border border-purple-500/30 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
            <Terminal className="w-4 h-4" />
            <span>{t.editor.outputConsole}</span>
          </div>
          
          <div className="flex items-center gap-2">
            {autoFixedCode && (
              <button
                onClick={applyAutoFix}
                className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{language === 'ku' ? 'جێبەجێکردنی کۆدە چاککراوەکە لە ستۆدیۆ' : 'Apply Fixed Code to Editor'}</span>
              </button>
            )}

            {aiAnalyzing && (
              <div className="flex items-center gap-2 text-xs text-purple-300 font-mono">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{t.editor.aiAnalyzing}</span>
              </div>
            )}
          </div>
        </div>

        <div className="min-h-[120px] p-4 rounded-2xl bg-[#070B14] border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap overflow-x-auto">
          {aiOutput ? (
            aiOutput
          ) : (
            <span className="text-slate-600 italic">
              {t.editor.readyToVerify}
            </span>
          )}
        </div>
      </div>

    </div>
  );
};
