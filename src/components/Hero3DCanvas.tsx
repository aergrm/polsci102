import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Hero3DCanvasProps {
  institution: string;
  department: string;
  courseCode: string;
  title: string;
  format: string;
}

// Major IR Strategic Hubs (Lat, Lng, Name)
const GLOBAL_HUBS = [
  { name: 'Washington, D.C.', lat: 38.9, lng: -77.0, type: 'hegemon' },
  { name: 'Geneva / UN', lat: 46.2, lng: 6.1, type: 'institution' },
  { name: 'Brussels / EU & NATO', lat: 50.8, lng: 4.3, type: 'institution' },
  { name: 'Beijing', lat: 39.9, lng: 116.4, type: 'hegemon' },
  { name: 'Tokyo', lat: 35.6, lng: 139.6, type: 'trade' },
  { name: 'London', lat: 51.5, lng: -0.1, type: 'trade' },
  { name: 'New York / UN HQ', lat: 40.7, lng: -74.0, type: 'institution' },
  { name: 'Singapore', lat: 1.3, lng: 103.8, type: 'trade' },
  { name: 'Addis Ababa / AU', lat: 9.0, lng: 38.7, type: 'institution' },
  { name: 'Brasília', lat: -15.8, lng: -47.9, type: 'trade' },
  { name: 'Sydney', lat: -33.8, lng: 151.2, type: 'trade' },
  { name: 'New Delhi', lat: 28.6, lng: 77.2, type: 'trade' },
];

// Helper: Convert Lat/Lng to 3D Sphere Vector3
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
  const headerLabel = [institution, department].filter(Boolean).join(' • ');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Parent group for globe rotation
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Globe Base Sphere (Wireframe/Tech Grid)
    const radius = 5.8;
    const sphereGeo = new THREE.SphereGeometry(radius, 40, 40);
    
    // Transparent wireframe mesh
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1, // Indigo 500
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const wireframeMesh = new THREE.Mesh(sphereGeo, wireframeMat);
    globeGroup.add(wireframeMesh);

    // Dark core sphere to block rear lines
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x0f172a, // Slate 900
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.99, 36, 36), coreMat);
    globeGroup.add(coreMesh);

    // Atmosphere Glow
    const atmosphereGeo = new THREE.SphereGeometry(radius * 1.15, 32, 32);
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphereMesh);

    // 2. Dots Particle Cloud on Globe Surface
    const dotCount = 1200;
    const dotPositions: number[] = [];
    for (let i = 0; i < dotCount; i++) {
      // Golden spiral distribution
      const phi = Math.acos(-1 + (2 * i) / dotCount);
      const theta = Math.sqrt(dotCount * Math.PI) * phi;
      const p = new THREE.Vector3(
        radius * 1.01 * Math.cos(theta) * Math.sin(phi),
        radius * 1.01 * Math.sin(theta) * Math.sin(phi),
        radius * 1.01 * Math.cos(phi)
      );
      dotPositions.push(p.x, p.y, p.z);
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));
    const dotMat = new THREE.PointsMaterial({
      color: 0xa5b4fc,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
    });
    const dotPoints = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(dotPoints);

    // 3. Strategic Hub Markers
    const hubVectors: { name: string; vec: THREE.Vector3; type: string }[] = [];
    GLOBAL_HUBS.forEach((hub) => {
      const vec = latLngToVector3(hub.lat, hub.lng, radius * 1.02);
      hubVectors.push({ name: hub.name, vec, type: hub.type });

      // Glowing dot for hub
      const hubGeo = new THREE.SphereGeometry(0.12, 12, 12);
      const hubMat = new THREE.MeshBasicMaterial({
        color: hub.type === 'hegemon' ? 0xf43f5e : hub.type === 'institution' ? 0x38bdf8 : 0x34d399,
      });
      const hubMesh = new THREE.Mesh(hubGeo, hubMat);
      hubMesh.position.copy(vec);
      globeGroup.add(hubMesh);

      // Outer pulse ring
      const ringGeo = new THREE.RingGeometry(0.15, 0.22, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x818cf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(vec);
      ringMesh.lookAt(0, 0, 0);
      globeGroup.add(ringMesh);
    });

    // 4. Arc Lines connecting Hubs
    const linesGroup = new THREE.Group();
    globeGroup.add(linesGroup);

    function createArcs() {
      // Clear existing
      while (linesGroup.children.length > 0) {
        linesGroup.remove(linesGroup.children[0]);
      }

      for (let i = 0; i < hubVectors.length; i++) {
        for (let j = i + 1; j < hubVectors.length; j++) {
          const v1 = hubVectors[i].vec;
          const v2 = hubVectors[j].vec;
          const dist = v1.distanceTo(v2);

          // Connect if within reasonable range
          if (dist < 8.5) {
            // Midpoint elevated above sphere
            const mid = v1.clone().add(v2).multiplyScalar(0.5);
            const midLength = mid.length();
            mid.normalize().multiplyScalar(midLength + dist * 0.25);

            const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
            const points = curve.getPoints(32);
            const curveGeo = new THREE.BufferGeometry().setFromPoints(points);

            const lineMat = new THREE.LineBasicMaterial({
              color: 0x818cf8,
              transparent: true,
              opacity: 0.35,
            });
            const line = new THREE.Line(curveGeo, lineMat);
            linesGroup.add(line);
          }
        }
      }
    }

    createArcs();

    // 5. Space Constellation Background Particles
    const starCount = 300;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 60;
      starPositions[i + 1] = (Math.random() - 0.5) * 60;
      starPositions[i + 2] = (Math.random() - 0.5) * 40 - 10;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xc7d2fe,
      size: 0.08,
      transparent: true,
      opacity: 0.4,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Mouse Controls / Dragging
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      globeGroup.rotation.y += deltaMove.x * 0.005;
      globeGroup.rotation.x += deltaMove.y * 0.005;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch Support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaMove = {
        x: e.touches[0].clientX - previousMousePosition.x,
        y: e.touches[0].clientY - previousMousePosition.y,
      };
      globeGroup.rotation.y += deltaMove.x * 0.005;
      globeGroup.rotation.x += deltaMove.y * 0.005;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('touchstart', onTouchStart);
    container.addEventListener('touchmove', onTouchMove);
    container.addEventListener('touchend', onTouchEnd);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        globeGroup.rotation.y += 0.002;
        starField.rotation.y += 0.0003;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
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
    <div className="relative bg-slate-950 rounded-2xl border border-indigo-900/50 shadow-xl overflow-hidden py-6 md:py-8 flex flex-col justify-center">
      {/* 3D WebGL Canvas Layer */}
      <div
        ref={mountRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing z-0"
        title="Click & drag to rotate 3D Globe"
      />

      {/* Subtle Gradient Overlays for Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none z-10" />

      {/* Foreground Text & Information Header */}
      <div className="relative z-20 px-6 md:px-10 py-2 max-w-3xl space-y-2">
        {headerLabel && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-indigo-500/20 backdrop-blur-md text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-500/30">
              {headerLabel}
            </span>
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
          {courseCode}: <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-white to-sky-300">{title}</span>
        </h1>

        <p className="text-indigo-200/90 text-sm md:text-base font-light leading-relaxed">
          Spring 2027 • {format}
        </p>
      </div>
    </div>
  );
}
