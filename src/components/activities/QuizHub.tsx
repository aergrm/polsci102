import { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, RotateCcw, BookOpen, Award, ArrowRight } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizModule {
  id: string;
  title: string;
  subtitle: string;
  questions: Question[];
}

const quizModules: QuizModule[] = [
  {
    id: 'm1',
    title: 'Part I: Foundations of International Relations',
    subtitle: 'Anarchy, Sovereignty, Levels of Analysis, and Theories',
    questions: [
      {
        id: 1,
        question: 'What defines international anarchy in political science?',
        options: [
          'Total chaos and endless violence everywhere in the world',
          'The absence of a central world government with a monopoly on legitimate force',
          'A system where nonstate actors possess more military power than states',
          'A rule-based international organization governing all domestic policies'
        ],
        correctIndex: 1,
        explanation: 'In international relations, anarchy refers specifically to the structural absence of an overarching world government, not lawlessness or chaos.'
      },
      {
        id: 2,
        question: 'According to Kenneth Waltz’s levels of analysis, which level emphasizes international system structure?',
        options: [
          'Individual level',
          'Domestic state level',
          'Systemic / Third-image level',
          'Subnational psychological level'
        ],
        correctIndex: 2,
        explanation: 'The third image (systemic level) focuses on how the distribution of power and structural anarchy shape state behavior regardless of internal government types.'
      },
      {
        id: 3,
        question: 'Which theoretical tradition emphasizes relative gains, military balancing, and self-help?',
        options: [
          'Liberalism',
          'Constructivism',
          'Realism',
          'Marxism'
        ],
        correctIndex: 2,
        explanation: 'Realism centers on state survival, relative gains in power, self-help, and military balancing under structural anarchy.'
      }
    ]
  },
  {
    id: 'm2',
    title: 'Part II: War, Bargaining, and Coercion',
    subtitle: 'Bargaining Model, Coercive Diplomacy, and Nuclear Deterrence',
    questions: [
      {
        id: 1,
        question: 'In Fearon’s rationalist bargaining model, why is war described as inefficient ex post?',
        options: [
          'Because war destroys resources and costs lives, leaving less total surplus than a peaceful compromise',
          'Because leaders always lose elections after initiating wars',
          'Because military technology is too cheap to deter opponents',
          'Because war creates immediate free trade agreements'
        ],
        correctIndex: 0,
        explanation: 'Because fighting destroys wealth and lives (costs C_A + C_B), both sides would be strictly better off accepting a peaceful division within the bargaining range.'
      },
      {
        id: 2,
        question: 'What is the main distinction between deterrence and compellence?',
        options: [
          'Deterrence uses nuclear weapons while compellence uses economic sanctions',
          'Deterrence seeks to prevent an action, whereas compellence seeks to force an opponent to change existing behavior',
          'Deterrence requires international organization approval while compellence does not',
          'Deterrence is used only by nonstate actors'
        ],
        correctIndex: 1,
        explanation: 'Deterrence aims to maintain the status quo by threatening punishment if an action is taken; compellence aims to stop or reverse an action already underway.'
      },
      {
        id: 3,
        question: 'What scenario creates a commitment problem leading to preventive war?',
        options: [
          'When state power remains perfectly equal over a century',
          'When one state expects a large future increase in power, making today’s promises non-credible',
          'When both states agree on all domestic trade tariffs',
          'When international courts resolve all territorial disputes'
        ],
        correctIndex: 1,
        explanation: 'A shifting balance of power creates a commitment problem: the rising state cannot credibly commit not to exploit its future strength, giving the declining state an incentive to strike preventively.'
      }
    ]
  },
  {
    id: 'm3',
    title: 'Part III & IV: Foreign Policy, Violence, & Institutions',
    subtitle: 'Leaders, Public Opinion, Civil Wars, and International Law',
    questions: [
      {
        id: 1,
        question: 'What is a two-level game in foreign policy analysis (Putnam 1988)?',
        options: [
          'Simultaneous negotiations at the international level and domestic domestic political level',
          'A military war played in air and naval domains',
          'A game between state leaders and international news media',
          'A bilateral trade conflict between two developing nations'
        ],
        correctIndex: 0,
        explanation: 'Robert Putnam’s framework shows that state leaders must simultaneously satisfy international counterparts (Level I) and domestic ratifying coalitions (Level II).'
      },
      {
        id: 2,
        question: 'How do international institutions help states overcome collective-action problems?',
        options: [
          'By providing a world army that enforces all laws automatically',
          'By reducing transaction costs, establishing clear expectations, and monitoring compliance',
          'By abolishing national borders and sovereign currencies',
          'By eliminating political competition between states'
        ],
        correctIndex: 1,
        explanation: 'Institutions foster cooperation under anarchy by lowering transaction costs, providing reliable information, enabling repeated interactions, and clarifying standards of compliance.'
      }
    ]
  },
  {
    id: 'm4',
    title: 'Part V: Political Economy & Emerging Challenges',
    subtitle: 'Trade, Interdependence, Climate, and Technology',
    questions: [
      {
        id: 1,
        question: 'What is "weaponized interdependence" according to Farrell and Newman (2019)?',
        options: [
          'Using nuclear weapons to protect free trade routes',
          'States leveraging asymmetric central hubs in global physical or financial networks for coercion',
          'The complete breakdown of all international trade agreements',
          'Military alliances formed between small developing nations'
        ],
        correctIndex: 1,
        explanation: 'Weaponized interdependence describes how states exploit central node positions in global networks (like financial clearing houses or communications backbones) to spy or enforce sanctions.'
      },
      {
        id: 2,
        question: 'Why is global climate change structurally difficult to solve in world politics?',
        options: [
          'Because clean energy technology does not exist',
          'Because stable climate is a global public good subject to free-riding under anarchy',
          'Because states are legally forbidden from signing treaties on the environment',
          'Because international organizations refuse to host environmental summits'
        ],
        correctIndex: 1,
        explanation: 'Climate stability is a global public good: non-excludable and non-rivalrous. Individual states face strong domestic incentives to free-ride on other countries’ emission reductions.'
      }
    ]
  }
];

export function QuizHub() {
  const [selectedModuleId, setSelectedModuleId] = useState<string>('m1');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const activeModule = quizModules.find(m => m.id === selectedModuleId) || quizModules[0];
  const currentQuestion = activeModule.questions[currentQuestionIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (submitted) return;
    setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: optionIndex }));
  };

  const calculateScore = () => {
    let count = 0;
    activeModule.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) count++;
    });
    return count;
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setSubmitted(false);
  };

  const handleSwitchModule = (modId: string) => {
    setSelectedModuleId(modId);
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setSubmitted(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-sm space-y-6">
      <div className="border-b border-zinc-200 pb-4">
        <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-1">
          <BookOpen className="w-5 h-5" />
          Interactive Assessment Center
        </div>
        <h2 className="text-2xl font-bold text-zinc-900">POL SCI 102 Practice Quizzes</h2>
        <p className="text-zinc-600 text-sm mt-1">
          Test your knowledge of foundational IR theories, empirical evidence, conflict bargaining, foreign policy, and global political economy.
        </p>
      </div>

      {/* Module Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-200 pb-4">
        {quizModules.map(m => (
          <button
            key={m.id}
            onClick={() => handleSwitchModule(m.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedModuleId === m.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            {m.title.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Module Info Header */}
      <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
        <h3 className="font-bold text-zinc-900 text-base">{activeModule.title}</h3>
        <p className="text-xs text-zinc-600 mt-0.5">{activeModule.subtitle}</p>
      </div>

      {!submitted ? (
        <div className="space-y-6">
          {/* Question Navigation */}
          <div className="flex items-center justify-between text-xs text-zinc-500 border-b border-zinc-100 pb-3">
            <span>
              Question <strong className="text-zinc-900">{currentQuestionIndex + 1}</strong> of {activeModule.questions.length}
            </span>
            <div className="flex gap-1.5">
              {activeModule.questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition ${
                    idx === currentQuestionIndex
                      ? 'bg-indigo-600 text-white'
                      : userAnswers[q.id] !== undefined
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Question Box */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-zinc-900 leading-snug">
              {currentQuestion.question}
            </h4>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((opt, optIdx) => {
                const isSelected = userAnswers[currentQuestion.id] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium border transition flex items-start gap-3 ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-950 font-bold shadow-sm'
                        : 'bg-white border-zinc-200 text-zinc-800 hover:bg-zinc-50 hover:border-zinc-300'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full text-xs font-bold shrink-0 flex items-center justify-center mt-0.5 ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-zinc-200 text-zinc-700'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Controls */}
          <div className="flex justify-between items-center pt-4 border-t border-zinc-100">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
              className="px-4 py-2 text-xs font-semibold text-zinc-600 bg-zinc-100 rounded-lg hover:bg-zinc-200 disabled:opacity-40 transition"
            >
              ← Previous
            </button>

            {currentQuestionIndex < activeModule.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition flex items-center gap-1"
              >
                Next Question <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                disabled={Object.keys(userAnswers).length < activeModule.questions.length}
                className="px-6 py-2 text-xs font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition shadow-sm"
              >
                Submit Practice Quiz
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results and Explanation Review */
        <div className="space-y-8">
          <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-2xl text-center space-y-3">
            <Award className="w-10 h-10 text-indigo-600 mx-auto" />
            <h3 className="text-xl font-bold text-indigo-950">Quiz Summary</h3>
            <p className="text-2xl font-extrabold text-indigo-900">
              {calculateScore()} / {activeModule.questions.length} Correct
            </p>
            <button
              onClick={handleResetQuiz}
              className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-indigo-700 transition inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
            </button>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-6">
            <h4 className="text-base font-bold text-zinc-900 uppercase tracking-wide border-b border-zinc-200 pb-2">
              Detailed Question Explanations
            </h4>

            {activeModule.questions.map((q, qIdx) => {
              const userAns = userAnswers[q.id];
              const isCorrect = userAns === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border space-y-3 ${
                    isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-bold text-sm text-zinc-900">
                      {qIdx + 1}. {q.question}
                    </div>
                    {isCorrect ? (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
                        <CheckCircle className="w-3.5 h-3.5" /> Correct
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
                        <XCircle className="w-3.5 h-3.5" /> Incorrect
                      </span>
                    )}
                  </div>

                  <div className="text-xs space-y-1">
                    <p className="text-zinc-700">
                      <strong>Your Answer:</strong> {userAns !== undefined ? q.options[userAns] : 'Not answered'}
                    </p>
                    {!isCorrect && (
                      <p className="text-emerald-800 font-semibold">
                        <strong>Correct Answer:</strong> {q.options[q.correctIndex]}
                      </p>
                    )}
                  </div>

                  <div className="p-3 bg-white/80 rounded-lg text-xs text-zinc-700 border border-zinc-200 leading-relaxed">
                    <strong className="text-zinc-900">Explanation:</strong> {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
