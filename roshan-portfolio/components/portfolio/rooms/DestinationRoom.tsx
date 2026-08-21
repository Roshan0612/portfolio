"use client";

import type { DestinationId } from "@/data/destinations";

interface DestinationRoomProps {
  destination: DestinationId;
  onReturn: () => void;
}

export default function DestinationRoom({
  destination,
  onReturn,
}: DestinationRoomProps) {
  const title =
    destination.charAt(0).toUpperCase() +
    destination.slice(1);

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-white">

      <div className="text-center">

        <p className="text-xs uppercase tracking-[0.5em] text-white/30">
          Destination
        </p>

        <h1 className="mt-4 text-7xl font-semibold">
          {title}
        </h1>

        <p className="mx-auto mt-6 max-w-md text-white/40">
          This is a temporary room.
          Later this entire environment will become
          a cinematic portfolio scene.
        </p>

        <button
          onClick={onReturn}
          className="mt-10 rounded-full border border-white/20 px-7 py-3 text-sm transition hover:bg-white hover:text-black"
        >
          Return to Elevator
        </button>

      </div>

    </main>
  );
}