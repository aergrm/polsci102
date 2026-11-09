import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Play,
  Pause,
  Compass,
  Layers,
  Flame,
  Shield,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import bordersData from '../data/worldBordersClean.json';

// Coordinates of key conflict capitals and geopolitical hubs
const CAPITALS = [
  { name: 'Washington, D.C.', lat: 38.9, lng: -77.0, code: 'USA' },
  { name: 'London', lat: 51.5, lng: -0.1, code: 'GBR' },
  { name: 'Paris', lat: 48.8, lng: 2.3, code: 'FRN' },
  { name: 'Berlin', lat: 52.5, lng: 13.4, code: 'GMY' },
  { name: 'Moscow', lat: 55.7, lng: 37.6, code: 'RUS' },
  { name: 'Beijing', lat: 39.9, lng: 116.4, code: 'CHN' },
  { name: 'Tokyo', lat: 35.6, lng: 139.6, code: 'JPN' },
  { name: 'New Delhi', lat: 28.6, lng: 77.2, code: 'IND' },
  { name: 'Cairo', lat: 30.0, lng: 31.2, code: 'EGY' },
  { name: 'Ankara', lat: 39.9, lng: 32.8, code: 'TUR' },
  { name: 'Brasília', lat: -15.8, lng: -47.9, code: 'BRA' },
  { name: 'Pretoria', lat: -25.7, lng: 28.2, code: 'SAF' },
  { name: 'Tehran', lat: 35.7, lng: 51.4, code: 'IRN' },
  { name: 'Tel Aviv', lat: 32.0, lng: 34.8, code: 'ISR' },
  { name: 'Seoul', lat: 37.5, lng: 127.0, code: 'ROK' },
  { name: 'Havana', lat: 23.1, lng: -82.3, code: 'CUB' },
  { name: 'Kyiv', lat: 50.4, lng: 30.5, code: 'UKR' },
  { name: 'Warsaw', lat: 52.2, lng: 21.0, code: 'POL' }
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

export function GlobalGeopoliticalGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedYear, setSelectedYear] = useState<number>(1962);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeLayer, setActiveLayer] = useState<'all' | 'disputes' | 'alliances'>('all');

  const globeGroupRef = useRef<THREE.Group | null>(null);
  const arcsGroupRef = useRef<THREE.Group | null>(null);
  const isPlayingRef = useRef(isPlaying);

  isPlayingRef.current = isPlaying;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = 500;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6f6f4); // Warm archival paper cream

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Warm natural lighting
    const ambientLight = new THREE.AmbientLight(0xfffbf5, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffedd5, 1.6);
    keyLight.position.set(12, 15, 15);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0e7ff, 0.8);
    fillLight.position.set(-15, -10, -10);
    scene.add(fillLight);

    // Main rotating group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // 1. Globe Sphere (Warm parchment paper base)
    const earthRadius = 5.0;
    const earthGeom = new THREE.SphereGeometry(earthRadius, 64, 48);
    const earthMat = new THREE.MeshStandardMaterial({
      color: 0xeeece5, // Warm tactile paper
      roughness: 0.9,
      metalness: 0.05
    });
    const earth = new THREE.Mesh(earthGeom, earthMat);
    globeGroup.add(earth);

    // 2. Graticule / Parallels (Subtle cartographic pencil lines)
    const graticuleGeom = new THREE.SphereGeometry(earthRadius + 0.01, 36, 18);
    const graticuleMat = new THREE.MeshBasicMaterial({
      color: 0xc8c6bc,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const graticule = new THREE.Mesh(graticuleGeom, graticuleMat);
    globeGroup.add(graticule);

    // 3. ACTUAL COUNTRY BORDERS (Rendered as physical dark charcoal line rings on the sphere)
    const bordersGroup = new THREE.Group();
    globeGroup.add(bordersGroup);

    const borderMaterial = new THREE.LineBasicMaterial({
      color: 0x3f3f46, // Dark slate/charcoal ink
      linewidth: 1.5,
      transparent: true,
      opacity: 0.75
    });

    (bordersData as number[][][]).forEach(ring => {
      if (ring.length < 3) return;
      const points: THREE.Vector3[] = [];
      ring.forEach(([lng, lat]) => {
        points.push(latLngToVector3(lat, lng, earthRadius + 0.02));
      });
      const borderGeom = new THREE.BufferGeometry().setFromPoints(points);
      const borderLine = new THREE.Line(borderGeom, borderMaterial);
      bordersGroup.add(borderLine);
    });

    // 4. Capital Nodes (Terracotta and navy ink dots)
    CAPITALS.forEach(city => {
      const pos = latLngToVector3(city.lat, city.lng, earthRadius + 0.04);
      const pinGeom = new THREE.SphereGeometry(0.09, 16, 16);
      const pinMat = new THREE.MeshStandardMaterial({
        color: 0xd97706, // Amber terracotta pin
        roughness: 0.4
      });
      const pin = new THREE.Mesh(pinGeom, pinMat);
      pin.position.copy(pos);
      globeGroup.add(pin);
    });

    // 5. Dynamic Crisis and Alliance Arcs Group
    const arcsGroup = new THREE.Group();
    globeGroup.add(arcsGroup);
    arcsGroupRef.current = arcsGroup;

    updateArcs(arcsGroup, selectedYear, activeLayer, earthRadius);

    // Mouse drag interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !globeGroupRef.current) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      globeGroupRef.current.rotation.y += deltaX * 0.005;
      globeGroupRef.current.rotation.x += deltaY * 0.0035;
      globeGroupRef.current.rotation.x = Math.max(-1.1, Math.min(1.1, globeGroupRef.current.rotation.x));
    };

    const onMouseUp = () => { isDragging = false; };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animId = 0;
    let autoCounter = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (globeGroupRef.current) {
        if (!isDragging && isPlayingRef.current) {
          globeGroupRef.current.rotation.y += 0.002;
        }

        if (isPlayingRef.current) {
          autoCounter++;
          if (autoCounter % 60 === 0) {
            setSelectedYear(prev => (prev >= 2024 ? 1870 : prev + 2));
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update arcs when year or layer changes
  useEffect(() => {
    if (arcsGroupRef.current) {
      updateArcs(arcsGroupRef.current, selectedYear, activeLayer, 5.0);
    }
  }, [selectedYear, activeLayer]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-zinc-200 bg-[#fbfbfa] shadow-sm">
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="w-full h-[500px] cursor-grab active:cursor-grabbing relative" />

      {/* Top Floating Controls */}
      <div className="absolute top-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pointer-events-none z-10">
        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="px-3 py-1 rounded-full bg-white/90 border border-zinc-200 shadow-sm text-xs font-mono font-semibold text-zinc-800 backdrop-blur-md">
            World Historical Geopolitical Map
          </span>
          <span className="text-[11px] font-mono text-zinc-500 bg-white/80 px-2 py-0.5 rounded border border-zinc-200">
            Sovereign Borders Active
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Layer switcher */}
          <div className="flex items-center p-1 rounded-xl bg-white/90 border border-zinc-200 text-xs font-mono shadow-sm backdrop-blur-md">
            <button
              onClick={() => setActiveLayer('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${activeLayer === 'all' ? 'bg-zinc-900 text-white font-bold' : 'text-zinc-600 hover:text-zinc-900'}`}
            >
              All Events
            </button>
            <button
              onClick={() => setActiveLayer('disputes')}
              className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${activeLayer === 'disputes' ? 'bg-red-600 text-white font-bold' : 'text-zinc-600 hover:text-zinc-900'}`}
            >
              <Flame className="w-3.5 h-3.5 text-red-400" />
              Disputes (War Arcs)
            </button>
            <button
              onClick={() => setActiveLayer('alliances')}
              className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${activeLayer === 'alliances' ? 'bg-indigo-600 text-white font-bold' : 'text-zinc-600 hover:text-zinc-900'}`}
            >
              <Shield className="w-3.5 h-3.5 text-indigo-300" />
              Alliances
            </button>
          </div>

          <button
            onClick={() => setIsPlaying(prev => !prev)}
            className="p-2 rounded-xl bg-white/90 hover:bg-zinc-100 border border-zinc-200 text-zinc-800 shadow-sm transition-colors"
            title={isPlaying ? 'Pause Timeline' : 'Resume Timeline'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
        </div>
      </div>

      {/* Bottom Timeline Scrubber */}
      <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 border border-zinc-200/90 shadow-md backdrop-blur-md z-10 space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xl sm:text-2xl font-bold text-zinc-900">
              {selectedYear}
            </span>
            <span className="text-xs text-zinc-600 font-sans">
              {getEraNote(selectedYear)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
            <Compass className="w-3.5 h-3.5 text-indigo-600" />
            <span>Drag globe to inspect continents · Red = Militarized Dispute · Indigo = Treaty</span>
          </div>
        </div>

        {/* Year Slider */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-zinc-400 font-medium">1816</span>
          <input
            type="range"
            min="1816"
            max="2024"
            step="1"
            value={selectedYear}
            onChange={e => setSelectedYear(parseInt(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer h-2 bg-zinc-200 rounded-lg"
          />
          <span className="font-mono text-xs text-zinc-400 font-medium">2024</span>
        </div>
      </div>
    </div>
  );
}

function updateArcs(group: THREE.Group, year: number, layer: string, radius: number) {
  while (group.children.length > 0) {
    const obj = group.children[0];
    group.remove(obj);
  }

  const historicalEvents: {
    from: string;
    to: string;
    type: 'dispute' | 'alliance';
    name: string;
    start: number;
    end: number;
  }[] = [
    { from: 'London', to: 'Paris', type: 'alliance', name: 'Entente Cordiale', start: 1904, end: 1918 },
    { from: 'Berlin', to: 'Paris', type: 'dispute', name: 'Franco-Prussian War', start: 1870, end: 1871 },
    { from: 'Berlin', to: 'London', type: 'dispute', name: 'World War I', start: 1914, end: 1918 },
    { from: 'Berlin', to: 'Moscow', type: 'alliance', name: 'Molotov-Ribbentrop Pact', start: 1939, end: 1941 },
    { from: 'Berlin', to: 'Moscow', type: 'dispute', name: 'WWII Eastern Front', start: 1941, end: 1945 },
    { from: 'Washington, D.C.', to: 'London', type: 'alliance', name: 'NATO Collective Defense', start: 1949, end: 2026 },
    { from: 'Washington, D.C.', to: 'Paris', type: 'alliance', name: 'NATO Art. 5', start: 1949, end: 2026 },
    { from: 'Washington, D.C.', to: 'Berlin', type: 'alliance', name: 'West German NATO Entry', start: 1955, end: 2026 },
    { from: 'Moscow', to: 'Warsaw', type: 'alliance', name: 'Warsaw Pact', start: 1955, end: 1991 },
    { from: 'Moscow', to: 'Berlin', type: 'alliance', name: 'East German Soviet Pact', start: 1955, end: 1990 },
    { from: 'Washington, D.C.', to: 'Havana', type: 'dispute', name: 'Cuban Missile Crisis', start: 1961, end: 1965 },
    { from: 'Moscow', to: 'Havana', type: 'alliance', name: 'Soviet Nuclear Deployment', start: 1960, end: 1990 },
    { from: 'Washington, D.C.', to: 'Seoul', type: 'alliance', name: 'US-ROK Mutual Defense', start: 1953, end: 2026 },
    { from: 'New Delhi', to: 'Beijing', type: 'dispute', name: 'Sino-Indian War', start: 1962, end: 1965 },
    { from: 'Moscow', to: 'Kyiv', type: 'dispute', name: 'Russo-Ukrainian War', start: 2014, end: 2026 },
    { from: 'Washington, D.C.', to: 'Tokyo', type: 'alliance', name: 'US-Japan Security Treaty', start: 1951, end: 2026 }
  ];

  const cityMap = new Map<string, { lat: number; lng: number }>();
  CAPITALS.forEach(c => cityMap.set(c.name, { lat: c.lat, lng: c.lng }));

  historicalEvents.forEach(ev => {
    if (year < ev.start || year > ev.end) return;
    if (layer === 'disputes' && ev.type !== 'dispute') return;
    if (layer === 'alliances' && ev.type !== 'alliance') return;

    const c1 = cityMap.get(ev.from);
    const c2 = cityMap.get(ev.to);
    if (!c1 || !c2) return;

    const p1 = latLngToVector3(c1.lat, c1.lng, radius + 0.05);
    const p2 = latLngToVector3(c2.lat, c2.lng, radius + 0.05);

    const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
    const dist = p1.distanceTo(p2);
    mid.normalize().multiplyScalar(radius + 0.05 + Math.min(dist * 0.35, 2.2));

    const curve = new THREE.CatmullRomCurve3([p1, mid, p2]);
    const tubeGeom = new THREE.TubeGeometry(curve, 32, ev.type === 'dispute' ? 0.07 : 0.05, 8, false);

    const tubeMat = new THREE.MeshStandardMaterial({
      color: ev.type === 'dispute' ? 0xdc2626 : 0x4f46e5, // Terracotta crimson dispute or indigo alliance
      roughness: 0.3
    });

    const tube = new THREE.Mesh(tubeGeom, tubeMat);
    group.add(tube);
  });
}

function getEraNote(y: number): string {
  if (y < 1850) return 'Concert of Europe & Post-Napoleonic Stability (Pax Britannica)';
  if (y < 1871) return 'Crimean War & Wars of German/Italian Unification';
  if (y < 1914) return 'Bismarckian Alliance System, Imperial Expansion & Scramble for Africa';
  if (y <= 1918) return 'World War I: Total Mobilization & Collapse of 4 Empires';
  if (y < 1939) return 'Interwar Crises, League of Nations & Rise of Totalitarianism';
  if (y <= 1945) return 'World War II: Global Total War & Dawn of the Nuclear Era';
  if (y < 1962) return 'Early Cold War: NATO & Warsaw Pact Formation, Korean War';
  if (y <= 1965) return 'Cuban Missile Crisis Zenith & Nuclear Brinkmanship';
  if (y < 1980) return 'Superpower Détente, Vietnam War, and SALT';
  if (y < 1991) return 'Second Cold War (Reagan-Gorbachev) & Fall of the Berlin Wall';
  if (y < 2001) return 'Post-Cold War "Unipolar Moment" & Gulf War Multilateralism';
  if (y < 2014) return 'Post-9/11 Global War on Terror & Rise of China';
  return 'Renewed Great Power Strategic Rivalry & European Continental Conflict';
}
