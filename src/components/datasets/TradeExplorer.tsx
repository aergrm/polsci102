import { useState } from 'react';
import {
  tradeMeta,
  tradeYearly,
  tradeTopTraders
} from '../../data/irDatasets';
import {
  TrendingUp,
  Download,
  DollarSign,
  Globe,
  Ship,
  Info,
  Calendar,
  Layers,
  BarChart3,
  ExternalLink,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export function TradeExplorer() {
  const [selectedEra, setSelectedEra] = useState<'all' | 'first' | 'collapse' | 'postwar' | 'hyper'>('all');

  const eras = [
    {
      id: 'first',
      name: 'First Globalization (1870–1914)',
      years: '1870–1914',
      desc: 'Steamships, telegraph cables, and the Gold Standard fuel unprecedented free trade and capital flows under British naval hegemony (Pax Britannica).'
    },
    {
      id: 'collapse',
      name: 'Deglobalization & Autarky (1914–1945)',
      years: '1914–1945',
      desc: 'WWI shattered global financial links. The Great Depression triggered competitive tariff wars (Smoot-Hawley Act 1930) and imperial trade blocs, contributing to WWII.'
    },
    {
      id: 'postwar',
      name: 'Bretton Woods Expansion (1945–1990)',
      years: '1945–1990',
      desc: 'Creation of GATT, IMF, and the World Bank. Western democratic economies dismantled tariffs, fostering European integration and East Asian export miracles.'
    },
    {
      id: 'hyper',
      name: 'Hyper-Globalization (1990–2014)',
      years: '1990–2014',
      desc: 'WTO established (1995); China joins (2001). Container shipping and global value chains spread manufacturing worldwide; world trade hits record heights.'
    }
  ];

  const maxTrade = Math.max(...tradeYearly.map(y => y.totalTradeBillions), 1);

  return (
    <div className="space-y-6">
      {/* Top Banner & Metadata */}
      <div className="bg-gradient-to-r from-amber-950/70 via-slate-900 to-orange-950/70 border border-amber-800/40 rounded-xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <Ship className="w-3.5 h-3.5 text-amber-400" />
                COW Bilateral & National Trade v4.0
              </span>
              <span className="text-xs text-zinc-400">1870–2014 Database</span>
              <span className="text-xs text-zinc-400">•</span>
              <span className="text-xs text-amber-300 font-medium">14,482 Sovereign Country-Years</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              COW Bilateral & National Trade Dataset (v4.0)
            </h2>
            <p className="text-sm text-zinc-300 mt-1 max-w-3xl leading-relaxed">
              Curated by Katherine Barbieri and Omar Keshk, this definitive dataset tracks sovereign import and export flows 
              for every recognized state in the international system from 1870 to 2014—providing the empirical backbone 
              for evaluating economic interdependence, trade openness, and the Commercial Peace.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <a
              href="/public/assets/aistudio/COW_Trade_4.0__1__c44c4b5c.zip"
              download="COW_Trade_4.0__1__c44c4b5c.zip"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-medium transition-colors shadow"
              title="Download original COW Trade 4.0 ZIP"
            >
              <Download className="w-4 h-4" />
              Raw Trade 4.0 ZIP
            </a>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-amber-900/40 text-xs">
          <div>
            <div className="text-zinc-400">Temporal Coverage</div>
            <div className="text-lg font-bold text-white">1870–2014 (145 Years)</div>
          </div>
          <div>
            <div className="text-zinc-400">Total Observations</div>
            <div className="text-lg font-bold text-amber-300">14,482 Country-Years</div>
          </div>
          <div>
            <div className="text-zinc-400">1870 World Trade</div>
            <div className="text-lg font-bold text-zinc-300">$10.5 Billion</div>
          </div>
          <div>
            <div className="text-zinc-400">2014 World Trade</div>
            <div className="text-lg font-bold text-emerald-400">$36,800+ Billion</div>
          </div>
        </div>
      </div>

      {/* IR Theory Context */}
      <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs leading-relaxed flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white font-semibold">IR Theory Insight — The Commercial Peace Debate:</strong>{' '}
          Does trade prevent war? <span className="text-amber-300 font-semibold">Liberal Interdependence Theory</span> (Keohane & Nye, Russett & Oneal) 
          argues that dense trade networks increase the economic opportunity cost of armed conflict: war destroys valuable commercial markets and supply lines. 
          Conversely, <span className="text-zinc-200 font-semibold">Realists</span> (Waltz) counter that high interdependence creates vulnerability and friction, 
          noting that Europe had record trade openness right before World War I in 1913. 
          Dale Copeland (*Economic Interdependence and War*) synthesizes this through <span className="text-cyan-300 font-semibold">Trade Expectations Theory</span>: 
          interdependence only induces peace if leaders anticipate positive future trade access.
        </div>
      </div>

      {/* The 4 Eras of Globalization Cards */}
      <div>
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-400" />
          The Four Great Eras of Economic Interdependence
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {eras.map(era => (
            <div
              key={era.id}
              className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 hover:bg-zinc-850 transition-all"
            >
              <div className="text-[11px] font-mono text-amber-400 font-bold mb-1">{era.years}</div>
              <h4 className="text-xs font-bold text-white leading-snug">{era.name}</h4>
              <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">{era.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Global Trade Trajectory & Modern Leaders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* World Trade Expansion Chart */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-zinc-900/70 border border-zinc-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            Global Trade Volume Trajectory (1870–2014)
          </h3>
          <p className="text-xs text-zinc-400 mb-4">
            Total world imports & exports in billions of current US dollars
          </p>

          <div className="h-48 flex items-end gap-1 pt-6 pb-2 border-b border-zinc-800">
            {tradeYearly.filter((_, idx) => idx % 2 === 0).map(item => {
              const heightPct = (item.totalTradeBillions / maxTrade) * 100;
              const isInterwar = item.year >= 1914 && item.year <= 1945;
              const isHyper = item.year >= 1995;
              return (
                <div
                  key={item.year}
                  className="flex-1 flex flex-col items-center group relative h-full justify-end"
                >
                  <div
                    style={{ height: `${Math.max(heightPct, 3)}%` }}
                    className={`w-full rounded-t transition-all ${
                      isInterwar ? 'bg-red-500/80 group-hover:bg-red-400' :
                      isHyper ? 'bg-amber-500 group-hover:bg-amber-400' :
                      'bg-amber-600/60 group-hover:bg-amber-400'
                    }`}
                  />
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                    <div className="bg-zinc-800 text-white text-[11px] font-mono px-2 py-0.5 rounded shadow-lg border border-zinc-700 whitespace-nowrap">
                      {item.year}: ${item.totalTradeBillions.toLocaleString()} Billion
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-[11px] text-zinc-500 font-mono mt-2">
            <span>1870 ($10B)</span>
            <span>1914 (WWI shock)</span>
            <span>1945 (Postwar recovery)</span>
            <span>1995 (WTO launch)</span>
            <span>2014 ($36,800B)</span>
          </div>
        </div>

        {/* Top 2014 Trading Nations */}
        <div className="p-5 rounded-xl bg-zinc-900/70 border border-zinc-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
            <Globe className="w-4 h-4 text-emerald-400" />
            Leading Trading Nations (2014 Benchmark)
          </h3>
          <p className="text-xs text-zinc-400 mb-3">Total imports + exports in Billions USD</p>

          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
            {tradeTopTraders.map((t, idx) => (
              <div
                key={t.country}
                className="flex items-center justify-between text-xs p-1.5 rounded hover:bg-zinc-800/60"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="font-mono text-[11px] text-zinc-500 w-4">{idx + 1}.</span>
                  <span className="text-zinc-200 font-medium truncate">{t.country}</span>
                </div>
                <span className="font-mono text-amber-300 font-semibold bg-amber-950/40 px-2 py-0.5 rounded text-[11px] border border-amber-800/30">
                  ${t.tradeBillions.toLocaleString()}B
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
