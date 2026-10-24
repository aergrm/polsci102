import { useState } from 'react';
import { ucdpPrioArmedConflicts } from '../../data/irDatasets';
import { Shield, TrendingDown, TrendingUp, Info, Globe, HelpCircle, Layers } from 'lucide-react';

export function UCDPConflictExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'interstate' | 'internal' | 'internationalized' | 'extrasystemic'>('all');

  const maxTotal = Math.max(...ucdpPrioArmedConflicts.map(d => d.total));

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-zinc-950 text-white rounded-3xl p-6 md:p-8 shadow-sm border border-indigo-900/40 relative overflow-hidden">
        <div className="space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
            <span className="px-2.5 py-1 rounded-md bg-indigo-950/80 border border-indigo-800/60 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              Uppsala Conflict Data Program (UCDP) / PRIO
            </span>
            <span className="px-2.5 py-1 rounded-md bg-zinc-800/80 border border-zinc-700/60 text-zinc-300">
              Coverage: 1946 – 2023
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            The Transformation of War: Interstate vs. Civil Wars
          </h2>
          <p className="text-zinc-300 text-sm md:text-base max-w-3xl leading-relaxed">
            One of the most consequential empirical discoveries in modern international relations: since the end of World War II, full interstate wars between sovereign countries have become historically rare, while intrastate conflicts (civil wars) and internationalized civil wars (where outside states intervene militarily) now account for over 95% of active global armed conflicts.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-black/40 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
              <div className="text-zinc-400 text-xs font-medium">Active Conflicts (2023)</div>
              <div className="text-2xl font-extrabold text-white mt-1">59</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">Highest since 1946</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
              <div className="text-sky-300 text-xs font-medium flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5 text-sky-400" />
                Interstate Wars
              </div>
              <div className="text-2xl font-extrabold text-sky-400 mt-1">2</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">Only ~3.4% of total</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
              <div className="text-indigo-300 text-xs font-medium flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-indigo-400" />
                Civil Wars (Internal)
              </div>
              <div className="text-2xl font-extrabold text-indigo-400 mt-1">37</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">62.7% of armed violence</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
              <div className="text-rose-300 text-xs font-medium flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
                Internationalized Civil
              </div>
              <div className="text-2xl font-extrabold text-rose-400 mt-1">20</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">External state intervention</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Time Series Chart */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-zinc-900">
              Active Armed Conflicts by Category (1946 – 2023)
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Source: UCDP/PRIO Armed Conflict Dataset (Definitions: 25+ battle-related deaths per calendar year).
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
            {[
              { id: 'all', label: 'All Types (Stacked)' },
              { id: 'interstate', label: 'Interstate Only' },
              { id: 'internal', label: 'Civil Wars' },
              { id: 'internationalized', label: 'Internationalized Civil' },
            ].map(pill => (
              <button
                key={pill.id}
                onClick={() => setSelectedCategory(pill.id as any)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedCategory === pill.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-600">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-sky-500" />
            <span>Interstate Wars (State vs. State)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-indigo-600" />
            <span>Internal Conflicts (Civil Wars)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-rose-500" />
            <span>Internationalized Internal (Proxy / External Troop Intervention)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-zinc-400" />
            <span>Extrasystemic (Colonial Wars)</span>
          </div>
        </div>

        {/* Visual Chart */}
        <div className="pt-4">
          <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-20 gap-2 items-end h-64 border-b border-zinc-200 pb-2">
            {ucdpPrioArmedConflicts.map(point => {
              const heightPct = (point.total / maxTotal) * 100;
              const interstatePct = (point.interstate / point.total) * 100;
              const internalPct = (point.internal / point.total) * 100;
              const intlCivilPct = (point.internationalizedInternal / point.total) * 100;
              const extraPct = (point.extrasystemic / point.total) * 100;

              return (
                <div key={point.year} className="flex flex-col items-center group relative cursor-pointer h-full justify-end">
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col bg-zinc-900 text-white text-[11px] p-2.5 rounded-lg shadow-xl z-30 pointer-events-none w-44">
                    <div className="font-bold border-b border-zinc-700 pb-1 text-indigo-300">Year {point.year}</div>
                    <div className="text-zinc-200 mt-1">Total Conflicts: <b>{point.total}</b></div>
                    <div className="text-sky-400">Interstate: {point.interstate}</div>
                    <div className="text-indigo-400">Civil Wars: {point.internal}</div>
                    <div className="text-rose-400">Intl Civil: {point.internationalizedInternal}</div>
                    <div className="text-zinc-400">Colonial: {point.extrasystemic}</div>
                  </div>

                  {/* Bar */}
                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full max-w-[20px] rounded-t-sm flex flex-col-reverse overflow-hidden transition-all group-hover:opacity-85 shadow-sm"
                  >
                    <div style={{ height: `${interstatePct}%` }} className="bg-sky-500 w-full" />
                    <div style={{ height: `${internalPct}%` }} className="bg-indigo-600 w-full" />
                    <div style={{ height: `${intlCivilPct}%` }} className="bg-rose-500 w-full" />
                    <div style={{ height: `${extraPct}%` }} className="bg-zinc-400 w-full" />
                  </div>

                  <span className="text-[10px] text-zinc-500 mt-1.5 rotate-[-45deg] origin-top-left font-mono">
                    {point.year}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between text-xs text-zinc-400 pt-3">
            <span>1946 (Post-WWII Reconstruction)</span>
            <span>1965 (Vietnam / Decolonization)</span>
            <span>1992 (Post-Cold War Civil War Peak)</span>
            <span>2023 (Syria, Ukraine, Sudan, Gaza)</span>
          </div>
        </div>
      </div>

      {/* Pedagogical Takeaways for Students */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 space-y-3">
          <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
            1
          </div>
          <h4 className="font-bold text-zinc-900 text-base">The "Long Peace" & Norm of Territorial Integrity</h4>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Nuclear deterrence (MAD), United Nations Charter Article 2(4), and deep economic interdependence made conquest between Great Powers prohibitively costly, creating what John Lewis Gaddis coined the "Long Peace."
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-zinc-200 space-y-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            2
          </div>
          <h4 className="font-bold text-zinc-900 text-base">Weak State Capacity & Insurgency (Fearon & Laitin 2003)</h4>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Civil wars proliferate not primarily because of ethnic hatreds, but because weak state institutions, poverty, corrupt governance, and rough terrain allow small rebel factions to sustain guerrilla insurgencies.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-zinc-200 space-y-3">
          <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
            3
          </div>
          <h4 className="font-bold text-zinc-900 text-base">Internationalization & Proxy Competition</h4>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Since 2011 (Syria, Yemen, Libya, DRC, Ukraine), internal civil conflicts are increasingly internationalized as regional powers intervene on opposite sides, drastically lengthening the duration and devastation of civil wars.
          </p>
        </div>
      </div>
    </div>
  );
}
