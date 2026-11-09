import { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import {
  Globe,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ShieldAlert,
  DollarSign,
  Scale,
  Layers,
  Info,
  Filter,
  Sparkles,
  Activity,
  Flame,
  Shield,
  Compass,
  ArrowRight
} from 'lucide-react';
import worldGeoData from '../../data/worldGeo.json';
import metricsData from '../../data/countryMetrics.json';

type MetricKey =
  | 'gdpBillions'
  | 'conflictIntensity'
  | 'militarySpendingBillions'
  | 'militaryShareGdp'
  | 'polityScore'
  | 'tradeOpenness'
  | 'cincScore';

interface MetricConfig {
  key: MetricKey;
  label: string;
  shortLabel: string;
  category: 'economic' | 'security' | 'governance';
  format: (v: number) => string;
  unit: string;
  desc: string;
  irConcept: string;
  isDiverging?: boolean; // For Polity (-10 to +10)
  colorScheme: (t: number) => string;
}

const METRICS: MetricConfig[] = [
  {
    key: 'conflictIntensity',
    label: 'Armed Conflict Intensity Index (0–100)',
    shortLabel: 'Conflict Intensity',
    category: 'security',
    format: (v) => `${v.toFixed(0)} / 100`,
    unit: 'Index (0–100)',
    desc: 'Synthesizes active warfare, battle-related fatalities, UCDP armed conflicts, and militarized interstate disputes (MIDs).',
    irConcept: 'Shows geographic clustering of violent conflict in the Middle East, Horn of Africa, Sahel, Eastern Europe, and Myanmar.',
    colorScheme: d3.interpolateYlOrRd
  },
  {
    key: 'gdpBillions',
    label: 'Gross Domestic Product (Nominal Billions USD)',
    shortLabel: 'GDP (Billions USD)',
    category: 'economic',
    format: (v) => `$${v >= 1000 ? (v / 1000).toFixed(2) + 'T' : v.toFixed(0) + 'B'}`,
    unit: 'Billion USD',
    desc: 'Aggregate nominal economic output. The foundational determinant of structural polarity and potential military mobilization.',
    irConcept: 'Illustrates unipolar/bipolar economic mass concentrated in North America, East Asia, and Western Europe.',
    colorScheme: d3.interpolateBlues
  },
  {
    key: 'militarySpendingBillions',
    label: 'SIPRI Defense Spending (Billions USD)',
    shortLabel: 'Military Expenditure',
    category: 'security',
    format: (v) => `$${v.toFixed(1)}B`,
    unit: 'Billion USD',
    desc: 'Annual sovereign expenditure on armed forces, procurement, military R&D, and defense administration (SIPRI Benchmark).',
    irConcept: 'US defense spending ($916B) exceeds the next 9 major powers combined; highlights asymmetric hegemonic deterrence.',
    colorScheme: d3.interpolateViridis
  },
  {
    key: 'militaryShareGdp',
    label: 'Military Burden (% of GDP)',
    shortLabel: 'Defense % of GDP',
    category: 'security',
    format: (v) => `${v.toFixed(2)}%`,
    unit: '% of GDP',
    desc: 'Proportion of economic output diverted toward armed forces. Direct proxy for state militarization and wartime footing.',
    irConcept: 'Wartime mobilization surges above 5% (Ukraine ~37%, Israel ~5.3%, Russia ~5.9%, Saudi Arabia ~7.1%) vs peacetime NATO target (2%).',
    colorScheme: d3.interpolateReds
  },
  {
    key: 'polityScore',
    label: 'Polity5 Institutional Regime Score (-10 to +10)',
    shortLabel: 'Democracy vs. Autocracy',
    category: 'governance',
    format: (v) => (v > 0 ? `+${v} (Democracy)` : v === 0 ? '0 (Anocracy)' : `${v} (Autocracy)`),
    unit: 'Polity Score (-10 to +10)',
    desc: 'Institutional checks on the executive, competitiveness of political participation, and openness of leadership recruitment.',
    irConcept: 'Empirical Law of Democratic Peace: Consolidated democracies (+6 to +10) form peace zones, directing force outward.',
    isDiverging: true,
    colorScheme: (t) => d3.interpolateRdYlBu(t) // 0 is Red (-10), 0.5 is Yellow (0), 1 is Blue (+10)
  },
  {
    key: 'tradeOpenness',
    label: 'Economic Openness (Trade % of GDP)',
    shortLabel: 'Trade Openness',
    category: 'economic',
    format: (v) => `${v.toFixed(1)}%`,
    unit: '% of GDP',
    desc: 'Sum of sovereign exports and imports divided by GDP. Quantifies exposure to the world economy and Commercial Peace effects.',
    irConcept: 'Trade hubs (Singapore 330%, Netherlands 160%) vs continental scale economies (US 27%, India 49%).',
    colorScheme: d3.interpolateYlGn
  },
  {
    key: 'cincScore',
    label: 'COW Composite Index of National Capability (CINC)',
    shortLabel: 'CINC Power Share',
    category: 'security',
    format: (v) => `${(v * 100).toFixed(2)}% of World`,
    unit: 'Global Power Share',
    desc: 'Synthesizes demographic (total & urban pop), industrial (steel & energy), and military (personnel & spending) capacity.',
    irConcept: 'Power Transition Theory: Shifts in CINC shares indicate dangerous narrowing of the hegemonic power gap.',
    colorScheme: d3.interpolatePurples
  }
];

const REGIONAL_VIEWS = [
  { name: 'World (Global View)', shortName: 'Global', center: [0, 15], zoom: 1 },
  { name: 'Europe & Black Sea (Ukraine Theater)', shortName: 'Europe & Ukraine', center: [28, 49], zoom: 3.2 },
  { name: 'East Asia & Taiwan Strait', shortName: 'East Asia (Taiwan)', center: [118, 28], zoom: 2.8 },
  { name: 'Middle East & Persian Gulf', shortName: 'Middle East & Gulf', center: [45, 27], zoom: 3.4 },
  { name: 'South Asia (Indo-Pacific)', shortName: 'South Asia', center: [78, 20], zoom: 3.0 },
  { name: 'Sub-Saharan Africa (Sahel / Horn)', shortName: 'Sub-Saharan Africa', center: [24, 6], zoom: 2.3 },
  { name: 'Americas (USMCA & Latin America)', shortName: 'Americas', center: [-80, 12], zoom: 1.8 }
];

export function ChoroplethMapVisualizer() {
  const [selectedMetricKey, setSelectedMetricKey] = useState<MetricKey>('conflictIntensity');
  const [hoveredCountryCode, setHoveredCountryCode] = useState<string | null>('UKR');
  const [pinnedCountryCode, setPinnedCountryCode] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTheater, setActiveTheater] = useState<string>('Global');

  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const projectionRef = useRef<d3.GeoProjection | null>(null);

  const countries = metricsData.countries as Record<string, any>;
  const activeMetric = METRICS.find((m) => m.key === selectedMetricKey) || METRICS[0];

  // Active inspected country (either pinned or hovered)
  const activeCode = pinnedCountryCode || hoveredCountryCode || 'UKR';
  const activeCountry = countries[activeCode] || countries['UKR'];

  // Calculate domain min and max for the selected metric
  const { minVal, maxVal } = useMemo(() => {
    if (activeMetric.isDiverging) {
      return { minVal: -10, maxVal: 10 };
    }
    const vals = Object.values(countries).map((c: any) => c[selectedMetricKey] || 0);
    // Use 95th percentile for extreme outliers like GDP and defense spending so the map retains vivid contrast
    const sorted = [...vals].sort((a, b) => a - b);
    const p95 = sorted[Math.floor(sorted.length * 0.95)] || Math.max(...vals);
    const min = Math.min(...vals);
    return { minVal: min, maxVal: p95 };
  }, [selectedMetricKey, countries, activeMetric]);

  // Color generator for a country value
  const getColor = (val: number | undefined) => {
    if (val === undefined || isNaN(val)) return '#e4e4e7'; // Zinc 200 fallback

    if (activeMetric.isDiverging) {
      // Scale -10 to +10 into [0, 1] for RdYlBu (diverging)
      const t = Math.max(0, Math.min(1, (val + 10) / 20));
      return activeMetric.colorScheme(t);
    } else {
      // Log scale for GDP and military spending to prevent skew, linear for intensity/polity/openness
      let t = 0;
      if (activeMetric.key === 'gdpBillions' || activeMetric.key === 'militarySpendingBillions') {
        const logMin = Math.log(Math.max(1, minVal));
        const logMax = Math.log(Math.max(2, maxVal));
        const logVal = Math.log(Math.max(1, val));
        t = (logVal - logMin) / (logMax - logMin);
      } else {
        t = (val - minVal) / Math.max(1, maxVal - minVal);
      }
      t = Math.max(0.08, Math.min(0.95, t));
      return activeMetric.colorScheme(t);
    }
  };

  // D3 Map Rendering
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 920;
    const height = Math.max(500, width * 0.52);

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    svg.attr('viewBox', `0 0 ${width} ${height}`);

    const g = svg.append('g').attr('class', 'map-root');

    // Natural Earth 1 projection: Balanced compromise preserving global landmass aesthetics
    const projection = d3
      .geoNaturalEarth1()
      .scale(width / 6.2)
      .translate([width / 2, height / 2 + 10]);

    projectionRef.current = projection;

    const pathGenerator = d3.geoPath().projection(projection);

    // Zoom behavior with generous bounds so any theater region can be centered
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .translateExtent([
        [-width * 4, -height * 4],
        [width * 5, height * 5]
      ])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);
    zoomBehaviorRef.current = zoom;

    // Ocean backdrop
    g.append('rect')
      .attr('width', width * 3)
      .attr('height', height * 3)
      .attr('x', -width)
      .attr('y', -height)
      .attr('fill', '#f8fafc') // Slate 50 clean ocean
      .attr('class', 'ocean-bg');

    // Sphere outline / Graticule
    const graticule = d3.geoGraticule();
    g.append('path')
      .datum(graticule())
      .attr('d', pathGenerator)
      .attr('fill', 'none')
      .attr('stroke', '#e2e8f0')
      .attr('stroke-width', 0.6)
      .attr('opacity', 0.65);

    // Render country features
    const features = (worldGeoData as any).features;

    const countriesGroup = g.append('g').attr('class', 'countries-layer');

    const countryPaths = countriesGroup
      .selectAll('path')
      .data(features)
      .enter()
      .append('path')
      .attr('d', (d: any) => pathGenerator(d))
      .attr('class', 'country-path cursor-pointer')
      .attr('fill', (d: any) => {
        const cid = d.id;
        const cData = countries[cid];
        return getColor(cData ? cData[selectedMetricKey] : undefined);
      })
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 0.8)
      .style('transition', 'fill 0.2s ease, stroke 0.2s ease, stroke-width 0.2s ease')
      .on('mouseenter', (event: any, d: any) => {
        const cid = d.id;
        setHoveredCountryCode(cid);
        d3.select(event.currentTarget)
          .attr('stroke', '#0f172a') // Charcoal highlight
          .attr('stroke-width', 2)
          .raise();
      })
      .on('mouseleave', (event: any, d: any) => {
        const cid = d.id;
        if (cid !== pinnedCountryCode) {
          d3.select(event.currentTarget)
            .attr('stroke', '#ffffff')
            .attr('stroke-width', 0.8);
        }
      })
      .on('click', (_: any, d: any) => {
        const cid = d.id;
        setPinnedCountryCode((prev) => (prev === cid ? null : cid));
      });

    // Highlight currently pinned or hovered country
    countryPaths.each(function (d: any) {
      if (d.id === activeCode) {
        d3.select(this)
          .attr('stroke', '#1e1b4b') // Deep Indigo ring
          .attr('stroke-width', 2.2)
          .raise();
      }
    });
  }, [selectedMetricKey, minVal, maxVal, countries, activeCode]);

  // Quick zoom to preset theater
  const handleZoomTheater = (preset: (typeof REGIONAL_VIEWS)[0]) => {
    if (!svgRef.current || !zoomBehaviorRef.current || !projectionRef.current) return;
    const svg = d3.select(svgRef.current);

    const width = svgRef.current.clientWidth || 920;
    const height = Math.max(500, width * 0.52);

    setActiveTheater(preset.shortName);

    if (preset.zoom === 1) {
      svg
        .transition()
        .duration(700)
        .ease(d3.easeCubicOut)
        .call(zoomBehaviorRef.current.transform, d3.zoomIdentity);
      return;
    }

    const coords = projectionRef.current(preset.center as [number, number]);
    if (!coords) return;

    const [px, py] = coords;
    const k = preset.zoom;

    // Apply exact D3 zoom transform: moves [px, py] to viewport center [width/2, height/2] at scale k
    const targetTransform = d3.zoomIdentity
      .translate(width / 2, height / 2)
      .scale(k)
      .translate(-px, -py);

    svg
      .transition()
      .duration(800)
      .ease(d3.easeCubicOut)
      .call(zoomBehaviorRef.current.transform, targetTransform);
  };

  const resetZoom = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    setActiveTheater('Global');
    d3.select(svgRef.current)
      .transition()
      .duration(600)
      .ease(d3.easeCubicOut)
      .call(zoomBehaviorRef.current.transform, d3.zoomIdentity);
  };

  const zoomIn = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current)
      .transition()
      .duration(300)
      .call(zoomBehaviorRef.current.scaleBy, 1.35);
  };

  const zoomOut = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current)
      .transition()
      .duration(300)
      .call(zoomBehaviorRef.current.scaleBy, 0.74);
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1.5 shadow-2xs">
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              D3.js Geopolitical Choropleth Engine
            </span>
            <span className="text-xs font-mono text-zinc-500">177 Sovereign Nations · Natural Earth Projection</span>
          </div>

          <h2 className="text-2xl font-black text-zinc-900 tracking-tight">
            Global Geographic Distribution & Security Metrics
          </h2>
          <p className="text-xs text-zinc-600 mt-1 max-w-2xl leading-relaxed">
            Hover or click any nation to interrogate structural geopolitical indicators. Analyze how armed conflict intensity, military expenditure, democratic governance, and economic scale cluster across geographic regions.
          </p>
        </div>

        {/* Selected Metric Pill */}
        <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl flex flex-col items-start lg:items-end shrink-0">
          <span className="text-[10px] font-mono font-bold uppercase text-zinc-500">Active Metric Layer</span>
          <span className="text-base font-extrabold text-indigo-700">{activeMetric.shortLabel}</span>
          <span className="text-[11px] font-mono text-zinc-600">{activeMetric.unit}</span>
        </div>
      </div>

      {/* Metric Category Tabs */}
      <div className="space-y-2">
        <div className="text-[11px] font-mono text-zinc-500 uppercase font-bold flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-indigo-600" />
          <span>Select Analytical Indicator to Map:</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {METRICS.map((m) => {
            const isSelected = selectedMetricKey === m.key;
            return (
              <button
                key={m.key}
                onClick={() => setSelectedMetricKey(m.key)}
                className={`p-2.5 rounded-xl text-left transition-all border flex flex-col justify-between gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs font-bold'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:border-zinc-300'
                }`}
              >
                <div className="text-xs font-bold leading-tight">{m.shortLabel}</div>
                <div
                  className={`text-[9px] font-mono uppercase ${
                    isSelected ? 'text-indigo-200' : 'text-zinc-500'
                  }`}
                >
                  {m.category}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Map Theater Zoom Presets & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-50 p-3 rounded-2xl border border-zinc-200 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="font-mono font-bold text-zinc-700 shrink-0 mr-1 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-indigo-600" />
            <span>Theaters:</span>
          </span>
          {REGIONAL_VIEWS.map((reg) => {
            const isActive = activeTheater === reg.shortName;
            return (
              <button
                key={reg.name}
                onClick={() => handleZoomTheater(reg)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold whitespace-nowrap transition-all shadow-2xs cursor-pointer border ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:text-indigo-700'
                }`}
              >
                {reg.shortName}
              </button>
            );
          })}

          <div className="flex items-center gap-1 ml-2 border-l border-zinc-200 pl-2 shrink-0">
            <button
              onClick={zoomIn}
              className="p-1.5 rounded-lg bg-white border border-zinc-200 hover:bg-zinc-100 text-zinc-700 transition-colors cursor-pointer"
              title="Zoom In (+)"
            >
              <ZoomIn className="w-3.5 h-3.5 text-zinc-600" />
            </button>
            <button
              onClick={zoomOut}
              className="p-1.5 rounded-lg bg-white border border-zinc-200 hover:bg-zinc-100 text-zinc-700 transition-colors cursor-pointer"
              title="Zoom Out (-)"
            >
              <ZoomOut className="w-3.5 h-3.5 text-zinc-600" />
            </button>
            <button
              onClick={resetZoom}
              className="p-1.5 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-zinc-700 transition-colors cursor-pointer"
              title="Reset to global view"
            >
              <RotateCcw className="w-3.5 h-3.5 text-zinc-700" />
            </button>
          </div>
        </div>

        <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-1.5 self-end sm:self-auto shrink-0">
          <span>Scroll to Zoom • Drag to Pan • Click to Pin</span>
        </div>
      </div>

      {/* Main Map Canvas Area with Interactive Overlay Panel */}
      <div className="relative rounded-2xl border border-zinc-200 bg-[#f8fafc] overflow-hidden">
        <div ref={containerRef} className="w-full">
          <svg ref={svgRef} className="w-full h-auto min-h-[480px]" style={{ display: 'block' }} />
        </div>

        {/* Legend Ribbon at Bottom Left */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-zinc-200 shadow-md text-xs font-mono space-y-1.5 max-w-[260px]">
          <div className="font-bold text-zinc-800 text-[11px] flex items-center justify-between">
            <span>{activeMetric.shortLabel}</span>
            <span className="text-zinc-500 text-[10px]">{activeMetric.unit}</span>
          </div>

          {/* Color Gradient Bar */}
          <div
            className="h-2.5 w-full rounded-md border border-zinc-300"
            style={{
              background: activeMetric.isDiverging
                ? 'linear-gradient(to right, #b91c1c, #f59e0b, #10b981, #2563eb)'
                : `linear-gradient(to right, ${getColor(minVal)}, ${getColor(maxVal)})`
            }}
          />

          <div className="flex justify-between text-[10px] text-zinc-600 font-bold">
            <span>{activeMetric.format(minVal)}</span>
            <span>{activeMetric.format(maxVal)}</span>
          </div>
        </div>

        {/* Floating Country Intelligence HUD (Pinned or Hovered) */}
        {activeCountry && (
          <div className="absolute top-4 right-4 bg-zinc-950/95 backdrop-blur-md text-white p-4 rounded-2xl border border-zinc-800 shadow-2xl max-w-sm w-full space-y-3 z-30 transition-all">
            <div className="flex items-start justify-between border-b border-zinc-800 pb-2.5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                    {activeCountry.code}
                  </span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-[10px] font-mono text-zinc-400">{activeCountry.strategicBloc}</span>
                </div>
                <h3 className="text-lg font-black text-white leading-tight mt-0.5">
                  {activeCountry.name}
                </h3>
              </div>

              {pinnedCountryCode === activeCountry.code && (
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-indigo-500 text-white">
                  PINNED
                </span>
              )}
            </div>

            {/* Active Metric Large Highlight Display */}
            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase">
                  {activeMetric.shortLabel}
                </div>
                <div className="text-xl font-black font-mono text-amber-400">
                  {activeCountry[selectedMetricKey] !== undefined
                    ? activeMetric.format(activeCountry[selectedMetricKey])
                    : 'N/A'}
                </div>
              </div>

              <div
                className="w-4 h-4 rounded-full border border-white"
                style={{ backgroundColor: getColor(activeCountry[selectedMetricKey]) }}
              />
            </div>

            {/* Core Comparative Profile Grid */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2 bg-zinc-900/80 rounded-lg border border-zinc-800/80">
                <span className="text-zinc-400 block text-[9px]">GDP (NOMINAL)</span>
                <span className="font-bold text-white">${activeCountry.gdpBillions}B</span>
              </div>
              <div className="p-2 bg-zinc-900/80 rounded-lg border border-zinc-800/80">
                <span className="text-zinc-400 block text-[9px]">MILITARY (SIPRI)</span>
                <span className="font-bold text-white">${activeCountry.militarySpendingBillions}B ({activeCountry.militaryShareGdp}%)</span>
              </div>
              <div className="p-2 bg-zinc-900/80 rounded-lg border border-zinc-800/80">
                <span className="text-zinc-400 block text-[9px]">POLITY REGIME</span>
                <span className={`font-bold ${activeCountry.polityScore >= 6 ? 'text-blue-400' : activeCountry.polityScore <= -6 ? 'text-rose-400' : 'text-amber-400'}`}>
                  {activeCountry.polityScore > 0 ? `+${activeCountry.polityScore}` : activeCountry.polityScore}
                </span>
              </div>
              <div className="p-2 bg-zinc-900/80 rounded-lg border border-zinc-800/80">
                <span className="text-zinc-400 block text-[9px]">POPULATION</span>
                <span className="font-bold text-white">{activeCountry.populationMillions}M</span>
              </div>
            </div>

            {/* Strategic Conflict & Alliance Note */}
            <div className="text-[11px] text-zinc-300 bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800 leading-relaxed">
              <strong className="text-amber-300 font-mono">Geopolitical Note: </strong>
              <span>{activeCountry.primaryConflict}</span>
            </div>
          </div>
        )}
      </div>

      {/* Analytical IR Concept Decoder */}
      <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-xs text-indigo-950 space-y-1.5">
        <div className="font-bold font-mono text-sm flex items-center gap-2 text-indigo-900">
          <Sparkles className="w-4 h-4 text-indigo-700" />
          <span>IR Theoretical Insight: Mapping {activeMetric.label}</span>
        </div>
        <p className="leading-relaxed font-sans">{activeMetric.irConcept}</p>
        <p className="text-[11px] text-indigo-800 font-mono pt-1">
          <strong>Data Foundation: </strong>{activeMetric.desc}
        </p>
      </div>

      {/* 3 Core Political Science Spatial Theorems */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
          <div className="font-mono text-xs font-bold text-rose-700 flex items-center gap-1.5">
            <Flame className="w-4 h-4" />
            <span>Regional Conflict Clustering</span>
          </div>
          <p className="text-xs text-zinc-700 leading-relaxed">
            <strong>Buhaug & Gleditsch (2008): </strong>
            Violent conflict does not occur randomly across the globe; it clusters contiguously along shared borders due to refugee flows, illicit cross-border arms trafficking, and transnational ethnic kin ties.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
          <div className="font-mono text-xs font-bold text-blue-700 flex items-center gap-1.5">
            <Scale className="w-4 h-4" />
            <span>The Democratic Peace Zone</span>
          </div>
          <p className="text-xs text-zinc-700 leading-relaxed">
            <strong>Russett & Oneal (2001): </strong>
            Switch to the Polity5 map to observe how high institutional democracy (+6 to +10) clusters in North America, Western Europe, and parts of the Indo-Pacific, creating stable "zones of peace" with zero inter-democracy wars.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
          <div className="font-mono text-xs font-bold text-amber-700 flex items-center gap-1.5">
            <Shield className="w-4 h-4" />
            <span>Guns vs. Butter Tradeoff</span>
          </div>
          <p className="text-xs text-zinc-700 leading-relaxed">
            <strong>Paul Kennedy (*Rise and Fall of Great Powers*): </strong>
            Comparing Military Burden (% of GDP) reveals states under severe security threat (Ukraine, Israel, Russia, Saudi Arabia) diverting staggering shares of national wealth to defense, risking imperial overstretch.
          </p>
        </div>
      </div>
    </div>
  );
}
