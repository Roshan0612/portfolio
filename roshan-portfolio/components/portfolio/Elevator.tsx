"use client";

import { useRef } from "react";
import { destinations } from "@/data/destinations";
import type { DestinationId } from "@/data/destinations";

interface ElevatorProps {
  onSelect: (destination: DestinationId) => void;
  disabled: boolean;
}

export default function Elevator({
  onSelect,
  disabled,
}: ElevatorProps) {
  const leftDoor = useRef<HTMLDivElement>(null);
  const rightDoor = useRef<HTMLDivElement>(null);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111] text-white">

      {/* Elevator frame */}
      <div className="relative h-[700px] w-[500px] overflow-hidden border border-white/10 bg-black shadow-2xl">

        {/* Interior */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-800 via-neutral-900 to-black" />

        {/* Ceiling light */}
        <div className="absolute left-1/2 top-8 h-2 w-32 -translate-x-1/2 rounded-full bg-white/30 blur-sm" />

        {/* Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

        {/* Left door */}
        <div
          ref={leftDoor}
          className="absolute inset-y-0 left-0 z-20 w-1/2 border-r border-white/10 bg-gradient-to-r from-neutral-700 to-neutral-900"
        />

        {/* Right door */}
        <div
          ref={rightDoor}
          className="absolute inset-y-0 right-0 z-20 w-1/2 border-l border-white/10 bg-gradient-to-l from-neutral-700 to-neutral-900"
        />

        {/* Control panel */}
        <div className="absolute right-8 top-1/2 z-30 w-32 -translate-y-1/2 rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">

          <div className="mb-4 text-center">
            <div className="text-[9px] tracking-[0.3em] text-white/40">
              FLOOR
            </div>

            <div className="mt-1 text-xl font-semibold">
              00
            </div>
          </div>

          <div className="space-y-2">
            {destinations.map((destination) => (
              <button
                key={destination.id}
                disabled={disabled}
                onClick={() => onSelect(destination.id)}
                className="w-full rounded-md border border-white/10 px-2 py-2 text-[10px] uppercase tracking-wider transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
              >
                {destination.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ambient text */}
        <div className="absolute bottom-10 left-8 z-10">
          <p className="text-[9px] tracking-[0.5em] text-white/30">
            ROSHAN GAWADE
          </p>
        </div>
      </div>
    </main>
  );
}