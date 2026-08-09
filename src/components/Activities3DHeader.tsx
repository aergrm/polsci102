import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Activities3DHeaderProps {
  activeTab: string;
}

export function Activities3DHeader({ activeTab }: Activities3DHeaderProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Parent group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Create central theme meshes based on active tab
    const subGroups: Record<string, THREE.Group> = {};

    // 1. Bargaining Group (Pillars & Scale)
    const bargainingGroup = new THREE.Group();
    const pillar1Geo = new THREE.CylinderGeometry(0.6, 0.8, 3.5, 16);
    const pillar2Geo = new THREE.CylinderGeometry(0.6, 0.8, 3.5, 16);
    const mat1 = new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true });
    const mat2 = new THREE.MeshBasicMaterial({ color: 0xf43f5e, wireframe: true });
    
    const p1 = new THREE.Mesh(pillar1Geo, mat1);
    p1.position.set(-2.5, 0, 0);
    const p2 = new THREE.Mesh(pillar2Geo, mat2);
    p2.position.set(2.5, 0, 0);

    const beamGeo = new THREE.BoxGeometry(5.5, 0.15, 0.15);
    const beamMat = new THREE.MeshBasicMaterial({ color: 0x818cf8, wireframe: true });
    const beam = new THREE.Mesh(beamGeo, beamMat);

    bargainingGroup.add(p1, p2, beam);
    subGroups['bargaining'] = bargainingGroup;

    // 2. Security Dilemma Group (Shield & Radar)
    const dilemmaGroup = new THREE.Group();
    const ring1Geo = new THREE.TorusGeometry(3, 0.08, 16, 64);
    const ring2Geo = new THREE.TorusGeometry(2, 0.08, 16, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xf43f5e, wireframe: true });
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
    const r1 = new THREE.Mesh(ring1Geo, ringMat1);
    const r2 = new THREE.Mesh(ring2Geo, ringMat2);
    r1.rotation.x = Math.PI / 3;
    r2.rotation.y = Math.PI / 4;
    dilemmaGroup.add(r1, r2);
    subGroups['dilemma'] = dilemmaGroup;

    // 3. UNSC Chamber Group (Semicircle / Dome)
    const unscGroup = new THREE.Group();
    const domeGeo = new THREE.IcosahedronGeometry(3, 2);
    const domeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.25 });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    unscGroup.add(dome);
    subGroups['unsc'] = unscGroup;

    // 4. Trade Sanctions Group (Network Globe)
    const tradeGroup = new THREE.Group();
    const globeGeo = new THREE.SphereGeometry(2.8, 20, 20);
    const globeMat = new THREE.MeshBasicMaterial({ color: 0x34d399, wireframe: true, transparent: true, opacity: 0.3 });
    const tradeGlobe = new THREE.Mesh(globeGeo, globeMat);
    tradeGroup.add(tradeGlobe);
    subGroups['trade'] = tradeGroup;

    // 5. Levels of Analysis Group (3 Concentric Layers)
    const levelsGroup = new THREE.Group();
    [1.5, 2.6, 3.8].forEach((r, idx) => {
      const geo = new THREE.TorusGeometry(r, 0.05, 12, 48);
      const mat = new THREE.MeshBasicMaterial({
        color: idx === 0 ? 0x818cf8 : idx === 1 ? 0x34d399 : 0xfbbf24,
        wireframe: true,
      });
      const ring = new THREE.Mesh(geo, mat);
      ring.rotation.x = Math.PI / 2.5 + idx * 0.2;
      levelsGroup.add(ring);
    });
    subGroups['levels'] = levelsGroup;

    // Default Fallback Crystal Geometry for theory/flashcards/quizzes
    const crystalGroup = new THREE.Group();
    const crystalGeo = new THREE.OctahedronGeometry(2.5, 1);
    const crystalMat = new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    crystalGroup.add(crystal);
    subGroups['theory'] = crystalGroup;
    subGroups['flashcards'] = crystalGroup;
    subGroups['quizzes'] = crystalGroup;

    // Add all sub groups, hide non-active ones
    Object.entries(subGroups).forEach(([key, group]) => {
      group.visible = key === activeTab || (key === 'theory' && !['bargaining','dilemma','unsc','trade','levels'].includes(activeTab));
      mainGroup.add(group);
    });

    // Ambient Floating Particles
    const particleCount = 200;
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 30;
      pos[i + 1] = (Math.random() - 0.5) * 20;
      pos[i + 2] = (Math.random() - 0.5) * 20;
    }
    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const partMat = new THREE.PointsMaterial({
      color: 0xc7d2fe,
      size: 0.07,
      transparent: true,
      opacity: 0.5,
    });
    const particleSystem = new THREE.Points(partGeo, partMat);
    scene.add(particleSystem);

    // Mouse drag support
    let isDragging = false;
    let prevPos = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevPos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevPos.x;
      const dy = e.clientY - prevPos.y;
      mainGroup.rotation.y += dx * 0.005;
      mainGroup.rotation.x += dy * 0.005;
      prevPos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => { isDragging = false; };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
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
    resizeObserver.observe(container);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isDragging) {
        mainGroup.rotation.y += 0.003;
        mainGroup.rotation.x += 0.001;
        particleSystem.rotation.y += 0.0005;
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
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeTab]);

  return (
    <div className="absolute inset-0 z-0 opacity-40 hover:opacity-75 transition-opacity cursor-grab active:cursor-grabbing pointer-events-auto">
      <div ref={mountRef} className="w-full h-full" title="Interactive 3D simulation visualization" />
    </div>
  );
}
