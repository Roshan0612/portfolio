"use client";

import * as THREE from "three";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  ScrollControls,
  Text,
  useScroll,
} from "@react-three/drei";

export type ElevatorFloorId =
  | "skills"
  | "projects"
  | "education"
  | "experience"
  | "contact";

export interface ElevatorFloor {
  id: ElevatorFloorId;
  floor: number;
  label: string;
  shortLabel: string;
  accent: string;
}

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

export const ELEVATOR_FLOORS: readonly ElevatorFloor[] = [
  { id: "skills", floor: 1, label: "SKILLS", shortLabel: "SKL", accent: "#b58cff" },
  { id: "projects", floor: 2, label: "PROJECTS", shortLabel: "PRJ", accent: "#a879ff" },
  { id: "education", floor: 3, label: "EDUCATION", shortLabel: "EDU", accent: "#c59dff" },
  { id: "experience", floor: 4, label: "EXPERIENCE", shortLabel: "EXP", accent: "#9e7ae8" },
  { id: "contact", floor: 5, label: "CONTACT", shortLabel: "CNT", accent: "#d3b7ff" },
];

const PHASES = {
  approachStart: 0.0,
  approachEnd: 0.18,
  openStart: 0.18,
  openEnd: 0.30,
  enterStart: 0.30,
  enterEnd: 0.45,
  turnStart: 0.45,
  turnEnd: 0.61,
  focusStart: 0.61,
  focusEnd: 0.72,
  closeStart: 0.72,
  closeEnd: 0.80,
  travelStart: 0.80,
  travelEnd: 0.94,
  arrivalStart: 0.94,
  arrivalEnd: 1.0,
} as const;

const colors = {
  exterior: "#d9d4ca",
  exteriorDark: "#b9b2a5",
  stone: "#9a9185",
  stoneDark: "#726a61",
  warmWhite: "#fff4df",
  warmLight: "#ffe7bf",
  champagne: "#bca27a",
  bronze: "#80684a",
  brushed: "#b8b9b5",
  brushedDark: "#777a76",
  wall: "#b5aaa0",
  wallInset: "#8d8379",
  cabin: "#b6a99b",
  cabinInset: "#8f8479",
  floor: "#756e66",
  floorLight: "#a39b91",
  purple: "#a879ff",
  purpleSoft: "#d1b9ff",
  display: "#17191b",
  glass: "#d8e0df",
};

function phase(start: number, end: number, value: number) {
  if (end <= start) return 0;
  return THREE.MathUtils.clamp((value - start) / (end - start), 0, 1);
}

function smooth(value: number) {
  return THREE.MathUtils.smootherstep(THREE.MathUtils.clamp(value, 0, 1), 0, 1);
}

function Box({
  position,
  scale,
  material,
  rotation,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  material: THREE.Material;
  rotation?: [number, number, number];
}) {
  return (
    <mesh position={position} scale={scale} rotation={rotation} material={material} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}

function Line({
  position,
  scale,
  material,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  material: THREE.Material;
}) {
  return <Box position={position} scale={scale} material={material} />;
}

function Cylinder({
  position,
  rotation,
  scale,
  material,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale: [number, number, number];
  material: THREE.Material;
}) {
  return (
    <mesh position={position} rotation={rotation} scale={scale} material={material} castShadow receiveShadow>
      <cylinderGeometry args={[1, 1, 1, 24]} />
    </mesh>
  );
}


function LiftLighting() {
  return (
    <>
      <ambientLight intensity={1.25} color="#fff6ea" />
      <hemisphereLight intensity={1.5} color="#fff4df" groundColor="#766d63" />

      <rectAreaLight
        position={[0, 7.0, 3.2]}
        rotation={[-Math.PI / 2, 0, 0]}
        width={7}
        height={4}
        intensity={7}
        color="#fff1d6"
      />
      <rectAreaLight
        position={[0, 5.2, -2.0]}
        rotation={[0, 0, 0]}
        width={5}
        height={5}
        intensity={4.5}
        color="#ffe5bd"
      />
      <pointLight position={[-4, 4.5, 5]} intensity={4} distance={13} color="#d9e5ff" />
      <pointLight position={[4, 4.2, -1]} intensity={3.5} distance={9} color="#fff0d5" />
      <pointLight position={[0, 2.7, 0.4]} intensity={0.7} distance={5} color={colors.purpleSoft} />
    </>
  );
}

function Lobby() {
  const wall = useMemo(
    () => new THREE.MeshStandardMaterial({ color: colors.exterior, roughness: 0.72, metalness: 0.08 }),
    [],
  );
  const wallDark = useMemo(
    () => new THREE.MeshStandardMaterial({ color: colors.exteriorDark, roughness: 0.78, metalness: 0.12 }),
    [],
  );
  const stone = useMemo(
    () => new THREE.MeshStandardMaterial({ color: colors.stone, roughness: 0.48, metalness: 0.08 }),
    [],
  );
  const trim = useMemo(
    () => new THREE.MeshStandardMaterial({ color: colors.champagne, roughness: 0.28, metalness: 0.72 }),
    [],
  );
  const warm = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#f2dfc2", roughness: 0.58, metalness: 0.05 }),
    [],
  );
  const purple = useMemo(
    () => new THREE.MeshStandardMaterial({ color: colors.purple, emissive: colors.purple, emissiveIntensity: 1.5, roughness: 0.4, metalness: 0.15 }),
    [],
  );

  return (
    <group>
      <Box position={[0, -0.25, 7]} scale={[22, 0.45, 25]} material={stone} />
      <Box position={[-10.8, 4.5, 1]} scale={[0.35, 9.5, 20]} material={wall} />
      <Box position={[10.8, 4.5, 1]} scale={[0.35, 9.5, 20]} material={wall} />
      <Box position={[0, 9.1, 1]} scale={[22, 0.35, 20]} material={wallDark} />

      <Box position={[-7.4, 4.5, 1]} scale={[5.4, 8.7, 0.22]} material={wallDark} />
      <Box position={[7.4, 4.5, 1]} scale={[5.4, 8.7, 0.22]} material={wallDark} />

      <Box position={[-7.4, 4.5, 0.86]} scale={[4.7, 7.8, 0.08]} material={warm} />
      <Box position={[7.4, 4.5, 0.86]} scale={[4.7, 7.8, 0.08]} material={warm} />

      {[-9.1, -5.7, 5.7, 9.1].map((x) => (
        <Box key={x} position={[x, 4.6, 0.62]} scale={[0.09, 8.1, 0.08]} material={trim} />
      ))}

      {[-7.6, -4.0, 4.0, 7.6].map((x) => (
        <Box key={x} position={[x, 8.25, 0.65]} scale={[3.0, 0.08, 0.06]} material={trim} />
      ))}

      <Box position={[0, 8.45, 3.0]} scale={[18.5, 0.08, 0.12]} material={trim} />
      <Box position={[0, 0.05, 3.0]} scale={[18.5, 0.08, 0.12]} material={trim} />

      <Box position={[-7.0, 1.05, 3.7]} scale={[4.2, 0.18, 0.95]} material={wallDark} />
      <Box position={[-7.0, 1.75, 3.25]} scale={[3.8, 0.12, 0.14]} material={trim} />
      <Box position={[-8.35, 1.95, 3.55]} scale={[0.1, 1.7, 0.1]} material={trim} />
      <Box position={[-5.65, 1.95, 3.55]} scale={[0.1, 1.7, 0.1]} material={trim} />

      <group position={[7.0, 0, 4.0]}>
        <Box position={[0, 2.0, 0]} scale={[2.2, 3.5, 0.15]} material={wallDark} />
        <Box position={[0, 2.0, -0.1]} scale={[1.9, 3.1, 0.08]} material={warm} />
        <Line position={[0, 0.75, -0.16]} scale={[1.3, 0.035, 0.025]} material={purple} />
      </group>

      <Box position={[0, 8.35, 0.9]} scale={[17.5, 0.06, 0.06]} material={trim} />
      <Line position={[-4.2, 7.35, 0.58]} scale={[2.5, 0.04, 0.025]} material={purple} />
      <Line position={[4.2, 7.35, 0.58]} scale={[2.5, 0.04, 0.025]} material={purple} />

      <group position={[-7.8, 0, 1.9]}>
        <Cylinder position={[0, 0.85, 0]} scale={[0.65, 0.16, 0.65]} material={wallDark} />
        <Cylinder position={[0, 1.85, 0]} scale={[0.22, 1.5, 0.22]} material={trim} />
        <mesh position={[0, 2.8, 0]} castShadow>
          <sphereGeometry args={[0.9, 24, 16]} />
          <meshStandardMaterial color="#66715d" roughness={0.85} />
        </mesh>
      </group>

      <group position={[8.0, 0, 1.5]}>
        <Box position={[0, 0.6, 0]} scale={[1.6, 0.12, 0.7]} material={wallDark} />
        <Box position={[-0.62, 1.0, 0]} scale={[0.12, 0.9, 0.65]} material={trim} />
        <Box position={[0.62, 1.0, 0]} scale={[0.12, 0.9, 0.65]} material={trim} />
        <Box position={[0, 1.45, 0]} scale={[1.5, 0.1, 0.65]} material={warm} />
      </group>
    </group>
  );
}

function ExteriorElevator() {
  const frame = useMemo(
    () => new THREE.MeshStandardMaterial({ color: colors.brushed, roughness: 0.34, metalness: 0.82 }),
    [],
  );
  const frameDark = useMemo(
    () => new THREE.MeshStandardMaterial({ color: colors.brushedDark, roughness: 0.38, metalness: 0.72 }),
    [],
  );
  const stone = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#8f877d", roughness: 0.45, metalness: 0.1 }),
    [],
  );
  const glass = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: colors.glass, transparent: true, opacity: 0.26, roughness: 0.08, metalness: 0.05, transmission: 0.12, thickness: 0.04 }),
    [],
  );
  const purple = useMemo(
    () => new THREE.MeshStandardMaterial({ color: colors.purple, emissive: colors.purple, emissiveIntensity: 1.2, roughness: 0.38, metalness: 0.1 }),
    [],
  );

  return (
    <group>
      <Box position={[0, 4.2, 0.18]} scale={[7.3, 8.4, 0.34]} material={stone} />
      <Box position={[-3.72, 4.2, 0.42]} scale={[0.52, 8.5, 0.58]} material={frameDark} />
      <Box position={[3.72, 4.2, 0.42]} scale={[0.52, 8.5, 0.58]} material={frameDark} />
      <Box position={[0, 8.18, 0.42]} scale={[7.46, 0.58, 0.58]} material={frameDark} />
      <Box position={[0, 0.2, 0.42]} scale={[7.45, 0.32, 0.72]} material={frame} />
      <Box position={[0, 0.42, 0.76]} scale={[6.7, 0.08, 0.06]} material={purple} />

      <Box position={[0, 6.95, 0.46]} scale={[2.2, 0.72, 0.1]} material={glass} />
      <Text position={[0, 7.0, 0.54]} fontSize={0.18} color="#f5efe4" anchorX="center" anchorY="middle" letterSpacing={0.08}>
        PORTFOLIO LIFT
      </Text>
      <Text position={[0, 6.72, 0.54]} fontSize={0.11} color="#b8b0a4" anchorX="center" anchorY="middle" letterSpacing={0.12}>
        01
      </Text>

      <Box position={[-4.2, 3.8, 0.2]} scale={[0.12, 5.9, 0.1]} material={frame} />
      <Box position={[4.2, 3.8, 0.2]} scale={[0.12, 5.9, 0.1]} material={frame} />
      <Box position={[0, 0.55, 0.18]} scale={[6.9, 0.1, 0.1]} material={frame} />
    </group>
  );
}

function DoorSet({ progress }: { progress: number }) {
  const metal = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#a7aaa6", roughness: 0.32, metalness: 0.88 }),
    [],
  );
  const dark = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#6e716d", roughness: 0.4, metalness: 0.78 }),
    [],
  );
  const trim = useMemo(
    () => new THREE.MeshStandardMaterial({ color: colors.champagne, roughness: 0.25, metalness: 0.8 }),
    [],
  );

  const open = smooth(progress);
  const offset = 1.48 * open;

  return (
    <group position={[0, 3.65, 0.62]}>
      <group position={[-1.52 - offset, 0, 0]}>
        <Box position={[0, 0, 0]} scale={[1.48, 6.25, 0.18]} material={metal} />
        <Box position={[0.48, 0, -0.12]} scale={[0.055, 5.8, 0.05]} material={dark} />
        <Box position={[-0.69, 0, 0.12]} scale={[0.06, 6.0, 0.04]} material={trim} />
      </group>
      <group position={[1.52 + offset, 0, 0]}>
        <Box position={[0, 0, 0]} scale={[1.48, 6.25, 0.18]} material={metal} />
        <Box position={[-0.48, 0, -0.12]} scale={[0.055, 5.8, 0.05]} material={dark} />
        <Box position={[0.69, 0, 0.12]} scale={[0.06, 6.0, 0.04]} material={trim} />
      </group>
      <Box position={[0, 3.12, 0.12]} scale={[6.4, 0.18, 0.14]} material={dark} />
      <Box position={[0, -3.12, 0.12]} scale={[6.4, 0.14, 0.18]} material={trim} />
      <Line position={[-1.54, 0, 0.17]} scale={[0.025, 5.85, 0.02]} material={trim} />
      <Line position={[1.54, 0, 0.17]} scale={[0.025, 5.85, 0.02]} material={trim} />
    </group>
  );
}

function CabinArchitecture() {
  const wall = useMemo(
    () => new THREE.MeshStandardMaterial({ color: colors.cabin, roughness: 0.62, metalness: 0.18 }),
    [],
  );
  const inset = useMemo(
    () => new THREE.MeshStandardMaterial({ color: colors.cabinInset, roughness: 0.55, metalness: 0.28 }),
    [],
  );
  const trim = useMemo(
    () => new THREE.MeshStandardMaterial({ color: colors.champagne, roughness: 0.27, metalness: 0.8 }),
    [],
  );
  const stone = useMemo(
    () => new THREE.MeshStandardMaterial({ color: colors.floor, roughness: 0.42, metalness: 0.22 }),
    [],
  );
  const ceiling = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#d4c8ba", roughness: 0.76, metalness: 0.05 }),
    [],
  );
  const glass = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: "#dfe4df", transparent: true, opacity: 0.18, roughness: 0.12, metalness: 0.08, transmission: 0.08 }),
    [],
  );
  const light = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#fff6e6", emissive: "#fff1d1", emissiveIntensity: 2.0, roughness: 0.35, metalness: 0.0 }),
    [],
  );

  const panelX = 2.45;

  return (
    <group>
      <Box position={[0, 3.2, -2.55]} scale={[5.35, 6.5, 0.18]} material={wall} />
      <Box position={[-2.65, 3.2, -1.3]} scale={[0.18, 6.5, 3.0]} material={wall} />
      <Box position={[2.65, 3.2, -1.3]} scale={[0.18, 6.5, 3.0]} material={wall} />
      <Box position={[0, 6.45, -1.3]} scale={[5.35, 0.18, 3.0]} material={ceiling} />
      <Box position={[0, 0.14, -1.3]} scale={[5.35, 0.28, 3.0]} material={stone} />

      <Box position={[0, 3.2, -2.42]} scale={[4.5, 5.8, 0.08]} material={inset} />
      <Box position={[-1.15, 3.2, -2.33]} scale={[0.045, 5.4, 0.035]} material={trim} />
      <Box position={[1.15, 3.2, -2.33]} scale={[0.045, 5.4, 0.035]} material={trim} />
      <Box position={[0, 1.35, -2.32]} scale={[4.5, 0.045, 0.035]} material={trim} />
      <Box position={[0, 5.05, -2.32]} scale={[4.5, 0.045, 0.035]} material={trim} />

      <Box position={[-2.42, 3.2, -1.15]} scale={[0.07, 5.95, 0.04]} material={trim} />
      <Box position={[2.42, 3.2, -1.15]} scale={[0.07, 5.95, 0.04]} material={trim} />
      <Box position={[-2.42, 1.15, -1.15]} scale={[0.035, 0.035, 2.8]} material={trim} />
      <Box position={[2.42, 1.15, -1.15]} scale={[0.035, 0.035, 2.8]} material={trim} />

      <Box position={[-2.56, 5.5, -1.1]} scale={[0.06, 1.1, 2.65]} material={glass} />
      <Box position={[2.56, 5.5, -1.1]} scale={[0.06, 1.1, 2.65]} material={glass} />

      {[-1.55, 0, 1.55].map((x) => (
        <group key={x}>
          <Box position={[x, 6.12, -1.25]} scale={[1.1, 0.055, 1.05]} material={light} />
          <Box position={[x, 6.18, -1.25]} scale={[1.18, 0.05, 1.12]} material={trim} />
        </group>
      ))}

      <Box position={[0, 6.0, 0.15]} scale={[4.7, 0.06, 0.08]} material={trim} />
      <Box position={[0, 6.0, -2.5]} scale={[4.7, 0.06, 0.08]} material={trim} />

      <Box position={[0, 0.36, -1.3]} scale={[4.8, 0.05, 2.55]} material={colorsToMaterial("#a49b91", 0.34, 0.18)} />
      <Box position={[0, 0.405, -2.35]} scale={[4.95, 0.035, 0.05]} material={trim} />
      <Box position={[0, 0.405, -0.25]} scale={[4.95, 0.035, 0.05]} material={trim} />
      <Box position={[-2.35, 0.405, -1.3]} scale={[0.05, 0.035, 2.05]} material={trim} />
      <Box position={[2.35, 0.405, -1.3]} scale={[0.05, 0.035, 2.05]} material={trim} />

      <Cylinder position={[-1.95, 2.6, -0.75]} rotation={[Math.PI / 2, 0, 0]} scale={[0.12, 0.12, 1.25]} material={trim} />
      <Cylinder position={[1.95, 2.6, -0.75]} rotation={[Math.PI / 2, 0, 0]} scale={[0.12, 0.12, 1.25]} material={trim} />
      {[-1.95, 1.95].map((x) => (
        <group key={x}>
          <Cylinder position={[x, 2.6, -1.95]} rotation={[Math.PI / 2, 0, 0]} scale={[0.1, 0.1, 0.2]} material={trim} />
          <Cylinder position={[x, 2.6, 0.45]} rotation={[Math.PI / 2, 0, 0]} scale={[0.1, 0.1, 0.2]} material={trim} />
        </group>
      ))}

      <Box position={[0, 5.85, -2.1]} scale={[1.1, 0.04, 0.04]} material={trim} />
      <Box position={[-0.8, 5.85, -2.1]} scale={[0.04, 0.22, 0.04]} material={trim} />
      <Box position={[0.8, 5.85, -2.1]} scale={[0.04, 0.22, 0.04]} material={trim} />

      <Box position={[0, 6.2, 0.25]} scale={[1.25, 0.035, 0.5]} material={light} />

      <PointPanelLight position={[panelX, 3.5, 0.05]} />
    </group>
  );
}

function colorsToMaterial(color: string, roughness: number, metalness: number) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

function PointPanelLight({ position }: { position: [number, number, number] }) {
  return <pointLight position={position} intensity={1.6} distance={3.5} color="#d9c0ff" />;
}

function ControlPanel({
  active,
  selected,
  onSelect,
}: {
  active: boolean;
  selected: ElevatorFloor | null;
  onSelect: (floor: ElevatorFloor) => void;
}) {
  const body = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#5e5f5c", roughness: 0.31, metalness: 0.78 }),
    [],
  );
  const inner = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#2f3130", roughness: 0.24, metalness: 0.66 }),
    [],
  );
  const display = useMemo(
    () => new THREE.MeshStandardMaterial({ color: colors.display, roughness: 0.18, metalness: 0.28, emissive: "#1c2025", emissiveIntensity: 0.4 }),
    [],
  );
  const trim = useMemo(
    () => new THREE.MeshStandardMaterial({ color: colors.champagne, roughness: 0.25, metalness: 0.82 }),
    [],
  );

  return (
    <group position={[2.48, 3.0, 0.18]} rotation={[0, -Math.PI / 2, 0]}>
      <Box position={[0, 0, 0]} scale={[1.42, 4.65, 0.22]} material={body} />
      <Box position={[0, 0, -0.13]} scale={[1.18, 4.35, 0.08]} material={inner} />
      <Box position={[0, 1.72, -0.19]} scale={[0.96, 0.58, 0.05]} material={display} />
      <Box position={[0, 2.02, -0.22]} scale={[1.0, 0.04, 0.035]} material={trim} />

      <Text position={[0, 1.91, -0.245]} fontSize={0.115} color="#d8c8ac" anchorX="center" anchorY="middle" letterSpacing={0.1}>
        DESTINATION
      </Text>
      <Text position={[0, 1.73, -0.245]} fontSize={0.22} color={active ? "#f7f1e6" : "#96948f"} anchorX="center" anchorY="middle" letterSpacing={0.06}>
        {selected ? `0${selected.floor}` : "--"}
      </Text>

      {ELEVATOR_FLOORS.map((floor, index) => (
        <PhysicalButton
          key={floor.id}
          floor={floor}
          selected={selected?.id === floor.id}
          disabled={!active}
          position={[0, 1.05 - index * 0.64, -0.27]}
          onSelect={onSelect}
        />
      ))}

      <Box position={[0, -1.86, -0.2]} scale={[0.9, 0.04, 0.035]} material={trim} />
      <Text position={[0, -2.02, -0.24]} fontSize={0.095} color={active ? "#c6b0ea" : "#7d7b77"} anchorX="center" anchorY="middle" letterSpacing={0.08}>
        SELECT A FLOOR
      </Text>
      {[-0.56, 0.56].map((x) => (
        <Cylinder key={x} position={[x, -2.18, -0.27]} rotation={[Math.PI / 2, 0, 0]} scale={[0.055, 0.055, 0.03]} material={trim} />
      ))}
    </group>
  );
}

function PhysicalButton({
  floor,
  selected,
  disabled,
  position,
  onSelect,
}: {
  floor: ElevatorFloor;
  selected: boolean;
  disabled: boolean;
  position: [number, number, number];
  onSelect: (floor: ElevatorFloor) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const group = useRef<THREE.Group>(null);
  const button = useRef<THREE.Mesh>(null);
  const border = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#8e8e89", roughness: 0.25, metalness: 0.82 }),
    [],
  );

  useFrame(() => {
    if (!button.current) return;
    const target = selected ? 0.055 : hovered ? 0.035 : 0;
    button.current.position.z = target;
  });

  return (
    <group ref={group} position={position}>
      <Box position={[0, 0, 0]} scale={[1.0, 0.45, 0.07]} material={border} />
      <mesh
        ref={button}
        position={[0, 0, 0]}
        onPointerOver={(event) => {
          event.stopPropagation();
          if (!disabled) setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(event) => {
          event.stopPropagation();
          if (!disabled) onSelect(floor);
        }}
        castShadow
      >
        <boxGeometry args={[0.88, 0.33, 0.13]} />
        <meshStandardMaterial
          color={selected || hovered ? "#8d76aa" : "#686966"}
          emissive={selected || hovered ? floor.accent : "#000000"}
          emissiveIntensity={selected ? 0.72 : hovered ? 0.32 : 0}
          roughness={0.27}
          metalness={0.62}
        />
      </mesh>
      <Text position={[-0.28, 0, 0.095]} fontSize={0.095} color={selected || hovered ? "#fff9ef" : "#e4dfd5"} anchorX="center" anchorY="middle">
        {String(floor.floor).padStart(2, "0")}
      </Text>
      <Text position={[0.18, 0, 0.095]} fontSize={0.082} color={selected || hovered ? "#fff9ef" : "#d0ccc4"} anchorX="center" anchorY="middle" letterSpacing={0.04}>
        {floor.label}
      </Text>
      <mesh position={[0.41, 0, 0.098]}>
        <sphereGeometry args={[0.026, 12, 8]} />
        <meshStandardMaterial color={selected ? floor.accent : "#8b8985"} emissive={selected ? floor.accent : "#000000"} emissiveIntensity={selected ? 1.2 : 0} />
      </mesh>
    </group>
  );
}

function FloorDisplay({ floor, target, travelProgress, arrived }: { floor: number; target: number | null; travelProgress: number; arrived: boolean }) {
  const frameMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#3f403e", roughness: 0.26, metalness: 0.7 }), []);
  const screenMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#111414", roughness: 0.16, metalness: 0.24, emissive: "#171b1e", emissiveIntensity: 0.8 }), []);
  const displayed = target && target !== floor ? Math.round(THREE.MathUtils.lerp(floor, target, smooth(travelProgress))) : floor;
  return (
    <group position={[0, 6.84, 0.98]}>
      <Box position={[0, 0, 0]} scale={[1.5, 0.58, 0.1]} material={frameMaterial} />
      <Box position={[0, 0, -0.06]} scale={[1.25, 0.42, 0.03]} material={screenMaterial} />
      <Text position={[0, 0.02, -0.085]} fontSize={0.23} color={arrived ? "#fff0d0" : colors.purpleSoft} anchorX="center" anchorY="middle" letterSpacing={0.06}>
        {arrived ? `ARRIVED  0${displayed}` : target && target !== floor ? `0${displayed}  /  0${target}` : `0${displayed}`}
      </Text>
    </group>
  );
}

function CabinLights({ travelProgress }: { travelProgress: number }) {
  const brightness = 1 + Math.sin(travelProgress * Math.PI) * 0.08;
  return (
    <group>
      <pointLight position={[-1.8, 5.6, -1.4]} intensity={2.7 * brightness} distance={6} color="#fff0d0" />
      <pointLight position={[1.8, 5.6, -1.4]} intensity={2.7 * brightness} distance={6} color="#fff0d0" />
      <pointLight position={[0, 3.2, -2.1]} intensity={1.6} distance={5} color="#ffe4bd" />
    </group>
  );
}

function LiftCabin({
  cabinY,
  doorProgress,
  panelActive,
  selected,
  onSelect,
  floor,
  target,
  travelProgress,
  arrived,
}: {
  cabinY: number;
  doorProgress: number;
  panelActive: boolean;
  selected: ElevatorFloor | null;
  onSelect: (floor: ElevatorFloor) => void;
  floor: number;
  target: number | null;
  travelProgress: number;
  arrived: boolean;
}) {
  return (
    <group
      position={[
        Math.sin(travelProgress * Math.PI * 8) * 0.008,
        cabinY + Math.sin(travelProgress * Math.PI * 6) * 0.012,
        0,
      ]}
    >
      <CabinArchitecture />
      <CabinLights travelProgress={travelProgress} />
      <DoorSet progress={doorProgress} />
      <ControlPanel active={panelActive} selected={selected} onSelect={onSelect} />
      <FloorDisplay floor={floor} target={target} travelProgress={travelProgress} arrived={arrived} />
    </group>
  );
}

function CameraRig({ progress, travelProgressValue, targetFloorValue }: { progress: number; travelProgressValue: number; targetFloorValue: number | null }) {
  const camera = useRef<THREE.PerspectiveCamera>(null);
  const position = useMemo(() => new THREE.Vector3(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const scratch = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (!camera.current) return;

    const approach = smooth(phase(PHASES.approachStart, PHASES.approachEnd, progress));
    const enter = smooth(phase(PHASES.enterStart, PHASES.enterEnd, progress));
    const turn = smooth(phase(PHASES.turnStart, PHASES.turnEnd, progress));
    const focus = smooth(phase(PHASES.focusStart, PHASES.focusEnd, progress));
    const exitReveal = smooth(phase(PHASES.arrivalStart, PHASES.arrivalEnd, progress));

    const outside = new THREE.Vector3(0, 2.72, 12.8);
    const nearDoor = new THREE.Vector3(0, 2.76, 5.15);
    const inside = new THREE.Vector3(0, 2.78, -0.55);
    const final = new THREE.Vector3(0.15, 2.8, -0.42);

    if (progress <= PHASES.approachEnd) {
      position.lerpVectors(outside, nearDoor, approach);
      target.set(0, 3.05, 0.5);
    } else if (progress <= PHASES.openEnd) {
      position.copy(nearDoor);
      target.set(0, 3.05, 0.2);
    } else if (progress <= PHASES.enterEnd) {
      position.lerpVectors(nearDoor, inside, enter);
      target.set(0, 2.9, -1.85);
    } else if (progress <= PHASES.turnEnd) {
      position.copy(inside);
      const yaw = THREE.MathUtils.lerp(0, THREE.MathUtils.degToRad(165), turn);
      const lookDistance = 2.8;
      target.set(Math.sin(yaw) * lookDistance, 2.82, -0.55 - Math.cos(yaw) * lookDistance);
    } else if (progress <= PHASES.focusEnd) {
      position.lerpVectors(inside, final, focus);
      scratch.set(0.7, 2.82, 0.72);
      target.lerpVectors(new THREE.Vector3(0, 2.82, 2.05), scratch, focus);
    } else if (progress < PHASES.arrivalStart) {
      position.copy(final);
      target.set(0.7, 2.82, 0.72);
    } else {
      position.copy(final);
      target.set(0.15, 2.85, 1.15 + exitReveal * 1.1);
    }

    const travelOffset = progress >= PHASES.travelStart && targetFloorValue > 1
      ? (targetFloorValue - 1) * 5.8 * travelProgressValue
      : 0;
    position.y += travelOffset;
    target.y += travelOffset;
    camera.current.position.copy(position);
    camera.current.lookAt(target);
  });

  return <PerspectiveCamera ref={camera} makeDefault fov={52} near={0.1} far={120} position={[0, 2.72, 12.8]} />;
}

function ScrollDrivenLift({ onDestinationSelect, onEvent }: LiftSectionProps) {
  const scroll = useScroll();
  const [selected, setSelected] = useState<ElevatorFloor | null>(null);
  const [notified, setNotified] = useState(false);
  const previousPhase = useRef("approach");

  const progress = THREE.MathUtils.clamp(scroll.offset, 0, 1);
  const openBeforeEntry = smooth(phase(PHASES.openStart, PHASES.openEnd, progress));
  const closeAfterSelection = 1 - smooth(phase(PHASES.closeStart, PHASES.closeEnd, progress));
  const doorProgress = progress <= PHASES.openEnd ? openBeforeEntry : progress < PHASES.closeStart ? 1 : closeAfterSelection;
  const travelProgress = smooth(phase(PHASES.travelStart, PHASES.travelEnd, progress));
  const arrived = progress >= PHASES.arrivalStart;
  const panelActive = progress >= PHASES.focusStart && progress <= PHASES.focusEnd + 0.035;
  const targetFloor = selected?.floor ?? null;
  const currentFloor = 1;
  const travelOffset = targetFloor ? (targetFloor - currentFloor) * 5.8 * travelProgress : 0;

  const stage =
    progress < PHASES.approachEnd
      ? "approach"
      : progress < PHASES.openEnd
        ? "doorOpen"
        : progress < PHASES.enterEnd
          ? "enter"
          : progress < PHASES.turnEnd
            ? "turn"
            : progress < PHASES.focusEnd
              ? "panelFocus"
              : progress < PHASES.closeEnd
                ? "doorClose"
                : progress < PHASES.travelEnd
                  ? "travel"
                  : "arrival";

  useEffect(() => {
    if (stage === previousPhase.current) return;
    previousPhase.current = stage;
    const events: Record<string, ElevatorEvent | undefined> = {
      doorOpen: "doorOpen",
      enter: "enter",
      doorClose: "doorClose",
      travel: "move",
      arrival: "arrive",
    };
    const event = events[stage];
    if (event) onEvent?.(event);
    if (stage === "approach") onEvent?.("approach");
    if (stage === "arrival") onEvent?.("destinationOpen");
  }, [stage, onEvent]);

  useEffect(() => {
    if (progress >= PHASES.arrivalEnd - 0.002 && selected && !notified) {
      setNotified(true);
      onDestinationSelect?.(selected);
    } else if (progress < PHASES.arrivalEnd - 0.02 && notified) {
      setNotified(false);
    }
  }, [progress, selected, notified, onDestinationSelect]);

  const handleSelect = (floor: ElevatorFloor) => {
    if (!panelActive) return;
    setSelected(floor);
    setNotified(false);
    onEvent?.("select");
  };

  return (
    <>
      <color attach="background" args={["#a8a098"]} />
      <fog attach="fog" args={["#a8a098", 28, 65]} />
      <Environment preset="city" environmentIntensity={0.32} />
      <LiftLighting />
      <Lobby />
      <ExteriorElevator />
      <LiftCabin
        cabinY={travelOffset}
        doorProgress={doorProgress}
        panelActive={panelActive}
        selected={selected}
        onSelect={handleSelect}
        floor={currentFloor}
        target={targetFloor}
        travelProgress={travelProgress}
        arrived={arrived}
      />
      <CameraRig progress={progress} travelProgressValue={travelProgress} targetFloorValue={targetFloor} />
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
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "#a8a098",
      }}
    >
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
        camera={{ position: [0, 2.72, 12.8], fov: 52, near: 0.1, far: 120 }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.08;
        }}
      >
        <ScrollControls pages={7} distance={1} damping={0} maxSpeed={Infinity}>
          <ScrollDrivenLift onDestinationSelect={onDestinationSelect} onEvent={onEvent} />
        </ScrollControls>
      </Canvas>

      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 26,
          transform: "translateX(-50%)",
          padding: "9px 16px",
          borderRadius: 999,
          background: "rgba(55,49,43,.56)",
          border: "1px solid rgba(255,245,225,.22)",
          color: "rgba(255,248,237,.82)",
          fontFamily: "system-ui, sans-serif",
          fontSize: 11,
          letterSpacing: ".16em",
          textTransform: "uppercase",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          backdropFilter: "blur(8px)",
        }}
      >
        Scroll to enter · stop anytime · choose your destination
      </div>
    </div>
  );
}