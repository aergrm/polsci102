import { useState } from 'react';
import { ShieldAlert, Info, Scale, CheckCircle, AlertTriangle, RefreshCw, Zap } from 'lucide-react';
import { Fearon3DBargainingCanvas } from './Fearon3DBargainingCanvas';

export function BargainingSimulation() {
  const [probAlphaWin, setProbAlphaWin] = useState<number>(60); // p = 0.60
  const [costAlpha, setCostAlpha] = useState<number>(15);      // Ca = 0.15
  const [costBeta, setCostBeta] = useState<number>(15);       // Cb = 0.15
  const [proposalAlpha, setProposalAlpha] = useState<number>(55); // Alpha demands x = 55%

  // Private info mode
  const [privateInfoMode, setPrivateInfoMode] = useState<boolean>(false);
  const [realBetaCost, setRealBetaCost] = useState<number>(10);
  const [perceivedBetaCost, setPerceivedBetaCost] = useState<number>(25);
  const [negotiationLog, setNegotiationLog] = useState<string[]>([]);

  // Calculations
  const alphaWarPayoff = probAlphaWin - costAlpha;
  const betaWarPayoff = (100 - probAlphaWin) - (privateInfoMode ? realBetaCost : costBeta);
  
  // Beta accepts if share given to Beta (100 - x) >= betaWarPayoff
  // i.e., x <= 100 - betaWarPayoff = probAlphaWin + betaCost
  const maxAlphaProposalBetaAccepts = 100 - betaWarPayoff;
  const isAccepted = proposalAlpha >= alphaWarPayoff && proposalAlpha <= maxAlphaProposalBetaAccepts;
  const alphaWarPreferred = proposalAlpha < alphaWarPayoff;

  const resetInfoSimulation = () => {
    const randomCost = Math.floor(Math.random() * 20) + 5; // 5 to 25
    setRealBetaCost(randomCost);
    setPerceivedBetaCost(20);
    setNegotiationLog([
      `Crisis started: State Alpha believes State Beta has war costs of ${20}%. State Beta's true war cost is secret.`
    ]);
  };

  const handleTestProposal = () => {
    const minBetaDemands = (100 - probAlphaWin) - realBetaCost;
    const betaGets = 100 - proposalAlpha;
    if (betaGets >= minBetaDemands) {
      setNegotiationLog(prev => [
        `State Alpha offered ${proposalAlpha}%. State Beta accepted! (Beta gets ${betaGets}%, higher than its war payoff of ${minBetaDemands}%). Peace preserved.`,
        ...prev
      ]);
    } else {
      setNegotiationLog(prev => [
        `WAR BREAKDOWN: State Alpha offered ${proposalAlpha}%, leaving State Beta with ${betaGets}%. Beta rejected because its secret war cost was low (${realBetaCost}%), making war payoff ${minBetaDemands}%. War erupted!`,
        ...prev
      ]);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-sm space-y-8">
      <div className="border-b border-zinc-200 pb-4">
        <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-1">
          <Scale className="w-5 h-5" />
          Rationalist Model of War
        </div>
        <h2 className="text-2xl font-bold text-zinc-900">Fearon Bargaining Simulation</h2>
        <p className="text-zinc-600 text-sm mt-1">
          Explore why rational states fight despite war being costly. Adjust power balances, war costs, and information to observe bargaining ranges and agreement breakdowns.
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex flex-wrap gap-3 border-b border-zinc-100 pb-4">
        <button
          onClick={() => setPrivateInfoMode(false)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !privateInfoMode ? 'bg-indigo-600 text-white shadow-sm' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
          }`}
        >
          Complete Information Mode
        </button>
        <button
          onClick={() => {
            setPrivateInfoMode(true);
            resetInfoSimulation();
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            privateInfoMode ? 'bg-indigo-600 text-white shadow-sm' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
          }`}
        >
          Private Information & Miscalculation Mode
        </button>
      </div>

      {!privateInfoMode ? (
        <div className="space-y-6">
          {/* 3D Bargaining Range Model */}
          <Fearon3DBargainingCanvas
            alphaWarPayoff={alphaWarPayoff}
            maxAlphaProposalBetaAccepts={maxAlphaProposalBetaAccepts}
            proposalAlpha={proposalAlpha}
            isAccepted={isAccepted}
          />

          {/* Sliders Grid */}
          <div className="grid md:grid-cols-3 gap-6 bg-zinc-50 p-6 rounded-xl border border-zinc-200">
            <div>
              <label className="block text-sm font-semibold text-zinc-800 mb-1">
                State Alpha Victory Probability (<i>p</i>): <span className="text-indigo-600">{probAlphaWin}%</span>
              </label>
              <input
                type="range"
                min="10"
                max="90"
                value={probAlphaWin}
                onChange={(e) => setProbAlphaWin(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <p className="text-xs text-zinc-500 mt-1">State Beta win probability: {100 - probAlphaWin}%</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 mb-1">
                State Alpha War Cost (<i>C</i><sub>A</sub>): <span className="text-rose-600">{costAlpha}%</span>
              </label>
              <input
                type="range"
                min="1"
                max="30"
                value={costAlpha}
                onChange={(e) => setCostAlpha(Number(e.target.value))}
                className="w-full accent-rose-600"
              />
              <p className="text-xs text-zinc-500 mt-1">Alpha expected war value: {alphaWarPayoff}%</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 mb-1">
                State Beta War Cost (<i>C</i><sub>B</sub>): <span className="text-rose-600">{costBeta}%</span>
              </label>
              <input
                type="range"
                min="1"
                max="30"
                value={costBeta}
                onChange={(e) => setCostBeta(Number(e.target.value))}
                className="w-full accent-rose-600"
              />
              <p className="text-xs text-zinc-500 mt-1">Beta expected war value: {betaWarPayoff}%</p>
            </div>
          </div>

          {/* Bargaining Space Visualizer */}
          <div className="bg-white p-6 rounded-xl border border-zinc-200 space-y-4">
            <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wide">
              Bargaining Range Visualization (Resource Value = 100%)
            </h3>

            {/* Visual Bar */}
            <div className="relative h-12 bg-zinc-200 rounded-lg overflow-hidden flex items-center border border-zinc-300">
              {/* Alpha War Payoff Zone */}
              <div
                style={{ width: `${Math.max(0, alphaWarPayoff)}%` }}
                className="h-full bg-rose-200 border-r border-rose-400 flex items-center justify-center text-xs font-bold text-rose-900 px-1 truncate"
                title="Alpha War Payoff"
              >
                Alpha War ({alphaWarPayoff}%)
              </div>

              {/* Bargaining Range (Peaceful Deals) */}
              <div
                style={{ width: `${Math.max(0, maxAlphaProposalBetaAccepts - alphaWarPayoff)}%` }}
                className="h-full bg-emerald-200 border-r border-emerald-400 flex items-center justify-center text-xs font-bold text-emerald-900 px-1 truncate"
                title="Bargaining Range"
              >
                Bargaining Range ({maxAlphaProposalBetaAccepts - alphaWarPayoff}%)
              </div>

              {/* Beta War Payoff Zone */}
              <div
                style={{ width: `${Math.max(0, 100 - maxAlphaProposalBetaAccepts)}%` }}
                className="h-full bg-amber-200 flex items-center justify-center text-xs font-bold text-amber-900 px-1 truncate"
                title="Beta War Payoff"
              >
                Beta War ({betaWarPayoff}%)
              </div>

              {/* Proposal Marker */}
              <div
                style={{ left: `${proposalAlpha}%` }}
                className="absolute top-0 bottom-0 w-1 bg-indigo-600 z-10 flex flex-col items-center"
              >
                <div className="bg-indigo-700 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded -mt-6 whitespace-nowrap shadow">
                  Demand: {proposalAlpha}%
                </div>
              </div>
            </div>

            {/* Interactive Proposal Control */}
            <div className="pt-4 border-t border-zinc-100">
              <label className="block text-sm font-semibold text-zinc-800 mb-1">
                State Alpha Demands Resource Share (<i>x</i>): <span className="text-indigo-600 font-bold">{proposalAlpha}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={proposalAlpha}
                onChange={(e) => setProposalAlpha(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            {/* Outcome Callout */}
            <div className={`p-4 rounded-xl border flex items-start gap-3 ${
              isAccepted
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : alphaWarPreferred
                ? 'bg-rose-50 border-rose-200 text-rose-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              {isAccepted ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="font-bold text-sm">
                  {isAccepted
                    ? 'PEACEFUL AGREEMENT REACHED'
                    : alphaWarPreferred
                    ? 'WAR: Alpha Prefers War Over This Offer'
                    : 'WAR: Beta Rejects Alpha\'s Demand'}
                </h4>
                <p className="text-xs mt-1 leading-relaxed">
                  {isAccepted ? (
                    <>State Alpha gets {proposalAlpha}% and State Beta receives {100 - proposalAlpha}%. Both states strictly prefer this peaceful deal over paying war costs (<i>C</i><sub>A</sub> = {costAlpha}%, <i>C</i><sub>B</sub> = {costBeta}%).</>
                  ) : alphaWarPreferred ? (
                    `State Alpha expects a war payoff of ${alphaWarPayoff}%. A offer of ${proposalAlpha}% gives Alpha less than fighting would!`
                  ) : (
                    `State Beta requires at least ${betaWarPayoff}% to refrain from war. Alpha's demand leaves Beta with only ${100 - proposalAlpha}%, forcing Beta to fight.`
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Private Information Mode */
        <div className="space-y-6">
          <div className="bg-amber-50 p-5 rounded-xl border border-amber-200 text-amber-900 text-sm space-y-2">
            <div className="flex items-center gap-2 font-bold">
              <Zap className="w-5 h-5 text-amber-600" />
              Incomplete Information & Incentive to Misrepresent
            </div>
            <p>
              In real international relations, states do not know their opponents' exact resolve or military capabilities. State Alpha must guess State Beta's war cost (<i>C</i><sub>B</sub>).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-50 p-5 rounded-xl border border-zinc-200 space-y-4">
              <h3 className="font-bold text-zinc-900 text-sm">Negotiator Controls (You are State Alpha)</h3>
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Your Demand (<i>x</i>): <span className="font-bold text-indigo-600">{proposalAlpha}%</span>
                </label>
                <input
                  type="range"
                  min="30"
                  max="90"
                  value={proposalAlpha}
                  onChange={(e) => setProposalAlpha(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleTestProposal}
                  className="flex-1 bg-indigo-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Submit Proposal
                </button>
                <button
                  onClick={resetInfoSimulation}
                  className="p-2 border border-zinc-300 rounded-lg text-zinc-600 hover:bg-zinc-100 transition"
                  title="Reset Secret Scenario"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="bg-zinc-900 text-zinc-100 p-5 rounded-xl space-y-3 font-mono text-xs overflow-y-auto max-h-60">
              <div className="text-zinc-400 font-sans font-bold uppercase tracking-wider text-[11px] mb-2">
                Crisis Negotiation Log
              </div>
              {negotiationLog.length === 0 ? (
                <div className="text-zinc-500 italic">Click "Submit Proposal" to test your bargaining strategy...</div>
              ) : (
                negotiationLog.map((log, idx) => (
                  <div key={idx} className="border-b border-zinc-800 pb-2">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Analytical Takeaway */}
      <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-xl text-indigo-950 space-y-2 text-sm">
        <div className="font-bold flex items-center gap-2">
          <Info className="w-4 h-4 text-indigo-600" />
          Theoretical Foundation: Why War Happens
        </div>
        <p className="text-xs text-indigo-900 leading-relaxed">
          Fearon (1995) showed that because war is inefficient (costs <i>C</i><sub>A</sub> + <i>C</i><sub>B</sub> are destroyed in fighting), a bargaining range of peaceful agreements always exists under complete information. War only occurs rationally due to: 1) Information asymmetry with incentive to misrepresent capabilities/resolve, 2) Commitment problems (fear of future power shifts), or 3) Issue indivisibility.
        </p>
      </div>
    </div>
  );
}
