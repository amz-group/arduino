import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bot, 
  Send, 
  Trash2, 
  Copy, 
  Check, 
  Sparkles, 
  Loader2, 
  Cpu, 
  Code2, 
  AlertCircle,
  Zap,
  Terminal
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AssistantPage: React.FC = () => {
  const { t, language, setActiveEditorCode, setCurrentPage } = useApp();
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: language === 'ku'
        ? `سڵاو! من یاریدەدەری زیرەکی دەستکردی **KRD Arduino Universe**ـم.
دەتوانم یارمەتیت بدەم لە:
- نووسین و دۆزینەوەی هەڵە لە کۆدی Arduino C/C++ و ESP32
- دیزاینی بازنەی ئەلیکترۆنی و هەڵبژاردنی بەرگرییەکان
- ڕوونکردنەوەی بەستنی هەستەوەرەکانی ئەڵتراسۆنیک، سێرڤۆ، DHT22 و شاشەی LCD
- پرۆتۆکۆلەکانی I2C, SPI و پەیوەندی بێتەلی وایفای
چۆن دەتوانم ئەمڕۆ یارمەتیت بدەم؟`
        : `Hello! I am **KRD Arduino Universe AI**, your embedded systems and electronics engineering co-pilot.
I can assist you with:
- Generating compilable Arduino C/C++ & ESP32 firmware
- Debugging wiring faults and timer/interrupt conflicts
- Pinout schematics for ultrasonic, servo, DHT22, and I2C LCDs
- IoT web servers, MQTT, and Wi-Fi telemetry
What hardware project or code question are you working on today?`,
      timestamp: 'Just now'
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const suggestedQuestions = language === 'ku' ? [
    'چۆن هەستەوەری ئەڵتراسۆنیک HC-SR04 لەگەڵ لیدی ئاگادارکەرەوە ببەستم بە ئاردوینۆ؟',
    'کۆدی ترووکاندنی ٣ لید بەدوای یەکدا بنووسە بە فەنکشنی millis لەبری delay',
    'هۆکاری هەڵەی stk500_getsync چییە و چۆن چارەسەری بکەم؟',
    'کۆدێکی ڕاژەی وێبی ESP32 دروستبکە بۆ کوژاندنەوە و پێکردنی گڵۆپ لە وێبگەڕەوە'
  ] : [
    'Generate an Arduino Uno sketch for HC-SR04 distance measurement with buzzer alert',
    'Explain how to blink 3 LEDs non-blocking using millis() without delay()',
    'How do I fix the "stk500_recv(): programmer is not responding" error?',
    'Create an ESP32 web server with HTML buttons to toggle built-in GPIO 2 LED'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);
    setApiError(null);

    try {
      // Build history strictly starting with a user turn
      const firstUserIndex = messages.findIndex(m => m.sender === 'user');
      const relevantMessages = firstUserIndex !== -1 ? messages.slice(firstUserIndex) : [];
      const history = relevantMessages.slice(-6).map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text
      }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language,
          history
        })
      });

      const data = await res.json();

      if (data && data.reply) {
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMsg]);
      } else {
        const errorText = language === 'ku'
          ? 'ببورە، پەیوەندی بە ڕاژەی ژیری دەستکرد کێشەی تێکەوت، تکایە کەمێکی تر دووبارە هەوڵبدەرەوە.'
          : 'Unable to reach the AI model. Please try again in a moment.';
        setApiError(data?.error || errorText);
        setMessages(prev => [
          ...prev,
          {
            id: `ai-err-${Date.now()}`,
            sender: 'ai',
            text: errorText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (err: any) {
      const errorText = language === 'ku'
        ? `هەڵەی پەیوەندی تۆڕ: ${err.message}. تکایە پەیوەندی ئینتەرنێتەکەت بپشکنە.`
        : `Network error: ${err.message}. Please verify your connection.`;
      setApiError(errorText);
      setMessages(prev => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: errorText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: `m-${Date.now()}`,
        sender: 'ai',
        text: language === 'ku' ? 'گفتوگۆکە سڕایەوە. چۆن دەتوانم یارمەتیت بدەم؟' : 'Chat cleared. How can I assist you with Arduino?',
        timestamp: 'Just now'
      }
    ]);
  };

  // Helper to extract C++ code blocks and allow "Open in Code Studio"
  const extractFirstCodeBlock = (text: string) => {
    const match = text.match(/```(?:cpp|c|arduino)?([\s\S]*?)```/);
    return match ? match[1].trim() : null;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-500/20 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-400 text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gemini 3.8 Flash Neural Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {t.ai.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            {t.ai.subtitle}
          </p>
        </div>

        <button
          onClick={clearChat}
          className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5 text-slate-400" />
          <span>{t.ai.clear}</span>
        </button>
      </div>

      {/* Suggested Inquiries */}
      <div className="space-y-2">
        <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
          {t.ai.suggestedQueries}:
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-3 py-1.5 rounded-xl bg-[#0D1424] hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-[11px] text-slate-300 hover:text-cyan-300 whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Zap className="w-3 h-3 text-cyan-400" />
              <span>{q}</span>
            </button>
          ))}
        </div>
      </div>

      {/* API Warning Notice if Error */}
      {apiError && (
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/50 flex items-center justify-between gap-3 text-xs text-amber-200">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="font-bold">{language === 'ku' ? 'ئاگاداری پەیوەندی بە ژیری دەستکرد' : 'AI Connection Notice'}</div>
              <p>{apiError}</p>
            </div>
          </div>
          <button
            onClick={() => {
              const lastUser = [...messages].reverse().find(m => m.sender === 'user');
              if (lastUser) {
                handleSendMessage(lastUser.text);
              }
            }}
            className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shrink-0 transition-colors cursor-pointer"
          >
            {language === 'ku' ? 'دووبارە هەوڵبدەرەوە' : 'Retry'}
          </button>
        </div>
      )}

      {/* Chat Messages Log */}
      <div className="h-[520px] rounded-3xl bg-[#0D1424] border border-cyan-500/30 p-4 sm:p-6 overflow-y-auto space-y-4 shadow-2xl">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const codeBlock = !isUser ? extractFirstCodeBlock(msg.text) : null;

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center font-bold text-xs shadow-md ${
                isUser 
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950' 
                  : 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white'
              }`}>
                {isUser ? 'ME' : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 space-y-2 text-xs sm:text-sm leading-relaxed ${
                isUser
                  ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-500/40 text-slate-100 rounded-tr-none rtl:rounded-tr-2xl rtl:rounded-tl-none'
                  : 'bg-[#070B14] border border-slate-800 text-slate-200 rounded-tl-none rtl:rounded-tl-2xl rtl:rounded-tr-none'
              }`}>
                <div className="whitespace-pre-wrap font-sans">
                  {msg.text}
                </div>

                {/* Code Studio Direct Action if response contains code */}
                {codeBlock && (
                  <div className="pt-2 flex items-center gap-2 border-t border-slate-800/80">
                    <button
                      onClick={() => {
                        setActiveEditorCode(codeBlock);
                        setCurrentPage('editor');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-blue-950 hover:bg-blue-900 border border-blue-500/40 text-blue-300 text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>{language === 'ku' ? 'کردنەوە لە ستۆدیۆی کۆد' : 'Open in Code Studio'}</span>
                    </button>

                    <button
                      onClick={() => handleCopyText(msg.id, codeBlock)}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === msg.id ? t.common.copied : t.common.copy}</span>
                    </button>
                  </div>
                )}

                <div className="text-[10px] text-slate-500 font-mono text-right rtl:text-left pt-1">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-600/50 flex items-center justify-center text-white shrink-0 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-[#070B14] border border-purple-500/30 flex items-center gap-2 text-xs text-purple-300">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
              <span>{t.ai.generating}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="relative flex items-center"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t.ai.inputPlaceholder}
          disabled={isLoading}
          className="w-full bg-[#0D1424] border border-cyan-500/40 focus:border-cyan-400 rounded-2xl py-3.5 pl-4 pr-14 rtl:pl-14 rtl:pr-4 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-all shadow-lg"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="absolute right-2 rtl:right-auto rtl:left-2 p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold disabled:opacity-40 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,217,255,0.3)]"
          aria-label={t.ai.send}
        >
          <Send className="w-4 h-4 rtl:rotate-180" />
        </button>
      </form>

    </div>
  );
};
