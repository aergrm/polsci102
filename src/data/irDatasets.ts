import midDataJson from './midFullData.json';
import alliancesDataJson from './alliancesFullData.json';
import dcadDataJson from './dcadFullData.json';
import terrChangesDataJson from './terrChangesFullData.json';
import nmcV7DataJson from './nmcV7FullData.json';
import armsTechDataJson from './armsTechFullData.json';
import tradeDataJson from './tradeFullData.json';

export interface DisputeRecord {
  id: number;
  stYear: number;
  endYear: number;
  stMon: number;
  endMon: number;
  hostLev: number;
  hostLevLabel: string;
  outcome: number;
  outcomeLabel: string;
  settle: number;
  settleLabel: string;
  fatality: number;
  fatalityLabel: string;
  durationDays: number;
  reciprocated: boolean;
  sideA: string[];
  sideB: string[];
  sideACodes: string[];
  sideBCodes: string[];
}

export interface CountryStat {
  code: string;
  name: string;
  total: number;
  sideA: number;
  sideB: number;
  wars: number;
  usesOfForce: number;
  displaysOfForce: number;
  threats: number;
  revisionist: number;
}

export interface NotableDispute {
  id: number;
  title: string;
  year: number;
  durationDays: number;
  hostLev: number;
  hostLevLabel: string;
  sideA: string[];
  sideB: string[];
  outcome: string;
  settlement: string;
  fatality: string;
  irConcepts: string[];
  description: string;
}

export interface AnnualDisputePoint {
  year: number;
  total: number;
  threats: number;
  displays: number;
  usesOfForce: number;
  wars: number;
}

export interface DecadeDisputePoint {
  decade: string;
  startYear: number;
  total: number;
  threats: number;
  displays: number;
  usesOfForce: number;
  wars: number;
}

export const midSummary = midDataJson.summary;
export const midAnnual: AnnualDisputePoint[] = midDataJson.annual;
export const midDecades: DecadeDisputePoint[] = midDataJson.decades;
export const midCountries: CountryStat[] = midDataJson.countries;
export const midNotable: NotableDispute[] = midDataJson.notable;
export const midAllDisputes: DisputeRecord[] = midDataJson.disputes;

// ==========================================
// 2. COW Formal Alliances Dataset v4.1 (1816 - 2012)
// ==========================================
export interface AllianceMember {
  state: string;
  ccode: number;
  startYear: number | null;
  endYear: number | null;
}

export interface AllianceRecord {
  id: number;
  name: string;
  category: 'Defense Pact' | 'Non-Aggression' | 'Entente' | 'Neutrality';
  ssType: string;
  startYear: number | null;
  endYear: number | null;
  isOngoing: boolean;
  defense: boolean;
  neutrality: boolean;
  nonaggression: boolean;
  entente: boolean;
  memberCount: number;
  members: string[];
  memberDetails: AllianceMember[];
}

export interface DecadeAlliancePoint {
  decade: string;
  year: number;
  defense: number;
  nonaggression: number;
  entente: number;
  neutrality: number;
  total: number;
}

export interface AnnualActivePoint {
  year: number;
  defense: number;
  nonaggression: number;
  entente: number;
  neutrality: number;
  total: number;
}

export interface CanonicalAlliance {
  id: number;
  title: string;
  year: number;
  endYear: number | string;
  type: 'Defense Pact' | 'Non-Aggression' | 'Entente' | 'Neutrality';
  members: string[];
  irConcepts: string[];
  strategicPurpose: string;
  historicalOutcome: string;
}

export const alliancesSummary = alliancesDataJson.summary;
export const alliancesDecades: DecadeAlliancePoint[] = alliancesDataJson.decadeSeries;
export const alliancesAnnualActive: AnnualActivePoint[] = alliancesDataJson.annualActive;
export const alliancesAll: AllianceRecord[] = alliancesDataJson.alliances as AllianceRecord[];

export const canonicalAlliancesList: CanonicalAlliance[] = [
  {
    id: 227,
    title: 'North Atlantic Treaty Organization (NATO)',
    year: 1949,
    endYear: 'Ongoing',
    type: 'Defense Pact',
    members: ['United States', 'United Kingdom', 'France', 'Canada', 'Italy', 'Benelux', 'Norway', '+ 23 expanded members'],
    irConcepts: ['Article 5 Collective Defense', 'Extended Deterrence', 'Hegemonic Stability', 'Security Community'],
    strategicPurpose: 'Formed under Article 51 of the UN Charter to deter Soviet aggression in Europe ("keep the Soviet Union out, the Americans in, and the Germans down"). Represents institutionalized collective defense with integrated military command.',
    historicalOutcome: 'The longest-standing and most successful multilateral defense pact in modern history. Invoked Article 5 for the first and only time following the September 11, 2001 terrorist attacks on the United States.'
  },
  {
    id: 67,
    title: 'The Triple Alliance',
    year: 1882,
    endYear: 1915,
    type: 'Defense Pact',
    members: ['Germany', 'Austria-Hungary', 'Italy'],
    irConcepts: ['Balance of Power', 'Chain-Ganging', 'Bismarckian Alliance System', 'Security Dilemma'],
    strategicPurpose: 'Engineered by Otto von Bismarck to diplomatically isolate France after the Franco-Prussian War and secure Germany\'s southern flank through mutual defense guarantees with Vienna and Rome.',
    historicalOutcome: 'Solidified the rigid bipolar alliance structure of pre-WWI Europe. Italy declared neutrality in 1914 and defected to the Allied side (Treaty of London 1915); Austria and Germany chained together into total war.'
  },
  {
    id: 109,
    title: 'Entente Cordiale & Anglo-Russian Convention',
    year: 1904,
    endYear: 1914,
    type: 'Entente',
    members: ['United Kingdom', 'France', 'Russia (1907)'],
    irConcepts: ['Offshore Balancing', 'Abandonment of Splendid Isolation', 'Entente vs Defense Pact', 'Counter-Hegemony'],
    strategicPurpose: 'Resolved colonial frictions in Africa and Central Asia ("The Great Game") to forge a joint diplomatic and military consultation front against rising German naval and continental power.',
    historicalOutcome: 'While not a formal defense pact, consultations created high domestic expectations of British intervention in 1914 when Germany invaded neutral Belgium.'
  },
  {
    id: 180,
    title: 'Molotov-Ribbentrop Pact (Nazi-Soviet Pact)',
    year: 1939,
    endYear: 1941,
    type: 'Non-Aggression',
    members: ['Nazi Germany', 'Soviet Union (USSR)'],
    irConcepts: ['Buck-Passing', 'Strategic Delay', 'Secret Protocols', 'Time-Inconsistency Problem'],
    strategicPurpose: 'A non-aggression agreement with secret protocols dividing Poland, Finland, and the Baltic States into spheres of influence, allowing Hitler to invade Poland without facing a two-front war.',
    historicalOutcome: 'Illustrates the extreme fragility of non-aggression pacts between revisionist powers. Shattered 22 months later by Operation Barbarossa (June 1941), the largest land invasion in human history.'
  },
  {
    id: 243,
    title: 'The Warsaw Treaty Organization (Warsaw Pact)',
    year: 1955,
    endYear: 1991,
    type: 'Defense Pact',
    members: ['Soviet Union', 'Poland', 'East Germany', 'Czechoslovakia', 'Hungary', 'Romania', 'Bulgaria', 'Albania'],
    irConcepts: ['Hegemonic Hierarchy', 'Counter-Balancing NATO', 'Brezhnev Doctrine', 'Alliance Coercion'],
    strategicPurpose: 'Established in response to the integration of a rearmed West Germany into NATO. Formally united the military commands of the Soviet bloc under Moscow\'s leadership.',
    historicalOutcome: 'Used militarily not against external NATO forces, but internally to enforce bloc conformity and crush domestic uprisings in Hungary (1956) and Czechoslovakia (1968 Prague Spring). Dissolved in July 1991.'
  },
  {
    id: 233,
    title: 'U.S.–Japan Security Treaty (San Francisco System)',
    year: 1951,
    endYear: 'Ongoing',
    type: 'Defense Pact',
    members: ['United States', 'Japan'],
    irConcepts: ['Asymmetric Alliance', 'Hub-and-Spokes Architecture', 'Base Rights for Defense Umbrella', 'Entrapment Risk'],
    strategicPurpose: 'Created a bilateral security architecture granting the U.S. military bases in Japan (Okinawa, Yokosuka) in exchange for guaranteeing Japan\'s defense under Article 9 constitutional constraints.',
    historicalOutcome: 'Cornerstone of U.S. forward posture and stability in East Asia throughout the Cold War and contemporary Pacific strategy; modernized to include joint cyber and ballistic missile defenses.'
  },
  {
    id: 238,
    title: 'U.S.–Republic of Korea (ROK) Mutual Defense Treaty',
    year: 1953,
    endYear: 'Ongoing',
    type: 'Defense Pact',
    members: ['United States', 'South Korea'],
    irConcepts: ['Extended Nuclear Deterrence', 'Tripwire Strategy', 'Entrapment vs Abandonment Dilemma'],
    strategicPurpose: 'Concluded immediately following the Korean War Armistice to deter North Korean aggression with stationing of U.S. forces along the DMZ acting as a credible commitment "tripwire".',
    historicalOutcome: 'Successfully maintained deterrence on the Korean Peninsula for over seven decades; transformed from unilateral U.S. protection into a high-technology global partnership.'
  },
  {
    id: 231,
    title: 'Sino-Soviet Treaty of Friendship & Alliance',
    year: 1950,
    endYear: 1980,
    type: 'Defense Pact',
    members: ['Soviet Union', 'People\'s Republic of China'],
    irConcepts: ['Ideological Alignment vs National Interest', 'Sino-Soviet Split', 'Multipolarity in Cold War'],
    strategicPurpose: 'Signed between Mao Zedong and Joseph Stalin to establish a unified socialist defense front against Western capitalism, providing Soviet economic/technical aid and security assurances.',
    historicalOutcome: 'Deteriorated rapidly after Stalin\'s death due to ideological polemics, Soviet refusal of nuclear sharing, and border skirmishes in 1969; ultimately led to the 1972 Sino-American rapprochement.'
  },
  {
    id: 1,
    title: 'Anglo-Portuguese Alliance (Treaty of Windsor)',
    year: 1386,
    endYear: 'Ongoing',
    type: 'Defense Pact',
    members: ['United Kingdom', 'Portugal'],
    irConcepts: ['Oldest Active Alliance', 'Maritime Trade Security', 'Reputational Commitment'],
    strategicPurpose: 'Mutual military assistance against Spanish and French hegemony, establishing deep naval and trade reciprocity between England and Portugal.',
    historicalOutcome: 'Recognized by COW as the longest continuously active alliance in human history. Invoked in the Peninsular War, WWI, WWII (Allied naval access to Azores bases), and the 1982 Falklands War.'
  },
  {
    id: 216,
    title: 'Inter-American Treaty of Reciprocal Assistance (Rio Pact)',
    year: 1947,
    endYear: 'Ongoing',
    type: 'Defense Pact',
    members: ['United States', '21 Western Hemisphere Latin American Republics'],
    irConcepts: ['Monroe Doctrine Institutionalization', 'Regional Collective Defense', 'Cuban Missile Crisis Invocation'],
    strategicPurpose: 'Stipulated that an attack against one American state represents an attack against all American states, providing a hemisphere-wide defense mechanism against extra-continental aggression.',
    historicalOutcome: 'Formally invoked during the 1962 Cuban Missile Crisis to authorize the naval quarantine of Cuba; tested during the 1982 Falklands War when the U.S. backed the UK over Argentina.'
  },
  {
    id: 146,
    title: 'The Little Entente',
    year: 1920,
    endYear: 1938,
    type: 'Defense Pact',
    members: ['Czechoslovakia', 'Romania', 'Yugoslavia'],
    irConcepts: ['Status Quo Preservation', 'Revisionist Deterrence', 'Failure of Collective Security'],
    strategicPurpose: 'Formed by post-WWI successor states backed by France to prevent Hungarian territorial revanchism and Habsburg restoration in Central Europe.',
    historicalOutcome: 'Effective against minor revisionism during the 1920s, but disintegrated in 1938 when France and Britain appeased Nazi Germany at Munich, failing to defend Czechoslovak sovereignty.'
  },
  {
    id: 345,
    title: 'Collective Security Treaty Organization (CSTO)',
    year: 1992,
    endYear: 'Ongoing',
    type: 'Defense Pact',
    members: ['Russia', 'Belarus', 'Armenia', 'Kazakhstan', 'Kyrgyzstan', 'Tajikistan'],
    irConcepts: ['Post-Soviet Security Architecture', 'Regional Hegemony', 'Internal Regime Protection'],
    strategicPurpose: 'Evolved from the 1992 Tashkent Treaty to preserve military-technical coordination and mutual defense across post-Soviet Eurasia following the collapse of the USSR.',
    historicalOutcome: 'Deployed peacekeepers for the first time in January 2022 during unrest in Kazakhstan; faced strain during the 2020-2023 Nagorno-Karabakh conflict over mutual defense commitments to Armenia.'
  }
];

// ==========================================
// 3. UCDP / PRIO Armed Conflict Dataset (1946 - 2023)
// ==========================================
export interface UcdpConflictPoint {
  year: number;
  extrasystemic: number; // Colonial/Imperial wars
  interstate: number;     // State vs State
  internal: number;       // Civil wars
  internationalizedInternal: number; // Civil wars with foreign intervention
  total: number;
}

export const ucdpPrioArmedConflicts: UcdpConflictPoint[] = [
  { year: 1946, extrasystemic: 3, interstate: 1, internal: 12, internationalizedInternal: 1, total: 17 },
  { year: 1950, extrasystemic: 3, interstate: 2, internal: 14, internationalizedInternal: 2, total: 21 },
  { year: 1955, extrasystemic: 4, interstate: 1, internal: 13, internationalizedInternal: 1, total: 19 },
  { year: 1960, extrasystemic: 2, interstate: 0, internal: 18, internationalizedInternal: 2, total: 22 },
  { year: 1965, extrasystemic: 3, interstate: 3, internal: 26, internationalizedInternal: 4, total: 36 },
  { year: 1970, extrasystemic: 3, interstate: 1, internal: 28, internationalizedInternal: 5, total: 37 },
  { year: 1975, extrasystemic: 1, interstate: 1, internal: 32, internationalizedInternal: 6, total: 40 },
  { year: 1980, extrasystemic: 0, interstate: 3, internal: 35, internationalizedInternal: 7, total: 45 },
  { year: 1985, extrasystemic: 0, interstate: 2, internal: 39, internationalizedInternal: 6, total: 47 },
  { year: 1990, extrasystemic: 0, interstate: 2, internal: 46, internationalizedInternal: 5, total: 53 },
  { year: 1992, extrasystemic: 0, interstate: 1, internal: 48, internationalizedInternal: 4, total: 53 }, // Post-Cold War Peak
  { year: 1995, extrasystemic: 0, interstate: 3, internal: 36, internationalizedInternal: 4, total: 43 },
  { year: 2000, extrasystemic: 0, interstate: 2, internal: 32, internationalizedInternal: 3, total: 37 },
  { year: 2005, extrasystemic: 0, interstate: 1, internal: 28, internationalizedInternal: 4, total: 33 },
  { year: 2010, extrasystemic: 0, interstate: 1, internal: 25, internationalizedInternal: 5, total: 31 },
  { year: 2014, extrasystemic: 0, interstate: 1, internal: 27, internationalizedInternal: 13, total: 41 },
  { year: 2018, extrasystemic: 0, interstate: 2, internal: 33, internationalizedInternal: 17, total: 52 },
  { year: 2020, extrasystemic: 0, interstate: 2, internal: 38, internationalizedInternal: 16, total: 56 },
  { year: 2022, extrasystemic: 0, interstate: 3, internal: 36, internationalizedInternal: 17, total: 56 },
  { year: 2023, extrasystemic: 0, interstate: 2, internal: 37, internationalizedInternal: 20, total: 59 },
];

// ==========================================
// 3. COW National Material Capabilities (CINC Score: 1820 - 2020)
// Composite Index of National Capability (% of world power)
// ==========================================
export interface CincPowerPoint {
  year: number;
  usa: number;
  uk: number;
  russia: number;
  china: number;
  germany: number;
  france: number;
  japan: number;
}

export const cincCapabilitiesData: CincPowerPoint[] = [
  { year: 1820, usa: 0.021, uk: 0.174, russia: 0.185, china: 0.320, germany: 0.045, france: 0.110, japan: 0.038 },
  { year: 1840, usa: 0.039, uk: 0.225, russia: 0.178, china: 0.250, germany: 0.058, france: 0.105, japan: 0.035 },
  { year: 1860, usa: 0.068, uk: 0.264, russia: 0.155, china: 0.198, germany: 0.082, france: 0.108, japan: 0.031 },
  { year: 1880, usa: 0.112, uk: 0.245, russia: 0.141, china: 0.152, germany: 0.134, france: 0.091, japan: 0.034 },
  { year: 1900, usa: 0.185, uk: 0.198, russia: 0.132, china: 0.115, germany: 0.172, france: 0.078, japan: 0.048 },
  { year: 1913, usa: 0.228, uk: 0.165, russia: 0.140, china: 0.095, germany: 0.188, france: 0.072, japan: 0.055 }, // Pre-WWI
  { year: 1925, usa: 0.275, uk: 0.142, russia: 0.085, china: 0.088, germany: 0.125, france: 0.070, japan: 0.072 },
  { year: 1938, usa: 0.252, uk: 0.128, russia: 0.165, china: 0.078, germany: 0.175, france: 0.058, japan: 0.095 }, // Pre-WWII
  { year: 1945, usa: 0.384, uk: 0.108, russia: 0.182, china: 0.065, germany: 0.042, france: 0.035, japan: 0.038 }, // US Hegemonic Peak
  { year: 1960, usa: 0.272, uk: 0.065, russia: 0.208, china: 0.135, germany: 0.058, france: 0.045, japan: 0.055 },
  { year: 1975, usa: 0.185, uk: 0.042, russia: 0.215, china: 0.162, germany: 0.051, france: 0.038, japan: 0.078 },
  { year: 1990, usa: 0.158, uk: 0.032, russia: 0.142, china: 0.148, germany: 0.045, france: 0.032, japan: 0.085 }, // Cold War Ends
  { year: 2000, usa: 0.152, uk: 0.026, russia: 0.068, china: 0.185, germany: 0.038, france: 0.028, japan: 0.072 },
  { year: 2010, usa: 0.142, uk: 0.022, russia: 0.062, china: 0.218, germany: 0.032, france: 0.024, japan: 0.058 },
  { year: 2020, usa: 0.138, uk: 0.019, russia: 0.058, china: 0.245, germany: 0.029, france: 0.021, japan: 0.048 },
];

// ==========================================
// 4. Democratic Peace & Polity5 Regime Types
// ==========================================
export interface DemocraticPeaceDyad {
  dyadType: string;
  description: string;
  annualDisputeProb: number; // Probability of MID occurrence per year
  warProb: number;           // Probability of War per year
  color: string;
  empiricalFact: string;
}

export const democraticPeaceDyads: DemocraticPeaceDyad[] = [
  {
    dyadType: 'Democracy - Democracy',
    description: 'Both states in the dyad have institutional Polity scores >= +6 (e.g. US-UK, France-Germany post-WWII)',
    annualDisputeProb: 0.0035,
    warProb: 0.0001,
    color: '#10b981', // Emerald
    empiricalFact: 'Babst (1964), Doyle (1983), Russett & Oneal (2001): Zero or near-zero historical interstate wars between liberal consolidated democracies.'
  },
  {
    dyadType: 'Democracy - Autocracy',
    description: 'One liberal democracy and one authoritarian regime (e.g. US-Iraq 2003, UK-Argentina 1982)',
    annualDisputeProb: 0.0215,
    warProb: 0.0048,
    color: '#f59e0b', // Amber
    empiricalFact: 'Democracies are just as war-prone overall as autocracies; they simply direct their military interventions toward non-democracies.'
  },
  {
    dyadType: 'Autocracy - Autocracy',
    description: 'Both states are authoritarian or autocratic regimes (e.g. Iran-Iraq 1980, USSR-China 1969)',
    annualDisputeProb: 0.0285,
    warProb: 0.0072,
    color: '#ef4444', // Red
    empiricalFact: 'Highest empirical rate of militarized disputes, violent border skirmishes, and full interstate wars with minimal institutional transparency.'
  }
];

export interface RegimeWavePoint {
  year: number;
  democracies: number; // % of sovereign states
  anocracies: number;  // % mixed / transitional
  autocracies: number; // % closed autocracies
}

export const regimeWavesData: RegimeWavePoint[] = [
  { year: 1850, democracies: 3, anocracies: 22, autocracies: 75 },
  { year: 1880, democracies: 8, anocracies: 28, autocracies: 64 },
  { year: 1900, democracies: 12, anocracies: 31, autocracies: 57 },
  { year: 1920, democracies: 28, anocracies: 24, autocracies: 48 }, // 1st Wave (post-WWI)
  { year: 1938, democracies: 15, anocracies: 20, autocracies: 65 }, // Reverse Wave (Fascism/Totalitarianism)
  { year: 1950, democracies: 32, anocracies: 18, autocracies: 50 }, // 2nd Wave (post-WWII)
  { year: 1965, democracies: 27, anocracies: 24, autocracies: 49 },
  { year: 1975, democracies: 26, anocracies: 26, autocracies: 48 },
  { year: 1990, democracies: 45, anocracies: 25, autocracies: 30 }, // 3rd Wave begins
  { year: 2000, democracies: 58, anocracies: 22, autocracies: 20 }, // 3rd Wave peak
  { year: 2010, democracies: 57, anocracies: 24, autocracies: 19 },
  { year: 2024, democracies: 51, anocracies: 28, autocracies: 21 }, // Modern Democratic Backsliding
];

// ==========================================
// 5. SIPRI Global Military Spending
// ==========================================
export interface SipriSpender {
  rank: number;
  country: string;
  spendingBillions: number;
  shareGlobal: number; // %
  gdpShare: number;    // % of GDP
  flag: string;
}

export const sipriTopSpenders: SipriSpender[] = [
  { rank: 1, country: 'United States', spendingBillions: 916, shareGlobal: 37.5, gdpShare: 3.4, flag: '🇺🇸' },
  { rank: 2, country: 'China', spendingBillions: 296, shareGlobal: 12.1, gdpShare: 1.7, flag: '🇨🇳' },
  { rank: 3, country: 'Russia', spendingBillions: 109, shareGlobal: 4.5, gdpShare: 5.9, flag: '🇷🇺' },
  { rank: 4, country: 'India', spendingBillions: 83.6, shareGlobal: 3.4, gdpShare: 2.4, flag: '🇮🇳' },
  { rank: 5, country: 'Saudi Arabia', spendingBillions: 75.8, shareGlobal: 3.1, gdpShare: 7.1, flag: '🇸🇦' },
  { rank: 6, country: 'United Kingdom', spendingBillions: 74.9, shareGlobal: 3.1, gdpShare: 2.3, flag: '🇬🇧' },
  { rank: 7, country: 'Germany', spendingBillions: 66.8, shareGlobal: 2.7, gdpShare: 1.5, flag: '🇩🇪' },
  { rank: 8, country: 'Ukraine', spendingBillions: 64.8, shareGlobal: 2.7, gdpShare: 36.6, flag: '🇺🇦' },
  { rank: 9, country: 'France', spendingBillions: 61.3, shareGlobal: 2.5, gdpShare: 2.1, flag: '🇫🇷' },
  { rank: 10, country: 'Japan', spendingBillions: 50.2, shareGlobal: 2.1, gdpShare: 1.2, flag: '🇯🇵' },
];

export interface SipriHistoryPoint {
  year: number;
  globalSpendingBillions: number; // Constant 2023 US$
  milestone: string;
}

export const sipriSpendingTrends: SipriHistoryPoint[] = [
  { year: 1950, globalSpendingBillions: 680, milestone: 'Outbreak of Korean War; NATO buildup begins' },
  { year: 1960, globalSpendingBillions: 1050, milestone: 'Superpower nuclear and missile race' },
  { year: 1970, globalSpendingBillions: 1350, milestone: 'Vietnam War peak' },
  { year: 1980, globalSpendingBillions: 1480, milestone: 'Soviet invasion of Afghanistan; Second Cold War' },
  { year: 1988, globalSpendingBillions: 1780, milestone: 'Peak Cold War defense spending' },
  { year: 1996, globalSpendingBillions: 1140, milestone: 'Post-Cold War "Peace Dividend" trough' },
  { year: 2001, globalSpendingBillions: 1220, milestone: 'September 11 attacks & Global War on Terror' },
  { year: 2010, globalSpendingBillions: 1890, milestone: 'Surges in Iraq and Afghanistan' },
  { year: 2015, globalSpendingBillions: 1820, milestone: 'Post-Crimea annexation rearmament in Europe' },
  { year: 2020, globalSpendingBillions: 2150, milestone: 'US-China strategic competition expansion' },
  { year: 2023, globalSpendingBillions: 2443, milestone: 'Record global high; Russian invasion of Ukraine' },
];

// ==========================================
// 6. Kinne Defense Cooperation Agreements (DCAD v1.0)
// ==========================================
export interface DcadRecord {
  id: string;
  c1: string;
  c2: string;
  ccode1: number;
  ccode2: number;
  year: number;
  category: string;
  categoryLabel: string;
  type: string;
  fullText: boolean;
  asymmetry: boolean;
  source: string;
}

export interface DcadCategory {
  key: string;
  label: string;
  count: number;
  pct: string;
  desc: string;
}

export interface CanonicalDca {
  title: string;
  countries: string[];
  year: number;
  category: string;
  irConcepts: string[];
  strategicPurpose: string;
  pedagogicalTakeaway: string;
}

export const dcadMeta = dcadDataJson.meta;
export const dcadCategories: DcadCategory[] = dcadDataJson.categories;
export const dcadAnnualSeries = dcadDataJson.annualSeries;
export const dcadTopSignatories = dcadDataJson.topSignatories;
export const dcadAllRecords: DcadRecord[] = dcadDataJson.records as DcadRecord[];

export const canonicalDcaList: CanonicalDca[] = [
  {
    title: 'U.S.–Poland Defense Cooperation Agreement (Enhanced EDCA)',
    countries: ['United States', 'Poland'],
    year: 2020,
    category: 'General Framework DCA / Basing',
    irConcepts: ['Forward Defense', 'Rotational Basing', 'NATO Eastern Flank Deterrence', 'Legal Interoperability'],
    strategicPurpose: 'Established status of forces agreements (SOFA), logistical hubs, and legal framework for expanding rotational US military troop presence (V Corps HQ) on NATO’s eastern frontier.',
    pedagogicalTakeaway: 'Demonstrates how modern bilateral DCAs augment multilateral alliances (NATO) by addressing bilateral stationing rights and rapid logistics without requiring full treaty renegotiation.'
  },
  {
    title: 'France–United Arab Emirates Defense Pact & Al Dhafra Base Access',
    countries: ['France', 'United Arab Emirates'],
    year: 1995,
    category: 'General Framework DCA / Joint Basing',
    irConcepts: ['Strategic Autonomy', 'Middle Eastern Forward Presence', 'Arms Procurement Ties'],
    strategicPurpose: 'Provides France with naval, air, and ground military basing at Camp de la Paix in Abu Dhabi alongside strategic consultations and Rafale fighter interoperability.',
    pedagogicalTakeaway: 'Illustrates how European middle powers project power into key maritime chokepoints (Strait of Hormuz) through targeted bilateral security pacts.'
  },
  {
    title: 'UK–France Lancaster House Treaties',
    countries: ['United Kingdom', 'France'],
    year: 2010,
    category: 'Defense Industrial & Joint Expeditionary Force',
    irConcepts: ['Burden-Sharing', 'Defense Industrial Rationalization', 'Nuclear Warhead Hydrodynamics Testing'],
    strategicPurpose: 'Created the Combined Joint Expeditionary Force (CJEF) and joint hydrodynamic testing facilities for nuclear safety to preserve European high-end capabilities amidst post-2008 fiscal austerity.',
    pedagogicalTakeaway: 'Highlights how defense cooperation agreements facilitate high-level industrial integration between nuclear powers without compromising independent deterrence.'
  },
  {
    title: 'India–United States LEMOA (Logistics Exchange Memorandum of Agreement)',
    countries: ['India', 'United States'],
    year: 2016,
    category: 'Logistics & Interoperability',
    irConcepts: ['Indo-Pacific Alignment', 'Strategic Non-Alignment (Strategic Autonomy)', 'Flexible Balancing'],
    strategicPurpose: 'Allows both militaries to access designated port facilities, fuel replenishment, and repair hubs during joint drills, peacekeeping, and disaster relief across the Indian Ocean.',
    pedagogicalTakeaway: 'Exemplifies why non-aligned rising powers prefer functional DCAs over formal mutual defense treaties, balancing against regional competitors while preserving sovereign autonomy.'
  },
  {
    title: 'Turkey–Azerbaijan Strategic Partnership and Mutual Support',
    countries: ['Turkey', 'Azerbaijan'],
    year: 2010,
    category: 'Training, Industrial & Joint Exercises',
    irConcepts: ['Kin-State Security', 'Unmanned Aerial Systems (UAS) Transfer', 'Joint General Staff Coordination'],
    strategicPurpose: 'Harmonized Azerbaijani military doctrine with NATO standards, provided Bayraktar drone platforms, and established joint military operational planning.',
    pedagogicalTakeaway: 'Demonstrates how a targeted DCA can rapidly modernize a state\'s armed forces, with decisive battlefield impacts during the 2020 Second Nagorno-Karabakh War.'
  }
];

// ==========================================
// 7. COW Territorial Changes Dataset (v6, 1816–2018)
// ==========================================
export interface TerrChangeRecord {
  id: string;
  year: number;
  month: number;
  gainer: string;
  gainerCcode: number;
  loser: string;
  loserCcode: number;
  entity: string;
  entityCcode: number;
  procedur: string;
  procedurLabel: string;
  conflict: boolean;
  areaSqKm: number | null;
  pop: number | null;
  indep: boolean;
}

export interface CanonicalTerrChange {
  title: string;
  year: number;
  gainer: string;
  loser: string;
  procedure: string;
  conflict: boolean;
  irConcepts: string[];
  historicalContext: string;
  pedagogicalTakeaway: string;
}

export const terrChangesMeta = terrChangesDataJson.meta;
export const terrChangesStats = terrChangesDataJson.stats;
export const terrChangesProcedures = terrChangesDataJson.procedures;
export const terrChangesDecades = terrChangesDataJson.decades;
export const terrChangesTopGainers = terrChangesDataJson.topGainers;
export const terrChangesTopLosers = terrChangesDataJson.topLosers;
export const terrChangesAllRecords: TerrChangeRecord[] = terrChangesDataJson.records as TerrChangeRecord[];

export const canonicalTerrChangesList: CanonicalTerrChange[] = [
  {
    title: 'Treaty of Frankfurt (Alsace-Lorraine Transfer)',
    year: 1871,
    gainer: 'Germany',
    loser: 'France',
    procedure: 'Military Conquest / Cession',
    conflict: true,
    irConcepts: ['Revanchism', 'Security Dilemma', 'Issue Invisibility', 'Perpetual Rivalry'],
    historicalContext: 'Following French defeat in the Franco-Prussian War, Bismarck annexed Alsace and northern Lorraine to create a strategic buffer on the Rhine.',
    pedagogicalTakeaway: 'Classic illustration of Vasquez\'s territorial thesis: annexing contested territory creates enduring revanchist dynamics that fueled French strategic calculations leading to World War I.'
  },
  {
    title: 'The Alaska Purchase (Treaty of Cession)',
    year: 1867,
    gainer: 'United States',
    loser: 'Russia / USSR',
    procedure: 'Cession / Bilateral Treaty Purchase',
    conflict: false,
    irConcepts: ['Peaceful Territorial Reallocation', 'Strategic Liquidation', 'Anti-British Balancing'],
    historicalContext: 'Secretary of State William Seward negotiated the purchase of Russian America for $7.2 million ($0.02 per acre) after Russia decided the distant colony was indefensible against Britain.',
    pedagogicalTakeaway: 'Shows that peaceful territorial transfers occur when the holding power calculates the long-term defense liability outweighs current economic extractability.'
  },
  {
    title: 'Treaty of Guadalupe Hidalgo (Mexican Cession)',
    year: 1848,
    gainer: 'United States',
    loser: 'Mexico',
    procedure: 'Military Conquest / Coerced Treaty Cession',
    conflict: true,
    irConcepts: ['Manifest Destiny', 'Territorial Expansionism', 'Coercive Bargaining', 'Border Revision'],
    historicalContext: 'Concluded the Mexican-American War, with Mexico ceding 55% of its pre-war territory (California, Nevada, Utah, Arizona, New Mexico, parts of Colorado/Wyoming) for $15 million.',
    pedagogicalTakeaway: 'Demonstrates coercive peace settlements where formal compensation masks the reality of military conquest and fundamentally reshapes continental borders.'
  },
  {
    title: 'Treaty of Versailles Border Restructuring',
    year: 1919,
    gainer: 'Poland, France, Denmark, Belgium',
    loser: 'Germany',
    procedure: 'Multilateral Peace Settlement / Mandate',
    conflict: true,
    irConcepts: ['Self-Determination vs Revanchism', 'Polish Corridor', 'Fragile Peace Settlements'],
    historicalContext: 'Dismantled Germany\'s eastern borders to create Poland and the Danzig corridor, returned Alsace-Lorraine to France, and placed the Saar under League of Nations administration.',
    pedagogicalTakeaway: 'Illustrates how imposing severe territorial losses on a defeated major power without permanently eliminating its industrial capacity creates intense incentives for revisionist war.'
  },
  {
    title: 'Six-Day War Territorial Transfers',
    year: 1967,
    gainer: 'Israel',
    loser: 'Egypt, Jordan, Syria',
    procedure: 'Military Conquest / Occupation',
    conflict: true,
    irConcepts: ['Preemptive Strike', 'UN Resolution 242', 'Land for Peace', 'Strategic Depth'],
    historicalContext: 'Israel seized the Sinai Peninsula, Gaza Strip, West Bank, East Jerusalem, and the Golan Heights in six days of rapid maneuver warfare.',
    pedagogicalTakeaway: 'Established the core diplomatic paradigm of the modern Arab-Israeli conflict ("Land for Peace"), leading to peaceful return of the Sinai in 1979 and ongoing disputes over remaining territories.'
  },
  {
    title: 'Hong Kong Handover (Sino-British Joint Declaration)',
    year: 1997,
    gainer: 'China',
    loser: 'United Kingdom',
    procedure: 'Bilateral Treaty / Lease Expiration',
    conflict: false,
    irConcepts: ['De-imperialization', 'One Country Two Systems', 'Power Transition Reconciliation'],
    historicalContext: 'The expiration of the 99-year lease on the New Territories prompted the peaceful transfer of British sovereignty over Hong Kong to the People\'s Republic of China.',
    pedagogicalTakeaway: 'A prominent example of a peaceful, negotiated sovereign transfer between nuclear-armed major powers under institutional frameworks.'
  },
  {
    title: 'Crimean Annexation',
    year: 2014,
    gainer: 'Russia / USSR',
    loser: 'Ukraine',
    procedure: 'Military Coercion / Annexation',
    conflict: true,
    irConcepts: ['Violation of Territorial Integrity Norm', 'Budapest Memorandum', 'Hybrid Warfare', 'Sevastopol Naval Base'],
    historicalContext: 'Following the Euromaidan Revolution, Russian special forces occupied the Crimean peninsula, staging a disputed referendum and formally incorporating Crimea into the Russian Federation.',
    pedagogicalTakeaway: 'The first major unilateral annexation of recognized sovereign European territory since WWII, fundamentally destabilizing the post-Cold War Helsinki security order.'
  }
];

// ==========================================
// 8. COW National Material Capabilities v7.0 (Official 1816–2025!)
// ==========================================
export const nmcV7Meta = nmcV7DataJson.meta;
export const nmcV7MajorPowers = nmcV7DataJson.majorPowers;
export const nmcV7Decades = nmcV7DataJson.decadalSnapshots;
export const nmcV7SystemEvolution = nmcV7DataJson.systemEvolution;

// ==========================================
// 9. COW Conventional Arms & Military Technology Transfers (v1.1)
// ==========================================
export const armsTechMeta = armsTechDataJson.meta;
export const armsTechWeapons = armsTechDataJson.weaponsCatalog;
export const armsTechDecades = armsTechDataJson.decadeTrends;
export const armsTechTop = armsTechDataJson.topModernArmies;

// ==========================================
// 10. COW Bilateral & National Trade (v4.0, Barbieri & Keshk)
// ==========================================
export const tradeMeta = tradeDataJson.meta;
export const tradeYearly = tradeDataJson.yearlySeries;
export const tradeTopTraders = tradeDataJson.topTraders2014;

