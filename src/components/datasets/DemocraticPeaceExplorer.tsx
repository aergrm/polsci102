import { useState } from 'react';
import { democraticPeaceDyads, regimeWavesData } from '../../data/irDatasets';
import { Award, CheckCircle2, ShieldCheck, HeartHandshake, Eye, AlertCircle, Sparkles } from 'lucide-react';

export function DemocraticPeaceExplorer() {
  const [selectedDyad, setSelectedDyad] = useState<number>(0);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 text-white rounded-3xl p-6 md:p-8 shadow-sm border border-emerald-900/40 relative overflow-hidden">
        <div className="space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-800/60 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Democratic Peace Proposition (Polity5 / V-Dem)
            </span>
            <span className="px-2.5 py-1 rounded-md bg-zinc-800/80 border border-zinc-700/60 text-zinc-300">
              "The Closest Thing to an Empirical Law in International Relations" — Jack Levy (1988)
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            The Democratic Peace & Regime Type Dyads
          </h2>
          <p className="text-zinc-300 text-sm md:text-base max-w-3xl leading-relaxed">
            Rooted in Immanuel Kant's 1795 essay <em>Perpetual Peace</em>, the Democratic Peace Proposition observes that mature, constitutional democracies almost never wage interstate wars against one another. However, democracies are not peaceful in general: they fight authoritarian regimes at rates nearly identical to other states.
          </p>
        </div>
      </div>

      {/* Dyadic Comparison Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {democraticPeaceDyads.map((dyad, idx) => {
          const isSelected = selectedDyad === idx;
          return (
            <div
              key={idx}
              onClick={() => setSelectedDyad(idx)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'bg-white shadow-md ring-2 ring-emerald-500/30 border-emerald-500'
                  : 'bg-zinc-50/70 hover:bg-white border-zinc-200'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Pair Type
                  </span>
                  <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: dyad.color }} />
                </div>

                <h3 className="font-extrabold text-zinc-900 text-lg">
                  {dyad.dyadType}
                </h3>

                <p className="text-xs text-zinc-600 leading-relaxed">
                  {dyad.description}
                </p>
              </div>

              {/* Empirical Rates */}
              <div className="space-y-3 pt-3 border-t border-zinc-200/70">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-500">Annual Dispute Probability:</span>
                    <span className="font-bold text-zinc-900">{(dyad.annualDisputeProb * 100).toFixed(2)}%</span>
                  </div>
                  <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${(dyad.annualDisputeProb / 0.03) * 100}%`, backgroundColor: dyad.color }}
                      className="h-full rounded-full transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-500">Annual Interstate War Probability:</span>
                    <span className="font-bold text-red-600 font-mono">{(dyad.warProb * 100).toFixed(2)}%</span>
                  </div>
                  <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${(dyad.warProb / 0.008) * 100}%` }}
                      className="h-full rounded-full bg-red-600 transition-all"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-zinc-500 italic pt-1">
                  {dyad.empiricalFact}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* The 3 Core Theoretical Causal Mechanisms */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            Why Don't Democracies Fight Each Other? Three Causal Mechanisms
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Political scientists debate three major explanations for why the democratic peace holds at the dyadic level.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-emerald-950 text-base">1. Normative / Cultural Mechanism</h4>
            <p className="text-xs text-emerald-900 leading-relaxed">
              Democracies resolve domestic political disputes through debate, voting, constitutional compromise, and non-violence. When two democratic leaders meet, they externalize these norms of mutual accommodation and perceive each other as legitimate bargaining partners.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-100 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-teal-950 text-base">2. Institutional / Structural Mechanism</h4>
            <p className="text-xs text-teal-900 leading-relaxed">
              Institutional checks and balances, independent courts, legislative war-powers approval, and free regular elections make democratic military mobilization slow and public. Leaders are electorally punished for costly or failed wars, imposing severe caution.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              <Eye className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sky-950 text-base">3. Informational / Signaling Mechanism</h4>
            <p className="text-xs text-sky-900 leading-relaxed">
              Kenneth Schultz & James Fearon: Free press, public debate, and opposition parties generate credible costly signals during crises. Democracies cannot easily bluff; when they commit military force, adversaries know their resolve is real, preventing miscalculation wars.
            </p>
          </div>
        </div>
      </div>

      {/* Waves of Democratization Historical Chart */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-zinc-900">
            Huntington's Waves of Democratization (1850 – 2024)
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Global proportion (%) of democracies, anocracies (mixed/hybrid regimes), and closed autocracies.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-600">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-500" />
            <span>Democracies (Polity +6 to +10)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-amber-400" />
            <span>Anocracies / Hybrid (-5 to +5)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-zinc-700" />
            <span>Autocracies (-6 to -10)</span>
          </div>
        </div>

        {/* 100% Stacked Bar Chart */}
        <div className="pt-2">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2 items-end h-56 border-b border-zinc-200 pb-2">
            {regimeWavesData.map(pt => (
              <div key={pt.year} className="flex flex-col items-center group relative cursor-pointer h-full justify-end">
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col bg-zinc-900 text-white text-[11px] p-2.5 rounded-lg shadow-xl z-30 pointer-events-none w-44">
                  <div className="font-bold border-b border-zinc-700 pb-1 text-emerald-300">Year {pt.year} Regimes</div>
                  <div className="text-emerald-400">Democracies: {pt.democracies}%</div>
                  <div className="text-amber-400">Anocracies: {pt.anocracies}%</div>
                  <div className="text-zinc-400">Autocracies: {pt.autocracies}%</div>
                </div>

                <div className="w-full max-w-[24px] h-full rounded-t-sm flex flex-col-reverse overflow-hidden transition-all group-hover:opacity-85 shadow-sm">
                  <div style={{ height: `${pt.democracies}%` }} className="bg-emerald-500 w-full" />
                  <div style={{ height: `${pt.anocracies}%` }} className="bg-amber-400 w-full" />
                  <div style={{ height: `${pt.autocracies}%` }} className="bg-zinc-700 w-full" />
                </div>

                <span className="text-[10px] text-zinc-500 mt-1.5 rotate-[-45deg] origin-top-left font-mono">
                  {pt.year}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-xs text-zinc-400 pt-3">
            <span>1st Wave (post-WWI)</span>
            <span>Reverse Wave (1930s Fascism)</span>
            <span>2nd Wave (post-1945)</span>
            <span>3rd Wave (1989 Berlin Wall)</span>
            <span>Modern Democratic Backsliding</span>
          </div>
        </div>
      </div>
    </div>
  );
}
