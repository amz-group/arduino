import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { lessonsData } from '../../data/lessonsData';
import { projectsData } from '../../data/projectsData';
import confetti from 'canvas-confetti';
import { 
  LayoutDashboard, 
  Zap, 
  Award, 
  BookOpen, 
  FolderGit2, 
  Code2, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Download, 
  ExternalLink,
  Flame,
  ShieldCheck,
  Star,
  Printer
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { t, language, userProfile, addXp, setActiveEditorCode, setCurrentPage } = useApp();
  const [showCertificate, setShowCertificate] = useState(false);
  const [dailyAnswered, setDailyAnswered] = useState(false);
  const [dailySelected, setDailySelected] = useState<number | null>(null);

  const achievementsList = [
    {
      id: 'first_blink',
      title: 'First LED Spark',
      titleKu: 'یەکەم ترووکەی لید',
      desc: 'Completed your first digital output program on Pin 13.',
      descKu: 'تەواوکردنی یەکەم بەرنامەی دەرچەی دیجیتال لەسەر پینی ١٣.',
      icon: '💡'
    },
    {
      id: 'circuit_starter',
      title: 'Circuit Novice',
      titleKu: 'دەستپێکەری بازنەکان',
      desc: 'Tested circuit simulation and learned internal pull-ups.',
      descKu: 'تاقیکردنەوەی سیمولەیتەری بازنەکان و بەرگری ناوەکی.',
      icon: '🔌'
    },
    {
      id: 'sonar_radar',
      title: 'Acoustic Explorer',
      titleKu: 'پشکنەری شەپۆلی دەنگ',
      desc: 'Built or completed an ultrasonic distance measuring radar.',
      descKu: 'دروستکردنی سیستەمی پێوانی دووری بە ئەڵتراسۆنیک.',
      icon: '📡'
    },
    {
      id: 'esp32_master',
      title: 'IoT Cloud Architect',
      titleKu: 'ئەندازیاری هەوری IoT',
      desc: 'Programmed ESP32 dual-core Wi-Fi web telemetry servers.',
      descKu: 'پڕۆگرامسازی ڕاژەی وێبی ESP32 بە وایفای.',
      icon: '🌐'
    }
  ];

  // Daily Challenge Question
  const dailyQuestion = {
    q: language === 'ku'
      ? 'لە یاسای ئۆمدا (Ohm\'s Law)، ئەگەر ڤۆڵتیە ١٢ ڤۆڵت بێت و بەرگری ٤ ئۆم بێت، تەزووی تێپەڕبوو چەندە؟'
      : 'Using Ohm\'s Law (V = I * R), if Voltage is 12V and Resistance is 4Ω, what is the Current?',
    options: ['3 Amperes (A)', '48 Amperes (A)', '0.33 Amperes (A)', '8 Amperes (A)'],
    correct: 0
  };

  const handleDailySubmit = () => {
    if (dailySelected === null || dailyAnswered) return;
    if (dailySelected === dailyQuestion.correct) {
      addXp(50);
      setDailyAnswered(true);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch (e) {}
    } else {
      alert(language === 'ku' ? 'وەڵامەکە هەڵەیە، دووبارە تاقیبکەرەوە!' : 'Incorrect answer, please calculate and try again!');
    }
  };

  const handleOpenCertificate = () => {
    setShowCertificate(true);
  };

  const printCert = () => {
    window.print();
  };

  const xpProgressInLevel = userProfile.xp % 500;
  const levelProgressPercent = Math.min(100, Math.round((xpProgressInLevel / 500) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-cyan-500/20 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Maker Progression & Portfolio</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {t.dashboard.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {t.dashboard.subtitle}
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0D1424] via-[#091122] to-[#070B14] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          
          {/* Avatar & Rank */}
          <div className="flex items-center gap-4 md:col-span-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-[2px] shadow-[0_0_25px_rgba(0,217,255,0.4)] shrink-0">
              <div className="w-full h-full bg-[#070B14] rounded-[14px] flex items-center justify-center text-2xl font-black text-cyan-400">
                ⚡
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{userProfile.name}</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                  Level {userProfile.level}
                </span>
              </div>
              <p className="text-xs font-semibold text-cyan-400 font-mono">
                {userProfile.title}
              </p>
            </div>
          </div>

          {/* XP & Level Meter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">{t.dashboard.totalXp}</span>
              <span className="font-mono font-bold text-yellow-400">{userProfile.xp} XP</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${levelProgressPercent}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-500 font-mono text-right rtl:text-left">
              {xpProgressInLevel} / 500 XP to Level {userProfile.level + 1}
            </div>
          </div>

          {/* Streak Counter */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/30 flex items-center gap-3">
            <Flame className="w-8 h-8 text-amber-500 fill-amber-500 shrink-0 animate-pulse" />
            <div>
              <div className="text-lg font-black text-white font-mono">
                {userProfile.streakDays} {t.dashboard.days}
              </div>
              <div className="text-[11px] text-slate-400">{t.dashboard.currentStreak}</div>
            </div>
          </div>

        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0D1424] border border-slate-800 space-y-1">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <div className="text-2xl font-black text-white font-mono">{userProfile.completedLessons.length}</div>
          <div className="text-xs text-slate-400">{t.dashboard.completedLessons}</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D1424] border border-slate-800 space-y-1">
          <FolderGit2 className="w-4 h-4 text-purple-400" />
          <div className="text-2xl font-black text-white font-mono">{userProfile.savedProjects.length}</div>
          <div className="text-xs text-slate-400">{t.dashboard.savedProjects}</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D1424] border border-slate-800 space-y-1">
          <Code2 className="w-4 h-4 text-blue-400" />
          <div className="text-2xl font-black text-white font-mono">{userProfile.savedCode.length}</div>
          <div className="text-xs text-slate-400">{t.dashboard.savedSketches}</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D1424] border border-slate-800 space-y-1">
          <Award className="w-4 h-4 text-yellow-400" />
          <div className="text-2xl font-black text-white font-mono">{achievementsList.length}</div>
          <div className="text-xs text-slate-400">{t.dashboard.achievementsTitle}</div>
        </div>
      </div>

      {/* Daily Challenge Card */}
      <div className="p-6 rounded-3xl bg-[#0D1424] border border-cyan-500/30 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              {t.dashboard.dailyChallenge}
            </h3>
          </div>
          <span className="text-xs font-mono text-cyan-400 font-bold">+50 XP</span>
        </div>

        <p className="text-xs font-medium text-slate-200">
          {dailyQuestion.q}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          {dailyQuestion.options.map((opt, idx) => (
            <button
              key={idx}
              disabled={dailyAnswered}
              onClick={() => setDailySelected(idx)}
              className={`p-3 rounded-xl border text-xs text-left rtl:text-right font-medium transition-all cursor-pointer ${
                dailySelected === idx
                  ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                  : 'bg-[#070B14] border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          {dailyAnswered ? (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 font-mono">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.dashboard.challengeAnswered}</span>
            </span>
          ) : (
            <button
              onClick={handleDailySubmit}
              disabled={dailySelected === null}
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs disabled:opacity-40 cursor-pointer"
            >
              {t.dashboard.solveChallenge}
            </button>
          )}
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-400" />
          <span>{t.dashboard.achievementsTitle}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievementsList.map((ach) => (
            <div
              key={ach.id}
              className="p-5 rounded-2xl bg-[#0D1424] border border-slate-800 space-y-2 hover:border-yellow-500/40 transition-all"
            >
              <div className="text-3xl">{ach.icon}</div>
              <h4 className="text-xs font-bold text-white">
                {language === 'ku' ? ach.titleKu : ach.title}
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {language === 'ku' ? ach.descKu : ach.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Official Certificate Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900/90 to-cyan-950/60 border border-purple-500/40 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
              <span>{t.dashboard.certificateTitle}</span>
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              {t.dashboard.certificateDesc}
            </p>
          </div>

          <button
            onClick={handleOpenCertificate}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all cursor-pointer self-start sm:self-auto flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.dashboard.generateCert}</span>
          </button>
        </div>
      </div>

      {/* Printable Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#070B14] border-4 border-yellow-500/60 p-8 sm:p-12 text-center space-y-8 shadow-[0_0_50px_rgba(234,179,8,0.3)]">
            
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-6 right-6 rtl:right-auto rtl:left-6 px-3 py-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-700 text-xs"
            >
              Close
            </button>

            {/* Certificate Header */}
            <div className="space-y-2">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-3xl shadow-lg shadow-yellow-500/30">
                🏆
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-200 to-yellow-500 font-serif">
                Certificate of Achievement
              </h2>
              <p className="text-xs text-slate-400 tracking-wider uppercase font-mono">
                KRD Arduino Universe • Embedded Electronics Academy
              </p>
            </div>

            {/* Recipient */}
            <div className="space-y-2 border-y border-yellow-500/20 py-6">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-mono">This certifies that</p>
              <h3 className="text-3xl sm:text-4xl font-black text-white font-sans">
                {userProfile.name}
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                has successfully demonstrated practical competency in Arduino microcontroller architecture, circuit simulation, C++ embedded firmware, and sensor integration.
              </p>
            </div>

            {/* Credentials / Verification */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-400">
              <div>
                <span className="block text-slate-500 text-[10px]">VERIFICATION ID</span>
                <span className="text-yellow-400 font-bold">KRD-ARD-2026-X891</span>
              </div>
              <div>
                <span className="block text-slate-500 text-[10px]">ISSUE DATE</span>
                <span className="text-white font-bold">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block text-slate-500 text-[10px]">ACCREDITATION</span>
                <span className="text-cyan-400 font-bold">Grade: Distinguished</span>
              </div>
            </div>

            {/* Print action */}
            <div className="pt-4 flex justify-center">
              <button
                onClick={printCert}
                className="px-6 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-yellow-500/20"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Certificate</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
