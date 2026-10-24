import { useState, useMemo } from 'react';
import {
  armsTechMeta,
  armsTechWeapons,
  armsTechDecades,
  armsTechTop
} from '../../data/irDatasets';
import {
  Crosshair,
  Shield,
  Download,
  Search,
  Filter,
  TrendingUp,
  Cpu,
  Layers,
  Info,
  ChevronRight,
  Zap,
  Radio,
  Plane,
  Anchor,
  Compass
} from 'lucide-react';

export function ArmsTechExplorer() {
  const [activeDomain, setActiveDomain] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const domains = ['all', 'Infantry', 'Artillery', 'Naval', 'Armor', 'Aviation', 'Missiles', 'Electronics'];

  const filteredWeapons = useMemo(() => {
    return armsTechWeapons.filter(w => {
      const matchDomain = activeDomain === 'all' || w.domain === activeDomain;
      const matchSearch =
        searchQuery === '' ||
        w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.era.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.domain.toLowerCase().includes(searchQuery.toLowerCase());
      return matchDomain && matchSearch;
    });
  }, [activeDomain, searchQuery]);

  const maxDecadeScore = Math.max(...armsTechDecades.map(d => d.maxScore), 1);

  return (
    <div className="space-y-6">
      {/* Top Banner & Metadata */}
      <div className="bg-gradient-to-r from-purple-950/70 via-slate-900 to-violet-950/70 border border-purple-800/40 rounded-xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                COW Arms & Military Technology v1.1
              </span>
              <span className="text-xs text-zinc-400">1816–2026 Database</span>
              <span className="text-xs text-zinc-400">•</span>
              <span className="text-xs text-violet-300 font-medium">31 Weapon Innovation Categories</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              COW Conventional Arms & Military Technology Dataset
            </h2>
            <p className="text-sm text-zinc-300 mt-1 max-w-3xl leading-relaxed">
              Authored by David Kinsella and the Correlates of War Project (2026 update), this dataset tracks sovereign adoption 
              and operational fielding across 31 revolutionary military technologies—measuring the global diffusion of military power 
              and the technological evolution of the offense-defense balance.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <a
              href="/public/assets/aistudio/Arms-TechnologyV1.1__1__7dcfeb82.zip"
              download="Arms-TechnologyV1.1__1__7dcfeb82.zip"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition-colors shadow"
              title="Download original Arms Technology ZIP"
            >
              <Download className="w-4 h-4" />
              Raw Arms Tech ZIP
            </a>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-purple-900/40 text-xs">
          <div>
            <div className="text-zinc-400">Innovation Categories</div>
            <div className="text-lg font-bold text-white">31 Technology Classes</div>
          </div>
          <div>
            <div className="text-zinc-400">Temporal Reach</div>
            <div className="text-lg font-bold text-purple-300">1816 to 2026 (210 Years)</div>
          </div>
          <div>
            <div className="text-zinc-400">First Jet Fighters</div>
            <div className="text-lg font-bold text-amber-300">1944 (Me 262 / Gloster)</div>
          </div>
          <div>
            <div className="text-zinc-400">5th Gen Stealth Era</div>
            <div className="text-lg font-bold text-emerald-300">2005–Present (F-22/35)</div>
          </div>
        </div>
      </div>

      {/* IR Theory Context */}
      <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs leading-relaxed flex items-start gap-3">
        <Info className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white font-semibold">IR Theory Insight — Offense-Defense Balance & Military Diffusion:</strong>{' '}
          Robert Jervis (*Cooperation Under the Security Dilemma*) and Stephen Van Evera argued that when military technology favors the 
          <span className="text-red-400 font-semibold"> offensive</span> (e.g. 1914 cult of the offensive, Blitzkrieg tank warfare), war is perceived as swift and profitable, dramatically raising war probability. 
          When technology favors <span className="text-emerald-400 font-semibold">defense</span> (trenches, machine guns, MAD nuclear second-strike), status-quo powers can maintain peace. 
          Michael Horowitz (*The Diffusion of Military Power*) further models how financial capital and organizational capacity determine whether emerging powers can successfully adopt breakthrough military technology.
        </div>
      </div>

      {/* Weapons Categories Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              The 31 Military Technology Revolutions (1860s–2026)
            </h3>
            <p className="text-xs text-zinc-400">Filter by battlefield operational domain</p>
          </div>

          {/* Domain tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {domains.map(d => (
              <button
                key={d}
                onClick={() => setActiveDomain(d)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  activeDomain === d
                    ? 'bg-purple-600 text-white shadow'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {d === 'all' ? 'All Domains' : d}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredWeapons.map(w => (
            <div
              key={w.code}
              className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-purple-500/40 hover:bg-zinc-850 transition-all"
            >
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className="font-mono text-purple-400 font-bold bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
                  {w.code.toUpperCase()}
                </span>
                <span className="text-zinc-500 font-mono">{w.era}</span>
              </div>
              <div className="text-xs font-semibold text-white leading-snug">{w.name}</div>
              <div className="text-[11px] text-zinc-400 mt-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500/60" />
                <span>Domain: {w.domain}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technological Sophistication & Top Powers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline of Max Military Sophistication */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-zinc-900/70 border border-zinc-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            Systemic Military Technology Adoption Trends (1860s–2020s)
          </h3>
          <p className="text-xs text-zinc-400 mb-4">
            Average sovereign sophistication score vs systemic technology leader
          </p>

          <div className="h-44 flex items-end gap-1.5 pt-6 pb-2 border-b border-zinc-800">
            {armsTechDecades.map(item => {
              const heightPct = (item.maxScore / maxDecadeScore) * 100;
              return (
                <div
                  key={item.decade}
                  className="flex-1 flex flex-col items-center group relative h-full justify-end"
                >
                  <div
                    style={{ height: `${Math.max(heightPct, 6)}%` }}
                    className="w-full bg-purple-600/70 group-hover:bg-purple-400 rounded-t transition-all"
                  />
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                    <div className="bg-zinc-800 text-white text-[11px] font-mono px-2 py-1 rounded shadow-lg border border-zinc-700 whitespace-nowrap text-center">
                      <div>{item.decade}s: Max {item.maxScore}/31 systems</div>
                      <div className="text-purple-300 text-[10px]">Leader: {item.leader}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-[11px] text-zinc-500 font-mono mt-2">
            <span>1860s (Rifled Muskets)</span>
            <span>1910s (Dreadnoughts/Tanks)</span>
            <span>1940s (Radar/Jets)</span>
            <span>1980s (Precision MBT)</span>
            <span>2020s (Stealth/UAS)</span>
          </div>
        </div>

        {/* Modern Leaderboards */}
        <div className="p-5 rounded-xl bg-zinc-900/70 border border-zinc-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-amber-400" />
            Top Technological Deployers (2020s)
          </h3>
          <p className="text-xs text-zinc-400 mb-3">Total active weapon systems fielded</p>

          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
            {armsTechTop.map((item, idx) => (
              <div
                key={item.country}
                className="flex items-center justify-between text-xs p-1.5 rounded hover:bg-zinc-800/60"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="font-mono text-[11px] text-zinc-500 w-4">{idx + 1}.</span>
                  <span className="text-zinc-200 font-medium truncate">{item.country}</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-purple-400 font-bold bg-purple-950/60 px-2 py-0.5 rounded text-[11px] border border-purple-800/30">
                    {item.score} / 31
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
