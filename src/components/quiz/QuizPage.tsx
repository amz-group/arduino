import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { quizzesData } from '../../data/quizzesData';
import { QuizQuestion } from '../../types';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  RotateCcw, 
  HelpCircle, 
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const QuizPage: React.FC = () => {
  const { t, language, addXp } = useApp();
  
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const levelQuestions = quizzesData.filter(q => q.level === selectedLevel);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    levelQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const calculatedScore = Math.round((correctCount / levelQuestions.length) * 100);
    setScore(calculatedScore);
    setIsSubmitted(true);

    if (calculatedScore >= 70) {
      addXp(120);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      addXp(30);
    }
  };

  const handleRetake = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  const handleLevelChange = (lvl: 'beginner' | 'intermediate' | 'advanced') => {
    setSelectedLevel(lvl);
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-cyan-500/20 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-950/60 border border-yellow-500/30 text-yellow-400 text-xs font-mono mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>Automated Hardware Certification Exams</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {t.quiz.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {t.quiz.subtitle}
        </p>
      </div>

      {/* Level Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {(['beginner', 'intermediate', 'advanced'] as const).map((lvl) => {
          const active = selectedLevel === lvl;
          return (
            <button
              key={lvl}
              onClick={() => handleLevelChange(lvl)}
              className={`p-4 rounded-2xl border text-left rtl:text-right transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                active
                  ? 'bg-yellow-950/40 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.25)]'
                  : 'bg-[#0D1424] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-yellow-400 font-bold">
                  {lvl} tier
                </span>
                {active && <CheckCircle2 className="w-4 h-4 text-yellow-400" />}
              </div>
              <h4 className={`text-xs font-bold ${active ? 'text-white' : 'text-slate-300'}`}>
                {(t.quiz as any)[`level${lvl.charAt(0).toUpperCase() + lvl.slice(1)}`]}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Score Summary Box (when submitted) */}
      {isSubmitted && (
        <div className={`p-6 sm:p-8 rounded-3xl border text-center space-y-4 shadow-2xl ${
          score >= 70
            ? 'bg-emerald-950/30 border-emerald-500/50 shadow-emerald-900/20'
            : 'bg-rose-950/30 border-rose-500/50 shadow-rose-900/20'
        }`}>
          <div className="inline-flex p-3 rounded-full bg-slate-900 border border-slate-700">
            {score >= 70 ? (
              <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce" />
            ) : (
              <HelpCircle className="w-8 h-8 text-rose-400" />
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-3xl font-black text-white font-mono">{score}%</h3>
            <p className="text-sm font-bold text-slate-200">
              {score >= 70 ? t.quiz.passed : t.quiz.tryAgain}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 text-yellow-400 font-mono text-xs font-bold border border-yellow-500/40">
            <Zap className="w-4 h-4 fill-yellow-400" />
            <span>+{score >= 70 ? '120' : '30'} {t.quiz.xpEarned}</span>
          </div>

          <div className="pt-2">
            <button
              onClick={handleRetake}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-white transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.quiz.retake}</span>
            </button>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {levelQuestions.map((q, qIndex) => {
          const selectedOption = userAnswers[q.id];
          const isCorrect = isSubmitted && selectedOption === q.correctIndex;
          const isWrong = isSubmitted && selectedOption !== undefined && selectedOption !== q.correctIndex;

          return (
            <div
              key={q.id}
              className="p-6 rounded-3xl bg-[#0D1424] border border-slate-800 space-y-4 shadow-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-yellow-950 text-yellow-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {qIndex + 1}
                  </span>
                  <span className="text-xs font-mono uppercase text-slate-500">
                    {q.type}
                  </span>
                </div>

                {isSubmitted && (
                  <div>
                    {selectedOption === q.correctIndex ? (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 font-mono">
                        <CheckCircle2 className="w-4 h-4" /> Correct (+40 XP)
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-rose-400 flex items-center gap-1 font-mono">
                        <XCircle className="w-4 h-4" /> Incorrect
                      </span>
                    )}
                  </div>
                )}
              </div>

              <h3 className="text-sm sm:text-base font-bold text-white">
                {language === 'ku' ? q.questionKu : q.question}
              </h3>

              {/* Options */}
              <div className="space-y-2 pt-2">
                {(language === 'ku' ? q.optionsKu : q.options).map((opt, optIdx) => {
                  const isChecked = selectedOption === optIdx;
                  const isAnswerCorrect = q.correctIndex === optIdx;

                  let style = 'bg-[#070B14] border-slate-800 text-slate-300 hover:border-slate-700';

                  if (isSubmitted) {
                    if (isAnswerCorrect) {
                      style = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                    } else if (isChecked && !isAnswerCorrect) {
                      style = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    }
                  } else if (isChecked) {
                    style = 'bg-yellow-950/60 border-yellow-500 text-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.2)]';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full p-3.5 rounded-2xl border text-xs text-left rtl:text-right font-medium transition-all flex items-center justify-between cursor-pointer ${style}`}
                    >
                      <span>{opt}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isChecked ? 'border-yellow-400 bg-yellow-400' : 'border-slate-700'
                      }`}>
                        {isChecked && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Technical Explanation on submission */}
              {isSubmitted && (
                <div className="p-4 rounded-2xl bg-[#070B14] border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="font-bold text-yellow-400 font-mono">
                    {t.quiz.explanation}:
                  </div>
                  <p className="leading-relaxed">
                    {language === 'ku' ? q.explanationKu : q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Exam Button */}
      {!isSubmitted && (
        <div className="pt-4 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={Object.keys(userAnswers).length === 0}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm shadow-[0_0_25px_rgba(234,179,8,0.4)] transition-all cursor-pointer disabled:opacity-50"
          >
            {t.quiz.submitExam}
          </button>
        </div>
      )}

    </div>
  );
};
