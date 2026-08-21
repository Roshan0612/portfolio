"use client";

import { useRef } from "react";

import ElevatorDoors from "./ElevatorDoors";
import ElevatorPanel from "./ElevatorPanel";
import FloorDisplay from "./FloorDisplay";

import type { DestinationId } from "@/data/destinations";

interface ElevatorProps {
  disabled: boolean;
  onSelect: (destination: DestinationId) => void;
  doorRef: React.RefObject<HTMLDivElement | null>;
  floorRef: React.RefObject<HTMLDivElement | null>;
}

export default function Elevator({
  disabled,
  onSelect,
  doorRef,
  floorRef,
}: ElevatorProps) {
  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-[#090909] text-white">

      <div className="relative h-[700px] w-[500px] overflow-hidden border border-white/10 bg-black shadow-2xl">

        {/* Interior */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-800 via-neutral-900 to-black" />

        {/* Ceiling light */}
        <div className="absolute left-1/2 top-20 h-2 w-40 -translate-x-1/2 rounded-full bg-white/20 blur-md" />

        {/* Back wall */}
        <div className="absolute inset-x-16 top-32 bottom-24 border border-white/5 bg-gradient-to-b from-neutral-800/30 to-black/30" />

        {/* Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black to-transparent" />

        <FloorDisplay ref={floorRef} />

        <ElevatorDoors ref={doorRef} />

        <ElevatorPanel
          disabled={disabled}
          onSelect={onSelect}
        />

        <div className="absolute bottom-8 left-8 z-10">
          <p className="text-[8px] tracking-[0.5em] text-white/20">
            ROSHAN GAWADE
          </p>
        </div>
      </div>
    </main>
  );
}