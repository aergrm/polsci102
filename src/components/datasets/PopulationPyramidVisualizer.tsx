import { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import {
  Users,
  Play,
  Pause,
  RotateCcw,
  Scale,
  TrendingDown,
  TrendingUp,
  ShieldAlert,
  Info,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
  GitCompare,
  BarChart2
} from 'lucide-react';
import demoDataJson from '../../data/demographicsData.json';

type DisplayMode = 'percentage' | 'millions';

const PRESETS = [
  { name: 'US vs. China', c1: 'United States', c2: 'China', desc: 'Superpower Aging Race: Immigration Resilience vs. One-Child Legacy' },
  { name: 'India vs. China', c1: 'India', c2: 'China', desc: 'The 2023 Demography Crossover: Demographic Dividend vs. Working-Age Contraction' },
  { name: 'Japan vs. Nigeria', c1: 'Japan', c2: 'Nigeria', desc: 'The Global Extremes: World’s Oldest Super-Aged Society vs. Massive Youth Bulge' },
  { name: 'Russia vs. US', c1: 'Russia', c2: 'United States', desc: 'Post-Cold War Depopulation & Male Mortality Gap vs. US Replacement' },
  { name: 'South Korea vs. India', c1: 'South Korea', c2: 'India', desc: 'World Lowest Fertility (0.72) vs. Emerging Giant Labor Pool' },
];

export function PopulationPyramidVisualizer() {
  const [countryA, setCountryA] = useState<string>('United States');
  const [countryB, setCountryB] = useState<string>('China');
  const [selectedYear, setSelectedYear] = useState<string>('2025');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('percentage');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hoveredCohort, setHoveredCohort] = useState<string | null>(null);

  const svgRefA = useRef<SVGSVGElement | null>(null);
  const svgRefB = useRef<SVGSVGElement | null>(null);

  const countriesData = demoDataJson.countries as any;
  const years = demoDataJson.meta.years.map(String);
  const cohortLabels = demoDataJson.meta.cohortLabels;
  const countryList = Object.keys(countriesData);

  // Play animation through years
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setSelectedYear((prev) => {
        const idx = years.indexOf(prev);
        if (idx === -1 || idx === years.length - 1) {
          return years[0];
        }
        return years[idx + 1];
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [isPlaying, years]);

  const dataA = useMemo(() => {
    return countriesData[countryA]?.dataByYear[selectedYear];
  }, [countryA, selectedYear, countriesData]);

  const dataB = useMemo(() => {
    return countriesData[countryB]?.dataByYear[selectedYear];
  }, [countryB, selectedYear, countriesData]);

  // Determine shared max scale for consistency
  const maxDomain = useMemo(() => {
    if (!dataA || !dataB) return 10;
    if (displayMode === 'percentage') {
      const maxA = Math.max(...dataA.malePct, ...dataA.femalePct);
      const maxB = Math.max(...dataB.malePct, ...dataB.femalePct);
      return Math.ceil(Math.max(maxA, maxB, 6));
    } else {
      const maxA = Math.max(...dataA.maleMillions, ...dataA.femaleMillions);
      const maxB = Math.max(...dataB.maleMillions, ...dataB.femaleMillions);
      return Math.ceil(Math.max(maxA, maxB, 10));
    }
  }, [dataA, dataB, displayMode]);

  // D3 Render function for single pyramid
  const renderPyramid = (
    svgElement: SVGSVGElement | null,
    data: any,
    countryName: string,
    colorScheme: { male: string; female: string; maleLight: string; femaleLight: string }
  ) => {
    if (!svgElement || !data) return;

    const width = 450;
    const height = 480;
    const margin = { top: 30, right: 25, bottom: 40, left: 25 };
    const centerGap = 50; // Gap for cohort labels in the center

    const chartWidth = (width - margin.left - margin.right - centerGap) / 2;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgElement);
    svg.selectAll('*').remove();
    svg.attr('viewBox', `0 0 ${width} ${height}`);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Y scale for cohorts
    const yScale = d3
      .scaleBand()
      .domain(cohortLabels)
      .range([chartHeight, 0])
      .padding(0.18);

    // X scale for males (0 to maxDomain, oriented right-to-left)
    const xMaleScale = d3
      .scaleLinear()
      .domain([0, maxDomain])
      .range([chartWidth, 0]);

    // X scale for females (0 to maxDomain, oriented left-to-right)
    const xFemaleScale = d3
      .scaleLinear()
      .domain([0, maxDomain])
      .range([0, chartWidth]);

    const femaleStartX = chartWidth + centerGap;

    // Grid lines
    const ticks = xMaleScale.ticks(4);

    // Male grid
    ticks.forEach((tick) => {
      if (tick === 0) return;
      g.append('line')
        .attr('x1', xMaleScale(tick))
        .attr('x2', xMaleScale(tick))
        .attr('y1', 0)
        .attr('y2', chartHeight)
        .attr('stroke', '#e4e4e7')
        .attr('stroke-dasharray', '2,2');
    });

    // Female grid
    ticks.forEach((tick) => {
      if (tick === 0) return;
      g.append('line')
        .attr('x1', femaleStartX + xFemaleScale(tick))
        .attr('x2', femaleStartX + xFemaleScale(tick))
        .attr('y1', 0)
        .attr('y2', chartHeight)
        .attr('stroke', '#e4e4e7')
        .attr('stroke-dasharray', '2,2');
    });

    // Center vertical axes
    g.append('line')
      .attr('x1', chartWidth)
      .attr('x2', chartWidth)
      .attr('y1', 0)
      .attr('y2', chartHeight)
      .attr('stroke', '#a1a1aa')
      .attr('stroke-width', 1.5);

    g.append('line')
      .attr('x1', femaleStartX)
      .attr('x2', femaleStartX)
      .attr('y1', 0)
      .attr('y2', chartHeight)
      .attr('stroke', '#a1a1aa')
      .attr('stroke-width', 1.5);

    // Cohort labels in the middle column
    cohortLabels.forEach((cohort: string) => {
      const isHovered = hoveredCohort === cohort;
      const isWorkingAge = ['15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64'].includes(cohort);
      const isElderly = ['65-69', '70-74', '75-79', '80-84', '85+'].includes(cohort);

      g.append('text')
        .attr('x', chartWidth + centerGap / 2)
        .attr('y', (yScale(cohort) || 0) + yScale.bandwidth() / 2)
        .attr('dy', '0.35em')
        .attr('text-anchor', 'middle')
        .attr('class', `text-[10px] font-mono select-none transition-all ${
          isHovered
            ? 'font-bold fill-indigo-600 scale-110'
            : isElderly
            ? 'fill-amber-700 font-semibold'
            : isWorkingAge
            ? 'fill-zinc-800 font-medium'
            : 'fill-zinc-500'
        }`)
        .text(cohort);
    });

    // MALE BARS (Left)
    g.selectAll('.bar-male')
      .data(cohortLabels)
      .enter()
      .append('rect')
      .attr('class', 'bar-male cursor-pointer transition-all duration-200')
      .attr('x', (c: string, i: number) => {
        const val = displayMode === 'percentage' ? data.malePct[i] : data.maleMillions[i];
        return xMaleScale(val);
      })
      .attr('y', (c: string) => yScale(c) || 0)
      .attr('width', (c: string, i: number) => {
        const val = displayMode === 'percentage' ? data.malePct[i] : data.maleMillions[i];
        return chartWidth - xMaleScale(val);
      })
      .attr('height', yScale.bandwidth())
      .attr('fill', (c: string) => (hoveredCohort === c ? '#1d4ed8' : colorScheme.male))
      .attr('rx', 2)
      .on('mouseenter', (_: any, c: string) => setHoveredCohort(c))
      .on('mouseleave', () => setHoveredCohort(null));

    // FEMALE BARS (Right)
    g.selectAll('.bar-female')
      .data(cohortLabels)
      .enter()
      .append('rect')
      .attr('class', 'bar-female cursor-pointer transition-all duration-200')
      .attr('x', femaleStartX)
      .attr('y', (c: string) => yScale(c) || 0)
      .attr('width', (c: string, i: number) => {
        const val = displayMode === 'percentage' ? data.femalePct[i] : data.femaleMillions[i];
        return xFemaleScale(val);
      })
      .attr('height', yScale.bandwidth())
      .attr('fill', (c: string) => (hoveredCohort === c ? '#be185d' : colorScheme.female))
      .attr('rx', 2)
      .on('mouseenter', (_: any, c: string) => setHoveredCohort(c))
      .on('mouseleave', () => setHoveredCohort(null));

    // Axis Labels at Bottom
    // Male X-Axis
    ticks.forEach((tick) => {
      g.append('text')
        .attr('x', xMaleScale(tick))
        .attr('y', chartHeight + 18)
        .attr('text-anchor', 'middle')
        .attr('class', 'text-[9px] font-mono fill-zinc-500 select-none')
        .text(displayMode === 'percentage' ? `${tick}%` : `${tick}M`);
    });

    // Female X-Axis
    ticks.forEach((tick) => {
      g.append('text')
        .attr('x', femaleStartX + xFemaleScale(tick))
        .attr('y', chartHeight + 18)
        .attr('text-anchor', 'middle')
        .attr('class', 'text-[9px] font-mono fill-zinc-500 select-none')
        .text(displayMode === 'percentage' ? `${tick}%` : `${tick}M`);
    });

    // Male & Female Header Titles
    g.append('text')
      .attr('x', chartWidth / 2)
      .attr('y', -12)
      .attr('text-anchor', 'middle')
      .attr('class', 'text-xs font-mono font-bold fill-blue-700 uppercase tracking-wider')
      .text('◄ Males');

    g.append('text')
      .attr('x', femaleStartX + chartWidth / 2)
      .attr('y', -12)
      .attr('text-anchor', 'middle')
      .attr('class', 'text-xs font-mono font-bold fill-rose-700 uppercase tracking-wider')
      .text('Females ►');
  };

  // Render both pyramids
  useEffect(() => {
    renderPyramid(svgRefA.current, dataA, countryA, {
      male: '#3b82f6',       // Blue
      female: '#ec4899',     // Pink
      maleLight: '#93c5fd',
      femaleLight: '#f472b6'
    });

    renderPyramid(svgRefB.current, dataB, countryB, {
      male: '#0284c7',       // Sky Blue
      female: '#f43f5e',     // Rose
      maleLight: '#7dd3fc',
      femaleLight: '#fda4af'
    });
  }, [dataA, dataB, maxDomain, hoveredCohort, displayMode]);

  return (
    <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1.5 shadow-2xs">
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              Demography & Power Transitions · UN WPP Revision
            </span>
            <span className="text-xs font-mono text-zinc-500">1950–2075 Long-Range Projections</span>
          </div>

          <h2 className="text-2xl font-black text-zinc-900 tracking-tight">
            Comparative Population Pyramids & Structural Aging
          </h2>
          <p className="text-xs text-zinc-600 mt-1 max-w-2xl leading-relaxed">
            "Demography is destiny in world politics." Compare the demographic engines of major powers over 125 years. Track youth bulges, demographic dividends, and the super-aging crises reshaping 21st-century military recruitment and fiscal balance.
          </p>
        </div>

        {/* Play & Timeline Controller */}
        <div className="flex items-center gap-2 bg-zinc-50 p-2 rounded-2xl border border-zinc-200 shrink-0">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            title={isPlaying ? 'Pause animation' : 'Play decade progression'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause' : 'Play Trajectory'}</span>
          </button>

          <div className="flex items-center gap-1">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => {
                  setSelectedYear(y);
                  setIsPlaying(false);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  selectedYear === y
                    ? 'bg-zinc-900 text-white shadow-2xs'
                    : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preset Scenarios Ribbon */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-mono text-zinc-500 uppercase font-bold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Curated Geopolitical Presets:</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {PRESETS.map((p) => {
            const isActive = countryA === p.c1 && countryB === p.c2;
            return (
              <button
                key={p.name}
                onClick={() => {
                  setCountryA(p.c1);
                  setCountryB(p.c2);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-900 border-indigo-400 font-bold shadow-2xs'
                    : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                {p.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selector Controls Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
        {/* Country A Picker */}
        <div className="space-y-1">
          <label className="text-xs font-mono font-bold text-blue-700 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
            <span>Country A (Primary State):</span>
          </label>
          <select
            value={countryA}
            onChange={(e) => setCountryA(e.target.value)}
            className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs font-bold text-zinc-800 shadow-2xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {countryList.map((c) => (
              <option key={c} value={c} disabled={c === countryB}>
                {c} ({countriesData[c].code} · {countriesData[c].region})
              </option>
            ))}
          </select>
        </div>

        {/* Country B Picker */}
        <div className="space-y-1">
          <label className="text-xs font-mono font-bold text-rose-700 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block" />
            <span>Country B (Comparative State):</span>
          </label>
          <select
            value={countryB}
            onChange={(e) => setCountryB(e.target.value)}
            className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs font-bold text-zinc-800 shadow-2xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
          >
            {countryList.map((c) => (
              <option key={c} value={c} disabled={c === countryA}>
                {c} ({countriesData[c].code} · {countriesData[c].region})
              </option>
            ))}
          </select>
        </div>

        {/* Display Scale Mode Toggle */}
        <div className="space-y-1">
          <label className="text-xs font-mono font-bold text-zinc-700 flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-zinc-500" />
            <span>Scale Normalization:</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5 bg-zinc-200/60 p-1 rounded-xl">
            <button
              onClick={() => setDisplayMode('percentage')}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold font-mono transition-all ${
                displayMode === 'percentage'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Cohort Share (%)
            </button>
            <button
              onClick={() => setDisplayMode('millions')}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold font-mono transition-all ${
                displayMode === 'millions'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Absolute (Millions)
            </button>
          </div>
        </div>
      </div>

      {/* Cohort Inspection Hover Alert */}
      {hoveredCohort && (
        <div className="p-3 bg-zinc-900 text-white rounded-xl text-xs font-mono flex items-center justify-between border border-zinc-800 shadow-md">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-400">Cohort {hoveredCohort} Inspection:</span>
            <span>
              {['0-4', '5-9', '10-14'].includes(hoveredCohort) && '• Child Dependency Bracket'}
              {['15-19', '20-24'].includes(hoveredCohort) && '• Youth Bulge & Military Recruitment Age'}
              {['25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64'].includes(hoveredCohort) && '• Prime Working-Age Tax Base'}
              {['65-69', '70-74', '75-79', '80-84', '85+'].includes(hoveredCohort) && '• Elderly Pension & Healthcare Cohort'}
            </span>
          </div>
          <span className="text-zinc-400 text-[11px]">Hover any bar to compare</span>
        </div>
      )}

      {/* Side-by-Side Dual Pyramids Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Country A Card */}
        <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-blue-700">Country A Profile</span>
              <h3 className="text-xl font-bold text-zinc-900">{countryA}</h3>
              <div className="text-xs text-zinc-500 font-mono">
                Year {selectedYear} · Total Pop: {dataA?.summary.totalPopulationMillions} Million
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono text-zinc-500">Median Age</div>
              <div className="text-2xl font-black font-mono text-blue-700">{dataA?.summary.medianAge} yrs</div>
            </div>
          </div>

          {/* SVG D3 Pyramid A */}
          <div className="flex justify-center bg-white p-3 rounded-xl border border-zinc-200/80 shadow-2xs">
            <svg ref={svgRefA} className="w-full max-w-[440px] h-auto" />
          </div>

          {/* Country A Summary Stats */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
            <div className="p-2.5 bg-white rounded-xl border border-zinc-200">
              <div className="text-[10px] text-zinc-500 font-mono">Working Age (15–64)</div>
              <div className="font-mono text-base font-bold text-zinc-900">{dataA?.summary.workingAgeShare}%</div>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-zinc-200">
              <div className="text-[10px] text-zinc-500 font-mono">Elderly Share (65+)</div>
              <div className="font-mono text-base font-bold text-amber-700">{dataA?.summary.elderlyShare}%</div>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-zinc-200">
              <div className="text-[10px] text-zinc-500 font-mono">Fertility (TFR)</div>
              <div className="font-mono text-base font-bold text-indigo-700">{dataA?.summary.fertilityRate}</div>
            </div>
          </div>

          <p className="text-[11px] text-zinc-600 leading-relaxed italic bg-blue-50/50 p-3 rounded-xl border border-blue-100">
            <strong>IR Strategic Assessment: </strong>{countriesData[countryA]?.irStrategicNote}
          </p>
        </div>

        {/* Country B Card */}
        <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-rose-700">Country B Profile</span>
              <h3 className="text-xl font-bold text-zinc-900">{countryB}</h3>
              <div className="text-xs text-zinc-500 font-mono">
                Year {selectedYear} · Total Pop: {dataB?.summary.totalPopulationMillions} Million
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono text-zinc-500">Median Age</div>
              <div className="text-2xl font-black font-mono text-rose-700">{dataB?.summary.medianAge} yrs</div>
            </div>
          </div>

          {/* SVG D3 Pyramid B */}
          <div className="flex justify-center bg-white p-3 rounded-xl border border-zinc-200/80 shadow-2xs">
            <svg ref={svgRefB} className="w-full max-w-[440px] h-auto" />
          </div>

          {/* Country B Summary Stats */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
            <div className="p-2.5 bg-white rounded-xl border border-zinc-200">
              <div className="text-[10px] text-zinc-500 font-mono">Working Age (15–64)</div>
              <div className="font-mono text-base font-bold text-zinc-900">{dataB?.summary.workingAgeShare}%</div>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-zinc-200">
              <div className="text-[10px] text-zinc-500 font-mono">Elderly Share (65+)</div>
              <div className="font-mono text-base font-bold text-amber-700">{dataB?.summary.elderlyShare}%</div>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-zinc-200">
              <div className="text-[10px] text-zinc-500 font-mono">Fertility (TFR)</div>
              <div className="font-mono text-base font-bold text-indigo-700">{dataB?.summary.fertilityRate}</div>
            </div>
          </div>

          <p className="text-[11px] text-zinc-600 leading-relaxed italic bg-rose-50/50 p-3 rounded-xl border border-rose-100">
            <strong>IR Strategic Assessment: </strong>{countriesData[countryB]?.irStrategicNote}
          </p>
        </div>
      </div>

      {/* Direct Strategic Metric Comparison Table */}
      <div className="p-5 rounded-2xl bg-zinc-900 text-white space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <GitCompare className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold font-mono tracking-wider uppercase text-amber-300">
              Head-to-Head Strategic Demographic Differential (Year {selectedYear})
            </h4>
          </div>
          <span className="text-xs font-mono text-zinc-400">UN Population Division Estimates</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-zinc-800 rounded-xl space-y-1">
            <div className="text-[10px] font-mono text-zinc-400 uppercase">Median Age Gap</div>
            <div className="text-lg font-extrabold font-mono text-white">
              {Math.abs(dataA?.summary.medianAge - dataB?.summary.medianAge).toFixed(1)} Years
            </div>
            <div className="text-[10px] text-zinc-400">
              {dataA?.summary.medianAge < dataB?.summary.medianAge ? `${countryA} is younger` : `${countryB} is younger`}
            </div>
          </div>

          <div className="p-3 bg-zinc-800 rounded-xl space-y-1">
            <div className="text-[10px] font-mono text-zinc-400 uppercase">Working-Age Pool Ratio</div>
            <div className="text-lg font-extrabold font-mono text-emerald-400">
              {(
                (dataA?.summary.totalPopulationMillions * dataA?.summary.workingAgeShare) /
                Math.max(dataB?.summary.totalPopulationMillions * dataB?.summary.workingAgeShare, 1)
              ).toFixed(2)}x
            </div>
            <div className="text-[10px] text-zinc-400">{countryA} vs. {countryB} workers</div>
          </div>

          <div className="p-3 bg-zinc-800 rounded-xl space-y-1">
            <div className="text-[10px] font-mono text-zinc-400 uppercase">Elderly Burden Ratio</div>
            <div className="text-lg font-extrabold font-mono text-amber-400">
              {dataA?.summary.elderlyDependencyRatio}% vs {dataB?.summary.elderlyDependencyRatio}%
            </div>
            <div className="text-[10px] text-zinc-400">65+ dependents per 100 workers</div>
          </div>

          <div className="p-3 bg-zinc-800 rounded-xl space-y-1">
            <div className="text-[10px] font-mono text-zinc-400 uppercase">Youth Bulge (15–24)</div>
            <div className="text-lg font-extrabold font-mono text-sky-400">
              {dataA?.summary.youthBulge15_24}% vs {dataB?.summary.youthBulge15_24}%
            </div>
            <div className="text-[10px] text-zinc-400">Conflict risk threshold: &gt;20%</div>
          </div>
        </div>
      </div>

      {/* 3 Core Political Science Demographic Literature Decoders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
          <div className="font-mono text-xs font-bold text-indigo-700 flex items-center gap-1.5">
            <TrendingDown className="w-4 h-4" />
            <span>The Aging Superpower Trap</span>
          </div>
          <p className="text-xs text-zinc-700 leading-relaxed">
            <strong>Nicholas Eberstadt & Hal Brands: </strong>
            Countries confronting steep demographic contraction face an acute fiscal squeeze: ballooning pension and medical obligations compete directly against defense appropriations and military equipment procurement.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
          <div className="font-mono text-xs font-bold text-amber-700 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4" />
            <span>Youth Bulge & Conflict Risk</span>
          </div>
          <p className="text-xs text-zinc-700 leading-relaxed">
            <strong>Jack Goldstone & Henrik Urdal: </strong>
            Societies where young males aged 15–24 constitute over 20% of the adult population face statistically higher risks of civil instability, political radicalization, and state fragility when employment opportunities are scarce.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
          <div className="font-mono text-xs font-bold text-emerald-700 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4" />
            <span>The Demographic Dividend</span>
          </div>
          <p className="text-xs text-zinc-700 leading-relaxed">
            <strong>David Bloom & Jeffrey Williamson: </strong>
            When fertility drops, the proportion of working-age adults temporarily surges relative to child and elderly dependents. If paired with sound institutions, this demographic window creates dramatic multi-decade economic growth.
          </p>
        </div>
      </div>
    </div>
  );
}
