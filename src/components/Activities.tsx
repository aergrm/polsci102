import { useState } from 'react';
import { Activities3DHeader } from './Activities3DHeader';
import { BargainingSimulation } from './activities/BargainingSimulation';
import { PrisonersDilemma } from './activities/PrisonersDilemma';
import { UNSCNegotiator } from './activities/UNSCNegotiator';
import { TradeSanctionsGame } from './activities/TradeSanctionsGame';
import { LevelsOfAnalysisLab } from './activities/LevelsOfAnalysisLab';
import { CrisisTimeline } from './activities/CrisisTimeline';
import { TheoryMatcher } from './activities/TheoryMatcher';
import { FlashcardTrainer } from './activities/FlashcardTrainer';
import { QuizHub } from './activities/QuizHub';
import { Scale, Swords, Globe, Network, Layers, History, Sparkles, BookOpen, HelpCircle, Gamepad2 } from 'lucide-react';

type SubTab = 'bargaining' | 'dilemma' | 'unsc' | 'trade' | 'levels' | 'timeline' | 'theory' | 'flashcards' | 'quizzes';

export function Activities() {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('bargaining');

  const activitiesList = [
    { id: 'bargaining', label: 'Fearon Bargaining Model', icon: Scale, tag: 'Week 5' },
    { id: 'dilemma', label: 'Security Dilemma Game', icon: Swords, tag: 'Week 4' },
    { id: 'unsc', label: 'UN Security Council Simulator', icon: Globe, tag: 'Week 10' },
    { id: 'trade', label: 'Trade & Sanctions Network', icon: Network, tag: 'Week 11' },
    { id: 'levels', label: 'Levels of Analysis Lab', icon: Layers, tag: 'Week 1' },
    { id: 'timeline', label: 'Crisis Timeline Explorer', icon: History, tag: 'Case Studies' },
    { id: 'theory', label: 'IR Theory Matcher', icon: Sparkles, tag: 'Week 3' },
    { id: 'flashcards', label: 'Flashcard Trainer', icon: BookOpen, tag: 'Core Terms' },
    { id: 'quizzes', label: 'Practice Quizzes Hub', icon: HelpCircle, tag: 'Exams' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-indigo-950 via-indigo-900 to-slate-950 text-white rounded-3xl p-6 md:p-10 shadow-lg overflow-hidden border border-indigo-800/50">
        <Activities3DHeader activeTab={activeSubTab} />

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider mb-2">
            <Gamepad2 className="w-5 h-5 text-indigo-400" />
            Interactive Learning & Simulation Hub
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Games, Simulations, and Practice Tools
          </h1>
          <p className="text-indigo-100 text-sm md:text-base max-w-2xl mt-3 leading-relaxed">
            Test strategic bargaining models, simulate Security Council veto negotiations, model weaponized interdependence, diagnose levels of analysis, and test your knowledge with interactive flashcards and quizzes.
          </p>

          {/* Activity Selection Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            {activitiesList.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeSubTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSubTab(item.id as SubTab)}
                  className={`p-3.5 rounded-xl text-left transition-all flex flex-col justify-between gap-2 border backdrop-blur-md ${
                    isActive
                      ? 'bg-white text-indigo-950 border-white font-bold shadow-md'
                      : 'bg-indigo-950/70 text-indigo-200 border-indigo-700/50 hover:bg-indigo-900/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <IconComponent className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-indigo-400'}`} />
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                      isActive ? 'bg-indigo-100 text-indigo-900' : 'bg-indigo-900/80 text-indigo-300 border border-indigo-700/40'
                    }`}>
                      {item.tag}
                    </span>
                  </div>
                  <span className="text-xs font-semibold leading-snug">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Component Render */}
      <div>
        {activeSubTab === 'bargaining' && <BargainingSimulation />}
        {activeSubTab === 'dilemma' && <PrisonersDilemma />}
        {activeSubTab === 'unsc' && <UNSCNegotiator />}
        {activeSubTab === 'trade' && <TradeSanctionsGame />}
        {activeSubTab === 'levels' && <LevelsOfAnalysisLab />}
        {activeSubTab === 'timeline' && <CrisisTimeline />}
        {activeSubTab === 'theory' && <TheoryMatcher />}
        {activeSubTab === 'flashcards' && <FlashcardTrainer />}
        {activeSubTab === 'quizzes' && <QuizHub />}
      </div>
    </div>
  );
}
