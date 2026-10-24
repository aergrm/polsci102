import { useState } from 'react';
import { MIDExplorer } from './datasets/MIDExplorer';
import { UCDPConflictExplorer } from './datasets/UCDPConflictExplorer';
import { CINCPowerExplorer } from './datasets/CINCPowerExplorer';
import { DemocraticPeaceExplorer } from './datasets/DemocraticPeaceExplorer';
import { SIPRIMilitaryExplorer } from './datasets/SIPRIMilitaryExplorer';
import {
  Database,
  Swords,
  Globe2,
  Scale,
  ShieldCheck,
  DollarSign,
  Download,
  FileSpreadsheet,
  BookOpen
} from 'lucide-react';

type DatasetSubTab = 'mid' | 'ucdp' | 'cinc' | 'democratic-peace' | 'sipri';

export function IRDataLab() {
  const [activeSubTab, setActiveSubTab] = useState<DatasetSubTab>('mid');

  const datasetTabs = [
    {
      id: 'mid',
      title: 'Correlates of War (COW): MID 5.0',
      shortTitle: 'MID 5.0 Disputes',
      icon: Swords,
      tag: '1816–2014',
      badge: '2,436 Disputes',
      desc: 'Militarized Interstate Disputes: Threats, displays, uses of force, and interstate wars'
    },
    {
      id: 'ucdp',
      title: 'UCDP / PRIO Armed Conflicts',
      shortTitle: 'UCDP Armed Conflicts',
      icon: Globe2,
      tag: '1946–2023',
      badge: 'Interstate vs Civil',
      desc: 'Transformation of armed violence from interstate warfare to intrastate and internationalized civil wars'
    },
    {
      id: 'cinc',
      title: 'COW National Material Capabilities (CINC)',
      shortTitle: 'Power Capabilities (CINC)',
      icon: Scale,
      tag: '1820–2020',
      badge: 'Power Transitions',
      desc: 'Composite Index of National Capability tracking Great Power rises, peaks, and power parity zones'
    },
    {
      id: 'democratic-peace',
      title: 'Democratic Peace & Polity5 Regimes',
      shortTitle: 'Democratic Peace',
      icon: ShieldCheck,
      tag: 'Dyadic Analysis',
      badge: 'Dem vs Aut',
      desc: 'Empirical law of dyadic conflict and Samuel Huntington\'s Three Waves of Democratization'
    },
    {
      id: 'sipri',
      title: 'SIPRI Global Military Expenditure',
      shortTitle: 'SIPRI Defense Budgets',
      icon: DollarSign,
      tag: '1950–2024',
      badge: '$2.44 Trillion Record',
      desc: 'Global defense spending trends, the 2% of GDP NATO threshold, and top 10 military spenders'
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-sm border border-zinc-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <Database className="w-4 h-4 text-indigo-400" />
              Empirical Research & Quantitative Evidence Hub
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              International Relations Datasets Lab
            </h1>
            <p className="text-zinc-300 text-sm md:text-base max-w-2xl leading-relaxed">
              Explore authentic, peer-reviewed datasets used by political scientists to test theories of war, peace, deterrence, and political economy. Includes the complete Correlates of War MID 5.0 dataset, UCDP/PRIO conflict records, COW CINC scores, Democratic Peace dyads, and SIPRI military budgets.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <a
              href="/assets/aistudio/MID-5-Data-and-Supporting-Materials__2__f1d2f47e.zip"
              download
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-semibold flex items-center gap-2 transition-all backdrop-blur-md"
            >
              <Download className="w-4 h-4 text-indigo-300" />
              Download Raw MID 5.0 Zip
            </a>
            <div className="text-[11px] text-zinc-400 text-center md:text-right">
              Official COW Codebook & CSVs Included
            </div>
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
                className={`p-3.5 rounded-2xl text-left transition-all border flex flex-col justify-between gap-3 ${
                  isActive
                    ? 'bg-white text-zinc-900 border-white shadow-lg font-bold'
                    : 'bg-black/30 hover:bg-black/50 text-zinc-300 border-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-indigo-400'}`} />
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
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
        {activeSubTab === 'ucdp' && <UCDPConflictExplorer />}
        {activeSubTab === 'cinc' && <CINCPowerExplorer />}
        {activeSubTab === 'democratic-peace' && <DemocraticPeaceExplorer />}
        {activeSubTab === 'sipri' && <SIPRIMilitaryExplorer />}
      </div>
    </div>
  );
}
