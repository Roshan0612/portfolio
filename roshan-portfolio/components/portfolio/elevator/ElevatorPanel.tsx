"use client";

import { destinations } from "@/data/destinations";
import type { DestinationId } from "@/data/destinations";

interface ElevatorPanelProps {
  disabled: boolean;
  onSelect: (destination: DestinationId) => void;
}

export default function ElevatorPanel({
  disabled,
  onSelect,
}: ElevatorPanelProps) {
  return (
    <div className="absolute right-8 top-1/2 z-40 w-32 -translate-y-1/2 rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-xl">
      
      <div className="mb-4 text-center">
        <p className="text-[8px] tracking-[0.35em] text-white/30">
          SELECT
        </p>
      </div>

      <div className="space-y-2">
        {destinations.map((destination) => (
          <button
            key={destination.id}
            disabled={disabled}
            onClick={() => onSelect(destination.id)}
            className="w-full rounded-md border border-white/10 px-2 py-2 text-[9px] uppercase tracking-wider transition duration-300 hover:bg-white hover:text-black disabled:pointer-events-none disabled:opacity-30"
          >
            {destination.label}
          </button>
        ))}
      </div>
    </div>
  );
}