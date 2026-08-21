"use client";

interface TransitionOverlayProps {
  active: boolean;
}

export default function TransitionOverlay({
  active,
}: TransitionOverlayProps) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 bg-black transition-opacity duration-500 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}