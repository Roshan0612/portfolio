"use client";

import * as THREE from "three";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Canvas,
  useFrame,
} from "@react-three/fiber";
import {
  Html,
  PerspectiveCamera,
} from "@react-three/drei";

export type ElevatorFloorId =
  | "skills"
  | "projects"
  | "education"
  | "experience"
  | "contact";

export type ElevatorState =
  | "approach"
  | "waiting"
  | "opening"
  | "entering"
  | "closing"
  | "lookAround"
  | "idle"
  | "selecting"
  | "moving"
  | "arriving"
  | "openingDestination"
  | "complete";

export interface ElevatorFloor {
  id: ElevatorFloorId;
  floor: number;
  label: string;
  shortLabel: string;
  accent: string;
}

export const ELEVATOR_FLOORS: readonly ElevatorFloor[] = [
  { id: "skills", floor: 1, label: "SKILLS", shortLabel: "SKL", accent: "#a855f7" },
  { id: "projects", floor: 2, label: "PROJECTS", shortLabel: "PRJ", accent: "#00e5ff" },
  { id: "education", floor: 3, label: "EDUCATION", shortLabel: "EDU", accent: "#8b5cf6" },
  { id: "experience", floor: 4, label: "EXPERIENCE", shortLabel: "EXP", accent: "#38bdf8" },
  { id: "contact", floor: 5, label: "CONTACT", shortLabel: "CNT", accent: "#c084fc" },
];

export type ElevatorEvent =
  | "approach"
  | "doorOpen"
  | "enter"
  | "doorClose"
  | "select"
  | "move"
  | "arrive"
  | "destinationOpen";

export interface LiftSectionProps {
  onDestinationSelect?: (destination: ElevatorFloor) => void;
  onEvent?: (event: ElevatorEvent) => void;
  className?: string;
}

type DoorProgressRef = React.MutableRefObject<number>;
type CabinYRef = React.MutableRefObject<number>;

const COLORS = {
  background: "#111017",
  metal: "#2a2930",
  metalLight: "#47454e",
  metalDark: "#1b1a20",
  panel: "#24232a",
  stone: "#292830",
  purple: "#a56cff",
  cyan: "#48dfff",
  white: "#f2f0f5",
  warm: "#fff3d6",
};

const metalMaterial = new THREE.MeshStandardMaterial({
  color: COLORS.metal,
  roughness: 0.34,
  metalness: 0.82,
});

const metalLightMaterial = new THREE.MeshStandardMaterial({
  color: COLORS.metalLight,
  roughness: 0.28,
  metalness: 0.9,
});

const darkMaterial = new THREE.MeshStandardMaterial({
  color: COLORS.metalDark,
  roughness: 0.5,
  metalness: 0.45,
});

const floorMaterial = new THREE.MeshStandardMaterial({
  color: COLORS.stone,
  roughness: 0.3,
  metalness: 0.42,
});

const stoneInsetMaterial = new THREE.MeshStandardMaterial({
  color: "#35333b",
  roughness: 0.42,
  metalness: 0.18,
});

const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: "#8a7da4",
  transparent: true,
  opacity: 0.12,
  roughness: 0.14,
  metalness: 0.3,
  transmission: 0.08,
  thickness: 0.04,
});

const purpleEmissiveMaterial = new THREE.MeshBasicMaterial({
  color: COLORS.purple,
});

const cyanEmissiveMaterial = new THREE.MeshBasicMaterial({
  color: COLORS.cyan,
});

const warmEmissiveMaterial = new THREE.MeshBasicMaterial({
  color: COLORS.warm,
});

function Box({
  position,
  scale,
  material = metalMaterial,
  rotation,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  material?: THREE.Material;
  rotation?: [number, number, number];
}) {
  return (
    <mesh
      position={position}
      rotation={rotation}
      material={material}
      castShadow
      receiveShadow
    >
      <boxGeometry args={scale} />
    </mesh>
  );
}

function NeonLine({
  position,
  scale,
  color = "purple",
  rotation,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  color?: "purple" | "cyan";
  rotation?: [number, number, number];
}) {
  return (
    <mesh
      position={position}
      rotation={rotation}
      material={
        color === "purple"
          ? purpleEmissiveMaterial
          : cyanEmissiveMaterial
      }
    >
      <boxGeometry args={scale} />
    </mesh>
  );
}

function ElevatorExterior() {
  return (
    <group>
      <Box
        position={[0, 3.2, -0.15]}
        scale={[6.9, 6.9, 0.45]}
        material={darkMaterial}
      />

      <Box
        position={[0, 3.35, 0.1]}
        scale={[5.8, 6.45, 0.28]}
        material={metalLightMaterial}
      />

      <Box
        position={[-3.05, 3.2, 0.38]}
        scale={[0.46, 6.5, 0.5]}
        material={metalMaterial}
      />
      <Box
        position={[3.05, 3.2, 0.38]}
        scale={[0.46, 6.5, 0.5]}
        material={metalMaterial}
      />
      <Box
        position={[0, 6.32, 0.38]}
        scale={[6.55, 0.42, 0.5]}
        material={metalMaterial}
      />

      <NeonLine
        position={[-2.78, 3.3, 0.68]}
        scale={[0.045, 5.95, 0.035]}
        color="purple"
      />
      <NeonLine
        position={[2.78, 3.3, 0.68]}
        scale={[0.045, 5.95, 0.035]}
        color="cyan"
      />

      <Box
        position={[0, 6.05, 0.7]}
        scale={[2.35, 0.58, 0.08]}
        material={darkMaterial}
      />

      <Html
        position={[0, 6.05, 0.76]}
        center
        transform
        distanceFactor={7}
        style={{
          color: COLORS.white,
          fontFamily: "system-ui, sans-serif",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.28em",
          whiteSpace: "nowrap",
          textShadow: "0 0 12px rgba(168,85,247,.8)",
          userSelect: "none",
        }}
      >
        PORTFOLIO
      </Html>

      <Box
        position={[0, 0.18, 0.25]}
        scale={[6.6, 0.36, 1.1]}
        material={floorMaterial}
      />
      <NeonLine
        position={[0, 0.38, 0.72]}
        scale={[5.55, 0.035, 0.035]}
        color="purple"
      />

      <group position={[3.72, 3.05, 0.62]}>
        <Box
          position={[0, 0, 0]}
          scale={[0.7, 1.5, 0.12]}
          material={darkMaterial}
        />
        <NeonLine
          position={[0, 0.42, 0.08]}
          scale={[0.16, 0.16, 0.03]}
          color="cyan"
        />
        <NeonLine
          position={[0, -0.42, 0.08]}
          scale={[0.16, 0.16, 0.03]}
          color="purple"
        />
        <Html
          position={[0, -0.02, 0.09]}
          center
          transform
          distanceFactor={6}
          style={{
            color: "rgba(235,232,244,.55)",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: "8px",
            letterSpacing: "0.1em",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          CALL
        </Html>
      </group>
    </group>
  );
}

function ElevatorDoors({
  openProgressRef,
}: {
  openProgressRef: DoorProgressRef;
}) {
  const left = useRef<THREE.Group>(null);
  const right = useRef<THREE.Group>(null);

  useFrame(() => {
    const p = THREE.MathUtils.clamp(openProgressRef.current, 0, 1);
    const eased = THREE.MathUtils.smootherstep(p, 0, 1);
    const travel = 1.54;

    if (left.current) left.current.position.x = -1.52 - eased * travel;
    if (right.current) right.current.position.x = 1.52 + eased * travel;
  });

  return (
    <group position={[0, 3.18, 0.92]}>
      <Box position={[0, 3.14, -0.08]} scale={[3.28, 0.16, 0.28]} material={metalLightMaterial} />
      <Box position={[-1.64, 0, -0.08]} scale={[0.16, 6.18, 0.28]} material={metalLightMaterial} />
      <Box position={[1.64, 0, -0.08]} scale={[0.16, 6.18, 0.28]} material={metalLightMaterial} />

      <group ref={left}>
        <Box position={[0, 0, 0]} scale={[1.48, 5.95, 0.20]} material={metalLightMaterial} />
        <Box position={[-0.61, 0, -0.13]} scale={[0.035, 5.55, 0.025]} material={metalMaterial} />
        <Box position={[0.61, 0, -0.13]} scale={[0.035, 5.55, 0.025]} material={metalMaterial} />
      </group>

      <group ref={right}>
        <Box position={[0, 0, 0]} scale={[1.48, 5.95, 0.20]} material={metalLightMaterial} />
        <Box position={[-0.61, 0, -0.13]} scale={[0.035, 5.55, 0.025]} material={metalMaterial} />
        <Box position={[0.61, 0, -0.13]} scale={[0.035, 5.55, 0.025]} material={metalMaterial} />
      </group>

      <Box position={[0, -2.91, 0.03]} scale={[3.22, 0.12, 0.42]} material={metalMaterial} />
      <Box position={[0, -2.84, 0.09]} scale={[2.95, 0.06, 0.12]} material={stoneInsetMaterial} />
      <NeonLine position={[-1.54, 0, 0.14]} scale={[0.018, 5.5, 0.018]} color="purple" />
      <NeonLine position={[1.54, 0, 0.14]} scale={[0.018, 5.5, 0.018]} color="cyan" />
    </group>
  );
}

function ElevatorInterior() {
  const wallPanel = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#34323a",
        roughness: 0.38,
        metalness: 0.62,
      }),
    [],
  );

  const wallInset = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#26252c",
        roughness: 0.46,
        metalness: 0.48,
      }),
    [],
  );

  return (
    <group>
      {/* Rear wall */}
      <Box position={[0, 3.15, -2.25]} scale={[5.25, 6.3, 0.22]} material={wallPanel} />
      <Box position={[0, 1.15, -2.10]} scale={[4.72, 2.0, 0.07]} material={wallInset} />
      <Box position={[0, 4.95, -2.10]} scale={[4.72, 1.55, 0.07]} material={wallInset} />

      {/* Rear wall vertical architectural ribs */}
      {[-2.05, -1.03, 0, 1.03, 2.05].map((x) => (
        <Box key={`rear-rib-${x}`} position={[x, 3.12, -2.05]} scale={[0.035, 5.55, 0.055]} material={metalMaterial} />
      ))}

      {/* Side walls */}
      <Box position={[-2.62, 3.15, -1.35]} scale={[0.22, 6.3, 3.65]} material={wallPanel} />
      <Box position={[2.62, 3.15, -1.35]} scale={[0.22, 6.3, 3.65]} material={wallPanel} />

      {/* Lower side panels and upper side panels */}
      {[-2.48, 2.48].map((x) => (
        <React.Fragment key={`side-${x}`}>
          <Box position={[x, 1.15, -1.35]} scale={[0.07, 1.8, 3.1]} material={wallInset} />
          <Box position={[x, 4.95, -1.35]} scale={[0.07, 1.55, 3.1]} material={wallInset} />
          <Box position={[x, 3.08, -2.98]} scale={[0.08, 5.7, 0.04]} material={metalMaterial} />
        </React.Fragment>
      ))}

      {/* Corner trims */}
      {[-2.49, 2.49].map((x) => (
        <mesh key={`corner-${x}`} position={[x, 3.15, -2.06]} material={metalLightMaterial}>
          <boxGeometry args={[0.12, 6.0, 0.12]} />
        </mesh>
      ))}

      {/* Ceiling */}
      <Box position={[0, 6.3, -1.35]} scale={[5.25, 0.22, 3.65]} material={wallInset} />
      <Box position={[0, 6.16, -1.35]} scale={[4.35, 0.08, 2.72]} material={metalMaterial} />
      <Box position={[0, 6.105, -1.35]} scale={[3.7, 0.045, 2.12]} material={stoneInsetMaterial} />

      <NeonLine position={[-1.92, 6.04, -1.35]} scale={[0.035, 0.035, 2.15]} color="purple" />
      <NeonLine position={[1.92, 6.04, -1.35]} scale={[0.035, 0.035, 2.15]} color="cyan" />

      {[[-1.25, -1.35], [1.25, -1.35], [-1.25, -0.15], [1.25, -0.15]].map(([x, z], i) => (
        <mesh key={`ceiling-light-${i}`} position={[x, 6.02, z]} material={warmEmissiveMaterial}>
          <boxGeometry args={[0.75, 0.025, 0.14]} />
        </mesh>
      ))}

      {/* Floor with border, inset and tile seams */}
      <Box position={[0, 0.16, -1.35]} scale={[5.25, 0.28, 3.65]} material={floorMaterial} />
      <Box position={[0, 0.315, -1.35]} scale={[4.72, 0.045, 3.12]} material={stoneInsetMaterial} />
      <Box position={[0, 0.342, -1.35]} scale={[4.45, 0.025, 2.86]} material={floorMaterial} />

      {[-1.45, 0, 1.45].map((x) => (
        <Box key={`floor-x-${x}`} position={[x, 0.365, -1.35]} scale={[0.018, 0.018, 2.75]} material={metalMaterial} />
      ))}
      {[-2.2, -1.35, -0.5, 0.35, 1.2, 2.05].map((z) => (
        <Box key={`floor-z-${z}`} position={[0, 0.365, z]} scale={[4.38, 0.018, 0.018]} material={metalMaterial} />
      ))}

      <NeonLine position={[-2.42, 0.37, -1.35]} scale={[0.025, 0.025, 3.0]} color="purple" />
      <NeonLine position={[2.42, 0.37, -1.35]} scale={[0.025, 0.025, 3.0]} color="cyan" />

      {/* Handrails with mounting brackets */}
      {[-2.02, 2.02].map((x) => (
        <React.Fragment key={`rail-${x}`}>
          <mesh position={[x, 2.45, -1.95]} rotation={[0, 0, Math.PI / 2]} material={metalLightMaterial}>
            <cylinderGeometry args={[0.07, 0.07, 3.2, 20]} />
          </mesh>
          {[-1.72, 1.72].map((z) => (
            <mesh key={`mount-${x}-${z}`} position={[x, 2.45, z]} rotation={[Math.PI / 2, 0, 0]} material={metalMaterial}>
              <cylinderGeometry args={[0.11, 0.11, 0.12, 16]} />
            </mesh>
          ))}
        </React.Fragment>
      ))}

      {/* Rear handrail */}
      <mesh position={[0, 2.45, -2.02]} rotation={[0, 0, Math.PI / 2]} material={metalLightMaterial}>
        <cylinderGeometry args={[0.065, 0.065, 3.55, 20]} />
      </mesh>

      {/* Ventilation grille */}
      <Box position={[-1.62, 5.28, -2.08]} scale={[1.25, 0.28, 0.04]} material={darkMaterial} />
      {[-0.48, -0.24, 0, 0.24, 0.48].map((x) => (
        <Box key={`vent-${x}`} position={[-1.62 + x, 5.28, -2.055]} scale={[0.035, 0.18, 0.02]} material={metalLightMaterial} />
      ))}

      {/* Small camera / emergency speaker */}
      <mesh position={[1.72, 5.38, -2.06]} material={metalMaterial}>
        <cylinderGeometry args={[0.11, 0.11, 0.055, 20]} />
      </mesh>
      <mesh position={[1.72, 5.38, -2.095]} material={cyanEmissiveMaterial}>
        <circleGeometry args={[0.035, 16]} />
      </mesh>

      {/* Soft architectural lighting */}
      <rectAreaLight position={[0, 5.55, -0.8]} width={3.4} height={1.8} intensity={4.2} color="#fff7e8" />
      <pointLight position={[0, 3.5, -1.8]} intensity={2.0} distance={6} color="#f5e9ff" />
      <pointLight position={[-2.1, 3.0, -0.4]} intensity={1.5} distance={5} color="#b47cff" />
      <pointLight position={[2.0, 2.8, -0.5]} intensity={1.2} distance={4.5} color="#59ddff" />
      <pointLight position={[0, 1.0, 0.5]} intensity={0.65} distance={4} color="#8bb9d1" />
    </group>
  );
}

function ElevatorButton({
  floor,
  selected,
  disabled,
  onSelect,
}: {
  floor: ElevatorFloor;
  selected: boolean;
  disabled: boolean;
  onSelect: (floor: ElevatorFloor) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    const targetZ = selected ? 0.075 : hovered ? 0.045 : 0;
    mesh.current.position.z = THREE.MathUtils.damp(mesh.current.position.z, targetZ, 16, delta);
  });

  const active = hovered || selected;

  return (
    <group>
      <mesh
        ref={mesh}
        onClick={(event) => {
          event.stopPropagation();
          if (!disabled) onSelect(floor);
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          if (!disabled) setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <cylinderGeometry args={[0.34, 0.34, 0.12, 32]} />
        <meshStandardMaterial
          color={active ? "#5b5863" : "#302e36"}
          emissive={active ? floor.accent : "#000000"}
          emissiveIntensity={active ? 0.28 : 0}
          roughness={0.25}
          metalness={0.82}
        />
      </mesh>

      <mesh position={[0, 0.002, active ? 0.12 : 0.08]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.36, 0.39, 32]} />
        <meshBasicMaterial color={active ? floor.accent : "#66616d"} />
      </mesh>

      <Html
        position={[0.62, 0, 0.08]}
        center
        transform
        distanceFactor={4.2}
        style={{
          color: active ? "#ffffff" : "rgba(240,238,245,.76)",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: "7px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          userSelect: "none",
          textShadow: active ? `0 0 8px ${floor.accent}` : "none",
        }}
      >
        {String(floor.floor).padStart(2, "0")}  {floor.shortLabel}
      </Html>
    </group>
  );
}

function ElevatorPanel({
  enabled,
  selectedFloor,
  onSelect,
}: {
  enabled: boolean;
  selectedFloor: ElevatorFloor | null;
  onSelect: (floor: ElevatorFloor) => void;
}) {
  return (
    <group position={[2.39, 3.0, -0.34]} rotation={[0, -Math.PI / 2, 0]}>
      <Box position={[0, 0, 0]} scale={[2.35, 5.35, 0.24]} material={metalMaterial} />
      <Box position={[0, 0, 0.02]} scale={[2.08, 5.08, 0.10]} material={darkMaterial} />

      {/* Panel frame */}
      <Box position={[0, 2.52, 0.08]} scale={[2.12, 0.055, 0.05]} material={metalLightMaterial} />
      <Box position={[0, -2.52, 0.08]} scale={[2.12, 0.055, 0.05]} material={metalLightMaterial} />
      <Box position={[-1.04, 0, 0.08]} scale={[0.055, 5.0, 0.05]} material={metalLightMaterial} />
      <Box position={[1.04, 0, 0.08]} scale={[0.055, 5.0, 0.05]} material={metalLightMaterial} />

      {/* Display */}
      <Box position={[0, 1.95, 0.12]} scale={[1.42, 0.62, 0.06]} material={metalMaterial} />
      <Box position={[0, 1.95, 0.155]} scale={[1.18, 0.38, 0.025]} material={darkMaterial} />
      <Html
        position={[0, 1.95, 0.19]}
        center
        transform
        distanceFactor={4.2}
        style={{
          color: COLORS.cyan,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: "10px",
          fontWeight: 800,
          letterSpacing: "0.16em",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          textShadow: "0 0 10px rgba(72,223,255,.75)",
        }}
      >
        {selectedFloor ? `GO ${String(selectedFloor.floor).padStart(2, "0")}` : "LIFT"}
      </Html>

      <Html
        position={[0, 1.46, 0.14]}
        center
        transform
        distanceFactor={4.2}
        style={{
          color: "rgba(242,240,245,.56)",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: "6px",
          letterSpacing: "0.18em",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        PORTFOLIO DESTINATIONS
      </Html>

      {ELEVATOR_FLOORS.map((floor, index) => (
        <group key={floor.id} position={[-0.47, 0.88 - index * 0.66, 0.18]}>
          <ElevatorButton
            floor={floor}
            selected={selectedFloor?.id === floor.id}
            disabled={!enabled}
            onSelect={onSelect}
          />
        </group>
      ))}

      {/* Service controls */}
      <group position={[0, -2.03, 0.12]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <boxGeometry args={[1.48, 0.45, 0.06]} />
          <meshStandardMaterial color="#17161c" roughness={0.4} metalness={0.65} />
        </mesh>
        <Html
          position={[0, 0, 0.09]}
          center
          transform
          distanceFactor={4.2}
          style={{
            color: "rgba(242,240,245,.42)",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: "6px",
            letterSpacing: "0.15em",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          EMERGENCY  •  SERVICE
        </Html>
      </group>

      {/* Panel screws */}
      {[
        [-0.94, 2.34],
        [0.94, 2.34],
        [-0.94, -2.34],
        [0.94, -2.34],
      ].map(([x, y]) => (
        <mesh key={`${x}-${y}`} position={[x, y, 0.14]}>
          <cylinderGeometry args={[0.035, 0.035, 0.025, 16]} />
          <meshStandardMaterial color="#8c8992" roughness={0.25} metalness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function FloorIndicator({
  floor,
  target,
  moving,
}: {
  floor: number;
  target: number | null;
  moving: boolean;
}) {
  return (
    <group position={[0, 6.62, 0.94]}>
      <Box position={[0, 0, 0]} scale={[1.65, 0.62, 0.12]} material={metalMaterial} />
      <Box position={[0, 0, 0.07]} scale={[1.42, 0.42, 0.035]} material={darkMaterial} />
      <Html
        position={[0, 0, 0.10]}
        center
        transform
        distanceFactor={6}
        style={{
          color: moving ? COLORS.cyan : COLORS.white,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: "12px",
          fontWeight: 800,
          letterSpacing: "0.18em",
          whiteSpace: "nowrap",
          textShadow: moving ? "0 0 12px rgba(72,223,255,.85)" : "0 0 9px rgba(255,255,255,.35)",
          userSelect: "none",
        }}
      >
        {moving
          ? `${String(floor).padStart(2, "0")}  →  ${String(target ?? floor).padStart(2, "0")}`
          : `FLOOR  ${String(floor).padStart(2, "0")}`}
      </Html>
    </group>
  );
}

function ElevatorCabin({
  cabinYRef,
  doorProgressRef,
  currentFloor,
  targetFloor,
  moving,
  panelEnabled,
  selectedFloor,
  onSelectFloor,
}: {
  cabinYRef: CabinYRef;
  doorProgressRef: DoorProgressRef;
  currentFloor: number;
  targetFloor: number | null;
  moving: boolean;
  panelEnabled: boolean;
  selectedFloor: ElevatorFloor | null;
  onSelectFloor: (floor: ElevatorFloor) => void;
}) {
  const cabin = useRef<THREE.Group>(null);

  useFrame(() => {
    if (cabin.current) cabin.current.position.y = cabinYRef.current;
  });

  return (
    <group ref={cabin}>
      <ElevatorInterior />
      <ElevatorDoors openProgressRef={doorProgressRef} />
      <ElevatorPanel
        enabled={panelEnabled}
        selectedFloor={selectedFloor}
        onSelect={onSelectFloor}
      />
      <FloorIndicator
        floor={currentFloor}
        target={targetFloor}
        moving={moving}
      />
    </group>
  );
}

function LobbyArchitecture() {
  const wallMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#29252f",
        roughness: 0.62,
        metalness: 0.18,
      }),
    [],
  );

  const floorLobby = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#24232a",
        roughness: 0.34,
        metalness: 0.32,
      }),
    [],
  );

  return (
    <group>
      {/* Lobby shell */}
      <Box position={[0, -0.18, 8.5]} scale={[20, 0.35, 18]} material={floorLobby} />
      <Box position={[-10, 4.5, 0]} scale={[0.3, 9, 18]} material={wallMaterial} />
      <Box position={[10, 4.5, 0]} scale={[0.3, 9, 18]} material={wallMaterial} />
      <Box position={[0, 8.9, 0]} scale={[20, 0.3, 18]} material={wallMaterial} />

      {/* Floor inlay lines */}
      {[-7.5, -3.5, 0.5, 4.5, 8].map((z, index) => (
        <NeonLine key={z} position={[0, 0.04, z]} scale={[17.5, 0.018, 0.018]} color={index % 2 ? "cyan" : "purple"} />
      ))}

      <Box position={[0, 0.05, 6.0]} scale={[12.5, 0.05, 0.035]} material={metalLightMaterial} />

      {/* Architectural wall fins */}
      {[-7.5, -5.2, 5.2, 7.5].map((x) => (
        <Box key={`fin-${x}`} position={[x, 4.4, 1.8]} scale={[0.10, 7.6, 0.55]} material={metalLightMaterial} />
      ))}

      {/* Lobby ceiling panels */}
      {[-5, 0, 5].map((x) => (
        <Box key={`ceiling-panel-${x}`} position={[x, 8.72, 2.8]} scale={[3.6, 0.06, 4.2]} material={stoneInsetMaterial} />
      ))}

      <NeonLine position={[-9.72, 4.3, 0]} scale={[0.035, 7.7, 17]} color="purple" />
      <NeonLine position={[9.72, 4.3, 0]} scale={[0.035, 7.7, 17]} color="cyan" />

      {/* Bench */}
      <Box position={[-5.4, 0.62, 4.0]} scale={[2.8, 0.22, 0.72]} material={metalMaterial} />
      <Box position={[-5.4, 1.25, 4.25]} scale={[2.8, 1.15, 0.16]} material={darkMaterial} />
      <Box position={[-6.45, 0.3, 4.0]} scale={[0.14, 0.62, 0.55]} material={metalLightMaterial} />
      <Box position={[-4.35, 0.3, 4.0]} scale={[0.14, 0.62, 0.55]} material={metalLightMaterial} />

      {/* Minimal lobby plant */}
      <Box position={[5.0, 0.55, 4.2]} scale={[0.8, 0.75, 0.8]} material={darkMaterial} />
      <mesh position={[5.0, 2.0, 4.2]} material={wallMaterial}>
        <sphereGeometry args={[0.95, 12, 8]} />
      </mesh>
      {[-0.35, 0, 0.35].map((x) => (
        <mesh key={`leaf-${x}`} position={[5 + x, 2.25, 4.2]} material={purpleEmissiveMaterial}>
          <sphereGeometry args={[0.42, 10, 7]} />
        </mesh>
      ))}

      {/* Lobby lighting */}
      <ambientLight intensity={0.52} color="#d7c8e8" />
      <rectAreaLight position={[0, 7.9, 5.0]} rotation={[-Math.PI / 2, 0, 0]} width={7} height={4} intensity={5.5} color="#fff7e8" />
      <pointLight position={[0, 5.2, 4.5]} intensity={3.2} distance={12} color="#d9c7ff" />
      <pointLight position={[0, 3.0, 10]} intensity={2.5} distance={12} color="#73dfff" />
    </group>
  );
}

function CinematicLiftController({
  cameraRef,
  cabinYRef,
  doorProgressRef,
  onStateChange,
  onSelectFloorRef,
  onDestinationSelectRef,
  onFloorSelected,
  onEvent,
}: {
  cameraRef: React.MutableRefObject<THREE.PerspectiveCamera | null>;
  cabinYRef: CabinYRef;
  doorProgressRef: DoorProgressRef;
  onStateChange: (state: ElevatorState) => void;
  onSelectFloorRef: React.MutableRefObject<((floor: ElevatorFloor) => void) | null>;
  onDestinationSelectRef: React.MutableRefObject<((floor: ElevatorFloor) => void) | null>;
  onFloorSelected: (floor: ElevatorFloor) => void;
  onEvent?: (event: ElevatorEvent) => void;
}) {
  const scrollProgressRef = useRef(0);
  const selectedRef = useRef<ElevatorFloor | null>(null);
  const lastStageRef = useRef<string>("approach");
  const currentFloorRef = useRef(1);
  const targetFloorRef = useRef(1);
  const destinationSentRef = useRef(false);

  const cameraStart = useMemo(() => new THREE.Vector3(0, 2.55, 12.5), []);
  const cameraDoor = useMemo(() => new THREE.Vector3(0, 2.75, 5.3), []);
  const cameraInside = useMemo(() => new THREE.Vector3(0, 2.72, -0.35), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  const position = useMemo(() => new THREE.Vector3(), []);

  const setProgress = useCallback((next: number) => {
    const selected = selectedRef.current;
    const max = selected ? 1 : 0.72;
    scrollProgressRef.current = THREE.MathUtils.clamp(next, 0, max);
  }, []);

  const selectFloor = useCallback(
    (floor: ElevatorFloor) => {
      if (scrollProgressRef.current < 0.61 || scrollProgressRef.current > 0.73) return;
      if (selectedRef.current) return;

      selectedRef.current = floor;
      targetFloorRef.current = floor.floor;
      destinationSentRef.current = false;
      onFloorSelected(floor);
      onEvent?.("select");
    },
    [onEvent, onFloorSelected],
  );

  useEffect(() => {
    onSelectFloorRef.current = selectFloor;
    return () => {
      onSelectFloorRef.current = null;
    };
  }, [onSelectFloorRef, selectFloor]);

  useEffect(() => {
    let wheelRemainder = 0;
    let touchY = 0;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      wheelRemainder += event.deltaY;
      const step = wheelRemainder * 0.00075;
      wheelRemainder = 0;
      setProgress(scrollProgressRef.current + step);
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) touchY = event.touches[0].clientY;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      event.preventDefault();
      const y = event.touches[0].clientY;
      const delta = touchY - y;
      touchY = y;
      setProgress(scrollProgressRef.current + delta * 0.004);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [setProgress]);

  useFrame(() => {
    const camera = cameraRef.current;
    if (!camera) return;

    const p = scrollProgressRef.current;
    const selected = selectedRef.current;
    const targetFloor = targetFloorRef.current;
    let stage: ElevatorState;

    if (p < 0.18) stage = "approach";
    else if (p < 0.30) stage = "opening";
    else if (p < 0.44) stage = "entering";
    else if (p < 0.62) stage = "lookAround";
    else if (!selected || p < 0.72) stage = "idle";
    else if (p < 0.80) stage = "closing";
    else if (p < 0.96) stage = "moving";
    else if (p < 1) stage = "openingDestination";
    else stage = "complete";

    if (stage !== lastStageRef.current) {
      const eventMap: Partial<Record<ElevatorState, ElevatorEvent>> = {
        opening: "doorOpen",
        entering: "enter",
        closing: "doorClose",
        moving: "move",
        arriving: "arrive",
        openingDestination: "destinationOpen",
      };
      const event = eventMap[stage];
      if (event) onEvent?.(event);
      lastStageRef.current = stage;
      onStateChange(stage);
    }

    if (p < 0.18) {
      const t = THREE.MathUtils.smootherstep(p / 0.18, 0, 1);
      camera.position.lerpVectors(cameraStart, cameraDoor, t);
      look.set(0, 3.0, 0.35);
      camera.lookAt(look);
      doorProgressRef.current = 0;
      cabinYRef.current = 0;
      return;
    }

    if (p < 0.30) {
      const t = THREE.MathUtils.smootherstep((p - 0.18) / 0.12, 0, 1);
      camera.position.copy(cameraDoor);
      look.set(0, 3.0, 0.0);
      camera.lookAt(look);
      doorProgressRef.current = t;
      return;
    }

    if (p < 0.44) {
      const t = THREE.MathUtils.smootherstep((p - 0.30) / 0.14, 0, 1);
      position.lerpVectors(cameraDoor, cameraInside, t);
      camera.position.copy(position);
      look.set(0, 2.8, -1.4);
      camera.lookAt(look);
      doorProgressRef.current = 1;
      return;
    }

    if (p < 0.62) {
      const t = THREE.MathUtils.clamp((p - 0.44) / 0.18, 0, 1);
      const angle = THREE.MathUtils.smootherstep(t, 0, 1) * Math.PI * 2;
      camera.position.copy(cameraInside);
      look.set(
        Math.sin(angle) * 3.0,
        2.75,
        -0.35 + Math.cos(angle) * 3.0,
      );
      camera.lookAt(look);
      doorProgressRef.current = 1;
      return;
    }

    if (!selected || p < 0.72) {
      camera.position.copy(cameraInside);
      look.set(2.25, 2.95, -0.35);
      camera.lookAt(look);
      doorProgressRef.current = 1;
      cabinYRef.current = 0;
      return;
    }

    if (p < 0.80) {
      const t = THREE.MathUtils.smootherstep((p - 0.72) / 0.08, 0, 1);
      camera.position.copy(cameraInside);
      look.set(2.25, 2.95, -0.35);
      camera.lookAt(look);
      doorProgressRef.current = 1 - t;
      return;
    }

    if (p < 0.96) {
      const t = THREE.MathUtils.smootherstep((p - 0.80) / 0.16, 0, 1);
      const floorDelta = targetFloor - currentFloorRef.current;
      cabinYRef.current = floorDelta * 6.6 * t;
      camera.position.set(0, 2.72 + cabinYRef.current, -0.35);
      look.set(0, 2.72 + cabinYRef.current, -1.35);
      camera.lookAt(look);
      doorProgressRef.current = 0;
      return;
    }

    cabinYRef.current = (targetFloor - currentFloorRef.current) * 6.6;
    camera.position.set(0, 2.72 + cabinYRef.current, -0.35);
    look.set(0, 2.72 + cabinYRef.current, -1.35);
    camera.lookAt(look);

    const openT = THREE.MathUtils.clamp((p - 0.96) / 0.04, 0, 1);
    doorProgressRef.current = THREE.MathUtils.smootherstep(openT, 0, 1);

    if (p >= 1 && !destinationSentRef.current) {
      destinationSentRef.current = true;
      currentFloorRef.current = targetFloor;
      const destination = ELEVATOR_FLOORS.find((item) => item.floor === targetFloor);
      if (destination) onDestinationSelectRef.current?.(destination);
    }
  });

  return null;
}

function LiftScene({
  onDestinationSelect,
  onEvent,
}: {
  onDestinationSelect?: (destination: ElevatorFloor) => void;
  onEvent?: (event: ElevatorEvent) => void;
}) {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const cabinYRef = useRef(0);
  const doorProgressRef = useRef(0);
  const onSelectFloorRef = useRef<((floor: ElevatorFloor) => void) | null>(
    null,
  );
  const onDestinationSelectRef = useRef<
    ((floor: ElevatorFloor) => void) | null
  >(null);
  const [state, setState] = useState<ElevatorState>("approach");
  const [selectedFloor, setSelectedFloor] = useState<ElevatorFloor | null>(
    null,
  );
  const [currentFloor, setCurrentFloor] = useState(1);
  const [targetFloor, setTargetFloor] = useState<number | null>(null);

  const stateRef = useRef(state);
  stateRef.current = state;

  const currentFloorRef = useRef(currentFloor);
  currentFloorRef.current = currentFloor;

  const targetFloorRef = useRef(targetFloor);
  targetFloorRef.current = targetFloor;

  const handleStateChange = useCallback((next: ElevatorState) => {
    setState(next);
  }, []);

  const handleSelectFloor = useCallback((floor: ElevatorFloor) => {
    setSelectedFloor(floor);
    setTargetFloor(floor.floor);
  }, []);

  const handleDestination = useCallback(
    (floor: ElevatorFloor) => {
      setCurrentFloor(floor.floor);
      setTargetFloor(null);
      onDestinationSelect?.(floor);
    },
    [onDestinationSelect],
  );

  useEffect(() => {
    onDestinationSelectRef.current = handleDestination;
    return () => {
      onDestinationSelectRef.current = null;
    };
  }, [handleDestination]);

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={54}
        near={0.1}
        far={150}
        position={[0, 2.55, 12.5]}
      />

      <color attach="background" args={[COLORS.background]} />
      <fog attach="fog" args={[COLORS.background, 24, 60]} />

      <ambientLight intensity={0.38} color="#d8d0e5" />
      <hemisphereLight args={["#f3eaff", "#16131d", 0.55]} />

      <LobbyArchitecture />
      <ElevatorExterior />

      <ElevatorCabin
        cabinYRef={cabinYRef}
        doorProgressRef={doorProgressRef}
        currentFloor={currentFloor}
        targetFloor={targetFloor}
        moving={state === "moving"}
        panelEnabled={state === "idle"}
        selectedFloor={selectedFloor}
        onSelectFloor={(floor) => onSelectFloorRef.current?.(floor)}
      />

      <CinematicLiftController
        cameraRef={cameraRef}
        cabinYRef={cabinYRef}
        doorProgressRef={doorProgressRef}
        onStateChange={handleStateChange}
        onSelectFloorRef={onSelectFloorRef}
        onDestinationSelectRef={onDestinationSelectRef}
        onFloorSelected={handleSelectFloor}
        onEvent={onEvent}
      />

      <Html
        position={[0, 1.15, 1.1]}
        center
        distanceFactor={7}
        style={{
          color: "rgba(255,255,255,.45)",
          fontFamily: "system-ui, sans-serif",
          fontSize: "10px",
          letterSpacing: ".18em",
          textTransform: "uppercase",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          userSelect: "none",
        }}
      >
        {state === "idle"
          ? "Select a destination"
          : state === "approach"
            ? "Approaching lift"
            : state === "moving"
              ? "Traveling"
              : "Portfolio elevator"}
      </Html>
    </>
  );
}

export default function LiftSection({
  onDestinationSelect,
  onEvent,
  className,
}: LiftSectionProps) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: COLORS.background,
        touchAction: "none",
      }}
    >
      <Canvas
        shadows
        dpr={[1, 1.35]}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: true,
        }}
        camera={{
          position: [0, 2.55, 12.5],
          fov: 54,
          near: 0.1,
          far: 150,
        }}
      >
        <LiftScene
          onDestinationSelect={onDestinationSelect}
          onEvent={onEvent}
        />
      </Canvas>

      <div
        style={{
          position: "absolute",
          left: 24,
          bottom: 22,
          color: "rgba(255,255,255,.42)",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 10,
          letterSpacing: ".16em",
          textTransform: "uppercase",
          pointerEvents: "none",
        }}
      >
        Scroll to control the lift · Click a floor when the panel is active
      </div>
    </div>
  );
}
