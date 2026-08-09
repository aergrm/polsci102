import { useState } from 'react';
import { History, ShieldAlert, Layers, Scale, ChevronRight, Calendar, Info, Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../../lib/soundEffects';

interface CaseStudy {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  category: 'Cold War Crisis' | 'Peace Negotiation' | 'Nuclear Non-Proliferation' | 'Alliance Politics';
  summary: string;
  fearonBargainingLink: {
    mechanism: 'Information Asymmetry' | 'Commitment Problem' | 'Issue Indivisibility';
    explanation: string;
  };
  levelsOfAnalysisBreakdown: {
    systemic: string;
    domestic: string;
    individual: string;
  };
  outcome: string;
  keyTakeaway: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'cuban-missile-1962',
    year: '1962',
    title: 'Cuban Missile Crisis',
    subtitle: '13 Days on the Brink of Nuclear War',
    category: 'Cold War Crisis',
    summary: 'The Soviet Union secretly deployed nuclear ballistic missiles in Cuba. The United States discovered the sites and implemented a naval quarantine, bringing the two superpowers to the edge of nuclear exchange.',
    fearonBargainingLink: {
      mechanism: 'Information Asymmetry',
      explanation: 'Uncertainty over resolve and secret deployment created severe miscalculation risks. Signals (e.g. naval quarantine, DEFCON 2 mobilization) were used to reveal true cost-tolerances without triggering immediate war.'
    },
    levelsOfAnalysisBreakdown: {
      systemic: 'Bipolar nuclear rivalry and the balance of power following US Jupiter missile deployments in Turkey.',
      domestic: 'ExComm deliberation, US military pressure vs. Soviet politburo internal dynamics and military signaling.',
      individual: 'Secret back-channel communications between John F. Kennedy and Nikita Khrushchev, and individual risk-tolerances.'
    },
    outcome: 'Peaceful resolution via a public pledge not to invade Cuba and a secret agreement to remove US Jupiter missiles from Turkey.',
    keyTakeaway: 'Demonstrates how secret back-channels and high-cost signaling can overcome information asymmetry in nuclear crises.'
  },
  {
    id: 'dayton-1995',
    year: '1995',
    title: 'Dayton Accords',
    subtitle: 'Ending the Bosnian War',
    category: 'Peace Negotiation',
    summary: 'Interstate and inter-ethnic conflict following the breakup of Yugoslavia. US-led diplomacy at Wright-Patterson Air Force Base forced leaders from Bosnia, Croatia, and Serbia to negotiate a constitution and territorial split.',
    fearonBargainingLink: {
      mechanism: 'Commitment Problem',
      explanation: 'Combatants could not credibly commit to honoring peace agreements post-disarmament without an external third-party guarantor. NATO peacekeeping forces (IFOR/SFOR) served as the vital enforcer.'
    },
    levelsOfAnalysisBreakdown: {
      systemic: 'Post-Cold War US unipolarity and NATO intervention capability reshaping Balkan regional dynamics.',
      domestic: 'Ethnic nationalism, territorial claims, and domestic political pressures in Sarajevo, Zagreb, and Belgrade.',
      individual: 'Personalities and diplomatic bargaining strategies of Richard Holbrooke, Alija Izetbegović, Franjo Tuđman, and Slobodan Milošević.'
    },
    outcome: 'Creation of a single sovereign state of Bosnia and Herzegovina composed of two entities enforced by NATO troops.',
    keyTakeaway: 'Third-party enforcement is frequently required to solve commitment problems when belligerents disarm.'
  },
  {
    id: 'jcpoa-2015',
    year: '2015',
    title: 'JCPOA Iran Nuclear Deal',
    subtitle: 'Multilateral Non-Proliferation Bargaining',
    category: 'Nuclear Non-Proliferation',
    summary: 'The P5+1 (US, UK, France, Russia, China + Germany) negotiated a comprehensive agreement with Iran to restrict its nuclear program in exchange for international economic sanctions relief.',
    fearonBargainingLink: {
      mechanism: 'Commitment Problem',
      explanation: 'Verifiable inspection regimes (IAEA snap inspections) were required to ensure compliance. However, domestic changes in leadership (US withdrawal in 2018) highlighted domestic commitment vulnerabilities.'
    },
    levelsOfAnalysisBreakdown: {
      systemic: 'Global non-proliferation regime maintenance and middle-eastern regional balance of power.',
      domestic: 'Congressional opposition in the US, hardline vs. moderate faction politics in Tehran.',
      individual: 'Diplomatic alignment and rapport between Secretary of State John Kerry and Iranian Foreign Minister Javad Zarif.'
    },
    outcome: 'Temporary halt to high-grade uranium enrichment in exchange for lifted sanctions, later disrupted by US unilateral exit.',
    keyTakeaway: 'International institutional monitoring can resolve monitoring gaps, but domestic political shifts threaten long-term commitment credibility.'
  },
  {
    id: 'july-crisis-1914',
    year: '1914',
    title: 'The July Crisis & WWI Outbreak',
    subtitle: 'Entangling Alliances & Cult of the Offensive',
    category: 'Alliance Politics',
    summary: 'Following the assassination of Archduke Franz Ferdinand in Sarajevo, a cascade of mobilization schedules, rigid alliance commitments, and offensive military doctrines dragged European empires into World War I.',
    fearonBargainingLink: {
      mechanism: 'Commitment Problem',
      explanation: 'First-mover advantages in railway mobilization created severe incentive for preventative war before rivals could fully field their armies.'
    },
    levelsOfAnalysisBreakdown: {
      systemic: 'Multipolar alliance systems (Triple Entente vs. Triple Alliance) and power transitions between imperial powers.',
      domestic: 'Socio-political pressures, military influence over civilian leadership, and nationalistic press fervor.',
      individual: 'Kaiser Wilhelm II, Tsar Nicholas II (Willy-Nicky telegrams), and diplomatic missteps across European capitals.'
    },
    outcome: 'Catastrophic global conflict resulting in over 20 million deaths and the collapse of four major empires.',
    keyTakeaway: 'Offense-dominant perceptions and rapid mobilization incentives shrink the peaceful bargaining space to zero.'
  }
];

export function CrisisTimeline() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(caseStudies[0].id);
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getMuted());

  const activeCase = caseStudies.find(c => c.id === selectedCaseId) || caseStudies[0];

  const handleSelectCase = (id: string) => {
    soundManager.playClick();
    setSelectedCaseId(id);
  };

  const handleToggleMute = () => {
    const nextMuted = soundManager.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs uppercase tracking-wider mb-1">
            <History className="w-4 h-4" />
            Empirical Case Studies & Crisis Frameworks
          </div>
          <h2 className="text-2xl font-bold text-zinc-900">Historical Crisis Timeline Explorer</h2>
          <p className="text-xs text-zinc-600 mt-1">
            Connect real-world international crises directly to Fearon's Rationalist Bargaining model and the Levels of Analysis.
          </p>
        </div>

        <button
          onClick={handleToggleMute}
          className="p-2.5 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start md:self-auto"
          title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-indigo-600" />}
          <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Audio On'}</span>
        </button>
      </div>

      {/* Interactive Timeline Bar */}
      <div className="relative pt-4 pb-2">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-indigo-100 -translate-y-1/2 z-0 rounded-full" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
          {caseStudies.map((item) => {
            const isActive = item.id === selectedCaseId;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectCase(item.id)}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  isActive
                    ? 'bg-indigo-950 text-white border-indigo-900 shadow-md ring-2 ring-indigo-500 ring-offset-2'
                    : 'bg-white text-zinc-800 border-zinc-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className={`px-2 py-0.5 rounded-md ${
                    isActive ? 'bg-indigo-800 text-indigo-200' : 'bg-zinc-100 text-indigo-700'
                  }`}>
                    {item.year}
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider ${
                    isActive ? 'text-indigo-300' : 'text-zinc-500'
                  }`}>
                    {item.category.split(' ')[0]}
                  </span>
                </div>
                <div className="text-xs font-extrabold truncate mt-2">{item.title}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Case Detail Card */}
      <div className="space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 md:p-8 space-y-3 relative overflow-hidden border border-indigo-900/50">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-indigo-500/30 border border-indigo-400/40 rounded-full text-indigo-200 text-xs font-bold uppercase tracking-wider">
              {activeCase.year} Event
            </span>
            <span className="text-indigo-300 text-xs font-semibold">
              {activeCase.category}
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">{activeCase.title}</h3>
          <p className="text-indigo-200 text-sm font-medium">{activeCase.subtitle}</p>
          <p className="text-zinc-300 text-xs leading-relaxed pt-2 border-t border-indigo-800/60 max-w-3xl">
            {activeCase.summary}
          </p>
        </div>

        {/* 2-Column Analytical Framework Comparison */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Column 1: Fearon Bargaining Connection */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
              <Scale className="w-4 h-4 text-amber-700" />
              Fearon Bargaining Framework Connection
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-amber-200/80 text-amber-950 text-xs font-extrabold rounded-lg mb-2">
                Primary Mechanism: {activeCase.fearonBargainingLink.mechanism}
              </span>
              <p className="text-xs text-amber-900 leading-relaxed font-medium">
                {activeCase.fearonBargainingLink.explanation}
              </p>
            </div>
            <div className="pt-3 border-t border-amber-200/60 text-[11px] font-semibold text-amber-800">
              💡 Insight: Demonstrates why rational state decision-makers struggled to establish a peaceful settlement window without structural guarantees.
            </div>
          </div>

          {/* Column 2: Levels of Analysis Breakdown */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
              <Layers className="w-4 h-4 text-emerald-700" />
              Levels of Analysis Breakdown
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-white/80 rounded-xl border border-emerald-200/60">
                <span className="font-bold text-indigo-900 block mb-0.5">🌐 Systemic (Global Structure):</span>
                <span className="text-zinc-700">{activeCase.levelsOfAnalysisBreakdown.systemic}</span>
              </div>
              <div className="p-2.5 bg-white/80 rounded-xl border border-emerald-200/60">
                <span className="font-bold text-emerald-900 block mb-0.5">🏛️ Domestic (State / Regime):</span>
                <span className="text-zinc-700">{activeCase.levelsOfAnalysisBreakdown.domestic}</span>
              </div>
              <div className="p-2.5 bg-white/80 rounded-xl border border-emerald-200/60">
                <span className="font-bold text-amber-900 block mb-0.5">👤 Individual (Leader / Psychology):</span>
                <span className="text-zinc-700">{activeCase.levelsOfAnalysisBreakdown.individual}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Outcome & Takeaway */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-zinc-900 uppercase tracking-wide">Historical Outcome</div>
            <div className="text-xs text-zinc-700 font-medium">{activeCase.outcome}</div>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 px-4 py-3 rounded-xl max-w-md text-xs text-indigo-950 font-semibold">
            <span className="text-indigo-700 font-bold block mb-0.5">Key Theoretical Takeaway:</span>
            {activeCase.keyTakeaway}
          </div>
        </div>
      </div>
    </div>
  );
}
