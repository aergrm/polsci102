import { useState } from 'react';
import { cincCapabilitiesData } from '../../data/irDatasets';
import { Activity, Zap, TrendingUp, Info, Scale, Shield, Building2 } from 'lucide-react';

export function CINCPowerExplorer() {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  const countries = [
    { key: 'usa', label: 'United States', color: '#2563eb' },
    { key: 'uk', label: 'United Kingdom', color: '#dc2626' },
    { key: 'russia', label: 'Russia / USSR', color: '#b91c1c' },
    { key: 'china', label: 'China', color: '#d97706' },
    { key: 'germany', label: 'Germany', color: '#16a34a' },
    { key: 'france', label: 'France', color: '#7c3aed' },
    { key: 'japan', label: 'Japan', color: '#db2777' },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-sm border border-blue-900/40 relative overflow-hidden">
        <div className="space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
            <span className="px-2.5 py-1 rounded-md bg-blue-950/80 border border-blue-800/60 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-blue-400" />
              Correlates of War (COW) National Material Capabilities
            </span>
            <span className="px-2.5 py-1 rounded-md bg-zinc-800/80 border border-zinc-700/60 text-zinc-300">
              CINC Score: 1820 – 2020 (Singer, Bremer, Stuckey)
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            National Material Capabilities & Power Transition Theory
          </h2>
          <p className="text-zinc-300 text-sm md:text-base max-w-3xl leading-relaxed">
            The Composite Index of National Capability (CINC) is political science's most widely cited quantitative measure of national power. It calculates each state's share of total global system power by synthesizing 6 demographic, industrial, and military components.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2 text-xs">
            <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <div className="text-zinc-400 font-medium">1. Military Personnel</div>
              <div className="text-sm font-bold text-blue-300 mt-1">Active troops</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <div className="text-zinc-400 font-medium">2. Military Spending</div>
              <div className="text-sm font-bold text-blue-300 mt-1">Defense budget</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <div className="text-zinc-400 font-medium">3. Steel Production</div>
              <div className="text-sm font-bold text-blue-300 mt-1">Heavy industry</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <div className="text-zinc-400 font-medium">4. Energy Consumption</div>
              <div className="text-sm font-bold text-blue-300 mt-1">Commercial fuels</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <div className="text-zinc-400 font-medium">5. Total Population</div>
              <div className="text-sm font-bold text-blue-300 mt-1">Human manpower</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <div className="text-zinc-400 font-medium">6. Urban Population</div>
              <div className="text-sm font-bold text-blue-300 mt-1">Industrialization</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Capabilities Chart */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-zinc-900">
              Great Power Share of Global Capability (1820 – 2020)
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Shows the rise, peak, and relative decline of Great Powers over 200 years of international politics.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
            <button
              onClick={() => setSelectedCountry('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedCountry === 'all' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              All Great Powers
            </button>
            {countries.map(c => (
              <button
                key={c.key}
                onClick={() => setSelectedCountry(c.key)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedCountry === c.key ? 'bg-indigo-600 text-white shadow-sm' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-600">
          {countries.map(c => (
            <div key={c.key} className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
              <span className={selectedCountry === c.key ? 'font-bold text-zinc-900' : ''}>{c.label}</span>
            </div>
          ))}
        </div>

        {/* Line / Bar Chart Representation */}
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-15 gap-2 items-end h-72 border-b border-zinc-200 pb-3">
            {cincCapabilitiesData.map(pt => {
              return (
                <div key={pt.year} className="flex flex-col items-center group relative cursor-pointer h-full justify-end">
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col bg-zinc-900 text-white text-[11px] p-3 rounded-xl shadow-xl z-30 pointer-events-none w-48 space-y-1">
                    <div className="font-bold border-b border-zinc-700 pb-1 text-blue-300">Year {pt.year} Capabilities</div>
                    <div className="text-blue-400">USA: {(pt.usa * 100).toFixed(1)}%</div>
                    <div className="text-red-400">UK: {(pt.uk * 100).toFixed(1)}%</div>
                    <div className="text-rose-400">Russia/USSR: {(pt.russia * 100).toFixed(1)}%</div>
                    <div className="text-amber-400">China: {(pt.china * 100).toFixed(1)}%</div>
                    <div className="text-green-400">Germany: {(pt.germany * 100).toFixed(1)}%</div>
                    <div className="text-pink-400">Japan: {(pt.japan * 100).toFixed(1)}%</div>
                  </div>

                  {/* Multi-pillar visual */}
                  <div className="w-full flex items-end justify-center gap-[2px] h-full pb-1">
                    {countries.map(c => {
                      if (selectedCountry !== 'all' && selectedCountry !== c.key) return null;
                      const val = (pt as any)[c.key];
                      const heightPct = (val / 0.40) * 100;
                      return (
                        <div
                          key={c.key}
                          style={{ height: `${heightPct}%`, backgroundColor: c.color }}
                          className={`rounded-t-sm transition-all group-hover:brightness-110 ${
                            selectedCountry === c.key ? 'w-4' : 'w-1 sm:w-1.5'
                          }`}
                        />
                      );
                    })}
                  </div>

                  <span className="text-[10px] text-zinc-500 mt-1 rotate-[-45deg] origin-top-left font-mono">
                    {pt.year}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between text-xs text-zinc-400 pt-1">
            <span>1820 (Pax Britannica)</span>
            <span>1913 (Pre-WWI Parity)</span>
            <span>1945 (US Hegemonic Zenith: 38.4%)</span>
            <span>2020 (US-China Power Parity Zone)</span>
          </div>
        </div>
      </div>

      {/* IR Theory Context Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
            <Zap className="w-5 h-5" />
            Power Transition Theory (Organski & Kugler)
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed">
            War is most probable not when power is balanced, but when a rapidly growing, dissatisfied challenger state approaches parity (around 80–120% of the dominant hegemon's capabilities). The historical danger window occurs during the crossover point (e.g. Wilhelmine Germany challenging the British Empire in 1914).
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-zinc-200 space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
            <Building2 className="w-5 h-5" />
            Hegemonic Stability Theory (Gilpin & Keohane)
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed">
            A dominant power (such as Britain in the 19th century or the United States post-1945) provides international public goods: free maritime trade routes, a stable reserve currency, and institutional dispute resolution. When the hegemon's relative capabilities decline, public goods provision erodes and systemic friction escalates.
          </p>
        </div>
      </div>
    </div>
  );
}
