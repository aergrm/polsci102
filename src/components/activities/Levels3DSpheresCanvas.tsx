import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Levels3DSpheresCanvasProps {
  selectedLevel?: 'Systemic' | 'Domestic' | 'Individual' | null;
}

export function Levels3DSpheresCanvas({ selectedLevel }: Levels3DSpheresCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 1. Outer Shell: Systemic / Anarchy Level
    const sysOpacity = !selectedLevel || selectedLevel === 'Systemic' ? 0.6 : 0.15;
    const sysColor = selectedLevel === 'Systemic' ? 0x818cf8 : 0x475569;
    const sysGeo = new THREE.IcosahedronGeometry(3.6, 2);
    const sysMat = new THREE.MeshBasicMaterial({ color: sysColor, wireframe: true, transparent: true, opacity: sysOpacity });
    const sysMesh = new THREE.Mesh(sysGeo, sysMat);
    group.add(sysMesh);

    // 2. Middle Shell: Domestic / Regime Level
    const domOpacity = !selectedLevel || selectedLevel === 'Domestic' ? 0.7 : 0.15;
    const domColor = selectedLevel === 'Domestic' ? 0x34d399 : 0x475569;
    const domGeo = new THREE.IcosahedronGeometry(2.4, 2);
    const domMat = new THREE.MeshBasicMaterial({ color: domColor, wireframe: true, transparent: true, opacity: domOpacity });
    const domMesh = new THREE.Mesh(domGeo, domMat);
    group.add(domMesh);

    // 3. Core Sphere: Individual / Leader Level
    const indOpacity = !selectedLevel || selectedLevel === 'Individual' ? 0.9 : 0.2;
    const indColor = selectedLevel === 'Individual' ? 0xfbbf24 : 0x475569;
    const indGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const indMat = new THREE.MeshBasicMaterial({ color: indColor, wireframe: true, transparent: true, opacity: indOpacity });
    const indMesh = new THREE.Mesh(indGeo, indMat);
    group.add(indMesh);

    // Orbiting particles
    const particleCount = 80;
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 12;
      pos[i + 1] = (Math.random() - 0.5) * 8;
      pos[i + 2] = (Math.random() - 0.5) * 8;
    }
    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const partMat = new THREE.PointsMaterial({ color: 0xc7d2fe, size: 0.08, transparent: true, opacity: 0.4 });
    const parts = new THREE.Points(partGeo, partMat);
    group.add(parts);

    // Drag
    let isDragging = false;
    let prev = { x: 0, y: 0 };
    const onDown = (e: MouseEvent) => {
      isDragging = true;
      prev = { x: e.clientX, y: e.clientY };
    };
    const onMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      group.rotation.y += dx * 0.005;
      group.rotation.x += dy * 0.003;
      prev = { x: e.clientX, y: e.clientY };
    };
    const onUp = () => { isDragging = false; };

    container.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    // Resize
    const resizeObs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObs.observe(container);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isDragging) {
        sysMesh.rotation.y += 0.002;
        domMesh.rotation.y -= 0.004;
        indMesh.rotation.x += 0.006;
        parts.rotation.y += 0.001;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObs.disconnect();
      container.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [selectedLevel]);

  return (
    <div className="relative w-full h-[180px] bg-slate-950 rounded-2xl overflow-hidden border border-indigo-900/50 cursor-grab active:cursor-grabbing">
      <div ref={mountRef} className="w-full h-full" title="Drag to rotate 3D Concentric Levels of Analysis" />
      <div className="absolute top-3 left-4 text-[11px] font-bold text-emerald-300 uppercase tracking-wider bg-slate-900/80 px-2.5 py-1 rounded-md border border-emerald-800/40 backdrop-blur-sm flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        3D Concentric Levels Model (Systemic • Domestic • Individual)
      </div>
    </div>
  );
}
