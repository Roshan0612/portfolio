"use client";

import { useRef, useState } from "react";

import Elevator from "./elevator/Elevator";
import DestinationRoom from "./rooms/DestinationRoom";

import { destinations } from "@/data/destinations";
import type { DestinationId } from "@/data/destinations";

import { useElevatorAnimation } from "./elevator/useElevatorAnimation";

export default function Portfolio() {
  const [location, setLocation] =
    useState<"elevator" | DestinationId>("elevator");

  const [isTraveling, setIsTraveling] =
    useState(false);

  const doorRef = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLDivElement>(null);

  const { travel } = useElevatorAnimation({
    doorRef,
    floorRef,
  });

  const selectDestination = (
    destination: DestinationId
  ) => {
    if (isTraveling) return;

    setIsTraveling(true);

    const destinationData = destinations.find(
      (item) => item.id === destination
    );

    if (!destinationData) {
      setIsTraveling(false);
      return;
    }

    travel(destinationData.floor, () => {
      setLocation(destination);
      setIsTraveling(false);
    });
  };

  const returnToElevator = () => {
    setLocation("elevator");
  };

  if (location !== "elevator") {
    return (
      <DestinationRoom
        destination={location}
        onReturn={returnToElevator}
      />
    );
  }

  return (
    <Elevator
      disabled={isTraveling}
      onSelect={selectDestination}
      doorRef={doorRef}
      floorRef={floorRef}
    />
  );
}