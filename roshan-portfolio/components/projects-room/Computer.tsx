"use client";

import { useRef } from "react";
import * as THREE from "three";

interface ComputerProps {
  screenRef: React.RefObject<THREE.Group | null>;
}

export default function Computer({
  screenRef,
}: ComputerProps) {
  return (
    <group position={[0, -0.5, -4]}>

      {/* Desk */}
      <mesh position={[0, -0.8, 0]} castShadow>
        <boxGeometry args={[6, 0.35, 2]} />
        <meshStandardMaterial
          color="#111111"
          roughness={0.5}
        />
      </mesh>

      {/* Desk legs */}
      <mesh position={[-2.5, -1.8, 0]}>
        <boxGeometry args={[0.3, 2, 1.5]} />
        <meshStandardMaterial color="#080808" />
      </mesh>

      <mesh position={[2.5, -1.8, 0]}>
        <boxGeometry args={[0.3, 2, 1.5]} />
        <meshStandardMaterial color="#080808" />
      </mesh>

      {/* Monitor */}
      <group
        ref={screenRef}
        position={[0, 1.2, -0.1]}
      >

        {/* Monitor body */}
        <mesh castShadow>
          <boxGeometry args={[4.5, 2.8, 0.25]} />
          <meshStandardMaterial
            color="#080808"
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>

        {/* Screen */}
        <mesh position={[0, 0, 0.15]}>
          <planeGeometry args={[4.1, 2.4]} />
          <meshStandardMaterial
            color="#050505"
            emissive="#050505"
          />
        </mesh>

        {/* Monitor stand */}
        <mesh position={[0, -1.8, 0]}>
          <boxGeometry args={[0.3, 1.2, 0.3]} />
          <meshStandardMaterial color="#111111" />
        </mesh>

        {/* Monitor base */}
        <mesh position={[0, -2.35, 0]}>
          <boxGeometry args={[1.4, 0.12, 0.7]} />
          <meshStandardMaterial color="#111111" />
        </mesh>

      </group>

      {/* Keyboard */}
      <mesh position={[0, -0.5, 0.7]}>
        <boxGeometry args={[2.5, 0.1, 0.8]} />
        <meshStandardMaterial color="#191919" />
      </mesh>

    </group>
  );
}