import { useState } from 'react';
import { motion } from 'motion/react';
import { scheduleData } from '../data';
import {
  BookOpen,
  AlertCircle,
  Calendar,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Layers,
  Activity,
  Flame,
  Shield,
  Zap,
  Globe2,
  Info
} from 'lucide-react';
import { WeekDetailView } from './WeekDetailView';

// Educational IR metadata matching each week
export const WEEK_DETAILS: Record<number, {
  paradigm: string;
  focusQuestion: string;
  keyConcepts: string[];
  comparativeTakeaway: string;
}> = {
  1: {
    paradigm: 'Foundations & Systemic Structure',
    focusQuestion: 'How does anarchy at the international level constrain sovereign state choices differently than domestic hierarchy?',
    keyConcepts: ['Westphalian Sovereignty', 'Anarchy', 'Three Images (Levels of Analysis)', 'Systemic Constraints'],
    comparativeTakeaway: 'Distinguishing individual leadership psychology from domestic regime incentives and systemic distribution of power.'
  },
  2: {
    paradigm: 'Historical Evolution of Modern World Politics (1815–2026)',
    focusQuestion: 'How did the systemic ruptures of 1815, 1914, 1945, and 1991 forge the modern international order, and why do post-war institutional orders succeed or collapse?',
    keyConcepts: [
      'Concert of Europe (1815)',
      'Versailles & Institutional Collapse (1919)',
      'Bretton Woods & UN Strategic Restraint (1945)',
      'Kennan Containment & Bipolarity (1947)',
      'Post-Cold War Unipolarity (1991)',
      'Multiplex Contestation (2008–Present)'
    ],
    comparativeTakeaway: 'Ikenberry vs. Kennan: Order-building after major wars succeeds when victors practice strategic restraint (1815, 1945), but collapses when punitive terms lack enforcement (1919 Versailles) or when rising challengers contest systemic rules.'
  },
  3: {
    paradigm: 'The Theoretical Triad (Realism vs Liberalism vs Constructivism)',
    focusQuestion: 'Can the same international event be explained convincingly through material power, institutional rules, or socially constructed norms?',
    keyConcepts: ['Material Power', 'Relative vs Absolute Gains', 'Information & Transaction Costs', 'Intersubjective Identities'],
    comparativeTakeaway: 'Realists focus on survival; Liberals on positive-sum institutional cooperation; Constructivists on shared ideas.'
  },
  4: {
    paradigm: 'Security Dilemma & Conflict Spirals (Jervis)',
    focusQuestion: 'Why do defensive measures taken by one state appear threatening to its neighbors?',
    keyConcepts: ['Security Dilemma', 'Offense-Defense Balance', 'Spiral Model', 'Arms Races', 'Misperception'],
    comparativeTakeaway: 'When offensive technology has the advantage, preemption incentives multiply and crisis instability peaks.'
  },
  5: {
    paradigm: 'Rationalist Explanations for War (Fearon)',
    focusQuestion: 'If war is costly and destructive ex post, why can states not reach a negotiated bargain ex ante?',
    keyConcepts: ['Bargaining Range', 'Private Information & Incentives to Misrepresent', 'Commitment Problems', 'Issue Indivisibility'],
    comparativeTakeaway: 'War occurs through bargaining failures: bluffing over resolve or inability to credibly commit to future power shifts.'
  },
  6: {
    paradigm: 'Deterrence, Coercion, and Strategic Credibility',
    focusQuestion: 'How can a state make threats credible when carrying them out is painful or self-destructive?',
    keyConcepts: ['General vs Immediate Deterrence', 'Compellence', 'Tripwires & Sunk Costs', 'Audience Costs (Fearon)', 'Brinkmanship'],
    comparativeTakeaway: 'Deterrence preserves the status quo; compellence forces retreat. Credibility requires costly signaling.'
  },
  7: {
    paradigm: 'Alliances, Extended Deterrence, and Coercive Networks',
    focusQuestion: 'Why do states aggregate military capabilities, and how do they balance the fear of abandonment against entrapment?',
    keyConcepts: ['External Balancing', 'Alliance Dilemma (Snyder)', 'Entrapment vs Abandonment', 'Chain-Ganging (1914)', 'Buck-Passing (1930s)'],
    comparativeTakeaway: 'Tight alliances deter external enemies but risk dragging major powers into localized peripheral wars.'
  },
  8: {
    paradigm: 'Domestic Politics & Foreign Policy Bureaucracy',
    focusQuestion: 'How do domestic bureaucratic rivalries and cognitive shortcuts disrupt unitary rational actor models?',
    keyConcepts: ['Allison Models I, II, III', 'Standard Operating Procedures (SOPs)', 'Bureaucratic Politics', 'Groupthink'],
    comparativeTakeaway: '"Where you stand depends on where you sit." Policies often reflect institutional compromise rather than optimal strategy.'
  },
  9: {
    paradigm: 'Democratic Peace & Regime Type',
    focusQuestion: 'Why do democracies rarely fight one another, even while fighting autocracies frequently?',
    keyConcepts: ['Dyadic Democratic Peace', 'Institutional Checks & Balances (Kant)', 'Audience Costs & Resolve Transparency', 'Normative Externalization'],
    comparativeTakeaway: 'Empirical law of dyadic peace: institutional transparency and electoral checks lower miscalculation risks.'
  },
  10: {
    paradigm: 'Civil Wars, Insurgency, and Proxy Conflicts',
    focusQuestion: 'Why has intrastate violence replaced interstate war as the primary source of civilian casualties since 1945?',
    keyConcepts: ['Greed vs Grievance', 'Ethnic Security Dilemma (Posen)', 'External Proxy Interventions', 'Post-War Commitment Barriers (Walter)'],
    comparativeTakeaway: 'Civil war combatants face extreme disarmament commitment problems without credible third-party enforcement.'
  },
  11: {
    paradigm: 'International Law, Treaties, and Global Institutions',
    focusQuestion: 'How do formal treaties and international organizations enable cooperation without a world government?',
    keyConcepts: ['Neoliberal Institutionalism', 'Transaction Costs', 'Monitoring & Verification', 'Shadow of the Future (Axelrod)', 'Reciprocity'],
    comparativeTakeaway: 'Institutions do not eliminate power politics, but provide focal points and deter cheating across iterated encounters.'
  },
  12: {
    paradigm: 'International Political Economy: Trade & Coercion',
    focusQuestion: 'Does dense economic interdependence produce peace, or does it create asymmetric vulnerabilities for economic statecraft?',
    keyConcepts: ['Commercial Peace', 'Weaponized Interdependence (Farrell & Newman)', 'Economic Sanctions', 'Hegemonic Stability in Trade'],
    comparativeTakeaway: 'Trade creates wealth, but centralized payment hubs (SWIFT) and export controls can be leveraged for geopolitical coercion.'
  },
  13: {
    paradigm: 'Global Governance & Collective Action Dilemmas',
    focusQuestion: 'Why is global cooperation on climate change and environmental commons so difficult under anarchy?',
    keyConcepts: ['Tragedy of the Commons (Hardin)', 'Free-Rider Problem', 'Elinor Ostrom Polycentric Governance', 'Common But Differentiated Responsibilities'],
    comparativeTakeaway: 'Diffuse costs and concentrated benefits create severe incentives to free-ride without binding reciprocity.'
  },
  14: {
    paradigm: 'Emerging Military Technologies: Nuclear, Cyber, and AI',
    focusQuestion: 'How do nuclear deterrence, cyber operations, and autonomous weapons challenge classical strategic theory?',
    keyConcepts: ['Nuclear Revolution (Jervis)', 'Second-Strike Survivability (MAD)', 'Stability-Instability Paradox', 'Cyber Attribution Problem', 'Algorithmic Escalation'],
    comparativeTakeaway: 'Nuclear weapons deter existential war; cyber operations exploit the below-threshold "gray zone" of low attribution.'
  },
  15: {
    paradigm: 'The Future of World Order & US-China Strategic Rivalry',
    focusQuestion: 'Are rising and established superpowers structurally destined for military conflict, or can competition be managed?',
    keyConcepts: ['Power Transition Theory (Organski)', 'Thucydides Trap', 'Liberal International Order Crises', 'Hedging & Middle Power Agency'],
    comparativeTakeaway: 'The danger zone occurs when a dissatisfied challenger approaches capability parity with the status-quo hegemon.'
  }
};

export function Schedule() {
  const [selectedWeekNo, setSelectedWeekNo] = useState<number | null>(null);
  const [selectedPart, setSelectedPart] = useState<string>('All');

  const parts = [
    'All',
    'PART I. FOUNDATIONS OF INTERNATIONAL RELATIONS',
    'PART II. WAR, BARGAINING, AND COERCION',
    'PART III. FOREIGN POLICY AND POLITICAL VIOLENCE',
    'PART IV. INSTITUTIONS, LAW, AND COOPERATION',
    'PART V. INTERNATIONAL POLITICAL ECONOMY AND GLOBAL CHALLENGES',
    'PART VI. CRISIS BARGAINING AND THE FUTURE OF WORLD POLITICS',
  ];

  const filteredSchedule = scheduleData.filter((item) => {
    return selectedPart === 'All' || item.part === selectedPart;
  });

  // If a week is clicked, show its full dedicated page
  if (selectedWeekNo !== null) {
    const week = scheduleData.find(w => w.week === selectedWeekNo) || scheduleData[0];
    const details = WEEK_DETAILS[week.week] || WEEK_DETAILS[1];

    return (
      <WeekDetailView
        week={week}
        details={details}
        totalWeeks={scheduleData.length}
        onBack={() => setSelectedWeekNo(null)}
        onSelectWeek={(wNo) => setSelectedWeekNo(wNo)}
      />
    );
  }

  // Otherwise, show the clean 15-week course schedule portal
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Course Schedule (Spring 2027)</h1>
          <p className="text-zinc-600 text-sm mt-1">
            Click any week to open its full module page with interactive empirical models, concept decoders, readings, and seminar labs.
          </p>
        </div>

        {/* Part Filter Dropdown */}
        <div className="shrink-0">
          <select
            value={selectedPart}
            onChange={(e) => setSelectedPart(e.target.value)}
            className="text-xs sm:text-sm bg-white border border-zinc-200 rounded-xl px-3.5 py-2 text-zinc-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          >
            {parts.map((p, idx) => (
              <option key={idx} value={p}>
                {p === 'All' ? 'All Course Parts (15 Weeks)' : p.replace('PART ', 'Part ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 15 Weeks Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSchedule.map((week) => {
          const details = WEEK_DETAILS[week.week] || WEEK_DETAILS[1];

          return (
            <div
              key={week.week}
              onClick={() => setSelectedWeekNo(week.week)}
              className="bg-white rounded-2xl p-5 border border-zinc-200 hover:border-indigo-400 hover:shadow-md cursor-pointer transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
                    Week {week.week}
                  </span>
                  <span className="font-mono text-xs text-zinc-500">{week.dates}</span>
                </div>

                <div>
                  <div className="text-[11px] font-mono text-emerald-700 font-semibold mb-1">
                    {details.paradigm}
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    {week.title}
                  </h3>
                </div>

                <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                  {details.focusQuestion}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
                {week.hasAssignment ? (
                  <span className="inline-flex items-center gap-1 font-semibold text-amber-700 text-[11px]">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    {week.assignmentName}
                  </span>
                ) : (
                  <span className="text-zinc-400 text-[11px]">In-Class Lab & Readings</span>
                )}

                <div className="flex items-center gap-1 text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Open Page</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Spring Recess Note */}
      <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl text-center text-sm font-medium">
        🌴 Spring Recess: March 21-28. No class meetings or assignment deadlines.
      </div>

      {/* Final Assessment Note */}
      <div className="p-6 bg-zinc-900 text-white rounded-2xl space-y-2 text-center md:text-left">
        <h2 className="text-lg font-bold text-indigo-300">FINAL ASSESSMENT PERIOD (May 14-21)</h2>
        <p className="text-sm text-zinc-300">
          <strong>Final Policy Brief:</strong> Due during the university-assigned examination period (May 14-21). No new readings assigned during this period.
        </p>
      </div>
    </motion.div>
  );
}
