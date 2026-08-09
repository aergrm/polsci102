import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Fearon3DBargainingCanvasProps {
  alphaWarPayoff: number; // e.g. 45
  maxAlphaProposalBetaAccepts: number; // e.g. 75
  proposalAlpha: number; // e.g. 55
  isAccepted: boolean;
}

export function Fearon3DBargainingCanvas({
  alphaWarPayoff,
  maxAlphaProposalBetaAccepts,
  proposalAlpha,
  isAccepted,
}: Fearon3DBargainingCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3, 11);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 1. Continuum Bar (x from -5 to +5 represents 0% to 100%)
    const barGeo = new THREE.BoxGeometry(10, 0.2, 0.4);
    const barMat = new THREE.MeshBasicMaterial({ color: 0x475569, wireframe: true });
    const barMesh = new THREE.Mesh(barGeo, barMat);
    group.add(barMesh);

    // Helper: convert 0..100 value to X position (-5..5)
    const toX = (val: number) => -5 + (val / 100) * 10;

    // 2. Bargaining Zone (Green box if accepted, Red if war)
    const rangeMinX = toX(Math.max(0, alphaWarPayoff));
    const rangeMaxX = toX(Math.min(100, maxAlphaProposalBetaAccepts));
    const rangeWidth = Math.max(0.2, rangeMaxX - rangeMinX);
    const rangeCenterX = (rangeMinX + rangeMaxX) / 2;

    const rangeGeo = new THREE.BoxGeometry(rangeWidth, 0.4, 0.6);
    const rangeMat = new THREE.MeshBasicMaterial({
      color: 0x10b981, // Emerald green
      transparent: true,
      opacity: 0.6,
      wireframe: true,
    });
    const rangeMesh = new THREE.Mesh(rangeGeo, rangeMat);
    rangeMesh.position.set(rangeCenterX, 0, 0);
    group.add(rangeMesh);

    // 3. Proposal Marker Orb
    const propX = toX(proposalAlpha);
    const propGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const propMat = new THREE.MeshBasicMaterial({
      color: isAccepted ? 0x38bdf8 : 0xf43f5e,
      wireframe: true,
    });
    const propMesh = new THREE.Mesh(propGeo, propMat);
    propMesh.position.set(propX, 0.6, 0);
    group.add(propMesh);

    // State Alpha & Beta Pillars at Ends
    const pillar1Geo = new THREE.CylinderGeometry(0.5, 0.6, 2.5, 12);
    const pillar1Mat = new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true });
    const pillar1 = new THREE.Mesh(pillar1Geo, pillar1Mat);
    pillar1.position.set(-5.5, 0, 0);
    group.add(pillar1);

    const pillar2Geo = new THREE.CylinderGeometry(0.5, 0.6, 2.5, 12);
    const pillar2Mat = new THREE.MeshBasicMaterial({ color: 0xf43f5e, wireframe: true });
    const pillar2 = new THREE.Mesh(pillar2Geo, pillar2Mat);
    pillar2.position.set(5.5, 0, 0);
    group.add(pillar2);

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
        group.rotation.y += 0.002;
        propMesh.rotation.y += 0.02;
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
  }, [alphaWarPayoff, maxAlphaProposalBetaAccepts, proposalAlpha, isAccepted]);

  return (
    <div className="relative w-full h-[180px] bg-slate-950 rounded-2xl overflow-hidden border border-indigo-900/50 cursor-grab active:cursor-grabbing">
      <div ref={mountRef} className="w-full h-full" title="Drag to rotate 3D Fearon Bargaining Space model" />
      <div className="absolute top-3 left-4 text-[11px] font-bold text-indigo-300 uppercase tracking-wider bg-slate-900/80 px-2.5 py-1 rounded-md border border-indigo-800/40 backdrop-blur-sm flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${isAccepted ? 'bg-emerald-400' : 'bg-rose-500'}`} />
        3D Fearon Bargaining Range & Issue Continuum
      </div>
    </div>
  );
}
