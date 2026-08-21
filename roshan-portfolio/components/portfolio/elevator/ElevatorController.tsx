"use client";

import { useEffect, useRef } from "react";

import ElevatorVideo from "./ElevatorVideo";

import type { DestinationId } from "@/data/destinations";
import { destinations } from "@/data/destinations";

interface ElevatorControllerProps {
  destination: DestinationId;
  onArrival: () => void;
}

export default function ElevatorController({
  destination,
  onArrival,
}: ElevatorControllerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const destinationData = destinations.find(
    (item) => item.id === destination
  );

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.currentTime = 0;

    video.play().catch((error) => {
      console.error(
        "Elevator video playback failed:",
        error
      );
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black">

      <ElevatorVideo
        ref={videoRef}
        src="/videos/elevator/travel.mp4"
        onEnded={onArrival}
      />

      <div className="absolute left-1/2 top-16 z-10 -translate-x-1/2 text-center text-white">

        <p className="text-[10px] tracking-[0.5em] text-white/40">
          DESTINATION
        </p>

        <p className="mt-3 text-6xl font-light">
          {destinationData?.floor}
        </p>

        <p className="mt-2 text-xs uppercase tracking-[0.4em] text-white/50">
          {destinationData?.label}
        </p>

      </div>

    </div>
  );
}