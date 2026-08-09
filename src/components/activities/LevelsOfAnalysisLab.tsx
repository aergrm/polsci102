import { useState } from 'react';
import { Layers, CheckCircle2, XCircle, RefreshCw, HelpCircle, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { Levels3DSpheresCanvas } from './Levels3DSpheresCanvas';
import { soundManager } from '../../lib/soundEffects';

interface Scenario {
  id: string;
  title: string;
  context: string;
  claims: {
    text: string;
    level: 'Systemic' | 'Domestic' | 'Individual';
    explanation: string;
    scholarRef: string;
  }[];
}

const scenarios: Scenario[] = [
  {
    id: 'ww1-1914',
    title: 'Outbreak of World War I (July 1914)',
    context: 'Following the assassination of Archduke Franz Ferdinand in Sarajevo, Austria-Hungary declared war on Serbia, setting off a rapid chain of mobilization across European powers.',
    claims: [
      {
        text: "The rigid alliance system (Triple Entente vs. Triple Alliance) and multipolar balance of power created a structural shift where any conflict forced systemic mobilization.",
        level: 'Systemic',
        explanation: "This focuses on international system structure, polarity, and alliance commitments without depending on who ruled individual states.",
        scholarRef: "Kenneth Waltz / J. David Singer (Systemic Level)"
      },
      {
        text: "Kaiser Wilhelm II's volatile personality, feelings of personal inferiority toward British royalty, and erratic decision-making exacerbated German diplomatic isolation.",
        level: 'Individual',
        explanation: "This centers on the personal psychological traits, biases, and individual agency of a specific leader.",
        scholarRef: "Daniel Kahneman / Ole Holsti (Individual Level)"
      },
      {
        text: "The influence of the Prussian military aristocracy and domestic military-industrial logrolling pushed Imperial Germany toward aggressive expansion to appease internal elites.",
        level: 'Domestic',
        explanation: "This explains foreign policy through regime type, internal interest group pressure, and military bureaucracy.",
        scholarRef: "Jack Snyder / Eckart Kehr (Domestic Level)"
      }
    ]
  },
  {
    id: 'cuban-missile-1962',
    title: 'Cuban Missile Crisis (October 1962)',
    context: 'The Soviet Union secretly deployed nuclear ballistic missiles to Cuba, leading to a 13-day nuclear standoff with the United States.',
    claims: [
      {
        text: "The Soviet Navy and US Air Force operated under rigid Standard Operating Procedures (SOPs), which nearly caused accidental nuclear escalation without presidential authorization.",
        level: 'Domestic',
        explanation: "Organizational process and bureaucratic politics inside state agencies drive outcomes here.",
        scholarRef: "Graham Allison (Model II: Organizational Process)"
      },
      {
        text: "Bipolarity and the US nuclear superiority ratio compelled Khrushchev to seek strategic nuclear parity to maintain nuclear deterrence in an anarchic world.",
        level: 'Systemic',
        explanation: "Focuses on global power distribution, strategic competition, and structural deterrence between super-powers.",
        scholarRef: "Neorealism / Bipolarity theory"
      },
      {
        text: "John F. Kennedy's acute awareness of his youth, his desire to project political resolve after the Bay of Pigs failure, and personal rivalry with Khrushchev.",
        level: 'Individual',
        explanation: "Focuses on the personal perceptions, cognitive framing, and political risk preferences of individual key leaders.",
        scholarRef: "Robert Jervis / Cognitive Approaches"
      }
    ]
  },
  {
    id: 'democratic-peace',
    title: 'Absence of War Between Liberal Democracies',
    context: 'Scholars observe an empirical pattern: established democratic states rarely, if ever, wage full-scale war against one another.',
    claims: [
      {
        text: "Democratic institutions (elections, separation of powers, free press) make mobilization slow and public accountability high, deterring leaders from costly conflict.",
        level: 'Domestic',
        explanation: "Looks inside democratic states at constitutional structures, public opinion, and institutional checks and balances.",
        scholarRef: "Immanuel Kant / Michael Doyle (Democratic Peace)"
      },
      {
        text: "Democratic leaders share common norms of peaceful dispute resolution and mutual respect, viewing other democracies as legitimate non-threats.",
        level: 'Domestic',
        explanation: "Internal regime values, normative political culture, and democratic identity determine foreign policy preferences.",
        scholarRef: "Liberal Constructivism / Bruce Russett"
      },
      {
        text: "Democracies happen to share economic interdependencies and joint participation in international institutions (UN, WTO) that constrain aggression at the international level.",
        level: 'Systemic',
        explanation: "Focuses on international institutional architecture, global trade networks, and systemic interdependence.",
        scholarRef: "Robert Keohane (Neoliberal Institutionalism)"
      }
    ]
  }
];

export function LevelsOfAnalysisLab() {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [claimIndex, setClaimIndex] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState<'Systemic' | 'Domestic' | 'Individual' | null>(null);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getMuted());

  const handleToggleMute = () => {
    const nextMuted = soundManager.toggleMute();
    setIsMuted(nextMuted);
  };

  const scenario = scenarios[currentScenarioIndex];
  const currentClaim = scenario.claims[claimIndex];

  const handleSelect = (level: 'Systemic' | 'Domestic' | 'Individual') => {
    if (selectedLevel !== null) return;
    setSelectedLevel(level);
    setTotalAttempts(prev => prev + 1);
    if (level === currentClaim.level) {
      soundManager.playSuccess();
      setScore(prev => prev + 1);
    } else {
      soundManager.playWarning();
    }
  };

  const handleNext = () => {
    setSelectedLevel(null);
    if (claimIndex < scenario.claims.length - 1) {
      setClaimIndex(claimIndex + 1);
    } else if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setClaimIndex(0);
    } else {
      // Loop back or reset
      setCurrentScenarioIndex(0);
      setClaimIndex(0);
    }
  };

  const isCorrect = selectedLevel === currentClaim.level;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            Singer's Framework Diagnoser
          </div>
          <h2 className="text-2xl font-bold text-zinc-900">Levels of Analysis Lab</h2>
          <p className="text-xs text-zinc-600 mt-1">
            Classify IR explanations into Systemic (System/Anarchy), Domestic (State/Regime), or Individual (Leader psychology) levels.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={handleToggleMute}
            className="p-2.5 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-indigo-600" />}
            <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Audio On'}</span>
          </button>

          <div className="flex items-center gap-3 bg-zinc-50 px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium">
            <div>
              Score: <span className="font-bold text-indigo-600">{score}</span> / {totalAttempts}
            </div>
            <div className="h-4 w-[1px] bg-zinc-300"></div>
            <div className="text-zinc-500">
              Case {currentScenarioIndex + 1} of {scenarios.length}
            </div>
          </div>
        </div>
      </div>

      {/* 3D Concentric Level Visualizer */}
      <Levels3DSpheresCanvas selectedLevel={selectedLevel} />

      {/* Case Context Box */}
      <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-5 space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-indigo-800">
          Historical Case Context: {scenario.title}
        </div>
        <p className="text-sm text-zinc-800 leading-relaxed font-medium">
          {scenario.context}
        </p>
      </div>

      {/* Claim Card */}
      <div className="p-6 rounded-2xl border-2 border-zinc-200 bg-zinc-50/50 space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-zinc-500 uppercase tracking-wider">
          <span>Explanatory Claim #{claimIndex + 1}</span>
          <span>Which level of analysis does this claim represent?</span>
        </div>

        <blockquote className="text-base font-semibold text-zinc-900 italic leading-relaxed border-l-4 border-indigo-600 pl-4 py-1">
          "{currentClaim.text}"
        </blockquote>

        {/* Level Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {(['Systemic', 'Domestic', 'Individual'] as const).map(level => {
            const isSelected = selectedLevel === level;
            const isTarget = currentClaim.level === level;

            let btnStyle = 'bg-white border-zinc-300 text-zinc-800 hover:border-indigo-500 hover:bg-indigo-50/50';
            if (selectedLevel !== null) {
              if (isTarget) {
                btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
              } else if (isSelected) {
                btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 font-bold';
              } else {
                btnStyle = 'bg-zinc-100 border-zinc-200 text-zinc-400 opacity-60';
              }
            }

            return (
              <button
                key={level}
                onClick={() => handleSelect(level)}
                disabled={selectedLevel !== null}
                className={`p-4 rounded-xl border text-sm transition-all text-left flex flex-col justify-between gap-1 shadow-xs ${btnStyle}`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span>{level} Level</span>
                  {selectedLevel !== null && isTarget && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  )}
                  {selectedLevel !== null && isSelected && !isTarget && (
                    <XCircle className="w-4 h-4 text-rose-600" />
                  )}
                </div>
                <span className="text-[11px] font-normal text-zinc-500">
                  {level === 'Systemic' && 'Anarchy, power balance, polarity, institutions'}
                  {level === 'Domestic' && 'Regimes, public opinion, military, bureaucracies'}
                  {level === 'Individual' && 'Leader personality, perception, cognitive bias'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        {selectedLevel !== null && (
          <div className={`p-4 rounded-xl border text-xs space-y-2 mt-4 animate-fadeIn ${
            isCorrect ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950' : 'bg-rose-50/80 border-rose-200 text-rose-950'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Correct Diagnosis!
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600" />
                  Incorrect. This claim operates at the {currentClaim.level} Level.
                </>
              )}
            </div>
            <p className="leading-relaxed text-zinc-800">
              {currentClaim.explanation}
            </p>
            <div className="pt-2 border-t border-zinc-200/60 font-medium text-[11px] text-zinc-600 flex items-center justify-between">
              <span>Scholarly Reference: <strong>{currentClaim.scholarRef}</strong></span>
              <button
                onClick={handleNext}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex items-center gap-1 text-xs transition-colors shadow-xs"
              >
                Next Claim <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Concept Summary Banner */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-xs text-zinc-700 space-y-1">
        <div className="font-bold text-zinc-900 flex items-center gap-1">
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          Level-of-Analysis Summary (Singer 1961)
        </div>
        <p className="leading-relaxed">
          The level of analysis dictates where scholars look for cause: <strong>Systemic</strong> looks at how the international environment forces states to act; <strong>Domestic</strong> looks inside states at politics and institutions; <strong>Individual</strong> looks inside decision-makers' minds.
        </p>
      </div>
    </div>
  );
}
