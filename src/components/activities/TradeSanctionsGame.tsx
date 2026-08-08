import { useState } from 'react';
import { Network, Zap, ShieldAlert, ArrowRight, TrendingDown, Info, RefreshCw } from 'lucide-react';

export function TradeSanctionsGame() {
  const [sanctionIntensity, setSanctionIntensity] = useState<number>(50); // 0 to 100
  const [chokepointControl, setChokepointControl] = useState<number>(75); // 0 to 100% control of hub
  const [targetDiversification, setTargetDiversification] = useState<number>(30); // 0 to 100%
  const [applySecondarySanctions, setApplySecondarySanctions] = useState<boolean>(false);

  // Calculations
  // Direct Impact on Target State = Sanction Intensity * (Chokepoint Control / 100) * (1 - Target Diversification / 100)
  const baseTargetCost = (sanctionIntensity * (chokepointControl / 100) * (1 - targetDiversification / 100) * 0.15);
  const secondarySanctionBonus = applySecondarySanctions ? 3.5 : 0;
  const totalTargetGDPLoss = Math.min(18, Math.max(0, baseTargetCost + secondarySanctionBonus)).toFixed(1);

  // Collateral Cost to Sender State
  const baseSenderCost = (sanctionIntensity * 0.05) + (applySecondarySanctions ? 2.5 : 0);
  const senderGDPLoss = Math.min(8, Math.max(0, baseSenderCost)).toFixed(1);

  // Risk of Trade Escalation / Retaliation
  const escalationRisk = Math.min(98, Math.round((sanctionIntensity * 0.6) + (applySecondarySanctions ? 30 : 0) - (targetDiversification * 0.2)));

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs uppercase tracking-wider mb-1">
            <Network className="w-4 h-4" />
            International Political Economy Lab (Week 11)
          </div>
          <h2 className="text-2xl font-bold text-zinc-900">Weaponized Interdependence & Sanctions Simulator</h2>
          <p className="text-xs text-zinc-600 mt-1">
            Simulate economic coercion, financial messaging chokepoints, export controls, and secondary sanctions in asymmetric trade networks.
          </p>
        </div>

        <div className="bg-zinc-50 border border-zinc-200 px-4 py-2 rounded-xl text-xs flex items-center gap-3">
          <div>
            Escalation Risk: <span className={`font-bold ${escalationRisk > 65 ? 'text-rose-600' : 'text-emerald-600'}`}>{escalationRisk}%</span>
          </div>
          <div className="h-4 w-[1px] bg-zinc-300"></div>
          <div>
            Hub Centrality: <span className="font-bold text-indigo-600">{chokepointControl}%</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6 bg-zinc-50 p-6 rounded-2xl border border-zinc-200">
          <h3 className="font-bold text-zinc-900 text-sm flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-600" />
            Policy Parameters & Controls
          </h3>

          {/* Slider 1: Sanction Severity */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-zinc-800 mb-1">
              <span>Sanction & Export Control Severity:</span>
              <span className="text-indigo-600 font-bold">{sanctionIntensity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sanctionIntensity}
              onChange={(e) => setSanctionIntensity(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-[11px] text-zinc-500 mt-1">
              Higher severity restricts trade, technology transfer, and banking access more aggressively.
            </p>
          </div>

          {/* Slider 2: Chokepoint Control */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-zinc-800 mb-1">
              <span>Hub Node Control (Chokepoint Centrality):</span>
              <span className="text-indigo-600 font-bold">{chokepointControl}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={chokepointControl}
              onChange={(e) => setChokepointControl(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-[11px] text-zinc-500 mt-1">
              Measures sender's jurisdiction over global financial messaging (e.g. SWIFT) or semiconductor supply chains.
            </p>
          </div>

          {/* Slider 3: Target Diversification */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-zinc-800 mb-1">
              <span>Target State Market Diversification:</span>
              <span className="text-indigo-600 font-bold">{targetDiversification}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={targetDiversification}
              onChange={(e) => setTargetDiversification(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-[11px] text-zinc-500 mt-1">
              Ability of target state to find alternative trade partners or engage in import substitution.
            </p>
          </div>

          {/* Toggle: Secondary Sanctions */}
          <div className="pt-2 border-t border-zinc-200 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-zinc-900">Enforce Secondary Sanctions</div>
              <p className="text-[11px] text-zinc-500">
                Penalize third-party foreign firms that trade with target state.
              </p>
            </div>
            <button
              onClick={() => setApplySecondarySanctions(!applySecondarySanctions)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                applySecondarySanctions
                  ? 'bg-rose-600 text-white'
                  : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300'
              }`}
            >
              {applySecondarySanctions ? 'Active' : 'Inactive'}
            </button>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-bold text-zinc-900 text-sm flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-indigo-600" />
            Economic & Policy Impact
          </h3>

          <div className="p-5 bg-rose-50 border border-rose-200 rounded-2xl space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-800">
              Target State GDP Loss
            </div>
            <div className="text-3xl font-extrabold text-rose-950">
              -{totalTargetGDPLoss}%
            </div>
            <p className="text-[11px] text-rose-900 leading-normal">
              Direct damage to target state economy due to supply chain disruption and financial isolation.
            </p>
          </div>

          <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Sender Collateral GDP Loss
            </div>
            <div className="text-2xl font-bold text-amber-950">
              -{senderGDPLoss}%
            </div>
            <p className="text-[11px] text-amber-900 leading-normal">
              Self-inflicted cost to domestic firms losing foreign markets and trade opportunities.
            </p>
          </div>

          {/* Escalation Risk Box */}
          <div className={`p-4 rounded-xl border text-xs space-y-1.5 ${
            escalationRisk > 60
              ? 'bg-rose-100/60 border-rose-300 text-rose-950'
              : 'bg-emerald-50 border-emerald-200 text-emerald-950'
          }`}>
            <div className="font-bold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              Retaliation & Friction Forecast
            </div>
            <p className="leading-relaxed text-[11px]">
              {escalationRisk > 60
                ? 'High probability of target retaliation, trade diversion to rival blocs, and alliance strain over secondary sanctions.'
                : 'Target damage contained; low risk of immediate trade war escalation.'}
            </p>
          </div>
        </div>
      </div>

      {/* Conceptual Explanation */}
      <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 text-xs text-indigo-950 space-y-1">
        <div className="font-bold flex items-center gap-1">
          <Info className="w-4 h-4 text-indigo-600" />
          Theoretical Foundation: Farrell & Newman (2019) "Weaponized Interdependence"
        </div>
        <p className="leading-relaxed text-zinc-700">
          Global economic networks are asymmetric rather than decentralized. States that exert jurisdiction over central network "hubs" (e.g. financial messaging, physical transit routes, proprietary tech supply chains) possess coercive leverage ("panopticon" and "chokepoint" effects) over interdependent trade partners.
        </p>
      </div>
    </div>
  );
}
