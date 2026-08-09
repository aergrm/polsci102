import { useState } from 'react';
import { BookOpen, RotateCw, Check, X, ArrowLeft, ArrowRight, Sparkles, Trophy } from 'lucide-react';

interface Flashcard {
  id: string;
  category: 'Essential Knowledge' | 'Security & Conflict' | 'Institutions & Cooperation' | 'Political Economy';
  term: string;
  definition: string;
  citationOrExample: string;
}

const flashcards: Flashcard[] = [
  {
    id: 'f1',
    category: 'Essential Knowledge',
    term: 'Anarchy',
    definition: 'The absence of a central global governing authority above sovereign states to enforce laws and agreements.',
    citationOrExample: 'Central premise of Realism (Waltz 1979; Mearsheimer 2001).'
  },
  {
    id: 'f2',
    category: 'Security & Conflict',
    term: 'Security Dilemma',
    definition: 'A state where actions taken by one state to increase its own security (e.g. military buildup) inadvertently cause neighboring states to feel less secure, prompting counter-measures.',
    citationOrExample: 'Jervis (1978) - "Cooperation under the Security Dilemma"'
  },
  {
    id: 'f11',
    category: 'Security & Conflict',
    term: 'Offense-Defense Balance',
    definition: 'Whether it is easier to destroy the other state\'s territory and forces than it is to defend one\'s own. When offense has the advantage, war is far more likely.',
    citationOrExample: 'Stephen Van Evera (1998) / Robert Jervis (1978)'
  },
  {
    id: 'f12',
    category: 'Essential Knowledge',
    term: 'Hegemonic Stability Theory',
    definition: 'The proposition that the international system is most stable when a single dominant superpower (hegemon) enforces rules, open trade, and maritime security.',
    citationOrExample: 'Charles Kindleberger (1973); Robert Gilpin (1987)'
  },
  {
    id: 'f13',
    category: 'Essential Knowledge',
    term: 'Constructivism',
    definition: 'IR theory emphasizing that key aspects of international relations are socially constructed through shared ideas, norms, identities, and discourse rather than inherent material structures.',
    citationOrExample: 'Alexander Wendt (1992) - "Anarchy is What States Make of It"'
  },
  {
    id: 'f14',
    category: 'Essential Knowledge',
    term: 'Bipolarity vs. Multipolarity',
    definition: 'Bipolarity features two predominant superpowers (e.g. Cold War US-USSR), often creating simpler balancing. Multipolarity features three or more major powers, creating shifting alliance complexities.',
    citationOrExample: 'Kenneth Waltz (1979) Theory of International Politics'
  },
  {
    id: 'f3',
    category: 'Security & Conflict',
    term: 'Deterrence vs. Compellence',
    definition: 'Deterrence uses threats to prevent an adversary from acting. Compellence uses threats or force to make an adversary stop an ongoing action or undo a previous step.',
    citationOrExample: 'Thomas Schelling (1966) - "Arms and Influence"'
  },
  {
    id: 'f4',
    category: 'Essential Knowledge',
    term: 'P5 (Permanent Five)',
    definition: 'The five permanent, veto-wielding members of the UN Security Council: United States, United Kingdom, France, Russia, and China.',
    citationOrExample: 'UN Charter Article 27'
  },
  {
    id: 'f5',
    category: 'Institutions & Cooperation',
    term: 'Democratic Peace Theory',
    definition: 'The empirical finding that established democratic states rarely, if ever, go to war with one another.',
    citationOrExample: 'Kant (1795); Doyle (1983)'
  },
  {
    id: 'f6',
    category: 'Political Economy',
    term: 'Weaponized Interdependence',
    definition: 'How asymmetric global economic networks allow central hub states to leverage chokepoints and access points for coercion.',
    citationOrExample: 'Farrell & Newman (2019)'
  },
  {
    id: 'f7',
    category: 'Institutions & Cooperation',
    term: 'Responsibility to Protect (R2P)',
    definition: 'International norm holding that sovereignty implies a duty to protect populations from genocide, war crimes, ethnic cleansing, and crimes against humanity.',
    citationOrExample: 'UN 2005 World Summit / Evans & Sahnoun (2002)'
  },
  {
    id: 'f8',
    category: 'Security & Conflict',
    term: 'Fearon\'s Rationalist Explanations for War',
    definition: 'War is costly and inefficient; rational states fail to reach peaceful bargaining agreements due to: 1) Information Asymmetry, 2) Commitment Problems, 3) Issue Indivisibility.',
    citationOrExample: 'James Fearon (1995)'
  },
  {
    id: 'f9',
    category: 'Essential Knowledge',
    term: '1648 Peace of Westphalia',
    definition: 'Historical treaties establishing the modern state system principle of territorial sovereignty and non-interference in domestic affairs.',
    citationOrExample: 'Origins of modern sovereignty'
  },
  {
    id: 'f10',
    category: 'Political Economy',
    term: 'Tragedy of the Commons',
    definition: 'A collective action problem where individual rational actors deplete or degrade a shared finite resource (e.g. global atmosphere, ocean fisheries).',
    citationOrExample: 'Garrett Hardin (1968)'
  }
];

export function FlashcardTrainer() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownIds, setKnownIds] = useState<string[]>([]);
  const [reviewIds, setReviewIds] = useState<string[]>([]);

  const filteredCards = flashcards.filter(c =>
    selectedCategory === 'All' ? true : c.category === selectedCategory
  );

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const markKnown = () => {
    if (currentCard && !knownIds.includes(currentCard.id)) {
      setKnownIds(prev => [...prev, currentCard.id]);
      setReviewIds(prev => prev.filter(id => id !== currentCard.id));
    }
    handleNext();
  };

  const markReview = () => {
    if (currentCard && !reviewIds.includes(currentCard.id)) {
      setReviewIds(prev => [...prev, currentCard.id]);
      setKnownIds(prev => prev.filter(id => id !== currentCard.id));
    }
    handleNext();
  };

  const categories = ['All', 'Essential Knowledge', 'Security & Conflict', 'Institutions & Cooperation', 'Political Economy'];

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            Concept & Terminology Practice
          </div>
          <h2 className="text-2xl font-bold text-zinc-900">IR Key Concepts Flashcards</h2>
          <p className="text-xs text-zinc-600 mt-1">
            Master fundamental IR vocabulary, historical reference points, and core theoretical mechanisms.
          </p>
        </div>

        {/* Mastered Progress Badge */}
        <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 px-4 py-2 rounded-xl text-xs">
          <div className="flex items-center gap-1.5 font-bold text-emerald-600">
            <Trophy className="w-4 h-4" />
            Mastered: {knownIds.length} / {flashcards.length}
          </div>
          <div className="h-4 w-[1px] bg-zinc-300"></div>
          <div className="text-zinc-500 font-medium">
            Card {currentIndex + 1} of {filteredCards.length}
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Flashcard Area */}
      {filteredCards.length > 0 && currentCard ? (
        <div className="space-y-6">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[260px] cursor-pointer bg-gradient-to-br from-indigo-950 via-zinc-900 to-indigo-900 text-white rounded-3xl p-8 md:p-10 shadow-lg flex flex-col justify-between relative overflow-hidden transition-all hover:scale-[1.01]"
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <span>{currentCard.category}</span>
              <span className="flex items-center gap-1 text-indigo-400">
                <RotateCw className="w-3.5 h-3.5" /> Click to Flip Card
              </span>
            </div>

            {/* Main Content */}
            <div className="my-auto py-6 text-center">
              {!isFlipped ? (
                <div className="space-y-2">
                  <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                    {currentCard.term}
                  </div>
                  <p className="text-xs text-indigo-200 font-medium">
                    (Click to reveal definition & scholarly context)
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-w-xl mx-auto animate-fadeIn">
                  <div className="text-lg md:text-xl font-bold text-indigo-100 leading-relaxed">
                    "{currentCard.definition}"
                  </div>
                  <div className="text-xs text-indigo-300 font-medium pt-2 border-t border-indigo-800/80">
                    Scholarly / Historical Context: <strong className="text-white">{currentCard.citationOrExample}</strong>
                  </div>
                </div>
              )}
            </div>

            {/* Card Status Indicator */}
            <div className="flex items-center justify-between text-[11px] text-indigo-300 font-medium">
              <span>
                {knownIds.includes(currentCard.id)
                  ? '✓ Mastered'
                  : reviewIds.includes(currentCard.id)
                  ? '↺ Flagged for Review'
                  : 'Unstudied'}
              </span>
              <span>POL SCI 102 Core Study Set</span>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl transition-colors"
                title="Previous Card"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl transition-colors"
                title="Next Card"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mastery Rating Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={markReview}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 font-bold text-xs hover:bg-rose-100 flex items-center justify-center gap-1.5 transition-colors"
              >
                <X className="w-4 h-4 text-rose-600" /> Review Again
              </button>
              <button
                onClick={markKnown}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 font-bold text-xs hover:bg-emerald-100 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Check className="w-4 h-4 text-emerald-600" /> Got It!
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-zinc-500 text-xs">
          No flashcards found in this category.
        </div>
      )}
    </div>
  );
}
