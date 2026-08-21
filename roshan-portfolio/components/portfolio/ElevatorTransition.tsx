"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ElevatorTransitionProps {
  active: boolean;
  destination: string | null;
  onComplete: () => void;
}

export default function ElevatorTransition({
  active,
  destination,
  onComplete,
}: ElevatorTransitionProps) {
  const overlay = useRef<HTMLDivElement>(null);
  const floor = useRef<HTMLDivElement>(null);
  const destinationText = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete,
      });

      timeline
        // Start
        .set(overlay.current, {
          opacity: 0,
        })

        // Fade into elevator travel
        .to(overlay.current, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.in",
        })

        // Floor changes
        .to(
          floor.current,
          {
            innerText: "01",
            duration: 0.4,
          },
          "+=0.1"
        )

        .to(
          floor.current,
          {
            innerText: "02",
            duration: 0.4,
          },
          "+=0.3"
        )

        .to(
          floor.current,
          {
            innerText: "03",
            duration: 0.4,
          },
          "+=0.3"
        )

        .to(
          floor.current,
          {
            innerText: "04",
            duration: 0.4,
          },
          "+=0.3"
        )

        // Destination text
        .to(
          destinationText.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.1"
        )

        // Finish
        .to(overlay.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        });
    });

    return () => ctx.revert();
  }, [active, onComplete]);

  return (
    <div
      ref={overlay}
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-black opacity-0"
    >
      <div className="text-center text-white">

        <div
          ref={floor}
          className="text-8xl font-light tracking-tight"
        >
          00
        </div>

        <div
          ref={destinationText}
          className="mt-6 translate-y-5 text-xs uppercase tracking-[0.5em] opacity-0 text-white/50"
        >
          {destination}
        </div>

      </div>
    </div>
  );
}