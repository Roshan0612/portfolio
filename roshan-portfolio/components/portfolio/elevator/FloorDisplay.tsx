"use client";

import { forwardRef } from "react";

const FloorDisplay = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="absolute left-1/2 top-8 z-30 -translate-x-1/2 text-center"
    >
      <div className="text-[9px] tracking-[0.5em] text-white/30">
        FLOOR
      </div>

      <div
        data-floor-number
        className="mt-1 text-3xl font-light tracking-wider"
      >
        00
      </div>
    </div>
  );
});

FloorDisplay.displayName = "FloorDisplay";

export default FloorDisplay;