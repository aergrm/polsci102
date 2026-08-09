import { useState } from 'react';
import { Globe, Shield, FileText, CheckCircle2, AlertTriangle, XCircle, Info, RefreshCw } from 'lucide-react';
import { UNSC3DChamberCanvas } from './UNSC3DChamberCanvas';

interface Clause {
  id: string;
  name: string;
  description: string;
  category: 'Military' | 'Sanctions' | 'Justice' | 'Monitoring';
}

const availableClauses: Clause[] = [
  {
    id: 'force-ch7',
    name: 'Chapter VII Article 42 Enforcement (Use of Military Force)',
    description: 'Authorizes member states to use all necessary measures, including military action, to restore international peace and security.',
    category: 'Military'
  },
  {
    id: 'peacekeeping-obs',
    name: 'Chapter VI Peacekeeping Observer Deployment',
    description: 'Deploys unarmed UN military observers to monitor a mutually agreed ceasefire under host-state consent.',
    category: 'Military'
  },
  {
    id: 'targeted-sanctions',
    name: 'Targeted Financial & Travel Sanctions on Regime Leaders',
    description: 'Freezes overseas bank accounts and restricts foreign travel for high-ranking military and political figures.',
    category: 'Sanctions'
  },
  {
    id: 'arms-embargo',
    name: 'Mandatory Comprehensive Arms Embargo',
    description: 'Prohibits all states from selling, transferring, or supplying weapons and dual-use technology to all belligerents.',
    category: 'Sanctions'
  },
  {
    id: 'icc-referral',
    name: 'Referral to International Criminal Court (ICC)',
    description: 'Refers alleged war crimes and crimes against humanity to the Prosecutor of the ICC for investigation.',
    category: 'Justice'
  },
  {
    id: 'humanitarian-corridor',
    name: 'Guaranteed Unhindered Humanitarian Access Corridors',
    description: 'Demands immediate, unhindered delivery of food, medical supplies, and aid to civilian populations.',
    category: 'Monitoring'
  }
];

export function UNSCNegotiator() {
  const [selectedClauseIds, setSelectedClauseIds] = useState<string[]>([
    'peacekeeping-obs',
    'humanitarian-corridor'
  ]);

  const toggleClause = (id: string) => {
    setSelectedClauseIds(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  // P5 Voting Logic based on Clause combinations
  const hasForce = selectedClauseIds.includes('force-ch7');
  const hasSanctions = selectedClauseIds.includes('targeted-sanctions');
  const hasEmbargo = selectedClauseIds.includes('arms-embargo');
  const hasICC = selectedClauseIds.includes('icc-referral');
  const hasPeacekeeping = selectedClauseIds.includes('peacekeeping-obs');
  const hasHumanitarian = selectedClauseIds.includes('humanitarian-corridor');

  // P5 Stances
  const p5Stances = [
    {
      country: 'United States',
      flag: '🇺🇸',
      vote: hasHumanitarian || hasICC || hasForce ? 'YES' : 'ABSTAIN',
      reason: hasForce || hasICC ? 'Strongly supports military enforcement and international justice mechanisms.' : 'Prefers stronger democratic and human rights enforcement.'
    },
    {
      country: 'United Kingdom',
      flag: '🇬🇧',
      vote: hasHumanitarian || hasPeacekeeping ? 'YES' : 'ABSTAIN',
      reason: 'Supports rule of law, diplomatic monitoring, and multilateral sanctions.'
    },
    {
      country: 'France',
      flag: '🇫🇷',
      vote: hasHumanitarian || hasPeacekeeping ? 'YES' : 'ABSTAIN',
      reason: 'Emphasizes R2P (Responsibility to Protect) and humanitarian corridors.'
    },
    {
      country: 'China',
      flag: '🇨🇳',
      vote: hasForce || hasICC ? 'VETO' : (hasSanctions && !hasEmbargo) ? 'ABSTAIN' : 'YES',
      reason: (hasForce || hasICC) ? 'VETO: Strictly opposes violation of state sovereignty (Article 2(7)) and ICC jurisdiction.' : 'Accepts peaceful peacekeeping monitoring and humanitarian aid.'
    },
    {
      country: 'Russia',
      flag: '🇷🇺',
      vote: (hasForce || hasSanctions || hasICC) ? 'VETO' : 'YES',
      reason: (hasForce || hasSanctions || hasICC) ? 'VETO: Opposes Western regime change, sanctions, and ICC referrals against strategic allies.' : 'Agrees to neutral ceasefire monitoring without coercive sanctions.'
    }
  ];

  const vetoCount = p5Stances.filter(p => p.vote === 'VETO').length;
  const yesCountP5 = p5Stances.filter(p => p.vote === 'YES').length;
  const abstainCountP5 = p5Stances.filter(p => p.vote === 'ABSTAIN').length;

  // Elected 10 vote simulation (assumes 7 out of 10 vote YES if reasonable draft)
  const nonPermanentYes = selectedClauseIds.length > 0 ? 8 : 4;
  const totalYes = yesCountP5 + nonPermanentYes;
  const passesNineVoteThreshold = totalYes >= 9;
  const resolutionAdopted = passesNineVoteThreshold && vetoCount === 0;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs uppercase tracking-wider mb-1">
            <Globe className="w-4 h-4" />
            Institutional Bargaining Lab (Week 10)
          </div>
          <h2 className="text-2xl font-bold text-zinc-900">UN Security Council Veto Bargaining Simulator</h2>
          <p className="text-xs text-zinc-600 mt-1">
            Craft a resolution to resolve an international crisis. Balance enforcement against the veto power of the Permanent Five (P5).
          </p>
        </div>

        {/* Resolution Outcome Status Badge */}
        <div className={`px-5 py-3 rounded-2xl border flex items-center gap-3 ${
          resolutionAdopted
            ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
            : vetoCount > 0
            ? 'bg-rose-50 border-rose-300 text-rose-950'
            : 'bg-amber-50 border-amber-300 text-amber-950'
        }`}>
          {resolutionAdopted ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          ) : vetoCount > 0 ? (
            <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
          ) : (
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
          )}

          <div>
            <div className="text-xs font-bold uppercase tracking-wide">
              {resolutionAdopted ? 'Resolution Passed & Adopted' : vetoCount > 0 ? 'Resolution Vetoed' : 'Insufficient Votes'}
            </div>
            <div className="text-[11px] font-medium opacity-90">
              {resolutionAdopted
                ? `Adopted with ${totalYes}/15 votes and 0 P5 vetoes.`
                : vetoCount > 0
                ? `Blocked by ${vetoCount} P5 Veto${vetoCount > 1 ? 'es' : ''}.`
                : `Needs 9 votes minimum (currently ${totalYes}/15).`}
            </div>
          </div>
        </div>
      </div>

      {/* 3D Chamber Visualizer */}
      <UNSC3DChamberCanvas p5Stances={p5Stances} isVetoed={vetoCount > 0} />

      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Col: Resolution Builder (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-zinc-900 text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              Draft Resolution Clauses
            </h3>
            <span className="text-xs text-zinc-500 font-medium">
              {selectedClauseIds.length} clauses included
            </span>
          </div>

          <div className="space-y-3">
            {availableClauses.map(clause => {
              const isSelected = selectedClauseIds.includes(clause.id);
              return (
                <div
                  key={clause.id}
                  onClick={() => toggleClause(clause.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-400 shadow-xs'
                      : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300 opacity-80'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}} // handled by parent div
                    className="mt-1 rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-900">{clause.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-zinc-200 font-medium text-zinc-600">
                        {clause.category}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      {clause.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: P5 Voting Projections (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-bold text-zinc-900 text-sm flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-600" />
            P5 Voting Projections
          </h3>

          <div className="space-y-3">
            {p5Stances.map(p5 => {
              const isVeto = p5.vote === 'VETO';
              const isYes = p5.vote === 'YES';

              return (
                <div
                  key={p5.country}
                  className={`p-3.5 rounded-xl border transition-all text-xs space-y-1 ${
                    isVeto
                      ? 'bg-rose-50 border-rose-300'
                      : isYes
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-zinc-50 border-zinc-200'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5 text-zinc-900">
                      <span className="text-base">{p5.flag}</span> {p5.country}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-extrabold ${
                      isVeto
                        ? 'bg-rose-600 text-white'
                        : isYes
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-200 text-zinc-800'
                    }`}>
                      {p5.vote}
                    </span>
                  </div>
                  <p className="text-zinc-600 leading-normal text-[11px]">
                    {p5.reason}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Voting Tally Breakdown */}
          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2 text-xs">
            <div className="font-bold text-zinc-900 flex justify-between">
              <span>UN Charter Voting Rules (Article 27):</span>
              <span className="text-indigo-600">{totalYes} / 15 Yes Votes</span>
            </div>
            <p className="text-zinc-600 leading-relaxed text-[11px]">
              Substantive decisions require <strong>9 affirmative votes</strong> including the concurring votes of all P5 members. A single negative P5 vote constitutes a <strong>Veto</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Conceptual Note */}
      <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 text-xs text-indigo-950 space-y-1">
        <div className="font-bold flex items-center gap-1">
          <Info className="w-4 h-4 text-indigo-600" />
          Institutional Logic: Keohane (1998) & UN Charter
        </div>
        <p className="leading-relaxed text-zinc-700">
          International institutions like the Security Council lower transaction costs and organize collective action, but their power is constrained by sovereign interests. The P5 veto reflects the post-1945 power distribution, preventing the UN from being used by one superpower against another.
        </p>
      </div>
    </div>
  );
}
