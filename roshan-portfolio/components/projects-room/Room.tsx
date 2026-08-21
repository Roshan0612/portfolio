"use client";

import { useMemo } from "react";
import * as THREE from "three";

export default function Room() {
  const floorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#171717",
        roughness: 0.7,
        metalness: 0.2,
      }),
    []
  );

  const wallMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#202020",
        roughness: 0.9,
      }),
    []
  );

  return (
    <group>
      {/* Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 30]} />
        <primitive object={floorMaterial} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 4, -8]} receiveShadow>
        <boxGeometry args={[20, 12, 0.3]} />
        <primitive object={wallMaterial} />
      </mesh>

      {/* Left wall */}
      <mesh
        position={[-10, 4, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <boxGeometry args={[30, 12, 0.3]} />
        <primitive object={wallMaterial} />
      </mesh>

      {/* Right wall */}
      <mesh
        position={[10, 4, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <boxGeometry args={[30, 12, 0.3]} />
        <primitive object={wallMaterial} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 10, 0]}>
        <boxGeometry args={[20, 0.3, 30]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
    </group>
  );
}