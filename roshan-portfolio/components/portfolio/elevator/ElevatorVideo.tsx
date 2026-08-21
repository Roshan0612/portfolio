"use client";

import { forwardRef } from "react";

interface ElevatorVideoProps {
  src: string;
  onEnded: () => void;
}

const ElevatorVideo = forwardRef<
  HTMLVideoElement,
  ElevatorVideoProps
>(({ src, onEnded }, ref) => {
  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      src={src}
      muted
      playsInline
      preload="auto"
      onEnded={onEnded}
    />
  );
});

ElevatorVideo.displayName = "ElevatorVideo";

export default ElevatorVideo;