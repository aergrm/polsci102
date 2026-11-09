import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Globe, Compass, Shield, Database, BookOpen, Layers } from 'lucide-react';
import bordersData from '../data/worldBordersClean.json';

interface Hero3DCanvasProps {
  institution: string;
  department: string;
  courseCode: string;
  title: string;
  format: string;
}

// Strategic IR capitals & diplomatic nodes
const STRATEGIC_NODES = [
  { name: 'Washington, D.C.', lat: 38.9, lng: -77.0, code: 'USA' },
  { name: 'London', lat: 51.5, lng: -0.1, code: 'GBR' },
  { name: 'Paris', lat: 48.8, lng: 2.3, code: 'FRN' },
  { name: 'Berlin', lat: 52.5, lng: 13.4, code: 'GMY' },
  { name: 'Moscow', lat: 55.7, lng: 37.6, code: 'RUS' },
  { name: 'Beijing', lat: 39.9, lng: 116.4, code: 'CHN' },
  { name: 'Tokyo', lat: 35.6, lng: 139.6, code: 'JPN' },
  { name: 'New Delhi', lat: 28.6, lng: 77.2, code: 'IND' },
  { name: 'Geneva', lat: 46.2, lng: 6.1, code: 'SWZ' },
  { name: 'Cairo', lat: 30.0, lng: 31.2, code: 'EGY' },
  { name: 'Brasília', lat: -15.8, lng: -47.9, code: 'BRA' },
  { name: 'Singapore', lat: 1.3, lng: 103.8, code: 'SIN' },
];

// Great circle connections representing canonical treaties and trade lines
const HISTORIC_ARCS = [
  { from: 'Washington, D.C.', to: 'London', color: 0x4f46e5 },    // Transatlantic Alliance
  { from: 'London', to: 'Paris', color: 0x4f46e5 },              // Entente Cordiale
  { from: 'Paris', to: 'Berlin', color: 0x4f46e5 },              // European Integration
  { from: 'Washington, D.C.', to: 'Tokyo', color: 0x0284c7 },    // US-Japan Security
  { from: 'Beijing', to: 'Moscow', color: 0xb45309 },            // Sino-Soviet / Strategic
  { from: 'London', to: 'New Delhi', color: 0x059669 },          // Maritime Trade Route
  { from: 'Geneva', to: 'Washington, D.C.', color: 0x7c3aed },   // League / UN System
  { from: 'Tokyo', to: 'Singapore', color: 0x0284c7 },           // East Asian Trade
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export function Hero3DCanvas({
  institution,
  department,
  courseCode,
  title,
  format,
}: Hero3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string>('Geneva');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const isRotatingRef = useRef(isRotating);
  isRotatingRef.current = isRotating;

  const headerLabel = [institution, department].filter(Boolean).join(' • ');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene with warm parchment backdrop
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfcfbf8); // Clean warm archival ivory

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    // Position camera to view globe cleanly on the right half
    camera.position.set(width > 768 ? 3.5 : 0, 1.2, 16.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Warm natural museum lighting
    const ambientLight = new THREE.AmbientLight(0xfffdf7, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffedd5, 1.5);
    keyLight.position.set(10, 15, 15);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0e7ff, 0.7);
    fillLight.position.set(-15, -10, -5);
    scene.add(fillLight);

    // Globe group
    const globeGroup = new THREE.Group();
    // Offset slightly right on desktop so text has clear negative space
    if (width > 768) {
      globeGroup.position.set(4.5, -0.2, 0);
    } else {
      globeGroup.position.set(0, -1.5, 0);
    }
    scene.add(globeGroup);

    // 1. Globe Base Sphere (Warm parchment finish)
    const earthRadius = 5.2;
    const earthGeom = new THREE.SphereGeometry(earthRadius, 64, 48);
    const earthMat = new THREE.MeshStandardMaterial({
      color: 0xeeebe3, // Archival warm paper tone
      roughness: 0.85,
      metalness: 0.05,
    });
    const earthMesh = new THREE.Mesh(earthGeom, earthMat);
    globeGroup.add(earthMesh);

    // Graticule / Latitude parallels
    const graticuleGroup = new THREE.Group();
    const graticuleMat = new THREE.LineBasicMaterial({
      color: 0x94a3b8,
      linewidth: 1,
      transparent: true,
      opacity: 0.2,
    });
    [-60, -30, 0, 30, 60].forEach(lat => {
      const phi = (90 - lat) * (Math.PI / 180);
      const r = earthRadius * 1.001 * Math.sin(phi);
      const y = earthRadius * 1.001 * Math.cos(phi);
      const circleGeo = new THREE.BufferGeometry();
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 64; i++) {
        const theta = (i / 64) * Math.PI * 2;
        pts.push(new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta)));
      }
      circleGeo.setFromPoints(pts);
      graticuleGroup.add(new THREE.Line(circleGeo, graticuleMat));
    });
    globeGroup.add(graticuleGroup);

    // 2. Sovereign Country Borders in Crisp Charcoal Ink (from worldBordersClean.json)
    const bordersGroup = new THREE.Group();
    const bordersMat = new THREE.LineBasicMaterial({
      color: 0x334155, // Charcoal slate ink
      linewidth: 1.2,
      transparent: true,
      opacity: 0.85,
    });

    (bordersData as number[][][]).forEach(feature => {
      feature.forEach(ring => {
        if (!ring || ring.length < 2) return;
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i < ring.length; i += 2) {
          const lng = ring[i];
          const lat = ring[i + 1];
          if (typeof lng === 'number' && typeof lat === 'number') {
            pts.push(latLngToVector3(lat, lng, earthRadius * 1.003));
          }
        }
        if (pts.length > 1) {
          const geom = new THREE.BufferGeometry().setFromPoints(pts);
          const line = new THREE.Line(geom, bordersMat);
          bordersGroup.add(line);
        }
      });
    });
    globeGroup.add(bordersGroup);

    // 3. Strategic Capitals & Nodes
    const nodeMap = new Map<string, THREE.Vector3>();
    const nodesGroup = new THREE.Group();

    STRATEGIC_NODES.forEach(node => {
      const pos = latLngToVector3(node.lat, node.lng, earthRadius * 1.01);
      nodeMap.set(node.name, pos);

      // Node dot
      const dotGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xd97706 }); // Amber-600 ink
      const dotMesh = new THREE.Mesh(dotGeo, dotMat);
      dotMesh.position.copy(pos);
      nodesGroup.add(dotMesh);

      // Outer ring
      const ringGeo = new THREE.RingGeometry(0.16, 0.24, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x78716c,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos);
      ringMesh.lookAt(globeGroup.position);
      nodesGroup.add(ringMesh);
    });
    globeGroup.add(nodesGroup);

    // 4. Great Circle Treaties & Alliances Arcs
    const arcsGroup = new THREE.Group();
    HISTORIC_ARCS.forEach(arc => {
      const vFrom = nodeMap.get(arc.from);
      const vTo = nodeMap.get(arc.to);
      if (!vFrom || !vTo) return;

      const mid = new THREE.Vector3().addVectors(vFrom, vTo).multiplyScalar(0.5);
      const distance = vFrom.distanceTo(vTo);
      // Lift midpoint outward for 3D curved trajectory
      mid.normalize().multiplyScalar(earthRadius + Math.min(distance * 0.28, 1.8));

      const curve = new THREE.QuadraticBezierCurve3(vFrom, mid, vTo);
      const points = curve.getPoints(40);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: arc.color,
        linewidth: 1.5,
        transparent: true,
        opacity: 0.7,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      arcsGroup.add(arcLine);
    });
    globeGroup.add(arcsGroup);

    // Initial rotation tilt for classic cartographic projection
    globeGroup.rotation.x = 0.25;
    globeGroup.rotation.y = 1.1;

    // Mouse / Touch Dragging Controls
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      globeGroup.rotation.y += dx * 0.005;
      globeGroup.rotation.x += dy * 0.005;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevMouse.x;
      const dy = e.touches[0].clientY - prevMouse.y;
      globeGroup.rotation.y += dx * 0.005;
      globeGroup.rotation.x += dy * 0.005;
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('touchstart', onTouchStart);
    container.addEventListener('touchmove', onTouchMove);
    container.addEventListener('touchend', onTouchEnd);

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          if (newW > 768) {
            camera.position.set(3.5, 1.2, 16.5);
            globeGroup.position.set(4.5, -0.2, 0);
          } else {
            camera.position.set(0, 1.2, 16.5);
            globeGroup.position.set(0, -1.2, 0);
          }
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging && isRotatingRef.current) {
        globeGroup.rotation.y += 0.0018;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative bg-[#fcfbf8] rounded-2xl border border-stone-300/80 shadow-xs overflow-hidden min-h-[380px] md:min-h-[440px] flex items-center">
      {/* 3D WebGL Canvas Layer (Parchment Globe with Real Borders) */}
      <div
        ref={mountRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing z-0"
        title="Interactive Geopolitical Globe: Drag to rotate sovereign borders & alliance arcs"
      />

      {/* Parchment subtle gradient to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#fcfbf8] via-[#fcfbf8]/85 to-transparent pointer-events-none z-10 w-full md:w-3/5" />

      {/* Foreground Content */}
      <div className="relative z-20 px-6 sm:px-8 md:px-12 py-8 max-w-2xl space-y-4">
        {headerLabel && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-800 border border-stone-200 shadow-2xs font-mono">
              <Compass className="w-3.5 h-3.5 text-stone-600" />
              {headerLabel}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-amber-50 text-amber-800 border border-amber-200">
              Spring 2027 · {format}
            </span>
          </div>
        )}

        <div className="space-y-1.5">
          <div className="font-mono text-xs font-bold text-indigo-700 tracking-wider uppercase">
            {courseCode} · Core Seminar
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-tight">
            {title}
          </h1>
        </div>

        <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
          An empirical and theoretical investigation into conflict, alliance formation, power transitions, and economic interdependence across modern sovereign states.
        </p>

        {/* Sovereign Borders & Interactive Map Guide Note */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-600 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-stone-200 shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-stone-500" />
            <span>Sovereign Borders (Charcoal Ink)</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-stone-600 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-stone-200 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
            <span>Diplomatic Nodes</span>
          </div>

          <button
            onClick={() => setIsRotating(!isRotating)}
            className="text-xs font-mono px-3 py-1.5 rounded-lg bg-stone-200/80 hover:bg-stone-300/80 text-stone-800 border border-stone-300 transition-colors cursor-pointer"
          >
            {isRotating ? 'Pause Rotation' : 'Resume Rotation'}
          </button>
        </div>
      </div>
    </div>
  );
}
