"use client";

import * as THREE from "three";
import * as React from "react";
import { useMemo, useRef } from "react";
import {
  Canvas,
  useFrame,
} from "@react-three/fiber";

import {
  PerspectiveCamera,
  Html,
} from "@react-three/drei";

import type { Group } from "three";

const NEON_WALL_MATERIAL = new THREE.MeshBasicMaterial({
  color: "#00eaff",
  transparent: true,
  opacity: 0.98,
});

const NEON_PURPLE_MATERIAL = new THREE.MeshBasicMaterial({
  color: "#a855f7",
  transparent: true,
  opacity: 0.9,
});

const WALL_MATERIAL = new THREE.MeshStandardMaterial({
  color: "#382443",
  roughness: 0.78,
  metalness: 0.02,
  emissive: "#4a176d",
  emissiveIntensity: 0.28,
});

/* =========================================================
   MATERIALS
========================================================= */

const wallMaterial = new THREE.MeshStandardMaterial({
  color: "#382443",
  roughness: 0.76,
  metalness: 0.03,
  emissive: "#35154f",
  emissiveIntensity: 0.32,
});

const floorMaterial = new THREE.MeshStandardMaterial({
  color: "#21182a",
  roughness: 0.64,
  metalness: 0.08,
  emissive: "#130b1d",
  emissiveIntensity: 0.18,
});

const woodMaterial = new THREE.MeshStandardMaterial({
  color: "#4a2938",
  roughness: 0.58,
  emissive: "#210d25",
  emissiveIntensity: 0.16,
});

const darkWoodMaterial = new THREE.MeshStandardMaterial({
  color: "#17121d",
  roughness: 0.52,
  emissive: "#160b20",
  emissiveIntensity: 0.2,
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
    >
      <boxGeometry args={scale} />
    </mesh>
  );
}

/* =========================================================
   FLOOR
========================================================= */

function Floor() {
  return (
    <mesh position={[0, -0.08, 0]} material={floorMaterial}>
      <boxGeometry args={[18, 0.16, 25]} />
    </mesh>
  );
}

/* =========================================================
   ROOM ARCHITECTURE
========================================================= */

function RoomArchitecture() {
  return (
    <group>
      <Floor />

      {/* Short exterior hallway/landing so the opening never feels like a floating door. */}
      <Box
        position={[0, -0.08, 12.5]}
        scale={[18, 0.16, 9]}
        material={floorMaterial}
      />
      <Box
        position={[-8.5, 3.2, 12.5]}
        scale={[0.3, 6.4, 9]}
        material={wallMaterial}
      />
      <Box
        position={[8.5, 3.2, 12.5]}
        scale={[0.3, 6.4, 9]}
        material={wallMaterial}
      />
      <Box
        position={[0, 6.8, 12.5]}
        scale={[18, 0.18, 9]}
        material={darkWoodMaterial}
      />
      <Box
        position={[0, 0.12, 12.5]}
        scale={[18, 0.3, 0.15]}
        material={darkWoodMaterial}
      />

      {/* Main room envelope — preserved */}
      <Box
        position={[0, 4, -8]}
        scale={[18, 8, 0.25]}
        material={wallMaterial}
      />

      <Box
        position={[-9, 4, 0]}
        scale={[0.25, 8, 16]}
        material={wallMaterial}
      />

      <Box
        position={[9, 4, 0]}
        scale={[0.25, 8, 16]}
        material={wallMaterial}
      />

      <Box
        position={[0, 8, 0]}
        scale={[18, 0.2, 16]}
        material={darkWoodMaterial}
      />

      {/* Existing room baseboards */}
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

      {/* Entrance architecture: the room begins with a real wall mass */}
      <group position={[-3.8, 0, 7.82]}>
        {/* Side piers */}
        <Box
          position={[-2.15, 4, 0]}
          scale={[1.55, 8, 0.55]}
          material={wallMaterial}
        />
        <Box
          position={[2.15, 4, 0]}
          scale={[1.55, 8, 0.55]}
          material={wallMaterial}
        />

        {/* Header wall above doorway */}
        <Box
          position={[0, 6.7, 0]}
          scale={[2.75, 2.6, 0.55]}
          material={wallMaterial}
        />

        {/* Deep jambs create actual wall thickness */}
        <Box
          position={[-1.45, 3.95, -0.18]}
          scale={[0.24, 7.7, 0.75]}
          material={darkWoodMaterial}
        />
        <Box
          position={[1.45, 3.95, -0.18]}
          scale={[0.24, 7.7, 0.75]}
          material={darkWoodMaterial}
        />
        <Box
          position={[0, 7.75, -0.18]}
          scale={[2.9, 0.24, 0.75]}
          material={darkWoodMaterial}
        />

        {/* Architectural threshold */}
        <Box
          position={[0, 0.08, 0.08]}
          scale={[2.9, 0.16, 0.85]}
          material={darkWoodMaterial}
        />
        <Box
          position={[0, 0.32, 0.36]}
          scale={[2.9, 0.12, 0.12]}
          material={metalMaterial}
        />
      </group>
    </group>
  );
}
/* =========================================================
   DOOR
========================================================= */

function Door({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const doorRef = useRef<Group>(null);

  useFrame((_state, delta) => {
    if (!doorRef.current) return;

    /* The camera reaches the doorway around 0.18. Open gradually after that. */
    const openStart = 0.12;
    const openEnd = 0.24;
    const progress = THREE.MathUtils.clamp(
      (progressRef.current - openStart) / (openEnd - openStart),
      0,
      1,
    );
    const eased = THREE.MathUtils.smoothstep(progress, 0, 1);
    const targetRotation = -eased * THREE.MathUtils.degToRad(96);

    doorRef.current.rotation.y = THREE.MathUtils.damp(
      doorRef.current.rotation.y,
      targetRotation,
      7,
      delta,
    );
  });

  return (
    <group position={[-3.8, 0, 7.82]}>
      {/* Premium outer frame */}
      <Box position={[-1.48, 3.95, 0]} scale={[0.18, 7.7, 0.42]} material={metalMaterial} />
      <Box position={[1.48, 3.95, 0]} scale={[0.18, 7.7, 0.42]} material={metalMaterial} />
      <Box position={[0, 7.75, 0]} scale={[3.12, 0.18, 0.42]} material={metalMaterial} />

      {/* Door pivot is exactly on the left hinge */}
      <group ref={doorRef} position={[-1.35, 0, 0]}>
        <group position={[1.35, 0, 0]}>
          {/* Glass slab */}
          <mesh position={[0, 3.95, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.7, 7.65, 0.12]} />
            <meshStandardMaterial
              color="#9ed7e8"
              transparent
              opacity={0.18}
              roughness={0.12}
              metalness={0.08}
              emissive="#173844"
              emissiveIntensity={0.18}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Slim internal metal rails */}
          <Box position={[-1.27, 3.95, -0.09]} scale={[0.08, 7.55, 0.08]} material={metalMaterial} />
          <Box position={[1.27, 3.95, -0.09]} scale={[0.08, 7.55, 0.08]} material={metalMaterial} />
          <Box position={[0, 0.18, -0.09]} scale={[2.55, 0.08, 0.08]} material={metalMaterial} />
          <Box position={[0, 7.72, -0.09]} scale={[2.55, 0.08, 0.08]} material={metalMaterial} />

          {/* Central architectural mullion */}
          <Box position={[0, 3.95, -0.09]} scale={[0.055, 7.5, 0.055]} material={metalMaterial} />

          {/* Handle */}
          <group position={[0.93, 3.95, -0.16]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.07, 0.07, 0.85, 24]} />
              <meshStandardMaterial color="#a7adb5" roughness={0.22} metalness={0.92} />
            </mesh>
            <mesh position={[0, 0.43, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.065, 0.065, 0.22, 20]} />
              <meshStandardMaterial color="#8f969f" roughness={0.2} metalness={0.95} />
            </mesh>
            <mesh position={[0, -0.43, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.065, 0.065, 0.22, 20]} />
              <meshStandardMaterial color="#8f969f" roughness={0.2} metalness={0.95} />
            </mesh>
          </group>

          {/* Hinges */}
          {[1.0, 3.95, 6.9].map((y) => (
            <mesh key={y} position={[-1.35, y, 0]} castShadow>
              <boxGeometry args={[0.1, 0.42, 0.18]} />
              <meshStandardMaterial color="#7f858d" roughness={0.25} metalness={0.95} />
            </mesh>
          ))}

          {/* Minimal entrance plaque */}
          <Box position={[-0.72, 6.85, -0.12]} scale={[0.72, 0.22, 0.04]} material={metalMaterial} />
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

    for (let i = 0; i < 14; i++) {
      const x = -5 + i * 0.78;

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
    return Array.from({ length: 24 }).map(
      (_, i) => {
        const shelf = Math.floor(i / 8);
        const slot = i % 8;

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
                slot * 0.68,
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

function Desk({ mainMonitorRef }: { mainMonitorRef: React.RefObject<Group | null> }) {
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
        monitorRef={mainMonitorRef}
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
  monitorRef,
  position,
  scale,
  rotation = [0, 0, 0],
  secondary = false,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  rotation?: [number, number, number];
  secondary?: boolean;
  monitorRef?: React.Ref<Group>;
}) {
  return (
    <group
      ref={monitorRef}
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

      {!secondary && (
        <Html
          position={[0, 0, scale[2] / 2 + 0.025]}
          transform
          distanceFactor={1.15}
          occlude
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
              width: `${scale[0] * 92}px`,
              height: `${scale[1] * 82}px`,
              background: "linear-gradient(135deg, #061018 0%, #071f2a 52%, #0b3f4e 100%)",
              color: "#dffaff",
              fontFamily: "Inter, system-ui, sans-serif",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "18px",
              boxSizing: "border-box",
              borderRadius: "4px",
              overflow: "hidden",
              boxShadow: "0 0 28px rgba(40, 190, 230, 0.18) inset",
            }}
          >
            <div style={{ fontSize: "9px", letterSpacing: "0.24em", opacity: 0.55, textTransform: "uppercase" }}>Portfolio / Project Room</div>
            <div style={{ fontSize: "23px", fontWeight: 700, marginTop: "8px", letterSpacing: "-0.04em" }}>Autozynq</div>
            <div style={{ fontSize: "9px", marginTop: "7px", opacity: 0.62 }}>Automation workflows • Full-stack • AI systems</div>
            <div style={{ display: "flex", gap: "5px", marginTop: "14px" }}>
              {["React", "Next.js", "Prisma", "AI"].map((label) => (
                <span key={label} style={{ fontSize: "7px", padding: "4px 6px", border: "1px solid rgba(180,240,255,.22)", borderRadius: "99px", opacity: 0.72 }}>{label}</span>
              ))}
            </div>
          </div>
        </Html>
      )}

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
        length: 30,
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
   PURPLE OFFICE LIGHTING
   Large low-cost wall washes make the architecture readable.
   No post-processing/bloom is required.
========================================================= */
function PurpleOfficeLighting() {
  const slats = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const x = -7.65 + i * 0.67;
      const purple = i % 3 !== 1;
      return (
        <mesh key={i} position={[x, 3.85, -7.67]}>
          <boxGeometry args={[0.035, 6.7, 0.035]} />
          <meshBasicMaterial
            color={purple ? "#9b4dff" : "#25dfff"}
            toneMapped={false}
          />
        </mesh>
      );
    });
  }, []);

  return (
    <group name="purple-office-lighting">
      {/* Broad colored washes. They are intentionally brighter than the old
          version so the walls remain visible instead of becoming black. */}
      <mesh position={[0, 3.9, -7.72]}>
        <planeGeometry args={[17.3, 7.4]} />
        <meshBasicMaterial
          color="#4b176d"
          transparent
          opacity={0.48}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[-8.72, 3.9, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[15.2, 7.4]} />
        <meshBasicMaterial
          color="#34206b"
          transparent
          opacity={0.42}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[8.72, 3.9, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[15.2, 7.4]} />
        <meshBasicMaterial
          color="#5b176f"
          transparent
          opacity={0.42}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Purple ceiling reflection */}
      <mesh position={[0, 7.72, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[17.2, 15.2]} />
        <meshBasicMaterial
          color="#281044"
          transparent
          opacity={0.32}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Reference-style vertical RGB slats on the back wall. */}
      {slats}

      {/* Ceiling perimeter lighting */}
      <mesh position={[0, 7.48, -7.66]}>
        <boxGeometry args={[16.8, 0.08, 0.06]} />
        <meshBasicMaterial color="#c44dff" toneMapped={false} />
      </mesh>
      <mesh position={[-8.66, 7.48, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[15.2, 0.08, 0.06]} />
        <meshBasicMaterial color="#704dff" toneMapped={false} />
      </mesh>
      <mesh position={[8.66, 7.48, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[15.2, 0.08, 0.06]} />
        <meshBasicMaterial color="#c34cff" toneMapped={false} />
      </mesh>

      {/* Soft floor glow under the workstation */}
      <mesh position={[3.5, 0.035, -3.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7.2, 4.5]} />
        <meshBasicMaterial
          color="#6524a8"
          transparent
          opacity={0.20}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   ROOM
========================================================= */

function Room({
  progressRef,
  mainMonitorRef,
}: {
  progressRef: React.MutableRefObject<number>;
  mainMonitorRef: React.RefObject<Group | null>;
}) {
  return (
    <>
      <RoomArchitecture />
      <Door progressRef={progressRef} />
      <Window />
      <Bookshelf />
      <Desk mainMonitorRef={mainMonitorRef} />
      <Chair />
      <Whiteboard />

      <PurpleOfficeLighting />

      {/* Strong architectural neon accents. These are emissive meshes, so the
          purple/cyan design remains visible even when real-time lighting is low. */}
      <mesh position={[-8.66, 5.75, -1.2]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.045, 0.045, 11.8]} />
        <meshBasicMaterial color="#b05cff" toneMapped={false} />
      </mesh>
      <mesh position={[8.66, 5.75, -1.2]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.045, 0.045, 11.8]} />
        <meshBasicMaterial color="#7c5cff" toneMapped={false} />
      </mesh>
      <mesh position={[0, 7.55, -7.72]}>
        <boxGeometry args={[16.8, 0.055, 0.055]} />
        <meshBasicMaterial color="#a855f7" toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.28, -7.7]}>
        <boxGeometry args={[16.8, 0.045, 0.045]} />
        <meshBasicMaterial color="#7a35c7" toneMapped={false} />
      </mesh>
      <mesh position={[-8.72, 0.28, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[15.5, 0.045, 0.045]} />
        <meshBasicMaterial color="#7c4dff" toneMapped={false} />
      </mesh>
      <mesh position={[8.72, 0.28, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[15.5, 0.045, 0.045]} />
        <meshBasicMaterial color="#d05cff" toneMapped={false} />
      </mesh>

      <ambientLight intensity={1.55} color="#8e72b8" />
      <hemisphereLight
        color="#8b5cff"
        groundColor="#120a1c"
        intensity={1.45}
      />
      <pointLight position={[0, 6.7, -3.5]} intensity={6.5} distance={15} color="#a83cff" />
      <pointLight position={[-6.0, 4.6, -3.5]} intensity={5.5} distance={11} color="#7b45ff" />
      <pointLight position={[6.0, 4.4, -2.5]} intensity={5.8} distance={11} color="#d34dff" />
      <pointLight position={[0, 3.2, 3.5]} intensity={4.0} distance={10} color="#6846ff" />
      <pointLight position={[0, 1.0, -6.0]} intensity={3.0} distance={8} color="#9f3cff" />
      <pointLight position={[3.5, 3.8, -3]} intensity={3.5} distance={7} color="#31c8ff" />
    </>
  );
}
/* =========================================================
   CINEMATIC CAMERA
========================================================= */

function CinematicCamera({
  progressRef,
  mainMonitorRef,
}: {
  progressRef: React.MutableRefObject<number>;
  mainMonitorRef: React.RefObject<Group | null>;
}) {
  const camera = useRef<THREE.PerspectiveCamera>(null);

  const cameraPath = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(-5.4, 2.55, 14.2),
          new THREE.Vector3(-5.05, 2.62, 11.9),
          new THREE.Vector3(-4.25, 2.72, 9.2),
          new THREE.Vector3(-2.9, 2.78, 7.1),
          new THREE.Vector3(-1.65, 2.88, 5.2),
          new THREE.Vector3(-0.5, 2.95, 3.3),
          new THREE.Vector3(-2.7, 3.15, 1.1),
          new THREE.Vector3(-4.2, 3.35, -1.4),
          new THREE.Vector3(-0.8, 3.2, -2.55),
          new THREE.Vector3(2.25, 3.05, -2.2),
          new THREE.Vector3(4.35, 3.35, -2.35),
          new THREE.Vector3(5.05, 3.55, -3.15),
          new THREE.Vector3(4.85, 4.02, -3.92),
        ],
        false,
        "catmullrom",
        0.45,
      ),
    [],
  );

  const targetPath = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(-3.8, 3.9, 7.82),
          new THREE.Vector3(-3.7, 3.8, 7.4),
          new THREE.Vector3(-3.0, 3.55, 4.8),
          new THREE.Vector3(-1.0, 3.2, 1.8),
          new THREE.Vector3(-3.7, 3.0, -2.7),
          new THREE.Vector3(-5.5, 3.3, -5.8),
          new THREE.Vector3(-1.7, 3.15, -5.8),
          new THREE.Vector3(2.5, 3.15, -4.5),
          new THREE.Vector3(4.1, 3.2, -3.3),
          new THREE.Vector3(4.25, 3.55, -3.0),
          new THREE.Vector3(4.15, 4.02, -3.95),
          new THREE.Vector3(4.15, 4.05, -3.95),
          new THREE.Vector3(4.15, 4.05, -3.95),
        ],
        false,
        "catmullrom",
        0.45,
      ),
    [],
  );

  const currentPosition = useMemo(() => new THREE.Vector3(), []);
  const currentTarget = useMemo(() => new THREE.Vector3(), []);
  const monitorCenter = useMemo(() => new THREE.Vector3(), []);
  const monitorForward = useMemo(() => new THREE.Vector3(), []);
  const monitorQuaternion = useMemo(() => new THREE.Quaternion(), []);
  const finalPosition = useMemo(() => new THREE.Vector3(), []);
  const lookAtPoint = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    if (!camera.current) return;

    const rawProgress = THREE.MathUtils.clamp(progressRef.current, 0, 1);
    const previous = camera.current.userData.progress ?? 0;
    const progress = THREE.MathUtils.damp(previous, rawProgress, 7.5, delta);
    camera.current.userData.progress = progress;

    /* 0.00–0.68: cinematic room spline. */
    const roomProgress = THREE.MathUtils.clamp(progress / 0.68, 0, 1);
    cameraPath.getPointAt(roomProgress, currentPosition);
    targetPath.getPointAt(roomProgress, currentTarget);

    camera.current.position.lerp(
      currentPosition,
      1 - Math.pow(0.01, delta),
    );

    /* 0.68 onward: leave the spline and calculate the shot from the real monitor. */
    if (progress > 0.62 && mainMonitorRef.current) {
      mainMonitorRef.current.updateWorldMatrix(true, false);
      monitorCenter.setFromMatrixPosition(mainMonitorRef.current.matrixWorld);
      monitorQuaternion.setFromRotationMatrix(mainMonitorRef.current.matrixWorld);
      monitorForward.set(0, 0, 1).applyQuaternion(monitorQuaternion).normalize();

      const approach = THREE.MathUtils.smoothstep(
        THREE.MathUtils.clamp((progress - 0.62) / 0.18, 0, 1),
        0,
        1,
      );
      const finalPush = THREE.MathUtils.smoothstep(
        THREE.MathUtils.clamp((progress - 0.80) / 0.20, 0, 1),
        0,
        1,
      );

      /* Position 1.85 units in front of the actual monitor normal. */
      finalPosition.copy(monitorCenter).addScaledVector(monitorForward, 1.85);
      finalPosition.y = monitorCenter.y;

      /* Then push directly through the monitor center. */
      const finalDistance = THREE.MathUtils.lerp(1.85, 0.34, finalPush);
      finalPosition.copy(monitorCenter).addScaledVector(monitorForward, finalDistance);
      finalPosition.y = monitorCenter.y;

      currentTarget.copy(monitorCenter);
      camera.current.position.lerp(
        finalPosition,
        1 - Math.pow(0.008, delta),
      );

      const finalFov = THREE.MathUtils.lerp(52, 38, finalPush);
      camera.current.fov = THREE.MathUtils.damp(
        camera.current.fov,
        finalFov,
        5,
        delta,
      );
      camera.current.updateProjectionMatrix();
    } else {
      camera.current.fov = THREE.MathUtils.damp(
        camera.current.fov,
        52,
        4,
        delta,
      );
      camera.current.updateProjectionMatrix();
    }

    lookAtPoint.copy(currentTarget);

    /* At the final shot, remove all vertical offset: true eye-level, center target. */
    if (progress > 0.62 && mainMonitorRef.current) {
      lookAtPoint.copy(monitorCenter);
    } else {
      lookAtPoint.y += Math.sin(roomProgress * Math.PI) * 0.06;
    }

    camera.current.lookAt(lookAtPoint);

    /* Almost imperceptible cinematic breathing only during room exploration. */
    if (progress < 0.62) {
      camera.current.position.x += Math.sin(state.clock.elapsedTime * 0.42) * 0.004;
      camera.current.position.y += Math.cos(state.clock.elapsedTime * 0.35) * 0.0025;
    }
  });

  return (
    <PerspectiveCamera
      ref={camera}
      makeDefault
      position={[-5.4, 2.55, 14.2]}
      fov={52}
      near={0.08}
      far={60}
    />
  );
}

/* =========================================================
   SCROLL INPUT
   We intentionally do NOT use useScroll() here.
   This removes the null `scroll.offset` failure completely.
========================================================= */
function ScrollInput() {
  return null;
}

function ProjectTransitionOverlay({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (!ref.current) return;
    const p = progressRef.current;
    const opacity = THREE.MathUtils.smoothstep(
      THREE.MathUtils.clamp((p - 0.91) / 0.07, 0, 1),
      0,
      1,
    );
    ref.current.style.opacity = String(opacity);
    ref.current.style.transform = `scale(${0.985 + opacity * 0.015})`;
    ref.current.style.pointerEvents = opacity > 0.96 ? "auto" : "none";
  });

  return (
    <Html fullscreen>
      <div
        ref={ref}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          transform: "scale(.985)",
          background: "radial-gradient(circle at 50% 45%, #123b49 0%, #061018 45%, #020507 100%)",
          color: "#eaffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, system-ui, sans-serif",
          transition: "none",
          overflow: "hidden",
        }}
      >
        <div style={{ width: "min(1080px, 84vw)", padding: "48px" }}>
          <div style={{ fontSize: 11, letterSpacing: ".28em", opacity: .45, textTransform: "uppercase" }}>
            Project showcase
          </div>
          <h1 style={{ fontSize: "clamp(48px, 8vw, 110px)", lineHeight: .9, margin: "18px 0 22px", letterSpacing: "-.06em" }}>
            Autozynq
          </h1>
          <p style={{ maxWidth: 680, fontSize: 18, lineHeight: 1.6, opacity: .68, margin: 0 }}>
            A visual automation platform for building connected workflows with modern full-stack and AI systems.
          </p>
        </div>
      </div>
    </Html>
  );
}


function PurpleWallGlowPanels() {
  return (
    <group name="PurpleWallGlowPanels">
      {/* Back wall architectural glow */}
      <mesh position={[0, 3.0, -5.86]}>
        <planeGeometry args={[9.5, 4.8]} />
        <meshBasicMaterial
          color="#4c2878"
          transparent
          opacity={0.20}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Left wall glow */}
      <mesh position={[-7.36, 3.0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10.5, 4.8]} />
        <meshBasicMaterial
          color="#5b3a91"
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Right wall glow */}
      <mesh position={[7.36, 3.0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[10.5, 4.8]} />
        <meshBasicMaterial
          color="#7337a8"
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Ceiling purple wash */}
      <mesh position={[0, 6.35, -1]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 10]} />
        <meshBasicMaterial
          color="#392050"
          transparent
          opacity={0.14}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function FourWallNeonArchitecture() {
  const wallY = 3.2;
  const roomW = 15;
  const roomD = 12;
  const wallH = 6.4;
  const thickness = 0.18;

  return (
    <group name="four-wall-neon-architecture">
      {/* Back wall */}
      <mesh position={[0, wallY, -roomD / 2]} material={WALL_MATERIAL}>
        <boxGeometry args={[roomW, wallH, thickness]} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-roomW / 2, wallY, 0]} material={WALL_MATERIAL}>
        <boxGeometry args={[thickness, wallH, roomD]} />
      </mesh>

      {/* Right wall */}
      <mesh position={[roomW / 2, wallY, 0]} material={WALL_MATERIAL}>
        <boxGeometry args={[thickness, wallH, roomD]} />
      </mesh>

      {/* Front wall — split around the entrance so the doorway remains open */}
      <mesh position={[-5.35, wallY, roomD / 2]} material={WALL_MATERIAL}>
        <boxGeometry args={[4.3, wallH, thickness]} />
      </mesh>
      <mesh position={[5.35, wallY, roomD / 2]} material={WALL_MATERIAL}>
        <boxGeometry args={[4.3, wallH, thickness]} />
      </mesh>
      <mesh position={[0, 5.65, roomD / 2]} material={WALL_MATERIAL}>
        <boxGeometry args={[6.4, 1.5, thickness]} />
      </mesh>

      {/* Architectural vertical corner strips */}
      <mesh position={[-roomW / 2 + 0.08, 3.2, -roomD / 2 + 0.12]} material={NEON_WALL_MATERIAL}>
        <boxGeometry args={[0.035, 5.7, 0.035]} />
      </mesh>
      <mesh position={[roomW / 2 - 0.08, 3.2, -roomD / 2 + 0.12]} material={NEON_PURPLE_MATERIAL}>
        <boxGeometry args={[0.035, 5.7, 0.035]} />
      </mesh>

      {/* Horizontal wall light strips */}
      <mesh position={[0, 5.55, -roomD / 2 + 0.12]} material={NEON_WALL_MATERIAL}>
        <boxGeometry args={[roomW - 0.45, 0.035, 0.035]} />
      </mesh>
      <mesh position={[-roomW / 2 + 0.12, 5.45, 0]} material={NEON_PURPLE_MATERIAL}>
        <boxGeometry args={[0.035, 0.035, roomD - 0.45]} />
      </mesh>
      <mesh position={[roomW / 2 - 0.12, 5.45, 0]} material={NEON_WALL_MATERIAL}>
        <boxGeometry args={[0.035, 0.035, roomD - 0.45]} />
      </mesh>

      {/* Lower skirting — makes all four walls readable */}
      <mesh position={[0, 0.18, -roomD / 2 + 0.12]} material={NEON_PURPLE_MATERIAL}>
        <boxGeometry args={[roomW - 0.3, 0.045, 0.06]} />
      </mesh>
      <mesh position={[-roomW / 2 + 0.12, 0.18, 0]} material={NEON_WALL_MATERIAL}>
        <boxGeometry args={[0.06, 0.045, roomD - 0.3]} />
      </mesh>
      <mesh position={[roomW / 2 - 0.12, 0.18, 0]} material={NEON_PURPLE_MATERIAL}>
        <boxGeometry args={[0.06, 0.045, roomD - 0.3]} />
      </mesh>
    </group>
  );
}

/* =========================================================
   SCENE
========================================================= */

function Scene() {
  const progressRef = useRef(0);
  const mainMonitorRef = useRef<Group | null>(null);
  const touchY = useRef<number | null>(null);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const delta = THREE.MathUtils.clamp(event.deltaY, -120, 120);
    progressRef.current = THREE.MathUtils.clamp(
      progressRef.current + delta * 0.00115,
      0,
      1,
    );
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchY.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchY.current === null) return;
    const y = event.touches[0]?.clientY ?? touchY.current;
    const delta = touchY.current - y;
    touchY.current = y;
    progressRef.current = THREE.MathUtils.clamp(
      progressRef.current + delta * 0.0015,
      0,
      1,
    );
  };

  return (
    <div
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => { touchY.current = null; }}
      style={{
        width: "100%",
        height: "100%",
        touchAction: "none",
        overscrollBehavior: "none",
      }}
    >
      <Canvas
        dpr={1}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: true,
        }}
      >
        <color attach="background" args={["#12091d"]} />
        <fog attach="fog" args={["#12091d", 35, 80]} />

        <CinematicCamera
          progressRef={progressRef}
          mainMonitorRef={mainMonitorRef}
        />

        <Room
          progressRef={progressRef}
          mainMonitorRef={mainMonitorRef}
        />

        <ProjectTransitionOverlay progressRef={progressRef} />
      </Canvas>
    </div>
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
        background: "#12091d",
        overflow: "hidden",
      }}
    >
      <Scene />

      {/* Scroll instruction */}
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
        Scroll to enter · explore · open the screen
      </div>
    </div>
  );
}