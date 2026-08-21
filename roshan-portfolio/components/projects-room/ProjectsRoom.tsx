"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import {
  Canvas,
  useFrame,
} from "@react-three/fiber";

import {
  Environment,
  PerspectiveCamera,
  ScrollControls,
  useScroll,
} from "@react-three/drei";

import type { Group } from "three";

/* =========================================================
   MATERIALS
========================================================= */

const wallMaterial = new THREE.MeshStandardMaterial({
  color: "#47434a",
  roughness: 0.82,
  metalness: 0.05,
});

const floorMaterial = new THREE.MeshStandardMaterial({
  color: "#3a2925",
  roughness: 0.68,
  metalness: 0.05,
});

const woodMaterial = new THREE.MeshStandardMaterial({
  color: "#4b3026",
  roughness: 0.62,
});

const darkWoodMaterial = new THREE.MeshStandardMaterial({
  color: "#211a19",
  roughness: 0.55,
});

const metalMaterial = new THREE.MeshStandardMaterial({
  color: "#191b20",
  roughness: 0.32,
  metalness: 0.8,
});

const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: "#6b91a6",
  transparent: true,
  opacity: 0.16,
  roughness: 0.08,
  metalness: 0.05,
});

const monitorMaterial = new THREE.MeshStandardMaterial({
  color: "#071018",
  roughness: 0.18,
  metalness: 0.2,
});

/* =========================================================
   SMALL UTILITY COMPONENT
========================================================= */

function Box({
  position,
  scale,
  material = wallMaterial,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  material?: THREE.Material;
}) {
  return (
    <mesh
      position={position}
      material={material}
      castShadow
      receiveShadow
    >
      <boxGeometry args={scale} />
    </mesh>
  );
}

/* =========================================================
   FLOOR
========================================================= */

function Floor() {
  const planks = [];

  const width = 18;
  const depth = 16;
  const plankWidth = 1.1;
  const plankDepth = 4;

  let index = 0;

  for (
    let z = -depth / 2;
    z < depth / 2;
    z += plankDepth
  ) {
    for (
      let x = -width / 2;
      x < width / 2;
      x += plankWidth
    ) {
      const offset =
        index % 2 === 0 ? 0 : plankWidth / 2;

      planks.push(
        <mesh
          key={`floor-${index}`}
          position={[
            x + offset,
            -0.08,
            z,
          ]}
          material={floorMaterial}
          receiveShadow
        >
          <boxGeometry
            args={[
              plankWidth - 0.025,
              0.16,
              plankDepth - 0.035,
            ]}
          />
        </mesh>,
      );

      index++;
    }
  }

  return <group>{planks}</group>;
}

/* =========================================================
   ROOM ARCHITECTURE
========================================================= */

function RoomArchitecture() {
  return (
    <group>
      {/* FLOOR */}
      <Floor />

      {/* BACK WALL */}
      <Box
        position={[0, 4, -8]}
        scale={[18, 8, 0.25]}
        material={wallMaterial}
      />

      {/* LEFT WALL */}
      <Box
        position={[-9, 4, 0]}
        scale={[0.25, 8, 16]}
        material={wallMaterial}
      />

      {/* RIGHT WALL */}
      <Box
        position={[9, 4, 0]}
        scale={[0.25, 8, 16]}
        material={wallMaterial}
      />

      {/* CEILING */}
      <Box
        position={[0, 8, 0]}
        scale={[18, 0.2, 16]}
        material={darkWoodMaterial}
      />

      {/* BASEBOARDS */}
      <Box
        position={[0, 0.15, -7.82]}
        scale={[18, 0.3, 0.15]}
        material={darkWoodMaterial}
      />

      <Box
        position={[-8.82, 0.15, 0]}
        scale={[0.15, 0.3, 16]}
        material={darkWoodMaterial}
      />

      <Box
        position={[8.82, 0.15, 0]}
        scale={[0.15, 0.3, 16]}
        material={darkWoodMaterial}
      />
    </group>
  );
}

/* =========================================================
   DOOR
========================================================= */

function Door() {
  const doorRef = useRef<Group>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (!doorRef.current) return;

    const openStart = 0.08;
    const openEnd = 0.28;

    const progress = THREE.MathUtils.clamp(
      (scroll.offset - openStart) /
        (openEnd - openStart),
      0,
      1,
    );

    const eased = THREE.MathUtils.smoothstep(
      progress,
      0,
      1,
    );

    doorRef.current.rotation.y =
      -eased * Math.PI * 0.52;
  });

  return (
    <group
      position={[-3.8, 2.1, 7.82]}
    >
      {/* FRAME */}

      <Box
        position={[-1.35, 2.1, 0]}
        scale={[0.18, 4.5, 0.35]}
        material={darkWoodMaterial}
      />

      <Box
        position={[1.35, 2.1, 0]}
        scale={[0.18, 4.5, 0.35]}
        material={darkWoodMaterial}
      />

      <Box
        position={[0, 4.25, 0]}
        scale={[2.85, 0.2, 0.35]}
        material={darkWoodMaterial}
      />

      {/* DOOR */}

      <group
        ref={doorRef}
        position={[-1.25, -2.1, 0]}
      >
        <group
          position={[1.25, 2.1, 0]}
        >
          {/* Door body */}
          <Box
            position={[0, 0, 0]}
            scale={[2.5, 4.2, 0.22]}
            material={woodMaterial}
          />

          {/* Door inset panels */}
          <Box
            position={[0, 0.9, -0.13]}
            scale={[1.65, 1.25, 0.04]}
            material={darkWoodMaterial}
          />

          <Box
            position={[0, -1.0, -0.13]}
            scale={[1.65, 1.35, 0.04]}
            material={darkWoodMaterial}
          />

          {/* Handle */}
          <mesh
            position={[0.82, 0, -0.2]}
            rotation={[Math.PI / 2, 0, 0]}
            material={metalMaterial}
            castShadow
          >
            <cylinderGeometry
              args={[0.08, 0.08, 0.55, 24]}
            />
          </mesh>

          {/* DEV ROOM plaque */}
          <Box
            position={[0, 1.55, -0.15]}
            scale={[0.75, 0.28, 0.035]}
            material={metalMaterial}
          />
        </group>
      </group>
    </group>
  );
}

/* =========================================================
   WINDOW
========================================================= */

function Window() {
  return (
    <group
      position={[4.7, 4.2, -7.78]}
    >
      {/* Outer frame */}
      <Box
        position={[0, 0, 0]}
        scale={[6.2, 4.7, 0.22]}
        material={darkWoodMaterial}
      />

      {/* Glass */}
      <mesh
        position={[0, 0, -0.13]}
        material={glassMaterial}
      >
        <boxGeometry
          args={[5.7, 4.2, 0.05]}
        />
      </mesh>

      {/* Vertical divider */}
      <Box
        position={[0, 0, -0.18]}
        scale={[0.12, 4.25, 0.15]}
        material={darkWoodMaterial}
      />

      {/* Horizontal divider */}
      <Box
        position={[0, 0, -0.18]}
        scale={[5.8, 0.1, 0.15]}
        material={darkWoodMaterial}
      />

      {/* Sill */}
      <Box
        position={[0, -2.28, 0.1]}
        scale={[6.5, 0.2, 0.55]}
        material={woodMaterial}
      />

      {/* Curtains */}
      <mesh
        position={[-3.2, 0.1, 0.25]}
        castShadow
      >
        <planeGeometry
          args={[1.4, 4.7, 12, 8]}
        />

        <meshStandardMaterial
          color="#38253f"
          roughness={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh
        position={[3.2, 0.1, 0.25]}
        castShadow
      >
        <planeGeometry
          args={[1.4, 4.7, 12, 8]}
        />

        <meshStandardMaterial
          color="#38253f"
          roughness={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>

      <CityOutside />
    </group>
  );
}

/* =========================================================
   CITY OUTSIDE WINDOW
========================================================= */

function CityOutside() {
  const buildings = useMemo(() => {
    const result = [];

    for (let i = 0; i < 26; i++) {
      const x = -10 + i * 0.75;

      const height =
        1.8 +
        ((i * 17) % 7) * 0.55;

      const depth =
        0.8 +
        ((i * 13) % 4) * 0.2;

      result.push(
        <group
          key={i}
          position={[
            x,
            -2.1 + height / 2,
            -2 - (i % 4) * 1.5,
          ]}
        >
          {/* Building */}
          <mesh>
            <boxGeometry
              args={[
                0.62,
                height,
                depth,
              ]}
            />

            <meshStandardMaterial
              color={
                i % 3 === 0
                  ? "#292d42"
                  : "#242536"
              }
              roughness={0.8}
            />
          </mesh>

          {/* Windows */}
          {Array.from({
            length: Math.max(
              2,
              Math.floor(height),
            ),
          }).map((_, row) => (
            <mesh
              key={row}
              position={[
                0,
                -height / 2 +
                  0.5 +
                  row * 0.7,
                -depth / 2 - 0.01,
              ]}
            >
              <planeGeometry
                args={[0.14, 0.22]}
              />

              <meshBasicMaterial
                color={
                  row % 3 === 0
                    ? "#ffbf72"
                    : "#6bb7d9"
                }
              />
            </mesh>
          ))}
        </group>,
      );
    }

    return result;
  }, []);

  return (
    <group position={[0, 0, -0.2]}>
      {/* Distant sky */}
      <mesh
        position={[0, 2.2, -5]}
      >
        <planeGeometry
          args={[28, 10]}
        />

        <meshBasicMaterial
          color="#242347"
        />
      </mesh>

      {/* Sunset glow */}
      <mesh
        position={[0, 0.7, -4.9]}
      >
        <planeGeometry
          args={[28, 4]}
        />

        <meshBasicMaterial
          color="#7e4e69"
          transparent
          opacity={0.55}
        />
      </mesh>

      {buildings}

      {/* Distant ground */}
      <mesh
        position={[0, -2.2, -4]}
      >
        <planeGeometry
          args={[28, 2]}
        />

        <meshBasicMaterial
          color="#171a28"
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   BOOKSHELF
========================================================= */

function Bookshelf() {
  const books = useMemo(() => {
    return Array.from({ length: 34 }).map(
      (_, i) => {
        const shelf = Math.floor(i / 9);
        const slot = i % 9;

        const height =
          0.65 + (i % 4) * 0.12;

        const width =
          0.22 + (i % 3) * 0.05;

        const bookMaterial =
          i % 3 === 0
            ? new THREE.MeshStandardMaterial({
                color: "#75604d",
                roughness: 0.85,
              })
            : new THREE.MeshStandardMaterial({
                color: "#3c5565",
                roughness: 0.85,
              });

        return (
          <Box
            key={i}
            position={[
              -7.7 +
                slot * 0.62,
              1.05 +
                shelf * 1.25,
              -7.58,
            ]}
            scale={[
              width,
              height,
              0.28,
            ]}
            material={bookMaterial}
          />
        );
      },
    );
  }, []);

  return (
    <group>
      {/* Shelf body */}
      <Box
        position={[-4.5, 3.2, -7.55]}
        scale={[8.5, 6.4, 0.4]}
        material={darkWoodMaterial}
      />

      {/* Inner shelves */}
      {[
        0.45,
        1.7,
        2.95,
        4.2,
        5.45,
      ].map((y) => (
        <Box
          key={y}
          position={[
            -4.5,
            y,
            -7.27,
          ]}
          scale={[
            8,
            0.12,
            0.55,
          ]}
          material={woodMaterial}
        />
      ))}

      {books}

      {/* Plants */}
      <Plant
        position={[
          -7.1,
          1.2,
          -6.95,
        ]}
        scale={0.7}
      />

      <Plant
        position={[
          -2.2,
          3.7,
          -6.95,
        ]}
        scale={0.55}
      />
    </group>
  );
}

/* =========================================================
   PLANT
========================================================= */

function Plant({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <group
      position={position}
      scale={scale}
    >
      {/* Pot */}
      <mesh
        castShadow
        receiveShadow
      >
        <cylinderGeometry
          args={[
            0.35,
            0.28,
            0.5,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#5d4036"
          roughness={0.8}
        />
      </mesh>

      {/* Leaves */}
      {[
        0,
        1,
        2,
        3,
        4,
        5,
      ].map((i) => {
        const angle =
          (i / 6) * Math.PI * 2;

        return (
          <group
            key={i}
            position={[
              Math.cos(angle) * 0.08,
              0.48 +
                (i % 2) * 0.1,
              Math.sin(angle) * 0.08,
            ]}
            rotation={[
              0.15 * Math.sin(i),
              angle,
              0.35,
            ]}
          >
            <mesh castShadow>
              <sphereGeometry
                args={[
                  0.18,
                  10,
                  8,
                ]}
              />

              <meshStandardMaterial
                color={
                  i % 2 === 0
                    ? "#426b4c"
                    : "#507a58"
                }
                roughness={0.85}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* =========================================================
   DESK
========================================================= */

function Desk() {
  return (
    <group
      position={[3.5, 0, -3.9]}
    >
      {/* Desktop */}
      <Box
        position={[0, 2.7, 0]}
        scale={[6.8, 0.28, 2.3]}
        material={woodMaterial}
      />

      {/* Legs */}
      {[
        [-2.9, 1.3, -0.8],
        [2.9, 1.3, -0.8],
        [-2.9, 1.3, 0.8],
        [2.9, 1.3, 0.8],
      ].map((p, i) => (
        <Box
          key={i}
          position={
            p as [
              number,
              number,
              number,
            ]
          }
          scale={[
            0.18,
            2.6,
            0.18,
          ]}
          material={metalMaterial}
        />
      ))}

      {/* Drawer unit */}
      <Box
        position={[-2.3, 1.5, 0.55]}
        scale={[1.3, 2.1, 1.5]}
        material={darkWoodMaterial}
      />

      <Box
        position={[-2.3, 1.8, -0.22]}
        scale={[
          0.55,
          0.08,
          0.05,
        ]}
        material={metalMaterial}
      />

      <Box
        position={[-2.3, 1.2, -0.22]}
        scale={[
          0.55,
          0.08,
          0.05,
        ]}
        material={metalMaterial}
      />

      {/* PC */}
      <PC
        position={[
          2.15,
          1.15,
          0.4,
        ]}
      />

      {/* Main monitor */}
      <Monitor
        position={[
          0.45,
          4.05,
          -0.2,
        ]}
        scale={[
          2.5,
          1.45,
          0.2,
        ]}
      />

      {/* Secondary monitor */}
      <Monitor
        position={[
          -2.05,
          3.9,
          -0.35,
        ]}
        scale={[
          1.65,
          1.15,
          0.18,
        ]}
        rotation={[
          0,
          0.12,
          0,
        ]}
        secondary
      />

      {/* Keyboard */}
      <Keyboard
        position={[
          0.3,
          2.92,
          0.4,
        ]}
      />

      {/* Mouse */}
      <mesh
        position={[
          1.55,
          2.93,
          0.45,
        ]}
        scale={[
          0.45,
          0.18,
          0.65,
        ]}
        castShadow
      >
        <sphereGeometry
          args={[1, 12, 8]}
        />

        <meshStandardMaterial
          color="#15171c"
          roughness={0.28}
          metalness={0.25}
        />
      </mesh>

      {/* Desk lamp */}
      <DeskLamp
        position={[
          -1.1,
          2.95,
          0.45,
        ]}
      />

      {/* Microphone */}
      <Microphone
        position={[
          2.15,
          3.25,
          0.3,
        ]}
      />

      {/* Coffee */}
      <Coffee
        position={[
          -1.7,
          2.98,
          0.75,
        ]}
      />

      {/* Notebook */}
      <Box
        position={[
          -0.85,
          2.96,
          0.65,
        ]}
        scale={[
          1.2,
          0.035,
          0.8,
        ]}
        material={
          new THREE.MeshStandardMaterial({
            color: "#b9b09e",
            roughness: 0.95,
          })
        }
      />

      {/* Phone */}
      <Box
        position={[
          2.45,
          2.98,
          -0.5,
        ]}
        scale={[
          0.65,
          0.04,
          0.3,
        ]}
        material={monitorMaterial}
      />
    </group>
  );
}

/* =========================================================
   MONITOR
========================================================= */

function Monitor({
  position,
  scale,
  rotation = [0, 0, 0],
  secondary = false,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  rotation?: [number, number, number];
  secondary?: boolean;
}) {
  return (
    <group
      position={position}
      rotation={rotation}
    >
      {/* Monitor body */}
      <Box
        position={[0, 0, 0]}
        scale={scale}
        material={monitorMaterial}
      />

      {/* Screen */}
      <mesh
        position={[
          0,
          0,
          scale[2] / 2 + 0.015,
        ]}
        castShadow
      >
        <planeGeometry
          args={[
            scale[0] * 0.9,
            scale[1] * 0.82,
          ]}
        />

        <meshStandardMaterial
          color={
            secondary
              ? "#07151b"
              : "#07141c"
          }
          emissive={
            secondary
              ? "#063b48"
              : "#0086a8"
          }
          emissiveIntensity={
            secondary
              ? 1.1
              : 1.8
          }
          roughness={0.2}
        />
      </mesh>

      {/* Stand */}
      <Box
        position={[
          0,
          -scale[1] / 2 - 0.45,
          0,
        ]}
        scale={[
          0.15,
          0.8,
          0.15,
        ]}
        material={metalMaterial}
      />

      {/* Stand base */}
      <Box
        position={[
          0,
          -scale[1] / 2 - 0.82,
          0,
        ]}
        scale={[
          1.1,
          0.08,
          0.55,
        ]}
        material={metalMaterial}
      />
    </group>
  );
}

/* =========================================================
   KEYBOARD
========================================================= */

function Keyboard({
  position,
}: {
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      <Box
        position={[0, 0, 0]}
        scale={[
          2.5,
          0.12,
          0.85,
        ]}
        material={monitorMaterial}
      />

      {Array.from({
        length: 50,
      }).map((_, i) => {
        const row = Math.floor(
          i / 10,
        );

        const col = i % 10;

        return (
          <mesh
            key={i}
            position={[
              -1.05 +
                col * 0.235,
              0.08,
              -0.27 +
                row * 0.17,
            ]}
            castShadow
          >
            <boxGeometry
              args={[
                0.16,
                0.05,
                0.11,
              ]}
            />

            <meshStandardMaterial
              color={
                i % 7 === 0
                  ? "#2e6d7d"
                  : "#24272c"
              }
              roughness={0.42}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* =========================================================
   PC
========================================================= */

function PC({
  position,
}: {
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      {/* Tower */}
      <Box
        position={[0, 0, 0]}
        scale={[
          1.3,
          2.5,
          1.7,
        ]}
        material={monitorMaterial}
      />

      {/* Glass side */}
      <mesh
        position={[-0.66, 0, 0]}
      >
        <boxGeometry
          args={[
            0.02,
            2.1,
            1.35,
          ]}
        />

        <meshPhysicalMaterial
          color="#18222c"
          transparent
          opacity={0.45}
          roughness={0.12}
          metalness={0.3}
        />
      </mesh>

      {/* Fans */}
      {[0.55, 0, -0.55].map(
        (y, i) => (
          <mesh
            key={i}
            position={[
              -0.69,
              y,
              0,
            ]}
            rotation={[
              0,
              Math.PI / 2,
              0,
            ]}
          >
            <ringGeometry
              args={[
                0.25,
                0.32,
                24,
              ]}
            />

            <meshBasicMaterial
              color={
                i === 1
                  ? "#4ad9ff"
                  : "#5f7eff"
              }
            />
          </mesh>
        ),
      )}

      {/* GPU */}
      <Box
        position={[
          -0.72,
          -0.1,
          0,
        ]}
        scale={[
          0.15,
          0.32,
          1.05,
        ]}
        material={metalMaterial}
      />

      {/* Internal light */}
      <pointLight
        position={[
          -0.8,
          0,
          0,
        ]}
        intensity={0.4}
        distance={3}
        color="#1ca8d5"
      />
    </group>
  );
}

/* =========================================================
   DESK LAMP
========================================================= */

function DeskLamp({
  position,
}: {
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh castShadow>
        <cylinderGeometry
          args={[
            0.25,
            0.3,
            0.08,
            20,
          ]}
        />

        <meshStandardMaterial
          color="#252329"
          roughness={0.35}
        />
      </mesh>

      {/* Arm */}
      <mesh
        position={[
          0,
          0.65,
          0,
        ]}
        rotation={[
          0,
          0,
          -0.2,
        ]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.06,
            0.06,
            1.3,
            12,
          ]}
        />

        <meshStandardMaterial
          color="#30323a"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Light */}
      <pointLight
        position={[
          0.1,
          1.05,
          0,
        ]}
        intensity={1.4}
        distance={3.8}
        color="#ffbd72"
        castShadow
      />
    </group>
  );
}

/* =========================================================
   MICROPHONE
========================================================= */

function Microphone({
  position,
}: {
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      {/* Mic body */}
      <mesh castShadow>
        <cylinderGeometry
          args={[
            0.16,
            0.2,
            0.65,
            20,
          ]}
        />

        <meshStandardMaterial
          color="#16191d"
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* Mic head */}
      <mesh
        position={[
          0,
          0.55,
          0,
        ]}
        castShadow
      >
        <sphereGeometry
          args={[
            0.23,
            16,
            12,
          ]}
        />

        <meshStandardMaterial
          color="#171a1f"
          roughness={0.35}
          metalness={0.5}
        />
      </mesh>

      {/* Arm */}
      <Box
        position={[
          0.45,
          0.2,
          0,
        ]}
        scale={[
          0.08,
          0.08,
          1.1,
        ]}
        material={metalMaterial}
      />
    </group>
  );
}

/* =========================================================
   COFFEE
========================================================= */

function Coffee({
  position,
}: {
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      {/* Cup */}
      <mesh castShadow>
        <cylinderGeometry
          args={[
            0.28,
            0.23,
            0.42,
            24,
          ]}
        />

        <meshStandardMaterial
          color="#d2c5b4"
          roughness={0.72}
        />
      </mesh>

      {/* Coffee */}
      <mesh
        position={[
          0,
          0.22,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            0.21,
            0.21,
            0.015,
            24,
          ]}
        />

        <meshStandardMaterial
          color="#211611"
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   CHAIR
========================================================= */

function Chair() {
  return (
    <group
      position={[3.5, 0, -1.2]}
      rotation={[
        0,
        -0.18,
        0,
      ]}
    >
      {/* Seat */}
      <mesh
        position={[0, 2.0, 0]}
        castShadow
      >
        <boxGeometry
          args={[
            2.0,
            0.38,
            2.0,
          ]}
        />

        <meshStandardMaterial
          color="#1d2227"
          roughness={0.72}
        />
      </mesh>

      {/* Back */}
      <mesh
        position={[
          0,
          3.25,
          -0.75,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            1.85,
            2.8,
            0.38,
          ]}
        />

        <meshStandardMaterial
          color="#20252a"
          roughness={0.72}
        />
      </mesh>

      {/* Arms */}
      {[-0.95, 0.95].map(
        (x) => (
          <Box
            key={x}
            position={[
              x,
              2.65,
              -0.05,
            ]}
            scale={[
              0.15,
              0.7,
              1.2,
            ]}
            material={metalMaterial}
          />
        ),
      )}

      {/* Central pole */}
      <Box
        position={[
          0,
          1.05,
          0,
        ]}
        scale={[
          0.15,
          1.5,
          0.15,
        ]}
        material={metalMaterial}
      />

      {/* Base */}
      <mesh
        position={[
          0,
          0.3,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            0.7,
            0.7,
            0.12,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#17191d"
          roughness={0.35}
          metalness={0.7}
        />
      </mesh>

      {/* Wheels */}
      {[
        [0.5, 0, 0.5],
        [-0.5, 0, 0.5],
        [0.5, 0, -0.5],
        [-0.5, 0, -0.5],
      ].map((p, i) => (
        <mesh
          key={i}
          position={
            p as [
              number,
              number,
              number,
            ]
          }
        >
          <sphereGeometry
            args={[
              0.13,
              12,
              8,
            ]}
          />

          <meshStandardMaterial
            color="#111216"
            roughness={0.45}
          />
        </mesh>
      ))}
    </group>
  );
}

/* =========================================================
   WHITEBOARD
========================================================= */

function Whiteboard() {
  return (
    <group
      position={[
        -8.72,
        4.2,
        -2.2,
      ]}
      rotation={[
        0,
        Math.PI / 2,
        0,
      ]}
    >
      {/* Board */}
      <Box
        position={[0, 0, 0]}
        scale={[
          4.2,
          2.8,
          0.12,
        ]}
        material={
          new THREE.MeshStandardMaterial({
            color: "#d9d8d2",
            roughness: 0.6,
          })
        }
      />

      {/* Architecture lines */}
      <Box
        position={[
          0,
          0.45,
          -0.08,
        ]}
        scale={[
          1.5,
          0.04,
          0.03,
        ]}
        material={metalMaterial}
      />

      <Box
        position={[
          0,
          -0.2,
          -0.08,
        ]}
        scale={[
          1.9,
          0.04,
          0.03,
        ]}
        material={metalMaterial}
      />

      <Box
        position={[
          0,
          -0.85,
          -0.08,
        ]}
        scale={[
          1.25,
          0.04,
          0.03,
        ]}
        material={metalMaterial}
      />
    </group>
  );
}

/* =========================================================
   ROOM
========================================================= */

function Room() {
  return (
    <>
      <RoomArchitecture />

      <Door />

      <Window />

      <Bookshelf />

      <Desk />

      <Chair />

      <Whiteboard />

      {/* Ambient room lighting */}
      <ambientLight
        intensity={0.55}
        color="#716c83"
      />

      {/* Ceiling light */}
      <pointLight
        position={[
          0,
          7.2,
          0,
        ]}
        intensity={8}
        distance={16}
        color="#ffe1c0"
        castShadow
      />

      {/* Window light */}
      <pointLight
        position={[
          4.5,
          4.2,
          -4,
        ]}
        intensity={10}
        distance={12}
        color="#b26a9d"
      />

      {/* Workstation cool light */}
      <pointLight
        position={[
          3.5,
          3.8,
          -3,
        ]}
        intensity={5}
        distance={6}
        color="#329bc2"
      />
    </>
  );
}

/* =========================================================
   CINEMATIC CAMERA
   IMPORTANT:
   This component MUST be rendered INSIDE ScrollControls
   because it uses useScroll().
========================================================= */

function CinematicCamera() {
  const camera =
    useRef<THREE.PerspectiveCamera>(null);

  const scroll = useScroll();

  const cameraPath = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(
          -3.8,
          2.5,
          13,
        ),

        new THREE.Vector3(
          -3.8,
          2.5,
          10.5,
        ),

        new THREE.Vector3(
          -3.8,
          2.5,
          7.5,
        ),

        new THREE.Vector3(
          -2.5,
          2.6,
          5.2,
        ),

        new THREE.Vector3(
          -0.2,
          2.8,
          3.2,
        ),

        new THREE.Vector3(
          1.8,
          3.0,
          1.2,
        ),

        new THREE.Vector3(
          3.4,
          3.2,
          -0.2,
        ),

        new THREE.Vector3(
          4.0,
          3.4,
          -1.5,
        ),

        new THREE.Vector3(
          4.1,
          3.5,
          -2.5,
        ),

        new THREE.Vector3(
          3.7,
          3.6,
          -3.2,
        ),

        new THREE.Vector3(
          3.55,
          3.75,
          -3.9,
        ),
      ],
      false,
      "catmullrom",
      0.35,
    );
  }, []);

  const targetPath = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(
          -3.8,
          2.6,
          5,
        ),

        new THREE.Vector3(
          -3.0,
          2.7,
          2,
        ),

        new THREE.Vector3(
          -1.0,
          2.9,
          0,
        ),

        new THREE.Vector3(
          1.0,
          3.0,
          -2,
        ),

        new THREE.Vector3(
          3.0,
          3.3,
          -3,
        ),

        new THREE.Vector3(
          3.5,
          3.6,
          -3.9,
        ),
      ],
      false,
      "catmullrom",
      0.35,
    );
  }, []);

  const currentPosition =
    useMemo(
      () => new THREE.Vector3(),
      [],
    );

  const currentTarget =
    useMemo(
      () => new THREE.Vector3(),
      [],
    );

  const lookAtPoint =
    useMemo(
      () => new THREE.Vector3(),
      [],
    );

  useFrame(
    (state, delta) => {
      if (!camera.current) {
        return;
      }

      /*
       * IMPORTANT FIX
       *
       * useScroll() now works because
       * CinematicCamera is rendered inside
       * ScrollControls.
       */

      const progress =
        THREE.MathUtils.clamp(
          scroll.offset,
          0,
          1,
        );

      /*
       * Smooth cinematic scroll.
       */
      const previousProgress =
        camera.current.userData
          .progress ?? 0;

      const smoothProgress =
        THREE.MathUtils.damp(
          previousProgress,
          progress,
          5,
          delta,
        );

      camera.current.userData.progress =
        smoothProgress;

      /*
       * Camera position.
       */
      cameraPath.getPointAt(
        smoothProgress,
        currentPosition,
      );

      /*
       * Camera target.
       */
      targetPath.getPointAt(
        smoothProgress,
        currentTarget,
      );

      /*
       * Smooth camera movement.
       */
      camera.current.position.lerp(
        currentPosition,
        1 -
          Math.pow(
            0.001,
            delta,
          ),
      );

      /*
       * Small natural elevation.
       */
      lookAtPoint.copy(
        currentTarget,
      );

      lookAtPoint.y +=
        Math.sin(
          smoothProgress *
            Math.PI,
        ) * 0.12;

      camera.current.lookAt(
        lookAtPoint,
      );

      /*
       * Tiny cinematic breathing movement.
       */
      camera.current.position.x +=
        Math.sin(
          state.clock.elapsedTime *
            0.45,
        ) * 0.006;

      camera.current.position.y +=
        Math.cos(
          state.clock.elapsedTime *
            0.38,
        ) * 0.004;
    },
  );

  return (
    <PerspectiveCamera
      ref={camera}
      makeDefault
      position={[
        -3.8,
        2.5,
        13,
      ]}
      fov={52}
      near={0.1}
      far={100}
    />
  );
}

/* =========================================================
   SCENE
========================================================= */

function Scene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        powerPreference:
          "high-performance",
      }}
    >
      <color
        attach="background"
        args={["#0b0b12"]}
      />

      <fog
        attach="fog"
        args={[
          "#0b0b12",
          18,
          42,
        ]}
      />

      <Environment
        preset="city"
      />

      {/* =====================================================
          IMPORTANT STRUCTURE

          BOTH CinematicCamera and Room are now
          INSIDE ScrollControls.

          This fixes:
          Cannot read properties of null
          (reading 'offset')
      ===================================================== */}

      <ScrollControls
        pages={5}
        damping={0.15}
      >
        <CinematicCamera />

        <Room />
      </ScrollControls>
    </Canvas>
  );
}

/* =========================================================
   EXPORT
========================================================= */

export default function ProjectRoom() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#090910",
        overflow: "hidden",
      }}
    >
      <Scene />

      {/* Temporary instruction */}
      <div
        style={{
          position: "fixed",
          bottom: 30,
          left: "50%",
          transform:
            "translateX(-50%)",
          color:
            "rgba(255,255,255,0.55)",
          fontFamily:
            "system-ui, sans-serif",
          fontSize: 12,
          letterSpacing:
            "0.15em",
          textTransform:
            "uppercase",
          pointerEvents: "none",
        }}
      >
        Scroll to enter
      </div>
    </div>
  );
}