import { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Trophy, RotateCcw, Sparkles } from 'lucide-react';

interface Scenario {
  id: number;
  statement: string;
  correctTheory: 'Realism' | 'Liberalism' | 'Constructivism';
  explanation: string;
}

const scenariosData: Scenario[] = [
  {
    id: 1,
    statement: "States build up military capabilities and forge balancing alliances because the international system lacks a central authority to guarantee their survival.",
    correctTheory: 'Realism',
    explanation: 'Realism emphasizes state survival, military power, balance of power, and self-help under anarchy.'
  },
  {
    id: 2,
    statement: "International institutions like the WTO and United Nations facilitate trade and security cooperation by lowering transaction costs and increasing transparency.",
    correctTheory: 'Liberalism',
    explanation: 'Liberalism highlights how international institutions, economic interdependence, and democratic norms mitigate conflict.'
  },
  {
    id: 3,
    statement: "Anarchy does not automatically lead to conflict; state relationships are shaped by shared identities, historical norms, and social interactions.",
    correctTheory: 'Constructivism',
    explanation: 'Constructivism argues that anarchy is socially constructed ("anarchy is what states make of it") through identities and ideas.'
  },
  {
    id: 4,
    statement: "Democracies almost never fight wars against other democracies due to shared democratic values, public accountability, and institutional checks.",
    correctTheory: 'Liberalism',
    explanation: 'This describes the Democratic Peace Theory, a foundational component of liberal international relations theory.'
  },
  {
    id: 5,
    statement: "The United States fears North Korea's nuclear weapons far more than the United Kingdom's nuclear weapons, even though the UK possesses many more warheads.",
    correctTheory: 'Constructivism',
    explanation: 'Constructivism demonstrates that weapons derive meaning from social identity, historical alliances, and shared perception rather than pure numbers.'
  },
  {
    id: 6,
    statement: "States care primarily about relative gains in power relative to rivals, making sustainable cooperation difficult in strategic sectors.",
    correctTheory: 'Realism',
    explanation: 'Realism posits that fear of relative gains (a rival gaining more advantage) inhibits international cooperation.'
  },
  {
    id: 7,
    statement: "High levels of global trade create mutual economic vulnerability, making war irrational and costly for trading partners.",
    correctTheory: 'Liberalism',
    explanation: 'Commercial liberalism asserts that economic interdependence creates strong domestic incentives against military conflict.'
  },
  {
    id: 8,
    statement: "Transnational advocacy networks and non-governmental organizations change international law by introducing new human rights norms.",
    correctTheory: 'Constructivism',
    explanation: 'Constructivism emphasizes the role of nonstate norm entrepreneurs and transnational networks in changing global understandings.'
  }
];

export function TheoryMatcher() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'Realism' | 'Liberalism' | 'Constructivism' | null>(null);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  const currentScenario = scenariosData[currentIndex];

  const handleSelectAnswer = (theory: 'Realism' | 'Liberalism' | 'Constructivism') => {
    if (selectedAnswer !== null) return; // Already answered

    setSelectedAnswer(theory);
    setShowExplanation(true);

    if (theory === currentScenario.correctTheory) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < scenariosData.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setStreak(0);
    setShowExplanation(false);
    setCompleted(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-sm space-y-6">
      <div className="border-b border-zinc-200 pb-4">
        <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-1">
          <Sparkles className="w-5 h-5" />
          Theoretical Frameworks
        </div>
        <h2 className="text-2xl font-bold text-zinc-900">IR Paradigm Classification Challenge</h2>
        <p className="text-zinc-600 text-sm mt-1">
          Read real-world diplomatic statements and historical scenarios, then identify whether they reflect Realism, Liberalism, or Constructivism.
        </p>
      </div>

      {!completed ? (
        <div className="space-y-6">
          {/* Header Stats */}
          <div className="flex justify-between items-center bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-sm">
            <span className="font-semibold text-zinc-700">
              Scenario <span className="text-indigo-600 font-bold">{currentIndex + 1}</span> of {scenariosData.length}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                🔥 Streak: {streak}
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Score: {score} / {scenariosData.length}
              </span>
            </div>
          </div>

          {/* Statement Card */}
          <div className="bg-gradient-to-br from-indigo-900 to-zinc-900 text-white p-6 md:p-8 rounded-2xl shadow-md space-y-4">
            <div className="text-indigo-300 font-mono text-xs uppercase tracking-wider">Historical Scenario / Quote</div>
            <p className="text-lg md:text-xl font-medium leading-relaxed italic">
              "{currentScenario.statement}"
            </p>
          </div>

          {/* Choice Buttons */}
          <div className="grid md:grid-cols-3 gap-4">
            {(['Realism', 'Liberalism', 'Constructivism'] as const).map((theory) => {
              const isSelected = selectedAnswer === theory;
              const isCorrect = theory === currentScenario.correctTheory;

              let btnStyle = "bg-white border border-zinc-300 text-zinc-800 hover:border-indigo-500 hover:bg-indigo-50/50";
              if (selectedAnswer !== null) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-600 border-emerald-600 text-white font-bold";
                } else if (isSelected) {
                  btnStyle = "bg-rose-600 border-rose-600 text-white font-bold";
                } else {
                  btnStyle = "bg-zinc-100 border-zinc-200 text-zinc-400 opacity-60";
                }
              }

              return (
                <button
                  key={theory}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleSelectAnswer(theory)}
                  className={`p-4 rounded-xl text-center text-base font-bold transition-all shadow-sm flex flex-col items-center justify-center gap-1 ${btnStyle}`}
                >
                  {theory}
                  {selectedAnswer !== null && isCorrect && <CheckCircle2 className="w-5 h-5 mt-1" />}
                  {selectedAnswer !== null && isSelected && !isCorrect && <XCircle className="w-5 h-5 mt-1" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showExplanation && (
            <div
              className={`p-5 rounded-xl border space-y-2 text-sm ${
                selectedAnswer === currentScenario.correctTheory
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <div className="font-bold flex items-center gap-2">
                {selectedAnswer === currentScenario.correctTheory ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Correct! Paradigm: {currentScenario.correctTheory}
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600" /> Incorrect. Correct Paradigm: {currentScenario.correctTheory}
                  </>
                )}
              </div>
              <p className="text-xs leading-relaxed">{currentScenario.explanation}</p>
              <div className="pt-2">
                <button
                  onClick={handleNext}
                  className="bg-zinc-900 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-zinc-800 transition"
                >
                  {currentIndex + 1 < scenariosData.length ? 'Next Scenario →' : 'View Results'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="bg-indigo-50 border border-indigo-200 p-8 rounded-2xl text-center space-y-4">
          <Trophy className="w-12 h-12 text-indigo-600 mx-auto" />
          <h3 className="text-2xl font-bold text-indigo-950">Challenge Complete!</h3>
          <p className="text-indigo-800 text-base">
            You scored <span className="font-extrabold text-indigo-900">{score}</span> out of{' '}
            <span className="font-extrabold">{scenariosData.length}</span> ({Math.round((score / scenariosData.length) * 100)}%).
          </p>

          <p className="text-xs text-indigo-700 max-w-md mx-auto leading-relaxed">
            {score >= 7
              ? 'Outstanding performance! You have mastered distinguishing Realism, Liberalism, and Constructivism in international relations.'
              : 'Good effort! Review the theoretical frameworks in Week 3 readings to sharpen your paradigm classification skills.'}
          </p>

          <button
            onClick={handleRestart}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition inline-flex items-center gap-2 text-sm shadow-sm"
          >
            <RotateCcw className="w-4 h-4" /> Try Again
          </button>
        </div>
      )}
    </div>
  );
}
