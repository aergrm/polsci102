import { useState } from 'react';
import { Shield, Swords, RotateCcw, Award, Info, AlertCircle } from 'lucide-react';

type Strategy = 'tit-for-tat' | 'hawkish' | 'dovish' | 'grim-trigger' | 'random';

interface HistoryItem {
  round: number;
  playerMove: 'cooperate' | 'defect';
  opponentMove: 'cooperate' | 'defect';
  playerPayoff: number;
  opponentPayoff: number;
}

export function PrisonersDilemma() {
  const [strategy, setStrategy] = useState<Strategy>('tit-for-tat');
  const [roundsPlayed, setRoundsPlayed] = useState<number>(0);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [opponentScore, setOpponentScore] = useState<number>(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [opponentDefectedEver, setOpponentDefectedEver] = useState<boolean>(false);
  const [playerDefectedEver, setPlayerDefectedEver] = useState<boolean>(false);

  const getOpponentMove = (
    currentStrategy: Strategy,
    currentHistory: HistoryItem[],
    playerHasDefected: boolean
  ): 'cooperate' | 'defect' => {
    switch (currentStrategy) {
      case 'dovish':
        return 'cooperate';
      case 'hawkish':
        return 'defect';
      case 'random':
        return Math.random() > 0.5 ? 'cooperate' : 'defect';
      case 'grim-trigger':
        return playerHasDefected ? 'defect' : 'cooperate';
      case 'tit-for-tat':
      default:
        if (currentHistory.length === 0) return 'cooperate';
        return currentHistory[currentHistory.length - 1].playerMove;
    }
  };

  const handlePlayRound = (playerChoice: 'cooperate' | 'defect') => {
    if (roundsPlayed >= 10) return;

    const oppMove = getOpponentMove(strategy, history, playerDefectedEver);

    let pPayoff = 0;
    let oppPayoff = 0;

    if (playerChoice === 'cooperate' && oppMove === 'cooperate') {
      pPayoff = 3; // Mutual cooperation
      oppPayoff = 3;
    } else if (playerChoice === 'defect' && oppMove === 'defect') {
      pPayoff = 1; // Mutual defection
      oppPayoff = 1;
    } else if (playerChoice === 'defect' && oppMove === 'cooperate') {
      pPayoff = 5; // Temptation reward
      oppPayoff = 0; // Sucker payoff
    } else {
      pPayoff = 0;
      oppPayoff = 5;
    }

    const newHistoryItem: HistoryItem = {
      round: roundsPlayed + 1,
      playerMove: playerChoice,
      opponentMove: oppMove,
      playerPayoff: pPayoff,
      opponentPayoff: oppPayoff
    };

    setRoundsPlayed(prev => prev + 1);
    setPlayerScore(prev => prev + pPayoff);
    setOpponentScore(prev => prev + oppPayoff);
    setHistory(prev => [...prev, newHistoryItem]);

    if (playerChoice === 'defect') setPlayerDefectedEver(true);
    if (oppMove === 'defect') setOpponentDefectedEver(true);
  };

  const handleReset = () => {
    setRoundsPlayed(0);
    setPlayerScore(0);
    setOpponentScore(0);
    setHistory([]);
    setOpponentDefectedEver(false);
    setPlayerDefectedEver(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-sm space-y-8">
      <div className="border-b border-zinc-200 pb-4">
        <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-1">
          <Swords className="w-5 h-5" />
          Anarchy & Arms Races
        </div>
        <h2 className="text-2xl font-bold text-zinc-900">Security Dilemma & Prisoner's Dilemma Game</h2>
        <p className="text-zinc-600 text-sm mt-1">
          Simulate a 10-round strategic interaction between two rival states under international anarchy. Choose to Cooperate (Arms Control) or Defect (Military Expansion).
        </p>
      </div>

      {/* Opponent Selection & Scoreboard */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-zinc-50 p-5 rounded-xl border border-zinc-200 space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
            Opponent Foreign Policy AI
          </label>
          <select
            value={strategy}
            disabled={roundsPlayed > 0}
            onChange={(e) => {
              setStrategy(e.target.value as Strategy);
              handleReset();
            }}
            className="w-full bg-white border border-zinc-300 rounded-lg p-2 text-sm font-medium text-zinc-800 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="tit-for-tat">Tit-for-Tat (Reciprocates moves)</option>
            <option value="hawkish">Hawkish (Always Defects / Expands Arms)</option>
            <option value="dovish">Dovish (Always Cooperates / Disarms)</option>
            <option value="grim-trigger">Grim Trigger (Cooperates until betrayed once)</option>
            <option value="random">Unpredictable (Random strategy)</option>
          </select>
          <p className="text-xs text-zinc-500">
            {strategy === 'tit-for-tat' && 'Starts with Cooperation, then repeats your previous round move.'}
            {strategy === 'hawkish' && 'Never trusts rivals; aggressively expands military capabilities every round.'}
            {strategy === 'dovish' && 'Always seeks peace regardless of opponent behavior.'}
            {strategy === 'grim-trigger' && 'Cooperates until you defect once, then defects forever.'}
            {strategy === 'random' && 'Flips a coin between cooperation and defection.'}
          </p>
        </div>

        {/* Score Display */}
        <div className="bg-indigo-900 text-white p-5 rounded-xl flex items-center justify-around md:col-span-2">
          <div className="text-center">
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider block">Your State</span>
            <span className="text-3xl font-extrabold text-white">{playerScore}</span>
            <span className="text-[11px] text-indigo-200 block mt-0.5">points</span>
          </div>

          <div className="text-center">
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider block">Round</span>
            <span className="text-2xl font-bold text-amber-300">{roundsPlayed} / 10</span>
          </div>

          <div className="text-center">
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider block">Opponent State</span>
            <span className="text-3xl font-extrabold text-white">{opponentScore}</span>
            <span className="text-[11px] text-indigo-200 block mt-0.5">points</span>
          </div>
        </div>
      </div>

      {/* Payoff Matrix */}
      <div className="bg-zinc-50 p-5 rounded-xl border border-zinc-200 space-y-3">
        <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-700 flex items-center gap-2">
          <Shield className="w-4 h-4 text-indigo-600" />
          Payoff Matrix (Points Per Round)
        </h3>
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-zinc-200 p-2 font-bold text-zinc-700 rounded">State A \ State B</div>
          <div className="bg-emerald-100 text-emerald-900 p-2 font-bold rounded">B Cooperates (Disarm)</div>
          <div className="bg-rose-100 text-rose-900 p-2 font-bold rounded">B Defects (Rearm)</div>

          <div className="bg-emerald-100 text-emerald-900 p-2 font-bold rounded flex items-center justify-center">
            A Cooperates (Disarm)
          </div>
          <div className="bg-emerald-50 border border-emerald-200 p-2 rounded text-emerald-900 font-semibold">
            +3 / +3 (Peace & Stability)
          </div>
          <div className="bg-rose-50 border border-rose-200 p-2 rounded text-rose-900 font-semibold">
            0 / +5 (A Exploited)
          </div>

          <div className="bg-rose-100 text-rose-900 p-2 font-bold rounded flex items-center justify-center">
            A Defects (Rearm)
          </div>
          <div className="bg-emerald-50 border border-emerald-200 p-2 rounded text-emerald-900 font-semibold">
            +5 / 0 (A Exploits B)
          </div>
          <div className="bg-rose-50 border border-rose-200 p-2 rounded text-rose-900 font-semibold">
            +1 / +1 (Costly Arms Race)
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {roundsPlayed < 10 ? (
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => handlePlayRound('cooperate')}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-sm transition flex items-center justify-center gap-2"
          >
            <Shield className="w-5 h-5" />
            Cooperate (Sign Arms Control Pact)
          </button>
          <button
            onClick={() => handlePlayRound('defect')}
            className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-sm transition flex items-center justify-center gap-2"
          >
            <Swords className="w-5 h-5" />
            Defect (Mobilize Military Forces)
          </button>
        </div>
      ) : (
        <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl text-center space-y-3">
          <Award className="w-8 h-8 text-indigo-600 mx-auto" />
          <h3 className="text-xl font-bold text-indigo-950">Game Finished!</h3>
          <p className="text-sm text-indigo-800">
            Final Result: You scored <span className="font-bold">{playerScore}</span> points vs Opponent's{' '}
            <span className="font-bold">{opponentScore}</span> points.
          </p>
          <button
            onClick={handleReset}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition inline-flex items-center gap-2 text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Play Again
          </button>
        </div>
      )}

      {/* Round History Log */}
      {history.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Round Breakdown</h3>
            <button
              onClick={handleReset}
              className="text-xs text-zinc-500 hover:text-zinc-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Game
            </button>
          </div>

          <div className="overflow-x-auto border border-zinc-200 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-zinc-100 text-zinc-700 uppercase tracking-wider border-b border-zinc-200">
                <tr>
                  <th className="py-2.5 px-4">Round</th>
                  <th className="py-2.5 px-4">Your Move</th>
                  <th className="py-2.5 px-4">Opponent Move</th>
                  <th className="py-2.5 px-4">Score Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {history.map((h) => (
                  <tr key={h.round} className="hover:bg-zinc-50">
                    <td className="py-2 px-4 font-bold text-zinc-700">{h.round}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded font-bold ${
                          h.playerMove === 'cooperate'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {h.playerMove === 'cooperate' ? 'Cooperate' : 'Defect'}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded font-bold ${
                          h.opponentMove === 'cooperate'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {h.opponentMove === 'cooperate' ? 'Cooperate' : 'Defect'}
                      </span>
                    </td>
                    <td className="py-2 px-4 font-mono font-semibold">
                      +{h.playerPayoff} (You) / +{h.opponentPayoff} (Opponent)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Lesson Box */}
      <div className="bg-zinc-50 p-5 rounded-xl border border-zinc-200 text-xs text-zinc-700 space-y-2">
        <div className="font-bold text-zinc-900 text-sm flex items-center gap-2">
          <Info className="w-4 h-4 text-indigo-600" />
          IR Concept: The Security Dilemma
        </div>
        <p className="leading-relaxed">
          The Security Dilemma occurs when steps taken by one state to increase its own security (such as buying weapons) cause other states to feel insecure, leading to reciprocal countermeasures. In repeated games, strategies like <strong>Tit-for-Tat</strong> foster long-term cooperation by establishing reciprocity and punishing defection without holding endless grudges.
        </p>
      </div>
    </div>
  );
}
