import { useState, useMemo } from 'react';
import {
  dcadMeta,
  dcadCategories,
  dcadAnnualSeries,
  dcadTopSignatories,
  dcadAllRecords,
  canonicalDcaList,
  DcadRecord,
  CanonicalDca
} from '../../data/irDatasets';
import {
  FileText,
  Search,
  Download,
  Filter,
  Shield,
  Layers,
  ChevronRight,
  ChevronLeft,
  X,
  ExternalLink,
  Info,
  Calendar,
  Crosshair,
  TrendingUp,
  Cpu,
  GraduationCap
} from 'lucide-react';

export function DCADExplorer() {
  const [activeSubTab, setActiveSubTab] = useState<'analytics' | 'cases' | 'browser'>('analytics');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState<DcadRecord | null>(null);
  const [activeCase, setActiveCase] = useState<CanonicalDca>(canonicalDcaList[0]);

  const itemsPerPage = 25;

  // Filter records
  const filteredRecords = useMemo(() => {
    return dcadAllRecords.filter(r => {
      const matchSearch =
        searchQuery === '' ||
        r.c1.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.c2.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === 'all' || r.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(start, start + itemsPerPage);
  }, [filteredRecords, currentPage]);

  const maxAnnualCount = Math.max(...dcadAnnualSeries.map(d => d.count), 1);

  return (
    <div className="space-y-6">
      {/* Top Banner & Metadata */}
      <div className="bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/70 border border-blue-800/40 rounded-xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                Kinne DCAD v1.0
              </span>
              <span className="text-xs text-zinc-400">1980–2010 Database</span>
              <span className="text-xs text-zinc-400">•</span>
              <span className="text-xs text-emerald-400 font-medium">1,871 Formal Agreements</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Kinne Defense Cooperation Agreements (DCAD)
            </h2>
            <p className="text-sm text-zinc-300 mt-1 max-w-3xl leading-relaxed">
              Created by Prof. Brandon J. Kinne (UC Davis / Harvard), the Defense Cooperation Agreement Dataset (DCAD) documents 
              all formal, legally binding bilateral defense pacts outside of traditional mutual defense alliances—capturing how modern states 
              build defense ties through joint exercises, basing rights, intelligence sharing, and defense industrial collaboration.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <a
              href="/public/assets/aistudio/kinne_dca_2606f0f0.zip"
              download="kinne_dca_2606f0f0.zip"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors shadow"
              title="Download original DCAD archive"
            >
              <Download className="w-4 h-4" />
              Raw DCAD ZIP
            </a>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-blue-900/40 text-xs">
          <div>
            <div className="text-zinc-400">Total Treaties</div>
            <div className="text-lg font-bold text-white">{dcadMeta.totalAgreements.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-zinc-400">Dominant Category</div>
            <div className="text-lg font-bold text-blue-300">General DCAs (52.5%)</div>
          </div>
          <div>
            <div className="text-zinc-400">Armaments / DIC</div>
            <div className="text-lg font-bold text-amber-300">340 Agreements</div>
          </div>
          <div>
            <div className="text-zinc-400">Top Hub Nation</div>
            <div className="text-lg font-bold text-emerald-300">United States (260+)</div>
          </div>
        </div>
      </div>

      {/* Sub-tab navigation */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
        <button
          onClick={() => setActiveSubTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeSubTab === 'analytics'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Typology & Growth Analytics
        </button>
        <button
          onClick={() => setActiveSubTab('cases')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeSubTab === 'cases'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          Pedagogical Case Studies ({canonicalDcaList.length})
        </button>
        <button
          onClick={() => setActiveSubTab('browser')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeSubTab === 'browser'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
          }`}
        >
          <Search className="w-4 h-4" />
          Master DCAD Browser ({filteredRecords.length.toLocaleString()})
        </button>
      </div>

      {/* 1. ANALYTICS VIEW */}
      {activeSubTab === 'analytics' && (
        <div className="space-y-6">
          {/* Theoretical Framing Callout */}
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800/80 text-zinc-300 text-xs leading-relaxed flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-semibold">IR Theory Insight — DCAs vs. Formal Alliances:</strong>{' '}
              Traditional Realist scholarship focused exclusively on formal military alliances (e.g. COW mutual defense pacts). 
              However, since 1980, while formal treaties stagnated due to fears of entrapment and high sovereignty costs, 
              bilateral <span className="text-blue-300 font-semibold">Defense Cooperation Agreements (DCAs)</span> surged 10-fold. 
              Kinne demonstrates that DCAs allow states to build institutionalized military ties, standardize logistics, 
              and signal alignment to rivals without incurring the rigid legal obligation of automatic wartime entry.
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {dcadCategories.map(cat => (
              <div
                key={cat.key}
                onClick={() => {
                  setSelectedCategory(cat.key);
                  setActiveSubTab('browser');
                }}
                className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-blue-500/50 hover:bg-zinc-850 cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                    {cat.key}
                  </span>
                  <span className="text-xs text-zinc-400 font-medium">{cat.count} ({cat.pct}%)</span>
                </div>
                <h4 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                  {cat.label}
                </h4>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  {cat.desc}
                </p>
                <div className="mt-3 flex items-center gap-1 text-[11px] text-blue-400 group-hover:translate-x-0.5 transition-transform">
                  <span>Browse agreements</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>

          {/* Temporal Evolution & Top Signatories */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Annual Series Chart */}
            <div className="lg:col-span-2 p-5 rounded-xl bg-zinc-900/70 border border-zinc-800/80">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    Annual Proliferation of Bilateral DCAs (1980–2010)
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Surge following the end of the Cold War and expanding NATO Partnership for Peace (PfP)
                  </p>
                </div>
              </div>

              {/* Bar timeline */}
              <div className="h-44 flex items-end gap-1.5 pt-6 pb-2 border-b border-zinc-800">
                {dcadAnnualSeries.map(item => {
                  const heightPct = (item.count / maxAnnualCount) * 100;
                  return (
                    <div
                      key={item.year}
                      className="flex-1 flex flex-col items-center group relative h-full justify-end"
                    >
                      <div
                        style={{ height: `${Math.max(heightPct, 4)}%` }}
                        className="w-full bg-blue-600/70 group-hover:bg-blue-400 rounded-t transition-all"
                      />
                      {/* Tooltip */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                        <div className="bg-zinc-800 text-white text-[11px] font-mono px-2 py-0.5 rounded shadow-lg border border-zinc-700 whitespace-nowrap">
                          {item.year}: {item.count} treaties
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[11px] text-zinc-500 font-mono mt-2">
                <span>1980 (Cold War bipolarity)</span>
                <span>1991 (Soviet Collapse)</span>
                <span>2001 (War on Terror)</span>
                <span>2010</span>
              </div>
            </div>

            {/* Top Signatories List */}
            <div className="p-5 rounded-xl bg-zinc-900/70 border border-zinc-800/80">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
                <Crosshair className="w-4 h-4 text-emerald-400" />
                Top Bilateral Hub States
              </h3>
              <p className="text-xs text-zinc-400 mb-3">Total bilateral agreements signed</p>

              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {dcadTopSignatories.map((st, idx) => (
                  <div
                    key={st.country}
                    onClick={() => {
                      setSearchQuery(st.country);
                      setActiveSubTab('browser');
                    }}
                    className="flex items-center justify-between text-xs p-1.5 rounded hover:bg-zinc-800/60 cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono text-[11px] text-zinc-500 w-4">{idx + 1}.</span>
                      <span className="text-zinc-200 group-hover:text-blue-300 font-medium truncate">
                        {st.country}
                      </span>
                    </div>
                    <span className="font-mono font-semibold text-blue-400 bg-blue-900/30 px-2 py-0.5 rounded text-[11px]">
                      {st.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PEDAGOGICAL CASE STUDIES */}
      {activeSubTab === 'cases' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List of cases */}
          <div className="space-y-2 lg:col-span-1">
            <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Select Canonical Agreement
            </div>
            {canonicalDcaList.map(item => (
              <div
                key={item.title}
                onClick={() => setActiveCase(item)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all text-left ${
                  activeCase.title === item.title
                    ? 'bg-blue-950/60 border-blue-500/80 shadow-md shadow-blue-900/20'
                    : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                  <span>{item.year}</span>
                  <span className="text-blue-400 font-mono font-medium">{item.category.split('/')[0]}</span>
                </div>
                <div className="text-xs font-bold text-white leading-snug">{item.title}</div>
                <div className="text-[11px] text-zinc-400 mt-1">{item.countries.join(' ↔ ')}</div>
              </div>
            ))}
          </div>

          {/* Active Case Detail */}
          <div className="lg:col-span-2 p-6 rounded-xl bg-zinc-900/80 border border-zinc-800/80 space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {activeCase.year} Agreement
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/30">
                  {activeCase.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {activeCase.title}
              </h3>
              <div className="text-xs text-zinc-400 mt-1 flex items-center gap-2">
                <span>Signatories:</span>
                <span className="text-zinc-200 font-medium">{activeCase.countries.join(' and ')}</span>
              </div>
            </div>

            {/* IR Concepts */}
            <div>
              <div className="text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">
                Core IR Theoretical Concepts
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

            {/* Strategic Purpose */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                Strategic & Geopolitical Purpose
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/50 p-3.5 rounded-lg border border-zinc-800">
                {activeCase.strategicPurpose}
              </p>
            </div>

            {/* Pedagogical Takeaway */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                Pedagogical Takeaway for Students
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed bg-emerald-950/20 p-3.5 rounded-lg border border-emerald-900/30">
                {activeCase.pedagogicalTakeaway}
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex justify-end">
              <button
                onClick={() => {
                  setSearchQuery(activeCase.countries[0]);
                  setActiveSubTab('browser');
                }}
                className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium"
              >
                <span>Filter database for {activeCase.countries[0]} agreements</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. MASTER DCAD BROWSER */}
      {activeSubTab === 'browser' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-zinc-900/70 p-3 rounded-xl border border-zinc-800">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by state name (e.g. United States, Germany, Poland) or ID..."
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
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
              <Filter className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <select
                value={selectedCategory}
                onChange={e => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Categories ({dcadAllRecords.length})</option>
                {dcadCategories.map(c => (
                  <option key={c.key} value={c.key}>
                    {c.key} - {c.label} ({c.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Stats */}
          <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
            <span>
              Showing <strong className="text-white">{filteredRecords.length.toLocaleString()}</strong> agreements
              {searchQuery && <span> matching "{searchQuery}"</span>}
            </span>
            <span>
              Page {currentPage} of {Math.max(totalPages, 1)}
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/60 shadow-md">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px] font-semibold tracking-wider border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-4">DCA ID</th>
                  <th className="py-3 px-4">State 1</th>
                  <th className="py-3 px-4">State 2</th>
                  <th className="py-3 px-4">Year</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Source</th>
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
                    <td className="py-2.5 px-4 font-mono text-zinc-400 text-[11px]">{r.id}</td>
                    <td className="py-2.5 px-4 font-medium text-white">{r.c1}</td>
                    <td className="py-2.5 px-4 font-medium text-white">{r.c2}</td>
                    <td className="py-2.5 px-4 font-mono text-blue-300">{r.year}</td>
                    <td className="py-2.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-blue-900/30 text-blue-300 border border-blue-800/40">
                        {r.category}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-zinc-400 capitalize">{r.type || 'Bilateral'}</td>
                    <td className="py-2.5 px-4 text-zinc-400 truncate max-w-[120px]">{r.source}</td>
                    <td className="py-2.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRecord(r);
                        }}
                        className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 text-[11px]"
                      >
                        Details <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {paginatedRecords.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-10 text-center text-zinc-500">
                      No agreements found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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

      {/* Record Inspector Modal */}
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
              <span className="text-xs font-mono text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">
                {selectedRecord.id}
              </span>
              <h3 className="text-lg font-bold text-white mt-2">
                {selectedRecord.c1} & {selectedRecord.c2}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Signed in {selectedRecord.year} • Type: {selectedRecord.type || 'Bilateral'}
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                <div className="text-zinc-500 text-[10px] uppercase font-semibold">Agreement Category</div>
                <div className="text-white font-medium mt-0.5">{selectedRecord.categoryLabel} ({selectedRecord.category})</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                  <div className="text-zinc-500 text-[10px] uppercase font-semibold">State 1 (COW ccode)</div>
                  <div className="text-white font-medium mt-0.5">{selectedRecord.c1} ({selectedRecord.ccode1})</div>
                </div>
                <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                  <div className="text-zinc-500 text-[10px] uppercase font-semibold">State 2 (COW ccode)</div>
                  <div className="text-white font-medium mt-0.5">{selectedRecord.c2} ({selectedRecord.ccode2})</div>
                </div>
              </div>

              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                <div className="text-zinc-500 text-[10px] uppercase font-semibold">Data Source & Documentation</div>
                <div className="text-zinc-300 mt-0.5">{selectedRecord.source}</div>
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
