import { useState } from 'react';
import {
  TrendingUp,
  Shield,
  Scale,
  Swords,
  Globe2,
  DollarSign,
  Activity,
  Flame,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  cincCapabilitiesData,
  ucdpPrioArmedConflicts,
  democraticPeaceDyads,
  sipriSpendingTrends,
  regimeWavesData
} from '../data/irDatasets';

interface InteractiveFigureProps {
  week: number;
  title: string;
}

export function WeekInteractiveFigure({ week, title }: InteractiveFigureProps) {
  // Render authentic empirical interactive visualizers tailored directly to each week's scholarly topic
  if (week === 1 || week === 2) {
    // 200 Years of Systemic Hegemonic Cycles (COW CINC Great Power Shares)
    return <CincPowerTransitionVisualizer week={week} />;
  }

  if (week === 3 || week === 9) {
    // The Democratic Peace Law & Huntington's Waves of Democratization (Polity5)
    return <DemocraticPeaceVisualizer week={week} />;
  }

  if (week === 4 || week === 6) {
    // Security Dilemma & Jervis 2x2 Offense-Defense Interactive Matrix
    return <OffenseDefenseMatrixVisualizer week={week} />;
  }

  if (week === 5 || week === 15) {
    // Fearon Rationalist Bargaining Space with Interactive Probability & War Cost Sliders
    return <FearonBargainingVisualizer week={week} />;
  }

  if (week === 7 || week === 11) {
    // Formal Alliance Networks vs Bilateral DCAs (COW v4.1 & Kinne DCAD)
    return <AllianceTypologyVisualizer week={week} />;
  }

  if (week === 10) {
    // UCDP / PRIO Intrastate vs Interstate Warfare Transformation (1946–2023)
    return <UcdpConflictTrendVisualizer week={week} />;
  }

  if (week === 12 || week === 13) {
    // Commercial Peace & Global Trade Expansion vs Protectionist Collapses (1870–2014)
    return <TradeInterdependenceVisualizer week={week} />;
  }

  if (week === 14) {
    // SIPRI Global Defense Expenditure & Nuclear Era Budgets ($2.44T Record)
    return <SipriSpendingVisualizer week={week} />;
  }

  // Fallback to CINC Power Transition
  return <CincPowerTransitionVisualizer week={week} />;
}

// =========================================================================
// 1. CINC POWER TRANSITION VISUALIZER (Weeks 1 & 2)
// =========================================================================
function CincPowerTransitionVisualizer({ week }: { week: number }) {
  const [selectedYear, setSelectedYear] = useState<number>(1945);

  const currentPoint = cincCapabilitiesData.find(d => d.year === selectedYear) || cincCapabilitiesData[7];

  const powers = [
    { name: 'United States', code: 'usa', share: currentPoint.usa, color: 'bg-blue-600', text: 'text-blue-600', fill: '#2563eb' },
    { name: 'United Kingdom', code: 'uk', share: currentPoint.uk, color: 'bg-red-600', text: 'text-red-600', fill: '#dc2626' },
    { name: 'Russia / USSR', code: 'russia', share: currentPoint.russia, color: 'bg-rose-700', text: 'text-rose-700', fill: '#be123c' },
    { name: 'China', code: 'china', share: currentPoint.china, color: 'bg-amber-500', text: 'text-amber-500', fill: '#f59e0b' },
    { name: 'Germany', code: 'germany', share: currentPoint.germany, color: 'bg-emerald-600', text: 'text-emerald-600', fill: '#059669' },
    { name: 'France', code: 'france', share: currentPoint.france, color: 'bg-purple-600', text: 'text-purple-600', fill: '#9333ea' },
    { name: 'Japan', code: 'japan', share: currentPoint.japan, color: 'bg-pink-600', text: 'text-pink-600', fill: '#db2777' },
  ].sort((a, b) => b.share - a.share);

  return (
    <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600">
            Correlates of War (COW) National Material Capabilities
          </span>
          <h3 className="text-base font-bold text-zinc-900 mt-0.5">
            Composite Index of National Capability (CINC): Global Power Shares
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xl font-extrabold text-indigo-600">{selectedYear}</span>
        </div>
      </div>

      {/* Historical Era Milestones */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {cincCapabilitiesData.map(pt => (
          <button
            key={pt.year}
            onClick={() => setSelectedYear(pt.year)}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold whitespace-nowrap transition-all ${
              selectedYear === pt.year
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
            }`}
          >
            {pt.year}
          </button>
        ))}
      </div>

      {/* Interactive Power Share Horizontal Distribution */}
      <div className="space-y-3 pt-2">
        <div className="text-xs font-bold text-zinc-700 font-mono">
          Global Material Power Distribution ({selectedYear})
        </div>

        {/* Stacked Percentage Bar */}
        <div className="w-full h-8 rounded-xl overflow-hidden flex shadow-inner border border-zinc-200">
          {powers.map(p => {
            const pct = (p.share * 100);
            if (pct < 1) return null;
            return (
              <div
                key={p.code}
                style={{ width: `${pct}%`, backgroundColor: p.fill }}
                className="h-full flex items-center justify-center text-[11px] text-white font-mono font-bold transition-all duration-300 relative group truncate px-1"
                title={`${p.name}: ${pct.toFixed(1)}%`}
              >
                {pct >= 6 && `${pct.toFixed(0)}%`}
              </div>
            );
          })}
        </div>

        {/* Individual Power Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          {powers.slice(0, 4).map(p => (
            <div key={p.code} className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.fill }} />
                <span className="text-xs font-bold text-zinc-900 truncate">{p.name}</span>
              </div>
              <div className="font-mono text-lg font-extrabold text-zinc-900">
                {(p.share * 100).toFixed(1)}%
              </div>
              <div className="text-[10px] text-zinc-500 font-mono">Share of World Power</div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Decoder */}
      <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-950 space-y-1.5">
        <div className="font-bold flex items-center gap-1.5 text-indigo-900">
          <Info className="w-4 h-4 text-indigo-600" />
          <span>What This Graph Means: Hegemonic Rises & Power Transitions</span>
        </div>
        <p className="leading-relaxed text-zinc-700">
          CINC synthesizes 6 core dimensions: military spending, troops, iron & steel production, primary energy consumption, urban population, and total population.
          Notice how Britain held the industrial lead in the 19th century (~1820–1870), followed by the explosive rise of the United States to a hegemonic zenith in 1945 (38.4% of total world power), and the contemporary crossover into US-China parity (~2020).
        </p>
      </div>
    </div>
  );
}

// =========================================================================
// 2. FEARON RATIONALIST BARGAINING VISUALIZER (Weeks 5 & 15)
// =========================================================================
function FearonBargainingVisualizer({ week }: { week: number }) {
  const [probA, setProbA] = useState(0.55); // Probability A wins
  const [costA, setCostA] = useState(0.15); // Cost of war for A
  const [costB, setCostB] = useState(0.15); // Cost of war for B

  // Fearon bargaining range: [p - cB, p + cA]
  const lowerBound = Math.max(0, probA - costB);
  const upperBound = Math.min(1, probA + costA);
  const rangeWidth = Math.max(0, upperBound - lowerBound);

  return (
    <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600">
            James Fearon (1995) · Rationalist Explanations for War
          </span>
          <h3 className="text-base font-bold text-zinc-900 mt-0.5">
            The Ex Ante Bargaining Range of Peace vs. Ex Post Inefficiency of War
          </h3>
        </div>
        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800">
          Peace Exists: {(rangeWidth * 100).toFixed(0)}% Range
        </span>
      </div>

      {/* Interactive Bargaining Strip */}
      <div className="space-y-4 pt-2">
        <div className="text-xs font-mono font-semibold text-zinc-700 flex justify-between">
          <span>State A Contested Territory (0%)</span>
          <span className="text-emerald-700 font-bold">Negotiated Settlements Both Prefer to War</span>
          <span>State B Contested Territory (100%)</span>
        </div>

        {/* Visual Bargaining Axis */}
        <div className="relative w-full h-12 bg-zinc-200 rounded-xl overflow-hidden border border-zinc-300 flex items-center">
          {/* Expected Outcome of War (p) */}
          <div
            style={{ left: `${probA * 100}%` }}
            className="absolute top-0 bottom-0 w-0.5 bg-red-600 z-20"
            title={`Expected war outcome: ${(probA * 100).toFixed(0)}%`}
          />

          {/* Bargaining Range (Peace Zone) */}
          <div
            style={{
              left: `${lowerBound * 100}%`,
              width: `${rangeWidth * 100}%`
            }}
            className="absolute top-0 bottom-0 bg-emerald-500/80 border-x-2 border-emerald-700 z-10 flex items-center justify-center text-white font-mono text-xs font-bold shadow-xs"
          >
            Bargaining Space
          </div>
        </div>

        {/* Interactive Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-mono">
          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1.5">
            <div className="flex justify-between font-bold text-zinc-800">
              <span>Win Probability p(A):</span>
              <span className="text-indigo-600">{(probA * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="0.9"
              step="0.05"
              value={probA}
              onChange={e => setProbA(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="text-[10px] text-zinc-500">Military balance of power</div>
          </div>

          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1.5">
            <div className="flex justify-between font-bold text-zinc-800">
              <span>Cost of War (cA):</span>
              <span className="text-indigo-600">{(costA * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.3"
              step="0.01"
              value={costA}
              onChange={e => setCostA(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="text-[10px] text-zinc-500">Casualties, economic devastation</div>
          </div>

          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1.5">
            <div className="flex justify-between font-bold text-zinc-800">
              <span>Cost of War (cB):</span>
              <span className="text-indigo-600">{(costB * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.3"
              step="0.01"
              value={costB}
              onChange={e => setCostB(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="text-[10px] text-zinc-500">Adversary destruction penalty</div>
          </div>
        </div>
      </div>

      {/* Educational Decoder */}
      <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-950 space-y-1.5">
        <div className="font-bold flex items-center gap-1.5 text-emerald-900">
          <Info className="w-4 h-4 text-emerald-600" />
          <span>Why War is a Puzzle: The Fundamental Bargaining Theorem</span>
        </div>
        <p className="leading-relaxed text-zinc-700">
          Because fighting causes destruction (costs <em>cA</em> and <em>cB</em>), both sides lose value if they go to war. Therefore, there is always a range of peaceful divisions (the green slab) that gives both states more than their expected payoff from fighting! Fearon proves that war can only occur if:
          <strong className="text-zinc-900"> (1) Private Information & Incentives to Misrepresent</strong>, 
          <strong className="text-zinc-900"> (2) Commitment Problems</strong> (rapid power shifts prevent credible promises), or 
          <strong className="text-zinc-900"> (3) Issue Indivisibility</strong>.
        </p>
      </div>
    </div>
  );
}

// =========================================================================
// 3. JERVIS SECURITY DILEMMA 2X2 MATRIX (Weeks 4 & 6)
// =========================================================================
function OffenseDefenseMatrixVisualizer({ week }: { week: number }) {
  const [selectedQuadrant, setSelectedQuadrant] = useState<number>(1);

  const quadrants = [
    {
      id: 1,
      title: 'Quadrant 1: Doubly Dangerous',
      offenseAdvantage: true,
      differentiated: false,
      status: 'Extreme Crisis Instability',
      color: 'border-red-500 bg-red-50 text-red-950',
      tag: 'World War I (1914)',
      explanation: 'Offense has the advantage, and offensive weapons cannot be distinguished from defensive ones. States must assume the worst about neighbor intentions; preemption incentives are intense; arms races spiral uncontrollably into war.'
    },
    {
      id: 2,
      title: 'Quadrant 2: Security Dilemma Exists',
      offenseAdvantage: false,
      differentiated: false,
      status: 'Moderate Friction',
      color: 'border-amber-500 bg-amber-50 text-amber-950',
      tag: 'Interwar Europe (1930s)',
      explanation: 'Defense has the advantage, but weapons are not distinguishable. States can defend themselves successfully, but building defenses still inadvertently frightens neighbors, causing mutual suspicion.'
    },
    {
      id: 3,
      title: 'Quadrant 3: No Dilemma, but Aggression Possible',
      offenseAdvantage: true,
      differentiated: true,
      status: 'Warning Signs Visible',
      color: 'border-amber-500 bg-amber-50 text-amber-950',
      tag: 'Blitzkrieg Era (1939)',
      explanation: 'Offense has the advantage, but offensive postures can be differentiated. Status quo states can observe when an adversary is preparing for aggression (e.g. massed tank divisions or invasion transports).'
    },
    {
      id: 4,
      title: 'Quadrant 4: Doubly Safe',
      offenseAdvantage: false,
      differentiated: true,
      status: 'High Systemic Stability',
      color: 'border-emerald-500 bg-emerald-50 text-emerald-950',
      tag: 'Nuclear Second-Strike (MAD)',
      explanation: 'Defense has the advantage, and defensive weapons are distinct from offensive weapons. Status quo states can secure themselves without threatening others; peace is robust.'
    }
  ];

  const current = quadrants.find(q => q.id === selectedQuadrant)!;

  return (
    <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600">
            Robert Jervis (1978) · Cooperation Under the Security Dilemma
          </span>
          <h3 className="text-base font-bold text-zinc-900 mt-0.5">
            The 2x2 Offense-Defense Balance and Posture Differentiation Matrix
          </h3>
        </div>
        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-800">
          Click Quadrants to Compare
        </span>
      </div>

      {/* 2x2 Interactive Grid */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        {quadrants.map(q => {
          const isSelected = selectedQuadrant === q.id;
          return (
            <button
              key={q.id}
              onClick={() => setSelectedQuadrant(q.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? `${q.color} ring-2 ring-indigo-500 shadow-md`
                  : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300 text-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-1">
                <span>{q.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/80 border border-zinc-200">
                  {q.tag}
                </span>
              </div>
              <div className="text-xs font-bold text-zinc-900 mt-1">{q.status}</div>
            </button>
          );
        })}
      </div>

      {/* Detailed Dynamic Explanation */}
      <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 ${current.color}`}>
        <div className="font-bold font-mono text-sm flex items-center gap-1.5">
          <Activity className="w-4 h-4" />
          <span>{current.title} Analysis ({current.tag})</span>
        </div>
        <p className="text-zinc-800 font-sans">{current.explanation}</p>
      </div>
    </div>
  );
}

// =========================================================================
// 4. DEMOCRATIC PEACE VISUALIZER (Weeks 3 & 9)
// =========================================================================
function DemocraticPeaceVisualizer({ week }: { week: number }) {
  const [selectedDyadName, setSelectedDyadName] = useState<string>(democraticPeaceDyads[0].dyadType);

  const dyadData = democraticPeaceDyads.find(d => d.dyadType === selectedDyadName) || democraticPeaceDyads[0];

  return (
    <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600">
            Empirical Law of Dyadic Conflict · Babst, Doyle & Russett
          </span>
          <h3 className="text-base font-bold text-zinc-900 mt-0.5">
            Democratic Peace Dyads: Interstate War Probability (1816–2020)
          </h3>
        </div>
      </div>

      {/* Dyad Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {democraticPeaceDyads.map(d => (
          <button
            key={d.dyadType}
            onClick={() => setSelectedDyadName(d.dyadType)}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              selectedDyadName === d.dyadType
                ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-400 shadow-sm'
                : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100 text-zinc-700'
            }`}
          >
            <div className="text-xs font-mono font-bold text-zinc-800">{d.dyadType}</div>
            <div className="font-mono text-lg font-extrabold text-indigo-600 mt-1">
              {(d.warProb * 100).toFixed(4)}%
            </div>
            <div className="text-[10px] text-zinc-500 font-mono">Empirical War Rate / Yr</div>
          </button>
        ))}
      </div>

      {/* Probability Bar Visualization */}
      <div className="space-y-2 pt-1">
        <div className="text-xs font-mono text-zinc-600 font-bold">
          Empirical Likelihood of War in {dyadData.dyadType}:
        </div>
        <div className="w-full h-4 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              backgroundColor: dyadData.color,
              width: `${Math.max((dyadData.warProb / 0.0072) * 100, 2)}%`
            }}
          />
        </div>
        <p className="text-xs text-zinc-700 font-sans mt-2 leading-relaxed bg-zinc-50 p-3.5 rounded-xl border border-zinc-200">
          <strong>Empirical Finding: </strong>{dyadData.empiricalFact}
        </p>
      </div>
    </div>
  );
}

// =========================================================================
// 5. UCDP CONFLICT TREND VISUALIZER (Week 10)
// =========================================================================
function UcdpConflictTrendVisualizer({ week }: { week: number }) {
  const [selectedYear, setSelectedYear] = useState<number>(2023);

  const pt = ucdpPrioArmedConflicts.find(p => p.year === selectedYear) || ucdpPrioArmedConflicts[ucdpPrioArmedConflicts.length - 1];

  return (
    <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600">
            Uppsala Conflict Data Program (UCDP) / PRIO (1946–2023)
          </span>
          <h3 className="text-base font-bold text-zinc-900 mt-0.5">
            The Intrastate Transformation: Civil Wars vs. Interstate Warfare
          </h3>
        </div>
        <div className="font-mono text-xl font-extrabold text-indigo-600">{selectedYear}</div>
      </div>

      {/* Year Scrubber */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {ucdpPrioArmedConflicts.map(d => (
          <button
            key={d.year}
            onClick={() => setSelectedYear(d.year)}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold whitespace-nowrap transition-all ${
              selectedYear === d.year
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
            }`}
          >
            {d.year}
          </button>
        ))}
      </div>

      {/* Breakdown Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-200 space-y-1">
          <div className="text-[10px] font-mono text-rose-700 uppercase font-bold">Civil (Internal)</div>
          <div className="text-2xl font-extrabold text-rose-900 font-mono">{pt.internal}</div>
          <div className="text-[10px] text-zinc-500">Active internal conflicts</div>
        </div>

        <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
          <div className="text-[10px] font-mono text-amber-700 uppercase font-bold">Internationalized Civil</div>
          <div className="text-2xl font-extrabold text-amber-900 font-mono">{pt.internationalizedInternal}</div>
          <div className="text-[10px] text-zinc-500">Proxy interventions</div>
        </div>

        <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 space-y-1">
          <div className="text-[10px] font-mono text-blue-700 uppercase font-bold">Interstate Wars</div>
          <div className="text-2xl font-extrabold text-blue-900 font-mono">{pt.interstate}</div>
          <div className="text-[10px] text-zinc-500">State vs state wars</div>
        </div>

        <div className="p-3.5 bg-zinc-100 rounded-xl border border-zinc-200 space-y-1">
          <div className="text-[10px] font-mono text-zinc-700 uppercase font-bold">System Total</div>
          <div className="text-2xl font-extrabold text-zinc-900 font-mono">{pt.total}</div>
          <div className="text-[10px] text-zinc-500">Recorded armed conflicts</div>
        </div>
      </div>

      {/* Educational Decoder */}
      <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 leading-relaxed">
        <strong className="text-zinc-900">Historical Shift: </strong>
        Notice how since the 1960s decolonization and the 1990s post-Cold War dissolution of empires, interstate warfare plummeted to near zero, while civil and internationalized proxy wars expanded to account for over 90% of all global armed violence.
      </div>
    </div>
  );
}

// =========================================================================
// 6. ALLIANCE TYPOLOGY VISUALIZER (Weeks 7 & 11)
// =========================================================================
function AllianceTypologyVisualizer({ week }: { week: number }) {
  const [selectedType, setSelectedType] = useState<string>('defense');

  const types = [
    {
      id: 'defense',
      title: 'Mutual Defense Pacts (49.5%)',
      count: '205 Treaties',
      color: 'border-blue-500 bg-blue-50 text-blue-950',
      tag: 'Article 5 NATO, Rio Pact',
      obligation: 'Members promise active military intervention if an ally is attacked by an external adversary.'
    },
    {
      id: 'nonaggression',
      title: 'Non-Aggression Pacts (35.7%)',
      count: '148 Treaties',
      color: 'border-emerald-500 bg-emerald-50 text-emerald-950',
      tag: 'Molotov-Ribbentrop (1939)',
      obligation: 'Pledge not to attack or initiate military force against one another.'
    },
    {
      id: 'entente',
      title: 'Ententes & Consultations (12.3%)',
      count: '51 Treaties',
      color: 'border-purple-500 bg-purple-50 text-purple-950',
      tag: 'Entente Cordiale (1904)',
      obligation: 'Pledge to consult in the event of an international military crisis without automatic military intervention.'
    }
  ];

  const cur = types.find(t => t.id === selectedType)!;

  return (
    <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600">
            COW Formal Alliances v4.1 (1816–2012) · Gibler & Sarkees
          </span>
          <h3 className="text-base font-bold text-zinc-900 mt-0.5">
            Typology of Formal Interstate Treaties & Strategic Commitments
          </h3>
        </div>
        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-800">
          414 Historical Treaties
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {types.map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedType(t.id)}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedType === t.id
                ? `${t.color} ring-2 ring-indigo-500 shadow-md`
                : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300 text-zinc-700'
            }`}
          >
            <div className="text-xs font-bold font-mono text-zinc-900">{t.title}</div>
            <div className="font-mono text-lg font-extrabold text-indigo-600 mt-1">{t.count}</div>
            <div className="text-[11px] text-zinc-500 mt-1">{t.tag}</div>
          </button>
        ))}
      </div>

      <div className={`p-4 rounded-xl border text-xs leading-relaxed ${cur.color}`}>
        <strong className="font-mono uppercase text-zinc-900">Legal Obligation: </strong>
        <span>{cur.obligation}</span>
      </div>
    </div>
  );
}

// =========================================================================
// 7. TRADE INTERDEPENDENCE VISUALIZER (Weeks 12 & 13)
// =========================================================================
function TradeInterdependenceVisualizer({ week }: { week: number }) {
  const [activeEra, setActiveEra] = useState<string>('hyper');

  const eras = [
    { id: 'first', years: '1870–1914', name: 'First Globalization', volume: '$10.5B ➔ $38B', desc: 'Steamships, undersea cables, and the Gold Standard fuel free trade under Pax Britannica.' },
    { id: 'interwar', years: '1914–1945', name: 'Tariff Wars & Autarky', volume: 'Severe Collapse', desc: 'Smoot-Hawley Act (1930) and imperial trade blocs deepen the Great Depression and fuel WWII.' },
    { id: 'postwar', years: '1945–1990', name: 'Bretton Woods GATT', volume: '$60B ➔ $3.5T', desc: 'Rules-based Western trade integration, export miracles in Germany and East Asia.' },
    { id: 'hyper', years: '1990–2014', name: 'Hyper-Globalization', volume: '$3.5T ➔ $36.8T', desc: 'WTO founded (1995); China joins (2001); container shipping creates global supply chains.' }
  ];

  const cur = eras.find(e => e.id === activeEra)!;

  return (
    <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600">
            COW Bilateral & National Trade v4.0 (1870–2014) · Barbieri & Keshk
          </span>
          <h3 className="text-base font-bold text-zinc-900 mt-0.5">
            The Commercial Peace: Global Trade Trajectory Over 145 Years
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {eras.map(e => (
          <button
            key={e.id}
            onClick={() => setActiveEra(e.id)}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              activeEra === e.id
                ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400 shadow-sm'
                : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100 text-zinc-700'
            }`}
          >
            <div className="text-[10px] font-mono text-amber-700 font-bold">{e.years}</div>
            <div className="text-xs font-bold text-zinc-900 mt-0.5">{e.name}</div>
            <div className="text-xs font-mono font-extrabold text-amber-900 mt-1">{e.volume}</div>
          </button>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1">
        <strong className="font-bold">{cur.name} ({cur.years}): </strong>
        <span>{cur.desc}</span>
      </div>
    </div>
  );
}

// =========================================================================
// 8. SIPRI DEFENSE SPENDING VISUALIZER (Week 14)
// =========================================================================
function SipriSpendingVisualizer({ week }: { week: number }) {
  const [selectedPoint, setSelectedPoint] = useState<number>(2023);

  const cur = sipriSpendingTrends.find(p => p.year === selectedPoint) || sipriSpendingTrends[sipriSpendingTrends.length - 1];

  return (
    <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600">
            Stockholm International Peace Research Institute (SIPRI)
          </span>
          <h3 className="text-base font-bold text-zinc-900 mt-0.5">
            Global Military Spending Trajectory (1950–2024 Record High: $2.44 Trillion)
          </h3>
        </div>
        <div className="font-mono text-xl font-extrabold text-indigo-600">${cur.globalSpendingBillions}B</div>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {sipriSpendingTrends.map(pt => (
          <button
            key={pt.year}
            onClick={() => setSelectedPoint(pt.year)}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold whitespace-nowrap transition-all ${
              selectedPoint === pt.year
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
            }`}
          >
            {pt.year}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 text-xs text-indigo-950 space-y-1">
        <strong className="font-mono font-bold">Year {cur.year} Historical Geopolitical Context: </strong>
        <span>{cur.milestone}</span>
      </div>
    </div>
  );
}
