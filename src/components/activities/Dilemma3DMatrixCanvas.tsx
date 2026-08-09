import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Dilemma3DMatrixCanvasProps {
  playerMove?: 'cooperate' | 'defect' | null;
  opponentMove?: 'cooperate' | 'defect' | null;
  roundScore?: { player: number; opponent: number } | null;
}

export function Dilemma3DMatrixCanvas({
  playerMove,
  opponentMove,
}: Dilemma3DMatrixCanvasProps) {
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

    // State A (Player) Node - Left
    const pColor = playerMove === 'cooperate' ? 0x10b981 : playerMove === 'defect' ? 0xf43f5e : 0x6366f1;
    const playerGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const playerMat = new THREE.MeshBasicMaterial({ color: pColor, wireframe: true });
    const playerMesh = new THREE.Mesh(playerGeo, playerMat);
    playerMesh.position.set(-3.5, 0, 0);
    group.add(playerMesh);

    // State B (Opponent) Node - Right
    const oColor = opponentMove === 'cooperate' ? 0x10b981 : opponentMove === 'defect' ? 0xf43f5e : 0xec4899;
    const oppGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const oppMat = new THREE.MeshBasicMaterial({ color: oColor, wireframe: true });
    const oppMesh = new THREE.Mesh(oppGeo, oppMat);
    oppMesh.position.set(3.5, 0, 0);
    group.add(oppMesh);

    // Central Strategic Interaction Matrix Cube
    const cubeGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
    const cubeColor =
      playerMove && opponentMove
        ? playerMove === 'cooperate' && opponentMove === 'cooperate'
          ? 0x10b981 // Mutual cooperation
          : playerMove === 'defect' && opponentMove === 'defect'
          ? 0xf43f5e // Mutual defection
          : 0xf59e0b // Asymmetric
        : 0x38bdf8;
    const cubeMat = new THREE.MeshBasicMaterial({ color: cubeColor, wireframe: true });
    const cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
    group.add(cubeMesh);

    // Connecting Beams
    const beamGeo = new THREE.CylinderGeometry(0.08, 0.08, 7, 12);
    const beamMat = new THREE.MeshBasicMaterial({ color: cubeColor, wireframe: true });
    const beamMesh = new THREE.Mesh(beamGeo, beamMat);
    beamMesh.rotation.z = Math.PI / 2;
    group.add(beamMesh);

    // Drag Rotate
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
        group.rotation.y += 0.003;
        playerMesh.rotation.x += 0.01;
        oppMesh.rotation.y += 0.01;
        cubeMesh.rotation.x += 0.01;
        cubeMesh.rotation.z += 0.01;
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
  }, [playerMove, opponentMove]);

  return (
    <div className="relative w-full h-[180px] bg-slate-950 rounded-2xl overflow-hidden border border-indigo-900/50 cursor-grab active:cursor-grabbing">
      <div ref={mountRef} className="w-full h-full" title="Drag to rotate 3D Strategic Decision Space" />
      <div className="absolute top-3 left-4 text-[11px] font-bold text-indigo-300 uppercase tracking-wider bg-slate-900/80 px-2.5 py-1 rounded-md border border-indigo-800/40 backdrop-blur-sm flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-indigo-400" />
        3D Payoff Matrix & Strategy Node
      </div>
    </div>
  );
}
