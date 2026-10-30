/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/home/HomePage';
import { AcademyPage } from './components/academy/AcademyPage';
import { ComponentsPage } from './components/components/ComponentsPage';
import { SimulatorPage } from './components/simulator/SimulatorPage';
import { CodeStudioPage } from './components/editor/CodeStudioPage';
import { AssistantPage } from './components/ai/AssistantPage';
import { CircuitToCodePage } from './components/circuit-to-code/CircuitToCodePage';
import { ProjectsPage } from './components/projects/ProjectsPage';
import { PinoutPage } from './components/pinout/PinoutPage';
import { CalculatorsPage } from './components/calculators/CalculatorsPage';
import { QuizPage } from './components/quiz/QuizPage';
import { TroubleshootingPage } from './components/troubleshooting/TroubleshootingPage';
import { CommunityPage } from './components/community/CommunityPage';
import { DashboardPage } from './components/dashboard/DashboardPage';

const MainView: React.FC = () => {
  const { currentPage } = useApp();

  return (
    <main className="min-h-[calc(100vh-64px)]">
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'academy' && <AcademyPage />}
      {currentPage === 'components' && <ComponentsPage />}
      {currentPage === 'simulator' && <SimulatorPage />}
      {currentPage === 'editor' && <CodeStudioPage />}
      {currentPage === 'ai' && <AssistantPage />}
      {currentPage === 'circuit-to-code' && <CircuitToCodePage />}
      {currentPage === 'projects' && <ProjectsPage />}
      {currentPage === 'pinout' && <PinoutPage />}
      {currentPage === 'calculators' && <CalculatorsPage />}
      {currentPage === 'quiz' && <QuizPage />}
      {currentPage === 'troubleshooting' && <TroubleshootingPage />}
      {currentPage === 'community' && <CommunityPage />}
      {currentPage === 'dashboard' && <DashboardPage />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
        <Navbar />
        <MainView />
        <Footer />
      </div>
    </AppProvider>
  );
}
