"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Float } from "@react-three/drei";
import type { Group } from "three";

// --- Pointer type ---
type Pointer = { x: number; y: number };

// --- Robot Model ---
function RobotModel({ pointer, scale = 0.16, glideSpeed = 0.35, glideAmplitude = 0.45, active = true }:
  { pointer: React.MutableRefObject<Pointer>; scale?: number; glideSpeed?: number; glideAmplitude?: number; active?: boolean }) {
  const gltf = useGLTF("/models/robot.glb");
  const root = useRef<Group>(null!);

   useFrame((state) => {
    if (!root.current) return;

    const { x: px, y: py } = pointer.current; // normalized -1..1

    // --- Limit rotation angles (stronger response)
    const targetRotY = px * 0.75; // left/right rotation
    const targetRotX = -py * 0.4; // up/down rotation

     // Smooth lerp rotation
     root.current.rotation.y += (targetRotY - root.current.rotation.y) * 0.12;
     root.current.rotation.x += (targetRotX - root.current.rotation.x) * 0.12;

    // --- Subtle vertical float ---
     const t = state.clock.elapsedTime;
     if (active) {
       root.current.position.y = Math.sin(t * 1.6) * 0.08; // hover
       // left-right glide across the canvas
       root.current.position.x = Math.sin(t * glideSpeed) * glideAmplitude;
     } else {
       // gracefully settle to center when inactive
       root.current.position.y += (0 - root.current.position.y) * 0.08;
       root.current.position.x += (0 - root.current.position.x) * 0.08;
     }
  });

   return (
     <group ref={root} scale={scale} position={[0, -0.05, 0]}>
       <primitive object={gltf.scene} />
     </group>
   );
}

// --- Scene ---
function Scene({ pointer, scale, amplitude, speed, active, amplitudeMultiplier = 0.98 }:
  { pointer: React.MutableRefObject<Pointer>; scale: number; amplitude?: number; speed: number; active: boolean; amplitudeMultiplier?: number }) {
  const { viewport } = useThree();
  // r3f viewport.width is the world-space width at z=0; use that to span full canvas
  const halfW = viewport.width / 2;
  const m = Math.min(Math.max(amplitudeMultiplier ?? 0.98, 0.6), 0.99); // clamp margin
  const computedAmp = halfW * m; // small margin to avoid clipping
  const amp = typeof amplitude === 'number' ? amplitude : computedAmp;
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 5, 2]} intensity={0.7} />
      <Float speed={1} rotationIntensity={0.06} floatIntensity={0.3}>
        <RobotModel pointer={pointer} scale={scale} glideSpeed={speed} glideAmplitude={amp} active={active} />
      </Float>
    </>
  );
}

// --- Canvas ---
export function RobotCanvas({ amplitude, speed = 0.35, scale = 0.26, amplitudeMultiplier = 0.95 }:
  { amplitude?: number; speed?: number; scale?: number; amplitudeMultiplier?: number } = {}) {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    // Pause animation when tab hidden or user prefers reduced motion
    const m = typeof window !== "undefined" ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    const onVisibility = () => setActive(!document.hidden && !(m && m.matches));
    const handleMediaChange = () => onVisibility();
    m?.addEventListener?.('change', handleMediaChange);
    document.addEventListener('visibilitychange', onVisibility);
    onVisibility();
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      m?.removeEventListener?.('change', handleMediaChange);
    };
  }, []);

  useEffect(() => {
    const projectToContainer = (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width; // 0..1 within box
      const y = (clientY - rect.top) / rect.height; // 0..1 within box
      pointer.current.x = x * 2 - 1; // -1..1
      pointer.current.y = y * 2 - 1; // -1..1
    };

    const handleMove = (e: MouseEvent) => projectToContainer(e.clientX, e.clientY);
    const handleTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      projectToContainer(t.clientX, t.clientY);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleTouch);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <Canvas
      camera={{ position: [0.6, 0.9, 2.4], fov: 30 }}
        dpr={[1, 1.4]}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
          <Scene pointer={pointer} scale={scale} amplitude={amplitude} speed={speed} active={active} amplitudeMultiplier={amplitudeMultiplier} />
      </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/robot.glb");
