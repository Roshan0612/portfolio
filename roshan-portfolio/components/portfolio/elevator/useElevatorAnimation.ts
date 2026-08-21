"use client";

import { useCallback } from "react";
import gsap from "gsap";

interface UseElevatorAnimationProps {
  doorRef: React.RefObject<HTMLDivElement | null>;
  floorRef: React.RefObject<HTMLDivElement | null>;
}

export function useElevatorAnimation({
  doorRef,
  floorRef,
}: UseElevatorAnimationProps) {
  const travel = useCallback(
    (
      destinationFloor: string,
      onComplete: () => void
    ) => {
      const doors = doorRef.current;

      if (!doors) return;

      const leftDoor = doors.querySelector(
        '[data-door="left"]'
      );

      const rightDoor = doors.querySelector(
        '[data-door="right"]'
      );

      const floorNumber = floorRef.current?.querySelector(
        "[data-floor-number]"
      );

      if (!leftDoor || !rightDoor || !floorNumber) return;

      const timeline = gsap.timeline({
        onComplete,
      });

      timeline

        // --------------------------------
        // 1. CLOSE DOORS
        // --------------------------------
        .to(leftDoor, {
          xPercent: 0,
          duration: 0.7,
          ease: "power3.inOut",
        })

        .to(
          rightDoor,
          {
            xPercent: 0,
            duration: 0.7,
            ease: "power3.inOut",
          },
          "<"
        )

        // --------------------------------
        // 2. TRAVEL EFFECT
        // --------------------------------
        .to(
          floorNumber,
          {
            innerText: destinationFloor,
            duration: 2,
            ease: "none",
            snap: {
              innerText: 1,
            },
          },
          "+=0.3"
        )

        // --------------------------------
        // 3. ARRIVAL PAUSE
        // --------------------------------
        .to(
          {},
          {
            duration: 0.4,
          }
        )

        // --------------------------------
        // 4. OPEN DOORS
        // --------------------------------
        .to(
          leftDoor,
          {
            xPercent: -100,
            duration: 0.8,
            ease: "power3.inOut",
          }
        )

        .to(
          rightDoor,
          {
            xPercent: 100,
            duration: 0.8,
            ease: "power3.inOut",
          },
          "<"
        );

      return () => timeline.kill();
    },
    [doorRef, floorRef]
  );

  return {
    travel,
  };
}