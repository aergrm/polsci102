import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface P5Vote {
  country: string;
  flag: string;
  vote: string; // 'YES' | 'ABSTAIN' | 'VETO'
}

interface UNSC3DChamberCanvasProps {
  p5Stances: P5Vote[];
  isVetoed: boolean;
}

export function UNSC3DChamberCanvas({ p5Stances, isVetoed }: UNSC3DChamberCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 1. Horseshoe Table Geometry (Arc torus segment)
    const tableGeo = new THREE.TorusGeometry(3.5, 0.4, 16, 32, Math.PI * 1.3);
    const tableMat = new THREE.MeshBasicMaterial({ color: 0x334155, wireframe: true });
    const tableMesh = new THREE.Mesh(tableGeo, tableMat);
    tableMesh.rotation.x = Math.PI / 2;
    tableMesh.rotation.z = Math.PI * 0.35;
    group.add(tableMesh);

    // 2. UN Emblem Floating Ring at Center
    const emblemGeo = new THREE.RingGeometry(0.8, 1.2, 32);
    const emblemMat = new THREE.MeshBasicMaterial({
      color: isVetoed ? 0xf43f5e : 0x38bdf8,
      side: THREE.DoubleSide,
      wireframe: true,
    });
    const emblemMesh = new THREE.Mesh(emblemGeo, emblemMat);
    emblemMesh.rotation.x = Math.PI / 2;
    group.add(emblemMesh);

    // 3. 15 Council Member Seats around Horseshoe
    const totalSeats = 15;
    const seatMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < totalSeats; i++) {
      const angle = (i / (totalSeats - 1)) * Math.PI * 1.3 - Math.PI * 0.65;
      const x = Math.cos(angle) * 4.2;
      const z = Math.sin(angle) * 4.2;

      const isP5Index = i < p5Stances.length;
      let seatColor = 0x94a3b8; // Default E10 non-permanent member (Neutral Gray)

      if (isP5Index) {
        const stance = p5Stances[i];
        if (stance.vote === 'VETO') seatColor = 0xf43f5e; // Red
        else if (stance.vote === 'YES') seatColor = 0x10b981; // Green
        else seatColor = 0xf59e0b; // Amber
      }

      const seatGeo = new THREE.CylinderGeometry(0.25, 0.3, 0.4, 12);
      const seatMat = new THREE.MeshBasicMaterial({ color: seatColor, wireframe: true });
      const seatMesh = new THREE.Mesh(seatGeo, seatMat);
      seatMesh.position.set(x, 0.2, z);
      group.add(seatMesh);
      seatMeshes.push(seatMesh);
    }

    // Drag Controls
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
        emblemMesh.rotation.z += 0.01;
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
  }, [p5Stances, isVetoed]);

  return (
    <div className="relative w-full h-[200px] bg-slate-950 rounded-2xl overflow-hidden border border-indigo-900/50 cursor-grab active:cursor-grabbing">
      <div ref={mountRef} className="w-full h-full" title="Drag to rotate 3D UN Security Council Chamber" />
      <div className="absolute top-3 left-4 text-[11px] font-bold text-sky-300 uppercase tracking-wider bg-slate-900/80 px-2.5 py-1 rounded-md border border-sky-800/40 backdrop-blur-sm flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${isVetoed ? 'bg-rose-500 animate-ping' : 'bg-emerald-400'}`} />
        3D UN Security Council Chamber (15 Seats)
      </div>
    </div>
  );
}
