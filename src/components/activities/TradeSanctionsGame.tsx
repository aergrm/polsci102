import { useState } from 'react';
import { Network, Zap, ShieldAlert, ArrowRight, TrendingDown, Info, HelpCircle, Globe, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { Trade3DNetworkCanvas } from './Trade3DNetworkCanvas';
import { soundManager } from '../../lib/soundEffects';

interface PresetScenario {
  name: string;
  flag: string;
  description: string;
  sanctionIntensity: number;
  chokepointControl: number;
  targetDiversification: number;
  applySecondarySanctions: boolean;
  realWorldExample: string;
}

const PRESET_SCENARIOS: PresetScenario[] = [
  {
    name: '2022 SWIFT Cutoff on Russia',
    flag: '🇷🇺',
    description: 'US and EU disconnected Russian banks from SWIFT and froze central bank foreign reserves.',
    sanctionIntensity: 85,
    chokepointControl: 90,
    targetDiversification: 35,
    applySecondarySanctions: true,
    realWorldExample: 'Cut off Russia from US-dollar clearing hubs, forcing Russia to trade with China/India using rubles/yuan.'
  },
  {
    name: 'US-China Chip Export Controls',
    flag: '🇨🇳',
    description: 'Restricting advanced semiconductor designs, lithography equipment, and AI chips to China.',
    sanctionIntensity: 70,
    chokepointControl: 95,
    targetDiversification: 45,
    applySecondarySanctions: true,
    realWorldExample: 'Leverages chokepoints in US chip software & Dutch ASML photolithography tools.'
  },
  {
    name: 'Targeted Iranian Financial Freeze',
    flag: '🇮🇷',
    description: 'High-intensity banking sanctions prohibiting international dollar transactions.',
    sanctionIntensity: 90,
    chokepointControl: 85,
    targetDiversification: 20,
    applySecondarySanctions: true,
    realWorldExample: 'Severely impacted Iranian oil exports and currency value through secondary banking penalties.'
  },
  {
    name: 'Mild Diplomatic Asset Freeze',
    flag: '🌐',
    description: 'Targeted sanctions on specific political individuals without broad trade blockades.',
    sanctionIntensity: 25,
    chokepointControl: 50,
    targetDiversification: 70,
    applySecondarySanctions: false,
    realWorldExample: 'Low economic collateral damage to sender states, but limited coercive impact on target policy.'
  }
];

export function TradeSanctionsGame() {
  const [sanctionIntensity, setSanctionIntensity] = useState<number>(50);
  const [chokepointControl, setChokepointControl] = useState<number>(75);
  const [targetDiversification, setTargetDiversification] = useState<number>(30);
  const [applySecondarySanctions, setApplySecondarySanctions] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getMuted());

  const handleToggleMute = () => {
    const nextMuted = soundManager.toggleMute();
    setIsMuted(nextMuted);
  };

  // Apply preset
  const applyPreset = (preset: PresetScenario) => {
    soundManager.playClick();
    setSanctionIntensity(preset.sanctionIntensity);
    setChokepointControl(preset.chokepointControl);
    setTargetDiversification(preset.targetDiversification);
    setApplySecondarySanctions(preset.applySecondarySanctions);
  };

  // Calculations
  const baseTargetCost = (sanctionIntensity * (chokepointControl / 100) * (1 - targetDiversification / 100) * 0.15);
  const secondarySanctionBonus = applySecondarySanctions ? 3.5 : 0;
  const totalTargetGDPLoss = Math.min(18, Math.max(0, baseTargetCost + secondarySanctionBonus)).toFixed(1);

  const baseSenderCost = (sanctionIntensity * 0.05) + (applySecondarySanctions ? 2.5 : 0);
  const senderGDPLoss = Math.min(8, Math.max(0, baseSenderCost)).toFixed(1);

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
            Understand how states turn global financial and technology networks into coercive weapons.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={handleToggleMute}
            className="p-2.5 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-indigo-600" />}
          </button>

          <button
            onClick={() => setShowGuide(!showGuide)}
            className="px-3.5 py-2.5 bg-zinc-100 border border-zinc-200 text-zinc-800 hover:bg-zinc-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            {showGuide ? 'Hide Guide' : 'Guide'}
          </button>
        </div>
      </div>

      {/* Plain English Concept Explainer Box */}
      {showGuide && (
        <div className="bg-gradient-to-r from-indigo-900 to-zinc-900 text-white rounded-2xl p-6 space-y-4 shadow-md animate-fadeIn">
          <div className="flex items-center justify-between border-b border-indigo-800/80 pb-3">
            <h3 className="font-bold text-base flex items-center gap-2 text-indigo-200">
              <Info className="w-5 h-5 text-indigo-400" />
              Quick Guide: What is "Weaponized Interdependence"?
            </h3>
            <span className="text-[11px] bg-indigo-800 text-indigo-200 px-2.5 py-1 rounded-full font-medium">
              Farrell & Newman Concept
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-xs">
            <div className="bg-indigo-950/60 p-4 rounded-xl border border-indigo-800/50 space-y-1.5">
              <div className="font-bold text-indigo-300 text-sm">1. Global Chokepoints</div>
              <p className="text-indigo-100/90 leading-relaxed">
                Global trade doesn't flow evenly. It flows through central "hubs"—like the <strong>SWIFT banking network</strong> in Belgium or <strong>semiconductor lithography tools</strong> in the US & Netherlands.
              </p>
            </div>

            <div className="bg-indigo-950/60 p-4 rounded-xl border border-indigo-800/50 space-y-1.5">
              <div className="font-bold text-indigo-300 text-sm">2. Coercive Leverage</div>
              <p className="text-indigo-100/90 leading-relaxed">
                If a state controls the hub, it can cut off access ("Chokepoint Effect") or monitor all traffic ("Panopticon Effect") to force target states to change their behavior.
              </p>
            </div>

            <div className="bg-indigo-950/60 p-4 rounded-xl border border-indigo-800/50 space-y-1.5">
              <div className="font-bold text-indigo-300 text-sm">3. The Double-Edged Sword</div>
              <p className="text-indigo-100/90 leading-relaxed">
                Sanctions hurt the victim, but also harm domestic exporters (collateral damage) and incentivize target states to build alternative non-Western networks.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Real World Scenario Presets */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-zinc-700 uppercase tracking-wider flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-indigo-600" />
          Try a Real-World Historical Case:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_SCENARIOS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="p-3.5 bg-zinc-50 hover:bg-indigo-50/60 border border-zinc-200 hover:border-indigo-300 rounded-xl text-left transition-all space-y-1 group"
            >
              <div className="flex items-center justify-between font-bold text-xs text-zinc-900 group-hover:text-indigo-900">
                <span className="flex items-center gap-1.5">
                  <span>{preset.flag}</span>
                  {preset.name}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed">
                {preset.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Network Flow Visualization Box with 3D Canvas */}
      <div className="space-y-3">
        <Trade3DNetworkCanvas
          sanctionIntensity={sanctionIntensity}
          chokepointControl={chokepointControl}
          targetDiversification={targetDiversification}
          applySecondarySanctions={applySecondarySanctions}
        />

        <div className="grid md:grid-cols-3 gap-4 items-center text-center py-1 bg-slate-900 text-white p-4 rounded-2xl border border-slate-800">
          {/* Node 1: Sender Country */}
          <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-xl space-y-0.5">
            <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Sender State (Sanctioner)</div>
            <div className="text-sm font-extrabold text-white">Hub Jurisdiction</div>
            <div className="text-[10px] text-slate-400">Controls {chokepointControl}% of global hub</div>
          </div>

          {/* Connection Arrow / Chokepoint */}
          <div className="space-y-1">
            <div className="p-2.5 bg-indigo-950 border border-indigo-700 rounded-xl text-indigo-200 text-xs font-bold">
              ⚡ Chokepoint Blockade: {sanctionIntensity}%
              <div className="text-[10px] text-indigo-300 font-normal mt-0.5">
                SWIFT / Dollar / Chips
              </div>
            </div>
          </div>

          {/* Node 2: Target Country */}
          <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-xl space-y-0.5">
            <div className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">Target State (Sanctioned)</div>
            <div className="text-sm font-extrabold text-white">Impacted Economy</div>
            <div className="text-[10px] text-slate-400">
              {targetDiversification > 50 ? 'High Alternative Routes' : 'Isolated / Low Alternatives'}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Results Grid */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6 bg-zinc-50 p-6 rounded-2xl border border-zinc-200">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-zinc-900 text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-600" />
              Adjust Sanction & Network Variables
            </h3>
            <button
              onClick={() => {
                setSanctionIntensity(50);
                setChokepointControl(75);
                setTargetDiversification(30);
                setApplySecondarySanctions(false);
              }}
              className="text-xs text-zinc-500 hover:text-indigo-600 flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Slider 1: Sanction Severity */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-zinc-800">
              <span>1. Sanction & Export Control Severity:</span>
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
            <p className="text-[11px] text-zinc-500">
              <strong>What this means:</strong> How strict are the legal penalties? (0% = Normal trade, 100% = Full trade blockade & asset seizure).
            </p>
          </div>

          {/* Slider 2: Chokepoint Control */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-zinc-800">
              <span>2. Hub Node Control (Chokepoint Centrality):</span>
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
            <p className="text-[11px] text-zinc-500">
              <strong>What this means:</strong> How much of the global system passes through your legal jurisdiction? (e.g. US dollar dominates 85%+ of international payments).
            </p>
          </div>

          {/* Slider 3: Target Diversification */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-zinc-800">
              <span>3. Target State Market Diversification:</span>
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
            <p className="text-[11px] text-zinc-500">
              <strong>What this means:</strong> Can the target country easily trade with non-sanctioning neutral partners (e.g. China, India, Brazil) or make goods domestically?
            </p>
          </div>

          {/* Toggle: Secondary Sanctions */}
          <div className="pt-3 border-t border-zinc-200 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-zinc-900">4. Enforce Secondary Sanctions</div>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Threaten to ban <em>third-party foreign companies</em> (e.g. European banks) from US markets if they keep trading with the target state.
              </p>
            </div>
            <button
              onClick={() => setApplySecondarySanctions(!applySecondarySanctions)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 ${
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
            Predicted Outcomes & Costs
          </h3>

          <div className="p-5 bg-rose-50 border border-rose-200 rounded-2xl space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-800">
              Target State Economic GDP Damage
            </div>
            <div className="text-3xl font-extrabold text-rose-950">
              -{totalTargetGDPLoss}%
            </div>
            <p className="text-[11px] text-rose-900 leading-normal">
              {Number(totalTargetGDPLoss) > 8
                ? 'Severe economic crunch: currency devaluation, high inflation, and supply chain bottlenecks.'
                : 'Moderate economic impact: target state manages to cushion blow via trade diversion.'}
            </p>
          </div>

          <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Sender Collateral Cost (Self-Inflicted Damage)
            </div>
            <div className="text-2xl font-bold text-amber-950">
              -{senderGDPLoss}%
            </div>
            <p className="text-[11px] text-amber-900 leading-normal">
              Loss of sales for domestic firms and long-term risk of world adopting alternative payment systems.
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
              Trade War & Geopolitical Retaliation Risk: {escalationRisk}%
            </div>
            <p className="leading-relaxed text-[11px]">
              {escalationRisk > 60
                ? 'High risk of tit-for-tat retaliatory tariffs, supply chokepoint counter-sanctions (e.g. rare earth metals export bans), and diplomatic friction with third-party allies.'
                : 'Manageable geopolitical tension; risk of wider trade war remains low.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
