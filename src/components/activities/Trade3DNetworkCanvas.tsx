import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Trade3DNetworkCanvasProps {
  sanctionIntensity: number; // 0 to 100
  chokepointControl: number; // 10 to 100
  targetDiversification: number; // 0 to 100
  applySecondarySanctions: boolean;
}

export function Trade3DNetworkCanvas({
  sanctionIntensity,
  chokepointControl,
  targetDiversification,
  applySecondarySanctions,
}: Trade3DNetworkCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 1. Sender Hub Node (Left)
    const senderGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const senderMat = new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true });
    const senderMesh = new THREE.Mesh(senderGeo, senderMat);
    senderMesh.position.set(-4.5, 0, 0);
    group.add(senderMesh);

    // 2. Chokepoint Gate / Ring (Center)
    const ringRadius = 1.0 + (chokepointControl / 100) * 0.8;
    const chokepointGeo = new THREE.TorusGeometry(ringRadius, 0.12, 16, 48);
    const blockColor = sanctionIntensity > 70 ? 0xf43f5e : sanctionIntensity > 30 ? 0xf59e0b : 0x10b981;
    const chokepointMat = new THREE.MeshBasicMaterial({ color: blockColor, wireframe: true });
    const chokepointMesh = new THREE.Mesh(chokepointGeo, chokepointMat);
    chokepointMesh.rotation.y = Math.PI / 2;
    group.add(chokepointMesh);

    // Secondary Sanctions Shield Layer
    if (applySecondarySanctions) {
      const shieldGeo = new THREE.TorusGeometry(ringRadius * 1.3, 0.06, 12, 36);
      const shieldMat = new THREE.MeshBasicMaterial({ color: 0xe11d48, wireframe: true });
      const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
      shieldMesh.rotation.y = Math.PI / 2;
      group.add(shieldMesh);
    }

    // 3. Target State Node (Right)
    const targetColor = targetDiversification > 50 ? 0x34d399 : 0xf43f5e;
    const targetGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const targetMat = new THREE.MeshBasicMaterial({ color: targetColor, wireframe: true });
    const targetMesh = new THREE.Mesh(targetGeo, targetMat);
    targetMesh.position.set(4.5, 0, 0);
    group.add(targetMesh);

    // 4. Data Flow Arc Lines & Particles
    const particleCount = 60;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleProgress: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      particleProgress.push(Math.random());
      particlePositions[i * 3] = -4.5 + particleProgress[i] * 9;
      particlePositions[i * 3 + 1] = Math.sin(particleProgress[i] * Math.PI) * 1.5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
    }

    const flowGeo = new THREE.BufferGeometry();
    flowGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const flowMat = new THREE.PointsMaterial({
      color: 0x818cf8,
      size: 0.15,
      transparent: true,
      opacity: 0.8,
    });
    const flowPoints = new THREE.Points(flowGeo, flowMat);
    group.add(flowPoints);

    // Drag rotate
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
      group.rotation.x += dy * 0.005;
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
        senderMesh.rotation.x += 0.01;
        targetMesh.rotation.y += 0.01;
        chokepointMesh.rotation.z += 0.008;
      }

      // Animate Particles along the flow path
      const positions = flowGeo.attributes.position.array as Float32Array;
      const passRate = 1 - (sanctionIntensity / 100) * (chokepointControl / 100);

      for (let i = 0; i < particleCount; i++) {
        particleProgress[i] += 0.006;
        if (particleProgress[i] > 1) {
          particleProgress[i] = 0;
        }

        // If blocked near center (x ≈ 0)
        if (particleProgress[i] > 0.45 && particleProgress[i] < 0.55 && Math.random() > passRate) {
          // Blocked particle bounce back
          particleProgress[i] = 0;
        }

        positions[i * 3] = -4.5 + particleProgress[i] * 9;
        positions[i * 3 + 1] = Math.sin(particleProgress[i] * Math.PI) * 1.5;
      }
      flowGeo.attributes.position.needsUpdate = true;

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
  }, [sanctionIntensity, chokepointControl, targetDiversification, applySecondarySanctions]);

  return (
    <div className="relative w-full h-[220px] bg-slate-950 rounded-2xl overflow-hidden border border-indigo-900/50 cursor-grab active:cursor-grabbing">
      <div ref={mountRef} className="w-full h-full" title="Drag to rotate 3D Network Chokepoint model" />
      <div className="absolute top-3 left-4 text-[11px] font-bold text-indigo-300 uppercase tracking-wider bg-slate-900/80 px-2.5 py-1 rounded-md border border-indigo-800/40 backdrop-blur-sm">
        3D Real-Time Flow & Chokepoint Simulation
      </div>
    </div>
  );
}
