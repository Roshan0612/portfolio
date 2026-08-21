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
    destination.charAt(0).toUpperCase() + destination.slice(1);

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-900 px-6 text-white">
      <div className="text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.4em] text-white/40">
          Floor
        </p>

        <h1 className="text-6xl font-bold">
          {title}
        </h1>

        <p className="mx-auto mt-6 max-w-md text-white/50">
          This is a temporary destination room.
          We will replace this with the actual cinematic
          portfolio environment later.
        </p>

        <button
          onClick={onReturn}
          className="mt-10 rounded-full border border-white/20 px-6 py-3 transition hover:bg-white hover:text-black"
        >
          Return to Elevator
        </button>
      </div>
    </main>
  );
}