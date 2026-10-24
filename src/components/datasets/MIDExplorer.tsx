import { useState, useMemo } from 'react';
import {
  midSummary,
  midAnnual,
  midDecades,
  midCountries,
  midNotable,
  midAllDisputes,
  DisputeRecord,
  NotableDispute,
  CountryStat
} from '../../data/irDatasets';
import {
  Swords,
  Search,
  Filter,
  BarChart2,
  Calendar,
  Globe2,
  AlertTriangle,
  Flame,
  ShieldAlert,
  Info,
  ChevronRight,
  ExternalLink,
  BookOpen,
  X,
  Award,
  Layers,
  ArrowUpDown
} from 'lucide-react';

export function MIDExplorer() {
  const [timelineMode, setTimelineMode] = useState<'decades' | 'annual'>('decades');
  const [selectedDispute, setSelectedDispute] = useState<DisputeRecord | null>(null);
  const [selectedNotable, setSelectedNotable] = useState<NotableDispute | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hostLevFilter, setHostLevFilter] = useState<number | 'all'>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [outcomeFilter, setOutcomeFilter] = useState<string>('all');
  const [yearMin, setYearMin] = useState<number>(1816);
  const [yearMax, setYearMax] = useState<number>(2014);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'year-desc' | 'year-asc' | 'duration-desc' | 'hostility-desc'>('year-desc');

  // Filtered disputes
  const filteredDisputes = useMemo(() => {
    return midAllDisputes.filter(d => {
      if (hostLevFilter !== 'all' && d.hostLev !== hostLevFilter) return false;
      if (d.stYear < yearMin || d.stYear > yearMax) return false;
      if (outcomeFilter !== 'all' && d.outcomeLabel !== outcomeFilter) return false;

      if (countryFilter !== 'all') {
        const hasCountry = d.sideA.includes(countryFilter) || d.sideB.includes(countryFilter) ||
          d.sideACodes.includes(countryFilter) || d.sideBCodes.includes(countryFilter);
        if (!hasCountry) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = d.id.toString().includes(q);
        const matchSideA = d.sideA.some(c => c.toLowerCase().includes(q)) || d.sideACodes.some(c => c.toLowerCase().includes(q));
        const matchSideB = d.sideB.some(c => c.toLowerCase().includes(q)) || d.sideBCodes.some(c => c.toLowerCase().includes(q));
        const matchOutcome = d.outcomeLabel.toLowerCase().includes(q);
        if (!matchId && !matchSideA && !matchSideB && !matchOutcome) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'year-desc') return b.stYear - a.stYear || b.id - a.id;
      if (sortBy === 'year-asc') return a.stYear - b.stYear || a.id - b.id;
      if (sortBy === 'duration-desc') return b.durationDays - a.durationDays;
      if (sortBy === 'hostility-desc') return b.hostLev - a.hostLev;
      return 0;
    });
  }, [hostLevFilter, yearMin, yearMax, outcomeFilter, countryFilter, searchQuery, sortBy]);

  const itemsPerPage = 15;
  const totalPages = Math.ceil(filteredDisputes.length / itemsPerPage);
  const paginatedDisputes = filteredDisputes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Maximum value for timeline chart bars
  const maxDecadeTotal = Math.max(...midDecades.map(d => d.total));
  const maxAnnualTotal = Math.max(...midAnnual.map(d => d.total));

  const hostilityColor = (level: number) => {
    switch (level) {
      case 5: return { bg: 'bg-red-600', text: 'text-red-700', border: 'border-red-200', light: 'bg-red-50' };
      case 4: return { bg: 'bg-amber-600', text: 'text-amber-700', border: 'border-amber-200', light: 'bg-amber-50' };
      case 3: return { bg: 'bg-yellow-500', text: 'text-yellow-700', border: 'border-yellow-200', light: 'bg-yellow-50' };
      case 2: return { bg: 'bg-blue-600', text: 'text-blue-700', border: 'border-blue-200', light: 'bg-blue-50' };
      default: return { bg: 'bg-zinc-500', text: 'text-zinc-700', border: 'border-zinc-200', light: 'bg-zinc-50' };
    }
  };

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-red-950 via-zinc-900 to-slate-950 text-white rounded-3xl p-6 md:p-8 shadow-sm border border-red-900/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
            <span className="px-2.5 py-1 rounded-md bg-red-950/80 border border-red-800/60 flex items-center gap-1.5">
              <Swords className="w-3.5 h-3.5 text-red-400" />
              Correlates of War Project
            </span>
            <span className="px-2.5 py-1 rounded-md bg-zinc-800/80 border border-zinc-700/60 text-zinc-300">
              MID 5.0 (Palmer, D'Orazio, Kenwick, Lane 2020)
            </span>
            <span className="px-2.5 py-1 rounded-md bg-zinc-800/80 border border-zinc-700/60 text-zinc-300">
              Coverage: 1816 – 2014
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Militarized Interstate Disputes (MID 5.0) Interactive Explorer
          </h2>
          <p className="text-zinc-300 text-sm md:text-base max-w-3xl leading-relaxed">
            A Militarized Interstate Dispute (MID) is defined by the Correlates of War Project as an explicit, overt, and non-accidental interaction between sovereign states in which the threat, display, or use of military force is sanctioned by recognized government authorities. Explore the complete historical corpus of 2,436 disputes spanning nearly two centuries of world politics.
          </p>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-black/40 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
              <div className="text-zinc-400 text-xs font-medium">Total Disputes</div>
              <div className="text-2xl font-extrabold text-white mt-1">2,436</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">1816 – 2014 (199 yrs)</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
              <div className="text-red-300 text-xs font-medium flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-red-400" />
                Interstate Wars (L5)
              </div>
              <div className="text-2xl font-extrabold text-red-400 mt-1">106</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">1,000+ battle deaths (4.4%)</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
              <div className="text-amber-300 text-xs font-medium flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                Uses of Force (L4)
              </div>
              <div className="text-2xl font-extrabold text-amber-400 mt-1">1,603</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">Skirmishes & clashes (65.8%)</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
              <div className="text-yellow-300 text-xs font-medium flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
                Displays & Threats (L2-3)
              </div>
              <div className="text-2xl font-extrabold text-yellow-400 mt-1">727</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">Alerts & mobilizations (29.8%)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Timeline & Historical Frequency Chart */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-indigo-600" />
              Historical Dispute Frequency by Hostility Level (1816 – 2014)
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Distribution of threats, displays, uses of force, and wars across two centuries of international history.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-zinc-100 p-1 rounded-xl self-start sm:self-auto text-xs font-medium">
            <button
              onClick={() => setTimelineMode('decades')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timelineMode === 'decades' ? 'bg-white shadow text-indigo-700 font-bold' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              By Decade (21)
            </button>
            <button
              onClick={() => setTimelineMode('annual')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timelineMode === 'annual' ? 'bg-white shadow text-indigo-700 font-bold' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Annual Timeline (191 Yrs)
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-600">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-red-600" />
            <span>War (Level 5: 106)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-amber-500" />
            <span>Use of Force (Level 4: 1,603)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-yellow-400" />
            <span>Display of Force (Level 3: 653)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-blue-500" />
            <span>Threat to Use Force (Level 2: 74)</span>
          </div>
        </div>

        {/* Dynamic Timeline Bar Chart */}
        {timelineMode === 'decades' ? (
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-7 sm:grid-cols-11 md:grid-cols-21 gap-1.5 items-end h-64 border-b border-zinc-200 pb-2">
              {midDecades.map(d => {
                const heightPct = Math.min(100, Math.max(8, (d.total / maxDecadeTotal) * 100));
                const warPct = (d.wars / d.total) * 100;
                const usePct = (d.usesOfForce / d.total) * 100;
                const dispPct = (d.displays / d.total) * 100;
                const threatPct = (d.threats / d.total) * 100;

                return (
                  <div
                    key={d.decade}
                    className="flex flex-col items-center group relative cursor-pointer h-full justify-end"
                    onClick={() => {
                      setYearMin(d.startYear);
                      setYearMax(d.startYear + 9);
                    }}
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col bg-zinc-900 text-white text-[11px] p-2.5 rounded-lg shadow-xl z-30 pointer-events-none w-44">
                      <div className="font-bold border-b border-zinc-700 pb-1 text-indigo-300">{d.decade}</div>
                      <div className="text-zinc-200 mt-1">Total Disputes: <b>{d.total}</b></div>
                      <div className="text-red-400">Wars (L5): {d.wars}</div>
                      <div className="text-amber-400">Uses of Force (L4): {d.usesOfForce}</div>
                      <div className="text-yellow-400">Displays (L3): {d.displays}</div>
                      <div className="text-blue-400">Threats (L2): {d.threats}</div>
                      <div className="text-[10px] text-zinc-400 mt-1 italic">Click to filter table</div>
                    </div>

                    {/* Stacked Bar */}
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full max-w-[18px] rounded-t-sm flex flex-col-reverse overflow-hidden transition-all group-hover:opacity-85 shadow-sm"
                    >
                      <div style={{ height: `${warPct}%` }} className="bg-red-600 w-full" />
                      <div style={{ height: `${usePct}%` }} className="bg-amber-500 w-full" />
                      <div style={{ height: `${dispPct}%` }} className="bg-yellow-400 w-full" />
                      <div style={{ height: `${threatPct}%` }} className="bg-blue-500 w-full" />
                    </div>

                    <span className="text-[10px] text-zinc-500 mt-1.5 rotate-[-45deg] origin-top-left font-mono">
                      {d.decade.replace('s', '')}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-zinc-400 pt-3">
              <span>← Post-Napoleonic (1816)</span>
              <span>World War Eras (1914-1945)</span>
              <span>Cold War (1947-1989)</span>
              <span>Post-Cold War (1990-2014) →</span>
            </div>
          </div>
        ) : (
          <div className="space-y-3 pt-2">
            <div className="flex items-end h-64 gap-[1px] sm:gap-[2px] border-b border-zinc-200 pb-2 overflow-x-auto">
              {midAnnual.map(pt => {
                const heightPct = Math.min(100, Math.max(4, (pt.total / maxAnnualTotal) * 100));
                const warPct = (pt.wars / pt.total) * 100;
                const usePct = (pt.usesOfForce / pt.total) * 100;
                const dispPct = (pt.displays / pt.total) * 100;
                const threatPct = (pt.threats / pt.total) * 100;

                return (
                  <div
                    key={pt.year}
                    className="flex-1 min-w-[3px] flex flex-col items-center group relative cursor-pointer h-full justify-end"
                    onClick={() => {
                      setYearMin(pt.year);
                      setYearMax(pt.year);
                    }}
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col bg-zinc-900 text-white text-[11px] p-2 rounded-lg shadow-xl z-30 pointer-events-none w-36">
                      <div className="font-bold border-b border-zinc-700 pb-0.5 text-indigo-300">Year {pt.year}</div>
                      <div className="text-zinc-200 mt-1">Total: <b>{pt.total}</b></div>
                      <div className="text-red-400">Wars: {pt.wars}</div>
                      <div className="text-amber-400">Uses: {pt.usesOfForce}</div>
                      <div className="text-yellow-400">Displays: {pt.displays}</div>
                      <div className="text-blue-400">Threats: {pt.threats}</div>
                    </div>

                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full rounded-t-[1px] flex flex-col-reverse overflow-hidden transition-all group-hover:brightness-125"
                    >
                      <div style={{ height: `${warPct}%` }} className="bg-red-600 w-full" />
                      <div style={{ height: `${usePct}%` }} className="bg-amber-500 w-full" />
                      <div style={{ height: `${dispPct}%` }} className="bg-yellow-400 w-full" />
                      <div style={{ height: `${threatPct}%` }} className="bg-blue-500 w-full" />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-zinc-400 pt-1">
              <span>1816</span>
              <span>1865 (US Civil War/Bismarck)</span>
              <span>1914 (WWI)</span>
              <span>1939 (WWII)</span>
              <span>1962 (Cuban Missile)</span>
              <span>1989 (Berlin Wall)</span>
              <span>2014 (Crimea)</span>
            </div>
          </div>
        )}
      </div>

      {/* Section 2: Top 15 Conflict-Involved States */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-indigo-600" />
              Most Frequent State Participants in MIDs (Top 20)
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Click any state to filter the historical dispute database below by that country's conflicts.
            </p>
          </div>
          {countryFilter !== 'all' && (
            <button
              onClick={() => setCountryFilter('all')}
              className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <X className="w-3.5 h-3.5" /> Clear country filter ({countryFilter})
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {midCountries.slice(0, 16).map((c: CountryStat, idx: number) => {
            const isSelected = countryFilter === c.name || countryFilter === c.code;
            return (
              <button
                key={c.code}
                onClick={() => setCountryFilter(isSelected ? 'all' : c.name)}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-2.5 ${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-400 ring-2 ring-indigo-500/30'
                    : 'bg-zinc-50/70 hover:bg-zinc-100/80 border-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-900 text-sm flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-zinc-200 text-zinc-700 text-[10px] flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    {c.name}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-200 font-mono text-zinc-700">
                    {c.code}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500">Total Disputes:</span>
                    <span className="font-bold text-zinc-900">{c.total}</span>
                  </div>
                  <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden flex">
                    <div style={{ width: `${(c.sideA / c.total) * 100}%` }} className="bg-indigo-600 h-full" title={`Side A (Initiator): ${c.sideA}`} />
                    <div style={{ width: `${(c.sideB / c.total) * 100}%` }} className="bg-zinc-400 h-full" title={`Side B (Target): ${c.sideB}`} />
                  </div>
                  <div className="flex justify-between text-[11px] text-zinc-500 pt-0.5">
                    <span>Wars: <strong className="text-red-600">{c.wars}</strong></span>
                    <span>Side A: {c.sideA}</span>
                    <span>Rev: {c.revisionist}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 3: Landmark Historical MIDs (Canonical Case Studies) */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            Landmark Historical MIDs & Crisis Case Studies
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Major international crises coded in the COW dataset that shaped international relations theory and world order.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {midNotable.map(caseStudy => (
            <div
              key={caseStudy.id}
              onClick={() => setSelectedNotable(caseStudy)}
              className="p-5 rounded-2xl border border-zinc-200 bg-zinc-50 hover:bg-white hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                    COW MID #{caseStudy.id} ({caseStudy.year})
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    caseStudy.hostLev === 5
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : caseStudy.hostLev === 4
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                  }`}>
                    {caseStudy.hostLevLabel.split('(')[0]}
                  </span>
                </div>

                <h4 className="font-bold text-zinc-900 text-base group-hover:text-indigo-600 transition-colors">
                  {caseStudy.title}
                </h4>

                <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed">
                  {caseStudy.description}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-zinc-200/70">
                <div className="flex flex-wrap gap-1">
                  {caseStudy.irConcepts.map((concept, idx) => (
                    <span key={idx} className="text-[10px] bg-white px-2 py-0.5 rounded border border-zinc-200 font-medium text-zinc-700">
                      {concept}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-indigo-600 font-semibold pt-1">
                  <span>View Case & IR Analysis</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Searchable Full Dispute Database */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-sm space-y-6">
        <div className="border-b border-zinc-100 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
              <Search className="w-5 h-5 text-indigo-600" />
              Search & Filter the Full Database (2,436 Disputes)
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Filter by hostility level, country participant, outcome, or year span. Showing {filteredDisputes.length} matching disputes.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-zinc-50 border border-zinc-200 text-zinc-700 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            >
              <option value="year-desc">Year (Newest First)</option>
              <option value="year-asc">Year (Oldest First)</option>
              <option value="duration-desc">Duration (Longest First)</option>
              <option value="hostility-desc">Hostility Level (Highest)</option>
            </select>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-xs">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search dispute #, country..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Hostility Level */}
          <div>
            <select
              value={hostLevFilter}
              onChange={(e) => {
                setHostLevFilter(e.target.value === 'all' ? 'all' : Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Hostility Levels (2 to 5)</option>
              <option value="5">Level 5: War (106)</option>
              <option value="4">Level 4: Use of Force (1,603)</option>
              <option value="3">Level 3: Display of Force (653)</option>
              <option value="2">Level 2: Threat to Use Force (74)</option>
            </select>
          </div>

          {/* Outcome Filter */}
          <div>
            <select
              value={outcomeFilter}
              onChange={(e) => {
                setOutcomeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Outcomes</option>
              <option value="Stalemate">Stalemate (1,542)</option>
              <option value="Victory for Side A">Victory for Side A (118)</option>
              <option value="Victory for Side B">Victory for Side B (55)</option>
              <option value="Yield by Side A">Yield by Side A (62)</option>
              <option value="Yield by Side B">Yield by Side B (125)</option>
              <option value="Compromise">Compromise (139)</option>
              <option value="Released">Released (171)</option>
              <option value="Joined Ongoing War">Joined Ongoing War (23)</option>
              <option value="Unclear">Unclear (184)</option>
            </select>
          </div>

          {/* Year Range Reset / Quick Eras */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setYearMin(1816);
                setYearMax(2014);
                setHostLevFilter('all');
                setOutcomeFilter('all');
                setCountryFilter('all');
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="w-full px-3 py-1.5 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 font-semibold rounded-lg text-xs transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        </div>

        {/* Disputes Table */}
        <div className="overflow-x-auto border border-zinc-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 text-zinc-700 font-semibold border-b border-zinc-200">
              <tr>
                <th className="p-3">MID #</th>
                <th className="p-3">Years</th>
                <th className="p-3">Side A (Initiator)</th>
                <th className="p-3">Side B (Target)</th>
                <th className="p-3">Hostility</th>
                <th className="p-3">Outcome</th>
                <th className="p-3">Fatalities</th>
                <th className="p-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {paginatedDisputes.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center p-8 text-zinc-400">
                    No militarized disputes match the selected filters. Try broadening the search criteria.
                  </td>
                </tr>
              ) : (
                paginatedDisputes.map(d => {
                  const style = hostilityColor(d.hostLev);
                  return (
                    <tr
                      key={d.id}
                      onClick={() => setSelectedDispute(d)}
                      className="hover:bg-zinc-50 transition-colors cursor-pointer group"
                    >
                      <td className="p-3 font-mono font-bold text-indigo-600">
                        #{d.id}
                      </td>
                      <td className="p-3 font-medium text-zinc-900 whitespace-nowrap">
                        {d.stYear === d.endYear ? d.stYear : `${d.stYear}–${d.endYear}`}
                        <div className="text-[10px] text-zinc-400">{d.durationDays} days</div>
                      </td>
                      <td className="p-3 max-w-[180px] font-medium text-zinc-800">
                        <div className="truncate">
                          {d.sideA.length > 0 ? d.sideA.join(', ') : 'None'}
                        </div>
                      </td>
                      <td className="p-3 max-w-[180px] font-medium text-zinc-800">
                        <div className="truncate">
                          {d.sideB.length > 0 ? d.sideB.join(', ') : 'None'}
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${style.light} ${style.text} ${style.border}`}>
                          L{d.hostLev}: {d.hostLevLabel.split('(')[0]}
                        </span>
                      </td>
                      <td className="p-3 text-zinc-700 whitespace-nowrap">
                        {d.outcomeLabel}
                      </td>
                      <td className="p-3 text-zinc-500 whitespace-nowrap">
                        {d.fatalityLabel}
                      </td>
                      <td className="p-3 text-right">
                        <button className="text-indigo-600 font-bold group-hover:underline text-xs flex items-center gap-0.5 ml-auto">
                          Inspect <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between text-xs text-zinc-500 pt-2">
            <div>
              Page <span className="font-bold text-zinc-900">{currentPage}</span> of {totalPages} ({filteredDisputes.length} records)
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="px-3 py-1.5 rounded-lg border border-zinc-200 bg-white font-medium disabled:opacity-40 hover:bg-zinc-50"
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="px-3 py-1.5 rounded-lg border border-zinc-200 bg-white font-medium disabled:opacity-40 hover:bg-zinc-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Full Dispute Inspection */}
      {selectedDispute && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 space-y-6 shadow-2xl border border-zinc-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Correlates of War Dataset • Dispute Record
                </span>
                <h3 className="text-2xl font-extrabold text-zinc-900">
                  COW MID #{selectedDispute.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDispute(null)}
                className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-200">
                <span className="text-zinc-500 block">Dates & Duration:</span>
                <span className="font-bold text-zinc-900 text-sm mt-0.5 block">
                  {selectedDispute.stYear} – {selectedDispute.endYear}
                </span>
                <span className="text-zinc-500 text-[11px]">
                  Duration: {selectedDispute.durationDays} days
                </span>
              </div>

              <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-200">
                <span className="text-zinc-500 block">Hostility Level:</span>
                <span className="font-bold text-red-700 text-sm mt-0.5 block">
                  Level {selectedDispute.hostLev}
                </span>
                <span className="text-zinc-600 text-[11px]">
                  {selectedDispute.hostLevLabel}
                </span>
              </div>
            </div>

            {/* Participants */}
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100">
                <div className="font-bold text-indigo-950 mb-1 flex items-center justify-between">
                  <span>Side A (Initiating Coalition):</span>
                  <span className="text-[10px] text-indigo-600">{selectedDispute.sideA.length} state(s)</span>
                </div>
                <div className="text-indigo-900 font-semibold">
                  {selectedDispute.sideA.join(', ') || 'None recorded'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                <div className="font-bold text-zinc-900 mb-1 flex items-center justify-between">
                  <span>Side B (Target Coalition):</span>
                  <span className="text-[10px] text-zinc-500">{selectedDispute.sideB.length} state(s)</span>
                </div>
                <div className="text-zinc-800 font-semibold">
                  {selectedDispute.sideB.join(', ') || 'None recorded'}
                </div>
              </div>
            </div>

            {/* Coding Details */}
            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 rounded-lg border border-zinc-200 bg-white">
                <span className="text-zinc-400 block text-[11px]">Outcome (COW):</span>
                <span className="font-bold text-zinc-800 mt-0.5 block">{selectedDispute.outcomeLabel}</span>
              </div>
              <div className="p-3 rounded-lg border border-zinc-200 bg-white">
                <span className="text-zinc-400 block text-[11px]">Settlement Type:</span>
                <span className="font-bold text-zinc-800 mt-0.5 block">{selectedDispute.settleLabel}</span>
              </div>
              <div className="p-3 rounded-lg border border-zinc-200 bg-white">
                <span className="text-zinc-400 block text-[11px]">Estimated Battle Deaths:</span>
                <span className="font-bold text-zinc-800 mt-0.5 block">{selectedDispute.fatalityLabel}</span>
              </div>
              <div className="p-3 rounded-lg border border-zinc-200 bg-white">
                <span className="text-zinc-400 block text-[11px]">Reciprocated Action:</span>
                <span className="font-bold text-zinc-800 mt-0.5 block">
                  {selectedDispute.reciprocated ? 'Yes (Side B returned fire)' : 'No (Unreciprocated)'}
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedDispute(null)}
                className="px-5 py-2 rounded-xl bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors"
              >
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Notable Case Study Analysis */}
      {selectedNotable && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl border border-zinc-200 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                  Landmark Case Study • COW MID #{selectedNotable.id} ({selectedNotable.year})
                </span>
                <h3 className="text-2xl font-extrabold text-zinc-900 mt-1">
                  {selectedNotable.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedNotable(null)}
                className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-zinc-700 leading-relaxed">
              <p>{selectedNotable.description}</p>

              <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 space-y-3">
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-indigo-600" />
                  Key IR Concepts Applied in POL SCI 102
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNotable.irConcepts.map((concept, idx) => (
                    <span key={idx} className="bg-white px-2.5 py-1 rounded-lg border border-zinc-200 text-xs font-semibold text-indigo-900">
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200">
                  <span className="text-zinc-500 block">Hostility Level:</span>
                  <span className="font-bold text-red-700 mt-0.5 block">{selectedNotable.hostLevLabel}</span>
                </div>
                <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200">
                  <span className="text-zinc-500 block">Outcome:</span>
                  <span className="font-bold text-zinc-900 mt-0.5 block">{selectedNotable.outcome}</span>
                </div>
                <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200">
                  <span className="text-zinc-500 block">Fatalities:</span>
                  <span className="font-bold text-zinc-900 mt-0.5 block">{selectedNotable.fatality}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedNotable(null)}
                className="px-5 py-2 rounded-xl bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors"
              >
                Close Case Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
