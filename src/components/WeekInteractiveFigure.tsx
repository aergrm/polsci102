import { useState } from 'react';
import {
  TrendingUp,
  Shield,
  Scale,
  Swords,
  Globe2,
  DollarSign,
  Activity,
  Flame,
  Info,
  Layers,
  ArrowRight,
  Users,
  Building2,
  Target,
  Repeat,
  GitFork,
  Calendar,
  Clock,
  Sparkles,
  BookOpen,
  AlertCircle,
  ChevronRight,
  Milestone,
  CheckCircle2,
  History
} from 'lucide-react';
import {
  cincCapabilitiesData,
  ucdpPrioArmedConflicts,
  democraticPeaceDyads,
  sipriSpendingTrends,
  regimeWavesData
} from '../data/irDatasets';
import { TradeSankeyDiagram } from './datasets/TradeSankeyDiagram';

interface InteractiveFigureProps {
  week: number;
  title: string;
}

export function WeekInteractiveFigure({ week, title }: InteractiveFigureProps) {
  // Render authentic empirical interactive visualizers tailored directly to each week's scholarly topic
  if (week === 1) {
    // Week 1: Kenneth Waltz Three Images & J. David Singer Levels of Analysis Diagnostic
    return <LevelsOfAnalysisVisualizer week={week} />;
  }

  if (week === 2) {
    // Week 2: Historical Evolution of Modern World Politics & Order-Building (1815–2026)
    return <HistoricalOrderEvolutionVisualizer week={week} />;
  }

  if (week === 3 || week === 9) {
    // The Democratic Peace Law & Huntington's Waves of Democratization (Polity5)
    return <DemocraticPeaceVisualizer week={week} />;
  }

  if (week === 4 || week === 6) {
    // Security Dilemma & Jervis 2x2 Offense-Defense Interactive Matrix
    return <OffenseDefenseMatrixVisualizer week={week} />;
  }

  if (week === 5 || week === 15) {
    // Fearon Rationalist Bargaining Space with Interactive Probability & War Cost Sliders
    return <FearonBargainingVisualizer week={week} />;
  }

  if (week === 7) {
    // Formal Alliance Networks vs Bilateral DCAs (COW v4.1 & Kinne DCAD)
    return <AllianceTypologyVisualizer week={week} />;
  }

  if (week === 8) {
    // Allison's Three Models of Foreign Policy Decision-Making (RAM vs Org vs Bureaucracy)
    return <AllisonBureaucracyVisualizer week={week} />;
  }

  if (week === 10) {
    // UCDP / PRIO Intrastate vs Interstate Warfare Transformation (1946–2023)
    return <UcdpConflictTrendVisualizer week={week} />;
  }

  if (week === 11) {
    // Neoliberal Institutionalism & Axelrod's Shadow of the Future Cooperation Simulator
    return <InstitutionalCooperationVisualizer week={week} />;
  }

  if (week === 12 || week === 13) {
    // Commercial Peace & Global Trade Expansion vs Protectionist Collapses (1870–2014)
    return <TradeInterdependenceVisualizer week={week} />;
  }

  if (week === 14) {
    // SIPRI Global Defense Expenditure & Nuclear Era Budgets ($2.44T Record)
    return <SipriSpendingVisualizer week={week} />;
  }

  // Fallback to Levels of Analysis
  return <LevelsOfAnalysisVisualizer week={week} />;
}

// =========================================================================
// 1A. LEVELS OF ANALYSIS DIAGNOSTIC VISUALIZER (Week 1)
// =========================================================================
function LevelsOfAnalysisVisualizer({ week }: { week: number }) {
  const [selectedCase, setSelectedCase] = useState<string>('ukraine');
  const [activeFilter, setActiveFilter] = useState<'all' | 'systemic' | 'domestic' | 'individual'>('all');

  const cases = [
    {
      id: 'ukraine',
      name: '2022 Russia-Ukraine War',
      date: '2022–Present',
      systemic: {
        title: 'Level 3: Systemic / Structural (Third Image)',
        core: 'NATO Eastward Expansion & Anarchic Balancing: Realists (John Mearsheimer) argue that great powers react aggressively when adversarial military alliances expand directly to their borders. Under international anarchy, Russia perceived Ukraine\'s Western integration as an existential threat to its strategic depth.',
        author: 'John Mearsheimer / Kenneth Waltz',
        badge: 'Structural Realism',
        color: 'border-indigo-500/40 bg-indigo-50/50 text-indigo-950',
        badgeColor: 'bg-indigo-100 text-indigo-800'
      },
      domestic: {
        title: 'Level 2: State / Domestic Regime (Second Image)',
        core: 'Autocratic Regime Survival & Political Economy: Michael McFaul and Kathryn Stoner argue the invasion was driven by Russian domestic politics: a corrupt autocratic regime threatened by a flourishing democracy on its border that could inspire political opposition at home. Rentier energy revenues provided financial insulation.',
        author: 'Michael McFaul / Kathryn Stoner',
        badge: 'Regime Type & Internal Politics',
        color: 'border-emerald-500/40 bg-emerald-50/50 text-emerald-950',
        badgeColor: 'bg-emerald-100 text-emerald-800'
      },
      individual: {
        title: 'Level 1: Individual / Psychology (First Image)',
        core: 'Vladimir Putin\'s Historical Obsession & Echo Chamber: Decision-making was concentrated in an isolated leader obsessed with imperial Russian history (July 2021 essay denying Ukrainian statehood). COVID isolation and hardline siloviki advisers created severe confirmation bias and gross underestimation of Ukrainian resolve.',
        author: 'Fiona Hill / Robert Jervis',
        badge: 'Cognitive Bias & Leader Hubris',
        color: 'border-amber-500/40 bg-amber-50/50 text-amber-950',
        badgeColor: 'bg-amber-100 text-amber-800'
      }
    },
    {
      id: 'ww1',
      name: '1914 Outbreak of World War I',
      date: 'July 1914',
      systemic: {
        title: 'Level 3: Systemic / Structural (Third Image)',
        core: 'Rigid Bipolar Alliances & Cult of the Offensive: The Triple Entente balanced against the Triple Alliance. In an offense-dominant military environment with rigid railway mobilization timetables, states believed striking first was critical, turning a localized Balkan crisis into systemic world war.',
        author: 'Stephen Van Evera / Kenneth Waltz',
        badge: 'Alliance Entrapment & Offense-Dominance',
        color: 'border-indigo-500/40 bg-indigo-50/50 text-indigo-950',
        badgeColor: 'bg-indigo-100 text-indigo-800'
      },
      domestic: {
        title: 'Level 2: State / Domestic Regime (Second Image)',
        core: 'The "Marriage of Iron and Rye": Fritz Fischer and Jack Snyder argue that Imperial Germany\'s fragile domestic coalition between conservative Prussian Junkers and heavy industrialists pushed for aggressive imperial expansion to suppress rising domestic socialist democracy.',
        author: 'Fritz Fischer / Jack Snyder',
        badge: 'Domestic Coalition Pressures',
        color: 'border-emerald-500/40 bg-emerald-50/50 text-emerald-950',
        badgeColor: 'bg-emerald-100 text-emerald-800'
      },
      individual: {
        title: 'Level 1: Individual / Psychology (First Image)',
        core: 'Royal Personalities & Monarchical Blunders: Kaiser Wilhelm II\'s erratic bluster, deep feelings of British slight, and personal "blank check" to Vienna; combined with Tsar Nicholas II\'s vacillating orders and the cognitive delusion that war would be brief.',
        author: 'Holger Herwig / Robert Jervis',
        badge: 'Monarchical Incompetence & Miscalculation',
        color: 'border-amber-500/40 bg-amber-50/50 text-amber-950',
        badgeColor: 'bg-amber-100 text-amber-800'
      }
    },
    {
      id: 'cuban',
      name: '1962 Cuban Missile Crisis',
      date: 'October 1962',
      systemic: {
        title: 'Level 3: Systemic / Structural (Third Image)',
        core: 'Nuclear Bipolarity & Missile Gap Rebalancing: The US possessed a 17:1 strategic nuclear advantage and had placed Jupiter missiles in Turkey. Deploying Soviet R-12 missiles in Cuba was an attempt to rapidly rectify the strategic nuclear deficit and restore systemic deterrence.',
        author: 'Structural Neorealism',
        badge: 'Nuclear Bipolar Deterrence',
        color: 'border-indigo-500/40 bg-indigo-50/50 text-indigo-950',
        badgeColor: 'bg-indigo-100 text-indigo-800'
      },
      domestic: {
        title: 'Level 2: State / Domestic Regime (Second Image)',
        core: 'Bureaucratic Politics & Midterm Elections: Graham Allison\'s Models II & III: Soviet military services pushed for secret deployment without air cover; while JFK faced upcoming 1962 congressional elections where Republicans accused the administration of weakness on Cuba.',
        author: 'Graham Allison / Morton Halperin',
        badge: 'Bureaucratic Pulling & Hauling',
        color: 'border-emerald-500/40 bg-emerald-50/50 text-emerald-950',
        badgeColor: 'bg-emerald-100 text-emerald-800'
      },
      individual: {
        title: 'Level 1: Individual / Psychology (First Image)',
        core: 'JFK vs. Khrushchev Psychological Empathy: Kennedy learned from his Bay of Pigs failure and resisted military calls for immediate air strikes. Secret personal correspondence between JFK and Khrushchev established empathetic communication that permitted a face-saving diplomatic exit.',
        author: 'Alexander George / Robert Jervis',
        badge: 'Cognitive Learning & Crisis Empathy',
        color: 'border-amber-500/40 bg-amber-50/50 text-amber-950',
        badgeColor: 'bg-amber-100 text-amber-800'
      }
    },
    {
      id: 'iraq',
      name: '2003 US Invasion of Iraq',
      date: 'March 2003',
      systemic: {
        title: 'Level 3: Systemic / Structural (Third Image)',
        core: 'Unipolar Permissiveness: Following the collapse of the Soviet Union, the US enjoyed uncontested global hegemony. In a unipolar system, the hegemon faces no external balancing coalition to deter it from executing preventive military interventions.',
        author: 'Nuno Monteiro / Christopher Layne',
        badge: 'Unipolar Hegemony',
        color: 'border-indigo-500/40 bg-indigo-50/50 text-indigo-950',
        badgeColor: 'bg-indigo-100 text-indigo-800'
      },
      domestic: {
        title: 'Level 2: State / Domestic Regime (Second Image)',
        core: 'Ideological Think-Tanks & Post-9/11 Politics: Project for the New American Century (PNAC) neoconservative ideology captured the Pentagon (Rumsfeld, Wolfowitz). Post-9/11 public fear produced a massive rally-around-the-flag effect and bipartisan congressional authorization.',
        author: 'Mearsheimer & Walt / Chaim Kaufmann',
        badge: 'Ideological Capture & Media Framing',
        color: 'border-emerald-500/40 bg-emerald-50/50 text-emerald-950',
        badgeColor: 'bg-emerald-100 text-emerald-800'
      },
      individual: {
        title: 'Level 1: Individual / Psychology (First Image)',
        core: 'George W. Bush\'s Moralistic Paradigm: Bush viewed international politics in stark good-vs-evil binaries ("Axis of Evil"), suffered confirmation bias regarding unverified Iraqi WMD intelligence, and sought to resolve unfinished family business from the 1991 Gulf War.',
        author: 'James Dyson / Daniel Kahneman',
        badge: 'Moralist Heuristics & Motivated Bias',
        color: 'border-amber-500/40 bg-amber-50/50 text-amber-950',
        badgeColor: 'bg-amber-100 text-amber-800'
      }
    }
  ];

  const active = cases.find(c => c.id === selectedCase) || cases[0];

  return (
    <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-3">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600">
            Kenneth Waltz (1959) & J. David Singer (1961) · Levels of Analysis
          </span>
          <h3 className="text-base font-bold text-zinc-900 mt-0.5">
            The Three Images of International Relations: Diagnostic Framework
          </h3>
          <p className="text-xs text-zinc-600 mt-1">
            Toggle historical crises to see how causal explanations transform between systemic anarchy, state regime dynamics, and individual psychology.
          </p>
        </div>
      </div>

      {/* Case Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-xs font-mono font-bold text-zinc-500 mr-1 shrink-0">Case Study:</span>
        {cases.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedCase(c.id)}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedCase === c.id
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Level Filter Buttons */}
      <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl text-xs font-mono w-fit">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-2.5 py-1 rounded-lg transition-colors ${
            activeFilter === 'all' ? 'bg-white text-zinc-900 font-bold shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          All 3 Levels (Comparative)
        </button>
        <button
          onClick={() => setActiveFilter('systemic')}
          className={`px-2.5 py-1 rounded-lg transition-colors ${
            activeFilter === 'systemic' ? 'bg-indigo-600 text-white font-bold' : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Level 3: Systemic
        </button>
        <button
          onClick={() => setActiveFilter('domestic')}
          className={`px-2.5 py-1 rounded-lg transition-colors ${
            activeFilter === 'domestic' ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Level 2: Domestic
        </button>
        <button
          onClick={() => setActiveFilter('individual')}
          className={`px-2.5 py-1 rounded-lg transition-colors ${
            activeFilter === 'individual' ? 'bg-amber-600 text-white font-bold' : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Level 1: Individual
        </button>
      </div>

      {/* The 3 Image Diagnostic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
        {(activeFilter === 'all' || activeFilter === 'systemic') && (
          <div className="p-4 rounded-2xl border border-indigo-200 bg-indigo-50/60 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                  {active.systemic.badge}
                </span>
                <Globe2 className="w-4 h-4 text-indigo-600" />
              </div>
              <h4 className="text-xs font-bold text-indigo-950 font-mono uppercase tracking-wide">
                {active.systemic.title}
              </h4>
              <p className="text-xs text-zinc-700 leading-relaxed">
                {active.systemic.core}
              </p>
            </div>
            <div className="pt-3 border-t border-indigo-100/80 text-[11px] font-mono text-indigo-700 font-semibold">
              Scholarly Lead: {active.systemic.author}
            </div>
          </div>
        )}

        {(activeFilter === 'all' || activeFilter === 'domestic') && (
          <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {active.domestic.badge}
                </span>
                <Building2 className="w-4 h-4 text-emerald-600" />
              </div>
              <h4 className="text-xs font-bold text-emerald-950 font-mono uppercase tracking-wide">
                {active.domestic.title}
              </h4>
              <p className="text-xs text-zinc-700 leading-relaxed">
                {active.domestic.core}
              </p>
            </div>
            <div className="pt-3 border-t border-emerald-100/80 text-[11px] font-mono text-emerald-700 font-semibold">
              Scholarly Lead: {active.domestic.author}
            </div>
          </div>
        )}

        {(activeFilter === 'all' || activeFilter === 'individual') && (
          <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/60 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  {active.individual.badge}
                </span>
                <Users className="w-4 h-4 text-amber-600" />
              </div>
              <h4 className="text-xs font-bold text-amber-950 font-mono uppercase tracking-wide">
                {active.individual.title}
              </h4>
              <p className="text-xs text-zinc-700 leading-relaxed">
                {active.individual.core}
              </p>
            </div>
            <div className="pt-3 border-t border-amber-100/80 text-[11px] font-mono text-amber-700 font-semibold">
              Scholarly Lead: {active.individual.author}
            </div>
          </div>
        )}
      </div>

      {/* Synthesis Takeaway Card */}
      <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 space-y-1.5 leading-relaxed">
        <div className="font-bold flex items-center gap-1.5 text-zinc-900 font-mono">
          <Info className="w-4 h-4 text-indigo-600" />
          <span>Singer (1961) Methodological Rule:</span>
        </div>
        <p>
          Never commit the fallacy of single-level reductionism. <strong>Systemic constraints</strong> establish what states <em>can and cannot do</em> (the menu of strategic choices under anarchy); <strong>domestic regime dynamics</strong> shape which domestic interest coalition captures policy; and <strong>individual psychology</strong> explains the precise timing, tactical risk, and cognitive miscalculations of the actual human decision-maker.
        </p>
      </div>
    </div>
  );
}

// =========================================================================
// 1B. HISTORICAL EVOLUTION OF WORLD POLITICS & ORDER-BUILDING (Week 2)
// =========================================================================
function HistoricalOrderEvolutionVisualizer({ week }: { week: number }) {
  const [selectedEpochIdx, setSelectedEpochIdx] = useState<number>(2); // Default to Cold War 1945–1989

  const epochs = [
    {
      id: 'concert',
      years: '1815–1914',
      title: 'Concert of Europe & Pax Britannica',
      polarity: 'Multipolar Balance of Power (5–6 Great Powers)',
      orderType: 'Concert of Vienna: Balance of Power Equilibrium',
      hegemon: 'Great Britain (Naval Supremacy & Sterling Hegemony)',
      flashpoints: 'Crimean War (1853), Franco-Prussian War (1870), Scramble for Africa',
      fatalFlaw: 'Rising industrial/demographic might of unified Germany (1871) upset the balance, leading to rigid bipolar alliances (Triple Entente vs. Triple Alliance) and the 1914 catastrophe.',
      ikenberryThesis: 'Ikenberry (After Victory): 1815 succeeded because Castlereagh and Metternich practiced strategic restraint—integrating defeated France into the diplomatic concert rather than crushing it, preventing revenge revisionism for nearly a century.',
      kennanLesson: 'Diplomatic realism: Peace depends on maintaining flexible equilibrium where no single power can dominate the European heartland.',
      milestones: [
        { year: '1815', event: 'Congress of Vienna codifies European diplomatic balance after Napoleon' },
        { year: '1853', event: 'Crimean War fractures the conservative Holy Alliance' },
        { year: '1871', event: 'Unification of Germany creates an industrial titan at the center of Europe' },
        { year: '1884', event: 'Berlin Conference regulates European colonization of Africa' }
      ]
    },
    {
      id: 'interwar',
      years: '1914–1945',
      title: 'World Wars & The Interwar Institutional Breakdown',
      polarity: 'Fragmented Multipolarity & Aggressive Revisionist Blocs',
      orderType: 'Failed Collective Security (Versailles Treaty & League of Nations)',
      hegemon: 'None (US isolationism; British and French economic exhaustion)',
      flashpoints: 'Japanese invasion of Manchuria (1931), Italian invasion of Abyssinia (1935), Munich Crisis (1938)',
      fatalFlaw: 'Versailles imposed punitive economic and territorial terms on Germany without providing enforcement mechanisms. The US Senate rejected League membership, and the 1929 Great Depression triggered autarkic tariff wars (Smoot-Hawley).',
      ikenberryThesis: 'Ikenberry: Versailles was a catastrophic order-building failure. The victors attempted a punitive order without either military enforcement or institutional buy-in, creating intense revisionist grievances in Germany and Japan.',
      kennanLesson: 'Paper treaties without hard power enforcement fail. Disarmament pacts (Kellogg-Briand Pact 1928) cannot prevent totalitarian aggression.',
      milestones: [
        { year: '1914', event: 'Assassination of Archduke Franz Ferdinand triggers World War I' },
        { year: '1919', event: 'Treaty of Versailles creates the League of Nations' },
        { year: '1929', event: 'Wall Street Crash triggers the Great Depression and competitive protectionism' },
        { year: '1939', event: 'Molotov-Ribbentrop Pact and German invasion of Poland ignite WWII' }
      ]
    },
    {
      id: 'coldwar',
      years: '1945–1989',
      title: 'Cold War Bipolarity, Containment & Nuclear Peace',
      polarity: 'Rigid Bipolarity (US vs. Soviet Union)',
      orderType: 'Dual Orders: Western Multilateralism vs. Soviet Comecon/Warsaw Pact',
      hegemon: 'Dual Superpowers (United States & USSR Nuclear Duopoly)',
      flashpoints: 'Berlin Blockade (1948), Korean War (1950), Cuban Missile Crisis (1962), Vietnam War (1965)',
      fatalFlaw: 'Brinkmanship and devastating proxy conflicts in the Global South; nuclear arms racing; economic exhaustion of the command economy.',
      ikenberryThesis: 'Ikenberry: In 1945, the US pioneered liberal hegemonic order-building: using its massive 1945 power advantage (50% of world GDP) to bind itself through NATO, Bretton Woods, and the Marshall Plan, reassuring European partners through multilateral institutions.',
      kennanLesson: 'George F. Kennan (1947 "X Article"): Soviet expansionism is driven by domestic totalitarian insecurity. Kennan recommended patient, firm, and vigilant Containment at key geopolitical points, predicting the internal contradictions of communism would eventually cause collapse without World War III.',
      milestones: [
        { year: '1944', event: 'Bretton Woods conference founds IMF and the World Bank' },
        { year: '1945', event: 'UN Charter signed in San Francisco; US drops atomic bombs on Hiroshima/Nagasaki' },
        { year: '1947', event: 'Truman Doctrine & George Kennan\'s "Sources of Soviet Conduct"' },
        { year: '1949', event: 'NATO formed; Soviet Union tests atomic bomb; PRC established under Mao' },
        { year: '1955', event: 'Bandung Conference launches Non-Aligned Movement (Decolonization)' },
        { year: '1962', event: 'Cuban Missile Crisis reaches nuclear brink, prompting arms control treaties' }
      ]
    },
    {
      id: 'unipolar',
      years: '1989–2008',
      title: 'The Post-Cold War "Unipolar Moment" & Globalization',
      polarity: 'Unipolar Hegemony (United States as Sole Superpower)',
      orderType: 'Globalized Rules-Based Liberal Order (Washington Consensus)',
      hegemon: 'United States ("The Indispensable Nation")',
      flashpoints: 'Balkans Wars & Srebrenica (1990s), 1991 Gulf War, 9/11 Attacks, 2003 Iraq Invasion',
      fatalFlaw: 'Imperial overstretch in the Middle East; Russian resentment over eastward NATO enlargement; Chinese transition into mercantilist manufacturing powerhouse.',
      ikenberryThesis: 'Ikenberry: Following the 1991 Soviet collapse, the US expanded the 1945 Western order to become global—integrating former Soviet states, launching the WTO (1995), and welcoming China (2001) in the belief that trade would democratize competitors.',
      kennanLesson: 'In 1997, Kennan warned that expanding NATO eastward to Russia\'s borders would be "the most fateful error of American policy in the entire post-Cold War era," predicting it would inflame Russian nationalist revanchism.',
      milestones: [
        { year: '1989', event: 'Fall of the Berlin Wall and collapse of communist satellite regimes' },
        { year: '1991', event: 'Dissolution of the Soviet Union into 15 independent republics; Desert Storm' },
        { year: '1995', event: 'World Trade Organization (WTO) launched to enforce multilateral free trade' },
        { year: '2001', event: '9/11 Al-Qaeda attacks trigger global War on Terror; China joins the WTO' },
        { year: '2003', event: 'US invasion of Iraq without UN Security Council authorization' }
      ]
    },
    {
      id: 'multiplex',
      years: '2008–2026',
      title: 'Contested Order & Multiplex Great Power Rivalry',
      polarity: 'Asymmetric Multipolarity / US-China Dual Primacy with Middle Power Agency',
      orderType: 'Fragmented Multilateralism & Competing Minilateral Coalitions (Quad, BRICS+, AUKUS)',
      hegemon: 'Contested (US hegemonic leadership contested by China & Russia)',
      flashpoints: 'Russian invasions of Ukraine (2014 & 2022), Taiwan Strait, South China Sea, Middle East warfare',
      fatalFlaw: 'Paralysis of the UN Security Council through reciprocal vetoes; weaponized interdependence (SWIFT, export controls); retreat from free trade into economic nationalism.',
      ikenberryThesis: 'Ikenberry & Acharya: The world is now a "Multiplex Cinema"—multiple movies playing simultaneously. The US remains the dominant military power, but can no longer dictate global rules alone. Middle powers (India, Turkey, Brazil, Saudi Arabia) practice transactional hedging.',
      kennanLesson: 'Balance of power returns: Strategic patience and clear deterrence lines are required to manage competitive coexistence without spiraling into direct great-power warfare.',
      milestones: [
        { year: '2008', event: 'Global Financial Crisis undermines Western economic credibility' },
        { year: '2014', event: 'Russian annexation of Crimea fractures European post-Cold War borders' },
        { year: '2018', event: 'US-China trade and technology competition escalates into strategic rivalry' },
        { year: '2022', event: 'Full-scale Russian invasion of Ukraine; NATO expands to Sweden and Finland' },
        { year: '2024+', event: 'Expansion of BRICS+ alliance and strategic rivalry in AI and semiconductors' }
      ]
    }
  ];

  const activeEpoch = epochs[selectedEpochIdx];

  return (
    <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-3">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              Week 2 Empirical Timeline & Order-Building
            </span>
            <span className="text-xs text-zinc-500 font-mono">1815–2026 Historical Systems</span>
          </div>
          <h3 className="text-base font-bold text-zinc-900 mt-0.5">
            Historical Evolution of Modern World Politics: 1914, 1945, 1991 & 2026
          </h3>
          <p className="text-xs text-zinc-600 mt-1">
            Examine how systemic war and collapse reshape polarity, international law, and institutional order-building (Ikenberry & Kennan).
          </p>
        </div>
      </div>

      {/* Epoch Navigation Switcher */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {epochs.map((ep, idx) => {
          const isSelected = selectedEpochIdx === idx;
          return (
            <button
              key={ep.id}
              onClick={() => setSelectedEpochIdx(idx)}
              className={`p-3 rounded-xl text-left transition-all border flex flex-col justify-between gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-purple-900 text-white border-purple-900 shadow-sm font-bold'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  isSelected ? 'bg-purple-700 text-purple-100' : 'bg-zinc-200 text-zinc-700'
                }`}>
                  {ep.years}
                </span>
                <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-purple-300' : 'text-zinc-400'}`} />
              </div>
              <div className="text-xs font-bold leading-tight line-clamp-2">
                {ep.title.split(' & ')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Epoch Deep Dive Overview */}
      <div className="bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 text-white rounded-2xl p-5 border border-purple-800/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-300">
              Active Historical Epoch
            </span>
            <h4 className="text-xl font-black text-white mt-0.5">
              {activeEpoch.title} ({activeEpoch.years})
            </h4>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/30 text-purple-200 border border-purple-400/30 self-start sm:self-auto">
            {activeEpoch.polarity}
          </span>
        </div>

        {/* 4 Core Systemic Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="text-zinc-400 font-mono text-[10px] block uppercase">Systemic Polarity</span>
            <span className="font-bold text-purple-200 mt-1 block">{activeEpoch.polarity}</span>
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="text-zinc-400 font-mono text-[10px] block uppercase">Order Architecture</span>
            <span className="font-bold text-white mt-1 block">{activeEpoch.orderType}</span>
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="text-zinc-400 font-mono text-[10px] block uppercase">Hegemonic Core</span>
            <span className="font-bold text-amber-300 mt-1 block">{activeEpoch.hegemon}</span>
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="text-zinc-400 font-mono text-[10px] block uppercase">Critical Flashpoints</span>
            <span className="font-bold text-rose-300 mt-1 block truncate" title={activeEpoch.flashpoints}>
              {activeEpoch.flashpoints}
            </span>
          </div>
        </div>

        {/* The Fatal Flaw / Breakdown Mechanism */}
        <div className="p-3 bg-red-950/40 rounded-xl border border-red-900/50 text-xs text-red-200 space-y-1">
          <strong className="text-red-400 font-mono text-[11px] uppercase flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
            <span>Systemic Crisis & Breakdown Factor:</span>
          </strong>
          <p className="text-zinc-300 leading-relaxed">{activeEpoch.fatalFlaw}</p>
        </div>
      </div>

      {/* IR Theory Context: Ikenberry vs Kennan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ikenberry Order-Building */}
        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2">
          <div className="font-mono text-xs font-bold text-indigo-900 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>John Ikenberry: Order After Victory (2001)</span>
          </div>
          <p className="text-xs text-zinc-700 leading-relaxed">
            {activeEpoch.ikenberryThesis}
          </p>
        </div>

        {/* George Kennan Containment */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
          <div className="font-mono text-xs font-bold text-amber-900 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-amber-600" />
            <span>George F. Kennan: Realist Statecraft & Balance</span>
          </div>
          <p className="text-xs text-zinc-700 leading-relaxed">
            {activeEpoch.kennanLesson}
          </p>
        </div>
      </div>

      {/* Chronological Milestones of This Epoch */}
      <div className="space-y-2 pt-1">
        <h4 className="text-xs font-mono font-bold text-zinc-700 uppercase tracking-wider flex items-center gap-1.5">
          <Milestone className="w-3.5 h-3.5 text-purple-600" />
          <span>Epoch Watershed Milestones:</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {activeEpoch.milestones.map((m) => (
            <div key={m.year + m.event} className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs space-y-1">
              <span className="font-mono font-black text-purple-700 text-sm">{m.year}</span>
              <p className="text-zinc-700 text-[11px] leading-snug">{m.event}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 1C. CINC POWER TRANSITION VISUALIZER (Supplementary Tool)
// =========================================================================
function CincPowerTransitionVisualizer({ week }: { week: number }) {
  const [selectedYear, setSelectedYear] = useState<number>(1945);

  const currentPoint = cincCapabilitiesData.find(d => d.year === selectedYear) || cincCapabilitiesData[7];

  const powers = [
    { name: 'United States', code: 'usa', share: currentPoint.usa, color: 'bg-blue-600', text: 'text-blue-600', fill: '#2563eb' },
    { name: 'United Kingdom', code: 'uk', share: currentPoint.uk, color: 'bg-red-600', text: 'text-red-600', fill: '#dc2626' },
    { name: 'Russia / USSR', code: 'russia', share: currentPoint.russia, color: 'bg-rose-700', text: 'text-rose-700', fill: '#be123c' },
    { name: 'China', code: 'china', share: currentPoint.china, color: 'bg-amber-500', text: 'text-amber-500', fill: '#f59e0b' },
    { name: 'Germany', code: 'germany', share: currentPoint.germany, color: 'bg-emerald-600', text: 'text-emerald-600', fill: '#059669' },
    { name: 'France', code: 'france', share: currentPoint.france, color: 'bg-purple-600', text: 'text-purple-600', fill: '#9333ea' },
    { name: 'Japan', code: 'japan', share: currentPoint.japan, color: 'bg-pink-600', text: 'text-pink-600', fill: '#db2777' },
  ].sort((a, b) => b.share - a.share);

  return (
    <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600">
            Correlates of War (COW) National Material Capabilities
          </span>
          <h3 className="text-base font-bold text-zinc-900 mt-0.5">
            Composite Index of National Capability (CINC): Global Power Shares
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xl font-extrabold text-indigo-600">{selectedYear}</span>
        </div>
      </div>

      {/* Historical Era Milestones */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {cincCapabilitiesData.map(pt => (
          <button
            key={pt.year}
            onClick={() => setSelectedYear(pt.year)}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold whitespace-nowrap transition-all ${
              selectedYear === pt.year
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
            }`}
          >
            {pt.year}
          </button>
        ))}
      </div>

      {/* Interactive Power Share Horizontal Distribution */}
      <div className="space-y-3 pt-2">
        <div className="text-xs font-bold text-zinc-700 font-mono">
          Global Material Power Distribution ({selectedYear})
        </div>

        {/* Stacked Percentage Bar */}
        <div className="w-full h-8 rounded-xl overflow-hidden flex shadow-inner border border-zinc-200">
          {powers.map(p => {
            const pct = (p.share * 100);
            if (pct < 1) return null;
            return (
              <div
                key={p.code}
                style={{ width: `${pct}%`, backgroundColor: p.fill }}
                className="h-full flex items-center justify-center text-[11px] text-white font-mono font-bold transition-all duration-300 relative group truncate px-1"
                title={`${p.name}: ${pct.toFixed(1)}%`}
              >
                {pct >= 6 && `${pct.toFixed(0)}%`}
              </div>
            );
          })}
        </div>

        {/* Individual Power Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          {powers.slice(0, 4).map(p => (
            <div key={p.code} className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.fill }} />
                <span className="text-xs font-bold text-zinc-900 truncate">{p.name}</span>
              </div>
              <div className="font-mono text-lg font-extrabold text-zinc-900">
                {(p.share * 100).toFixed(1)}%
              </div>
              <div className="text-[10px] text-zinc-500 font-mono">Share of World Power</div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Decoder */}
      <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-950 space-y-1.5">
        <div className="font-bold flex items-center gap-1.5 text-indigo-900">
          <Info className="w-4 h-4 text-indigo-600" />
          <span>What This Graph Means: Hegemonic Rises & Power Transitions</span>
        </div>
        <p className="leading-relaxed text-zinc-700">
          CINC synthesizes 6 core dimensions: military spending, troops, iron & steel production, primary energy consumption, urban population, and total population.
          Notice how Britain held the industrial lead in the 19th century (~1820–1870), followed by the explosive rise of the United States to a hegemonic zenith in 1945 (38.4% of total world power), and the contemporary crossover into US-China parity (~2020).
        </p>
      </div>
    </div>
  );
}

// =========================================================================
// 2. FEARON RATIONALIST BARGAINING VISUALIZER (Weeks 5 & 15)
// =========================================================================
function FearonBargainingVisualizer({ week }: { week: number }) {
  const [probA, setProbA] = useState(0.55); // Probability A wins
  const [costA, setCostA] = useState(0.15); // Cost of war for A
  const [costB, setCostB] = useState(0.15); // Cost of war for B

  // Fearon bargaining range: [p - cB, p + cA]
  const lowerBound = Math.max(0, probA - costB);
  const upperBound = Math.min(1, probA + costA);
  const rangeWidth = Math.max(0, upperBound - lowerBound);

  return (
    <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600">
            James Fearon (1995) · Rationalist Explanations for War
          </span>
          <h3 className="text-base font-bold text-zinc-900 mt-0.5">
            The Ex Ante Bargaining Range of Peace vs. Ex Post Inefficiency of War
          </h3>
        </div>
        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800">
          Peace Exists: {(rangeWidth * 100).toFixed(0)}% Range
        </span>
      </div>

      {/* Interactive Bargaining Strip */}
      <div className="space-y-4 pt-2">
        <div className="text-xs font-mono font-semibold text-zinc-700 flex justify-between">
          <span>State A Contested Territory (0%)</span>
          <span className="text-emerald-700 font-bold">Negotiated Settlements Both Prefer to War</span>
          <span>State B Contested Territory (100%)</span>
        </div>

        {/* Visual Bargaining Axis */}
        <div className="relative w-full h-12 bg-zinc-200 rounded-xl overflow-hidden border border-zinc-300 flex items-center">
          {/* Expected Outcome of War (p) */}
          <div
            style={{ left: `${probA * 100}%` }}
            className="absolute top-0 bottom-0 w-0.5 bg-red-600 z-20"
            title={`Expected war outcome: ${(probA * 100).toFixed(0)}%`}
          />

          {/* Bargaining Range (Peace Zone) */}
          <div
            style={{
              left: `${lowerBound * 100}%`,
              width: `${rangeWidth * 100}%`
            }}
            className="absolute top-0 bottom-0 bg-emerald-500/80 border-x-2 border-emerald-700 z-10 flex items-center justify-center text-white font-mono text-xs font-bold shadow-xs"
          >
            Bargaining Space
          </div>
        </div>

        {/* Interactive Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-mono">
          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1.5">
            <div className="flex justify-between font-bold text-zinc-800">
              <span>Win Probability p(A):</span>
              <span className="text-indigo-600">{(probA * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="0.9"
              step="0.05"
              value={probA}
              onChange={e => setProbA(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="text-[10px] text-zinc-500">Military balance of power</div>
          </div>

          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1.5">
            <div className="flex justify-between font-bold text-zinc-800">
              <span>Cost of War (cA):</span>
              <span className="text-indigo-600">{(costA * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.3"
              step="0.01"
              value={costA}
              onChange={e => setCostA(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="text-[10px] text-zinc-500">Casualties, economic devastation</div>
          </div>

          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1.5">
            <div className="flex justify-between font-bold text-zinc-800">
              <span>Cost of War (cB):</span>
              <span className="text-indigo-600">{(costB * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.3"
              step="0.01"
              value={costB}
              onChange={e => setCostB(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="text-[10px] text-zinc-500">Adversary destruction penalty</div>
          </div>
        </div>
      </div>

      {/* Educational Decoder */}
      <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-950 space-y-1.5">
        <div className="font-bold flex items-center gap-1.5 text-emerald-900">
          <Info className="w-4 h-4 text-emerald-600" />
          <span>Why War is a Puzzle: The Fundamental Bargaining Theorem</span>
        </div>
        <p className="leading-relaxed text-zinc-700">
          Because fighting causes destruction (costs <em>cA</em> and <em>cB</em>), both sides lose value if they go to war. Therefore, there is always a range of peaceful divisions (the green slab) that gives both states more than their expected payoff from fighting! Fearon proves that war can only occur if:
          <strong className="text-zinc-900"> (1) Private Information & Incentives to Misrepresent</strong>, 
          <strong className="text-zinc-900"> (2) Commitment Problems</strong> (rapid power shifts prevent credible promises), or 
          <strong className="text-zinc-900"> (3) Issue Indivisibility</strong>.
        </p>
      </div>
    </div>
  );
}

// =========================================================================
// 3. JERVIS SECURITY DILEMMA 2X2 MATRIX (Weeks 4 & 6)
// =========================================================================
function OffenseDefenseMatrixVisualizer({ week }: { week: number }) {
  const [selectedQuadrant, setSelectedQuadrant] = useState<number>(1);

  const quadrants = [
    {
      id: 1,
      title: 'Quadrant 1: Doubly Dangerous',
      offenseAdvantage: true,
      differentiated: false,
      status: 'Extreme Crisis Instability',
      color: 'border-red-500 bg-red-50 text-red-950',
      tag: 'World War I (1914)',
      explanation: 'Offense has the advantage, and offensive weapons cannot be distinguished from defensive ones. States must assume the worst about neighbor intentions; preemption incentives are intense; arms races spiral uncontrollably into war.'
    },
    {
      id: 2,
      title: 'Quadrant 2: Security Dilemma Exists',
      offenseAdvantage: false,
      differentiated: false,
      status: 'Moderate Friction',
      color: 'border-amber-500 bg-amber-50 text-amber-950',
      tag: 'Interwar Europe (1930s)',
      explanation: 'Defense has the advantage, but weapons are not distinguishable. States can defend themselves successfully, but building defenses still inadvertently frightens neighbors, causing mutual suspicion.'
    },
    {
      id: 3,
      title: 'Quadrant 3: No Dilemma, but Aggression Possible',
      offenseAdvantage: true,
      differentiated: true,
      status: 'Warning Signs Visible',
      color: 'border-amber-500 bg-amber-50 text-amber-950',
      tag: 'Blitzkrieg Era (1939)',
      explanation: 'Offense has the advantage, but offensive postures can be differentiated. Status quo states can observe when an adversary is preparing for aggression (e.g. massed tank divisions or invasion transports).'
    },
    {
      id: 4,
      title: 'Quadrant 4: Doubly Safe',
      offenseAdvantage: false,
      differentiated: true,
      status: 'High Systemic Stability',
      color: 'border-emerald-500 bg-emerald-50 text-emerald-950',
      tag: 'Nuclear Second-Strike (MAD)',
      explanation: 'Defense has the advantage, and defensive weapons are distinct from offensive weapons. Status quo states can secure themselves without threatening others; peace is robust.'
    }
  ];

  const current = quadrants.find(q => q.id === selectedQuadrant)!;

  return (
    <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600">
            Robert Jervis (1978) · Cooperation Under the Security Dilemma
          </span>
          <h3 className="text-base font-bold text-zinc-900 mt-0.5">
            The 2x2 Offense-Defense Balance and Posture Differentiation Matrix
          </h3>
        </div>
        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-800">
          Click Quadrants to Compare
        </span>
      </div>

      {/* 2x2 Interactive Grid */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        {quadrants.map(q => {
          const isSelected = selectedQuadrant === q.id;
          return (
            <button
              key={q.id}
              onClick={() => setSelectedQuadrant(q.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? `${q.color} ring-2 ring-indigo-500 shadow-md`
                  : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300 text-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-1">
                <span>{q.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/80 border border-zinc-200">
                  {q.tag}
                </span>
              </div>
              <div className="text-xs font-bold text-zinc-900 mt-1">{q.status}</div>
            </button>
          );
        })}
      </div>

      {/* Detailed Dynamic Explanation */}
      <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 ${current.color}`}>
        <div className="font-bold font-mono text-sm flex items-center gap-1.5">
          <Activity className="w-4 h-4" />
          <span>{current.title} Analysis ({current.tag})</span>
        </div>
        <p className="text-zinc-800 font-sans">{current.explanation}</p>
      </div>
    </div>
  );
}

// =========================================================================
// 4. DEMOCRATIC PEACE VISUALIZER (Weeks 3 & 9)
// =========================================================================
function DemocraticPeaceVisualizer({ week }: { week: number }) {
  const [selectedDyadName, setSelectedDyadName] = useState<string>(democraticPeaceDyads[0].dyadType);

  const dyadData = democraticPeaceDyads.find(d => d.dyadType === selectedDyadName) || democraticPeaceDyads[0];

  return (
    <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600">
            Empirical Law of Dyadic Conflict · Babst, Doyle & Russett
          </span>
          <h3 className="text-base font-bold text-zinc-900 mt-0.5">
            Democratic Peace Dyads: Interstate War Probability (1816–2020)
          </h3>
        </div>
      </div>

      {/* Dyad Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {democraticPeaceDyads.map(d => (
          <button
            key={d.dyadType}
            onClick={() => setSelectedDyadName(d.dyadType)}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              selectedDyadName === d.dyadType
                ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-400 shadow-sm'
                : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100 text-zinc-700'
            }`}
          >
            <div className="text-xs font-mono font-bold text-zinc-800">{d.dyadType}</div>
            <div className="font-mono text-lg font-extrabold text-indigo-600 mt-1">
              {(d.warProb * 100).toFixed(4)}%
            </div>
            <div className="text-[10px] text-zinc-500 font-mono">Empirical War Rate / Yr</div>
          </button>
        ))}
      </div>

      {/* Probability Bar Visualization */}
      <div className="space-y-2 pt-1">
        <div className="text-xs font-mono text-zinc-600 font-bold">
          Empirical Likelihood of War in {dyadData.dyadType}:
        </div>
        <div className="w-full h-4 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              backgroundColor: dyadData.color,
              width: `${Math.max((dyadData.warProb / 0.0072) * 100, 2)}%`
            }}
          />
        </div>
        <p className="text-xs text-zinc-700 font-sans mt-2 leading-relaxed bg-zinc-50 p-3.5 rounded-xl border border-zinc-200">
          <strong>Empirical Finding: </strong>{dyadData.empiricalFact}
        </p>
      </div>
    </div>
  );
}

// =========================================================================
// 5. UCDP CONFLICT TREND VISUALIZER (Week 10)
// =========================================================================
function UcdpConflictTrendVisualizer({ week }: { week: number }) {
  const [selectedYear, setSelectedYear] = useState<number>(2023);

  const pt = ucdpPrioArmedConflicts.find(p => p.year === selectedYear) || ucdpPrioArmedConflicts[ucdpPrioArmedConflicts.length - 1];

  return (
    <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600">
            Uppsala Conflict Data Program (UCDP) / PRIO (1946–2023)
          </span>
          <h3 className="text-base font-bold text-zinc-900 mt-0.5">
            The Intrastate Transformation: Civil Wars vs. Interstate Warfare
          </h3>
        </div>
        <div className="font-mono text-xl font-extrabold text-indigo-600">{selectedYear}</div>
      </div>

      {/* Year Scrubber */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {ucdpPrioArmedConflicts.map(d => (
          <button
            key={d.year}
            onClick={() => setSelectedYear(d.year)}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold whitespace-nowrap transition-all ${
              selectedYear === d.year
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
            }`}
          >
            {d.year}
          </button>
        ))}
      </div>

      {/* Breakdown Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-200 space-y-1">
          <div className="text-[10px] font-mono text-rose-700 uppercase font-bold">Civil (Internal)</div>
          <div className="text-2xl font-extrabold text-rose-900 font-mono">{pt.internal}</div>
          <div className="text-[10px] text-zinc-500">Active internal conflicts</div>
        </div>

        <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
          <div className="text-[10px] font-mono text-amber-700 uppercase font-bold">Internationalized Civil</div>
          <div className="text-2xl font-extrabold text-amber-900 font-mono">{pt.internationalizedInternal}</div>
          <div className="text-[10px] text-zinc-500">Proxy interventions</div>
        </div>

        <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 space-y-1">
          <div className="text-[10px] font-mono text-blue-700 uppercase font-bold">Interstate Wars</div>
          <div className="text-2xl font-extrabold text-blue-900 font-mono">{pt.interstate}</div>
          <div className="text-[10px] text-zinc-500">State vs state wars</div>
        </div>

        <div className="p-3.5 bg-zinc-100 rounded-xl border border-zinc-200 space-y-1">
          <div className="text-[10px] font-mono text-zinc-700 uppercase font-bold">System Total</div>
          <div className="text-2xl font-extrabold text-zinc-900 font-mono">{pt.total}</div>
          <div className="text-[10px] text-zinc-500">Recorded armed conflicts</div>
        </div>
      </div>

      {/* Educational Decoder */}
      <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 leading-relaxed">
        <strong className="text-zinc-900">Historical Shift: </strong>
        Notice how since the 1960s decolonization and the 1990s post-Cold War dissolution of empires, interstate warfare plummeted to near zero, while civil and internationalized proxy wars expanded to account for over 90% of all global armed violence.
      </div>
    </div>
  );
}

// =========================================================================
// 6. ALLIANCE TYPOLOGY VISUALIZER (Weeks 7 & 11)
// =========================================================================
function AllianceTypologyVisualizer({ week }: { week: number }) {
  const [selectedType, setSelectedType] = useState<string>('defense');

  const types = [
    {
      id: 'defense',
      title: 'Mutual Defense Pacts (49.5%)',
      count: '205 Treaties',
      color: 'border-blue-500 bg-blue-50 text-blue-950',
      tag: 'Article 5 NATO, Rio Pact',
      obligation: 'Members promise active military intervention if an ally is attacked by an external adversary.'
    },
    {
      id: 'nonaggression',
      title: 'Non-Aggression Pacts (35.7%)',
      count: '148 Treaties',
      color: 'border-emerald-500 bg-emerald-50 text-emerald-950',
      tag: 'Molotov-Ribbentrop (1939)',
      obligation: 'Pledge not to attack or initiate military force against one another.'
    },
    {
      id: 'entente',
      title: 'Ententes & Consultations (12.3%)',
      count: '51 Treaties',
      color: 'border-purple-500 bg-purple-50 text-purple-950',
      tag: 'Entente Cordiale (1904)',
      obligation: 'Pledge to consult in the event of an international military crisis without automatic military intervention.'
    }
  ];

  const cur = types.find(t => t.id === selectedType)!;

  return (
    <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600">
            COW Formal Alliances v4.1 (1816–2012) · Gibler & Sarkees
          </span>
          <h3 className="text-base font-bold text-zinc-900 mt-0.5">
            Typology of Formal Interstate Treaties & Strategic Commitments
          </h3>
        </div>
        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-800">
          414 Historical Treaties
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {types.map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedType(t.id)}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedType === t.id
                ? `${t.color} ring-2 ring-indigo-500 shadow-md`
                : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300 text-zinc-700'
            }`}
          >
            <div className="text-xs font-bold font-mono text-zinc-900">{t.title}</div>
            <div className="font-mono text-lg font-extrabold text-indigo-600 mt-1">{t.count}</div>
            <div className="text-[11px] text-zinc-500 mt-1">{t.tag}</div>
          </button>
        ))}
      </div>

      <div className={`p-4 rounded-xl border text-xs leading-relaxed ${cur.color}`}>
        <strong className="font-mono uppercase text-zinc-900">Legal Obligation: </strong>
        <span>{cur.obligation}</span>
      </div>
    </div>
  );
}

// =========================================================================
// 7. TRADE INTERDEPENDENCE VISUALIZER (Weeks 12 & 13)
// =========================================================================
function TradeInterdependenceVisualizer({ week }: { week: number }) {
  const [viewMode, setViewMode] = useState<'sankey' | 'epochs'>('sankey');
  const [activeEra, setActiveEra] = useState<string>('hyper');

  const eras = [
    { id: 'first', years: '1870–1914', name: 'First Globalization', volume: '$10.5B ➔ $38B', desc: 'Steamships, undersea cables, and the Gold Standard fuel free trade under Pax Britannica.' },
    { id: 'interwar', years: '1914–1945', name: 'Tariff Wars & Autarky', volume: 'Severe Collapse', desc: 'Smoot-Hawley Act (1930) and imperial trade blocs deepen the Great Depression and fuel WWII.' },
    { id: 'postwar', years: '1945–1990', name: 'Bretton Woods GATT', volume: '$60B ➔ $3.5T', desc: 'Rules-based Western trade integration, export miracles in Germany and East Asia.' },
    { id: 'hyper', years: '1990–2014', name: 'Hyper-Globalization', volume: '$3.5T ➔ $36.8T', desc: 'WTO founded (1995); China joins (2001); container shipping creates global supply chains.' }
  ];

  const cur = eras.find(e => e.id === activeEra)!;

  return (
    <div className="space-y-4">
      {/* Switcher bar */}
      <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-zinc-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('sankey')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'sankey'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            <GitFork className="w-3.5 h-3.5" />
            <span>Dynamic Trade Flows Sankey (D3.js)</span>
          </button>
          <button
            onClick={() => setViewMode('epochs')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'epochs'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Four Historical Globalization Eras</span>
          </button>
        </div>

        <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
          COW Bilateral Trade Dataset v4.0
        </span>
      </div>

      {viewMode === 'sankey' ? (
        <TradeSankeyDiagram />
      ) : (
        <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600">
                COW Bilateral & National Trade v4.0 (1870–2014) · Barbieri & Keshk
              </span>
              <h3 className="text-base font-bold text-zinc-900 mt-0.5">
                The Commercial Peace: Global Trade Trajectory Over 145 Years
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {eras.map(e => (
              <button
                key={e.id}
                onClick={() => setActiveEra(e.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  activeEra === e.id
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400 shadow-sm'
                    : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100 text-zinc-700'
                }`}
              >
                <div className="text-[10px] font-mono text-amber-700 font-bold">{e.years}</div>
                <div className="text-xs font-bold text-zinc-900 mt-0.5">{e.name}</div>
                <div className="text-xs font-mono font-extrabold text-amber-900 mt-1">{e.volume}</div>
              </button>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1">
            <strong className="font-bold">{cur.name} ({cur.years}): </strong>
            <span>{cur.desc}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 8. SIPRI DEFENSE SPENDING VISUALIZER (Week 14)
// =========================================================================
function SipriSpendingVisualizer({ week }: { week: number }) {
  const [selectedPoint, setSelectedPoint] = useState<number>(2023);

  const cur = sipriSpendingTrends.find(p => p.year === selectedPoint) || sipriSpendingTrends[sipriSpendingTrends.length - 1];

  return (
    <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600">
            Stockholm International Peace Research Institute (SIPRI)
          </span>
          <h3 className="text-base font-bold text-zinc-900 mt-0.5">
            Global Military Spending Trajectory (1950–2024 Record High: $2.44 Trillion)
          </h3>
        </div>
        <div className="font-mono text-xl font-extrabold text-indigo-600">${cur.globalSpendingBillions}B</div>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {sipriSpendingTrends.map(pt => (
          <button
            key={pt.year}
            onClick={() => setSelectedPoint(pt.year)}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold whitespace-nowrap transition-all ${
              selectedPoint === pt.year
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
            }`}
          >
            {pt.year}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 text-xs text-indigo-950 space-y-1">
        <strong className="font-mono font-bold">Year {cur.year} Historical Geopolitical Context: </strong>
        <span>{cur.milestone}</span>
      </div>
    </div>
  );
}

// =========================================================================
// 9. ALLISON'S THREE MODELS OF FOREIGN POLICY (Week 8)
// =========================================================================
function AllisonBureaucracyVisualizer({ week }: { week: number }) {
  const [selectedModel, setSelectedModel] = useState<1 | 2 | 3>(1);
  const [selectedCase, setSelectedCase] = useState<'cuban' | 'iraq' | 'pearl'>('cuban');

  const models = [
    {
      id: 1 as const,
      name: 'Model I: Rational Policy (RAM)',
      subtitle: 'Unitary Strategic Choice',
      analystIcon: Target,
      color: 'border-blue-500 bg-blue-50 text-blue-900',
      activeRing: 'ring-blue-400 bg-blue-50',
      tag: 'Classical Game Theory & Realism',
      coreAssumption: 'States are unitary, rational actors that rank preferences, weigh alternatives against costs and benefits, and select options that maximize national strategic objectives.'
    },
    {
      id: 2 as const,
      name: 'Model II: Organizational Process',
      subtitle: 'Standard Operating Procedures (SOPs)',
      analystIcon: Building2,
      color: 'border-emerald-500 bg-emerald-50 text-emerald-900',
      activeRing: 'ring-emerald-400 bg-emerald-50',
      tag: 'Herbert Simon Bounded Rationality',
      coreAssumption: 'Government behavior reflects outputs of large, semi-autonomous organizations functioning according to pre-established Standard Operating Procedures (SOPs) and repertoires.'
    },
    {
      id: 3 as const,
      name: 'Model III: Bureaucratic Politics',
      subtitle: 'Pulling and Hauling / Bargaining',
      analystIcon: Users,
      color: 'border-purple-500 bg-purple-50 text-purple-900',
      activeRing: 'ring-purple-400 bg-purple-50',
      tag: '"Where you stand depends on where you sit"',
      coreAssumption: 'Decisions are not chosen by a single brain, but emerge as political resultants from internal bargaining, turf defense, and compromise among players with divergent departmental loyalties.'
    }
  ];

  const caseStudies = {
    cuban: {
      title: 'Cuban Missile Crisis (October 1962)',
      explanations: {
        1: {
          title: 'Rational Deterrence Rebalancing',
          detail: 'Khrushchev placed medium-range nuclear missiles in Cuba as a rational move to rectify the severe strategic nuclear imbalance (US 17:1 warhead superiority and Jupiter missiles in Turkey). President Kennedy’s naval quarantine was the optimal calculated escalation step that signaled maximum resolve while avoiding immediate thermonuclear exchange.',
          takeaway: 'Examines state action as an optimal value-maximizing response to a strategic threat.'
        },
        2: {
          title: 'Organizational Blind Spots & SOP Glitches',
          detail: 'Soviets constructed missile sites using the exact same standard physical layout used inside the USSR, without camouflage, because Soviet Strategic Rocket Forces had never established concealment SOPs. When JFK ordered the US naval quarantine moved from 500 to 800 miles, Chief of Naval Operations Admiral George Anderson insisted on following standard naval manual procedures regardless.',
          takeaway: 'Uncovers how organizational routines create operational failures that no rational leader intended.'
        },
        3: {
          title: 'Intense Bureaucratic Coalition Bargaining',
          detail: 'The ExComm debate was fierce: Air Force Chief Curtis LeMay aggressively lobbied for an 800-sortie preemptive bombing campaign to protect Air Force prestige; Defense Secretary McNamara and Robert Kennedy advocated a naval blockade to protect the President from political backlash and avoid a "Pearl Harbor in reverse" moral disaster.',
          takeaway: 'Demonstrates how final policy was a compromised resultant negotiated between competing department heads.'
        }
      }
    },
    iraq: {
      title: '2003 Iraq Intelligence Assessment',
      explanations: {
        1: {
          title: 'Preventive Strategic Calculus',
          detail: 'The US administration weighed the intolerable risk of a hostile Saddam regime sharing non-conventional capabilities with non-state terrorist networks against the military costs of regime change.',
          takeaway: 'Frames policy as a deliberate cost-benefit decision under post-9/11 threat perceptions.'
        },
        2: {
          title: 'Intelligence Collection SOPs & Confirmation Bias',
          detail: 'Intelligence agencies relied on compartmentalized collection routines that filtered and amplified unverified source reports (e.g. "Curveball") without testing organizational hypotheses.',
          takeaway: 'Reveals how routine analysis procedures fail when evaluating novel or deceptive evidence.'
        },
        3: {
          title: 'Office of Special Plans vs. State Dept / CIA',
          detail: 'DOD civilian leadership (Wolfowitz, Feith) created competing intelligence channels to bypass CIA analysts, marginalizing Colin Powell’s State Department through internal White House leverage.',
          takeaway: 'Illustrates how bureaucratic infighting dictated which intelligence assessments reached the Oval Office.'
        }
      }
    },
    pearl: {
      title: 'Pearl Harbor Surprise Attack (December 1941)',
      explanations: {
        1: {
          title: 'Imperial Japanese Desperation Gamble',
          detail: 'Confronted with the crippling US oil embargo that gave Tokyo an 18-month fuel lifeline, Japanese military leaders rationally calculated that a decisive surprise strike was their only path to force a negotiated Pacific partition.',
          takeaway: 'Explains high-risk aggression as a calculated last resort against resource starvation.'
        },
        2: {
          title: 'US Army-Navy Inter-Service Radar & Signal Silos',
          detail: 'Radar stations detected inbound Japanese aircraft but standard protocol failed to alert command; cryptanalytic "Magic" intercepts were hoarded between Navy and Army desks without routine synthesis.',
          takeaway: 'Demonstrates catastrophic intelligence breakdown caused by fragmented organizational boundaries.'
        },
        3: {
          title: 'Departmental Rivalry in Washington & Tokyo',
          detail: 'In Tokyo, Imperial Army and Navy factionalism prevented any unified war termination strategy; in Washington, command rivalries between Admiral Kimmel and General Short hindered joint patrol coordination.',
          takeaway: 'Shows how inter-service turf rivalries produce blind spots that adversaries can exploit.'
        }
      }
    }
  };

  const currentModel = models.find(m => m.id === selectedModel)!;
  const currentCase = caseStudies[selectedCase];
  const explanation = currentCase.explanations[selectedModel];

  return (
    <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600">
            Graham Allison’s Essence of Decision · Foreign Policy Analysis
          </span>
          <h3 className="text-base font-bold text-zinc-900 mt-0.5">
            Three Lenses of Foreign Policy Decision-Making
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <span className="text-zinc-500">Case Study:</span>
          <select
            value={selectedCase}
            onChange={(e) => setSelectedCase(e.target.value as any)}
            className="bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1 text-zinc-800 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="cuban">Cuban Missile Crisis (1962)</option>
            <option value="iraq">2003 Iraq Intelligence</option>
            <option value="pearl">Pearl Harbor Attack (1941)</option>
          </select>
        </div>
      </div>

      {/* Model Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {models.map(m => {
          const Icon = m.analystIcon;
          const isSelected = selectedModel === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedModel(m.id)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? `${m.color} ring-2 ${m.activeRing} shadow-sm`
                  : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100 text-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold">{m.name}</span>
                <Icon className="w-4 h-4 opacity-75" />
              </div>
              <div className="text-[11px] font-medium text-zinc-600 mt-1">{m.subtitle}</div>
              <div className="text-[10px] text-zinc-500 font-mono mt-1">{m.tag}</div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Model Analysis for Current Case */}
      <div className="space-y-3 pt-1">
        <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 space-y-2">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
            <span className="text-xs font-mono font-bold uppercase text-indigo-700">
              {currentCase.title} through {currentModel.name}
            </span>
            <span className="text-[11px] font-mono text-zinc-500">{explanation.title}</span>
          </div>

          <p className="text-xs text-zinc-800 font-sans leading-relaxed">
            {explanation.detail}
          </p>

          <div className="text-[11px] font-mono text-indigo-900 bg-indigo-50/80 p-2.5 rounded-lg border border-indigo-100 flex items-start gap-1.5 mt-2">
            <Info className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
            <span><strong>Analytical Lens Takeaway: </strong>{explanation.takeaway}</span>
          </div>
        </div>

        {/* Theoretical Axiom Decoder */}
        <div className="p-3.5 bg-zinc-100/80 rounded-xl text-xs text-zinc-700 leading-relaxed border border-zinc-200">
          <strong className="text-zinc-900">Foundational Axiom of {currentModel.name}: </strong>
          <span>{currentModel.coreAssumption}</span>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 10. NEOLIBERAL INSTITUTIONALISM & SHADOW OF THE FUTURE (Week 11)
// =========================================================================
function InstitutionalCooperationVisualizer({ week }: { week: number }) {
  const [discountDelta, setDiscountDelta] = useState<number>(0.75); // Shadow of the future delta
  const [verificationActive, setVerificationActive] = useState<boolean>(true);

  // Payoff Matrix for Prisoner's Dilemma
  // Cooperate / Cooperate: R = 3
  // Defect / Cooperate: T = 5 (Temptation)
  // Defect / Defect: P = 1 (Punishment)
  // Cooperate / Defect: S = 0 (Sucker)
  const R = 3;
  const T = verificationActive ? 4.0 : 5.0; // Institutional verification lowers temptation to cheat
  const P = 1;

  // Axelrod condition: Cooperation is sustainable if delta >= (T - R) / (T - P)
  const thresholdDelta = (T - R) / (T - P);
  const isCooperationSustainable = discountDelta >= thresholdDelta;

  return (
    <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600">
            Neoliberal Institutionalism · Robert Axelrod & Robert Keohane
          </span>
          <h3 className="text-base font-bold text-zinc-900 mt-0.5">
            The Shadow of the Future: Iterated Cooperation under Anarchy
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVerificationActive(!verificationActive)}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all border ${
              verificationActive
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-1 ring-emerald-400'
                : 'bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200'
            }`}
          >
            {verificationActive ? '✓ Institutional Monitoring (Active)' : '+ Add Verification Regime'}
          </button>
        </div>
      </div>

      {/* Interactive Horizon Slider (Discount Factor delta) */}
      <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono font-bold text-zinc-800 flex items-center gap-1.5">
            <Repeat className="w-4 h-4 text-indigo-600" />
            <span>Discount Factor δ ("Shadow of the Future" Horizon):</span>
          </label>
          <span className="font-mono text-sm font-extrabold text-indigo-600">
            δ = {discountDelta.toFixed(2)}
          </span>
        </div>

        <input
          type="range"
          min="0.10"
          max="0.95"
          step="0.05"
          value={discountDelta}
          onChange={(e) => setDiscountDelta(parseFloat(e.target.value))}
          className="w-full accent-indigo-600 cursor-pointer h-2 bg-zinc-200 rounded-lg"
        />

        <div className="flex justify-between text-[10px] font-mono text-zinc-500">
          <span>δ = 0.10 (Immediate horizon / Impending crisis)</span>
          <span>Critical Threshold: δ* = {thresholdDelta.toFixed(2)}</span>
          <span>δ = 0.95 (Long-term iterated relationship)</span>
        </div>
      </div>

      {/* Equilibrium Status Indicator Card */}
      <div
        className={`p-4 rounded-xl border transition-all ${
          isCooperationSustainable
            ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
            : 'bg-rose-50/80 border-rose-300 text-rose-950'
        }`}
      >
        <div className="flex items-center gap-2 font-mono font-bold text-sm">
          <span
            className={`w-3 h-3 rounded-full ${
              isCooperationSustainable ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
            }`}
          />
          <span>
            {isCooperationSustainable
              ? 'Stable Cooperative Equilibrium (Tit-for-Tat Dominates Defection)'
              : 'Suboptimal Defection Trap (One-Shot Nash Equilibrium)'}
          </span>
        </div>

        <p className="text-xs font-sans mt-2 leading-relaxed">
          {isCooperationSustainable ? (
            <span>
              Because the shadow of the future <strong>(δ = {discountDelta.toFixed(2)})</strong> exceeds the critical defect threshold <strong>(δ* = {thresholdDelta.toFixed(2)})</strong>, the long-run stream of mutual cooperation payoffs (R = {R}) strictly outweighs the short-term temptation to cheat (T = {T.toFixed(1)}). International institutions stabilize cooperation by locking in expectations of repeated future interaction.
            </span>
          ) : (
            <span>
              Because the horizon is short <strong>(δ = {discountDelta.toFixed(2)} &lt; {thresholdDelta.toFixed(2)})</strong>, the immediate temptation to cheat outweighs discounted future punishment. Under pure anarchy with short horizons, both states play Defect, trapping the system in a suboptimal outcome (P = {P}, P = {P}).
            </span>
          )}
        </p>
      </div>

      {/* 3 Core Institutional Mechanisms Decoder */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1 text-xs">
          <div className="font-mono font-bold text-indigo-700">1. Lowering Costs</div>
          <p className="text-[11px] text-zinc-600 leading-snug">
            Treaties provide standard negotiation templates, reducing the transaction cost of negotiating individual disputes from scratch.
          </p>
        </div>

        <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1 text-xs">
          <div className="font-mono font-bold text-indigo-700">2. Verification Regimes</div>
          <p className="text-[11px] text-zinc-600 leading-snug">
            Bodies like the IAEA and WTO provide impartial inspection and reporting, denying states the ability to conceal cheating.
          </p>
        </div>

        <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1 text-xs">
          <div className="font-mono font-bold text-indigo-700">3. Lengthening Horizons</div>
          <p className="text-[11px] text-zinc-600 leading-snug">
            Regular summit meetings and iterated voting cycles ensure leaders know they will face their counterparts tomorrow.
          </p>
        </div>
      </div>
    </div>
  );
}

