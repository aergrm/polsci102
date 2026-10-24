import { useState } from 'react';
import { sipriTopSpenders, sipriSpendingTrends } from '../../data/irDatasets';
import { DollarSign, Shield, TrendingUp, BarChart3, Globe, Award, AlertCircle } from 'lucide-react';

export function SIPRIMilitaryExplorer() {
  const [metric, setMetric] = useState<'billions' | 'gdpShare'>('billions');

  const maxSpending = Math.max(...sipriSpendingTrends.map(d => d.globalSpendingBillions));

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-sm border border-zinc-800 relative overflow-hidden">
        <div className="space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
            <span className="px-2.5 py-1 rounded-md bg-indigo-950/80 border border-indigo-800/60 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-indigo-400" />
              Stockholm International Peace Research Institute (SIPRI)
            </span>
            <span className="px-2.5 py-1 rounded-md bg-zinc-800/80 border border-zinc-700/60 text-zinc-300">
              Military Expenditure Database (1950 – 2024)
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Global Military Spending & Defense Burdens
          </h2>
          <p className="text-zinc-300 text-sm md:text-base max-w-3xl leading-relaxed">
            World military expenditure reached an all-time historical record of <strong>$2.44 Trillion</strong> ($2,443 billion) in recent years—the highest level ever recorded by SIPRI. Explore the distribution of defense expenditures, the NATO 2% of GDP threshold, and Great Power spending shares.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-black/40 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
              <div className="text-zinc-400 text-xs font-medium">Global Military Total</div>
              <div className="text-2xl font-extrabold text-white mt-1">$2.44 Trillion</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">Highest level in history</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
              <div className="text-blue-300 text-xs font-medium">United States Share</div>
              <div className="text-2xl font-extrabold text-blue-400 mt-1">37.5%</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">$916 Billion (Rank #1)</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
              <div className="text-amber-300 text-xs font-medium">China Share</div>
              <div className="text-2xl font-extrabold text-amber-400 mt-1">12.1%</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">$296 Billion (29 consecutive yrs growth)</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
              <div className="text-emerald-300 text-xs font-medium">Top 10 Combined</div>
              <div className="text-2xl font-extrabold text-emerald-400 mt-1">73.8%</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">Concentrated in 10 states</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top 10 Spenders Table & Visual Breakdown */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-zinc-900">
              Top 10 Military Spenders in the World
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Source: SIPRI Military Expenditure Database (in constant 2023 US$ billions and % of GDP).
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-xl text-xs font-medium self-start sm:self-auto">
            <button
              onClick={() => setMetric('billions')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                metric === 'billions' ? 'bg-white shadow text-indigo-700 font-bold' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Absolute Spending ($ Billions)
            </button>
            <button
              onClick={() => setMetric('gdpShare')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                metric === 'gdpShare' ? 'bg-white shadow text-indigo-700 font-bold' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Defense Burden (% of GDP)
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {sipriTopSpenders.map(spender => {
            const barWidth = metric === 'billions'
              ? (spender.spendingBillions / 916) * 100
              : (spender.gdpShare / 37) * 100;

            return (
              <div key={spender.country} className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50/70 hover:bg-zinc-100/70 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-zinc-200 text-zinc-700 text-xs flex items-center justify-center font-bold">
                      {spender.rank}
                    </span>
                    <span className="text-base">{spender.flag}</span>
                    <span className="font-bold text-zinc-900 text-sm">{spender.country}</span>
                  </div>

                  <div className="text-right">
                    <span className="font-extrabold text-zinc-900 text-sm">
                      {metric === 'billions' ? `$${spender.spendingBillions} Billion` : `${spender.gdpShare}% of GDP`}
                    </span>
                    <span className="text-xs text-zinc-500 ml-2">
                      ({spender.shareGlobal}% of world)
                    </span>
                  </div>
                </div>

                <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${barWidth}%` }}
                    className={`h-full rounded-full transition-all duration-300 ${
                      spender.rank === 1 ? 'bg-blue-600' : spender.rank === 2 ? 'bg-amber-500' : 'bg-indigo-600'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Global Historical Trend Chart (1950 - 2024) */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-zinc-900">
            Global Military Spending Trend (1950 – 2024 in Constant 2023 $ Billions)
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Cold War peak, post-1989 peace dividend trough, and the modern rearmament wave.
          </p>
        </div>

        <div className="pt-2">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-2 items-end h-64 border-b border-zinc-200 pb-2">
            {sipriSpendingTrends.map(pt => {
              const heightPct = (pt.globalSpendingBillions / maxSpending) * 100;
              return (
                <div key={pt.year} className="flex flex-col items-center group relative cursor-pointer h-full justify-end">
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col bg-zinc-900 text-white text-[11px] p-2.5 rounded-lg shadow-xl z-30 pointer-events-none w-48">
                    <div className="font-bold border-b border-zinc-700 pb-1 text-indigo-300">Year {pt.year}</div>
                    <div className="text-zinc-200 mt-1">Global Spending: <b>${pt.globalSpendingBillions}B</b></div>
                    <div className="text-zinc-400 text-[10px] mt-1 leading-snug">{pt.milestone}</div>
                  </div>

                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full max-w-[28px] rounded-t-md bg-gradient-to-t from-indigo-700 to-indigo-500 transition-all group-hover:brightness-110 shadow-sm"
                  />

                  <span className="text-[10px] text-zinc-500 mt-1.5 rotate-[-45deg] origin-top-left font-mono">
                    {pt.year}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between text-xs text-zinc-400 pt-3">
            <span>1950 (Korean War / NATO Inception)</span>
            <span>1988 (Cold War Peak $1.78T)</span>
            <span>1996 (Peace Dividend $1.14T)</span>
            <span>2024 (Record High $2.44T)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
