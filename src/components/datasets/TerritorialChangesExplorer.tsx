import { useState, useMemo } from 'react';
import {
  terrChangesMeta,
  terrChangesStats,
  terrChangesProcedures,
  terrChangesDecades,
  terrChangesTopGainers,
  terrChangesTopLosers,
  terrChangesAllRecords,
  canonicalTerrChangesList,
  TerrChangeRecord,
  CanonicalTerrChange
} from '../../data/irDatasets';
import {
  Globe,
  MapPin,
  Search,
  Download,
  Filter,
  Flame,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
  Info,
  Calendar,
  Layers,
  GraduationCap,
  TrendingUp,
  AlertTriangle,
  Scale
} from 'lucide-react';

export function TerritorialChangesExplorer() {
  const [activeSubTab, setActiveSubTab] = useState<'analytics' | 'cases' | 'browser'>('analytics');
  const [searchQuery, setSearchQuery] = useState('');
  const [procedureFilter, setProcedureFilter] = useState('all');
  const [conflictFilter, setConflictFilter] = useState<'all' | 'conflict' | 'peaceful'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState<TerrChangeRecord | null>(null);
  const [activeCase, setActiveCase] = useState<CanonicalTerrChange>(canonicalTerrChangesList[0]);

  const itemsPerPage = 25;

  const filteredRecords = useMemo(() => {
    return terrChangesAllRecords.filter(r => {
      const matchSearch =
        searchQuery === '' ||
        r.gainer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.loser.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.procedurLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(r.year).includes(searchQuery);

      const matchProc =
        procedureFilter === 'all' || r.procedur === procedureFilter;

      const matchConflict =
        conflictFilter === 'all' ||
        (conflictFilter === 'conflict' && r.conflict) ||
        (conflictFilter === 'peaceful' && !r.conflict);

      return matchSearch && matchProc && matchConflict;
    });
  }, [searchQuery, procedureFilter, conflictFilter]);

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(start, start + itemsPerPage);
  }, [filteredRecords, currentPage]);

  const maxDecadeCount = Math.max(...terrChangesDecades.map(d => d.count), 1);

  return (
    <div className="space-y-6">
      {/* Top Banner & Metadata */}
      <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-teal-950/70 border border-emerald-800/40 rounded-xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                COW Territorial Changes v6
              </span>
              <span className="text-xs text-zinc-400">1816–2018 Database</span>
              <span className="text-xs text-zinc-400">•</span>
              <span className="text-xs text-amber-400 font-medium">842 Sovereign Transfers</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              COW Territorial Changes Dataset (v6)
            </h2>
            <p className="text-sm text-zinc-300 mt-1 max-w-3xl leading-relaxed">
              Maintained by Jaroslav Tir, Philip Schafer, Paul Diehl, and Charles Gochman, this dataset documents every peaceful 
              and violent transfer of territory between states from the Congress of Vienna (1816) through 2018—providing the empirical 
              foundation for research on border disputes, territorial revanchism, and interstate war.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <a
              href="/public/assets/aistudio/terr-changes-v6_84934110.zip"
              download="terr-changes-v6_84934110.zip"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors shadow"
              title="Download original Territorial Changes v6 ZIP"
            >
              <Download className="w-4 h-4" />
              Raw Terr Changes ZIP
            </a>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-emerald-900/40 text-xs">
          <div>
            <div className="text-zinc-400">Total Transfers</div>
            <div className="text-lg font-bold text-white">{terrChangesStats.total}</div>
          </div>
          <div>
            <div className="text-zinc-400">Accompanied by War</div>
            <div className="text-lg font-bold text-red-400 flex items-center gap-1">
              <Flame className="w-4 h-4" />
              {terrChangesStats.conflictTransfers} ({terrChangesStats.pctConflict}%)
            </div>
          </div>
          <div>
            <div className="text-zinc-400">Peaceful / Diplomatic</div>
            <div className="text-lg font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              {terrChangesStats.peacefulTransfers} ({(100 - parseFloat(terrChangesStats.pctConflict)).toFixed(1)}%)
            </div>
          </div>
          <div>
            <div className="text-zinc-400">Most Common Method</div>
            <div className="text-lg font-bold text-cyan-300">Bilateral Cession (42.5%)</div>
          </div>
        </div>
      </div>

      {/* Sub-tab navigation */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
        <button
          onClick={() => setActiveSubTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeSubTab === 'analytics'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Procedures & Temporal Analytics
        </button>
        <button
          onClick={() => setActiveSubTab('cases')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeSubTab === 'cases'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          Historical Case Studies ({canonicalTerrChangesList.length})
        </button>
        <button
          onClick={() => setActiveSubTab('browser')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeSubTab === 'browser'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
          }`}
        >
          <Search className="w-4 h-4" />
          Master Transfers Browser ({filteredRecords.length.toLocaleString()})
        </button>
      </div>

      {/* 1. ANALYTICS VIEW */}
      {activeSubTab === 'analytics' && (
        <div className="space-y-6">
          {/* Theoretical Framing */}
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800/80 text-zinc-300 text-xs leading-relaxed flex items-start gap-3">
            <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-semibold">IR Theory Insight — The "Issue Invisibility" of Territory:</strong>{' '}
              Vasquez's *The War Puzzle* and Hensel's *Issue Correlates of War (ICOW)* show that territorial disputes are roughly 
              <span className="text-amber-300 font-semibold"> three times more likely to escalate to militarized interstate disputes and full-scale war</span> than 
              maritime, policy, or regime disputes. Territory carries both tangible material value (natural resources, strategic depth) and intangible, non-divisible symbolic value (homeland identity, sacred history).
            </div>
          </div>

          {/* Transfer Procedures Breakdown */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-400" />
              Transfer Procedures Typology (1816–2018)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {terrChangesProcedures.map(proc => (
                <div
                  key={proc.code}
                  onClick={() => {
                    setProcedureFilter(proc.code);
                    setActiveSubTab('browser');
                  }}
                  className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-850 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                      proc.violent ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      Code {proc.code} {proc.violent ? '• Combat' : '• Diplomatic'}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">{proc.count} ({proc.pct}%)</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    {proc.label}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {proc.desc}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-[11px] text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                    <span>Filter transfers</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline & Gainers/Losers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Decadal Timeline */}
            <div className="lg:col-span-2 p-5 rounded-xl bg-zinc-900/70 border border-zinc-800/80">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Territorial Transfers by Decade (1816–2018)
              </h3>
              <p className="text-xs text-zinc-400 mb-4">
                Massive restructuring peaks following major hegemonic wars (WWI 1910s, WWII 1940s, Post-Cold War 1990s)
              </p>

              <div className="h-44 flex items-end gap-1.5 pt-6 pb-2 border-b border-zinc-800">
                {terrChangesDecades.map(item => {
                  const heightPct = (item.count / maxDecadeCount) * 100;
                  const isMajorWarPeak = item.decade === 1910 || item.decade === 1940 || item.decade === 1990;
                  return (
                    <div
                      key={item.decade}
                      className="flex-1 flex flex-col items-center group relative h-full justify-end"
                    >
                      <div
                        style={{ height: `${Math.max(heightPct, 4)}%` }}
                        className={`w-full rounded-t transition-all ${
                          isMajorWarPeak ? 'bg-amber-500 group-hover:bg-amber-400' : 'bg-emerald-600/70 group-hover:bg-emerald-400'
                        }`}
                      />
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                        <div className="bg-zinc-800 text-white text-[11px] font-mono px-2 py-0.5 rounded shadow-lg border border-zinc-700 whitespace-nowrap">
                          {item.decade}s: {item.count} transfers
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[11px] text-zinc-500 font-mono mt-2">
                <span>1816 (Vienna)</span>
                <span>1860s</span>
                <span>1910s (WWI)</span>
                <span>1940s (WWII)</span>
                <span>1990s (Soviet break)</span>
                <span>2010s</span>
              </div>
            </div>

            {/* Top Gainers & Losers */}
            <div className="p-5 rounded-xl bg-zinc-900/70 border border-zinc-800/80 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Top Territorial Gainers
                </h4>
                <div className="space-y-1.5 max-h-[120px] overflow-y-auto pr-1">
                  {terrChangesTopGainers.slice(0, 5).map(g => (
                    <div
                      key={g.name}
                      onClick={() => {
                        setSearchQuery(g.name);
                        setActiveSubTab('browser');
                      }}
                      className="flex items-center justify-between text-xs p-1 rounded hover:bg-zinc-800/60 cursor-pointer"
                    >
                      <span className="text-zinc-200 truncate">{g.name}</span>
                      <span className="font-mono text-emerald-400 font-semibold">{g.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5 text-red-400">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Top Territorial Ceding Powers
                </h4>
                <div className="space-y-1.5 max-h-[120px] overflow-y-auto pr-1">
                  {terrChangesTopLosers.slice(0, 5).map(l => (
                    <div
                      key={l.name}
                      onClick={() => {
                        setSearchQuery(l.name);
                        setActiveSubTab('browser');
                      }}
                      className="flex items-center justify-between text-xs p-1 rounded hover:bg-zinc-800/60 cursor-pointer"
                    >
                      <span className="text-zinc-200 truncate">{l.name}</span>
                      <span className="font-mono text-red-400 font-semibold">{l.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PEDAGOGICAL CASE STUDIES */}
      {activeSubTab === 'cases' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-2 lg:col-span-1">
            <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Select Historical Landmark
            </div>
            {canonicalTerrChangesList.map(item => (
              <div
                key={item.title}
                onClick={() => setActiveCase(item)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all text-left ${
                  activeCase.title === item.title
                    ? 'bg-emerald-950/60 border-emerald-500/80 shadow-md shadow-emerald-900/20'
                    : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                  <span className="font-mono text-zinc-300">{item.year}</span>
                  <span className={`font-mono text-[10px] px-1.5 py-0.2 rounded font-medium ${
                    item.conflict ? 'bg-red-900/30 text-red-300' : 'bg-emerald-900/30 text-emerald-300'
                  }`}>
                    {item.conflict ? 'Armed Conflict' : 'Diplomatic'}
                  </span>
                </div>
                <div className="text-xs font-bold text-white leading-snug">{item.title}</div>
                <div className="text-[11px] text-zinc-400 mt-1">
                  {item.loser} ➔ {item.gainer}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 p-6 rounded-xl bg-zinc-900/80 border border-zinc-800/80 space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Year {activeCase.year}
                </span>
                <span className="text-xs font-mono text-zinc-300 bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
                  {activeCase.procedure}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {activeCase.title}
              </h3>
              <div className="text-xs text-zinc-400 mt-1 flex items-center gap-3">
                <span>Gaining State: <strong className="text-emerald-300">{activeCase.gainer}</strong></span>
                <span>•</span>
                <span>Ceding State: <strong className="text-red-300">{activeCase.loser}</strong></span>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">
                Key IR Theoretical Concepts
              </div>
              <div className="flex flex-wrap gap-2">
                {activeCase.irConcepts.map(c => (
                  <span
                    key={c}
                    className="text-xs px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700/80"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Historical Context & Geopolitics
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/50 p-3.5 rounded-lg border border-zinc-800">
                {activeCase.historicalContext}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                Pedagogical Takeaway for IR Scholars
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed bg-amber-950/20 p-3.5 rounded-lg border border-amber-900/30">
                {activeCase.pedagogicalTakeaway}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. MASTER TRANSFERS BROWSER */}
      {activeSubTab === 'browser' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-zinc-900/70 p-3 rounded-xl border border-zinc-800">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search state, territory entity, year..."
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <select
                value={procedureFilter}
                onChange={e => {
                  setProcedureFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">All Procedures</option>
                {terrChangesProcedures.map(p => (
                  <option key={p.code} value={p.code}>
                    {p.label} ({p.count})
                  </option>
                ))}
              </select>

              <select
                value={conflictFilter}
                onChange={e => {
                  setConflictFilter(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">All Conflict Status</option>
                <option value="conflict">Accompanied by War ({terrChangesStats.conflictTransfers})</option>
                <option value="peaceful">Peaceful / Diplomatic ({terrChangesStats.peacefulTransfers})</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
            <span>
              Showing <strong className="text-white">{filteredRecords.length.toLocaleString()}</strong> sovereign transfers
            </span>
            <span>
              Page {currentPage} of {Math.max(totalPages, 1)}
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/60 shadow-md">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px] font-semibold tracking-wider border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-4">Year</th>
                  <th className="py-3 px-4">Gainer State</th>
                  <th className="py-3 px-4">Ceding State</th>
                  <th className="py-3 px-4">Territory Entity</th>
                  <th className="py-3 px-4">Procedure</th>
                  <th className="py-3 px-4">Conflict</th>
                  <th className="py-3 px-4 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {paginatedRecords.map(r => (
                  <tr
                    key={r.id}
                    onClick={() => setSelectedRecord(r)}
                    className="hover:bg-zinc-800/40 cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 px-4 font-mono text-emerald-300">{r.year}</td>
                    <td className="py-2.5 px-4 font-medium text-white">{r.gainer}</td>
                    <td className="py-2.5 px-4 font-medium text-zinc-300">{r.loser}</td>
                    <td className="py-2.5 px-4 text-zinc-300">{r.entity}</td>
                    <td className="py-2.5 px-4">
                      <span className="text-[11px] text-zinc-300">{r.procedurLabel}</span>
                    </td>
                    <td className="py-2.5 px-4">
                      {r.conflict ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-red-300 bg-red-950/40 px-2 py-0.5 rounded border border-red-800/40">
                          <Flame className="w-3 h-3 text-red-400" /> War
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Peaceful
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRecord(r);
                        }}
                        className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1 text-[11px]"
                      >
                        Inspect <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {paginatedRecords.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-zinc-500">
                      No territorial transfers match the specified criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-xs text-zinc-300 hover:bg-zinc-800 disabled:opacity-40 disabled:pointer-events-none"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <div className="text-xs text-zinc-400">
                Page {currentPage} of {totalPages}
              </div>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-xs text-zinc-300 hover:bg-zinc-800 disabled:opacity-40 disabled:pointer-events-none"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setSelectedRecord(null)}
              className="absolute right-4 top-4 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                Transfer Record #{selectedRecord.id}
              </span>
              <h3 className="text-lg font-bold text-white mt-2">
                {selectedRecord.entity} Transfer ({selectedRecord.year})
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                From {selectedRecord.loser} to {selectedRecord.gainer}
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                <div className="text-zinc-500 text-[10px] uppercase font-semibold">Transfer Procedure</div>
                <div className="text-white font-medium mt-0.5">{selectedRecord.procedurLabel}</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                  <div className="text-zinc-500 text-[10px] uppercase font-semibold">Armed Conflict Status</div>
                  <div className={`font-semibold mt-0.5 ${selectedRecord.conflict ? 'text-red-400' : 'text-emerald-400'}`}>
                    {selectedRecord.conflict ? 'Accompanied by War' : 'Peaceful / Diplomatic'}
                  </div>
                </div>

                <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                  <div className="text-zinc-500 text-[10px] uppercase font-semibold">Independence Outcome</div>
                  <div className="text-zinc-300 mt-0.5">
                    {selectedRecord.indep ? 'Created New Sovereign State' : 'Integrated into Gainer State'}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                <div className="text-zinc-500 text-[10px] uppercase font-semibold">Estimated Area & Population</div>
                <div className="text-zinc-300 mt-0.5">
                  {selectedRecord.areaSqKm ? `${selectedRecord.areaSqKm.toLocaleString()} sq km` : 'Area unrecorded'}
                  {selectedRecord.pop ? ` • Population: ${selectedRecord.pop.toLocaleString()}` : ''}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium rounded-lg"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
