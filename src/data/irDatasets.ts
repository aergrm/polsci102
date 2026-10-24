import midDataJson from './midFullData.json';

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
// 2. UCDP / PRIO Armed Conflict Dataset (1946 - 2023)
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
