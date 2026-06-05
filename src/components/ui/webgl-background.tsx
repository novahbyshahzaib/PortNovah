"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron } from "@react-three/drei";
import * as THREE from "three";

function AnimatedGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Slow rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      
      // Slight mouse follow
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, (state.pointer.x * 1.5), 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, (state.pointer.y * 1.5), 0.05);
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[2.5, 1]} position={[0, 0, 0]}>
      <meshBasicMaterial color="#2E2E2E" wireframe />
    </Icosahedron>
  );
}

export function WebGLBackground() {
  return (
    <div className="absolute inset-0 z-0 opacity-50 pointer-events-none overflow-hidden h-screen">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
        <AnimatedGeometry />
      </Canvas>
    </div>
  );
}
