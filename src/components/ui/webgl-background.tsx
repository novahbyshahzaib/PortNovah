"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron } from "@react-three/drei";
import * as THREE from "three";

function AnimatedGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const target = new THREE.Vector2();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to -1 to +1
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Slow constant rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      
      // Slight mouse follow using global event listener
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, target.x * 2, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, target.y * 2, 0.05);
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[2.5, 1]} position={[0, 0, 0]}>
      <meshBasicMaterial color="#555555" wireframe />
    </Icosahedron>
  );
}

export function WebGLBackground() {
  return (
    <div className="absolute inset-0 z-0 opacity-80 overflow-hidden h-screen pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
        <AnimatedGeometry />
      </Canvas>
    </div>
  );
}
