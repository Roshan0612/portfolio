"use client";

import { forwardRef } from "react";

interface ElevatorDoorsProps {
  className?: string;
}

const ElevatorDoors = forwardRef<
  HTMLDivElement,
  ElevatorDoorsProps
>(({ className = "" }, ref) => {
  return (
    <div
      ref={ref}
      className={`absolute inset-0 z-20 flex ${className}`}
    >
      {/* Left door */}
      <div
        data-door="left"
        className="h-full w-1/2 border-r border-white/10 bg-gradient-to-r from-neutral-700 to-neutral-900"
      />

      {/* Right door */}
      <div
        data-door="right"
        className="h-full w-1/2 border-l border-white/10 bg-gradient-to-l from-neutral-700 to-neutral-900"
      />
    </div>
  );
});

ElevatorDoors.displayName = "ElevatorDoors";

export default ElevatorDoors;