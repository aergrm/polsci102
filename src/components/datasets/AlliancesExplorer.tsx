import { useState, useMemo } from 'react';
import {
  alliancesSummary,
  alliancesDecades,
  alliancesAnnualActive,
  alliancesAll,
  canonicalAlliancesList,
  AllianceRecord,
  CanonicalAlliance
} from '../../data/irDatasets';
import {
  Shield,
  Handshake,
  FileCheck2,
  Scale,
  Search,
  Filter,
  Download,
  Calendar,
  Globe2,
  Users,
  ChevronRight,
  Info,
  ExternalLink,
  ChevronLeft,
  BookOpen,
  Award,
  Zap,
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export function AlliancesExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>('');
  const [timelineMode, setTimelineMode] = useState<'decades' | 'active'>('decades');
  const [selectedAlliance, setSelectedAlliance] = useState<AllianceRecord | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'canonical' | 'table' | 'theory'>('overview');

  const itemsPerPage = 15;

  // Filtered alliances
  const filteredAlliances = useMemo(() => {
    return alliancesAll.filter(a => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'Defense' && a.category !== 'Defense Pact') return false;
        if (selectedCategory === 'Non-Aggression' && a.category !== 'Non-Aggression') return false;
        if (selectedCategory === 'Entente' && a.category !== 'Entente') return false;
        if (selectedCategory === 'Neutrality' && a.category !== 'Neutrality') return false;
      }

      // Era filter
      const yr = a.startYear || 1816;
      if (selectedEra === '19th' && (yr < 1816 || yr >= 1914)) return false;
      if (selectedEra === 'pre-ww1' && (yr < 1871 || yr >= 1914)) return false;
      if (selectedEra === 'interwar' && (yr < 1919 || yr >= 1939)) return false;
      if (selectedEra === 'coldwar' && (yr < 1945 || yr >= 1991)) return false;
      if (selectedEra === 'postcoldwar' && yr < 1991) return false;

      // Country filter
      if (selectedCountryFilter) {
        const matchesCountry = a.members.some(m =>
          m.toLowerCase().includes(selectedCountryFilter.toLowerCase())
        );
        if (!matchesCountry) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = a.name.toLowerCase().includes(query);
        const matchesId = a.id.toString() === query;
        const matchesMember = a.members.some(m => m.toLowerCase().includes(query));
        const matchesType = a.ssType.toLowerCase().includes(query);
        if (!matchesName && !matchesId && !matchesMember && !matchesType) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedEra, selectedCountryFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredAlliances.length / itemsPerPage) || 1;
  const paginatedAlliances = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAlliances.slice(start, start + itemsPerPage);
  }, [filteredAlliances, currentPage]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedEra('all');
    setSelectedCountryFilter('');
    setCurrentPage(1);
  };

  // Find max values for timeline scaling
  const maxDecadeTotal = Math.max(...alliancesDecades.map(d => d.total));
  const maxActiveTotal = Math.max(...alliancesAnnualActive.map(a => a.total));

  return (
    <div className="space-y-8">
      {/* Hero Header & Raw Download */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
              <Handshake className="w-3.5 h-3.5" />
              Official COW Alliances Dataset v4.1 (1816–2012)
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight">
              Formal Interstate Alliances & Military Coalitions
            </h2>
            <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
              Explore <strong>414 formal military alliances</strong> and <strong>1,221 member commitments</strong> compiled by the Correlates of War Project (Douglas M. Gibler). Investigate how states use mutual defense pacts, non-aggression treaties, and ententes to balance power, deter rivals, or pass the buck.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <a
              href="/assets/aistudio/version4.1_csv__1__a2422bb3.zip"
              download
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Download className="w-4 h-4" />
              Download COW Alliances v4.1 ZIP
            </a>
            <div className="text-[11px] text-zinc-500 text-center lg:text-right">
              Includes Member, Dyad & Yearly CSVs + Codebook
            </div>
          </div>
        </div>

        {/* Quick KPI Stat Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-zinc-100">
          <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
            <div className="text-xs text-zinc-500 font-medium">Total Formal Treaties</div>
            <div className="text-2xl font-black text-zinc-900 mt-1">{alliancesSummary.totalAlliances}</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">1816–2012 recorded span</div>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
            <div className="text-xs text-emerald-700 font-medium flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Type I: Defense Pacts
            </div>
            <div className="text-2xl font-black text-emerald-900 mt-1">
              {alliancesSummary.types.defense}
            </div>
            <div className="text-[11px] text-emerald-600 mt-0.5">
              {((alliancesSummary.types.defense / alliancesSummary.totalAlliances) * 100).toFixed(1)}% of all treaties (e.g. NATO)
            </div>
          </div>

          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
            <div className="text-xs text-amber-700 font-medium flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5" /> Type II: Non-Aggression
            </div>
            <div className="text-2xl font-black text-amber-900 mt-1">
              {alliancesSummary.types.nonaggression}
            </div>
            <div className="text-[11px] text-amber-600 mt-0.5">
              {((alliancesSummary.types.nonaggression / alliancesSummary.totalAlliances) * 100).toFixed(1)}% (Promise not to attack)
            </div>
          </div>

          <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-100">
            <div className="text-xs text-indigo-700 font-medium flex items-center gap-1.5">
              <Handshake className="w-3.5 h-3.5" /> Type III: Ententes
            </div>
            <div className="text-2xl font-black text-indigo-900 mt-1">
              {alliancesSummary.types.entente}
            </div>
            <div className="text-[11px] text-indigo-600 mt-0.5">
              {((alliancesSummary.types.entente / alliancesSummary.totalAlliances) * 100).toFixed(1)}% (Crisis consultation)
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-zinc-200 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-zinc-900 text-white'
              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          <Scale className="w-4 h-4" />
          Timeline & Typology
        </button>

        <button
          onClick={() => setActiveTab('canonical')}
          className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'canonical'
              ? 'bg-zinc-900 text-white'
              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          <Award className="w-4 h-4" />
          12 Canonical Case Studies
        </button>

        <button
          onClick={() => setActiveTab('table')}
          className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'table'
              ? 'bg-zinc-900 text-white'
              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          <Search className="w-4 h-4" />
          Search All 414 Alliances
          <span className="text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded-full font-bold ml-1">
            {filteredAlliances.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('theory')}
          className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'theory'
              ? 'bg-zinc-900 text-white'
              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          IR Theory: Alliance Dilemmas
        </button>
      </div>

      {/* TAB 1: OVERVIEW & TIMELINES */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Typology Breakdown Explainer */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-zinc-900">COW Alliance Typology & Strategic Commitments</h3>
                <p className="text-zinc-600 text-sm mt-1">
                  How political scientists categorize formal interstate agreements according to the depth of commitment
                </p>
              </div>
              <div className="text-xs text-zinc-500 bg-zinc-100 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                Singer & Small / Gibler Framework
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Defense Pact */}
              <div
                onClick={() => {
                  setSelectedCategory('Defense');
                  setActiveTab('table');
                }}
                className="cursor-pointer group p-5 rounded-2xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 transition-all hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-200 text-emerald-900">
                    Type I
                  </span>
                  <span className="text-sm font-bold text-emerald-800">
                    {alliancesSummary.types.defense} Treaties
                  </span>
                </div>
                <h4 className="text-lg font-bold text-emerald-950 mt-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  Defense Pact
                </h4>
                <p className="text-emerald-800 text-xs mt-2 leading-relaxed">
                  The strongest commitment: signatories pledge to militarily intervene on behalf of an ally if the ally is attacked by a third state.
                </p>
                <div className="mt-4 pt-3 border-t border-emerald-200/60 text-[11px] text-emerald-700 flex items-center justify-between font-semibold">
                  <span>Examples: NATO, Warsaw Pact, Triple Alliance</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Non-Aggression */}
              <div
                onClick={() => {
                  setSelectedCategory('Non-Aggression');
                  setActiveTab('table');
                }}
                className="cursor-pointer group p-5 rounded-2xl border border-amber-200 bg-amber-50/50 hover:bg-amber-50 transition-all hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-200 text-amber-900">
                    Type IIa / IIb
                  </span>
                  <span className="text-sm font-bold text-amber-800">
                    {alliancesSummary.types.nonaggression} Treaties
                  </span>
                </div>
                <h4 className="text-lg font-bold text-amber-950 mt-3 flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-amber-600" />
                  Non-Aggression Pact
                </h4>
                <p className="text-amber-800 text-xs mt-2 leading-relaxed">
                  Signatories pledge not to attack one another, to refrain from force, and to settle disputes peacefully (frequently used for strategic delay or buck-passing).
                </p>
                <div className="mt-4 pt-3 border-t border-amber-200/60 text-[11px] text-amber-700 flex items-center justify-between font-semibold">
                  <span>Examples: Molotov-Ribbentrop, German-Polish Pact</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Entente */}
              <div
                onClick={() => {
                  setSelectedCategory('Entente');
                  setActiveTab('table');
                }}
                className="cursor-pointer group p-5 rounded-2xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 transition-all hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-indigo-200 text-indigo-900">
                    Type III
                  </span>
                  <span className="text-sm font-bold text-indigo-800">
                    {alliancesSummary.types.entente} Treaties
                  </span>
                </div>
                <h4 className="text-lg font-bold text-indigo-950 mt-3 flex items-center gap-2">
                  <Handshake className="w-5 h-5 text-indigo-600" />
                  Entente
                </h4>
                <p className="text-indigo-800 text-xs mt-2 leading-relaxed">
                  Signatories pledge to consult each other and coordinate joint diplomatic or strategic postures in the event of an international crisis or threat.
                </p>
                <div className="mt-4 pt-3 border-t border-indigo-200/60 text-[11px] text-indigo-700 flex items-center justify-between font-semibold">
                  <span>Examples: Entente Cordiale (1904), Anglo-Russian (1907)</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Timeline Chart (Decade vs Active Systems) */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  Historical Evolution of Alliances (1816–2012)
                </h3>
                <p className="text-zinc-600 text-sm mt-1">
                  {timelineMode === 'decades'
                    ? 'New formal alliances concluded per decade across 200 years of international politics'
                    : 'Systemic density: total formal alliances concurrently active in the international system'}
                </p>
              </div>

              {/* View Switcher */}
              <div className="flex bg-zinc-100 p-1 rounded-xl text-xs font-semibold self-start sm:self-auto">
                <button
                  onClick={() => setTimelineMode('decades')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    timelineMode === 'decades'
                      ? 'bg-white text-zinc-900 shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  New Treaties by Decade
                </button>
                <button
                  onClick={() => setTimelineMode('active')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    timelineMode === 'active'
                      ? 'bg-white text-zinc-900 shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  System-Wide Active Curve
                </button>
              </div>
            </div>

            {/* Decade Bar Chart */}
            {timelineMode === 'decades' ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs font-semibold text-zinc-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-emerald-500 inline-block" /> Defense Pacts
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-amber-500 inline-block" /> Non-Aggression
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-indigo-500 inline-block" /> Ententes
                  </span>
                </div>

                <div className="grid grid-cols-7 sm:grid-cols-11 md:grid-cols-21 gap-1.5 items-end h-64 pt-6 pb-2 border-b border-zinc-200">
                  {alliancesDecades.map(d => {
                    const heightPercent = Math.max((d.total / maxDecadeTotal) * 100, 6);
                    const defShare = d.total > 0 ? (d.defense / d.total) * 100 : 0;
                    const nonAggShare = d.total > 0 ? (d.nonaggression / d.total) * 100 : 0;
                    const entShare = d.total > 0 ? (d.entente / d.total) * 100 : 0;

                    return (
                      <div
                        key={d.decade}
                        className="group relative flex flex-col justify-end items-center h-full"
                      >
                        {/* Tooltip */}
                        <div className="absolute -top-16 hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                          <div className="bg-zinc-900 text-white text-[10px] p-2 rounded-lg shadow-xl whitespace-nowrap">
                            <div className="font-bold">{d.decade}: {d.total} Alliances</div>
                            <div className="text-emerald-300">Defense: {d.defense}</div>
                            <div className="text-amber-300">Non-Aggression: {d.nonaggression}</div>
                            <div className="text-indigo-300">Entente: {d.entente}</div>
                          </div>
                          <div className="w-2 h-2 bg-zinc-900 rotate-45 -mt-1" />
                        </div>

                        {/* Stacked bar */}
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className="w-full rounded-t flex flex-col-reverse overflow-hidden transition-all group-hover:opacity-90 group-hover:scale-105"
                        >
                          <div style={{ height: `${defShare}%` }} className="bg-emerald-500 w-full" />
                          <div style={{ height: `${nonAggShare}%` }} className="bg-amber-500 w-full" />
                          <div style={{ height: `${entShare}%` }} className="bg-indigo-500 w-full" />
                        </div>

                        <span className="text-[9px] text-zinc-500 font-medium rotate-45 sm:rotate-0 mt-2 truncate w-full text-center">
                          {d.decade.replace('18', '’').replace('19', '’').replace('20', '’')}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-xs text-zinc-600 flex items-start gap-3">
                  <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Historical Insight:</strong> Notice the massive spike in alliance formation during the <strong>1920s and 1930s</strong> (interwar bilateral pacts and security guarantees) followed by the Cold War proliferation in the <strong>1940s and 1950s</strong> (NATO, Warsaw Pact, SEATO, CENTO, ANZUS). The <strong>1990s post-Cold War surge</strong> (61 new treaties) reflects the peaceful dissolution of the Soviet bloc and successor state security agreements (CSTO, bilateral friendship pacts).
                  </div>
                </div>
              </div>
            ) : (
              /* System-Wide Active Alliances Curve */
              <div className="space-y-4">
                <div className="h-64 flex items-end gap-[1px] pt-6 pb-2 border-b border-zinc-200">
                  {alliancesAnnualActive.map(pt => {
                    const heightPercent = Math.max((pt.total / maxActiveTotal) * 100, 3);
                    const isKeyYear = [1816, 1871, 1914, 1939, 1949, 1991, 2012].includes(pt.year);

                    return (
                      <div
                        key={pt.year}
                        className="group relative flex-1 flex flex-col justify-end items-center h-full"
                      >
                        {/* Tooltip */}
                        <div className="absolute -top-16 hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                          <div className="bg-zinc-900 text-white text-[10px] p-2 rounded-lg shadow-xl whitespace-nowrap">
                            <div className="font-bold">{pt.year}: {pt.total} Active Alliances</div>
                            <div className="text-emerald-300">Defense: {pt.defense}</div>
                            <div className="text-amber-300">Non-Aggression: {pt.nonaggression}</div>
                            <div className="text-indigo-300">Entente: {pt.entente}</div>
                          </div>
                          <div className="w-2 h-2 bg-zinc-900 rotate-45 -mt-1" />
                        </div>

                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full transition-all ${
                            isKeyYear
                              ? 'bg-indigo-600'
                              : 'bg-indigo-300/60 hover:bg-indigo-500'
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between text-xs text-zinc-500 font-medium">
                  <span>1816 (Concert of Europe)</span>
                  <span>1914 (WWI Outbreak)</span>
                  <span>1939 (WWII)</span>
                  <span>1949 (NATO Formed)</span>
                  <span>1991 (USSR Collapse)</span>
                  <span>2012 (Modern Era)</span>
                </div>

                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-xs text-zinc-600 flex items-start gap-3">
                  <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Systemic Density Finding:</strong> The total number of active formal treaties in force rose from fewer than 10 in the early 19th century to over 130 simultaneously active alliances during the late Cold War and post-Cold War era, demonstrating the progressive institutionalization of international security.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Top 20 Signatory States Matrix */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-indigo-600" />
                  Top Alliance Signatory Nations (Diplomatic History)
                </h3>
                <p className="text-zinc-600 text-sm mt-1">
                  Click on any country to filter and view all formal alliances involving that state
                </p>
              </div>
              {selectedCountryFilter && (
                <button
                  onClick={() => setSelectedCountryFilter('')}
                  className="text-xs text-red-600 font-semibold hover:underline self-start sm:self-auto"
                >
                  Clear filter ({selectedCountryFilter})
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
              {alliancesSummary.topStates.map((st, idx) => {
                const isSelected = selectedCountryFilter.toLowerCase() === st.state.toLowerCase();
                return (
                  <button
                    key={st.state}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedCountryFilter('');
                      } else {
                        setSelectedCountryFilter(st.state);
                        setActiveTab('table');
                      }
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                        : 'bg-zinc-50/70 hover:bg-zinc-100/80 border-zinc-200 text-zinc-900'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] text-zinc-500 font-semibold">
                        #{idx + 1}
                      </div>
                      <div className="text-xs font-bold truncate max-w-[110px]">
                        {st.state}
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-lg font-black ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-indigo-100 text-indigo-900'
                      }`}
                    >
                      {st.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 12 CANONICAL CASE STUDIES */}
      {activeTab === 'canonical' && (
        <div className="space-y-6">
          <div className="bg-indigo-50/70 rounded-3xl p-6 border border-indigo-100">
            <h3 className="text-lg font-bold text-indigo-950 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              Canonical Alliances in International Relations Theory
            </h3>
            <p className="text-indigo-800 text-sm mt-1 max-w-3xl leading-relaxed">
              These 12 landmark treaties form the core empirical foundations of theories on <strong>Balance of Power</strong>, <strong>Chain-Ganging</strong>, <strong>Buck-Passing</strong>, and the <strong>Abandonment vs. Entrapment Dilemma</strong> taught in POL SCI 102.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {canonicalAlliancesList.map(alliance => {
              const record = alliancesAll.find(a => a.id === alliance.id);
              return (
                <div
                  key={alliance.id}
                  className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm flex flex-col justify-between gap-5 hover:border-indigo-300 transition-all hover:shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          alliance.type === 'Defense Pact'
                            ? 'bg-emerald-100 text-emerald-800'
                            : alliance.type === 'Non-Aggression'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-indigo-100 text-indigo-800'
                        }`}
                      >
                        {alliance.type}
                      </span>
                      <span className="text-xs text-zinc-400 font-mono font-medium">
                        COW #{alliance.id} • {alliance.year}–{alliance.endYear}
                      </span>
                    </div>

                    <h4 className="text-lg font-extrabold text-zinc-900 leading-snug">
                      {alliance.title}
                    </h4>

                    {/* Members */}
                    <div className="text-xs text-zinc-600">
                      <span className="font-semibold text-zinc-800">Members: </span>
                      {alliance.members.join(', ')}
                    </div>

                    {/* IR Concepts Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {alliance.irConcepts.map(c => (
                        <span
                          key={c}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-zinc-100 text-zinc-700 border border-zinc-200"
                        >
                          {c}
                        </span>
                      ))}
                    </div>

                    {/* Strategic Purpose */}
                    <div className="text-xs text-zinc-700 bg-zinc-50 p-3.5 rounded-2xl border border-zinc-100 leading-relaxed">
                      <strong className="text-zinc-900 block mb-1">Strategic Logic:</strong>
                      {alliance.strategicPurpose}
                    </div>

                    {/* Historical Outcome */}
                    <div className="text-xs text-zinc-600 leading-relaxed">
                      <strong className="text-zinc-900">Empirical Outcome: </strong>
                      {alliance.historicalOutcome}
                    </div>
                  </div>

                  {record && (
                    <button
                      onClick={() => setSelectedAlliance(record)}
                      className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all mt-2"
                    >
                      <Users className="w-3.5 h-3.5" />
                      View Full Treaty Record & Members
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: SEARCHABLE MASTER TABLE */}
      {activeTab === 'table' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search by treaty name, signatory country (e.g. France, Japan), or ID..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={e => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm font-medium bg-white text-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Treaty Types</option>
                <option value="Defense">Type I: Defense Pacts</option>
                <option value="Non-Aggression">Type II: Non-Aggression</option>
                <option value="Entente">Type III: Ententes</option>
              </select>

              {/* Era Filter */}
              <select
                value={selectedEra}
                onChange={e => {
                  setSelectedEra(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm font-medium bg-white text-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Historical Eras</option>
                <option value="19th">19th Century (1816–1913)</option>
                <option value="pre-ww1">Pre-WWI Blocs (1871–1914)</option>
                <option value="interwar">Interwar Period (1919–1939)</option>
                <option value="coldwar">Cold War Era (1945–1991)</option>
                <option value="postcoldwar">Post-Cold War (1991–2012)</option>
              </select>

              {(searchQuery || selectedCategory !== 'all' || selectedEra !== 'all' || selectedCountryFilter) && (
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 transition-all self-center shrink-0"
                >
                  Reset
                </button>
              )}
            </div>

            {selectedCountryFilter && (
              <div className="flex items-center gap-2 text-xs bg-indigo-50 text-indigo-800 px-3 py-1.5 rounded-xl border border-indigo-200 w-fit">
                <span>Filtering by signatory: <strong>{selectedCountryFilter}</strong></span>
                <button
                  onClick={() => setSelectedCountryFilter('')}
                  className="text-indigo-600 hover:text-indigo-900 font-bold ml-1"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-zinc-500 px-1">
            <span>
              Showing {paginatedAlliances.length} of <strong>{filteredAlliances.length}</strong> matching alliances
            </span>
            <span>
              Page {currentPage} of {totalPages}
            </span>
          </div>

          {/* Table */}
          <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 text-zinc-700 font-semibold border-b border-zinc-200">
                  <tr>
                    <th className="py-3.5 px-4">COW ID</th>
                    <th className="py-3.5 px-4">Treaty / Coalition Name</th>
                    <th className="py-3.5 px-4">Typology</th>
                    <th className="py-3.5 px-4">Years Active</th>
                    <th className="py-3.5 px-4">Signatories</th>
                    <th className="py-3.5 px-4 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-zinc-700">
                  {paginatedAlliances.map(a => {
                    return (
                      <tr
                        key={a.id}
                        onClick={() => setSelectedAlliance(a)}
                        className="hover:bg-zinc-50/80 cursor-pointer transition-colors"
                      >
                        <td className="py-3.5 px-4 font-mono font-medium text-zinc-500">
                          #{a.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-zinc-900 max-w-xs md:max-w-md truncate">
                            {a.name}
                          </div>
                          <div className="text-[11px] text-zinc-400 mt-0.5">
                            {a.members.length} member state{a.members.length !== 1 ? 's' : ''}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              a.category === 'Defense Pact'
                                ? 'bg-emerald-100 text-emerald-800'
                                : a.category === 'Non-Aggression'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-indigo-100 text-indigo-800'
                            }`}
                          >
                            {a.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-zinc-600">
                          {a.startYear || 'N/A'} – {a.endYear || (a.isOngoing ? 'Ongoing' : 'N/A')}
                        </td>
                        <td className="py-3.5 px-4 max-w-xs truncate text-zinc-600">
                          {a.members.slice(0, 3).join(', ')}
                          {a.members.length > 3 && ` +${a.members.length - 3} more`}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              setSelectedAlliance(a);
                            }}
                            className="text-indigo-600 hover:text-indigo-800 font-semibold text-xs flex items-center gap-1 ml-auto"
                          >
                            Inspect <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-zinc-100 flex items-center justify-between">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="px-3 py-1.5 rounded-lg border border-zinc-200 text-xs font-semibold text-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-50 flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Previous
                </button>

                <div className="text-xs font-semibold text-zinc-600">
                  Page {currentPage} of {totalPages}
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="px-3 py-1.5 rounded-lg border border-zinc-200 text-xs font-semibold text-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-50 flex items-center gap-1"
                >
                  Next <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: IR THEORETICAL PRIMER */}
      {activeTab === 'theory' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Theories of Alliances in POL SCI 102
            </h3>
            <p className="text-zinc-600 text-sm leading-relaxed max-w-3xl">
              In international relations, alliances represent formal commitments to security cooperation. However, neorealist and rationalist scholars emphasize that alliances are inherently dangerous, unstable, and fraught with strategic trade-offs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-100">
              {/* Concept 1: Balance of Power vs Bandwagoning */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3">
                <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Kenneth Waltz / Stephen Walt
                </div>
                <h4 className="text-base font-bold text-zinc-900">
                  Balancing vs. Bandwagoning
                </h4>
                <p className="text-zinc-600 text-xs leading-relaxed">
                  <strong>Balancing:</strong> States ally with others against the principal threat or rising hegemon to preserve their autonomy (e.g., Britain joining France and Russia in 1904/1907 against imperial Germany).
                </p>
                <p className="text-zinc-600 text-xs leading-relaxed">
                  <strong>Bandwagoning:</strong> Weaker states ally with the stronger, threatening power to share the spoils of victory or avoid conquest (historically far rarer among Great Powers).
                </p>
              </div>

              {/* Concept 2: The Alliance Dilemma */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3">
                <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Glenn Snyder (1984, 1997)
                </div>
                <h4 className="text-base font-bold text-zinc-900">
                  The Entrapment vs. Abandonment Dilemma
                </h4>
                <p className="text-zinc-600 text-xs leading-relaxed">
                  Allied states face an inescapable trade-off:
                </p>
                <ul className="text-zinc-600 text-xs space-y-1.5 list-disc pl-4">
                  <li>
                    <strong>Fear of Abandonment:</strong> If your commitment appears too weak, your ally may defect, surrender, or form a separate peace with your rival.
                  </li>
                  <li>
                    <strong>Fear of Entrapment:</strong> If your commitment is too absolute, your ally may behave recklessly, dragging you into an unwanted war over their peripheral interests.
                  </li>
                </ul>
              </div>

              {/* Concept 3: Chain-Ganging vs Buck-Passing */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3">
                <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Thomas Christensen & Jack Snyder (1990)
                </div>
                <h4 className="text-base font-bold text-zinc-900">
                  Chain-Ganging vs. Buck-Passing
                </h4>
                <p className="text-zinc-600 text-xs leading-relaxed">
                  <strong>Chain-Ganging (1914):</strong> When offense is perceived to have the advantage in multipolarity, states tie their survival unconditionally to their allies. When Austria-Hungary attacked Serbia, Germany was chain-ganged into World War I.
                </p>
                <p className="text-zinc-600 text-xs leading-relaxed">
                  <strong>Buck-Passing (1930s):</strong> When defense is perceived to dominate, states attempt to let others bear the cost of confronting the aggressor (e.g., Britain and France hoping the USSR would absorb Hitler\'s blows, and Stalin signing the 1939 Pact to pass the buck back).
                </p>
              </div>

              {/* Concept 4: Extended Deterrence & Tripwires */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3">
                <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Thomas Schelling / James Fearon
                </div>
                <h4 className="text-base font-bold text-zinc-900">
                  Credibility, Costly Signals & Tripwires
                </h4>
                <p className="text-zinc-600 text-xs leading-relaxed">
                  Words on parchment are "cheap talk." To make defense guarantees credible to adversaries, states must generate <strong>costly signals</strong>:
                </p>
                <ul className="text-zinc-600 text-xs space-y-1.5 list-disc pl-4">
                  <li>
                    <strong>Tripwire Forces:</strong> Stationing troops on an ally\'s border (e.g., U.S. forces in Berlin during the Cold War or at the Korean DMZ) guarantees immediate casualties in an attack, removing the option of retreat.
                  </li>
                  <li>
                    <strong>Audience Costs:</strong> Public treaty commitments risk national reputation if broken, tying leaders\' hands.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL MODAL: Selected Alliance */}
      {selectedAlliance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-zinc-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span
                  className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                    selectedAlliance.category === 'Defense Pact'
                      ? 'bg-emerald-100 text-emerald-800'
                      : selectedAlliance.category === 'Non-Aggression'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-indigo-100 text-indigo-800'
                  }`}
                >
                  {selectedAlliance.ssType}
                </span>
                <h3 className="text-xl md:text-2xl font-black text-zinc-900 mt-2">
                  {selectedAlliance.name}
                </h3>
                <div className="text-xs text-zinc-500 font-mono mt-1">
                  Correlates of War Dataset ID: #{selectedAlliance.id}
                </div>
              </div>

              <button
                onClick={() => setSelectedAlliance(null)}
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Core Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-100 text-xs">
              <div>
                <span className="text-zinc-500 block">Treaty Inception:</span>
                <span className="font-bold text-zinc-900 text-sm">{selectedAlliance.startYear || 'N/A'}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Termination:</span>
                <span className="font-bold text-zinc-900 text-sm">
                  {selectedAlliance.endYear || (selectedAlliance.isOngoing ? 'Still Active' : 'Censored')}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block">Total Signatories:</span>
                <span className="font-bold text-zinc-900 text-sm">{selectedAlliance.memberCount} states</span>
              </div>
            </div>

            {/* Commitments Checklist */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                Formal Treaty Obligations (COW Coding)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className={`p-2.5 rounded-xl border text-center text-xs font-bold ${
                  selectedAlliance.defense ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-zinc-50 text-zinc-400 border-zinc-200'
                }`}>
                  {selectedAlliance.defense ? '✓ Defense' : '✗ No Defense'}
                </div>
                <div className={`p-2.5 rounded-xl border text-center text-xs font-bold ${
                  selectedAlliance.nonaggression ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-zinc-50 text-zinc-400 border-zinc-200'
                }`}>
                  {selectedAlliance.nonaggression ? '✓ Non-Aggression' : '✗ No Non-Agg'}
                </div>
                <div className={`p-2.5 rounded-xl border text-center text-xs font-bold ${
                  selectedAlliance.entente ? 'bg-indigo-50 text-indigo-800 border-indigo-200' : 'bg-zinc-50 text-zinc-400 border-zinc-200'
                }`}>
                  {selectedAlliance.entente ? '✓ Entente' : '✗ No Entente'}
                </div>
                <div className={`p-2.5 rounded-xl border text-center text-xs font-bold ${
                  selectedAlliance.neutrality ? 'bg-purple-50 text-purple-800 border-purple-200' : 'bg-zinc-50 text-zinc-400 border-zinc-200'
                }`}>
                  {selectedAlliance.neutrality ? '✓ Neutrality' : '✗ No Neutrality'}
                </div>
              </div>
            </div>

            {/* Signatory Members List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-zinc-700 uppercase tracking-wider flex items-center justify-between">
                <span>Participating States ({selectedAlliance.memberDetails.length})</span>
                <span className="text-[10px] text-zinc-400 font-normal">State Name & COW Code</span>
              </h4>
              <div className="max-h-56 overflow-y-auto divide-y divide-zinc-100 rounded-2xl border border-zinc-200 bg-white">
                {selectedAlliance.memberDetails.map((m, idx) => (
                  <div key={idx} className="p-3 text-xs flex items-center justify-between hover:bg-zinc-50">
                    <div className="font-semibold text-zinc-900 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      {m.state}
                    </div>
                    <div className="text-right text-zinc-500 font-mono text-[11px]">
                      <span>Code: {m.ccode}</span>
                      {m.startYear && (
                        <span className="ml-3 text-zinc-400">
                          ({m.startYear}–{m.endYear || 'Present'})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedAlliance(null)}
                className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs rounded-xl transition-all"
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
