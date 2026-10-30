import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, PageId, UserProfile } from '../types';
import { translations } from '../i18n/translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  t: typeof translations['en'];
  userProfile: UserProfile;
  addXp: (amount: number) => void;
  toggleCompleteLesson: (lessonId: string) => void;
  toggleSaveProject: (projectId: string) => void;
  saveUserCode: (title: string, code: string) => void;
  activeEditorCode: string;
  setActiveEditorCode: (code: string) => void;
  activeSimulatorPreset: string;
  setActiveSimulatorPreset: (preset: string) => void;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'KRD Embedded Maker',
  email: 'maker@krd-arduino.io',
  title: 'Hardware Explorer',
  xp: 320,
  level: 1,
  streakDays: 4,
  completedLessons: ['l-beg-1', 'l-beg-2'],
  savedProjects: ['proj-blink', 'proj-ultrasonic-radar'],
  savedCode: [
    {
      id: 'sc-1',
      title: 'Blink with Custom Interval',
      date: 'Yesterday',
      code: `void setup() {\n  pinMode(13, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(250);\n  digitalWrite(13, LOW);\n  delay(750);\n}`
    }
  ],
  quizScores: { 'beginner-1': 100 },
  achievements: ['first_blink', 'circuit_starter']
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('krd_language');
    return (saved === 'ku' || saved === 'en') ? saved : 'en';
  });

  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [activeEditorCode, setActiveEditorCode] = useState<string>(`// KRD Arduino Universe - Code Studio
// Board: Arduino Uno / Nano / ESP32
#define LED_PIN 13

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
  Serial.println("KRD Arduino Universe initialized!");
}

void loop() {
  digitalWrite(LED_PIN, HIGH);
  delay(500);
  digitalWrite(LED_PIN, LOW);
  delay(500);
}`);

  const [activeSimulatorPreset, setActiveSimulatorPreset] = useState<string>('blink');

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('krd_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PROFILE;
  });

  const isRTL = language === 'ku';
  const t = translations[language] || translations.en;

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    localStorage.setItem('krd_language', language);
  }, [language, isRTL]);

  useEffect(() => {
    try {
      localStorage.setItem('krd_profile', JSON.stringify(userProfile));
    } catch (e) {
      console.error(e);
    }
  }, [userProfile]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const addXp = (amount: number) => {
    setUserProfile(prev => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 500) + 1;
      let newTitle = prev.title;
      if (newLevel >= 4) newTitle = 'Master Embedded Architect';
      else if (newLevel >= 3) newTitle = 'Circuit Innovator';
      else if (newLevel >= 2) newTitle = 'Microcontroller Hacker';

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        title: newTitle
      };
    });
  };

  const toggleCompleteLesson = (lessonId: string) => {
    setUserProfile(prev => {
      const isCompleted = prev.completedLessons.includes(lessonId);
      const updated = isCompleted
        ? prev.completedLessons.filter(id => id !== lessonId)
        : [...prev.completedLessons, lessonId];

      if (!isCompleted) {
        addXp(60);
      }

      return {
        ...prev,
        completedLessons: updated
      };
    });
  };

  const toggleSaveProject = (projectId: string) => {
    setUserProfile(prev => {
      const isSaved = prev.savedProjects.includes(projectId);
      return {
        ...prev,
        savedProjects: isSaved
          ? prev.savedProjects.filter(id => id !== projectId)
          : [...prev.savedProjects, projectId]
      };
    });
  };

  const saveUserCode = (title: string, code: string) => {
    setUserProfile(prev => {
      const newSaved = [
        {
          id: `sc-${Date.now()}`,
          title: title || 'Untitled Sketch',
          date: new Date().toLocaleDateString(),
          code
        },
        ...prev.savedCode
      ];
      return { ...prev, savedCode: newSaved };
    });
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        isRTL,
        currentPage,
        setCurrentPage,
        t,
        userProfile,
        addXp,
        toggleCompleteLesson,
        toggleSaveProject,
        saveUserCode,
        activeEditorCode,
        setActiveEditorCode,
        activeSimulatorPreset,
        setActiveSimulatorPreset
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
