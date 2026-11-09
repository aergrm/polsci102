import { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyJustify, sankeyLinkHorizontal } from 'd3-sankey';
import {
  Ship,
  TrendingUp,
  ArrowRight,
  Filter,
  Info,
  Maximize2,
  Minimize2,
  Sparkles,
  Layers,
  Scale,
  ShieldAlert,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import rawSankeyData from '../../data/sankeyTradeFlows.json';

interface FlowRecord {
  source: string;
  target: string;
  totalBillions: number;
  flowToTarget: number; // source exports to target
  flowToSource: number; // target exports to source
}

interface SankeyNodeData {
  id: string;
  country: string;
  role: 'exporter' | 'importer';
  region: string;
  totalVolume?: number;
}

interface SankeyLinkData {
  source: string | any;
  target: string | any;
  value: number;
  exporter: string;
  importer: string;
}

// Region colors for distinct geopolitical identification
const REGION_COLORS: Record<string, string> = {
  'North America': '#3b82f6', // Blue
  'East Asia': '#f59e0b',     // Amber
  'Europe': '#10b981',        // Emerald
  'Eurasia': '#8b5cf6',       // Purple
  'Latin America': '#14b8a6', // Teal
  'Middle East': '#f97316',   // Orange
  'South Asia': '#06b6d4',    // Cyan
  'Southeast Asia': '#ec4899',// Pink
  'Oceania': '#6366f1',       // Indigo
  'Other': '#71717a'          // Zinc
};

const ERAS_META = [
  {
    year: '2014',
    title: 'Hyper-Globalization & US-China Interdependence',
    volume: '$36.7 Trillion Global Volume',
    desc: 'The apex of multinational supply chains, containerized logistics, and Farrell & Newman’s "Weaponized Interdependence". Peak bilateral trade between the US and China ($655B).'
  },
  {
    year: '1995',
    title: 'WTO Formation & Post-Cold War Liberal Order',
    volume: '$10.2 Trillion Global Volume',
    desc: 'Foundation of the World Trade Organization, implementation of NAFTA, and the integration of former Soviet bloc and developing economies into rules-based trade.'
  },
  {
    year: '1970',
    title: 'Bretton Woods & GATT Industrial Expansion',
    volume: '$620 Billion Global Volume',
    desc: 'Post-WWII reconstruction miracles in Western Europe and Japan under GATT tariff reductions, contrasting with Cold War Comecon socialist autarky.'
  },
  {
    year: '1938',
    title: 'Interwar Protectionist Collapse & Tariff Blocs',
    volume: 'Severe Depressive Contraction',
    desc: 'Smoot-Hawley Act (1930), British Imperial Preference, and fascist bilateral clearing agreements fragmented world commerce into hostile autarkic trade blocs preceding WWII.'
  },
  {
    year: '1913',
    title: 'The First Globalization (Pax Britannica)',
    volume: '$38 Billion Global Volume',
    desc: 'Steamships, telegraph cables, and the Gold Standard produced record European trade openness. Often cited in IR against liberal optimism: high interdependence did not prevent WWI.'
  }
];

export function TradeSankeyDiagram() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [selectedYear, setSelectedYear] = useState<string>('2014');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [minFlowThreshold, setMinFlowThreshold] = useState<number>(10);
  const [activeLink, setActiveLink] = useState<{
    exporter: string;
    importer: string;
    value: number;
    exporterRegion: string;
    importerRegion: string;
  } | null>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Helper to match country names, unifying Russia and Soviet Union
  const isCountryMatched = (countryName: string, query: string) => {
    if (query === 'All') return true;
    if (query === 'Russia / Soviet Union' || query === 'Russia' || query.includes('Soviet')) {
      return countryName === 'Russia' || countryName.includes('Soviet');
    }
    return countryName === query;
  };

  // Available countries in the active dataset
  const availableCountries = useMemo(() => {
    const flows: FlowRecord[] = (rawSankeyData.flowsByYear as any)[selectedYear] || [];
    const set = new Set<string>();
    flows.forEach(f => {
      if (f.source !== 'Russia' && !f.source.includes('Soviet')) set.add(f.source);
      if (f.target !== 'Russia' && !f.target.includes('Soviet')) set.add(f.target);
    });
    const list = Array.from(set).sort();
    return ['All', 'Russia / Soviet Union', ...list];
  }, [selectedYear]);

  // Adjust threshold default per year because 1913/1938 values are in millions ($0.1B-$1B), while 2014 is in tens of billions
  useEffect(() => {
    if (selectedYear === '1913' || selectedYear === '1938') {
      setMinFlowThreshold(0.05); // $50 Million
    } else if (selectedYear === '1970') {
      setMinFlowThreshold(0.3); // $300 Million
    } else if (selectedYear === '1995') {
      setMinFlowThreshold(4); // $4 Billion
    } else {
      setMinFlowThreshold(10); // $10 Billion (reveals Russia, Germany, Japan, China, US)
    }
    setSelectedCountry('All');
  }, [selectedYear]);

  // Build the Bipartite Graph for D3 Sankey
  const graphData = useMemo(() => {
    const rawFlows: FlowRecord[] = (rawSankeyData.flowsByYear as any)[selectedYear] || [];
    const regions: Record<string, string> = rawSankeyData.meta.regions;

    // Filter flows by selectedCountry if set
    const filteredFlows = selectedCountry === 'All'
      ? rawFlows
      : rawFlows.filter(f => isCountryMatched(f.source, selectedCountry) || isCountryMatched(f.target, selectedCountry));

    // Accumulate link items: Exporter (Origin) ➔ Importer (Destination)
    const rawLinks: SankeyLinkData[] = [];
    const countryExportTotals: Record<string, number> = {};
    const countryImportTotals: Record<string, number> = {};

    filteredFlows.forEach(f => {
      // 1. source exports to target
      if (f.flowToTarget >= minFlowThreshold) {
        if (selectedCountry === 'All' || isCountryMatched(f.source, selectedCountry) || isCountryMatched(f.target, selectedCountry)) {
          rawLinks.push({
            source: `${f.source} [Exp]`,
            target: `${f.target} [Imp]`,
            value: f.flowToTarget,
            exporter: f.source,
            importer: f.target
          });
          countryExportTotals[f.source] = (countryExportTotals[f.source] || 0) + f.flowToTarget;
          countryImportTotals[f.target] = (countryImportTotals[f.target] || 0) + f.flowToTarget;
        }
      }

      // 2. target exports to source
      if (f.flowToSource >= minFlowThreshold) {
        if (selectedCountry === 'All' || isCountryMatched(f.source, selectedCountry) || isCountryMatched(f.target, selectedCountry)) {
          rawLinks.push({
            source: `${f.target} [Exp]`,
            target: `${f.source} [Imp]`,
            value: f.flowToSource,
            exporter: f.target,
            importer: f.source
          });
          countryExportTotals[f.target] = (countryExportTotals[f.target] || 0) + f.flowToSource;
          countryImportTotals[f.source] = (countryImportTotals[f.source] || 0) + f.flowToSource;
        }
      }
    });

    // Create unique nodes
    const nodeMap = new Map<string, SankeyNodeData>();

    rawLinks.forEach(l => {
      if (!nodeMap.has(l.source)) {
        nodeMap.set(l.source, {
          id: l.source,
          country: l.exporter,
          role: 'exporter',
          region: regions[l.exporter] || 'Other',
          totalVolume: countryExportTotals[l.exporter] || 0
        });
      }
      if (!nodeMap.has(l.target)) {
        nodeMap.set(l.target, {
          id: l.target,
          country: l.importer,
          role: 'importer',
          region: regions[l.importer] || 'Other',
          totalVolume: countryImportTotals[l.importer] || 0
        });
      }
    });

    const nodes = Array.from(nodeMap.values());
    return { nodes, links: rawLinks };
  }, [selectedYear, selectedCountry, minFlowThreshold]);

  // Render D3 Sankey Diagram
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 920;
    const height = Math.max(540, Math.min(graphData.nodes.length * 28 + 120, 800));

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous render

    svg.attr('viewBox', `0 0 ${width} ${height}`);

    if (graphData.nodes.length === 0 || graphData.links.length === 0) {
      svg
        .append('text')
        .attr('x', width / 2)
        .attr('y', height / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', '#94a3b8')
        .attr('font-size', '14px')
        .attr('font-family', 'sans-serif')
        .text('No trade flows exceed the selected threshold. Try lowering the threshold slider.');
      return;
    }

    const margin = { top: 40, right: 140, bottom: 30, left: 140 };

    // Deep clone nodes and links for d3-sankey mutability
    const nodesCopy = graphData.nodes.map(d => ({ ...d }));
    const linksCopy = graphData.links.map(d => ({ ...d }));

    const sankeyGenerator = sankey<SankeyNodeData, SankeyLinkData>()
      .nodeId((d: any) => d.id)
      .nodeAlign(sankeyJustify)
      .nodeWidth(18)
      .nodePadding(12)
      .extent([
        [margin.left, margin.top],
        [width - margin.right, height - margin.bottom]
      ]);

    let sankeyResult: any;
    try {
      sankeyResult = sankeyGenerator({
        nodes: nodesCopy,
        links: linksCopy
      });
    } catch (e) {
      console.warn('Sankey layout calculation warning:', e);
      return;
    }

    const defs = svg.append('defs');

    // Create linear gradients for each link
    sankeyResult.links.forEach((link: any, i: number) => {
      const gradId = `link-grad-${i}`;
      const grad = defs
        .append('linearGradient')
        .attr('id', gradId)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', link.source.x1)
        .attr('x2', link.target.x0);

      const sourceColor = REGION_COLORS[link.source.region] || '#71717a';
      const targetColor = REGION_COLORS[link.target.region] || '#71717a';

      grad.append('stop').attr('offset', '0%').attr('stop-color', sourceColor);
      grad.append('stop').attr('offset', '100%').attr('stop-color', targetColor);
    });

    // 1. Column Header Labels
    svg
      .append('text')
      .attr('x', margin.left)
      .attr('y', 20)
      .attr('text-anchor', 'start')
      .attr('class', 'text-xs font-mono font-bold fill-zinc-700 tracking-wider uppercase')
      .text('Origin Exporters (Outflows)');

    svg
      .append('text')
      .attr('x', width - margin.right)
      .attr('y', 20)
      .attr('text-anchor', 'end')
      .attr('class', 'text-xs font-mono font-bold fill-zinc-700 tracking-wider uppercase')
      .text('Destination Markets (Inflows)');

    // 2. Render Links (Ribbons)
    const linksG = svg.append('g').attr('fill', 'none').attr('class', 'sankey-links');

    const linkPaths = linksG
      .selectAll('path')
      .data(sankeyResult.links)
      .enter()
      .append('path')
      .attr('d', sankeyLinkHorizontal())
      .attr('stroke', (_: any, i: number) => `url(#link-grad-${i})`)
      .attr('stroke-width', (d: any) => Math.max(1.5, d.width))
      .attr('stroke-opacity', 0.42)
      .style('transition', 'stroke-opacity 0.2s ease, stroke-width 0.2s ease')
      .on('mouseenter', (event: any, d: any) => {
        d3.select(event.currentTarget)
          .attr('stroke-opacity', 0.88)
          .raise();
        setActiveLink({
          exporter: d.exporter,
          importer: d.importer,
          value: d.value,
          exporterRegion: d.source.region,
          importerRegion: d.target.region
        });
      })
      .on('mouseleave', (event: any) => {
        d3.select(event.currentTarget).attr('stroke-opacity', 0.42);
        setActiveLink(null);
      });

    // 3. Render Nodes (Bars)
    const nodesG = svg.append('g').attr('class', 'sankey-nodes');

    const nodeG = nodesG
      .selectAll('g')
      .data(sankeyResult.nodes)
      .enter()
      .append('g')
      .attr('class', 'node-group cursor-pointer')
      .on('mouseenter', (_: any, d: any) => {
        setActiveNode(d.country);
        // Highlight incident links
        linkPaths.attr('stroke-opacity', (l: any) =>
          l.source.id === d.id || l.target.id === d.id ? 0.85 : 0.08
        );
      })
      .on('mouseleave', () => {
        setActiveNode(null);
        linkPaths.attr('stroke-opacity', 0.42);
      });

    // Node rectangles
    nodeG
      .append('rect')
      .attr('x', (d: any) => d.x0)
      .attr('y', (d: any) => d.y0)
      .attr('height', (d: any) => Math.max(d.y1 - d.y0, 3))
      .attr('width', (d: any) => d.x1 - d.x0)
      .attr('fill', (d: any) => REGION_COLORS[d.region] || '#71717a')
      .attr('rx', 3)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 1.5)
      .append('title')
      .text((d: any) => `${d.country} (${d.role})\nTotal Volume: $${d.value.toFixed(1)}B`);

    // Node text labels
    nodeG
      .append('text')
      .attr('x', (d: any) => (d.x0 < width / 2 ? d.x0 - 8 : d.x1 + 8))
      .attr('y', (d: any) => (d.y0 + d.y1) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', (d: any) => (d.x0 < width / 2 ? 'end' : 'start'))
      .attr('class', 'text-[11px] font-mono font-bold fill-zinc-800 pointer-events-none select-none')
      .text((d: any) => `${d.country}`)
      .append('tspan')
      .attr('class', 'text-[9px] font-normal fill-zinc-500 block')
      .attr('dx', '4')
      .text((d: any) => `$${d.value.toFixed(1)}B`);
  }, [graphData]);

  const activeEraMeta = ERAS_META.find(e => e.year === selectedYear) || ERAS_META[0];

  return (
    <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5 shadow-2xs">
              <Ship className="w-3.5 h-3.5 text-amber-600" />
              COW Bilateral Trade v4.0 · Barbieri & Keshk
            </span>
            <span className="text-xs font-mono text-zinc-500">D3.js Dynamic Sankey Engine</span>
          </div>

          <h2 className="text-2xl font-black text-zinc-900 tracking-tight">
            Global Trade Flows & Economic Interdependence
          </h2>
          <p className="text-xs text-zinc-600 mt-1 max-w-2xl leading-relaxed">
            Trace the asymmetrical vascular networks of world commerce. High-volume ribbons reveal trade imbalances, strategic dependencies, and the supply chain chokepoints of modern geopolitics.
          </p>
        </div>

        {/* Total Year Volume Badge */}
        <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl flex flex-col items-start lg:items-end shrink-0">
          <span className="text-[10px] font-mono font-bold uppercase text-amber-800">Global Trade Epoch</span>
          <span className="text-lg font-black font-mono text-amber-950">{activeEraMeta.volume}</span>
          <span className="text-[11px] font-mono text-amber-700">Year {selectedYear} Active Benchmark</span>
        </div>
      </div>

      {/* Controls Bar: Era Picker, Country Focus, Threshold */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
        {/* Era Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-bold text-zinc-700 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
            <span>Historical Globalization Epoch:</span>
          </label>
          <div className="flex flex-wrap gap-1">
            {ERAS_META.map(era => (
              <button
                key={era.year}
                onClick={() => setSelectedYear(era.year)}
                className={`px-2.5 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                  selectedYear === era.year
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                {era.year}
              </button>
            ))}
          </div>
        </div>

        {/* Country Focus Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-bold text-zinc-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-indigo-600" />
              <span>Focus on Specific Power:</span>
            </span>
            {selectedCountry !== 'All' && (
              <button
                onClick={() => setSelectedCountry('All')}
                className="text-[10px] text-amber-700 hover:underline font-bold"
              >
                Reset to Multilateral
              </button>
            )}
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-1.5 text-xs font-medium text-zinc-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {availableCountries.map(c => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Major Trading Powers (Multilateral)' : c}
              </option>
            ))}
          </select>
          <div className="flex flex-wrap gap-1 pt-1">
            {['All', 'Russia / Soviet Union', 'United States', 'China', 'Germany'].map(quickC => (
              <button
                key={quickC}
                onClick={() => setSelectedCountry(quickC)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                  selectedCountry === quickC
                    ? 'bg-amber-600 text-white font-bold'
                    : 'bg-zinc-200/80 text-zinc-700 hover:bg-zinc-300'
                }`}
              >
                {quickC === 'All' ? 'All' : quickC === 'Russia / Soviet Union' ? '🇷🇺 Russia / USSR' : quickC}
              </button>
            ))}
          </div>
        </div>

        {/* Min Flow Threshold Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-bold text-zinc-700 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-emerald-600" />
              <span>Min Flow Cutoff:</span>
            </label>
            <span className="font-mono text-xs font-extrabold text-amber-700">
              ≥ ${minFlowThreshold >= 1 ? `${minFlowThreshold}B` : `${Math.round(minFlowThreshold * 1000)}M`}
            </span>
          </div>
          <input
            type="range"
            min={selectedYear === '1913' || selectedYear === '1938' ? 0.02 : 1}
            max={selectedYear === '2014' ? 60 : selectedYear === '1995' ? 25 : 5}
            step={selectedYear === '1913' || selectedYear === '1938' ? 0.02 : 1}
            value={minFlowThreshold}
            onChange={(e) => setMinFlowThreshold(parseFloat(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer h-2 bg-zinc-200 rounded-lg"
          />
          <div className="flex justify-between text-[10px] font-mono text-zinc-500">
            <span>Fine Supply Chains</span>
            <span>Mega Corridors</span>
          </div>
        </div>
      </div>

      {/* Geopolitical Region Legend */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 text-xs font-mono text-zinc-600 border-b border-zinc-100 pt-1">
        <span className="font-bold text-zinc-800 shrink-0">Geopolitical Blocs:</span>
        {Object.entries(REGION_COLORS).filter(([k]) => k !== 'Other').map(([region, color]) => (
          <div key={region} className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            <span>{region}</span>
          </div>
        ))}
      </div>

      {/* Floating Active Link / Node Inspection Card */}
      {activeLink && (
        <div className="p-4 rounded-2xl bg-zinc-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg border border-zinc-800 transition-all">
          <div className="space-y-1">
            <div className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span>Bilateral Flow Inspection</span>
              <span>•</span>
              <span>Year {selectedYear}</span>
            </div>
            <div className="text-base font-bold flex items-center gap-2">
              <span className="text-blue-300">{activeLink.exporter}</span>
              <ArrowRight className="w-4 h-4 text-zinc-400" />
              <span className="text-amber-300">{activeLink.importer}</span>
            </div>
            <div className="text-xs text-zinc-300">
              {activeLink.exporter} ({activeLink.exporterRegion}) exports to {activeLink.importer} ({activeLink.importerRegion})
            </div>
          </div>

          <div className="p-3 bg-zinc-800 rounded-xl border border-zinc-700 shrink-0 text-right sm:text-right">
            <div className="text-[10px] font-mono text-zinc-400 uppercase">Export Flow Value</div>
            <div className="text-2xl font-black font-mono text-amber-400">
              ${activeLink.value >= 1 ? `${activeLink.value.toFixed(2)}B` : `${(activeLink.value * 1000).toFixed(0)}M`}
            </div>
          </div>
        </div>
      )}

      {/* D3 SVG Canvas Container */}
      <div
        ref={containerRef}
        className="w-full overflow-x-auto rounded-2xl border border-zinc-200 bg-[#fefdfb] p-4 relative"
      >
        <svg
          ref={svgRef}
          className="w-full h-auto min-h-[500px]"
          style={{ overflow: 'visible' }}
        />
      </div>

      {/* Historical Epoch Annotation */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1.5">
        <div className="font-bold font-mono text-sm flex items-center gap-2 text-amber-900">
          <Sparkles className="w-4 h-4 text-amber-700" />
          <span>{activeEraMeta.title} ({selectedYear})</span>
        </div>
        <p className="leading-relaxed font-sans">{activeEraMeta.desc}</p>
      </div>

      {/* Analytical IR Theory Decoders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
        <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1.5">
          <div className="font-mono text-xs font-bold text-indigo-700 flex items-center gap-1.5">
            <Scale className="w-4 h-4" />
            <span>Sensitivity vs. Vulnerability</span>
          </div>
          <p className="text-xs text-zinc-700 leading-relaxed">
            <strong>Keohane & Nye (1977): </strong>
            <em>Sensitivity</em> is the speed of domestic shocks from foreign trade shifts. <em>Vulnerability</em> is the liability to suffer long-term structural costs even after finding substitute partners.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1.5">
          <div className="font-mono text-xs font-bold text-amber-700 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4" />
            <span>Hirschman’s Leverage</span>
          </div>
          <p className="text-xs text-zinc-700 leading-relaxed">
            <strong>Albert Hirschman (1945): </strong>
            Trade is never politically neutral. When a large state dominates a smaller neighbor's export markets, the large state holds immense latent coercive leverage.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1.5">
          <div className="font-mono text-xs font-bold text-rose-700 flex items-center gap-1.5">
            <Layers className="w-4 h-4" />
            <span>Weaponized Interdependence</span>
          </div>
          <p className="text-xs text-zinc-700 leading-relaxed">
            <strong>Farrell & Newman (2019): </strong>
            Globalized supply chains form asymmetric hub-and-spoke topologies. States that jurisdictionally control central financial or tech hubs can execute panopticon and chokepoint effects.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-1.5">
          <div className="font-mono text-xs font-bold text-purple-900 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block" />
            <span>Soviet & Russian Trajectory</span>
          </div>
          <p className="text-xs text-purple-950 leading-relaxed">
            <strong>COMECON to Energy Leverage: </strong>
            Notice the transition: in 1970, the Soviet Union functioned largely as an autarkic bloc with Comecon. By 2014, Russia supplied &gt;$80B in oil/gas to Germany & EU, demonstrating mutual vulnerability.
          </p>
        </div>
      </div>
    </div>
  );
}
