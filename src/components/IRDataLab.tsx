import { useState } from 'react';
import { MIDExplorer } from './datasets/MIDExplorer';
import { AlliancesExplorer } from './datasets/AlliancesExplorer';
import { DCADExplorer } from './datasets/DCADExplorer';
import { TerritorialChangesExplorer } from './datasets/TerritorialChangesExplorer';
import { CINCPowerExplorer } from './datasets/CINCPowerExplorer';
import { ArmsTechExplorer } from './datasets/ArmsTechExplorer';
import { TradeExplorer } from './datasets/TradeExplorer';
import { UCDPConflictExplorer } from './datasets/UCDPConflictExplorer';
import { DemocraticPeaceExplorer } from './datasets/DemocraticPeaceExplorer';
import { SIPRIMilitaryExplorer } from './datasets/SIPRIMilitaryExplorer';
import {
  Database,
  Swords,
  Handshake,
  Shield,
  Globe2,
  Scale,
  Cpu,
  Ship,
  ShieldCheck,
  DollarSign,
  Download,
  FolderArchive,
  ChevronDown,
  Layers,
  Sparkles
} from 'lucide-react';

export type DatasetSubTab =
  | 'mid'
  | 'alliances'
  | 'dcad'
  | 'terr-changes'
  | 'cinc'
  | 'arms-tech'
  | 'trade'
  | 'ucdp'
  | 'democratic-peace'
  | 'sipri';

export function IRDataLab() {
  const [activeSubTab, setActiveSubTab] = useState<DatasetSubTab>('mid');
  const [showDownloads, setShowDownloads] = useState(false);

  const datasetTabs = [
    {
      id: 'mid',
      title: 'Correlates of War (COW): MID 5.0',
      shortTitle: 'MID 5.0 Disputes',
      icon: Swords,
      tag: '1816–2014',
      badge: '2,436 Disputes',
      color: 'hover:border-red-500/50'
    },
    {
      id: 'alliances',
      title: 'COW Formal Interstate Alliances v4.1',
      shortTitle: 'COW Alliances v4.1',
      icon: Handshake,
      tag: '1816–2012',
      badge: '414 Treaties',
      color: 'hover:border-blue-500/50'
    },
    {
      id: 'dcad',
      title: 'Kinne Defense Cooperation Agreements (DCAD)',
      shortTitle: 'Kinne DCA (1980–2010)',
      icon: Shield,
      tag: '1980–2010',
      badge: '1,871 Agreements',
      color: 'hover:border-sky-500/50'
    },
    {
      id: 'terr-changes',
      title: 'COW Territorial Changes Dataset (v6)',
      shortTitle: 'Territorial Changes v6',
      icon: Globe2,
      tag: '1816–2018',
      badge: '842 Transfers',
      color: 'hover:border-emerald-500/50'
    },
    {
      id: 'cinc',
      title: 'COW National Material Capabilities (NMC v7.0)',
      shortTitle: 'NMC v7.0 (CINC)',
      icon: Scale,
      tag: '1816–2025',
      badge: 'Power Transitions',
      color: 'hover:border-indigo-500/50'
    },
    {
      id: 'arms-tech',
      title: 'COW Conventional Arms & Military Tech (v1.1)',
      shortTitle: 'Arms Tech v1.1',
      icon: Cpu,
      tag: '1816–2026',
      badge: '31 Innovations',
      color: 'hover:border-purple-500/50'
    },
    {
      id: 'trade',
      title: 'COW Bilateral & National Trade (v4.0)',
      shortTitle: 'COW Trade 4.0',
      icon: Ship,
      tag: '1870–2014',
      badge: 'Commercial Peace',
      color: 'hover:border-amber-500/50'
    },
    {
      id: 'ucdp',
      title: 'UCDP / PRIO Armed Conflicts',
      shortTitle: 'UCDP Conflicts',
      icon: Swords,
      tag: '1946–2023',
      badge: 'Civil vs Interstate',
      color: 'hover:border-rose-500/50'
    },
    {
      id: 'democratic-peace',
      title: 'Democratic Peace & Polity5 Regimes',
      shortTitle: 'Democratic Peace',
      icon: ShieldCheck,
      tag: 'Dyadic Law',
      badge: 'Dem vs Aut',
      color: 'hover:border-cyan-500/50'
    },
    {
      id: 'sipri',
      title: 'SIPRI Global Military Expenditure',
      shortTitle: 'SIPRI Budgets',
      icon: DollarSign,
      tag: '1950–2024',
      badge: '$2.44T Record',
      color: 'hover:border-emerald-500/50'
    },
  ];

  const rawDownloads = [
    { name: 'COW Militarized Interstate Disputes (MID 5.0)', filename: 'MID-5-Data-and-Supporting-Materials__2__f1d2f47e.zip', path: '/public/assets/aistudio/MID-5-Data-and-Supporting-Materials__2__f1d2f47e.zip', size: '3.2 MB' },
    { name: 'COW Formal Interstate Alliances (v4.1)', filename: 'version4.1_csv__1__a2422bb3.zip', path: '/public/assets/aistudio/version4.1_csv__1__a2422bb3.zip', size: '1.1 MB' },
    { name: 'Kinne Defense Cooperation Agreements (DCAD v1.0)', filename: 'kinne_dca_2606f0f0.zip', path: '/public/assets/aistudio/kinne_dca_2606f0f0.zip', size: '37 MB' },
    { name: 'COW Territorial Changes Dataset (v6)', filename: 'terr-changes-v6_84934110.zip', path: '/public/assets/aistudio/terr-changes-v6_84934110.zip', size: '456 KB' },
    { name: 'COW National Material Capabilities (NMC v7.0)', filename: 'NMCv7__1__07b7396c.zip', path: '/public/assets/aistudio/NMCv7__1__07b7396c.zip', size: '4.9 MB' },
    { name: 'COW Conventional Arms & Military Tech (v1.1)', filename: 'Arms-TechnologyV1.1__1__7dcfeb82.zip', path: '/public/assets/aistudio/Arms-TechnologyV1.1__1__7dcfeb82.zip', size: '60 MB' },
    { name: 'COW National & Dyadic Trade Dataset (v4.0)', filename: 'COW_Trade_4.0__1__c44c4b5c.zip', path: '/public/assets/aistudio/COW_Trade_4.0__1__c44c4b5c.zip', size: '83 MB' }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-sm border border-zinc-800 relative">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <Database className="w-4 h-4 text-indigo-400" />
              Empirical Research & Quantitative Evidence Hub
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              International Relations Datasets Lab
            </h1>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              Explore authentic, peer-reviewed datasets used by political scientists to test theories of war, deterrence, alliance formation, territorial conflict, military technology diffusion, and economic interdependence. Featuring 7 official raw datasets with full codebooks and zero-latency in-browser interactive explorers.
            </p>
          </div>

          {/* Raw Downloads Dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={() => setShowDownloads(prev => !prev)}
              className="px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-indigo-900/40 w-full sm:w-auto"
            >
              <FolderArchive className="w-4 h-4" />
              <span>Download Raw Datasets (7)</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showDownloads ? 'rotate-180' : ''}`} />
            </button>

            {showDownloads && (
              <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl p-2 z-50 space-y-1">
                <div className="px-3 py-2 text-[11px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
                  Select Dataset Archive (ZIP)
                </div>
                {rawDownloads.map(d => (
                  <a
                    key={d.filename}
                    href={d.path}
                    download={d.filename}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-800 text-xs text-zinc-200 group transition-colors"
                  >
                    <div className="truncate pr-2">
                      <div className="font-semibold text-white group-hover:text-indigo-300 truncate">
                        {d.name}
                      </div>
                      <div className="text-[10px] text-zinc-500 font-mono">{d.size} • Full Archive & Codebook</div>
                    </div>
                    <Download className="w-4 h-4 text-zinc-400 group-hover:text-white shrink-0" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dataset Sub-Tabs Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-8">
          {datasetTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as DatasetSubTab)}
                className={`p-3 rounded-2xl text-left transition-all border flex flex-col justify-between gap-2.5 ${
                  isActive
                    ? 'bg-white text-zinc-900 border-white shadow-lg font-bold'
                    : `bg-black/30 hover:bg-black/50 text-zinc-300 border-white/10 ${tab.color}`
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-indigo-400'}`} />
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-semibold ${
                    isActive ? 'bg-indigo-100 text-indigo-900' : 'bg-white/10 text-zinc-300'
                  }`}>
                    {tab.tag}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-bold leading-tight">{tab.shortTitle}</div>
                  <div className={`text-[10px] mt-0.5 ${isActive ? 'text-indigo-700' : 'text-zinc-400'}`}>
                    {tab.badge}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Dataset Component */}
      <div>
        {activeSubTab === 'mid' && <MIDExplorer />}
        {activeSubTab === 'alliances' && <AlliancesExplorer />}
        {activeSubTab === 'dcad' && <DCADExplorer />}
        {activeSubTab === 'terr-changes' && <TerritorialChangesExplorer />}
        {activeSubTab === 'cinc' && <CINCPowerExplorer />}
        {activeSubTab === 'arms-tech' && <ArmsTechExplorer />}
        {activeSubTab === 'trade' && <TradeExplorer />}
        {activeSubTab === 'ucdp' && <UCDPConflictExplorer />}
        {activeSubTab === 'democratic-peace' && <DemocraticPeaceExplorer />}
        {activeSubTab === 'sipri' && <SIPRIMilitaryExplorer />}
      </div>
    </div>
  );
}
